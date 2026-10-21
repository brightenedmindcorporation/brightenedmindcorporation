/**
 * The seals of Brightened Mind Corporation and of its departments, drawn as SVG (sharp at any size, usable
 * in pages, PDF and print). One family: the same double ring, the same lettering, the same emblem; only
 * the centre (icon + ribbon) and the ink colour change from one department to another.
 */
export type SealKind = "company" | "academia" | "communication" | "domestica";

export const SEAL_INFO: Record<SealKind, { label: string; ink: string; bottom: string; ribbon?: string; note: string }> = {
  company: {
    label: "Brightened Mind Corporation",
    ink: "#b3121b",
    bottom: "BMCORPORATION-CD.COM",
    note: "Sceau principal : demi-cercles de votre logo (le son qui rayonne) et ses échos en traits fins.",
  },
  academia: {
    label: "BM Academia",
    ink: "#1d3f7a",
    bottom: "FORMATION · LANGUES",
    ribbon: "ACADEMIA",
    note: "Bleu nuit = savoir et sérieux. Toque de diplômé pour les certificats et les fiches.",
  },
  communication: {
    label: "BM Communication",
    ink: "#6a2c91",
    bottom: "COMMUNICATION · CRÉATION",
    ribbon: "COMMUNICATION",
    note: "Violet = créativité. Bulle de dialogue.",
  },
  domestica: {
    label: "BM Domestica",
    ink: "#1d7a4d",
    bottom: "PERSONNEL DOMESTIQUE",
    ribbon: "DOMESTICA",
    note: "Vert = confiance et foyer. Maison.",
  },
};

const C = 200;
const rad = (deg: number) => (deg * Math.PI) / 180;
/** Point at angle `deg` (clockwise from the top) and radius `r`. */
const pt = (deg: number, r: number) => `${(C + r * Math.sin(rad(deg))).toFixed(2)},${(C - r * Math.cos(rad(deg))).toFixed(2)}`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function arcText(id: string, text: string, r: number, from: number, to: number, clockwise: boolean, maxSize: number, ink: string) {
  const span = Math.abs(to - from);
  const length = rad(span) * r;
  const size = Math.min(maxSize, length / (text.length * 0.78));
  const path = `M ${pt(from, r)} A ${r} ${r} 0 ${span > 180 ? 1 : 0} ${clockwise ? 1 : 0} ${pt(to, r)}`;
  return `<path id="${id}" d="${path}" fill="none"/><text font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${size.toFixed(1)}" letter-spacing="${(size * 0.12).toFixed(1)}" fill="${ink}"><textPath href="#${id}" startOffset="50%" text-anchor="middle">${esc(text)}</textPath></text>`;
}

function diamond(deg: number, r: number, ink: string) {
  const [x, y] = pt(deg, r).split(",").map(Number);
  return `<path d="M ${x},${y - 6} L ${x + 5},${y} L ${x},${y + 6} L ${x - 5},${y} Z" fill="${ink}"/>`;
}

/** The logo's half-circles, with their echo on the right in fine lines. */
function emblem(cx: number, cy: number, s: number, ink: string) {
  const R = 62 * s;
  const band = 39 * s;
  const disc = 25 * s;
  const left = `M ${cx},${cy - R} A ${R} ${R} 0 0 0 ${cx},${cy + R} L ${cx},${cy + band} A ${band} ${band} 0 0 1 ${cx},${cy - band} Z`;
  const half = `M ${cx},${cy - disc} A ${disc} ${disc} 0 0 0 ${cx},${cy + disc} Z`;
  const echo = [R, band + 2 * s, disc + 3 * s]
    .map((r, i) => `<path d="M ${cx + 5 * s},${cy - r} A ${r} ${r} 0 0 1 ${cx + 5 * s},${cy + r}" fill="none" stroke="${ink}" stroke-width="${(i === 0 ? 2.2 : 1.6) * s}" stroke-linecap="round" opacity="${1 - i * 0.22}"/>`)
    .join("");
  return `<path d="${left}" fill="${ink}"/><path d="${half}" fill="${ink}"/>${echo}`;
}

