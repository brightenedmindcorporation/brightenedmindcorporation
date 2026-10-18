"use client";

/**
 * Sound effects of the learning space (right / wrong answer, quiz passed / failed, step completed, taps,
 * start and end of a recording). They are synthesised in the browser — no files to download, they work
 * offline — and can be switched off with the speaker button (the choice is remembered on the device).
 */

const MUTE_KEY = "bm_sfx_muted";

let ctx: AudioContext | null = null;

export function isSfxMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSfxMuted(muted: boolean) {
  try {
    localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {
    // storage unavailable: the choice just is not remembered
  }
  if (muted) return;
  sfx.tap(); // a small confirmation that the sound is back
}

function audio(): AudioContext | null {
  if (typeof window === "undefined" || isSfxMuted()) return null;
  try {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx ||= new Ctor();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

interface Tone {
  freq: number;
  /** Seconds after the start of the effect. */
  at?: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
  /** Slide to this frequency over the tone. */
  to?: number;
}

function play(tones: Tone[], master = 0.16) {
  const c = audio();
  if (!c) return;
  const t0 = c.currentTime + 0.01;
  const out = c.createGain();
  out.gain.value = master;
  out.connect(c.destination);
  for (const t of tones) {
    const osc = c.createOscillator();
    const env = c.createGain();
    const start = t0 + (t.at ?? 0);
    osc.type = t.type ?? "sine";
    osc.frequency.setValueAtTime(t.freq, start);
    if (t.to) osc.frequency.exponentialRampToValueAtTime(t.to, start + t.dur);
    const peak = t.gain ?? 1;
    env.gain.setValueAtTime(0.0001, start);
    env.gain.exponentialRampToValueAtTime(peak, start + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, start + t.dur);
    osc.connect(env);
    env.connect(out);
    osc.start(start);
    osc.stop(start + t.dur + 0.03);
  }
}

// Note frequencies (Hz)
const C5 = 523.25, E5 = 659.25, G5 = 783.99, C6 = 1046.5, E6 = 1318.5, G6 = 1568;

export const sfx = {
  /** A button, a choice, a tile. */
  tap() {
    play([{ freq: 720, dur: 0.05, type: "triangle", gain: 0.5 }], 0.12);
  },
  /** A right answer. */
  correct() {
    play([
      { freq: C6, dur: 0.16, type: "sine" },
      { freq: E6, at: 0.09, dur: 0.16, type: "sine" },
      { freq: G6, at: 0.18, dur: 0.3, type: "sine" },
      { freq: G6 * 2, at: 0.18, dur: 0.2, type: "sine", gain: 0.25 },
    ]);
  },
  /** A wrong answer: short and low, not harsh. */
  wrong() {
    play([
      { freq: 220, dur: 0.22, type: "sawtooth", gain: 0.5, to: 150 },
      { freq: 164, at: 0.16, dur: 0.3, type: "triangle", gain: 0.7, to: 120 },
    ], 0.14);
  },
  /** A quiz or exercise passed. */
  success() {
    play([
      { freq: C5, dur: 0.18 },
      { freq: E5, at: 0.12, dur: 0.18 },
      { freq: G5, at: 0.24, dur: 0.18 },
      { freq: C6, at: 0.36, dur: 0.55 },
      { freq: E6, at: 0.36, dur: 0.55, gain: 0.45 },
      { freq: G6, at: 0.5, dur: 0.5, gain: 0.3 },
    ], 0.17);
  },
  /** A quiz or exercise failed: gentle, so it does not discourage. */
  fail() {
    play([
      { freq: 392, dur: 0.28, type: "triangle" },
      { freq: 311, at: 0.2, dur: 0.5, type: "triangle", to: 262 },
    ], 0.15);
  },
  /** A step of the writing practice completed. */
  complete() {
    play([
      { freq: E6, dur: 0.14 },
      { freq: G6, at: 0.11, dur: 0.3 },
    ], 0.14);
  },
  /** The microphone starts listening. */
  recordStart() {
    play([{ freq: 520, dur: 0.14, type: "sine", to: 880 }], 0.14);
  },
  /** The microphone stops. */
  recordStop() {
    play([{ freq: 880, dur: 0.14, type: "sine", to: 520 }], 0.14);
  },
};
