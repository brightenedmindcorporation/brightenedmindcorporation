import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { normalizeCode, type PublicShipment } from "@/lib/tracking";

export const dynamic = "force-dynamic";

// A little brake against someone trying many codes: 20 searches a minute for one address.
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n++;
  return h.n > 20;
}

/** Public: the progress of one shipment, found with its code. Never returns the client's name, phone or e-mail. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Service indisponible." }, { status: 503 });
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(ip)) return NextResponse.json({ error: "Trop de recherches. Réessayez dans une minute." }, { status: 429 });
    const code = normalizeCode(new URL(request.url).searchParams.get("code") || "");
    if (!/^BMT-[A-Z0-9]{6}$/.test(code)) return NextResponse.json({ error: "Code invalide. Il ressemble à BMT-7K4Q2X." }, { status: 400 });
    const snap = await getAdminDb().collection("shipments").where("code", "==", code).limit(1).get();
    if (snap.empty) return NextResponse.json({ error: "Aucun colis ne correspond à ce code." }, { status: 404 });
    const s = snap.docs[0].data();
    const shipment: PublicShipment = {
      code: s.code,
      category: s.category,
      description: s.description,
      origin: s.origin,
      destination: s.destination,
      eta: s.eta || undefined,
      status: s.status,
      history: s.history || [],
      updatedAt: s.updatedAt,
    };
    return NextResponse.json({ shipment });
  } catch (error) {
    console.error("Tracking lookup failed:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
