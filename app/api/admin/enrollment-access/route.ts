import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { createNotification } from "@/lib/notifications";
import { findProgramByCode } from "@/content/curriculum";

export const dynamic = "force-dynamic";

const fail = (error: unknown) => {
  if (error instanceof AuthError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error("Enrollment access API failed:", error);
  return NextResponse.json({ error: (error as Error)?.message || "Erreur serveur." }, { status: 500 });
};

/**
 * Access control of one enrollment (administration only). Body: { enrollmentId, action, reason?, accessUntil? }.
 *  - suspend: blocks the program for this student only, keeps matricule, progress and history;
 *  - reactivate: gives the access back (the end date must be in the future or removed);
 *  - setExpiry: end date of the access (YYYY-MM-DD), or "" to remove it.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["admin"]);
    const body = await request.json().catch(() => ({}));
    const id = String(body.enrollmentId || "");
    const action = String(body.action || "");
    if (!id || !["suspend", "reactivate", "setExpiry"].includes(action)) return NextResponse.json({ error: "enrollmentId et action valides requis." }, { status: 400 });

    const ref = getAdminDb().collection("enrollments").doc(id);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });
    const data = snap.data()!;
    const now = new Date().toISOString();
    const by = caller.name || caller.email || "admin";
    const reason = String(body.reason || "").trim().slice(0, 300);
    const label = findProgramByCode(data.langCode)?.label ?? data.langCode;
    const entry = (a: string, extra: object = {}) => FieldValue.arrayUnion({ at: now, by, action: a, ...(reason ? { reason } : {}), ...extra });
    const notify = (title: string, message: string) =>
      createNotification({ audience: data.uid, type: "enrollment-access", title, message, link: "/academia/dashboard" }).catch((e) => console.error("Access notification failed (non-fatal):", e));

    if (action === "suspend") {
      if (data.status !== "Approved") return NextResponse.json({ error: "Seule une inscription approuvée peut être suspendue." }, { status: 409 });
      await ref.update({ status: "Suspended", statusReason: reason, suspendedAt: now, history: entry("suspended") });
      await notify("Accès suspendu", `Votre accès à la formation ${label} est suspendu${reason ? ` : ${reason}` : ""}. Contactez l'administration.`);
    } else if (action === "reactivate") {
      if (!["Suspended", "Expired"].includes(data.status)) return NextResponse.json({ error: "Cet accès n'est pas suspendu." }, { status: 409 });
      const until = typeof body.accessUntil === "string" ? body.accessUntil : data.accessUntil;
      if (until && until < now.slice(0, 10)) return NextResponse.json({ error: "La date de fin d'accès est dépassée : choisissez une nouvelle date ou retirez-la." }, { status: 400 });
      await ref.update({
        status: "Approved",
        statusReason: FieldValue.delete(),
        suspendedAt: FieldValue.delete(),
        ...(typeof body.accessUntil === "string" ? (body.accessUntil ? { accessUntil: body.accessUntil } : { accessUntil: FieldValue.delete() }) : {}),
        history: entry("reactivated"),
      });
      await notify("Accès rétabli", `Votre accès à la formation ${label} est rétabli.`);
    } else {
      const until = String(body.accessUntil || "");
      if (until && !/^\d{4}-\d{2}-\d{2}$/.test(until)) return NextResponse.json({ error: "Date invalide (AAAA-MM-JJ)." }, { status: 400 });
      await ref.update({ accessUntil: until || FieldValue.delete(), history: entry("expiry", { accessUntil: until || null }) });
      if (until) await notify("Fin d'accès prévue", `Votre accès à la formation ${label} est prévu jusqu'au ${until}.`);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
