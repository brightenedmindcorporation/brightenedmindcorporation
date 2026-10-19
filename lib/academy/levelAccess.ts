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

/**
 * The level the student registered at. Someone who registers at level 2 or 3 gets that level (and the
 * ones the administration opens after it), never the levels below. Enrolments created before this rule
 * have no start level: they keep access from level 1.
 */
export function startLevel(enrollment: { startLevel?: unknown } | undefined | null): number {
  const n = Number(enrollment?.startLevel);
  return n >= 1 && n <= 3 ? n : 1;
}

/** Whether a level is within the student's access: from the level they started at up to the highest unlocked. */
export function canAccessLevel(
  enrollment: { level?: unknown; startLevel?: unknown; placement?: { status?: string } } | undefined | null,
  level: number
): boolean {
  // A student who is waiting for their placement test (to take it, or to be corrected) has no level yet.
  if (placementPending(enrollment)) return false;
  return level >= startLevel(enrollment) && level <= allowedLevel(enrollment);
}

/** True while the student's level is still to be decided: the test is to be taken, or awaits correction. */
export function placementPending(enrollment: { placement?: { status?: string } } | undefined | null): boolean {
  const status = enrollment?.placement?.status;
  return status === "requested" || status === "submitted";
}
