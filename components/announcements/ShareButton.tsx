"use client";

import { Share2 } from "lucide-react";
import { trackContent } from "@/lib/trackEvent";
import { shareText, type Announcement } from "@/lib/announcements";

/** Shares an announcement: the phone's own share sheet when there is one, otherwise a WhatsApp message ready to send. */
export default function ShareButton({ a, label = "Partager", className = "" }: { a: Announcement; label?: string; className?: string }) {
  const share = async () => {
    trackContent({ type: "ann", key: a.id, title: a.title, event: "click", kind: "share" });
    const origin = window.location.origin;
    const url = `${origin}/annonces/${a.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: a.title, text: a.description, url });
        return;
      }
    } catch {
      // the person closed the share sheet: nothing to do
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText(a, origin))}`, "_blank", "noopener,noreferrer");
  };
  return (
    <button
      type="button"
      onClick={share}
      aria-label="Partager cette annonce"
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-bold text-ink-soft transition hover:border-red-600/60 hover:text-ink ${className}`}
    >
      <Share2 size={16} aria-hidden={true} /> {label}
    </button>
  );
}
