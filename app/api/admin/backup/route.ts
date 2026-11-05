import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { backupStatus, buildExcel, buildFullBackup, buildSummary } from "@/lib/backupServer";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/**
 * Reports and backups for the administration (administrator only):
 *   ?type=status  the date of the last backup
 *   ?type=summary totals for the PDF report
 *   ?type=excel   the Excel report
 *   ?type=full    the full dated backup (ZIP of JSON files)
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) return NextResponse.json({ error: "Non autorisé." }, { status: 403 });

    const type = new URL(request.url).searchParams.get("type");
    if (type === "status") return NextResponse.json(await backupStatus());
    if (type === "summary") return NextResponse.json(await buildSummary());
    if (type === "excel") {
      const { buffer, name } = await buildExcel();
      return new Response(new Uint8Array(buffer), {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${name}"`,
          "X-File-Name": name,
          "Cache-Control": "no-store",
        },
      });
    }
    if (type === "full") {
      const { zip, name } = await buildFullBackup(decoded.email || "admin");
      return new Response(new Uint8Array(zip), {
        headers: { "Content-Type": "application/zip", "Content-Disposition": `attachment; filename="${name}"`, "X-File-Name": name, "Cache-Control": "no-store" },
      });
    }
    return NextResponse.json({ error: "Type inconnu." }, { status: 400 });
  } catch (error: any) {
    console.error("Backup error:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
