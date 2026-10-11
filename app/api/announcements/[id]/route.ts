import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";

// Public: a single active announcement, used by the detail ("Voir le
// détail") and job application ("Postuler") pages.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Annonce introuvable." }, { status: 404 });
    }

    const { id } = await params;
    const snap = await getAdminDb().collection("announcements").doc(id).get();
    const data = snap.data();
    const expired = data?.expiresAt && data.expiresAt <= new Date().toISOString();

    if (!snap.exists || !data?.active || expired) {
      return NextResponse.json({ error: "Annonce introuvable." }, { status: 404 });
    }

    return NextResponse.json({ announcement: { id: snap.id, ...snap.data() } });
  } catch (error: any) {
    console.error("Error fetching announcement:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
