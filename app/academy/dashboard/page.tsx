"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";

interface StudentData {
  name?: string;
  email?: string;
  matricule?: string;
  level?: string;
  status?: string;
  completedQuizzes?: number;
  totalQuizzes?: number;
}

export default function Dashboard() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [lastLesson, setLastLesson] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Vérification côté client pour éviter l'erreur d'hydratation SSR
    const data = localStorage.getItem("loggedStudent");

    if (!data) {
      router.replace("/login");
      return;
    }

    try {
      const parsedStudent: StudentData = JSON.parse(data);
      setStudent(parsedStudent);

      // Calcul de la dernière leçon accessible
      let completedCount = 0;
      let currentLesson = 1;

      for (let i = 1; i <= 12; i++) {
        if (localStorage.getItem(`quiz${i}Passed`) === "true") {
          completedCount++;
          currentLesson = Math.min(i + 1, 12);
        } else {
          break;
        }
      }

      setLastLesson(currentLesson);

      if (parsedStudent.completedQuizzes === undefined) {
        setStudent((prev) => (prev ? { ...prev, completedQuizzes: completedCount } : null));
      }
    } catch (e) {
      console.error("Erreur de lecture des données utilisateur :", e);
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading || !student) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-400 font-medium">
        Redirecting...
      </main>
    );
  }

  const fullName = student.name || "Student";
  const completedQuizzes = student.completedQuizzes ?? 0;
  const totalQuizzes = student.totalQuizzes ?? 12;
  const progressPercentage =
    totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;

  const handleContinue = () => {
    const currentLevel = student.level || "Level 1";
    if (currentLevel === "Level 1") router.push(`/level1/lesson${lastLesson}`);
    else if (currentLevel === "Level 2") router.push("/level2");
    else if (currentLevel === "Level 3") router.push("/level3");
    else router.push("/level1");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-8">
        
        {/* CARTE DE BIENVENUE AVEC LOGO & THEME ROUGE/NOIR */}
        <div className="bg-neutral-900 rounded-3xl border border-neutral-800 p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            
            {/* Header avec Logo + Titre */}
            <div className="flex items-center gap-5">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 p-0.5 shadow-lg shadow-red-950/50 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/logo.png"
                  alt="Brightened Mind Academy Logo"
                  width={56}
                  height={56}
                  className="object-cover rounded-[14px]"
                  priority
                  unoptimized // 👈 Résout l'erreur 'output: export'
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                  Welcome back, {fullName} 👋
                </h1>
                <p className="text-neutral-400 text-sm mt-1">
                  Ready to boost your English skills today at <span className="text-red-500 font-semibold">Brightened Mind Academy</span>?
                </p>
              </div>
            </div>

            {/* Bouton d'action rapide */}
            <button
              onClick={handleContinue}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-red-950/60 transition transform active:scale-95 flex items-center justify-center gap-2 shrink-0"
            >
              <span>▶ Continue Lesson {lastLesson}</span>
            </button>
          </div>

          {/* BARRE DE PROGRESSION */}
          <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-neutral-300">
                Course Progress ({student.level || "Level 1"})
              </span>
              <span className="text-sm font-extrabold text-red-500">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-neutral-400 mt-2 font-medium">
              {completedQuizzes} / {totalQuizzes} quizzes completed
            </p>
          </div>

          {/* MINI-CARTES INFOS ÉTUDIANT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-950/60 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
                Email
              </span>
              <p className="text-sm font-semibold text-neutral-200 mt-1 truncate">
                {student.email || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-neutral-950/60 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
                Matricule
              </span>
              <p className="text-sm font-semibold text-neutral-200 mt-1">
                {student.matricule || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-neutral-950/60 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
                Current Level
              </span>
              <p className="text-sm font-semibold text-red-500 mt-1">
                {student.level || "Level 1"}
              </p>
            </div>

            <div className="p-4 bg-neutral-950/60 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
                Status
              </span>
              <p className="text-sm font-semibold text-emerald-400 mt-1 capitalize">
                {student.status || "Active"}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION NIVEAUX / COURS */}
        <div>
          <h2 className="text-xl font-black text-white mb-4">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Level 1 */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-xl flex flex-col justify-between hover:border-red-900/60 transition">
              <div>
                <span className="text-xs font-bold text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/40">
                  Beginner
                </span>
                <h3 className="text-lg font-bold text-white mt-3">Level 1</h3>
                <p className="text-neutral-400 text-xs mt-1">
                  Basics, everyday vocabulary, and simple conversation.
                </p>
              </div>
              <button
                onClick={() => router.push("/level1")}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg shadow-red-950/40"
              >
                Open Level 1
              </button>
            </div>

            {/* Level 2 */}
            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800/80 shadow-xl flex flex-col justify-between opacity-80">
              <div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/40">
                  Intermediate
                </span>
                <h3 className="text-lg font-bold text-white mt-3">Level 2</h3>
                <p className="text-neutral-400 text-xs mt-1">
                  Grammar expansion, listening comprehension, and writing.
                </p>
              </div>
              <button
                onClick={() => {
                  if (student.level === "Level 2" || student.level === "Level 3") {
                    router.push("/level2");
                  }
                }}
                disabled={student.level === "Level 1"}
                className={`mt-6 w-full py-2.5 rounded-xl text-sm font-bold transition ${
                  student.level === "Level 1"
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-800"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
                }`}
              >
                {student.level === "Level 1" ? "🔒 Locked" : "Open Level 2"}
              </button>
            </div>

            {/* Level 3 */}
            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800/80 shadow-xl flex flex-col justify-between opacity-80">
              <div>
                <span className="text-xs font-bold text-purple-400 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800/40">
                  Business English
                </span>
                <h3 className="text-lg font-bold text-white mt-3">Level 3</h3>
                <p className="text-neutral-400 text-xs mt-1">
                  Professional communication, emails, and job interviews.
                </p>
              </div>
              <button
                onClick={() => {
                  if (student.level === "Level 3") router.push("/level3");
                }}
                disabled={student.level !== "Level 3"}
                className={`mt-6 w-full py-2.5 rounded-xl text-sm font-bold transition ${
                  student.level !== "Level 3"
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-800"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {student.level !== "Level 3" ? "🔒 Locked" : "Open Level 3"}
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}