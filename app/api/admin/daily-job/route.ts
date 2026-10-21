import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { cleanReminderSettings, getReminderSettings, runDailyJob } from "@/lib/dailyJob";

export const dynamic = "force-dynamic";

function fail(error: any) {
  const status = error instanceof AuthError ? error.status : 500;
  return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
}

/** Reminder settings + when the daily maintenance last ran. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const job = (await getAdminDb().collection("system").doc("dailyJob").get()).data() || {};
    return NextResponse.json({ settings: await getReminderSettings(), lastRunAt: job.lastRunAt || null, lastResult: job.lastResult || null, lastWeeklyReport: job.lastWeeklyReport || null });
  } catch (error) {
    return fail(error);
  }
}

/** PATCH { enabled?, afterDays?, repeatDays?, maxReminders? } changes the reminder settings (days typed freely). */
export async function PATCH(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const body = await request.json();
    const update: Record<string, unknown> = {};
    if (typeof body.enabled === "boolean") update.enabled = body.enabled;
    Object.assign(update, cleanReminderSettings(body));
    await getAdminDb().collection("system").doc("reminders").set(update, { merge: true });
    return NextResponse.json({ settings: await getReminderSettings() });
  } catch (error) {
    return fail(error);
  }
}

/** POST runs the daily maintenance right now (reminders + weekly report if due). */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    return NextResponse.json(await runDailyJob(true));
  } catch (error) {
    return fail(error);
  }
}
