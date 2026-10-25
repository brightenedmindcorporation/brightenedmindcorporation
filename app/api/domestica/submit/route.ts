import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { rejectIfFakeEmail } from "@/lib/emailValidation";
import { mailFrom } from "@/lib/mailFrom";
import { sendWithText } from "@/lib/mailText";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const clean = (v: unknown, max = 600) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

/**
 * Requests of BM Domestica: a household looking for staff ("employer") or a person looking for a job ("candidate").
 * Stored in Firestore (`domesticaRequests`) for the administration, which is notified by the bell and by e-mail.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    if (clean(body.website)) return NextResponse.json({ status: "success" }); // honeypot: bots fill hidden fields

    const kind = body.kind === "candidate" ? "candidate" : body.kind === "employer" ? "employer" : "";
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const city = clean(body.city, 80);
    const job = clean(body.job, 80);
    const message = clean(body.message, 1500);
    if (!kind) return NextResponse.json({ error: "Type de demande inconnu." }, { status: 400 });
    if (name.length < 2 || phone.length < 6) return NextResponse.json({ error: "Nom et téléphone / WhatsApp sont requis." }, { status: 400 });
    if (!job) return NextResponse.json({ error: kind === "employer" ? "Indiquez le poste recherché." : "Indiquez le métier visé." }, { status: 400 });
    if (kind === "candidate" && body.consent !== true) {
      return NextResponse.json({ error: "Vous devez accepter que vos informations soient conservées pour étudier votre candidature." }, { status: 400 });
    }
    if (email) {
      const fake = await rejectIfFakeEmail(email);
      if (fake) return fake;
    }

    const record = {
      kind,
      name,
      phone,
      email,
      city,
      job,
      message,
      // employer
      schedule: clean(body.schedule, 120),
      startDate: clean(body.startDate, 60),
      budget: clean(body.budget, 80),
      // candidate
      experience: clean(body.experience, 60),
      languages: clean(body.languages, 120),
      availability: clean(body.availability, 80),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    if (!isAdminConfigured() && !process.env.RESEND_API_KEY) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });

    let id: string | null = null;
    if (isAdminConfigured()) {
      id = (await getAdminDb().collection("domesticaRequests").add(record)).id;
      try {
        await createNotification({
          audience: "admin",
          type: "domestica-request",
          title: kind === "employer" ? "Domestica : nouvelle demande de personnel" : "Domestica : nouvelle candidature",
          message: `${name} — ${job}${city ? ` (${city})` : ""}`,
          link: "/admin?tab=domestica",
        });
      } catch (e) {
        console.error("Domestica notification failed (non-fatal):", e);
      }
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const rows = Object.entries({
          Type: kind === "employer" ? "Demande de personnel" : "Candidature",
          Nom: name,
          "Téléphone / WhatsApp": phone,
          "E-mail": email || "-",
          Ville: city || "-",
          [kind === "employer" ? "Poste recherché" : "Métier visé"]: job,
          ...(kind === "employer"
            ? { Horaires: record.schedule || "-", "Début souhaité": record.startDate || "-", Budget: record.budget || "-" }
            : { Expérience: record.experience || "-", Langues: record.languages || "-", Disponibilité: record.availability || "-" }),
          Détails: message || "-",
        })
          .map(([k, v]) => `<p><b>${esc(k)} :</b> ${esc(String(v)).replace(/\n/g, "<br/>")}</p>`)
          .join("");
        await sendWithText(resend, {
          from: mailFrom("Brightened Mind"),
          to: ADMIN_EMAIL,
          ...(email ? { replyTo: email } : {}),
          subject: kind === "employer" ? `BM Domestica — demande de personnel : ${job}` : `BM Domestica — candidature : ${job}`,
          html: `<h2>BM Domestica</h2>${rows}`,
        });
      } catch (e) {
        console.error("Domestica e-mail failed (non-fatal):", e);
      }
    }
    return NextResponse.json({ status: "success", id });
  } catch (error: any) {
    console.error("Domestica submit failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: 500 });
  }
}
