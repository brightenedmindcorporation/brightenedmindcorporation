"use client";

import { useEffect, useState } from "react";
import { sfx } from "@/lib/academy/sfx";
import { CheckCircle2, XCircle, RefreshCw, Headphones, ListChecks, PenLine, Mic } from "lucide-react";
import type { Quiz, FinalQuiz, QuizQuestion } from "@/content/curriculum/types";
import type { Dialogue } from "@/content/dialogues/types";
import DialoguePlayer from "@/components/academy/DialoguePlayer";
import { computeQuizMark, type QuizPartsRecord } from "@/lib/academy/quizScoring";
import Zh, { withoutHint } from "@/components/academy/Zh";
import QuizReadingStep, { emptyReadingState, readingDone, type QuizReading } from "@/components/academy/QuizReadingStep";
import QuizWritingStep, { emptyWritingState, writingItems, writingMissing, writingSummary, type QuizWriting, type WritingItem } from "@/components/academy/QuizWritingStep";

/** What the student did in the extra steps of a quiz. */
export interface QuizParts {
  dialogueScore: number;
  dialogueTotal: number;
  /** Heard-conversation questions answered well enough (at least 60 %). */
  dialoguePassed: boolean;
  writing: string;
  /** The texts written, structured for the teacher who corrects them. */
  writingItems?: WritingItem[];
  /** The parts of this attempt, ready to be saved for the mark out of 100. */
  record: QuizPartsRecord;
}

export type { QuizWriting };

interface QuizEngineProps {
  quiz: Quiz | FinalQuiz;
  badge?: string;
  alreadyScore: number | null;
  onSubmit: (score: number, parts?: QuizParts) => void;
  /** Step 1: a recorded conversation with questions. */
  dialogue?: Dialogue;
  langSlug?: string;
  /** Step 3: a short written production. */
  writing?: QuizWriting;
  /** Reading aloud with the microphone. */
  reading?: QuizReading;
  /** Where the unfinished answers are kept, so they survive a visit to the lesson. */
  persistKey?: string;
}

function StepTitle({ n, icon: Icon, title, hint }: { n: number; icon: React.ComponentType<{ size?: number }>; title: string; hint: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-9 h-9 shrink-0 rounded-full bg-red-600 text-white font-black flex items-center justify-center">{n}</span>
      <div>
        <h2 className="text-xl font-black text-ink flex items-center gap-2">
          <Icon size={18} /> {title}
        </h2>
        <p className="text-xs text-ink-soft mt-0.5">{hint}</p>
      </div>
    </div>
  );
}

