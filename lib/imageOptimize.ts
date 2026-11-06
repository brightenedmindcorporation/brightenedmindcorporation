import "server-only";
import sharp from "sharp";

/** Target weight of an uploaded picture: light enough to load fast on a mobile connection, sharp enough to look good. */
const TARGET_BYTES = 300_000;

export interface OptimizedImage {
  buffer: Buffer;
  filename: string;
  before: number;
  after: number;
}

/**
 * Makes an uploaded picture light, automatically: turned upright (phone photos), shrunk to at most 1600 px on the
 * long side, saved as WebP, with the quality lowered step by step until it weighs under about 300 KB.
 * A 3 MB photo typically ends up around 100 to 250 KB with no visible difference on a phone.
 */
export async function optimizeImage(file: File): Promise<OptimizedImage> {
  const input = Buffer.from(await file.arrayBuffer());
  const before = input.length;
  const name = (file.name || "image").replace(/\.[^.]+$/, "").replace(/[^A-Za-z0-9_-]+/g, "-").slice(0, 60) || "image";

  let size = 1600;
  let out: Buffer = Buffer.alloc(0);
  for (const step of [
    { size: 1600, quality: 80 },
    { size: 1600, quality: 70 },
    { size: 1600, quality: 60 },
    { size: 1280, quality: 60 },
    { size: 1024, quality: 55 },
  ]) {
    size = step.size;
    out = await sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: size, height: size, fit: "inside", withoutEnlargement: true })
      .webp({ quality: step.quality, effort: 4 })
      .toBuffer();
    if (out.length <= TARGET_BYTES) break;
  }
  // Never make a file heavier than the original (a tiny already-light picture).
  if (out.length >= before && before <= TARGET_BYTES && /\.webp$/i.test(file.name || "")) out = input;
  return { buffer: out, filename: `${name}.webp`, before, after: out.length };
}
