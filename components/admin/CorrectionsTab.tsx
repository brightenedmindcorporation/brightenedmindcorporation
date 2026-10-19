"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { availableLanguages } from "@/content/curriculum";

interface Item {
  kind: "dictation" | "reply" | "free";
  prompt: string;
  expected?: string;
  text: string;
}
interface Review {
  id: string;
  name: string;
  email: string;
  langCode: string;
  level: number;
  key: string;
  quizTitle: string;
  items: Item[];
  status: "pending" | "reviewed";
  submittedAt: string;
  feedback?: { corrected: string; comment: string }[];
  overall?: string;
  mark?: number | null;
  reviewedBy?: string;
}

const KIND_LABEL: Record<Item["kind"], string> = { dictation: "Dictée", reply: "Réponse personnelle", free: "Texte libre" };
const date = (iso: string) => new Date(iso).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });

/** Written work of the quizzes, to correct: the texts, a corrected version and a comment for each, a mark. */
export default function CorrectionsTab({ getToken }: { getToken?: () => Promise<string | undefined> }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "reviewed">("pending");
  const [open, setOpen] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, { feedback: { corrected: string; comment: string }[]; overall: string; mark: string }>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const token = async () => (getToken ? getToken() : auth.currentUser?.getIdToken());

  const load = async () => {
    try {
      const response = await fetch("/api/admin/writing-reviews", { headers: { Authorization: `Bearer ${await token()}` } });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setReviews(result.reviews || []);
    } catch (e: any) {
      setError(e.message);
    }
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draftFor = (r: Review) =>
    draft[r.id] ?? {
      // Starting point of the correction: what the student wrote (the teacher edits it).
      feedback: r.items.map((it, i) => ({ corrected: r.feedback?.[i]?.corrected ?? it.text, comment: r.feedback?.[i]?.comment ?? "" })),
      overall: r.overall ?? "",
      mark: r.mark != null ? String(r.mark) : "",
    };

  const save = async (r: Review) => {
    const d = draftFor(r);
    setBusy(r.id);
    try {
      const response = await fetch(`/api/admin/writing-reviews/${r.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        // A corrected text identical to the original means "nothing to change": only real corrections are kept.
        body: JSON.stringify({
          feedback: d.feedback.map((f, i) => ({ corrected: f.corrected.trim() === r.items[i].text.trim() ? "" : f.corrected, comment: f.comment })),
          overall: d.overall,
          mark: d.mark,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setOpen(null);
      await load();
    } catch (e: any) {
      alert(`Erreur : ${e.message}`);
    } finally {
      setBusy(null);
    }
  };

  if (error) return <div className="p-4 rounded-2xl border border-line bg-surface text-red-500">Erreur : {error}</div>;
  if (!reviews) return <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>;

  const pending = reviews.filter((r) => r.status === "pending");
  const reviewed = reviews.filter((r) => r.status === "reviewed");
  const shown = filter === "pending" ? pending : reviewed;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {(
          [
            ["pending", `À corriger (${pending.length})`],
            ["reviewed", `Corrigées (${reviewed.length})`],
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
        <p className="text-xs text-ink-soft max-w-xl">
          Les questions à choix sont corrigées automatiquement. Ici : l&apos;orthographe et la grammaire des textes écrits par l&apos;étudiant.
        </p>
      </div>

      {shown.length === 0 && <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">{filter === "pending" ? "Aucune rédaction à corriger." : "Aucune rédaction corrigée pour le moment."}</div>}

      {shown.map((r) => {
        const isOpen = open === r.id;
        const lang = availableLanguages.find((l) => l.code === r.langCode)?.label ?? r.langCode;
        const d = draftFor(r);
        return (
          <div key={r.id} className="rounded-2xl border border-line bg-surface">
            <button onClick={() => setOpen(isOpen ? null : r.id)} className="w-full text-left p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-ink">
                  {r.name} <span className="text-ink-faint font-normal text-sm">· {lang} · niveau {r.level}</span>
                </p>
                <p className="text-xs text-ink-soft mt-0.5">
                  {r.quizTitle} · envoyé le {date(r.submittedAt)}
                </p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${r.status === "reviewed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-black"}`}>
                {r.status === "reviewed" ? `Corrigée${r.mark != null ? ` · ${r.mark}/10` : ""}` : "À corriger"}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-line p-4 space-y-5">
                {r.items.map((it, i) => (
                  <div key={i} className="rounded-xl border border-line bg-surface-alt/50 p-3 space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                      {KIND_LABEL[it.kind]} <span className="normal-case font-normal text-ink-faint">· {it.prompt}</span>
                    </p>
                    {it.kind === "dictation" && it.expected && (
                      <p className="text-xs text-ink-faint">
                        Phrase dictée : <span translate="no" className="notranslate text-ink-soft">{it.expected}</span>
                      </p>
                    )}
                    <p translate="no" className="notranslate whitespace-pre-wrap text-ink">{it.text}</p>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Version corrigée (modifiez le texte ci-dessous)</label>
                      <textarea
                        value={d.feedback[i]?.corrected ?? ""}
                        onChange={(e) =>
                          setDraft((s) => ({ ...s, [r.id]: { ...d, feedback: d.feedback.map((f, k) => (k === i ? { ...f, corrected: e.target.value } : f)) } }))
                        }
                        rows={Math.min(8, Math.max(2, Math.ceil(it.text.length / 70)))}
                        disabled={r.status === "reviewed"}
                        className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60 disabled:opacity-70"
                      />
                    </div>
                    <input
                      value={d.feedback[i]?.comment ?? ""}
                      onChange={(e) =>
                        setDraft((s) => ({ ...s, [r.id]: { ...d, feedback: d.feedback.map((f, k) => (k === i ? { ...f, comment: e.target.value } : f)) } }))
                      }
                      disabled={r.status === "reviewed"}
                      placeholder="Commentaire (facultatif) : faute à retenir, règle, conseil…"
                      className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 disabled:opacity-70"
                    />
                  </div>
                ))}

                <div className="grid sm:grid-cols-[1fr_120px] gap-3">
                  <textarea
                    value={d.overall}
                    onChange={(e) => setDraft((s) => ({ ...s, [r.id]: { ...d, overall: e.target.value } }))}
                    disabled={r.status === "reviewed"}
                    rows={2}
                    placeholder="Commentaire général pour l'étudiant (points forts, ce qu'il faut travailler)…"
                    className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 disabled:opacity-70"
                  />
                  <input
                    value={d.mark}
                    onChange={(e) => setDraft((s) => ({ ...s, [r.id]: { ...d, mark: e.target.value } }))}
                    disabled={r.status === "reviewed"}
                    inputMode="decimal"
                    placeholder="Note /10"
                    className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 disabled:opacity-70"
                  />
                </div>

                {r.status === "pending" ? (
                  <button onClick={() => save(r)} disabled={busy === r.id} className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold">
                    {busy === r.id ? "Envoi…" : "Envoyer la correction à l'étudiant"}
                  </button>
                ) : (
                  <p className="text-sm text-ink-soft">Corrigée par {r.reviewedBy || "—"}.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
