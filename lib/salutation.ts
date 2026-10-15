/** "M" = Monsieur, "F" = Madame; anything else is unknown. */
export type Gender = "M" | "F";

export function normalizeGender(value: unknown): Gender | undefined {
  return value === "M" || value === "F" ? value : undefined;
}

/** "Monsieur" / "Madame" for a known gender, otherwise "". */
export function civility(gender?: unknown): string {
  const g = normalizeGender(gender);
  return g === "M" ? "Monsieur" : g === "F" ? "Madame" : "";
}

/**
 * The opening of a message: "Bonjour Monsieur Jean Dupont," / "Bonjour Madame
 * Marie Dupont,", or just "Bonjour Jean Dupont," when the gender is unknown.
 */
export function greeting(name: string | undefined | null, gender?: unknown, hello = "Bonjour"): string {
  const c = civility(gender);
  const n = (name || "").trim();
  return `${hello}${c ? ` ${c}` : ""}${n ? ` ${n}` : ""},`;
}
