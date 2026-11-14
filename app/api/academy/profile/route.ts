import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

/**
 * The student's own profile: display name, phone, WhatsApp and city (editable), the photo, and the programs followed.
 * The official name (the one printed on the certificate), the e-mail and the title (Monsieur/Madame) are NOT editable here:
 * a change of those goes through the administration.
 */
async function caller(request: Request) {
  const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!idToken) throw Object.assign(new Error("Reconnectez-vous puis réessayez."), { status: 401 });
  return getAdminAuth().verifyIdToken(idToken);
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "");

export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Service indisponible pour le moment." }, { status: 503 });
    const decoded = await caller(request);
    const db = getAdminDb();
    const [studentSnap, enrollmentsSnap] = await Promise.all([db.collection("students").doc(decoded.uid).get(), db.collection("enrollments").where("uid", "==", decoded.uid).get()]);
    const s = studentSnap.data() || {};
    return NextResponse.json({
      profile: {
        name: s.name || decoded.name || "",
        displayName: s.displayName || "",
        email: s.email || decoded.email || "",
        gender: s.gender || "",
        phone: s.phone || "",
        whatsapp: s.whatsapp || "",
        city: s.city || "",
        photoUrl: s.photoUrl || "",
      },
      enrollments: enrollmentsSnap.docs.map((d) => {
        const e = d.data();
        return { langCode: e.langCode, level: typeof e.level === "number" ? `Level ${e.level}` : e.level, status: e.status, matricule: e.matricule || "" };
      }),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.status === 401 ? error.message : "Impossible de charger le profil." }, { status: error?.status || 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Service indisponible pour le moment." }, { status: 503 });
    const decoded = await caller(request);
    const body = await request.json().catch(() => ({}));
    const displayName = clean(body.displayName, 60);
    const phone = clean(body.phone, 25);
    const whatsapp = clean(body.whatsapp, 25);
    const city = clean(body.city, 60);
    const phoneOk = (v: string) => v === "" || /^\+?[0-9 ().-]{6,25}$/.test(v);
    if (!phoneOk(phone)) return NextResponse.json({ error: "Le numéro de téléphone n'est pas valide (chiffres, espaces et « + » seulement)." }, { status: 400 });
    if (!phoneOk(whatsapp)) return NextResponse.json({ error: "Le numéro WhatsApp n'est pas valide (chiffres, espaces et « + » seulement)." }, { status: 400 });
    if (displayName && displayName.length < 2) return NextResponse.json({ error: "Le nom affiché est trop court." }, { status: 400 });

    const db = getAdminDb();
    const ref = db.collection("students").doc(decoded.uid);
    // Only these four fields can be written from here, whatever else the request contains.
    await ref.set({ displayName, phone, whatsapp, city, profileUpdatedAt: new Date().toISOString() }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.status === 401 ? error.message : "L'enregistrement a échoué. Réessayez." }, { status: error?.status || 500 });
  }
}
