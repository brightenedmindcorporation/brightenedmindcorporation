"use client";

import { allowedLevel } from "@/lib/academy/levelAccess";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { getLevelCurriculum } from "@/content/curriculum";
import QuizEngine from "@/components/academy/QuizEngine";
import { getLevelProgress, recordFinalQuizResult } from "@/lib/academy/progress";
import { syncProgress } from "@/lib/academy/progressSync";
import { logActivity } from "@/lib/academy/activity";
import { getDialogue } from "@/content/dialogues";
import { quizWriting, saveQuizParts } from "@/lib/academy/quizExtras";

export default function FinalQuizPage() {
  const router = useRouter();
  const params = useParams<{ lang: string; level: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);

  const curriculum = getLevelCurriculum(langSlug, level);
  const base = `/academia/${langSlug}/level/${level}`;

  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [alreadyScore, setAlreadyScore] = useState<number | null>(null);

  useEffect(() => {
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
      const totalLessons = curriculum?.lessons.length ?? 0;
      const allLessonsDone = totalLessons > 0 && progress.completedQuizzes.length >= totalLessons;
      if (!allLessonsDone) {
        router.push(base);
        return;
      }

      setAlreadyScore(progress.finalQuizScore);
      setAllowed(true);
    } catch (error) {
      console.error("Erreur lors de la vérification de la session :", error);
      router.push("/login");
    } finally {
      setChecked(true);
    }
  }, [router, langSlug, level, base, curriculum?.langCode]);

  if (!curriculum) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <p>Quiz final introuvable.</p>
      </main>
    );
  }

  if (!checked || !allowed) {
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
              Final Assessment
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-red-50 mt-3 flex items-center gap-3">
              <GraduationCap size={38} /> {curriculum.finalQuiz.title}
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{curriculum.finalQuiz.subtitle}</p>
          </div>

          <QuizEngine
            quiz={curriculum.finalQuiz}
            badge="Final Quiz"
            alreadyScore={alreadyScore}
            langSlug={langSlug}
            dialogue={getDialogue(langSlug, level, "final") ?? undefined}
            writing={quizWriting(langSlug, curriculum, "final")}
            onSubmit={(score, parts) => {
              if (parts && alreadyScore === null) saveQuizParts(langSlug, level, "final", parts);
              if (alreadyScore === null) {
                const passed = score >= curriculum.finalQuiz.passingScore && (parts?.dialoguePassed ?? true);
                logActivity("final_quiz", `Quiz final du niveau ${level} : ${score}/${curriculum.finalQuiz.questions.length} — ${passed ? "réussi" : "échoué"} (${curriculum.langLabel})`, { langCode: curriculum.langCode, level, score, total: curriculum.finalQuiz.questions.length, passed });
              }
              const updated = recordFinalQuizResult(langSlug, level, score, curriculum.finalQuiz.passingScore, parts?.dialoguePassed ?? true);
              if (curriculum.langCode) syncProgress(curriculum.langCode, level, updated);
            }}
          />
        </div>
      </main>
    </div>
  );
}
