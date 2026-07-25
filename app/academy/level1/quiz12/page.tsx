"use client";

import { useState } from "react";

export default function Quiz12Page() {
  const questions = [
    {
      question: "How do you politely greet someone?",
      options: [
        "Hello",
        "Banana",
        "Window",
      ],
      answer: "Hello",
    },
    {
      question:
        "Which sentence introduces yourself correctly?",
      options: [
        "My name is Daniel",
        "Daniel my name",
        "Name Daniel is me",
      ],
      answer:
        "My name is Daniel",
    },
    {
      question:
        "Which one is a hobby?",
      options: [
        "Reading books",
        "Hospital",
        "Bottle",
      ],
      answer:
        "Reading books",
    },
    {
      question:
        "Where do people buy vegetables?",
      options: [
        "Airport",
        "Market",
        "Library",
      ],
      answer: "Market",
    },
    {
      question:
        "Which one is a drink?",
      options: [
        "Rice",
        "Tea",
        "Chicken",
      ],
      answer: "Tea",
    },
    {
      question:
        "Who traveled with Kevin?",
      options: [
        "His family",
        "His teacher",
        "His classmates",
      ],
      answer:
        "His family",
    },
    {
      question:
        "What did Kevin eat before leaving home?",
      options: [
        "Fish and rice",
        "Bread and tea",
        "Chicken and juice",
      ],
      answer:
        "Bread and tea",
    },
    {
      question:
        "Where did Kevin go with his cousin?",
      options: [
        "The market",
        "The hospital",
        "The library",
      ],
      answer:
        "The market",
    },
    {
      question:
        "What did they do in the afternoon?",
      options: [
        "Played football and listened to music",
        "Went to school",
        "Watched television",
      ],
      answer:
        "Played football and listened to music",
    },
    {
      question:
        "What did Kevin say at the end of the day?",
      options: [
        "He enjoyed spending time with family",
        "He was angry all day",
        "He wanted to leave early",
      ],
      answer:
        "He enjoyed spending time with family",
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
    if (submitted) return;

    const finalScore =
      answers.filter(
        (answer, index) =>
          answer ===
          questions[index].answer
      ).length;

    setScore(finalScore);
    setSubmitted(true);

    const firstAttempt =
      localStorage.getItem(
        "quiz12FirstAttempt"
      );

    if (!firstAttempt) {
      localStorage.setItem(
        "quiz12FirstAttempt",
        "true"
      );

      localStorage.setItem(
        "quiz12Score",
        finalScore.toString()
      );
    }

    if (finalScore >= 7) {
      localStorage.setItem(
        "quiz12Passed",
        "true"
      );

      localStorage.setItem(
        "lesson12Completed",
        "true"
      );
    }
  };

  const restartQuiz = () => {
    setAnswers(
      Array(questions.length).fill("")
    );

    setSubmitted(false);
    setScore(0);
  };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-red-800 mb-4">
          Quiz 12
        </h1>

        <p className="text-black mb-8">
          Final Review and Real-Life
          Conversation
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
                      answers[
                        index
                      ] === option;

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
                ? "✅ Passed - Final Quiz Unlocked!"
                : "❌ Failed"}
            </p>

            <button
              onClick={
                restartQuiz
              }
              className="mt-5 bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              🔄 Restart Quiz
            </button>
          </div>
        )}
      </div>
    </main>
  );
}