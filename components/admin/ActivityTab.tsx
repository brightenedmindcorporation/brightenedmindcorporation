"use client";

import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";
import { availableLanguages } from "@/content/curriculum";
import { otherPrograms } from "@/content/programs";

interface Row {
  uid: string;
  name: string;
  email: string;
  langCodes: string[];
  createdAt: string | null;
  lastSignInAt: string | null;
  lastSeenAt: string | null;
  lastActivityAt: string | null;
  loginCount: number;
  sessionCount: number;
  stats: Record<string, number>;
}
interface EventRow {
  id: string;
  type: string;
  label: string;
  at: string;
}
interface Timeline {
  events: EventRow[];
  summary: { name?: string; email?: string; lastSeenAt: string | null; lastLoginAt: string | null; loginCount: number; sessionCount: number; stats: Record<string, number>; lastSignInAt?: string; createdAt?: string };
}

const langLabel = (code: string) => availableLanguages.find((l) => l.code === code)?.label ?? otherPrograms.find((p) => p.code === code)?.label ?? code;

async function api(url: string) {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await fetch(url, { headers: { Authorization: `Bearer ${idToken}` } });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Erreur serveur");
  return result;
}

/** "il y a 3 h", "hier", "il y a 12 jours" */
function ago(iso: string | null): string {
  if (!iso) return "Jamais";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 2) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.floor(h / 24);
  if (d === 1) return "hier";
  if (d < 60) return `il y a ${d} jours`;
  return `il y a ${Math.floor(d / 30)} mois`;
}
const full = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" }) : "—";

const EVENT_STYLE: Record<string, { icon: string; color: string }> = {
  login: { icon: "🔑", color: "text-blue-500" },
  session: { icon: "🏠", color: "text-ink-soft" },
  lesson_open: { icon: "📖", color: "text-ink" },
  quiz: { icon: "✅", color: "text-emerald-500" },
  final_quiz: { icon: "🏁", color: "text-emerald-500" },
  live_join: { icon: "🎥", color: "text-red-500" },
  message: { icon: "✉️", color: "text-amber-500" },
  certificate: { icon: "🏆", color: "text-amber-500" },
  level_request: { icon: "⬆️", color: "text-amber-500" },
};

function Card({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="p-5 rounded-2xl border border-line bg-surface">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="text-3xl font-black text-ink mt-1">{value}</p>
      {hint && <p className="text-xs text-ink-faint mt-1">{hint}</p>}
    </div>
  );
}

