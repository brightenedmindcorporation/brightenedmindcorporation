import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { findProgramByCode } from "@/content/curriculum";

export const dynamic = "force-dynamic";

/**
 * Read-only check for progress that may have been copied from another student (two students on one browser before
 * the per-student fix). A lesson counts as "without a trace" when the progress says it was studied or its quiz taken,
 * but the student's own activity log holds no matching event and the administration did not set the result.
 * Older progress that predates the activity log can show up too: the administration decides on each case.
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const db = getAdminDb();
    const snap = await db.collection("progress").get();

    const byUid = new Map<string, FirebaseFirestore.QueryDocumentSnapshot[]>();
    for (const d of snap.docs) {
      const uid = String(d.data().uid || d.id.split("_")[0]);
      byUid.set(uid, [...(byUid.get(uid) ?? []), d]);
    }

    const suspects: {
      uid: string;
      name: string;
      email: string;
      langCode: string;
      program: string;
      level: number;
      lessons: number[];
      quizzes: number[];
      events: number;
      lastEvent: string;
    }[] = [];

    for (const [uid, docs] of byUid) {
      const [studentSnap, actSnap] = await Promise.all([
        db.collection("students").doc(uid).get(),
        db.collection("students").doc(uid).collection("activity").limit(2000).get(),
      ]);
      const opened = new Set<string>();
      const quizzed = new Set<string>();
      let last = "";
      for (const a of actSnap.docs) {
        const e = a.data();
        if (e.at && e.at > last) last = e.at;
        const key = `${e.meta?.langCode}-${e.meta?.level}-${e.meta?.lessonId}`;
        if (e.type === "lesson_open") opened.add(key);
        if (e.type === "quiz") quizzed.add(key);
      }
      for (const d of docs) {
        const p = d.data();
        const langCode = String(p.langCode || "");
        const level = Number(p.level);
        const adminScored = new Set<number>((p.adminScored ?? []).map(Number));
        const unlocked = new Set<number>((p.unlockedLessons ?? []).map(Number));
        const studied: number[] = (p.studiedLessons ?? []).map(Number);
        const scored: number[] = Object.keys(p.quizScores ?? {}).map(Number);
        const lessons = studied.filter((n) => !opened.has(`${langCode}-${level}-${n}`) && !unlocked.has(n));
        const quizzes = scored.filter((n) => !quizzed.has(`${langCode}-${level}-${n}`) && !adminScored.has(n));
        if (!lessons.length && !quizzes.length) continue;
        suspects.push({
          uid,
          name: studentSnap.data()?.name || "?",
          email: studentSnap.data()?.email || "",
          langCode,
          program: findProgramByCode(langCode)?.label ?? langCode,
          level,
          lessons: lessons.sort((a, b) => a - b),
          quizzes: quizzes.sort((a, b) => a - b),
          events: actSnap.size,
          lastEvent: last,
        });
      }
    }
    return NextResponse.json({ checked: snap.size, suspects });
  } catch (error) {
    if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("Progress audit failed:", error);
    return NextResponse.json({ error: (error as Error)?.message || "Erreur serveur." }, { status: 500 });
  }
}
