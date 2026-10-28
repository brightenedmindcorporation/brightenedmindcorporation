"use client";

import { claimPlayback, playClip, releasePlayback, stopClip } from "./lessonAudioPlayer";

// Maps our URL language slugs to BCP-47 tags for the Web Speech API.
// Without this, every language's "Listen" buttons were reading the text
// aloud with an English voice.
export const SPEECH_LANG: Record<string, string> = {
  english: "en-US",
  french: "fr-FR",
  swahili: "sw-KE",
  spanish: "es-ES",
  portuguese: "pt-BR",
  chinese: "zh-CN",
};

let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    cachedVoices = window.speechSynthesis.getVoices();
  });
}

// Prefers a voice the device has installed locally (works without a network
// request) over a cloud-streamed one, when the browser exposes that choice.
function pickVoice(langTag: string): SpeechSynthesisVoice | undefined {
  // The list can still be empty when the page has just loaded: ask the browser again.
  if (!cachedVoices.length && typeof window !== "undefined" && "speechSynthesis" in window) cachedVoices = window.speechSynthesis.getVoices();
  const base = langTag.split("-")[0];
  const matches = cachedVoices.filter((v) => v.lang === langTag || v.lang.startsWith(base));
  return matches.find((v) => v.localService) ?? matches[0];
}

/** True when the device has a voice for the language (otherwise it would read the text with its default voice, often French). */
export function hasVoiceFor(langSlug: string): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  return Boolean(pickVoice(SPEECH_LANG[langSlug] ?? "en-US"));
}

/** The device's own voice — only the fallback when no recording is available. */
export function speakWithDeviceVoice(text: string, langSlug: string, opts: { pitch?: number; id?: string } = {}): Promise<void> {
  if (!("speechSynthesis" in window)) return Promise.resolve();
  // A button that can show Stop (it has an id) takes over playback; the others just cancel what was speaking.
  const stop = () => window.speechSynthesis.cancel();
  if (opts.id) claimPlayback(stop, opts.id);
  else window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  const langTag = SPEECH_LANG[langSlug] ?? "en-US";
  speech.lang = langTag;
  const voice = pickVoice(langTag);
  if (voice) speech.voice = voice;
  speech.rate = 0.9;
  speech.pitch = opts.pitch ?? 1;
  speech.volume = 1;
  // Resolves when the voice has finished, so a conversation can chain lines.
  return new Promise((resolve) => {
    const done = () => {
      if (opts.id) releasePlayback(stop);
      resolve();
    };
    speech.onend = done;
    speech.onerror = done;
    window.speechSynthesis.speak(speech);
  });
}

/** Recorded clip first (works offline once downloaded/played); the device's
 * voice only when no clip is available. */
export async function speakPhrase(text: string, langSlug: string, id?: string) {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  const played = await playClip(langSlug, text, id);
  if (!played) speakWithDeviceVoice(text, langSlug, { id });
}

export function stopSpeaking() {
  stopClip();
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}
