import { NextResponse } from "next/server";
import { confirmPayment } from "@/lib/academy/payments";

/**
 * Real callback target for the payment gateway (FlexPay / CinetPay /
 * Mobile Money) — see callbackUrl in /api/payment/initiate. Looks up the
 * pending payments/{reference} doc created at initiation time and, on
 * success, persists the enrollment + matricule via confirmPayment.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("PAYMENT WEBHOOK RECEIVED:", body);

    const { reference, transactionId, orderNumber, status, code, amount, currency, customerPhone, customerEmail } = body;
    const paymentRef = reference || orderNumber || transactionId;

    if (!paymentRef) {
      return NextResponse.json({ error: "Missing reference/transactionId" }, { status: 400 });
    }

    const result = await confirmPayment(paymentRef, {
      status: status ?? code,
      transactionId,
      amount,
      currency,
      customerPhone,
      customerEmail,
    });

    if (result.ok) {
      console.log(`✅ Paiement reçu pour ${paymentRef} — l'inscription attend l'approbation de l'administration`);
      return NextResponse.json(
        { status: "success", message: "Transaction validée : l'inscription attend l'approbation de l'administration" },
        { status: 200 }
      );
    }

    if (result.reason === "not-found") {
      return NextResponse.json({ status: "failed", message: "Unknown payment reference" }, { status: 404 });
    }
    if (result.reason === "admin-not-configured") {
      return NextResponse.json({ status: "failed", message: "Server not configured for persistence" }, { status: 503 });
    }

    console.log(`❌ Paiement échoué ou rejeté pour la transaction : ${paymentRef}`);
    return NextResponse.json({ status: "failed", message: "Payment not approved" }, { status: 400 });
  } catch (error) {
    console.error("Error processing payment webhook:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
