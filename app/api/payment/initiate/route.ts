import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { confirmPayment } from "@/lib/academy/payments";
import { isFlexPayConfigured, initiateFlexPayPayment } from "@/lib/academy/flexpay";

export async function POST(request: Request) {
  try {
    const { amount, currency, phone, studentName, studentEmail, courseName, uid, langCode, level, method } =
      await request.json();

    if (!uid || !langCode) {
      return NextResponse.json({ error: "uid et langCode sont requis" }, { status: 400 });
    }

    const reference = `BM-${Date.now()}`;

    if (isAdminConfigured()) {
      const adminDb = getAdminDb();
      await adminDb.collection("payments").doc(reference).set({
        uid,
        langCode,
        level: level ?? 1,
        studentName: studentName ?? null,
        amount: amount ?? null,
        currency: currency || "USD",
        phone: phone ?? null,
        status: "pending",
        createdAt: new Date(),
      });
    }

    if (isFlexPayConfigured()) {
      // Real gateway: confirmation is asynchronous (the customer approves
      // a USSD prompt on their phone, or completes a card page), so this
      // only ever reports "pending" — /api/payment/webhook is what
      // actually confirms the payment once FlexPay calls back.
      const callbackUrl = `${new URL(request.url).origin}/api/payment/webhook`;
      try {
        const result = await initiateFlexPayPayment({
          reference,
          amount,
          currency: currency || "USD",
          phone,
          description: `Paiement Formation ${courseName} - ${studentName}`,
          callbackUrl,
          type: method === "card" ? "2" : "1",
        });

        if (!result.ok) {
          if (isAdminConfigured()) {
            await getAdminDb().collection("payments").doc(reference).update({ status: "failed", failedAt: new Date() });
          }
          return NextResponse.json(
            { error: result.message || "La passerelle de paiement a refusé la demande." },
            { status: 502 }
          );
        }

        return NextResponse.json({ status: "pending", reference });
      } catch (gatewayError: any) {
        console.error("Error calling FlexPay:", gatewayError);
        return NextResponse.json({ error: gatewayError.message || "Erreur de la passerelle de paiement." }, { status: 502 });
      }
    }

    // FlexPay not configured yet: simulate an immediate confirmation
    // (same Firestore/matricule path the webhook would use for a real
    // payment) so the rest of the flow stays testable while the gateway
    // account is being set up.
    const confirmation = await confirmPayment(reference, {
      status: "SUCCESS",
      amount,
      currency,
      customerPhone: phone,
      customerEmail: studentEmail,
    });

    if (confirmation.ok) {
      return NextResponse.json({
        status: "success",
        message: "Paiement confirmé (mode simulation — FlexPay pas encore configuré)",
        reference,
        matricule: confirmation.matricule,
      });
    }

    return NextResponse.json({
      status: "success",
      message: "Demande de paiement envoyée, en attente de validation manuelle",
      reference,
    });
  } catch (error) {
    console.error("Error initiating payment:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'initialisation du paiement" },
      { status: 500 }
    );
  }
}
