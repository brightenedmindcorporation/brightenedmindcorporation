"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";

interface Suspect {
  uid: string;
  name: string;
  email: string;
  langCode: string;
  program: string;
  level: number;
  lessons: number[];
  quizzes: number[];
  events: number;
  lastEvent: string;
}

/** Finds students whose progress has no trace in their own activity (possible mix-up between two students on one browser). */
export default function ProgressAudit() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ checked: number; suspects: Suspect[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = () => auth.currentUser?.getIdToken();

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/progress-audit", { headers: { Authorization: `Bearer ${await token()}` }, cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur serveur");
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const reset = async (s: Suspect) => {
    if (!confirm(`Remettre à zéro le niveau ${s.level} de ${s.name} (${s.program}) ? Ses résultats actuels sont archivés dans son dossier.`)) return;
    try {
      const response = await fetch("/api/admin/student-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        body: JSON.stringify({ uid: s.uid, langCode: s.langCode, level: s.level, action: "resetLevel" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur serveur");
      setResult((r) => (r ? { ...r, suspects: r.suspects.filter((x) => !(x.uid === s.uid && x.langCode === s.langCode && x.level === s.level)) } : r));
    } catch (e: any) {
      alert(`Erreur : ${e.message}`);
    }
  };

  return (
    <div className="mb-4 rounded-2xl border border-line bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-bold text-ink">Vérifier les mélanges de progression</p>
          <p className="text-xs text-ink-soft">Repère les élèves dont la progression n&apos;a aucune trace dans leur propre activité (deux élèves sur le même navigateur).</p>
        </div>
        <button onClick={run} disabled={busy} className="rounded-xl border border-line bg-surface-alt px-4 py-2 text-sm font-bold text-ink disabled:opacity-50">
          {busy ? "Analyse…" : "Lancer la vérification"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {result && (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-ink-soft">
            {result.checked} progression(s) examinée(s) : <b className="text-ink">{result.suspects.length}</b> à vérifier.
          </p>
          {result.suspects.map((s) => (
            <div key={`${s.uid}-${s.langCode}-${s.level}`} className="rounded-xl border border-amber-600/40 bg-amber-500/5 p-3 text-sm">
              <p className="font-bold text-ink">
                {s.name} <span className="font-normal text-ink-soft">· {s.email}</span>
              </p>
              <p className="text-ink-soft">
                {s.program}, niveau {s.level}
                {s.lessons.length > 0 && <> · leçons étudiées sans trace : {s.lessons.join(", ")}</>}
                {s.quizzes.length > 0 && <> · quiz notés sans trace : {s.quizzes.join(", ")}</>}
              </p>
              <p className="text-xs text-ink-faint">
                {s.events} événement(s) d&apos;activité{s.lastEvent ? `, dernier le ${new Date(s.lastEvent).toLocaleDateString("fr-FR")}` : ", aucune connexion enregistrée"}.
                Une progression ancienne, d&apos;avant le journal d&apos;activité, peut aussi apparaître ici.
              </p>
              <button onClick={() => reset(s)} className="mt-2 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white">
                Faire recommencer ce niveau
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
