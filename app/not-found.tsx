import Link from "next/link";

// Shown when a page does not exist: say it plainly and give the way back.
export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 pt-28 pb-16 text-center">
      <div className="max-w-md">
        <p className="text-6xl font-black text-red-600 dark:text-red-300 font-serif" aria-hidden="true">404</p>
        <h1 className="mt-4 text-2xl font-black text-ink">Cette page n&apos;existe pas</h1>
        <p className="mt-3 text-ink-soft">Le lien est peut-être ancien ou mal écrit. Revenez à l&apos;accueil ou écrivez-nous, nous vous aidons.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 text-white font-bold min-h-[52px] px-6 inline-flex items-center justify-center rounded-xl">
            Retour à l&apos;accueil
          </Link>
          <a
            href="https://wa.me/243988830799"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line text-ink font-semibold min-h-[52px] px-6 inline-flex items-center justify-center rounded-xl"
          >
            Écrire sur WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
