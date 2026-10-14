import { NextResponse } from "next/server";
import { Resend } from "resend";
import { mailFrom } from "@/lib/mailFrom";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller, normalizeAssignments } from "@/lib/teacherAuth";
import { sendWithText } from "@/lib/mailText";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

function fail(error: any) {
  const status = error instanceof AuthError ? error.status : 500;
  return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
}

/** Lists the teacher accounts (admin only). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const snap = await getAdminDb().collection("teachers").get();
    const teachers = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ teachers });
  } catch (error) {
    return fail(error);
  }
}

/**
 * Creates a teacher account: a Firebase Auth user (random password nobody
 * knows), the `teachers/{uid}` profile with the languages/levels they
 * teach, and an e-mail with a one-time link to choose their own password.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);

    const { name, email, assignments } = await request.json();
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanAssignments = normalizeAssignments(assignments);
    if (!cleanName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: "Nom et e-mail valides requis." }, { status: 400 });
    }
    if (cleanAssignments.length === 0) {
      return NextResponse.json({ error: "Choisissez au moins une langue/un niveau à enseigner." }, { status: 400 });
    }

    const auth = getAdminAuth();
    let user;
    try {
      user = await auth.createUser({
        email: cleanEmail,
        displayName: cleanName,
        password: crypto.randomUUID() + crypto.randomUUID(),
      });
    } catch (error: any) {
      if (error?.code === "auth/email-already-exists") {
        return NextResponse.json(
          { error: "Un compte existe déjà avec cet e-mail (peut-être un compte étudiant). Utilisez une autre adresse." },
          { status: 409 }
        );
      }
      throw error;
    }

    await getAdminDb().collection("teachers").doc(user.uid).set({
      uid: user.uid,
      name: cleanName,
      email: cleanEmail,
      assignments: cleanAssignments,
      active: true,
      createdAt: new Date().toISOString(),
    });

    const inviteLink = await auth.generatePasswordResetLink(cleanEmail, { url: `${SITE_URL}/teacher` });

    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await sendWithText(resend, {
        from: mailFrom("BM Academia"),
        to: cleanEmail,
        subject: "Votre compte enseignant BM Academia",
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #333; max-width: 560px; margin: 0 auto;">
            <h2 style="color: #7a1f2b;">Bienvenue chez BM Academia, ${cleanName} !</h2>
            <p>Un compte enseignant vient d'être créé pour vous. Il vous donne accès à votre tableau de bord : vos classes en direct, vos étudiants et leur progression, et l'envoi de messages à vos étudiants.</p>
            <p>Cliquez sur le bouton ci-dessous pour choisir votre mot de passe :</p>
            <p style="margin: 28px 0;"><a href="${inviteLink}" style="background: #7a1f2b; color: #fff; padding: 14px 26px; border-radius: 10px; text-decoration: none; font-weight: bold;">Définir mon mot de passe</a></p>
            <p>Ensuite, connectez-vous ici : <a href="${SITE_URL}/teacher">${SITE_URL}/teacher</a></p>
            <p style="font-size: 12px; color: #777;">Ce lien est personnel et à usage unique. Brightened Mind Corporation — BM Academia</p>
          </div>`,
      });
      emailSent = !error;
      if (error) console.error("Teacher invite email failed:", error);
    }

    return NextResponse.json({ status: "success", uid: user.uid, emailSent, inviteLink: emailSent ? undefined : inviteLink });
  } catch (error) {
    return fail(error);
  }
}
