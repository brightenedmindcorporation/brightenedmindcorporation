"use client";

import { useState, useEffect } from "react";

export default function Quiz5Page() {
  const questions = [
    {
      question: "Which object do we use to write?",
      options: ["Bottle", "Pen", "Chair"],
      answer: "Pen",
    },
    {
      question: "Which object can we use to call someone?",
      options: ["Phone", "Book", "Table"],
      answer: "Phone",
    },
    {
      question: "Where do students usually carry books?",
      options: ["Bag", "Bottle", "Key"],
      answer: "Bag",
    },
    {
      question: "Which sentence is correct?",
      options: [
        "This is my book",
        "Book my this is",
        "Is this book me",
      ],
      answer: "This is my book",
    },
    {
      question: "What can be heavy?",
      options: ["Bag", "Smile", "Air"],
      answer: "Bag",
    },
    {
      question: "What is the boy’s name in the text?",
      options: ["Peter", "Daniel", "Tom"],
      answer: "Peter",
    },
    {
      question: "Where does Peter go every day?",
      options: ["School", "Hospital", "Market"],
      answer: "School",
    },
    {
      question: "What does Peter use to write?",
      options: ["Pen", "Bottle", "Computer"],
      answer: "Pen",
    },
    {
      question: "Where is Peter’s phone?",
      options: ["In his bag", "On the roof", "Under the chair"],
      answer: "In his bag",
    },
    {
      question: "What does Peter sit on?",
      options: ["Chair", "Table", "Bottle"],
      answer: "Chair",
    },
  ];

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const alreadyDone = localStorage.getItem("quiz5Submitted");

    if (alreadyDone === "true") {
      setSubmitted(true);

      const savedScore = localStorage.getItem("quiz5Score");
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

    const firstAttempt = localStorage.getItem("quiz5FirstAttempt");

    if (!firstAttempt) {
      localStorage.setItem("quiz5FirstAttempt", "true");
      localStorage.setItem("quiz5Score", finalScore.toString());

      if (finalScore >= 7) {
        localStorage.setItem("quiz5Passed", "true");
      }
    }

    if (finalScore >= 7) {
      localStorage.setItem("quiz5Passed", "true");
    }
  };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-red-800 mb-4">
          Quiz 5
        </h1>

        <p className="text-black mb-8">
          Everyday Objects
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
              localStorage.setItem("lesson5Completed", "true");
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