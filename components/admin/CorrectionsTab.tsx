"use client";

import { useEffect, useMemo, useState } from "react";
import { Folder, FolderOpen } from "lucide-react";
import { auth } from "@/lib/firebase";
import { availableLanguages } from "@/content/curriculum";

interface Item {
  kind: "dictation" | "reply" | "free" | "reading";
  prompt: string;
  audioUrl?: string;
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

const KIND_LABEL: Record<Item["kind"], string> = { dictation: "Dictée", reply: "Réponse personnelle", free: "Texte libre", reading: "Lecture à voix haute (audio)" };
// Cloudinary can serve the same recording as mp3, which every browser plays; the original is kept as a second source.
const mp3 = (url: string) => url.replace(/\.[a-z0-9]+$/i, ".mp3");
const date = (iso: string) => new Date(iso).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });

/** Written work of the quizzes, to correct: the texts, a corrected version and a comment for each, a mark. */
export default function CorrectionsTab({ getToken }: { getToken?: () => Promise<string | undefined> }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "reviewed">("pending");
  const [open, setOpen] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, { feedback: { corrected: string; comment: string }[]; overall: string; mark: string }>>({});
  const [busy, setBusy] = useState<string | null>(null);
  // One folder per student; the folders the person opened or closed by hand (otherwise: open on the work to correct, closed on the finished work).
  const [folders, setFolders] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState("");

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

  const pending = (reviews ?? []).filter((r) => r.status === "pending");
  const reviewed = (reviews ?? []).filter((r) => r.status === "reviewed");
  const shown = filter === "pending" ? pending : reviewed;

  // Every student has a folder holding their corrections, the most recent student first.
  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const map = new Map<string, { key: string; name: string; email: string; items: Review[] }>();
    for (const r of shown) {
      if (needle && !`${r.name} ${r.email}`.toLowerCase().includes(needle)) continue;
      const key = (r.email || r.name || r.id).toLowerCase();
      const g = map.get(key) ?? { key, name: r.name, email: r.email, items: [] };
      g.items.push(r);
      map.set(key, g);
    }
    const list = Array.from(map.values());
    for (const g of list) g.items.sort((x, y) => y.submittedAt.localeCompare(x.submittedAt));
    return list.sort((x, y) => y.items[0].submittedAt.localeCompare(x.items[0].submittedAt));
  }, [shown, q]);
  const isOpenFolder = (key: string) => folders[key] ?? (filter === "pending" || groups.length === 1);
  const langOf = (r: Review) => availableLanguages.find((l) => l.code === r.langCode)?.label ?? r.langCode;

  if (error) return <div className="p-4 rounded-2xl border border-line bg-surface text-red-500">Erreur : {error}</div>;
  if (!reviews) return <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>;

  const card = (r: Review) => {
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
                <p className="text-sm text-ink-soft mt-0.5">
                  {r.quizTitle} · envoyé le {date(r.submittedAt)}
                </p>
              </div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${r.status === "reviewed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-black"}`}>
                {r.status === "reviewed" ? `Corrigée${r.mark != null ? ` · ${r.mark}/10` : ""}` : "À corriger"}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-line p-4 space-y-5">
                {r.items.map((it, i) => (
                  <div key={i} className="rounded-xl border border-line bg-surface-alt/50 p-3 space-y-2.5">
                    <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
                      {KIND_LABEL[it.kind]} <span className="normal-case font-normal text-ink-faint">· {it.prompt}</span>
                    </p>
                    {it.kind === "dictation" && it.expected && (
                      <p className="text-sm text-ink-faint">
                        Phrase dictée : <span translate="no" className="notranslate text-ink-soft">{it.expected}</span>
                      </p>
                    )}
                    {it.kind === "reading" && it.audioUrl ? (
                      <div className="space-y-2">
                        {it.expected && (
                          <p className="text-sm text-ink-faint">
                            Texte à lire : <span translate="no" className="notranslate text-ink-soft">{it.expected}</span>
                          </p>
                        )}
                        <audio controls preload="none" className="w-full">
                          <source src={mp3(it.audioUrl)} type="audio/mpeg" />
                          <source src={it.audioUrl} />
                        </audio>
                        <a href={it.audioUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-red-600 underline">Ouvrir l&apos;enregistrement</a>
                        <p className="text-sm text-ink-soft">Écoutez la lecture. Sa note (sur 20) se donne dans le dossier de l&apos;étudiant : onglet Progression → Ouvrir → modifier la note du quiz, ligne « Lecture ». Tant que vous ne l&apos;avez pas donnée, la lecture ne compte pas dans la note du quiz.</p>
                      </div>
                    ) : (
                    <>
                    <p translate="no" className="notranslate whitespace-pre-wrap text-ink">{it.text}</p>
                    <div>
                      <label className="block text-sm font-semibold text-ink-soft mb-1">Version corrigée (modifiez le texte ci-dessous)</label>
                      <textarea
                        value={d.feedback[i]?.corrected ?? ""}
                        onChange={(e) =>
                          setDraft((s) => ({ ...s, [r.id]: { ...d, feedback: d.feedback.map((f, k) => (k === i ? { ...f, corrected: e.target.value } : f)) } }))
                        }
                        rows={Math.min(8, Math.max(2, Math.ceil(it.text.length / 70)))}
                        disabled={r.status === "reviewed"}
                        className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-base text-ink focus:outline-none focus:border-red-600/60 disabled:opacity-70 min-h-[44px]"
                      />
                    </div>
                    <input
                      value={d.feedback[i]?.comment ?? ""}
                      onChange={(e) =>
                        setDraft((s) => ({ ...s, [r.id]: { ...d, feedback: d.feedback.map((f, k) => (k === i ? { ...f, comment: e.target.value } : f)) } }))
                      }
                      disabled={r.status === "reviewed"}
                      placeholder="Commentaire (facultatif) : faute à retenir, règle, conseil…"
                      className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 disabled:opacity-70 min-h-[44px]"
                    />
                    </>
                    )}
                  </div>
                ))}

                <div className="grid sm:grid-cols-[1fr_120px] gap-3">
                  <textarea
                    value={d.overall}
                    onChange={(e) => setDraft((s) => ({ ...s, [r.id]: { ...d, overall: e.target.value } }))}
                    disabled={r.status === "reviewed"}
                    rows={2}
                    placeholder="Commentaire général pour l'étudiant (points forts, ce qu'il faut travailler)…"
                    className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 disabled:opacity-70 min-h-[44px]"
                  />
                  <input
                    value={d.mark}
                    onChange={(e) => setDraft((s) => ({ ...s, [r.id]: { ...d, mark: e.target.value } }))}
                    disabled={r.status === "reviewed"}
                    inputMode="decimal"
                    placeholder="Note /10"
                    className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 disabled:opacity-70 min-h-[44px]"
                  />
                </div>

                {r.status === "pending" ? (
                  <button onClick={() => save(r)} disabled={busy === r.id} className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold min-h-[44px]">
                    {busy === r.id ? "Envoi…" : "Envoyer la correction à l'étudiant"}
                  </button>
                ) : (
                  <p className="text-sm text-ink-soft">Corrigée par {r.reviewedBy || "—"}.</p>
                )}
              </div>
            )}
          </div>
        );
  };

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
        <p className="text-sm text-ink-soft max-w-xl">
          Les questions à choix sont corrigées automatiquement. Ici : l&apos;orthographe et la grammaire des textes écrits par l&apos;étudiant.
        </p>
      </div>

      {shown.length === 0 && <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">{filter === "pending" ? "Aucune rédaction à corriger." : "Aucune rédaction corrigée pour le moment."}</div>}

      {groups.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Chercher un étudiant…"
            className="bg-surface-alt border border-line rounded-xl px-3 py-2 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 min-h-[44px]"
          />
          <button onClick={() => setFolders(Object.fromEntries(groups.map((g) => [g.key, true])))} className="px-3 py-2 text-sm font-bold rounded-xl bg-surface-alt text-ink-soft hover:text-ink min-h-[44px]">
            Tout ouvrir
          </button>
          <button onClick={() => setFolders(Object.fromEntries(groups.map((g) => [g.key, false])))} className="px-3 py-2 text-sm font-bold rounded-xl bg-surface-alt text-ink-soft hover:text-ink min-h-[44px]">
            Tout fermer
          </button>
          <span className="text-sm text-ink-faint">{groups.length} étudiant{groups.length > 1 ? "s" : ""}</span>
        </div>
      )}

      {groups.map((g) => {
        const open = isOpenFolder(g.key);
        const todo = g.items.filter((r) => r.status === "pending").length;
        const marks = g.items.filter((r) => r.status === "reviewed" && r.mark != null).map((r) => Number(r.mark));
        const average = marks.length ? Math.round((marks.reduce((x, y) => x + y, 0) / marks.length) * 10) / 10 : null;
        const where = Array.from(new Set(g.items.map((r) => `${langOf(r)} · niveau ${r.level}`))).join(" ; ");
        return (
          <div key={g.key} className="rounded-2xl border border-line bg-surface-alt/30">
            <button onClick={() => setFolders((f) => ({ ...f, [g.key]: !open }))} className="w-full text-left p-4 flex flex-wrap items-center justify-between gap-3" aria-expanded={open}>
              <div className="flex items-center gap-3 min-w-0">
                {open ? <FolderOpen size={26} className="text-red-500 shrink-0" /> : <Folder size={26} className="text-red-500 shrink-0" />}
                <div className="min-w-0">
                  <p className="font-extrabold text-ink truncate">{g.name}</p>
                  <p className="text-sm text-ink-soft truncate">
                    {where}
                    {g.email ? ` · ${g.email}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
                {todo > 0 && <span className="px-3 py-1 rounded-full bg-amber-500 text-black">{todo} à corriger</span>}
                {average !== null && <span className="px-3 py-1 rounded-full bg-surface text-ink-soft border border-line">Moyenne {average}/10</span>}
                <span className="px-3 py-1 rounded-full bg-surface text-ink-soft border border-line">
                  {g.items.length} correction{g.items.length > 1 ? "s" : ""}
                </span>
              </div>
            </button>
            {open && <div className="border-t border-line p-3 space-y-3">{g.items.map(card)}</div>}
          </div>
        );
      })}
    </div>
  );
}