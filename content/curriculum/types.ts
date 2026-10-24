export interface LessonSection {
  heading: string;
  body: string[];
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  sections: LessonSection[];
  /** Full text passed to the browser's speechSynthesis for "Listen Lesson". */
  speakText: string;
  videoTopic: string;
  /** Optional YouTube/Vimeo URL embedded in the lesson's Video card. Falls back to videoTopic text when absent. */
  videoUrl?: string;
  /** Id of a hand-drawn diagram (office course), shown under the lesson text. */
  figure?: string;
  readingTitle: string;
  reading: string[];
  readingSpeakText: string;
  exercises: string[];
  speakingTopic: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface Quiz {
  lessonId: number;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface FinalQuiz {
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface LevelCurriculum {
  langCode: string;
  langLabel: string;
  langSlug: string;
  level: number;
  levelTitle: string;
  levelSubtitle: string;
  lessons: Lesson[];
  quizzes: Quiz[];
  finalQuiz: FinalQuiz;
}
