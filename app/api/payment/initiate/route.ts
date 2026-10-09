import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { confirmPayment } from "@/lib/academy/payments";

export async function POST(request: Request) {
  try {
    const { amount, currency, phone, studentName, studentEmail, courseName, uid, langCode, level } =
      await request.json();

    if (!uid || !langCode) {
      return NextResponse.json({ error: "uid et langCode sont requis" }, { status: 400 });
    }

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

    /*
    // APPEL RÉEL À L'API FLEXPAY — une fois activé, retirer le bloc
    // "simulation" ci-dessous : la confirmation arrivera alors de façon
    // asynchrone sur /api/payment/webhook (déjà branché sur la même
    // logique confirmPayment), pas ici.
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

    // Simulation de la confirmation de paiement (pas encore de passerelle
    // réelle branchée) : on confirme immédiatement via le même chemin que
    // le webhook utiliserait, pour que la persistance Firestore et le
    // matricule soient réels dès aujourd'hui.
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
        message: "Paiement confirmé",
        reference,
        matricule: confirmation.matricule,
      });
    }

    // Admin non configuré ou doc introuvable : on répond quand même succès
    // côté passerelle (la demande a bien été envoyée) mais sans matricule
    // réel — l'utilisateur devra être approuvé manuellement par un admin.
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
