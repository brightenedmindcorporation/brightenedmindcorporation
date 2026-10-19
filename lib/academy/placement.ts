import { getPlacementContent, type PlacementContent, type Q } from "@/content/placement";

/**
 * Level placement test (no server or browser APIs: used on both sides). For students who do not know
 * which level to start at. Five parts: vocabulary and grammar questions of the three levels, a text with
 * questions, a conversation to listen to with questions, a passage to read aloud into the microphone,
 * and a short written presentation. Everything is written for the test (nothing comes from the lessons
 * the student has not studied yet). The automatic scores only SUGGEST a level: the administration decides.
 */

export const WRITING_MIN = { words: 15, chars: 18 };

export type Section = "level" | "reading" | "listening";

export interface PlacementQuestion {
  /** Stable id: "L1-0" (level 1, question 0), "R-2" (reading), "H-1" (listening). */
  id: string;
  section: Section;
  /** 1-3 for the level questions, 0 for the reading and listening ones. */
  level: number;
  question: string;
  options: string[];
  answer: string;
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

function make(id: string, section: Section, level: number, q: Q, uid: string): PlacementQuestion {
  const [question, answer, ...wrong] = q;
  return { id, section, level, question, answer, options: shuffle([answer, ...wrong], hash(`${uid}|${id}`)) };
}

/** The student's test: the same questions each time for the same student (so the server can grade what the page showed). */
export function buildPlacementTest(langSlug: string, uid: string): { content: PlacementContent; questions: PlacementQuestion[] } | null {
  const content = getPlacementContent(langSlug);
  if (!content) return null;
  const questions: PlacementQuestion[] = [];
  for (const level of [1, 2, 3] as const) content.levels[level].forEach((q, i) => questions.push(make(`L${level}-${i}`, "level", level, q, uid)));
  content.reading.q.forEach((q, i) => questions.push(make(`R-${i}`, "reading", 0, q, uid)));
  content.listening.q.forEach((q, i) => questions.push(make(`H-${i}`, "listening", 0, q, uid)));
  return { content, questions };
}

export interface PlacementScores {
  byLevel: Record<number, { score: number; total: number }>;
  reading: { score: number; total: number };
  listening: { score: number; total: number };
  suggestedLevel: number;
}

/** Scores the answers (question id → chosen option) and suggests a starting level. */
export function gradePlacement(questions: PlacementQuestion[], answers: Record<string, string>): PlacementScores {
  const byLevel: Record<number, { score: number; total: number }> = {};
  const reading = { score: 0, total: 0 };
  const listening = { score: 0, total: 0 };
  for (const q of questions) {
    const ok = answers[q.id] === q.answer ? 1 : 0;
    const target = q.section === "reading" ? reading : q.section === "listening" ? listening : (byLevel[q.level] ||= { score: 0, total: 0 });
    target.total++;
    target.score += ok;
  }
  const pct = (l: number) => (byLevel[l]?.total ? byLevel[l].score / byLevel[l].total : 0);
  let suggestedLevel = 1;
  if (pct(1) >= 0.7 && pct(2) >= 0.6 && byLevel[2]) suggestedLevel = 2;
  if (suggestedLevel === 2 && pct(2) >= 0.7 && pct(3) >= 0.6 && byLevel[3] && pct(1) >= 0.8) suggestedLevel = 3;
  // Weak understanding of a text and of a conversation: one level lower is safer.
  const compTotal = reading.total + listening.total;
  if (compTotal > 0 && (reading.score + listening.score) / compTotal < 0.5) suggestedLevel = Math.max(1, suggestedLevel - 1);
  return { byLevel, reading, listening, suggestedLevel };
}
