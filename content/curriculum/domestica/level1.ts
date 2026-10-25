import type { LevelCurriculum } from "../types";
import { withMedia } from "../withMedia";
import { DOMESTICA_VIDEOS } from "./media";
import { lessonsA, quizzesA } from "./level1-a";
import { lessonsB, quizzesB, final1 } from "./level1-b";

/** BM Domestica · Formation du personnel domestique (un seul niveau). */
export const domesticaLevel1: LevelCurriculum = {
  langCode: "DOMESTICA",
  langLabel: "Formation BM Domestica",
  langSlug: "domestica",
  level: 1,
  levelTitle: "Niveau 1 - Formation du personnel domestique",
  levelSubtitle: "Le métier, l'hygiène, l'entretien, le linge, la cuisine, la garde d'enfants, les premiers secours, la sécurité et vos droits.",
  lessons: withMedia("dm", DOMESTICA_VIDEOS, 1, [...lessonsA, ...lessonsB]),
  quizzes: [...quizzesA, ...quizzesB],
  finalQuiz: final1,
};
