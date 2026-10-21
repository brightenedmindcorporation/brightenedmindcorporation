"use client";

import { useEffect, useId, useState } from "react";
import { Square, Volume2 } from "lucide-react";
import { subscribePlayback } from "@/lib/academy/lessonAudioPlayer";
import { stopSpeaking } from "@/lib/academy/deviceSpeech";

/**
 * A speaker button that turns into a Stop button while its sound plays. `play` starts the sound and must pass
 * the given id on to the player (speakPhrase / playClip / speakWithDeviceVoice), which is how the button knows
 * that it is the one playing.
 */
export default function ListenButton({
  play,
  label,
  stopLabel = "Arrêter",
  className = "",
  size = 15,
  disabled,
  title,
}: {
  play: (id: string) => void | Promise<unknown>;
  /** Text next to the icon; leave out for a round icon-only button. */
  label?: string;
  stopLabel?: string;
  className?: string;
  size?: number;
  disabled?: boolean;
  title?: string;
}) {
  const id = useId();
  const [active, setActive] = useState(false);
  useEffect(() => subscribePlayback((o) => setActive(o === id)), [id]);
  const name = active ? stopLabel : title || label || "Écouter";
  return (
    <button
      type="button"
      disabled={disabled && !active}
      onClick={() => (active ? stopSpeaking() : play(id))}
      aria-label={name}
      title={name}
      aria-pressed={active}
      className={`${className} ${active ? "ring-2 ring-red-500" : ""}`}
    >
      {active ? <Square size={size - 2} fill="currentColor" /> : <Volume2 size={size} />}
      {label ? ` ${active ? stopLabel : label}` : null}
    </button>
  );
}
