import { NextResponse } from "next/server";
import { getPublicAnnouncement } from "@/lib/announcementsServer";

// Public: a single visible announcement, used by its detail page and the job application page.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const announcement = await getPublicAnnouncement(id);
  if (!announcement) return NextResponse.json({ error: "Annonce introuvable." }, { status: 404 });
  return NextResponse.json({ announcement });
}
