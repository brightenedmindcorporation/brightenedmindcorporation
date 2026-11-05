"use client";

import { useEffect, useState } from "react";
import { Archive, FileSpreadsheet, FileText, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/firebase";

interface Status {
  lastBackupAt: string | null;
  lastBackupBy: string | null;
  counts: Record<string, number> | null;
}

interface Summary {
  generatedAt: string;
  students: number;
  enrollments: number;
  enrollmentsByStatus: Record<string, number>;
  approvedByProgram: Record<string, number>;
  certificates: number;
  certificatesRevoked: number;
  payments: number;
  placementPending: number;
  writtenPending: number;
  writtenTotal: number;
}

const STATUS_FR: Record<string, string> = { Approved: "Approuvées", Pending: "En attente", Rejected: "Rejetées", Suspended: "Suspendues", Expired: "Expirées" };
const DAY = 86_400_000;

/** Reports (Excel, PDF) and the full dated backup, from one screen. */
export default function BackupTab() {
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState<"" | "full" | "excel" | "pdf">("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const token = async () => auth.currentUser?.getIdToken();

  const loadStatus = async () => {
    try {
      const res = await fetch("/api/admin/backup?type=status", { headers: { Authorization: `Bearer ${await token()}` } });
      const data = await res.json();
      if (res.ok) setStatus(data);
    } catch {
      // the screen still works without the date of the last backup
    }
  };
  useEffect(() => {
    loadStatus();
  }, []);

  const download = async (type: "full" | "excel") => {
    setBusy(type);
    setError("");
    setDone("");
    try {
      const res = await fetch(`/api/admin/backup?type=${type}`, { headers: { Authorization: `Bearer ${await token()}` } });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Erreur serveur");
      const name = res.headers.get("X-File-Name") || (type === "full" ? "bm-sauvegarde.zip" : "bm-rapport.xlsx");
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
      setDone(`${name} téléchargé.`);
      if (type === "full") loadStatus();
    } catch (e: any) {
      setError(e.message || "Erreur");
    } finally {
      setBusy("");
    }
  };

  const pdf = async () => {
    setBusy("pdf");
    setError("");
    setDone("");
    try {
      const res = await fetch("/api/admin/backup?type=summary", { headers: { Authorization: `Bearer ${await token()}` } });
      const s: Summary = await res.json();
      if (!res.ok) throw new Error((s as any).error || "Erreur serveur");
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      let y = 24;
      doc.setFillColor(122, 31, 43);
      doc.rect(0, 0, 210, 16, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text("BRIGHTENED MIND  ·  BM ACADEMIA", 14, 10.5);
      doc.setTextColor(122, 31, 43);
      doc.setFontSize(20);
      doc.text("Rapport de situation", 14, y);
      y += 8;
      doc.setTextColor(90, 90, 90);
      doc.setFontSize(10);
      doc.text(`Établi le ${new Date(s.generatedAt).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Africa/Lubumbashi" })}`, 14, y);
      y += 12;
      const section = (title: string, rows: [string, string | number][]) => {
        doc.setTextColor(122, 31, 43);
        doc.setFontSize(13);
        doc.text(title, 14, y);
        y += 2;
        doc.setDrawColor(230, 222, 212);
        doc.line(14, y, 196, y);
        y += 7;
        doc.setTextColor(40, 40, 40);
        doc.setFontSize(11);
        for (const [label, value] of rows) {
          doc.text(label, 18, y);
          doc.text(String(value), 190, y, { align: "right" });
          y += 6.5;
        }
        y += 6;
      };
      section("Étudiants", [
        ["Comptes étudiants", s.students],
        ["Inscriptions (toutes)", s.enrollments],
        ...Object.entries(s.enrollmentsByStatus).map(([k, v]) => [`   ${STATUS_FR[k] || k}`, v] as [string, number]),
      ]);
      const programs = Object.entries(s.approvedByProgram).sort((a, b) => b[1] - a[1]);
      if (programs.length) section("Inscriptions approuvées par formation", programs);
      section("Certificats et paiements", [
        ["Certificats délivrés", s.certificates],
        ["Certificats révoqués", s.certificatesRevoked],
        ["Paiements enregistrés", s.payments],
      ]);
      section("À traiter", [
        ["Tests de niveau en attente", s.placementPending],
        ["Travaux écrits à corriger", s.writtenPending],
        ["Travaux écrits (total)", s.writtenTotal],
      ]);
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(9);
      doc.text("bmcorporation-cd.com  ·  Document généré automatiquement depuis l'administration", 14, 288);
      const name = `bm-rapport-${new Date(s.generatedAt).toISOString().slice(0, 10)}.pdf`;
      doc.save(name);
      setDone(`${name} téléchargé.`);
    } catch (e: any) {
      setError(e.message || "Erreur");
    } finally {
      setBusy("");
    }
  };

  const age = status?.lastBackupAt ? (Date.now() - new Date(status.lastBackupAt).getTime()) / DAY : null;
  const late = age === null || age > 7;

  const card = (icon: React.ReactNode, title: string, text: string, label: string, key: "full" | "excel" | "pdf", onClick: () => void) => (
    <div className="rounded-2xl border border-line bg-surface p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/10 text-red-600">{icon}</span>
        <h3 className="font-extrabold text-ink">{title}</h3>
      </div>
      <p className="text-sm text-ink-soft flex-1">{text}</p>
      <button onClick={onClick} disabled={busy !== ""} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl transition disabled:opacity-50">
        {busy === key ? "Préparation…" : label}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl border p-5 flex items-start gap-3 ${late ? "border-amber-600/40 bg-amber-500/10" : "border-emerald-600/40 bg-emerald-500/10"}`}>
        <ShieldCheck className={late ? "text-amber-500" : "text-emerald-500"} size={24} />
        <div className="text-sm">
          <p className="font-bold text-ink">
            {status?.lastBackupAt
              ? `Dernière sauvegarde : ${new Date(status.lastBackupAt).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Africa/Lubumbashi" })}`
              : "Aucune sauvegarde enregistrée pour le moment"}
          </p>
          <p className="text-ink-soft mt-0.5">
            {late ? "Faites une sauvegarde complète chaque semaine, et conservez le fichier hors de cet ordinateur (clé USB, disque, e-mail personnel)." : "À jour. Prochaine sauvegarde conseillée dans moins d'une semaine."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {card(<Archive size={22} />, "Sauvegarde complète", "Toute la base (étudiants, inscriptions, progression, certificats, paiements, corrections…) dans un fichier ZIP daté, avec un mode d'emploi.", "Télécharger la sauvegarde", "full", () => download("full"))}
        {card(<FileSpreadsheet size={22} />, "Rapport Excel", "Un classeur avec une feuille par sujet : inscriptions, certificats, paiements, tests de niveau et corrections. Prêt à filtrer et à imprimer.", "Télécharger le rapport Excel", "excel", () => download("excel"))}
        {card(<FileText size={22} />, "Rapport PDF", "Une page de situation à montrer ou à archiver : effectifs par formation, certificats, paiements et travaux à traiter.", "Télécharger le rapport PDF", "pdf", pdf)}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {done && <p className="text-sm text-emerald-500">{done}</p>}

      {status?.counts && (
        <details className="rounded-2xl border border-line bg-surface p-4 text-sm">
          <summary className="cursor-pointer font-bold text-ink">Contenu de la dernière sauvegarde</summary>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-ink-soft">
            {Object.entries(status.counts).map(([k, v]) => (
              <span key={k}>
                {k} : <b className="text-ink">{v}</b>
              </span>
            ))}
          </div>
        </details>
      )}
      <p className="text-xs text-ink-faint">
        Les mots de passe ne figurent pas dans la sauvegarde (ils sont gérés par le service de connexion), ni les clés et connexions externes, par sécurité.
      </p>
    </div>
  );
}
