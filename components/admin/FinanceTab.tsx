"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRightLeft,
  Ban,
  Banknote,
  Download,
  FlaskConical,
  Globe,
  HandCoins,
  Landmark,
  Pencil,
  Plus,
  Receipt,
  Search,
  Smartphone,
  Trash2,
  TrendingDown,
  TrendingUp,
  Undo2,
  Wallet,
  X,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import {
  ACCOUNTS,
  CURRENCIES,
  TYPES,
  accountLabel,
  balances,
  categoriesFor,
  counts,
  money,
  periodTotals,
  prettyDate,
  receiptHtml,
  today,
  toCsv,
  typeLabel,
  type Account,
  type Currency,
  type EntryType,
  type JournalLine,
} from "@/lib/finance";

type StudentRow = { uid: string; name?: string; email?: string; langCode?: string; matricule?: string };
type Period = "month" | "30d" | "year" | "all" | "custom";

async function api(url: string, init: RequestInit = {}) {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}`, ...(init.headers || {}) } });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Erreur serveur");
  return result;
}

const ACCOUNT_ICON: Record<Account, typeof Wallet> = { cash: Banknote, mobile: Smartphone, bank: Landmark, online: Globe };
const MANUAL_ACCOUNTS = ACCOUNTS.filter((a) => a.id !== "online");

const inputBase = "bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 min-h-[44px]";
const inputCls = `w-full ${inputBase}`;
const btnGhost = "inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-surface text-ink-soft hover:text-ink hover:border-red-600/50 text-sm font-semibold px-3.5 min-h-[44px] transition";
const btnPrimary = "glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white text-sm font-bold px-4 rounded-xl transition inline-flex items-center justify-center gap-2 min-h-[44px]";

function openReceipt(line: JournalLine) {
  const w = window.open("", "_blank");
  if (!w) {
    alert("Autorisez l'ouverture de fenêtres pour imprimer le reçu.");
    return;
  }
  w.document.write(receiptHtml(line));
  w.document.close();
}

function periodRange(period: Period, from: string, to: string): [string, string] {
  const now = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  if (period === "month") return [iso(new Date(now.getFullYear(), now.getMonth(), 1, 12)), "9999-12-31"];
  if (period === "30d") return [iso(new Date(now.getTime() - 30 * 86400_000)), "9999-12-31"];
  if (period === "year") return [`${now.getFullYear()}-01-01`, "9999-12-31"];
  if (period === "custom") return [from || "0000-01-01", to || "9999-12-31"];
  return ["0000-01-01", "9999-12-31"];
}

interface FormState {
  type: EntryType;
  account: Account;
  toAccount: Account;
  amount: string;
  currency: Currency;
  date: string;
  category: string;
  description: string;
  party: string;
  student: StudentRow | null;
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink-soft mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-ink-faint mt-1">{hint}</span>}
    </label>
  );
}

function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { id: T; label: string; icon?: typeof Wallet }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const Icon = o.icon;
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={`inline-flex items-center gap-2 px-3.5 rounded-xl border text-sm font-semibold min-h-[44px] transition ${
              active ? "bg-red-600 border-red-600 text-white" : "bg-surface-alt border-line text-ink-soft hover:text-ink"
            }`}
          >
            {Icon && <Icon size={15} />} {o.label}
          </button>
        );
      })}
    </div>
  );
}

function EntryModal({
  initial,
  students,
  languageLabel,
  onClose,
  onSaved,
}: {
  initial: { type: EntryType; line?: JournalLine };
  students: StudentRow[];
  languageLabel: (code?: string) => string;
  onClose: () => void;
  onSaved: (line: JournalLine, note?: string) => void;
}) {
  const editing = initial.line;
  const [form, setForm] = useState<FormState>(() => ({
    type: initial.type,
    account: editing?.account && editing.account !== "online" ? editing.account : "cash",
    toAccount: editing?.toAccount ?? "bank",
    amount: editing ? String(editing.amount) : "",
    currency: editing?.currency ?? "USD",
    date: editing?.date ?? today(),
    category: editing?.category ?? categoriesFor(initial.type)[0],
    description: editing?.description ?? "",
    party: editing?.party ?? "",
    student: null,
  }));
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length < 2) return [];
    return students.filter((s) => `${s.name || ""} ${s.email || ""} ${s.matricule || ""}`.toLowerCase().includes(q)).slice(0, 6);
  }, [search, students]);

  const pickStudent = (s: StudentRow) => {
    setForm((f) => ({ ...f, student: s, party: s.name || s.email || "", category: /^Frais/.test(f.category) ? f.category : "Frais d'inscription" }));
    setSearch("");
  };

  const labels: Record<EntryType, string> = { income: "Enregistrer une entrée d'argent", expense: "Enregistrer une dépense", withdrawal: "Enregistrer un retrait", transfer: "Transférer entre deux comptes" };
  const partyLabel = form.type === "income" ? "Reçu de" : form.type === "expense" ? "Payé à (facultatif)" : form.type === "withdrawal" ? "Retiré par (facultatif)" : "Remarque";

  const submit = async () => {
    setError("");
    if (!(Number(form.amount.replace(",", ".")) > 0)) return setError("Entrez un montant supérieur à zéro.");
    if (form.type === "income" && !form.party.trim()) return setError("Indiquez qui a payé.");
    setSaving(true);
    try {
      const payload = {
        type: form.type,
        account: form.account,
        ...(form.type === "transfer" ? { toAccount: form.toAccount } : {}),
        amount: Number(form.amount.replace(",", ".")),
        currency: form.currency,
        date: form.date,
        category: form.category,
        description: form.description,
        party: form.party,
        ...(form.student ? { studentUid: form.student.uid, langCode: form.student.langCode, matricule: form.student.matricule } : {}),
      };
      const result = editing
        ? await api("/api/admin/finance", { method: "PATCH", body: JSON.stringify({ id: editing.id, ...payload }) })
        : await api("/api/admin/finance", { method: "POST", body: JSON.stringify(payload) });
      onSaved(result.line, result.enrollmentMarked ? "L'inscription de l'étudiant est marquée comme payée." : undefined);
    } catch (e: any) {
      setError(e.message || "Erreur");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 flex items-start sm:items-center justify-center overflow-y-auto p-3 sm:p-4" onClick={onClose}>
      <div className="bg-surface border border-line rounded-2xl w-full max-w-xl shadow-2xl my-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-line">
          <h3 className="text-lg font-black text-ink">{editing ? "Modifier l'opération" : labels[form.type]}</h3>
          <button onClick={onClose} aria-label="Fermer" className="w-10 h-10 rounded-lg text-ink-soft hover:text-ink hover:bg-surface-alt inline-flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {form.type === "income" && !editing && (
            <div className="rounded-xl border border-line bg-surface-alt/50 p-3 space-y-2">
              <p className="text-sm font-semibold text-ink">Étudiant inscrit ? Retrouvez-le pour lier le paiement à son dossier</p>
              {form.student ? (
                <div className="flex items-center justify-between gap-3 rounded-lg bg-surface border border-line px-3 py-2">
                  <p className="text-sm text-ink min-w-0">
                    <b>{form.student.name || form.student.email}</b>
                    <span className="text-ink-faint"> · {languageLabel(form.student.langCode)}{form.student.matricule ? ` · ${form.student.matricule}` : ""}</span>
                  </p>
                  <button type="button" onClick={() => set("student", null)} className="text-ink-faint hover:text-red-500 shrink-0" aria-label="Retirer l'étudiant"><X size={16} /></button>
                </div>
              ) : (
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nom, e-mail ou Student ID…" className={`${inputCls} pl-9`} />
                  {matches.length > 0 && (
                    <div className="mt-2 rounded-xl border border-line overflow-hidden bg-surface">
                      {matches.map((s, i) => (
                        <button key={`${s.uid}-${s.langCode}-${i}`} type="button" onClick={() => pickStudent(s)} className="w-full text-left px-3 py-2.5 border-b border-line/60 last:border-0 hover:bg-surface-alt text-sm">
                          <b className="text-ink">{s.name || s.email}</b>
                          <span className="text-ink-faint"> · {languageLabel(s.langCode)}{s.matricule ? ` · ${s.matricule}` : ""}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-ink-faint mt-1.5">Pas encore inscrit sur le site ? Saisissez simplement son nom plus bas.</p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Montant">
              <input inputMode="decimal" value={form.amount} onChange={(e) => set("amount", e.target.value)} placeholder="0" className={inputCls} autoFocus />
            </Field>
            <Field label="Devise">
              <Segmented value={form.currency} options={CURRENCIES.map((c) => ({ id: c, label: c === "USD" ? "Dollars ($)" : "Francs (FC)" }))} onChange={(v) => set("currency", v)} />
            </Field>
          </div>

          {form.type === "transfer" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Depuis le compte">
                <Segmented value={form.account} options={MANUAL_ACCOUNTS.map((a) => ({ id: a.id, label: a.label.split(" (")[0], icon: ACCOUNT_ICON[a.id] }))} onChange={(v) => set("account", v)} />
              </Field>
              <Field label="Vers le compte">
                <Segmented value={form.toAccount} options={MANUAL_ACCOUNTS.map((a) => ({ id: a.id, label: a.label.split(" (")[0], icon: ACCOUNT_ICON[a.id] }))} onChange={(v) => set("toAccount", v)} />
              </Field>
            </div>
          ) : (
            <Field label={form.type === "income" ? "Reçu dans quel compte ?" : "Sorti de quel compte ?"}>
              <Segmented value={form.account} options={MANUAL_ACCOUNTS.map((a) => ({ id: a.id, label: a.label, icon: ACCOUNT_ICON[a.id] }))} onChange={(v) => set("account", v)} />
            </Field>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.type !== "transfer" && (
              <Field label="Catégorie">
                <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
                  {categoriesFor(form.type).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            )}
            <Field label="Date">
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
            </Field>
          </div>

          {form.type !== "transfer" && (
            <Field label={partyLabel}>
              <input value={form.party} onChange={(e) => set("party", e.target.value)} placeholder={form.type === "income" ? "Nom de la personne qui paie" : "Nom"} className={inputCls} />
            </Field>
          )}
          <Field label="Description (facultatif)">
            <input value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Ex. inscription anglais niveau 1, location de sono…" className={inputCls} />
          </Field>

          {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 px-5 py-4 border-t border-line">
          <button onClick={onClose} className={btnGhost}>Annuler</button>
          <button onClick={submit} disabled={saving} className={btnPrimary}>{saving ? "Enregistrement…" : editing ? "Enregistrer les changements" : "Enregistrer"}</button>
        </div>
      </div>
    </div>
  );
}

export default function FinanceTab({ students, languageLabel }: { students: StudentRow[]; languageLabel: (code?: string) => string }) {
  const [lines, setLines] = useState<JournalLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState<Period>("month");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [typeFilter, setTypeFilter] = useState<"all" | EntryType>("all");
  const [accountFilter, setAccountFilter] = useState<"all" | Account>("all");
  const [q, setQ] = useState("");
  const [modal, setModal] = useState<{ type: EntryType; line?: JournalLine } | null>(null);
  const [notice, setNotice] = useState<{ text: string; receipt?: JournalLine } | null>(null);
  const [shown, setShown] = useState(40);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await api("/api/admin/finance");
      setLines(result.lines || []);
    } catch (e: any) {
      setError(e.message || "Impossible de charger les finances.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const [rangeFrom, rangeTo] = periodRange(period, from, to);
  const inPeriod = useMemo(() => lines.filter((l) => l.date >= rangeFrom && l.date <= rangeTo), [lines, rangeFrom, rangeTo]);
  const totals = useMemo(() => periodTotals(inPeriod, currency), [inPeriod, currency]);
  const bal = useMemo(() => balances(lines, currency), [lines, currency]);
  const totalBalance = ACCOUNTS.reduce((sum, a) => sum + bal[a.id], 0);
  const tests = useMemo(() => lines.filter((l) => l.source === "online" && l.test), [lines]);
  const otherCurrency = lines.some((l) => l.currency !== currency && counts(l));

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return inPeriod.filter((l) => {
      if (typeFilter !== "all" && l.type !== typeFilter) return false;
      if (accountFilter !== "all" && l.account !== accountFilter && l.toAccount !== accountFilter) return false;
      if (needle && !`${l.party} ${l.description} ${l.category} ${l.receiptNo || ""} ${l.matricule || ""}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [inPeriod, typeFilter, accountFilter, q]);

  useEffect(() => setShown(40), [period, from, to, typeFilter, accountFilter, q, currency]);

  const saved = (line: JournalLine, note?: string) => {
    setModal(null);
    setNotice({ text: note ? `Opération enregistrée. ${note}` : "Opération enregistrée.", receipt: line.type === "income" && line.receiptNo ? line : undefined });
    load();
  };

  const run = async (url: string, init: RequestInit, okText: string) => {
    try {
      await api(url, init);
      setNotice({ text: okText });
      await load();
    } catch (e: any) {
      alert(`Erreur : ${e.message || e}`);
    }
  };

  const voidLine = (l: JournalLine) => {
    const reason = window.prompt("Pourquoi annuler cette opération ? (elle restera visible mais ne comptera plus)", "");
    if (reason === null) return;
    run("/api/admin/finance", { method: "PATCH", body: JSON.stringify({ id: l.id, action: "void", reason }) }, "Opération annulée.");
  };
  const restoreLine = (l: JournalLine) => run("/api/admin/finance", { method: "PATCH", body: JSON.stringify({ id: l.id, action: "restore" }) }, "Opération rétablie.");
  const deleteLine = (l: JournalLine) => {
    const what = l.source === "online" ? "ce paiement en ligne" : "cette opération";
    if (!window.confirm(`Supprimer définitivement ${what} (${money(l.amount, l.currency)}${l.party ? `, ${l.party}` : ""}) ?\n\nCette action est irréversible. Pour garder une trace, utilisez plutôt « Annuler ».`)) return;
    const url = l.source === "online" ? `/api/admin/finance?payment=${encodeURIComponent(l.id)}&reset=1` : `/api/admin/finance?id=${encodeURIComponent(l.id)}`;
    run(url, { method: "DELETE" }, "Opération supprimée.");
  };
  const deleteTests = () => {
    if (!window.confirm(`Supprimer les ${tests.length} paiement(s) en ligne de test ?\n\nCe sont des paiements simulés (aucun argent reçu). Les inscriptions concernées ne seront plus marquées « payées ». Cette action est irréversible.`)) return;
    run("/api/admin/finance?tests=1&reset=1", { method: "DELETE" }, "Paiements de test supprimés.");
  };

  const exportCsv = () => {
    const blob = new Blob([toCsv(visible)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `finances-bm-${today()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const periodOptions: { id: Period; label: string }[] = [
    { id: "month", label: "Ce mois" },
    { id: "30d", label: "30 jours" },
    { id: "year", label: "Cette année" },
    { id: "all", label: "Tout" },
    { id: "custom", label: "Dates…" },
  ];

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setModal({ type: "income" })} className={btnPrimary}><Plus size={16} /> Paiement reçu</button>
          <button onClick={() => setModal({ type: "expense" })} className={btnGhost}><TrendingDown size={15} /> Dépense</button>
          <button onClick={() => setModal({ type: "withdrawal" })} className={btnGhost}><HandCoins size={15} /> Retrait</button>
          <button onClick={() => setModal({ type: "transfer" })} className={btnGhost}><ArrowRightLeft size={15} /> Transfert</button>
        </div>
        <div className="flex gap-2">
          <Segmented value={currency} options={CURRENCIES.map((c) => ({ id: c, label: c === "USD" ? "$ USD" : "FC CDF" }))} onChange={setCurrency} />
          <button onClick={exportCsv} className={btnGhost} title="Télécharger le journal affiché (Excel)"><Download size={15} /> <span className="hidden sm:inline">Exporter</span></button>
        </div>
      </div>

      {notice && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-600/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
          <span>{notice.text}</span>
          <span className="flex items-center gap-2">
            {notice.receipt && <button onClick={() => openReceipt(notice.receipt!)} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 text-white px-3 min-h-[40px]"><Receipt size={15} /> Imprimer le reçu {notice.receipt.receiptNo}</button>}
            <button onClick={() => setNotice(null)} aria-label="Fermer" className="w-10 h-10 inline-flex items-center justify-center"><X size={16} /></button>
          </span>
        </div>
      )}

      {tests.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-600/30 bg-amber-500/10 px-4 py-3">
          <p className="text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <FlaskConical size={16} className="mt-0.5 shrink-0" />
            <span><b>{tests.length} paiement(s) en ligne de test</b> (simulés, aucun argent reçu) sont exclus des totaux et des soldes.</span>
          </p>
          <button onClick={deleteTests} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold px-3.5 min-h-[44px]"><Trash2 size={15} /> Supprimer les tests</button>
        </div>
      )}

      {/* Balances */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="col-span-2 lg:col-span-1 rounded-2xl border border-red-700/30 bg-gradient-to-br from-red-950/40 to-surface p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-soft flex items-center gap-1.5"><Wallet size={13} /> Solde total</p>
            <p className={`text-2xl font-black mt-1 ${totalBalance < 0 ? "text-red-500" : "text-ink"}`}>{money(totalBalance, currency)}</p>
            <p className="text-xs text-ink-faint mt-1">Tous comptes, depuis le début</p>
          </div>
          {ACCOUNTS.map((a) => {
            const Icon = ACCOUNT_ICON[a.id];
            return (
              <div key={a.id} className="rounded-2xl border border-line bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-soft flex items-center gap-1.5"><Icon size={13} /> {a.label.split(" (")[0]}</p>
                <p className={`text-xl font-black mt-1 ${bal[a.id] < 0 ? "text-red-500" : "text-ink"}`}>{money(bal[a.id], currency)}</p>
                <p className="text-xs text-ink-faint mt-1 truncate">{a.hint}</p>
              </div>
            );
          })}
        </div>
        {otherCurrency && <p className="text-xs text-ink-faint mt-2">Les montants dans l&apos;autre devise sont comptés à part : changez de devise ci-dessus pour les voir.</p>}
      </section>

      {/* Period */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex flex-wrap p-0.5 rounded-xl bg-surface-alt border border-line">
            {periodOptions.map((o) => (
              <button key={o.id} onClick={() => setPeriod(o.id)} className={`text-sm font-bold px-3.5 min-h-[40px] rounded-lg transition ${period === o.id ? "bg-surface text-ink shadow-sm" : "text-ink-soft hover:text-ink"}`}>{o.label}</button>
            ))}
          </div>
          {period === "custom" && (
            <div className="flex items-center gap-2">
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={`${inputBase}`} aria-label="Du" />
              <span className="text-ink-faint text-sm">au</span>
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={`${inputBase}`} aria-label="Au" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-soft flex items-center gap-1.5"><TrendingUp size={13} className="text-emerald-500" /> Entrées</p>
            <p className="text-xl font-black text-emerald-500 mt-1">{money(totals.income, currency)}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-soft flex items-center gap-1.5"><TrendingDown size={13} className="text-red-500" /> Dépenses</p>
            <p className="text-xl font-black text-red-500 mt-1">{money(totals.expense, currency)}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-soft flex items-center gap-1.5"><HandCoins size={13} className="text-amber-500" /> Retraits</p>
            <p className="text-xl font-black text-amber-500 mt-1">{money(totals.withdrawal, currency)}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">Résultat de la période</p>
            <p className={`text-xl font-black mt-1 ${totals.net < 0 ? "text-red-500" : "text-ink"}`}>{money(totals.net, currency)}</p>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="rounded-2xl border border-line bg-surface overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 p-3 border-b border-line bg-surface-alt/40">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher (nom, description, n° de reçu)…" className={`${inputCls} pl-9`} />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)} className={`${inputBase}`} aria-label="Type">
            <option value="all">Tous les types</option>
            {TYPES.map((t) => <option key={t.id} value={t.id}>{t.plural}</option>)}
          </select>
          <select value={accountFilter} onChange={(e) => setAccountFilter(e.target.value as any)} className={`${inputBase}`} aria-label="Compte">
            <option value="all">Tous les comptes</option>
            {ACCOUNTS.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="divide-y divide-line/60">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="p-4 animate-pulse flex justify-between gap-4"><span className="h-4 w-1/2 rounded bg-surface-alt" /><span className="h-4 w-20 rounded bg-surface-alt" /></div>
            ))}
          </div>
        ) : error ? (
          <div className="p-6 text-sm text-red-500 font-semibold">{error} <button onClick={load} className="underline ml-2">Réessayer</button></div>
        ) : visible.length === 0 ? (
          <div className="p-10 text-center text-ink-soft">
            <Wallet size={32} className="mx-auto text-ink-faint mb-3" />
            <p className="font-semibold text-ink">Aucune opération sur cette période</p>
            <p className="text-sm mt-1">Utilisez « Paiement reçu » pour enregistrer un paiement encaissé au bureau, ou « Dépense » pour une sortie d&apos;argent.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line/60">
            {visible.slice(0, shown).map((l) => {
              const Icon = ACCOUNT_ICON[l.account];
              const ignored = l.voided || l.test;
              const sign = l.type === "income" ? "+" : l.type === "transfer" ? "" : "−";
              const color = ignored ? "text-ink-faint" : l.type === "income" ? "text-emerald-500" : l.type === "transfer" ? "text-ink" : "text-red-500";
              return (
                <li key={`${l.source}-${l.id}`} className={`px-4 py-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 ${ignored ? "opacity-60" : ""}`}>
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${l.type === "income" ? "bg-emerald-500/15 text-emerald-500" : l.type === "transfer" ? "bg-sky-500/15 text-sky-500" : l.type === "withdrawal" ? "bg-amber-500/15 text-amber-500" : "bg-red-500/15 text-red-500"}`}>
                    {l.type === "transfer" ? <ArrowRightLeft size={18} /> : <Icon size={18} />}
                  </span>
                  <div className="min-w-0 flex-1 basis-56">
                    <p className={`text-sm font-bold text-ink truncate ${l.voided ? "line-through" : ""}`}>
                      {l.party || l.category}
                      {l.party && <span className="font-medium text-ink-soft"> · {l.category}</span>}
                    </p>
                    <p className="text-xs text-ink-faint truncate">
                      {prettyDate(l.date)} · {l.type === "transfer" ? `${accountLabel(l.account)} → ${accountLabel(l.toAccount)}` : accountLabel(l.account)}
                      {l.description ? ` · ${l.description}` : ""}
                    </p>
                    <p className="flex flex-wrap gap-1.5 mt-1">
                      {l.receiptNo && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-surface-alt border border-line text-ink-soft">{l.receiptNo}</span>}
                      {l.source === "online" && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-500">En ligne</span>}
                      {l.status === "pending" && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500">En attente</span>}
                      {l.test && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500">Test · non compté</span>}
                      {l.voided && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-surface-alt border border-line text-ink-soft">Annulé{l.voidReason ? ` : ${l.voidReason}` : ""}</span>}
                    </p>
                  </div>
                  <p className={`text-base font-black tabular-nums ${color} ${l.voided ? "line-through" : ""}`}>{sign}{money(l.amount, l.currency)}</p>
                  <div className="flex items-center gap-0.5 ml-auto">
                    {l.source === "manual" && l.type === "income" && l.receiptNo && !l.voided && (
                      <button onClick={() => openReceipt(l)} title="Imprimer le reçu" aria-label="Imprimer le reçu" className="w-10 h-10 rounded-lg text-ink-soft hover:text-ink hover:bg-surface-alt inline-flex items-center justify-center"><Receipt size={16} /></button>
                    )}
                    {l.source === "manual" && !l.voided && (
                      <button onClick={() => setModal({ type: l.type, line: l })} title="Modifier" aria-label="Modifier" className="w-10 h-10 rounded-lg text-ink-soft hover:text-ink hover:bg-surface-alt inline-flex items-center justify-center"><Pencil size={16} /></button>
                    )}
                    {l.source === "manual" && (l.voided ? (
                      <button onClick={() => restoreLine(l)} title="Rétablir" aria-label="Rétablir" className="w-10 h-10 rounded-lg text-ink-soft hover:text-ink hover:bg-surface-alt inline-flex items-center justify-center"><Undo2 size={16} /></button>
                    ) : (
                      <button onClick={() => voidLine(l)} title="Annuler (garde une trace)" aria-label="Annuler l'opération" className="w-10 h-10 rounded-lg text-ink-soft hover:text-ink hover:bg-surface-alt inline-flex items-center justify-center"><Ban size={16} /></button>
                    ))}
                    <button onClick={() => deleteLine(l)} title="Supprimer définitivement" aria-label="Supprimer définitivement" className="w-10 h-10 rounded-lg text-ink-faint hover:text-red-500 hover:bg-red-500/10 inline-flex items-center justify-center"><Trash2 size={16} /></button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {visible.length > shown && (
          <button onClick={() => setShown((n) => n + 40)} className="w-full py-3.5 text-sm font-bold text-red-500 hover:bg-surface-alt border-t border-line">Afficher plus ({visible.length - shown} restantes)</button>
        )}
        {!loading && !error && visible.length > 0 && (
          <p className="px-4 py-2.5 text-xs text-ink-faint border-t border-line bg-surface-alt/30">{visible.length} opération(s) · {typeLabel(typeFilter === "all" ? undefined : typeFilter) || "tous types"}</p>
        )}
      </section>

      {modal && (
        <EntryModal initial={modal} students={students} languageLabel={languageLabel} onClose={() => setModal(null)} onSaved={saved} />
      )}
    </div>
  );
}
