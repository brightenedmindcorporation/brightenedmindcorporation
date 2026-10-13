import jsPDF from "jspdf";

export interface CertificateOpts {
  studentName: string;
  levelTitle: string;
  average: number;
  certificateId: string;
}

/** Builds (but does not save or output) the certificate PDF — shared by
 * download, preview and anything else that needs the raw jsPDF document. */
function buildCertificateDoc(opts: CertificateOpts): jsPDF {
  const { studentName, levelTitle, average, certificateId } = opts;
  const doc = new jsPDF("landscape", "mm", "a4");
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  doc.setFillColor(255, 248, 240);
  doc.rect(0, 0, 297, 210, "F");

  doc.setDrawColor(180, 0, 0);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);

  doc.setFont("times", "bold");
  doc.setTextColor(150, 0, 0);
  doc.setFontSize(26);
  doc.text("BRIGHTENED MIND CORPORATION ACADEMIA", 148, 28, { align: "center" });

  doc.setFontSize(20);
  doc.text("CERTIFICATE OF ACHIEVEMENT", 148, 45, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("This certificate is proudly presented to", 148, 65, { align: "center" });

  doc.setFont("times", "bold");
  doc.setFontSize(30);
  doc.setTextColor(180, 0, 0);
  doc.text((studentName || "").toUpperCase(), 148, 88, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("for successfully completing", 148, 105, { align: "center" });

  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text((levelTitle || "").toUpperCase(), 148, 118, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(15);
  doc.text(`Final Average: ${average}%`, 148, 132, { align: "center" });
  doc.text(`Issued on ${date}`, 148, 143, { align: "center" });

  doc.setFont("courier", "bold");
  doc.setFontSize(13);
  doc.text(`Certificate ID: ${certificateId}`, 148, 154, { align: "center" });

  doc.line(50, 172, 95, 172);
  doc.line(202, 172, 247, 172);

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text("Jordi MUKOSA", 60, 180);
  doc.text("Jacques RACIAL", 208, 180);

  doc.setFont("times", "italic");
  doc.setFontSize(11);
  doc.text("Director", 67, 186);
  doc.text("Academic Supervisor", 205, 186);

  return doc;
}

/** Shared certificate PDF renderer — used by the student-facing
 * CertificateButton and by the admin panel's manual-issuance tool, so both
 * produce an identical document. Runs entirely client-side (jsPDF needs a
 * browser), so this is only ever called from "use client" code. */
export function generateCertificatePdf(opts: CertificateOpts) {
  const doc = buildCertificateDoc(opts);
  doc.save(`${opts.studentName}-certificate.pdf`);
}

/** Renders the certificate to an in-memory blob URL for an <iframe> preview
 * — lets the admin see the exact PDF before downloading it, without
 * triggering a download. Caller is responsible for revoking the URL
 * (URL.revokeObjectURL) once it's no longer shown. */
export function getCertificatePreviewUrl(opts: CertificateOpts): string {
  const doc = buildCertificateDoc(opts);
  return doc.output("bloburl") as unknown as string;
}
