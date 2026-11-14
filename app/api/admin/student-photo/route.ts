import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";

export const dynamic = "force-dynamic";

/** The administration removes a profile photo that is not appropriate (the student can upload another one). */
export async function DELETE(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const body = await request.json().catch(() => ({}));
    const uid = typeof body.uid === "string" ? body.uid : "";
    if (!uid) return NextResponse.json({ error: "Étudiant manquant." }, { status: 400 });
    await getAdminDb().collection("students").doc(uid).set({ photoUrl: FieldValue.delete() }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
