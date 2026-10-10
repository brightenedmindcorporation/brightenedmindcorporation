"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "job" | "normal";
  imageUrl?: string | null;
  videoUrl?: string | null;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data.announcements || []))
      .catch(() => setAnnouncements([]));
  }, []);

  useEffect(() => {
    if (announcements.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (announcements.length === 0) return null;

  const current = announcements[index];
  const isJob = current.type === "job";
  const href = isJob ? `/annonces/${current.id}/postuler` : `/annonces/${current.id}`;
  const ctaLabel = isJob ? "Postuler" : "Voir le détail";

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-br from-red-950 via-red-900 to-black rounded-3xl overflow-hidden border border-red-900/40 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {current.imageUrl ? (
              <div className="relative w-full min-h-[260px] md:min-h-[360px]">
                <Image src={current.imageUrl} alt={current.title} fill unoptimized className="object-cover" />
              </div>
            ) : current.videoUrl ? (
              <div className="relative w-full min-h-[260px] md:min-h-[360px] bg-black">
                <video src={current.videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              </div>
            ) : null}

            <div className={`flex flex-col justify-center p-8 md:p-12 ${!current.imageUrl && !current.videoUrl ? "md:col-span-2" : ""}`}>
              <span className="inline-block w-fit text-xs font-bold uppercase tracking-widest text-gold-400 bg-black/30 px-3 py-1.5 rounded-full border border-gold-700/40 mb-5">
                {isJob ? "Offre d'emploi" : "Annonce"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                {current.title}
              </h2>
              <p className="text-red-100/80 text-sm sm:text-base leading-relaxed mb-8">{current.description}</p>

              <Link
                href={href}
                className="w-fit bg-gold-500 hover:bg-gold-400 text-black font-bold px-8 py-3.5 rounded-xl text-base transition"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {announcements.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              {announcements.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Annonce ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition ${i === index ? "bg-gold-400" : "bg-white/30"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
