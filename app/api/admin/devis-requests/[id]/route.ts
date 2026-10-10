import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const VALID_STATUSES = ["new", "contacted", "closed"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { id } = await params;
    const { idToken, status } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    await getAdminDb().collection("devisRequests").doc(id).update({ status });
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error updating devis request:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { id } = await params;
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    await getAdminDb().collection("devisRequests").doc(id).delete();
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error deleting devis request:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
