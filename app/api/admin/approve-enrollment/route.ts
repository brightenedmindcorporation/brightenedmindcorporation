import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { generateMatriculeAdmin } from "@/lib/academy/matricule-admin";
import { createNotification } from "@/lib/notifications";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

// Same approve flow as /api/admin/approve-student, but for a row in the
// multi-language `enrollments` collection (enrollments/{uid}_{langCode})
// instead of the legacy single-enrollment students/{uid} doc. See that
// route for why this goes through the Admin SDK server-side.
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: "Le serveur n'est pas configuré (FIREBASE_SERVICE_ACCOUNT_KEY manquant)." },
        { status: 503 }
      );
    }

    const { idToken, enrollmentId } = await request.json();
    if (!idToken || !enrollmentId) {
      return NextResponse.json({ error: "idToken et enrollmentId sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const adminDb = getAdminDb();
    const enrollmentRef = adminDb.collection("enrollments").doc(enrollmentId);

    const claimed = await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(enrollmentRef);
      if (!snap.exists) return false;
      const status = snap.data()!.status;
      if (status === "Approved" || status === "Rejected") return false;
      tx.update(enrollmentRef, { status: "Approving" });
      return true;
    });

    if (!claimed) {
      return NextResponse.json(
        { error: "Cette inscription a déjà été traitée (par vous ou un autre admin)." },
        { status: 409 }
      );
    }

    const snap = await enrollmentRef.get();
    const langCode = (snap.data()?.langCode as string) || "EN";

    try {
      const matricule = await generateMatriculeAdmin(langCode);
      await enrollmentRef.update({ status: "Approved", matricule, approvedAt: new Date().toISOString() });
      try {
        const uid = (snap.data()?.uid as string) || enrollmentId.split("_")[0];
        await createNotification({
          audience: uid,
          type: "enrollment-approved",
          title: "Inscription approuvée",
          message: `Votre inscription (${langCode}) a été approuvée — matricule ${matricule}.`,
          link: "/academy/dashboard",
        });
      } catch (notifError) {
        console.error("Error creating approval notification (non-fatal):", notifError);
      }
      return NextResponse.json({ status: "success", matricule });
    } catch (innerError) {
      await enrollmentRef.update({ status: "Pending" }).catch(() => {});
      throw innerError;
    }
  } catch (error: any) {
    console.error("Error approving enrollment:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