function TimelineModal({ row, onClose }: { row: Row; onClose: () => void }) {
  const [data, setData] = useState<Timeline | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    api(`/api/admin/activity?uid=${encodeURIComponent(row.uid)}`).then(setData).catch((e) => setError(e.message));
  }, [row.uid]);

  // Group the events by day, newest first.
  const days = useMemo(() => {
    const map = new Map<string, EventRow[]>();
    for (const e of data?.events ?? []) {
      const day = new Date(e.at).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      map.set(day, [...(map.get(day) ?? []), e]);
    }
    return Array.from(map);
  }, [data]);

  const s = data?.summary;
  return (
    <div className="fixed inset-0 z-[80] bg-black/60 flex items-start justify-center overflow-y-auto p-4" onClick={onClose}>
      <div className="w-full max-w-3xl my-8 bg-surface border border-line rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 p-6 border-b border-line">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-red-500">Activité de l'étudiant</p>
            <h2 className="text-2xl font-black text-ink mt-1">{row.name || row.email}</h2>
            <p className="text-sm text-ink-soft mt-0.5">{row.email}</p>
          </div>
          <button onClick={onClose} aria-label="Fermer" className="p-2 rounded-lg text-ink-soft hover:text-ink hover:bg-surface-alt">✕</button>
        </div>
        <div className="p-6 space-y-6">
          {error && <p className="text-red-500 text-sm">Erreur : {error}</p>}
          {!data && !error && <p className="text-ink-soft text-sm">Chargement…</p>}
          {s && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-surface-alt border border-line"><p className="text-xs text-ink-soft">Inscrit le</p><p className="font-semibold text-ink">{full(s.createdAt)}</p></div>
                <div className="p-3 rounded-xl bg-surface-alt border border-line"><p className="text-xs text-ink-soft">Dernière connexion</p><p className="font-semibold text-ink">{full(s.lastSignInAt || s.lastLoginAt)}</p></div>
                <div className="p-3 rounded-xl bg-surface-alt border border-line"><p className="text-xs text-ink-soft">Dernière activité</p><p className="font-semibold text-ink">{full(s.lastSeenAt || s.lastSignInAt)}</p></div>
                <div className="p-3 rounded-xl bg-surface-alt border border-line"><p className="text-xs text-ink-soft">Connexions suivies</p><p className="font-semibold text-ink">{s.loginCount + s.sessionCount}</p></div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {[
                  ["Leçons ouvertes", s.stats.lessonOpens],
                  ["Quiz passés", s.stats.quizzes],
                  ["Quiz finaux", s.stats.finalQuizzes],
                  ["Cours en direct", s.stats.liveJoins],
                  ["Messages", s.stats.messages],
                  ["Certificats", s.stats.certificates],
                ].map(([label, n]) => (
                  <span key={label as string} className="px-3 py-1 rounded-full border border-line bg-surface-alt text-ink-soft">{label} : <b className="text-ink">{(n as number) || 0}</b></span>
                ))}
              </div>
              <p className="text-xs text-ink-faint">Le détail des actions est enregistré depuis la mise en service de ce suivi ; la date de dernière connexion, elle, est connue pour tous les comptes.</p>
              {days.length === 0 ? (
                <p className="text-sm text-ink-soft">Aucune action enregistrée pour le moment.</p>
              ) : (
                <div className="space-y-5">
                  {days.map(([day, events]) => (
                    <div key={day}>
                      <p className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-2 capitalize">{day}</p>
                      <div className="space-y-1.5 border-l-2 border-line pl-4">
                        {events.map((e) => {
                          const st = EVENT_STYLE[e.type] ?? { icon: "•", color: "text-ink" };
                          return (
                            <p key={e.id} className="text-sm flex gap-3">
                              <span className="text-ink-faint font-mono text-xs w-11 shrink-0 pt-0.5">{new Date(e.at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
                              <span className={st.color}>{st.icon} {e.label}</span>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type Filter = "all" | "today" | "week" | "inactive" | "never";

export default function ActivityTab() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Row | null>(null);

  useEffect(() => {
    api("/api/admin/activity").then((r) => setRows(r.students)).catch((e) => setError(e.message));
  }, []);

  const day = 86_400_000;
  const age = (r: Row) => (r.lastActivityAt ? Date.now() - new Date(r.lastActivityAt).getTime() : Infinity);
  const counts = useMemo(() => {
    const list = rows ?? [];
    return {
      today: list.filter((r) => age(r) < day).length,
      week: list.filter((r) => age(r) < 7 * day).length,
      inactive: list.filter((r) => age(r) >= 7 * day && age(r) !== Infinity).length,
      never: list.filter((r) => !r.lastActivityAt).length,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows ?? [])
      .filter((r) => {
        if (filter === "today") return age(r) < day;
        if (filter === "week") return age(r) < 7 * day;
        if (filter === "inactive") return age(r) >= 7 * day && age(r) !== Infinity;
        if (filter === "never") return !r.lastActivityAt;
        return true;
      })
      .filter((r) => !q || `${r.name} ${r.email}`.toLowerCase().includes(q))
      .sort((a, b) => String(b.lastActivityAt ?? "").localeCompare(String(a.lastActivityAt ?? "")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, filter, query]);

  if (error) return <div className="p-4 rounded-2xl border border-line bg-surface text-red-500">Erreur : {error}</div>;
  if (!rows) return <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>;

  const chip = (id: Filter, label: string) => (
    <button
      key={id}
      onClick={() => setFilter(id)}
      className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition ${filter === id ? "bg-red-600 text-white border-red-600" : "border-line text-ink-soft hover:text-ink"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <p className="text-xs text-ink-soft max-w-2xl">
        Quand chaque étudiant s'est connecté pour la dernière fois et ce qu'il a fait : leçons ouvertes, quiz (avec la note), cours en direct,
        messages, certificats. Cliquez sur « Voir » pour son historique complet jour par jour.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card label="Actifs aujourd'hui" value={counts.today} hint="Vus dans les dernières 24 h" />
        <Card label="Actifs cette semaine" value={counts.week} hint="Vus dans les 7 derniers jours" />
        <Card label="Inactifs (+ 7 jours)" value={counts.inactive} hint="À relancer" />
        <Card label="Jamais connectés" value={counts.never} hint="Compte créé, jamais ouvert" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {chip("all", `Tous (${rows.length})`)}
        {chip("today", "Actifs aujourd'hui")}
        {chip("week", "Actifs cette semaine")}
        {chip("inactive", "Inactifs +7 jours")}
        {chip("never", "Jamais connectés")}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un étudiant…"
          className="ml-auto bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
        />
      </div>

      <div className="overflow-x-auto border border-line rounded-2xl bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink-soft uppercase tracking-wide border-b border-line">
              <th className="p-3">Étudiant</th>
              <th className="p-3">Cours</th>
              <th className="p-3">Dernière connexion</th>
              <th className="p-3">Dernière activité</th>
              <th className="p-3">Leçons</th>
              <th className="p-3">Quiz</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 ? (
              <tr><td colSpan={7} className="p-4 text-ink-soft">Aucun étudiant pour ce filtre.</td></tr>
            ) : (
              shown.map((r) => {
                const a = age(r);
                const dot = a < day ? "bg-emerald-500" : a < 7 * day ? "bg-amber-500" : "bg-zinc-400";
                return (
                  <tr key={r.uid} className="border-b border-line/60">
                    <td className="p-3">
                      <p className="font-semibold text-ink flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${dot}`} />{r.name || "(sans nom)"}</p>
                      <p className="text-xs text-ink-faint">{r.email}</p>
                    </td>
                    <td className="p-3 text-ink-soft">{r.langCodes.map(langLabel).join(", ") || "—"}</td>
                    <td className="p-3">
                      <p className="text-ink">{ago(r.lastSignInAt)}</p>
                      <p className="text-xs text-ink-faint">{full(r.lastSignInAt)}</p>
                    </td>
                    <td className="p-3 text-ink">{ago(r.lastActivityAt)}</td>
                    <td className="p-3 text-ink-soft">{r.stats.lessonOpens || 0}</td>
                    <td className="p-3 text-ink-soft">{(r.stats.quizzes || 0) + (r.stats.finalQuizzes || 0)}</td>
                    <td className="p-3">
                      <button onClick={() => setOpen(r)} className="text-xs font-bold px-3 py-1.5 rounded-lg border border-line text-ink hover:border-red-600/60 hover:text-red-500 transition">Voir</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {open && <TimelineModal row={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
