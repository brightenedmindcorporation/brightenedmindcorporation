import type { LevelCurriculum } from "../types";
import { withVideos } from "./videos";
import { lessonsA, quizzesA } from "./level1-a";
import { lessonsB, quizzesB, final1 } from "./level1-b";

/** Bureautique · Niveau 1 — Initiation (Windows, Word, Excel, PowerPoint). */
export const bureautiqueLevel1: LevelCurriculum = {
  langCode: "BUREAUTIQUE",
  langLabel: "Bureautique",
  langSlug: "bureautique",
  level: 1,
  levelTitle: "Niveau 1 - Initiation à la bureautique",
  levelSubtitle: "Windows, Word, Excel et PowerPoint : les bases pour travailler avec un ordinateur.",
  lessons: withVideos(1, [...lessonsA, ...lessonsB]),
  quizzes: [...quizzesA, ...quizzesB],
  finalQuiz: final1,
};
