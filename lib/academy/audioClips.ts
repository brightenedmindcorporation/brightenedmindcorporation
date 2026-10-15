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

/** Bump when clips are re-recorded under the same name: it changes every
 * clip URL, so browsers and CDNs drop the old (wrongly voiced) copies. */
export const AUDIO_VERSION = 2;

const CJK = /[\u3400-\u9fff]/;

/** Lesson lines are written "phrase (phonetics) - translation"; only the
 * phrase before the first parenthesis is spoken.
 *
 * Chinese lessons also have explanation lines where the characters sit
 * INSIDE the parentheses ("1er ton (plat, haut) : mā (妈) - maman"): there
 * the characters are what must be heard, not the French around them. */
export function extractSpeechText(line: string): string {
  const parenIndex = line.indexOf("(");
  const head = parenIndex > 0 ? line.slice(0, parenIndex).trim() : line;
  if (!CJK.test(head) && CJK.test(line)) {
    const runs = line.match(/[\u3400-\u9fff]+/g);
    if (runs) return runs.join("，");
  }
  return head;
}

/** Conversation lines are voiced by two people. Speaker A shares the
 * language's usual voice (and clips); speaker B's clips are keyed with a
 * marker so they get the second voice. */
export function dialogueClipText(speaker: "A" | "B", text: string): string {
  return speaker === "B" ? `[B] ${text.trim()}` : text.trim();
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
  return `${AUDIO_BASE_URL}/${langSlug}/${clipId(langSlug, text)}.mp3?v=${AUDIO_VERSION}`;
}

/** The parts of a lesson the narration is built from. */
export interface NarrationSource {
  speakText: string;
  readingSpeakText: string;
  sections: { body: string[] }[];
  reading: string[];
}

const PAUSE = "\n\n";

/**
 * Full-length narration for the "Listen Lesson" and "Listen Reading"
 * players. The hand-written speakText/readingSpeakText were sometimes just a
 * title and a first sentence, so the reading narration is rebuilt from the
 * text actually shown on the page whenever that is clearly longer; the
 * lesson narration does the same, except for Chinese, whose on-page body is
 * French explanation (only the curated Chinese speakText should be read).
 */
export function lessonNarrations(langSlug: string, lesson: NarrationSource): { lesson: string; reading: string } {
  const joinedReading = lesson.reading.map(extractSpeechText).filter(Boolean).join(PAUSE);
  const reading =
    lesson.readingSpeakText.trim().length >= joinedReading.length * 0.8 ? lesson.readingSpeakText.trim() : joinedReading;

  const joinedBody = lesson.sections
    .flatMap((s) => s.body.map(extractSpeechText))
    .filter(Boolean)
    .join(PAUSE);
  const useCurated = langSlug === "chinese" || lesson.speakText.trim().length >= joinedBody.length * 0.6;
  return { lesson: (useCurated ? lesson.speakText : joinedBody).trim(), reading };
}

// ---- Verb reference audio -------------------------------------------------

const cleanForms = (s: string) =>
  s
    .replace(/\([^)]*\)/g, "")
    .replace(/\s*\/\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim();

/** "go" + "went, gone" → "go. went, gone" */
export function irregularVerbSpeech(v: { base: string; forms: string }): string {
  return `${v.base}. ${cleanForms(v.forms)}`;
}

/** The verb, then its conjugated form ("walk. walked", "kusoma. anasoma"). */
export function regularVerbSpeech(v: { base: string; stem?: string; suffix?: string; prefix?: string }): string {
  const conjugated = v.prefix ? v.prefix + (v.stem ?? "") : (v.stem ?? v.base) + (v.suffix ?? "");
  return conjugated && conjugated !== v.base ? `${v.base}. ${conjugated}` : v.base;
}

/** Example sentence (any phonetics/translation in parentheses is dropped). */
export function verbExampleSpeech(example: string): string {
  return extractSpeechText(example);
}

/** Structural view of a verb reference (standard languages or Chinese). */
export interface VerbSource {
  kind: "standard" | "particles";
  irregular?: { base: string; forms: string; example: string }[];
  regular?: { base: string; stem?: string; suffix?: string; prefix?: string; example: string }[];
  particles?: { example: string }[];
  verbs?: { hanzi: string; example: string }[];
}

/** Every phrase the verb reference page can speak. */
export function verbPhrases(ref: VerbSource): string[] {
  const set = new Set<string>();
  const add = (t?: string) => {
    const text = (t || "").trim();
    if (text) set.add(text);
  };
  for (const v of ref.irregular ?? []) {
    add(irregularVerbSpeech(v));
    add(verbExampleSpeech(v.example));
  }
  for (const v of ref.regular ?? []) {
    add(regularVerbSpeech(v));
    add(verbExampleSpeech(v.example));
  }
  for (const p of ref.particles ?? []) add(verbExampleSpeech(p.example));
  for (const v of ref.verbs ?? []) {
    add(v.hanzi);
    add(verbExampleSpeech(v.example));
  }
  return Array.from(set);
}
