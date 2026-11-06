"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORIES, categoryOf, type Announcement, type AnnouncementCategory } from "@/lib/announcements";
import AnnouncementCard from "@/components/announcements/AnnouncementCard";

/** All the announcements, with one button per category to narrow them down. */
export default function AnnouncementsBrowser({ announcements }: { announcements: Announcement[] }) {
  const [filter, setFilter] = useState<AnnouncementCategory | "all">("all");

  const counts = useMemo(() => {
    const map = new Map<AnnouncementCategory, number>();
    for (const a of announcements) map.set(categoryOf(a), (map.get(categoryOf(a)) ?? 0) + 1);
    return map;
  }, [announcements]);
  const shown = filter === "all" ? announcements : announcements.filter((a) => categoryOf(a) === filter);

  if (announcements.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-line bg-surface p-8 text-center">
        <p className="text-xl font-bold text-ink">Aucune annonce pour le moment</p>
        <p className="mt-2 text-ink-soft">Revenez bientôt, ou écrivez-nous pour connaître nos prochaines formations.</p>
        <a
          href="https://wa.me/243988830799"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[48px] items-center rounded-xl bg-emerald-600 px-6 font-bold text-white hover:bg-emerald-700"
        >
          Écrire sur WhatsApp
        </a>
        <p className="mt-4">
          <Link href="/academia" className="inline-flex min-h-[44px] items-center font-bold text-red-700 underline dark:text-red-300">
            Découvrir l&apos;Academia →
          </Link>
        </p>
      </div>
    );
  }

  const pill = (active: boolean) =>
    `inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-bold transition ${
      active ? "border-red-700 bg-red-700 text-white" : "border-line bg-surface text-ink-soft hover:border-red-600/60 hover:text-ink"
    }`;

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
        <button type="button" onClick={() => setFilter("all")} aria-pressed={filter === "all"} className={pill(filter === "all")}>
          Toutes ({announcements.length})
        </button>
        {CATEGORIES.filter((c) => counts.get(c.id)).map((c) => (
          <button key={c.id} type="button" onClick={() => setFilter(c.id)} aria-pressed={filter === c.id} className={pill(filter === c.id)}>
            {c.label} ({counts.get(c.id)})
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <AnnouncementCard key={a.id} a={a} />
        ))}
      </div>
    </>
  );
}
