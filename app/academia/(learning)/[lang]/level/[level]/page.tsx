"use client";

import { useAccessGuard } from "@/lib/academy/useAccessGuard";
import { canAccessLevel } from "@/lib/academy/levelAccess";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Lock, TrendingUp, BookOpen, PenLine, GraduationCap, Trophy, Check, Play } from "lucide-react";
import AcademyHeader from "../../../components/AcademyHeader";
import { getLevelCurriculum, isOfficeProgram } from "@/content/curriculum";
import { refreshLoggedStudent } from "@/lib/academy/refreshEnrollments";
import { fetchLiveSession } from "@/lib/academy/fetchLiveSession";
import { pullProgress } from "@/lib/academy/progressSync";
import { getLevelProgress, isLessonUnlocked, getLessonUnlockDate, lessonsBehind, type LevelProgress } from "@/lib/academy/progress";
import { isSessionJoinable, isSessionOpenNow, type LiveSession } from "@/lib/academy/liveSessions";

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
  useAccessGuard(curriculum?.langCode, router);

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
        // La session active (ex. anglais) n'a pas cette langue (ex. français) :
        // on redemande une connexion spécifique à cette langue, plutôt que de
        // silencieusement renvoyer l'étudiant vers son ancien tableau de bord.
        router.push(`/login?program=${curriculum?.langCode ?? ""}`);
        return;
      }
      // A level is reachable from the one the student registered at, up to the highest the administration unlocked.
      if (!canAccessLevel(enrollment, level)) {
        router.push("/academia/dashboard");
        return;
      }
      setAllowed(true);
      setStudyDays(enrollment.studyDays);
      setProgress(getLevelProgress(langSlug, level));
      // Then bring in what the server knows (another device, a lesson opened by the administration).
      pullProgress(langSlug, curriculum?.langCode, level).then(() => setProgress(getLevelProgress(langSlug, level)));
      // The admin may have changed the study plan since login.
      refreshLoggedStudent().then((updated) => {
        const fresh = updated?.enrollments?.find((e: any) => e.langCode === curriculum?.langCode && e.status === "Approved");
        if (fresh) setStudyDays(fresh.studyDays);
      });
    } catch (error) {
      console.error("Erreur lors de la vérification de la session :", error);
      router.push("/login");
    }
  }, [router, langSlug, level, curriculum?.langCode]);

  useEffect(() => {
    if (!curriculum) return;
    fetchLiveSession(curriculum.langCode, level).then(setLiveSession);
  }, [curriculum, level]);

  if (!curriculum) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft text-center px-6">
        <div>
          <p className="text-2xl font-bold text-ink mb-2">Contenu bientôt disponible</p>
          <p className="text-ink-soft">Ce niveau n'est pas encore publié pour cette langue.</p>
          <Link href="/academia/dashboard" className="inline-block mt-6 text-red-500 hover:text-red-400 font-semibold">
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

  const completedQuizzes = lessonsBehind(progress);
  const progressPct = Math.round((completedQuizzes.length / curriculum.lessons.length) * 100);
  const base = `/academia/${langSlug}/level/${level}`;
  const isDone = (id: number) => progress.completedQuizzes.includes(id);
  const nextLesson = curriculum.lessons.find((l) => !isDone(l.id) && isLessonUnlocked(progress, l.id, studyDays)) ?? null;

  return (
    <div className="min-h-screen bg-surface-sunken text-ink selection:bg-red-600 selection:text-white">
      <AcademyHeader />

      <main className="p-6 md:p-10 pt-28 md:pt-28">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link
              href="/academia/dashboard"
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-ink-soft hover:text-ink bg-surface hover:bg-surface-alt px-4 rounded-xl border border-line transition shadow-lg"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-5 md:p-8 shadow-2xl border border-red-900/40 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-5xl font-black tracking-tight text-red-50">{curriculum.levelTitle}</h1>
              <p className="text-red-200/80 mt-2 text-sm md:text-base">{curriculum.levelSubtitle}</p>
            </div>
            {liveSession && (isSessionJoinable(liveSession) || isSessionOpenNow(liveSession)) ? (
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
                className="bg-black/20 border border-white/10 text-white/70 font-semibold px-5 min-h-[44px] rounded-xl flex items-center gap-2 cursor-not-allowed text-sm"
                title={liveSession ? "Le cours n'a pas encore commencé" : "Aucun cours en direct programmé pour ce niveau"}
              >
                <Lock size={13} className="inline -mt-0.5" />{" "}
                {liveSession
                  ? `Live : ${new Date(liveSession.scheduledAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}`
                  : "Aucun live programmé"}
              </div>
            )}
          </div>

          {nextLesson ? (
            <Link
              href={`${base}/lesson/${nextLesson.id}`}
              className="mt-6 flex items-center gap-4 glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white rounded-2xl p-5 shadow-xl transition"
            >
              <span className="w-12 h-12 rounded-full bg-white/15 inline-flex items-center justify-center shrink-0">
                <Play size={22} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-red-100">{completedQuizzes.length === 0 ? "Start here" : "Continue where you stopped"}</span>
                <span className="block text-lg font-black leading-snug">Lesson {nextLesson.id}: {nextLesson.title}</span>
              </span>
            </Link>
          ) : progressPct === 100 ? (
            <div role="status" className="mt-6 rounded-2xl border border-emerald-600/40 bg-emerald-500/10 p-5 font-bold text-ink">
              All lessons are done. Take the Final Quiz below to finish the level.
            </div>
          ) : null}

          {!isOfficeProgram(langSlug) && (
          <Link
            href={`${base}/vocabulary`}
            className="mt-4 flex items-center justify-between gap-4 bg-surface hover:bg-surface-alt rounded-2xl border border-line px-5 md:px-6 py-4 min-h-[64px] shadow-lg transition"
          >
            <span>
              <span className="block font-bold text-ink">
                {langSlug === "chinese" ? "Caractères chinois du niveau" : "Vocabulaire & prononciation du niveau"}
              </span>
              <span className="block text-sm text-ink-soft mt-0.5">
                {langSlug === "chinese"
                  ? "Tous les caractères et mots, avec pinyin, sens et audio."
                  : "Tous les mots et phrases avec leur phonétique et leur audio."}
              </span>
            </span>
            <span className="text-red-500 font-bold shrink-0">Ouvrir →</span>
          </Link>
          )}

          <div className="bg-surface/90 backdrop-blur rounded-3xl shadow-xl border border-line p-5 md:p-8 mt-6">
            <h2 className="text-xl md:text-2xl font-bold text-red-600 dark:text-red-300 mb-4 flex items-center gap-2">
              <TrendingUp size={20} aria-hidden="true" /> Course Progress
            </h2>
            <div
              className="w-full bg-surface-sunken rounded-full h-7 overflow-hidden border border-line p-1"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPct}
              aria-label="Course progress"
            >
              <div
                className="bg-red-600 h-full rounded-full flex items-center justify-center text-white text-xs font-black transition-all duration-500 shadow-lg shadow-red-900/50"
                style={{ width: `${progressPct}%` }}
              >
                {progressPct > 8 && `${progressPct}%`}
              </div>
            </div>
            <p className="mt-3 text-ink-soft font-medium">
              <span className="text-red-600 dark:text-red-300 font-bold">{completedQuizzes.length}</span> / {curriculum.lessons.length} quizzes completed · {progressPct}%
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4 md:gap-6">
            {curriculum.lessons.map((lesson) => {
              // Lesson N unlocks once Quiz (N-1) is passed AND the pacing cooldown for the student's chosen study track
              // has elapsed (see lib/academy/progress.ts). Quiz N unlocks together with its lesson.
              const unlocked = isLessonUnlocked(progress, lesson.id, studyDays);
              const unlockDate = !unlocked ? getLessonUnlockDate(progress, lesson.id, studyDays) : null;
              const done = isDone(lesson.id);
              const isNext = nextLesson?.id === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className={`rounded-3xl p-5 md:p-6 shadow-xl border transition duration-300 flex flex-col justify-between bg-surface ${isNext ? "border-red-600" : "border-line/80 hover:border-red-950"}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-10 h-10 rounded-full inline-flex items-center justify-center shrink-0 font-black ${
                        done ? "bg-emerald-600 text-white" : unlocked ? "bg-red-600/15 text-red-700 dark:text-red-300" : "bg-surface-alt text-ink-soft"
                      }`}
                    >
                      {done ? <Check size={20} aria-hidden="true" /> : unlocked ? lesson.id : <Lock size={16} aria-hidden="true" />}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-lg md:text-xl font-bold text-ink leading-snug">
                        <span className="text-red-600 dark:text-red-300">Lesson {lesson.id}:</span> {lesson.title}
                      </h2>
                      {/* The state is written in words, never only with a colour or an icon. */}
                      <p className="mt-1 text-sm font-semibold text-ink-soft">
                        {done ? "Done: quiz passed" : isNext ? "Next lesson" : unlocked ? "Available" : "Locked"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-5 flex-wrap items-center">
                    {unlocked ? (
                      <>
                        <Link href={`${base}/lesson/${lesson.id}`} className="flex-1 min-w-[120px]">
                          <button className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-5 min-h-[48px] w-full rounded-xl transition-all shadow-md hover:shadow-red-900/40 inline-flex items-center justify-center gap-2">
                            <BookOpen size={16} aria-hidden="true" /> {done ? "Review" : "Lesson"}
                          </button>
                        </Link>
                        <Link href={`${base}/quiz/${lesson.id}`} className="flex-1 min-w-[120px]">
                          <button className="bg-neutral-100 hover:bg-white text-black font-bold px-5 min-h-[48px] w-full rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2">
                            <PenLine size={16} aria-hidden="true" /> Quiz
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <button disabled className="bg-surface-alt text-ink-soft px-5 min-h-[48px] rounded-xl font-medium cursor-not-allowed border border-line inline-flex items-center gap-2">
                          <Lock size={14} aria-hidden="true" /> Locked
                        </button>
                        {!unlockDate && lesson.id > 1 && progress.quizScores[lesson.id - 1] !== undefined && !progress.completedQuizzes.includes(lesson.id - 1) && (
                          <p className="text-sm text-ink-soft">
                            Le quiz {lesson.id - 1} n&apos;a pas été réussi au premier essai : l&apos;administration décide de la suite.
                          </p>
                        )}
                        {unlockDate && (
                          <p className="text-sm text-ink-soft">
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

          <div className="bg-surface rounded-3xl shadow-2xl border border-line p-5 md:p-8 mt-10">
            <h2 className="text-2xl font-bold text-center text-ink mb-6 flex items-center justify-center gap-2"><GraduationCap size={24} /> Level Completion</h2>

            <div className="flex flex-col md:flex-row gap-4">
              {progressPct === 100 ? (
                <Link href={`${base}/final-quiz`} className="w-full">
                  <button className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-6 min-h-[56px] rounded-2xl w-full font-bold transition-all shadow-lg hover:shadow-red-950/60 inline-flex items-center justify-center gap-2">
                    <GraduationCap size={18} /> Final Quiz
                  </button>
                </Link>
              ) : (
                <button disabled className="bg-surface-alt text-ink-faint px-6 min-h-[56px] rounded-2xl w-full cursor-not-allowed font-bold border border-line inline-flex items-center justify-center gap-2">
                  <Lock size={16} /> Complete 100% Course First
                </button>
              )}

              {progress.finalQuizPassed ? (
                <Link href={`${base}/certificate`} className="w-full">
                  <button className="bg-amber-500 hover:bg-amber-600 text-black px-6 min-h-[56px] rounded-2xl w-full font-bold transition-all shadow-lg inline-flex items-center justify-center gap-2">
                    <Trophy size={18} /> Request Certificate
                  </button>
                </Link>
              ) : (
                <button disabled className="bg-surface-alt text-ink-faint px-6 min-h-[56px] rounded-2xl w-full cursor-not-allowed font-bold border border-line inline-flex items-center justify-center gap-2">
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
