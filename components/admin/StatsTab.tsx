"use client";

import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";

interface Item {
  id: string;
  type: "ann" | "lesson";
  key: string;
  title: string;
  duration: number;
  lastAt: string | null;
  series: { day: string; views: number; plays: number }[];
  n: Record<string, number>;
  exists?: boolean;
  kind?: string;
}
interface Campaign {
  src: string;
  visits: number;
  visitors: number;
  signups: number;
}
interface Data {
  days: number;
  items: Item[];
  campaigns?: Campaign[];
  announcements?: { id: string; title: string; type: string }[];
}

async function load(endpoint: string, days: number, getToken?: () => Promise<string | undefined>): Promise<Data> {
  const idToken = getToken ? await getToken() : await auth.currentUser?.getIdToken();
  const response = await fetch(`${endpoint}?days=${days}`, { headers: { Authorization: `Bearer ${idToken}` } });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Erreur serveur");
  return result;
}

const v = (it: Item, k: string) => it.n[k] || 0;
const pct = (a: number, b: number) => (b > 0 ? `${Math.round((a / b) * 100)} %` : "—");
const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
const watchLabel = (s: number) => (s < 90 ? `${Math.round(s)} s` : s < 5400 ? `${Math.round(s / 60)} min` : `${(s / 3600).toFixed(1)} h`);

const LANGS: Record<string, string> = { EN: "Anglais", FR: "Français", SW: "Swahili", ES: "Espagnol", PT: "Portugais", ZH: "Chinois", CH: "Chinois" };
function lessonName(it: Item) {
  const [lang, level, n] = it.key.split("-");
  return `${LANGS[lang?.toUpperCase()] ?? lang} · niveau ${level} · leçon ${n}`;
}

function Spark({ series, field }: { series: Item["series"]; field: "views" | "plays" }) {
  const max = Math.max(1, ...series.map((s) => s[field]));
  return (
    <div className="flex items-end gap-px h-6" title="Évolution jour par jour">
      {series.map((s) => (
        <div key={s.day} className="w-1 bg-red-600/70 rounded-sm" style={{ height: `${Math.max(s[field] ? 12 : 3, (s[field] / max) * 100)}%` }} />
      ))}
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-lg font-black text-ink">{title}</h3>
        {hint && <p className="text-xs text-ink-soft mt-0.5 max-w-3xl">{hint}</p>}
      </div>
      <div className="rounded-2xl border border-line bg-surface overflow-x-auto">{children}</div>
    </section>
  );
}

const th = "px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-ink-soft whitespace-nowrap";
const td = "px-3 py-2.5 text-sm text-ink whitespace-nowrap";
const empty = <p className="p-5 text-sm text-ink-faint">Pas encore de données : les chiffres commencent à s&apos;afficher dès les premières visites.</p>;

function ExitBars({ it }: { it: Item }) {
  const bars = Array.from({ length: 10 }, (_, i) => v(it, `x${i}`));
  const total = bars.reduce((a, b) => a + b, 0);
  if (total === 0) return <span className="text-ink-faint text-xs">—</span>;
  const max = Math.max(...bars);
  const worst = bars.indexOf(max);
  return (
    <div>
      <div className="flex items-end gap-0.5 h-7 w-28" title="Où les spectateurs arrêtent la vidéo (par dixième de la durée)">
        {bars.map((b, i) => (
          <div key={i} className={`flex-1 rounded-sm ${i === worst ? "bg-red-500" : "bg-surface-alt"}`} style={{ height: `${Math.max(8, (b / max) * 100)}%` }} />
        ))}
      </div>
      {it.duration > 0 && (
        <p className="text-[11px] text-ink-soft mt-1">
          Départs surtout vers {clock((worst / 10) * it.duration)}–{clock(((worst + 1) / 10) * it.duration)}
        </p>
      )}
    </div>
  );
}

