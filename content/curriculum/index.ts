import type { LevelCurriculum } from "./types";
import { englishLevel1 } from "./english/level1";
import { englishLevel2 } from "./english/level2";
import { englishLevel3 } from "./english/level3";
import { frenchLevel1 } from "./french/level1";

// Add new entries here as more languages/levels are authored (Phase 4).
// Each entry's key is `${langSlug}-${level}`.
const registry: Record<string, LevelCurriculum> = {
  "english-1": englishLevel1,
  "english-2": englishLevel2,
  "english-3": englishLevel3,
  "french-1": frenchLevel1,
};

export const availableLanguages = [
  { slug: "english", label: "Anglais", code: "EN" },
  { slug: "french", label: "Français", code: "FR" },
  { slug: "swahili", label: "Swahili", code: "SW" },
  { slug: "spanish", label: "Espagnol", code: "ES" },
  { slug: "portuguese", label: "Portugais", code: "PT" },
  { slug: "chinese", label: "Chinois", code: "ZH" },
];

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
