/**
 * Study streak ("série de jours"): how many days in a row the student really studied.
 * A day counts when the student spent at least MIN_SECONDS of active time on the platform that day.
 * The streak stays alive until the end of the day after the last studied day, so a student who has not
 * studied yet today still sees yesterday's streak (and can save it by studying now).
 */
export const MIN_SECONDS = 60;

export interface StreakInfo {
  /** Consecutive studied days up to today (or up to yesterday while today is still open). */
  current: number;
  /** Longest run of consecutive studied days in the period looked at. */
  best: number;
  /** Number of studied days in the period looked at. */
  total: number;
  /** True when today already counts. */
  todayDone: boolean;
  /** The last 7 days, oldest first: [{ day: "YYYY-MM-DD", done: boolean }]. */
  week: { day: string; done: boolean }[];
}

const DAY_MS = 86_400_000;

/** Calendar day (YYYY-MM-DD) shifted by n days, computed on UTC dates so it never depends on the server's time zone. */
export function shiftDay(day: string, n: number): string {
  const t = Date.parse(`${day}T00:00:00Z`) + n * DAY_MS;
  return new Date(t).toISOString().slice(0, 10);
}

/** `studiedDays`: every day (YYYY-MM-DD) the student studied. `today`: today's day in the school's time zone. */
export function computeStreak(studiedDays: string[], today: string): StreakInfo {
  const set = new Set(studiedDays);
  const todayDone = set.has(today);

  let current = 0;
  let cursor = todayDone ? today : shiftDay(today, -1);
  while (set.has(cursor)) {
    current++;
    cursor = shiftDay(cursor, -1);
  }

  const sorted = [...set].sort();
  let best = 0;
  let run = 0;
  let previous = "";
  for (const day of sorted) {
    run = previous && shiftDay(previous, 1) === day ? run + 1 : 1;
    if (run > best) best = run;
    previous = day;
  }

  const week = Array.from({ length: 7 }, (_, i) => {
    const day = shiftDay(today, i - 6);
    return { day, done: set.has(day) };
  });

  return { current, best, total: set.size, todayDone, week };
}
