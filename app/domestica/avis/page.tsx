"use client";

import { useEffect, useState } from "react";

const CRITERIA = [
  { key: "overall", label: "Satisfaction globale" },
  { key: "punctuality", label: "Ponctualité et présence" },
  { key: "quality", label: "Qualité du travail" },
  { key: "behaviour", label: "Comportement et respect" },
] as const;

type Ratings = Record<(typeof CRITERIA)[number]["key"], number>;

/** Satisfaction questionnaire sent to the household 1 month and 3 months after a placement (link: /domestica/avis?id=…&m=1|3). */
export default function DomesticaAvisPage() {
  const [id, setId] = useState("");
  const [m, setM] = useState("1");
  const [info, setInfo] = useState<{ job: string; firstName: string; done: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Partial<Ratings>>({});
  const [recommend, setRecommend] = useState("");
  const [needsReplacement, setNeedsReplacement] = useState(false);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const i = p.get("id") || "";
    const mm = p.get("m") === "3" ? "3" : "1";
    setId(i);
    setM(mm);
    fetch(`/api/domestica/feedback?id=${encodeURIComponent(i)}&m=${mm}`, { cache: "no-store" })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Lien invalide.");
        setInfo(d);
      })
      .catch((e) => setError(e.message));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const r = await fetch("/api/domestica/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, m, ...ratings, recommend, needsReplacement, comment }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Envoi impossible.");
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-page px-4 pb-16 pt-32 text-ink">
      <div className="mx-auto max-w-xl">
        <span className="inline-block rounded-full border border-red-700/40 bg-red-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">BM Domestica</span>
        <h1 className="mt-4 text-3xl font-extrabold">Votre avis après {m === "3" ? "3 mois" : "1 mois"}</h1>

        {!info && !error && <p className="mt-6 text-ink-soft">Chargement…</p>}
        {error && !info && <p className="mt-6 rounded-xl border border-red-600/30 bg-red-500/10 p-4 text-sm text-red-500">{error}</p>}

        {info?.done || sent ? (
          <p className="mt-6 rounded-2xl border border-emerald-600/40 bg-emerald-500/10 p-5 text-sm text-ink">
            Merci pour vos réponses{sent ? "" : " : elles ont déjà été reçues"}. Notre équipe vous recontacte si nécessaire.
          </p>
        ) : (
          info && (
            <form onSubmit={submit} className="mt-4 space-y-6">
              <p className="text-sm leading-relaxed text-ink-soft">
                Bonjour {info.firstName}, comment se passe la collaboration pour le poste de <b className="text-ink">{info.job}</b> ? Cela prend moins de deux minutes.
              </p>

              {CRITERIA.map((c) => (
                <fieldset key={c.key}>
                  <legend className="mb-2 text-sm font-bold">{c.label}</legend>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        onClick={() => setRatings((r) => ({ ...r, [c.key]: n }))}
                        aria-pressed={ratings[c.key] === n}
                        className={`h-11 w-11 rounded-xl border text-sm font-bold transition ${ratings[c.key] === n ? "border-red-600 bg-red-600 text-white" : "border-line bg-surface text-ink-soft hover:border-red-600/60"}`}
                      >
                        {n}
                      </button>
                    ))}
                    <span className="self-center text-xs text-ink-faint">1 = très insatisfait · 5 = très satisfait</span>
                  </div>
                </fieldset>
              ))}

              <fieldset>
                <legend className="mb-2 text-sm font-bold">Nous recommanderiez-vous à un proche ?</legend>
                <div className="flex gap-2">
                  {[
                    ["yes", "Oui"],
                    ["no", "Non"],
                  ].map(([v, l]) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setRecommend(v)}
                      aria-pressed={recommend === v}
                      className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition ${recommend === v ? "border-red-600 bg-red-600 text-white" : "border-line bg-surface text-ink-soft hover:border-red-600/60"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="flex items-start gap-3 text-sm text-ink-soft">
                <input type="checkbox" checked={needsReplacement} onChange={(e) => setNeedsReplacement(e.target.checked)} className="mt-1 h-4 w-4 accent-red-600" />
                Je souhaite parler d'un remplacement ou d'une difficulté.
              </label>

              <label className="block text-sm font-bold">
                Un commentaire ? (facultatif)
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={800} rows={4} className="mt-2 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm font-normal" />
              </label>

              {error && <p className="rounded-xl border border-red-600/30 bg-red-500/10 p-3 text-sm text-red-500">{error}</p>}
              <button disabled={sending} className="w-full rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-6 py-3.5 text-lg font-bold text-white disabled:opacity-50">
                {sending ? "Envoi…" : "Envoyer mon avis"}
              </button>
            </form>
          )
        )}
      </div>
    </main>
  );
}
