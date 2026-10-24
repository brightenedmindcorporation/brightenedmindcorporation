"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { availableLanguages } from "@/content/curriculum";

interface Review {
  id: string;
  langCode: string;
  level: number;
  quizTitle: string;
  status: "pending" | "reviewed";
  submittedAt: string;
  items: { kind: string; prompt: string; expected?: string; text: string }[];
  feedback?: { corrected: string; comment: string }[];
  overall?: string;
  mark?: number | null;
  reviewedBy?: string;
}

/** The student's written work with their teachers' corrections. */
export default function CorrectionsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[] | null>(null);
  // Back to the page the student came from, or to their space when this page was opened directly.
  const goBack = () => (window.history.length > 1 ? router.back() : router.push("/academia/dashboard"));

  useEffect(() => {
    (async () => {
      const user =
        auth.currentUser ??
        (await new Promise<User | null>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (u) => {
            unsubscribe();
            resolve(u);
          });
        }));
      if (!user) {
        router.push("/login");
        return;
      }
      try {
        const response = await fetch("/api/academy/my-corrections", { headers: { Authorization: `Bearer ${await user.getIdToken()}` }, cache: "no-store" });
        const result = await response.json();
        setReviews(result.reviews || []);
      } catch {
        setReviews([]);
      }
    })();
  }, [router]);

  return (
    <main className="min-h-screen bg-surface-sunken text-ink px-4 pb-10 pt-28">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <button onClick={goBack} className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface px-4 py-2 rounded-xl border border-line">
            ← Retour
          </button>
        </div>
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
          <h1 className="text-3xl font-black">Mes corrections</h1>
          <p className="text-red-200/80 mt-2 text-sm">Vos textes écrits dans les quiz, et les corrections de vos professeurs.</p>
        </div>

        {!reviews && <p className="text-ink-soft">Chargement…</p>}
        {reviews && reviews.length === 0 && <p className="text-ink-soft">Rien pour le moment : vos textes apparaissent ici après chaque quiz.</p>}

        {reviews?.map((r) => (
          <div key={r.id} className="bg-surface border border-line rounded-3xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-bold">{r.quizTitle}</p>
                <p className="text-xs text-ink-soft">
                  {availableLanguages.find((l) => l.code === r.langCode)?.label ?? r.langCode} · niveau {r.level} · {new Date(r.submittedAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${r.status === "reviewed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-black"}`}>
                {r.status === "reviewed" ? `Corrigée${r.mark != null ? ` · ${r.mark}/10` : ""}` : "En attente de correction"}
              </span>
            </div>

            {r.status === "reviewed" && r.overall && <p className="rounded-xl bg-emerald-500/10 border border-emerald-600/30 p-3 text-sm">{r.overall}</p>}

            {r.items.map((it, i) => {
              const f = r.feedback?.[i];
              return (
                <div key={i} className="space-y-1.5 border-t border-line pt-3">
                  <p className="text-xs text-ink-faint">{it.prompt}</p>
                  <p translate="no" className="notranslate whitespace-pre-wrap">{it.text}</p>
                  {r.status === "reviewed" && f?.corrected && (
                    <p translate="no" className="notranslate whitespace-pre-wrap rounded-lg bg-surface-alt border border-line p-2.5 text-emerald-600">
                      ✓ {f.corrected}
                    </p>
                  )}
                  {r.status === "reviewed" && f?.comment && <p className="text-sm text-ink-soft">💬 {f.comment}</p>}
                  {r.status === "reviewed" && !f?.corrected && !f?.comment && <p className="text-xs text-emerald-600">Rien à corriger.</p>}
                </div>
              );
            })}
          </div>
        ))}
        <button onClick={goBack} className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface px-4 py-2 rounded-xl border border-line">
          ← Retour
        </button>
      </div>
    </main>
  );
}
