import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, canTeach, getCaller, isTeachersStudent } from "@/lib/teacherAuth";
import { createNotification } from "@/lib/notifications";
import { sendLevelInvitation } from "@/lib/academy/levelInvite";
import { findProgramByCode, getLevelCurriculum } from "@/content/curriculum";
import { passesQuiz } from "@/lib/academy/quizScoring";

export const dynamic = "force-dynamic";

/**
 * The administration (or a teacher, for their own students) decides about a student's results. The first
 * attempt of a quiz is what the student's file and certificate show; from here it can be changed:
 *  - setScore:      sets the score of lesson quiz N (above the passing mark = passed, which opens the next lesson;
 *                   below = not passed);
 *  - setFinalScore: same for the level's final quiz (passing it makes the certificate available);
 *  - unlock / lock: opens lesson N (and its quiz) whatever the pacing, or takes that back;
 *  - resetLevel:    the student starts the level again from zero (the old results are kept in an archive).
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["admin", "teacher"]);
    const body = await request.json().catch(() => ({}));
    const uid = String(body.uid || "");
    const langCode = String(body.langCode || "");
    const level = Number(body.level);
    const lessonId = Number(body.lessonId ?? 0);
    const action = String(body.action || "");
    const needsLesson = ["unlock", "lock", "setScore"].includes(action);
    if (!uid || !langCode || !Number.isInteger(level) || level < 1 || level > 3 || (needsLesson && (!Number.isInteger(lessonId) || lessonId < 1))) {
      return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
    }
    if (!["unlock", "lock", "setScore", "setFinalScore", "resetLevel"].includes(action)) return NextResponse.json({ error: "Action inconnue." }, { status: 400 });

    // Changing a result or restarting a level is the administration's decision; a teacher can open lessons.
    if (caller.role === "teacher" && !["unlock", "lock"].includes(action)) {
      return NextResponse.json({ error: "Seule l'administration peut modifier les notes ou recommencer un niveau." }, { status: 403 });
    }
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

    const lang = findProgramByCode(langCode);
    const curriculum = lang ? getLevelCurriculum(lang.slug, level) : null;
    const lesson = curriculum?.lessons.find((l) => l.id === lessonId);
    if (!curriculum || (needsLesson && !lesson)) return NextResponse.json({ error: "Leçon introuvable." }, { status: 404 });

    const ref = db.collection("progress").doc(`${uid}_${langCode}_${level}`);
    const now = new Date().toISOString();
    const base = { uid, langCode, level, updatedAt: now };
    const slug = lang!.slug;
    const who = caller.role === "admin" ? "l'administration" : "votre professeur";
    let message = "";
    let title = "";

    // Points set part by part (écoute, questions, lecture, écrit): their sum is the mark out of 100.
    const PART_KEYS = ["listen", "quiz", "read", "write"] as const;
    let adminParts: Record<string, number> | null = null;
    if (body.parts && typeof body.parts === "object") {
      adminParts = {};
      for (const k of PART_KEYS) {
        const v = Number(body.parts[k]);
        if (body.parts[k] !== undefined && body.parts[k] !== null && body.parts[k] !== "" && Number.isFinite(v)) adminParts[k] = Math.max(0, Math.min(100, Math.round(v * 10) / 10));
      }
      if (Object.keys(adminParts).length === 0) adminParts = null;
    }
    const partsTotal = adminParts ? Math.round(Object.values(adminParts).reduce((a, b) => a + b, 0)) : null;

    if (action === "unlock") {
      await ref.set({ ...base, unlockedLessons: FieldValue.arrayUnion(lessonId) }, { merge: true });
      title = "Leçon ouverte";
      message = `La leçon ${lessonId} (${lesson!.title}) est ouverte pour vous.`;
    } else if (action === "lock") {
      await ref.set({ ...base, unlockedLessons: FieldValue.arrayRemove(lessonId) }, { merge: true });
    } else if (action === "setScore") {
      const quiz = curriculum.quizzes.find((q) => q.lessonId === lessonId);
      const total = quiz?.questions.length ?? 0;
      const raw = partsTotal ?? Number(body.score);
      if (!quiz || !Number.isFinite(raw)) return NextResponse.json({ error: "Note invalide." }, { status: 400 });
      // The administration marks out of 100 (écoute + questions + écrit); the questions' score follows it.
      const percent = Math.max(0, Math.min(100, Math.round(raw)));
      const score = Math.round((percent / 100) * total);
      const passed = passesQuiz(percent);
      const existing = (await ref.get()).data() || {};
      await ref.set(
        {
          ...base,
          quizScores: { [lessonId]: score },
          adminPercent: { [lessonId]: percent },
          adminParts: { [lessonId]: adminParts ?? FieldValue.delete() },
          adminScored: FieldValue.arrayUnion(lessonId),
          studiedLessons: FieldValue.arrayUnion(lessonId),
          completedQuizzes: passed ? FieldValue.arrayUnion(lessonId) : FieldValue.arrayRemove(lessonId),
          completedAt: { [lessonId]: passed ? existing.completedAt?.[lessonId] || now : FieldValue.delete() },
        },
        { merge: true }
      );
      title = "Note mise à jour";
      message = `Votre note du quiz de la leçon ${lessonId} a été fixée à ${percent}/100 par ${who}${passed ? " : la leçon suivante est disponible." : "."}`;
    } else if (action === "setFinalScore") {
      const total = curriculum.finalQuiz.questions.length;
      const raw = partsTotal ?? Number(body.score);
      if (!Number.isFinite(raw)) return NextResponse.json({ error: "Note invalide." }, { status: 400 });
      const percent = Math.max(0, Math.min(100, Math.round(raw)));
      const score = Math.round((percent / 100) * total);
      const passed = passesQuiz(percent);
      await ref.set({ ...base, finalQuizScore: score, finalQuizPassed: passed, adminFinal: true, adminPercent: { final: percent }, adminParts: { final: adminParts ?? FieldValue.delete() } }, { merge: true });
      title = "Note mise à jour";
      message = `Votre note du quiz final du niveau ${level} a été fixée à ${percent}/100 par ${who}${passed ? " : votre certificat est disponible." : "."}`;
      if (passed) await sendLevelInvitation(uid, langCode, level).catch((e) => console.error("Level invitation failed (non-fatal):", e));
    } else {
      // resetLevel: keep an archive of the old results, then start from zero.
      const snap = await ref.get();
      const old = snap.data() || {};
      const archive = {
        at: now,
        by: caller.email,
        studiedLessons: old.studiedLessons || [],
        completedQuizzes: old.completedQuizzes || [],
        quizScores: old.quizScores || {},
        quizParts: old.quizParts || {},
        adminPercent: old.adminPercent || {},
        finalQuizScore: old.finalQuizScore ?? null,
        finalQuizPassed: Boolean(old.finalQuizPassed),
        certificateId: old.certificateId || null,
      };
      await ref.set({
        uid,
        langCode,
        level,
        updatedAt: now,
        resetAt: now,
        previousRuns: [...(Array.isArray(old.previousRuns) ? old.previousRuns : []), archive],
        studiedLessons: [],
        completedQuizzes: [],
        quizScores: {},
        completedAt: {},
        finalQuizPassed: false,
        finalQuizScore: null,
        certificateId: null,
        unlockedLessons: [],
        adminScored: [],
        adminFinal: false,
        quizAttempts: {},
        practiceBest: {},
        quizParts: {},
        adminPercent: {},
      });
      title = "Niveau à recommencer";
      message = `${who === "l'administration" ? "L'administration" : "Votre professeur"} vous demande de recommencer le niveau ${level} depuis le début. Vos résultats précédents sont archivés.`;
    }

    if (message) {
      try {
        await createNotification({
          audience: uid,
          type: "lesson-unlocked",
          title,
          message,
          link: `/academia/${slug}/level/${level}`,
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
