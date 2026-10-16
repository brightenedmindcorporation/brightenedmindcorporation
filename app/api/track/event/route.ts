import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { bump, contentDocId, CONTENT_COLLECTION, type ContentKind } from "@/lib/contentStats";

// Anonymous content events: announcement impressions/clicks and video playback.
// Same privacy rules as /api/track — no cookies, no IP, a random visitor id only.

export const dynamic = "force-dynamic";

const BOTS = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|whatsapp|telegram|monitor|curl|wget|python|axios|node-fetch|pingdom|uptime/i;
const CLICKS = new Set(["detail", "apply", "apply_page", "register"]);

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ ok: false }, { status: 202 });
    const ua = request.headers.get("user-agent") || "";
    if (!ua || BOTS.test(ua)) return NextResponse.json({ ok: true, skipped: "bot" });

    const body = await request.json().catch(() => null);
    const vid = typeof body?.vid === "string" ? body.vid : "";
    const type = body?.type as ContentKind;
    const key = typeof body?.key === "string" ? body.key : "";
    const event = typeof body?.event === "string" ? body.event : "";
    const title = typeof body?.title === "string" ? body.title : undefined;
    const docId = contentDocId(type, key);
    if (!docId || !/^[a-zA-Z0-9-]{8,64}$/.test(vid)) return NextResponse.json({ ok: true, skipped: "ignored" });

    // Announcements: only count ones that really exist (the endpoint is public).
    if (type === "ann") {
      const known = await getAdminDb().collection(CONTENT_COLLECTION).doc(docId).get();
      if (!known.exists) {
        const real = await getAdminDb().collection("announcements").doc(key).get();
        if (!real.exists) return NextResponse.json({ ok: true, skipped: "unknown" });
      }
    }

    const meta = { type, title };
    const num = (v: unknown, max: number) => Math.max(0, Math.min(max, Math.round(Number(v) || 0)));

    if (event === "view") {
      // "page" views (the announcement's own page) are counted apart from carousel impressions.
      const where = body?.where === "page" ? "page" : "list";
      const first = await bump(docId, { [where === "page" ? "pageViews" : "views"]: 1 }, meta, { vid, tag: `view_${where}` });
      if (first) await bump(docId, { [where === "page" ? "uPageViews" : "uViews"]: 1 }, meta);
    } else if (event === "click" && CLICKS.has(body?.kind)) {
      await bump(docId, { [`click_${body.kind}`]: 1 }, meta);
    } else if (event === "play") {
      const first = await bump(docId, { plays: 1 }, meta, { vid, tag: "play" });
      if (first) await bump(docId, { uPlays: 1 }, meta);
    } else if (event === "progress") {
      // Time actually watched (small chunks), where the viewer stopped (0-9 = tenths of the video),
      // and which quarters of the video they reached.
      const fields: Record<string, number> = { watch: num(body.seconds, 120) };
      await bump(docId, fields, meta);
      for (const m of Array.isArray(body.milestones) ? body.milestones.slice(0, 4) : []) {
        if ([25, 50, 75, 100].includes(m)) await bump(docId, { [`m${m}`]: 1 }, meta, { vid, tag: `m${m}` });
      }
      if (Number.isInteger(body.exit) && body.exit >= 0 && body.exit <= 9) {
        await bump(docId, { [`x${body.exit}`]: 1 }, meta);
      }
      if (Number(body.duration) > 0) {
        await getAdminDb().collection(CONTENT_COLLECTION).doc(docId).set({ duration: num(body.duration, 36000) }, { merge: true });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Content tracking failed (non-fatal):", error);
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
