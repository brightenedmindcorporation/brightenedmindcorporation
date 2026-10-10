import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

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
    await adminDb.collection("students").doc(studentId).update({ status: "Rejected" });

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error rejecting student:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
