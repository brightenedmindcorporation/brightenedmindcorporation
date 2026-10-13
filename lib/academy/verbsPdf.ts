import jsPDF from "jspdf";
import type { VerbReference } from "@/content/verbs";

const RED: [number, number, number] = [122, 31, 43];
const DARK: [number, number, number] = [35, 31, 29];
const GRAY: [number, number, number] = [110, 104, 96];
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN_X = 18;
const BOTTOM_LIMIT = 280;

function addHeader(doc: jsPDF, title: string) {
  doc.setFillColor(...RED);
  doc.rect(0, 0, PAGE_WIDTH, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("BRIGHTENED MIND CORPORATION ACADEMIA", MARGIN_X, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.text(title, MARGIN_X, 21);
  return 40;
}

function sectionTitle(doc: jsPDF, text: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...RED);
  doc.text(text, MARGIN_X, y);
  doc.setDrawColor(...RED);
  doc.setLineWidth(0.4);
  doc.line(MARGIN_X, y + 2, PAGE_WIDTH - MARGIN_X, y + 2);
  return y + 9;
}

function ensureSpace(doc: jsPDF, y: number, needed: number, title: string): number {
  if (y + needed > BOTTOM_LIMIT) {
    doc.addPage();
    return addHeader(doc, title);
  }
  return y;
}

function buildVerbsDoc(reference: VerbReference, langLabel: string): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const title = `Référence des verbes — ${langLabel}`;
  let y = addHeader(doc, title);

  if (reference.kind === "particles") {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...GRAY);
    const introLines = doc.splitTextToSize(reference.intro, PAGE_WIDTH - 2 * MARGIN_X);
    doc.text(introLines, MARGIN_X, y);
    y += introLines.length * 4.5 + 6;

    y = sectionTitle(doc, "Particules d'aspect", y);

    for (const p of reference.particles) {
      y = ensureSpace(doc, y, 22, title);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...RED);
      doc.text(`${p.particle}  (${p.pinyin})`, MARGIN_X, y);
      y += 5.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...DARK);
      const usageLines = doc.splitTextToSize(p.usage, PAGE_WIDTH - 2 * MARGIN_X);
      doc.text(usageLines, MARGIN_X, y);
      y += usageLines.length * 4.3 + 1;
      doc.setFont("helvetica", "italic");
      doc.setTextColor(...GRAY);
      doc.text(p.example, MARGIN_X, y);
      y += 4.3;
      doc.setFont("helvetica", "normal");
      doc.text(p.translation, MARGIN_X, y);
      y += 7;
    }

    return doc;
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...GRAY);
  const introLines = doc.splitTextToSize(reference.irregularIntro, PAGE_WIDTH - 2 * MARGIN_X);
  doc.text(introLines, MARGIN_X, y);
  y += introLines.length * 4.5 + 6;

  y = sectionTitle(doc, "Verbes irréguliers", y);

  for (const v of reference.irregular) {
    y = ensureSpace(doc, y, 18, title);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...RED);
    doc.text(v.base, MARGIN_X, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...DARK);
    doc.text(v.forms, MARGIN_X + 32, y);
    y += 4.8;
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...GRAY);
    doc.text(v.example, MARGIN_X, y);
    y += 4.4;
    doc.setFont("helvetica", "normal");
    doc.text(v.translation, MARGIN_X, y);
    y += 6.5;
  }

  y = ensureSpace(doc, y, 20, title);
  y += 3;
  y = sectionTitle(doc, "Verbes réguliers", y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...GRAY);
  const regIntroLines = doc.splitTextToSize(reference.regularIntro, PAGE_WIDTH - 2 * MARGIN_X);
  doc.text(regIntroLines, MARGIN_X, y);
  y += regIntroLines.length * 4.5 + 5;

  for (const v of reference.regular) {
    y = ensureSpace(doc, y, 18, title);
    const conjugated = v.prefix ? `${v.prefix}${v.stem ?? ""}` : `${v.stem ?? v.base}${v.suffix ?? ""}`;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...DARK);
    doc.text(v.base, MARGIN_X, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...RED);
    doc.text(conjugated, MARGIN_X + 32, y);
    y += 4.8;
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...GRAY);
    doc.text(v.example, MARGIN_X, y);
    y += 4.4;
    doc.setFont("helvetica", "normal");
    doc.text(v.translation, MARGIN_X, y);
    y += 6.5;
  }

  return doc;
}

/** Runs entirely client-side (jsPDF needs a browser) — only call from
 * "use client" code, same convention as certificatePdf.ts. */
export function downloadVerbsPdf(reference: VerbReference, langLabel: string) {
  const doc = buildVerbsDoc(reference, langLabel);
  doc.save(`BM-Academia-verbes-${langLabel}.pdf`);
}
