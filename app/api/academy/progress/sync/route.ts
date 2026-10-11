import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken, langCode, level, progress } = await request.json();
    if (!idToken || !langCode || !level || !progress) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const adminDb = getAdminDb();

    await adminDb.collection("progress").doc(`${decoded.uid}_${langCode}_${level}`).set(
      {
        uid: decoded.uid,
        langCode,
        level,
        ...progress,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error syncing progress:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
