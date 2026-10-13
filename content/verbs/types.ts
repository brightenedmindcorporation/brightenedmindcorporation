export interface IrregularVerb {
  base: string;
  forms: string;
  example: string;
  translation: string;
}

export interface RegularVerb {
  base: string;
  stem?: string;
  // Most languages here mark the regular pattern with a suffix (-ed, -é,
  // -ou...). Swahili instead PREFIXES the subject/tense markers onto an
  // unchanging stem — for that case, set `prefix` (highlighted, e.g. "ana")
  // and leave `suffix` empty; the regular table renders prefix+stem or
  // stem+suffix depending on which is present.
  suffix?: string;
  prefix?: string;
  example: string;
  translation: string;
}

export interface StandardVerbReference {
  kind: "standard";
  langCode: string;
  formsLabel: string;
  irregularIntro: string;
  regularIntro: string;
  irregular: IrregularVerb[];
  regular: RegularVerb[];
}

export interface AspectParticle {
  particle: string;
  pinyin: string;
  usage: string;
  example: string;
  translation: string;
}

export interface ChineseVerb {
  hanzi: string;
  pinyin: string;
  meaning: string;
  example: string;
  translation: string;
}

export interface ParticleVerbReference {
  kind: "particles";
  langCode: string;
  intro: string;
  particles: AspectParticle[];
  verbsIntro: string;
  verbs: ChineseVerb[];
}

export type VerbReference = StandardVerbReference | ParticleVerbReference;
