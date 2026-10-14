/**
 * The brand mark is split into two layers (generated once from the
 * original logo-bm.png): logo-bm-red.png (the red arcs) and
 * logo-bm-black.png (the "BM" lettering), both used as CSS masks.
 *
 * tone:
 *  - "auto" (default): red arcs + lettering filled with the `ink` token —
 *    black on light themes, white on dark themes. Right for the normal
 *    page background (cream or near-black).
 *  - "white": every part white — for a solid red / burgundy background,
 *    where the red arcs would otherwise disappear.
 *  - "black": every part black — for a solid red or other coloured light
 *    background.
 *
 * Static PNG equivalents for non-React uses (emails, videos, social):
 * /logo-bm-on-dark.png (red arcs + white letters, for black/dark
 * backgrounds), /logo-bm-white.png and /logo-bm-mono-black.png.
 */
type Tone = "auto" | "white" | "black";

const maskStyle = (url: string) => ({
  WebkitMaskImage: `url(${url})`,
  maskImage: `url(${url})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
});

export default function BmLogo({
  size = 40,
  className = "",
  tone = "auto",
}: {
  size?: number;
  className?: string;
  tone?: Tone;
}) {
  const solid = tone === "white" ? "bg-white" : tone === "black" ? "bg-black" : null;
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="BM Corporation"
    >
      {solid ? (
        <span aria-hidden="true" className={`absolute inset-0 ${solid}`} style={maskStyle("/logo-bm-red.png")} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/logo-bm-red.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain" />
      )}
      <span aria-hidden="true" className={`absolute inset-0 ${solid ?? "bg-ink"}`} style={maskStyle("/logo-bm-black.png")} />
    </span>
  );
}
