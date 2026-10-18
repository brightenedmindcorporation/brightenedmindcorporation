import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, canTeach, getCaller, isTeachersStudent } from "@/lib/teacherAuth";
import { createNotification } from "@/lib/notifications";
import { availableLanguages, getLevelCurriculum } from "@/content/curriculum";

export const dynamic = "force-dynamic";

/**
 * The administration (or a teacher, for their own students) steps in on a student's progress:
 *  - unlock:   opens lesson N (and its quiz) whatever the pacing or the previous quiz;
 *  - lock:     takes that manual opening back;
 *  - validate: records quiz N as passed (with a score), for a student who already knows the lesson
 *              or whose result was lost — the next lesson then follows the normal pacing, or can be
 *              unlocked at once.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["admin", "teacher"]);
    const body = await request.json().catch(() => ({}));
    const uid = String(body.uid || "");
    const langCode = String(body.langCode || "");
    const level = Number(body.level);
    const lessonId = Number(body.lessonId);
    const action = String(body.action || "");
    if (!uid || !langCode || !Number.isInteger(level) || level < 1 || level > 3 || !Number.isInteger(lessonId) || lessonId < 1) {
      return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
    }
    if (!["unlock", "lock", "validate"].includes(action)) return NextResponse.json({ error: "Action inconnue." }, { status: 400 });

    const db = getAdminDb();
    if (caller.role === "teacher") {
      const [enrollment, legacy] = await Promise.all([
        db.collection("enrollments").doc(`${uid}_${langCode}`).get(),
        db.collection("students").doc(uid).get(),
      ]);
      const record = enrollment.exists ? enrollment.data() : legacy.data()?.langCode === langCode ? legacy.data() : null;
      if (!record || record.status !== "Approved" || !isTeachersStudent(caller, record as any) || !canTeach(caller.assignments, langCode, level)) {
        return NextResponse.json({ error: "Cet étudiant ne fait pas partie de vos étudiants." }, { status: 403 });
      }
    }

    const lang = availableLanguages.find((l) => l.code === langCode);
    const curriculum = lang ? getLevelCurriculum(lang.slug, level) : null;
    const lesson = curriculum?.lessons.find((l) => l.id === lessonId);
    if (!curriculum || !lesson) return NextResponse.json({ error: "Leçon introuvable." }, { status: 404 });

    const ref = db.collection("progress").doc(`${uid}_${langCode}_${level}`);
    const base = { uid, langCode, level, updatedAt: new Date().toISOString() };
    let message = "";

    if (action === "unlock") {
      await ref.set({ ...base, unlockedLessons: FieldValue.arrayUnion(lessonId) }, { merge: true });
      message = `La leçon ${lessonId} (${lesson.title}) est ouverte pour vous.`;
    } else if (action === "lock") {
      await ref.set({ ...base, unlockedLessons: FieldValue.arrayRemove(lessonId) }, { merge: true });
    } else {
      const total = curriculum.quizzes.find((q) => q.lessonId === lessonId)?.questions.length ?? 0;
      const raw = Number(body.score);
      const score = Number.isFinite(raw) ? Math.max(0, Math.min(total, Math.round(raw))) : total;
      const now = new Date().toISOString();
      await ref.set(
        {
          ...base,
          completedQuizzes: FieldValue.arrayUnion(lessonId),
          studiedLessons: FieldValue.arrayUnion(lessonId),
          adminPassed: FieldValue.arrayUnion(lessonId),
          quizScores: { [lessonId]: score },
          completedAt: { [lessonId]: now },
        },
        { merge: true }
      );
      message = `Votre quiz de la leçon ${lessonId} a été validé par ${caller.role === "admin" ? "l'administration" : "votre professeur"}.`;
    }

    if (message) {
      try {
        await createNotification({
          audience: uid,
          type: "lesson-unlocked",
          title: action === "unlock" ? "Leçon ouverte" : "Quiz validé",
          message,
          link: `/academia/${lang!.slug}/level/${level}`,
        });
      } catch (error) {
        console.error("Unlock notification failed (non-fatal):", error);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Student progress action failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
