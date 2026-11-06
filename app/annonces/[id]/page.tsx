"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TrackedVideo from "@/components/TrackedVideo";
import ShareButton from "@/components/announcements/ShareButton";
import AnnouncementCard, { FactPills, StatusBadges } from "@/components/announcements/AnnouncementCard";
import { trackContent } from "@/lib/trackEvent";
import { categoryInfo, ctaFor, optimizedImage, optimizedVideo, videoPoster, type Announcement } from "@/lib/announcements";

export default function AnnouncementDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<Announcement | null | undefined>(undefined);
  const [others, setOthers] = useState<Announcement[]>([]);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/annonces");
  };

  useEffect(() => {
    fetch(`/api/announcements/${params.id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setAnnouncement(data.announcement))
      .catch(() => setAnnouncement(null));
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setOthers((data.announcements || []).filter((a: Announcement) => a.id !== params.id).slice(0, 3)))
      .catch(() => setOthers([]));
  }, [params.id]);

  useEffect(() => {
    if (announcement) trackContent({ type: "ann", key: announcement.id, title: announcement.title, event: "view", where: "page" });
  }, [announcement]);

  if (announcement === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page pt-28 text-ink-soft" role="status">
        <div className="flex flex-col items-center gap-3">
          <span className="h-9 w-9 animate-spin rounded-full border-4 border-line border-t-red-600 motion-reduce:animate-none" aria-hidden="true" />
          Chargement de l&apos;annonce…
        </div>
      </main>
    );
  }

  if (!announcement) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 pt-28 text-center">
        <div className="max-w-md">
          <p className="mb-2 text-2xl font-bold text-ink">Cette annonce n&apos;est plus disponible</p>
          <p className="text-ink-soft">Elle est peut-être terminée. Regardez nos annonces en cours.</p>
          <Link href="/annonces" className="mt-5 inline-flex min-h-[48px] items-center rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-6 font-bold text-white">
            Voir les annonces
          </Link>
        </div>
      </main>
    );
  }

  const a = announcement;
  const cat = categoryInfo(a);
  const cta = ctaFor(a);
  const press = () => trackContent({ type: "ann", key: a.id, title: a.title, event: "click", kind: cta.kind });
  const ctaClass =
    "glow-accent inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-6 text-lg font-bold text-white transition hover:from-red-500 hover:to-red-800";
  const external = cta.external || cta.href.startsWith("tel:");
  const button = external ? (
    <a href={cta.href} onClick={press} {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={ctaClass}>
      {cta.label}
    </a>
  ) : (
    <Link href={cta.href} onClick={press} className={ctaClass}>
      {cta.label} <ArrowRight size={18} aria-hidden={true} />
    </Link>
  );

  return (
    <main className="min-h-screen bg-page px-4 pb-32 pt-28 text-ink md:pb-20">
      <div className="mx-auto max-w-3xl">
        <button onClick={handleBack} className="mb-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-ink-soft transition hover:text-ink">
          <ArrowLeft size={16} aria-hidden={true} /> Retour
        </button>

        <article className="overflow-hidden rounded-3xl border border-line bg-surface shadow-xl">
          {a.imageUrl ? (
            <div className="relative aspect-video w-full bg-surface-alt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={optimizedImage(a.imageUrl, 1200)} alt={a.title} decoding="async" className="h-full w-full object-cover" />
            </div>
          ) : a.videoUrl ? (
            <TrackedVideo src={optimizedVideo(a.videoUrl)} poster={videoPoster(a.videoUrl, 1000)} type="ann" statsKey={a.id} title={a.title} className="aspect-video w-full bg-black" />
          ) : null}

          <div className="p-5 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${cat.badge}`}>{cat.label}</span>
              <StatusBadges a={a} />
            </div>
            <h1 className="text-3xl font-black leading-tight text-ink md:text-4xl">{a.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{a.description}</p>
            <FactPills a={a} className="mt-5" />

            {a.details && <div className="mt-6 whitespace-pre-line border-t border-line pt-6 text-base leading-relaxed text-ink-soft">{a.details}</div>}

            {a.videoUrl && a.imageUrl && (
              <TrackedVideo src={optimizedVideo(a.videoUrl)} poster={videoPoster(a.videoUrl, 1000)} type="ann" statsKey={a.id} title={a.title} className="mt-6 w-full rounded-2xl" />
            )}

            <div className="mt-8 hidden gap-3 md:flex">
              <div className="flex-1">{button}</div>
              <ShareButton a={a} className="min-h-[52px]" />
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section className="mt-12" aria-labelledby="autres-annonces">
            <h2 id="autres-annonces" className="mb-5 text-2xl font-black text-ink">
              Autres annonces
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.slice(0, 2).map((o) => (
                <AnnouncementCard key={o.id} a={o} />
              ))}
            </div>
            <p className="mt-6 text-center">
              <Link href="/annonces" className="inline-flex min-h-[44px] items-center font-bold text-red-700 underline dark:text-red-300">
                Toutes les annonces →
              </Link>
            </p>
          </section>
        )}
      </div>

      {/* On a phone the main button stays under the thumb. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-page/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="flex-1">{button}</div>
          <ShareButton a={a} label="" className="min-h-[52px] min-w-[52px] justify-center px-0" />
        </div>
      </div>
    </main>
  );
}
