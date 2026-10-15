import { NextResponse } from "next/server";
import { FieldPath } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";

export const dynamic = "force-dynamic";

const dayString = (offset: number) => new Date(Date.now() + 2 * 3600_000 - offset * 86_400_000).toISOString().slice(0, 10);

function merge(into: Record<string, number>, from: unknown) {
  if (!from || typeof from !== "object") return;
  for (const [k, v] of Object.entries(from as Record<string, number>)) into[k] = (into[k] || 0) + (Number(v) || 0);
}
const top = (m: Record<string, number>, n = 10) =>
  Object.entries(m)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, count]) => ({ name, count }));

/** Visit statistics for the admin: daily series and totals over the last N days. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);

    const days = Math.min(90, Math.max(1, Number(new URL(request.url).searchParams.get("days")) || 30));
    const start = dayString(days - 1);
    const snap = await getAdminDb().collection("analytics_days").where(FieldPath.documentId(), ">=", start).get();
    const byDay = new Map(snap.docs.map((d) => [d.id, d.data()]));

    const series: { day: string; views: number; visitors: number }[] = [];
    const paths: Record<string, number> = {};
    const sources: Record<string, number> = {};
    const countries: Record<string, number> = {};
    const devices: Record<string, number> = {};
    const hours: Record<string, number> = {};
    let views = 0, visitors = 0, visits = 0, newVisitors = 0, returningVisitors = 0;

    for (let i = days - 1; i >= 0; i--) {
      const day = dayString(i);
      const d = byDay.get(day) || {};
      series.push({ day, views: d.views || 0, visitors: d.visitors || 0 });
      views += d.views || 0;
      visitors += d.visitors || 0;
      visits += d.visits || 0;
      newVisitors += d.newVisitors || 0;
      returningVisitors += d.returningVisitors || 0;
      merge(paths, d.paths); merge(sources, d.sources); merge(countries, d.countries); merge(devices, d.devices); merge(hours, d.hours);
    }

    const sum = (n: number) => series.slice(-n).reduce((a, s) => ({ views: a.views + s.views, visitors: a.visitors + s.visitors }), { views: 0, visitors: 0 });
    return NextResponse.json({
      days,
      series,
      totals: { views, visitors, visits, newVisitors, returningVisitors },
      today: sum(1),
      last7: sum(7),
      topPages: top(paths),
      sources: top(sources),
      countries: top(countries),
      devices,
      hours,
    });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Analytics read failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
