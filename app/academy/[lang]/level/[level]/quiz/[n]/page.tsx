"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getQuiz, getLevelCurriculum } from "@/content/curriculum";
import QuizEngine from "@/components/academy/QuizEngine";
import { getLevelProgress, recordQuizResult } from "@/lib/academy/progress";
import { useState } from "react";

export default function QuizPage() {
  const params = useParams<{ lang: string; level: string; n: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);
  const lessonId = Number(params.n);

  const quiz = getQuiz(langSlug, level, lessonId);
  const curriculum = getLevelCurriculum(langSlug, level);
  const base = `/academy/${langSlug}/level/${level}`;

  const [alreadyScore] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    return getLevelProgress(langSlug, level).quizScores[lessonId] ?? null;
  });

  if (!quiz || !curriculum) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-300">
        <p>Quiz introuvable.</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white">
      <main className="p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <Link
              href={base}
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl border border-neutral-800 transition shadow-lg"
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
            onSubmit={(score) => recordQuizResult(langSlug, level, lessonId, score, quiz.passingScore)}
          />
        </div>
      </main>
    </div>
  );
}
