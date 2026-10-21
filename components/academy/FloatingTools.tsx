"use client";

import { useState } from "react";
import { Settings, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SoundToggle from "@/components/academy/SoundToggle";

/**
 * Language, sound and theme controls, floating at the bottom right of every learning page. On a phone they are
 * folded behind one small button so they never cover the answers or the Submit button; on larger screens
 * they stay visible side by side.
 */
export default function FloatingTools() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-[70] flex flex-col-reverse sm:flex-row items-end sm:items-center gap-2 max-w-[calc(100vw-1.5rem)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer les réglages" : "Réglages : langue, son, thème"}
        aria-expanded={open}
        className="sm:hidden w-11 h-11 rounded-full bg-surface border border-line shadow-lg flex items-center justify-center text-ink-soft"
      >
        {open ? <X size={18} /> : <Settings size={18} />}
      </button>
      <div className={`${open ? "flex" : "hidden"} sm:flex flex-col-reverse sm:flex-row items-end sm:items-center gap-2`}>
        <LanguageSwitcher dropUp />
        <SoundToggle className="shadow-lg bg-surface" />
        <ThemeToggle className="shadow-lg bg-surface" />
      </div>
    </div>
  );
}
