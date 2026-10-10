"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getLevelCurriculum } from "@/content/curriculum";
import QuizEngine from "@/components/academy/QuizEngine";
import { getLevelProgress, recordFinalQuizResult } from "@/lib/academy/progress";

export default function FinalQuizPage() {
  const params = useParams<{ lang: string; level: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);

  const curriculum = getLevelCurriculum(langSlug, level);
  const base = `/academy/${langSlug}/level/${level}`;

  const [alreadyScore] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    return getLevelProgress(langSlug, level).finalQuizScore;
  });

  if (!curriculum) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <p>Quiz final introuvable.</p>
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
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-red-50 mt-3">
              🎓 {curriculum.finalQuiz.title}
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{curriculum.finalQuiz.subtitle}</p>
          </div>

          <QuizEngine
            quiz={curriculum.finalQuiz}
            badge="Final Quiz"
            alreadyScore={alreadyScore}
            onSubmit={(score) => recordFinalQuizResult(langSlug, level, score, curriculum.finalQuiz.passingScore)}
          />
        </div>
      </main>
    </div>
  );
}
