import type { LevelCurriculum } from "../types";
import { withMedia } from "../withMedia";
import { VISUEL_VIDEOS } from "./media";
import { lessonsA3, quizzesA3 } from "./level3-a";
import { lessonsB3, quizzesB3, final3 } from "./level3-b";

/** Visuel & Audiovisuel · Niveau 3 - Perfectionnement et diffusion en direct. */
export const visuelLevel3: LevelCurriculum = {
  langCode: "VISUEL",
  langLabel: "Visuel & Audiovisuel",
  langSlug: "visuel",
  level: 3,
  levelTitle: "Niveau 3 - Perfectionnement et diffusion en direct",
  levelSubtitle: "Photoshop avancé, identité visuelle, impression, multicaméra, OBS, vMix et projet final.",
  lessons: withMedia("va", VISUEL_VIDEOS, 3, [...lessonsA3, ...lessonsB3]),
  quizzes: [...quizzesA3, ...quizzesB3],
  finalQuiz: final3,
};
