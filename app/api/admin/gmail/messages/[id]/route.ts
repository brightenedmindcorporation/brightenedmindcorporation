import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { getMessageDetail } from "@/lib/gmail";

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
