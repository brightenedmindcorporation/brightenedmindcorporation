import Link from "next/link";
import { isOfficeProgram } from "@/content/curriculum";

/** Back link to the level page; French for the office course. */
export default function BackToLevel({ href, langSlug, className = "" }: { href: string; langSlug: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface hover:bg-surface-alt px-4 py-2 rounded-xl border border-line transition shadow-lg ${className}`}
    >
      {isOfficeProgram(langSlug) ? "← Retour au niveau" : "← Back to Level"}
    </Link>
  );
}
