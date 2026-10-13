import jsPDF from "jspdf";
import type { VerbReference } from "@/content/verbs";
import { addBrandHeader, addWatermark, loadLogo, writeLine, writeWrapped, type LoadedImage, type RGB } from "./pdfBranding";

const RED: RGB = [122, 31, 43];
const DARK: RGB = [35, 31, 29];
const GRAY: RGB = [110, 104, 96];
const MARGIN_X = 18;
const BOTTOM_LIMIT = 282;

class PdfWriter {
  doc = new jsPDF({ unit: "mm", format: "a4" });
  y = 0;
  readonly contentWidth = this.doc.internal.pageSize.getWidth() - 2 * MARGIN_X;

  constructor(private logo: LoadedImage, private title: string) {
    this.startPage();
  }

  private startPage() {
    addWatermark(this.doc, this.logo);
    this.y = addBrandHeader(this.doc, this.logo, this.title, RED);
  }

  ensure(needed: number) {
    if (this.y + needed > BOTTOM_LIMIT) {
      this.doc.addPage();
      this.startPage();
    }
  }

  section(text: string) {
    this.ensure(16);
    writeLine(this.doc, text, MARGIN_X, this.y, { size: 12, color: RED, style: "bold" });
    this.doc.setDrawColor(...RED);
    this.doc.setLineWidth(0.3);
    this.doc.line(MARGIN_X, this.y + 2, MARGIN_X + this.contentWidth, this.y + 2);
    this.y += 9;
  }

  paragraph(text: string) {
    const lines = writeWrapped(this.doc, text, MARGIN_X, this.y, this.contentWidth, { size: 9.5, color: GRAY });
    this.y += lines * 4.4 + 4;
  }

  /** One verb entry: bold head + side form on the first line, then example and translation. */
  entry(head: string, side: string, example: string, translation: string, headColor: RGB = RED, sideColor: RGB = DARK) {
    this.ensure(18);
    writeLine(this.doc, head, MARGIN_X, this.y, { size: 11, color: headColor, style: "bold" });
    if (side) writeLine(this.doc, side, MARGIN_X + 38, this.y, { size: 9.5, color: sideColor });
    this.y += 4.8;
    const exLines = writeWrapped(this.doc, example, MARGIN_X, this.y, this.contentWidth, { size: 9.5, color: GRAY, style: "italic" });
    this.y += exLines * 4.4;
    const trLines = writeWrapped(this.doc, translation, MARGIN_X, this.y, this.contentWidth, { size: 9.5, color: GRAY });
    this.y += trLines * 4.4 + 2.5;
  }
}

async function buildVerbsDoc(reference: VerbReference, langLabel: string): Promise<jsPDF> {
  const logo = await loadLogo();
  const w = new PdfWriter(logo, `Référence des verbes — ${langLabel}`);

  if (reference.kind === "particles") {
    w.paragraph(reference.intro);
    w.section("Particules d'aspect");
    for (const p of reference.particles) {
      w.entry(`${p.particle}  (${p.pinyin})`, "", `${p.usage}  ${p.example}`, p.translation);
    }
    if (reference.verbs.length > 0) {
      w.y += 4;
      w.section(`Les ${reference.verbs.length} verbes essentiels`);
      w.paragraph(reference.verbsIntro);
      for (const v of reference.verbs) {
        w.entry(v.hanzi, `${v.pinyin} — ${v.meaning}`, v.example, v.translation);
      }
    }
    return w.doc;
  }

  w.paragraph(reference.irregularIntro);
  w.section(`Verbes irréguliers (${reference.irregular.length})`);
  for (const v of reference.irregular) {
    w.entry(v.base, v.forms, v.example, v.translation);
  }

  w.y += 4;
  w.section(`Verbes réguliers (${reference.regular.length})`);
  w.paragraph(reference.regularIntro);
  for (const v of reference.regular) {
    const conjugated = v.prefix ? `${v.prefix}${v.stem ?? ""}` : `${v.stem ?? v.base}${v.suffix ?? ""}`;
    w.entry(v.base, conjugated, v.example, v.translation, DARK, RED);
  }

  return w.doc;
}

export async function downloadVerbsPdf(reference: VerbReference, langLabel: string) {
  const doc = await buildVerbsDoc(reference, langLabel);
  doc.save(`BM-Academia-verbes-${langLabel}.pdf`);
}
