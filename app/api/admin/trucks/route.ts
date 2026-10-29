import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { newTruckToken } from "@/lib/trucks";

export const dynamic = "force-dynamic";

const fail = (error: unknown) => {
  if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error("Trucks admin API failed:", error);
  return NextResponse.json({ error: (error as Error)?.message || "Erreur serveur." }, { status: 500 });
};
const text = (v: unknown, max = 120) => String(v ?? "").trim().slice(0, max);

/** The trucks with their last known position (administration only). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const snap = await getAdminDb().collection("trucks").orderBy("createdAt", "desc").limit(300).get();
    return NextResponse.json({ items: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
  } catch (error) {
    return fail(error);
  }
}

/** Registers a truck and gives it its driver link secret. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const b = await request.json().catch(() => ({}));
    const name = text(b.name);
    if (!name) return NextResponse.json({ error: "Le nom du camion est requis." }, { status: 400 });
    const doc = {
      name,
      plate: text(b.plate, 30),
      driver: text(b.driver),
      driverPhone: text(b.driverPhone, 40),
      token: newTruckToken(),
      active: true,
      sharing: false,
      createdAt: new Date().toISOString(),
    };
    const ref = await getAdminDb().collection("trucks").add(doc);
    return NextResponse.json({ item: { id: ref.id, ...doc } });
  } catch (error) {
    return fail(error);
  }
}

/** Changes a truck: { id, name?, plate?, driver?, driverPhone?, active?, renewToken? }. */
export async function PATCH(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const b = await request.json().catch(() => ({}));
    const id = text(b.id, 80);
    if (!id) return NextResponse.json({ error: "id requis." }, { status: 400 });
    const update: Record<string, unknown> = {};
    if (typeof b.name === "string" && text(b.name)) update.name = text(b.name);
    if (typeof b.plate === "string") update.plate = text(b.plate, 30);
    if (typeof b.driver === "string") update.driver = text(b.driver);
    if (typeof b.driverPhone === "string") update.driverPhone = text(b.driverPhone, 40);
    if (typeof b.active === "boolean") update.active = b.active;
    // A new secret cuts off the old link (a lost phone, a driver who left).
    if (b.renewToken) Object.assign(update, { token: newTruckToken(), sharing: false });
    await getAdminDb().collection("trucks").doc(id).set(update, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}

/** Removes a truck and detaches it from its parcels: { id }. */
export async function DELETE(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const b = await request.json().catch(() => ({}));
    const id = text(b.id, 80);
    if (!id) return NextResponse.json({ error: "id requis." }, { status: 400 });
    const db = getAdminDb();
    const linked = await db.collection("shipments").where("truckId", "==", id).get();
    const batch = db.batch();
    linked.docs.forEach((d) => batch.set(d.ref, { truckId: "" }, { merge: true }));
    batch.delete(db.collection("trucks").doc(id));
    await batch.commit();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
