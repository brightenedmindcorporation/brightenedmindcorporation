import type { CSSProperties } from "react";

export interface CvExperience {
  job: string;
  employer: string;
  period: string;
  tasks: string;
}
export interface CvStudy {
  level: string;
  school: string;
  option: string;
  year: string;
  /** The title obtained: certificat, diplôme, attestation… */
  diploma: string;
  /** Name of the attached proof (the file itself is kept apart from the CV data). */
  proofName?: string;
}
export interface CvReference {
  name: string;
  relation: string;
  phone: string;
}
export interface CvData {
  lastName: string;
  middleName: string;
  firstName: string;
  gender: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  origin: string;
  civilStatus: string;
  children: string;
  father: string;
  mother: string;
  street: string;
  quarter: string;
  commune: string;
  city: string;
  country: string;
  phone: string;
  phone2: string;
  email: string;
  title: string;
  summary: string;
  photo?: string;
  studies: CvStudy[];
  experiences: CvExperience[];
  skills: string[];
  languages: string[];
  qualities: string[];
  references: CvReference[];
  /** Names of the documents attached to the application, by category. */
  attachments: { category: string; names: string[] }[];
}

export const EMPTY_CV: CvData = {
  lastName: "",
  middleName: "",
  firstName: "",
  gender: "",
  birthDate: "",
  birthPlace: "",
  nationality: "Congolaise",
  origin: "",
  civilStatus: "",
  children: "",
  father: "",
  mother: "",
  street: "",
  quarter: "",
  commune: "",
  city: "",
  country: "RD Congo",
  phone: "",
  phone2: "",
  email: "",
  title: "",
  summary: "",
  studies: [],
  experiences: [],
  skills: [],
  languages: [],
  qualities: [],
  references: [],
  attachments: [],
};

export const SAMPLE_CV: CvData = {
  lastName: "MBUYI",
  middleName: "KALALA",
  firstName: "Rose",
  gender: "Féminin",
  birthDate: "14 mars 1994",
  birthPlace: "Lubumbashi",
  nationality: "Congolaise",
  origin: "Haut-Katanga",
  civilStatus: "Célibataire",
  children: "1",
  father: "Mbuyi Jean",
  mother: "Kalala Marie",
  street: "Avenue Kasai n° 12",
  quarter: "Q/ Bel-Air",
  commune: "C/ Katuba",
  city: "Lubumbashi",
  country: "RD Congo",
  phone: "+243 99 000 00 00",
  phone2: "+243 81 000 00 00",
  email: "rose.mbuyi@exemple.com",
  title: "Cuisinière et aide ménagère",
  summary: "Cuisinière et aide ménagère sérieuse, avec 6 ans d'expérience dans des familles. Je travaille avec soin, propreté et discrétion. J'aime les enfants et je sais organiser une maison.",
  studies: [
    { level: "Formation professionnelle", school: "BM Academia", option: "Personnel domestique", year: "2025", diploma: "Certificat de formation", proofName: "certificat-bm-academia.pdf" },
    { level: "Secondaire (Humanités)", school: "Institut Maendeleo", option: "Pédagogie générale", year: "2012", diploma: "Diplôme d'État", proofName: "diplome-etat.jpg" },
    { level: "Primaire", school: "EP Umoja", option: "", year: "2006", diploma: "Certificat de fin d'études primaires (CEP)" },
  ],
  experiences: [
    { job: "Cuisinière et aide ménagère", employer: "Famille Kasongo, Lubumbashi", period: "2021 – 2025", tasks: "Repas quotidiens pour 5 personnes\nEntretien de la maison et du linge\nCourses au marché avec comptes rendus" },
    { job: "Aide ménagère", employer: "Famille Ilunga, Lubumbashi", period: "2018 – 2021", tasks: "Ménage, lessive et repassage\nGarde des enfants après l'école" },
  ],
  skills: ["Cuisine congolaise et simple", "Hygiène alimentaire", "Entretien de la maison", "Repassage et linge", "Garde d'enfants", "Gestion des courses"],
  languages: ["Français (courant)", "Swahili (langue maternelle)", "Lingala (bon)"],
  qualities: ["Ponctuelle", "Honnête", "Discrète", "Sens du service"],
  references: [{ name: "Mme Kasongo", relation: "Employeuse de 2021 à 2025", phone: "+243 99 000 00 01" }],
  attachments: [
    { category: "Carte d'électeur / pièce d'identité", names: ["carte-electeur.jpg"] },
    { category: "Attestation de service", names: ["attestation-kasongo.pdf"] },
  ],
};

export const fullName = (cv: CvData) => [cv.lastName.toUpperCase(), cv.middleName.toUpperCase(), cv.firstName].filter(Boolean).join(" ");
export const addressLine = (cv: CvData) => [cv.street, cv.quarter, cv.commune, cv.city, cv.country].filter(Boolean).join(", ");

/** A4 at 96 dpi. */
export const CV_PAGE = { width: 794, height: 1123 };

const INK = "#111";
const serif = "Georgia, 'Times New Roman', serif";

const Title = ({ children }: { children: string }) => (
  <h3 style={{ margin: "0 0 7px", paddingBottom: 3, borderBottom: "1.5px solid #111", fontSize: 12.5, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: INK }}>{children}</h3>
);
const Section = ({ title, children, style }: { title: string; children: React.ReactNode; style?: CSSProperties }) => (
  <section style={{ marginBottom: 16, ...style }}>
    <Title>{title}</Title>
    {children}
  </section>
);
const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div style={{ display: "flex", gap: 6 }}>
      <span style={{ width: 130, flexShrink: 0, fontWeight: 700 }}>{label}</span>
      <span>: {value}</span>
    </div>
  ) : null;

