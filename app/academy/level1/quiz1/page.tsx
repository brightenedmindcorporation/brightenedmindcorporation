"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Quiz1Page() {
  const questions = [
    {
      question: "How do you greet someone?",
      options: ["Hello", "Chair", "Water"],
      answer: "Hello",
    },
    {
      question: "How do you introduce yourself?",
      options: ["My name is John", "Good night", "Bank"],
      answer: "My name is John",
    },
    {
      question: "What is the girl’s name?",
      options: ["John", "Sarah", "Joyce"],
      answer: "Sarah",
    },
    {
      question: "How old is Sarah?",
      options: ["20 years old", "13 years old", "12 years old"],
      answer: "12 years old",
    },
    {
      question: "Where does Sarah live?",
      options: ["Kolwezi", "Kinshasa", "Paris"],
      answer: "Kolwezi",
    },
    {
      question: "Choose an introduction:",
      options: ["My name is Sarah", "School is big", "Blue chair"],
      answer: "My name is Sarah",
    },
    {
      question: "What does Sarah say in the morning?",
      options: ["Bye", "Good morning", "Hello"],
      answer: "Good morning",
    },
    {
      question: "Choose a greeting word:",
      options: ["Hello", "Chicken", "Monday"],
      answer: "Hello",
    },
    {
      question: "What does she say when she meets someone new?",
      options: [
        "Nice to meet you",
        "Hello, my name is Sarah. Nice to meet you.",
        "Hello, welcome",
      ],
      answer: "Hello, my name is Sarah. Nice to meet you.",
    },
    {
      question: "What do we use for introductions?",
      options: ["My name is...", "Turn left", "I eat rice"],
      answer: "My name is...",
    },
  ];

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const alreadyDone = localStorage.getItem("quiz1Submitted");

    if (alreadyDone === "true") {
      setSubmitted(true);
      const savedScore = localStorage.getItem("quiz1Score");
      if (savedScore) {
        setScore(Number(savedScore));
      }
    }
  }, []);

  const handleSelect = (questionIndex: number, option: string) => {
    if (submitted) return;

    const updated = [...answers];
    updated[questionIndex] = option;
    setAnswers(updated);
  };

  const submitQuiz = () => {
    if (submitted) return;

    const finalScore = answers.filter(
      (answer, index) => answer === questions[index].answer
    ).length;

    setScore(finalScore);
    setSubmitted(true);
    localStorage.setItem("quiz1Submitted", "true");

    const firstAttempt = localStorage.getItem("quiz1FirstAttempt");

    if (!firstAttempt) {
      localStorage.setItem("quiz1FirstAttempt", "true");
      localStorage.setItem("quiz1Score", finalScore.toString());

      if (finalScore >= 7) {
        localStorage.setItem("quiz1Passed", "true");
      }
    }

    if (finalScore >= 7) {
      localStorage.setItem("quiz1Passed", "true");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <div>
            <Link
              href="/level1"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl border border-neutral-800 transition shadow-lg"
            >
              ← Back to Level 1
            </Link>
          </div>

          {/* Banner Header */}
          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
            <span className="text-xs font-bold uppercase tracking-widest text-red-300 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/40">
              Assessment
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-red-50 mt-3">
              Quiz 1
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">
              Greetings and Introductions
            </p>
          </div>

          {/* Questions Container */}
          <div className="bg-neutral-900 rounded-3xl p-6 md:p-8 border border-neutral-800 shadow-xl space-y-8">
            {questions.map((q, index) => (
              <div
                key={index}
                className="border-b border-neutral-800/80 pb-6 last:border-b-0 last:pb-0"
              >
                <h2 className="font-bold text-lg text-white mb-4 flex items-start gap-3">
                  <span className="text-red-500 font-extrabold">
                    {index + 1}.
                  </span>
                  <span>{q.question}</span>
                </h2>

                <div className="space-y-3">
                  {q.options.map((option) => {
                    const isCorrect = option === q.answer;
                    const isSelected = answers[index] === option;

                    let buttonStyle =
                      "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700";

                    if (submitted) {
                      if (isCorrect) {
                        buttonStyle =
                          "bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        buttonStyle =
                          "bg-red-950/80 border-red-600 text-red-200 font-semibold";
                      } else {
                        buttonStyle =
                          "bg-neutral-950/40 border-neutral-800/50 text-neutral-500 opacity-60";
                      }
                    } else if (isSelected) {
                      buttonStyle =
                        "bg-red-600 border-red-500 text-white font-semibold shadow-lg shadow-red-950/50";
                    }

                    return (
                      <button
                        key={option}
                        disabled={submitted}
                        onClick={() => handleSelect(index, option)}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${buttonStyle}`}
                      >
                        <span>{option}</span>

                        {submitted && isCorrect && (
                          <span className="text-emerald-400 font-bold ml-2">
                            ✓
                          </span>
                        )}

                        {submitted && isSelected && !isCorrect && (
                          <span className="text-red-400 font-bold ml-2">
                            ✗
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Submit or Results Section */}
            {!submitted ? (
              <div className="pt-4">
                <button
                  onClick={submitQuiz}
                  disabled={answers.includes("")}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl ${
                    answers.includes("")
                      ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-800"
                      : "bg-red-600 hover:bg-red-700 text-white shadow-red-950/60"
                  }`}
                >
                  {answers.includes("")
                    ? "Please answer all questions"
                    : "Submit Quiz"}
                </button>
              </div>
            ) : (
              <div className="mt-8 p-6 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white">
                      Your Score:{" "}
                      <span
                        className={
                          score >= 7 ? "text-emerald-400" : "text-red-500"
                        }
                      >
                        {score} / {questions.length}
                      </span>
                    </h2>
                    <p className="mt-1 font-semibold text-sm">
                      {score >= 7 ? (
                        <span className="text-emerald-400">
                          ✅ Passed! Great job.
                        </span>
                      ) : (
                        <span className="text-red-400">
                          ❌ Failed. You need at least 7/10 to pass.
                        </span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setAnswers(Array(questions.length).fill(""));
                      setSubmitted(false);
                    }}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-6 py-3 rounded-xl border border-neutral-700 transition self-start sm:self-auto"
                  >
                    🔄 Restart Quiz
                  </button>
                </div>

                <p className="text-xs text-red-400/80 italic font-medium pt-2 border-t border-neutral-900">
                  Note: Only the first attempt score is recorded in your progress.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}