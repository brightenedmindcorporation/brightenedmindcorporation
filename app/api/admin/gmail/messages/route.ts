import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { isGmailOAuthConfigured, isGmailConnected, listMessages, type MailFolder } from "@/lib/gmail";

// GET routes are cached by Next.js by default unless marked dynamic — this
// serves live admin data and must never be stale.
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

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

    if (!isGmailOAuthConfigured()) {
      return NextResponse.json({ connected: false, configured: false, messages: [] });
    }
    if (!(await isGmailConnected())) {
      return NextResponse.json({ connected: false, configured: true, messages: [] });
    }

    const { searchParams } = new URL(request.url);
    const folder = (searchParams.get("folder") || "inbox") as MailFolder;
    const result = await listMessages({
      folder,
      query: searchParams.get("q") || undefined,
      pageToken: searchParams.get("pageToken") || undefined,
      maxResults: 25,
    });
    return NextResponse.json({ connected: true, configured: true, ...result });
  } catch (error: any) {
    console.error("Error listing Gmail messages:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
