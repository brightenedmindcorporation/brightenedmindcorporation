import type { StandardVerbReference } from "./types";

// Les cours sont expliqués en français sur toute la plateforme — pour ce
// cours de français, la traduction de référence est donc donnée en
// anglais plutôt qu'en français (qui serait une traduction vers la langue
// déjà utilisée dans l'exemple).
const french: StandardVerbReference = {
  kind: "standard",
  langCode: "FR",
  formsLabel: "Participe passé",
  irregularIntro:
    "Ces verbes du 3e groupe ont un participe passé irrégulier, utilisé avec « avoir » ou « être » au passé composé.",
  regularIntro: "Les verbes réguliers du 1er groupe (en « -er ») forment leur participe passé en « -é ».",
  irregular: [
    { base: "être", forms: "été", example: "Elle a été malade.", translation: "to be — She was sick." },
    { base: "avoir", forms: "eu", example: "J'ai eu de la chance.", translation: "to have — I was lucky." },
    { base: "aller", forms: "allé(e)", example: "Il est allé au marché.", translation: "to go — He went to the market." },
    { base: "faire", forms: "fait", example: "Nous avons fait les courses.", translation: "to do/make — We did the shopping." },
    { base: "voir", forms: "vu", example: "Tu as vu ce film ?", translation: "to see — Did you see this movie?" },
    { base: "prendre", forms: "pris", example: "Elle a pris le train.", translation: "to take — She took the train." },
    { base: "écrire", forms: "écrit", example: "J'ai écrit un email.", translation: "to write — I wrote an email." },
    { base: "dire", forms: "dit", example: "Il a dit la vérité.", translation: "to say/tell — He told the truth." },
    { base: "venir", forms: "venu(e)", example: "Ils sont venus hier.", translation: "to come — They came yesterday." },
    { base: "savoir", forms: "su", example: "Je n'ai pas su répondre.", translation: "to know — I didn't know how to answer." },
    { base: "pouvoir", forms: "pu", example: "Elle n'a pas pu venir.", translation: "to be able to — She couldn't come." },
    { base: "vouloir", forms: "voulu", example: "Il a voulu partir tôt.", translation: "to want — He wanted to leave early." },
    { base: "devoir", forms: "dû", example: "J'ai dû travailler tard.", translation: "to have to — I had to work late." },
    { base: "mettre", forms: "mis", example: "Elle a mis sa veste.", translation: "to put — She put on her jacket." },
    { base: "partir", forms: "parti(e)", example: "Nous sommes partis à huit heures.", translation: "to leave — We left at eight o'clock." },
    { base: "sortir", forms: "sorti(e)", example: "Ils sont sortis ce soir.", translation: "to go out — They went out tonight." },
    { base: "tenir", forms: "tenu", example: "Elle a tenu sa promesse.", translation: "to hold/keep — She kept her promise." },
    { base: "connaître", forms: "connu", example: "Je l'ai connu à l'université.", translation: "to know (someone) — I met him at university." },
    { base: "boire", forms: "bu", example: "Il a bu de l'eau.", translation: "to drink — He drank water." },
    { base: "croire", forms: "cru", example: "Je t'ai cru.", translation: "to believe — I believed you." },
    { base: "vivre", forms: "vécu", example: "Elle a vécu à Paris.", translation: "to live — She lived in Paris." },
    { base: "lire", forms: "lu", example: "J'ai lu ce livre.", translation: "to read — I read this book." },
    { base: "ouvrir", forms: "ouvert", example: "Il a ouvert la porte.", translation: "to open — He opened the door." },
    { base: "courir", forms: "couru", example: "Nous avons couru vite.", translation: "to run — We ran fast." },
    { base: "mourir", forms: "mort(e)", example: "Le vieux chat est mort.", translation: "to die — The old cat died." },
    { base: "naître", forms: "né(e)", example: "Elle est née à Kinshasa.", translation: "to be born — She was born in Kinshasa." },
    { base: "rire", forms: "ri", example: "Les enfants ont ri.", translation: "to laugh — The children laughed." },
    { base: "suivre", forms: "suivi", example: "J'ai suivi le cours.", translation: "to follow — I followed the course." },
    { base: "conduire", forms: "conduit", example: "Il a conduit toute la nuit.", translation: "to drive — He drove all night." },
    { base: "recevoir", forms: "reçu", example: "Elle a reçu un cadeau.", translation: "to receive — She received a gift." },
  ],
  regular: [
    { base: "parler", stem: "parl", suffix: "é", example: "Il a parlé à son ami.", translation: "to speak — He spoke to his friend." },
    { base: "jouer", stem: "jou", suffix: "é", example: "Ils ont joué au foot.", translation: "to play — They played soccer." },
    { base: "travailler", stem: "travaill", suffix: "é", example: "Elle a travaillé toute la journée.", translation: "to work — She worked all day." },
    { base: "regarder", stem: "regard", suffix: "é", example: "Nous avons regardé la télé.", translation: "to watch — We watched TV." },
    { base: "manger", stem: "mang", suffix: "é", example: "J'ai mangé une pomme.", translation: "to eat — I ate an apple." },
    { base: "marcher", stem: "march", suffix: "é", example: "Il a marché longtemps.", translation: "to walk — He walked for a long time." },
    { base: "écouter", stem: "écout", suffix: "é", example: "Elle a écouté de la musique.", translation: "to listen — She listened to music." },
    { base: "aider", stem: "aid", suffix: "é", example: "Ils ont aidé leur voisin.", translation: "to help — They helped their neighbor." },
  ],
};

export default french;
