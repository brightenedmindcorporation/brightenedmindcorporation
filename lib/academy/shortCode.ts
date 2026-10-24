/** The short code used in Student IDs and certificate numbers (BMCA-EN-2026-004, BMCA-BU-L1-2026-…). */
const SHORT: Record<string, string> = { BUREAUTIQUE: "BU" };

export const shortCode = (langCode: string) => SHORT[langCode] ?? langCode;
