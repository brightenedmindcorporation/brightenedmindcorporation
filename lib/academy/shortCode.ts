/** The short code used in Student IDs and certificate numbers (BMCA-EN-2026-004, BMCA-BU-L1-2026-…, BMCA-LG-2026-001, BMCA-VA-2026-001). */
const SHORT: Record<string, string> = { BUREAUTIQUE: "BU", LOGICIELS: "LG", VISUEL: "VA" };

export const shortCode = (langCode: string) => SHORT[langCode] ?? langCode;
