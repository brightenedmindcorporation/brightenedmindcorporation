"use client";

import { useEffect, useState } from "react";
import { userScope } from "@/lib/academy/userScope";
import { sfx } from "@/lib/academy/sfx";
import { CheckCircle2, XCircle, RefreshCw, Headphones, ListChecks, PenLine, Mic } from "lucide-react";
import type { Quiz, FinalQuiz, QuizQuestion } from "@/content/curriculum/types";
import type { Dialogue } from "@/content/dialogues/types";
import DialoguePlayer from "@/components/academy/DialoguePlayer";
import { computeQuizMark, PASS_AT, passesQuiz, type QuizPartsRecord } from "@/lib/academy/quizScoring";
import Zh, { withoutHint } from "@/components/academy/Zh";
import PinyinToggle from "@/components/academy/PinyinToggle";
import StepBar from "@/components/StepBar";
import QuizReadingStep, { emptyReadingState, readingDone, type QuizReading } from "@/components/academy/QuizReadingStep";
import QuizWritingStep, { emptyWritingState, writingItems, writingMissing, writingSummary, type QuizWriting, type WritingItem } from "@/components/academy/QuizWritingStep";

/** What the student did in the extra steps of a quiz. */
export interface QuizParts {
  dialogueScore: number;
  dialogueTotal: number;
  /** Heard-conversation questions answered well enough (at least 60 %): shown for information only. */
  dialoguePassed: boolean;
  /** The quiz is passed: its general mark (every part together) is at least 6/10 (60/100). */
  passed: boolean;
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
        <p className="text-sm text-ink-soft mt-0.5">{hint}</p>
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
  only,
}: {
  questions: QuizQuestion[];
  answers: string[];
  submitted: boolean;
  onSelect: (index: number, option: string) => void;
  /** Step-by-step: the only question shown (-1 hides them all); undefined shows every question. */
  only?: number;
  /** Chinese: pinyin above the characters. */
  zh?: boolean;
}) {
  return (
    <>
      {questions.map((q, index) => (
        <div key={index} className={`border-b border-line/80 pb-6 last:border-b-0 last:pb-0 ${only !== undefined && only !== index ? "hidden" : ""}`}>
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
                  aria-pressed={isSelected}
                  className={`w-full text-left px-5 py-3.5 min-h-[56px] text-base rounded-2xl border transition-all duration-200 flex items-center justify-between ${buttonStyle}`}
                >
                  <span className={zh ? "leading-[2.2]" : undefined}>
                    <Zh text={zh ? withoutHint(option) : option} on={zh} />
                  </span>
                  {submitted && isCorrect && <span className="inline-flex items-center gap-1 text-emerald-400 ml-2 shrink-0 text-sm font-bold"><CheckCircle2 size={16} aria-hidden="true" /> <span>Correct</span></span>}
                  {submitted && isSelected && !isCorrect && <span className="inline-flex items-center gap-1 text-red-400 ml-2 shrink-0 text-sm font-bold"><XCircle size={16} aria-hidden="true" /> <span>Votre réponse</span></span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export default function QuizEngine({ quiz, badge, alreadyScore, onSubmit, dialogue, langSlug = "english", writing, reading, persistKey: sharedKey }: QuizEngineProps) {
  // drafts belong to the signed-in student, not to the browser
  const persistKey = sharedKey ? `${sharedKey}_${typeof window === "undefined" ? "" : userScope()}` : undefined;
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
  // One thing at a time: a conversation, then each question on its own screen, then reading, writing and the final send.
  // Once the quiz is sent everything is shown again (the corrections); the student can also choose the full view.
  const [stepMode, setStepMode] = useState(true);
  const [unit, setUnit] = useState(0);

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
    const record = {
      quiz: [finalScore, quiz.questions.length] as [number, number],
      ...(useDialogue ? { listen: [dScore, dialogueTotal] as [number, number] } : {}),
      ...(useReading ? { read: [readingState.percent ?? 0, 100] as [number, number] } : {}),
      ...(useWriting ? { write: true } : {}),
    };
    // Passed or failed on the general mark (same rule as the result shown below); the written part, not corrected yet, is left out.
    const passedNow = passesQuiz(computeQuizMark({ parts: record, rawScore: finalScore, rawTotal: quiz.questions.length }).percent);
    if (passedNow) sfx.success();
    else sfx.fail();
    onSubmit(finalScore, {
      dialogueScore: dScore,
      dialogueTotal,
      dialoguePassed: !useDialogue || dScore >= dialoguePassNeeded,
      passed: passedNow,
      writing: useWriting ? writingSummary(useWriting, writingState) : "",
      // The written texts, plus the recording of the student reading aloud when there is one (the administration listens to it).
      writingItems: (() => {
        const list: WritingItem[] = [
          ...(useWriting ? writingItems(useWriting, writingState) : []),
          ...(useReading && readingState.audioUrl
            ? [{ kind: "reading" as const, prompt: "Lecture à voix haute", expected: useReading.text, text: "Lecture enregistrée en audio", audioUrl: readingState.audioUrl }]
            : []),
        ];
        return list.length ? list : undefined;
      })(),
      record,
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
  const passed = passesQuiz(mark.percent);
  const mainPassed = passed;

  type Unit = { kind: "dialogue" | "question" | "reading" | "writing" | "submit"; q?: number; label: string };
  const units: Unit[] = [
    ...(useDialogue ? [{ kind: "dialogue" as const, label: "Conversation" }] : []),
    ...quiz.questions.map((_, i) => ({ kind: "question" as const, q: i, label: `Question ${i + 1} / ${quiz.questions.length}` })),
    ...(useReading ? [{ kind: "reading" as const, label: "Lecture à voix haute" }] : []),
    ...(useWriting ? [{ kind: "writing" as const, label: "Rédaction" }] : []),
    { kind: "submit" as const, label: "Envoyer le quiz" },
  ];
  const stepping = stepMode && !submitted;
  const cur = units[Math.min(unit, units.length - 1)];
  const hideUnless = (kind: Unit["kind"]) => (stepping && cur.kind !== kind ? "hidden" : "");
  const canNext =
    cur.kind === "dialogue" ? !dialogueAnswers.includes("") :
    cur.kind === "question" ? answers[cur.q as number] !== "" :
    cur.kind === "reading" ? readingOk :
    cur.kind === "writing" ? writingOk : true;
  const nextHint =
    cur.kind === "dialogue" ? "Répondez à toutes les questions de la conversation pour continuer." :
    cur.kind === "question" ? "Choisissez une réponse pour continuer." :
    cur.kind === "reading" ? "Faites la lecture à voix haute pour continuer." :
    `Complétez la rédaction pour continuer : ${writingGaps.join(", ")}.`;
  const goUnit = (n: number) => {
    setUnit(Math.max(0, Math.min(units.length - 1, n)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let step = 0;
  const missing = [
    useDialogue && dialogueAnswers.includes("") ? "la conversation" : null,
    answers.includes("") ? "les questions" : null,
    !readingOk ? "la lecture à voix haute" : null,
    !writingOk ? `la rédaction (${writingGaps.join(", ")})` : null,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={() => setStepMode((v) => !v)}
            className="min-h-[44px] px-4 rounded-xl border border-line bg-surface text-sm font-bold text-ink-soft hover:text-ink hover:border-red-600/60 transition"
          >
            {stepMode ? "Voir toutes les questions d'un coup" : "Revenir au pas à pas"}
          </button>
        ) : (
          <span />
        )}
        {langSlug === "chinese" && <PinyinToggle />}
      </div>
      {stepping && (
        <div>
          <StepBar step={unit + 1} labels={units.map((u) => u.label)} />
        </div>
      )}
      {useDialogue && (
        <div className={`bg-surface rounded-3xl p-5 md:p-8 border border-line shadow-xl space-y-6 ${hideUnless("dialogue")}`}>
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

      <div className={`bg-surface rounded-3xl p-5 md:p-8 border border-line shadow-xl space-y-8 ${hideUnless("question")}`}>
        {(useDialogue || useWriting || useReading) && !stepping && (
          <StepTitle n={++step} icon={ListChecks} title="Questions du quiz" hint="Répondez à toutes les questions." />
        )}
        <Questions questions={quiz.questions} answers={answers} submitted={submitted} onSelect={select(answers, setAnswers)} zh={langSlug === "chinese"} only={stepping ? (cur.kind === "question" ? cur.q : -1) : undefined} />
      </div>

      {useReading && (
        <div className={`bg-surface rounded-3xl p-5 md:p-8 border border-line shadow-xl space-y-5 ${hideUnless("reading")}`}>
          <StepTitle n={++step} icon={Mic} title="Lecture à voix haute" hint="Lisez le texte ci-dessous avec le micro, d'une voix claire. Le site compare ce qu'il entend avec le texte (20 points)." />
          <QuizReadingStep reading={useReading} state={readingState} onChange={setReadingState} submitted={submitted} langSlug={langSlug} />
        </div>
      )}

      {useWriting && (
        <div className={`bg-surface rounded-3xl p-5 md:p-8 border border-line shadow-xl space-y-5 ${hideUnless("writing")}`}>
          <StepTitle
            n={++step}
            icon={PenLine}
            title="Rédaction"
            hint="Trois petits exercices d'écriture : écoutez et écrivez, répondez, puis rédigez votre texte. Votre travail est enregistré avec votre quiz."
          />
          <QuizWritingStep writing={useWriting} state={writingState} onChange={setWritingState} submitted={submitted} langSlug={langSlug} />
        </div>
      )}

      <div className={`bg-surface rounded-3xl p-5 md:p-8 border border-line shadow-xl ${hideUnless("submit")}`}>
        {!submitted ? (
          <div>
            <p className="mb-4 text-ink-soft font-medium">
              Vous avez répondu à <b className="text-ink">{answers.filter(Boolean).length} sur {quiz.questions.length}</b> questions. Vérifiez si vous voulez, puis envoyez.
            </p>
            <button
              onClick={submitQuiz}
              disabled={!ready}
              className={`w-full min-h-[60px] rounded-2xl font-bold text-lg transition-all shadow-xl ${
                !ready
                  ? "bg-surface-alt text-ink-faint cursor-not-allowed border border-line"
                  : "glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white shadow-red-950/60"
              }`}
            >
              {!ready ? `À compléter : ${missing.join(", ")}` : badge ? `Submit ${badge} · Envoyer` : "Submit Quiz · Envoyer le quiz"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-ink">
                  Your Score <span className="text-base font-semibold text-ink-soft">(Votre score)</span>: <span className={mainPassed ? "text-emerald-400" : "text-red-500"}>{score} / {quiz.questions.length}</span>
                </h2>
                {useDialogue && (
                  <p className="text-sm font-semibold mt-1 text-ink-soft">
                    Conversation :{" "}
                    <span className={dialoguePassed ? "text-emerald-400" : "text-red-500"}>
                      {dialogueScore} / {dialogueTotal}
                    </span>{" "}
                    (compte dans la note générale)
                  </p>
                )}
                {useWriting && <p className="text-sm font-semibold mt-1 text-emerald-400">Rédaction enregistrée : un professeur la corrigera (25 points).</p>}
                {mark.percent !== null && (
                  <p className="text-sm font-bold mt-2 text-ink">
                    Note : <span className="text-lg">{mark.percent}/100</span>
                    {mark.provisional && <span className="ml-2 text-xs font-semibold text-amber-500">provisoire : la rédaction n&apos;est pas encore corrigée</span>}
                  </p>
                )}
                <p className="text-sm text-ink-soft mt-0.5">{mark.lines.map((l) => `${l.label} ${l.detail}`).join(" · ")}</p>
                <p className="mt-2 font-semibold text-sm">
                  {passed ? (
                    <span className="text-emerald-400 inline-flex items-center gap-1.5"><CheckCircle2 size={16} aria-hidden="true" /> Passed! Great job. · Réussi, bravo !</span>
                  ) : (
                    <span className="text-red-400 inline-flex items-center gap-1.5">
                      <XCircle size={16} />{" "}
                      {`Failed · Échoué. Votre note générale (${mark.percent ?? 0}/100) doit être d'au moins ${PASS_AT}/100 (${PASS_AT / 10}/10) pour réussir.`}
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
                  setUnit(0);
                  setSubmitted(false);
                }}
                className="bg-surface-alt hover:bg-surface text-ink font-bold px-6 min-h-[48px] rounded-xl border border-line transition self-start sm:self-auto inline-flex items-center gap-2"
              >
                <RefreshCw size={15} aria-hidden="true" /> Retake · Refaire pour s&apos;entraîner
              </button>
            </div>

            <p className="text-sm text-red-500 dark:text-red-300 italic font-medium pt-2 border-t border-line">
              Note: Only your first attempt score is recorded in your progress. Retakes are practice only.{!alreadyDone && !passed ? " The administration will review your result and decide what happens next." : ""}
            </p>
          </div>
        )}
      </div>

      {stepping && (
        <div className="space-y-2">
          {!canNext && cur.kind !== "submit" && (
            <p role="status" className="text-center text-sm font-semibold text-ink-soft">
              {nextHint}
            </p>
          )}
          <nav aria-label="Étapes du quiz" className="flex items-center gap-3">
            {unit > 0 && (
              <button type="button" onClick={() => goUnit(unit - 1)} className="min-h-[56px] px-6 rounded-2xl border border-line bg-surface text-ink font-bold hover:border-red-600/60 transition">
                ← Précédent
              </button>
            )}
            {cur.kind !== "submit" && (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => goUnit(unit + 1)}
                className={`flex-1 min-h-[56px] px-6 rounded-2xl font-bold text-lg transition ${
                  canNext ? "glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white" : "bg-surface-alt text-ink-soft border border-line cursor-not-allowed"
                }`}
              >
                {units[Math.min(unit + 1, units.length - 1)].kind === "submit" ? "Terminer →" : "Suivant →"}
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
