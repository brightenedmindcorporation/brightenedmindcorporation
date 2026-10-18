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
  /** Lessons validated by the administration without the quiz being passed here. */
  adminPassed: number[];
  /** How many times each lesson quiz was taken. */
  quizAttempts: Record<number, number>;
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
    adminPassed: [],
    quizAttempts: {},
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
 * Records a quiz attempt. The rule: the quiz that unlocks the next lesson is the first one PASSED.
 *  - Until it is passed, every attempt counts as an attempt and the best score is kept; a failed
 *    first attempt no longer locks the lesson for good (it used to).
 *  - The attempt that passes is the one recorded (score, date: the pacing clock starts there).
 *  - Once passed, later attempts are practice only and change nothing.
 */
export function recordQuizResult(
  langSlug: string,
  level: number,
  lessonId: number,
  score: number,
  passingScore: number,
  /** False when another part of the quiz (the conversation) was failed. */
  extraPass: boolean = true
): LevelProgress {
  const progress = getLevelProgress(langSlug, level);

  if (!progress.completedQuizzes.includes(lessonId)) {
    progress.quizAttempts = { ...progress.quizAttempts, [lessonId]: (progress.quizAttempts?.[lessonId] ?? 0) + 1 };
    if (score >= passingScore && extraPass) {
      progress.quizScores[lessonId] = score;
      progress.completedQuizzes.push(lessonId);
      progress.completedAt[lessonId] = new Date().toISOString();
    } else {
      progress.quizScores[lessonId] = Math.max(score, progress.quizScores[lessonId] ?? 0);
    }
  }

  saveProgress(langSlug, level, progress);
  return progress;
}

export function recordFinalQuizResult(
  langSlug: string,
  level: number,
  score: number,
  passingScore: number,
  extraPass: boolean = true
): LevelProgress {
  const progress = getLevelProgress(langSlug, level);

  // Same rule as the lesson quizzes: the first pass counts; before that the best score is kept.
  if (!progress.finalQuizPassed) {
    if (score >= passingScore && extraPass) {
      progress.finalQuizScore = score;
      progress.finalQuizPassed = true;
    } else {
      progress.finalQuizScore = Math.max(score, progress.finalQuizScore ?? 0);
    }
  }

  saveProgress(langSlug, level, progress);
  return progress;
}

/**
 * Brings what the server knows (the student's other devices, the administration's changes) into this
 * device's progress. Nothing is ever taken away: lists are merged, passed stays passed.
 */
export function mergeServerProgress(langSlug: string, level: number, server: Partial<LevelProgress> & { quizScores?: Record<string, number>; completedAt?: Record<string, string> }): LevelProgress {
  const local = getLevelProgress(langSlug, level);
  const union = (a: number[] = [], b: number[] = []) => Array.from(new Set([...a, ...b])).sort((x, y) => x - y);

  const adminPassed = union(local.adminPassed, server.adminPassed);
  const merged: LevelProgress = {
    ...local,
    studiedLessons: union(local.studiedLessons, server.studiedLessons),
    completedQuizzes: union(local.completedQuizzes, server.completedQuizzes),
    unlockedLessons: union(local.unlockedLessons, server.unlockedLessons),
    adminPassed,
    quizScores: { ...(server.quizScores as Record<number, number>), ...local.quizScores },
    completedAt: { ...(server.completedAt as Record<number, string>), ...local.completedAt },
    quizAttempts: { ...local.quizAttempts },
    finalQuizPassed: local.finalQuizPassed || Boolean(server.finalQuizPassed),
    finalQuizScore: local.finalQuizScore ?? server.finalQuizScore ?? null,
    certificateId: local.certificateId ?? server.certificateId ?? null,
  };
  // A quiz passed on another device (or validated by the administration) takes its passing score and date.
  for (const id of merged.completedQuizzes) {
    if (!local.completedQuizzes.includes(id)) {
      const sv = (server.quizScores as Record<string, number> | undefined)?.[id];
      const sd = (server.completedAt as Record<string, string> | undefined)?.[id];
      if (typeof sv === "number") merged.quizScores[id] = sv;
      if (sd) merged.completedAt[id] = sd;
    }
  }
  if (server.finalQuizPassed && !local.finalQuizPassed && typeof server.finalQuizScore === "number") merged.finalQuizScore = server.finalQuizScore;

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
  const id = `BMCA-${langCode}-L${level}-${year}-${Math.floor(Math.random() * 100000)}`;
  progress.certificateId = id;
  saveProgress(langSlug, level, progress);
  return id;
}
