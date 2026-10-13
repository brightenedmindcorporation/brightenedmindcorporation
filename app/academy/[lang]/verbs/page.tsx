"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { BookText } from "lucide-react";
import { availableLanguages } from "@/content/curriculum";
import { getVerbReference } from "@/content/verbs";
import VerbsReference from "@/components/academy/VerbsReference";

export default function VerbsPage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const langSlug = params.lang;

  const langInfo = availableLanguages.find((l) => l.slug === langSlug);
  const reference = langInfo ? getVerbReference(langInfo.code) : null;

  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem("loggedStudent");
      if (!savedStudent) {
        router.push("/login");
        return;
      }
      const parsed = JSON.parse(savedStudent);
      const enrollment = (parsed.enrollments || []).find(
        (e: any) => e.langCode === langInfo?.code && e.status === "Approved"
      );
      if (!enrollment) {
        router.push(`/login?program=${langInfo?.code ?? ""}`);
        return;
      }
      setAllowed(true);
    } catch (error) {
      console.error("Erreur lors de la vérification de la session :", error);
      router.push("/login");
    } finally {
      setChecked(true);
    }
  }, [router, langInfo?.code]);

  if (!langInfo || !reference) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft text-center px-6">
        <div>
          <p className="text-2xl font-bold text-ink mb-2">Fiche bientôt disponible</p>
          <p className="text-ink-soft">Cette référence de verbes n'est pas encore publiée pour cette langue.</p>
          <Link href="/academy/dashboard" className="inline-block mt-6 text-red-500 hover:text-red-400 font-semibold">
            ← Retour au dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (!checked || !allowed) {
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
              <BookText size={30} /> {reference.kind === "particles" ? "Particules d'aspect" : "Verbes irréguliers & réguliers"}
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{langInfo.label}</p>
          </div>

          <VerbsReference reference={reference} langLabel={langInfo.label} />
        </div>
      </main>
    </div>
  );
}
