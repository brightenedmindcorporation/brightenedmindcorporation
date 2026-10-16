import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { cleanAudience } from "@/lib/academy/liveAccess";

function fail(error: any) {
  const status = error instanceof AuthError ? error.status : 500;
  return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
}

/** Admin: any session. Teacher: only a session they own. */
async function loadOwnedSession(request: Request, id: string) {
  const caller = await getCaller(bearer(request));
  const ref = getAdminDb().collection("liveSessions").doc(id);
  const snap = await ref.get();
  if (!snap.exists) throw new AuthError("Session introuvable.", 404);
  if (caller.role === "teacher" && snap.data()?.teacherUid !== caller.uid) {
    throw new AuthError("Cette session ne vous appartient pas.", 403);
  }
  return { caller, ref, data: snap.data()! };
}

/** Teacher/admin opens or closes the room to students. */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { id } = await params;
    const { caller, ref, data } = await loadOwnedSession(request, id);

    const body = await request.json();
    // Who may attend: a list of students, or null for everyone concerned.
    if ("studentUids" in body) {
      const list = body.studentUids === null ? null : await cleanAudience(getAdminDb(), caller, String(data.langCode), body.studentUids);
      if (list && list.length === 0) {
        return NextResponse.json({ error: "Choisissez au moins un étudiant, ou ouvrez le cours à tous." }, { status: 400 });
      }
      await ref.update({ studentUids: list ?? FieldValue.delete() });
      return NextResponse.json({ status: "success", studentUids: list });
    }

    const { open } = body;
    if (typeof open !== "boolean") {
      return NextResponse.json({ error: "Champ « open » requis." }, { status: 400 });
    }
    const now = new Date().toISOString();
    await ref.update(open ? { open: true, openedAt: now, endedAt: null } : { open: false, endedAt: now });

    return NextResponse.json({ status: "success", open });
  } catch (error) {
    return fail(error);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { id } = await params;
    const { ref } = await loadOwnedSession(request, id);
    await ref.delete();
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return fail(error);
  }
}
