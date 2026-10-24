import type { LevelCurriculum } from "../types";
import { lessonsA3, quizzesA3 } from "./level3-a";
import { lessonsB3, quizzesB3, final3 } from "./level3-b";

/** Bureautique · Niveau 3 — Avancé / professionnel. */
export const bureautiqueLevel3: LevelCurriculum = {
  langCode: "BUREAUTIQUE",
  langLabel: "Bureautique",
  langSlug: "bureautique",
  level: 3,
  levelTitle: "Niveau 3 - Bureautique professionnelle",
  levelSubtitle: "Sécurité, collaboration, rapports, tableaux de bord et présentations de niveau professionnel.",
  lessons: [...lessonsA3, ...lessonsB3],
  quizzes: [...quizzesA3, ...quizzesB3],
  finalQuiz: final3,
};
