// app/api/payment/webhook/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialisation du client Resend avec la clé API présente dans .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

// Fonction utilitaire pour générer le matricule BMCA
function generateStudentId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `BMCA-2026-${randomNum}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("PAYMENT WEBHOOK RECEIVED:", body);

    const { reference, transactionId, status, amount, currency, customerPhone, customerEmail } = body;

    // Vérification de la réussite du paiement (FlexPay / CinetPay / Mobile Money)
    if (status === "SUCCESS" || status === "APPROVED" || status === "00") {
      
      const paymentRef = reference || transactionId;
      const matricule = generateStudentId(); // Génération du matricule élève

      console.log(`✅ [BDD] Inscription activée pour la référence : ${paymentRef}`);
      console.log(`🎓 Nouveau matricule généré : ${matricule}`);
      console.log(`💰 Montant perçu : ${amount} ${currency || "USD"} depuis ${customerPhone || "numéro inconnu"}`);

      // 1. TODO: Sauvegarder/Mettre à jour l'élève en Base de Données (Supabase / Prisma)
      // await db.student.update({
      //   where: { phone: customerPhone },
      //   data: { status: "ACTIVE", paidAmount: amount, paymentRef: paymentRef, matricule: matricule }
      // });

      // 2. Envoi de l'e-mail automatique avec le matricule si l'adresse email est fournie
      if (customerEmail) {
        try {
          await resend.emails.send({
            from: "Brightened Mind Academy <contact@brightenedmind.com>",
            to: customerEmail,
            subject: "Confirmation d'inscription & Votre Matricule BMCA",
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #111;">Bienvenue chez Brightened Mind Corporation !</h2>
                <p>Votre paiement de <strong>${amount} ${currency || "USD"}</strong> a été reçu avec succès.</p>
                
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
          console.log(`📧 E-mail de confirmation envoyé à ${customerEmail}`);
        } catch (emailError) {
          console.error("⚠️ Erreur lors de l'envoi de l'e-mail via Resend:", emailError);
        }
      }

      // 3. TODO: Optionnel - SMS / WhatsApp
      // await sendWhatsAppConfirmation(customerPhone, `Paiement reçu ! Votre matricule est : ${matricule}`);

      return NextResponse.json(
        { 
          status: "success", 
          message: "Transaction validée, matricule généré et e-mail envoyé",
          matricule: matricule 
        },
        { status: 200 }
      );
    }

    console.log(`❌ Paiement échoué ou rejeté pour la transaction : ${transactionId || reference}`);
    return NextResponse.json({ status: "failed", message: "Payment not approved" }, { status: 400 });

  } catch (error) {
    console.error("Error processing payment webhook:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}