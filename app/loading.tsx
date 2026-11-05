// Shown while a page loads: a calm spinner and a sentence, so nobody wonders whether the site froze.
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-ink-soft" role="status" aria-live="polite">
      <span className="h-10 w-10 rounded-full border-4 border-line border-t-red-600 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      <p className="font-medium">Chargement en cours…</p>
    </div>
  );
}
