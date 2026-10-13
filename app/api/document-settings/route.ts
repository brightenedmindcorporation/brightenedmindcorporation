import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { DEFAULT_DOCUMENT_SETTINGS, sanitizeDocumentSettings } from "@/lib/academy/documentSettings";

// Public, read-only: the PDF builders (student certificate download, admin
// tools) need the wording. Always live — never cached.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ settings: DEFAULT_DOCUMENT_SETTINGS });
    const snap = await getAdminDb().collection("config").doc("documents").get();
    return NextResponse.json({ settings: sanitizeDocumentSettings(snap.exists ? snap.data() : null) });
  } catch (error) {
    console.error("Error reading document settings:", error);
    return NextResponse.json({ settings: DEFAULT_DOCUMENT_SETTINGS });
  }
}
