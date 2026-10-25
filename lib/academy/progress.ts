"use client";

// Client-side progress store, namespaced per language+level so English
// and future languages never collide (the old app used flat global keys
// like "quiz1Passed", which would have clashed the moment a second
// language reused lesson numbers 1-12).
//
// This still trusts the client, same as the original app did — closing
// that gap requires server-side grading via firebase-admin, which needs
// FIREBASE_SERVICE_ACCOUNT_KEY (see lib/firebase-admin.ts) plus Firestore
// security rules configured in the Firebase console. Until then this is a
// structural improvement (no more key collisions, one JSON blob instead of
// a dozen loose keys) rather than an anti-cheat fix.

import type { QuizPartsRecord } from "@/lib/academy/quizScoring";
import { shortCode } from "@/lib/academy/shortCode";

export interface LevelProgress {
  /** Lessons the student has opened and studied (a lesson is studied before its quiz). */
  studiedLessons: number[];
  completedQuizzes: number[];
  quizScores: Record<number, number>;
  /** ISO date a lesson's quiz was first passed — the pacing clock starts here. */
  completedAt: Record<number, string>;
  finalQuizPassed: boolean;
  finalQuizScore: number | null;
  certificateId: string | null;
  /** Lessons the administration (or the teacher) opened for this student, whatever the pacing. */
  unlockedLessons: number[];
  /** Lessons whose score the administration set: its decision wins over this device. */
  adminScored: number[];
  /** True when the administration set the level's final quiz score. */
  adminFinal: boolean;
  /** How many times each lesson quiz was taken (practice included). */
  quizAttempts: Record<number, number>;
  /** Best score of the practice attempts (after the first one), to inform the administration. */
  practiceBest: Record<number, number>;
  /** Set when the administration restarted the level: older progress on a device is then dropped. */
  resetAt?: string;
  /** What the student did in each part of the first attempt (key: lesson id, or "final"). */
  quizParts: Record<string, QuizPartsRecord>;
  /** Marks out of 100 set by the administration (key: lesson id, or "final"). */
  adminPercent: Record<string, number>;
  /** Teacher's marks out of 10 for the written parts (key: lesson id, or "final"). Filled by the server. */
  writingMarks: Record<string, number>;
}

function storageKey(langSlug: string, level: number) {
  return `bm_academy_progress_${langSlug}_L${level}`;
}

function emptyProgress(): LevelProgress {
  return {
    studiedLessons: [],
    completedQuizzes: [],
    quizScores: {},
    completedAt: {},
    finalQuizPassed: false,
    finalQuizScore: null,
    certificateId: null,
    unlockedLessons: [],
    adminScored: [],
    adminFinal: false,
    quizAttempts: {},
    practiceBest: {},
    quizParts: {},
    adminPercent: {},
    writingMarks: {},
  };
}

// Pacing: a student picks a 3-day or 5-day/week study track at
// registration. The 5-day (intensive) track unlocks a new chapter every
// calendar day; the 3-day (standard) track unlocks one every 2 calendar
// days, roughly matching "3 chapters/week" vs "5 chapters/week" over a
// month-long level. Once a chapter unlocks it stays unlocked indefinitely
// — missing a day never permanently locks a student out.
export function getCooldownDays(studyDays?: number): number {
  return studyDays === 5 ? 1 : 2;
}

