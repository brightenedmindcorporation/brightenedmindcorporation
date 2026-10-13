import type { StandardVerbReference } from "./types";

// Le swahili est très régulier : la quasi-totalité des verbes suivent la
// même formule (préfixe sujet + marqueur de temps + radical), donc la
// liste des « exceptions » est volontairement courte — contrairement aux
// listes de 30 verbes irréguliers des cours anglais/français/espagnol/
// portugais, qui reflètent une vraie catégorie grammaticale plus large.
const swahili: StandardVerbReference = {
  kind: "standard",
  langCode: "SW",
  formsLabel: "Forme particulière",
  irregularIntro:
    "Le swahili a très peu de vraies exceptions : « kuwa » (être, sans verbe au présent) et les verbes à radical monosyllabique, qui gardent leur « ku- » même conjugués (contrairement aux verbes réguliers, qui le perdent).",
  regularIntro: "La quasi-totalité des verbes swahili suivent cette formule régulière : préfixe sujet + « -na- » (présent) + radical.",
  irregular: [
    { base: "kuwa", forms: "ni (présent, sans verbe) / alikuwa (passé)", example: "Yeye ni daktari. / Alikuwa daktari jana.", translation: "être — Il/elle est médecin. / Il/elle était médecin hier." },
    { base: "kwenda", forms: "anakwenda (garde « kw- »)", example: "Yeye anakwenda shuleni.", translation: "aller — Il/elle va à l'école." },
    { base: "kula", forms: "anakula (garde « ku- »)", example: "Watoto wanakula chakula.", translation: "manger — Les enfants mangent de la nourriture." },
    { base: "kunywa", forms: "anakunywa (garde « ku- »)", example: "Yeye anakunywa maji.", translation: "boire — Il/elle boit de l'eau." },
    { base: "kuja", forms: "anakuja (garde « ku- »)", example: "Rafiki yangu anakuja kesho.", translation: "venir — Mon ami/mon amie vient demain." },
    { base: "kufa", forms: "alikufa (passé)", example: "Mnyama alikufa jana.", translation: "mourir — L'animal est mort hier." },
  ],
  regular: [
    { base: "kusoma", prefix: "ana", stem: "soma", example: "Yeye anasoma kitabu.", translation: "lire — Il/elle lit un livre." },
    { base: "kuandika", prefix: "ana", stem: "andika", example: "Yeye anaandika barua.", translation: "écrire — Il/elle écrit une lettre." },
    { base: "kucheza", prefix: "ana", stem: "cheza", example: "Watoto wanacheza mpira.", translation: "jouer — Les enfants jouent au ballon." },
    { base: "kuongea", prefix: "ana", stem: "ongea", example: "Yeye anaongea Kiswahili.", translation: "parler — Il/elle parle swahili." },
    { base: "kusaidia", prefix: "ana", stem: "saidia", example: "Yeye anasaidia jirani yake.", translation: "aider — Il/elle aide son voisin." },
    { base: "kutazama", prefix: "ana", stem: "tazama", example: "Wao wanatazama televisheni.", translation: "regarder — Ils regardent la télévision." },
    { base: "kusikiliza", prefix: "ana", stem: "sikiliza", example: "Yeye anasikiliza muziki.", translation: "écouter — Il/elle écoute de la musique." },
    { base: "kununua", prefix: "ana", stem: "nunua", example: "Yeye ananunua gari.", translation: "acheter — Il/elle achète une voiture." },
  ],
};

export default swahili;
