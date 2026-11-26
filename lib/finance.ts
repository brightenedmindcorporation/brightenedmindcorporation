// Shared finance vocabulary and helpers (used by the admin Finances tab and /api/admin/finance).

export type Currency = "USD" | "CDF";
export type EntryType = "income" | "expense" | "withdrawal" | "transfer";
export type Account = "cash" | "mobile" | "bank" | "online";

export const CURRENCIES: Currency[] = ["USD", "CDF"];

export const ACCOUNTS: { id: Account; label: string; hint: string }[] = [
  { id: "cash", label: "Caisse (espèces)", hint: "L'argent liquide au bureau" },
  { id: "mobile", label: "Mobile money", hint: "M-Pesa, Airtel Money, Orange Money…" },
  { id: "bank", label: "Banque", hint: "Compte bancaire" },
  { id: "online", label: "Paiements en ligne", hint: "Reçu automatiquement via le site" },
];

export const TYPES: { id: EntryType; label: string; plural: string }[] = [
  { id: "income", label: "Entrée", plural: "Entrées" },
  { id: "expense", label: "Dépense", plural: "Dépenses" },
  { id: "withdrawal", label: "Retrait", plural: "Retraits" },
  { id: "transfer", label: "Transfert", plural: "Transferts" },
];

export const INCOME_CATEGORIES = [
  "Frais d'inscription",
  "Frais de niveau",
  "Certificat",
  "BM Communication",
  "BM Domestica",
  "BM Events",
  "Solde d'ouverture",
  "Autre entrée",
];

export const EXPENSE_CATEGORIES = [
  "Salaires et primes",
  "Loyer",
  "Électricité et eau",
  "Internet et téléphone",
  "Transport",
  "Matériel et équipement",
  "Publicité et communication",
  "Fournitures de bureau",
  "Taxes et frais administratifs",
  "Frais bancaires et mobile money",
  "Autre dépense",
];

export const WITHDRAWAL_CATEGORIES = ["Retrait de la direction", "Avance", "Remboursement", "Autre retrait"];

export const categoriesFor = (type: EntryType): string[] =>
  type === "income" ? INCOME_CATEGORIES : type === "expense" ? EXPENSE_CATEGORIES : type === "withdrawal" ? WITHDRAWAL_CATEGORIES : ["Transfert entre comptes"];

export const accountLabel = (id?: string) => ACCOUNTS.find((a) => a.id === id)?.label ?? id ?? "";
export const typeLabel = (id?: string) => TYPES.find((t) => t.id === id)?.label ?? id ?? "";

/** One line of the journal, manual (ledger) or automatic (online payment). */
export interface JournalLine {
  id: string;
  source: "manual" | "online";
  type: EntryType;
  account: Account;
  toAccount?: Account;
  amount: number;
  currency: Currency;
  category: string;
  description: string;
  party: string;
  date: string; // YYYY-MM-DD
  receiptNo?: string;
  studentUid?: string;
  langCode?: string;
  matricule?: string;
  voided?: boolean;
  voidReason?: string;
  createdAt?: string;
  /** Online payment only: not a real payment (test / simulation). */
  test?: boolean;
  status?: string;
}

/** Whether a line moves real money into / out of an account for the totals. */
export const counts = (l: JournalLine) => !l.voided && !l.test && (l.source === "manual" || l.status === "paid");

/** Signed effect of a line on one account (0 if it does not touch it). */
export function effectOn(l: JournalLine, account: Account): number {
  if (!counts(l)) return 0;
  if (l.type === "income") return l.account === account ? l.amount : 0;
  if (l.type === "expense" || l.type === "withdrawal") return l.account === account ? -l.amount : 0;
  if (l.type === "transfer") return (l.account === account ? -l.amount : 0) + (l.toAccount === account ? l.amount : 0);
  return 0;
}

export function balances(lines: JournalLine[], currency: Currency): Record<Account, number> {
  const out: Record<Account, number> = { cash: 0, mobile: 0, bank: 0, online: 0 };
  for (const l of lines) {
    if (l.currency !== currency) continue;
    for (const a of ACCOUNTS) out[a.id] += effectOn(l, a.id);
  }
  return out;
}

export function periodTotals(lines: JournalLine[], currency: Currency) {
  let income = 0;
  let expense = 0;
  let withdrawal = 0;
  for (const l of lines) {
    if (l.currency !== currency || !counts(l)) continue;
    if (l.type === "income") income += l.amount;
    else if (l.type === "expense") expense += l.amount;
    else if (l.type === "withdrawal") withdrawal += l.amount;
  }
  return { income, expense, withdrawal, net: income - expense - withdrawal };
}

