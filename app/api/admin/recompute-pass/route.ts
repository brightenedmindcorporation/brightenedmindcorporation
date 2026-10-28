import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { findProgramByCode, getLevelCurriculum } from "@/content/curriculum";
import { summarizeLevel, type ProgressDoc } from "@/lib/academy/levelSummary";
import { PASS_AT, passesQuiz } from "@/lib/academy/quizScoring";

// Applies the current pass rule (general mark of 60/100 or more) to the results already saved, so that old
// students are judged like the new ones. GET previews, POST applies. Marks are never changed, only the
// "passed / failed" state, which unlocks or re-locks the next lessons and the certificate request.
type Change = { uid: string; name: string; langCode: string; level: number; lessonId: number | "final"; percent: number; from: "réussi" | "échoué"; to: "réussi" | "échoué" };

async function run(request: Request, apply: boolean) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const db = getAdminDb();
    const snap = await db.collection("progress").get();
    const names = new Map<string, string>();
    for (const s of (await db.collection("students").get()).docs) names.set(s.id, String(s.data().name || s.data().email || s.id));

    const changes: Change[] = [];
    let examined = 0;
    const now = new Date().toISOString();

    for (const doc of snap.docs) {
      const p = doc.data() as ProgressDoc & { uid?: string; langCode?: string; level?: number; completedAt?: Record<string, string> };
      const langCode = String(p.langCode || "");
      const level = Number(p.level);
      const lang = findProgramByCode(langCode);
      const curriculum = lang ? getLevelCurriculum(lang.slug, level) : null;
      if (!curriculum) continue;
      examined++;

      const summary = summarizeLevel(curriculum, p);
      const promote: number[] = [];
      const demote: number[] = [];
      for (const row of summary.rows) {
        if (row.score === null || row.mark.percent === null) continue;
        const now_ = passesQuiz(row.mark.percent);
        if (now_ === row.passed) continue;
        (now_ ? promote : demote).push(row.lessonId);
        changes.push({ uid: String(p.uid || doc.id), name: names.get(String(p.uid)) || "", langCode, level, lessonId: row.lessonId, percent: row.mark.percent, from: row.passed ? "réussi" : "échoué", to: now_ ? "réussi" : "échoué" });
      }
      let finalChange: boolean | null = null;
      if (summary.final.score !== null && summary.final.mark.percent !== null) {
        const now_ = passesQuiz(summary.final.mark.percent);
        if (now_ !== summary.final.passed) {
          finalChange = now_;
          changes.push({ uid: String(p.uid || doc.id), name: names.get(String(p.uid)) || "", langCode, level, lessonId: "final", percent: summary.final.mark.percent, from: summary.final.passed ? "réussi" : "échoué", to: now_ ? "réussi" : "échoué" });
        }
      }
      if (!apply || (promote.length === 0 && demote.length === 0 && finalChange === null)) continue;

      const completed = new Set<number>((p.completedQuizzes ?? []).map(Number));
      promote.forEach((id) => completed.add(id));
      demote.forEach((id) => completed.delete(id));
      const completedAt: Record<string, unknown> = {};
      for (const id of promote) completedAt[String(id)] = p.completedAt?.[String(id)] || now;
      for (const id of demote) completedAt[String(id)] = FieldValue.delete();
      const update: Record<string, unknown> = { completedQuizzes: [...completed].sort((a, b) => a - b), completedAt, passRuleAppliedAt: now, updatedAt: now };
      // The server's state wins over the students' devices for these lessons (see the progress sync).
      if (promote.length || demote.length) update.adminScored = FieldValue.arrayUnion(...promote, ...demote);
      if (finalChange !== null) {
        update.finalQuizPassed = finalChange;
        update.adminFinal = true;
      }
      await doc.ref.set(update, { merge: true });
    }

    return NextResponse.json({
      applied: apply,
      passAt: PASS_AT,
      examined,
      promoted: changes.filter((c) => c.to === "réussi").length,
      demoted: changes.filter((c) => c.to === "échoué").length,
      changes,
    });
  } catch (error: any) {
    if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: error?.message || "Erreur serveur" }, { status: 500 });
  }
}

export const GET = (request: Request) => run(request, false);
export const POST = (request: Request) => run(request, true);
