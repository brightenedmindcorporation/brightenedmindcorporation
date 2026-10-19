import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller, teachesLanguage } from "@/lib/teacherAuth";

export const dynamic = "force-dynamic";

/** Placement tests to review: all for the administration; for a teacher, those of their language (or attributed to them). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request));
    const snap = await getAdminDb().collection("placementTests").get();
    let tests = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
    if (caller.role === "teacher") {
      tests = tests.filter((t) => (t.teacherUid ? t.teacherUid === caller.uid : teachesLanguage(caller.assignments, t.langCode)));
    }
    tests.sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)));
    return NextResponse.json({ tests });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Placement list failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
