import { NextResponse } from "next/server";
import { listPublicAnnouncements } from "@/lib/announcementsServer";

/**
 * Public, read-only: the announcements of the advertising space (published, started, not ended; pinned first).
 * Goes through the Admin SDK so it never depends on Firestore security rules for anonymous reads.
 */
export async function GET() {
  return NextResponse.json({ announcements: await listPublicAnnouncements() });
}
