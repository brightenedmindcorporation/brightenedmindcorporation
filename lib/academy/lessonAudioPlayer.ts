"use client";

import { clipUrl, extractSpeechText, lessonNarrations } from "./audioClips";
import type { Lesson } from "@/content/curriculum/types";

// Plays the pre-recorded clips. Clips are kept in the browser's Cache
// Storage once fetched (or when the student taps "download for offline"),
// so they keep playing with no connection. If a clip is missing or can't be
// fetched (never cached and offline, not generated yet…) the caller's
// fallback — the device's own speech synthesis — takes over.

const CACHE_NAME = "bm-audio-v1";

function cacheSupported(): boolean {
  return typeof window !== "undefined" && "caches" in window;
}

// Only one thing speaks at a time: whoever starts claims playback and the
// previous player (phrase clip, narration player, device voice) is stopped.
let stopActive: (() => void) | null = null;

export function claimPlayback(stop: () => void) {
  const previous = stopActive;
  stopActive = stop;
  if (previous && previous !== stop) previous();
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

export function releasePlayback(stop: () => void) {
  if (stopActive === stop) stopActive = null;
}

export function stopClip() {
  const stop = stopActive;
  stopActive = null;
  stop?.();
}

/** The clip's audio as a Blob (from the cache if present, else the network,
 * then cached); null when it can't be had. */
export async function getClipBlob(url: string): Promise<Blob | null> {
  try {
    if (cacheSupported()) {
      const cache = await caches.open(CACHE_NAME);
      const hit = await cache.match(url);
      if (hit) return await hit.blob();
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) return null;
      await cache.put(url, response.clone());
      return await response.blob();
    }
    const response = await fetch(url, { mode: "cors" });
    return response.ok ? await response.blob() : null;
  } catch {
    return null;
  }
}

/** Plays the short clip for `text`; returns false (so the caller can fall
 * back to speech synthesis) when no clip could be played. */
export async function playClip(langSlug: string, text: string): Promise<boolean> {
  const blob = await getClipBlob(clipUrl(langSlug, text));
  if (!blob) return false;
  const objectUrl = URL.createObjectURL(blob);
  const audio = new Audio(objectUrl);
  const stop = () => {
    audio.pause();
    URL.revokeObjectURL(objectUrl);
    releasePlayback(stop);
  };
  claimPlayback(stop);
  audio.onended = stop;
  try {
    await audio.play();
    return true;
  } catch {
    stop();
    return false;
  }
}

/** Every distinct phrase a lesson can speak (full narrations + each line). */
export function lessonPhrases(langSlug: string, lesson: Lesson): string[] {
  const set = new Set<string>();
  const add = (t?: string) => {
    const text = (t || "").trim();
    if (text) set.add(text);
  };
  const narration = lessonNarrations(langSlug, lesson);
  add(narration.lesson);
  add(narration.reading);
  for (const section of lesson.sections) for (const line of section.body) add(extractSpeechText(line));
  for (const line of lesson.reading) add(extractSpeechText(line));
  return Array.from(set);
}

export async function isLessonCached(langSlug: string, phrases: string[]): Promise<boolean> {
  if (!cacheSupported()) return false;
  try {
    const cache = await caches.open(CACHE_NAME);
    for (const text of phrases) {
      if (!(await cache.match(clipUrl(langSlug, text)))) return false;
    }
    return phrases.length > 0;
  } catch {
    return false;
  }
}

/** Downloads every clip of a lesson into the cache for offline use. Returns
 * how many were stored; clips that don't exist online are simply skipped. */
export async function downloadLessonAudio(
  langSlug: string,
  phrases: string[],
  onProgress?: (done: number, total: number) => void
): Promise<number> {
  if (!cacheSupported()) return 0;
  const cache = await caches.open(CACHE_NAME);
  let stored = 0;
  let done = 0;
  const queue = [...phrases];
  const worker = async () => {
    while (queue.length) {
      const text = queue.shift()!;
      const url = clipUrl(langSlug, text);
      try {
        if (!(await cache.match(url))) {
          const response = await fetch(url, { mode: "cors" });
          if (response.ok) {
            await cache.put(url, response);
            stored++;
          }
        } else {
          stored++;
        }
      } catch {
        // offline or missing clip: skip
      }
      done++;
      onProgress?.(done, phrases.length);
    }
  };
  await Promise.all([worker(), worker(), worker()]);
  return stored;
}
