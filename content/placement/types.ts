/** [question, correct answer, wrong answer, wrong answer, …] */
export type Q = string[];

/**
 * Placement test content of one language. Written for the test itself: nothing here comes from the
 * lessons or quizzes of the levels, since the student has not studied them yet.
 */
export interface PlacementContent {
  /** Vocabulary and grammar questions by level (6 each). */
  levels: Record<1 | 2 | 3, Q[]>;
  /** A text of two paragraphs, with questions about it. */
  reading: { title: string; paragraphs: [string, string]; q: Q[] };
  /** Two or three sentences the student reads aloud into the microphone. */
  readAloud: string;
  /** A short conversation (lines alternate speaker A, B, A, B…), played as audio, with questions. */
  listening: { lines: string[]; q: Q[] };
}
