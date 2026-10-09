// Jitsi (JaaS / 8x8.vc) live-class room naming. Each course/level gets its
// own room instead of bm-english's single hardcoded shared room, so two
// different classes never collide. NEXT_PUBLIC_JAAS_APP_ID must be set to
// a JaaS app id from https://jaas.8x8.vc to actually enable video.

export function isJitsiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_JAAS_APP_ID);
}

export function getJaasAppId(): string | undefined {
  return process.env.NEXT_PUBLIC_JAAS_APP_ID;
}

/**
 * sessionId lets the same course/level host more than one scheduled
 * session (e.g. a weekly recurring slot) without reusing the same room;
 * it defaults to "general" for a single always-on room per course/level.
 */
export function getLiveRoomName(langCode: string, level: number, sessionId: string = "general"): string {
  const safeSessionId = sessionId.replace(/[^a-zA-Z0-9-]/g, "");
  return `BMCA-${langCode}-L${level}-${safeSessionId}`;
}
