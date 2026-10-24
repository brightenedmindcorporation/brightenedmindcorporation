import type { LevelCurriculum } from "../types";
import { withMedia } from "../withMedia";
import { LOGICIELS_VIDEOS } from "./media";
import { lessonsA3, quizzesA3 } from "./level3-a";
import { lessonsB3, quizzesB3, final3 } from "./level3-b";

/** Logiciels de gestion · Niveau 3 — ERP avancé, sécurité, douane, guichet unique et audit. */
export const logicielsLevel3: LevelCurriculum = {
  langCode: "LOGICIELS",
  langLabel: "Logiciels de gestion",
  langSlug: "logiciels",
  level: 3,
  levelTitle: "Niveau 3 - ERP avancé, douane et audit",
  levelSubtitle: "Odoo avancé, sécurité des données, opérations douanières, guichet unique et audit.",
  lessons: withMedia("lg", LOGICIELS_VIDEOS, 3, [...lessonsA3, ...lessonsB3]),
  quizzes: [...quizzesA3, ...quizzesB3],
  finalQuiz: final3,
};
