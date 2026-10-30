const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export interface VocabularyRow {
  text: string;
  phonetic?: string;
  translation?: string;
  lesson?: number;
}

/**
 * Opens a printable A4 version of the level's vocabulary page (the browser's "Print" dialog also saves it as a
 * PDF): every word or phrase with its pronunciation and its French translation.
 */
export function printVocabulary(opts: {
  title: string;
  levelTitle: string;
  langLabel: string;
  note?: string;
  rows: VocabularyRow[];
  /** Chinese only: the characters of the level. */
  chars?: string[];
  /** Chinese only: pinyin and meaning printed under each character. */
  charNotes?: Record<string, { pinyin?: string; meaning?: string }>;
  wordsHeading?: string;
}) {
  const w = window.open("", "_blank", "width=900,height=1100");
  if (!w) {
    alert("Autorisez les fenêtres pop-up pour télécharger la page.");
    return;
  }
  const hasPhonetic = opts.rows.some((r) => r.phonetic);
  const hasTranslation = opts.rows.some((r) => r.translation);
  const today = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const head = `<tr><th>${esc(opts.wordsHeading ?? "Mot ou phrase")}</th>${hasPhonetic ? "<th>Prononciation</th>" : ""}${hasTranslation ? "<th>Traduction</th>" : ""}</tr>`;
  const body = opts.rows
    .map(
      (r) =>
        `<tr><td translate="no">${esc(r.text)}</td>${hasPhonetic ? `<td translate="no">${esc(r.phonetic || "")}</td>` : ""}${hasTranslation ? `<td>${esc(r.translation || "")}</td>` : ""}</tr>`
    )
    .join("");
  const chars = opts.chars?.length ? `<div class="chars">${opts.chars.map((c) => { const n = opts.charNotes?.[c]; return `<span>${esc(c)}${n ? `<small>${esc(n.pinyin || "")}</small><em>${esc(n.meaning || "")}</em>` : ""}</span>`; }).join("")}</div>` : "";
  w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(opts.title)} — ${esc(opts.levelTitle)}</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #111; font-size: 12px; margin: 0; }
  header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px double #b3121b; padding-bottom: 10px; margin-bottom: 12px; }
  header h1 { margin: 0; font-size: 19px; color: #b3121b; }
  header p { margin: 3px 0 0; font-size: 11px; color: #555; }
  table { width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, 'Noto Sans SC', sans-serif; font-size: 12px; }
  th, td { border: 1px solid #ccc; padding: 5px 8px; text-align: left; vertical-align: top; }
  th { background: #f1eaea; }
  tr { break-inside: avoid; }
  tbody tr:nth-child(even) td { background: #fbf8f8; }
  .chars { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 14px; font-size: 26px; font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif; }
  .chars span { border: 1px solid #ccc; border-radius: 6px; padding: 2px 8px; text-align: center; break-inside: avoid; }
  .chars span small { display: block; font-size: 11px; color: #b3121b; font-family: Arial, Helvetica, sans-serif; font-weight: bold; }
  .chars span em { display: block; max-width: 110px; font-size: 9px; color: #444; font-style: normal; font-family: Arial, Helvetica, sans-serif; }
  .note { font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #555; margin: 0 0 10px; }
  @media print { button { display: none; } }
</style></head><body>
<header>
  <div><h1>BRIGHTENED MIND CORPORATION — BM ACADEMIA</h1><p>${esc(opts.title)} · ${esc(opts.langLabel)} · ${esc(opts.levelTitle)} · édité le ${today}</p></div>
  <button onclick="window.print()" style="padding:8px 14px;font-weight:bold;cursor:pointer">Imprimer / PDF</button>
</header>
${opts.note ? `<p class="note">${esc(opts.note)}</p>` : ""}
${chars}
<table><thead>${head}</thead><tbody>${body}</tbody></table>
</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 400);
}
