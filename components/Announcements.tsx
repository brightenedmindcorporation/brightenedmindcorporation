"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { trackContent } from "@/lib/trackEvent";

interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "job" | "normal";
  imageUrl?: string | null;
  videoUrl?: string | null;
}

// With many announcements, showing one dot per item gets cluttered —
// show a window of dots centered on the active slide instead, plus a
// "x / n" counter so it's still clear there are many more.
function visibleDotIndices(total: number, current: number, max = 7): number[] {
  if (total <= max) return Array.from({ length: total }, (_, i) => i);
  const half = Math.floor(max / 2);
  let start = current - half;
  let end = current + half;
  if (start < 0) {
    end -= start;
    start = 0;
  }
  if (end > total - 1) {
    start -= end - (total - 1);
    end = total - 1;
  }
  start = Math.max(0, start);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Announcements() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const load = () => {
      fetch("/api/announcements")
        .then((res) => res.json())
        .then((data) => setAnnouncements(data.announcements || []))
        .catch(() => setAnnouncements([]));
    };
    load();
    const refresh = setInterval(load, 60_000);
    return () => clearInterval(refresh);
  }, []);

  // Une annonce peut disparaître (expirée/masquée) entre deux rafraîchissements
  // automatiques — on recale l'index affiché si jamais il déborde désormais.
  useEffect(() => {
    setIndex((i) => (announcements.length === 0 ? 0 : i % announcements.length));
  }, [announcements.length]);

  useEffect(() => {
    if (announcements.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Each announcement is counted as seen when its slide is the one on screen.
  useEffect(() => {
    const shown = announcements[index];
    if (shown) trackContent({ type: "ann", key: shown.id, title: shown.title, event: "view", where: "list" });
  }, [announcements, index]);

  if (announcements.length === 0) return null;

  const total = announcements.length;
  const goTo = (i: number) => setIndex(((i % total) + total) % total);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 60;
    if (info.offset.x < -threshold) {
      goTo(index + 1);
    } else if (info.offset.x > threshold) {
      goTo(index - 1);
    }
  };

  const hrefFor = (a: Announcement) => (a.type === "job" ? `/annonces/${a.id}/postuler` : `/annonces/${a.id}`);

  const dots = visibleDotIndices(total, index);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-br from-red-950 via-red-900 to-black rounded-3xl overflow-hidden border border-red-900/40 shadow-2xl">
          <div className="overflow-hidden">
            <motion.div
              className="flex cursor-grab active:cursor-grabbing"
              drag={total > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              onDragEnd={handleDragEnd}
            >
              {announcements.map((a) => {
                const isJob = a.type === "job";
                return (
                  <motion.div
                    key={a.id}
                    onTap={() => {
                      trackContent({ type: "ann", key: a.id, title: a.title, event: "click", kind: isJob ? "apply" : "detail" });
                      router.push(hrefFor(a));
                    }}
                    className="w-full shrink-0 select-none cursor-pointer"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {a.imageUrl ? (
                        <div className="relative w-full min-h-[260px] md:min-h-[360px] pointer-events-none">
                          <Image src={a.imageUrl} alt={a.title} fill unoptimized draggable={false} className="object-cover" />
                        </div>
                      ) : a.videoUrl ? (
                        <div className="relative w-full min-h-[260px] md:min-h-[360px] bg-black pointer-events-none">
                          <video src={a.videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                        </div>
                      ) : null}

                      <div className={`flex flex-col justify-center p-8 md:p-12 ${!a.imageUrl && !a.videoUrl ? "md:col-span-2" : ""}`}>
                        <span className="inline-block w-fit text-xs font-bold uppercase tracking-widest text-white bg-black/30 px-3 py-1.5 rounded-full border border-white/30 mb-5">
                          {isJob ? "Offre d'emploi" : "Annonce"}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                          {a.title}
                        </h2>
                        <p className="text-red-100/80 text-sm sm:text-base leading-relaxed mb-8">{a.description}</p>

                        <span className="w-fit bg-white hover:bg-red-50 text-red-900 font-bold px-8 py-3.5 rounded-xl text-base transition">
                          {isJob ? "Postuler" : "Voir le détail"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {total > 1 && (
            <>
              <button
                onClick={() => goTo(index - 1)}
                aria-label="Annonce précédente"
                className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition"
              >
                ←
              </button>
              <button
                onClick={() => goTo(index + 1)}
                aria-label="Annonce suivante"
                className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition"
              >
                →
              </button>

              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                {total > 8 && (
                  <span className="text-xs font-semibold text-white/70">
                    {index + 1} / {total}
                  </span>
                )}
                <div className="flex gap-1.5">
                  {dots.map((i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Annonce ${i + 1}`}
                      className={`rounded-full transition ${
                        i === index ? "bg-white w-2.5 h-2.5" : "bg-white/30 w-2 h-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
