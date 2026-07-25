"use client";

import React, { useState, use } from "react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

// Fonction utilitaire pour mélanger un tableau d'assertions
function shuffleOptions(question: Question) {
  const optionsWithIndices = question.options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === question.correctIndex,
  }));
  
  // Algorithme de mélange rapide
  for (let i = optionsWithIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
  }
  
  return optionsWithIndices;
}

export default function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = use(params);
  const isFinalQuiz = quizId === "final";

  // Exemple de questions sur 10 points
  const sampleQuestions: Question[] = [
    {
      id: 1,
      text: "Quelle est la règle fondamentale d'accès aux modules BMCA ?",
      options: [
        "Chaque leçon et son test doivent être validés dans l'ordre",
        "Toutes les leçons sont accessibles en libre accès dès le début",
        "Seul le quiz final est obligatoire",
        "L'accès est débloqué sans approbation préalable"
      ],
      correctIndex: 0
    },
    {
      id: 2,
      text: "Quel est le format officiel du matricule attribué par l'administrateur ?",
      options: [
        "BMCA-2026-000",
        "STUDENT-2026-ABC",
        "BM-ACADEMY-100",
        "ID-2026-00"
      ],
      correctIndex: 0
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (qId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation du calcul de la note sur 10
    setScore(10); 
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
      <div className="border-b pb-4 mb-6">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          {isFinalQuiz ? "Évaluation Finale Globale" : `Test de Validation — Leçon ${quizId}`}
        </span>
        <h1 className="text-2xl font-bold mt-1">
          {isFinalQuiz ? "Quiz Global (12 Leçons)" : `Quiz Leçon ${quizId} (Noté sur 10)`}
        </h1>
      </div>

      {score !== null ? (
        <div className="text-center py-8 space-y-4">
          <div className="inline-block p-4 bg-green-100 text-green-800 rounded-full text-3xl font-extrabold">
            {score} / 10
          </div>
          <h2 className="text-xl font-bold text-slate-800">Félicitations ! Test validé.</h2>
          <p className="text-slate-600">
            {isFinalQuiz
              ? "Vous avez réussi le test global ! Votre certificat est maintenant disponible."
              : `La leçon suivante a été déverrouillée dans votre parcours.`}
          </p>
          <div className="pt-4">
            {isFinalQuiz ? (
              <Link
                href="/academy/certificate"
                className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
              >
                Obtenir mon Certificat
              </Link>
            ) : (
              <Link
                href={`/academy/courses/lesson-${Number(quizId) + 1}`}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Passer à la Leçon {Number(quizId) + 1} →
              </Link>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {sampleQuestions.map((q) => {
            const shuffledOptions = shuffleOptions(q);
            return (
              <div key={q.id} className="p-4 bg-slate-50 rounded-lg border">
                <p className="font-semibold text-slate-800 mb-3">{q.id}. {q.text}</p>
                <div className="space-y-2">
                  {shuffledOptions.map((opt, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-white rounded border cursor-pointer hover:bg-blue-50 transition"
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        onChange={() => handleSelect(q.id, idx)}
                      />
                      <span className="text-sm text-slate-700">{opt.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Valider et soumettre le test
          </button>
        </form>
      )}
    </div>
  );
}