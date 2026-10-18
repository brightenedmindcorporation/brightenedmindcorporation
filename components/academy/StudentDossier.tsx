"use client";

import { useState } from "react";
import { X, CheckCircle2, XCircle, Circle, Award, Unlock, Lock, BadgeCheck } from "lucide-react";
import { availableLanguages, getLevelCurriculum } from "@/content/curriculum";
import { summarizeLevel, type ProgressDoc } from "@/lib/academy/levelSummary";

/**
 * A student's file: for each level, every quiz with its score, the running
 * percentage and whether the level's certificate is within reach. Used by
 * the teacher and the admin.
 */
export type DossierAction = "unlock" | "lock" | "validate";

export default function StudentDossier({
  student,
  levels,
  onClose,
  onAct,
}: {
  student: { name: string; email?: string; studentId?: string; langCode: string };
  /** level number → saved progress */
  levels: Record<string, ProgressDoc | undefined>;
  onClose: () => void;
  /** Administration / teacher: step in on a lesson (open it, take it back, validate its quiz). */
  onAct?: (action: DossierAction, level: number, lessonId: number, score?: number) => Promise<void>;
}) {
  const lang = availableLanguages.find((l) => l.code === student.langCode);
  const [busy, setBusy] = useState<string | null>(null);
  const act = async (action: DossierAction, level: number, lessonId: number, total: number) => {
    if (!onAct) return;
    let score: number | undefined;
    if (action === "validate") {
      const answer = window.prompt(`Valider le quiz de la leçon ${lessonId} sans le repasser.
Note à enregistrer (sur ${total}) :`, String(total));
      if (answer === null) return;
      score = Number(answer);
      if (!Number.isFinite(score)) return;
    } else if (action === "unlock" && !window.confirm(`Ouvrir la leçon ${lessonId} (et son quiz) pour cet étudiant tout de suite ?`)) {
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

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 flex items-start justify-center overflow-y-auto p-4" onClick={onClose}>
      <div className="w-full max-w-3xl my-8 bg-surface border border-line rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 p-6 border-b border-line">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-red-500">Dossier de l'étudiant</p>
            <h2 className="text-2xl font-black text-ink mt-1">{student.name}</h2>
            <p className="text-sm text-ink-soft mt-0.5">
              {student.email} · {lang?.label ?? student.langCode}
              {student.studentId ? ` · ${student.studentId}` : ""}
            </p>
          </div>
          <button onClick={onClose} aria-label="Fermer" className="p-2 rounded-lg text-ink-soft hover:text-ink hover:bg-surface-alt">
            <X size={18} />
          </button>
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
                    <div className="flex items-center gap-3">
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

                  <div className="border border-line rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-ink-soft uppercase tracking-wide bg-surface-alt">
                          <th className="p-3">Leçon / quiz</th>
                          <th className="p-3">Étudiée</th>
                          <th className="p-3">Note</th>
                          <th className="p-3">%</th>
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
                            <td className="p-3 font-mono">{r.score !== null ? `${r.score}/${r.total}` : "—"}</td>
                            <td className="p-3">{r.score !== null && r.total ? `${Math.round((r.score / r.total) * 100)} %` : "—"}</td>
                            <td className="p-3">
                              {r.score === null ? (
                                <span className="text-xs text-ink-faint">Pas passé</span>
                              ) : r.passed ? (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500"><CheckCircle2 size={13} /> Réussi{(progress.adminPassed ?? []).includes(r.lessonId) ? " (validé)" : ""}</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500"><XCircle size={13} /> Pas encore réussi</span>
                              )}
                              {(progress.quizAttempts?.[r.lessonId] ?? 0) > 0 && (
                                <span className="block text-[11px] text-ink-faint">{progress.quizAttempts![r.lessonId]} essai{progress.quizAttempts![r.lessonId] > 1 ? "s" : ""}</span>
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
                                  {!r.passed && (
                                    <button disabled={busy !== null} onClick={() => act("validate", level, r.lessonId, r.total)} className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border border-line text-ink hover:border-emerald-600/60 hover:text-emerald-500 disabled:opacity-50">
                                      <BadgeCheck size={11} /> Valider le quiz
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
                          <td className="p-3 font-mono">{s.final.score !== null ? `${s.final.score}/${s.final.total}` : "—"}</td>
                          <td className="p-3">{s.final.score !== null && s.final.total ? `${Math.round((s.final.score / s.final.total) * 100)} %` : "—"}</td>
                          <td className="p-3">
                            {s.final.score === null ? (
                              <span className="text-xs text-ink-faint">Pas passé</span>
                            ) : s.final.passed ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500"><CheckCircle2 size={13} /> Réussi</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500"><XCircle size={13} /> Pas encore réussi</span>
                            )}
                          </td>
                          {onAct && <td className="p-3" />}
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
