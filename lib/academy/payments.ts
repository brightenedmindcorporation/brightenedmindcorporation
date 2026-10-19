import { mailFrom } from "@/lib/mailFrom";
import "server-only";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { sendWithText } from "@/lib/mailText";

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
  | { ok: true; alreadyProcessed?: boolean }
  | { ok: false; reason: "admin-not-configured" | "not-found" | "gateway-rejected" };

function isGatewaySuccess(status: string): boolean {
  const normalized = String(status).toUpperCase();
  // "0"/0 covers FlexPay's own success code, in addition to the more
  // generic gateway status strings already handled.
  return normalized === "SUCCESS" || normalized === "APPROVED" || normalized === "00" || normalized === "0";
}

async function sendPaymentReceivedEmail(email: string, amount: number | undefined, currency: string | undefined) {
  const { error } = await sendWithText(resend, {
    from: mailFrom("Brightened Mind Academia"),
    to: email,
    subject: "Paiement reçu — votre inscription sera validée par l'administration",
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #111;">Merci pour votre paiement !</h2>
        <p>Votre paiement de <strong>${amount ?? "-"} ${currency || "USD"}</strong> a bien été reçu.</p>
        <p>Votre inscription doit maintenant être <strong>validée par l'administration</strong>. Dès que c'est fait, vous recevrez votre Student ID et vous pourrez vous connecter à votre espace.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #777; text-align: center;">Brightened Mind Corporation — Service Admission</p>
      </div>
    `,
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

/**
 * Confirms a payment referenced by `reference` (the doc id of
 * payments/{reference}, created by /api/payment/initiate) and, on success,
 * records the payment on the enrollment. A payment NEVER activates an
 * account by itself: the enrollment stays "Pending" until the administration
 * approves it (the Student ID is generated at that moment). Shared by /api/payment/webhook (the real gateway callback
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

  if (data.status === "paid") {
    return { ok: true, alreadyProcessed: true };
  }

  if (!isGatewaySuccess(payload.status)) {
    await paymentRef.update({ status: "failed", failedAt: new Date() });
    return { ok: false, reason: "gateway-rejected" };
  }

  const now = new Date();
  const enrollmentRef = adminDb.collection("enrollments").doc(`${data.uid}_${data.langCode}`);

  await adminDb.runTransaction(async (tx) => {
    const enrollment = await tx.get(enrollmentRef);
    tx.update(paymentRef, {
      status: "paid",
      transactionId: payload.transactionId ?? null,
      confirmedAt: now,
    });
    // The payment is recorded on the enrolment; its status is never changed here.
    tx.set(
      enrollmentRef,
      {
        uid: data.uid,
        langCode: data.langCode,
        paid: true,
        paidAt: now.toISOString(),
        paymentRef: reference,
        ...(enrollment.exists ? {} : { level: data.level, status: "Pending", matricule: "", createdAt: now.toISOString(), source: "payment" }),
      },
      { merge: true }
    );
  });

  try {
    await createNotification({
      audience: "admin",
      type: "payment-received",
      title: "Paiement reçu : inscription à approuver",
      message: `${data.studentName || payload.customerEmail || data.uid} a payé (${payload.amount ?? "-"} ${payload.currency || "USD"}) — ${data.langCode}. Son inscription attend votre approbation.`,
      link: "/admin?tab=students",
    });
  } catch (notifError) {
    console.error("[payments] Admin notification failed (non-fatal):", notifError);
  }

  if (payload.customerEmail) {
    try {
      await sendPaymentReceivedEmail(payload.customerEmail, payload.amount, payload.currency);
    } catch (emailError) {
      console.error("[payments] Email send failed (non-fatal):", emailError);
    }
  }

  return { ok: true };
}