function atMidnight(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** The date lessonId unlocks on, or null if the previous lesson isn't completed yet. */
export function getLessonUnlockDate(progress: LevelProgress, lessonId: number, studyDays?: number): Date | null {
  if (lessonId <= 1) return null;
  const prevCompletedAt = progress.completedAt[lessonId - 1];
  if (!prevCompletedAt) return null;

  const unlockDate = atMidnight(new Date(prevCompletedAt));
  unlockDate.setDate(unlockDate.getDate() + getCooldownDays(studyDays));
  return unlockDate;
}

export function isLessonUnlocked(progress: LevelProgress, lessonId: number, studyDays?: number): boolean {
  if (lessonId === 1) return true;
  // Opened by the administration or the teacher: no prerequisite, no waiting.
  if ((progress.unlockedLessons ?? []).includes(lessonId)) return true;
  if (!progress.completedQuizzes.includes(lessonId - 1)) return false;

  const unlockDate = getLessonUnlockDate(progress, lessonId, studyDays);
  if (!unlockDate) return false;

  return atMidnight(new Date()).getTime() >= unlockDate.getTime();
}

export function getLevelProgress(langSlug: string, level: number): LevelProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(storageKey(langSlug, level));
    if (!raw) return emptyProgress();
    return { ...emptyProgress(), ...JSON.parse(raw) };
  } catch {
    return emptyProgress();
  }
}

function saveProgress(langSlug: string, level: number, progress: LevelProgress) {
  window.localStorage.setItem(storageKey(langSlug, level), JSON.stringify(progress));
}

/** Notes that a lesson was opened. Returns the progress when it changed, null when already known. */
export function markLessonStudied(langSlug: string, level: number, lessonId: number): LevelProgress | null {
  const progress = getLevelProgress(langSlug, level);
  if (progress.studiedLessons.includes(lessonId)) return null;
  progress.studiedLessons.push(lessonId);
  saveProgress(langSlug, level, progress);
  return progress;
}

/**
 * Records a quiz attempt. Only the FIRST attempt is the student's result (it is what the certificate
 * shows); later attempts are practice. The administration can change a score afterwards, and decides
 * what happens to a student who failed.
 */
export function recordQuizResult(
  langSlug: string,
  level: number,
  lessonId: number,
  score: number,
  passingScore: number,
  /** False when another part of the quiz (the conversation) was failed. */
  extraPass: boolean = true,
  /** What was done in each part (kept for the first attempt only). */
  partsRecord?: QuizPartsRecord
): LevelProgress {
  const progress = getLevelProgress(langSlug, level);
  const first = !(lessonId in progress.quizScores);
  progress.quizAttempts = { ...progress.quizAttempts, [lessonId]: (progress.quizAttempts?.[lessonId] ?? 0) + 1 };

  if (first) {
    progress.quizScores[lessonId] = score;
    if (partsRecord) progress.quizParts = { ...progress.quizParts, [lessonId]: partsRecord };
    if (score >= passingScore && extraPass && !progress.completedQuizzes.includes(lessonId)) {
      progress.completedQuizzes.push(lessonId);
      progress.completedAt[lessonId] = new Date().toISOString();
    }
  } else {
    progress.practiceBest = { ...progress.practiceBest, [lessonId]: Math.max(score, progress.practiceBest?.[lessonId] ?? 0) };
  }

  saveProgress(langSlug, level, progress);
  return progress;
}

export function recordFinalQuizResult(
  langSlug: string,
  level: number,
  score: number,
  passingScore: number,
  extraPass: boolean = true,
  partsRecord?: QuizPartsRecord
): LevelProgress {
  const progress = getLevelProgress(langSlug, level);

  if (progress.finalQuizScore === null) {
    progress.finalQuizScore = score;
    if (partsRecord) progress.quizParts = { ...progress.quizParts, final: partsRecord };
    if (score >= passingScore && extraPass) {
      progress.finalQuizPassed = true;
    }
  }

  saveProgress(langSlug, level, progress);
  return progress;
}

type ServerProgress = Partial<Omit<LevelProgress, "quizScores" | "completedAt">> & {
  quizScores?: Record<string, number>;
  completedAt?: Record<string, string>;
};
// (the server's marks and parts arrive in the same shape)

/**
 * Brings what the server knows (the student's other devices, the administration's decisions) into this
 * device's progress. Nothing the student earned is lost, but the administration has the last word: a score
 * it set, a lesson it opened, a level it restarted.
 */
