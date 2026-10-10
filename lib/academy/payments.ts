import "server-only";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { generateMatriculeAdmin } from "@/lib/academy/matricule-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface GatewayCallbackPayload {
  status: string;
  transactionId?: string;
  amount?: number;
  currency?: string;
  customerPhone?: string;
  customerEmail?: string;
}

export type ConfirmPaymentResult =
  | { ok: true; matricule: string; alreadyProcessed?: boolean }
  | { ok: false; reason: "admin-not-configured" | "not-found" | "gateway-rejected" };

function isGatewaySuccess(status: string): boolean {
  return status === "SUCCESS" || status === "APPROVED" || status === "00";
}

async function sendMatriculeEmail(email: string, amount: number | undefined, currency: string | undefined, matricule: string) {
  await resend.emails.send({
    from: "Brightened Mind Academy <contact@brightenedmind.com>",
    to: email,
    subject: "Confirmation d'inscription & Votre Matricule BMCA",
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #111;">Bienvenue chez Brightened Mind Corporation !</h2>
        <p>Votre paiement de <strong>${amount ?? "-"} ${currency || "USD"}</strong> a été reçu avec succès.</p>

        <p>Voici votre identifiant d'accès officiel :</p>
        <div style="background: #111; color: #ef4444; padding: 18px; border-radius: 8px; text-align: center; font-size: 26px; font-weight: bold; font-family: monospace; letter-spacing: 2px;">
          ${matricule}
        </div>

        <p style="margin-top: 20px;">Conservez précieusement ce matricule, il vous permettra d'accéder à tous vos cours sur l'Espace Academia.</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #777; text-align: center;">Brightened Mind Corporation — Service Admission</p>
      </div>
    `,
  });
}

/**
 * Confirms a payment referenced by `reference` (the doc id of
 * payments/{reference}, created by /api/payment/initiate) and, on success,
 * persists the enrollment to Firestore and generates the student's real
 * matricule. Shared by /api/payment/webhook (the real gateway callback
 * target) and /api/payment/initiate (which calls this inline today since
 * the real gateway call is still commented out — see that route).
 *
 * Idempotent: calling this twice for an already-"paid" reference is a
 * no-op that returns the existing matricule instead of generating a
 * second one.
 */
export async function confirmPayment(
  reference: string,
  payload: GatewayCallbackPayload
): Promise<ConfirmPaymentResult> {
  if (!isAdminConfigured()) {
    console.warn(
      "[payments] FIREBASE_SERVICE_ACCOUNT_KEY is not set — skipping Firestore persistence. " +
        "Configure it in .env.local to enable real enrollment records and matricules."
    );
    return { ok: false, reason: "admin-not-configured" };
  }

  const adminDb = getAdminDb();
  const paymentRef = adminDb.collection("payments").doc(reference);
  const snap = await paymentRef.get();

  if (!snap.exists) {
    console.error(`[payments] confirmPayment: no pending payment found for reference ${reference}`);
    return { ok: false, reason: "not-found" };
  }

  const data = snap.data() as {
    uid: string;
    langCode: string;
    level: number;
    studentName?: string;
    status: string;
    matricule?: string;
  };

  if (data.status === "paid" && data.matricule) {
    return { ok: true, matricule: data.matricule, alreadyProcessed: true };
  }

  if (!isGatewaySuccess(payload.status)) {
    await paymentRef.update({ status: "failed", failedAt: new Date() });
    return { ok: false, reason: "gateway-rejected" };
  }

  const matricule = await generateMatriculeAdmin(data.langCode);
  const now = new Date();

  await adminDb.runTransaction(async (tx) => {
    tx.update(paymentRef, {
      status: "paid",
      matricule,
      transactionId: payload.transactionId ?? null,
      confirmedAt: now,
    });

    tx.set(
      adminDb.collection("enrollments").doc(`${data.uid}_${data.langCode}`),
      {
        uid: data.uid,
        langCode: data.langCode,
        level: data.level,
        // Must match the status value the approve-enrollment route and
        // the login/dashboard/level gating logic check for — a payment
        // is itself the approval, so it goes straight to "Approved"
        // rather than a separate "paid" status those paths don't know.
        status: "Approved",
        matricule,
        createdAt: now,
        approvedAt: now,
        paymentRef: reference,
        source: "payment",
      },
      { merge: true }
    );

    tx.set(
      adminDb.collection("students").doc(data.uid),
      { status: "Approved", matricule },
      { merge: true }
    );
  });

  if (payload.customerEmail) {
    try {
      await sendMatriculeEmail(payload.customerEmail, payload.amount, payload.currency, matricule);
    } catch (emailError) {
      console.error("[payments] Email send failed (non-fatal):", emailError);
    }
  }

  return { ok: true, matricule };
}
