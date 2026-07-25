"use client";

import { useState } from "react";

export default function Quiz11Page() {
  const questions = [
    {
      question: "Which one is a hobby?",
      options: [
        "Hospital",
        "Drawing",
        "Kitchen",
      ],
      answer: "Drawing",
    },
    {
      question: "Which sentence is correct?",
      options: [
        "I enjoy playing football",
        "Playing football enjoy I",
        "Football I playing enjoy",
      ],
      answer:
        "I enjoy playing football",
    },
    {
      question:
        "What do hobbies often do for people?",
      options: [
        "Help them relax",
        "Make food grow",
        "Change the weather",
      ],
      answer:
        "Help them relax",
    },
    {
      question:
        "Which one is a free time activity?",
      options: [
        "Swimming",
        "Police station",
        "Notebook",
      ],
      answer: "Swimming",
    },
    {
      question:
        "What question asks about interests?",
      options: [
        "What do you like doing?",
        "Where is the market?",
        "How old are you?",
      ],
      answer:
        "What do you like doing?",
    },
    {
      question:
        "Who did James visit on Saturday?",
      options: [
        "His cousin Daniel",
        "His teacher",
        "His uncle",
      ],
      answer:
        "His cousin Daniel",
    },
    {
      question:
        "What was Daniel doing when James arrived?",
      options: [
        "Playing football",
        "Reading a book",
        "Cooking dinner",
      ],
      answer:
        "Reading a book",
    },
    {
      question:
        "Where did the boys play football?",
      options: [
        "At school",
        "In the neighborhood park",
        "At the restaurant",
      ],
      answer:
        "In the neighborhood park",
    },
    {
      question:
        "What was Daniel’s sister doing?",
      options: [
        "Drawing",
        "Swimming",
        "Watching television",
      ],
      answer: "Drawing",
    },
    {
      question:
        "What is Daniel’s favorite hobby?",
      options: [
        "Reading books",
        "Listening to music",
        "Playing video games",
      ],
      answer:
        "Reading books",
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
        "quiz11FirstAttempt"
      );

    if (!firstAttempt) {
      localStorage.setItem(
        "quiz11FirstAttempt",
        "true"
      );

      localStorage.setItem(
        "quiz11Score",
        finalScore.toString()
      );
    }

    if (finalScore >= 7) {
      localStorage.setItem(
        "quiz11Passed",
        "true"
      );

      localStorage.setItem(
        "lesson11Completed",
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
          Quiz 11
        </h1>

        <p className="text-black mb-8">
          Hobbies and Interests
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
                ? "✅ Passed - Lesson 12 Unlocked!"
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