import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { localDay } from "@/lib/contentStats";

export const dynamic = "force-dynamic";

/** The registration funnel over the last N days: how many visitors reached each step. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const days = Math.min(90, Math.max(1, Number(new URL(request.url).searchParams.get("days")) || 30));
    const ids = Array.from({ length: days }, (_, i) => localDay(i));
    const snaps = await Promise.all(ids.map((id) => getAdminDb().collection("analytics_funnel").doc(id).get()));
    const steps = { register_1: 0, register_2: 0, register_3: 0, register_done: 0 } as Record<string, number>;
    for (const snap of snaps) {
      const d = snap.data() || {};
      for (const k of Object.keys(steps)) steps[k] += Number(d[k]) || 0;
    }
    return NextResponse.json({ days, steps });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
