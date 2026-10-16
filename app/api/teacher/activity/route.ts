import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller, isTeachersStudent } from "@/lib/teacherAuth";
import { loadTimeline } from "@/lib/studentTimeline";

export const dynamic = "force-dynamic";

/** A teacher's view of the activity of one of THEIR students (same attribution rule as the student list). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["teacher"]);
    if (caller.role !== "teacher") return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    const uid = new URL(request.url).searchParams.get("uid");
    if (!uid) return NextResponse.json({ error: "uid requis." }, { status: 400 });

    const enrollments = await getAdminDb().collection("enrollments").where("uid", "==", uid).get();
    const mine = enrollments.docs.some((d) => d.data().status === "Approved" && isTeachersStudent(caller, d.data() as any));
    if (!mine) return NextResponse.json({ error: "Cet étudiant ne fait pas partie de vos étudiants." }, { status: 403 });

    return NextResponse.json(await loadTimeline(uid));
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Teacher activity failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
