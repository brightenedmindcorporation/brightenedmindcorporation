import type { CSSProperties, ReactNode } from "react";

export interface CvExperience {
  job: string;
  employer: string;
  period: string;
  tasks: string;
}
export interface CvEducation {
  title: string;
  place: string;
  year: string;
}
export interface CvData {
  name: string;
  title: string;
  birth: string;
  city: string;
  phone: string;
  email: string;
  photo?: string;
  summary: string;
  experiences: CvExperience[];
  education: CvEducation[];
  skills: string[];
  languages: string[];
  qualities: string[];
  references: string;
}

export const CV_TEMPLATES = [
  { id: "classique", label: "Classique", text: "Colonne latérale rouge, lecture claire, idéal pour imprimer." },
  { id: "moderne", label: "Moderne", text: "Grand bandeau de titre, compétences en pastilles." },
  { id: "sobre", label: "Sobre", text: "Une seule colonne, noir et blanc : parfait pour les photocopies." },
  { id: "chaleureux", label: "Chaleureux", text: "Ligne du temps colorée et niveaux de compétences." },
] as const;
export type CvTemplateId = (typeof CV_TEMPLATES)[number]["id"];

/** A4 at 96 dpi: the templates are drawn at this size and scaled by the page that shows them. */
export const CV_PAGE = { width: 794, height: 1123 };

const RED = "#9f1d2c";
const DARK = "#1f2937";
const MUTED = "#6b7280";
const base: CSSProperties = { width: CV_PAGE.width, minHeight: CV_PAGE.height, background: "#fff", color: DARK, fontFamily: "Inter, system-ui, 'Segoe UI', Arial, sans-serif", fontSize: 13, lineHeight: 1.45, boxSizing: "border-box" };

