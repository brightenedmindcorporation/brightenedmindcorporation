"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

interface Row {
  code: string;
  label: string;
  closed: boolean;
  autoApprove: boolean;
}

/** One line per program: open or close new requests, and approve them at once or by hand. */
export default function ProgramSwitches() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const call = async (method: "GET" | "POST", body?: object) => {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch("/api/admin/program-settings", {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur serveur");
    return result;
  };

  const load = () =>
    call("GET")
      .then((r) => setRows(r.programs))
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const change = async (code: string, patch: { closed?: boolean; autoApprove?: boolean }) => {
    setBusy(code);
    setError(null);
    try {
      await call("POST", { code, ...patch });
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mb-6 rounded-2xl border border-line bg-surface p-4">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between text-left font-bold text-ink">
        <span>Accès aux formations</span>
        <span className="text-xs font-semibold text-ink-soft">{open ? "Masquer" : "Gérer"}</span>
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {open && rows && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-ink-soft">
            Fermer une formation bloque les nouvelles demandes (les élèves déjà inscrits gardent leur accès). L&apos;approbation automatique donne tout de suite le Student ID : réservez-la aux formations gratuites.
          </p>
          {rows.map((r) => (
            <div key={r.code} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface-alt px-3 py-2 text-sm">
              <span className="font-semibold text-ink">{r.label}</span>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 text-ink-soft">
                  <input type="checkbox" disabled={busy === r.code} checked={!r.closed} onChange={(e) => change(r.code, { closed: !e.target.checked })} className="h-4 w-4 accent-red-600" />
                  Inscriptions ouvertes
                </label>
                <label className="flex items-center gap-2 text-ink-soft">
                  <input type="checkbox" disabled={busy === r.code} checked={r.autoApprove} onChange={(e) => change(r.code, { autoApprove: e.target.checked })} className="h-4 w-4 accent-red-600" />
                  Approbation automatique
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
