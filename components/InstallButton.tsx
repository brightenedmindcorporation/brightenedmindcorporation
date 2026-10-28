"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * "Télécharger l'application" button. Where the browser can install the app it opens the browser's own install
 * window; elsewhere (iPhone, Firefox…) it shows the two steps to follow. Hidden once the app is installed.
 */
export default function InstallButton({ className = "", label = "Télécharger l'app" }: { className?: string; label?: string }) {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [help, setHelp] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setInstalled(window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone === true);
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as InstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  const click = async () => {
    if (!prompt) return setHelp(true);
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setPrompt(null);
  };

  return (
    <>
      <button onClick={click} className={`items-center justify-center gap-2 ${className}`}>
        <Download size={16} />
        {label}
      </button>
      {help && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4" onClick={() => setHelp(false)}>
          <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-6 text-ink shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Installer l'application">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-black">Installer l&apos;application BM</h3>
              <button onClick={() => setHelp(false)} aria-label="Fermer" className="text-ink-faint hover:text-ink">
                <X size={18} />
              </button>
            </div>
            {ios ? (
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
                <li>
                  Touchez <Share size={14} className="mx-0.5 inline align-text-bottom" /> (Partager) en bas de Safari.
                </li>
                <li>Choisissez « Sur l&apos;écran d&apos;accueil », puis « Ajouter ».</li>
              </ol>
            ) : (
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
                <li>Ouvrez le menu de votre navigateur (⋮ ou ⋯).</li>
                <li>Choisissez « Installer l&apos;application » ou « Ajouter à l&apos;écran d&apos;accueil ».</li>
              </ol>
            )}
            <p className="mt-4 text-xs text-ink-faint">Une icône BM apparaît ensuite sur votre écran, et le site s&apos;ouvre en plein écran comme une application.</p>
          </div>
        </div>
      )}
    </>
  );
}
