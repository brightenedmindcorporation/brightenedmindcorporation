import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";

/**
 * Public, read-only: returns active announcements for the homepage
 * advertising space. Goes through the Admin SDK rather than the client SDK
 * so it never depends on Firestore security rules being configured for
 * anonymous reads (same reasoning as /api/live-sessions).
 */
export async function GET() {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ announcements: [] });
    }

    const adminDb = getAdminDb();
    const snap = await adminDb.collection("announcements").where("active", "==", true).get();
    const announcements = snap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a: any, b: any) => (b.createdAt > a.createdAt ? 1 : -1));

    return NextResponse.json({ announcements });
  } catch (error: any) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json({ announcements: [] });
  }
}