export const money = (value: number, currency: Currency) =>
  currency === "USD"
    ? `${value < 0 ? "-" : ""}${Math.abs(value).toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} $`
    : `${value < 0 ? "-" : ""}${Math.abs(value).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} FC`;

export const today = () => new Date().toISOString().slice(0, 10);

export const prettyDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
};

const csvCell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export function toCsv(lines: JournalLine[]): string {
  const head = ["Date", "Type", "Catégorie", "Description", "Personne", "Compte", "Vers le compte", "Montant", "Devise", "N° reçu", "Origine", "État"];
  const rows = lines.map((l) => [
    l.date,
    typeLabel(l.type),
    l.category,
    l.description,
    l.party,
    accountLabel(l.account),
    l.toAccount ? accountLabel(l.toAccount) : "",
    l.amount,
    l.currency,
    l.receiptNo || "",
    l.source === "online" ? "Paiement en ligne" : "Saisie manuelle",
    l.voided ? "Annulé" : l.test ? "Test" : "Valide",
  ]);
  // BOM so Excel opens the accents correctly.
  return "﻿" + [head, ...rows].map((r) => r.map(csvCell).join(";")).join("\r\n");
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

/** A printable receipt (opened in a new window, printed or saved as PDF by the browser). */
export function receiptHtml(l: JournalLine): string {
  const rows: [string, string][] = [
    ["Reçu de", l.party || "—"],
    ...(l.matricule ? ([["Student ID", l.matricule]] as [string, string][]) : []),
    ["Pour", `${l.category}${l.description ? ` — ${l.description}` : ""}`],
    ["Mode de paiement", accountLabel(l.account)],
    ["Date", prettyDate(l.date)],
  ];
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Reçu ${esc(l.receiptNo || "")}</title>
<style>
  *{box-sizing:border-box} body{font-family:Georgia,'Times New Roman',serif;color:#1c1c1c;margin:0;padding:32px;background:#fff}
  .sheet{max-width:640px;margin:0 auto;border:2px solid #7a1c2c;padding:32px;position:relative}
  .head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #7a1c2c;padding-bottom:16px}
  .brand{font-size:22px;font-weight:700;color:#7a1c2c} .brand small{display:block;font-size:12px;color:#555;font-weight:400;margin-top:4px;font-family:Arial,sans-serif}
  .no{text-align:right;font-family:Arial,sans-serif;font-size:13px;color:#555} .no b{display:block;font-size:16px;color:#1c1c1c}
  h1{font-size:26px;text-align:center;letter-spacing:4px;text-transform:uppercase;margin:24px 0 4px;color:#7a1c2c}
  .amount{text-align:center;font-size:34px;font-weight:700;margin:12px 0 24px;font-family:Arial,sans-serif}
  table{width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px}
  td{padding:10px 0;border-bottom:1px solid #ddd;vertical-align:top} td:first-child{color:#666;width:38%}
  .sign{display:flex;justify-content:space-between;margin-top:48px;font-family:Arial,sans-serif;font-size:13px;color:#555}
  .sign div{width:44%;border-top:1px solid #999;padding-top:6px;text-align:center}
  .foot{margin-top:28px;text-align:center;font-size:11px;color:#888;font-family:Arial,sans-serif}
  @media print{body{padding:0}.noprint{display:none}}
  .noprint{max-width:640px;margin:0 auto 16px;text-align:right}
  .noprint button{background:#7a1c2c;color:#fff;border:0;padding:10px 18px;border-radius:8px;font-size:14px;cursor:pointer}
</style></head><body>
<div class="noprint"><button onclick="window.print()">Imprimer / Enregistrer en PDF</button></div>
<div class="sheet">
  <div class="head"><div class="brand">Brightened Mind Corporation<small>Lubumbashi, RD Congo · bmcorporation-cd.com</small></div>
  <div class="no">Reçu n°<b>${esc(l.receiptNo || "—")}</b></div></div>
  <h1>Reçu de paiement</h1>
  <div class="amount">${esc(money(l.amount, l.currency))}</div>
  <table>${rows.map(([k, v]) => `<tr><td>${esc(k)}</td><td><b>${esc(v)}</b></td></tr>`).join("")}</table>
  <div class="sign"><div>Le payeur</div><div>Pour BM Corporation</div></div>
  <p class="foot">Ce reçu confirme l'encaissement du montant ci-dessus. Merci pour votre confiance.</p>
</div></body></html>`;
}
