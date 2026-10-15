"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Square, Headphones } from "lucide-react";
import type { Dialogue } from "@/content/dialogues/types";
import { clipUrl, dialogueClipText } from "@/lib/academy/audioClips";
import { claimPlayback, getClipBlob, releasePlayback } from "@/lib/academy/lessonAudioPlayer";
import { speakWithDeviceVoice } from "@/lib/academy/deviceSpeech";

/**
 * Plays a two-person conversation line by line, each person with their own
 * recorded voice (the device's voice only if a clip can't be fetched). The
 * text is hidden while the student listens: the questions test what was
 * understood, not what was read. The transcript is offered once they have
 * answered.
 */
export default function DialoguePlayer({
  dialogue,
  langSlug,
  showTranscript,
}: {
  dialogue: Dialogue;
  langSlug: string;
  showTranscript: boolean;
}) {
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [plays, setPlays] = useState(0);
  const run = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = () => {
    run.current++;
    audioRef.current?.pause();
    audioRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setPlaying(false);
    setCurrent(null);
    releasePlayback(stop);
  };

  useEffect(() => () => stop(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const playLine = async (index: number, myRun: number) => {
    const line = dialogue.lines[index];
    const blob = await getClipBlob(clipUrl(langSlug, dialogueClipText(line.speaker, line.text)));
    if (run.current !== myRun) return;
    if (!blob) {
      await speakWithDeviceVoice(line.text, langSlug, { pitch: line.speaker === "A" ? 1.15 : 0.8 });
      return;
    }
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioRef.current = audio;
    try {
      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      });
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  const start = async () => {
    stop();
    const myRun = run.current;
    claimPlayback(stop);
    setPlaying(true);
    setPlays((p) => p + 1);
    for (let i = 0; i < dialogue.lines.length; i++) {
      if (run.current !== myRun) return;
      setCurrent(i);
      await playLine(i, myRun);
      if (run.current !== myRun) return;
      await new Promise((r) => setTimeout(r, 350));
    }
    if (run.current === myRun) {
      setPlaying(false);
      setCurrent(null);
      releasePlayback(stop);
    }
  };

  const speakerNow = current !== null ? dialogue.lines[current].speaker : null;

  return (
    <div className="rounded-2xl border border-line bg-surface-alt p-5 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={playing ? stop : start}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-5 py-3 rounded-xl transition"
        >
          {playing ? <Square size={16} /> : <Play size={16} />}
          {playing ? "Arrêter" : plays > 0 ? "Réécouter la conversation" : "Écouter la conversation"}
        </button>
        <div className="flex items-center gap-4" aria-hidden="true">
          {(["A", "B"] as const).map((s) => (
            <span key={s} className="flex items-center gap-2 text-xs font-bold text-ink-soft">
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm text-white transition ${
                  s === "A" ? "bg-red-600" : "bg-zinc-700"
                } ${speakerNow === s ? "ring-4 ring-red-500/40 scale-110" : "opacity-70"}`}
              >
                {s}
              </span>
              {speakerNow === s && <span className="inline-flex items-end gap-0.5 h-4">{[0, 1, 2].map((b) => <i key={b} className="w-1 bg-red-500 animate-pulse rounded" style={{ height: `${8 + ((b * 5) % 9)}px`, animationDelay: `${b * 120}ms` }} />)}</span>}
            </span>
          ))}
        </div>
        {playing && current !== null && (
          <span className="text-xs text-ink-faint">
            {current + 1}/{dialogue.lines.length}
          </span>
        )}
      </div>
      <p className="text-xs text-ink-soft flex items-center gap-2">
        <Headphones size={14} /> Deux personnes conversent. Écoutez autant de fois que vous voulez, puis répondez aux questions.
      </p>

      {showTranscript && (
        <details className="text-sm text-ink-soft">
          <summary className="cursor-pointer font-semibold text-ink">Voir la transcription</summary>
          <div className="mt-3 space-y-1.5" translate="no">
            {dialogue.lines.map((l, i) => (
              <p key={i} className="notranslate">
                <b className={l.speaker === "A" ? "text-red-500" : "text-ink"}>{l.speaker}:</b> {l.text}
              </p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
