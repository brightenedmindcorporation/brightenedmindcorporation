"use client";

import { useState } from "react";

export default function Quiz8Page() {
  const questions = [
    {
      question:
        "What do people usually do first in the morning?",
      options: [
        "Wake up",
        "Sleep",
        "Play football",
      ],
      answer: "Wake up",
    },
    {
      question:
        "Which activity happens in the bathroom?",
      options: [
        "Brush my teeth",
        "Study math",
        "Watch television",
      ],
      answer: "Brush my teeth",
    },
    {
      question:
        "Which sentence is correct?",
      options: [
        "I go to school",
        "School I to go",
        "Go school to I",
      ],
      answer: "I go to school",
    },
    {
      question:
        "When do students usually do homework?",
      options: [
        "In the evening",
        "At midnight",
        "Before breakfast",
      ],
      answer: "In the evening",
    },
    {
      question:
        "What is a daily routine?",
      options: [
        "Activities we do every day",
        "A birthday party",
        "A school building",
      ],
      answer:
        "Activities we do every day",
    },
    {
      question:
        "What is the boy’s name in the text?",
      options: [
        "Peter",
        "Daniel",
        "Kevin",
      ],
      answer: "Daniel",
    },
    {
      question:
        "What time does Daniel wake up?",
      options: [
        "6 o’clock",
        "9 p.m.",
        "12 noon",
      ],
      answer: "6 o’clock",
    },
    {
      question:
        "What does Daniel do before breakfast?",
      options: [
        "Brushes teeth and takes a shower",
        "Plays football",
        "Does homework",
      ],
      answer:
        "Brushes teeth and takes a shower",
    },
    {
      question:
        "What does Daniel do in the afternoon?",
      options: [
        "Sleeps",
        "Plays football with friends",
        "Goes to church",
      ],
      answer:
        "Plays football with friends",
    },
    {
      question:
        "What time does Daniel sleep?",
      options: [
        "6 a.m.",
        "9 p.m.",
        "2 p.m.",
      ],
      answer: "9 p.m.",
    },
  ];

  const [answers, setAnswers] =
    useState<string[]>(
      Array(questions.length).fill("")
    );

  const [submitted, setSubmitted] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const handleSelect = (
    questionIndex: number,
    option: string
  ) => {
    if (submitted) return;

    const updated = [...answers];
    updated[questionIndex] = option;

    setAnswers(updated);
  };

  const submitQuiz = () => {
    const finalScore =
      answers.filter(
        (answer, index) =>
          answer ===
          questions[index].answer
      ).length;

    setScore(finalScore);
    setSubmitted(true);

    const passed =
      finalScore >= 7;

    // Sauvegarde quiz 8
    localStorage.setItem(
      "quiz8Score",
      finalScore.toString()
    );

    localStorage.setItem(
      "quiz8Passed",
      passed ? "true" : "false"
    );

    // Débloque lesson 9
    if (passed) {
      localStorage.setItem(
        "lesson8Completed",
        "true"
      );
    }
  };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-red-800 mb-4">
          Quiz 8
        </h1>

        <p className="text-black mb-8">
          Daily Routines
        </p>

        {questions.map(
          (q, index) => (
            <div
              key={index}
              className="mb-8 border-b pb-5"
            >
              <h2 className="font-bold text-lg text-black mb-4">
                {index + 1}.{" "}
                {q.question}
              </h2>

              <div className="space-y-3">
                {q.options.map(
                  (option) => {
                    const isCorrect =
                      option ===
                      q.answer;

                    const isSelected =
                      answers[index] ===
                      option;

                    return (
                      <button
                        key={option}
                        disabled={
                          submitted
                        }
                        onClick={() =>
                          handleSelect(
                            index,
                            option
                          )
                        }
                        className={`w-full text-left px-4 py-3 rounded-xl border
                        ${
                          submitted
                            ? isCorrect
                              ? "bg-green-600 text-white"
                              : isSelected
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-black"
                            : isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        {submitted &&
                        isCorrect
                          ? "✓ "
                          : ""}
                        {submitted &&
                        isSelected &&
                        !isCorrect
                          ? "✗ "
                          : ""}
                        {option}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )
        )}

        {!submitted ? (
          <button
            onClick={submitQuiz}
            className="bg-green-600 text-white px-8 py-4 rounded-2xl"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-green-700">
              Score: {score}/10
            </h2>

            <p className="text-black mt-2">
              {score >= 7
                ? "✅ Passed"
                : "❌ Failed"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}