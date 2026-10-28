"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED = "bm-install-dismissed";

/** "Install the app" card: the browser's install button on Android and computers, a short how-to on iPhone. Hidden once installed. */
export default function InstallApp() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone === true;
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISSED) === "1";
    } catch {
      // storage blocked: the card is simply shown
    }
    if (standalone || dismissed) return;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as any).MSStream;
    setIos(isIos);
    if (isIos) setHidden(false);
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as InstallPromptEvent);
      setHidden(false);
    };
    const onInstalled = () => setHidden(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const close = () => {
    setHidden(true);
    try {
      localStorage.setItem(DISMISSED, "1");
    } catch {}
  };

  if (hidden) return null;
  return (
    <div className="mb-6 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-600">
        <Download size={22} />
      </div>
      <div className="min-w-0 flex-1 text-sm">
        <p className="font-bold text-ink">Installer l&apos;application BM Academia</p>
        {ios ? (
          <p className="text-ink-soft">
            Sur iPhone : touchez <Share size={14} className="mx-0.5 inline align-text-bottom" /> puis « Sur l&apos;écran d&apos;accueil ».
          </p>
        ) : (
          <p className="text-ink-soft">Une icône sur votre écran, et le site s&apos;ouvre en plein écran comme une application.</p>
        )}
      </div>
      {prompt && (
        <button
          onClick={async () => {
            await prompt.prompt();
            const choice = await prompt.userChoice;
            if (choice.outcome === "accepted") setHidden(true);
            setPrompt(null);
          }}
          className="shrink-0 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
        >
          Installer
        </button>
      )}
      <button onClick={close} aria-label="Fermer" className="shrink-0 rounded-lg p-1.5 text-ink-faint hover:text-ink">
        <X size={16} />
      </button>
    </div>
  );
}
