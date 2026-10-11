"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Lock, TrendingUp, BookOpen, PenLine, GraduationCap, Trophy } from "lucide-react";
import AcademyHeader from "../../../components/AcademyHeader";
import { getLevelCurriculum } from "@/content/curriculum";
import { getLevelProgress, isLessonUnlocked, getLessonUnlockDate, type LevelProgress } from "@/lib/academy/progress";
import { isSessionJoinable, type LiveSession } from "@/lib/academy/liveSessions";

export default function LevelOverviewPage() {
  const router = useRouter();
  const params = useParams<{ lang: string; level: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);

  const [allowed, setAllowed] = useState(false);
  const [progress, setProgress] = useState<LevelProgress | null>(null);
  const [liveSession, setLiveSession] = useState<LiveSession | null>(null);
  const [studyDays, setStudyDays] = useState<number | undefined>(undefined);

  const curriculum = getLevelCurriculum(langSlug, level);

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
        router.push("/academy/dashboard");
        return;
      }
      setAllowed(true);
      setStudyDays(enrollment.studyDays);
      setProgress(getLevelProgress(langSlug, level));
    } catch (error) {
      console.error("Erreur lors de la vérification de la session :", error);
      router.push("/login");
    }
  }, [router, langSlug, level, curriculum?.langCode]);

  useEffect(() => {
    if (!curriculum) return;
    fetch(`/api/live-sessions?langCode=${curriculum.langCode}&level=${level}`)
      .then((res) => res.json())
      .then((data) => setLiveSession(data.session ?? null))
      .catch(() => setLiveSession(null));
  }, [curriculum, level]);

  if (!curriculum) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft text-center px-6">
        <div>
          <p className="text-2xl font-bold text-ink mb-2">Contenu bientôt disponible</p>
          <p className="text-ink-soft">Ce niveau n'est pas encore publié pour cette langue.</p>
          <Link href="/academy/dashboard" className="inline-block mt-6 text-red-500 hover:text-red-400 font-semibold">
            ← Retour au dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (!allowed || !progress) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-ink-soft">Checking access...</p>
        </div>
      </main>
    );
  }

  const completedQuizzes = progress.completedQuizzes;
  const progressPct = Math.round((completedQuizzes.length / curriculum.lessons.length) * 100);
  const base = `/academy/${langSlug}/level/${level}`;

  return (
    <div className="min-h-screen bg-surface-sunken text-ink selection:bg-red-600 selection:text-white">
      <AcademyHeader />

      <main className="p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link
              href="/academy/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface hover:bg-surface-alt px-4 py-2 rounded-xl border border-line transition shadow-lg"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-ink rounded-3xl p-8 shadow-2xl border border-red-900/40 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-red-50">{curriculum.levelTitle}</h1>
              <p className="text-red-200/80 mt-2 text-sm md:text-base">{curriculum.levelSubtitle}</p>
            </div>
            {liveSession && isSessionJoinable(liveSession) ? (
              <Link href={`${base}/live`}>
                <button className="bg-black/40 hover:bg-black/60 border border-red-400/40 text-white font-bold px-5 py-3 rounded-xl transition flex items-center gap-2 whitespace-nowrap">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  Live Class — En direct
                </button>
              </Link>
            ) : (
              <div
                className="bg-black/20 border border-white/10 text-white/60 font-semibold px-5 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap cursor-not-allowed"
                title={liveSession ? "Le cours n'a pas encore commencé" : "Aucun cours en direct programmé pour ce niveau"}
              >
                <Lock size={13} className="inline -mt-0.5" />{" "}
                {liveSession
                  ? `Live : ${new Date(liveSession.scheduledAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}`
                  : "Aucun live programmé"}
              </div>
            )}
          </div>

          <div className="bg-surface/90 backdrop-blur rounded-3xl shadow-xl border border-line p-8 mt-8">
            <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
<TrendingUp size={20} /> Course Progress
            </h2>
            <div className="w-full bg-surface-sunken rounded-full h-7 overflow-hidden border border-line p-1">
              <div
                className="bg-red-600 h-full rounded-full flex items-center justify-center text-white text-xs font-black transition-all duration-500 shadow-lg shadow-red-900/50"
                style={{ width: `${progressPct}%` }}
              >
                {progressPct > 5 && `${progressPct}%`}
              </div>
            </div>
            <p className="mt-4 text-ink-soft font-medium text-sm">
              <span className="text-red-500 font-bold">{completedQuizzes.length}</span> / {curriculum.lessons.length} quizzes completed
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {curriculum.lessons.map((lesson) => {
              // Lesson N unlocks once Quiz (N-1) is passed AND the pacing
              // cooldown for the student's chosen study track has elapsed
              // (see lib/academy/progress.ts). Quiz N unlocks together with
              // its lesson (the original app gated quizzes behind a
              // separate "lesson completed" flag that nothing ever set for
              // lesson 1, permanently locking quiz 1 — see
              // content/curriculum/english/level1.ts's header comment).
              const unlocked = isLessonUnlocked(progress, lesson.id, studyDays);
              const unlockDate = !unlocked ? getLessonUnlockDate(progress, lesson.id, studyDays) : null;

              return (
                <div
                  key={lesson.id}
                  className="bg-surface rounded-3xl p-6 shadow-xl border border-line/80 hover:border-red-950 transition duration-300 flex flex-col justify-between"
                >
                  <h2 className="text-xl font-bold text-ink">
                    <span className="text-red-500">Lesson {lesson.id} :</span> {lesson.title}
                  </h2>

                  <div className="flex gap-3 mt-6 flex-wrap items-center">
                    {unlocked ? (
                      <>
                        <Link href={`${base}/lesson/${lesson.id}`}>
                          <button className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-red-900/40 inline-flex items-center gap-2">
                            <BookOpen size={16} /> Lesson
                          </button>
                        </Link>
                        <Link href={`${base}/quiz/${lesson.id}`}>
                          <button className="bg-neutral-100 hover:bg-white text-black font-bold px-5 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2">
                            <PenLine size={16} /> Quiz
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <button disabled className="bg-surface-alt text-ink-faint px-5 py-3 rounded-xl font-medium cursor-not-allowed border border-line inline-flex items-center gap-2">
                          <Lock size={14} /> Locked
                        </button>
                        {unlockDate && (
                          <p className="text-xs text-ink-faint">
                            Disponible le {unlockDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-surface rounded-3xl shadow-2xl border border-line p-8 mt-10">
            <h2 className="text-2xl font-bold text-center text-ink mb-6 flex items-center justify-center gap-2"><GraduationCap size={24} /> Level Completion</h2>

            <div className="flex flex-col md:flex-row gap-4">
              {progressPct === 100 ? (
                <Link href={`${base}/final-quiz`} className="w-full">
                  <button className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-8 py-4 rounded-2xl w-full font-bold transition-all shadow-lg hover:shadow-red-950/60 inline-flex items-center justify-center gap-2">
                    <GraduationCap size={18} /> Final Quiz
                  </button>
                </Link>
              ) : (
                <button disabled className="bg-surface-alt text-ink-faint px-8 py-4 rounded-2xl w-full cursor-not-allowed font-bold border border-line inline-flex items-center justify-center gap-2">
                  <Lock size={16} /> Complete 100% Course First
                </button>
              )}

              {progress.finalQuizPassed ? (
                <Link href={`${base}/certificate`} className="w-full">
                  <button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-2xl w-full font-bold transition-all shadow-lg inline-flex items-center justify-center gap-2">
                    <Trophy size={18} /> Request Certificate
                  </button>
                </Link>
              ) : (
                <button disabled className="bg-surface-alt text-ink-faint px-8 py-4 rounded-2xl w-full cursor-not-allowed font-bold border border-line inline-flex items-center justify-center gap-2">
                  <Lock size={16} /> Pass Final Quiz First
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
