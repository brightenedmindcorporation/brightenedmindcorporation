import jsPDF from "jspdf";
import { addressLine, fullName, type CvData } from "@/components/cv/templates";

/** An image attachment (identity card, diploma scan…) that is added to the PDF as an annex page. */
export interface CvAnnex {
  label: string;
  dataUrl: string;
}

const M = 18; // margin, mm
const W = 210;
const H = 297;

/**
 * The CV as a PDF (A4, black and white, one column, selectable text): same content and order as the on-screen model.
 * Photos of documents are appended as annex pages ("Pièces justificatives").
 */
export function buildCvPdf(cv: CvData, annexes: CvAnnex[] = []): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = M;

  const ensure = (need: number) => {
    if (y + need > H - M) {
      doc.addPage();
      y = M;
    }
  };
  const text = (t: string, x: number, size: number, style: "normal" | "bold" | "italic" | "bolditalic" = "normal", maxW = W - 2 * M - x + M) => {
    doc.setFont("times", style);
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(t, maxW) as string[];
    for (const line of lines) {
      ensure(size * 0.45);
      doc.text(line, x, y);
      y += size * 0.45;
    }
  };
  const section = (title: string) => {
    ensure(14);
    y += 3;
    doc.setFont("times", "bold");
    doc.setFontSize(10.5);
    doc.text(title.toUpperCase(), M, y, { charSpace: 0.6 });
    y += 1.6;
    doc.setLineWidth(0.4);
    doc.line(M, y, W - M, y);
    y += 4.6;
  };
  const row = (label: string, value?: string) => {
    if (!value) return;
    ensure(5);
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text(label, M, y);
    doc.setFont("times", "normal");
    const lines = doc.splitTextToSize(`: ${value}`, W - M - (M + 42)) as string[];
    lines.forEach((l, i) => {
      if (i > 0) ensure(4.6);
      doc.text(l, M + 42, y);
      if (i < lines.length - 1) y += 4.6;
    });
    y += 4.8;
  };
  const bullets = (raw: string) => {
    raw
      .split(/\n|;/)
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => {
        doc.setFont("times", "normal");
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(t, W - 2 * M - 8) as string[];
        lines.forEach((l, i) => {
          ensure(4.6);
          if (i === 0) doc.text("•", M + 3, y);
          doc.text(l, M + 7, y);
          y += 4.6;
        });
      });
  };

  // ---- header ----
  const photoW = 26;
  const photoH = 32;
  const textW = W - 2 * M - (cv.photo ? photoW + 6 : 0);
  if (cv.photo) {
    try {
      doc.addImage(cv.photo, "JPEG", W - M - photoW, M, photoW, photoH);
      doc.setLineWidth(0.4);
      doc.rect(W - M - photoW, M, photoW, photoH);
    } catch {
      // an unreadable photo is simply left out
    }
  }
  doc.setFont("times", "bold");
  doc.setFontSize(19);
  const nameLines = doc.splitTextToSize((fullName(cv) || "NOM ET PRÉNOM").toUpperCase(), textW) as string[];
  y = M + 7;
  for (const l of nameLines) {
    doc.text(l, M, y, { charSpace: 0.5 });
    y += 7.5;
  }
  if (cv.title) text(cv.title, M, 12, "italic", textW);
  y += 1;
  const addr = addressLine(cv);
  if (addr) text(addr, M, 9.5, "normal", textW);
  const contact = [[cv.phone, cv.phone2].filter(Boolean).join(" / "), cv.email].filter(Boolean).join(" · ");
  if (contact) text(contact, M, 9.5, "normal", textW);
  y = Math.max(y, M + photoH) + 3;
  doc.setLineWidth(0.9);
  doc.line(M, y, W - M, y);
  doc.setLineWidth(0.25);
  doc.line(M, y + 1.2, W - M, y + 1.2);
  y += 5;

  // ---- identity ----
  section("Identité");
  row("Nom complet", fullName(cv));
  row("Sexe", cv.gender);
  row("Né(e) le", [cv.birthDate, cv.birthPlace && `à ${cv.birthPlace}`].filter(Boolean).join(" "));
  row("Nationalité", cv.nationality);
  row("Province d'origine", cv.origin);
  row("État civil", [cv.civilStatus, cv.children && `${cv.children} enfant(s)`].filter(Boolean).join(", "));
  row("Fils / fille de", [cv.father, cv.mother && `et de ${cv.mother}`].filter(Boolean).join(" "));
  row("Adresse", addr);

  if (cv.summary) {
    section("Profil");
    text(cv.summary, M, 10);
  }

  if (cv.experiences.length) {
    section("Expérience professionnelle");
    for (const e of cv.experiences) {
      ensure(14);
      doc.setFont("times", "bold");
      doc.setFontSize(10);
      const head = [e.job, e.employer].filter(Boolean).join(", ");
      const headLines = doc.splitTextToSize(head, W - 2 * M - 34) as string[];
      headLines.forEach((l, i) => {
        doc.text(l, M, y);
        if (i === 0 && e.period) {
          doc.setFont("times", "italic");
          doc.text(e.period, W - M, y, { align: "right" });
          doc.setFont("times", "bold");
        }
        y += 4.8;
      });
      if (e.tasks) bullets(e.tasks);
      y += 1.6;
    }
  }

  if (cv.studies.length) {
    section("Études faites");
    for (const s of cv.studies) {
      ensure(11);
      doc.setFont("times", "bold");
      doc.setFontSize(10);
      doc.text(s.level, M, y);
      const lw = doc.getTextWidth(s.level);
      doc.setFont("times", "normal");
      const rest = [s.school && `, ${s.school}`, s.option && ` — option ${s.option}`].filter(Boolean).join("");
      const restLines = doc.splitTextToSize(rest, W - 2 * M - lw - 22) as string[];
      restLines.forEach((l, i) => {
        doc.text(l, M + lw, y);
        if (i === 0 && s.year) {
          doc.setFont("times", "italic");
          doc.text(s.year, W - M, y, { align: "right" });
          doc.setFont("times", "normal");
        }
        if (i < restLines.length - 1) y += 4.6;
      });
      y += 4.6;
      if (s.diploma) {
        doc.setFont("times", "normal");
        doc.text("Pièce obtenue : ", M, y);
        const pw = doc.getTextWidth("Pièce obtenue : ");
        doc.setFont("times", "bold");
        doc.text(s.diploma, M + pw, y);
        const dw = doc.getTextWidth(s.diploma);
        if (s.proofName) {
          doc.setFont("times", "italic");
          doc.text("(copie jointe)", M + pw + dw + 2, y);
        }
        y += 5.2;
      }
    }
  }

  const inline = (title: string, items: string[]) => {
    if (!items.length) return;
    section(title);
    text(items.join(" · "), M, 10);
  };
  inline("Compétences", cv.skills);
  inline("Langues", cv.languages);
  inline("Qualités", cv.qualities);

  if (cv.references.length) {
    section("Références");
    for (const r of cv.references) {
      text([r.name, r.relation, r.phone].filter(Boolean).join(" — "), M, 10);
    }
  }

  const attachments = cv.attachments.filter((a) => a.names.length);
  if (attachments.length) {
    section("Pièces jointes");
    for (const a of attachments) text(`${a.category} : ${a.names.join(", ")}`, M, 10);
  }

  ensure(12);
  y += 5;
  text("Je certifie que les renseignements ci-dessus sont exacts.", M, 9.5, "italic");

  // ---- annexes: one image per page ----
  for (const a of annexes) {
    try {
      doc.addPage();
      doc.setFont("times", "bold");
      doc.setFontSize(11);
      doc.text(`Pièce justificative : ${a.label}`, M, M + 2);
      const props = doc.getImageProperties(a.dataUrl);
      const maxW = W - 2 * M;
      const maxH = H - 2 * M - 10;
      const ratio = Math.min(maxW / props.width, maxH / props.height);
      const w = props.width * ratio;
      const h = props.height * ratio;
      doc.addImage(a.dataUrl, props.fileType === "PNG" ? "PNG" : "JPEG", (W - w) / 2, M + 8, w, h);
    } catch {
      // a file jsPDF cannot read is left out of the annexes (it is still sent separately)
    }
  }

  return doc;
}

export const cvFileName = (cv: CvData) => `CV-${(fullName(cv) || "candidat").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "")}.pdf`;
