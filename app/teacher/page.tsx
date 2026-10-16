"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { teacherAuth as auth } from "@/lib/firebaseTeacher";
import { availableLanguages } from "@/content/curriculum";
import { getOtherProgramLabel } from "@/content/programs";
import { getJaasAppId, getLiveRoomName, isJitsiConfigured } from "@/lib/academy/liveRooms";
import JitsiEmbed from "@/components/academy/JitsiEmbed";
import StudentDossier from "@/components/academy/StudentDossier";
import ActivityTimeline, { ago, duration, type Timeline } from "@/components/academy/ActivityTimeline";
import type { ProgressDoc } from "@/lib/academy/levelSummary";

interface Assignment {
  langCode: string;
  levels: number[];
}
interface TeacherProfile {
  uid: string;
  name: string;
  email: string;
  assignments: Assignment[];
}
interface Session {
  id: string;
  langCode: string;
  level: number;
  title?: string;
  scheduledAt: string;
  durationMinutes: number;
  open?: boolean;
}
interface StudentRow {
  uid: string;
  name: string;
  email: string;
  langCode: string;
  studentId: string;
  lastActiveAt?: string | null;
  activeSeconds?: number;
  levels: Record<string, { doc?: ProgressDoc; completedLessons: number; completedQuizzes: number; finalQuizPassed: boolean; finalQuizScore: number | null }>;
}

const label = (code?: string) =>
  availableLanguages.find((l) => l.code === code)?.label ?? getOtherProgramLabel(code) ?? code ?? "";

