import level1 from "./english-fr-level1";
import level2 from "./english-fr-level2";
import level3 from "./english-fr-level3";
import exercises from "./english-fr-exercises";

// French translations shown under the English lessons (the voice always reads the English).
const ENGLISH_FR: Record<string, string> = { ...level1, ...level2, ...level3, ...exercises };

/** The French translation of an English lesson line, when there is one. Only the English course has them. */
export function frenchFor(langSlug: string, text: string): string | undefined {
  if (langSlug !== "english") return undefined;
  return ENGLISH_FR[text.trim()];
}

export const hasFrenchTranslations = (langSlug: string) => langSlug === "english";
