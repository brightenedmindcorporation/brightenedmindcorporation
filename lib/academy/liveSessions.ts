// Shared types + access-window logic for scheduled live classes. Used by
// both the admin management UI and the student-facing gate (level page,
// dashboard, live page) so the "is this session joinable right now" rule
// lives in exactly one place.

export interface LiveSession {
  id: string;
  langCode: string;
  level: number;
  title?: string;
  scheduledAt: string; // ISO datetime
  durationMinutes: number;
  createdAt?: string;
  /** The teacher who scheduled it: the class is for that teacher's students only. */
  teacherUid?: string | null;
  teacherName?: string | null;
  /** When set, only these students may attend (chosen by whoever scheduled the class); otherwise everyone concerned. */
  studentUids?: string[] | null;
  /** True while the teacher has opened the room to students. */
  open?: boolean;
  openedAt?: string;
  endedAt?: string;
}

/** An open room stays valid this long after the scheduled end, so a class
 * that overruns is never cut off, yet a room the teacher forgot to close
 * can't be joined days later. */
const OPEN_GRACE_AFTER_END_MIN = 180;

export function isSessionOpenNow(
  session: Pick<LiveSession, "scheduledAt" | "durationMinutes" | "open">,
  now: Date = new Date()
): boolean {
  if (session.open !== true) return false;
  const end = new Date(session.scheduledAt).getTime() + session.durationMinutes * 60_000;
  return now.getTime() <= end + OPEN_GRACE_AFTER_END_MIN * 60_000;
}

// Students can join from 10 minutes before the scheduled start until the
// scheduled end (start + duration) + 10 minutes, to tolerate a session
// that starts a little late or runs a little over.
const JOIN_WINDOW_BEFORE_MIN = 10;
const JOIN_WINDOW_AFTER_MIN = 10;

export function getSessionWindow(session: Pick<LiveSession, "scheduledAt" | "durationMinutes">) {
  const start = new Date(session.scheduledAt).getTime();
  const end = start + session.durationMinutes * 60_000;
  return {
    opensAt: new Date(start - JOIN_WINDOW_BEFORE_MIN * 60_000),
    closesAt: new Date(end + JOIN_WINDOW_AFTER_MIN * 60_000),
  };
}

export function isSessionJoinable(session: Pick<LiveSession, "scheduledAt" | "durationMinutes">, now: Date = new Date()): boolean {
  const { opensAt, closesAt } = getSessionWindow(session);
  return now >= opensAt && now <= closesAt;
}

export function isSessionUpcomingOrLive(session: Pick<LiveSession, "scheduledAt" | "durationMinutes">, now: Date = new Date()): boolean {
  const { closesAt } = getSessionWindow(session);
  return now <= closesAt;
}
