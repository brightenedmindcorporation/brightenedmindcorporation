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

    // Never overwrite what the server already knows with a device that knows less: merge. The
    // administration's decisions (scores it set, lessons it opened, a restart) always win.
    const ref = adminDb.collection("progress").doc(`${decoded.uid}_${langCode}_${level}`);
    const existing = (await ref.get()).data() || {};
    if (existing.resetAt && progress.resetAt !== existing.resetAt) {
      // This device still holds progress from before a restart: ignore it, it will be refreshed on the next pull.
      return NextResponse.json({ status: "stale" });
    }
    const union = (a: unknown, b: unknown) =>
      Array.from(new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])])).sort((x: any, y: any) => x - y);
    const adminScored: number[] = Array.isArray(existing.adminScored) ? existing.adminScored : [];
    const merged = {
      ...progress,
      studiedLessons: union(existing.studiedLessons, progress.studiedLessons),
      completedQuizzes: union(existing.completedQuizzes, progress.completedQuizzes).filter((id: number) => !adminScored.includes(id)),
      unlockedLessons: union(existing.unlockedLessons, progress.unlockedLessons),
      adminScored,
      adminFinal: Boolean(existing.adminFinal),
      quizScores: { ...(progress.quizScores || {}) },
      completedAt: { ...(existing.completedAt || {}), ...(progress.completedAt || {}) },
      finalQuizPassed: Boolean(existing.finalQuizPassed) || Boolean(progress.finalQuizPassed),
    } as Record<string, any>;
    // A score set by the administration keeps its value, date and pass/fail state.
    for (const id of adminScored) {
      if (existing.quizScores?.[id] !== undefined) merged.quizScores[id] = existing.quizScores[id];
      if (existing.completedAt?.[id]) merged.completedAt[id] = existing.completedAt[id];
      else delete merged.completedAt[id];
      if ((existing.completedQuizzes || []).includes(id)) merged.completedQuizzes.push(id);
    }
    merged.completedQuizzes.sort((x: number, y: number) => x - y);
    if (existing.adminFinal) {
      merged.finalQuizScore = existing.finalQuizScore ?? null;
      merged.finalQuizPassed = Boolean(existing.finalQuizPassed);
    } else if (existing.finalQuizPassed && !progress.finalQuizPassed) {
      merged.finalQuizScore = existing.finalQuizScore ?? progress.finalQuizScore ?? null;
    }

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
