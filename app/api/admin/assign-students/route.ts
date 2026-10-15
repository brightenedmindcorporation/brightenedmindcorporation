import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";

/**
 * Admin attributes students to a teacher, or moves them from one teacher to
 * another (a move is just attributing them to the new one). `teacherUid:
 * null` removes the attribution: the students are then visible again to every
 * teacher of their language, until they are attributed.
 *
 * Body: { items: [{ id, kind: "enrollment" | "legacyStudent" }], teacherUid: string | null }
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);

    const { items, teacherUid } = await request.json();
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Aucun étudiant sélectionné." }, { status: 400 });
    }
    if (items.length > 500) {
      return NextResponse.json({ error: "Trop d'étudiants à la fois (500 maximum)." }, { status: 400 });
    }

    const db = getAdminDb();
    let teacherName = "";
    if (teacherUid) {
      const teacherSnap = await db.collection("teachers").doc(String(teacherUid)).get();
      if (!teacherSnap.exists || teacherSnap.data()?.active === false) {
        return NextResponse.json({ error: "Professeur introuvable ou désactivé." }, { status: 404 });
      }
      teacherName = teacherSnap.data()!.name || "";
    }

    const now = new Date().toISOString();
    let updated = 0;
    const notify: { uid: string; changed: boolean }[] = [];

    for (const item of items) {
      const ref = db.collection(item.kind === "legacyStudent" ? "students" : "enrollments").doc(String(item.id));
      const snap = await ref.get();
      if (!snap.exists) continue;
      const data = snap.data()!;
      const previous = (data.teacherUid as string) || null;
      const next = teacherUid ? String(teacherUid) : null;
      if (previous === next) continue;

      await ref.update(
        next
          ? { teacherUid: next, teacherAssignedAt: now }
          : { teacherUid: FieldValue.delete(), teacherAssignedAt: FieldValue.delete() }
      );
      updated++;
      if (next) notify.push({ uid: (data.uid as string) || String(item.id).split("_")[0], changed: Boolean(previous) });
    }

    // Tell each student who their teacher is now (best-effort, once per student).
    const seen = new Set<string>();
    for (const n of notify) {
      if (seen.has(n.uid)) continue;
      seen.add(n.uid);
      try {
        await createNotification({
          audience: n.uid,
          type: "teacher-assigned",
          title: n.changed ? "Votre professeur a changé" : "Votre professeur vous a été attribué",
          message: teacherName
            ? `${teacherName} est désormais votre professeur. Vous pouvez lui écrire depuis votre tableau de bord.`
            : "Un nouveau professeur vous a été attribué.",
          link: "/academia/dashboard",
        });
      } catch (notifError) {
        console.error("Teacher-assigned notification failed (non-fatal):", notifError);
      }
    }

    return NextResponse.json({ status: "success", updated });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Error assigning students:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
