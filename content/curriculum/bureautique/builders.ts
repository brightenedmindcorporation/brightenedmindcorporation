import type { FinalQuiz, Lesson, LessonSection, Quiz, QuizQuestion } from "../types";

/** A multiple-choice question: the right answer, then two wrong ones. */
export type RawQ = [question: string, answer: string, wrong1: string, wrong2: string];

/** Puts the right answer at a position that changes from question to question (never always first). */
export function questions(raw: RawQ[], seed: number): QuizQuestion[] {
  return raw.map(([question, answer, w1, w2], i) => {
    const pos = (i + seed) % 3;
    const options = [w1, w2];
    options.splice(pos, 0, answer);
    return { question, options, answer };
  });
}

export function quiz(lessonId: number, title: string, subtitle: string, raw: RawQ[]): Quiz {
  return { lessonId, title, subtitle, questions: questions(raw, lessonId), passingScore: 7 };
}

export function finalQuiz(title: string, subtitle: string, raw: RawQ[]): FinalQuiz {
  return { title, subtitle, questions: questions(raw, 5), passingScore: 15 };
}

/** A lesson of the office course (no audio: the text-to-speech fields stay empty). */
export function lesson(opts: {
  id: number;
  title: string;
  subtitle: string;
  sections: LessonSection[];
  /** "Cas pratique": a short story that applies the lesson. */
  caseTitle: string;
  caseLines: string[];
  /** Practical tasks to do on the computer. */
  tasks: string[];
  /** The skill the student must have at the end. */
  goal: string;
  video?: string;
  videoUrl?: string;
}): Lesson {
  return {
    id: opts.id,
    title: opts.title,
    subtitle: opts.subtitle,
    sections: opts.sections,
    speakText: "",
    videoTopic: opts.video ?? opts.title,
    videoUrl: opts.videoUrl,
    readingTitle: opts.caseTitle,
    reading: opts.caseLines,
    readingSpeakText: "",
    exercises: opts.tasks,
    speakingTopic: opts.goal,
  };
}
