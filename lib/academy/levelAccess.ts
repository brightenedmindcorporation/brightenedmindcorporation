// Level progression helpers (no server or browser APIs: usable on both sides).
//
// A student keeps ONE Student ID per language for good (BMCA-EN-2026-008):
// it never changes when they move up a level.

/** "Level 2" → 2 (1 when missing or not a language level such as "N/A"). */
export function levelNumber(level: unknown): number {
  const n = Number(String(level ?? "").slice(-1));
  return n >= 1 && n <= 3 ? n : 1;
}

export const levelLabel = (n: number) => `Level ${n}`;

/** Highest level the enrolment gives access to. */
export function allowedLevel(enrollment: { level?: unknown } | undefined | null): number {
  return levelNumber(enrollment?.level);
}
