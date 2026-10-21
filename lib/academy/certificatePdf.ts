import jsPDF from "jspdf";
import { addWatermark, loadLogo } from "./pdfBranding";
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

/** Builds (but does not save or output) the certificate PDF — shared by
 * download, preview and anything else that needs the raw jsPDF document. */
async function buildCertificateDoc(opts: CertificateOpts): Promise<jsPDF> {
  const { studentName, levelTitle, average, certificateId, studentId } = opts;
  const logo = await loadLogo(); // also refreshes the saved wording
  const cfg = opts.settings ?? getCachedDocumentSettings();
  const doc = new jsPDF("landscape", "mm", "a4");
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  doc.setFillColor(255, 248, 240);
  doc.rect(0, 0, 297, 210, "F");
  addWatermark(doc, logo);

  doc.setDrawColor(180, 0, 0);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);

  const logoH = 22;
  const logoW = (logoH * logo.width) / logo.height;
  doc.addImage(logo.dataUrl, "PNG", 148 - logoW / 2, 14, logoW, logoH, "logo", "FAST");

  doc.setFont("times", "bold");
  doc.setTextColor(150, 0, 0);
  doc.setFontSize(20);
  doc.text(cfg.companyName.toUpperCase(), 148, 44, { align: "center" });
  doc.setFont("times", "italic");
  doc.setFontSize(13);
  doc.setTextColor(60, 60, 60);
  doc.text(cfg.department, 148, 51, { align: "center" });

  doc.setFont("times", "bold");
  doc.setTextColor(150, 0, 0);
  doc.setFontSize(19);
  doc.text(cfg.certificateTitle, 148, 63, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(cfg.presentedToText, 148, 75, { align: "center" });

  doc.setFont("times", "bold");
  doc.setFontSize(28);
  doc.setTextColor(180, 0, 0);
  doc.text((studentName || "").toUpperCase(), 148, 92, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(cfg.completionText, 148, 105, { align: "center" });

  doc.setFont("times", "bold");
  doc.setFontSize(20);
  doc.text((levelTitle || "").toUpperCase(), 148, 117, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(14);
  doc.text(`${cfg.averageLabel}: ${average}%`, 148, 131, { align: "center" });
  doc.text(`${cfg.issuedLabel} ${date}`, 148, 141, { align: "center" });

  doc.setFont("courier", "bold");
  doc.setFontSize(13);
  doc.text(`${cfg.certificateNumberLabel}: ${certificateId}`, 148, 152, { align: "center" });
  if (studentId) {
    doc.setFontSize(11);
    doc.text(`${cfg.studentIdLabel}: ${studentId}`, 148, 159, { align: "center" });
  }

  // The administration's seal (centre), cachet and the director's signature (left, over the first line).
  try {
    const stamps = await loadStampImages(new Date().toLocaleDateString("fr-FR"));
    doc.addImage(stamps.seal, "PNG", 131, 162, 35, 35, "seal", "FAST");
    doc.addImage(stamps.cachet, "PNG", 47, 146, 48, 24, "cachet", "FAST");
    // The signature is only placed over the name it belongs to.
    if (stamps.signature && /mukosa/i.test(cfg.signatory1.name)) doc.addImage(stamps.signature, "PNG", 56, 136, 34, 35.5, "signature", "FAST");
  } catch (error) {
    console.error("Seal images unavailable (the certificate is still issued):", error);
  }

  doc.line(50, 172, 95, 172);
  doc.line(202, 172, 247, 172);

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  // Names/roles are centred under each signature line (x 72.5 and 224.5).
  doc.text(cfg.signatory1.name, 72.5, 180, { align: "center" });
  doc.text(cfg.signatory2.name, 224.5, 180, { align: "center" });

  doc.setFont("times", "italic");
  doc.setFontSize(11);
  doc.text(cfg.signatory1.role, 72.5, 186, { align: "center" });
  doc.text(cfg.signatory2.role, 224.5, 186, { align: "center" });

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
