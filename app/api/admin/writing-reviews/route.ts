import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, canTeach, getCaller } from "@/lib/teacherAuth";

export const dynamic = "force-dynamic";

/** Written work to correct: all for the administration; for a teacher, their students' (or their languages'). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request));
    const snap = await getAdminDb().collection("writingReviews").get();
    let reviews = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
    if (caller.role === "teacher") {
      reviews = reviews.filter((r) => (r.teacherUid ? r.teacherUid === caller.uid : canTeach(caller.assignments, r.langCode, Number(r.level))));
    }
    reviews.sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)));
    return NextResponse.json({ reviews });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Writing reviews list failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
