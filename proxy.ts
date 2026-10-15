import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/academy/session";

/**
 * Optimistic route guard only — presence of the session cookie, not its
 * validity (Proxy can't call firebase-admin's verifySessionCookie network
 * call efficiently on every request). Every protected Server Component /
 * Route Handler must call verifySession() itself for the real check.
 *
 * Until FIREBASE_SERVICE_ACCOUNT_KEY is configured, /api/auth/session
 * never sets this cookie (see lib/firebase-admin.ts), so gating on it here
 * would lock every legitimate logged-in student out. In that case we skip
 * the redirect and rely on the existing client-side checks (localStorage /
 * onAuthStateChanged) each page already does — same behavior as before
 * this proxy existed.
 */
export function proxy(request: NextRequest) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // /admin is deliberately NOT gated here: the admin account is
  // not a student, so it never goes through the login page's student
  // approval flow that sets this session cookie — gating it here would
  // permanently lock the admin out (exactly what happened). The admin
  // page already does its own client-side Firebase Auth + email check,
  // and the two mutating actions (approve/reject) are independently
  // verified server-side via ID token in app/api/admin/*-student/route.ts.
  matcher: ["/academia/dashboard", "/academia/:lang/level/:path*"],
};
