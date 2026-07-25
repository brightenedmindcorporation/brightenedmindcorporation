"use client";

import { useState, useEffect } from "react";

export default function Quiz3Page() {
  const questions = [
  {
    question: "What is number 5 in English?",
    options: ["Seven", "Five", "Four"],
    answer: "Five",
  },
  {
    question: "What is number 8 in English?",
    options: ["Three", "Ten", "Eight"],
    answer: "Eight",
  },
  {
    question: "Which question asks for age?",
    options: [
      "What is your name?",
      "How old are you?",
      "Where is the book?",
    ],
    answer: "How old are you?",
  },
  {
    question: "Which sentence is correct?",
    options: [
      "David my is name",
      "My name is David",
      "Is David me",
    ],
    answer: "My name is David",
  },
  {
    question: "What do we use to contact someone online?",
    options: [
      "Television",
      "Email address",
      "Banana",
    ],
    answer: "Email address",
  },
  {
    question: "What is the girl's name in the text?",
    options: ["Mary", "Sarah", "Anna"],
    answer: "Sarah",
  },
  {
    question: "How old is Sarah?",
    options: [
      "18 years old",
      "14 years old",
      "10 years old",
    ],
    answer: "14 years old",
  },
  {
    question: "Where does Sarah live?",
    options: ["London", "Paris", "Kinshasa"],
    answer: "Kinshasa",
  },
  {
    question: "What is Sarah's phone number?",
    options: [
      "123456789",
      "987654321",
      "555666777",
    ],
    answer: "987654321",
  },
  {
    question: "Which information is personal information?",
    options: [
      "Blue chair",
      "Football",
      "Phone number",
    ],
    answer: "Phone number",
  },
];

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const alreadyDone =
      localStorage.getItem("quiz3Submitted");

    if (alreadyDone === "true") {
      setSubmitted(true);

      const savedScore =
        localStorage.getItem("quiz3Score");

      if (savedScore) {
        setScore(Number(savedScore));
      }
    }
  }, []);

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

    const firstAttempt =
      localStorage.getItem(
        "quiz3FirstAttempt"
      );

    if (!firstAttempt) {
      localStorage.setItem(
        "quiz3FirstAttempt",
        "true"
      );

      localStorage.setItem(
        "quiz3Score",
        finalScore.toString()
      );

      if (finalScore >= 7) {
        localStorage.setItem(
          "quiz3Passed",
          "true"
        );
      }
    }

    if (finalScore >= 7) {
      localStorage.setItem(
        "quiz3Passed",
        "true"
      );
    }
  };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-red-800 mb-4">
          Quiz 3
        </h1>

        <p className="text-black mb-8">
          Numbers and Personal Information
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
                    {submitted && isCorrect
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
                ? "✅ Passed"
                : "❌ Failed"}
            </p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  setAnswers(
                    Array(
                      questions.length
                    ).fill("")
                  );
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
              localStorage.setItem(
                "lesson3Completed",
                "true"
              );

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