export function mergeServerProgress(langSlug: string, level: number, server: ServerProgress): LevelProgress {
  let local = getLevelProgress(langSlug, level);
  // The level was restarted by the administration: this device's older progress no longer counts.
  if (server.resetAt && local.resetAt !== server.resetAt) local = { ...emptyProgress(), resetAt: server.resetAt };

  const union = (a: number[] = [], b: number[] = []) => Array.from(new Set([...a, ...b])).sort((x, y) => x - y);
  const adminScored = union(local.adminScored, server.adminScored);
  const num = (v: unknown) => Number(v);
  const merged: LevelProgress = {
    ...local,
    studiedLessons: union(local.studiedLessons, server.studiedLessons),
    completedQuizzes: union(local.completedQuizzes, server.completedQuizzes),
    unlockedLessons: union(local.unlockedLessons, server.unlockedLessons),
    adminScored,
    adminFinal: local.adminFinal || Boolean(server.adminFinal),
    quizScores: { ...(server.quizScores as Record<number, number>), ...local.quizScores },
    completedAt: { ...(server.completedAt as Record<number, string>), ...local.completedAt },
    quizAttempts: { ...local.quizAttempts },
    practiceBest: { ...local.practiceBest },
    // The first attempt's parts: this device's or, failing that, the server's. The administration's marks win.
    quizParts: { ...(server.quizParts || {}), ...local.quizParts },
    adminPercent: { ...(server.adminPercent || {}) },
    writingMarks: { ...(server.writingMarks || {}) },
    finalQuizPassed: local.finalQuizPassed || Boolean(server.finalQuizPassed),
    finalQuizScore: local.finalQuizScore ?? server.finalQuizScore ?? null,
    certificateId: local.certificateId ?? server.certificateId ?? null,
    resetAt: server.resetAt ?? local.resetAt,
  };
  // A score set by the administration replaces whatever this device holds, pass or fail.
  for (const id of server.adminScored ?? []) {
    const sv = server.quizScores?.[String(id)];
    if (typeof sv === "number") merged.quizScores[id] = sv;
    const sd = server.completedAt?.[String(id)];
    if (sd) merged.completedAt[id] = sd;
    else delete merged.completedAt[id];
    const done = (server.completedQuizzes ?? []).map(num).includes(id);
    merged.completedQuizzes = merged.completedQuizzes.filter((x) => x !== id);
    if (done) merged.completedQuizzes.push(id);
  }
  if (server.adminFinal) {
    merged.finalQuizScore = server.finalQuizScore ?? null;
    merged.finalQuizPassed = Boolean(server.finalQuizPassed);
  } else if (server.finalQuizPassed && !local.finalQuizPassed && typeof server.finalQuizScore === "number") {
    merged.finalQuizScore = server.finalQuizScore;
  }

  saveProgress(langSlug, level, merged);
  return merged;
}

export function getOrCreateCertificateId(
  langSlug: string,
  level: number,
  langCode: string
): string {
  const progress = getLevelProgress(langSlug, level);
  if (progress.certificateId) return progress.certificateId;

  const year = new Date().getFullYear();
  const id = `BMCA-${shortCode(langCode)}-L${level}-${year}-${Math.floor(Math.random() * 100000)}`;
  progress.certificateId = id;
  saveProgress(langSlug, level, progress);
  return id;
}

/**
 * How many lessons the student has got through. A lesson the administration opened is a decision about
 * the student's pace: everything before it counts as behind them, whether or not each quiz was taken on the site.
 */
export function lessonsBehind(progress: LevelProgress): number[] {
  const reached = Math.max(0, ...(progress.unlockedLessons ?? []));
  const before = Array.from({ length: Math.max(0, reached - 1) }, (_, i) => i + 1);
  return Array.from(new Set([...progress.completedQuizzes, ...before])).sort((a, b) => a - b);
}
