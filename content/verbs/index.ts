import type { VerbReference } from "./types";
import english from "./english";
import french from "./french";
import spanish from "./spanish";
import portuguese from "./portuguese";
import swahili from "./swahili";
import chinese from "./chinese";

const BY_LANG: Record<string, VerbReference> = {
  EN: english,
  FR: french,
  ES: spanish,
  PT: portuguese,
  SW: swahili,
  ZH: chinese,
};

export function getVerbReference(langCode: string): VerbReference | null {
  return BY_LANG[langCode] ?? null;
}

export type { VerbReference, StandardVerbReference, ParticleVerbReference, IrregularVerb, RegularVerb, AspectParticle, ChineseVerb } from "./types";
