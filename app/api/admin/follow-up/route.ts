import { NextResponse } from "next/server";
import { isAdminConfigured } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { sendFollowUp } from "@/lib/dailyJob";

export const dynamic = "force-dynamic";

/** Follows up one student right now (e-mail + notification), with an optional personal message. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["admin"]);
    const body = await request.json().catch(() => ({}));
    const uid = String(body.uid || "");
    if (!uid) return NextResponse.json({ error: "uid requis." }, { status: 400 });
    const result = await sendFollowUp(uid, { message: typeof body.message === "string" ? body.message : "", by: caller.email });
    return NextResponse.json({ ok: true, ...result });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Follow-up failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
