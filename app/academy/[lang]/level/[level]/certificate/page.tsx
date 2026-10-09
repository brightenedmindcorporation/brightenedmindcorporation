"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getLevelCurriculum, availableLanguages } from "@/content/curriculum";
import { getLevelProgress, getOrCreateCertificateId } from "@/lib/academy/progress";
import CertificateButton from "@/components/academy/CertificateButton";

export default function CertificatePage() {
  const router = useRouter();
  const params = useParams<{ lang: string; level: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);

  const curriculum = getLevelCurriculum(langSlug, level);
  const langCode = availableLanguages.find((l) => l.slug === langSlug)?.code ?? "XX";

  const [studentName, setStudentName] = useState("");
  const [average, setAverage] = useState(0);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [certificateId, setCertificateId] = useState("");

  useEffect(() => {
    const studentData = localStorage.getItem("loggedStudent");
    if (!studentData) {
      router.push("/login");
      return;
    }

    const student = JSON.parse(studentData);
    setStudentName(student.name || "Student");

    const progress = getLevelProgress(langSlug, level);

    if (!progress.finalQuizPassed || !curriculum) {
      setEligible(false);
      setLoading(false);
      return;
    }

    setEligible(true);

    let totalScore = 0;
    let totalPossible = 0;

    for (const quiz of curriculum.quizzes) {
      const score = progress.quizScores[quiz.lessonId];
      if (score !== undefined) {
        totalScore += score;
        totalPossible += quiz.questions.length;
      }
    }

    if (progress.finalQuizScore !== null) {
      totalScore += progress.finalQuizScore;
      totalPossible += curriculum.finalQuiz.questions.length;
    }

    setAverage(totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0);
    setCertificateId(getOrCreateCertificateId(langSlug, level, langCode));
    setLoading(false);
  }, [router, langSlug, level, curriculum, langCode]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-300">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white">
      <main className="p-6 md:p-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <Link
              href={`/academy/${langSlug}/level/${level}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl border border-neutral-800 transition shadow-lg"
            >
              ← Back to Level
            </Link>
          </div>

          <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-black text-center text-white mb-8">🏆 Certificate</h1>

            {!eligible ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-500">❌ Access Denied</h2>
                <p className="mt-3 text-neutral-400">Pass the Final Quiz first.</p>
              </div>
            ) : (
              <>
                <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 text-neutral-200">
                  <h2 className="text-2xl font-bold text-red-500 mb-5">Student Summary</h2>
                  <p><strong className="text-white">Student:</strong> {studentName}</p>
                  <p><strong className="text-white">Level:</strong> {curriculum?.levelTitle}</p>
                  <p><strong className="text-white">Final Average:</strong> {average}%</p>
                  <p><strong className="text-white">Certificate ID:</strong> {certificateId}</p>
                  <p className="text-emerald-400 font-bold mt-3">✅ Eligible for Certificate</p>
                </div>

                <div className="text-center mt-8">
                  <CertificateButton
                    studentName={studentName}
                    levelTitle={curriculum?.levelTitle ?? ""}
                    average={average}
                    certificateId={certificateId}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
