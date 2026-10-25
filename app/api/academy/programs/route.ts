import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { getProgramSettings } from "@/lib/academy/programSettings";
import { curriculumPrograms, programLevels } from "@/content/curriculum";

export const dynamic = "force-dynamic";

/** The programs a signed-in student can ask for, with the state of the student's own enrollment in each. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
    const { uid } = await getAdminAuth().verifyIdToken(idToken);
    const [settings, snap] = await Promise.all([getProgramSettings(), getAdminDb().collection("enrollments").where("uid", "==", uid).get()]);
    const mine = new Map(snap.docs.map((d) => [d.data().langCode as string, d.data()]));
    return NextResponse.json({
      programs: curriculumPrograms.map((p) => {
        const e = mine.get(p.code);
        return {
          code: p.code,
          label: p.label,
          levels: programLevels(p.slug),
          open: !settings.closed.includes(p.code),
          autoApprove: settings.autoApprove.includes(p.code),
          state: (e?.status as string) || "none",
          reason: (e?.statusReason as string) || "",
        };
      }),
      pendingCount: snap.docs.filter((d) => d.data().status === "Pending").length,
    });
  } catch (error: any) {
    console.error("Programs API failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: 500 });
  }
}
