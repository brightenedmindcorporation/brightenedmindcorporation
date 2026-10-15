"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";

// Interface language switch. The site is written in French; picking another
// language translates the page's interface with Google Website Translator
// (free, no key). Lesson content that is being LEARNED is marked
// translate="no" so it is never translated away.
const LANGS: { code: string; label: string; short: string }[] = [
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "sw", label: "Kiswahili", short: "SW" },
  { code: "zh-CN", label: "中文", short: "中文" },
];

function readCurrent(): string {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  const code = match ? decodeURIComponent(match[1]) : "fr";
  return LANGS.some((l) => l.code === code) ? code : "fr";
}

function setCookie(value: string | null) {
  const host = location.hostname;
  const domains = ["", host, host.startsWith("www.") ? host.slice(3) : `.${host}`];
  for (const d of domains) {
    const domain = d ? `; domain=${d}` : "";
    document.cookie = value
      ? `googtrans=${value}; path=/${domain}`
      : `googtrans=; path=/${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: Record<string, unknown>, id: string) => unknown } };
    __bmTranslateInit?: () => void;
  }
}

export default function LanguageSwitcher({ className = "", dropUp = false }: { className?: string; dropUp?: boolean }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("fr");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const code = readCurrent();
    setCurrent(code);
    if (code === "fr" || document.getElementById("google-translate-script")) return;

    // A non-French language is selected: load the translator so the page gets translated.
    window.__bmTranslateInit = () => {
      new window.google!.translate!.TranslateElement(
        { pageLanguage: "fr", includedLanguages: "fr,en,es,pt,sw,zh-CN", autoDisplay: false },
        "google_translate_element"
      );
    };
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=__bmTranslateInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const choose = (code: string) => {
    setOpen(false);
    if (code === current) return;
    setCookie(code === "fr" ? null : `/fr/${code}`);
    location.reload();
  };

  const active = LANGS.find((l) => l.code === current) ?? LANGS[0];

  return (
    <div ref={ref} className={`relative notranslate ${className}`} translate="no">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Langue de l'interface"
        title="Langue de l'interface"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-line bg-surface text-ink-soft hover:text-ink text-xs font-bold transition"
      >
        <Globe size={15} /> {active.short}
      </button>
      {open && (
        <div
          className={`absolute right-0 z-[80] w-48 rounded-2xl border border-line bg-surface shadow-2xl p-1.5 ${
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <p className="px-3 pt-1.5 pb-1 text-[10px] uppercase tracking-wide text-ink-faint font-bold">Langue de l'interface</p>
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => choose(l.code)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-ink hover:bg-surface-alt transition"
            >
              {l.label}
              {l.code === current && <Check size={14} className="text-red-500" />}
            </button>
          ))}
          <p className="px-3 pt-1.5 pb-1 text-[10px] text-ink-faint">Traduction automatique de l'interface. Les leçons restent dans la langue apprise.</p>
        </div>
      )}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
