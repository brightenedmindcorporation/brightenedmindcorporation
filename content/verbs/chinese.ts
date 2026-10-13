import type { ParticleVerbReference } from "./types";

// Le mandarin n'a pas de « verbes irréguliers » : les verbes ne se
// conjuguent jamais (ni pour le temps, ni pour la personne). Le temps et
// l'aspect se marquent avec de petites particules ajoutées après le verbe
// — c'est l'équivalent fonctionnel le plus proche d'une fiche de verbes
// pour cette langue.
const chinese: ParticleVerbReference = {
  kind: "particles",
  langCode: "ZH",
  intro:
    "Contrairement aux autres langues de la plateforme, le chinois ne conjugue pas ses verbes. À la place, on ajoute une particule d'aspect après le verbe pour indiquer quand l'action se passe.",
  particles: [
    {
      particle: "了",
      pinyin: "le",
      usage: "Marque une action accomplie ou un changement d'état.",
      example: "我吃了。 (Wǒ chī le.)",
      translation: "manger (accompli) — J'ai mangé.",
    },
    {
      particle: "过",
      pinyin: "guo",
      usage: "Marque une expérience passée — quelque chose déjà fait au moins une fois.",
      example: "我去过中国。 (Wǒ qùguo Zhōngguó.)",
      translation: "aller (expérience vécue) — Je suis déjà allé(e) en Chine.",
    },
    {
      particle: "着",
      pinyin: "zhe",
      usage: "Marque un état ou une action qui continue.",
      example: "她坐着。 (Tā zuòzhe.)",
      translation: "être assis (état continu) — Elle est assise.",
    },
    {
      particle: "在 + verbe",
      pinyin: "zài",
      usage: "Indique une action en train de se dérouler (progressif).",
      example: "他在看书。 (Tā zài kàn shū.)",
      translation: "être en train de lire — Il est en train de lire.",
    },
    {
      particle: "要…了",
      pinyin: "yào…le",
      usage: "Indique qu'une action va bientôt se produire (futur proche).",
      example: "我要走了。 (Wǒ yào zǒu le.)",
      translation: "partir (futur proche) — Je vais bientôt partir.",
    },
    {
      particle: "没(有) + verbe",
      pinyin: "méi(yǒu)",
      usage: "Négation d'une action passée — ne s'utilise jamais avec 了.",
      example: "我没吃。 (Wǒ méi chī.)",
      translation: "ne pas avoir fait — Je n'ai pas mangé.",
    },
  ],
};

export default chinese;
