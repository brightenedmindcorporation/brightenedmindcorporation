import { NextResponse } from "next/server";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";
import { mailFrom } from "@/lib/mailFrom";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller, normalizeAssignments } from "@/lib/teacherAuth";
import { sendWithText } from "@/lib/mailText";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

function fail(error: any) {
  const status = error instanceof AuthError ? error.status : 500;
  return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
}

/** Updates a teacher (name, assignments, active) or re-sends the invite. */
export async function PATCH(request: Request, { params }: { params: Promise<{ uid: string }> }) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const { uid } = await params;
    const body = await request.json();

    const ref = getAdminDb().collection("teachers").doc(uid);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ error: "Professeur introuvable." }, { status: 404 });
    const teacher = snap.data()!;

    if (body.resendInvite) {
      const inviteLink = await getAdminAuth().generatePasswordResetLink(teacher.email, { url: `${SITE_URL}/teacher` });
      let emailSent = false;
      if (process.env.RESEND_API_KEY) {
        const { error } = await sendWithText(new Resend(process.env.RESEND_API_KEY), {
          from: mailFrom("BM Academia"),
          to: teacher.email,
          subject: "Votre accès enseignant BM Academia",
          html: `<div style="font-family: sans-serif; padding: 24px; max-width: 560px; margin: 0 auto;"><p>Bonjour ${teacher.name},</p><p>Voici votre lien pour définir (ou redéfinir) votre mot de passe enseignant :</p><p><a href="${inviteLink}" style="background:#7a1f2b;color:#fff;padding:14px 26px;border-radius:10px;text-decoration:none;font-weight:bold;">Définir mon mot de passe</a></p><p>Connexion : <a href="${SITE_URL}/teacher">${SITE_URL}/teacher</a></p></div>`,
        });
        emailSent = !error;
      }
      return NextResponse.json({ status: "success", emailSent, inviteLink: emailSent ? undefined : inviteLink });
    }

    const update: Record<string, unknown> = {};
    if (typeof body.name === "string" && body.name.trim()) update.name = body.name.trim();
    if (body.assignments !== undefined) {
      const clean = normalizeAssignments(body.assignments);
      if (clean.length === 0) {
        return NextResponse.json({ error: "Au moins une langue/un niveau requis." }, { status: 400 });
      }
      update.assignments = clean;
    }
    if (typeof body.active === "boolean") {
      update.active = body.active;
      // A deactivated teacher can no longer sign in at all.
      await getAdminAuth().updateUser(uid, { disabled: !body.active });
    }
    if (typeof update.name === "string") await getAdminAuth().updateUser(uid, { displayName: update.name });

    await ref.update(update);
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return fail(error);
  }
}

/** Deletes the teacher account entirely. */
export async function DELETE(request: Request, { params }: { params: Promise<{ uid: string }> }) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const { uid } = await params;
    const snap = await getAdminDb().collection("teachers").doc(uid).get();
    if (!snap.exists) return NextResponse.json({ error: "Professeur introuvable." }, { status: 404 });
    await getAdminDb().collection("teachers").doc(uid).delete();
    // Their students go back to "not attributed" (visible to the teachers of their language).
    try {
      for (const collection of ["enrollments", "students"]) {
        const owned = await getAdminDb().collection(collection).where("teacherUid", "==", uid).get();
        for (const d of owned.docs) await d.ref.update({ teacherUid: FieldValue.delete(), teacherAssignedAt: FieldValue.delete() });
      }
    } catch (error) {
      console.error("Releasing the teacher's students failed (non-fatal):", error);
    }
    try {
      await getAdminAuth().deleteUser(uid);
    } catch (error) {
      console.error("Teacher auth user delete failed (non-fatal):", error);
    }
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return fail(error);
  }
}
