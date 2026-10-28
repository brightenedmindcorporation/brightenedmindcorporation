"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";

type Change = { name: string; langCode: string; level: number; lessonId: number | "final"; percent: number; from: string; to: string };
type Result = { applied: boolean; passAt: number; examined: number; promoted: number; demoted: number; changes: Change[] };

/** Applies the pass rule (60/100 or more) to the results already saved: shows what would change, then applies on confirmation. */
export default function RecomputePassButton() {
  const [busy, setBusy] = useState(false);
  const call = async (method: "GET" | "POST") => {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch("/api/admin/recompute-pass", { method, headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur serveur");
    return data as Result;
  };
  const run = async () => {
    setBusy(true);
    try {
      const preview = await call("GET");
      if (preview.changes.length === 0) {
        alert(`${preview.examined} progression(s) examinée(s) : tous les résultats respectent déjà la règle (${preview.passAt}/100 ou plus = réussite).`);
        return;
      }
      const lines = preview.changes
        .slice(0, 25)
        .map((c) => `• ${c.name || "?"} — ${c.langCode} niveau ${c.level}, ${c.lessonId === "final" ? "quiz final" : "leçon " + c.lessonId} : ${c.percent}/100, ${c.from} → ${c.to}`)
        .join("\n");
      const more = preview.changes.length > 25 ? `\n… et ${preview.changes.length - 25} autre(s)` : "";
      const ok = confirm(
        `Règle : ${preview.passAt}/100 ou plus = réussite, 59/100 ou moins = échec.\n\n${preview.promoted} résultat(s) deviennent réussis (la leçon suivante s'ouvre), ${preview.demoted} deviennent échoués (la leçon suivante se reverrouille).\n\n${lines}${more}\n\nAppliquer à tous les étudiants ? Les notes ne sont pas modifiées.`
      );
      if (!ok) return;
      const done = await call("POST");
      alert(`Règle appliquée : ${done.promoted} réussite(s) ajoutée(s), ${done.demoted} échec(s) retiré(s) du parcours. Rechargez la page.`);
    } catch (e: any) {
      alert(`Erreur : ${e.message || e}`);
    } finally {
      setBusy(false);
    }
  };
  return (
    <button onClick={run} disabled={busy} className="text-xs font-bold text-ink-soft hover:text-ink bg-surface px-3 py-2 rounded-xl border border-line disabled:opacity-50">
      {busy ? "Traitement…" : "Appliquer la règle 60/100 aux anciens résultats"}
    </button>
  );
}
