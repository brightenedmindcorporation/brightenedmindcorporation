"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X } from "lucide-react";
import { categoryInfo, ctaFor, optimizedImage, prettyDate, PHONE_DISPLAY, SITE_HOST, type Announcement } from "@/lib/announcements";

type Format = "square" | "story";
const SIZES: Record<Format, { w: number; h: number; label: string; hint: string }> = {
  square: { w: 1080, h: 1080, label: "Carré 1080 × 1080", hint: "Facebook, Instagram, statut WhatsApp" },
  story: { w: 1080, h: 1920, label: "Vertical 1080 × 1920", hint: "TikTok, Reels, statut WhatsApp plein écran" },
};

const loadImage = (src: string, cors = true) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    if (cors) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image"));
    img.src = src;
  });

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split(/\n+/)) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else line = test;
    }
    if (line) lines.push(line);
  }
  return lines;
}

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

/** Draws the poster of an announcement: the brand colours, the picture, the title, the facts and the way to act. */
async function drawPoster(canvas: HTMLCanvasElement, a: Announcement, format: Format, withPhoto: boolean) {
  const { w, h } = SIZES[format];
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const css = getComputedStyle(document.documentElement);
  const serif = `${css.getPropertyValue("--font-serif").trim() || "Georgia"}, Georgia, serif`;
  const sans = `${css.getPropertyValue("--font-sans").trim() || "system-ui"}, system-ui, sans-serif`;
  try {
    await Promise.all([document.fonts.load(`800 60px ${serif}`), document.fonts.load(`700 34px ${sans}`), document.fonts.load(`400 34px ${sans}`)]);
  } catch {
    // the system fonts will do
  }

  const cat = categoryInfo(a);
  const M = 72;
  const innerW = w - M * 2;

  // ---- background ----
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#3a0e14");
  bg.addColorStop(1, "#1a1613");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  let hasPhoto = false;
  if (withPhoto && a.imageUrl) {
    try {
      const photo = await loadImage(optimizedImage(a.imageUrl, 1400));
      const scale = Math.max(w / photo.width, h / photo.height);
      const pw = photo.width * scale;
      const ph = photo.height * scale;
      ctx.drawImage(photo, (w - pw) / 2, (h - ph) / 2, pw, ph);
      hasPhoto = true;
    } catch {
      // no picture: the brand background stays
    }
  }
  if (hasPhoto) {
    const veil = ctx.createLinearGradient(0, 0, 0, h);
    veil.addColorStop(0, "rgba(26,22,19,0.62)");
    veil.addColorStop(0.45, "rgba(26,22,19,0.78)");
    veil.addColorStop(1, "rgba(40,10,16,0.96)");
    ctx.fillStyle = veil;
    ctx.fillRect(0, 0, w, h);
  } else {
    // the big ring of the logo, very faint
    ctx.strokeStyle = "rgba(231,163,173,0.10)";
    ctx.lineWidth = 110;
    ctx.beginPath();
    ctx.arc(w * 0.92, h * 0.18, w * 0.34, 0, Math.PI * 2);
    ctx.stroke();
  }

  // ---- top: logo and name ----
  let y = M;
  try {
    const logo = await loadImage("/logo-bm-on-dark.png", false);
    const lh = format === "story" ? 110 : 90;
    const lw = (logo.width / logo.height) * lh;
    ctx.drawImage(logo, M, y, lw, lh);
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 34px ${sans}`;
    ctx.textBaseline = "middle";
    ctx.fillText("BRIGHTENED MIND", M + lw + 24, y + lh / 2 - 14);
    ctx.fillStyle = "#e7a3ad";
    ctx.font = `700 24px ${sans}`;
    ctx.fillText("CORPORATION · LUBUMBASHI", M + lw + 24, y + lh / 2 + 22);
  } catch {
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 36px ${sans}`;
    ctx.textBaseline = "top";
    ctx.fillText("BRIGHTENED MIND CORPORATION", M, y + 30);
  }
  y += (format === "story" ? 110 : 90) + (format === "story" ? 90 : 36);

  // ---- category pill ----
  ctx.textBaseline = "alphabetic";
  ctx.font = `800 30px ${sans}`;
  const label = cat.label.toUpperCase();
  const pillW = ctx.measureText(label).width + 56;
  ctx.fillStyle = cat.hex;
  roundRect(ctx, M, y, pillW, 62, 31);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(label, M + 28, y + 42);
  y += 62 + (format === "story" ? 56 : 30);

  // ---- bottom block first (so the title can use the space that is left) ----
  const cta = ctaFor(a);
  const ctaLabel = cta.kind === "detail" ? "En savoir plus" : cta.label;
  const bottomH = 118 + 30 + 96;
  const bottomTop = h - M - bottomH;

  // ---- title ----
  const maxTitleLines = format === "story" ? 6 : 4;
  let titleSize = format === "story" ? 112 : 80;
  let titleLines: string[] = [];
  for (; titleSize >= 52; titleSize -= 4) {
    ctx.font = `800 ${titleSize}px ${serif}`;
    titleLines = wrap(ctx, a.title, innerW);
    if (titleLines.length <= maxTitleLines) break;
  }
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 ${titleSize}px ${serif}`;
  for (const line of titleLines) {
    ctx.fillText(line, M, y + titleSize * 0.85);
    y += titleSize * 1.12;
  }
  y += format === "story" ? 40 : 26;

  // ---- facts first (when, where, how much): they are what people look for ----
  const facts = [prettyDate(a.eventDate), a.place || "", a.price || ""].filter(Boolean);
  ctx.font = `700 34px ${sans}`;
  let px = M;
  let factsBottom = y;
  for (const fact of facts) {
    const fw = ctx.measureText(fact).width + 48;
    if (px + fw > w - M && px > M) {
      px = M;
      y += 84;
    }
    if (y + 68 > bottomTop - 24) break;
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    roundRect(ctx, px, y, fw, 68, 34);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.fillText(fact, px + 24, y + 45);
    px += fw + 16;
    factsBottom = y + 68;
  }
  if (facts.length) y = factsBottom + (format === "story" ? 40 : 28);

  // ---- short description: as many lines as the room left allows ----
  const descSize = format === "story" ? 44 : 36;
  ctx.font = `400 ${descSize}px ${sans}`;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  const lineH = descSize * 1.4;
  const room = Math.floor((bottomTop - 24 - y) / lineH);
  const descLines = wrap(ctx, a.description, innerW);
  const shownLines = descLines.slice(0, Math.max(0, Math.min(room, format === "story" ? 7 : 4)));
  if (shownLines.length && descLines.length > shownLines.length) {
    let last = shownLines[shownLines.length - 1];
    while (last.length > 3 && ctx.measureText(last + "…").width > innerW) last = last.slice(0, -1);
    shownLines[shownLines.length - 1] = last.replace(/[s,;:.]+$/, "") + "…";
  }
  for (const line of shownLines) {
    ctx.fillText(line, M, y + descSize * 0.85);
    y += lineH;
  }

  // ---- bottom: the way to act, the phone, the address ----
  const btn = ctx.createLinearGradient(M, 0, w - M, 0);
  btn.addColorStop(0, "#b3263a");
  btn.addColorStop(1, "#7a1f2b");
  ctx.fillStyle = btn;
  roundRect(ctx, M, bottomTop, innerW, 118, 28);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 46px ${sans}`;
  ctx.textAlign = "center";
  ctx.fillText(`${ctaLabel}  →`, w / 2, bottomTop + 76);
  ctx.font = `700 36px ${sans}`;
  ctx.fillText(`${PHONE_DISPLAY}  ·  ${SITE_HOST}`, w / 2, bottomTop + 118 + 30 + 36);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = `400 28px ${sans}`;
  ctx.fillText("Kasumbalesa, route Lubumbashi, bâtiment Guy Ceta", w / 2, bottomTop + 118 + 30 + 84);
  ctx.textAlign = "left";
}

