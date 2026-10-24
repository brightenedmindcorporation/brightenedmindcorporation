import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";

// One-off migration: Bureautique Student IDs and certificate numbers move from "BMCA-BUREAUTIQUE-…" to "BMCA-BU-…".
// The numbers themselves are kept, so nothing can collide. GET previews, POST applies.
const OLD = /BMCA-BUREAUTIQUE-/g;
const NEW = "BMCA-BU-";

function fix(v: unknown): unknown {
  if (typeof v === "string") return v.replace(OLD, NEW);
  if (Array.isArray(v)) return v.map(fix);
  if (v && typeof v === "object" && Object.getPrototypeOf(v) === Object.prototype) {
    return Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, fix(x)]));
  }
  return v;
}
const hasOld = (v: unknown) => JSON.stringify(v).includes("BMCA-BUREAUTIQUE-");

async function run(request: Request, apply: boolean) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const db = getAdminDb();
    const found: { collection: string; id: string; ids: string[] }[] = [];
    for (const col of await db.listCollections()) {
      const snap = await col.get();
      for (const d of snap.docs) {
        const data = d.data();
        if (!hasOld(data)) continue;
        const ids = [...new Set(JSON.stringify(data).match(/BMCA-BUREAUTIQUE-[A-Z0-9-]+/g) ?? [])];
        found.push({ collection: col.id, id: d.id, ids });
        if (apply) await d.ref.set(fix(data) as Record<string, unknown>);
      }
    }
    return NextResponse.json({ applied: apply, count: found.length, found });
  } catch (error: any) {
    if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: error?.message || "Erreur serveur" }, { status: 500 });
  }
}

export const GET = (request: Request) => run(request, false);
export const POST = (request: Request) => run(request, true);
