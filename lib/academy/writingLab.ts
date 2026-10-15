import { extractSpeechText } from "./audioClips";
import type { Lesson } from "@/content/curriculum/types";

// Writing practice generated from the lesson itself, so every lesson of every
// language gets exercises without hand-writing hundreds of them: the reading
// text feeds the dictation, the fill-in-the-blank and the word-order tasks,
// and the lesson's vocabulary feeds the guided free-writing task.
//
// Pure functions only (no DOM), so the logic is easy to reason about.

const CJK = /[㐀-鿿]/;
export const isCjkText = (s: string) => CJK.test(s);

const LETTER_OR_DIGIT = /[\p{L}\p{N}]/u;

/** Removes accents/diacritics so "cafe" and "café" can be told apart from a real mistake. */
export function foldAccents(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

export interface Word {
  /** Shown to the student (punctuation stripped). */
  raw: string;
  /** Compared (lower-cased). */
  key: string;
}

/** Words of a text; for Chinese every character is a token. */
export function wordsOf(text: string, cjk: boolean): Word[] {
  if (cjk) {
    return Array.from(text)
      .filter((c) => LETTER_OR_DIGIT.test(c))
      .map((c) => ({ raw: c, key: c }));
  }
  return text
    .replace(/[’‘`´]/g, "'")
    .split(/\s+/)
    .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter(Boolean)
    .map((w) => ({ raw: w, key: w.toLowerCase() }));
}

export type DiffKind = "ok" | "accent" | "missing" | "extra";
export interface DiffOp {
  kind: DiffKind;
  expected?: string;
  typed?: string;
}

/**
 * Word-by-word comparison of what the student typed with the expected text
 * (longest common subsequence, so one forgotten word doesn't turn the rest
 * of the sentence red). A word that only differs by its accents is reported
 * separately — it is a spelling error, but a different kind of one.
 * Capital letters and punctuation are not judged here.
 */
export function diffAnswer(expected: string, typed: string, cjk: boolean): { ops: DiffOp[]; score: number } {
  const a = wordsOf(expected, cjk);
  const b = wordsOf(typed, cjk);
  const fa = a.map((w) => foldAccents(w.key));
  const fb = b.map((w) => foldAccents(w.key));

  const lcs: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = fa[i] === fb[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const ops: DiffOp[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (fa[i] === fb[j]) {
      ops.push({ kind: a[i].key === b[j].key ? "ok" : "accent", expected: a[i].raw, typed: b[j].raw });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      ops.push({ kind: "missing", expected: a[i].raw });
      i++;
    } else {
      ops.push({ kind: "extra", typed: b[j].raw });
      j++;
    }
  }
  while (i < a.length) ops.push({ kind: "missing", expected: a[i++].raw });
  while (j < b.length) ops.push({ kind: "extra", typed: b[j++].raw });

  const good = ops.filter((o) => o.kind === "ok").length + ops.filter((o) => o.kind === "accent").length * 0.5;
  return { ops, score: a.length ? good / a.length : 0 };
}

// ---- Material taken from the lesson -----------------------------------------

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function shuffled<T>(items: T[], seed: number): T[] {
  const rnd = mulberry32(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const k = Math.floor(rnd() * (i + 1));
    [out[i], out[k]] = [out[k], out[i]];
  }
  return out;
}

/** Picks up to `n` items spread across the list (first, middle, last…). */
function spread<T>(items: T[], n: number): T[] {
  if (items.length <= n) return items;
  const out: T[] = [];
  for (let k = 0; k < n; k++) out.push(items[Math.round((k * (items.length - 1)) / (n - 1 || 1))]);
  return Array.from(new Set(out));
}

function splitSentences(line: string): string[] {
  return line
    .split(/(?<=[.!?。！？…])\s*/u)
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface DictationItem {
  /** Exactly the text of a recorded clip, so the voice is the good one. */
  text: string;
}

export interface ClozeItem {
  before: string;
  after: string;
  answer: string;
  full: string;
}

export interface OrderItem {
  full: string;
  tiles: { id: number; text: string }[];
  /** Tile ids in the right order. */
  solution: number[];
}

export interface WritingTask {
  cjk: boolean;
  dictation: DictationItem[];
  cloze: ClozeItem[];
  order: OrderItem[];
  prompt: string;
  starters: string[];
  keyWords: string[];
  /** Minimum length of the free text: words, or characters for Chinese. */
  goal: number;
  model: string[];
  /** Tap-to-type characters (Chinese only). */
  chars: string[];
}

function buildCloze(sentence: string, cjk: boolean): ClozeItem | null {
  if (cjk) {
    const chars = Array.from(sentence);
    const letters = chars.map((c, i) => (CJK.test(c) ? i : -1)).filter((i) => i >= 0);
    if (letters.length < 4) return null;
    const startIdx = letters[Math.floor(letters.length / 2) - 1];
    const take = letters.length >= 7 ? 2 : 1;
    const answerChars = chars.slice(startIdx, startIdx + take);
    if (!answerChars.every((c) => CJK.test(c))) return null;
    return {
      before: chars.slice(0, startIdx).join(""),
      after: chars.slice(startIdx + take).join(""),
      answer: answerChars.join(""),
      full: sentence,
    };
  }
  const parts = sentence.split(/\s+/);
  let best = -1;
  let bestLen = 0;
  parts.forEach((p, idx) => {
    const core = p.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
    // Skip the first word (capitalised, gives the game away) when possible.
    if (core.length > bestLen && core.length >= 3 && !/\d/.test(core) && !(idx === 0 && parts.length > 3)) {
      best = idx;
      bestLen = core.length;
    }
  });
  if (best < 0) return null;
  const word = parts[best];
  const core = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  const start = word.indexOf(core);
  const lead = word.slice(0, start);
  const trail = word.slice(start + core.length);
  const before = parts.slice(0, best).join(" ") + (best > 0 ? " " : "") + lead;
  const after = trail + (best < parts.length - 1 ? " " : "") + parts.slice(best + 1).join(" ");
  return { before, after, answer: core, full: sentence };
}

function buildOrder(sentence: string, cjk: boolean): OrderItem | null {
  const tokens = cjk
    ? Array.from(sentence).filter((c) => LETTER_OR_DIGIT.test(c))
    : sentence.split(/\s+/).filter(Boolean);
  if (tokens.length < (cjk ? 5 : 4)) return null;
  const tiles = tokens.map((text, id) => ({ id, text }));
  let order = shuffled(tiles, hashString(sentence));
  // Never hand the sentence over already in the right order.
  if (order.every((t, i) => t.id === i)) order = [...order].reverse();
  return { full: sentence, tiles: order, solution: tiles.map((t) => t.id) };
}

/** Vocabulary of the lesson worth reusing in the free text. */
function pickKeyWords(lesson: Lesson, cjk: boolean): string[] {
  const found: string[] = [];
  const add = (w: string) => {
    if (w && !found.includes(w)) found.push(w);
  };
  const lines = [...lesson.sections.flatMap((s) => s.body), ...lesson.reading];

  if (cjk) {
    for (const line of lines) for (const run of line.match(/[㐀-鿿]{2,6}/g) ?? []) add(run);
    return found.slice(0, 6);
  }
  const fromSections = lesson.sections.flatMap((s) => s.body).map(extractSpeechText);
  for (const text of [...fromSections, ...lesson.reading.map(extractSpeechText)]) {
    for (const w of wordsOf(text, false)) if (w.key.length >= 5 && !/\d/.test(w.key)) add(w.key);
    if (found.length >= 12) break;
  }
  // The longest words of the lesson are the most content-bearing ones.
  return found
    .slice(0, 12)
    .sort((x, y) => y.length - x.length)
    .slice(0, 6);
}

/** Every Chinese character used in a lesson (plus basic punctuation), in order of appearance. */
export function lessonChars(lesson: Lesson): string[] {
  const text = [
    lesson.title,
    lesson.subtitle,
    lesson.readingTitle,
    lesson.speakingTopic,
    ...lesson.sections.flatMap((s) => [s.heading, ...s.body]),
    ...lesson.reading,
    ...lesson.exercises,
  ].join("");
  const seen = new Set<string>();
  for (const c of Array.from(text)) if (CJK.test(c)) seen.add(c);
  return [...Array.from(seen), "，", "。", "？", "！"];
}

export function buildWritingTask(langSlug: string, lesson: Lesson): WritingTask {
  const readingLines = lesson.reading.map(extractSpeechText).filter(Boolean);
  const cjk = langSlug === "chinese" || readingLines.some(isCjkText);

  const size = (s: string) => wordsOf(s, cjk).length;

  // Long numbers and e-mail addresses make poor dictation: use them only if nothing else fits.
  const dictable = readingLines.filter((l) => (cjk ? size(l) >= 4 && size(l) <= 45 : size(l) >= 3 && size(l) <= 25));
  const clean = dictable.filter((l) => !/\d{4,}|@/.test(l));
  const dictation = spread(clean.length ? clean : dictable, 2).map((text) => ({ text }));

  const sentences = Array.from(new Set(readingLines.flatMap(splitSentences))).filter((s) =>
    cjk ? size(s) >= 5 && size(s) <= 30 : size(s) >= 4 && size(s) <= 16
  );

  const cloze = spread(sentences, 3)
    .map((s) => buildCloze(s, cjk))
    .filter((c): c is ClozeItem => c !== null);

  const orderPool = sentences.filter((s) => (cjk ? size(s) >= 6 && size(s) <= 16 : size(s) >= 5 && size(s) <= 12));
  const order = spread(orderPool.length ? orderPool : sentences, 2)
    .map((s) => buildOrder(s, cjk))
    .filter((o): o is OrderItem => o !== null);

  return {
    cjk,
    dictation,
    cloze,
    order,
    prompt: lesson.speakingTopic,
    starters: lesson.exercises,
    keyWords: pickKeyWords(lesson, cjk),
    goal: cjk ? 30 : 25,
    model: readingLines,
    chars: cjk ? lessonChars(lesson) : [],
  };
}

/** Length of the free text, in words (characters for Chinese). */
export function textLength(text: string, cjk: boolean): number {
  return wordsOf(text, cjk).length;
}

/** Which of the lesson's words the student has used (accent-insensitive). */
export function usedKeyWords(text: string, keyWords: string[]): string[] {
  const haystack = foldAccents(text.toLowerCase());
  return keyWords.filter((w) => haystack.includes(foldAccents(w.toLowerCase())));
}
