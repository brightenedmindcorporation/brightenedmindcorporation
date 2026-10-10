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
