"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";

/** One-off tool: BMCA-BUREAUTIQUE-… becomes BMCA-BU-… everywhere (shows what would change before applying). */
export default function RenameIdsButton() {
  const [busy, setBusy] = useState(false);
  const call = async (method: "GET" | "POST") => {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch("/api/admin/rename-ids", { method, headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur serveur");
    return data as { count: number; found: { collection: string; id: string; ids: string[] }[] };
  };
  const run = async () => {
    setBusy(true);
    try {
      const preview = await call("GET");
      if (preview.count === 0) {
        alert("Aucun ID « BMCA-BUREAUTIQUE-… » à renommer : tout est déjà à jour.");
        return;
      }
      const ids = [...new Set(preview.found.flatMap((f) => f.ids))];
      if (!confirm(`${preview.count} enregistrement(s) à mettre à jour :\n\n${ids.join("\n")}\n\nIls deviendront BMCA-BU-… (mêmes numéros). Continuer ?`)) return;
      const done = await call("POST");
      alert(`${done.count} enregistrement(s) mis à jour. Rechargez la page.`);
    } catch (e: any) {
      alert(`Erreur : ${e.message || e}`);
    } finally {
      setBusy(false);
    }
  };
  return (
    <button onClick={run} disabled={busy} className="text-xs font-bold text-ink-soft hover:text-ink bg-surface px-3 py-2 rounded-xl border border-line disabled:opacity-50">
      {busy ? "Traitement…" : "Renommer les ID Bureautique (BU)"}
    </button>
  );
}
