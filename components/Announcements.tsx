import Link from "next/link";
import { listPublicAnnouncements } from "@/lib/announcementsServer";
import AnnouncementCard from "@/components/announcements/AnnouncementCard";

/**
 * The advertising space of the home page: the three latest announcements as cards (pinned first), and a link to all of them.
 * Rendered on the server, so it is there at once with no flicker, and Google can read it. Nothing is shown when there is none.
 */
export default async function Announcements() {
  const all = await listPublicAnnouncements();
  if (all.length === 0) return null;
  const shown = all.slice(0, 3);

  return (
    <section aria-labelledby="annonces-titre" className="bg-page px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-300">À ne pas manquer</p>
            <h2 id="annonces-titre" className="mt-1 text-3xl font-black text-ink md:text-4xl">
              Annonces et offres
            </h2>
          </div>
          {all.length > 3 && (
            <Link href="/annonces" className="inline-flex min-h-[44px] items-center font-bold text-red-700 underline dark:text-red-300">
              Voir les {all.length} annonces →
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((a) => (
            <AnnouncementCard key={a.id} a={a} />
          ))}
        </div>

        {all.length <= 3 && (
          <p className="mt-6 text-center">
            <Link href="/annonces" className="inline-flex min-h-[44px] items-center font-bold text-red-700 underline dark:text-red-300">
              Toutes les annonces →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
