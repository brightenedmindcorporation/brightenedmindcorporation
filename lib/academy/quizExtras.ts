import type { LevelCurriculum } from "@/content/curriculum/types";
import { userScope } from "@/lib/academy/userScope";
import { getDialogue } from "@/content/dialogues";
import { isOfficeProgram } from "@/content/curriculum";
import { isCjkText, lessonChars, wordsOf } from "./writingLab";
import type { QuizWriting, QuizParts } from "@/components/academy/QuizEngine";
import type { QuizReading } from "@/components/academy/QuizReadingStep";

/** Picks up to `n` items spread across the list. */
function spread<T>(items: T[], n: number): T[] {
  if (items.length <= n) return items;
  return Array.from(new Set(Array.from({ length: n }, (_, k) => items[Math.round((k * (items.length - 1)) / (n - 1 || 1))])));
}

const QUESTION_END = /[?？]$/;

/**
 * The written step of a quiz (see QuizWritingStep): two lines of the quiz's own conversation to write
 * from dictation, up to two of its questions to answer about oneself, and a short free text on the
 * lesson's topic (the last lesson, a real-life review, for the level's final quiz).
 */
export function quizWriting(langSlug: string, curriculum: LevelCurriculum, key: number | "final"): QuizWriting | undefined {
  // The office course has no dictation or free writing: its quizzes are questions only.
  if (isOfficeProgram(langSlug)) return undefined;
  const lesson = key === "final" ? curriculum.lessons[curriculum.lessons.length - 1] : curriculum.lessons.find((l) => l.id === key);
  if (!lesson) return undefined;
  const dialogue = getDialogue(langSlug, curriculum.level, key);
  const lines = dialogue?.lines ?? [];
  const cjk = langSlug === "chinese" || lines.some((l) => isCjkText(l.text)) || isCjkText(lesson.speakingTopic);
  const size = (t: string) => wordsOf(t, cjk).length;

  // Short, clean lines make good dictation (no phone numbers or e-mail addresses to copy digit by digit).
  // Spelled letters and e-mail addresses ("sarah point brown arobase…") are no fair dictation.
  const SPELLED = /@|arobase|arroba|\bdot\b|ponto|punto|小老鼠|\b[A-Za-z]\s?[,，-]\s?[A-Za-z]\s?[,，-]\s?[A-Za-z]\b/i;
  const dictable = lines.filter((l) => !SPELLED.test(l.text) && !/\d{3,}/.test(l.text) && (cjk ? size(l.text) >= 4 && size(l.text) <= 24 : size(l.text) >= 3 && size(l.text) <= 16));
  const dictation = spread(dictable, 2).map((l) => ({ speaker: l.voice, text: l.text }));

  // Questions heard in the conversation (a line can hold several sentences: keep the questions).
  const asked: { speaker: "A" | "B"; question: string; line: string }[] = [];
  for (const l of lines) {
    const sentences = l.text.split(/(?<=[.!?。！？…])\s*/u).map((x) => x.trim()).filter(Boolean);
    for (const sentence of sentences) if (QUESTION_END.test(sentence) && size(sentence) >= 2) asked.push({ speaker: l.voice, question: sentence, line: l.text });
  }
  const replies = spread(asked, 2);

  const base = key === "final" ? 35 : 20;
  return {
    cjk,
    dictation,
    replies,
    topic: lesson.speakingTopic,
    ideas: lesson.exercises.slice(0, 4),
    minLength: cjk ? Math.round(base * 1.2) : base,
    corpus: cjk ? [lesson.title, lesson.subtitle, lesson.speakingTopic, ...lesson.sections.flatMap((x) => [x.heading, ...x.body]), ...lesson.reading, ...lesson.exercises, ...lines.map((l) => l.text)] : undefined,
    chars: cjk ? Array.from(new Set([...lessonChars(lesson), ...Array.from(lines.map((l) => l.text).join("")).filter((c) => isCjkText(c))])) : undefined,
  };
}

/**
 * The reading-aloud part of a quiz: one or two clean lines of the quiz's own conversation (or, failing that, a
 * line of the lesson's reading without its French translation), short enough to read in a few seconds.
 */
export function quizReading(langSlug: string, curriculum: LevelCurriculum, key: number | "final"): QuizReading | undefined {
  if (isOfficeProgram(langSlug)) return undefined;
  const lesson = key === "final" ? curriculum.lessons[curriculum.lessons.length - 1] : curriculum.lessons.find((l) => l.id === key);
  if (!lesson) return undefined;
  const lines = getDialogue(langSlug, curriculum.level, key)?.lines ?? [];
  const cjk = langSlug === "chinese" || lines.some((l) => isCjkText(l.text));
  const size = (t: string) => wordsOf(t, cjk).length;
  const SPELLED = /@|arobase|arroba|\bdot\b|ponto|punto|小老鼠|\b[A-Za-z]\s?[,，-]\s?[A-Za-z]\s?[,，-]\s?[A-Za-z]\b/i;
  const clean = (t: string) => !SPELLED.test(t) && !/\d{3,}/.test(t);
  const [min, max] = cjk ? [8, 40] : [5, 24];

  const texts = lines.map((l) => l.text).filter(clean);
  // Two neighbouring lines make a more natural passage; one long enough line is fine too.
  for (let i = 0; i < texts.length; i++) {
    const pair = `${texts[i]} ${texts[i + 1] ?? ""}`.trim();
    if (texts[i + 1] && size(pair) >= min && size(pair) <= max) return { text: pair, cjk };
  }
  const single = texts.find((t) => size(t) >= min && size(t) <= max);
  if (single) return { text: single, cjk };

  const fromReading = lesson.reading.map((r) => r.replace(/\s*[(（][^)）]*[)）]\s*/g, " ").trim()).find((t) => clean(t) && size(t) >= min && size(t) <= max + 10);
  return fromReading ? { text: fromReading, cjk: cjk || isCjkText(fromReading) } : undefined;
}

/** Keeps the student's written answer and conversation result on this device. */
export function saveQuizParts(langSlug: string, level: number, key: number | "final", parts: QuizParts) {
  try {
    localStorage.setItem(`bm-quizparts:${userScope()}:${langSlug}:${level}:${key}`, JSON.stringify({ ...parts, at: new Date().toISOString() }));
  } catch {
    // storage unavailable: the quiz result itself is still recorded
  }
}
