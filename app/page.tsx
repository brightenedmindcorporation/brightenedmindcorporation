import Hero from "@/components/Hero";
import Announcements from "@/components/Announcements";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Link from "next/link";

// The announcements are read from the server and refreshed every minute.
export const revalidate = 60;

// Short on purpose: say what we do, give the three doors (in the Hero), show the announcements and the key
// figures, then the contact form. The company story lives on /a-propos.
export default function Home() {
  return (
    <>
      <Hero />
      <Announcements />
      <Stats />
      <section className="py-12 bg-page text-center px-6">
        <p className="text-ink-soft mb-4">Envie d&apos;en savoir plus sur notre vision, nos réalisations et nos actualités ?</p>
        <Link
          href="/a-propos"
          className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl border border-line text-ink font-semibold hover:border-red-600/60 transition"
        >
          Découvrir BM Corporation →
        </Link>
      </section>
      <Contact />
    </>
  );
}
