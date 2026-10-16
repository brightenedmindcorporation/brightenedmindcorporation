import { NextResponse } from "next/server";
import { runDailyJob } from "@/lib/dailyJob";

export const dynamic = "force-dynamic";

/**
 * Optional entry point for an external scheduler (a free cron service, or a
 * Render cron job). The job also runs by itself, once a day, when the site is
 * visited, so this is only needed for a guaranteed time of day. Protected by
 * the CRON_SECRET environment variable.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const given = new URL(request.url).searchParams.get("key") || request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!secret || given !== secret) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  return NextResponse.json(await runDailyJob(false));
}
