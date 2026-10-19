import { getLevelCurriculum } from "@/content/curriculum";

/**
 * Level placement test (no server or browser APIs: used on both sides). For students who do not know
 * which level to start at: questions taken from the three levels' own quizzes, a short written
 * presentation for a teacher to read, and an automatic suggestion that the administration or a teacher
 * confirms or changes.
 */

export const QUESTIONS_PER_LEVEL = 8;
export const WRITING_MIN = { words: 15, chars: 18 };

export interface PlacementQuestion {
  /** Stable id: "<level>-<lesson>-<question index>". */
  id: string;
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

function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], seed: number): T[] {
  const rnd = rng(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const k = Math.floor(rnd() * (i + 1));
    [out[i], out[k]] = [out[k], out[i]];
  }
  return out;
}

/**
 * The student's test: the same questions each time for the same student and language (so the server can
 * grade what the page showed), different from one student to another.
 */
export function buildPlacementTest(langSlug: string, uid: string): PlacementQuestion[] {
  const out: PlacementQuestion[] = [];
  for (const level of [1, 2, 3]) {
    const curriculum = getLevelCurriculum(langSlug, level);
    if (!curriculum) continue;
    const quizzes = curriculum.quizzes.filter((q) => q.questions.length > 0);
    if (quizzes.length === 0) continue;
    // One question from each of the lessons, spread over the whole level, easier lessons first.
    const rnd = rng(hash(`${uid}|${langSlug}|${level}`));
    const picked: PlacementQuestion[] = [];
    const step = quizzes.length / QUESTIONS_PER_LEVEL;
    for (let k = 0; k < QUESTIONS_PER_LEVEL; k++) {
      const quiz = quizzes[Math.min(quizzes.length - 1, Math.floor(k * step))];
      const qi = Math.floor(rnd() * quiz.questions.length);
      const q = quiz.questions[qi];
      picked.push({
        id: `${level}-${quiz.lessonId}-${qi}`,
        level,
        question: q.question,
        answer: q.answer,
        options: shuffle(q.options, hash(`${uid}|${level}|${quiz.lessonId}|${qi}`)),
      });
    }
    // No question twice (a lesson can be hit twice when it has few lessons).
    const seen = new Set<string>();
    for (const q of picked) if (!seen.has(q.id)) (seen.add(q.id), out.push(q));
  }
  return out;
}

export interface PlacementScores {
  byLevel: Record<number, { score: number; total: number }>;
  suggestedLevel: number;
}

/** Scores the answers (question id → chosen option) and suggests a starting level. */
export function gradePlacement(questions: PlacementQuestion[], answers: Record<string, string>): PlacementScores {
  const byLevel: Record<number, { score: number; total: number }> = {};
  for (const q of questions) {
    const entry = (byLevel[q.level] ||= { score: 0, total: 0 });
    entry.total++;
    if (answers[q.id] === q.answer) entry.score++;
  }
  const pct = (l: number) => (byLevel[l]?.total ? byLevel[l].score / byLevel[l].total : 0);
  let suggestedLevel = 1;
  if (pct(1) >= 0.7 && pct(2) >= 0.6 && byLevel[2]) suggestedLevel = 2;
  if (suggestedLevel === 2 && pct(2) >= 0.7 && pct(3) >= 0.6 && byLevel[3] && pct(1) >= 0.8) suggestedLevel = 3;
  return { byLevel, suggestedLevel };
}

export function levelTitle(n: number) {
  return `Level ${n}`;
}
