"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw, Volume2 } from "lucide-react";
import { clipUrl } from "@/lib/academy/audioClips";
import { claimPlayback, getClipBlob, releasePlayback } from "@/lib/academy/lessonAudioPlayer";

const RATES = [0.75, 1, 1.25, 1.5];

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Full-length narration player for "Listen Lesson" / "Listen Reading": play
 * and pause, a seek bar (click or drag to any second), ±10 s buttons and a
 * speed choice. If the recording isn't available (not generated, offline and
 * never downloaded) it falls back to the device's own voice via `onFallback`.
 */
export default function NarrationPlayer({
  text,
  langSlug,
  label,
  onFallbackSpeak,
  onFallbackStop,
}: {
  text: string;
  langSlug: string;
  label: string;
  onFallbackSpeak: () => void;
  onFallbackStop: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const stopRef = useRef<() => void>(() => {});
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [fallbackPlaying, setFallbackPlaying] = useState(false);

  // Load the clip (cache first) when the player appears.
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getClipBlob(clipUrl(langSlug, text)).then((blob) => {
      if (cancelled) return;
      if (!blob) {
        setStatus("missing");
        return;
      }
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      const audio = new Audio(url);
      audio.preload = "metadata";
      audio.onloadedmetadata = () => setDuration(audio.duration);
      audio.ontimeupdate = () => setCurrent(audio.currentTime);
      audio.onplay = () => setPlaying(true);
      audio.onpause = () => setPlaying(false);
      audio.onended = () => {
        setPlaying(false);
        setCurrent(0);
        audio.currentTime = 0;
      };
      audioRef.current = audio;
      setStatus("ready");
    });
    return () => {
      cancelled = true;
      audioRef.current?.pause();
      audioRef.current = null;
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
      releasePlayback(stopRef.current);
    };
  }, [langSlug, text]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      const stop = () => audio.pause();
      stopRef.current = stop;
      claimPlayback(stop);
      audio.playbackRate = rate;
      audio.play().catch(() => setStatus("missing"));
    } else {
      audio.pause();
    }
  }, [rate]);

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  };
  const skip = (delta: number) => {
    const audio = audioRef.current;
    if (audio) seek(Math.min(Math.max(audio.currentTime + delta, 0), duration || audio.duration || 0));
  };
  const changeRate = (r: number) => {
    setRate(r);
    if (audioRef.current) audioRef.current.playbackRate = r;
  };

  if (status === "missing") {
    // No recording: device voice with plain play / stop.
    return (
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={() => {
            claimPlayback(() => setFallbackPlaying(false));
            setFallbackPlaying(true);
            onFallbackSpeak();
          }}
          className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-red-950/50 inline-flex items-center gap-2"
        >
          <Volume2 size={16} /> {label}
        </button>
        {fallbackPlaying && (
          <button
            onClick={() => {
              onFallbackStop();
              setFallbackPlaying(false);
            }}
            className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-6 py-3 rounded-xl border border-line transition"
          >
            ⏹ Stop
          </button>
        )}
      </div>
    );
  }

  const ready = status === "ready";
  const btn =
    "inline-flex items-center justify-center w-9 h-9 rounded-full text-ink-soft hover:text-ink hover:bg-surface-alt transition disabled:opacity-40";

  return (
    <div className="mt-6 rounded-2xl border border-line bg-surface-alt/60 p-4">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? "Pause" : label}
          title={playing ? "Pause" : label}
          className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white rounded-full w-12 h-12 inline-flex items-center justify-center shadow-lg shadow-red-950/50 shrink-0"
        >
          {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-ink">{label}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs tabular-nums text-ink-soft w-10 text-right">{fmt(current)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(current, duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!ready}
              aria-label="Position dans l'audio"
              className="flex-1 accent-red-600 cursor-pointer disabled:cursor-default"
            />
            <span className="text-xs tabular-nums text-ink-soft w-10">{ready ? fmt(duration) : "…"}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
        <div className="flex items-center gap-1">
          <button onClick={() => skip(-10)} disabled={!ready} className={btn} aria-label="Reculer de 10 secondes" title="−10 s">
            <RotateCcw size={16} />
          </button>
          <button onClick={() => skip(10)} disabled={!ready} className={btn} aria-label="Avancer de 10 secondes" title="+10 s">
            <RotateCw size={16} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          {RATES.map((r) => (
            <button
              key={r}
              onClick={() => changeRate(r)}
              disabled={!ready}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg transition ${
                rate === r ? "bg-red-600 text-white" : "text-ink-soft hover:text-ink hover:bg-surface-alt"
              }`}
            >
              {r}×
            </button>
          ))}
        </div>
      </div>
      {status === "loading" && <p className="text-xs text-ink-faint mt-2">Chargement de l'audio…</p>}
    </div>
  );
}
