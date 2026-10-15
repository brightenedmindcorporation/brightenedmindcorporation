"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

/**
 * Two small floating buttons, bottom-left on every page: jump back to the
 * top (shown once the page has been scrolled) and jump to the bottom (shown
 * while there is more page below). Bottom-left because the theme/language
 * controls and the WhatsApp bubble already occupy the right side.
 */
export default function ScrollButtons() {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const y = window.scrollY;
      const max = doc.scrollHeight - window.innerHeight;
      setShowTop(y > 400);
      setShowBottom(max > 600 && y < max - 300);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const base =
    "w-11 h-11 rounded-full border border-line bg-surface/95 backdrop-blur text-ink-soft hover:text-ink hover:border-red-600/60 shadow-lg inline-flex items-center justify-center transition";

  if (!showTop && !showBottom) return null;
  return (
    <div className="fixed bottom-4 left-4 z-[65] flex flex-col gap-2 notranslate" translate="no">
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Remonter en haut de la page" title="Haut de page" className={base}>
          <ArrowUp size={18} />
        </button>
      )}
      {showBottom && (
        <button
          onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
          aria-label="Descendre en bas de la page"
          title="Bas de page"
          className={base}
        >
          <ArrowDown size={18} />
        </button>
      )}
    </div>
  );
}
