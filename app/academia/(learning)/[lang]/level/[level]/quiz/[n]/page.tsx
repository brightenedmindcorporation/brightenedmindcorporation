"use client";

import { useActiveTime } from "@/lib/academy/useActiveTime";
import { allowedLevel } from "@/lib/academy/levelAccess";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getQuiz, getLevelCurriculum } from "@/content/curriculum";
import QuizEngine from "@/components/academy/QuizEngine";
import { getLevelProgress, isLessonUnlocked, recordQuizResult } from "@/lib/academy/progress";
import { pullProgress, syncProgress } from "@/lib/academy/progressSync";
import { logActivity } from "@/lib/academy/activity";
import { getDialogue } from "@/content/dialogues";
import { quizWriting, saveQuizParts } from "@/lib/academy/quizExtras";
import { useEffect, useState } from "react";

export default function QuizPage() {
  const router = useRouter();
  const params = useParams<{ lang: string; level: string; n: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);
  const lessonId = Number(params.n);

  const quiz = getQuiz(langSlug, level, lessonId);
  const curriculum = getLevelCurriculum(langSlug, level);
  const base = `/academia/${langSlug}/level/${level}`;

  const [checked, setChecked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [alreadyScore, setAlreadyScore] = useState<number | null>(null);

  // Active time on this page, shown to the administration.
  useActiveTime(unlocked && curriculum ? `${curriculum?.langCode}-${level}-quiz-${lessonId}` : null);

  useEffect(() => {
    let alive = true;
    const run = () => {
    if (!alive) return;
    try {
      const savedStudent = localStorage.getItem("loggedStudent");
      if (!savedStudent) {
        router.push("/login");
        return;
      }
      const parsed = JSON.parse(savedStudent);
      const enrollment = (parsed.enrollments || []).find(
        (e: any) => e.langCode === curriculum?.langCode && e.status === "Approved"
      );
      if (!enrollment) {
        router.push(`/login?program=${curriculum?.langCode ?? ""}`);
        return;
      }
      // A level is reachable once the administration has unlocked it for this student.
      if (level > allowedLevel(enrollment)) {
        router.push("/academia/dashboard");
        return;
      }
      const progress = getLevelProgress(langSlug, level);
      if (!isLessonUnlocked(progress, lessonId, enrollment.studyDays)) {
        router.push(base);
        return;
      }
      // Only a PASSED quiz is "already done"; a failed attempt can be taken again for real.
      setAlreadyScore(progress.completedQuizzes.includes(lessonId) ? progress.quizScores[lessonId] ?? null : null);
      setUnlocked(true);
    } catch (error) {
      console.error("Erreur lors de la vérification de la session :", error);
      router.push("/login");
    } finally {
      setChecked(true);
    }
    };
    // Bring in what the server knows first (other devices, a lesson opened by the administration).
    pullProgress(langSlug, curriculum?.langCode, level).then(run);
    return () => {
      alive = false;
    };
  }, [router, langSlug, level, lessonId, base, curriculum?.langCode]);

  if (!quiz || !curriculum) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <p>Quiz introuvable.</p>
      </main>
    );
  }

  if (!checked || !unlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-ink-soft">Checking access...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-surface-sunken text-ink selection:bg-red-600 selection:text-white">
      <main className="p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <Link
              href={base}
              className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface hover:bg-surface-alt px-4 py-2 rounded-xl border border-line transition shadow-lg"
            >
              ← Back to Level
            </Link>
          </div>

          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
            <span className="text-xs font-bold uppercase tracking-widest text-red-300 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/40">
              Assessment
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-red-50 mt-3">{quiz.title}</h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{quiz.subtitle}</p>
          </div>

          <QuizEngine
            quiz={quiz}
            alreadyScore={alreadyScore}
            langSlug={langSlug}
            dialogue={getDialogue(langSlug, level, lessonId) ?? undefined}
            writing={quizWriting(langSlug, curriculum, lessonId)}
            onSubmit={(score, parts) => {
              // Once the quiz is passed, later attempts are practice only and change nothing.
              const alreadyPassed = getLevelProgress(langSlug, level).completedQuizzes.includes(lessonId);
              if (alreadyPassed) return;
              const passed = score >= quiz.passingScore && (parts?.dialoguePassed ?? true);
              if (parts) saveQuizParts(langSlug, level, lessonId, parts);
              logActivity("quiz", `Quiz ${lessonId} : ${score}/${quiz.questions.length} — ${passed ? "réussi" : "échoué"} (${curriculum.langLabel}, niveau ${level})`, { langCode: curriculum.langCode, level, lessonId, score, total: quiz.questions.length, passed });
              const updated = recordQuizResult(langSlug, level, lessonId, score, quiz.passingScore, parts?.dialoguePassed ?? true);
              if (curriculum.langCode) syncProgress(curriculum.langCode, level, updated);
            }}
          />
        </div>
      </main>
    </div>
  );
}
