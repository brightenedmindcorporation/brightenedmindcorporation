import "server-only";

/**
 * FlexPay (flexpay.cd / flexpaie.com) — Mobile Money + card payment
 * gateway for DRC. Real calls only fire once FLEXPAY_MERCHANT_ID and
 * FLEXPAY_API_TOKEN are set; until then /api/payment/initiate falls back
 * to the existing simulation so the rest of the flow keeps working while
 * the account is being set up.
 *
 * Mobile Money confirmation is asynchronous: the customer gets a USSD
 * prompt on their phone, and FlexPay calls /api/payment/webhook once they
 * approve or decline — initiating a payment here only ever returns
 * "pending", never an immediate success.
 *
 * Field names follow FlexPay's documented REST payment endpoint as best
 * known; this has not been exercised against a live FlexPay account yet
 * (no credentials were available while writing it) — the first real test
 * transaction, once the merchant account is set up, is the actual
 * verification. Log output below is there specifically to make that first
 * live test easy to debug.
 */

const FLEXPAY_BASE_URL = "https://backend.flexpay.cd/api/rest/v1";

export function isFlexPayConfigured(): boolean {
  return Boolean(process.env.FLEXPAY_MERCHANT_ID && process.env.FLEXPAY_API_TOKEN);
}

export interface FlexPayInitiateResult {
  ok: boolean;
  raw: unknown;
  gatewayReference?: string;
  message?: string;
}

/** type: "1" = Mobile Money, "2" = carte bancaire (FlexPay's own codes). */
export async function initiateFlexPayPayment(opts: {
  reference: string;
  amount: number;
  currency: string;
  phone: string;
  description: string;
  callbackUrl: string;
  type?: "1" | "2";
}): Promise<FlexPayInitiateResult> {
  const merchant = process.env.FLEXPAY_MERCHANT_ID;
  const token = process.env.FLEXPAY_API_TOKEN;
  if (!merchant || !token) {
    throw new Error("FlexPay n'est pas configuré (FLEXPAY_MERCHANT_ID / FLEXPAY_API_TOKEN manquants).");
  }

  const payload = {
    merchant,
    type: opts.type ?? "1",
    reference: opts.reference,
    amount: opts.amount,
    currency: opts.currency,
    phone: opts.phone,
    callbackUrl: opts.callbackUrl,
    description: opts.description,
  };

  const response = await fetch(`${FLEXPAY_BASE_URL}/paymentService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.json().catch(() => null);
  console.log("[flexpay] initiate response:", response.status, JSON.stringify(raw));

  if (!response.ok) {
    return { ok: false, raw, message: (raw as any)?.message || `Erreur FlexPay (${response.status})` };
  }

  // FlexPay's documented success shape returns a 0/"0" code and an order
  // number for the pending transaction — accept common variants since
  // this hasn't been confirmed against a live response yet.
  const code = (raw as any)?.code;
  const isAccepted = code === 0 || code === "0" || (raw as any)?.status === "pending" || response.status === 200;
  const gatewayReference = (raw as any)?.orderNumber || (raw as any)?.reference || (raw as any)?.transactionId;

  return { ok: isAccepted, raw, gatewayReference, message: (raw as any)?.message };
}
