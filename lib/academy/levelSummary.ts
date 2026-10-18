import type { LevelCurriculum } from "@/content/curriculum/types";

/** The saved progress of one student on one level (as stored in Firestore). */
export interface ProgressDoc {
  studiedLessons?: number[];
  completedQuizzes?: number[];
  quizScores?: Record<string, number>;
  finalQuizScore?: number | null;
  finalQuizPassed?: boolean;
  certificateId?: string | null;
  updatedAt?: string | null;
  unlockedLessons?: number[];
  adminPassed?: number[];
  quizAttempts?: Record<string, number>;
}

export interface QuizRow {
  lessonId: number;
  title: string;
  studied: boolean;
  /** null = quiz not taken yet */
  score: number | null;
  total: number;
  passed: boolean;
}

export interface LevelSummary {
  rows: QuizRow[];
  final: { score: number | null; total: number; passed: boolean };
  /** Percentage over everything taken so far, as printed on the certificate. */
  average: number | null;
  quizzesTaken: number;
  /** The certificate is available once the level's final quiz is passed. */
  eligible: boolean;
}

/** Per-quiz results and the running average for a level — the same maths as the certificate page. */
export function summarizeLevel(curriculum: LevelCurriculum, progress: ProgressDoc): LevelSummary {
  const studied = new Set([...(progress.studiedLessons ?? []), ...(progress.completedQuizzes ?? [])]);
  const passedIds = new Set(progress.completedQuizzes ?? []);
  const scores = progress.quizScores ?? {};

  let totalScore = 0;
  let totalPossible = 0;
  let taken = 0;

  const rows: QuizRow[] = curriculum.lessons.map((lesson) => {
    const quiz = curriculum.quizzes.find((q) => q.lessonId === lesson.id);
    const total = quiz?.questions.length ?? 0;
    const raw = scores[lesson.id];
    const score = typeof raw === "number" ? raw : null;
    if (score !== null) {
      totalScore += score;
      totalPossible += total;
      taken++;
    }
    return { lessonId: lesson.id, title: lesson.title, studied: studied.has(lesson.id), score, total, passed: passedIds.has(lesson.id) };
  });

  const finalTotal = curriculum.finalQuiz.questions.length;
  const finalScore = typeof progress.finalQuizScore === "number" ? progress.finalQuizScore : null;
  if (finalScore !== null) {
    totalScore += finalScore;
    totalPossible += finalTotal;
  }

  return {
    rows,
    final: { score: finalScore, total: finalTotal, passed: Boolean(progress.finalQuizPassed) },
    average: totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : null,
    quizzesTaken: taken,
    eligible: Boolean(progress.finalQuizPassed),
  };
}