function icon(kind: SealKind, cx: number, cy: number, ink: string) {
  const stroke = `fill="none" stroke="${ink}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"`;
  if (kind === "academia")
    return `<path d="M ${cx - 36},${cy - 4} L ${cx},${cy - 24} L ${cx + 36},${cy - 4} L ${cx},${cy + 16} Z" ${stroke} fill="${ink}" fill-opacity="0.15"/><path d="M ${cx - 20},${cy + 5} V ${cy + 20} Q ${cx},${cy + 32} ${cx + 20},${cy + 20} V ${cy + 5}" ${stroke}/><path d="M ${cx + 36},${cy - 4} V ${cy + 18}" ${stroke}/>`;
  if (kind === "communication")
    return `<rect x="${cx - 36}" y="${cy - 26}" width="72" height="46" rx="14" ${stroke} fill="${ink}" fill-opacity="0.15"/><path d="M ${cx - 16},${cy + 20} L ${cx - 24},${cy + 34} L ${cx + 2},${cy + 20}" ${stroke}/><path d="M ${cx - 20},${cy - 10} H ${cx + 20} M ${cx - 20},${cy + 2} H ${cx + 8}" ${stroke}/>`;
  return `<path d="M ${cx - 38},${cy + 2} L ${cx},${cy - 28} L ${cx + 38},${cy + 2}" ${stroke}/><path d="M ${cx - 28},${cy - 6} V ${cy + 28} H ${cx + 28} V ${cy - 6}" ${stroke} fill="${ink}" fill-opacity="0.15"/><path d="M ${cx - 8},${cy + 28} V ${cy + 10} H ${cx + 8} V ${cy + 28}" ${stroke}/>`;
}

export interface SealOptions {
  /** Ink colour (default: the seal's own colour). Use "#111" for a black-and-white print. */
  ink?: string;
  /** Rubber-stamp look: slightly uneven ink and a small tilt. */
  worn?: boolean;
  /** Size in pixels (the drawing is square). */
  size?: number;
  /** Several seals in one page need different ids. */
  idPrefix?: string;
  /** Extra line under the ring text, e.g. a registration number: "RCCM CD/XXX/…" (put only a real one). */
  registration?: string;
}

