import type { LevelCurriculum } from "../types";
import { withMedia } from "../withMedia";
import { VISUEL_VIDEOS } from "./media";
import { lessonsA2, quizzesA2 } from "./level2-a";
import { lessonsB2, quizzesB2, final2 } from "./level2-b";

/** Visuel & Audiovisuel · Niveau 2 - Montage vidéo. */
export const visuelLevel2: LevelCurriculum = {
  langCode: "VISUEL",
  langLabel: "Visuel & Audiovisuel",
  langSlug: "visuel",
  level: 2,
  levelTitle: "Niveau 2 - Montage vidéo",
  levelSubtitle: "Du tournage à l'export : monter des vidéos propres pour toutes les plateformes.",
  lessons: withMedia("va", VISUEL_VIDEOS, 2, [...lessonsA2, ...lessonsB2]),
  quizzes: [...quizzesA2, ...quizzesB2],
  finalQuiz: final2,
};
