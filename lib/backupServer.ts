import "server-only";
import ExcelJS from "exceljs";
import { zipSync, strToU8 } from "fflate";
import { getAdminDb } from "@/lib/firebase-admin";
import { findProgramByCode } from "@/content/curriculum";

/**
 * Collections kept in the full backup. Left out on purpose: `config`, `settings`, `system` (connection tokens and
 * keys), and the very large visit/activity logs (`activity*`, `analytics*`, `timeSpent`), which are not records of people.
 */
export const BACKUP_COLLECTIONS = [
  "students",
  "enrollments",
  "progress",
  "certificates",
  "certificateReservations",
  "payments",
  "placementTests",
  "writingReviews",
  "studentRequests",
  "liveSessions",
  "teachers",
  "announcements",
  "adminMessages",
  "notifications",
  "domesticaRequests",
  "projectRequests",
  "devisRequests",
  "jobApplications",
  "shipments",
  "trucks",
  "counters",
] as const;

/** Firestore values as plain JSON (dates become ISO text). */
function plain(value: any): any {
  if (value === null || value === undefined) return value;
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(plain);
  if (typeof value === "object") {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) out[k] = plain(v);
    return out;
  }
  return value;
}

async function readAll(name: string): Promise<any[]> {
  const snap = await getAdminDb().collection(name).get();
  return snap.docs.map((d) => ({ id: d.id, ...plain(d.data()) }));
}

