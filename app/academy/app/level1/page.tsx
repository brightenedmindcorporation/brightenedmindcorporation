"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Level1Page() {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [finalPassed, setFinalPassed] = useState(false);

  const progress = Math.round((completedQuizzes.length / 12) * 100);

  useEffect(() => {
    const savedStudent = localStorage.getItem("loggedStudent");

    if (!savedStudent) {
      router.push("/login");
      return;
    }

    const student = JSON.parse(savedStudent);

    if (student.level !== "Level 1") {
      router.push("/dashboard");
      return;
    }

    setAllowed(true);

    const quizzes: number[] = [];
    const lessons: number[] = [];

    for (let i = 1; i <= 12; i++) {
      const passed = localStorage.getItem(`quiz${i}Passed`);
      if (passed === "true") {
        quizzes.push(i);
      }

      const lessonDone = localStorage.getItem(`lesson${i}Completed`);
      if (lessonDone === "true") {
        lessons.push(i);
      }
    }

    setCompletedQuizzes(quizzes);
    setCompletedLessons(lessons);

    if (localStorage.getItem("level1FinalPassed") === "true") {
      setFinalPassed(true);
    }
  }, [router]);

  if (!allowed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-300">
        <p className="text-lg font-semibold animate-pulse">Checking access...</p>
      </main>
    );
  }

  const lessons = [
    { id: 1, title: "Greetings and Introductions" },
    { id: 2, title: "The Alphabet and Pronunciation" },
    { id: 3, title: "Numbers and Personal Information" },
    { id: 4, title: "Family and Relationships" },
    { id: 5, title: "Everyday Objects" },
    { id: 6, title: "Colors and Descriptions" },
    { id: 7, title: "Days, Months, and Dates" },
    { id: 8, title: "Daily Routines" },
    { id: 9, title: "Food and Drinks" },
    { id: 10, title: "Places in Town" },
    { id: 11, title: "Hobbies and Interests" },
    { id: 12, title: "Final Review and Real-Life Conversation" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white">
      {/* Navbar réutilisable */}
      <Navbar />

      <main className="p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          
          {/* BOUTON RETOUR AU DASHBOARD */}
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl border border-neutral-800 transition shadow-lg"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Bannière du Niveau - Rouge & Noir */}
          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-red-50">
              Level 1 - Beginner English
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">
              Master the essentials step by step.
            </p>
          </div>

          {/* Progression globale du cours */}
          <div className="bg-neutral-900/90 backdrop-blur rounded-3xl shadow-xl border border-neutral-800 p-8 mt-8">
            <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
              <span>📈</span> Course Progress
            </h2>

            <div className="w-full bg-neutral-950 rounded-full h-7 overflow-hidden border border-neutral-800 p-1">
              <div
                className="bg-red-600 h-full rounded-full flex items-center justify-center text-white text-xs font-black transition-all duration-500 shadow-lg shadow-red-900/50"
                style={{ width: `${progress}%` }}
              >
                {progress > 5 && `${progress}%`}
              </div>
            </div>

            <p className="mt-4 text-neutral-400 font-medium text-sm">
              <span className="text-red-500 font-bold">{completedQuizzes.length}</span> / 12 quizzes completed
            </p>
          </div>

          {/* Grille des leçons et quiz */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {lessons.map((lesson) => {
              const lessonUnlocked =
                lesson.id === 1 || completedQuizzes.includes(lesson.id - 1);

              const quizUnlocked = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className="bg-neutral-900 rounded-3xl p-6 shadow-xl border border-neutral-800/80 hover:border-red-950 transition duration-300 flex flex-col justify-between"
                >
                  <h2 className="text-xl font-bold text-white">
                    <span className="text-red-500">Lesson {lesson.id} :</span> {lesson.title}
                  </h2>

                  <div className="flex gap-3 mt-6 flex-wrap">
                    {/* Bouton Leçon */}
                    {lessonUnlocked ? (
                      <Link href={`/level1/lesson${lesson.id}`}>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-red-900/40">
                          📘 Lesson
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="bg-neutral-800 text-neutral-500 px-5 py-3 rounded-xl font-medium cursor-not-allowed border border-neutral-800"
                      >
                        🔒 Locked
                      </button>
                    )}

                    {/* Bouton Quiz */}
                    {quizUnlocked ? (
                      <Link href={`/level1/quiz${lesson.id}`}>
                        <button className="bg-neutral-100 hover:bg-white text-black font-bold px-5 py-3 rounded-xl transition-all shadow-md">
                          📝 Quiz
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="bg-neutral-800 text-neutral-500 px-5 py-3 rounded-xl font-medium cursor-not-allowed border border-neutral-800"
                      >
                        🔒 Quiz Locked
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section d'achèvement et certificat */}
          <div className="bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-800 p-8 mt-10">
            <h2 className="text-2xl font-bold text-center text-white mb-6">
              🎓 Level Completion
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Quiz Final */}
              {progress === 100 ? (
                <Link href="/level1/final-quiz" className="w-full">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl w-full font-bold transition-all shadow-lg hover:shadow-red-950/60">
                    🎓 Final Quiz
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="bg-neutral-800 text-neutral-500 px-8 py-4 rounded-2xl w-full cursor-not-allowed font-bold border border-neutral-800"
                >
                  🔒 Complete 100% Course First
                </button>
              )}

              {/* Demande de certificat */}
              {finalPassed ? (
                <Link href="/level1/request-certificate" className="w-full">
                  <button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-2xl w-full font-bold transition-all shadow-lg">
                    🏆 Request Certificate
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="bg-neutral-800 text-neutral-500 px-8 py-4 rounded-2xl w-full cursor-not-allowed font-bold border border-neutral-800"
                >
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