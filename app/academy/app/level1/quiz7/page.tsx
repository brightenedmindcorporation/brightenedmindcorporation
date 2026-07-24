"use client";

import { useState, useEffect } from "react";

export default function Quiz7Page() {
  const questions = [
  {
    question: "Which one is a day of the week?",
    options: ["Teacher", "Tuesday", "Bottle"],
    answer: "Tuesday",
  },
  {
    question: "Which one is a month?",
    options: ["Friday", "July", "Window"],
    answer: "July",
  },
  {
    question: "How many days are in one week?",
    options: ["Ten", "Seven", "Five"],
    answer: "Seven",
  },
  {
    question: "Which sentence is correct?",
    options: [
      "Monday today is the",
      "Today is Monday",
      "Is Monday the today",
    ],
    answer: "Today is Monday",
  },
  {
    question: "What question asks about a birthday?",
    options: [
      "Where is your bag?",
      "When is your birthday?",
      "What color is your phone?",
    ],
    answer: "When is your birthday?",
  },
  {
    question: "What is the boy’s name in the text?",
    options: ["Kevin", "John", "Peter"],
    answer: "Kevin",
  },
  {
    question: "What day is it in the story?",
    options: ["Sunday", "Friday", "Tuesday"],
    answer: "Friday",
  },
  {
    question: "What is Kevin’s favorite month?",
    options: ["June", "July", "December"],
    answer: "July",
  },
  {
    question: "On what date is Kevin’s birthday?",
    options: ["July 25th", "June 12th", "August 10th"],
    answer: "July 25th",
  },
  {
    question: "What does Kevin do every Sunday?",
    options: [
      "He stays home",
      "He goes to church",
      "He plays football",
    ],
    answer: "He goes to church",
  },
];
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

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

    const firstAttempt = localStorage.getItem("quiz7FirstAttempt");

    if (!firstAttempt) {
      localStorage.setItem("quiz7FirstAttempt", "true");
      localStorage.setItem("quiz7Score", finalScore.toString());

      if (finalScore >= 7) {
        localStorage.setItem("quiz7Passed", "true");
      }
    }

    if (finalScore >= 7) {
      localStorage.setItem("quiz7Passed", "true");
    }
  };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-red-800 mb-4">
          Quiz 7
        </h1>

        <p className="text-black mb-8">
          Days, Months, and Dates
        </p>

        {questions.map((q, index) => (
          <div key={index} className="mb-8 border-b pb-5">
            <h2 className="font-bold text-lg text-black mb-4">
              {index + 1}. {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((option) => {
                const isCorrect = option === q.answer;
                const isSelected = answers[index] === option;

                return (
                  <button
                    key={option}
                    disabled={submitted}
                    onClick={() => handleSelect(index, option)}
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
                    {submitted && isCorrect ? "✓ " : ""}
                    {submitted && isSelected && !isCorrect ? "✗ " : ""}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

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
              {score >= 7 ? "✅ Passed" : "❌ Failed"}
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={() => {
              localStorage.setItem("lesson7Completed", "true");
              window.location.reload();
            }}
            className="bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            ✅ Mark Lesson Complete
          </button>
        </div>

      </div>
    </main>
  );
}