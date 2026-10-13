import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { generateMatriculeAdmin } from "@/lib/academy/matricule-admin";
import { createNotification } from "@/lib/notifications";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/**
 * Approves a pending student server-side via the Admin SDK, bypassing
 * Firestore security rules entirely. The admin dashboard previously wrote
 * directly from the browser with the client SDK, which silently failed
 * (or got stuck) whenever the project's Firestore rules didn't grant the
 * admin account write access to another user's students/{uid} doc —
 * exactly the kind of rule that's common (and correct) for a "users can
 * only write their own document" setup. This route is also the first
 * place that actually verifies the caller is the admin (the client-side
 * check was only a UI gate, not real security).
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: "Le serveur n'est pas configuré (FIREBASE_SERVICE_ACCOUNT_KEY manquant)." },
        { status: 503 }
      );
    }

    const { idToken, studentId } = await request.json();
    if (!idToken || !studentId) {
      return NextResponse.json({ error: "idToken et studentId sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const adminDb = getAdminDb();
    const studentRef = adminDb.collection("students").doc(studentId);

    const claimed = await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(studentRef);
      if (!snap.exists) return false;
      const status = snap.data()!.status;
      if (status === "Approved" || status === "Rejected") return false;
      tx.update(studentRef, { status: "Approving" });
      return true;
    });

    if (!claimed) {
      return NextResponse.json(
        { error: "Cet étudiant a déjà été traité (par vous ou un autre admin)." },
        { status: 409 }
      );
    }

    const snap = await studentRef.get();
    const langCode = (snap.data()?.langCode as string) || "EN";

    try {
      const matricule = await generateMatriculeAdmin(langCode);
      await studentRef.update({ status: "Approved", matricule });
      try {
        await createNotification({
          audience: studentId,
          type: "enrollment-approved",
          title: "Inscription approuvée",
          message: `Votre inscription a été approuvée — Student ID ${matricule}.`,
          link: "/academy/dashboard",
        });
      } catch (notifError) {
        console.error("Error creating approval notification (non-fatal):", notifError);
      }
      return NextResponse.json({ status: "success", matricule });
    } catch (innerError) {
      // Roll back to "Pending" so the row is immediately retryable.
      await studentRef.update({ status: "Pending" }).catch(() => {});
      throw innerError;
    }
  } catch (error: any) {
    console.error("Error approving student:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
