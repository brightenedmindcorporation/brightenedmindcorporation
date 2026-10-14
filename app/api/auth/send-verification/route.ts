import { NextResponse } from "next/server";
import { Resend } from "resend";
import { mailFrom } from "@/lib/mailFrom";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

// One e-mail per account per minute (this endpoint sends mail on request).
const lastSent = new Map<string, number>();

/**
 * Sends the "confirm your e-mail address" message ourselves, from
 * noreply@bmcorporation-cd.com with our branding and a link on our own
 * domain — instead of Firebase's generic message sent from
 * noreply@<project>.firebaseapp.com. Firebase still creates the one-time
 * code; /verify-email applies it.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const auth = getAdminAuth();
    const decoded = await auth.verifyIdToken(idToken);
    const user = await auth.getUser(decoded.uid);
    if (!user.email) return NextResponse.json({ error: "Compte sans adresse e-mail." }, { status: 400 });
    if (user.emailVerified) return NextResponse.json({ status: "already-verified" });

    const now = Date.now();
    if (now - (lastSent.get(user.uid) ?? 0) < 60_000) {
      return NextResponse.json({ error: "Un e-mail vient d'être envoyé. Patientez une minute avant d'en redemander un." }, { status: 429 });
    }
    lastSent.set(user.uid, now);

    const firebaseLink = await auth.generateEmailVerificationLink(user.email);
    const code = new URL(firebaseLink).searchParams.get("oobCode");
    if (!code) throw new Error("Code de vérification introuvable.");
    const link = `${SITE_URL}/verify-email?code=${encodeURIComponent(code)}`;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Envoi d'e-mails non configuré." }, { status: 500 });
    }
    const name = (user.displayName || "").replace(/[<>&"]/g, "");
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: mailFrom("BM Academia"),
      to: user.email,
      replyTo: "info@bmcorporation-cd.com",
      subject: "Confirmez votre adresse e-mail — BM Academia",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #333;">
          <h2 style="color: #7a1f2b;">Bienvenue chez BM Academia${name ? `, ${name}` : ""} !</h2>
          <p>Pour finaliser votre inscription, confirmez que cette adresse e-mail est bien la vôtre :</p>
          <p style="margin: 28px 0;"><a href="${link}" style="background: #7a1f2b; color: #fff; padding: 14px 26px; border-radius: 10px; text-decoration: none; font-weight: bold;">Confirmer mon adresse e-mail</a></p>
          <p style="font-size: 13px; color: #666;">Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br /><span style="word-break: break-all;">${link}</span></p>
          <p style="font-size: 12px; color: #777;">Si vous n'êtes pas à l'origine de cette inscription, ignorez simplement cet e-mail. — Brightened Mind Corporation</p>
        </div>`,
    });
    if (error) {
      console.error("Verification e-mail refused by Resend:", error);
      lastSent.delete(user.uid);
      return NextResponse.json({ error: "L'e-mail n'a pas pu être envoyé. Réessayez dans quelques minutes." }, { status: 502 });
    }

    return NextResponse.json({ status: "sent" });
  } catch (error: any) {
    console.error("Error sending verification e-mail:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: 500 });
  }
}
