/**
 * The brand mark is split into two layers (generated once from the
 * original logo-bm.png): logo-bm-red.png (the red arcs, same in both
 * themes) and logo-bm-black.png (the "BM" lettering, used only as a CSS
 * mask) — the mask is filled with the `ink` token, so it renders black in
 * light mode and white in dark mode automatically, without any JS.
 */
export default function BmLogo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="BM Corporation"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-bm-red.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain" />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-ink"
        style={{
          WebkitMaskImage: "url(/logo-bm-black.png)",
          maskImage: "url(/logo-bm-black.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </span>
  );
}
