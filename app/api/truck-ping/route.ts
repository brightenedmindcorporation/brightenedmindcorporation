import { NextResponse } from "next/server";
import { TRACKING_ENABLED } from "@/lib/features";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// One report every 2 seconds per driver link at most.
const last = new Map<string, number>();

const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);

/** Called by the driver's phone with the secret of its link: { token, lat, lng, speed?, heading?, accuracy? } or { token, stop: true }. */
export async function POST(request: Request) {
  try {
    if (!TRACKING_ENABLED) return NextResponse.json({ error: "Service indisponible." }, { status: 404 });
    if (!isAdminConfigured()) return NextResponse.json({ error: "Service indisponible." }, { status: 503 });
    const b = await request.json().catch(() => ({}));
    const token = String(b.token ?? "").trim();
    if (!/^[a-z0-9]{24}$/.test(token)) return NextResponse.json({ error: "Lien invalide." }, { status: 400 });

    const now = Date.now();
    if (now - (last.get(token) ?? 0) < 2000 && !b.stop) return NextResponse.json({ ok: true, skipped: true });
    last.set(token, now);
    if (last.size > 2000) last.clear();

    const snap = await getAdminDb().collection("trucks").where("token", "==", token).limit(1).get();
    if (snap.empty) return NextResponse.json({ error: "Lien invalide ou remplacé." }, { status: 404 });
    const doc = snap.docs[0];
    if (doc.data().active === false) return NextResponse.json({ error: "Ce camion est désactivé." }, { status: 403 });

    if (b.stop) {
      await doc.ref.set({ sharing: false, updatedAt: new Date().toISOString() }, { merge: true });
      return NextResponse.json({ ok: true });
    }

    const lat = num(b.lat);
    const lng = num(b.lng);
    if (lat === null || lng === null || Math.abs(lat) > 90 || Math.abs(lng) > 180) return NextResponse.json({ error: "Position invalide." }, { status: 400 });
    // Metres per second from the phone, kept as km/h.
    const speed = num(b.speed);
    await doc.ref.set(
      { lat, lng, speedKmh: speed === null ? null : Math.round(speed * 3.6), heading: num(b.heading), accuracy: num(b.accuracy), sharing: true, updatedAt: new Date().toISOString() },
      { merge: true }
    );
    return NextResponse.json({ ok: true, name: doc.data().name });
  } catch (error) {
    console.error("Truck ping failed:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
