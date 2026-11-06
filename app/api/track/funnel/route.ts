import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { localDay } from "@/lib/contentStats";

// Registration funnel: how many different visitors reach each step of the registration form.
// Same privacy rules as the visit counter: no cookie, no IP, only a random visitor id (used to count a step once per day).

export const dynamic = "force-dynamic";

const BOTS = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|whatsapp|telegram|monitor|curl|wget|python|axios|node-fetch|pingdom|uptime/i;
const STEPS = new Set(["register_1", "register_2", "register_3", "register_done"]);

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ ok: false }, { status: 202 });
    const ua = request.headers.get("user-agent") || "";
    if (!ua || BOTS.test(ua)) return NextResponse.json({ ok: true, skipped: "bot" });
    const body = await request.json().catch(() => null);
    const step = typeof body?.step === "string" ? body.step : "";
    const vid = typeof body?.vid === "string" ? body.vid : "";
    if (!STEPS.has(step) || !/^[a-zA-Z0-9-]{8,64}$/.test(vid)) return NextResponse.json({ ok: true, skipped: "ignored" });

    const db = getAdminDb();
    const day = localDay();
    try {
      await db.collection("analytics_dedupe").doc(`${day}_${vid}_funnel_${step}`.slice(0, 200)).create({ at: Date.now() });
    } catch {
      return NextResponse.json({ ok: true, skipped: "repeat" }); // already counted today
    }
    await db.collection("analytics_funnel").doc(day).set({ [step]: FieldValue.increment(1) }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Funnel tracking failed (non-fatal):", error);
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
