/**
 * The mark of a quiz, out of 100, made of every part the student did:
 *   écoute (the heard conversation) 25 · questions 30 · lecture à voix haute (microphone) 20 · écrit (corrected by a teacher,
 *   mark out of 10) 25.
 * A quiz without one of these parts shares its points between the parts it has.
 * Until the teacher has corrected the written part, the mark is provisional (computed on the other parts).
 * Only the first attempt is recorded; later attempts are practice.
 */
export const PART_WEIGHTS = { listen: 25, quiz: 30, read: 20, write: 25 } as const;

/** What the student did on the first attempt (saved with the progress). */
export interface QuizPartsRecord {
  /** Heard-conversation questions: [right, total]; absent when the quiz has none. */
  listen?: [number, number];
  /** Main questions: [right, total]. */
  quiz: [number, number];
  /** Reading aloud with the microphone: [points out of 100, 100]; absent when the quiz has none. */
  read?: [number, number];
  /** True when the quiz had a written part (its mark comes from the teacher). */
  write?: boolean;
}

export interface PartLine {
  key: "listen" | "quiz" | "read" | "write";
  label: string;
  /** Points earned out of `max` (null = not marked yet). */
  got: number | null;
  max: number;
  /** Raw detail, e.g. "4/5" or "7/10". */
  detail: string;
}

export interface QuizMark {
  /** Out of 100, null when nothing exists to compute from. */
  percent: number | null;
  /** The written part is not corrected yet, so the mark can still rise. */
  provisional: boolean;
  /** Saved before the marks were split by part: only the questions are known. */
  legacy: boolean;
  /** Set by the administration. */
  byAdmin: boolean;
  lines: PartLine[];
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function computeQuizMark(opts: {
  parts?: QuizPartsRecord | null;
  /** The raw score of the questions (used when the record has no parts: old format). */
  rawScore: number | null;
  rawTotal: number;
  /** Teacher's mark out of 10 for the written part, when corrected. */
  writeMark?: number | null;
  /** The administration's own mark out of 100. */
  adminPercent?: number | null;
}): QuizMark {
  const { parts, rawScore, rawTotal, writeMark, adminPercent } = opts;
  if (rawScore === null && typeof adminPercent !== "number") return { percent: null, provisional: false, legacy: false, byAdmin: false, lines: [] };

  const hasMark = typeof writeMark === "number";
  // Old records: no parts saved. The questions are known; a written part is known only if it was corrected.
  const legacy = !parts;
  const quiz: [number, number] = parts?.quiz ?? [rawScore ?? 0, rawTotal];
  const listen = parts?.listen;
  const read = parts?.read;
  const write = parts ? Boolean(parts.write) : hasMark;

  const present = [listen ? "listen" : null, "quiz", read ? "read" : null, write ? "write" : null].filter(Boolean) as ("listen" | "quiz" | "read" | "write")[];
  const totalWeight = present.reduce((sum, k) => sum + PART_WEIGHTS[k], 0);
  const scale = 100 / totalWeight;
  const ratio = (pair: [number, number]) => (pair[1] > 0 ? pair[0] / pair[1] : 0);

  const lines: PartLine[] = [];
  if (listen) lines.push({ key: "listen", label: "Écoute", max: round1(PART_WEIGHTS.listen * scale), got: round1(ratio(listen) * PART_WEIGHTS.listen * scale), detail: `${listen[0]}/${listen[1]}` });
  lines.push({ key: "quiz", label: "Questions", max: round1(PART_WEIGHTS.quiz * scale), got: round1(ratio(quiz) * PART_WEIGHTS.quiz * scale), detail: `${quiz[0]}/${quiz[1]}` });
  if (read) lines.push({ key: "read", label: "Lecture", max: round1(PART_WEIGHTS.read * scale), got: round1(ratio(read) * PART_WEIGHTS.read * scale), detail: `${read[0]}/${read[1]}` });
  if (write) lines.push({ key: "write", label: "Écrit", max: round1(PART_WEIGHTS.write * scale), got: hasMark ? round1((writeMark! / 10) * PART_WEIGHTS.write * scale) : null, detail: hasMark ? `${writeMark}/10` : "à corriger" });

  const provisional = write && !hasMark;
  const marked = lines.filter((l) => l.got !== null);
  const earned = marked.reduce((sum, l) => sum + (l.got as number), 0);
  const possible = marked.reduce((sum, l) => sum + l.max, 0);
  const computed = possible > 0 ? Math.round((earned / possible) * 100) : null;

  if (typeof adminPercent === "number") return { percent: Math.round(adminPercent), provisional: false, legacy: false, byAdmin: true, lines };
  return { percent: computed, provisional, legacy, byAdmin: false, lines };
}
