import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

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
    const snap = await adminDb.collection("enrollments").doc(enrollmentId).get();
    await adminDb.collection("enrollments").doc(enrollmentId).update({ status: "Rejected" });

    try {
      const uid = (snap.data()?.uid as string) || enrollmentId.split("_")[0];
      await createNotification({
        audience: uid,
        type: "enrollment-rejected",
        title: "Inscription non approuvée",
        message: "Votre demande d'inscription n'a pas été approuvée. Contactez l'administration pour plus de détails.",
        link: "/academy/dashboard",
      });
    } catch (notifError) {
      console.error("Error creating rejection notification (non-fatal):", notifError);
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error rejecting enrollment:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
