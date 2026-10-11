import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";

/** Polled by the payment page while a real FlexPay transaction is
 * pending, waiting for /api/payment/webhook to confirm or reject it. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const reference = new URL(request.url).searchParams.get("reference");
    if (!reference) return NextResponse.json({ error: "reference requise." }, { status: 400 });

    const snap = await getAdminDb().collection("payments").doc(reference).get();
    if (!snap.exists) return NextResponse.json({ error: "Référence introuvable." }, { status: 404 });

    const data = snap.data()!;
    return NextResponse.json({ status: data.status, matricule: data.matricule || null });
  } catch (error: any) {
    console.error("Error checking payment status:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
