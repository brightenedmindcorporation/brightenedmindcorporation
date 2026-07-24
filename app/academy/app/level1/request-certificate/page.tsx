"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

export default function RequestCertificatePage() {
  const router = useRouter();

  const [studentName, setStudentName] =
    useState("");

  const [average, setAverage] =
    useState(0);

  const [eligible, setEligible] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [
    certificateId,
    setCertificateId,
  ] = useState("");

  useEffect(() => {
    const studentData =
      localStorage.getItem(
        "loggedStudent"
      );

    if (!studentData) {
      router.push("/login");
      return;
    }

    const student =
      JSON.parse(studentData);

    setStudentName(
      student.name ||
        "Student"
    );

    const finalPassed =
      localStorage.getItem(
        "level1FinalPassed"
      );

    if (
      finalPassed !==
      "true"
    ) {
      setEligible(false);
      setLoading(false);
      return;
    }

    setEligible(true);

    let totalScore = 0;
    let totalPossible = 0;

    // Normal quizzes (10 questions each)
    for (
      let i = 1;
      i <= 12;
      i++
    ) {
      const score =
        localStorage.getItem(
          `quiz${i}Score`
        );

      if (score) {
        totalScore +=
          Number(score);

        totalPossible +=
          10;
      }
    }

    // Final quiz (20 questions)
    const finalScore =
      localStorage.getItem(
        "level1FinalScore"
      );

    if (finalScore) {
      totalScore +=
        Number(
          finalScore
        );

      totalPossible +=
        20;
    }

    const avg =
      totalPossible > 0
        ? Math.round(
            (totalScore /
              totalPossible) *
              100
          )
        : 0;

    setAverage(avg);

    // Persistent certificate ID
    const existingId =
      localStorage.getItem(
        "level1CertificateId"
      );

    if (existingId) {
      setCertificateId(
        existingId
      );
    } else {
      const year =
        new Date().getFullYear();

      const randomId =
        `BMCA-ENG-L1-${year}-${Math.floor(
          Math.random() *
            100000
        )}`;

      localStorage.setItem(
        "level1CertificateId",
        randomId
      );

      setCertificateId(
        randomId
      );
    }

    setLoading(false);
  }, [router]);

  const generateCertificate =
    () => {
      const doc =
        new jsPDF(
          "landscape",
          "mm",
          "a4"
        );

      const today =
        new Date();

      const date =
        today.toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month:
              "long",
            day: "numeric",
          }
        );

      // Background
      doc.setFillColor(
        255,
        248,
        240
      );

      doc.rect(
        0,
        0,
        297,
        210,
        "F"
      );

      // Border
      doc.setDrawColor(
        180,
        0,
        0
      );

      doc.setLineWidth(
        2
      );

      doc.rect(
        10,
        10,
        277,
        190
      );

      // Title
      doc.setFont(
        "times",
        "bold"
      );

      doc.setTextColor(
        150,
        0,
        0
      );

      doc.setFontSize(
        26
      );

      doc.text(
        "BRIGHTENED MIND CORPORATION ACADEMY",
        148,
        28,
        {
          align:
            "center",
        }
      );

      doc.setFontSize(
        20
      );

      doc.text(
        "CERTIFICATE OF ACHIEVEMENT",
        148,
        45,
        {
          align:
            "center",
        }
      );

      // Body
      doc.setFont(
        "times",
        "normal"
      );

      doc.setFontSize(
        16
      );

      doc.setTextColor(
        0,
        0,
        0
      );

      doc.text(
        "This certificate is proudly presented to",
        148,
        65,
        {
          align:
            "center",
        }
      );

      // Student name
      doc.setFont(
        "times",
        "bold"
      );

      doc.setFontSize(
        30
      );

      doc.setTextColor(
        180,
        0,
        0
      );

      doc.text(
        studentName.toUpperCase(),
        148,
        88,
        {
          align:
            "center",
        }
      );

      // Description
      doc.setFont(
        "times",
        "normal"
      );

      doc.setFontSize(
        16
      );

      doc.setTextColor(
        0,
        0,
        0
      );

      doc.text(
        "for successfully completing",
        148,
        105,
        {
          align:
            "center",
        }
      );

      doc.setFont(
        "times",
        "bold"
      );

      doc.setFontSize(
        22
      );

      doc.text(
        "LEVEL 1 - BEGINNER ENGLISH",
        148,
        118,
        {
          align:
            "center",
        }
      );

      doc.setFont(
        "times",
        "normal"
      );

      doc.setFontSize(
        15
      );

      doc.text(
        `Final Average: ${average}%`,
        148,
        132,
        {
          align:
            "center",
        }
      );

      doc.text(
        `Issued on ${date}`,
        148,
        143,
        {
          align:
            "center",
        }
      );

      doc.setFont(
        "courier",
        "bold"
      );

      doc.setFontSize(
        13
      );

      doc.text(
        `Certificate ID: ${certificateId}`,
        148,
        154,
        {
          align:
            "center",
        }
      );

      // Signature lines
      doc.line(
        50,
        172,
        95,
        172
      );

      doc.line(
        202,
        172,
        247,
        172
      );

      doc.setFont(
        "times",
        "bold"
      );

      doc.setFontSize(
        13
      );

      doc.text(
        "Jordi MUKOSA",
        60,
        180
      );

      doc.text(
        "Jacques RACIAL",
        208,
        180
      );

      doc.setFont(
        "times",
        "italic"
      );

      doc.setFontSize(
        11
      );

      doc.text(
        "Director",
        67,
        186
      );

      doc.text(
        "Academic Supervisor",
        205,
        186
      );

      doc.save(
        `${studentName}-certificate.pdf`
      );
    };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-red-800 mb-8">
          🏆 Certificate
        </h1>

        {!eligible ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-700">
              ❌ Access Denied
            </h2>

            <p className="mt-3 text-black">
              Pass the Final Quiz first.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-red-50 border rounded-3xl p-8 text-black">

              <h2 className="text-2xl font-bold text-red-800 mb-5">
                Student Summary
              </h2>

              <p>
                <strong>
                  Student:
                </strong>{" "}
                {studentName}
              </p>

              <p>
                <strong>
                  Level:
                </strong>{" "}
                Level 1
              </p>

              <p>
                <strong>
                  Final Average:
                </strong>{" "}
                {average}%
              </p>

              <p>
                <strong>
                  Certificate ID:
                </strong>{" "}
                {certificateId}
              </p>

              <p className="text-green-700 font-bold mt-3">
                ✅ Eligible for Certificate
              </p>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={
                  generateCertificate
                }
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-2xl text-lg font-bold"
              >
                📥 Download Certificate
              </button>
            </div>
          </>
        )}

      </div>
    </main>
  );
}