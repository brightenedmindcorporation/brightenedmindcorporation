import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { sendLevelInvitation } from "@/lib/academy/levelInvite";

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

    // Passing a level's final quiz invites the student to the next level (once).
    if (progress?.finalQuizPassed === true) {
      try {
        await sendLevelInvitation(decoded.uid, String(langCode), Number(level));
      } catch (inviteError) {
        console.error("Level invitation failed (non-fatal):", inviteError);
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error syncing progress:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
