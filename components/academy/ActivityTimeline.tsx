"use client";

import { useEffect, useMemo, useState } from "react";

export interface TimelineEvent {
  id: string;
  type: string;
  label: string;
  at: string;
}
export interface Timeline {
  events: TimelineEvent[];
  time?: { day: string; seconds: number; pages: Record<string, number> }[];
  summary: {
    name?: string;
    email?: string;
    lastSeenAt: string | null;
    lastLoginAt: string | null;
    loginCount: number;
    sessionCount: number;
    stats: Record<string, number>;
    lastSignInAt?: string;
    createdAt?: string;
    reminderCount?: number;
    lastReminderAt?: string | null;
  };
}

/** "il y a 3 h", "hier", "il y a 12 jours" */
export function ago(iso: string | null | undefined): string {
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
export const fullDate = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" }) : "—";

/** 3725 → "1 h 02" ; 540 → "9 min" */
export function duration(seconds: number): string {
  const s = Math.round(seconds || 0);
  if (s < 60) return s > 0 ? `${s} s` : "0";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`;
}

/** "EN-1-lesson-3" → "Leçon 3 · EN niveau 1" */
function pageName(key: string): string {
  const [lang, level, kind, id] = key.split("_").length > 1 ? key.split("_") : key.split("-");
  const where = `${lang} niveau ${level}`;
  if (kind === "lesson") return `Leçon ${id} · ${where}`;
  if (kind === "quiz") return `Quiz ${id} · ${where}`;
  if (kind === "final") return `Quiz final · ${where}`;
  return key;
}

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
  reminder: { icon: "🔔", color: "text-ink-faint" },
};

/** A student's file of activity: last sign-in, time spent, and every action day by day. */
export default function ActivityTimeline({
  name,
  email,
  load,
  onClose,
}: {
  name: string;
  email: string;
  load: () => Promise<Timeline>;
  onClose: () => void;
}) {
  const [data, setData] = useState<Timeline | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    load().then(setData).catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const days = useMemo(() => {
    const map = new Map<string, TimelineEvent[]>();
    for (const e of data?.events ?? []) {
      const day = new Date(e.at).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      map.set(day, [...(map.get(day) ?? []), e]);
    }
    return Array.from(map);
  }, [data]);

  // Where the time went (last 30 days), most-worked pages first.
  const pages = useMemo(() => {
    const total: Record<string, number> = {};
    for (const d of data?.time ?? []) for (const [k, v] of Object.entries(d.pages)) total[k] = (total[k] || 0) + (Number(v) || 0);
    return Object.entries(total).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [data]);
  const timeTotal = (data?.time ?? []).reduce((n, d) => n + (d.seconds || 0), 0);

  const s = data?.summary;
  return (
    <div className="fixed inset-0 z-[80] bg-black/60 flex items-start justify-center overflow-y-auto p-4" onClick={onClose}>
      <div className="w-full max-w-3xl my-8 bg-surface border border-line rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 p-6 border-b border-line">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-red-500">Activité de l'étudiant</p>
            <h2 className="text-2xl font-black text-ink mt-1">{name || email}</h2>
            <p className="text-sm text-ink-soft mt-0.5">{email}</p>
          </div>
          <button onClick={onClose} aria-label="Fermer" className="p-2 rounded-lg text-ink-soft hover:text-ink hover:bg-surface-alt">✕</button>
        </div>
        <div className="p-6 space-y-6">
          {error && <p className="text-red-500 text-sm">Erreur : {error}</p>}
          {!data && !error && <p className="text-ink-soft text-sm">Chargement…</p>}
          {s && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-surface-alt border border-line"><p className="text-xs text-ink-soft">Inscrit le</p><p className="font-semibold text-ink">{fullDate(s.createdAt)}</p></div>
                <div className="p-3 rounded-xl bg-surface-alt border border-line"><p className="text-xs text-ink-soft">Dernière connexion</p><p className="font-semibold text-ink">{fullDate(s.lastSignInAt || s.lastLoginAt)}</p></div>
                <div className="p-3 rounded-xl bg-surface-alt border border-line"><p className="text-xs text-ink-soft">Dernière activité</p><p className="font-semibold text-ink">{fullDate(s.lastSeenAt || s.lastSignInAt)}</p></div>
                <div className="p-3 rounded-xl bg-surface-alt border border-line"><p className="text-xs text-ink-soft">Temps actif (30 j)</p><p className="font-semibold text-ink">{duration(timeTotal)}</p></div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {[
                  ["Connexions suivies", (s.loginCount || 0) + (s.sessionCount || 0)],
                  ["Leçons ouvertes", s.stats.lessonOpens],
                  ["Quiz passés", s.stats.quizzes],
                  ["Quiz finaux", s.stats.finalQuizzes],
                  ["Cours en direct", s.stats.liveJoins],
                  ["Messages", s.stats.messages],
                  ["Certificats", s.stats.certificates],
                  ["Rappels reçus", s.reminderCount],
                ].map(([label, n]) => (
                  <span key={label as string} className="px-3 py-1 rounded-full border border-line bg-surface-alt text-ink-soft">{label} : <b className="text-ink">{(n as number) || 0}</b></span>
                ))}
              </div>
              {pages.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-2">Où l'étudiant passe son temps</p>
                  <div className="space-y-1.5">
                    {pages.map(([key, sec]) => (
                      <div key={key} className="flex items-center gap-3 text-sm">
                        <span className="w-56 shrink-0 text-ink truncate">{pageName(key)}</span>
                        <div className="flex-1 h-2 rounded-full bg-surface-alt overflow-hidden"><div className="h-full bg-red-600" style={{ width: `${Math.max(4, (sec / pages[0][1]) * 100)}%` }} /></div>
                        <span className="w-16 text-right text-ink-soft font-semibold">{duration(sec)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-xs text-ink-faint">Le détail des actions et le temps actif sont enregistrés depuis la mise en service de ce suivi ; la date de dernière connexion, elle, est connue pour tous les comptes.</p>
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
