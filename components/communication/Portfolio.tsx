"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CATEGORIES, PHOTOS, photoSrc, photoThumb, type PhotoCategory } from "@/components/communication/photos";

/** The portfolio: a photo wall with category filters and a full-size viewer (arrows, swipe-free keyboard use, Escape to close). */
export default function Portfolio() {
  const [filter, setFilter] = useState<"all" | PhotoCategory>("all");
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(() => PHOTOS.filter((p) => filter === "all" || p.category === filter), [filter]);
  const move = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  const current = open !== null ? list[open] : null;

  return (
    <section id="portfolio" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20">
      <div className="mb-10 text-center">
        <span className="mb-3 inline-block rounded-full border border-red-700/40 bg-red-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Portfolio</span>
        <h2 className="text-3xl font-bold text-ink md:text-4xl">Nos réalisations</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft">Mariages, portraits, mode, reportages : chaque image est pensée et retouchée par l&apos;équipe BM Communication.</p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Catégories du portfolio">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={filter === c.key}
            onClick={() => setFilter(c.key)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${filter === c.key ? "bg-red-600 text-white" : "border border-line bg-surface text-ink-soft hover:text-ink"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {list.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpen(i)}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-surface-alt text-left break-inside-avoid"
            aria-label={`Agrandir : ${p.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoThumb(p.id)} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-105" />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={current.alt} onClick={() => setOpen(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc(current.id)} alt={current.alt} className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-5 left-1/2 w-[90%] max-w-xl -translate-x-1/2 text-center text-sm text-white/80">{current.alt} · {open! + 1} / {list.length}</p>
          <button aria-label="Fermer" onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full bg-white/15 px-4 py-2 text-xl font-bold text-white hover:bg-white/30">×</button>
          <button aria-label="Photo précédente" onClick={(e) => { e.stopPropagation(); move(-1); }} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-4 py-3 text-2xl font-bold text-white hover:bg-white/30">‹</button>
          <button aria-label="Photo suivante" onClick={(e) => { e.stopPropagation(); move(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-4 py-3 text-2xl font-bold text-white hover:bg-white/30">›</button>
        </div>
      )}
    </section>
  );
}
