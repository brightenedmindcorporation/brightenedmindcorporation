import type { QuizQuestion } from "../curriculum/types";

/** A short conversation between two people, heard (not read) in a quiz. */
export interface Dialogue {
  /**
   * `speaker` is the position in the conversation (A speaks first); `voice` is who reads the line aloud. They are the
   * same, except in the conversations where the names require swapping the voices (a man's name read by the
   * man's voice, a woman's by the woman's).
   */
  lines: { speaker: "A" | "B"; voice: "A" | "B"; text: string }[];
  /** Comprehension questions about what was said. */
  questions: QuizQuestion[];
}

/**
 * Authoring format, to keep 200+ dialogues short to write:
 *  - lines alternate speaker A, B, A, B…
 *  - each question is [question, correct answer, wrong, wrong]; the order of
 *    the options is shuffled when the dialogue is built.
 */
export interface RawDialogue {
  /** Swap the two voices (A is read by the second voice, B by the first): when A has a man's name and B a woman's. */
  swap?: boolean;
  lines: string[];
  q: string[][];
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function shuffle<T>(items: T[], seed: number): T[] {
  let t = seed >>> 0;
  const rnd = () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const k = Math.floor(rnd() * (i + 1));
    [out[i], out[k]] = [out[k], out[i]];
  }
  return out;
}

export function buildDialogues(raw: Record<string, RawDialogue>): Record<string, Dialogue> {
  const out: Record<string, Dialogue> = {};
  for (const [key, d] of Object.entries(raw)) {
    out[key] = {
      lines: d.lines.map((text, i) => {
        const speaker = i % 2 === 0 ? "A" : "B";
        return { speaker, voice: d.swap ? (speaker === "A" ? "B" : "A") : speaker, text } as Dialogue["lines"][number];
      }),
      questions: d.q.map(([question, answer, ...wrong]) => ({
        question,
        answer,
        options: shuffle([answer, ...wrong], hash(`${key}|${question}`)),
      })),
    };
  }
  return out;
}
