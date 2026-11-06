import type { Metadata } from "next";
import { listPublicAnnouncements } from "@/lib/announcementsServer";
import AnnouncementsBrowser from "@/components/announcements/AnnouncementsBrowser";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Annonces et offres",
  description:
    "Les nouvelles formations, offres d'emploi, promotions et événements de Brightened Mind Corporation à Lubumbashi.",
};

export default async function AnnouncementsPage() {
  const announcements = await listPublicAnnouncements();
  return (
    <main className="min-h-screen bg-page px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-300">BM Corporation</p>
        <h1 className="mt-1 text-3xl font-black text-ink md:text-5xl">Annonces et offres</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">Nouvelles formations, offres d&apos;emploi, promotions et événements : tout ce qui se passe chez nous.</p>
        <AnnouncementsBrowser announcements={announcements} />
      </div>
    </main>
  );
}