const initials = (n: string) =>
  n
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Photo = ({ cv, size, ring = "#fff", bg = RED }: { cv: CvData; size: number; ring?: string; bg?: string }) =>
  cv.photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={cv.photo} alt="" style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: `4px solid ${ring}` }} />
  ) : (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, color: "#fff", border: `4px solid ${ring}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size / 3, fontWeight: 800 }}>
      {initials(cv.name)}
    </div>
  );

const Block = ({ title, children, color = RED, style }: { title: string; children: ReactNode; color?: string; style?: CSSProperties }) => (
  <section style={{ marginBottom: 18, ...style }}>
    <h3 style={{ margin: "0 0 8px", fontSize: 13, letterSpacing: 1.6, textTransform: "uppercase", color, fontWeight: 800 }}>{title}</h3>
    {children}
  </section>
);

const Tasks = ({ text }: { text: string }) => (
  <ul style={{ margin: "4px 0 0", paddingLeft: 16, color: "#374151" }}>
    {text
      .split(/\n|;/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (
        <li key={t}>{t}</li>
      ))}
  </ul>
);

/* ───────────── 1. Classique ───────────── */
function Classique({ cv }: { cv: CvData }) {
  return (
    <div style={{ ...base, display: "flex" }}>
      <aside style={{ width: 250, background: RED, color: "#fff", padding: "34px 22px", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Photo cv={cv} size={130} bg="#7a1421" />
        </div>
        <SideTitle>Contact</SideTitle>
        <div style={{ fontSize: 12, lineHeight: 1.7 }}>
          <div>📞 {cv.phone}</div>
          {cv.email && <div style={{ wordBreak: "break-all" }}>✉ {cv.email}</div>}
          <div>📍 {cv.city}</div>
          <div>🎂 {cv.birth}</div>
        </div>
        <SideTitle>Compétences</SideTitle>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, lineHeight: 1.7 }}>
          {cv.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <SideTitle>Langues</SideTitle>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, lineHeight: 1.7 }}>
          {cv.languages.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <SideTitle>Qualités</SideTitle>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, lineHeight: 1.7 }}>
          {cv.qualities.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </aside>
      <main style={{ flex: 1, padding: "38px 34px" }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: RED, lineHeight: 1.1 }}>{cv.name}</h1>
        <p style={{ margin: "6px 0 22px", fontSize: 16, color: MUTED, fontWeight: 600 }}>{cv.title}</p>
        <Block title="Profil">
          <p style={{ margin: 0 }}>{cv.summary}</p>
        </Block>
        <Block title="Expérience professionnelle">
          {cv.experiences.map((e) => (
            <div key={e.job + e.period} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <b>{e.job}</b>
                <span style={{ color: MUTED, fontSize: 12 }}>{e.period}</span>
              </div>
              <div style={{ color: MUTED }}>{e.employer}</div>
              <Tasks text={e.tasks} />
            </div>
          ))}
        </Block>
        <Block title="Formation">
          {cv.education.map((e) => (
            <div key={e.title} style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
              <span>
                <b>{e.title}</b> — {e.place}
              </span>
              <span style={{ color: MUTED, fontSize: 12 }}>{e.year}</span>
            </div>
          ))}
        </Block>
        <Block title="Références">
          <p style={{ margin: 0 }}>{cv.references}</p>
        </Block>
      </main>
    </div>
  );
}
const SideTitle = ({ children }: { children: ReactNode }) => (
  <h3 style={{ margin: "20px 0 8px", fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,.45)", paddingBottom: 4 }}>{children}</h3>
);

/* ───────────── 2. Moderne ───────────── */
function Moderne({ cv }: { cv: CvData }) {
  return (
    <div style={base}>
      <header style={{ background: `linear-gradient(120deg, #111827, ${RED})`, color: "#fff", padding: "36px 40px", display: "flex", alignItems: "center", gap: 26 }}>
        <Photo cv={cv} size={116} ring="rgba(255,255,255,.85)" bg="#111827" />
        <div>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, lineHeight: 1.1 }}>{cv.name}</h1>
          <p style={{ margin: "6px 0 10px", fontSize: 17, opacity: 0.92 }}>{cv.title}</p>
          <div style={{ fontSize: 12, opacity: 0.9, display: "flex", flexWrap: "wrap", gap: "4px 18px" }}>
            <span>📞 {cv.phone}</span>
            {cv.email && <span>✉ {cv.email}</span>}
            <span>📍 {cv.city}</span>
            <span>🎂 {cv.birth}</span>
          </div>
        </div>
      </header>
      <div style={{ display: "flex", gap: 30, padding: "28px 40px" }}>
        <main style={{ flex: 1.7 }}>
          <Block title="À propos" color={RED}>
            <p style={{ margin: 0 }}>{cv.summary}</p>
          </Block>
          <Block title="Expérience" color={RED}>
            {cv.experiences.map((e) => (
              <div key={e.job + e.period} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: `3px solid ${RED}` }}>
                <b>{e.job}</b>
                <div style={{ color: MUTED, fontSize: 12 }}>
                  {e.employer} · {e.period}
                </div>
                <Tasks text={e.tasks} />
              </div>
            ))}
          </Block>
          <Block title="Formation" color={RED}>
            {cv.education.map((e) => (
              <div key={e.title} style={{ marginBottom: 6 }}>
                <b>{e.title}</b> <span style={{ color: MUTED }}>— {e.place}, {e.year}</span>
              </div>
            ))}
          </Block>
        </main>
        <aside style={{ flex: 1 }}>
          <Block title="Compétences" color={RED}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cv.skills.map((s) => (
                <span key={s} style={{ background: "#fde8ea", color: RED, borderRadius: 999, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>
                  {s}
                </span>
              ))}
            </div>
          </Block>
          <Block title="Langues" color={RED}>
            {cv.languages.map((s) => (
              <div key={s}>{s}</div>
            ))}
          </Block>
          <Block title="Qualités" color={RED}>
            {cv.qualities.map((s) => (
              <div key={s}>✓ {s}</div>
            ))}
          </Block>
          <Block title="Références" color={RED}>
            <p style={{ margin: 0 }}>{cv.references}</p>
          </Block>
        </aside>
      </div>
    </div>
  );
}

