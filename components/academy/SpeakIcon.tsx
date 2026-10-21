"use client";

import { speakPhrase } from "@/lib/academy/deviceSpeech";
import ListenButton from "@/components/academy/ListenButton";

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
    <ListenButton
      play={(id) => speakPhrase(text, langSlug, id)}
      title={label}
      size={13}
      className={`inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-surface-alt hover:bg-red-600 hover:text-white text-ink-soft transition ${className}`}
    />
  );
}
