"use client";

import { useState } from "react";

export default function FinalQuizPage() {
  const questions = [
  {
    question: "How do you greet someone in the morning?",
    options: ["Good morning", "Goodbye", "Chicken"],
    answer: "Good morning",
  },
  {
    question: "Choose the correct introduction.",
    options: [
      "My name is Alex",
      "Alex name my is",
      "Name Alex me",
    ],
    answer: "My name is Alex",
  },
  {
    question: "Which letter comes after G?",
    options: ["H", "J", "F"],
    answer: "H",
  },
  {
    question: "How do you write the number 15?",
    options: ["Fifty", "Fifteen", "Five"],
    answer: "Fifteen",
  },
  {
    question: "Who is your father’s daughter?",
    options: ["Your sister", "Your teacher", "Your uncle"],
    answer: "Your sister",
  },
  {
    question: "Which one is an everyday object?",
    options: ["Bottle", "Hospital", "Teacher"],
    answer: "Bottle",
  },
  {
    question: "Which one is a color?",
    options: ["Blue", "Thursday", "Notebook"],
    answer: "Blue",
  },
  {
    question: "Which month comes after April?",
    options: ["May", "January", "July"],
    answer: "May",
  },
  {
    question: "What do you usually do after waking up?",
    options: [
      "Brush your teeth",
      "Go to sleep",
      "Eat dinner",
    ],
    answer: "Brush your teeth",
  },
  {
    question: "Which one is a drink?",
    options: ["Tea", "Rice", "Chicken"],
    answer: "Tea",
  },
  {
    question: "Where do people keep money?",
    options: ["School", "Bank", "Restaurant"],
    answer: "Bank",
  },
  {
    question: "Which one is a hobby?",
    options: ["Swimming", "Hospital", "Window"],
    answer: "Swimming",
  },
  {
    question: "Choose the correct sentence.",
    options: [
      "I like reading books",
      "Books reading I like",
      "Like books I reading",
    ],
    answer: "I like reading books",
  },
  {
    question: "Where do people go when they are sick?",
    options: ["Hospital", "Library", "Market"],
    answer: "Hospital",
  },
  {
    question: "What day comes before Friday?",
    options: ["Thursday", "Sunday", "Monday"],
    answer: "Thursday",
  },
  {
    question: "Read: Sarah eats bread and drinks milk. What does Sarah drink?",
    options: ["Tea", "Milk", "Coffee"],
    answer: "Milk",
  },
  {
    question: "Read: Kevin plays football every Saturday. What is Kevin’s hobby?",
    options: ["Reading", "Football", "Cooking"],
    answer: "Football",
  },
  {
    question: "Choose the correct answer: I ___ to school every day.",
    options: ["go", "goes", "going"],
    answer: "go",
  },
  {
    question: "If someone says 'Nice to meet you', what can you answer?",
    options: [
      "Nice to meet you too",
      "Blue notebook",
      "I am sleeping",
    ],
    answer: "Nice to meet you too",
  },
  {
    question: "Which student is ready for Level 2?",
    options: [
      "A student who understands and uses basic English correctly",
      "A student who answers randomly",
      "A student who skips every lesson",
    ],
    answer:
      "A student who understands and uses basic English correctly",
  },
];

  const [
    answers,
    setAnswers,
  ] = useState<string[]>(
    Array(
      questions.length
    ).fill("")
  );

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const [
    score,
    setScore,
  ] = useState(0);

  const handleSelect = (
    questionIndex: number,
    option: string
  ) => {
    if (submitted)
      return;

    const updated =
      [...answers];

    updated[
      questionIndex
    ] = option;

    setAnswers(updated);
  };

  const submitQuiz =
    () => {
      const finalScore =
        answers.filter(
          (
            answer,
            index
          ) =>
            answer ===
            questions[
              index
            ].answer
        ).length;

      setScore(
        finalScore
      );

      setSubmitted(
        true
      );

      const firstAttempt =
        localStorage.getItem(
          "level1FinalFirstAttempt"
        );

      if (
        !firstAttempt
      ) {
        localStorage.setItem(
          "level1FinalFirstAttempt",
          "true"
        );

        localStorage.setItem(
          "level1FinalScore",
          finalScore.toString()
        );

        if (
          finalScore >=
          15
        ) {
          localStorage.setItem(
            "level1FinalPassed",
            "true"
          );
        }
      }
    };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-red-800 mb-3">
          🎓 Final Quiz
          - Level 1
        </h1>

        <p className="text-black mb-8">
          This quiz
          covers all
          Level 1
          lessons.
        </p>

        {questions.map(
          (
            q,
            index
          ) => (
            <div
              key={
                index
              }
              className="mb-8 border-b pb-5"
            >
              <h2 className="font-bold text-lg text-black mb-4">
                {index +
                  1}
                .{" "}
                {
                  q.question
                }
              </h2>

              <div className="space-y-3">
                {q.options.map(
                  (
                    option
                  ) => {
                    const isCorrect =
                      option ===
                      q.answer;

                    const isSelected =
                      answers[
                        index
                      ] ===
                      option;

                    return (
                      <button
                        key={
                          option
                        }
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

                        {
                          option
                        }
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
            onClick={
              submitQuiz
            }
            className="bg-green-600 text-white px-8 py-4 rounded-2xl"
          >
            Submit Final Quiz
          </button>
        ) : (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-green-700">
              Score:{" "}
              {score}/
              {
                questions.length
              }
            </h2>

            <p className="text-black mt-2">
              {score >=
              15
                ? "✅ Congratulations! You passed the Final Quiz."
                : "❌ Review Level 1 lessons before continuing."}
            </p>

            <div className="mt-4 flex gap-4">

              <button
                onClick={() => {
                  setAnswers(
                    Array(
                      questions.length
                    ).fill(
                      ""
                    )
                  );

                  setSubmitted(
                    false
                  );
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

      </div>
    </main>
  );
}