"use client";

import { useState } from "react";
import { X, CheckCircle2, XCircle, Circle, Award, Unlock, Lock, BadgeCheck, Printer } from "lucide-react";
import { availableLanguages, getLevelCurriculum } from "@/content/curriculum";
import { summarizeLevel, type ProgressDoc } from "@/lib/academy/levelSummary";
import { printDossier } from "@/lib/academy/dossierPrint";
import type { PartLine, QuizMark } from "@/lib/academy/quizScoring";

/**
 * A student's file: for each level, every quiz with its score, the running
 * percentage and whether the level's certificate is within reach. Used by
 * the teacher and the admin.
 */
export type DossierAction = "unlock" | "lock" | "setScore" | "setFinalScore" | "resetLevel";

const lineOf = (mark: QuizMark, key: PartLine["key"]) => mark.lines.find((l) => l.key === key);

/** The four mark cells of a quiz row: écoute, questions, écrit and the total out of 100. */
function PartCells({ mark, taken, review }: { mark: QuizMark; taken: boolean; review?: boolean }) {
  if (!taken && mark.percent === null) return <><td className="p-3">—</td><td className="p-3">—</td><td className="p-3">—</td><td className="p-3">—</td><td className="p-3">—</td></>;
  const part = (key: PartLine["key"]) => {
    const l = lineOf(mark, key);
    if (!l) return <span className="text-ink-faint">—</span>;
    return (
      <>
        <span className="font-mono">{l.detail}</span>
        {l.got !== null && <span className="block text-[11px] text-ink-faint">{l.got}/{l.max}</span>}
      </>
    );
  };
  return (
    <>
      <td className="p-3">{part("listen")}</td>
      <td className="p-3">{part("quiz")}</td>
      <td className="p-3">{part("read")}</td>
      <td className="p-3">{part("write")}</td>
      <td className="p-3">
        <b className={`text-base ${mark.percent !== null && mark.percent >= 60 ? "text-emerald-500" : "text-ink"}`}>{mark.percent !== null ? `${mark.percent}` : "—"}</b>
        <span className="text-ink-faint">/100</span>
        {mark.provisional && <span className="block text-[11px] text-amber-500">provisoire : écrit à corriger</span>}
        {mark.byAdmin && <span className="block text-[11px] text-ink-faint">fixée par l&apos;admin</span>}
        {mark.legacy && !mark.byAdmin && <span className="block text-[11px] text-ink-faint">ancien format (questions seules)</span>}
        {review && <span className="block text-[11px] text-amber-500">écoute non enregistrée : à vérifier</span>}
      </td>
    </>
  );
}

