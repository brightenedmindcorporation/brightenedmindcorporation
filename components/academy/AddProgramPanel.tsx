"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { refreshLoggedStudent } from "@/lib/academy/refreshEnrollments";

interface Program {
  code: string;
  label: string;
  levels: number[];
  open: boolean;
  autoApprove: boolean;
  state: string;
  reason: string;
}

const STATE_LABEL: Record<string, string> = {
  Pending: "En attente d'approbation",
  Approved: "Déjà inscrit(e)",
  Rejected: "Demande non approuvée",
  Suspended: "Accès suspendu",
  Expired: "Accès terminé",
};

/** Lets a student who already has an account ask for another program, and shows where each request stands. */
export default function AddProgramPanel({ name, onChanged }: { name: string; onChanged: (updated: any) => void }) {
  const [open, setOpen] = useState(false);
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [levelMode, setLevelMode] = useState<"known" | "test">("known");
  const [level, setLevel] = useState("Level 1");
  const [studyDays, setStudyDays] = useState<3 | 5>(3);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const token = () => auth.currentUser?.getIdToken();

  const load = async () => {
    setError(null);
    try {
      const response = await fetch("/api/academy/programs", { headers: { Authorization: `Bearer ${await token()}` }, cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setPrograms(result.programs);
      setPendingCount(result.pendingCount);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    setMessage(null);
    setPicked(null);
    if (next) load();
  };

  const choose = (p: Program) => {
    setPicked(p.code);
    setLevelMode("known");
    setLevel("Level 1");
    setError(null);
  };

  const send = async (p: Program) => {
    setBusy(true);
    setError(null);
    try {
      const single = p.levels.length <= 1;
      const response = await fetch("/api/academy/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: await token(),
          name,
          langCode: p.code,
          level: single ? "Level 1" : level,
          placement: !single && levelMode === "test",
          studyDays,
          source: "dashboard",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Envoi impossible.");
      setPicked(null);
      setMessage(result.approved ? `${p.label} : accès ouvert, vous pouvez commencer.` : `Demande envoyée pour ${p.label}. Vous recevrez votre Student ID dès l'approbation par l'administration.`);
      const updated = await refreshLoggedStudent();
      if (updated) onChanged(updated);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-surface/80 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">Vous voulez suivre une autre formation avec ce même compte ?</p>
        <button onClick={toggle} className="rounded-xl border border-red-600/60 bg-red-600/10 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-600/20">
          {open ? "Fermer" : "+ Ajouter une formation"}
        </button>
      </div>

      {message && <p className="mt-3 rounded-xl border border-emerald-600/40 bg-emerald-500/10 p-3 text-sm text-ink">{message}</p>}

      {open && (
        <div className="mt-4 space-y-3">
          {error && <p className="rounded-xl border border-red-600/30 bg-red-500/10 p-3 text-sm text-red-500">{error}</p>}
          {!programs && !error && <p className="text-sm text-ink-soft">Chargement…</p>}
          {programs?.map((p) => {
            const canAsk = p.open && ["none", "Rejected"].includes(p.state);
            const blocked = pendingCount >= 2 && p.state !== "Pending";
            const single = p.levels.length <= 1;
            return (
              <div key={p.code} className="rounded-xl border border-line bg-surface-alt p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-ink">{p.label}</p>
                    {p.state !== "none" && (
                      <p className={`text-xs font-semibold ${p.state === "Approved" ? "text-emerald-500" : p.state === "Pending" ? "text-amber-500" : "text-red-500"}`}>
                        {STATE_LABEL[p.state] ?? p.state}
                        {p.reason && p.state !== "Pending" && p.state !== "Approved" ? ` : ${p.reason}` : ""}
                      </p>
                    )}
                    {!p.open && p.state === "none" && <p className="text-xs text-ink-faint">Inscriptions fermées pour le moment.</p>}
                  </div>
                  {canAsk && picked !== p.code && (
                    <button disabled={blocked} onClick={() => choose(p)} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-40">
                      {p.state === "Rejected" ? "Redemander" : "Demander"}
                    </button>
                  )}
                </div>
                {canAsk && blocked && picked !== p.code && <p className="mt-1 text-xs text-ink-faint">Vous avez déjà 2 demandes en attente.</p>}

                {picked === p.code && (
                  <div className="mt-3 space-y-3 border-t border-line pt-3 text-sm">
                    {!single && (
                      <div className="space-y-2">
                        <label className="flex items-start gap-2">
                          <input type="radio" checked={levelMode === "known"} onChange={() => setLevelMode("known")} className="mt-1" />
                          <span className="flex-1">
                            <b>Je connais mon niveau</b>
                            <select value={level} onChange={(e) => { setLevel(e.target.value); setLevelMode("known"); }} className="mt-1 w-full rounded-lg border border-line bg-surface p-2">
                              {p.levels.map((n) => (
                                <option key={n} value={`Level ${n}`}>{`Niveau ${n}`}{n === 1 ? " : débutant" : n === 2 ? " : intermédiaire" : " : avancé"}</option>
                              ))}
                            </select>
                          </span>
                        </label>
                        <label className="flex items-start gap-2">
                          <input type="radio" checked={levelMode === "test"} onChange={() => setLevelMode("test")} className="mt-1" />
                          <span>
                            <b>Je ne connais pas mon niveau</b>
                            <span className="block text-xs text-ink-faint">Test de niveau après l&apos;approbation : l&apos;administration vous attribue le niveau qui convient.</span>
                          </span>
                        </label>
                      </div>
                    )}
                    <label className="block">
                      <span className="font-bold">Rythme d&apos;étude</span>
                      <select value={studyDays} onChange={(e) => setStudyDays(Number(e.target.value) as 3 | 5)} className="mt-1 w-full rounded-lg border border-line bg-surface p-2">
                        <option value={3}>3 jours / semaine</option>
                        <option value={5}>5 jours / semaine (intensif)</option>
                      </select>
                    </label>
                    <p className="text-xs text-ink-faint">{p.autoApprove ? "Cette formation est ouverte tout de suite." : "Votre Student ID pour cette formation vous sera donné après l'approbation de l'administration."}</p>
                    <div className="flex gap-2">
                      <button disabled={busy} onClick={() => send(p)} className="rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-5 py-2 font-bold text-white disabled:opacity-50">
                        {busy ? "Envoi…" : "Envoyer ma demande"}
                      </button>
                      <button onClick={() => setPicked(null)} className="rounded-xl border border-line px-4 py-2 font-bold text-ink-soft">Annuler</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
