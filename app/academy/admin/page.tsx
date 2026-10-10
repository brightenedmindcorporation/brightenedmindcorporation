"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { availableLanguages } from "@/content/curriculum";
import { getJaasAppId, getLiveRoomName, isJitsiConfigured } from "@/lib/academy/liveRooms";
import JitsiEmbed from "@/components/academy/JitsiEmbed";

export const dynamic = "force-dynamic";

import { collection, getDocs } from "firebase/firestore";

type Tab = "students" | "live" | "payments";

export default function AdminPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<Tab>("students");

  // --- Student list filters ---
  const [langFilter, setLangFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  // --- Live sessions ---
  const [liveSessions, setLiveSessions] = useState<any[]>([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [sessionLangCode, setSessionLangCode] = useState(availableLanguages[0].code);
  const [sessionLevel, setSessionLevel] = useState("1");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState("60");
  const [sessionTitle, setSessionTitle] = useState("");
  const [hostingSession, setHostingSession] = useState<{ langCode: string; level: number; title?: string } | null>(null);

  // --- Payments ---
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  const fetchStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));

    setStudents(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "brightenedmindcorporation@gmail.com") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }

      setChecking(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (authorized) {
      fetchStudents();
    }
  }, [authorized]);

  const fetchLiveSessions = async () => {
    setLiveLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/live-sessions", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setLiveSessions(result.sessions || []);
    } catch (error) {
      console.error("Error fetching live sessions:", error);
    } finally {
      setLiveLoading(false);
    }
  };

  const fetchPayments = async () => {
    setPaymentsLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/payments", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setPayments(result.payments || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setPaymentsLoading(false);
    }
  };

  useEffect(() => {
    if (!authorized) return;
    if (tab === "live" && liveSessions.length === 0) fetchLiveSessions();
    if (tab === "payments" && payments.length === 0) fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized, tab]);

  const sendEmail = async (email: string, name: string, matricule: string, langLabel: string, level: string, studyDays?: number) => {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, matricule, langLabel, level, studyDays }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Email failed");
    }

    return result;
  };

  // Both actions go through server routes using the Admin SDK (see
  // app/api/admin/{approve,reject}-student/route.ts) instead of writing
  // directly to Firestore from the browser. The previous client-side
  // writes silently failed or got stuck whenever the project's Firestore
  // rules didn't grant the admin account write access to another user's
  // students/{uid} doc (a common and correct rule for "users can only
  // write their own document") — and that client-side email check was
  // never real security anyway, just a UI gate. The server route verifies
  // the caller's ID token server-side instead.
  const approveStudent = async (student: any) => {
    if (processingIds.has(student.id)) return;
    setProcessingIds((prev) => new Set(prev).add(student.id));

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/approve-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, studentId: student.id }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur serveur inconnue");
      }

      try {
        await sendEmail(student.email, student.name, result.matricule, languageLabel(student.langCode), student.level, student.studyDays);
        alert("Approved + Email sent!");
      } catch (emailError) {
        console.error("EMAIL ERROR:", emailError);
        alert("Student approved but email failed");
      }

      fetchStudents();
    } catch (error: any) {
      console.error(error);
      alert(`Error approving student: ${error.message || error}`);
      fetchStudents();
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(student.id);
        return next;
      });
    }
  };

  const rejectStudent = async (student: any) => {
    if (processingIds.has(student.id)) return;

    if (student.status === "Approved") {
      const confirmed = confirm(
        `${student.name} est actuellement approuvé(e) et a accès à la plateforme. Retirer son accès (ex. frais non payés) ?`
      );
      if (!confirmed) return;
    }

    setProcessingIds((prev) => new Set(prev).add(student.id));

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/reject-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, studentId: student.id }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur serveur inconnue");
      }

      alert(student.status === "Approved" ? "Accès retiré." : "Rejected!");
      fetchStudents();
    } catch (error: any) {
      console.error(error);
      alert(`Error rejecting student: ${error.message || error}`);
      fetchStudents();
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(student.id);
        return next;
      });
    }
  };

  const createLiveSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionDate || !sessionTime) {
      alert("Date et heure requises.");
      return;
    }

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const scheduledAt = new Date(`${sessionDate}T${sessionTime}:00`).toISOString();

      const response = await fetch("/api/admin/live-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          langCode: sessionLangCode,
          level: sessionLevel,
          scheduledAt,
          durationMinutes: sessionDuration,
          title: sessionTitle,
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Erreur serveur");

      setSessionDate("");
      setSessionTime("");
      setSessionTitle("");
      fetchLiveSessions();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const deleteLiveSession = async (id: string) => {
    if (!confirm("Supprimer cette session programmée ?")) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/live-sessions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchLiveSessions();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  // --- Derived data ---
  const languageLabel = (code?: string) => availableLanguages.find((l) => l.code === code)?.label ?? code ?? "EN (legacy)";

  const stats = useMemo(() => {
    const byLang: Record<string, number> = {};
    let pending = 0;
    let approved = 0;
    let rejected = 0;
    for (const s of students) {
      const code = s.langCode || "EN";
      byLang[code] = (byLang[code] || 0) + 1;
      if (s.status === "Pending") pending++;
      else if (s.status === "Approved") approved++;
      else if (s.status === "Rejected") rejected++;
    }
    return { total: students.length, byLang, pending, approved, rejected };
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (langFilter !== "all" && (s.langCode || "EN") !== langFilter) return false;
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const haystack = `${s.name || ""} ${s.email || ""} ${s.matricule || ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [students, langFilter, statusFilter, search]);

  const paymentsStats = useMemo(() => {
    let paid = 0;
    let pendingAmount = 0;
    let totalAmount = 0;
    for (const p of payments) {
      if (p.status === "paid") {
        paid++;
        totalAmount += Number(p.amount) || 0;
      } else if (p.status === "pending") {
        pendingAmount += Number(p.amount) || 0;
      }
    }
    return { paid, totalAmount, pendingAmount, count: payments.length };
  }, [payments]);

  if (checking) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-surface-sunken text-ink-soft">
        Loading...
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-surface-sunken">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      </main>
    );
  }

  return (
    <main className="p-6 md:p-10 min-h-screen bg-surface-sunken text-ink font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black tracking-tight text-ink mb-6">Admin Panel</h1>

        {/* TABS */}
        <div className="flex gap-2 mb-8 border-b border-line">
          {([
            { id: "students", label: "Étudiants" },
            { id: "live", label: "Cours en direct" },
            { id: "payments", label: "Paiements" },
          ] as { id: Tab; label: string }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-bold transition border-b-2 -mb-px ${
                tab === t.id
                  ? "border-red-600 text-red-500"
                  : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ================= STUDENTS TAB ================= */}
        {tab === "students" && (
          <div>
            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-ink">{stats.total}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Total</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-amber-400">{stats.pending}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">En attente</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-emerald-400">{stats.approved}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Approuvés</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-red-500">{stats.rejected}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Rejetés / Retirés</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(stats.byLang).map(([code, count]) => (
                <span key={code} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface border border-line text-ink-soft">
                  {languageLabel(code)} : <span className="text-gold-500">{count}</span>
                </span>
              ))}
            </div>

            {/* FILTERS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Rechercher par nom, email, matricule…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-surface border border-line rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-gold-600/60"
              />
              <select
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="bg-surface border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-600/60"
              >
                <option value="all">Toutes les langues</option>
                {availableLanguages.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-surface border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-600/60"
              >
                <option value="all">Tous les statuts</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucun étudiant ne correspond à ces filtres.
              </div>
            ) : (
              filteredStudents.map((s) => (
                <div key={s.id} className="p-5 mb-4 rounded-2xl border border-line bg-surface shadow-xl">
                  <p className="text-ink"><b className="text-ink">Name:</b> {s.name}</p>
                  <p className="text-ink"><b className="text-ink">Email:</b> {s.email}</p>
                  <p className="text-ink"><b className="text-ink">Language:</b> {languageLabel(s.langCode)}</p>
                  <p className="text-ink"><b className="text-ink">Level:</b> {s.level}</p>
                  <p className="text-ink"><b className="text-ink">Status:</b> {s.status}</p>
                  <p className="text-ink"><b className="text-ink">Matricule:</b> {s.matricule || "-"}</p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => approveStudent(s)}
                      disabled={processingIds.has(s.id) || s.status === "Approved" || s.status === "Rejected"}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {processingIds.has(s.id) ? "Processing..." : "Approve"}
                    </button>

                    <button
                      onClick={() => rejectStudent(s)}
                      disabled={processingIds.has(s.id) || s.status === "Rejected"}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {s.status === "Approved" ? "Remove / Revoke" : "Reject"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= LIVE SESSIONS TAB ================= */}
        {tab === "live" && (
          <div>
            <form onSubmit={createLiveSession} className="bg-surface border border-line rounded-2xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Langue</label>
                <select
                  value={sessionLangCode}
                  onChange={(e) => setSessionLangCode(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-600/60"
                >
                  {availableLanguages.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Niveau</label>
                <select
                  value={sessionLevel}
                  onChange={(e) => setSessionLevel(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-600/60"
                >
                  <option value="1">Niveau 1</option>
                  <option value="2">Niveau 2</option>
                  <option value="3">Niveau 3</option>
                </select>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Date</label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  required
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-600/60"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Heure</label>
                <input
                  type="time"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  required
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-600/60"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Durée (min)</label>
                <input
                  type="number"
                  min="15"
                  step="15"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-600/60"
                />
              </div>

              <button
                type="submit"
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition lg:col-span-1"
              >
                Programmer
              </button>

              <div className="sm:col-span-2 lg:col-span-6">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Titre (optionnel)</label>
                <input
                  type="text"
                  placeholder="Ex. Session de conversation hebdomadaire"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-gold-600/60"
                />
              </div>
            </form>

            <p className="text-xs text-ink-soft mb-4">
              Le bouton « Classe en direct » des étudiants reste verrouillé jusqu'à 10 minutes avant l'heure programmée, et se referme 10 minutes après la fin.
            </p>

            {liveLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : liveSessions.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucune session programmée pour le moment.
              </div>
            ) : (
              <div className="space-y-3">
                {liveSessions.map((session) => {
                  const date = new Date(session.scheduledAt);
                  const isPast = Date.now() > date.getTime() + (session.durationMinutes || 60) * 60_000;
                  return (
                    <div
                      key={session.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-line bg-surface ${isPast ? "opacity-50" : ""}`}
                    >
                      <div>
                        <p className="font-bold text-ink">
                          {languageLabel(session.langCode)} — Niveau {session.level}
                          {session.title ? ` · ${session.title}` : ""}
                        </p>
                        <p className="text-xs text-ink-soft mt-1">
                          {date.toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })} · {session.durationMinutes} min
                          {isPast && " · Terminée"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 self-start sm:self-center">
                        <button
                          onClick={() => setHostingSession({ langCode: session.langCode || "EN", level: session.level, title: session.title })}
                          className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-4 py-2 rounded-xl transition"
                        >
                          🎥 Rejoindre en tant qu'enseignant
                        </button>
                        <button
                          onClick={() => deleteLiveSession(session.id)}
                          className="text-red-500 hover:text-red-400 text-sm font-semibold"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {hostingSession && (
              <div className="mt-8 bg-surface border border-line rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-ink">
                      Salle en direct — {languageLabel(hostingSession.langCode)} — Niveau {hostingSession.level}
                      {hostingSession.title ? ` · ${hostingSession.title}` : ""}
                    </p>
                    <p className="text-xs text-ink-soft mt-1">
                      Vous rejoignez en tant qu'enseignant/modérateur. Contrôle total de la session : micro, caméra, partage d'écran, mise en sourdine et exclusion des participants.
                    </p>
                  </div>
                  <button
                    onClick={() => setHostingSession(null)}
                    className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition whitespace-nowrap"
                  >
                    Quitter
                  </button>
                </div>

                {isJitsiConfigured() && getJaasAppId() ? (
                  <JitsiEmbed
                    appId={getJaasAppId()!}
                    roomName={getLiveRoomName(hostingSession.langCode, hostingSession.level)}
                    displayName="Enseignant — BM Academy"
                  />
                ) : (
                  <div className="p-6 rounded-2xl border border-line bg-surface-sunken text-ink-soft text-center">
                    Le service de visioconférence n'est pas encore configuré (variable NEXT_PUBLIC_JAAS_APP_ID manquante).
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= PAYMENTS TAB ================= */}
        {tab === "payments" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-ink">{paymentsStats.count}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Total</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-emerald-400">{paymentsStats.paid}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Payés</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-gold-500">${paymentsStats.totalAmount}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Revenu confirmé</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-amber-400">${paymentsStats.pendingAmount}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">En attente</p>
              </div>
            </div>

            {paymentsLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : payments.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucun paiement enregistré pour le moment.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left text-ink-soft border-b border-line">
                      <th className="py-2 pr-4">Étudiant</th>
                      <th className="py-2 pr-4">Langue</th>
                      <th className="py-2 pr-4">Montant</th>
                      <th className="py-2 pr-4">Statut</th>
                      <th className="py-2 pr-4">Matricule</th>
                      <th className="py-2 pr-4">Référence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="border-b border-line/60">
                        <td className="py-2 pr-4 text-ink">{p.studentName || "-"}</td>
                        <td className="py-2 pr-4 text-ink-soft">{languageLabel(p.langCode)}</td>
                        <td className="py-2 pr-4 text-ink">{p.amount} {p.currency || "USD"}</td>
                        <td className="py-2 pr-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            p.status === "paid" ? "bg-emerald-950/60 text-emerald-400" :
                            p.status === "failed" ? "bg-red-950/60 text-red-400" :
                            "bg-amber-950/60 text-amber-400"
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-2 pr-4 text-ink-soft font-mono text-xs">{p.matricule || "-"}</td>
                        <td className="py-2 pr-4 text-ink-faint font-mono text-xs">{p.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
