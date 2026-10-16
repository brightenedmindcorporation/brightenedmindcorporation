import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";

export interface StuckQuiz {
  uid: string;
  name: string;
  email: string;
  langCode: string;
  level: number;
  quiz: string; // "Quiz 3" or "Quiz final"
  score: number;
}

/**
 * Students whose recorded (first) attempt at a quiz failed. Only the first
 * attempt counts toward progress, so a failed quiz keeps the next lesson
 * locked: the administration or the teacher should reach out to them.
 */
export async function findStuckQuizzes(): Promise<StuckQuiz[]> {
  const db = getAdminDb();
  const [progressSnap, studentsSnap] = await Promise.all([db.collection("progress").get(), db.collection("students").get()]);
  const people = new Map(studentsSnap.docs.map((d) => [d.id, d.data()]));
  const out: StuckQuiz[] = [];
  for (const d of progressSnap.docs) {
    const p = d.data();
    const person = people.get(p.uid) || {};
    const passed = new Set<number>(p.completedQuizzes || []);
    for (const [lessonId, score] of Object.entries(p.quizScores || {})) {
      if (!passed.has(Number(lessonId))) {
        out.push({ uid: p.uid, name: person.name || "", email: person.email || "", langCode: p.langCode, level: Number(p.level), quiz: `Quiz ${lessonId}`, score: Number(score) });
      }
    }
    if (typeof p.finalQuizScore === "number" && !p.finalQuizPassed) {
      out.push({ uid: p.uid, name: person.name || "", email: person.email || "", langCode: p.langCode, level: Number(p.level), quiz: "Quiz final", score: p.finalQuizScore });
    }
  }
  return out;
}
