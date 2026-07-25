"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function QuizPage() {
  const [answers, setAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [studentMatricule, setStudentMatricule] = useState("");

  useEffect(() => {
    const m = localStorage.getItem("studentMatricule") || "UNKNOWN";
    setStudentMatricule(m);
  }, []);

  const questions = [
    {
      id: 1,
      question: "What is 'Good Morning' in French?",
      options: ["Bonsoir", "Bonjour", "Bonne nuit"],
      correct: "Bonjour",
    },
    {
      id: 2,
      question: "How do you say 'Thank you' in English?",
      options: ["Hello", "Please", "Thank you"],
      correct: "Thank you",
    },
    {
      id: 3,
      question: "Choose the correct greeting:",
      options: ["Good Morning", "Table", "Chair"],
      correct: "Good Morning",
    },
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let total = 0;

      questions.forEach((q) => {
        if (answers[q.id] === q.correct) {
          total++;
        }
      });

      setScore(total);

      const passed = total >= 2;

      // 🔥 SAVE QUIZ LINKED TO STUDENT
      await addDoc(collection(db, "quizResults"), {
        studentMatricule,
        level: "Level 1",
        lesson: "Quiz 1",
        score: total,
        total: questions.length,
        passed,
        createdAt: new Date(),
      });

      alert("Quiz saved for " + studentMatricule);

    } catch (error) {
      console.error("Quiz error:", error);
      alert("Error saving quiz");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-red-50 p-8">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-3xl font-bold text-red-800 text-center">
          Level 1 Quiz
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Student: <b>{studentMatricule}</b>
        </p>

        <div className="mt-8 space-y-8">

          {questions.map((q) => (
            <div key={q.id} className="border p-5 rounded-xl">

              <h2 className="font-bold text-black">
                {q.question}
              </h2>

              <div className="mt-3 space-y-2">
                {q.options.map((opt) => (
                  <label key={opt} className="block text-black">

                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [q.id]: opt,
                        })
                      }
                    />

                    {" "}{opt}
                  </label>
                ))}
              </div>

            </div>
          ))}

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-700 text-white py-3 rounded-xl mt-6"
        >
          {loading ? "Saving..." : "Submit Quiz"}
        </button>

        {score !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Score: {score}/{questions.length}
            </h2>

            {score >= 2 ? (
              <p className="text-green-700">Passed</p>
            ) : (
              <p className="text-red-600">Failed</p>
            )}
          </div>
        )}

      </div>

    </main>
  );
}