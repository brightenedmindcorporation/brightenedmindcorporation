import type { Metadata } from "next";
import { getPublicAnnouncement } from "@/lib/announcementsServer";
import { categoryInfo, shareImage } from "@/lib/announcements";

/**
 * What appears when the link of an announcement is pasted in WhatsApp, Facebook or a search engine:
 * its title, its short text and its picture (1200x630), instead of the generic site card.
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const a = await getPublicAnnouncement(id);
  if (!a) return { title: "Annonce introuvable", robots: { index: false } };
  const image = shareImage(a.imageUrl);
  const title = `${a.title} · ${categoryInfo(a).label}`;
  return {
    title,
    description: a.description,
    alternates: { canonical: `/annonces/${a.id}` },
    openGraph: { title, description: a.description, type: "article", url: `/annonces/${a.id}`, ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}) },
    twitter: { card: image ? "summary_large_image" : "summary", title, description: a.description, ...(image ? { images: [image] } : {}) },
  };
}

export default function AnnouncementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
