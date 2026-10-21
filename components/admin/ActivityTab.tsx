"use client";

import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";
import { availableLanguages } from "@/content/curriculum";
import { otherPrograms } from "@/content/programs";
import ActivityTimeline, { ago, duration, fullDate, type Timeline } from "@/components/academy/ActivityTimeline";

interface Row {
  uid: string;
  name: string;
  email: string;
  langCodes: string[];
  lastSignInAt: string | null;
  lastSeenAt: string | null;
  lastActivityAt: string | null;
  stats: Record<string, number>;
  reminderCount?: number;
  lastReminderAt?: string | null;
}
interface Stuck {
  uid: string;
  name: string;
  email: string;
  langCode: string;
  level: number;
  quiz: string;
  score: number;
}
interface JobInfo {
  settings: { enabled: boolean; afterDays: number; repeatDays: number; maxReminders: number };
  lastRunAt: string | null;
  lastResult: { reminders?: { sent: number } ; weeklyReport?: boolean } | null;
  lastWeeklyReport: string | null;
}

const langLabel = (code: string) => availableLanguages.find((l) => l.code === code)?.label ?? otherPrograms.find((p) => p.code === code)?.label ?? code;

async function api(url: string, init: RequestInit = {}) {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}`, ...(init.headers || {}) } });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Erreur serveur");
  return result;
}

function Card({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="p-5 rounded-2xl border border-line bg-surface">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="text-3xl font-black text-ink mt-1">{value}</p>
      {hint && <p className="text-xs text-ink-faint mt-1">{hint}</p>}
    </div>
  );
}

/** A number of days typed by hand (1 to max), saved when the field is left or Enter is pressed. */
function DaysInput({ label, value, unit, min, max, onSave }: { label: string; value: number; unit: string; min: number; max: number; onSave: (n: number) => void }) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  const commit = () => {
    const n = Math.round(Number(text));
    if (!Number.isFinite(n) || n < min || n > max) {
      setText(String(value));
      return;
    }
    if (n !== value) onSave(n);
  };
  return (
    <label className="flex items-center gap-2 text-ink-soft">
      {label}
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
        className="w-20 bg-surface-alt border border-line rounded-lg px-2 py-1 text-ink text-center focus:outline-none focus:border-red-600/60"
      />
      {unit}
    </label>
  );
}

type Filter = "all" | "today" | "week" | "inactive" | "never";

export default function ActivityTab() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [stuck, setStuck] = useState<Stuck[]>([]);
  const [job, setJob] = useState<JobInfo | null>(null);
  // "Relancer": follow up one student right now.
  const [followUp, setFollowUp] = useState<Row | null>(null);
  const [followText, setFollowText] = useState("");
  const [followBusy, setFollowBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const reload = () => {
    api("/api/admin/activity").then((r) => { setRows(r.students); setStuck(r.alerts?.stuck ?? []); }).catch((e) => setError(e.message));
    api("/api/admin/daily-job").then(setJob).catch(() => {});
  };
  useEffect(reload, []);

  const day = 86_400_000;
  // "Inactive" follows the number of days typed in the follow-up settings.
  const inactiveDays = job?.settings.afterDays ?? 7;
  const age = (r: Row) => (r.lastActivityAt ? Date.now() - new Date(r.lastActivityAt).getTime() : Infinity);
  const counts = useMemo(() => {
    const list = rows ?? [];
    return {
      today: list.filter((r) => age(r) < day).length,
      week: list.filter((r) => age(r) < 7 * day).length,
      inactive: list.filter((r) => age(r) >= inactiveDays * day && age(r) !== Infinity).length,
      never: list.filter((r) => !r.lastActivityAt).length,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, inactiveDays]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows ?? [])
      .filter((r) => {
        if (filter === "today") return age(r) < day;
        if (filter === "week") return age(r) < 7 * day;
        if (filter === "inactive") return age(r) >= inactiveDays * day && age(r) !== Infinity;
        if (filter === "never") return !r.lastActivityAt;
        return true;
      })
      .filter((r) => !q || `${r.name} ${r.email}`.toLowerCase().includes(q))
      .sort((a, b) => String(b.lastActivityAt ?? "").localeCompare(String(a.lastActivityAt ?? "")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, filter, query, inactiveDays]);

  const saveSettings = async (patch: Partial<JobInfo["settings"]>) => {
    try {
      const r = await api("/api/admin/daily-job", { method: "PATCH", body: JSON.stringify(patch) });
      setJob((j) => (j ? { ...j, settings: r.settings } : j));
    } catch (e: any) {
      setNote(`Erreur : ${e.message}`);
    }
  };
  const sendFollowUp = async () => {
    if (!followUp) return;
    setFollowBusy(true);
    try {
      const r = await api("/api/admin/follow-up", { method: "POST", body: JSON.stringify({ uid: followUp.uid, message: followText }) });
      setNote(
        r.emailSent
          ? `Relance envoyée à ${followUp.name || followUp.email} (e-mail + notification).`
          : `Notification envoyée à ${followUp.name || followUp.email}, mais l'e-mail n'est pas parti${r.emailError ? ` (${r.emailError})` : ""}.`
      );
      setFollowUp(null);
      reload();
    } catch (e: any) {
      setNote(`Erreur : ${e.message}`);
    } finally {
      setFollowBusy(false);
    }
  };
  const runNow = async () => {
    setBusy(true);
    setNote(null);
    try {
      const r = await api("/api/admin/daily-job", { method: "POST" });
      setNote(
        r.ran
          ? `Suivi exécuté : ${r.reminders ? `${r.reminders.sent} rappel(s) envoyé(s)` : "rappels désactivés"}${r.weeklyReport ? " ; rapport hebdomadaire envoyé à votre e-mail" : ""}.`
          : "Le suivi tourne déjà ou vient de s'exécuter."
      );
      reload();
    } catch (e: any) {
      setNote(`Erreur : ${e.message}`);
    } finally {
      setBusy(false);
    }
  };

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
  const byUid = new Map(rows.map((r) => [r.uid, r]));

  return (
    <div className="space-y-6">
      <p className="text-xs text-ink-soft max-w-2xl">
        Quand chaque étudiant s'est connecté pour la dernière fois et ce qu'il a fait : leçons ouvertes, quiz (avec la note), temps passé, cours
        en direct, messages, certificats. « Voir » ouvre son historique complet, jour par jour.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card label="Actifs aujourd'hui" value={counts.today} hint="Vus dans les dernières 24 h" />
        <Card label="Actifs cette semaine" value={counts.week} hint="Vus dans les 7 derniers jours" />
        <Card label={`Inactifs (+ ${inactiveDays} jours)`} value={counts.inactive} hint="Relancés automatiquement" />
        <Card label="Jamais connectés" value={counts.never} hint="Compte créé, jamais ouvert" />
      </div>

      {/* Alerts */}
      <div className="p-5 rounded-2xl border border-amber-600/30 bg-amber-500/5">
        <p className="font-bold text-ink">Alertes ({stuck.length})</p>
        {stuck.length === 0 ? (
          <p className="text-sm text-ink-soft mt-1">Aucun étudiant bloqué : tout va bien.</p>
        ) : (
          <>
            <p className="text-xs text-ink-soft mt-1">
              Étudiants dont le premier essai à un quiz est échoué : seul le premier essai compte, la leçon suivante reste donc verrouillée. Contactez-les (message ou professeur).
            </p>
            <div className="mt-3 space-y-1.5 max-h-60 overflow-y-auto">
              {stuck.map((s, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="text-ink">
                    <b>{s.name || s.email}</b> — {s.quiz} · {langLabel(s.langCode)} niveau {s.level} <span className="text-red-500 font-semibold">(note {s.score})</span>
                  </span>
                  {byUid.get(s.uid) && (
                    <button onClick={() => setOpen(byUid.get(s.uid)!)} className="text-xs font-bold text-red-500 hover:text-red-400">Voir l'activité</button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Automatic follow-up */}
      <div className="p-5 rounded-2xl border border-line bg-surface space-y-3">
        <p className="font-bold text-ink">Suivi automatique</p>
        <p className="text-xs text-ink-soft max-w-2xl">
          Chaque jour, le site envoie un rappel (e-mail + notification) aux étudiants inactifs, selon les nombres de jours que vous tapez
          ci-dessous, et vous envoie chaque lundi un rapport de la semaine. Il s'exécute tout seul à la première visite du jour, après 8 h.
          Pour relancer un seul étudiant tout de suite, utilisez le bouton « Relancer » de sa ligne.
        </p>
        {job && (
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="flex items-center gap-2 text-ink cursor-pointer">
              <input type="checkbox" checked={job.settings.enabled} onChange={(e) => saveSettings({ enabled: e.target.checked })} />
              Rappels automatiques aux inactifs
            </label>
            <DaysInput label="après" value={job.settings.afterDays} unit="jours d'inactivité" min={1} max={365} onSave={(n) => saveSettings({ afterDays: n })} />
            <DaysInput label="puis tous les" value={job.settings.repeatDays} unit="jours" min={1} max={90} onSave={(n) => saveSettings({ repeatDays: n })} />
            <DaysInput label="au plus" value={job.settings.maxReminders} unit="rappels par étudiant" min={1} max={30} onSave={(n) => saveSettings({ maxReminders: n })} />
            <button onClick={runNow} disabled={busy} className="px-3 py-1.5 rounded-lg border border-line text-xs font-bold text-ink hover:border-red-600/60 disabled:opacity-50">
              {busy ? "En cours…" : "Lancer le suivi maintenant"}
            </button>
            <span className="text-xs text-ink-faint">Dernière exécution : {job.lastRunAt ? fullDate(job.lastRunAt) : "jamais"}{job.lastWeeklyReport ? ` · dernier rapport : ${job.lastWeeklyReport}` : ""}</span>
          </div>
        )}
        {note && <p className="text-sm text-ink">{note}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {chip("all", `Tous (${rows.length})`)}
        {chip("today", "Actifs aujourd'hui")}
        {chip("week", "Actifs cette semaine")}
        {chip("inactive", `Inactifs +${inactiveDays} jours`)}
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
              <th className="p-3">Temps actif</th>
              <th className="p-3">Leçons</th>
              <th className="p-3">Quiz</th>
              <th className="p-3">Suivi</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 ? (
              <tr><td colSpan={9} className="p-4 text-ink-soft">Aucun étudiant pour ce filtre.</td></tr>
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
                      <p className="text-xs text-ink-faint">{fullDate(r.lastSignInAt)}</p>
                    </td>
                    <td className="p-3 text-ink">{ago(r.lastActivityAt)}</td>
                    <td className="p-3 text-ink-soft">{duration(r.stats.seconds || 0)}</td>
                    <td className="p-3 text-ink-soft">{r.stats.lessonOpens || 0}</td>
                    <td className="p-3 text-ink-soft">{(r.stats.quizzes || 0) + (r.stats.finalQuizzes || 0)}</td>
                    <td className="p-3 text-xs text-ink-soft whitespace-nowrap">
                      {(r.reminderCount ?? 0) > 0 ? (
                        <>
                          {r.reminderCount} rappel{(r.reminderCount ?? 0) > 1 ? "s" : ""}
                          <span className="block text-ink-faint">dernier {ago(r.lastReminderAt ?? null)}</span>
                        </>
                      ) : (
                        <span className="text-ink-faint">aucun rappel</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={() => { setFollowUp(r); setFollowText(""); }} className="text-xs font-bold px-3 py-1.5 rounded-lg border border-line text-ink hover:border-amber-500/60 hover:text-amber-500 transition">Relancer</button>
                        <button onClick={() => setOpen(r)} className="text-xs font-bold px-3 py-1.5 rounded-lg border border-line text-ink hover:border-red-600/60 hover:text-red-500 transition">Voir</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {followUp && (
        <div className="fixed inset-0 z-[70] bg-black/70 flex items-start justify-center overflow-y-auto p-4" onClick={() => setFollowUp(null)}>
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl my-8 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div>
              <h3 className="text-lg font-bold text-ink">Relancer {followUp.name || followUp.email}</h3>
              <p className="text-xs text-ink-soft mt-1">
                Dernière connexion : {ago(followUp.lastSignInAt)} · {(followUp.reminderCount ?? 0) > 0 ? `${followUp.reminderCount} rappel(s) déjà envoyé(s)` : "aucun rappel envoyé"}.
                L&apos;étudiant reçoit un e-mail et une notification dans son espace.
              </p>
            </div>
            <textarea
              value={followText}
              onChange={(e) => setFollowText(e.target.value)}
              rows={5}
              placeholder="Message personnel (facultatif). Laissez vide pour envoyer le message habituel : « Cela fait N jours que nous ne vous avons pas vu… »"
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setFollowUp(null)} className="px-4 py-2 rounded-xl border border-line text-sm font-bold text-ink-soft hover:text-ink">Annuler</button>
              <button onClick={sendFollowUp} disabled={followBusy} className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold">
                {followBusy ? "Envoi…" : "Envoyer la relance"}
              </button>
            </div>
          </div>
        </div>
      )}

      {open && (
        <ActivityTimeline
          name={open.name}
          email={open.email}
          load={() => api(`/api/admin/activity?uid=${encodeURIComponent(open.uid)}`) as Promise<Timeline>}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
