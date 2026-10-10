"use client";

import { useState } from "react";
import type { Quiz, FinalQuiz } from "@/content/curriculum/types";

interface QuizEngineProps {
  quiz: Quiz | FinalQuiz;
  badge?: string;
  alreadyScore: number | null;
  onSubmit: (score: number) => void;
}

export default function QuizEngine({ quiz, badge, alreadyScore, onSubmit }: QuizEngineProps) {
  const [answers, setAnswers] = useState<string[]>(Array(quiz.questions.length).fill(""));
  const [submitted, setSubmitted] = useState(alreadyScore !== null);
  const [score, setScore] = useState(alreadyScore ?? 0);

  const handleSelect = (questionIndex: number, option: string) => {
    if (submitted) return;
    const updated = [...answers];
    updated[questionIndex] = option;
    setAnswers(updated);
  };

  const submitQuiz = () => {
    if (submitted) return;
    const finalScore = answers.filter((answer, index) => answer === quiz.questions[index].answer).length;
    setScore(finalScore);
    setSubmitted(true);
    onSubmit(finalScore);
  };

  const passed = score >= quiz.passingScore;

  return (
    <div className="bg-neutral-900 rounded-3xl p-6 md:p-8 border border-neutral-800 shadow-xl space-y-8">
      {quiz.questions.map((q, index) => (
        <div key={index} className="border-b border-neutral-800/80 pb-6 last:border-b-0 last:pb-0">
          <h2 className="font-bold text-lg text-white mb-4 flex items-start gap-3">
            <span className="text-red-500 font-extrabold">{index + 1}.</span>
            <span>{q.question}</span>
          </h2>

          <div className="space-y-3">
            {q.options.map((option) => {
              const isCorrect = option === q.answer;
              const isSelected = answers[index] === option;

              let buttonStyle = "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700";

              if (submitted) {
                if (isCorrect) {
                  buttonStyle = "bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold";
                } else if (isSelected && !isCorrect) {
                  buttonStyle = "bg-red-950/80 border-red-600 text-red-200 font-semibold";
                } else {
                  buttonStyle = "bg-neutral-950/40 border-neutral-800/50 text-neutral-500 opacity-60";
                }
              } else if (isSelected) {
                buttonStyle = "bg-red-600 border-red-500 text-white font-semibold shadow-lg shadow-red-950/50";
              }

              return (
                <button
                  key={option}
                  disabled={submitted}
                  onClick={() => handleSelect(index, option)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${buttonStyle}`}
                >
                  <span>{option}</span>
                  {submitted && isCorrect && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                  {submitted && isSelected && !isCorrect && <span className="text-red-400 font-bold ml-2">✗</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <div className="pt-4">
          <button
            onClick={submitQuiz}
            disabled={answers.includes("")}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl ${
              answers.includes("")
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-800"
                : "glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white shadow-red-950/60"
            }`}
          >
            {answers.includes("") ? "Please answer all questions" : badge ? `Submit ${badge}` : "Submit Quiz"}
          </button>
        </div>
      ) : (
        <div className="mt-8 p-6 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">
                Your Score: <span className={passed ? "text-emerald-400" : "text-red-500"}>{score} / {quiz.questions.length}</span>
              </h2>
              <p className="mt-1 font-semibold text-sm">
                {passed ? (
                  <span className="text-emerald-400">✅ Passed! Great job.</span>
                ) : (
                  <span className="text-red-400">❌ Failed. You need at least {quiz.passingScore}/{quiz.questions.length} to pass.</span>
                )}
              </p>
            </div>

            <button
              onClick={() => {
                setAnswers(Array(quiz.questions.length).fill(""));
                setSubmitted(false);
              }}
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-6 py-3 rounded-xl border border-neutral-700 transition self-start sm:self-auto"
            >
              🔄 Retake (practice only)
            </button>
          </div>

          <p className="text-xs text-red-400/80 italic font-medium pt-2 border-t border-neutral-900">
            Note: Only your first attempt score is recorded in your progress.
          </p>
        </div>
      )}
    </div>
  );
}
