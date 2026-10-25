import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { getProgramSettings } from "@/lib/academy/programSettings";
import { curriculumPrograms } from "@/content/curriculum";

export const dynamic = "force-dynamic";

const fail = (error: unknown) => {
  if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error("Program settings API failed:", error);
  return NextResponse.json({ error: (error as Error)?.message || "Erreur serveur." }, { status: 500 });
};

/** Program switches of the administration: GET lists them, POST { code, closed?, autoApprove? } changes one. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const settings = await getProgramSettings();
    return NextResponse.json({
      programs: curriculumPrograms.map((p) => ({ code: p.code, label: p.label, closed: settings.closed.includes(p.code), autoApprove: settings.autoApprove.includes(p.code) })),
    });
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const body = await request.json().catch(() => ({}));
    const code = String(body.code || "");
    if (!curriculumPrograms.some((p) => p.code === code)) return NextResponse.json({ error: "Formation inconnue." }, { status: 400 });
    const settings = await getProgramSettings();
    const toggle = (list: string[], on: boolean) => (on ? Array.from(new Set([...list, code])) : list.filter((c) => c !== code));
    if (typeof body.closed === "boolean") settings.closed = toggle(settings.closed, body.closed);
    if (typeof body.autoApprove === "boolean") settings.autoApprove = toggle(settings.autoApprove, body.autoApprove);
    await getAdminDb().collection("settings").doc("programs").set(settings);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
