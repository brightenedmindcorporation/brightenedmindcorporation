"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Announcement {
  id: string;
  title: string;
  type: "job" | "normal";
}

/**
 * Thin continuously-scrolling marquee, separate from the big Announcements
 * carousel below it — gives active announcements a second, always-moving
 * point of visibility right under the hero, for visitors who scroll past
 * the carousel without noticing it.
 */
export default function AnnouncementsTicker() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data.announcements || []))
      .catch(() => setAnnouncements([]));
  }, []);

  if (announcements.length === 0) return null;

  const hrefFor = (a: Announcement) => (a.type === "job" ? `/annonces/${a.id}/postuler` : `/annonces/${a.id}`);

  // Duplicated so the CSS animation can loop seamlessly from -50% back to 0.
  const track = [...announcements, ...announcements];

  return (
    <div className="relative bg-black border-y border-red-900/40 overflow-hidden py-2.5">
      <div className="flex w-max animate-[ticker-scroll_35s_linear_infinite] hover:[animation-play-state:paused]">
        {track.map((a, i) => (
          <Link
            key={`${a.id}-${i}`}
            href={hrefFor(a)}
            className="flex items-center gap-2 px-8 text-sm font-semibold text-white/90 hover:text-white whitespace-nowrap shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            {a.type === "job" && <span className="text-red-400 font-bold">OFFRE D'EMPLOI</span>}
            {a.title}
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
