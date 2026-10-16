"use client";

import { useMemo, useState } from "react";

export interface AudienceCandidate {
  uid: string;
  name: string;
  email?: string;
}

/**
 * Who may enter a live class: every student concerned (default), or a hand-picked list.
 * `value` is null for "everyone", or the chosen student ids.
 */
export default function LiveAudiencePicker({
  candidates,
  value,
  onChange,
}: {
  candidates: AudienceCandidate[];
  value: string[] | null;
  onChange: (value: string[] | null) => void;
}) {
  const [search, setSearch] = useState("");
  const chosen = useMemo(() => new Set(value ?? []), [value]);
  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return candidates.filter((c) => !q || c.name.toLowerCase().includes(q) || (c.email || "").toLowerCase().includes(q));
  }, [candidates, search]);

  const toggle = (uid: string) => {
    const next = new Set(chosen);
    if (next.has(uid)) next.delete(uid);
    else next.add(uid);
    onChange(Array.from(next));
  };
  const allShownChosen = shown.length > 0 && shown.every((c) => chosen.has(c.uid));

  return (
    <div className="space-y-3 text-sm text-ink">
      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={value === null} onChange={() => onChange(null)} /> Tous les étudiants concernés
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={value !== null} onChange={() => onChange(value ?? [])} /> Choisir les étudiants
          {value !== null && <span className="text-xs text-ink-soft">({value.length} choisi{value.length > 1 ? "s" : ""})</span>}
        </label>
      </div>

      {value !== null && (
        <div className="rounded-xl border border-line bg-surface-alt p-3 space-y-2">
          {candidates.length === 0 ? (
            <p className="text-xs text-ink-soft">Aucun étudiant approuvé dans cette formation pour le moment.</p>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un nom ou un e-mail…"
                  className="flex-1 min-w-[160px] bg-surface border border-line rounded-lg px-3 py-2 text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = new Set(chosen);
                    shown.forEach((c) => (allShownChosen ? next.delete(c.uid) : next.add(c.uid)));
                    onChange(Array.from(next));
                  }}
                  className="text-xs font-bold px-3 py-2 rounded-lg border border-line text-ink-soft hover:text-ink"
                >
                  {allShownChosen ? "Tout décocher" : "Tout cocher"}
                </button>
              </div>
              <div className="max-h-56 overflow-y-auto divide-y divide-line">
                {shown.map((c) => (
                  <label key={c.uid} className="flex items-center gap-3 py-2 cursor-pointer">
                    <input type="checkbox" checked={chosen.has(c.uid)} onChange={() => toggle(c.uid)} />
                    <span className="flex-1 min-w-0">
                      <span className="block truncate font-semibold">{c.name || c.email}</span>
                      {c.name && c.email && <span className="block truncate text-xs text-ink-soft">{c.email}</span>}
                    </span>
                  </label>
                ))}
                {shown.length === 0 && <p className="py-2 text-xs text-ink-soft">Aucun résultat.</p>}
              </div>
            </>
          )}
          <p className="text-xs text-ink-faint">Seuls les étudiants cochés verront ce cours et pourront entrer dans la salle.</p>
        </div>
      )}
    </div>
  );
}

/** "Tous" / "3 étudiants choisis" label for a session card. */
export function audienceLabel(studentUids?: string[] | null): string {
  if (!Array.isArray(studentUids)) return "👥 Tous les étudiants concernés";
  return `👥 ${studentUids.length} étudiant${studentUids.length > 1 ? "s" : ""} choisi${studentUids.length > 1 ? "s" : ""}`;
}
