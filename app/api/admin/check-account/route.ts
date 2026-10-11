import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/**
 * Diagnostic-only: checks whether a real Firebase Auth user exists for a
 * given email, without ever touching passwords. Built to answer "does
 * this account actually exist, or did it never get created" when a
 * student reports a correct-looking password being rejected at login —
 * that error is identical for both causes, so this is the only way to
 * tell them apart.
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const url = new URL(request.url);
    const email = url.searchParams.get("email")?.trim();
    if (!email) return NextResponse.json({ error: "email requis." }, { status: 400 });

    try {
      const user = await getAdminAuth().getUserByEmail(email);
      return NextResponse.json({
        exists: true,
        uid: user.uid,
        disabled: user.disabled,
        createdAt: user.metadata.creationTime,
        lastSignInAt: user.metadata.lastSignInTime || null,
        providers: user.providerData.map((p) => p.providerId),
      });
    } catch (lookupError: any) {
      if (lookupError.code === "auth/user-not-found") {
        return NextResponse.json({ exists: false });
      }
      throw lookupError;
    }
  } catch (error: any) {
    console.error("Error checking account:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
