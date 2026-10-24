import type { LevelCurriculum } from "../types";
import { lessonsA2, quizzesA2 } from "./level2-a";
import { lessonsB2, quizzesB2, final2 } from "./level2-b";

/** Bureautique · Niveau 2 — Intermédiaire. */
export const bureautiqueLevel2: LevelCurriculum = {
  langCode: "BUREAUTIQUE",
  langLabel: "Bureautique",
  langSlug: "bureautique",
  level: 2,
  levelTitle: "Niveau 2 - Bureautique intermédiaire",
  levelSubtitle: "Travailler plus vite et plus proprement : styles, publipostage, fonctions Excel et tableaux croisés.",
  lessons: [...lessonsA2, ...lessonsB2],
  quizzes: [...quizzesA2, ...quizzesB2],
  finalQuiz: final2,
};
