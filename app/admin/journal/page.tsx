"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

interface Entry {
  id: string;
  recipient: string;
  email: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  readAt: string | null;
  createdAt: string;
}

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "—");

/** Permanent trace of every notification sent by the site, with search and CSV export. */
export default function JournalPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        const ok = user?.email === ADMIN_EMAIL;
        setAllowed(ok);
        if (!ok || !user) return;
        try {
          const response = await fetch("/api/admin/notification-log", { headers: { Authorization: `Bearer ${await user.getIdToken()}` }, cache: "no-store" });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || "Erreur serveur");
          setRows(result.notifications);
          setTotal(result.total);
        } catch (e: any) {
          setError(e.message);
        }
      }),
    []
  );

  const types = useMemo(() => Array.from(new Set(rows.map((r) => r.type).filter(Boolean))).sort(), [rows]);
  const shown = rows.filter((r) => (!type || r.type === type) && (!query || `${r.recipient} ${r.email} ${r.title} ${r.message}`.toLowerCase().includes(query.toLowerCase())));

  const exportCsv = () => {
    const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const lines = [["Date", "Destinataire", "E-mail", "Type", "Titre", "Message", "Lue le"].map(cell).join(";")];
    for (const r of shown) lines.push([fmt(r.createdAt), r.recipient, r.email, r.type, r.title, r.message, r.readAt ? fmt(r.readAt) : r.read ? "lue" : "non lue"].map(cell).join(";"));
    const url = URL.createObjectURL(new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `journal-notifications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  if (allowed === null) return <main className="min-h-screen flex items-center justify-center text-ink-soft">Chargement…</main>;
  if (!allowed)
    return (
      <main className="min-h-screen flex items-center justify-center text-ink-soft p-6 text-center">
        <p>
          Page réservée à l&apos;administration. <Link href="/admin" className="text-red-500 font-bold">Se connecter</Link>
        </p>
      </main>
    );

  return (
    <main className="min-h-screen bg-surface-sunken text-ink p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-5">
        <Link href="/admin" className="text-sm font-bold text-ink-soft hover:text-ink">← Administration</Link>
        <div>
          <h1 className="text-3xl font-black">Journal des notifications</h1>
          <p className="text-sm text-ink-soft mt-1">
            Trace permanente de tout ce que le site a notifié (administration et étudiants). Les notifications ne sont jamais supprimées : elles sont seulement marquées comme lues. {total} enregistrée{total > 1 ? "s" : ""}.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher (nom, e-mail, texte)…" className="flex-1 min-w-[220px] bg-surface border border-line rounded-xl px-3 py-2 text-sm" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="bg-surface border border-line rounded-xl px-3 py-2 text-sm">
            <option value="">Tous les types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button onClick={exportCsv} className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-bold">Exporter en CSV ({shown.length})</button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="border border-line rounded-2xl overflow-x-auto bg-surface">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink-soft bg-surface-alt">
                <th className="p-3">Date</th>
                <th className="p-3">Destinataire</th>
                <th className="p-3">Type</th>
                <th className="p-3">Message</th>
                <th className="p-3">Lue</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id} className="border-t border-line/60 align-top">
                  <td className="p-3 whitespace-nowrap">{fmt(r.createdAt)}</td>
                  <td className="p-3">
                    {r.recipient}
                    {r.email && <span className="block text-xs text-ink-faint">{r.email}</span>}
                  </td>
                  <td className="p-3 text-xs">{r.type}</td>
                  <td className="p-3">
                    <b>{r.title}</b>
                    <span className="block text-ink-soft">{r.message}</span>
                  </td>
                  <td className="p-3 whitespace-nowrap text-xs">{r.read ? (r.readAt ? fmt(r.readAt) : "oui") : "non"}</td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-ink-soft">Aucune notification.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
