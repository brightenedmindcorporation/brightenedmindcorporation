"use client";

import { useActiveTime } from "@/lib/academy/useActiveTime";
import { canAccessLevel } from "@/lib/academy/levelAccess";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PenLine } from "lucide-react";
import { getLesson, getLevelCurriculum } from "@/content/curriculum";
import LessonRenderer from "@/components/academy/LessonRenderer";
import { frenchFor } from "@/content/translations";
import { isOfficeProgram } from "@/content/curriculum";
import { useFrenchVisible } from "@/lib/academy/frenchHelp";
import { getLevelProgress, isLessonUnlocked, markLessonStudied } from "@/lib/academy/progress";
import { pullProgress, syncProgress } from "@/lib/academy/progressSync";
import { logActivity } from "@/lib/academy/activity";

export default function LessonPage() {
  const [showFr] = useFrenchVisible();
  const router = useRouter();
  const params = useParams<{ lang: string; level: string; n: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);
  const lessonId = Number(params.n);
  const base = `/academia/${langSlug}/level/${level}`;

  const [checked, setChecked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const lesson = getLesson(langSlug, level, lessonId);
  const curriculum = getLevelCurriculum(langSlug, level);

  // Active time on this page, shown to the administration.
  useActiveTime(unlocked && curriculum ? `${curriculum?.langCode}-${level}-lesson-${lessonId}` : null);

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
      // A level is reachable from the one the student registered at, up to the highest the administration unlocked.
      if (!canAccessLevel(enrollment, level)) {
        router.push("/academia/dashboard");
        return;
      }
      const progress = getLevelProgress(langSlug, level);
      if (!isLessonUnlocked(progress, lessonId, enrollment.studyDays)) {
        router.push(base);
        return;
      }
      setUnlocked(true);
      // Count the lesson as studied (visible to the teacher and the admin).
      const updated = markLessonStudied(langSlug, level, lessonId);
      if (updated && curriculum?.langCode) syncProgress(curriculum.langCode, level, updated);
      logActivity("lesson_open", `Leçon ${lessonId} : ${lesson?.title ?? ""} (${curriculum?.langLabel ?? langSlug}, niveau ${level})`, { langCode: curriculum?.langCode, level, lessonId });
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

  if (!lesson) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <p>Leçon introuvable.</p>
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
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <Link
              href={base}
              className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface hover:bg-surface-alt px-4 py-2 rounded-xl border border-line transition shadow-lg"
            >
              ← Back to Level
            </Link>
          </div>

          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-red-50">
              {isOfficeProgram(langSlug) ? "Leçon" : "Lesson"} {lesson.id}{isOfficeProgram(langSlug) ? " :" : ":"} {lesson.title}
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{lesson.subtitle}</p>
            {showFr && frenchFor(langSlug, lesson.title) && (
              <p lang="fr" className="text-red-200/70 mt-3 text-sm italic">
                {frenchFor(langSlug, lesson.title)}
                {frenchFor(langSlug, lesson.subtitle) ? ` — ${frenchFor(langSlug, lesson.subtitle)}` : ""}
              </p>
            )}
          </div>

          <LessonRenderer lesson={lesson} langSlug={langSlug} statsKey={curriculum ? `${curriculum.langCode}-${level}-${lessonId}` : undefined} />

          <div className="text-center pt-4 pb-10">
            <Link href={`${base}/quiz/${lesson.id}`}>
              <button className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold text-lg px-10 py-4 rounded-2xl transition shadow-xl shadow-red-950/60 inline-flex items-center gap-2">
                <PenLine size={18} /> Take Quiz
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
