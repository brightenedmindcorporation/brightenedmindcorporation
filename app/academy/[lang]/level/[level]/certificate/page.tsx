"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Trophy, XCircle, CheckCircle2 } from "lucide-react";
import { getLevelCurriculum, availableLanguages } from "@/content/curriculum";
import { getLevelProgress, getOrCreateCertificateId } from "@/lib/academy/progress";
import { syncCertificateIssued } from "@/lib/academy/progressSync";
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
    const enrollment = (student.enrollments || []).find(
      (e: any) => e.langCode === curriculum?.langCode && e.status === "Approved"
    );
    if (!enrollment) {
      router.push("/academy/dashboard");
      return;
    }
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
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-surface-sunken text-ink selection:bg-red-600 selection:text-white">
      <main className="p-6 md:p-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <Link
              href={`/academy/${langSlug}/level/${level}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface hover:bg-surface-alt px-4 py-2 rounded-xl border border-line transition shadow-lg"
            >
              ← Back to Level
            </Link>
          </div>

          <div className="bg-surface rounded-3xl p-8 border border-line shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-black text-center text-ink mb-8 flex items-center justify-center gap-3"><Trophy size={32} /> Certificate</h1>

            {!eligible ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-500 flex items-center justify-center gap-2"><XCircle size={22} /> Access Denied</h2>
                <p className="mt-3 text-ink-soft">Pass the Final Quiz first.</p>
              </div>
            ) : (
              <>
                <div className="bg-surface-sunken border border-line rounded-3xl p-8 text-ink">
                  <h2 className="text-2xl font-bold text-red-500 mb-5">Student Summary</h2>
                  <p><strong className="text-ink">Student:</strong> {studentName}</p>
                  <p><strong className="text-ink">Level:</strong> {curriculum?.levelTitle}</p>
                  <p><strong className="text-ink">Final Average:</strong> {average}%</p>
                  <p><strong className="text-ink">Certificate ID:</strong> {certificateId}</p>
                  <p className="text-emerald-400 font-bold mt-3 flex items-center gap-2"><CheckCircle2 size={16} /> Eligible for Certificate</p>
                </div>

                <div className="text-center mt-8">
                  <CertificateButton
                    studentName={studentName}
                    levelTitle={curriculum?.levelTitle ?? ""}
                    average={average}
                    certificateId={certificateId}
                    onGenerated={() =>
                      syncCertificateIssued({
                        langCode,
                        level,
                        levelTitle: curriculum?.levelTitle ?? "",
                        studentName,
                        average,
                        certificateId,
                      })
                    }
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
