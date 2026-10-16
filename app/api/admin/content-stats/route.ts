import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { loadCampaigns, loadContentStats } from "@/lib/contentStats";

export const dynamic = "force-dynamic";

/** Announcement, video, lesson and campaign statistics for the administration. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const days = Math.min(90, Math.max(1, Number(new URL(request.url).searchParams.get("days")) || 30));

    const [items, campaigns, annSnap] = await Promise.all([
      loadContentStats(days),
      loadCampaigns(days),
      getAdminDb().collection("announcements").get(),
    ]);
    // Announcements that exist but were never seen still deserve a line (0 views); deleted ones keep their stored title.
    const live = new Map(annSnap.docs.map((d) => [d.id, d.data()]));
    for (const it of items) {
      if (it.type === "ann") {
        const a = live.get(it.key);
        if (a?.title) it.title = a.title;
        (it as any).exists = Boolean(a);
        (it as any).kind = a?.type || "normal";
      }
    }
    const announcements = annSnap.docs.map((d) => ({ id: d.id, title: d.data().title || "", type: d.data().type || "normal" }));
    return NextResponse.json({ days, items, campaigns, announcements });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Content stats failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
