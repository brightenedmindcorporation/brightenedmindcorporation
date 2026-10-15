"use client";

import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";

interface Stats {
  days: number;
  series: { day: string; views: number; visitors: number }[];
  totals: { views: number; visitors: number; visits: number; newVisitors: number; returningVisitors: number };
  today: { views: number; visitors: number };
  last7: { views: number; visitors: number };
  topPages: { name: string; count: number }[];
  sources: { name: string; count: number }[];
  countries: { name: string; count: number }[];
  devices: Record<string, number>;
  hours: Record<string, number>;
}

const PAGE_LABELS: Record<string, string> = {
  "/": "Accueil",
  "/academia": "Academia (accueil)",
  "/communication": "Communication",
  "/domestica": "Domestica",
  "/login": "Connexion",
  "/register": "Inscription",
  "/devis": "Devis",
  "/paiement": "Paiement",
};

const COUNTRY_NAMES: Record<string, string> = { CD: "RD Congo", CG: "Congo-Brazzaville", FR: "France", BE: "Belgique", US: "États-Unis", ZA: "Afrique du Sud", ZM: "Zambie", CA: "Canada", CM: "Cameroun", "??": "Inconnu" };

async function load(days: number): Promise<Stats> {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await fetch(`/api/admin/analytics?days=${days}`, { headers: { Authorization: `Bearer ${idToken}` } });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Erreur serveur");
  return result;
}

function Card({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="p-5 rounded-2xl border border-line bg-surface">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="text-3xl font-black text-ink mt-1">{value}</p>
      {hint && <p className="text-xs text-ink-faint mt-1">{hint}</p>}
    </div>
  );
}

