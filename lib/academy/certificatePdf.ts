import jsPDF from "jspdf";
import { loadLogo } from "./pdfBranding";
import { getCachedDocumentSettings, type DocumentSettings } from "./documentSettings";
import { loadStampImages } from "./pdfSeals";

export interface CertificateOpts {
  studentName: string;
  levelTitle: string;
  average: number;
  /** The certificate's own number (CERT-…). */
  certificateId: string;
  /** The student's enrolment ID, printed under the certificate number. */
  studentId?: string;
  /** Override the saved wording (used by the admin editor's live preview). */
  settings?: DocumentSettings;
}


// Colours of the "Prestige" model: ivory paper, bordeaux frame, gold filets.
const IVORY: [number, number, number] = [251, 246, 234];
const BORDEAUX: [number, number, number] = [110, 20, 36];
const GOLD: [number, number, number] = [184, 146, 47];
const GOLD_DARK: [number, number, number] = [138, 106, 28];
const INK: [number, number, number] = [43, 16, 19];
const MUTED: [number, number, number] = [90, 58, 61];

/** A small spirograph rosette (corner ornament), drawn with fine line segments. */
function rosette(doc: jsPDF, cx: number, cy: number, radius: number, petals: number, turns: number, color: [number, number, number], width: number) {
  doc.setDrawColor(...color);
  doc.setLineWidth(width);
  const steps = 240;
  let px = 0;
  let py = 0;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * turns;
    const r = radius * (0.55 + 0.45 * Math.cos((petals * t) / turns));
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    if (i > 0) doc.line(px, py, x, y);
    px = x;
    py = y;
  }
}

/** Centred text that is shrunk, if needed, to fit the width (the wording can be edited in the admin). */
function centred(doc: jsPDF, text: string, y: number, size: number, maxWidth: number, charSpace = 0) {
  let s = size;
  doc.setFontSize(s);
  while (s > 8 && doc.getTextWidth(text) + charSpace * text.length > maxWidth) {
    s -= 0.5;
    doc.setFontSize(s);
  }
  doc.text(text, 148.5 + charSpace / 2, y, { align: "center", ...(charSpace ? { charSpace } : {}) });
}

/** Builds (but does not save or output) the certificate PDF — shared by
 * download, preview and anything else that needs the raw jsPDF document. */
async function buildCertificateDoc(opts: CertificateOpts): Promise<jsPDF> {
  const { studentName, levelTitle, average, certificateId, studentId } = opts;
  await loadLogo(); // refreshes the saved wording
  const cfg = opts.settings ?? getCachedDocumentSettings();
  const doc = new jsPDF("landscape", "mm", "a4");
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  // Paper and frames: wide bordeaux border, gold double filet.
  doc.setFillColor(...IVORY);
  doc.rect(0, 0, 297, 210, "F");
  doc.setDrawColor(...BORDEAUX);
  doc.setLineWidth(2.7);
  doc.rect(7.15, 7.15, 282.7, 195.7);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.rect(11.9, 11.9, 273.2, 186.2);
  doc.setLineWidth(0.17);
  doc.rect(13.9, 13.9, 269.2, 182.2);
  for (const [cx, cy] of [[22, 22], [275, 22], [22, 188], [275, 188]]) {
    rosette(doc, cx, cy, 10.5, 7, 2, GOLD, 0.18);
    rosette(doc, cx, cy, 6.8, 5, 2, BORDEAUX, 0.17);
    rosette(doc, cx, cy, 3.4, 3, 1, GOLD, 0.17);
  }

  const W = 255; // usable width between the corner ornaments

  doc.setFont("times", "bold");
  doc.setTextColor(...BORDEAUX);
  centred(doc, cfg.companyName.toUpperCase(), 26, 14.5, W, 1.5);
  doc.setFont("times", "italic");
  doc.setTextColor(...GOLD_DARK);
  centred(doc, cfg.department, 33, 10.5, W, 0.8);

  doc.setFont("times", "bold");
  doc.setTextColor(...BORDEAUX);
  centred(doc, cfg.certificateTitle, 51, 35, W, 1);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(100.5, 58, 196.5, 58);

  doc.setFont("times", "italic");
  doc.setTextColor(...MUTED);
  centred(doc, cfg.presentedToText, 68, 12.5, W);

  doc.setFont("times", "bold");
  doc.setTextColor(...INK);
  centred(doc, (studentName || "").toUpperCase(), 85, 38, 225, 0.8);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(71.5, 91, 225.5, 91);

  doc.setFont("times", "italic");
  doc.setTextColor(...MUTED);
  centred(doc, cfg.completionText, 100, 12.5, W);

  doc.setFont("times", "bold");
  doc.setTextColor(...BORDEAUX);
  centred(doc, levelTitle || "", 111, 25, W, 0.3);

  doc.setFont("times", "normal");
  doc.setTextColor(75, 44, 47);
  centred(doc, `${cfg.averageLabel}: ${average}%  ·  ${cfg.issuedLabel} ${date}`, 123, 11.5, W, 0.2);
  centred(doc, `${cfg.certificateNumberLabel}: ${certificateId}${studentId ? `  ·  ${cfg.studentIdLabel}: ${studentId}` : ""}`, 130, 11.5, W, 0.2);

  // The administration's seal (centre), cachet and the director's signature (left, over the first line).
  try {
    const stamps = await loadStampImages(new Date().toLocaleDateString("fr-FR"));
    doc.addImage(stamps.seal, "PNG", 131, 138, 35, 35, "seal", "FAST");
    doc.addImage(stamps.cachet, "PNG", 47, 146, 48, 24, "cachet", "FAST");
    // The signature is only placed over the name it belongs to.
    if (stamps.signature && /mukosa/i.test(cfg.signatory1.name)) doc.addImage(stamps.signature, "PNG", 56, 136, 34, 35.5, "signature", "FAST");
  } catch (error) {
    console.error("Seal images unavailable (the certificate is still issued):", error);
  }

  doc.setDrawColor(...BORDEAUX);
  doc.setLineWidth(0.4);
  doc.line(50, 172, 95, 172);
  doc.line(202, 172, 247, 172);

  // Names/roles are centred under each signature line (x 72.5 and 224.5).
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...INK);
  doc.text(cfg.signatory1.name, 72.5, 179, { align: "center" });
  doc.text(cfg.signatory2.name, 224.5, 179, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...GOLD_DARK);
  doc.text(cfg.signatory1.role.toUpperCase(), 72.5, 185, { align: "center", charSpace: 0.5 });
  doc.text(cfg.signatory2.role.toUpperCase(), 224.5, 185, { align: "center", charSpace: 0.5 });
  return doc;
}

/** Shared certificate PDF renderer — used by the student-facing
 * CertificateButton and by the admin panel's manual-issuance tool, so both
 * produce an identical document. Runs entirely client-side (jsPDF needs a
 * browser), so this is only ever called from "use client" code. */
export async function generateCertificatePdf(opts: CertificateOpts) {
  const doc = await buildCertificateDoc(opts);
  doc.save(`${opts.studentName}-certificate.pdf`);
}

/** Renders the certificate to an in-memory blob URL for an <iframe> preview
 * — lets the admin see the exact PDF before downloading it, without
 * triggering a download. Caller is responsible for revoking the URL
 * (URL.revokeObjectURL) once it's no longer shown. */
export async function getCertificatePreviewUrl(opts: CertificateOpts): Promise<string> {
  const doc = await buildCertificateDoc(opts);
  return doc.output("bloburl") as unknown as string;
}