export function sealSvg(kind: SealKind, opts: SealOptions = {}): string {
  const info = SEAL_INFO[kind];
  const ink = opts.ink ?? info.ink;
  const p = opts.idPrefix ?? `seal-${kind}`;
  const size = opts.size ?? 400;
  const bottom = opts.registration ? opts.registration : info.bottom;

  const ring = `<circle cx="${C}" cy="${C}" r="192" fill="none" stroke="${ink}" stroke-width="6"/><circle cx="${C}" cy="${C}" r="183" fill="none" stroke="${ink}" stroke-width="1.6"/><circle cx="${C}" cy="${C}" r="137" fill="none" stroke="${ink}" stroke-width="2.6"/><circle cx="${C}" cy="${C}" r="130" fill="none" stroke="${ink}" stroke-width="1"/>`;
  const texts =
    arcText(`${p}-top`, "BRIGHTENED MIND CORPORATION", 152, -104, 104, true, 25, ink) +
    arcText(`${p}-bot`, bottom, 169, 246, 114, false, 19, ink) +
    diamond(109, 160, ink) +
    diamond(251, 160, ink);

  let centre: string;
  if (kind === "company") {
    centre = `${emblem(C - 4, 168, 1, ink)}<text x="${C}" y="262" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="800" font-size="40" letter-spacing="10" fill="${ink}">BM</text><path d="M ${C - 52},276 H ${C + 52}" stroke="${ink}" stroke-width="1.6"/><path d="M ${C - 34},284 H ${C + 34}" stroke="${ink}" stroke-width="1"/>`;
  } else {
    const ribbon = info.ribbon!;
    const fs = Math.min(24, 190 / (ribbon.length * 0.95));
    centre = `${icon(kind, C, 158, ink)}<rect x="88" y="214" width="224" height="38" rx="3" fill="${ink}"/><text x="${C}" y="240" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="800" font-size="${fs.toFixed(1)}" letter-spacing="${(fs * 0.22).toFixed(1)}" fill="#fff">${ribbon}</text><path d="M ${C - 54},268 H ${C + 54}" stroke="${ink}" stroke-width="1.6"/><g transform="translate(${C - 6},284) scale(0.2)">${emblem(0, 0, 1, ink)}</g>`;
  }

  const filter = opts.worn
    ? `<filter id="${p}-worn" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -9 5.7" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>`
    : "";
  const body = `${ring}${texts}${centre}`;
  const wrapped = opts.worn ? `<g transform="rotate(-4 ${C} ${C})" filter="url(#${p}-worn)" opacity="0.92">${body}</g>` : body;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="${size}" height="${size}" role="img" aria-label="Sceau ${esc(info.label)}">${filter ? `<defs>${filter}</defs>` : ""}${wrapped}</svg>`;
}

/** What the cachet (rectangular stamp) says on its second line. */
const CACHET_TITLE: Record<SealKind, string> = {
  company: "L'ADMINISTRATION",
  academia: "BM ACADEMIA",
  communication: "BM COMMUNICATION",
  domestica: "BM DOMESTICA",
};

/**
 * The cachet: the rectangular stamp with the date line, for letters, receipts and certificates. Same family as the
 * seals (double frame, the logo's half-circles); the date is left blank to be filled in by hand or by the system.
 */
export function cachetSvg(kind: SealKind, opts: SealOptions & { date?: string } = {}): string {
  const info = SEAL_INFO[kind];
  const ink = opts.ink ?? info.ink;
  const p = opts.idPrefix ?? `cachet-${kind}`;
  const width = opts.size ?? 560;
  const font = `font-family="Georgia, 'Times New Roman', serif"`;
  const fit = (text: string, x: number, y: number, size: number, length: number, weight = 700, spacing = 1) =>
    `<text x="${x}" y="${y}" text-anchor="middle" ${font} font-weight="${weight}" font-size="${size}" letter-spacing="${spacing}" textLength="${length}" lengthAdjust="spacingAndGlyphs" fill="${ink}">${esc(text)}</text>`;
  const date = opts.date ?? "";
  const body =
    `<rect x="6" y="6" width="548" height="268" rx="26" fill="none" stroke="${ink}" stroke-width="6"/>` +
    `<rect x="17" y="17" width="526" height="246" rx="18" fill="none" stroke="${ink}" stroke-width="1.6"/>` +
    `<g>${emblem(84, 132, 0.95, ink)}</g>` +
    `<path d="M 150,36 V 244" stroke="${ink}" stroke-width="1.6"/>` +
    fit("BRIGHTENED MIND CORPORATION", 345, 76, 24, 370) +
    `<path d="M 170,92 H 520" stroke="${ink}" stroke-width="2.4"/>` +
    fit(CACHET_TITLE[kind], 345, 134, 33, 330, 800, 3) +
    fit("bmcorporation-cd.com", 345, 168, 18, 250, 600, 1) +
    `<path d="M 170,186 H 520" stroke="${ink}" stroke-width="1.2"/>` +
    (date
      ? fit(`Fait le ${date}`, 345, 224, 22, 300, 700, 1)
      : `<text x="170" y="224" ${font} font-size="21" font-weight="600" fill="${ink}">Fait le</text><path d="M 250,226 H 290 M 304,226 H 344 M 358,226 H 440" stroke="${ink}" stroke-width="1.6"/><text x="296" y="224" ${font} font-size="22" fill="${ink}">/</text><text x="350" y="224" ${font} font-size="22" fill="${ink}">/</text>`);
  const filter = opts.worn
    ? `<defs><filter id="${p}-worn" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -9 5.7" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter></defs>`
    : "";
  const wrapped = opts.worn ? `<g transform="rotate(-2.5 280 140)" filter="url(#${p}-worn)" opacity="0.92">${body}</g>` : body;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 280" width="${width}" height="${width / 2}" role="img" aria-label="Cachet ${esc(info.label)}">${filter}${wrapped}</svg>`;
}
