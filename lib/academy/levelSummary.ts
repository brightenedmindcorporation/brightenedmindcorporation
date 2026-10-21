import type { LevelCurriculum } from "@/content/curriculum/types";
import { computeQuizMark, type QuizMark, type QuizPartsRecord } from "@/lib/academy/quizScoring";

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
  adminScored?: number[];
  quizAttempts?: Record<string, number>;
  practiceBest?: Record<string, number>;
  quizParts?: Record<string, QuizPartsRecord>;
  adminPercent?: Record<string, number>;
  writingMarks?: Record<string, number>;
  adminFinal?: boolean;
}

export interface QuizRow {
  lessonId: number;
  title: string;
  studied: boolean;
  /** null = quiz not taken yet */
  score: number | null;
  total: number;
  passed: boolean;
  /** The mark out of 100 with its parts (écoute, questions, écrit). */
  mark: QuizMark;
}

export interface LevelSummary {
  rows: QuizRow[];
  final: { score: number | null; total: number; passed: boolean; mark: QuizMark };
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

  const percents: number[] = [];
  let taken = 0;
  const markOf = (key: string, raw: number | null, total: number) =>
    computeQuizMark({
      parts: progress.quizParts?.[key],
      rawScore: raw,
      rawTotal: total,
      writeMark: progress.writingMarks?.[key],
      adminPercent: progress.adminPercent?.[key],
    });

  const rows: QuizRow[] = curriculum.lessons.map((lesson) => {
    const quiz = curriculum.quizzes.find((q) => q.lessonId === lesson.id);
    const total = quiz?.questions.length ?? 0;
    const raw = scores[lesson.id];
    const score = typeof raw === "number" ? raw : null;
    const mark = markOf(String(lesson.id), score, total);
    if (score !== null) {
      taken++;
      if (mark.percent !== null) percents.push(mark.percent);
    }
    return { lessonId: lesson.id, title: lesson.title, studied: studied.has(lesson.id), score, total, passed: passedIds.has(lesson.id), mark };
  });

  const finalTotal = curriculum.finalQuiz.questions.length;
  const finalScore = typeof progress.finalQuizScore === "number" ? progress.finalQuizScore : null;
  const finalMark = markOf("final", finalScore, finalTotal);
  if (finalScore !== null && finalMark.percent !== null) percents.push(finalMark.percent);

  return {
    rows,
    final: { score: finalScore, total: finalTotal, passed: Boolean(progress.finalQuizPassed), mark: finalMark },
    average: percents.length > 0 ? Math.round(percents.reduce((a, b) => a + b, 0) / percents.length) : null,
    quizzesTaken: taken,
    eligible: Boolean(progress.finalQuizPassed),
  };
}
