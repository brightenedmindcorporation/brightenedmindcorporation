"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PenLine } from "lucide-react";
import { getLesson, getLevelCurriculum } from "@/content/curriculum";
import LessonRenderer from "@/components/academy/LessonRenderer";
import { getLevelProgress, isLessonUnlocked } from "@/lib/academy/progress";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams<{ lang: string; level: string; n: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);
  const lessonId = Number(params.n);
  const base = `/academy/${langSlug}/level/${level}`;

  const [checked, setChecked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const lesson = getLesson(langSlug, level, lessonId);
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
        router.push(`/login?program=${curriculum?.langCode ?? ""}`);
        return;
      }
      const progress = getLevelProgress(langSlug, level);
      if (!isLessonUnlocked(progress, lessonId, enrollment.studyDays)) {
        router.push(base);
        return;
      }
      setUnlocked(true);
    } catch (error) {
      console.error("Erreur lors de la vérification de la session :", error);
      router.push("/login");
    } finally {
      setChecked(true);
    }
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
              Lesson {lesson.id}: {lesson.title}
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{lesson.subtitle}</p>
          </div>

          <LessonRenderer lesson={lesson} langSlug={langSlug} />

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
