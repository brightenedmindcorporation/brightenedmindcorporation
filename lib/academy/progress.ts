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

/** Records a quiz result. Only the first attempt's score counts, matching the original app's rule. */
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

  if (!(lessonId in progress.quizScores)) {
    progress.quizScores[lessonId] = score;
    if (score >= passingScore && extraPass && !progress.completedQuizzes.includes(lessonId)) {
      progress.completedQuizzes.push(lessonId);
      progress.completedAt[lessonId] = new Date().toISOString();
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

  if (progress.finalQuizScore === null) {
    progress.finalQuizScore = score;
    if (score >= passingScore && extraPass) {
      progress.finalQuizPassed = true;
    }
  }

  saveProgress(langSlug, level, progress);
  return progress;
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
