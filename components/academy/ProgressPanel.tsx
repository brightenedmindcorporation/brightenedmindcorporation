"use client";

import { useEffect, useState } from "react";
import { Flame, Award, Lock, Check } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { StreakInfo } from "@/lib/academy/streak";

type State = { status: "loading" } | { status: "error" } | { status: "ok"; data: StreakInfo };

const DAY_LETTERS = ["D", "L", "M", "M", "J", "V", "S"]; // Sunday first, like Date.getUTCDay()

/**
 * "Where am I?" panel of the student's dashboard: the study streak (days in a row), the last seven days and the
 * badges earned so far. Every state is spelled out in words (loading, error, nothing yet), never only with colour.
 */
export default function ProgressPanel({
  completed,
  total,
  percent,
  finalPassed,
}: {
  completed: number;
  total: number;
  percent: number;
  finalPassed: boolean;
}) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    const load = async (user: import("firebase/auth").User | null) => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const res = await fetch("/api/academy/streak", { headers: { Authorization: `Bearer ${idToken}` } });
        const json = await res.json();
        if (cancelled) return;
        if (res.ok && json?.ok) setState({ status: "ok", data: json as StreakInfo });
        else setState({ status: "error" });
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      load(user);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const best = state.status === "ok" ? state.data.best : 0;
  const badges = [
    { id: "start", label: "Premier pas", hint: "Réussir 1 quiz", earned: completed >= 1 },
    { id: "five", label: "En route", hint: "Réussir 5 quiz", earned: completed >= 5 },
    { id: "half", label: "Mi-parcours", hint: "Atteindre 50 %", earned: percent >= 50 },
    { id: "level", label: "Niveau terminé", hint: "Réussir le test final", earned: finalPassed },
    { id: "s3", label: "3 jours de suite", hint: "Étudier 3 jours d'affilée", earned: best >= 3 },
    { id: "s7", label: "7 jours de suite", hint: "Étudier 7 jours d'affilée", earned: best >= 7 },
  ];
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <section aria-labelledby="progress-panel-title" className="grid gap-4 md:grid-cols-2 mb-6 relative">
      <h2 id="progress-panel-title" className="sr-only">
        Votre série et vos badges
      </h2>

      {/* Streak */}
      <div className="bg-surface-sunken/80 border border-line rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-300 inline-flex items-center justify-center shrink-0">
            <Flame size={26} aria-hidden="true" />
          </span>
          <div>
            {state.status === "loading" && <p className="font-bold text-ink-soft">Calcul de votre série…</p>}
            {state.status === "error" && <p className="font-bold text-ink-soft">Série indisponible pour le moment</p>}
            {state.status === "ok" && (
              <>
                <p className="text-2xl font-black text-ink leading-tight">
                  {state.data.current} {state.data.current > 1 ? "jours" : "jour"} de suite
                </p>
                <p className="text-sm text-ink-soft">
                  {state.data.current === 0
                    ? "Étudiez aujourd'hui pour démarrer votre série."
                    : state.data.todayDone
                    ? "Bravo, vous avez étudié aujourd'hui."
                    : "Étudiez aujourd'hui pour garder votre série."}
                </p>
              </>
            )}
          </div>
        </div>

        {state.status === "ok" && (
          <ol className="mt-4 grid grid-cols-7 gap-1.5" aria-label="Vos 7 derniers jours">
            {state.data.week.map((d) => {
              const letter = DAY_LETTERS[new Date(`${d.day}T00:00:00Z`).getUTCDay()];
              return (
                <li key={d.day} className="flex flex-col items-center gap-1">
                  <span
                    className={`w-9 h-9 rounded-full inline-flex items-center justify-center border text-sm font-bold ${
                      d.done ? "bg-emerald-600 border-emerald-600 text-white" : "bg-surface border-line text-ink-faint"
                    }`}
                  >
                    {d.done ? <Check size={16} aria-hidden="true" /> : null}
                    <span className="sr-only">{d.done ? `${d.day} : étudié` : `${d.day} : pas étudié`}</span>
                  </span>
                  <span className="text-xs text-ink-soft" aria-hidden="true">
                    {letter}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
        {state.status === "ok" && state.data.best > 0 && (
          <p className="mt-3 text-sm text-ink-soft">
            Meilleure série : <b className="text-ink">{state.data.best}</b> {state.data.best > 1 ? "jours" : "jour"} · {state.data.total} jours d&apos;étude au total
          </p>
        )}
      </div>

      {/* Badges */}
      <div className="bg-surface-sunken/80 border border-line rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-ink flex items-center gap-2">
            <Award size={20} className="text-red-600 dark:text-red-300" aria-hidden="true" /> Vos badges
          </p>
          <p className="text-sm font-semibold text-ink-soft">
            {earnedCount} sur {badges.length}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {badges.map((b) => (
            <li
              key={b.id}
              className={`rounded-xl border p-3 min-h-[64px] ${b.earned ? "border-emerald-600/50 bg-emerald-600/10" : "border-line bg-surface"}`}
            >
              <p className={`text-sm font-bold flex items-center gap-1.5 ${b.earned ? "text-ink" : "text-ink-soft"}`}>
                {b.earned ? <Check size={15} className="text-emerald-600 shrink-0" aria-hidden="true" /> : <Lock size={14} className="shrink-0" aria-hidden="true" />}
                {b.label}
              </p>
              <p className="text-xs text-ink-soft mt-0.5">{b.earned ? "Obtenu" : b.hint}</p>
            </li>
          ))}
        </ul>
        <p className="sr-only">
          {completed} sur {total} quiz réussis.
        </p>
      </div>
    </section>
  );
}
