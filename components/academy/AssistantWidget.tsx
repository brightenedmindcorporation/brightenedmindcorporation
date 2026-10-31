"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, Send, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { SUGGESTIONS } from "@/lib/academy/assistantGuide";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const KEY = "bm-assistant-chat";
const HELLO: Msg = { role: "assistant", content: "Bonjour ! Je suis l'assistant de BM Academia. Je vous aide à utiliser la plateforme : leçons, quiz, niveaux, certificat, audios… Posez-moi votre question." };

/** Pages where an assistant would be in the way or could be used to cheat: quizzes and level tests. */
const HIDDEN = /\/(quiz|final-quiz|placement)(\/|$)/;

/** A chat bubble that answers students' questions about the platform. It never sees their answers or marks. */
export default function AssistantWidget() {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([HELLO]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (Array.isArray(saved) && saved.length) setMessages(saved);
    } catch {
      // nothing saved
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      // storage blocked: the chat simply is not kept
    }
    end.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  if (HIDDEN.test(pathname)) return null;

  const send = async (q: string) => {
    const question = q.trim();
    if (!question || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setText("");
    setBusy(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/academy/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ messages: next.filter((m) => m !== HELLO), page: pathname }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "L'assistant ne répond pas pour le moment.");
      setMessages([...next, { role: "assistant", content: result.reply }]);
    } catch (e) {
      setMessages([...next, { role: "assistant", content: (e as Error).message }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="notranslate fixed bottom-3 left-3 z-[70] sm:bottom-4 sm:left-4" translate="no">
      {open && (
        <div className="mb-2 flex h-[min(520px,calc(100vh-6rem))] w-[min(380px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-red-900 to-red-700 px-4 py-3 text-white">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Bot size={18} /> Assistant BM Academia
            </p>
            <button onClick={() => setOpen(false)} aria-label="Fermer l'assistant">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 ${m.role === "user" ? "bg-red-700 text-white" : "bg-surface-alt text-ink"}`}>{m.content}</p>
              </div>
            ))}
            {busy && <p className="text-xs text-ink-faint">L&apos;assistant écrit…</p>}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-ink-soft hover:border-red-600/60 hover:text-ink">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={end} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(text);
            }}
            className="border-t border-line p-2"
          >
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={600}
                placeholder="Votre question…"
                className="min-w-0 flex-1 rounded-xl border border-line bg-surface-alt px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button type="submit" disabled={busy || !text.trim()} aria-label="Envoyer" className="rounded-xl bg-red-700 px-3 text-white disabled:opacity-50">
                <Send size={16} />
              </button>
            </div>
            <p className="mt-1.5 text-[10px] leading-tight text-ink-faint">Assistant automatique : il peut se tromper. Il ne voit ni vos notes ni votre dossier et ne donne pas les réponses des quiz.</p>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant BM Academia"}
        className="flex h-12 items-center gap-2 rounded-full bg-gradient-to-br from-red-700 to-red-900 px-4 text-sm font-bold text-white shadow-lg"
      >
        <Bot size={20} />
        <span className="hidden sm:inline">Aide</span>
      </button>
    </div>
  );
}
