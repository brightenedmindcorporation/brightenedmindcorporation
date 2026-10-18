"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSfxMuted, setSfxMuted } from "@/lib/academy/sfx";

/** Speaker button: switches the sound effects of the learning space on or off. */
export default function SoundToggle({ className = "" }: { className?: string }) {
  const [muted, setMuted] = useState(false);
  useEffect(() => setMuted(isSfxMuted()), []);
  return (
    <button
      type="button"
      onClick={() => {
        const next = !muted;
        setMuted(next);
        setSfxMuted(next);
      }}
      aria-label={muted ? "Activer les effets sonores" : "Couper les effets sonores"}
      title={muted ? "Effets sonores coupés" : "Effets sonores activés"}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink-soft hover:text-ink transition ${className}`}
    >
      {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
    </button>
  );
}
