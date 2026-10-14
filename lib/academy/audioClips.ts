// Pre-recorded lesson audio. Every phrase a student can "listen" to has an
// mp3 clip hosted on Cloudinary under a deterministic name derived from the
// language and the exact text, so the player needs no lookup table: it
// computes the name, plays the clip, and falls back to the browser's
// speech synthesis if a clip is missing.
//
// This file is shared with the generation scripts (scripts/audio/*.mjs), so
// it must stay dependency-free plain TypeScript.

/** Folder on Cloudinary: <base>/<langSlug>/<clipId>.mp3 */
export const AUDIO_BASE_URL = "https://res.cloudinary.com/je49b88w/video/upload/bm-audio";

/** Lesson lines are written "phrase (phonetics) - translation"; only the
 * phrase before the first parenthesis is spoken. */
export function extractSpeechText(line: string): string {
  const parenIndex = line.indexOf("(");
  if (parenIndex > 0) return line.slice(0, parenIndex).trim();
  return line;
}

/** Fast, deterministic 2×32-bit string hash (cyrb53 variants) → 22 hex
 * chars. Identical in Node and the browser; collisions are not a concern
 * at a few thousand clips. */
function cyrb53(str: string, seed: number): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function clipId(langSlug: string, text: string): string {
  const key = `${langSlug}|${text.trim()}`;
  const a = cyrb53(key, 0).toString(16).padStart(14, "0");
  const b = cyrb53(key, 1).toString(16).padStart(14, "0");
  return (a + b).slice(0, 22);
}

export function clipUrl(langSlug: string, text: string): string {
  return `${AUDIO_BASE_URL}/${langSlug}/${clipId(langSlug, text)}.mp3`;
}
