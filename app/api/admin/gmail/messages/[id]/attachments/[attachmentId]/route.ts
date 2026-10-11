import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { getAttachmentData } from "@/lib/gmail";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

// Streams one Gmail attachment's raw bytes back to the admin, so it can be
// downloaded from the Mail tab instead of only being visible by opening the
// real Gmail inbox. Filename/mimeType are passed as query params — the
// client already has them from the message detail's `attachments` list.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; attachmentId: string }> }
) {
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

    const { id, attachmentId } = await params;
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename") || "piece-jointe";
    const mimeType = searchParams.get("mimeType") || "application/octet-stream";

    const data = await getAttachmentData(id, attachmentId);

    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
        "Content-Length": String(data.length),
      },
    });
  } catch (error: any) {
    console.error("Error downloading Gmail attachment:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
