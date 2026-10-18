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

    // Never overwrite what the server already knows with a device that knows less: merge.
    const ref = adminDb.collection("progress").doc(`${decoded.uid}_${langCode}_${level}`);
    const existing = (await ref.get()).data() || {};
    const union = (a: unknown, b: unknown) =>
      Array.from(new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])])).sort((x: any, y: any) => x - y);
    const adminPassed: number[] = Array.isArray(existing.adminPassed) ? existing.adminPassed : [];
    const merged = {
      ...progress,
      studiedLessons: union(existing.studiedLessons, progress.studiedLessons),
      completedQuizzes: union(existing.completedQuizzes, progress.completedQuizzes),
      // Administration decisions live on the server only: the student's device cannot remove them.
      unlockedLessons: union(existing.unlockedLessons, progress.unlockedLessons),
      adminPassed: union(existing.adminPassed, progress.adminPassed),
      quizScores: { ...(progress.quizScores || {}) },
      completedAt: { ...(existing.completedAt || {}), ...(progress.completedAt || {}) },
      finalQuizPassed: Boolean(existing.finalQuizPassed) || Boolean(progress.finalQuizPassed),
    } as Record<string, any>;
    // A quiz validated by the administration keeps its recorded score and date.
    for (const id of adminPassed) {
      if (existing.quizScores?.[id] !== undefined) merged.quizScores[id] = existing.quizScores[id];
      if (existing.completedAt?.[id]) merged.completedAt[id] = existing.completedAt[id];
    }
    if (existing.finalQuizPassed && !progress.finalQuizPassed) merged.finalQuizScore = existing.finalQuizScore ?? progress.finalQuizScore ?? null;

    await ref.set(
      {
        uid: decoded.uid,
        langCode,
        level,
        ...merged,
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