/** A window that makes the poster of an announcement and lets the administrator download it as a PNG picture. */
export default function PosterMaker({ announcement, onClose }: { announcement: Announcement; onClose: () => void }) {
  const [format, setFormat] = useState<Format>("square");
  const [busy, setBusy] = useState(true);
  const [photoFailed, setPhotoFailed] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  const render = useCallback(async () => {
    if (!canvas.current) return;
    setBusy(true);
    await drawPoster(canvas.current, announcement, format, !photoFailed);
    setBusy(false);
  }, [announcement, format, photoFailed]);

  useEffect(() => {
    render();
  }, [render]);

  const download = () => {
    const el = canvas.current;
    if (!el) return;
    const name = `affiche-${announcement.title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40)}-${format === "square" ? "carre" : "vertical"}.png`;
    try {
      el.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }, "image/png");
    } catch {
      // The browser refused to export a picture that came from another site: draw it again without the photo.
      setPhotoFailed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/70 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Créer l'affiche">
      <div className="my-auto w-full max-w-3xl rounded-3xl border border-line bg-surface p-4 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-ink">Affiche prête à publier</h2>
            <p className="text-sm text-ink-soft">Téléchargez l&apos;image, puis postez-la sur WhatsApp, Facebook ou TikTok.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-line text-ink-soft hover:text-ink">
            <X size={20} aria-hidden={true} />
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Format de l'affiche">
          {(Object.keys(SIZES) as Format[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              aria-pressed={format === f}
              className={`min-h-[48px] rounded-xl border px-4 text-left text-sm font-bold transition ${format === f ? "border-red-700 bg-red-700 text-white" : "border-line bg-surface text-ink-soft hover:border-red-600/60"}`}
            >
              {SIZES[f].label}
              <span className="block text-xs font-medium opacity-80">{SIZES[f].hint}</span>
            </button>
          ))}
        </div>

        <div className="relative flex w-full justify-center overflow-hidden rounded-2xl bg-surface-sunken p-2">
          <canvas
            ref={canvas}
            className="rounded-xl shadow-lg"
            style={format === "story" ? { height: "min(62vh, 560px)", width: "auto", maxWidth: "100%" } : { width: "100%", maxWidth: "560px", height: "auto" }}
            aria-label={`Aperçu de l'affiche : ${announcement.title}`}
          />
          {busy && <p className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/30 font-bold text-white">Création de l&apos;affiche…</p>}
        </div>
        {photoFailed && <p className="mt-2 text-sm text-ink-soft">La photo n&apos;a pas pu être utilisée dans l&apos;affiche : elle est faite avec le fond aux couleurs de BM.</p>}

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={download}
            disabled={busy}
            className="glow-accent inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-6 font-bold text-white disabled:opacity-60"
          >
            <Download size={18} aria-hidden={true} /> Télécharger l&apos;affiche (PNG)
          </button>
          <button type="button" onClick={onClose} className="min-h-[52px] rounded-xl border border-line px-6 font-bold text-ink-soft hover:text-ink">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
