/**
 * Practice sentences for the writing exercises, per language. Key: "<level>-<lessonId>". Each lesson has its own
 * seven sentences on its topic, different from the lesson text:
 *   0-1  dictation (the student listens and writes; each one has a recorded clip),
 *   2-4  fill in the blank,
 *   5-6  put the words in order.
 */
export type ExerciseSentences = Record<string, string[]>;
