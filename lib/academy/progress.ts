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
  completedQuizzes: number[];
  quizScores: Record<number, number>;
  finalQuizPassed: boolean;
  finalQuizScore: number | null;
  certificateId: string | null;
}

function storageKey(langSlug: string, level: number) {
  return `bm_academy_progress_${langSlug}_L${level}`;
}

function emptyProgress(): LevelProgress {
  return {
    completedQuizzes: [],
    quizScores: {},
    finalQuizPassed: false,
    finalQuizScore: null,
    certificateId: null,
  };
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

/** Records a quiz result. Only the first attempt's score counts, matching the original app's rule. */
export function recordQuizResult(
  langSlug: string,
  level: number,
  lessonId: number,
  score: number,
  passingScore: number
): LevelProgress {
  const progress = getLevelProgress(langSlug, level);

  if (!(lessonId in progress.quizScores)) {
    progress.quizScores[lessonId] = score;
    if (score >= passingScore && !progress.completedQuizzes.includes(lessonId)) {
      progress.completedQuizzes.push(lessonId);
    }
  }

  saveProgress(langSlug, level, progress);
  return progress;
}

export function recordFinalQuizResult(
  langSlug: string,
  level: number,
  score: number,
  passingScore: number
): LevelProgress {
  const progress = getLevelProgress(langSlug, level);

  if (progress.finalQuizScore === null) {
    progress.finalQuizScore = score;
    if (score >= passingScore) {
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
