// Level progression helpers (no server or browser APIs: usable on both sides).
//
// A student keeps ONE Student ID per language for good (BMCA-EN-2026-008) —
// records, payments and certificates all point to it. Each level they unlock
// gets its own level registration number derived from it, with the level in
// it: BMCA-EN-L1-2026-008, BMCA-EN-L2-2026-008…

/** "Level 2" → 2 (1 when missing or not a language level such as "N/A"). */
export function levelNumber(level: unknown): number {
  const n = Number(String(level ?? "").slice(-1));
  return n >= 1 && n <= 3 ? n : 1;
}

export const levelLabel = (n: number) => `Level ${n}`;

/** BMCA-EN-2026-008 + level 2 → BMCA-EN-L2-2026-008 ("" when the ID has no known shape). */
export function levelRef(studentId: string | undefined | null, level: number): string {
  const parts = String(studentId ?? "").split("-");
  if (parts.length !== 4 || parts[0] !== "BMCA") return "";
  return `${parts[0]}-${parts[1]}-L${level}-${parts[2]}-${parts[3]}`;
}

/** Highest level the enrolment gives access to. */
export function allowedLevel(enrollment: { level?: unknown } | undefined | null): number {
  return levelNumber(enrollment?.level);
}
