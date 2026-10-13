"use client";

import { useMemo, useState } from "react";
import { Search, Download, BookText } from "lucide-react";
import type { VerbReference } from "@/content/verbs";
import { downloadVerbsPdf } from "@/lib/academy/verbsPdf";

function matches(query: string, ...fields: string[]): boolean {
  if (!query) return true;
  return fields.some((f) => f.toLowerCase().includes(query));
}

export default function VerbsReference({ reference, langLabel }: { reference: VerbReference; langLabel: string }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filteredParticles = useMemo(
    () => (reference.kind === "particles" ? reference.particles.filter((p) => matches(q, p.particle, p.pinyin, p.translation, p.example)) : []),
    [reference, q]
  );
  const filteredIrregular = useMemo(
    () => (reference.kind === "standard" ? reference.irregular.filter((v) => matches(q, v.base, v.forms, v.translation)) : []),
    [reference, q]
  );
  const filteredRegular = useMemo(
    () => (reference.kind === "standard" ? reference.regular.filter((v) => matches(q, v.base, v.translation)) : []),
    [reference, q]
  );

  const noResults =
    reference.kind === "particles" ? filteredParticles.length === 0 : filteredIrregular.length === 0 && filteredRegular.length === 0;

  const placeholder = reference.kind === "particles" ? "Rechercher une particule…" : "Rechercher un verbe (ou sa traduction)…";

  return (
    <div className="bg-surface rounded-3xl p-8 border border-line shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
          <BookText size={22} /> {reference.kind === "particles" ? "Particules d'aspect" : "Verbes irréguliers & réguliers"}
        </h2>
        <button
          onClick={() => downloadVerbsPdf(reference, langLabel)}
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink border border-line hover:border-red-600/50 px-4 py-2 rounded-xl transition-all bg-surface-alt shrink-0"
        >
          <Download size={15} /> Télécharger en PDF
        </button>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full bg-surface-alt border border-line rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
        />
      </div>

      {reference.kind === "particles" ? (
        <>
          <p className="text-sm text-ink-soft mb-5">{reference.intro}</p>
          {filteredParticles.length > 0 && (
            <div className="border border-line rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[90px_80px_1.6fr_1.3fr] bg-surface-sunken text-ink-faint text-[11px] font-bold uppercase tracking-wide">
                <div className="px-3 py-2.5">Particule</div>
                <div className="px-3 py-2.5">Pinyin</div>
                <div className="px-3 py-2.5">Usage & exemple</div>
                <div className="px-3 py-2.5">Traduction</div>
              </div>
              {filteredParticles.map((p, i) => (
                <div
                  key={p.particle}
                  className={`grid grid-cols-[90px_80px_1.6fr_1.3fr] text-sm border-t border-line ${i % 2 === 0 ? "" : "bg-surface-sunken/40"}`}
                >
                  <div className="px-3 py-3 font-bold text-red-500 text-lg">{p.particle}</div>
                  <div className="px-3 py-3 text-ink-soft italic">{p.pinyin}</div>
                  <div className="px-3 py-3 text-ink-soft">
                    <p>{p.usage}</p>
                    <p className="mt-1 text-ink-faint italic">{p.example}</p>
                  </div>
                  <div className="px-3 py-3 text-ink-soft">{p.translation}</div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {filteredIrregular.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                <h3 className="text-sm font-extrabold text-ink uppercase tracking-wide">Verbes irréguliers</h3>
              </div>
              <p className="text-xs text-ink-faint mb-3">{reference.irregularIntro}</p>
              <div className="border border-line rounded-2xl overflow-hidden overflow-x-auto">
                <div className="min-w-[640px]">
                  <div className="grid grid-cols-[110px_160px_1.6fr_1.3fr] bg-surface-sunken text-ink-faint text-[11px] font-bold uppercase tracking-wide">
                    <div className="px-3 py-2.5">Verbe</div>
                    <div className="px-3 py-2.5">{reference.formsLabel}</div>
                    <div className="px-3 py-2.5">Exemple</div>
                    <div className="px-3 py-2.5">Traduction</div>
                  </div>
                  {filteredIrregular.map((v, i) => (
                    <div
                      key={v.base}
                      className={`grid grid-cols-[110px_160px_1.6fr_1.3fr] text-sm border-t border-line ${i % 2 === 0 ? "" : "bg-surface-sunken/40"}`}
                    >
                      <div className="px-3 py-2.5 font-bold text-red-500">{v.base}</div>
                      <div className="px-3 py-2.5 text-ink-soft">{v.forms}</div>
                      <div className="px-3 py-2.5 text-ink-soft italic">{v.example}</div>
                      <div className="px-3 py-2.5 text-ink-soft">{v.translation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {filteredRegular.length > 0 && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-5 bg-ink-faint rounded-full" />
                <h3 className="text-sm font-extrabold text-ink uppercase tracking-wide">Verbes réguliers</h3>
              </div>
              <p className="text-xs text-ink-faint mb-3">{reference.regularIntro}</p>
              <div className="border border-line rounded-2xl overflow-hidden overflow-x-auto">
                <div className="min-w-[640px]">
                  <div className="grid grid-cols-[110px_160px_1.6fr_1.3fr] bg-surface-sunken text-ink-faint text-[11px] font-bold uppercase tracking-wide">
                    <div className="px-3 py-2.5">Verbe</div>
                    <div className="px-3 py-2.5">Forme conjuguée</div>
                    <div className="px-3 py-2.5">Exemple</div>
                    <div className="px-3 py-2.5">Traduction</div>
                  </div>
                  {filteredRegular.map((v, i) => (
                    <div
                      key={v.base}
                      className={`grid grid-cols-[110px_160px_1.6fr_1.3fr] text-sm border-t border-line ${i % 2 === 0 ? "" : "bg-surface-sunken/40"}`}
                    >
                      <div className="px-3 py-2.5 font-bold text-ink-soft">{v.base}</div>
                      <div className="px-3 py-2.5 text-ink-soft">
                        {v.prefix ? (
                          <>
                            <b className="text-red-500">{v.prefix}</b>
                            {v.stem}
                          </>
                        ) : (
                          <>
                            {v.stem ?? v.base}
                            <b className="text-red-500">{v.suffix}</b>
                          </>
                        )}
                      </div>
                      <div className="px-3 py-2.5 text-ink-soft italic">{v.example}</div>
                      <div className="px-3 py-2.5 text-ink-soft">{v.translation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {noResults && (
        <div className="text-center py-10 text-ink-faint text-sm">Aucun résultat pour « {query} ».</div>
      )}
    </div>
  );
}
