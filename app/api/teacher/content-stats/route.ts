import { NextResponse } from "next/server";
import { isAdminConfigured } from "@/lib/firebase-admin";
import { AuthError, bearer, canTeach, getCaller } from "@/lib/teacherAuth";
import { loadContentStats } from "@/lib/contentStats";

export const dynamic = "force-dynamic";

/** Lesson funnel and video statistics for the levels a teacher teaches (nothing else). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["teacher"]);
    if (caller.role !== "teacher") return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    const days = Math.min(90, Math.max(1, Number(new URL(request.url).searchParams.get("days")) || 30));

    const items = (await loadContentStats(days)).filter((it) => {
      if (it.type !== "lesson") return false;
      const [lang, level] = it.key.split("-");
      return canTeach(caller.assignments, lang, Number(level));
    });
    return NextResponse.json({ days, items });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Teacher content stats failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
