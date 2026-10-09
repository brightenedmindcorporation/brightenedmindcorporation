import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/academy/session";

/**
 * Optimistic route guard only — presence of the session cookie, not its
 * validity (Proxy can't call firebase-admin's verifySessionCookie network
 * call efficiently on every request). Every protected Server Component /
 * Route Handler must call verifySession() itself for the real check.
 */
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/academy/dashboard", "/academy/admin", "/academy/level1/:path*"],
};
