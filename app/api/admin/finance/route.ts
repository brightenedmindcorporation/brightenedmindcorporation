import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { ACCOUNTS, categoriesFor, type Account, type Currency, type EntryType, type JournalLine } from "@/lib/finance";

// Live administration data: never cached.
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const TYPES: EntryType[] = ["income", "expense", "withdrawal", "transfer"];
const ACCOUNT_IDS = ACCOUNTS.map((a) => a.id) as Account[];
const MANUAL_ACCOUNTS: Account[] = ACCOUNT_IDS.filter((a) => a !== "online");

class HttpError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

async function requireAdmin(request: Request) {
  if (!isAdminConfigured()) throw new HttpError("Serveur non configuré.", 503);
  const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!idToken) throw new HttpError("idToken requis.", 400);
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  if (decoded.email !== ADMIN_EMAIL) throw new HttpError("Non autorisé.", 403);
  return decoded.email as string;
}

const fail = (error: any) => {
  if (!(error instanceof HttpError)) console.error("Finance API error:", error);
  return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: error instanceof HttpError ? error.status : 500 });
};

const iso = (v: any): string | undefined => {
  if (!v) return undefined;
  if (typeof v.toDate === "function") return v.toDate().toISOString();
  if (v instanceof Date) return v.toISOString();
  return String(v);
};

const text = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/** Validates the fields of a manual entry (shared by create and edit). */
function cleanEntry(body: any) {
  const type = body.type as EntryType;
  if (!TYPES.includes(type)) throw new HttpError("Type d'opération invalide.");
  const account = body.account as Account;
  if (!MANUAL_ACCOUNTS.includes(account)) throw new HttpError("Choisissez le compte (caisse, mobile money ou banque).");
  let toAccount: Account | undefined;
  if (type === "transfer") {
    toAccount = body.toAccount as Account;
    if (!MANUAL_ACCOUNTS.includes(toAccount)) throw new HttpError("Choisissez le compte de destination.");
    if (toAccount === account) throw new HttpError("Les deux comptes du transfert doivent être différents.");
  }
  const amount = Math.round(Number(body.amount) * 100) / 100;
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000_000) throw new HttpError("Montant invalide.");
  const currency = body.currency as Currency;
  if (currency !== "USD" && currency !== "CDF") throw new HttpError("Devise invalide.");
  const date = text(body.date, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(new Date(`${date}T12:00:00`).getTime())) throw new HttpError("Date invalide.");
  const category = text(body.category, 80) || categoriesFor(type)[0];
  const description = text(body.description, 300);
  const party = text(body.party, 120);
  if (type === "income" && !party && !body.studentUid) throw new HttpError("Indiquez qui a payé.");
  return { type, account, toAccount: toAccount ?? null, amount, currency, date, category, description, party };
}

function ledgerLine(id: string, d: any): JournalLine {
  return {
    id,
    source: "manual",
    type: d.type,
    account: d.account,
    ...(d.toAccount ? { toAccount: d.toAccount } : {}),
    amount: Number(d.amount) || 0,
    currency: d.currency === "CDF" ? "CDF" : "USD",
    category: d.category || "",
    description: d.description || "",
    party: d.party || "",
    date: d.date || (iso(d.createdAt) || "").slice(0, 10),
    receiptNo: d.receiptNo || undefined,
    studentUid: d.studentUid || undefined,
    langCode: d.langCode || undefined,
    matricule: d.matricule || undefined,
    voided: Boolean(d.voided),
    voidReason: d.voidReason || undefined,
    createdAt: iso(d.createdAt),
  };
}

/** An online payment that never went through the real gateway (simulation during tests). */
const isTestPayment = (d: any) => d.simulated === true || d.test === true || (d.status === "paid" && !d.transactionId);

function paymentLine(id: string, d: any): JournalLine {
  const when = iso(d.confirmedAt) || iso(d.createdAt) || "";
  return {
    id,
    source: "online",
    type: "income",
    account: "online",
    amount: Number(d.amount) || 0,
    currency: d.currency === "CDF" ? "CDF" : "USD",
    category: "Frais d'inscription",
    description: d.langCode ? `Paiement en ligne (${d.langCode})` : "Paiement en ligne",
    party: d.studentName || "",
    date: when.slice(0, 10),
    studentUid: d.uid || undefined,
    langCode: d.langCode || undefined,
    matricule: d.matricule || undefined,
    status: d.status,
    test: isTestPayment(d),
    createdAt: iso(d.createdAt),
  };
}

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const db = getAdminDb();
    const [ledgerSnap, paySnap] = await Promise.all([db.collection("ledger").limit(3000).get(), db.collection("payments").limit(1000).get()]);
    const lines: JournalLine[] = [
      ...ledgerSnap.docs.map((doc) => ledgerLine(doc.id, doc.data())),
      ...paySnap.docs.filter((doc) => ["paid", "pending"].includes(doc.data().status)).map((doc) => paymentLine(doc.id, doc.data())),
    ];
    lines.sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.createdAt || "").localeCompare(a.createdAt || ""));
    return NextResponse.json({ lines });
  } catch (error) {
    return fail(error);
  }
}