function Questions({
  questions,
  answers,
  submitted,
  onSelect,
  zh = false,
}: {
  questions: QuizQuestion[];
  answers: string[];
  submitted: boolean;
  onSelect: (index: number, option: string) => void;
  /** Chinese: pinyin above the characters. */
  zh?: boolean;
}) {
  return (
    <>
      {questions.map((q, index) => (
        <div key={index} className="border-b border-line/80 pb-6 last:border-b-0 last:pb-0">
          <h3 className="font-bold text-lg text-ink mb-4 flex items-start gap-3">
            <span className="text-red-500 font-extrabold">{index + 1}.</span>
            <span className={zh ? "leading-[2.2]" : undefined}>
              <Zh text={q.question} on={zh} />
            </span>
          </h3>

          <div className="space-y-3">
            {q.options.map((option) => {
              const isCorrect = option === q.answer;
              const isSelected = answers[index] === option;

              let buttonStyle = "bg-surface-sunken/60 border-line text-ink-soft hover:border-line";

              if (submitted) {
                if (isCorrect) {
                  buttonStyle = "bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold";
                } else if (isSelected && !isCorrect) {
                  buttonStyle = "bg-red-950/80 border-red-600 text-red-200 font-semibold";
                } else {
                  buttonStyle = "bg-surface-sunken/40 border-line/50 text-ink-faint opacity-60";
                }
              } else if (isSelected) {
                buttonStyle = "bg-red-600 border-red-500 text-white font-semibold shadow-lg shadow-red-950/50";
              }

              return (
                <button
                  key={option}
                  disabled={submitted}
                  onClick={() => onSelect(index, option)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${buttonStyle}`}
                >
                  <span className={zh ? "leading-[2.2]" : undefined}>
                    <Zh text={zh ? withoutHint(option) : option} on={zh} />
                  </span>
                  {submitted && isCorrect && <CheckCircle2 size={16} className="inline text-emerald-400 ml-2" />}
                  {submitted && isSelected && !isCorrect && <XCircle size={16} className="inline text-red-400 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export default function QuizEngine({ quiz, badge, alreadyScore, onSubmit, dialogue, langSlug = "english", writing, reading, persistKey }: QuizEngineProps) {
  const alreadyDone = alreadyScore !== null;
  // A quiz already taken only shows its main questions (the extra steps
  // were not part of it, or are not stored); a practice retake shows all.
  const [practice, setPractice] = useState(false);
  const withExtras = !alreadyDone || practice;
  const useDialogue = withExtras ? dialogue : undefined;
  const useWriting = withExtras ? writing : undefined;
  const useReading = withExtras ? reading : undefined;
  const [readingState, setReadingState] = useState(emptyReadingState);

  const [answers, setAnswers] = useState<string[]>(Array(quiz.questions.length).fill(""));
  const [dialogueAnswers, setDialogueAnswers] = useState<string[]>(Array(dialogue?.questions.length ?? 0).fill(""));
  const [writingState, setWritingState] = useState(() => emptyWritingState(writing));
  const [submitted, setSubmitted] = useState(alreadyDone);
  const [score, setScore] = useState(alreadyScore ?? 0);
  const [dialogueScore, setDialogueScore] = useState(0);

  // Unfinished answers are kept on this device: the student can go back to the lesson to check something and find them as they were.
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    if (persistKey && !alreadyDone) {
      try {
        const d = JSON.parse(window.localStorage.getItem(persistKey) || "null");
        if (d) {
          if (Array.isArray(d.answers) && d.answers.length === quiz.questions.length) setAnswers(d.answers);
          if (Array.isArray(d.dialogueAnswers) && d.dialogueAnswers.length === (dialogue?.questions.length ?? 0)) setDialogueAnswers(d.dialogueAnswers);
          if (d.writing) setWritingState(d.writing);
          if (d.reading) setReadingState(d.reading);
        }
      } catch {
        // an unreadable draft is simply ignored
      }
    }
    setRestored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!persistKey || !restored || submitted) return;
    try {
      window.localStorage.setItem(persistKey, JSON.stringify({ answers, dialogueAnswers, writing: writingState, reading: readingState }));
    } catch {
      // storage full or blocked: the quiz still works
    }
  }, [persistKey, restored, submitted, answers, dialogueAnswers, writingState, readingState]);

  const dialogueTotal = useDialogue?.questions.length ?? 0;
  const dialoguePassNeeded = Math.ceil(dialogueTotal * 0.6);
  const writingGaps = useWriting ? writingMissing(useWriting, writingState) : [];
  const writingOk = writingGaps.length === 0;
  const allAnswered = !answers.includes("") && !(useDialogue && dialogueAnswers.includes(""));
  const readingOk = !useReading || readingDone(readingState);
  const ready = allAnswered && writingOk && readingOk;

  const select = (list: string[], set: (v: string[]) => void) => (i: number, option: string) => {
    if (submitted) return;
    sfx.tap();
    const updated = [...list];
    updated[i] = option;
    set(updated);
  };

  const submitQuiz = () => {
    if (submitted || !ready) return;
    const finalScore = answers.filter((answer, index) => answer === quiz.questions[index].answer).length;
    const dScore = useDialogue ? dialogueAnswers.filter((a, i) => a === useDialogue.questions[i].answer).length : 0;
    setScore(finalScore);
    setDialogueScore(dScore);
    setSubmitted(true);
    if (persistKey) {
      try {
        window.localStorage.removeItem(persistKey);
      } catch {}
    }
    // Passed or failed (same rule as the result shown below).
    if (finalScore >= quiz.passingScore && (!useDialogue || dScore >= dialoguePassNeeded)) sfx.success();
    else sfx.fail();
    onSubmit(finalScore, {
      dialogueScore: dScore,
      dialogueTotal,
      dialoguePassed: !useDialogue || dScore >= dialoguePassNeeded,
      writing: useWriting ? writingSummary(useWriting, writingState) : "",
      writingItems: useWriting ? writingItems(useWriting, writingState) : undefined,
      record: {
        quiz: [finalScore, quiz.questions.length],
        ...(useDialogue ? { listen: [dScore, dialogueTotal] as [number, number] } : {}),
        ...(useReading ? { read: [readingState.percent ?? 0, 100] as [number, number] } : {}),
        ...(useWriting ? { write: true } : {}),
      },
    });
  };

  // The mark out of 100 of this attempt (the written part waits for the teacher).
  const mark = computeQuizMark({
    parts: {
      quiz: [score, quiz.questions.length],
      ...(useDialogue ? { listen: [dialogueScore, dialogueTotal] as [number, number] } : {}),
      ...(useReading ? { read: [readingState.percent ?? 0, 100] as [number, number] } : {}),
      ...(useWriting ? { write: true } : {}),
    },
    rawScore: score,
    rawTotal: quiz.questions.length,
  });
  const dialoguePassed = !useDialogue || dialogueScore >= dialoguePassNeeded;
  const mainPassed = score >= quiz.passingScore;
  const passed = mainPassed && dialoguePassed;

  let step = 0;
  const missing = [
    useDialogue && dialogueAnswers.includes("") ? "la conversation" : null,
    answers.includes("") ? "les questions" : null,
    !readingOk ? "la lecture à voix haute" : null,
    !writingOk ? `la rédaction (${writingGaps.join(", ")})` : null,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {useDialogue && (
        <div className="bg-surface rounded-3xl p-6 md:p-8 border border-line shadow-xl space-y-6">
          <StepTitle n={++step} icon={Headphones} title="Conversation à écouter" hint="Écoutez la conversation, puis répondez. Le texte n'est pas affiché pendant l'écoute." />
          <DialoguePlayer dialogue={useDialogue} langSlug={langSlug} showTranscript={submitted} />
          <Questions
            questions={useDialogue.questions}
            answers={dialogueAnswers}
            submitted={submitted}
            onSelect={select(dialogueAnswers, setDialogueAnswers)}
            zh={langSlug === "chinese"}
          />
        </div>
      )}

      <div className="bg-surface rounded-3xl p-6 md:p-8 border border-line shadow-xl space-y-8">
        {(useDialogue || useWriting || useReading) && (
          <StepTitle n={++step} icon={ListChecks} title="Questions du quiz" hint="Répondez à toutes les questions." />
        )}
        <Questions questions={quiz.questions} answers={answers} submitted={submitted} onSelect={select(answers, setAnswers)} zh={langSlug === "chinese"} />
      </div>

      {useReading && (
        <div className="bg-surface rounded-3xl p-6 md:p-8 border border-line shadow-xl space-y-5">
          <StepTitle n={++step} icon={Mic} title="Lecture à voix haute" hint="Lisez le texte ci-dessous avec le micro, d'une voix claire. Le site compare ce qu'il entend avec le texte (20 points)." />
          <QuizReadingStep reading={useReading} state={readingState} onChange={setReadingState} submitted={submitted} langSlug={langSlug} />
        </div>
      )}

      {useWriting && (
        <div className="bg-surface rounded-3xl p-6 md:p-8 border border-line shadow-xl space-y-5">
          <StepTitle
            n={++step}
            icon={PenLine}
            title="Rédaction"
            hint="Trois petits exercices d'écriture : écoutez et écrivez, répondez, puis rédigez votre texte. Votre travail est enregistré avec votre quiz."
          />
          <QuizWritingStep writing={useWriting} state={writingState} onChange={setWritingState} submitted={submitted} langSlug={langSlug} />
        </div>
      )}

      <div className="bg-surface rounded-3xl p-6 md:p-8 border border-line shadow-xl">
        {!submitted ? (
          <div>
            <button
              onClick={submitQuiz}
              disabled={!ready}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl ${
                !ready
                  ? "bg-surface-alt text-ink-faint cursor-not-allowed border border-line"
                  : "glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white shadow-red-950/60"
              }`}
            >
              {!ready ? `À compléter : ${missing.join(", ")}` : badge ? `Submit ${badge}` : "Submit Quiz"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-ink">
                  Your Score: <span className={mainPassed ? "text-emerald-400" : "text-red-500"}>{score} / {quiz.questions.length}</span>
                </h2>
                {useDialogue && (
                  <p className="text-sm font-semibold mt-1 text-ink-soft">
                    Conversation :{" "}
                    <span className={dialoguePassed ? "text-emerald-400" : "text-red-500"}>
                      {dialogueScore} / {dialogueTotal}
                    </span>{" "}
                    (minimum {dialoguePassNeeded})
                  </p>
                )}
                {useWriting && <p className="text-sm font-semibold mt-1 text-emerald-400">Rédaction enregistrée : un professeur la corrigera (25 points).</p>}
                {mark.percent !== null && (
                  <p className="text-sm font-bold mt-2 text-ink">
                    Note : <span className="text-lg">{mark.percent}/100</span>
                    {mark.provisional && <span className="ml-2 text-xs font-semibold text-amber-500">provisoire : la rédaction n&apos;est pas encore corrigée</span>}
                  </p>
                )}
                <p className="text-xs text-ink-soft mt-0.5">{mark.lines.map((l) => `${l.label} ${l.detail}`).join(" · ")}</p>
                <p className="mt-2 font-semibold text-sm">
                  {passed ? (
                    <span className="text-emerald-400 inline-flex items-center gap-1.5"><CheckCircle2 size={16} /> Passed! Great job.</span>
                  ) : (
                    <span className="text-red-400 inline-flex items-center gap-1.5">
                      <XCircle size={16} />{" "}
                      {!mainPassed
                        ? `Failed. You need at least ${quiz.passingScore}/${quiz.questions.length} to pass.`
                        : `Failed. Il faut au moins ${dialoguePassNeeded}/${dialogueTotal} à la conversation.`}
                    </span>
                  )}
                </p>
              </div>

              <button
                onClick={() => {
                  setAnswers(Array(quiz.questions.length).fill(""));
                  setDialogueAnswers(Array(dialogue?.questions.length ?? 0).fill(""));
                  setWritingState(emptyWritingState(writing));
                  setReadingState(emptyReadingState());
                  setPractice(true);
                  setSubmitted(false);
                }}
                className="bg-surface-alt hover:bg-surface text-ink font-bold px-6 py-3 rounded-xl border border-line transition self-start sm:self-auto inline-flex items-center gap-2"
              >
                <RefreshCw size={15} /> Retake (practice only)
              </button>
            </div>

            <p className="text-xs text-red-400/80 italic font-medium pt-2 border-t border-line">
              Note: Only your first attempt score is recorded in your progress. Retakes are practice only.{!alreadyDone && !passed ? " The administration will review your result and decide what happens next." : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