export default function StudentDossier({
  student,
  levels,
  onClose,
  onAct,
  canEditScores = false,
}: {
  student: { name: string; email?: string; studentId?: string; langCode: string };
  /** level number → saved progress */
  levels: Record<string, ProgressDoc | undefined>;
  onClose: () => void;
  /** Administration / teacher: step in on a lesson (open it, take it back, change a score, restart the level). */
  onAct?: (action: DossierAction, level: number, lessonId: number, score?: number) => Promise<void>;
  /** Only the administration may change scores or restart a level. */
  canEditScores?: boolean;
}) {
  const lang = availableLanguages.find((l) => l.code === student.langCode);
  const [busy, setBusy] = useState<string | null>(null);
  const act = async (action: DossierAction, level: number, lessonId: number, _total: number, current?: number | null) => {
    if (!onAct) return;
    let score: number | undefined;
    if (action === "setScore" || action === "setFinalScore") {
      const what = action === "setScore" ? `du quiz de la leçon ${lessonId}` : "du quiz final";
      const answer = window.prompt(
        `Nouvelle note ${what} (sur 100 : écoute 25 + questions 30 + lecture 20 + écrit 25).
L'étudiant garde sa note de premier essai tant que vous ne la changez pas.`,
        current != null ? String(current) : ""
      );
      if (answer === null || answer.trim() === "") return;
      score = Number(answer);
      if (!Number.isFinite(score)) return;
    } else if (action === "unlock" && !window.confirm(`Ouvrir la leçon ${lessonId} (et son quiz) pour cet étudiant tout de suite ?`)) {
      return;
    } else if (
      action === "resetLevel" &&
      !window.confirm(`Faire recommencer le niveau ${level} à zéro à cet étudiant ?
Ses résultats actuels sont archivés, mais ses notes et ses leçons validées repartent de zéro.`)
    ) {
      return;
    }
    setBusy(`${level}-${lessonId}`);
    try {
      await onAct(action, level, lessonId, score);
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setBusy(null);
    }
  };

  /** Prints the file (A4) for the given levels. */
  const print = (wanted: number[]) => {
    if (!lang) return;
    const sections = wanted.flatMap((level) => {
      const curriculum = getLevelCurriculum(lang.slug, level);
      const progress = levels[String(level)] ?? levels[level as unknown as string];
      return curriculum && progress ? [{ level, curriculum, progress, summary: summarizeLevel(curriculum, progress) }] : [];
    });
    printDossier({ student, langLabel: lang.label, sections });
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 flex items-start justify-center overflow-y-auto p-4" onClick={onClose}>
      <div className="w-full max-w-[min(96vw,1400px)] my-6 bg-surface border border-line rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 p-6 border-b border-line">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-red-500">Dossier de l'étudiant</p>
            <h2 className="text-2xl font-black text-ink mt-1">{student.name}</h2>
            <p className="text-sm text-ink-soft mt-0.5">
              {student.email} · {lang?.label ?? student.langCode}
              {student.studentId ? ` · ${student.studentId}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {lang && (
              <button onClick={() => print([1, 2, 3])} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-line text-ink hover:border-red-600/60 hover:text-red-500">
                <Printer size={14} /> Imprimer la fiche
              </button>
            )}
            <button onClick={onClose} aria-label="Fermer" className="p-2 rounded-lg text-ink-soft hover:text-ink hover:bg-surface-alt">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {!lang ? (
            <p className="text-ink-soft text-sm">Ce programme n'a pas de quiz à suivre.</p>
          ) : (
            [1, 2, 3].map((level) => {
              const curriculum = getLevelCurriculum(lang.slug, level);
              if (!curriculum) return null;
              const progress = levels[String(level)] ?? levels[level as unknown as string];
              if (!progress) {
                return (
                  <section key={level}>
                    <h3 className="font-bold text-ink">Niveau {level}</h3>
                    <p className="text-sm text-ink-faint mt-1">Pas encore commencé.</p>
                  </section>
                );
              }
              const s = summarizeLevel(curriculum, progress);
              return (
                <section key={level} className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-bold text-ink text-lg">
                      Niveau {level} <span className="text-ink-faint font-normal text-sm">· {curriculum.levelTitle}</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <button onClick={() => print([level])} className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border border-line text-ink-soft hover:text-ink">
                        <Printer size={12} /> Imprimer ce niveau
                      </button>
                      {onAct && canEditScores && (
                        <button disabled={busy !== null} onClick={() => act("resetLevel", level, 0, 0)} className="text-xs font-bold px-3 py-1.5 rounded-lg border border-line text-ink-soft hover:border-red-600/60 hover:text-red-500 disabled:opacity-50">
                          Faire recommencer ce niveau
                        </button>
                      )}
                      <span className="text-sm text-ink-soft">
                        Moyenne actuelle :{" "}
                        <b className={`text-lg ${s.average !== null && s.average >= 70 ? "text-emerald-500" : "text-ink"}`}>
                          {s.average !== null ? `${s.average} %` : "—"}
                        </b>
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                          s.eligible ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/40" : "bg-surface-alt text-ink-soft border-line"
                        }`}
                      >
                        <Award size={13} /> {s.eligible ? "Certificat obtenu / disponible" : "Certificat : pas encore"}
                      </span>
                    </div>
                  </div>

                  <div className="border border-line rounded-2xl overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm">
                      <thead>
                        <tr className="text-left text-xs text-ink-soft uppercase tracking-wide bg-surface-alt">
                          <th className="p-3">Leçon / quiz</th>
                          <th className="p-3">Étudiée</th>
                          <th className="p-3">Écoute <span className="font-normal normal-case">/25</span></th>
                          <th className="p-3">Questions <span className="font-normal normal-case">/30</span></th>
                          <th className="p-3">Lecture <span className="font-normal normal-case">/20</span></th>
                          <th className="p-3">Écrit <span className="font-normal normal-case">/25</span></th>
                          <th className="p-3">Note /100</th>
                          <th className="p-3">Résultat</th>
                          {onAct && <th className="p-3">Actions</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {s.rows.map((r) => (
                          <tr key={r.lessonId} className="border-t border-line/60">
                            <td className="p-3">
                              <span className="font-semibold text-ink">{r.lessonId}.</span> {r.title}
                            </td>
                            <td className="p-3">{r.studied ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Circle size={15} className="text-ink-faint" />}</td>
                            <PartCells mark={r.mark} taken={r.score !== null} review={r.mark.legacy && !r.passed && r.score !== null && !(progress.adminScored ?? []).includes(r.lessonId)} />
                            <td className="p-3">
                              {r.score === null ? (
                                <span className="text-xs text-ink-faint">Pas passé</span>
                              ) : r.passed ? (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500"><CheckCircle2 size={13} /> Réussi{(progress.adminScored ?? []).includes(r.lessonId) ? " (note fixée par l'admin)" : ""}</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500"><XCircle size={13} /> Pas encore réussi</span>
                              )}
                              {(progress.quizAttempts?.[r.lessonId] ?? 0) > 0 && (
                                <span className="block text-[11px] text-ink-faint">{progress.quizAttempts![r.lessonId]} essai{progress.quizAttempts![r.lessonId] > 1 ? "s" : ""}</span>
                              )}
                              {(progress.practiceBest?.[r.lessonId] ?? null) !== null && (
                                <span className="block text-[11px] text-ink-faint">Entraînement : meilleur {progress.practiceBest![r.lessonId]}/{r.total}</span>
                              )}
                              {(progress.unlockedLessons ?? []).includes(r.lessonId) && <span className="block text-[11px] text-amber-500">Ouverte manuellement</span>}
                            </td>
                            {onAct && (
                              <td className="p-3">
                                <div className="flex flex-wrap gap-1.5">
                                  {r.lessonId > 1 && !r.passed && (
                                    (progress.unlockedLessons ?? []).includes(r.lessonId) ? (
                                      <button disabled={busy !== null} onClick={() => act("lock", level, r.lessonId, r.total)} className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border border-line text-ink-soft hover:text-ink disabled:opacity-50">
                                        <Lock size={11} /> Retirer
                                      </button>
                                    ) : (
                                      <button disabled={busy !== null} onClick={() => act("unlock", level, r.lessonId, r.total)} className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border border-line text-ink hover:border-red-600/60 hover:text-red-500 disabled:opacity-50">
                                        <Unlock size={11} /> Ouvrir
                                      </button>
                                    )
                                  )}
                                  {canEditScores && (
                                    <button disabled={busy !== null} onClick={() => act("setScore", level, r.lessonId, r.total, r.mark.percent)} className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border border-line text-ink hover:border-emerald-600/60 hover:text-emerald-500 disabled:opacity-50">
                                      <BadgeCheck size={11} /> Modifier la note
                                    </button>
                                  )}
                                  {busy === `${level}-${r.lessonId}` && <span className="text-[11px] text-ink-faint">…</span>}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                        <tr className="border-t-2 border-line bg-surface-alt/60">
                          <td className="p-3 font-bold text-ink">Quiz final du niveau</td>
                          <td className="p-3" />
                          <PartCells mark={s.final.mark} taken={s.final.score !== null} />
                          <td className="p-3">
                            {s.final.score === null ? (
                              <span className="text-xs text-ink-faint">Pas passé</span>
                            ) : s.final.passed ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500"><CheckCircle2 size={13} /> Réussi</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500"><XCircle size={13} /> Pas encore réussi</span>
                            )}
                          </td>
                          {onAct && (
                            <td className="p-3">
                              {canEditScores && (
                                <button disabled={busy !== null} onClick={() => act("setFinalScore", level, 0, s.final.total, s.final.mark.percent)} className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border border-line text-ink hover:border-emerald-600/60 hover:text-emerald-500 disabled:opacity-50">
                                  <BadgeCheck size={11} /> Modifier la note
                                </button>
                              )}
                            </td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-ink-soft">
                    {s.quizzesTaken}/{s.rows.length} quiz de leçon passés.{" "}
                    {s.eligible
                      ? `Le quiz final est réussi : le certificat est disponible${progress.certificateId ? ` (n° ${progress.certificateId})` : ""}.`
                      : "Pour obtenir le certificat, l'étudiant doit réussir tous les quiz de leçon puis le quiz final. La moyenne indiquée est celle qui figurera sur le certificat."}
                  </p>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
