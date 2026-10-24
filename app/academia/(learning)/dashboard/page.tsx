"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BmLogo from "@/components/BmLogo";
import { Lock, MessageSquarePlus, Paperclip, X, BookText, ChevronDown } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AcademyHeader from "../components/AcademyHeader";
import { getLevelCurriculum, availableLanguages, findProgramByCode, findProgramBySlug, isOfficeProgram } from "@/content/curriculum";
import { isOtherProgramCode as isOtherCode, getOtherProgramLabel } from "@/content/programs";

// A program without lessons or quizzes (Visuel, Logiciels). Bureautique has its own course, like a language.
const isOtherProgramCode = (code?: string) => isOtherCode(code) && !findProgramByCode(code);
import { getLevelProgress } from "@/lib/academy/progress";
import { levelNumber, startLevel, placementPending } from "@/lib/academy/levelAccess";
import { isSessionJoinable, isSessionOpenNow, type LiveSession } from "@/lib/academy/liveSessions";
import { refreshLoggedStudent } from "@/lib/academy/refreshEnrollments";
import { fetchLiveSession } from "@/lib/academy/fetchLiveSession";
import { logActivity } from "@/lib/academy/activity";
import { getVerbReference } from "@/content/verbs";

interface Enrollment {
  langCode: string;
  level?: string;
  status?: string;
  matricule?: string;
  studyDays?: number;
}

interface StudentData {
  name?: string;
  email?: string;
  enrollments?: Enrollment[];
  activeLangCode?: string;
  completedQuizzes?: number;
  totalQuizzes?: number;
}

// Registration stores langCode ("ZH", "PT", ...) while the curriculum/URLs
// key on the slug ("chinese", "portuguese", ...). Legacy accounts created
// before langCode existed fall back to English, which was the only
// language the platform had at the time.
function resolveLangSlug(langCode?: string): string {
  const match = findProgramByCode(langCode);
  return match?.slug ?? "english";
}

