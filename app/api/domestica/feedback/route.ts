import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";

export const dynamic = "force-dynamic";

const KEYS: Record<string, string> = { "1": "d30", "3": "d90" };
const clean = (v: unknown, max = 800) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const rate = (v: unknown) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : 0;
};

/** Loads the placed employer request a satisfaction link points to (the Firestore id is the secret). */
async function target(id: string, m: string) {
  const key = KEYS[m];
  if (!id || !key) return { error: "Lien invalide.", status: 400 as const };
  const ref = getAdminDb().collection("domesticaRequests").doc(id);
  const snap = await ref.get();
  const data = snap.data();
  if (!snap.exists || !data || data.kind !== "employer" || data.status !== "placed") return { error: "Ce lien n'est plus valide.", status: 404 as const };
  return { ref, data, key };
}

/** Public: the title shown on the questionnaire, and whether it was already answered. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const url = new URL(request.url);
    const t = await target(url.searchParams.get("id") || "", url.searchParams.get("m") || "");
    if ("error" in t) return NextResponse.json({ error: t.error }, { status: t.status });
    return NextResponse.json({ job: t.data.job, firstName: String(t.data.name || "").split(/\s+/)[0], done: Boolean(t.data.feedbacks?.[t.key]) });
  } catch (error) {
    console.error("Domestica feedback GET failed:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

/** Public: stores the answers once per period (1 month / 3 months) and marks the follow-up as done. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const body = await request.json().catch(() => ({}));
    const t = await target(clean(body.id, 80), String(body.m || ""));
    if ("error" in t) return NextResponse.json({ error: t.error }, { status: t.status });
    if (t.data.feedbacks?.[t.key]) return NextResponse.json({ error: "Merci, vos réponses ont déjà été reçues." }, { status: 409 });

    const overall = rate(body.overall);
    const punctuality = rate(body.punctuality);
    const quality = rate(body.quality);
    const behaviour = rate(body.behaviour);
    if (!overall || !punctuality || !quality || !behaviour) return NextResponse.json({ error: "Merci de noter chaque critère de 1 à 5." }, { status: 400 });
    const recommend = body.recommend === "yes" ? "yes" : body.recommend === "no" ? "no" : "";
    if (!recommend) return NextResponse.json({ error: "Dites-nous si vous nous recommanderiez." }, { status: 400 });

    const feedback = {
      at: new Date().toISOString(),
      overall,
      punctuality,
      quality,
      behaviour,
      recommend,
      needsReplacement: body.needsReplacement === true,
      comment: clean(body.comment),
    };
    const label = t.key === "d30" ? "1 mois" : "3 mois";
    const summary = `Questionnaire client : ${overall}/5 global, ponctualité ${punctuality}/5, travail ${quality}/5, comportement ${behaviour}/5${feedback.needsReplacement ? " — demande de remplacement" : ""}${feedback.comment ? ` — « ${feedback.comment.slice(0, 200)} »` : ""}`;
    await t.ref.update({
      [`feedbacks.${t.key}`]: feedback,
      [`followUps.${t.key}`]: { done: true, at: feedback.at, by: "client", note: summary },
      updatedAt: feedback.at,
    });
    try {
      await createNotification({
        audience: "admin",
        type: "domestica-request",
        title: `Domestica : avis client à ${label}`,
        message: `${t.data.name} — ${overall}/5${feedback.needsReplacement ? " (remplacement demandé)" : ""}`,
        link: "/admin?tab=domestica",
      });
    } catch (e) {
      console.error("Domestica feedback notification failed (non-fatal):", e);
    }
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Domestica feedback POST failed:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
