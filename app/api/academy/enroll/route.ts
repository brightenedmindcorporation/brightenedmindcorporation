import { NextResponse } from "next/server";
import { rejectIfFakeEmail } from "@/lib/emailValidation";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";

/**
 * Self-service enrollment request, used both for a student's very first
 * registration and for adding another language to an existing account.
 * One Firebase Auth account (one email) can hold several enrollments —
 * one per language — but never two for the same language at once. Each
 * enrollment is its own Firestore doc at enrollments/{uid}_{langCode} so a
 * duplicate request for a language the student already has pending or
 * approved is rejected by construction (no race condition like a
 * query-then-write duplicate check would have).
 *
 * This goes through the Admin SDK (like the admin approve/reject routes)
 * instead of a direct client-side Firestore write, so it doesn't depend on
 * Firestore security rules being updated for a brand new collection.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: "Le serveur n'est pas configuré (FIREBASE_SERVICE_ACCOUNT_KEY manquant)." },
        { status: 503 }
      );
    }

    const { idToken, name, langCode, level, studyDays } = await request.json();
    if (!idToken || !name || !langCode || !level) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const uid = decoded.uid;
    const email = decoded.email;
    if (!email) {
      return NextResponse.json({ error: "Compte sans adresse email." }, { status: 400 });
    }
    const fakeEmail = await rejectIfFakeEmail(email);
    if (fakeEmail) return fakeEmail;


    const adminDb = getAdminDb();
    const studentRef = adminDb.collection("students").doc(uid);
    const enrollmentRef = adminDb.collection("enrollments").doc(`${uid}_${langCode}`);

    const result = await adminDb.runTransaction(async (tx) => {
      const [studentSnap, enrollmentSnap] = await Promise.all([tx.get(studentRef), tx.get(enrollmentRef)]);

      if (enrollmentSnap.exists) {
        const existingStatus = enrollmentSnap.data()!.status;
        if (existingStatus === "Pending" || existingStatus === "Approved") {
          return { ok: false as const, status: existingStatus };
        }
      }

      if (!studentSnap.exists) {
        tx.set(studentRef, { uid, name, email, createdAt: new Date().toISOString() });
      }

      tx.set(enrollmentRef, {
        uid,
        email,
        name,
        langCode,
        level,
        studyDays: studyDays === 5 ? 5 : 3,
        status: "Pending",
        matricule: "",
        createdAt: new Date().toISOString(),
      });

      return { ok: true as const };
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: "Vous avez déjà une inscription pour cette langue.", status: result.status },
        { status: 409 }
      );
    }

    try {
      await createNotification({
        audience: "admin",
        type: "enrollment",
        title: "Nouvelle inscription",
        message: `${name} s'est inscrit(e) — ${langCode}`,
        link: "/admin?tab=students",
      });
    } catch (notifError) {
      console.error("Error creating enrollment notification (non-fatal):", notifError);
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error creating enrollment:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
