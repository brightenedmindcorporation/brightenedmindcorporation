"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Level2Page() {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);

  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const progress = Math.round((completedQuizzes.length / 12) * 100);

  useEffect(() => {
    const savedStudent = localStorage.getItem("loggedStudent");

    if (!savedStudent) {
      router.push("/login");
      return;
    }

    const student = JSON.parse(savedStudent);

    if (student.level !== "Level 2") {
      router.push("/dashboard");
      return;
    }

    setAllowed(true);

    const quizzes: number[] = [];
    const lessons: number[] = [];

    for (let i = 1; i <= 12; i++) {
      const passed = localStorage.getItem(`quiz2_${i}Passed`);
      if (passed === "true") quizzes.push(i);

      const lessonDone = localStorage.getItem(`lesson2_${i}Completed`);
      if (lessonDone === "true") lessons.push(i);
    }

    setCompletedQuizzes(quizzes);
    setCompletedLessons(lessons);
  }, [router]);

  if (!allowed) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Checking access...
      </main>
    );
  }

  const lessons = [
    { id: 1, title: "Intermediate Grammar" },
    { id: 2, title: "Past & Future Tenses" },
    { id: 3, title: "Conversation Practice" },
    { id: 4, title: "Writing Skills" },
    { id: 5, title: "Listening Skills" },
    { id: 6, title: "Reading Comprehension" },
    { id: 7, title: "Vocabulary Expansion" },
    { id: 8, title: "Pronunciation Mastery" },
    { id: 9, title: "Situational English" },
    { id: 10, title: "Business English Basics" },
    { id: 11, title: "Debates & Arguments" },
    { id: 12, title: "Final Assessment" },
  ];

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="bg-red-800 text-white rounded-3xl p-8">
          <h1 className="text-4xl font-bold">
            Level 2 - Intermediate English
          </h1>
        </div>

        {/* PROGRESS */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10 mb-10">
          <h2 className="text-3xl font-bold text-red-800 mb-5">
            📈 Course Progress
          </h2>

          <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden">
            <div
              className="bg-green-600 h-8 flex items-center justify-center text-white font-bold"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>

          <p className="mt-4 text-gray-700 font-semibold">
            {completedQuizzes.length}/12 quizzes completed
          </p>
        </div>

        {/* LESSONS */}
        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((lesson) => {
            const lessonUnlocked =
              lesson.id === 1 ||
              completedQuizzes.includes(lesson.id - 1);

            const quizUnlocked = completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className="bg-white p-6 rounded-3xl shadow-lg"
              >
                <h2 className="text-2xl font-bold text-red-700">
                  Lesson {lesson.id}: {lesson.title}
                </h2>

                <div className="flex gap-3 mt-5">
                  {lessonUnlocked ? (
                    <Link href={`/level2/lesson${lesson.id}`}>
                      <button className="bg-blue-700 text-white px-5 py-3 rounded-xl">
                        📘 Lesson
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="bg-gray-400 px-5 py-3 rounded-xl">
                      🔒 Locked
                    </button>
                  )}

                  {quizUnlocked ? (
                    <Link href={`/level2/quiz${lesson.id}`}>
                      <button className="bg-green-700 text-white px-5 py-3 rounded-xl">
                        📝 Quiz
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="bg-gray-400 px-5 py-3 rounded-xl">
                      🔒 Quiz Locked
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}