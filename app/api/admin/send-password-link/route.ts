import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { mailFrom } from "@/lib/mailFrom";
import { sendWithText } from "@/lib/mailText";
import { greeting } from "@/lib/salutation";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

/**
 * Sends a student a link to choose (or reset) their password — for an account that was created for them
 * and never used. The link is also returned, to pass on by WhatsApp if the e-mail does not arrive.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const body = await request.json().catch(() => ({}));
    const uid = String(body.uid || "");
    if (!uid) return NextResponse.json({ error: "uid requis." }, { status: 400 });

    const user = await getAdminAuth().getUser(uid);
    if (!user.email) return NextResponse.json({ error: "Ce compte n'a pas d'adresse e-mail." }, { status: 400 });
    const profile = (await getAdminDb().collection("students").doc(uid).get()).data();
    const link = await getAdminAuth().generatePasswordResetLink(user.email, { url: `${SITE_URL}/login` });

    let emailSent = false;
    let emailError = "";
    if (process.env.RESEND_API_KEY) {
      const { error } = await sendWithText(new Resend(process.env.RESEND_API_KEY), {
        from: mailFrom("BM Academia"),
        to: user.email,
        replyTo: "info@bmcorporation-cd.com",
        subject: "Choisissez votre mot de passe",
        html: `<div style="font-family: sans-serif; max-width: 560px; color: #333;">
          <h2 style="color: #7a1f2b; margin: 0 0 12px;">${greeting(profile?.name || user.displayName, profile?.gender)}</h2>
          <p>Votre compte BM Academia est prêt, mais vous n'avez pas encore choisi votre mot de passe. Cliquez ci-dessous pour le définir, puis connectez-vous.</p>
          <p style="margin: 24px 0;"><a href="${link}" style="background: #7a1f2b; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">Choisir mon mot de passe</a></p>
          <p style="font-size: 13px; color: #666;">Connexion : ${SITE_URL}/login avec l'adresse ${user.email}</p>
        </div>`,
      });
      emailSent = !error;
      if (error) emailError = String((error as any).message || error);
    } else {
      emailError = "Envoi d'e-mails non configuré.";
    }
    return NextResponse.json({ ok: true, emailSent, emailError, link });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Send password link failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