/** Next receipt number: REC-2026-0001, REC-2026-0002… (never reused). */
async function nextReceiptNo(): Promise<string> {
  const db = getAdminDb();
  const ref = db.collection("counters").doc("ledgerReceipts");
  const year = new Date().getFullYear();
  const n = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = (snap.data() || {}) as { year?: number; n?: number };
    const next = data.year === year ? (data.n || 0) + 1 : 1;
    tx.set(ref, { year, n: next }, { merge: true });
    return next;
  });
  return `REC-${year}-${String(n).padStart(4, "0")}`;
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    const body = await request.json();
    const entry = cleanEntry(body);
    const db = getAdminDb();

    const studentUid = text(body.studentUid, 128);
    const langCode = text(body.langCode, 20);
    const matricule = text(body.matricule, 40);
    const link = entry.type === "income" && studentUid ? { studentUid, ...(langCode ? { langCode } : {}), ...(matricule ? { matricule } : {}) } : {};

    const receiptNo = entry.type === "income" ? await nextReceiptNo() : null;
    const ref = db.collection("ledger").doc();
    await ref.set({
      ...entry,
      ...link,
      receiptNo,
      voided: false,
      createdAt: new Date(),
      createdBy: admin,
    });

    // A fee paid at the desk counts like an online payment: the enrolment is marked as paid (never approved by it).
    let enrollmentMarked = false;
    if (entry.type === "income" && studentUid && langCode && /^Frais/.test(entry.category)) {
      const enrollmentRef = db.collection("enrollments").doc(`${studentUid}_${langCode}`);
      const snap = await enrollmentRef.get();
      if (snap.exists) {
        await enrollmentRef.set({ paid: true, paidAt: new Date().toISOString(), paymentRef: ref.id, paidMethod: entry.account }, { merge: true });
        enrollmentMarked = true;
      }
    }

    const line = ledgerLine(ref.id, { ...entry, ...link, receiptNo, voided: false, createdAt: new Date() });
    return NextResponse.json({ line, enrollmentMarked });
  } catch (error) {
    return fail(error);
  }
}

/** Edit an entry, cancel it (kept in the journal, ignored in the totals) or restore it. */
export async function PATCH(request: Request) {
  try {
    await requireAdmin(request);
    const body = await request.json();
    const id = text(body.id, 128);
    if (!id) throw new HttpError("Identifiant requis.");
    const ref = getAdminDb().collection("ledger").doc(id);
    const snap = await ref.get();
    if (!snap.exists) throw new HttpError("Opération introuvable.", 404);
    const current = snap.data() as any;

    let patch: Record<string, any>;
    if (body.action === "void") {
      patch = { voided: true, voidReason: text(body.reason, 200), voidedAt: new Date() };
    } else if (body.action === "restore") {
      patch = { voided: false, voidReason: FieldValue.delete(), voidedAt: FieldValue.delete() };
    } else {
      patch = { ...cleanEntry({ ...current, ...body }), editedAt: new Date() };
      if (current.type !== patch.type) throw new HttpError("Le type d'une opération ne peut pas être changé : annulez-la et recréez-la.");
    }
    await ref.update(patch);
    const fresh = await ref.get();
    return NextResponse.json({ line: ledgerLine(id, fresh.data()) });
  } catch (error) {
    return fail(error);
  }
}

/**
 * ?id=…                       permanently deletes a manual entry
 * ?payment=…[&reset=1]        deletes one online payment record (e.g. a test); reset=1 also un-marks the enrolment as paid
 * ?tests=1[&reset=1]          deletes every online payment recognised as a test
 */
export async function DELETE(request: Request) {
  try {
    await requireAdmin(request);
    const db = getAdminDb();
    const url = new URL(request.url);
    const reset = url.searchParams.get("reset") === "1";

    const unmark = async (paymentId: string, d: any) => {
      if (!reset || !d.uid || !d.langCode) return;
      const enrollmentRef = db.collection("enrollments").doc(`${d.uid}_${d.langCode}`);
      const snap = await enrollmentRef.get();
      if (snap.exists && snap.data()?.paymentRef === paymentId) {
        await enrollmentRef.update({ paid: FieldValue.delete(), paidAt: FieldValue.delete(), paymentRef: FieldValue.delete() });
      }
    };

    const entryId = url.searchParams.get("id");
    if (entryId) {
      const ref = db.collection("ledger").doc(entryId);
      if (!(await ref.get()).exists) throw new HttpError("Opération introuvable.", 404);
      await ref.delete();
      return NextResponse.json({ ok: true });
    }

    const paymentId = url.searchParams.get("payment");
    if (paymentId) {
      const ref = db.collection("payments").doc(paymentId);
      const snap = await ref.get();
      if (!snap.exists) throw new HttpError("Paiement introuvable.", 404);
      await unmark(paymentId, snap.data());
      await ref.delete();
      return NextResponse.json({ ok: true });
    }

    if (url.searchParams.get("tests") === "1") {
      const snap = await db.collection("payments").limit(1000).get();
      let removed = 0;
      for (const doc of snap.docs) {
        if (!isTestPayment(doc.data())) continue;
        await unmark(doc.id, doc.data());
        await doc.ref.delete();
        removed++;
      }
      return NextResponse.json({ ok: true, removed });
    }

    throw new HttpError("Paramètre manquant.");
  } catch (error) {
    return fail(error);
  }
}
