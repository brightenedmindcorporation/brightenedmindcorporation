import { cookies } from "next/headers";
import { getAdminAuth, isAdminConfigured } from "@/lib/firebase-admin";

export const SESSION_COOKIE = "bm_session";
const SESSION_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

export type SessionUser = { uid: string; email: string | null };

/**
 * Real, server-side session check — use this inside Server Components,
 * Route Handlers and Server Actions that actually gate data/mutations.
 * proxy.ts only does an optimistic cookie-presence check; this is the
 * source of truth (see Next.js's Data Access Layer auth guidance).
 */
export async function verifySession(): Promise<SessionUser | null> {
  if (!isAdminConfigured()) return null;

  const jar = await cookies();
  const cookie = jar.get(SESSION_COOKIE)?.value;
  if (!cookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(cookie, true);
    return { uid: decoded.uid, email: decoded.email ?? null };
  } catch {
    return null;
  }
}

export async function createSessionCookie(idToken: string): Promise<string> {
  return getAdminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });
}
