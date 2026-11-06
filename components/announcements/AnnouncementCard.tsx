"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CalendarDays, MapPin, Tag, Play, GraduationCap, Briefcase, Percent, Sparkles, Info, ArrowRight } from "lucide-react";
import { trackContent } from "@/lib/trackEvent";
import {
  categoryInfo,
  categoryOf,
  ctaFor,
  isNew,
  optimizedImage,
  prettyDate,
  urgencyLabel,
  videoPoster,
  type Announcement,
  type AnnouncementCategory,
} from "@/lib/announcements";
import ShareButton from "@/components/announcements/ShareButton";

const ICONS: Record<AnnouncementCategory, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>> = {
  formation: GraduationCap,
  emploi: Briefcase,
  promo: Percent,
  evenement: Sparkles,
  info: Info,
};

/** The three small facts of an announcement (when, where, how much), shown as pills. */
export function FactPills({ a, className = "" }: { a: Pick<Announcement, "eventDate" | "place" | "price">; className?: string }) {
  const items = [
    { Icon: CalendarDays, text: prettyDate(a.eventDate) },
    { Icon: MapPin, text: a.place || "" },
    { Icon: Tag, text: a.price || "" },
  ].filter((i) => i.text);
  if (items.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map(({ Icon, text }) => (
        <li key={text} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-alt px-3 py-1.5 text-sm font-semibold text-ink">
          <Icon size={15} className="text-red-600 dark:text-red-300" aria-hidden={true} />
          {text}
        </li>
      ))}
    </ul>
  );
}

/** "Nouveau" and the time left, as small badges. */
export function StatusBadges({ a }: { a: Announcement }) {
  const urgent = urgencyLabel(a);
  const fresh = isNew(a);
  if (!urgent && !fresh) return null;
  return (
    <>
      {urgent && <span className="rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-white">{urgent}</span>}
      {!urgent && fresh && <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">Nouveau</span>}
    </>
  );
}

/** One announcement as a card: picture, category, title, short text, facts, and the button that makes the visitor act. */
export default function AnnouncementCard({ a }: { a: Announcement }) {
  const cat = categoryInfo(a);
  const Icon = ICONS[categoryOf(a)];
  const cta = ctaFor(a);
  const ref = useRef<HTMLElement>(null);

  // Counted as seen the first time at least half of the card is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackContent({ type: "ann", key: a.id, title: a.title, event: "view", where: "list" });
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [a.id, a.title]);

  const media = a.imageUrl ? optimizedImage(a.imageUrl, 720) : a.videoUrl ? videoPoster(a.videoUrl, 720) : "";
  const press = () => trackContent({ type: "ann", key: a.id, title: a.title, event: "click", kind: cta.kind });
  const buttonClass =
    "glow-accent inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-5 text-base font-bold text-white transition hover:from-red-500 hover:to-red-800";

  return (
    <article ref={ref} className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-lg">
      <Link href={`/annonces/${a.id}`} className="relative block aspect-[16/10] overflow-hidden bg-surface-alt" aria-label={`Voir l'annonce : ${a.title}`}>
        {media ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-950 via-red-900 to-black text-white/90">
            <Icon size={56} aria-hidden={true} />
          </div>
        )}
        {!a.imageUrl && a.videoUrl && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white">
              <Play size={26} aria-hidden={true} />
            </span>
          </span>
        )}
        <span className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${cat.badge}`}>{cat.label}</span>
        </span>
        <span className="absolute right-3 top-3 flex flex-wrap justify-end gap-2">
          <StatusBadges a={a} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 text-xl font-black leading-snug text-ink">
          <Link href={`/annonces/${a.id}`} className="hover:text-red-600 dark:hover:text-red-300">
            {a.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-base leading-relaxed text-ink-soft">{a.description}</p>
        <FactPills a={a} />

        <div className="mt-auto flex flex-col gap-3 pt-2">
          {cta.external || cta.href.startsWith("tel:") ? (
            <a href={cta.href} onClick={press} {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={buttonClass}>
              {cta.label}
            </a>
          ) : (
            <Link href={cta.href} onClick={press} className={buttonClass}>
              {cta.label}
              <ArrowRight size={18} aria-hidden={true} />
            </Link>
          )}
          <div className="flex items-center justify-between gap-2">
            {cta.kind !== "detail" ? (
              <Link
                href={`/annonces/${a.id}`}
                onClick={() => trackContent({ type: "ann", key: a.id, title: a.title, event: "click", kind: "detail" })}
                className="inline-flex min-h-[44px] items-center text-sm font-bold text-red-700 underline dark:text-red-300"
              >
                Voir le détail
              </Link>
            ) : (
              <span />
            )}
            <ShareButton a={a} />
          </div>
        </div>
      </div>
    </article>
  );
}
