"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "job" | "normal";
  details?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
}

export default function AnnouncementDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<Announcement | null | undefined>(undefined);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    fetch(`/api/announcements/${params.id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setAnnouncement(data.announcement))
      .catch(() => setAnnouncement(null));
  }, [params.id]);

  if (announcement === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page text-ink-soft pt-28">
        Chargement...
      </main>
    );
  }

  if (!announcement) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page text-ink-soft pt-28 px-4 text-center">
        <div>
          <p className="text-2xl font-bold text-ink mb-2">Annonce introuvable</p>
          <button onClick={handleBack} className="text-red-500 hover:text-red-400 font-semibold">
            ← Retour
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-page text-ink pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <button onClick={handleBack} className="inline-block mb-6 text-sm font-bold text-ink-soft hover:text-ink transition">
          ← Retour
        </button>

        <div className="bg-surface-sunken border border-line rounded-3xl overflow-hidden shadow-xl">
          {announcement.imageUrl && (
            <div className="relative w-full aspect-video bg-surface-alt">
              <Image src={announcement.imageUrl} alt={announcement.title} fill unoptimized className="object-cover" />
            </div>
          )}

          {announcement.videoUrl && !announcement.imageUrl && (
            <video src={announcement.videoUrl} controls className="w-full aspect-video bg-black" />
          )}

          <div className="p-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-700/40 mb-4">
              Annonce
            </span>
            <h1 className="text-3xl font-black text-ink mb-4">{announcement.title}</h1>
            <p className="text-ink-soft leading-relaxed mb-6">{announcement.description}</p>

            {announcement.details && (
              <div className="text-ink-soft leading-relaxed whitespace-pre-line border-t border-line pt-6">
                {announcement.details}
              </div>
            )}

            {announcement.videoUrl && announcement.imageUrl && (
              <video src={announcement.videoUrl} controls className="w-full rounded-2xl mt-6" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
