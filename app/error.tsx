"use client";

// Shown when something breaks while a page is displayed: no technical jargon, a way to retry and a human fallback.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 pt-28 pb-16 text-center">
      <div className="max-w-md" role="alert">
        <h1 className="text-2xl font-black text-ink">Un problème est survenu</h1>
        <p className="mt-3 text-ink-soft">
          Cette page n&apos;a pas pu s&apos;afficher. Cela vient souvent d&apos;une connexion lente : réessayez dans un instant.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="glow-accent bg-gradient-to-br from-red-600 to-red-900 text-white font-bold min-h-[52px] px-6 inline-flex items-center justify-center rounded-xl"
          >
            Réessayer
          </button>
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
