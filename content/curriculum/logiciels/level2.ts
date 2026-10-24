import type { LevelCurriculum } from "../types";
import { withMedia } from "../withMedia";
import { LOGICIELS_VIDEOS } from "./media";
import { lessonsA2, quizzesA2 } from "./level2-a";
import { lessonsB2, quizzesB2, final2 } from "./level2-b";

/** Logiciels de gestion · Niveau 2 — Comptabilité informatisée (Sage) et premier ERP (Odoo). */
export const logicielsLevel2: LevelCurriculum = {
  langCode: "LOGICIELS",
  langLabel: "Logiciels de gestion",
  langSlug: "logiciels",
  level: 2,
  levelTitle: "Niveau 2 - Comptabilité informatisée et ERP",
  levelSubtitle: "Sage pour la comptabilité et la gestion commerciale, puis premiers pas dans Odoo.",
  lessons: withMedia("lg", LOGICIELS_VIDEOS, 2, [...lessonsA2, ...lessonsB2]),
  quizzes: [...quizzesA2, ...quizzesB2],
  finalQuiz: final2,
};
