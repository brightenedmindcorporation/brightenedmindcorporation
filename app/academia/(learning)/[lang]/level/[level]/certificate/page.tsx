"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Trophy, XCircle, CheckCircle2 } from "lucide-react";
import { getLevelCurriculum, findProgramBySlug } from "@/content/curriculum";
import { pullProgress } from "@/lib/academy/progressSync";
import { summarizeLevel } from "@/lib/academy/levelSummary";
import { getLevelProgress, getOrCreateCertificateId } from "@/lib/academy/progress";
import { syncCertificateIssued } from "@/lib/academy/progressSync";
import CertificateButton from "@/components/academy/CertificateButton";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function CertificatePage() {
  const router = useRouter();
  const params = useParams<{ lang: string; level: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);

  const curriculum = getLevelCurriculum(langSlug, level);
  const langCode = findProgramBySlug(langSlug)?.code ?? "XX";

  const [studentName, setStudentName] = useState("");
  const [average, setAverage] = useState(0);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [certificateId, setCertificateId] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    let alive = true;
    const run = () => {
    if (!alive) return;
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
      router.push(`/login?program=${curriculum?.langCode ?? ""}`);
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

    // Same maths as the student's file: every quiz out of 100 (écoute, questions, écrit), then the mean.
    setAverage(summarizeLevel(curriculum, progress as any).average ?? 0);
    // Le Student ID (matricule d'inscription) et le numéro du certificat
    // sont deux identifiants distincts. Le numéro est attribué une seule
    // fois côté serveur ; repli local seulement si le serveur est injoignable.
    setStudentId(enrollment.matricule || "");
    const fallbackNumber = getOrCreateCertificateId(langSlug, level, langCode);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      try {
        if (!user) throw new Error("not signed in");
        const idToken = await user.getIdToken();
        const response = await fetch("/api/academy/certificates/number", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, langCode, level }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Erreur serveur");
        setCertificateId(result.certificateId);
      } catch (error) {
        console.error("Certificate number fallback:", error);
        setCertificateId(fallbackNumber);
      } finally {
        setLoading(false);
      }
    });
    };
    // Scores set by the administration reach this device before the certificate is drawn.
    pullProgress(langSlug, curriculum?.langCode, level).then(run);
    return () => {
      alive = false;
    };
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
      <main className="p-6 md:p-10 pt-28 md:pt-28">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <Link
              href={`/academia/${langSlug}/level/${level}`}
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
                  <p><strong className="text-ink">Student ID:</strong> {studentId || "—"}</p>
                  <p><strong className="text-ink">Certificate Number:</strong> {certificateId}</p>
                  <p className="text-emerald-400 font-bold mt-3 flex items-center gap-2"><CheckCircle2 size={16} /> Eligible for Certificate</p>
                </div>

                <div className="text-center mt-8">
                  <CertificateButton
                    studentName={studentName}
                    levelTitle={curriculum?.levelTitle ?? ""}
                    average={average}
                    certificateId={certificateId}
                    studentId={studentId}
                    onGenerated={() =>
                      syncCertificateIssued({
                        langCode,
                        level,
                        levelTitle: curriculum?.levelTitle ?? "",
                        studentName,
                        average,
                        certificateId,
                        studentId,
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
