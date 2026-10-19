"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { availableLanguages } from "@/content/curriculum";

interface Test {
  id: string;
  uid: string;
  langCode: string;
  name: string;
  email: string;
  status: "submitted" | "decided";
  submittedAt: string;
  byLevel: Record<string, { score: number; total: number }>;
  suggestedLevel: number;
  reading?: { score: number; total: number };
  listening?: { score: number; total: number };
  answers: { id: string; section?: string; level: number; question: string; chosen: string; correct: string; ok: boolean }[];
  readAloud?: { transcript: string; score: number | null; audioUrl: string | null; skipped: boolean; expected: string };
  recommendation?: { level: number; comment: string; by: string };
  writing: string;
  decidedLevel?: number;
  comment?: string;
  decidedBy?: string;
}

const date = (iso: string) => new Date(iso).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });

/** Placement tests to read: automatic scores per level, the written presentation, and the level to give. */
export default function PlacementTab({ getToken, teacher = false }: { getToken?: () => Promise<string | undefined>; teacher?: boolean }) {
  const [tests, setTests] = useState<Test[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"todo" | "done">("todo");
  const [open, setOpen] = useState<string | null>(null);
  const [level, setLevel] = useState<Record<string, number>>({});
  const [comment, setComment] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const token = async () => (getToken ? getToken() : auth.currentUser?.getIdToken());

  const load = async () => {
    try {
      const response = await fetch("/api/admin/placement", { headers: { Authorization: `Bearer ${await token()}` } });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setTests(result.tests || []);
    } catch (e: any) {
      setError(e.message);
    }
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decide = async (t: Test) => {
    const chosen = level[t.id] ?? t.suggestedLevel;
    const question = teacher
      ? `Envoyer à l'administration votre recommandation : niveau ${chosen} pour ${t.name} ?\nC'est l'administration qui attribue le niveau.`
      : `Attribuer le niveau ${chosen} à ${t.name} ?\nL'étudiant est prévenu dans son espace et par e-mail.`;
    if (!confirm(question)) return;
    setBusy(t.id);
    try {
      const response = await fetch("/api/admin/placement/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        body: JSON.stringify({ id: t.id, level: chosen, comment: comment[t.id] || "" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      if (result.recommended) alert("Votre recommandation a été envoyée à l'administration.");
      setOpen(null);
      await load();
    } catch (e: any) {
      alert(`Erreur : ${e.message}`);
    } finally {
      setBusy(null);
    }
  };

  if (error) return <div className="p-4 rounded-2xl border border-line bg-surface text-red-500">Erreur : {error}</div>;
  if (!tests) return <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>;

  const todo = tests.filter((t) => t.status === "submitted");
  const done = tests.filter((t) => t.status === "decided");
  const shown = filter === "todo" ? todo : done;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {(
          [
            ["todo", `À corriger (${todo.length})`],
            ["done", `Corrigés (${done.length})`],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition ${filter === id ? "bg-red-600 text-white" : "bg-surface-alt text-ink-soft hover:text-ink"}`}
          >
            {label}
          </button>
        ))}
        <p className="text-xs text-ink-soft">
          {teacher
            ? "Le niveau suggéré vient des notes automatiques. Vous pouvez recommander un niveau : l'administration décide."
            : "Le niveau suggéré vient des notes automatiques ; vous décidez après avoir lu, écouté et lu le texte de l'étudiant."}
        </p>
      </div>

      {shown.length === 0 && <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">{filter === "todo" ? "Aucun test à corriger." : "Aucun test corrigé pour le moment."}</div>}

      {shown.map((t) => {
        const isOpen = open === t.id;
        const lang = availableLanguages.find((l) => l.code === t.langCode)?.label ?? t.langCode;
        const chosen = level[t.id] ?? t.suggestedLevel;
        return (
          <div key={t.id} className="rounded-2xl border border-line bg-surface">
            <button onClick={() => setOpen(isOpen ? null : t.id)} className="w-full text-left p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-ink">
                  {t.name} <span className="text-ink-faint font-normal text-sm">· {lang}</span>
                </p>
                <p className="text-xs text-ink-soft mt-0.5">
                  {t.email} · envoyé le {date(t.submittedAt)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                {[1, 2, 3].map((l) => (
                  <span key={l} className="px-2.5 py-1 rounded-full border border-line bg-surface-alt text-ink-soft">
                    N{l} : <b className="text-ink">{t.byLevel?.[l] ? `${t.byLevel[l].score}/${t.byLevel[l].total}` : "—"}</b>
                  </span>
                ))}
                {t.reading && (
                  <span className="px-2.5 py-1 rounded-full border border-line bg-surface-alt text-ink-soft">
                    Lecture : <b className="text-ink">{t.reading.score}/{t.reading.total}</b>
                  </span>
                )}
                {t.listening && (
                  <span className="px-2.5 py-1 rounded-full border border-line bg-surface-alt text-ink-soft">
                    Écoute : <b className="text-ink">{t.listening.score}/{t.listening.total}</b>
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-red-600 text-white">
                  {t.status === "decided" ? `Niveau donné : ${t.decidedLevel}` : `Suggéré : niveau ${t.suggestedLevel}`}
                </span>
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-line p-4 space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">Lecture à voix haute</p>
                  {t.readAloud?.skipped && !t.readAloud.audioUrl ? (
                    <p className="text-sm text-amber-500">L&apos;étudiant n&apos;a pas pu utiliser le micro et a passé cette partie.</p>
                  ) : (
                    <>
                      {t.readAloud?.audioUrl && <audio controls src={t.readAloud.audioUrl} className="w-full" />}
                      <p className="text-xs text-ink-faint">
                        Texte à lire : <span translate="no" className="notranslate text-ink-soft">{t.readAloud?.expected}</span>
                      </p>
                      <p className="text-xs text-ink-faint">
                        Compris par le micro : <span translate="no" className="notranslate text-ink-soft">{t.readAloud?.transcript || "(rien)"}</span>
                        {t.readAloud?.score != null && <b className="text-ink"> · ressemblance {t.readAloud.score} %</b>}
                      </p>
                    </>
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-1.5">Texte de présentation</p>
                  <p translate="no" className="notranslate whitespace-pre-wrap rounded-xl bg-surface-alt border border-line p-3 text-ink">{t.writing || "—"}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-1.5">Réponses aux questions</p>
                  <div className="rounded-xl border border-line divide-y divide-line max-h-72 overflow-y-auto">
                    {t.answers.map((a, i) => (
                      <div key={a.id} className="p-2.5 text-sm flex gap-3">
                        <span className="text-ink-faint w-6 shrink-0">{a.section === "reading" ? "Lec" : a.section === "listening" ? "Éc" : `N${a.level}`}</span>
                        <span translate="no" className="notranslate flex-1 text-ink-soft">
                          {i + 1}. {a.question}
                          <span className="block">
                            <b className={a.ok ? "text-emerald-500" : "text-red-500"}>{a.chosen || "(sans réponse)"}</b>
                            {!a.ok && <span className="text-ink-faint"> — attendu : {a.correct}</span>}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {t.status === "submitted" ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <b className="text-ink">Niveau à attribuer :</b>
                      {[1, 2, 3].map((l) => (
                        <label key={l} className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name={`lvl-${t.id}`} checked={chosen === l} onChange={() => setLevel((s) => ({ ...s, [t.id]: l }))} /> Niveau {l}
                          {l === t.suggestedLevel && <span className="text-[11px] text-ink-faint">(suggéré)</span>}
                        </label>
                      ))}
                    </div>
                    <textarea
                      value={comment[t.id] ?? ""}
                      onChange={(e) => setComment((s) => ({ ...s, [t.id]: e.target.value }))}
                      rows={2}
                      placeholder="Un mot pour l'étudiant (facultatif) : points forts, conseils…"
                      className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                    />
                    {t.recommendation && (
                      <p className="text-sm text-amber-500">
                        Recommandation de {t.recommendation.by} : niveau {t.recommendation.level}
                        {t.recommendation.comment ? ` — « ${t.recommendation.comment} »` : ""}
                      </p>
                    )}
                    <button
                      onClick={() => decide(t)}
                      disabled={busy === t.id}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold"
                    >
                      {busy === t.id ? "Enregistrement…" : teacher ? `Recommander le niveau ${chosen}` : `Attribuer le niveau ${chosen}`}
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-ink-soft">
                    Niveau {t.decidedLevel} attribué{t.decidedBy ? ` par ${t.decidedBy}` : ""}.{t.comment ? ` « ${t.comment} »` : ""}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
