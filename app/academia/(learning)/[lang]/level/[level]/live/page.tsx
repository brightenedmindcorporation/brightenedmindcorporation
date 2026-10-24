"use client";

import { canAccessLevel } from "@/lib/academy/levelAccess";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getLevelCurriculum } from "@/content/curriculum";
import StudentLiveRoom from "@/components/academy/StudentLiveRoom";

export default function LiveClassPage() {
  const router = useRouter();
  const params = useParams<{ lang: string; level: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);

  const [allowed, setAllowed] = useState(false);
  const [studentName, setStudentName] = useState("Élève");

  const curriculum = getLevelCurriculum(langSlug, level);

  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem("loggedStudent");
      if (!savedStudent) {
        router.push("/login");
        return;
      }
      const parsed = JSON.parse(savedStudent);
      const enrollment = (parsed.enrollments || []).find(
        (e: any) => e.langCode === curriculum?.langCode && e.status === "Approved"
      );
      if (!enrollment) {
        router.push(`/login?program=${curriculum?.langCode ?? ""}`);
        return;
      }
      // A level is reachable from the one the student registered at, up to the highest the administration unlocked.
      if (!canAccessLevel(enrollment, level)) {
        router.push("/academia/dashboard");
        return;
      }
      setStudentName(parsed.name || parsed.email || "Élève");
      setAllowed(true);
    } catch (error) {
      console.error("Erreur lors de la vérification de la session :", error);
      router.push("/login");
    }
  }, [router, curriculum?.langCode]);

  if (!curriculum) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft text-center px-6">
        <div>
          <p className="text-2xl font-bold text-ink mb-2">Contenu bientôt disponible</p>
          <Link href="/academia/dashboard" className="inline-block mt-6 text-red-500 hover:text-red-400 font-semibold">
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

  const base = `/academia/${langSlug}/level/${level}`;

  return (
    <div className="min-h-screen bg-surface-sunken text-ink selection:bg-red-600 selection:text-white">
      <main className="p-6 md:p-10 pt-28 md:pt-28">
        <div className="max-w-5xl mx-auto space-y-6">
          <Link
            href={base}
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface hover:bg-surface-alt px-4 py-2 rounded-xl border border-line transition shadow-lg"
          >
            ← Back to Level
          </Link>

          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-red-50 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              Classe en direct
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{curriculum.levelTitle}</p>
          </div>

          <StudentLiveRoom langCode={curriculum.langCode} level={level} studentName={studentName} />
        </div>
      </main>
    </div>
  );
}
