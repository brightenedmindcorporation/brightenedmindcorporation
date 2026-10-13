import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { getMessageDetail, applyMailAction, type MailAction } from "@/lib/gmail";

const ACTIONS: MailAction[] = ["read", "unread", "star", "unstar", "archive", "trash", "untrash", "spam", "notspam"];

// Mailbox actions on one message (mark read/unread, star, archive, trash,
// spam…) — the same toolbar operations as Gmail itself.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== "brightenedmindcorporation@gmail.com") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { action } = await request.json();
    if (!ACTIONS.includes(action)) {
      return NextResponse.json({ error: "Action inconnue." }, { status: 400 });
    }
    const { id } = await params;
    await applyMailAction(id, action);
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error applying Gmail action:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}

// GET routes are cached by Next.js by default unless marked dynamic — this
// serves live admin data and must never be stale.
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const { id } = await params;
    const message = await getMessageDetail(id);
    return NextResponse.json({ message });
  } catch (error: any) {
    console.error("Error fetching Gmail message:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
