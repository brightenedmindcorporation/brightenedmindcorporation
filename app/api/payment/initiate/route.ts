import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount, currency, phone, studentName, courseName } = await request.json();

    // Identifiants fournis par ta passerelle (FlexPay / CinetPay / MaxiCash)
    // À placer idéalement dans un fichier .env.local
    const API_TOKEN = process.env.FLEXPAY_API_TOKEN || "TON_TOKEN_DE_TEST";
    const MERCHANT_ID = process.env.FLEXPAY_MERCHANT_ID || "TON_MERCHANT_ID";

    // Référence unique pour cette transaction
    const reference = `BM-${Date.now()}`;

    // Payload envoyé à la passerelle de paiement
    const paymentPayload = {
      merchant: MERCHANT_ID,
      type: "1", // 1 pour Mobile Money, 2 pour Carte Bancaire
      reference: reference,
      amount: amount,
      currency: currency || "USD",
      phone: phone, // ex: "243988830799"
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pursuit-anthem-gorged.ngrok-free.dev"}/api/payment/webhook`,
      description: `Paiement Formation ${courseName} - ${studentName}`,
    };

    console.log("Initiating payment request:", paymentPayload);

    /* 
    // APPEL RÉEL À L'API FLEXPAY :
    const response = await fetch("https://backend.flexpay.cd/api/rest/v1/paymentService", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(paymentPayload),
    });

    const data = await response.json();
    */

    // Simulation de réponse de l'API de paiement
    return NextResponse.json({
      status: "success",
      message: "Demande de paiement envoyée sur le téléphone de l'utilisateur",
      reference: reference,
    });

  } catch (error) {
    console.error("Error initiating payment:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'initialisation du paiement" },
      { status: 500 }
    );
  }
}