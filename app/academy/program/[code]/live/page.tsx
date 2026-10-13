"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { otherPrograms } from "@/content/programs";
import StudentLiveRoom from "@/components/academy/StudentLiveRoom";

// Mirrors app/academy/[lang]/level/[level]/live/page.tsx for the non-language
// formations (Bureautique, Visuel & Audiovisuel, Logiciels de Gestion), which
// have no curriculum/levels — the admin always schedules these under a
// single "level 1" room, so this page is keyed directly by program code
// instead of a [lang]/[level] pair.
const LEVEL = 1;

export default function ProgramLiveClassPage() {
  const router = useRouter();
  const params = useParams<{ code: string }>();
  const code = params.code?.toUpperCase();
  const program = otherPrograms.find((p) => p.code === code);

  const [allowed, setAllowed] = useState(false);
  const [studentName, setStudentName] = useState("Élève");

  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem("loggedStudent");
      if (!savedStudent) {
        router.push("/login");
        return;
      }
      const parsed = JSON.parse(savedStudent);
      const enrollment = (parsed.enrollments || []).find(
        (e: any) => e.langCode === code && e.status === "Approved"
      );
      if (!enrollment) {
        router.push(`/login?program=${code ?? ""}`);
        return;
      }
      setStudentName(parsed.name || parsed.email || "Élève");
      setAllowed(true);
    } catch (error) {
      console.error("Erreur lors de la vérification de la session :", error);
      router.push("/login");
    }
  }, [router, code]);

  if (!program) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft text-center px-6">
        <div>
          <p className="text-2xl font-bold text-ink mb-2">Formation introuvable</p>
          <Link href="/academy/dashboard" className="inline-block mt-6 text-red-500 hover:text-red-400 font-semibold">
            ← Retour au dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (!allowed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-ink-soft">Checking access...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-surface-sunken text-ink selection:bg-red-600 selection:text-white">
      <main className="p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-6">
          <Link
            href="/academy/dashboard"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface hover:bg-surface-alt px-4 py-2 rounded-xl border border-line transition shadow-lg"
          >
            ← Back to Dashboard
          </Link>

          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-red-50 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              Classe en direct
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{program.label}</p>
          </div>

          <StudentLiveRoom langCode={program.code} level={LEVEL} studentName={studentName} />
        </div>
      </main>
    </div>
  );
}
