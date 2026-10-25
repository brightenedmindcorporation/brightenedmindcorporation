import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";

export const dynamic = "force-dynamic";

const CANDIDATE_STATUS = ["new", "contacted", "verified", "training", "available", "placed", "closed"];
const EMPLOYER_STATUS = ["new", "contacted", "proposing", "placed", "closed"];

const fail = (error: unknown) => {
  if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error("Domestica admin API failed:", error);
  return NextResponse.json({ error: (error as Error)?.message || "Erreur serveur." }, { status: 500 });
};

/** The requests and applications of BM Domestica (administration only). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const snap = await getAdminDb().collection("domesticaRequests").orderBy("createdAt", "desc").limit(1000).get();
    return NextResponse.json({ items: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
  } catch (error) {
    return fail(error);
  }
}

/**
 * Updates one record. Body: { id, status?, note?, placeWith?, unplace?, followUp? }.
 * placeWith links an employer request and a candidate (both become "placed"); unplace undoes it;
 * followUp marks the 30-day or 90-day check as done.
 */
export async function PATCH(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["admin"]);
    const body = await request.json().catch(() => ({}));
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "id requis." }, { status: 400 });
    const db = getAdminDb();
    const ref = db.collection("domesticaRequests").doc(id);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
    const data = snap.data()!;
    const now = new Date().toISOString();
    const by = caller.name || caller.email || "admin";
    const update: Record<string, unknown> = { updatedAt: now };

    if (typeof body.status === "string") {
      const allowed = data.kind === "candidate" ? CANDIDATE_STATUS : EMPLOYER_STATUS;
      if (!allowed.includes(body.status)) return NextResponse.json({ error: "Statut inconnu." }, { status: 400 });
      if (body.status === "placed" && !data.placedWith) return NextResponse.json({ error: "Pour passer en « placé », utilisez « Placer » avec la personne ou la demande correspondante." }, { status: 400 });
      update.status = body.status;
    }

    if (typeof body.note === "string" && body.note.trim()) {
      update.notes = FieldValue.arrayUnion({ at: now, by, text: body.note.trim().slice(0, 800) });
    }

    if (body.followUp && ["d30", "d90"].includes(body.followUp.key)) {
      update[`followUps.${body.followUp.key}`] = { done: body.followUp.done !== false, at: now, by, note: String(body.followUp.note || "").slice(0, 600) };
    }

    if (typeof body.placeWith === "string" && body.placeWith) {
      const otherRef = db.collection("domesticaRequests").doc(body.placeWith);
      const other = await otherRef.get();
      if (!other.exists) return NextResponse.json({ error: "Élément à lier introuvable." }, { status: 404 });
      const o = other.data()!;
      if (o.kind === data.kind) return NextResponse.json({ error: "Il faut lier une demande de personnel et une candidature." }, { status: 400 });
      if (data.placedWith || o.placedWith) return NextResponse.json({ error: "L'un des deux est déjà placé." }, { status: 409 });
      const startDate = typeof body.startDate === "string" && body.startDate ? body.startDate : now.slice(0, 10);
      const link = { placedAt: now, startDate, status: "placed" };
      const batch = db.batch();
      batch.update(ref, { ...update, ...link, placedWith: otherRef.id, placedWithName: o.name });
      batch.update(otherRef, { ...link, updatedAt: now, placedWith: id, placedWithName: data.name });
      await batch.commit();
      return NextResponse.json({ ok: true });
    }

    if (body.unplace === true && data.placedWith) {
      const otherRef = db.collection("domesticaRequests").doc(data.placedWith);
      const batch = db.batch();
      const clear = { placedWith: FieldValue.delete(), placedWithName: FieldValue.delete(), placedAt: FieldValue.delete(), startDate: FieldValue.delete(), followUps: FieldValue.delete(), updatedAt: now };
      batch.update(ref, { ...clear, status: data.kind === "candidate" ? "available" : "proposing" });
      const other = await otherRef.get();
      if (other.exists) batch.update(otherRef, { ...clear, status: other.data()!.kind === "candidate" ? "available" : "proposing" });
      await batch.commit();
      return NextResponse.json({ ok: true });
    }

    await ref.update(update);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
