"use client";

import { Volume2 } from "lucide-react";
import { speakPhrase } from "@/lib/academy/deviceSpeech";

/** Small round speaker button that plays the recording of one phrase. */
export default function SpeakIcon({
  text,
  langSlug,
  label = "Écouter",
  className = "",
}: {
  text: string;
  langSlug: string;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => speakPhrase(text, langSlug)}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-surface-alt hover:bg-red-600 hover:text-white text-ink-soft transition ${className}`}
    >
      <Volume2 size={13} />
    </button>
  );
}
