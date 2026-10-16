import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { maybeRunDailyJob } from "@/lib/dailyJob";

// Privacy-friendly visit counter: no cookies, no IP address stored, just
// anonymous daily counters (page views, unique visitors, pages, sources,
// countries, devices). A visitor is a random id kept in the visitor's own
// browser, never tied to a name or an account.

export const dynamic = "force-dynamic";

const BOTS = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|whatsapp|telegram|monitor|curl|wget|python|axios|node-fetch|pingdom|uptime/i;
const SKIP = /^\/(admin|teacher|api|_next)(\/|$)/;

/** Africa/Lubumbashi is UTC+2: counts roll over at local midnight. */
function localDay(): string {
  return new Date(Date.now() + 2 * 3600_000).toISOString().slice(0, 10);
}
function localHour(): string {
  return new Date(Date.now() + 2 * 3600_000).toISOString().slice(11, 13);
}

/** Lesson/quiz pages are grouped per course so the pages list stays readable. */
function pageKey(path: string): string {
  const clean = path.split("?")[0].split("#")[0] || "/";
  const parts = clean.split("/").filter(Boolean);
  let key = "/" + parts.join("/");
  if (parts[0] === "academia" && parts.length > 2) key = `/academia/${parts[1]}/…`;
  return key.replace(/[.\[\]*`]/g, "_").slice(0, 90) || "/";
}

function refKey(ref: string, host: string): string | null {
  if (!ref) return null;
  try {
    const h = new URL(ref).hostname.replace(/^www\./, "");
    if (!h || h === host.replace(/^www\./, "")) return null;
    return h.replace(/[.\[\]*`]/g, "_").slice(0, 60);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ ok: false }, { status: 202 });
    const ua = request.headers.get("user-agent") || "";
    if (!ua || BOTS.test(ua)) return NextResponse.json({ ok: true, skipped: "bot" });

    const body = await request.json().catch(() => null);
    const path = typeof body?.path === "string" ? body.path : "";
    const vid = typeof body?.vid === "string" ? body.vid.slice(0, 64) : "";
    if (!path.startsWith("/") || SKIP.test(path) || !/^[a-zA-Z0-9-]{8,64}$/.test(vid)) {
      return NextResponse.json({ ok: true, skipped: "ignored" });
    }

    const host = request.headers.get("host") || "";
    const ref = typeof body?.ref === "string" ? refKey(body.ref, host) : null;
    const entry = body?.entry === true; // first page of the visit
    const mobile = /Mobi|Android|iPhone|iPad/i.test(ua) || (typeof body?.w === "number" && body.w < 820);
    const country =
      (request.headers.get("cf-ipcountry") || request.headers.get("x-vercel-ip-country") || "").toUpperCase().slice(0, 2) || "??";

    const db = getAdminDb();
    const day = localDay();
    const inc = FieldValue.increment(1);

    // Unique visitor of the day / brand-new vs returning visitor.
    let uniqueToday = false;
    try {
      await db.collection("analytics_visitors").doc(`${day}_${vid}`).create({ at: new Date().toISOString() });
      uniqueToday = true;
    } catch {
      // already counted today
    }
    let isNew = false;
    if (uniqueToday) {
      try {
        await db.collection("analytics_seen").doc(vid).create({ first: day });
        isNew = true;
      } catch {
        // returning visitor
      }
    }

    const update: Record<string, unknown> = {
      views: inc,
      paths: { [pageKey(path)]: inc },
      devices: { [mobile ? "mobile" : "desktop"]: inc },
      countries: { [country]: inc },
      hours: { [localHour()]: inc },
    };
    if (uniqueToday) {
      update.visitors = inc;
      update[isNew ? "newVisitors" : "returningVisitors"] = inc;
    }
    if (entry) update.visits = inc;
    if (entry) update.sources = { [ref ?? "(direct)"]: inc };

    await db.collection("analytics_days").doc(day).set(update, { merge: true });
    maybeRunDailyJob(); // once a day: reminders to inactive students, weekly report on Mondays
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Visit tracking failed (non-fatal):", error);
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
