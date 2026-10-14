"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { availableLanguages } from "@/content/curriculum";
import { otherPrograms } from "@/content/programs";

interface Assignment {
  langCode: string;
  levels: number[];
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  assignments: Assignment[];
  active?: boolean;
}

// Languages have 3 levels; the other programs (Bureautique…) a single room.
const PROGRAMS: { code: string; label: string; levels: number[] }[] = [
  ...availableLanguages.map((l) => ({ code: l.code, label: l.label, levels: [1, 2, 3] })),
  ...otherPrograms.map((p) => ({ code: p.code, label: p.label, levels: [1] })),
];

const labelOf = (code: string) => PROGRAMS.find((p) => p.code === code)?.label ?? code;

async function authedFetch(url: string, init: RequestInit = {}) {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}`, ...(init.headers || {}) },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Erreur serveur");
  return result;
}

const CATEGORIES: { id: string; label: string; items: typeof PROGRAMS }[] = [
  { id: "languages", label: "Langues", items: PROGRAMS.slice(0, availableLanguages.length) },
  { id: "programs", label: "Formations (Bureautique, Visuel, Logiciels…)", items: PROGRAMS.slice(availableLanguages.length) },
];

/**
 * Which languages/programs and levels the teacher teaches. Besides the
 * per-level checkboxes: "tous les niveaux" per row, "toute la catégorie"
 * per group, and a global select-all / clear.
 */
function AssignmentPicker({ value, onChange }: { value: Assignment[]; onChange: (v: Assignment[]) => void }) {
  const levelsOf = (code: string) => value.find((a) => a.langCode === code)?.levels ?? [];
  const has = (code: string, level: number) => levelsOf(code).includes(level);

  const setLevels = (base: Assignment[], code: string, levels: number[]) => {
    const rest = base.filter((a) => a.langCode !== code);
    return levels.length > 0 ? [...rest, { langCode: code, levels: [...levels].sort() }] : rest;
  };
  const toggle = (code: string, level: number) => {
    const cur = levelsOf(code);
    onChange(setLevels(value, code, cur.includes(level) ? cur.filter((l) => l !== level) : [...cur, level]));
  };
  const rowAll = (p: (typeof PROGRAMS)[number]) => levelsOf(p.code).length === p.levels.length;
  const toggleRow = (p: (typeof PROGRAMS)[number]) => onChange(setLevels(value, p.code, rowAll(p) ? [] : p.levels));

  const groupAll = (items: typeof PROGRAMS) => items.every(rowAll);
  const toggleGroup = (items: typeof PROGRAMS) => {
    let next = value;
    for (const p of items) next = setLevels(next, p.code, groupAll(items) ? [] : p.levels);
    onChange(next);
  };
  const everything = PROGRAMS.every(rowAll);

  const linkBtn = "text-xs font-semibold text-red-500 hover:text-red-400";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-ink-faint">
          {value.reduce((n, a) => n + a.levels.length, 0)} cours sélectionné(s)
        </p>
        <button type="button" onClick={() => onChange(everything ? [] : PROGRAMS.reduce<Assignment[]>((acc, p) => setLevels(acc, p.code, p.levels), []))} className={linkBtn}>
          {everything ? "Tout désélectionner" : "Tout sélectionner"}
        </button>
      </div>
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-ink uppercase tracking-wide">{cat.label}</p>
            <button type="button" onClick={() => toggleGroup(cat.items)} className={linkBtn}>
              {groupAll(cat.items) ? "Désélectionner la catégorie" : "Sélectionner toute la catégorie"}
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {cat.items.map((p) => (
              <div key={p.code} className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border border-line bg-surface-alt">
                <span className="text-sm font-semibold text-ink">{p.label}</span>
                <span className="flex items-center gap-3">
                  {p.levels.length > 1 && (
                    <label className="flex items-center gap-1 text-xs font-semibold text-ink cursor-pointer">
                      <input type="checkbox" checked={rowAll(p)} onChange={() => toggleRow(p)} />
                      Tous
                    </label>
                  )}
                  {p.levels.map((level) => (
                    <label key={level} className="flex items-center gap-1 text-xs text-ink-soft cursor-pointer">
                      <input type="checkbox" checked={has(p.code, level)} onChange={() => toggle(p.code, level)} />
                      {p.levels.length > 1 ? `Niv. ${level}` : "Cours"}
                    </label>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TeachersTab() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAssignments, setEditAssignments] = useState<Assignment[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const load = async () => {
    try {
      const result = await authedFetch("/api/admin/teachers");
      setTeachers((result.teachers || []).sort((a: Teacher, b: Teacher) => a.name.localeCompare(b.name)));
    } catch (error: any) {
      setNotice(`Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    setCreating(true);
    setNotice(null);
    try {
      const result = await authedFetch("/api/admin/teachers", {
        method: "POST",
        body: JSON.stringify({ name, email, assignments }),
      });
      setName("");
      setEmail("");
      setAssignments([]);
      setNotice(
        result.emailSent
          ? `Compte créé. Un e-mail d'invitation a été envoyé à ${email}.`
          : `Compte créé, mais l'e-mail n'a pas pu partir. Transmettez ce lien au professeur (à usage unique) : ${result.inviteLink}`
      );
      load();
    } catch (error: any) {
      setNotice(`Erreur : ${error.message}`);
    } finally {
      setCreating(false);
    }
  };

  const patch = async (id: string, body: object, success?: string) => {
    try {
      const result = await authedFetch(`/api/admin/teachers/${id}`, { method: "PATCH", body: JSON.stringify(body) });
      if (success) {
        setNotice(
          result.inviteLink
            ? `${success} E-mail non envoyé, lien à transmettre : ${result.inviteLink}`
            : success
        );
      }
      load();
    } catch (error: any) {
      setNotice(`Erreur : ${error.message}`);
    }
  };

  const remove = async (t: Teacher) => {
    if (!confirm(`Supprimer définitivement le compte de ${t.name} ? Ses sessions programmées restent, mais il ne pourra plus se connecter.`)) return;
    try {
      await authedFetch(`/api/admin/teachers/${t.id}`, { method: "DELETE" });
      load();
    } catch (error: any) {
      setNotice(`Erreur : ${error.message}`);
    }
  };

  return (
    <div className="space-y-8">
      <p className="text-xs text-ink-soft max-w-2xl">
        Chaque professeur a son propre compte et un tableau de bord limité à ses langues/niveaux : ses classes en
        direct, ses étudiants et leur progression, et l'envoi de messages à ses étudiants. Adresse de connexion :{" "}
        <span className="font-mono text-ink">bmcorporation-cd.com/teacher</span>
      </p>

      {notice && (
        <div className="p-4 rounded-2xl border border-line bg-surface text-sm text-ink break-words flex justify-between gap-4">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-ink-faint hover:text-ink shrink-0">✕</button>
        </div>
      )}

      <div className="bg-surface border border-line rounded-2xl p-6 space-y-4">
        <p className="font-bold text-ink">Créer un compte professeur</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom complet"
            className="bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail (ex. jordimukosa@bmcorporation-cd.com)"
            className="bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
          />
        </div>
        <div>
          <p className="text-xs font-semibold text-ink-soft mb-2">Langues / niveaux enseignés</p>
          <AssignmentPicker value={assignments} onChange={setAssignments} />
        </div>
        <button
          onClick={create}
          disabled={creating || !name.trim() || !email.trim() || assignments.length === 0}
          className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition"
        >
          {creating ? "Création…" : "Créer le compte et envoyer l'invitation"}
        </button>
        <p className="text-xs text-ink-faint">
          Le professeur reçoit un e-mail avec un lien pour choisir son mot de passe. Si l'e-mail professionnel n'existe
          pas encore, utilisez une adresse qu'il consulte déjà.
        </p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
        ) : teachers.length === 0 ? (
          <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Aucun professeur pour le moment.</div>
        ) : (
          teachers.map((t) => (
            <div key={t.id} className={`p-5 rounded-2xl border border-line bg-surface ${t.active === false ? "opacity-60" : ""}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">
                    {t.name} {t.active === false && <span className="text-xs text-red-500 font-semibold">· désactivé</span>}
                  </p>
                  <p className="text-xs text-ink-soft mt-0.5">{t.email}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {(t.assignments || []).map((a) => (
                      <span key={a.langCode} className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-700/30">
                        {labelOf(a.langCode)} · {(PROGRAMS.find((p) => p.code === a.langCode)?.levels.length ?? 1) > 1 ? `Niv. ${a.levels.join(", ")}` : "Cours"}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <button
                    onClick={() => {
                      setEditingId(editingId === t.id ? null : t.id);
                      setEditAssignments(t.assignments || []);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-line text-ink-soft hover:text-ink hover:border-red-600/50"
                  >
                    Modifier ses cours
                  </button>
                  <button
                    onClick={() => patch(t.id, { resendInvite: true }, "Invitation renvoyée.")}
                    className="px-3 py-1.5 rounded-lg border border-line text-ink-soft hover:text-ink hover:border-red-600/50"
                  >
                    Renvoyer l'invitation
                  </button>
                  <button
                    onClick={() => patch(t.id, { active: t.active === false })}
                    className="px-3 py-1.5 rounded-lg border border-line text-ink-soft hover:text-ink hover:border-red-600/50"
                  >
                    {t.active === false ? "Réactiver" : "Désactiver"}
                  </button>
                  <button onClick={() => remove(t)} className="px-3 py-1.5 rounded-lg text-red-500 hover:text-red-400">
                    Supprimer
                  </button>
                </div>
              </div>

              {editingId === t.id && (
                <div className="mt-4 pt-4 border-t border-line space-y-3">
                  <AssignmentPicker value={editAssignments} onChange={setEditAssignments} />
                  <button
                    onClick={async () => {
                      await patch(t.id, { assignments: editAssignments }, "Cours mis à jour.");
                      setEditingId(null);
                    }}
                    disabled={editAssignments.length === 0}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    Enregistrer
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
