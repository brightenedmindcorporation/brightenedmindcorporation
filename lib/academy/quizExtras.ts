"use client";

import type { LevelCurriculum } from "@/content/curriculum/types";
import { buildWritingTask } from "./writingLab";
import type { QuizWriting, QuizParts } from "@/components/academy/QuizEngine";

/**
 * The written step of a quiz: the topic comes from the lesson (the last
 * lesson, a real-life review, for the level's final quiz) and the words to
 * reuse are that lesson's vocabulary.
 */
export function quizWriting(langSlug: string, curriculum: LevelCurriculum, key: number | "final"): QuizWriting | undefined {
  const lesson = key === "final" ? curriculum.lessons[curriculum.lessons.length - 1] : curriculum.lessons.find((l) => l.id === key);
  if (!lesson) return undefined;
  const task = buildWritingTask(langSlug, lesson);
  const base = key === "final" ? 50 : 30;
  return { prompt: lesson.speakingTopic, keyWords: task.keyWords, minLength: task.cjk ? Math.round(base * 1.2) : base, cjk: task.cjk };
}

/** Keeps the student's written answer and conversation result on this device. */
export function saveQuizParts(langSlug: string, level: number, key: number | "final", parts: QuizParts) {
  try {
    localStorage.setItem(`bm-quizparts:${langSlug}:${level}:${key}`, JSON.stringify({ ...parts, at: new Date().toISOString() }));
  } catch {
    // storage unavailable: the quiz result itself is still recorded
  }
}
