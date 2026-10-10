import { NextResponse } from "next/server";
import dns from "node:dns/promises";

// Deliberately stricter than the browser's built-in type="email" check,
// which accepts things like "a@b" with no real top-level domain.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/**
 * Validates that an email address is well-formed AND that its domain has
 * MX records (i.e. the domain is actually configured to receive mail).
 * This catches typos and made-up domains (e.g. "test@asdkjasd.com")
 * without requiring the heavier flow of sending and waiting on a
 * verification link.
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ valid: false, reason: "format" });
    }

    const domain = email.trim().split("@")[1];

    try {
      const mxRecords = await dns.resolveMx(domain);
      if (!mxRecords || mxRecords.length === 0) {
        return NextResponse.json({ valid: false, reason: "no-mx" });
      }
    } catch {
      // ENOTFOUND / ENODATA — the domain doesn't exist or has no mail setup.
      return NextResponse.json({ valid: false, reason: "no-mx" });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Error validating email:", error);
    // Fail open on unexpected server errors — a broken DNS lookup
    // shouldn't block registration entirely.
    return NextResponse.json({ valid: true });
  }
}