const Tasks = ({ text }: { text: string }) => (
  <ul style={{ margin: "3px 0 0", paddingLeft: 18 }}>
    {text
      .split(/\n|;/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (
        <li key={t}>{t}</li>
      ))}
  </ul>
);

/** The CV (black and white, one column): the model chosen for BM Domestica. */
export function CvSobre({ cv }: { cv: CvData }) {
  const attachments = cv.attachments.filter((a) => a.names.length);
  return (
    <div style={{ width: CV_PAGE.width, minHeight: CV_PAGE.height, boxSizing: "border-box", background: "#fff", color: INK, fontFamily: serif, fontSize: 13, lineHeight: 1.42, padding: "40px 50px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-start", marginBottom: 18, paddingBottom: 14, borderBottom: "3px double #111" }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, lineHeight: 1.15 }}>{fullName(cv) || "Nom et prénom"}</h1>
          <p style={{ margin: "6px 0 8px", fontSize: 16, fontStyle: "italic" }}>{cv.title || "Poste recherché"}</p>
          <div style={{ fontSize: 12 }}>
            {addressLine(cv) && <div>{addressLine(cv)}</div>}
            <div>
              {[cv.phone, cv.phone2].filter(Boolean).join(" / ")}
              {cv.email && <> · {cv.email}</>}
            </div>
          </div>
        </div>
        {cv.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cv.photo} alt="" style={{ width: 96, height: 120, objectFit: "cover", border: "1.5px solid #111" }} />
        ) : (
          <div style={{ width: 96, height: 120, border: "1.5px dashed #777", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#777", textAlign: "center" }}>Photo</div>
        )}
      </header>

      <Section title="Identité">
        <div style={{ fontSize: 12.5 }}>
          <Row label="Nom complet" value={fullName(cv)} />
          <Row label="Sexe" value={cv.gender} />
          <Row label="Né(e) le" value={[cv.birthDate, cv.birthPlace && `à ${cv.birthPlace}`].filter(Boolean).join(" ")} />
          <Row label="Nationalité" value={cv.nationality} />
          <Row label="Province d'origine" value={cv.origin} />
          <Row label="État civil" value={[cv.civilStatus, cv.children && `${cv.children} enfant(s)`].filter(Boolean).join(", ")} />
          <Row label="Fils / fille de" value={[cv.father, cv.mother && `et de ${cv.mother}`].filter(Boolean).join(" ")} />
          <Row label="Adresse" value={addressLine(cv)} />
        </div>
      </Section>

      {cv.summary && (
        <Section title="Profil">
          <p style={{ margin: 0 }}>{cv.summary}</p>
        </Section>
      )}

      {cv.experiences.length > 0 && (
        <Section title="Expérience professionnelle">
          {cv.experiences.map((e, i) => (
            <div key={i} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <b>{[e.job, e.employer].filter(Boolean).join(", ")}</b>
                <span style={{ fontStyle: "italic", whiteSpace: "nowrap" }}>{e.period}</span>
              </div>
              {e.tasks && <Tasks text={e.tasks} />}
            </div>
          ))}
        </Section>
      )}

      {cv.studies.length > 0 && (
        <Section title="Études faites">
          {cv.studies.map((s, i) => (
            <div key={i} style={{ marginBottom: 7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <span>
                  <b>{s.level}</b>
                  {s.school && <>, {s.school}</>}
                  {s.option && <> — option {s.option}</>}
                </span>
                <span style={{ fontStyle: "italic" }}>{s.year}</span>
              </div>
              {s.diploma && (
                <div style={{ fontSize: 12.5 }}>
                  Pièce obtenue : <b>{s.diploma}</b>
                  {s.proofName && <span style={{ fontStyle: "italic" }}> (copie jointe)</span>}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {(cv.skills.length > 0 || cv.languages.length > 0) && (
        <div style={{ display: "flex", gap: 28 }}>
          {cv.skills.length > 0 && (
            <Section title="Compétences" style={{ flex: 1.4 }}>
              <div>{cv.skills.join(" · ")}</div>
            </Section>
          )}
          {cv.languages.length > 0 && (
            <Section title="Langues" style={{ flex: 1 }}>
              <div>{cv.languages.join(" · ")}</div>
            </Section>
          )}
        </div>
      )}

      {cv.qualities.length > 0 && (
        <Section title="Qualités">
          <div>{cv.qualities.join(" · ")}</div>
        </Section>
      )}

      {cv.references.length > 0 && (
        <Section title="Références">
          {cv.references.map((r, i) => (
            <div key={i}>
              <b>{r.name}</b>
              {r.relation && <> — {r.relation}</>}
              {r.phone && <> — {r.phone}</>}
            </div>
          ))}
        </Section>
      )}

      {attachments.length > 0 && (
        <Section title="Pièces jointes">
          {attachments.map((a) => (
            <div key={a.category}>
              <b>{a.category}</b> : {a.names.join(", ")}
            </div>
          ))}
        </Section>
      )}

      <p style={{ margin: "18px 0 0", fontSize: 12, fontStyle: "italic" }}>Je certifie que les renseignements ci-dessus sont exacts.</p>
    </div>
  );
}
