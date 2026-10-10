"use client";

import { useEffect, useState } from "react";

interface Announcement {
  id: string;
  title: string;
  description: string;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
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
    }, 7000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (announcements.length === 0) return null;

  const current = announcements[index];

  return (
    <section className="bg-gradient-to-r from-red-950 via-red-900 to-black border-y border-red-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-gold-400 bg-black/30 px-3 py-1 rounded-full border border-gold-700/40">
            Annonce
          </span>
          <p className="text-white text-sm sm:text-base">
            <span className="font-bold">{current.title}</span>
            <span className="text-red-100/80"> — {current.description}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {current.ctaUrl && (
            <a
              href={current.ctaUrl}
              target={current.ctaUrl.startsWith("http") ? "_blank" : undefined}
              rel={current.ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              className="bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-lg transition whitespace-nowrap"
            >
              {current.ctaLabel || "En savoir plus"}
            </a>
          )}

          {announcements.length > 1 && (
            <div className="flex gap-1.5">
              {announcements.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Annonce ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition ${i === index ? "bg-gold-400" : "bg-white/20"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