function List({ title, rows, total, label }: { title: string; rows: { name: string; count: number }[]; total: number; label?: (n: string) => string }) {
  return (
    <div className="p-5 rounded-2xl border border-line bg-surface">
      <p className="font-bold text-ink mb-3">{title}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-ink-faint">Pas encore de données.</p>
      ) : (
        <div className="space-y-2.5">
          {rows.map((r) => (
            <div key={r.name}>
              <div className="flex justify-between text-sm">
                <span className="text-ink truncate pr-3">{label ? label(r.name) : r.name}</span>
                <span className="text-ink-soft font-semibold shrink-0">{r.count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-alt overflow-hidden mt-1">
                <div className="h-full bg-red-600" style={{ width: `${total ? Math.max(3, (r.count / total) * 100) : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Concrete suggestions to raise the site's visibility, derived from the numbers. */
function tipsFor(s: Stats): string[] {
  const tips: string[] = [];
  const t = s.totals;
  if (t.views === 0) {
    return ["Le compteur vient d'être activé : les premières visites apparaîtront ici dès aujourd'hui. Revenez dans quelques jours pour voir les tendances."];
  }
  const sourceTotal = s.sources.reduce((a, r) => a + r.count, 0);
  const direct = s.sources.find((r) => r.name === "(direct)")?.count ?? 0;
  if (sourceTotal > 0 && direct / sourceTotal > 0.7) {
    tips.push("La plupart des visites arrivent par lien direct (WhatsApp, bouche-à-oreille). Publiez aussi le lien du site sur Facebook, Instagram et TikTok (dans la bio et sous chaque vidéo) pour toucher de nouvelles personnes.");
  }
  const mobile = s.devices.mobile ?? 0;
  const all = mobile + (s.devices.desktop ?? 0);
  if (all > 0 && mobile / all > 0.7) {
    tips.push(`${Math.round((mobile / all) * 100)} % des visiteurs sont sur téléphone : gardez les pages légères et vérifiez régulièrement le site depuis votre téléphone.`);
  }
  const peak = Object.entries(s.hours).sort((a, b) => b[1] - a[1])[0];
  if (peak) tips.push(`Le pic de visites se situe vers ${peak[0]} h : publiez vos vidéos et statuts WhatsApp juste avant cette heure.`);
  if (t.visitors > 0 && t.newVisitors / t.visitors > 0.8) {
    tips.push("La grande majorité des visiteurs sont nouveaux et peu reviennent : ajoutez un appel clair (« S'inscrire », « Demander un devis ») sur l'accueil, et relancez par la newsletter ou WhatsApp.");
  }
  const reg = s.topPages.find((p) => p.name === "/register")?.count ?? 0;
  const home = s.topPages.find((p) => p.name === "/")?.count ?? 0;
  if (home > 20 && reg / home < 0.05) {
    tips.push("Peu de visiteurs de l'accueil vont jusqu'à l'inscription : mettez le bouton d'inscription plus en évidence et ajoutez des témoignages d'étudiants.");
  }
  tips.push("Créez la fiche Google Business Profile de BM Corporation et ajoutez le site à Google Search Console : c'est gratuit et c'est ce qui fait apparaître l'entreprise sur Google.");
  tips.push("Mettez un code QR du site sur vos affiches, cartes de visite et supports de formation.");
  return tips;
}

export default function VisitsTab() {
  const [days, setDays] = useState(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStats(null);
    setError(null);
    load(days).then(setStats).catch((e) => setError(e.message));
  }, [days]);

  const max = useMemo(() => Math.max(1, ...(stats?.series.map((s) => s.views) ?? [1])), [stats]);

  if (error) return <div className="p-4 rounded-2xl border border-line bg-surface text-red-500">Erreur : {error}</div>;
  if (!stats) return <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>;

  const devTotal = (stats.devices.mobile ?? 0) + (stats.devices.desktop ?? 0);
  const srcTotal = stats.sources.reduce((a, r) => a + r.count, 0);
  const cTotal = stats.countries.reduce((a, r) => a + r.count, 0);
  const pTotal = stats.topPages.reduce((a, r) => a + r.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-soft max-w-2xl">
          Visites du site public. Compteur anonyme : aucun cookie, aucune adresse IP enregistrée. Vos propres visites (depuis ce navigateur) et
          celles des robots ne sont pas comptées.
        </p>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition ${days === d ? "bg-red-600 text-white border-red-600" : "border-line text-ink-soft hover:text-ink"}`}
            >
              {d} jours
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card label="Aujourd'hui" value={stats.today.visitors} hint={`${stats.today.views} pages vues`} />
        <Card label="7 derniers jours" value={stats.last7.visitors} hint={`${stats.last7.views} pages vues`} />
        <Card label={`${days} jours : visiteurs`} value={stats.totals.visitors} hint={`${stats.totals.visits} visites`} />
        <Card
          label="Nouveaux / de retour"
          value={`${stats.totals.newVisitors} / ${stats.totals.returningVisitors}`}
          hint="Visiteurs jamais vus / déjà venus"
        />
      </div>

      <div className="p-5 rounded-2xl border border-line bg-surface">
        <p className="font-bold text-ink mb-4">Pages vues par jour</p>
        <div className="flex items-end gap-1 h-40">
          {stats.series.map((s) => (
            <div key={s.day} className="flex-1 flex flex-col justify-end group relative" title={`${s.day} : ${s.views} pages vues, ${s.visitors} visiteurs`}>
              <div className="bg-red-600/80 group-hover:bg-red-500 rounded-t" style={{ height: `${(s.views / max) * 100}%`, minHeight: s.views ? 3 : 1 }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-ink-faint mt-2">
          <span>{stats.series[0]?.day}</span>
          <span>{stats.series[stats.series.length - 1]?.day}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <List title="Pages les plus visitées" rows={stats.topPages} total={pTotal} label={(n) => PAGE_LABELS[n] ?? n} />
        <List title="D'où viennent les visiteurs" rows={stats.sources} total={srcTotal} label={(n) => (n === "(direct)" ? "Lien direct / WhatsApp / saisie" : n)} />
        <List title="Pays" rows={stats.countries} total={cTotal} label={(n) => COUNTRY_NAMES[n] ?? n} />
        <List
          title="Appareils"
          rows={[
            { name: "mobile", count: stats.devices.mobile ?? 0 },
            { name: "desktop", count: stats.devices.desktop ?? 0 },
          ]}
          total={devTotal}
          label={(n) => (n === "mobile" ? "Téléphone" : "Ordinateur")}
        />
      </div>

      <div className="p-5 rounded-2xl border border-red-700/30 bg-red-500/5">
        <p className="font-bold text-ink mb-3">Suggestions pour améliorer la visibilité du site</p>
        <ul className="space-y-2 text-sm text-ink-soft list-disc ml-5">
          {tipsFor(stats).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
