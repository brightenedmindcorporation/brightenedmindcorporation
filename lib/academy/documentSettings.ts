/** Editable wording/branding of the PDF documents (certificate, verb
 * sheets…). Stored in Firestore `config/documents`, edited from the admin
 * "Certificats" tab; the defaults below are what the site shipped with. */

export interface Signatory {
  name: string;
  role: string;
}

export interface DocumentSettings {
  companyName: string;
  department: string;
  certificateTitle: string;
  presentedToText: string;
  completionText: string;
  averageLabel: string;
  issuedLabel: string;
  /** Label before the certificate's own number (CERT-EN-2026-0007). */
  certificateNumberLabel: string;
  /** Label before the student's enrolment ID (BMCA-EN-2026-004). */
  studentIdLabel: string;
  signatory1: Signatory;
  signatory2: Signatory;
}

export const DEFAULT_DOCUMENT_SETTINGS: DocumentSettings = {
  companyName: "Brightened Mind Corporation",
  department: "Département Academia",
  certificateTitle: "CERTIFICATE OF ACHIEVEMENT",
  presentedToText: "This certificate is proudly presented to",
  completionText: "for successfully completing",
  averageLabel: "Final Average",
  issuedLabel: "Issued on",
  certificateNumberLabel: "Certificate Number",
  studentIdLabel: "Student ID",
  signatory1: { name: "Jordi MUKOSA", role: "Director" },
  signatory2: { name: "Jacques RACIAL", role: "Academic Supervisor" },
};

const MAX_LEN = 120;

/** Merges untrusted input over the defaults, keeping only known string fields. */
export function sanitizeDocumentSettings(input: any): DocumentSettings {
  const str = (v: unknown, fallback: string) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, MAX_LEN) : fallback;
  const d = DEFAULT_DOCUMENT_SETTINGS;
  const sig = (v: any, fallback: Signatory): Signatory => ({
    name: str(v?.name, fallback.name),
    role: str(v?.role, fallback.role),
  });
  return {
    companyName: str(input?.companyName, d.companyName),
    department: str(input?.department, d.department),
    certificateTitle: str(input?.certificateTitle, d.certificateTitle),
    presentedToText: str(input?.presentedToText, d.presentedToText),
    completionText: str(input?.completionText, d.completionText),
    averageLabel: str(input?.averageLabel, d.averageLabel),
    issuedLabel: str(input?.issuedLabel, d.issuedLabel),
    certificateNumberLabel: str(input?.certificateNumberLabel, d.certificateNumberLabel),
    studentIdLabel: str(input?.studentIdLabel, d.studentIdLabel),
    signatory1: sig(input?.signatory1, d.signatory1),
    signatory2: sig(input?.signatory2, d.signatory2),
  };
}

let cached: DocumentSettings = DEFAULT_DOCUMENT_SETTINGS;

/** Settings last loaded in this browser tab (defaults until the first load). */
export function getCachedDocumentSettings(): DocumentSettings {
  return cached;
}

/** Fetches the live settings (browser only) and remembers them for the PDF
 * builders. Never throws: on any failure the defaults are used, so a PDF can
 * always be produced. */
export async function loadDocumentSettings(): Promise<DocumentSettings> {
  try {
    const response = await fetch("/api/document-settings", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      cached = sanitizeDocumentSettings(data.settings);
    }
  } catch {
    // keep whatever was cached / the defaults
  }
  return cached;
}
