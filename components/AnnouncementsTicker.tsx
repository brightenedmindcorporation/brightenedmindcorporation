"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "job" | "normal";
}

/**
 * Continuously-scrolling marquee, fixed to the bottom of the viewport so it
 * stays visible while scrolling the homepage — separate from the big
 * Announcements carousel, which scrolls away with the page content.
 */
export default function AnnouncementsTicker() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const load = () => {
      fetch("/api/announcements")
        .then((res) => res.json())
        .then((data) => setAnnouncements(data.announcements || []))
        .catch(() => setAnnouncements([]));
    };
    load();
    const interval = setInterval(load, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (announcements.length === 0) return null;

  const hrefFor = (a: Announcement) => (a.type === "job" ? `/annonces/${a.id}/postuler` : `/annonces/${a.id}`);

  // Duplicated so the CSS animation can loop seamlessly from -50% back to 0.
  const track = [...announcements, ...announcements];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-red-900/40 overflow-hidden py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      <div className="flex w-max animate-[ticker-scroll_45s_linear_infinite] hover:[animation-play-state:paused]">
        {track.map((a, i) => (
          <Link
            key={`${a.id}-${i}`}
            href={hrefFor(a)}
            className="flex items-center gap-2 px-8 text-sm font-semibold text-white/90 hover:text-white whitespace-nowrap shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            {a.type === "job" && <span className="text-red-400 font-bold">OFFRE D'EMPLOI ·</span>}
            <span className="text-white">{a.title}</span>
            {a.description && <span className="text-white/60 font-normal">— {a.description}</span>}
          </Link>
        ))}
      </div>
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
