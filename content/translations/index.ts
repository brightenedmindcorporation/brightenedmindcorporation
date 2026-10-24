import enLevel1 from "./english-fr-level1";
import enLevel2 from "./english-fr-level2";
import enLevel3 from "./english-fr-level3";
import enExercises from "./english-fr-exercises";
import esLevel1 from "./spanish-fr-level1";
import esLevel2 from "./spanish-fr-level2";
import esLevel3 from "./spanish-fr-level3";
import ptLevel1 from "./portuguese-fr-level1";
import ptLevel2 from "./portuguese-fr-level2";
import ptLevel3 from "./portuguese-fr-level3";
import swLevel1 from "./swahili-fr-level1";
import swLevel2 from "./swahili-fr-level2";
import swLevel3 from "./swahili-fr-level3";
import zhLevel1 from "./chinese-fr-level1";
import zhLevel2 from "./chinese-fr-level2";
import zhLevel3 from "./chinese-fr-level3";

// French translations shown under the lessons of a language (the voice always reads the language being learned).
// Key: the exact line of the lesson. A language appears here once its lessons are translated.
const DICTIONARIES: Record<string, Record<string, string>> = {
  english: { ...enLevel1, ...enLevel2, ...enLevel3, ...enExercises },
  spanish: { ...esLevel1, ...esLevel2, ...esLevel3 },
  portuguese: { ...ptLevel1, ...ptLevel2, ...ptLevel3 },
  swahili: { ...swLevel1, ...swLevel2, ...swLevel3 },
  chinese: { ...zhLevel1, ...zhLevel2, ...zhLevel3 },
};

/** The French translation of a lesson line, when there is one. */
export function frenchFor(langSlug: string, text: string): string | undefined {
  return DICTIONARIES[langSlug]?.[text.trim()];
}

export const hasFrenchTranslations = (langSlug: string) => langSlug in DICTIONARIES;
