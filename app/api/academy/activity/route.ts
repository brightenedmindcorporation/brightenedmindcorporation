import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { CLIENT_ACTIVITY, logActivitySafe, type ActivityType } from "@/lib/activityLog";

/** A signed-in student reports what they are doing (see lib/activityLog.ts). */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ ok: false }, { status: 202 });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ ok: false }, { status: 401 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);

    const body = await request.json().catch(() => null);
    const type = body?.type as ActivityType;
    if (!CLIENT_ACTIVITY.includes(type)) return NextResponse.json({ ok: false }, { status: 400 });

    const label = typeof body?.label === "string" ? body.label : "";
    const meta: Record<string, unknown> = {};
    for (const key of ["langCode", "level", "lessonId", "score", "total", "passed"]) {
      const v = body?.meta?.[key];
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") meta[key] = typeof v === "string" ? v.slice(0, 40) : v;
    }
    await logActivitySafe(decoded.uid, type, label, meta);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