async function api(url: string, init: RequestInit = {}) {
  const idToken = await auth.currentUser?.getIdToken();
  const isForm = init.body instanceof FormData;
  const response = await fetch(url, {
    ...init,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${idToken}`,
      ...(init.headers || {}),
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Erreur serveur");
  return result;
}

const input =
  "w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60";
const primaryBtn =
  "glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition";

type Tab = "news" | "live" | "students" | "messages";

export default function TeacherPage() {
  const [checking, setChecking] = useState(true);
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("news");

  // login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginInfo, setLoginInfo] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthError(null);
      if (!user) {
        setTeacher(null);
        setChecking(false);
        return;
      }
      try {
        const result = await api("/api/teacher/me");
        setTeacher(result.teacher);
      } catch {
        setTeacher(null);
        setAuthError("Ce compte n'est pas un compte enseignant. Connectez-vous avec le compte que l'administration vous a créé.");
        await signOut(auth);
      } finally {
        setChecking(false);
      }
    });
    return unsubscribe;
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginInfo(null);
    setLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error: any) {
      setLoginError(
        ["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found"].includes(error.code)
          ? "E-mail ou mot de passe incorrect."
          : error.code === "auth/user-disabled"
            ? "Ce compte a été désactivé. Contactez l'administration."
            : "Une erreur est survenue lors de la connexion."
      );
    } finally {
      setLoggingIn(false);
    }
  };

  const forgot = async () => {
    setLoginError(null);
    if (!email.trim()) {
      setLoginError("Saisissez d'abord votre e-mail, puis cliquez sur « Mot de passe oublié ».");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setLoginInfo("Si ce compte existe, un e-mail pour choisir un nouveau mot de passe vient d'être envoyé.");
    } catch {
      setLoginInfo("Si ce compte existe, un e-mail pour choisir un nouveau mot de passe vient d'être envoyé.");
    }
  };

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page text-ink-soft">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!teacher) {
    return (
      <main className="min-h-screen bg-page text-ink flex items-center justify-center px-6 pt-28 pb-10">
        <form onSubmit={login} className="w-full max-w-md bg-surface border border-line rounded-3xl p-8 shadow-2xl space-y-4">
          <h1 className="text-2xl font-bold text-center">Espace enseignant</h1>
          <p className="text-sm text-ink-soft text-center">BM Academia — connectez-vous pour gérer vos cours.</p>
          {authError && <p className="text-sm text-red-500">{authError}</p>}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre e-mail" className={input} required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className={input} required />
          {loginError && <p className="text-sm text-red-500">{loginError}</p>}
          {loginInfo && <p className="text-sm text-emerald-500">{loginInfo}</p>}
          <button type="submit" disabled={loggingIn} className={`${primaryBtn} w-full`}>
            {loggingIn ? "Connexion…" : "Se connecter"}
          </button>
          <button type="button" onClick={forgot} className="w-full text-xs font-semibold text-ink-soft hover:text-ink">
            Mot de passe oublié ?
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-page text-ink px-6 md:px-10 pt-28 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-5 mb-6">
          <div>
            <h1 className="text-2xl font-black">Bonjour, {teacher.name}</h1>
            <p className="text-xs text-ink-soft mt-1">
              Vous enseignez :{" "}
              {teacher.assignments
                .map((a) => `${label(a.langCode)} (${a.levels.length > 1 || availableLanguages.some((l) => l.code === a.langCode) ? "niv. " + a.levels.join(", ") : "cours"})`)
                .join(" · ")}
            </p>
          </div>
          <button onClick={() => signOut(auth)} className="text-sm font-semibold text-ink-soft hover:text-ink border border-line rounded-xl px-4 py-2">
            Se déconnecter
          </button>
        </div>

        <div className="flex gap-1 border-b border-line mb-6">
          {([
            { id: "news", label: "Actualités" },
            { id: "live", label: "Mes cours en direct" },
            { id: "students", label: "Mes étudiants" },
            { id: "messages", label: "Messages" },
          ] as { id: Tab; label: string }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-bold transition border-b-2 -mb-px ${
                tab === t.id ? "border-red-600 text-red-500" : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "news" && <NewsTab />}
        {tab === "live" && <LiveTab teacher={teacher} />}
        {tab === "students" && <StudentsTab teacher={teacher} />}
        {tab === "messages" && <MessagesTab />}
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Live classes                                                        */
/* ------------------------------------------------------------------ */
function LiveTab({ teacher }: { teacher: TeacherProfile }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const options = useMemo(
    () => teacher.assignments.flatMap((a) => a.levels.map((level) => ({ langCode: a.langCode, level }))),
    [teacher]
  );
  const [choice, setChoice] = useState(options[0] ? `${options[0].langCode}:${options[0].level}` : "");
  const [when, setWhen] = useState("");
  const [duration, setDuration] = useState("60");
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [hosting, setHosting] = useState<Session | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [toggling, setToggling] = useState(false);

  const load = async () => {
    try {
      const result = await api("/api/admin/live-sessions");
      setSessions(result.sessions || []);
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setToken(null);
    setTokenError(null);
    if (!hosting) return;
    (async () => {
      try {
        const idToken = await auth.currentUser?.getIdToken();
        const response = await fetch("/api/academy/live-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, langCode: hosting.langCode, level: hosting.level, sessionId: hosting.id }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Erreur serveur");
        setToken(result.token);
      } catch (error: any) {
        setTokenError(error.message || "Erreur serveur.");
      }
    })();
  }, [hosting]);

  const create = async () => {
    if (!choice || !when) return;
    const [langCode, level] = choice.split(":");
    setSaving(true);
    try {
      await api("/api/admin/live-sessions", {
        method: "POST",
        body: JSON.stringify({
          langCode,
          level: Number(level),
          scheduledAt: new Date(when).toISOString(),
          durationMinutes: Number(duration) || 60,
          title: title.trim() || undefined,
        }),
      });
      setWhen("");
      setTitle("");
      load();
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const setRoomOpen = async (id: string, open: boolean) => {
    setToggling(true);
    try {
      await api(`/api/admin/live-sessions/${id}`, { method: "PATCH", body: JSON.stringify({ open }) });
      setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, open } : s)));
      setHosting((h) => (h && h.id === id ? { ...h, open } : h));
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    } finally {
      setToggling(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cette session ?")) return;
    try {
      await api(`/api/admin/live-sessions/${id}`, { method: "DELETE" });
      load();
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    }
  };

  const leave = async () => {
    if (hosting?.open) {
      if (!confirm("Le cours est encore ouvert aux étudiants. Le clôturer en quittant ?")) return;
      await setRoomOpen(hosting.id, false);
    }
    setHosting(null);
  };

  const current = hosting ? sessions.find((s) => s.id === hosting.id) : null;
  const isOpen = Boolean(current?.open);

  return (
    <div className="space-y-8">
      <div className="bg-surface border border-line rounded-2xl p-6 space-y-4">
        <p className="font-bold">Programmer une classe en direct</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <select value={choice} onChange={(e) => setChoice(e.target.value)} className={input}>
            {options.map((o) => (
              <option key={`${o.langCode}:${o.level}`} value={`${o.langCode}:${o.level}`}>
                {label(o.langCode)} — niveau {o.level}
              </option>
            ))}
          </select>
          <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className={input} />
          <input type="number" min={15} step={15} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Durée (min)" className={input} />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre (optionnel)" className={input} />
        </div>
        <button onClick={create} disabled={saving || !when || !choice} className={primaryBtn}>
          {saving ? "Enregistrement…" : "Programmer"}
        </button>
      </div>

      {loading ? (
        <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
      ) : sessions.length === 0 ? (
        <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Aucune session programmée.</div>
      ) : (
        <div className="space-y-3">
          {sessions.map((s) => {
            const date = new Date(s.scheduledAt);
            const isPast = Date.now() > date.getTime() + (s.durationMinutes || 60) * 60_000;
            return (
              <div key={s.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-line bg-surface ${isPast && !s.open ? "opacity-50" : ""}`}>
                <div>
                  <p className="font-bold">
                    {label(s.langCode)} — Niveau {s.level}
                    {s.title ? ` · ${s.title}` : ""}
                  </p>
                  <p className="text-xs text-ink-soft mt-1">
                    {date.toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })} · {s.durationMinutes} min
                    {s.open && " · 🟢 Ouvert aux étudiants"}
                    {isPast && !s.open && " · Terminée"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setHosting(s)} className={primaryBtn}>
                    Rejoindre en tant qu'enseignant
                  </button>
                  <button onClick={() => remove(s.id)} className="text-red-500 hover:text-red-400 text-sm font-semibold">
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {hosting && (
        <div className="bg-surface border border-line rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">
                Salle en direct — {label(hosting.langCode)} — Niveau {hosting.level}
                {hosting.title ? ` · ${hosting.title}` : ""}
              </p>
              <p className="text-xs text-ink-soft mt-1">Vous êtes enseignant/modérateur : micro, caméra, partage d'écran, mise en sourdine des participants.</p>
            </div>
            <button onClick={leave} className="bg-surface-alt text-ink-soft font-bold px-4 py-2 rounded-xl border border-line whitespace-nowrap">
              Quitter
            </button>
          </div>

          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border ${isOpen ? "border-emerald-600/40 bg-emerald-500/10" : "border-amber-600/40 bg-amber-500/10"}`}>
            <div>
              <p className="font-bold text-sm">{isOpen ? "Cours ouvert — les étudiants peuvent entrer" : "Cours fermé — les étudiants sont en salle d'attente"}</p>
              <p className="text-xs text-ink-soft mt-0.5">
                {isOpen
                  ? "Les étudiants voient la vidéo, peuvent lever la main et écrire dans le chat. Clôturez à la fin du cours."
                  : "Préparez-vous, puis ouvrez le cours : l'accès démarre aussitôt chez les étudiants."}
              </p>
            </div>
            <button
              onClick={() => setRoomOpen(hosting.id, !isOpen)}
              disabled={toggling || !token}
              className={`text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shrink-0 disabled:opacity-50 ${isOpen ? "bg-red-700 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-500"}`}
            >
              {toggling ? "…" : isOpen ? "Clôturer le cours" : "Ouvrir le cours aux étudiants"}
            </button>
          </div>

          {tokenError ? (
            <div className="p-6 rounded-2xl border border-line bg-surface-sunken text-ink-soft text-center">{tokenError}</div>
          ) : isJitsiConfigured() && getJaasAppId() && token ? (
            <JitsiEmbed
              appId={getJaasAppId()!}
              roomName={getLiveRoomName(hosting.langCode, hosting.level, hosting.id)}
              displayName={`${teacher.name} — BM Academia`}
              jwt={token}
              role="teacher"
            />
          ) : (
            <div className="p-6 rounded-2xl border border-line bg-surface-sunken text-ink-soft text-center">Connexion à la salle…</div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Students                                                            */
/* ------------------------------------------------------------------ */
function useStudents() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api("/api/teacher/students")
      .then((r) => setStudents(r.students || []))
      .catch((e) => alert(`Erreur : ${e.message}`))
      .finally(() => setLoading(false));
  }, []);
  return { students, loading };
}

function StudentsTab({ teacher }: { teacher: TeacherProfile }) {
  const { students, loading } = useStudents();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<StudentRow | null>(null);
  const [activityOf, setActivityOf] = useState<StudentRow | null>(null);
  const shown = students.filter((s) => `${s.name} ${s.email} ${s.studentId}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-4">
      {activityOf && (
        <ActivityTimeline
          name={activityOf.name}
          email={activityOf.email}
          load={() => api(`/api/teacher/activity?uid=${encodeURIComponent(activityOf.uid)}`) as Promise<Timeline>}
          onClose={() => setActivityOf(null)}
        />
      )}
      {open && (
        <StudentDossier
          student={{ name: open.name, email: open.email, studentId: open.studentId, langCode: open.langCode }}
          levels={Object.fromEntries(Object.entries(open.levels).map(([lvl, p]) => [lvl, p.doc]))}
          onClose={() => setOpen(null)}
        />
      )}
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un étudiant…" className={`${input} max-w-sm`} />
      {loading ? (
        <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
      ) : shown.length === 0 ? (
        <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Aucun étudiant pour le moment dans vos cours.</div>
      ) : (
        <div className="overflow-x-auto border border-line rounded-2xl bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-ink-soft uppercase tracking-wide border-b border-line">
                <th className="p-3">Étudiant</th>
                <th className="p-3">Cours</th>
                <th className="p-3">Student ID</th>
                <th className="p-3">Progression</th>
                <th className="p-3">Dernière connexion</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {shown.map((s) => (
                <tr key={`${s.uid}_${s.langCode}`} className="border-b border-line/60 align-top">
                  <td className="p-3">
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-ink-faint">{s.email}</p>
                  </td>
                  <td className="p-3">{label(s.langCode)}</td>
                  <td className="p-3 font-mono text-xs text-ink-soft">{s.studentId || "—"}</td>
                  <td className="p-3 space-y-1">
                    {teacher.assignments
                      .find((a) => a.langCode === s.langCode)
                      ?.levels.map((level) => {
                        const p = s.levels[level];
                        return (
                          <p key={level} className="text-xs text-ink-soft">
                            <span className="font-semibold text-ink">Niv. {level} :</span>{" "}
                            {p ? `${p.completedLessons} leçon(s) étudiée(s) · ${p.completedQuizzes} quiz réussi(s)${p.finalQuizPassed ? ` · quiz final réussi (${p.finalQuizScore ?? "–"})` : ""}` : "pas encore commencé"}
                          </p>
                        );
                      })}
                  </td>
                  <td className="p-3">
                    <p className={`text-sm font-semibold ${s.lastActiveAt && Date.now() - new Date(s.lastActiveAt).getTime() < 7 * 86_400_000 ? "text-emerald-500" : "text-amber-500"}`}>{ago(s.lastActiveAt)}</p>
                    {!!s.activeSeconds && <p className="text-xs text-ink-faint">{duration(s.activeSeconds)} de travail</p>}
                  </td>
                  <td className="p-3 space-y-1.5">
                    <button
                      onClick={() => setActivityOf(s)}
                      className="block text-xs font-bold px-3 py-1.5 rounded-lg border border-line text-ink hover:border-red-600/60 hover:text-red-500 transition"
                    >
                      Activité
                    </button>
                    <button
                      onClick={() => setOpen(s)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border border-line text-ink hover:border-red-600/60 hover:text-red-500 transition"
                    >
                      Ouvrir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Messages                                                            */
/* ------------------------------------------------------------------ */
function MessageComposer({
  prefillUid,
  prefillSubject,
  onSent,
}: {
  prefillUid?: string;
  prefillSubject?: string;
  onSent?: () => void;
}) {
  const { students, loading } = useStudents();
  const [selected, setSelected] = useState<Set<string>>(new Set(prefillUid ? [prefillUid] : []));
  const [subject, setSubject] = useState(prefillSubject ?? "");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const keyOf = (s: StudentRow) => s.uid;
  const unique = useMemo(() => Array.from(new Map(students.map((s) => [s.uid, s])).values()), [students]);
  const toggle = (uid: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });

  const send = async () => {
    setSending(true);
    setNotice(null);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const form = new FormData();
      form.append("idToken", idToken || "");
      form.append("subject", subject);
      form.append("body", body);
      form.append(
        "recipients",
        JSON.stringify(unique.filter((s) => selected.has(s.uid)).map((s) => ({ uid: s.uid, email: s.email })))
      );
      files.forEach((f) => form.append("attachments", f));
      const response = await fetch("/api/admin/message-students", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setNotice(`Message envoyé à ${result.sentTo} étudiant(s).${result.emailWarning ? ` ${result.emailWarning}` : ""}`);
      setSubject("");
      setBody("");
      setFiles([]);
      setSelected(new Set());
      onSent?.();
    } catch (error: any) {
      setNotice(`Erreur : ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-surface border border-line rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-bold">Destinataires</p>
          <button
            onClick={() => setSelected(selected.size === unique.length ? new Set() : new Set(unique.map(keyOf)))}
            className="text-xs font-semibold text-red-500"
          >
            {selected.size === unique.length ? "Tout désélectionner" : "Tout sélectionner"}
          </button>
        </div>
        {loading ? (
          <p className="text-sm text-ink-soft">Chargement…</p>
        ) : unique.length === 0 ? (
          <p className="text-sm text-ink-soft">Aucun étudiant dans vos cours pour le moment.</p>
        ) : (
          <div className="max-h-[420px] overflow-y-auto divide-y divide-line/60">
            {unique.map((s) => (
              <label key={s.uid} className="flex items-center gap-3 py-2 cursor-pointer">
                <input type="checkbox" checked={selected.has(s.uid)} onChange={() => toggle(s.uid)} />
                <span className="text-sm">
                  {s.name} <span className="text-xs text-ink-faint">· {s.email}</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="bg-surface border border-line rounded-2xl p-5 space-y-3">
        <p className="font-bold">Message</p>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Sujet" className={input} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={7} placeholder="Votre message…" className={input} />
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink-soft border border-line rounded-lg px-3 py-2 cursor-pointer bg-surface-alt">
          Joindre un fichier
          <input type="file" multiple className="hidden" onChange={(e) => setFiles((p) => [...p, ...Array.from(e.target.files || [])])} />
        </label>
        {files.length > 0 && <p className="text-xs text-ink-soft">{files.map((f) => f.name).join(", ")}</p>}
        <div>
          <button onClick={send} disabled={sending || selected.size === 0 || !subject.trim() || !body.trim()} className={primaryBtn}>
            {sending ? "Envoi…" : `Envoyer à ${selected.size} étudiant(s)`}
          </button>
        </div>
        {notice && <p className="text-sm text-ink break-words">{notice}</p>}
        <p className="text-xs text-ink-faint">Les étudiants reçoivent le message dans leur tableau de bord et par e-mail. Leurs réponses vous reviennent à votre adresse.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Actualités (news feed)                                              */
/* ------------------------------------------------------------------ */
const FEED_ICON: Record<string, string> = {
  enrollment: "🎓",
  certificate: "🏆",
  message: "✉️",
  session: "🎥",
  announcement: "📣",
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
}

function RefreshButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="text-sm font-semibold text-ink-soft hover:text-ink border border-line rounded-xl px-4 py-2 disabled:opacity-50"
    >
      {loading ? "Actualisation…" : "↻ Actualiser"}
    </button>
  );
}

function NewsTab() {
  const [items, setItems] = useState<{ id: string; kind: string; title: string; detail?: string; at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const result = await api("/api/teacher/feed");
      setItems(result.items || []);
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-soft">Ce qui se passe autour de vos cours : nouveaux étudiants, certificats, messages, classes à venir et annonces de l'école.</p>
        <RefreshButton onClick={load} loading={loading} />
      </div>
      {loading && items.length === 0 ? (
        <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
      ) : items.length === 0 ? (
        <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Rien de nouveau pour le moment.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-line bg-surface">
              <span className="text-2xl shrink-0">{FEED_ICON[item.kind] ?? "•"}</span>
              <div className="min-w-0">
                <p className="font-bold text-sm">{item.title}</p>
                {item.detail && <p className="text-xs text-ink-soft mt-0.5 line-clamp-2">{item.detail}</p>}
                <p className="text-xs text-ink-faint mt-1">{fmtDate(item.at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Messages: received / sent / write                                   */
/* ------------------------------------------------------------------ */
function MessagesTab() {
  const [view, setView] = useState<"received" | "sent" | "write">("received");
  const [received, setReceived] = useState<any[]>([]);
  const [sent, setSent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [reply, setReply] = useState<{ uid: string; subject: string } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const result = await api("/api/teacher/messages");
      setReceived(result.received || []);
      setSent(result.sent || []);
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const subTab = (id: typeof view, label: string, count?: number) => (
    <button
      key={id}
      onClick={() => {
        setView(id);
        setOpenId(null);
        if (id !== "write") setReply(null);
      }}
      className={`px-4 py-2 text-sm font-bold rounded-xl transition ${
        view === id ? "bg-red-600 text-white" : "bg-surface-alt text-ink-soft hover:text-ink"
      }`}
    >
      {label}
      {count !== undefined ? ` (${count})` : ""}
    </button>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {subTab("received", "Reçus", received.length)}
          {subTab("sent", "Envoyés", sent.length)}
          {subTab("write", "Écrire")}
        </div>
        {view !== "write" && <RefreshButton onClick={load} loading={loading} />}
      </div>

      {view === "received" &&
        (loading && received.length === 0 ? (
          <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
        ) : received.length === 0 ? (
          <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Aucun message reçu de vos étudiants pour le moment.</div>
        ) : (
          <div className="space-y-2">
            {received.map((m) => (
              <div key={m.id} className="rounded-2xl border border-line bg-surface">
                <button onClick={() => setOpenId(openId === m.id ? null : m.id)} className="w-full text-left p-4">
                  <p className="font-bold text-sm">{m.subject}</p>
                  <p className="text-xs text-ink-soft mt-0.5">
                    {m.name} · {m.email} · {fmtDate(m.createdAt)}
                  </p>
                </button>
                {openId === m.id && (
                  <div className="px-4 pb-4 space-y-3 border-t border-line pt-3">
                    <p className="text-sm whitespace-pre-wrap">{m.message}</p>
                    {m.attachmentNames?.length > 0 && <p className="text-xs text-ink-faint">Pièces jointes : {m.attachmentNames.join(", ")}</p>}
                    <button
                      onClick={() => {
                        setReply({ uid: m.uid, subject: m.subject?.startsWith("Re:") ? m.subject : `Re: ${m.subject}` });
                        setView("write");
                      }}
                      className={primaryBtn}
                    >
                      Répondre
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

      {view === "sent" &&
        (loading && sent.length === 0 ? (
          <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
        ) : sent.length === 0 ? (
          <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Vous n'avez encore envoyé aucun message.</div>
        ) : (
          <div className="space-y-2">
            {sent.map((m) => (
              <div key={m.id} className="rounded-2xl border border-line bg-surface">
                <button onClick={() => setOpenId(openId === m.id ? null : m.id)} className="w-full text-left p-4">
                  <p className="font-bold text-sm">{m.subject}</p>
                  <p className="text-xs text-ink-soft mt-0.5">
                    À {m.recipients.length} étudiant(s) · {fmtDate(m.createdAt)}
                  </p>
                </button>
                {openId === m.id && (
                  <div className="px-4 pb-4 space-y-2 border-t border-line pt-3">
                    <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                    <p className="text-xs text-ink-faint">Destinataires : {m.recipients.map((r: any) => r.email).join(", ")}</p>
                    {m.attachmentNames?.length > 0 && <p className="text-xs text-ink-faint">Pièces jointes : {m.attachmentNames.join(", ")}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

      {view === "write" && (
        <MessageComposer
          key={reply ? `${reply.uid}-${reply.subject}` : "new"}
          prefillUid={reply?.uid}
          prefillSubject={reply?.subject}
          onSent={() => {
            setReply(null);
            load();
          }}
        />
      )}
    </div>
  );
}
