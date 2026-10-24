import type { LevelCurriculum } from "../types";
import { withMedia } from "../withMedia";
import { LOGICIELS_VIDEOS } from "./media";
import { lessonsA, quizzesA } from "./level1-a";
import { lessonsB, quizzesB, final1 } from "./level1-b";

/** Logiciels de gestion · Niveau 1 — Les bases de la gestion informatisée (notions, comptabilité, Dolibarr). */
export const logicielsLevel1: LevelCurriculum = {
  langCode: "LOGICIELS",
  langLabel: "Logiciels de gestion",
  langSlug: "logiciels",
  level: 1,
  levelTitle: "Niveau 1 - Les bases de la gestion informatisée",
  levelSubtitle: "Notions de comptabilité, cycle commercial et prise en main de Dolibarr.",
  lessons: withMedia("lg", LOGICIELS_VIDEOS, 1, [...lessonsA, ...lessonsB]),
  quizzes: [...quizzesA, ...quizzesB],
  finalQuiz: final1,
};