function CampaignLinks({ announcements }: { announcements: { id: string; title: string; type: string }[] }) {
  const [path, setPath] = useState("/");
  const [src, setSrc] = useState("tiktok");
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);
  const source = (custom || src).toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 30);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const link = `${origin}${path}?src=${source || "autre"}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copiez ce lien :", link);
    }
  };
  return (
    <div className="p-5 space-y-3">
      <p className="text-sm text-ink-soft">
        Créez un lien différent pour chaque endroit où vous publiez. Quand quelqu&apos;un clique dessus, vous voyez combien viennent de là, et combien s&apos;inscrivent.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-xs font-bold text-ink-soft">
          Page à ouvrir
          <select value={path} onChange={(e) => setPath(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg bg-surface-alt border border-line text-sm text-ink">
            <option value="/">Accueil du site</option>
            <option value="/register">Inscription</option>
            <option value="/academia">Academia (cours de langues)</option>
            <option value="/communication">Communication</option>
            {announcements.map((a) => (
              <option key={a.id} value={`/annonces/${a.id}`}>
                Annonce : {a.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-bold text-ink-soft">
          Où vous le publiez
          <div className="mt-1 flex gap-2">
            <select
              value={src}
              onChange={(e) => {
                setSrc(e.target.value);
                setCustom("");
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-surface-alt border border-line text-sm text-ink"
            >
              {["tiktok", "whatsapp", "facebook", "instagram", "youtube", "email", "affiche", "carte-visite"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="ou autre…" className="flex-1 px-3 py-2 rounded-lg bg-surface-alt border border-line text-sm text-ink" />
          </div>
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <code className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-surface-alt border border-line text-xs text-ink break-all">{link}</code>
        <button onClick={copy} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-bold">
          {copied ? "Copié ✓" : "Copier le lien"}
        </button>
      </div>
    </div>
  );
}

/** Announcement / video / lesson / campaign statistics. `scope="teacher"` shows lessons and videos only. */
export default function StatsTab({ scope = "admin", getToken }: { scope?: "admin" | "teacher"; getToken?: () => Promise<string | undefined> }) {
  const endpoint = scope === "admin" ? "/api/admin/content-stats" : "/api/teacher/content-stats";
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(null);
    setError(null);
    load(endpoint, days, getToken).then(setData).catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, days]);

  const announcements = useMemo(() => (data?.items ?? []).filter((i) => i.type === "ann"), [data]);
  const lessons = useMemo(() => (data?.items ?? []).filter((i) => i.type === "lesson"), [data]);
  const videos = useMemo(() => (data?.items ?? []).filter((i) => v(i, "plays") > 0).sort((a, b) => v(b, "plays") - v(a, "plays")), [data]);
  // Announcements with no activity yet still get a line.
  const seen = new Set(announcements.map((a) => a.key));
  const silent = (data?.announcements ?? []).filter((a) => !seen.has(a.id));

  if (error) return <div className="p-4 rounded-2xl border border-line bg-surface text-red-500">Erreur : {error}</div>;
  if (!data) return <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-soft max-w-2xl">
          Statistiques anonymes (aucun cookie, aucune adresse IP). Une personne compte une fois par jour pour une même annonce ou vidéo ; vos propres visites et celles
          des robots ne sont pas comptées. Les chiffres démarrent à la mise en service.
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

      {scope === "admin" && (
        <Section
          title="📣 Annonces"
          hint="« Vues » = affichée dans le bandeau de l'accueil. « Clics » = la personne a ouvert l'annonce. Pour une offre d'emploi : « Formulaire » = elle a ouvert le formulaire, « Candidatures » = elle l'a envoyé."
        >
          {announcements.length === 0 && silent.length === 0 ? (
            empty
          ) : (
            <table className="w-full">
              <thead className="border-b border-line">
                <tr>
                  <th className={th}>Annonce</th>
                  <th className={th}>Vues</th>
                  <th className={th}>Personnes</th>
                  <th className={th}>Clics</th>
                  <th className={th}>Taux de clic</th>
                  <th className={th}>Page ouverte</th>
                  <th className={th}>Formulaire</th>
                  <th className={th}>Candidatures</th>
                  <th className={th}>Vidéo lue</th>
                  <th className={th}>Jour par jour</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[...announcements]
                  .sort((a, b) => v(b, "views") - v(a, "views"))
                  .map((a) => {
                    const clicks = v(a, "click_detail") + v(a, "click_apply");
                    return (
                      <tr key={a.id}>
                        <td className={`${td} max-w-[260px] truncate`} title={a.title}>
                          {a.title || a.key}
                          {a.exists === false && <span className="ml-2 text-[10px] text-ink-faint">(supprimée)</span>}
                        </td>
                        <td className={`${td} font-bold`}>{v(a, "views")}</td>
                        <td className={td}>{v(a, "uViews")}</td>
                        <td className={td}>{clicks}</td>
                        <td className={td}>{pct(clicks, v(a, "views"))}</td>
                        <td className={td}>{v(a, "pageViews")}</td>
                        <td className={td}>{v(a, "click_apply_page") || "—"}</td>
                        <td className={td}>{v(a, "click_register") || "—"}</td>
                        <td className={td}>{v(a, "plays") || "—"}</td>
                        <td className={td}>
                          <Spark series={a.series} field="views" />
                        </td>
                      </tr>
                    );
                  })}
                {silent.map((a) => (
                  <tr key={a.id} className="text-ink-faint">
                    <td className={`${td} max-w-[260px] truncate`}>{a.title}</td>
                    <td className={td} colSpan={9}>
                      Aucune vue sur la période
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>
      )}

      <Section
        title="▶️ Vidéos"
        hint="« Lectures » = nombre de fois où une personne a appuyé sur lecture. Le graphique montre à quel moment les spectateurs arrêtent : la barre rouge est le moment où le plus de gens partent."
      >
        {videos.length === 0 ? (
          empty
        ) : (
          <table className="w-full">
            <thead className="border-b border-line">
              <tr>
                <th className={th}>Vidéo</th>
                <th className={th}>Lectures</th>
                <th className={th}>Temps regardé</th>
                <th className={th}>Moyenne / lecture</th>
                <th className={th}>% regardé</th>
                <th className={th}>25 %</th>
                <th className={th}>50 %</th>
                <th className={th}>75 %</th>
                <th className={th}>Jusqu&apos;au bout</th>
                <th className={th}>Où ils arrêtent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {videos.map((it) => {
                const plays = v(it, "uPlays") || v(it, "plays");
                const avg = plays ? v(it, "watch") / plays : 0;
                return (
                  <tr key={it.id}>
                    <td className={`${td} max-w-[260px] truncate`} title={it.title}>
                      {it.type === "lesson" ? lessonName(it) : `Annonce : ${it.title || it.key}`}
                    </td>
                    <td className={`${td} font-bold`}>
                      {v(it, "plays")}
                      <span className="text-ink-faint font-normal"> ({v(it, "uPlays")} pers.)</span>
                    </td>
                    <td className={td}>{watchLabel(v(it, "watch"))}</td>
                    <td className={td}>{avg ? watchLabel(avg) : "—"}</td>
                    <td className={td}>{it.duration > 0 && avg ? pct(avg, it.duration) : "—"}</td>
                    <td className={td}>{pct(v(it, "m25"), plays)}</td>
                    <td className={td}>{pct(v(it, "m50"), plays)}</td>
                    <td className={td}>{pct(v(it, "m75"), plays)}</td>
                    <td className={`${td} font-bold`}>{pct(v(it, "m100"), plays)}</td>
                    <td className={td}>
                      <ExitBars it={it} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Section>

      <Section
        title="🎓 Parcours par leçon"
        hint="Pour chaque leçon : combien d'étudiants l'ouvrent, combien lancent la vidéo, passent le quiz, puis le réussissent. Une grosse baisse entre deux colonnes montre où les étudiants décrochent."
      >
        {lessons.length === 0 ? (
          empty
        ) : (
          <table className="w-full">
            <thead className="border-b border-line">
              <tr>
                <th className={th}>Leçon</th>
                <th className={th}>Ouverte</th>
                <th className={th}>Vidéo lancée</th>
                <th className={th}>Quiz passé</th>
                <th className={th}>Quiz réussi</th>
                <th className={th}>Réussite</th>
                <th className={th}>Où ça coince</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[...lessons]
                .sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }))
                .map((it) => {
                  const opens = v(it, "opens");
                  const steps = [opens, v(it, "uPlays"), v(it, "quizTaken"), v(it, "quizPassed")];
                  const drop = steps.slice(1).map((s, i) => (steps[i] > 0 ? 1 - s / steps[i] : 0));
                  const worst = drop.indexOf(Math.max(...drop));
                  const names = ["Vidéo peu lancée", "Peu passent le quiz", "Beaucoup échouent au quiz"];
                  return (
                    <tr key={it.id}>
                      <td className={td}>
                        {lessonName(it)}
                        {it.title && <span className="block text-[11px] text-ink-faint">{it.title}</span>}
                      </td>
                      <td className={`${td} font-bold`}>{opens}</td>
                      <td className={td}>{v(it, "uPlays")}</td>
                      <td className={td}>{v(it, "quizTaken")}</td>
                      <td className={td}>{v(it, "quizPassed")}</td>
                      <td className={td}>{pct(v(it, "quizPassed"), v(it, "quizTaken"))}</td>
                      <td className={`${td} text-xs text-ink-soft`}>{opens >= 3 && drop[worst] >= 0.4 ? `⚠️ ${names[worst]} (−${Math.round(drop[worst] * 100)} %)` : "—"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </Section>

      {scope === "admin" && (
        <Section title="🔗 Liens de campagne" hint="Quel réseau vous amène des visiteurs et des inscriptions ? Utilisez un lien différent par endroit.">
          <CampaignLinks announcements={data.announcements ?? []} />
          <div className="border-t border-line">
            {(data.campaigns ?? []).length === 0 ? (
              empty
            ) : (
              <table className="w-full">
                <thead className="border-b border-line">
                  <tr>
                    <th className={th}>Source</th>
                    <th className={th}>Visites</th>
                    <th className={th}>Personnes</th>
                    <th className={th}>Inscriptions</th>
                    <th className={th}>Visite → inscription</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {(data.campaigns ?? []).map((c) => {
                    const direct = c.src === "(direct)";
                    return (
                      <tr key={c.src}>
                        <td className={`${td} font-bold`}>{direct ? "Sans lien de campagne" : c.src}</td>
                        <td className={td}>{direct ? "—" : c.visits}</td>
                        <td className={td}>{direct ? "—" : c.visitors}</td>
                        <td className={`${td} font-bold`}>{c.signups}</td>
                        <td className={td}>{direct ? "—" : pct(c.signups, c.visitors)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </Section>
      )}
    </div>
  );
}
