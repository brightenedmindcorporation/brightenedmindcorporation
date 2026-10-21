import type { LevelCurriculum } from "@/content/curriculum/types";
import type { LevelSummary, ProgressDoc } from "@/lib/academy/levelSummary";
import type { QuizMark } from "@/lib/academy/quizScoring";
import { sealSvg } from "@/lib/seals";

const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const cell = (mark: QuizMark, key: "listen" | "quiz" | "write") => {
  const line = mark.lines.find((l) => l.key === key);
  return line ? `${esc(line.detail)}<small> (${line.got ?? "—"}/${line.max})</small>` : "—";
};

function levelSection(curriculum: LevelCurriculum, progress: ProgressDoc, s: LevelSummary, level: number): string {
  const rows = s.rows
    .map((r) => {
      const m = r.mark;
      const result =
        r.score === null ? "Pas passé" : r.passed ? "Réussi" : "Pas encore réussi";
      const note = m.percent === null ? "—" : `<b>${m.percent}/100</b>${m.provisional ? "<small> provisoire</small>" : ""}${m.byAdmin ? "<small> fixée par l'administration</small>" : ""}${m.legacy && !m.byAdmin ? "<small> ancien format</small>" : ""}`;
      const attempts = progress.quizAttempts?.[r.lessonId];
      return `<tr><td>${r.lessonId}. ${esc(r.title)}</td><td>${cell(m, "listen")}</td><td>${r.score === null ? "—" : cell(m, "quiz")}</td><td>${cell(m, "write")}</td><td>${note}</td><td>${result}${attempts ? `<small> · ${attempts} essai${attempts > 1 ? "s" : ""}</small>` : ""}</td></tr>`;
    })
    .join("");
  const f = s.final;
  const finalNote = f.mark.percent === null ? "—" : `<b>${f.mark.percent}/100</b>${f.mark.provisional ? "<small> provisoire</small>" : ""}`;
  return `<section>
    <h2>Niveau ${level} — ${esc(curriculum.levelTitle)}</h2>
    <table>
      <thead><tr><th>Leçon / quiz</th><th>Écoute</th><th>Questions</th><th>Écrit</th><th>Note /100</th><th>Résultat</th></tr></thead>
      <tbody>${rows}
        <tr class="final"><td>Quiz final du niveau</td><td>${cell(f.mark, "listen")}</td><td>${f.score === null ? "—" : cell(f.mark, "quiz")}</td><td>${cell(f.mark, "write")}</td><td>${finalNote}</td><td>${f.score === null ? "Pas passé" : f.passed ? "Réussi" : "Pas encore réussi"}</td></tr>
      </tbody>
    </table>
    <p class="avg">Moyenne du niveau : <b>${s.average !== null ? `${s.average} %` : "—"}</b> · ${s.quizzesTaken}/${s.rows.length} quiz de leçon passés · Certificat : <b>${s.eligible ? "obtenu / disponible" : "pas encore"}</b></p>
  </section>`;
}

/**
 * Opens a printable sheet (A4) of a student's file: every quiz with its parts and its mark out of 100,
 * the level's average, and the seals of the company and of BM Academia. `levels` = what to print.
 */
export function printDossier(opts: {
  student: { name: string; email?: string; studentId?: string };
  langLabel: string;
  sections: { level: number; curriculum: LevelCurriculum; progress: ProgressDoc; summary: LevelSummary }[];
}) {
  const w = window.open("", "_blank", "width=900,height=1100");
  if (!w) {
    alert("Autorisez les fenêtres pop-up pour imprimer la fiche.");
    return;
  }
  const today = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const body = opts.sections.map((x) => levelSection(x.curriculum, x.progress, x.summary, x.level)).join("");
  w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Fiche — ${esc(opts.student.name)}</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #111; font-size: 12px; margin: 0; }
  header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px double #b3121b; padding-bottom: 10px; }
  header h1 { margin: 0; font-size: 20px; color: #b3121b; letter-spacing: .5px; }
  header p { margin: 2px 0 0; font-size: 11px; color: #555; }
  .who { margin: 14px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px; }
  .who b { color: #444; font-weight: 600; }
  h2 { font-size: 14px; margin: 18px 0 6px; border-left: 4px solid #b3121b; padding-left: 8px; }
  table { width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; font-size: 11px; }
  th, td { border: 1px solid #bbb; padding: 4px 6px; text-align: left; vertical-align: top; }
  th { background: #f1eaea; }
  tr.final td { background: #faf5f5; font-weight: 600; }
  small { color: #666; font-weight: 400; }
  .avg { font-family: Arial, Helvetica, sans-serif; margin: 6px 0 0; }
  .legend { font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #555; margin-top: 14px; }
  section { break-inside: avoid; }
  footer { margin-top: 26px; display: flex; justify-content: space-between; align-items: flex-end; font-family: Arial, Helvetica, sans-serif; font-size: 11px; }
  .sign { width: 220px; border-top: 1px solid #333; padding-top: 4px; text-align: center; margin-top: 70px; }
  .seals { display: flex; gap: 6px; align-items: center; }
  @media print { button { display: none; } }
</style></head><body>
<header>
  <div><h1>BRIGHTENED MIND CORPORATION — BM ACADEMIA</h1><p>Fiche de résultats de l'étudiant · éditée le ${today}</p></div>
  <button onclick="window.print()" style="padding:8px 14px;font-weight:bold;cursor:pointer">Imprimer</button>
</header>
<div class="who">
  <div><b>Étudiant :</b> ${esc(opts.student.name)}</div><div><b>Programme :</b> ${esc(opts.langLabel)}</div>
  <div><b>E-mail :</b> ${esc(opts.student.email || "—")}</div><div><b>Matricule :</b> ${esc(opts.student.studentId || "—")}</div>
</div>
${body || "<p>Aucun résultat à afficher.</p>"}
<p class="legend">Chaque quiz est noté sur 100 : écoute 30 points, questions 40 points, écrit 30 points (corrigé par un professeur). Seul le premier essai est enregistré ; les essais suivants sont de l'entraînement. « Provisoire » : l'écrit n'est pas encore corrigé.</p>
<footer>
  <div class="seals">${sealSvg("company", { size: 120, idPrefix: "p-company", worn: false })}${sealSvg("academia", { size: 120, idPrefix: "p-academia" })}</div>
  <div class="sign">Cachet et signature de l'administration</div>
</footer>
</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 400);
}
