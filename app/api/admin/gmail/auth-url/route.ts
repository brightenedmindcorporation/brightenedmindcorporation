import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { isGmailOAuthConfigured, getAuthUrl } from "@/lib/gmail";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

export async function GET(request: Request) {
  try {
    if (!isAdminConfigured() || !isGmailOAuthConfigured()) {
      return NextResponse.json({ error: "Gmail n'est pas configuré côté serveur." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const state = crypto.randomBytes(24).toString("hex");
    const url = getAuthUrl(state);

    const response = NextResponse.json({ url });
    response.cookies.set("gmail_oauth_state", state, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 600,
      path: "/",
    });
    return response;
  } catch (error: any) {
    console.error("Error generating Gmail auth URL:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
