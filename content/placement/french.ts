import type { PlacementContent } from "./types";

const content: PlacementContent = {
  levels: {
    1: [
      ["Je ___ étudiant.", "suis", "es", "est"],
      ["Elle ___ deux frères.", "a", "as", "ont"],
      ["Quel jour vient après lundi ?", "Mardi", "Dimanche", "Mercredi"],
      ["Choisissez la phrase correcte.", "Nous habitons à Kolwezi.", "Nous habite à Kolwezi.", "Nous habitez à Kolwezi."],
      ["___ est ton nom ?", "Quel", "Quelle", "Quels"],
      ["Je mange ___ pain.", "du", "de la", "des"],
    ],
    2: [
      ["Hier, nous ___ au marché.", "sommes allés", "allons", "irons"],
      ["Elle est plus grande ___ moi.", "que", "de", "comme"],
      ["Quand il est arrivé, je ___ le repas.", "préparais", "prépare", "préparerai"],
      ["J'ai acheté des pommes et j'___ ai mangé deux.", "en", "y", "les"],
      ["Il faut que tu ___ à l'heure.", "sois", "es", "seras"],
      ["Je lui ___ un message hier.", "ai envoyé", "envoie", "enverrai"],
    ],
    3: [
      ["Si j'avais plus de temps, j'___ le chinois.", "apprendrais", "apprendrai", "apprends"],
      ["Le rapport ___ par le directeur.", "a été relu", "a relu", "relisait"],
      ["Bien qu'il ___ fatigué, il a continué.", "soit", "est", "sera"],
      ["Le livre ___ je parle est sur la table.", "dont", "que", "où"],
      ["Après ___ fini son travail, elle est partie.", "avoir", "être", "ayant"],
      ["Ils ont fait comme si rien ne ___ passé.", "s'était", "s'est", "se serait"],
    ],
  },
  reading: {
    title: "Un samedi au marché",
    paragraphs: [
      "Chaque samedi, Awa et son frère Joseph vont au grand marché de Kolwezi. Ils partent à sept heures, car les meilleurs légumes se vendent tôt. Awa porte un grand panier et Joseph tient la liste que leur mère a écrite.",
      "Au marché, Awa achète des tomates, des oignons et du poisson, pendant que Joseph cherche des sandales neuves. Le vendeur demande douze dollars, mais Joseph trouve le prix trop élevé. Après une discussion amicale, il paie neuf dollars et le vendeur ajoute un petit cadeau. Sur le chemin du retour, les enfants sont fatigués mais heureux, et ils promettent de revenir la semaine prochaine.",
    ],
    q: [
      ["Pourquoi partent-ils de bonne heure ?", "Les meilleurs légumes se vendent tôt.", "Le marché ferme à huit heures.", "Leur mère les attend au marché."],
      ["Que veut acheter Joseph ?", "Des sandales", "Du poisson", "Un panier"],
      ["Combien Joseph paie-t-il finalement ?", "Neuf dollars", "Douze dollars", "Trois dollars"],
      ["Comment sont les enfants au retour ?", "Fatigués mais heureux", "Fâchés", "Ennuyés et tristes"],
    ],
  },
  readAloud:
    "Je m'appelle Marie et je travaille dans un petit hôpital. Chaque matin, je prends le bus à six heures et demie. Le soir, j'aime préparer le dîner pour ma famille.",
  listening: {
    lines: [
      "Bonjour, je voudrais réserver une table pour vendredi soir.",
      "Bien sûr. Pour combien de personnes ?",
      "Pour cinq personnes, vers vingt heures. Un de mes amis est végétarien.",
      "Aucun problème. Nous avons deux plats végétariens. Puis-je avoir votre nom, s'il vous plaît ?",
      "Oui, c'est Okoye. O, K, O, Y, E.",
      "Merci. Votre table est réservée vendredi à vingt heures, pour cinq personnes.",
    ],
    q: [
      ["Pour quel jour la table est-elle réservée ?", "Vendredi", "Samedi", "Jeudi"],
      ["Combien de personnes viendront ?", "Cinq", "Quatre", "Six"],
      ["Que dit la personne à propos d'un de ses amis ?", "Il est végétarien.", "Il arrive en retard.", "Il ne peut pas venir."],
      ["À quelle heure est la réservation ?", "À vingt heures", "À dix-neuf heures", "À vingt et une heures"],
    ],
  },
};

export default content;
