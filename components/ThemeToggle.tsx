"use client";

import { useEffect, useState } from "react";
import { Monitor, Sun, Moon } from "lucide-react";

type Theme = "system" | "light" | "dark";

function resolveIsDark(theme: Theme): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", resolveIsDark(theme));
}

const OPTIONS: { value: Theme; label: string; Icon: typeof Monitor }[] = [
  { value: "system", label: "Système", Icon: Monitor },
  { value: "light", label: "Clair", Icon: Sun },
  { value: "dark", label: "Sombre", Icon: Moon },
];

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {}
    const initial: Theme = stored === "light" || stored === "dark" ? stored : "system";
    setTheme(initial);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      let current: string | null = null;
      try {
        current = localStorage.getItem("theme");
      } catch {}
      if (current !== "light" && current !== "dark") applyTheme("system");
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const choose = (next: Theme) => {
    setTheme(next);
    try {
      if (next === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {}
    applyTheme(next);
  };

  // Reserve the same footprint before mount so the toggle doesn't cause
  // layout shift once client JS determines the real stored preference.
  if (!mounted) {
    return <div className={`inline-flex w-[104px] h-9 ${className}`} aria-hidden="true" />;
  }

  return (
    <div
      className={`inline-flex items-center gap-0.5 p-1 rounded-xl border border-line bg-surface-alt/60 ${className}`}
      role="group"
      aria-label="Thème d'affichage"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => choose(opt.value)}
          aria-pressed={theme === opt.value}
          title={opt.label}
          className={`p-1.5 rounded-lg transition ${
            theme === opt.value
              ? "bg-red-600 text-white shadow"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          <opt.Icon size={14} strokeWidth={2} aria-hidden="true" />
          <span className="sr-only">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
