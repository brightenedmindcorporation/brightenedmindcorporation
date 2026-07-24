"use client";

import { useState } from "react";

export default function Quiz9Page() {
  const questions = [
    {
      question: "Which one is a drink?",
      options: ["Bread", "Juice", "Fish"],
      answer: "Juice",
    },
    {
      question: "Who did Emma visit?",
      options: ["Her teacher", "Her grandmother", "Her friend"],
      answer: "Her grandmother",
    },
    {
      question: "Where was Emma’s grandmother preparing lunch?",
      options: ["In the kitchen", "At school", "In the car"],
      answer: "In the kitchen",
    },
    {
      question: "Which food was on the table?",
      options: [
        "Rice, chicken, fish and vegetables",
        "Pizza and cake",
        "Only bread and tea",
      ],
      answer: "Rice, chicken, fish and vegetables",
    },
    {
      question: "Which sentence is correct?",
      options: [
        "She drank fruit juice",
        "Fruit drank she juice",
        "Juice she fruit drink",
      ],
      answer: "She drank fruit juice",
    },
    {
      question: "What did Emma drink during the meal?",
      options: ["Coffee", "Fruit juice", "Milk"],
      answer: "Fruit juice",
    },
    {
      question: "What happened after lunch?",
      options: [
        "She went to school",
        "She received a banana and water",
        "She played football",
      ],
      answer: "She received a banana and water",
    },
    {
      question: "Which one is a fruit?",
      options: ["Banana", "Notebook", "Chair"],
      answer: "Banana",
    },
    {
      question: "How did Emma feel at the end?",
      options: ["Angry", "Happy", "Tired"],
      answer: "Happy",
    },
    {
      question: "Why was Emma smiling?",
      options: [
        "Because she enjoyed the delicious food",
        "Because she lost her bag",
        "Because she was late",
      ],
      answer: "Because she enjoyed the delicious food",
    },
  ];

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

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
        "quiz9FirstAttempt"
      );

    if (!firstAttempt) {
      localStorage.setItem(
        "quiz9FirstAttempt",
        "true"
      );

      localStorage.setItem(
        "quiz9Score",
        finalScore.toString()
      );
    }

    // PASS CONDITION
    if (finalScore >= 7) {
      localStorage.setItem(
        "quiz9Passed",
        "true"
      );

      // Mark lesson completed
      localStorage.setItem(
        "lesson9Completed",
        "true"
      );

      // Reload after short delay
      setTimeout(() => {
        window.location.href =
          "/level1";
      }, 1500);
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
          Quiz 9
        </h1>

        <p className="text-black mb-8">
          Food and Drinks
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
                ? "✅ Passed - Lesson 10 Unlocked!"
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