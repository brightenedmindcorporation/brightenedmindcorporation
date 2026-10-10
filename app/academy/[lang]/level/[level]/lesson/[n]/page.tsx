"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getLesson } from "@/content/curriculum";
import LessonRenderer from "@/components/academy/LessonRenderer";

export default function LessonPage() {
  const params = useParams<{ lang: string; level: string; n: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);
  const lessonId = Number(params.n);

  const lesson = getLesson(langSlug, level, lessonId);
  const base = `/academy/${langSlug}/level/${level}`;

  if (!lesson) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-300">
        <p>Leçon introuvable.</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white">
      <main className="p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <Link
              href={base}
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl border border-neutral-800 transition shadow-lg"
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
              <button className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold text-lg px-10 py-4 rounded-2xl transition shadow-xl shadow-red-950/60">
                📝 Take Quiz
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
