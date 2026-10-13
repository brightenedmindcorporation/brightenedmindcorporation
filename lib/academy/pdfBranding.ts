import jsPDF from "jspdf";
import { getCachedDocumentSettings, loadDocumentSettings } from "./documentSettings";

// Shared branding for every PDF the site generates (verb references,
// certificates): company logo + "Brightened Mind Corporation / Département
// Academia" header, and a faint logo watermark behind the content. Runs
// client-side only (needs Image/canvas), like the jsPDF callers themselves.

export type RGB = [number, number, number];

export interface LoadedImage {
  dataUrl: string;
  width: number;
  height: number;
}

let logoCache: Promise<LoadedImage> | null = null;

// The source logo is a ~400 KB, 1300 px PNG — redrawn at a modest size so
// each generated PDF doesn't carry the full-resolution file.
export async function loadLogo(maxSize = 480): Promise<LoadedImage> {
  // Every PDF builder calls loadLogo() first, so this is also where the
  // editable wording (company name, department…) is refreshed for the
  // header below.
  await loadDocumentSettings();
  if (!logoCache) {
    logoCache = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve({ dataUrl: canvas.toDataURL("image/png"), width: canvas.width, height: canvas.height });
      };
      img.onerror = () => {
        logoCache = null;
        reject(new Error("Logo introuvable."));
      };
      img.src = "/logo-bm.png";
    });
  }
  return logoCache;
}

/** Big, very faint logo centered on the current page, drawn before the
 * page's content so text stays fully legible on top of it. */
export function addWatermark(doc: jsPDF, logo: LoadedImage) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const w = Math.min(pageW, pageH) * 0.7;
  const h = (w * logo.height) / logo.width;
  const GState = (doc as any).GState;
  doc.setGState(new GState({ opacity: 0.06 }));
  doc.addImage(logo.dataUrl, "PNG", (pageW - w) / 2, (pageH - h) / 2, w, h, "watermark", "FAST");
  doc.setGState(new GState({ opacity: 1 }));
}

/** White header band: logo, "Brightened Mind Corporation", "Département
 * Academia", optional document title, red rule underneath. Returns the y
 * where content can start. */
export function addBrandHeader(doc: jsPDF, logo: LoadedImage, title?: string, accent: RGB = [122, 31, 43]): number {
  const pageW = doc.internal.pageSize.getWidth();
  const marginX = 18;
  const logoH = 18;
  const logoW = (logoH * logo.width) / logo.height;
  doc.addImage(logo.dataUrl, "PNG", marginX, 8, logoW, logoH, "logo", "FAST");

  const textX = marginX + logoW + 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(35, 31, 29);
  const brand = getCachedDocumentSettings();
  doc.text(brand.companyName, textX, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...accent);
  doc.text(brand.department, textX, 21);

  if (title) {
    doc.setFontSize(9.5);
    doc.setTextColor(110, 104, 96);
    doc.text(title, pageW - marginX, 21, { align: "right" });
  }

  doc.setDrawColor(...accent);
  doc.setLineWidth(0.6);
  doc.line(marginX, 30, pageW - marginX, 30);
  return 40;
}

// jsPDF's built-in fonts only cover Latin-1: Chinese (or any other non-Latin
// script) comes out as garbage. Rather than shipping a multi-MB CJK font,
// any such text is rendered with the browser's own fonts onto a canvas and
// placed as an image — crisp at 4× resolution, and every modern OS has CJK
// system fonts.
const NON_LATIN = /[^\u0000-ÿ–—‘’“”…Œœ€]/;
const PT_TO_MM = 0.3528;
const CANVAS_SCALE = 4;

export interface TextStyle {
  size: number;
  color: RGB;
  style?: "normal" | "bold" | "italic";
}

function canvasFont(style: TextStyle, px: number) {
  const weight = style.style === "bold" ? "bold" : "normal";
  const italic = style.style === "italic" ? "italic" : "normal";
  return `${italic} ${weight} ${px}px "Noto Sans SC", "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", "Heiti SC", Arial, sans-serif`;
}

function measureMm(text: string, style: TextStyle): number {
  const ctx = document.createElement("canvas").getContext("2d")!;
  const px = style.size * PT_TO_MM * CANVAS_SCALE * 3.78;
  ctx.font = canvasFont(style, px);
  return ctx.measureText(text).width / (CANVAS_SCALE * 3.78);
}

function drawCanvasText(doc: jsPDF, text: string, x: number, y: number, style: TextStyle) {
  const mmToPx = CANVAS_SCALE * 3.78;
  const fontPx = style.size * PT_TO_MM * mmToPx;
  const widthMm = measureMm(text, style) + 1;
  const heightMm = style.size * PT_TO_MM * 1.4;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(widthMm * mmToPx);
  canvas.height = Math.ceil(heightMm * mmToPx);
  const ctx = canvas.getContext("2d")!;
  ctx.font = canvasFont(style, fontPx);
  ctx.fillStyle = `rgb(${style.color.join(",")})`;
  ctx.textBaseline = "alphabetic";
  const baseline = fontPx * 1.05;
  ctx.fillText(text, 0, baseline);
  // jsPDF text y is the baseline; align the image so its baseline matches.
  doc.addImage(canvas.toDataURL("image/png"), "PNG", x, y - baseline / mmToPx, widthMm, heightMm, undefined, "FAST");
}

/** Writes one line of text, transparently switching to canvas rendering for
 * non-Latin scripts. */
export function writeLine(doc: jsPDF, text: string, x: number, y: number, style: TextStyle) {
  if (NON_LATIN.test(text)) {
    drawCanvasText(doc, text, x, y, style);
    return;
  }
  doc.setFont("helvetica", style.style ?? "normal");
  doc.setFontSize(style.size);
  doc.setTextColor(...style.color);
  doc.text(text, x, y);
}

/** Wraps text to maxWidth (mm) and writes it; returns the number of lines. */
export function writeWrapped(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, style: TextStyle, lineGap = 4.4): number {
  let lines: string[];
  if (NON_LATIN.test(text)) {
    lines = [];
    let current = "";
    for (const ch of Array.from(text)) {
      if (current && measureMm(current + ch, style) > maxWidth) {
        lines.push(current);
        current = ch.trimStart();
      } else {
        current += ch;
      }
    }
    if (current) lines.push(current);
  } else {
    doc.setFont("helvetica", style.style ?? "normal");
    doc.setFontSize(style.size);
    lines = doc.splitTextToSize(text, maxWidth);
  }
  lines.forEach((line, i) => writeLine(doc, line, x, y + i * lineGap, style));
  return lines.length;
}
