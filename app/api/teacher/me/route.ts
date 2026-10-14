import { NextResponse } from "next/server";
import { isAdminConfigured } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";

export const dynamic = "force-dynamic";

/** The signed-in teacher's profile (name + what they teach). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["teacher"]);
    if (caller.role !== "teacher") return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    return NextResponse.json({
      teacher: { uid: caller.uid, name: caller.name, email: caller.email, assignments: caller.assignments },
    });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
