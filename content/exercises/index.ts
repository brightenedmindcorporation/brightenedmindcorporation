import type { ExerciseSentences } from "./types";
import english from "./english";
import french from "./french";
import spanish from "./spanish";
import portuguese from "./portuguese";
import swahili from "./swahili";
import chinese from "./chinese";

const ALL: Record<string, ExerciseSentences> = { english, french, spanish, portuguese, swahili, chinese };

/** The seven practice sentences of a lesson (see types.ts), or null when the lesson has none. */
export function getExerciseSentences(langSlug: string, level: number, lessonId: number): string[] | null {
  const list = ALL[langSlug]?.[`${level}-${lessonId}`];
  return list && list.length >= 7 ? list : null;
}
