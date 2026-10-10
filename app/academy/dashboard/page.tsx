"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AcademyHeader from "../components/AcademyHeader";
import { getLevelCurriculum, availableLanguages } from "@/content/curriculum";
import { getLevelProgress } from "@/lib/academy/progress";
import { isSessionJoinable, type LiveSession } from "@/lib/academy/liveSessions";

interface StudentData {
  name?: string;
  email?: string;
  matricule?: string;
  level?: string;
  status?: string;
  langCode?: string;
  completedQuizzes?: number;
  totalQuizzes?: number;
}

// Registration stores langCode ("ZH", "PT", ...) while the curriculum/URLs
// key on the slug ("chinese", "portuguese", ...). Legacy accounts created
// before langCode existed fall back to English, which was the only
// language the platform had at the time.
function resolveLangSlug(langCode?: string): string {
  const match = availableLanguages.find((l) => l.code === langCode);
  return match?.slug ?? "english";
}

export default function Dashboard() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [lastLesson, setLastLesson] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [liveSession, setLiveSession] = useState<LiveSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("loggedStudent");

    if (!data) {
      router.replace("/login");
      return;
    }

    try {
      const parsedStudent: StudentData = JSON.parse(data);
      setStudent(parsedStudent);

      const langSlug = resolveLangSlug(parsedStudent.langCode);
      const level1 = getLevelCurriculum(langSlug, 1);
      const progress = getLevelProgress(langSlug, 1);
      const studentLevelNum = Number((parsedStudent.level || "Level 1").slice(-1)) || 1;
      const curriculumForLiveCheck = getLevelCurriculum(langSlug, studentLevelNum);
      if (curriculumForLiveCheck) {
        fetch(`/api/live-sessions?langCode=${curriculumForLiveCheck.langCode}&level=${studentLevelNum}`)
          .then((res) => res.json())
          .then((d) => setLiveSession(d.session ?? null))
          .catch(() => setLiveSession(null));
      }
      const totalLessons = level1?.lessons.length ?? 12;

      let completedCount = 0;
      let currentLesson = 1;

      for (let i = 1; i <= totalLessons; i++) {
        if (progress.completedQuizzes.includes(i)) {
          completedCount++;
          currentLesson = Math.min(i + 1, totalLessons);
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

  const handleLogout = () => {
    localStorage.removeItem("loggedStudent");
    router.replace("/login");
  };

  if (loading || !student) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft font-medium">
        Redirecting...
      </main>
    );
  }

  const fullName = student.name || "Student";
  const completedQuizzes = student.completedQuizzes ?? 0;
  const totalQuizzes = student.totalQuizzes ?? 12;
  const progressPercentage =
    totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;

  const langSlug = resolveLangSlug(student.langCode);
  const langInfo = availableLanguages.find((l) => l.slug === langSlug) ?? availableLanguages[0];

  const handleContinue = () => {
    const currentLevel = student.level || "Level 1";
    if (currentLevel === "Level 1") router.push(`/academy/${langSlug}/level/1/lesson/${lastLesson}`);
    else if (currentLevel === "Level 2") router.push(`/academy/${langSlug}/level/2`);
    else if (currentLevel === "Level 3") router.push(`/academy/${langSlug}/level/3`);
    else router.push(`/academy/${langSlug}/level/1`);
  };

  return (
    <div className="min-h-screen bg-surface-sunken text-ink flex flex-col selection:bg-red-600 selection:text-white">
      <AcademyHeader />

      {/* Main container décalé avec pt-28 pour ne pas passer sous la Navbar */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 pt-28 flex flex-col gap-8">
        
        {/* En-tête avec boutons Retour & Déconnexion */}
        <div className="flex justify-between items-center bg-surface/80 border border-line p-4 rounded-2xl backdrop-blur-md">
          <button 
            onClick={() => router.back()}
            className="px-4 py-2 bg-surface-alt hover:bg-surface text-ink text-sm font-semibold rounded-xl transition flex items-center gap-2"
          >
            ← Back / Retour
          </button>

          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-800/40 text-sm font-semibold rounded-xl transition"
          >
            Logout / Déconnexion
          </button>
        </div>

        {/* Carte de bienvenue */}
        <div className="bg-surface rounded-3xl border border-line p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 radial-fade pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative">
            <div className="flex items-center gap-5">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 p-0.5 shadow-lg shadow-red-950/50 flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-gold-600/30">
                <Image
                  src="/logo-bm.png"
                  alt="Brightened Mind Academy Logo"
                  width={56}
                  height={56}
                  className="object-cover rounded-[14px]"
                  priority
                  unoptimized
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ink">
                  Welcome back, {fullName} 👋
                </h1>
                <p className="text-ink-soft text-sm mt-1 font-sans">
                  Ready to continue your <span className="text-gold-400 font-semibold">{langInfo.label}</span> lessons today?
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              {liveSession && isSessionJoinable(liveSession) ? (
                <button
                  onClick={() => router.push(`/academy/${langSlug}/level/${(student.level || "Level 1").slice(-1)}/live`)}
                  className="border border-red-600/40 hover:border-red-500 text-red-400 hover:text-red-300 font-bold px-5 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  Live Class — En direct
                </button>
              ) : (
                <div
                  className="border border-line text-ink-faint font-semibold px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed text-sm"
                  title={liveSession ? "Le cours n'a pas encore commencé" : "Aucun cours en direct programmé"}
                >
                  🔒{" "}
                  {liveSession
                    ? new Date(liveSession.scheduledAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })
                    : "Pas de live programmé"}
                </div>
              )}

              <button
                onClick={handleContinue}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-6 py-3.5 rounded-xl transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>▶ Continue Lesson {lastLesson}</span>
              </button>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="bg-surface-sunken/80 border border-line rounded-2xl p-5 mb-6 relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-ink-soft font-sans">
                Course Progress ({student.level || "Level 1"})
              </span>
              <span className="text-sm font-extrabold text-gold-400">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-surface-alt rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 to-gold-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-ink-soft mt-2 font-medium">
              {completedQuizzes} / {totalQuizzes} quizzes completed
            </p>
          </div>

          {/* Infos étudiant */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
              <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">
                Email
              </span>
              <p className="text-sm font-semibold text-ink mt-1 truncate">
                {student.email || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
              <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">
                Matricule
              </span>
              <p className="text-sm font-semibold text-ink mt-1">
                {student.matricule || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
              <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">
                Current Level
              </span>
              <p className="text-sm font-semibold text-red-500 mt-1">
                {student.level || "Level 1"}
              </p>
            </div>

            <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
              <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">
                Status
              </span>
              <p className="text-sm font-semibold text-emerald-400 mt-1 capitalize">
                {student.status || "Active"}
              </p>
            </div>
          </div>
        </div>

        {/* Sections des cours */}
        <div>
          <h2 className="text-xl font-black text-ink mb-4">Your {langInfo.label} Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-surface p-6 rounded-2xl border border-line shadow-xl flex flex-col justify-between hover:border-gold-700/40 transition">
              <div>
                <span className="text-xs font-bold text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/40">
                  Beginner
                </span>
                <h3 className="text-lg font-bold text-ink mt-3">Level 1</h3>
                <p className="text-ink-soft text-xs mt-1 font-sans">
                  Basics, everyday vocabulary, and simple conversation.
                </p>
              </div>
              <button
                onClick={() => router.push(`/academy/${langSlug}/level/1`)}
                className="glow-accent mt-6 w-full bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold py-2.5 rounded-xl text-sm transition"
              >
                Open Level 1
              </button>
            </div>

            <div className="bg-surface/60 p-6 rounded-2xl border border-line/80 shadow-xl flex flex-col justify-between opacity-80">
              <div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/40">
                  Intermediate
                </span>
                <h3 className="text-lg font-bold text-ink mt-3">Level 2</h3>
                <p className="text-ink-soft text-xs mt-1">
                  Grammar expansion, listening comprehension, and writing.
                </p>
              </div>
              <button
                onClick={() => {
                  if (student.level === "Level 2" || student.level === "Level 3") {
                    router.push(`/academy/${langSlug}/level/2`);
                  }
                }}
                disabled={student.level === "Level 1"}
                className={`mt-6 w-full py-2.5 rounded-xl text-sm font-bold transition ${
                  student.level === "Level 1"
                    ? "bg-surface-alt text-ink-faint cursor-not-allowed border border-line"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
                }`}
              >
                {student.level === "Level 1" ? "🔒 Locked" : "Open Level 2"}
              </button>
            </div>

            <div className="bg-surface/60 p-6 rounded-2xl border border-line/80 shadow-xl flex flex-col justify-between opacity-80">
              <div>
                <span className="text-xs font-bold text-purple-400 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800/40">
                  Advanced / Pro
                </span>
                <h3 className="text-lg font-bold text-ink mt-3">Level 3</h3>
                <p className="text-ink-soft text-xs mt-1">
                  Professional communication, emails, and job interviews.
                </p>
              </div>
              <button
                onClick={() => {
                  if (student.level === "Level 3") router.push(`/academy/${langSlug}/level/3`);
                }}
                disabled={student.level !== "Level 3"}
                className={`mt-6 w-full py-2.5 rounded-xl text-sm font-bold transition ${
                  student.level !== "Level 3"
                    ? "bg-surface-alt text-ink-faint cursor-not-allowed border border-line"
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