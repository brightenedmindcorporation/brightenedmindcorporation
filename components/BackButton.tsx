"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * A "Retour" button fixed under the header on every page except the home page, so it stays in view while scrolling.
 * It goes back in the history; with no history (page opened from a link) it goes up one level of the address.
 * Level pages (lessons, quizzes…) have their own "Retour au niveau" button, so it is not repeated there.
 */
export default function BackButton() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  if (pathname === "/" || /^\/academia\/[^/]+\/level\//.test(pathname) ) return null;

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    const parent = pathname.replace(/\/[^/]+\/?$/, "") || "/";
    router.push(parent);
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Retour à la page précédente"
      className="notranslate fixed left-3 top-[84px] z-[60] inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full border border-line bg-surface/95 text-sm font-bold text-ink shadow-lg backdrop-blur transition hover:border-red-600/60 hover:text-red-500 sm:px-4 md:left-5"
      translate="no"
    >
      <ArrowLeft size={18} aria-hidden="true" />
      {/* On a phone only the arrow shows, so the button covers less of the page. */}
      <span className="hidden sm:inline">Retour</span>
    </button>
  );
}
