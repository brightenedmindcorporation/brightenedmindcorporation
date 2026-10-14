import { NextResponse } from "next/server";
import { checkRealEmail } from "@/lib/emailValidation";

/**
 * Pre-flight check used by the registration and contact forms (the same
 * checker also runs on the server of every endpoint that stores an address,
 * so skipping this call gains nothing).
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const check = await checkRealEmail(email);
    if (check.valid) return NextResponse.json({ valid: true });
    return NextResponse.json({ valid: false, reason: check.reason, message: check.message, suggestion: check.suggestion });
  } catch (error) {
    console.error("Error validating email:", error);
    // Fail open on unexpected server errors — a broken lookup shouldn't
    // block everyone; the endpoints that store the address re-check anyway.
    return NextResponse.json({ valid: true });
  }
}