export default function Dashboard() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [levelRequesting, setLevelRequesting] = useState(false);
  const [lastLesson, setLastLesson] = useState<number>(1);
  const [progressStats, setProgressStats] = useState({ completed: 0, total: 12 });
  const [loading, setLoading] = useState<boolean>(true);
  const [liveSession, setLiveSession] = useState<LiveSession | null>(null);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestType, setRequestType] = useState("complaint");
  const [requestSubject, setRequestSubject] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSending, setRequestSending] = useState(false);
  const [requestAttachments, setRequestAttachments] = useState<File[]>([]);
  const [adminMessages, setAdminMessages] = useState<any[]>([]);
  const [openMessageId, setOpenMessageId] = useState<string | null>(null);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const router = useRouter();

  // Load the logged-in student once on mount.
  useEffect(() => {
    const data = localStorage.getItem("loggedStudent");

    if (!data) {
      router.replace("/login");
      return;
    }

    try {
      const parsedStudent: StudentData = JSON.parse(data);
      if (!parsedStudent.enrollments || parsedStudent.enrollments.filter((e) => e.status === "Approved").length === 0) {
        router.replace("/login");
        return;
      }
      setStudent(parsedStudent);
      // One "space opened" event per browser session (the administration sees when students come back).
      try {
        if (!sessionStorage.getItem("bm_activity_session")) {
          sessionStorage.setItem("bm_activity_session", "1");
          logActivity("session", "Ouverture de l'espace d'apprentissage");
        }
      } catch {
        // storage unavailable
      }
      // Pick up changes the admin made since login (study plan, status…).
      refreshLoggedStudent().then((updated) => {
        if (updated) setStudent(updated);
      });
    } catch (e) {
      console.error("Erreur de lecture des données utilisateur :", e);
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const approvedEnrollments = student?.enrollments?.filter((e) => e.status === "Approved") ?? [];
  const activeEnrollment = approvedEnrollments.find((e) => e.langCode === student?.activeLangCode) ?? approvedEnrollments[0];

  // Other programs (Bureautique, Visuel, Logiciels) have no curriculum/
  // levels — the admin schedules them under a single "level 1" room — but
  // they can still have a live class, so that part is fetched separately
  // from the language progress effect below.
  useEffect(() => {
    if (!activeEnrollment || !isOtherProgramCode(activeEnrollment.langCode)) return;
    const loadLiveSession = () => {
      fetchLiveSession(activeEnrollment.langCode, 1).then(setLiveSession);
    };
    loadLiveSession();
    const interval = setInterval(loadLiveSession, 30_000);
    return () => clearInterval(interval);
  }, [activeEnrollment?.langCode]);

  // Recompute progress/live-session whenever the active language changes.
  // Other programs (Bureautique, Visuel, Logiciels) have no curriculum to
  // compute progress against, so there's nothing to fetch for them here.
  useEffect(() => {
    if (!activeEnrollment || isOtherProgramCode(activeEnrollment.langCode)) return;

    const langSlug = resolveLangSlug(activeEnrollment.langCode);
    const studentLevelNum = levelNumber(activeEnrollment.level);
    // Progress of the level the student is working on (not always level 1).
    const level1 = getLevelCurriculum(langSlug, studentLevelNum);
    const progress = getLevelProgress(langSlug, studentLevelNum);
    const curriculumForLiveCheck = getLevelCurriculum(langSlug, studentLevelNum);
    let interval: ReturnType<typeof setInterval> | undefined;
    if (curriculumForLiveCheck) {
      const loadLiveSession = () => {
        fetchLiveSession(curriculumForLiveCheck.langCode, studentLevelNum).then(setLiveSession);
      };
      loadLiveSession();
      // Poll so the "Rejoindre" button appears/disappears on its own when
      // the admin starts or ends a live session, without a page reload.
      interval = setInterval(loadLiveSession, 30_000);
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
    setProgressStats({ completed: completedCount, total: totalLessons });

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeEnrollment?.langCode, activeEnrollment?.level]);

  const switchLanguage = (langCode: string) => {
    if (!student) return;
    const updated = { ...student, activeLangCode: langCode };
    setStudent(updated);
    localStorage.setItem("loggedStudent", JSON.stringify(updated));
  };

  // Admin broadcast/direct messages — fetched once Firebase has
  // rehydrated the session (auth.currentUser is unreliable right at
  // mount), shown in their own card on the dashboard rather than only in
  // the notification bell, since that's where students look for this.
  // Polled in the background so a new message from the admin appears
  // without the student having to reload the page.
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    const fetchAdminMessages = async (user: NonNullable<typeof auth.currentUser>) => {
      try {
        const idToken = await user.getIdToken();
        const response = await fetch("/api/academy/notifications", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        const result = await response.json();
        if (response.ok) {
          setAdminMessages((result.notifications || []).filter((n: any) => n.type === "admin-message"));
        }
      } catch (error) {
        console.error("Error fetching admin messages:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      fetchAdminMessages(user);
      if (!interval) interval = setInterval(() => fetchAdminMessages(user), 30_000);
    });

    return () => {
      unsubscribe();
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedStudent");
    router.replace("/login");
  };

  const doSubmitRequest = async () => {
    const idToken = await auth.currentUser?.getIdToken();
    const form = new FormData();
    form.append("idToken", idToken || "");
    form.append("type", requestType);
    form.append("subject", requestSubject);
    form.append("message", requestMessage);
    requestAttachments.forEach((file) => form.append("attachments", file));
    const response = await fetch("/api/academy/student-requests", { method: "POST", body: form });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur serveur");
  };

  const submitRequest = async () => {
    if (!requestSubject.trim() || !requestMessage.trim()) return;
    setRequestSending(true);
    try {
      try {
        await doSubmitRequest();
      } catch (firstError: any) {
        // "Failed to fetch" means the request never reached the server —
        // most often the Render free-tier instance was asleep and woke up
        // mid-request. One silent retry after a short pause covers that
        // case instead of showing a raw network error on the first try.
        if (firstError instanceof TypeError) {
          await new Promise((resolve) => setTimeout(resolve, 4000));
          await doSubmitRequest();
        } else {
          throw firstError;
        }
      }
      setRequestOpen(false);
      setRequestSubject("");
      setRequestMessage("");
      setRequestType("complaint");
      setRequestAttachments([]);
      alert("Votre message a bien été envoyé à l'administration.");
    } catch (error: any) {
      const message =
        error instanceof TypeError
          ? "Le serveur était en train de démarrer et n'a pas répondu à temps. Réessayez dans quelques secondes."
          : error.message || error;
      alert(`Erreur : ${message}`);
    } finally {
      setRequestSending(false);
    }
  };

  if (loading || !student || !activeEnrollment) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft font-medium">
        Redirecting...
      </main>
    );
  }

  const fullName = student.name || "Student";
  const completedQuizzes = progressStats.completed;
  const totalQuizzes = progressStats.total;
  const progressPercentage =
    totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;

  const isOtherProgram = isOtherProgramCode(activeEnrollment.langCode);
  const langSlug = resolveLangSlug(activeEnrollment.langCode);
  const langInfo = findProgramBySlug(langSlug) ?? availableLanguages[0];
  // Bureautique, Logiciels and Visuel are taught in French with their own level descriptions; the languages keep the English interface.
  const office = isOfficeProgram(langSlug);
  const t = (french: string, english: string) => (office ? french : english);
  const levelCard = (n: number, fallbackTitle: string, fallbackText: string) => {
    const c = office ? getLevelCurriculum(langSlug, n) : null;
    return { title: c ? c.levelTitle.replace(/^Niveau \d+\s*-\s*/, "") : fallbackTitle, text: c ? c.levelSubtitle : fallbackText };
  };
  const programLabel = isOtherProgram ? getOtherProgramLabel(activeEnrollment.langCode) ?? activeEnrollment.langCode : langInfo.label;

  // Levels below the one the student registered at are not part of their enrolment.
  const firstLevel = startLevel(activeEnrollment as any);

  // The next level can be requested once the final quiz of the current one is passed.
  const canRequest = (target: number) =>
    !isOtherProgram &&
    levelNumber(activeEnrollment.level) === target - 1 &&
    getLevelProgress(langSlug, target - 1).finalQuizPassed &&
    (activeEnrollment as any).levelRequest?.level !== target &&
    !levelRequesting;
  const levelButtonLabel = (target: number, open: string) => {
    if (levelNumber(activeEnrollment.level) >= target) return open;
    if (levelNumber(activeEnrollment.level) === target - 1 && getLevelProgress(langSlug, target - 1).finalQuizPassed) {
      return (activeEnrollment as any).levelRequest?.level === target ? "Demande envoyée — en attente" : levelRequesting ? "Envoi…" : `Demander le niveau ${target}`;
    }
    return (<span className="inline-flex items-center gap-1.5"><Lock size={13} /> {t("Verrouillé", "Locked")}</span>);
  };

  // Asks the administration for the next level (after the final quiz of the current one).
  const requestLevel = async () => {
    setLevelRequesting(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/academy/request-next-level", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, langCode: activeEnrollment.langCode }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      const updated = await refreshLoggedStudent();
      if (updated) setStudent(updated);
      alert("Demande envoyée. L'administration la validera et vous serez prévenu.");
    } catch (error: any) {
      alert(error.message || "Erreur");
    } finally {
      setLevelRequesting(false);
    }
  };

  const handleContinue = () => {
    const current = levelNumber(activeEnrollment.level);
    // Continue where the student is: the next lesson of their level.
    router.push(`/academia/${langSlug}/level/${current}/lesson/${lastLesson}`);
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/academia/corrections")}
              className="px-4 py-2 bg-surface-alt hover:bg-surface text-ink text-sm font-semibold rounded-xl transition flex items-center gap-2 border border-line"
            >
              ✍️ Mes corrections
            </button>
            <button
              onClick={() => setRequestOpen(true)}
              className="px-4 py-2 bg-surface-alt hover:bg-surface text-ink text-sm font-semibold rounded-xl transition flex items-center gap-2 border border-line"
            >
              <MessageSquarePlus size={15} /> Contacter l'administration
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-800/40 text-sm font-semibold rounded-xl transition"
            >
              Logout / Déconnexion
            </button>
          </div>
        </div>

        {/* Messages de l'administration */}
        {adminMessages.length > 0 && (
          <div className="bg-surface border border-line rounded-2xl p-5 space-y-2">
            <p className="text-sm font-bold text-ink flex items-center gap-2 mb-1">
              <MessageSquarePlus size={16} /> Messages de l'administration
            </p>
            {(showAllMessages ? adminMessages : adminMessages.slice(0, 3)).map((m) => {
              const isOpen = openMessageId === m.id;
              return (
                <div key={m.id} className="bg-surface-alt border border-line rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenMessageId(isOpen ? null : m.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-surface transition"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-ink truncate">{m.title}</p>
                      {!isOpen && <p className="text-xs text-ink-soft mt-0.5 line-clamp-1">{m.message}</p>}
                      <p className="text-[11px] text-ink-faint mt-1">
                        {m.createdAt ? new Date(m.createdAt).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" }) : ""}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-red-500 shrink-0 flex items-center gap-1 mt-0.5">
                      {isOpen ? "Fermer" : "Ouvrir"}
                      <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-4 pb-4 text-sm text-ink-soft whitespace-pre-wrap border-t border-line pt-3">{m.message}</p>
                  )}
                </div>
              );
            })}
            {adminMessages.length > 3 && (
              <button
                onClick={() => setShowAllMessages((v) => !v)}
                className="text-xs font-semibold text-ink-soft hover:text-ink pt-1"
              >
                {showAllMessages ? "Afficher moins" : `Voir tous les messages (${adminMessages.length})`}
              </button>
            )}
          </div>
        )}

        {/* Sélecteur de langue (si inscrit à plusieurs langues) */}
        {approvedEnrollments.length > 1 && (
          <div className="flex flex-wrap gap-2 bg-surface/80 border border-line p-3 rounded-2xl backdrop-blur-md">
            {approvedEnrollments.map((en) => {
              const label = findProgramByCode(en.langCode)?.label ?? getOtherProgramLabel(en.langCode) ?? en.langCode;
              const isActive = en.langCode === activeEnrollment.langCode;
              return (
                <button
                  key={en.langCode}
                  onClick={() => switchLanguage(en.langCode)}
                  className={`px-4 py-2 text-sm font-bold rounded-xl transition ${
                    isActive
                      ? "bg-gradient-to-br from-red-600 to-red-900 text-white shadow-md"
                      : "bg-surface-alt text-ink-soft hover:text-ink border border-line"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {isOtherProgram ? (
          /* Carte simplifiée : pas de leçons interactives pour ce programme */
          <div className="bg-surface rounded-3xl border border-line p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 radial-fade pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 p-0.5 shadow-lg shadow-red-950/50 flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-white/30">
                  <BmLogo size={56} className="rounded-[14px]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ink">
                    Bienvenue, {fullName}
                  </h1>
                  <p className="text-ink-soft text-sm mt-1 font-sans">
                    Votre inscription à <span className="text-red-500 font-semibold">{programLabel}</span> est confirmée.
                  </p>
                </div>
              </div>

              {liveSession && (isSessionJoinable(liveSession) || isSessionOpenNow(liveSession)) ? (
                <button
                  onClick={() => router.push(`/academia/program/${activeEnrollment.langCode}/live`)}
                  className="border border-red-600/40 hover:border-red-500 text-red-400 hover:text-red-300 font-bold px-5 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shrink-0"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  Live Class — En direct
                </button>
              ) : liveSession ? (
                <div
                  className="border border-line text-ink-faint font-semibold px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed text-sm shrink-0"
                  title="Le cours n'a pas encore commencé"
                >
                  <Lock size={13} className="inline -mt-0.5" />{" "}
                  {new Date(liveSession.scheduledAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
              <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
                <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">Email</span>
                <p className="text-sm font-semibold text-ink mt-1 truncate">{student.email || "N/A"}</p>
              </div>
              <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
                <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">Student ID</span>
                <p className="text-sm font-semibold text-ink mt-1">{activeEnrollment.matricule || "N/A"}</p>
              </div>
              <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
                <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">Statut</span>
                <p className="text-sm font-semibold text-emerald-400 mt-1 capitalize">{activeEnrollment.status || "Active"}</p>
              </div>
            </div>

            <div className="mt-8 p-5 bg-surface-sunken/60 rounded-2xl border border-line relative text-sm text-ink-soft leading-relaxed">
              Cette formation est dispensée en présentiel / sur rendez-vous. Notre équipe pédagogique vous
              contactera prochainement pour planifier vos sessions. Pour toute question, contactez le secrétariat
              au <span className="text-ink font-semibold">+243988830799</span>.
            </div>
          </div>
        ) : (
        <>
        {/* Carte de bienvenue */}
        <div className="bg-surface rounded-3xl border border-line p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 radial-fade pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative">
            <div className="flex items-center gap-5">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 p-0.5 shadow-lg shadow-red-950/50 flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-white/30">
                <BmLogo size={56} className="rounded-[14px]" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ink">
                  {t("Bienvenue", "Welcome back")}, {fullName}
                </h1>
                <p className="text-ink-soft text-sm mt-1 font-sans">
                  {office ? <>Prêt(e) à continuer votre formation <span className="text-red-500 font-semibold">{langInfo.label}</span> ?</> : <>Ready to continue your <span className="text-red-500 font-semibold">{langInfo.label}</span> lessons today?</>}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              {liveSession && (isSessionJoinable(liveSession) || isSessionOpenNow(liveSession)) ? (
                <button
                  onClick={() => router.push(`/academia/${langSlug}/level/${levelNumber(activeEnrollment.level)}/live`)}
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
                  <Lock size={13} className="inline -mt-0.5" />{" "}
                  {liveSession
                    ? new Date(liveSession.scheduledAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })
                    : "Pas de live programmé"}
                </div>
              )}

              {getVerbReference(activeEnrollment.langCode) && (
                <button
                  onClick={() => router.push(`/academia/${langSlug}/verbs`)}
                  className="border border-line hover:border-red-600/50 text-ink-soft hover:text-ink font-bold px-5 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <BookText size={16} /> Verbes
                </button>
              )}

              <button
                onClick={handleContinue}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-6 py-3.5 rounded-xl transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>▶ {t("Continuer la leçon", "Continue Lesson")} {lastLesson}</span>
              </button>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="bg-surface-sunken/80 border border-line rounded-2xl p-5 mb-6 relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-ink-soft font-sans">
                {t("Progression", "Course Progress")} ({t("Niveau", "Level")} {levelNumber(activeEnrollment.level)})
              </span>
              <span className="text-sm font-extrabold text-red-500">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-surface-alt rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 to-red-800 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-ink-soft mt-2 font-medium">
              {completedQuizzes} / {totalQuizzes} {t("quiz réussis", "quizzes completed")}
            </p>
          </div>

          {/* Infos étudiant */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
              <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">
                {t("E-mail", "Email")}
              </span>
              <p className="text-sm font-semibold text-ink mt-1 truncate">
                {student.email || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
              <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">
                {t("ID étudiant", "Student ID")}
              </span>
              <p className="text-sm font-semibold text-ink mt-1">
                {activeEnrollment.matricule || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
              <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">
                {t("Niveau actuel", "Current Level")}
              </span>
              <p className="text-sm font-semibold text-red-500 mt-1">
                {t("Niveau", "Level")} {levelNumber(activeEnrollment.level)}
              </p>
            </div>

            <div className="p-4 bg-surface-sunken/60 rounded-xl border border-line">
              <span className="text-[10px] text-ink-faint uppercase font-bold tracking-wider">
                {t("Statut", "Status")}
              </span>
              <p className="text-sm font-semibold text-emerald-400 mt-1 capitalize">
                {activeEnrollment.status === "Approved" ? t("Approuvé", "Approved") : activeEnrollment.status || "Active"}
              </p>
            </div>
          </div>
        </div>

        {/* Placement test: a student who did not pick a level takes the test first */}
        {!isOtherProgram && placementPending(activeEnrollment as any) && (
          <div className="mb-6 p-5 rounded-2xl border border-amber-600/40 bg-amber-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-ink">
                {(activeEnrollment as any).placement?.status === "submitted" ? "Votre test de niveau est en cours de correction" : "Passez votre test de niveau"}
              </p>
              <p className="text-sm text-ink-soft mt-0.5">
                {(activeEnrollment as any).placement?.status === "submitted"
                  ? "L'administration va vous attribuer votre niveau. Vous serez prévenu(e) ici et par e-mail."
                  : "Vous n'avez pas encore de niveau : le test sert à trouver celui qui vous convient. Vos cours s'ouvriront ensuite."}
              </p>
            </div>
            {(activeEnrollment as any).placement?.status !== "submitted" && (
              <button
                onClick={() => router.push(`/academia/placement/${langSlug}`)}
                className="glow-accent shrink-0 bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition"
              >
                Passer le test
              </button>
            )}
          </div>
        )}

        {/* Sections des cours */}
        <div className={!isOtherProgram && placementPending(activeEnrollment as any) ? "opacity-50 pointer-events-none" : ""}>
          <h2 className="text-xl font-black text-ink mb-4">{office ? `Votre formation ${langInfo.label}` : `Your ${langInfo.label} Courses`}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-surface p-6 rounded-2xl border border-line shadow-xl flex flex-col justify-between hover:border-red-600/40 transition">
              <div>
                <span className="text-xs font-bold text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/40">
                  {t("Débutant", "Beginner")}
                </span>
                <h3 className="text-lg font-bold text-ink mt-3">{t("Niveau", "Level")} 1{office ? ` · ${levelCard(1, "", "").title}` : ""}</h3>
                <p className="text-ink-soft text-xs mt-1 font-sans">
                  {levelCard(1, "", "Basics, everyday vocabulary, and simple conversation.").text}
                </p>
              </div>
              {firstLevel > 1 ? (
                <button disabled className="mt-6 w-full py-2.5 rounded-xl text-sm font-bold bg-surface-alt text-ink-faint cursor-not-allowed border border-line">
                  {t("Non inclus dans votre inscription", "Not in your enrolment")}
                </button>
              ) : (
                <button
                  onClick={() => router.push(`/academia/${langSlug}/level/1`)}
                  className="glow-accent mt-6 w-full bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold py-2.5 rounded-xl text-sm transition"
                >
                  {t("Ouvrir le niveau 1", "Open Level 1")}
                </button>
              )}
            </div>

            <div className="bg-surface/60 p-6 rounded-2xl border border-line/80 shadow-xl flex flex-col justify-between opacity-80">
              <div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/40">
                  {t("Intermédiaire", "Intermediate")}
                </span>
                <h3 className="text-lg font-bold text-ink mt-3">{t("Niveau", "Level")} 2{office ? ` · ${levelCard(2, "", "").title}` : ""}</h3>
                <p className="text-ink-soft text-xs mt-1">
                  {levelCard(2, "", "Grammar expansion, listening comprehension, and writing.").text}
                </p>
              </div>
              <button
                onClick={() => {
                  if (levelNumber(activeEnrollment.level) >= 2) router.push(`/academia/${langSlug}/level/2`);
                  else if (canRequest(2)) requestLevel();
                }}
                disabled={firstLevel > 2 || (levelNumber(activeEnrollment.level) < 2 && !canRequest(2))}
                className={`mt-6 w-full py-2.5 rounded-xl text-sm font-bold transition ${
                  firstLevel > 2 || (levelNumber(activeEnrollment.level) < 2 && !canRequest(2))
                    ? "bg-surface-alt text-ink-faint cursor-not-allowed border border-line"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
                }`}
              >
                {firstLevel > 2 ? t("Non inclus dans votre inscription", "Not in your enrolment") : levelButtonLabel(2, t("Ouvrir le niveau 2", "Open Level 2"))}
              </button>
            </div>

            <div className="bg-surface/60 p-6 rounded-2xl border border-line/80 shadow-xl flex flex-col justify-between opacity-80">
              <div>
                <span className="text-xs font-bold text-purple-400 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800/40">
                  {t("Avancé / Pro", "Advanced / Pro")}
                </span>
                <h3 className="text-lg font-bold text-ink mt-3">{t("Niveau", "Level")} 3{office ? ` · ${levelCard(3, "", "").title}` : ""}</h3>
                <p className="text-ink-soft text-xs mt-1">
                  {levelCard(3, "", "Professional communication, emails, and job interviews.").text}
                </p>
              </div>
              <button
                onClick={() => {
                  if (levelNumber(activeEnrollment.level) >= 3) router.push(`/academia/${langSlug}/level/3`);
                  else if (canRequest(3)) requestLevel();
                }}
                disabled={firstLevel > 3 || (levelNumber(activeEnrollment.level) < 3 && !canRequest(3))}
                className={`mt-6 w-full py-2.5 rounded-xl text-sm font-bold transition ${
                  firstLevel > 3 || (levelNumber(activeEnrollment.level) < 3 && !canRequest(3))
                    ? "bg-surface-alt text-ink-faint cursor-not-allowed border border-line"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {firstLevel > 3 ? t("Non inclus dans votre inscription", "Not in your enrolment") : levelButtonLabel(3, t("Ouvrir le niveau 3", "Open Level 3"))}
              </button>
            </div>

          </div>
        </div>
        </>
        )}

      </main>

      {requestOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
              <MessageSquarePlus size={18} /> Contacter l'administration
            </h3>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Type</label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            >
              <option value="complaint">Plainte</option>
              <option value="concern">Inquiétude</option>
              <option value="request">Demande particulière</option>
              <option value="other">Autre</option>
            </select>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Sujet</label>
            <input
              type="text"
              value={requestSubject}
              onChange={(e) => setRequestSubject(e.target.value)}
              placeholder="Résumez votre message en quelques mots"
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint mb-4 focus:outline-none focus:border-red-600/60"
            />
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Message</label>
            <textarea
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              rows={6}
              placeholder="Décrivez votre plainte, inquiétude ou demande en détail…"
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint mb-3 focus:outline-none focus:border-red-600/60"
            />
            {requestAttachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {requestAttachments.map((file, i) => (
                  <span key={i} className="text-xs bg-surface-alt border border-line rounded-full px-3 py-1 flex items-center gap-2 text-ink-soft">
                    {file.name}
                    <button onClick={() => setRequestAttachments((prev) => prev.filter((_, idx) => idx !== i))} className="text-ink-faint hover:text-red-500"><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-2 cursor-pointer transition bg-surface-alt mb-4">
              <Paperclip size={13} /> Joindre un fichier
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setRequestAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])}
              />
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRequestOpen(false)}
                className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition"
              >
                Annuler
              </button>
              <button
                onClick={submitRequest}
                disabled={requestSending || !requestSubject.trim() || !requestMessage.trim()}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl transition"
              >
                {requestSending ? "Envoi…" : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}