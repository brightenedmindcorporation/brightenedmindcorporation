import type { LevelCurriculum } from "./types";
import { englishLevel1 } from "./english/level1";
import { englishLevel2 } from "./english/level2";
import { englishLevel3 } from "./english/level3";
import { frenchLevel1 } from "./french/level1";
import { frenchLevel2 } from "./french/level2";
import { frenchLevel3 } from "./french/level3";
import { swahiliLevel1 } from "./swahili/level1";
import { swahiliLevel2 } from "./swahili/level2";
import { swahiliLevel3 } from "./swahili/level3";
import { spanishLevel1 } from "./spanish/level1";
import { spanishLevel2 } from "./spanish/level2";
import { spanishLevel3 } from "./spanish/level3";
import { portugueseLevel1 } from "./portuguese/level1";
import { portugueseLevel2 } from "./portuguese/level2";
import { portugueseLevel3 } from "./portuguese/level3";
import { chineseLevel1 } from "./chinese/level1";
import { chineseLevel2 } from "./chinese/level2";
import { chineseLevel3 } from "./chinese/level3";
import { bureautiqueLevel1 } from "./bureautique/level1";
import { bureautiqueLevel2 } from "./bureautique/level2";
import { bureautiqueLevel3 } from "./bureautique/level3";

// Add new entries here as more languages/levels are authored (Phase 4).
// Each entry's key is `${langSlug}-${level}`.
const registry: Record<string, LevelCurriculum> = {
  "english-1": englishLevel1,
  "english-2": englishLevel2,
  "english-3": englishLevel3,
  "french-1": frenchLevel1,
  "french-2": frenchLevel2,
  "french-3": frenchLevel3,
  "swahili-1": swahiliLevel1,
  "swahili-2": swahiliLevel2,
  "swahili-3": swahiliLevel3,
  "spanish-1": spanishLevel1,
  "spanish-2": spanishLevel2,
  "spanish-3": spanishLevel3,
  "portuguese-1": portugueseLevel1,
  "portuguese-2": portugueseLevel2,
  "portuguese-3": portugueseLevel3,
  "chinese-1": chineseLevel1,
  "chinese-2": chineseLevel2,
  "chinese-3": chineseLevel3,
  "bureautique-1": bureautiqueLevel1,
  "bureautique-2": bureautiqueLevel2,
  "bureautique-3": bureautiqueLevel3,
};

export const availableLanguages = [
  { slug: "english", label: "Anglais", code: "EN" },
  { slug: "french", label: "Français", code: "FR" },
  { slug: "swahili", label: "Swahili", code: "SW" },
  { slug: "spanish", label: "Espagnol", code: "ES" },
  { slug: "portuguese", label: "Portugais", code: "PT" },
  { slug: "chinese", label: "Chinois", code: "ZH" },
];

/**
 * Bureautique (Windows, Word, Excel, PowerPoint) is taught with the same engine as the languages (levels, lessons,
 * quizzes, marks out of 100, certificate) but is not a language: no audio, dictation or reading aloud.
 */
export const officeProgram = { slug: "bureautique", label: "Bureautique", code: "BUREAUTIQUE" };

/** Everything that has lessons and quizzes: the languages and the office course. */
export const curriculumPrograms = [...availableLanguages, officeProgram];

export const isOfficeProgram = (slug?: string) => slug === officeProgram.slug;
export const findProgramByCode = (code?: string) => curriculumPrograms.find((p) => p.code === code);
export const findProgramBySlug = (slug?: string) => curriculumPrograms.find((p) => p.slug === slug);

export function getLevelCurriculum(langSlug: string, level: number): LevelCurriculum | null {
  return registry[`${langSlug}-${level}`] ?? null;
}

export function getLesson(langSlug: string, level: number, lessonId: number) {
  const curriculum = getLevelCurriculum(langSlug, level);
  return curriculum?.lessons.find((l) => l.id === lessonId) ?? null;
}

export function getQuiz(langSlug: string, level: number, lessonId: number) {
  const curriculum = getLevelCurriculum(langSlug, level);
  return curriculum?.quizzes.find((q) => q.lessonId === lessonId) ?? null;
}

export function isLevelAvailable(langSlug: string, level: number): boolean {
  return `${langSlug}-${level}` in registry;
}
