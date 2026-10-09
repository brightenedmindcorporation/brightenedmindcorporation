"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AcademyHeader from "../../../components/AcademyHeader";
import { getLevelCurriculum } from "@/content/curriculum";
import { getLevelProgress, type LevelProgress } from "@/lib/academy/progress";

export default function LevelOverviewPage() {
  const router = useRouter();
  const params = useParams<{ lang: string; level: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);

  const [allowed, setAllowed] = useState(false);
  const [progress, setProgress] = useState<LevelProgress | null>(null);

  const curriculum = getLevelCurriculum(langSlug, level);

  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem("loggedStudent");
      if (!savedStudent) {
        router.push("/login");
        return;
      }
      setAllowed(true);
      setProgress(getLevelProgress(langSlug, level));
    } catch (error) {
      console.error("Erreur lors de la vérification de la session :", error);
      router.push("/login");
    }
  }, [router, langSlug, level]);

  if (!curriculum) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-300 text-center px-6">
        <div>
          <p className="text-2xl font-bold text-white mb-2">Contenu bientôt disponible</p>
          <p className="text-neutral-400">Ce niveau n'est pas encore publié pour cette langue.</p>
          <Link href="/academy/dashboard" className="inline-block mt-6 text-red-500 hover:text-red-400 font-semibold">
            ← Retour au dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (!allowed || !progress) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-neutral-400">Checking access...</p>
        </div>
      </main>
    );
  }

  const completedQuizzes = progress.completedQuizzes;
  const progressPct = Math.round((completedQuizzes.length / curriculum.lessons.length) * 100);
  const base = `/academy/${langSlug}/level/${level}`;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white">
      <AcademyHeader />

      <main className="p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link
              href="/academy/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl border border-neutral-800 transition shadow-lg"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-red-50">{curriculum.levelTitle}</h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{curriculum.levelSubtitle}</p>
          </div>

          <div className="bg-neutral-900/90 backdrop-blur rounded-3xl shadow-xl border border-neutral-800 p-8 mt-8">
            <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
              <span>📈</span> Course Progress
            </h2>
            <div className="w-full bg-neutral-950 rounded-full h-7 overflow-hidden border border-neutral-800 p-1">
              <div
                className="bg-red-600 h-full rounded-full flex items-center justify-center text-white text-xs font-black transition-all duration-500 shadow-lg shadow-red-900/50"
                style={{ width: `${progressPct}%` }}
              >
                {progressPct > 5 && `${progressPct}%`}
              </div>
            </div>
            <p className="mt-4 text-neutral-400 font-medium text-sm">
              <span className="text-red-500 font-bold">{completedQuizzes.length}</span> / {curriculum.lessons.length} quizzes completed
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {curriculum.lessons.map((lesson) => {
              // Lesson N unlocks once Quiz (N-1) is passed; Quiz N unlocks
              // together with its lesson (the original app gated quizzes
              // behind a separate "lesson completed" flag that nothing
              // ever set for lesson 1, permanently locking quiz 1 — see
              // content/curriculum/english/level1.ts's header comment).
              const unlocked = lesson.id === 1 || completedQuizzes.includes(lesson.id - 1);

              return (
                <div
                  key={lesson.id}
                  className="bg-neutral-900 rounded-3xl p-6 shadow-xl border border-neutral-800/80 hover:border-red-950 transition duration-300 flex flex-col justify-between"
                >
                  <h2 className="text-xl font-bold text-white">
                    <span className="text-red-500">Lesson {lesson.id} :</span> {lesson.title}
                  </h2>

                  <div className="flex gap-3 mt-6 flex-wrap">
                    {unlocked ? (
                      <>
                        <Link href={`${base}/lesson/${lesson.id}`}>
                          <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-red-900/40">
                            📘 Lesson
                          </button>
                        </Link>
                        <Link href={`${base}/quiz/${lesson.id}`}>
                          <button className="bg-neutral-100 hover:bg-white text-black font-bold px-5 py-3 rounded-xl transition-all shadow-md">
                            📝 Quiz
                          </button>
                        </Link>
                      </>
                    ) : (
                      <button disabled className="bg-neutral-800 text-neutral-500 px-5 py-3 rounded-xl font-medium cursor-not-allowed border border-neutral-800">
                        🔒 Locked
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-800 p-8 mt-10">
            <h2 className="text-2xl font-bold text-center text-white mb-6">🎓 Level Completion</h2>

            <div className="flex flex-col md:flex-row gap-4">
              {progressPct === 100 ? (
                <Link href={`${base}/final-quiz`} className="w-full">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl w-full font-bold transition-all shadow-lg hover:shadow-red-950/60">
                    🎓 Final Quiz
                  </button>
                </Link>
              ) : (
                <button disabled className="bg-neutral-800 text-neutral-500 px-8 py-4 rounded-2xl w-full cursor-not-allowed font-bold border border-neutral-800">
                  🔒 Complete 100% Course First
                </button>
              )}

              {progress.finalQuizPassed ? (
                <Link href={`${base}/certificate`} className="w-full">
                  <button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-2xl w-full font-bold transition-all shadow-lg">
                    🏆 Request Certificate
                  </button>
                </Link>
              ) : (
                <button disabled className="bg-neutral-800 text-neutral-500 px-8 py-4 rounded-2xl w-full cursor-not-allowed font-bold border border-neutral-800">
                  🔒 Pass Final Quiz First
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
