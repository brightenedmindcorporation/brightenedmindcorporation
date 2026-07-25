"use client";

import { useState } from "react";

export default function Quiz10Page() {
  const questions = [
    {
      question: "Where do people usually buy food?",
      options: ["Market", "Library", "Hospital"],
      answer: "Market",
    },
    {
      question: "Which place helps sick people?",
      options: ["Bank", "Hospital", "Restaurant"],
      answer: "Hospital",
    },
    {
      question: "Which sentence is correct?",
      options: [
        "The market is near the church",
        "Near church market the is",
        "Church the near market is",
      ],
      answer: "The market is near the church",
    },
    {
      question: "Where can children play?",
      options: ["Police station", "Park", "Bank"],
      answer: "Park",
    },
    {
      question: "Where do people keep money?",
      options: ["Restaurant", "School", "Bank"],
      answer: "Bank",
    },
    {
      question: "Who went to town with Michael?",
      options: [
        "His father",
        "His teacher",
        "His sister",
      ],
      answer: "His father",
    },
    {
      question:
        "Why did Michael’s father stop at the bank?",
      options: [
        "To withdraw money",
        "To buy food",
        "To see a doctor",
      ],
      answer: "To withdraw money",
    },
    {
      question:
        "What did they buy at the market?",
      options: [
        "Books and pens",
        "Fruit and vegetables",
        "Shoes and clothes",
      ],
      answer: "Fruit and vegetables",
    },
    {
      question:
        "What did Michael see near the police station?",
      options: [
        "A hospital",
        "A school",
        "A park",
      ],
      answer: "A hospital",
    },
    {
      question:
        "How did Michael feel about the town?",
      options: [
        "He liked it because everything was easy to find",
        "He was afraid of it",
        "He wanted to leave quickly",
      ],
      answer:
        "He liked it because everything was easy to find",
    },
  ];

  const [answers, setAnswers] = useState<string[]>(
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

    const finalScore = answers.filter(
      (answer, index) =>
        answer === questions[index].answer
    ).length;

    setScore(finalScore);
    setSubmitted(true);

    // Save first attempt
    const firstAttempt =
      localStorage.getItem(
        "quiz10FirstAttempt"
      );

    if (!firstAttempt) {
      localStorage.setItem(
        "quiz10FirstAttempt",
        "true"
      );

      localStorage.setItem(
        "quiz10Score",
        finalScore.toString()
      );
    }

    // PASS CONDITION
    if (finalScore >= 7) {
      localStorage.setItem(
        "quiz10Passed",
        "true"
      );

      // Mark lesson completed
      localStorage.setItem(
        "lesson10Completed",
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
          Quiz 10
        </h1>

        <p className="text-black mb-8">
          Places in Town
        </p>

        {questions.map((q, index) => (
          <div
            key={index}
            className="mb-8 border-b pb-5"
          >
            <h2 className="font-bold text-lg text-black mb-4">
              {index + 1}. {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((option) => {
                const isCorrect =
                  option === q.answer;

                const isSelected =
                  answers[index] === option;

                return (
                  <button
                    key={option}
                    disabled={submitted}
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
              {score >= 7
                ? "✅ Passed - Lesson 11 Unlocked!"
                : "❌ Failed"}
            </p>

            <button
              onClick={restartQuiz}
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