import type { LevelCurriculum } from "../types";
import { withMedia } from "../withMedia";
import { VISUEL_VIDEOS } from "./media";
import { lessonsA, quizzesA } from "./level1-a";
import { lessonsB, quizzesB, final1 } from "./level1-b";

/** Visuel & Audiovisuel · Niveau 1 - Image et design graphique. */
export const visuelLevel1: LevelCurriculum = {
  langCode: "VISUEL",
  langLabel: "Visuel & Audiovisuel",
  langSlug: "visuel",
  level: 1,
  levelTitle: "Niveau 1 - Image et design graphique",
  levelSubtitle: "Image numérique, couleur, composition, Photoshop et Illustrator.",
  lessons: withMedia("va", VISUEL_VIDEOS, 1, [...lessonsA, ...lessonsB]),
  quizzes: [...quizzesA, ...quizzesB],
  finalQuiz: final1,
};