/* ───────────── 3. Sobre ───────────── */
function Sobre({ cv }: { cv: CvData }) {
  const h = (t: string) => (
    <h3 style={{ margin: "0 0 8px", paddingBottom: 3, borderBottom: "1.5px solid #111", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, color: "#111" }}>{t}</h3>
  );
  return (
    <div style={{ ...base, padding: "44px 52px", fontFamily: "Georgia, 'Times New Roman', serif", color: "#111" }}>
      <header style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 34, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>{cv.name}</h1>
        <p style={{ margin: "6px 0 8px", fontSize: 16, fontStyle: "italic" }}>{cv.title}</p>
        <div style={{ fontSize: 12, color: "#333" }}>
          {cv.city} · {cv.phone}
          {cv.email && <> · {cv.email}</>} · Né(e) le {cv.birth}
        </div>
      </header>
      <section style={{ marginBottom: 18 }}>
        {h("Profil")}
        <p style={{ margin: 0 }}>{cv.summary}</p>
      </section>
      <section style={{ marginBottom: 18 }}>
        {h("Expérience professionnelle")}
        {cv.experiences.map((e) => (
          <div key={e.job + e.period} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <b>
                {e.job}, {e.employer}
              </b>
              <span style={{ fontStyle: "italic" }}>{e.period}</span>
            </div>
            <Tasks text={e.tasks} />
          </div>
        ))}
      </section>
      <section style={{ marginBottom: 18 }}>
        {h("Formation")}
        {cv.education.map((e) => (
          <div key={e.title} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span>
              <b>{e.title}</b>, {e.place}
            </span>
            <span style={{ fontStyle: "italic" }}>{e.year}</span>
          </div>
        ))}
      </section>
      <div style={{ display: "flex", gap: 30 }}>
        <section style={{ flex: 1 }}>
          {h("Compétences")}
          <div>{cv.skills.join(" · ")}</div>
        </section>
        <section style={{ flex: 1 }}>
          {h("Langues")}
          <div>{cv.languages.join(" · ")}</div>
        </section>
      </div>
      <section style={{ marginTop: 18 }}>
        {h("Qualités")}
        <div>{cv.qualities.join(" · ")}</div>
      </section>
      <section style={{ marginTop: 18 }}>
        {h("Références")}
        <p style={{ margin: 0 }}>{cv.references}</p>
      </section>
    </div>
  );
}

