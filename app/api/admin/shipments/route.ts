import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { newTrackingCode, SHIPMENT_STATUSES, type ShipmentEvent } from "@/lib/tracking";

export const dynamic = "force-dynamic";

const fail = (error: unknown) => {
  if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error("Shipments admin API failed:", error);
  return NextResponse.json({ error: (error as Error)?.message || "Erreur serveur." }, { status: 500 });
};
const text = (v: unknown, max = 300) => String(v ?? "").trim().slice(0, max);
const clean = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

/** The shipments (administration only). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const snap = await getAdminDb().collection("shipments").orderBy("createdAt", "desc").limit(1000).get();
    return NextResponse.json({ items: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
  } catch (error) {
    return fail(error);
  }
}

/** Registers a shipment and gives it its code. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const b = await request.json().catch(() => ({}));
    const clientName = text(b.clientName, 120);
    const description = text(b.description, 400);
    if (!clientName || !description) return NextResponse.json({ error: "Le nom du client et la description sont requis." }, { status: 400 });
    const db = getAdminDb();
    let code = newTrackingCode();
    for (let i = 0; i < 5 && !(await db.collection("shipments").where("code", "==", code).limit(1).get()).empty; i++) code = newTrackingCode();
    const now = new Date().toISOString();
    const first: ShipmentEvent = clean({ status: "registered", note: text(b.note, 300) || undefined, location: text(b.origin, 120) || undefined, at: now });
    const weight = Number(b.weightKg);
    const doc = {
      code,
      clientName,
      clientPhone: text(b.clientPhone, 40),
      clientEmail: text(b.clientEmail, 120),
      category: text(b.category, 60) || "Colis",
      description,
      origin: text(b.origin, 120),
      destination: text(b.destination, 120),
      weightKg: Number.isFinite(weight) && weight > 0 ? weight : null,
      eta: text(b.eta, 20),
      truckId: text(b.truckId, 80),
      status: "registered",
      history: [first],
      createdAt: now,
      updatedAt: now,
    };
    const ref = await db.collection("shipments").add(doc);
    return NextResponse.json({ item: { id: ref.id, ...doc } });
  } catch (error) {
    return fail(error);
  }
}

/** Adds a step to a shipment: { id, status, note?, location?, eta? }. */
export async function PATCH(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const b = await request.json().catch(() => ({}));
    const id = text(b.id, 80);
    const status = text(b.status, 30);
    const truckOnly = !status && typeof b.truckId === "string";
    if (!id || (!truckOnly && !SHIPMENT_STATUSES.some((s) => s.id === status))) return NextResponse.json({ error: "Colis ou état invalide." }, { status: 400 });
    const ref = getAdminDb().collection("shipments").doc(id);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ error: "Colis introuvable." }, { status: 404 });
    // Assigning a truck is not a step of the journey: no new history entry.
    if (truckOnly) {
      await ref.set({ truckId: text(b.truckId, 80) }, { merge: true });
      return NextResponse.json({ ok: true });
    }
    const now = new Date().toISOString();
    const event: ShipmentEvent = clean({ status, note: text(b.note, 300) || undefined, location: text(b.location, 120) || undefined, at: now });
    const history = [...(snap.data()!.history || []), event];
    const update: Record<string, unknown> = { status, history, updatedAt: now };
    if (typeof b.eta === "string") update.eta = text(b.eta, 20);
    if (typeof b.truckId === "string") update.truckId = text(b.truckId, 80);
    await ref.set(update, { merge: true });
    return NextResponse.json({ item: { id, ...snap.data(), ...update } });
  } catch (error) {
    return fail(error);
  }
}

/** Removes a shipment registered by mistake: { id }. */
export async function DELETE(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const b = await request.json().catch(() => ({}));
    const id = text(b.id, 80);
    if (!id) return NextResponse.json({ error: "id requis." }, { status: 400 });
    await getAdminDb().collection("shipments").doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
