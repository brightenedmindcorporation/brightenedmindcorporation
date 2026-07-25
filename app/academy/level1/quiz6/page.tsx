"use client";

import { useState, useEffect } from "react";

export default function Quiz6Page() {
  const questions = [
  {
    question: "Which one is a color?",
    options: ["Doctor", "Blue", "Table"],
    answer: "Blue",
  },
  {
    question: "Which sentence is correct?",
    options: [
      "Bag is red the",
      "The bag is red",
      "Red bag the is",
    ],
    answer: "The bag is red",
  },
  {
    question: "Which adjective describes size?",
    options: ["Bottle", "Big", "Monday"],
    answer: "Big",
  },
  {
    question: "What color is often opposite to black?",
    options: ["Green", "White", "Orange"],
    answer: "White",
  },
  {
    question: "Which adjective describes a person?",
    options: ["Notebook", "Window", "Friendly"],
    answer: "Friendly",
  },
  {
    question: "What is the girl’s name in the text?",
    options: ["Sarah", "Lisa", "Anna"],
    answer: "Lisa",
  },
  {
    question: "What color is Lisa’s school bag?",
    options: ["Yellow", "Blue", "Black"],
    answer: "Blue",
  },
  {
    question: "What color is Lisa’s phone?",
    options: ["Red", "Green", "Black"],
    answer: "Black",
  },
  {
    question: "How is Lisa described?",
    options: [
      "Tall and silent",
      "Happy and friendly",
      "Angry and tired",
    ],
    answer: "Happy and friendly",
  },
  {
    question: "How is Lisa’s brother?",
    options: [
      "Quiet and sad",
      "Short and strong",
      "Tall and weak",
    ],
    answer: "Short and strong",
  },
];

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const alreadyDone = localStorage.getItem("quiz6Submitted");

    if (alreadyDone === "true") {
      setSubmitted(true);

      const savedScore = localStorage.getItem("quiz6Score");
      if (savedScore) setScore(Number(savedScore));
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

    const firstAttempt = localStorage.getItem("quiz6FirstAttempt");

    if (!firstAttempt) {
      localStorage.setItem("quiz6FirstAttempt", "true");
      localStorage.setItem("quiz6Score", finalScore.toString());

      if (finalScore >= 7) {
        localStorage.setItem("quiz6Passed", "true");
      }
    }

    if (finalScore >= 7) {
      localStorage.setItem("quiz6Passed", "true");
    }
  };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-red-800 mb-4">
          Quiz 6
        </h1>

        <p className="text-black mb-8">
          Colors and Descriptions
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

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  setAnswers(Array(questions.length).fill(""));
                  setSubmitted(false);
                }}
                className="bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                🔄 Restart Quiz
              </button>

              <p className="text-red-700 font-bold mt-3">
                Only the first attempt is recorded.
              </p>
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={() => {
              localStorage.setItem("lesson6Completed", "true");
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