/* ───────────── 4. Chaleureux ───────────── */
function Chaleureux({ cv }: { cv: CvData }) {
  const accent = "#c2410c";
  const soft = "#fff4ec";
  const levels = [90, 80, 85, 70, 75, 65];
  return (
    <div style={base}>
      <header style={{ background: soft, padding: "34px 40px 26px", display: "flex", alignItems: "center", gap: 24, borderBottom: `5px solid ${accent}` }}>
        <Photo cv={cv} size={120} ring={accent} bg={accent} />
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 33, fontWeight: 800, color: DARK, lineHeight: 1.1 }}>{cv.name}</h1>
          <p style={{ margin: "6px 0 10px", fontSize: 17, color: accent, fontWeight: 700 }}>{cv.title}</p>
          <div style={{ fontSize: 12, color: "#4b5563", display: "flex", flexWrap: "wrap", gap: "3px 16px" }}>
            <span>📞 {cv.phone}</span>
            {cv.email && <span>✉ {cv.email}</span>}
            <span>📍 {cv.city}</span>
            <span>🎂 {cv.birth}</span>
          </div>
        </div>
      </header>
      <div style={{ display: "flex", gap: 28, padding: "26px 40px" }}>
        <main style={{ flex: 1.8 }}>
          <Block title="Qui suis-je ?" color={accent}>
            <p style={{ margin: 0 }}>{cv.summary}</p>
          </Block>
          <Block title="Mon parcours" color={accent}>
            <div style={{ position: "relative", paddingLeft: 20, borderLeft: `2px solid ${accent}55` }}>
              {cv.experiences.map((e) => (
                <div key={e.job + e.period} style={{ position: "relative", marginBottom: 14 }}>
                  <span style={{ position: "absolute", left: -27, top: 3, width: 12, height: 12, borderRadius: "50%", background: accent, border: "3px solid #fff", boxShadow: `0 0 0 2px ${accent}` }} />
                  <b>{e.job}</b> <span style={{ color: MUTED, fontSize: 12 }}>· {e.period}</span>
                  <div style={{ color: accent, fontWeight: 600, fontSize: 12 }}>{e.employer}</div>
                  <Tasks text={e.tasks} />
                </div>
              ))}
            </div>
          </Block>
          <Block title="Formation" color={accent}>
            {cv.education.map((e) => (
              <div key={e.title} style={{ marginBottom: 6 }}>
                <b>{e.title}</b> — {e.place} <span style={{ color: MUTED }}>({e.year})</span>
              </div>
            ))}
          </Block>
        </main>
        <aside style={{ flex: 1 }}>
          <Block title="Mes compétences" color={accent}>
            {cv.skills.map((s, i) => (
              <div key={s} style={{ marginBottom: 9 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{s}</div>
                <div style={{ height: 7, borderRadius: 4, background: "#f3e3d7" }}>
                  <div style={{ width: `${levels[i % levels.length]}%`, height: 7, borderRadius: 4, background: accent }} />
                </div>
              </div>
            ))}
          </Block>
          <Block title="Langues" color={accent}>
            {cv.languages.map((s) => (
              <div key={s}>{s}</div>
            ))}
          </Block>
          <Block title="Qualités" color={accent}>
            {cv.qualities.map((s) => (
              <div key={s}>★ {s}</div>
            ))}
          </Block>
          <Block title="Références" color={accent}>
            <p style={{ margin: 0 }}>{cv.references}</p>
          </Block>
        </aside>
      </div>
    </div>
  );
}

export function CvPage({ cv, template }: { cv: CvData; template: CvTemplateId }) {
  if (template === "moderne") return <Moderne cv={cv} />;
  if (template === "sobre") return <Sobre cv={cv} />;
  if (template === "chaleureux") return <Chaleureux cv={cv} />;
  return <Classique cv={cv} />;
}

export const SAMPLE_CV: CvData = {
  name: "Rose Mbuyi Kalala",
  title: "Cuisinière et aide ménagère",
  birth: "14 mars 1994",
  city: "Lubumbashi, Katuba",
  phone: "+243 99 000 00 00",
  email: "rose.mbuyi@exemple.com",
  summary: "Cuisinière et aide ménagère sérieuse, avec 6 ans d'expérience dans des familles. Je travaille avec soin, propreté et discrétion. J'aime les enfants et je sais organiser une maison.",
  experiences: [
    { job: "Cuisinière et aide ménagère", employer: "Famille Kasongo, Lubumbashi", period: "2021 – 2025", tasks: "Repas quotidiens pour 5 personnes\nEntretien de la maison et du linge\nCourses au marché avec comptes rendus" },
    { job: "Aide ménagère", employer: "Famille Ilunga, Lubumbashi", period: "2018 – 2021", tasks: "Ménage, lessive et repassage\nGarde des enfants après l'école" },
  ],
  education: [
    { title: "Formation du personnel domestique", place: "BM Academia", year: "2025" },
    { title: "Humanités (secondaire)", place: "Institut Maendeleo", year: "2012" },
  ],
  skills: ["Cuisine congolaise et simple", "Hygiène alimentaire", "Entretien de la maison", "Repassage et linge", "Garde d'enfants", "Gestion des courses"],
  languages: ["Français (courant)", "Swahili (langue maternelle)", "Lingala (bon)"],
  qualities: ["Ponctuelle", "Honnête", "Discrète", "Sens du service"],
  references: "Mme Kasongo — +243 99 000 00 01 (employeuse de 2021 à 2025)",
};