const stamp = (d = new Date()) => new Date(d.getTime() + 2 * 3600_000).toISOString().slice(0, 10);
const when = (iso?: string) => (iso ? new Date(iso).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short", timeZone: "Africa/Lubumbashi" }) : "");
const lang = (code?: string) => (code ? findProgramByCode(String(code))?.label ?? String(code) : "");

/** The whole database as a dated ZIP: one JSON file per collection, plus a read-me with the counts. */
export async function buildFullBackup(by: string): Promise<{ zip: Uint8Array; name: string; counts: Record<string, number> }> {
  const files: Record<string, Uint8Array> = {};
  const counts: Record<string, number> = {};
  const problems: string[] = [];
  for (const name of BACKUP_COLLECTIONS) {
    try {
      const rows = await readAll(name);
      counts[name] = rows.length;
      files[`${name}.json`] = strToU8(JSON.stringify(rows, null, 1));
    } catch (error: any) {
      problems.push(`${name}: ${error.message || error}`);
    }
  }
  const lines = [
    "SAUVEGARDE BRIGHTENED MIND / BM ACADEMIA",
    `Créée le ${when(new Date().toISOString())} (Lubumbashi) par ${by}`,
    "",
    "Contenu : un fichier .json par collection de la base de données.",
    "Les mots de passe ne sont pas dans cette sauvegarde (ils sont gérés par le service de connexion).",
    "Les clés et connexions (Gmail, services externes) n'y sont pas non plus, par sécurité.",
    "Conservez ce fichier dans un endroit sûr (clé USB, disque, e-mail personnel).",
    "",
    ...Object.entries(counts).map(([k, v]) => `${k.padEnd(26)} ${v}`),
    ...(problems.length ? ["", "Collections non lues :", ...problems] : []),
  ];
  files["LISEZMOI.txt"] = strToU8(lines.join("\r\n"));
  const zip = zipSync(files, { level: 6 });
  await getAdminDb().collection("system").doc("backup").set({ lastBackupAt: new Date().toISOString(), lastBackupBy: by, counts, bytes: zip.length }, { merge: true });
  return { zip, name: `bm-sauvegarde-${stamp()}.zip`, counts };
}

export async function backupStatus() {
  const d = (await getAdminDb().collection("system").doc("backup").get()).data() || {};
  return { lastBackupAt: (d.lastBackupAt as string) || null, lastBackupBy: (d.lastBackupBy as string) || null, counts: (d.counts as Record<string, number>) || null };
}

/** Totals for the PDF summary. */
export async function buildSummary() {
  const [students, enrollments, certificates, payments, placement, reviews] = await Promise.all(["students", "enrollments", "certificates", "payments", "placementTests", "writingReviews"].map(readAll));
  const count = (rows: any[], key: string) => {
    const out: Record<string, number> = {};
    for (const r of rows) out[String(r[key] ?? "—")] = (out[String(r[key] ?? "—")] || 0) + 1;
    return out;
  };
  const byLang: Record<string, number> = {};
  for (const e of enrollments) if (e.status === "Approved") byLang[lang(e.langCode)] = (byLang[lang(e.langCode)] || 0) + 1;
  return {
    generatedAt: new Date().toISOString(),
    students: students.length,
    enrollments: enrollments.length,
    enrollmentsByStatus: count(enrollments, "status"),
    approvedByProgram: byLang,
    certificates: certificates.length,
    certificatesRevoked: certificates.filter((c) => c.revoked).length,
    payments: payments.length,
    placementPending: placement.filter((p) => p.status !== "decided").length,
    writtenPending: reviews.filter((r) => r.status === "pending").length,
    writtenTotal: reviews.length,
  };
}

type Col = { header: string; get: (row: any) => unknown; width?: number };

function sheet(wb: ExcelJS.Workbook, name: string, cols: Col[], rows: any[]) {
  const ws = wb.addWorksheet(name, { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = cols.map((c) => ({ header: c.header, key: c.header, width: c.width ?? 18 }));
  for (const r of rows) ws.addRow(Object.fromEntries(cols.map((c) => [c.header, c.get(r) ?? ""])));
  const head = ws.getRow(1);
  head.font = { bold: true, color: { argb: "FFFFFFFF" } };
  head.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF7A1F2B" } };
  head.alignment = { vertical: "middle" };
  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: cols.length } };
  return ws;
}

/** Excel report: one sheet per subject, ready to filter, print or send. */
export async function buildExcel(): Promise<{ buffer: Buffer; name: string }> {
  const [students, enrollments, certificates, payments, placement, reviews] = await Promise.all(["students", "enrollments", "certificates", "payments", "placementTests", "writingReviews"].map(readAll));
  const profile = new Map(students.map((s) => [s.id, s]));
  const wb = new ExcelJS.Workbook();
  wb.creator = "Brightened Mind";
  wb.created = new Date();

  const approved = enrollments.filter((e) => e.status === "Approved").length;
  const summary = wb.addWorksheet("Résumé");
  summary.columns = [{ width: 42 }, { width: 18 }];
  summary.addRows([
    ["Rapport Brightened Mind / BM Academia"],
    [`Créé le ${when(new Date().toISOString())}`],
    [],
    ["Étudiants (comptes)", students.length],
    ["Inscriptions (toutes)", enrollments.length],
    ["Inscriptions approuvées", approved],
    ["Certificats délivrés", certificates.length],
    ["Paiements enregistrés", payments.length],
    ["Tests de niveau à traiter", placement.filter((p) => p.status !== "decided").length],
    ["Travaux écrits à corriger", reviews.filter((r) => r.status === "pending").length],
  ]);
  summary.getRow(1).font = { bold: true, size: 14, color: { argb: "FF7A1F2B" } };

  sheet(
    wb,
    "Inscriptions",
    [
      { header: "Nom", get: (e) => e.name || profile.get(e.uid)?.name, width: 28 },
      { header: "E-mail", get: (e) => e.email || profile.get(e.uid)?.email, width: 32 },
      { header: "Formation", get: (e) => lang(e.langCode), width: 18 },
      { header: "Niveau", get: (e) => e.level },
      { header: "Statut", get: (e) => e.status },
      { header: "Student ID", get: (e) => e.matricule, width: 22 },
      { header: "Jours / semaine", get: (e) => e.studyDays, width: 14 },
      { header: "Inscrit le", get: (e) => when(e.createdAt), width: 18 },
      { header: "Approuvé le", get: (e) => when(e.approvedAt), width: 18 },
      { header: "Dernière visite", get: (e) => when(profile.get(e.uid)?.lastSeenAt), width: 18 },
    ],
    enrollments.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
  );
  sheet(
    wb,
    "Certificats",
    [
      { header: "N° certificat", get: (c) => c.certificateId || c.id, width: 26 },
      { header: "Étudiant", get: (c) => c.studentName, width: 28 },
      { header: "E-mail", get: (c) => c.studentEmail, width: 32 },
      { header: "Formation", get: (c) => lang(c.langCode), width: 18 },
      { header: "Niveau", get: (c) => c.level },
      { header: "Moyenne /100", get: (c) => c.average },
      { header: "Révoqué", get: (c) => (c.revoked ? "Oui" : "Non"), width: 10 },
      { header: "Délivré le", get: (c) => when(c.issuedAt || c.createdAt), width: 18 },
    ],
    certificates
  );
  // Payments keep whatever fields they have: the columns are the union of what is stored.
  const payKeys = Array.from(new Set(payments.flatMap((p) => Object.keys(p)))).filter((k) => ["string", "number", "boolean"].includes(typeof payments.find((p) => p[k] != null)?.[k]));
  sheet(wb, "Paiements", payKeys.map((k) => ({ header: k, get: (p: any) => (/At$|Date$/.test(k) ? when(p[k]) : p[k]), width: 20 })), payments);
  sheet(
    wb,
    "Tests de niveau",
    [
      { header: "Nom", get: (p) => p.name, width: 28 },
      { header: "E-mail", get: (p) => p.email, width: 32 },
      { header: "Formation", get: (p) => lang(p.langCode), width: 18 },
      { header: "Statut", get: (p) => p.status },
      { header: "Niveau attribué", get: (p) => p.decidedLevel },
      { header: "Envoyé le", get: (p) => when(p.submittedAt), width: 18 },
    ],
    placement
  );
  sheet(
    wb,
    "Corrections écrites",
    [
      { header: "Étudiant", get: (r) => r.name, width: 28 },
      { header: "E-mail", get: (r) => r.email, width: 32 },
      { header: "Formation", get: (r) => lang(r.langCode), width: 18 },
      { header: "Niveau", get: (r) => r.level },
      { header: "Quiz", get: (r) => r.quizTitle, width: 28 },
      { header: "Statut", get: (r) => (r.status === "reviewed" ? "Corrigée" : "À corriger") },
      { header: "Note /10", get: (r) => r.mark },
      { header: "Envoyé le", get: (r) => when(r.submittedAt), width: 18 },
    ],
    reviews
  );
  const buffer = Buffer.from(await wb.xlsx.writeBuffer());
  return { buffer, name: `bm-rapport-${stamp()}.xlsx` };
}
