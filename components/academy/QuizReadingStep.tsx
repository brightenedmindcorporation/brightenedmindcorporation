"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, RotateCcw } from "lucide-react";
import { sfx } from "@/lib/academy/sfx";
import { SPEECH_LANG } from "@/lib/academy/deviceSpeech";
import { diffAnswer } from "@/lib/academy/writingLab";
import { DiffView } from "@/components/academy/WritingLab";
import Zh from "@/components/academy/Zh";

/** The reading-aloud part of a quiz: the passage to read, in the language of the quiz. */
export interface QuizReading {
  text: string;
  cjk: boolean;
}

export interface ReadingState {
  /** What the browser's speech recognition heard. */
  transcript: string;
  /** Out of 100 (how close the reading was to the passage), null until the student has read or skipped. */
  percent: number | null;
  skipped: boolean;
}

export const emptyReadingState = (): ReadingState => ({ transcript: "", percent: null, skipped: false });
export const readingDone = (s: ReadingState) => s.percent !== null || s.skipped;

/** Speech recognition never writes exactly the passage: 85 % of the words right already earns the full part. */
export function readingPercent(text: string, transcript: string, cjk: boolean): number {
  if (!transcript.trim()) return 0;
  return Math.min(100, Math.round((diffAnswer(text, transcript, cjk).score * 100) / 0.85));
}

export default function QuizReadingStep({
  reading,
  state,
  onChange,
  submitted,
  langSlug,
}: {
  reading: QuizReading;
  state: ReadingState;
  onChange: (next: ReadingState) => void;
  submitted: boolean;
  langSlug: string;
}) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognition = useRef<any>(null);
  const heard = useRef("");
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition));
    return () => {
      try {
        recognition.current?.abort();
      } catch {
        // not running
      }
    };
  }, []);

  const start = () => {
    setError(null);
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    heard.current = "";
    const r = new SR();
    r.lang = SPEECH_LANG[langSlug] ?? "en-US";
    r.continuous = true;
    r.interimResults = false;
    r.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) if (event.results[i].isFinal) heard.current += ` ${event.results[i][0].transcript}`;
    };
    r.onerror = (e: any) => {
      if (e?.error === "not-allowed" || e?.error === "service-not-allowed") setError("Le micro n'est pas autorisé. Autorisez-le dans votre navigateur, puis réessayez.");
      else if (e?.error === "no-speech") setError("Je n'ai rien entendu. Parlez près du micro et réessayez.");
    };
    r.onend = () => {
      setRecording(false);
      const transcript = heard.current.trim();
      if (transcript) onChange({ transcript, percent: readingPercent(reading.text, transcript, reading.cjk), skipped: false });
    };
    recognition.current = r;
    try {
      r.start();
      sfx.recordStart();
      setRecording(true);
    } catch {
      setError("Le micro n'a pas pu démarrer. Réessayez.");
    }
  };

  const stop = () => {
    try {
      recognition.current?.stop();
    } catch {
      // not running
    }
    sfx.recordStop();
  };

  const diff = submitted && state.transcript ? diffAnswer(reading.text, state.transcript, reading.cjk).ops : null;

  return (
    <div className="space-y-4">
      <p translate="no" className="notranslate rounded-2xl border border-line bg-surface-alt p-5 text-lg leading-relaxed text-ink">
        <span className={reading.cjk ? "leading-[2.4]" : undefined}>
          <Zh text={reading.text} on={reading.cjk} />
        </span>
      </p>

      {!submitted && (
        <div className="flex flex-wrap items-center gap-3">
          {!recording ? (
            <button
              type="button"
              onClick={start}
              disabled={!supported}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition"
            >
              {state.percent !== null ? <RotateCcw size={15} /> : <Mic size={15} />} {state.percent !== null ? "Lire à nouveau" : "Lire avec le micro"}
            </button>
          ) : (
            <button type="button" onClick={stop} className="inline-flex items-center gap-2 bg-ink text-surface text-sm font-bold px-5 py-2.5 rounded-xl animate-pulse">
              <Square size={14} /> J&apos;ai fini de lire
            </button>
          )}
          {!state.skipped && state.percent === null && !recording && (
            <button type="button" onClick={() => onChange({ transcript: "", percent: null, skipped: true })} className="text-xs font-bold text-ink-soft underline">
              Je ne peux pas utiliser le micro (0 point pour cette partie)
            </button>
          )}
          {state.skipped && <span className="text-xs font-semibold text-amber-500">Partie passée : 0 point. Vous pouvez encore lire avec le micro.</span>}
        </div>
      )}

      {!supported && !submitted && (
        <p className="text-xs text-amber-500">Ce navigateur ne reconnaît pas la voix. Utilisez Chrome ou Edge, ou passez cette partie.</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {state.percent !== null && !submitted && (
        <p className="text-sm text-ink-soft">
          Le micro a compris : <span translate="no" className="notranslate text-ink">{state.transcript}</span>
        </p>
      )}
      {submitted && (
        <div className="space-y-1 text-sm">
          {diff ? <DiffView ops={diff} /> : <p className="text-ink-soft">Pas de lecture enregistrée.</p>}
          <p className="font-bold text-ink">Lecture : {state.percent ?? 0}/100</p>
        </div>
      )}
    </div>
  );
}
