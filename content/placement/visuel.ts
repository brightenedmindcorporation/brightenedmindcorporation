import type { PlacementContent } from "./types";

// Test de niveau de Visuel & Audiovisuel : seulement des questions et une lecture (pas d'écoute ni de lecture à voix haute).
// Écrit pour le test lui-même : rien ne vient des leçons, que l'étudiant n'a pas encore suivies.
const content: PlacementContent = {
  levels: {
    1: [
      ["Que veut dire RVB ?", "Rouge, vert, bleu : les couleurs d'écran", "Rapide, vif, brillant", "Rouge, vert, brun"],
      ["Quel logiciel sert surtout à retoucher des photos ?", "Photoshop", "Excel", "Word"],
      ["Quel format garde un fond transparent ?", "PNG", "JPG", "MP3"],
      ["Qu'est-ce qu'un pixel ?", "Un petit carré de couleur d'une image numérique", "Un type de caméra", "Une police d'écriture"],
      ["Quelle résolution est conseillée pour imprimer une image ?", "300 ppi", "10 ppi", "1 ppi"],
      ["Qu'est-ce qu'un logo ?", "Un signe qui représente une marque ou une organisation", "Un format de fichier", "Un câble"],
    ],
    2: [
      ["Que veut dire « 25 i/s » ?", "25 images par seconde", "25 images au total", "25 minutes"],
      ["Quel plan montre le visage et les émotions ?", "Le gros plan", "Le plan large", "Le plan de coupe"],
      ["Quel format convient à une vidéo verticale de réseau social ?", "9:16", "16:9", "4:3"],
      ["Qu'est-ce que la timeline d'un logiciel de montage ?", "La ligne du temps où l'on assemble les plans", "Une page Internet", "Un câble de caméra"],
      ["Que fait l'étalonnage ?", "Il corrige les couleurs et donne une ambiance à l'image", "Il enregistre le son", "Il imprime la vidéo"],
      ["Quel format d'export convient à presque toutes les plateformes ?", "MP4 avec le codec H.264", "DOC", "PSD"],
    ],
    3: [
      ["Que veut dire non destructif dans Photoshop ?", "On peut revenir en arrière sans perdre l'original", "On supprime l'original", "On travaille sans calques"],
      ["Qu'est-ce que le fond perdu en impression ?", "Un débordement autour du format pour éviter les liserés blancs", "Un fichier supprimé", "Un papier de mauvaise qualité"],
      ["Qu'est-ce qu'une charte graphique ?", "Le mode d'emploi de l'identité visuelle d'une marque", "Un logiciel de montage", "Un contrat de travail"],
      ["Qu'est-ce que le multicaméra ?", "Filmer et monter avec plusieurs caméras sur un même événement", "Une caméra très chère", "Un format de fichier"],
      ["Que ne faut-il jamais partager pendant un direct ?", "La clé de diffusion", "Le titre", "Le logo"],
      ["Que faut-il vérifier avant d'utiliser une musique dans une vidéo ?", "Sa licence et ses droits d'utilisation", "Sa couleur", "Son poids en lettres"],
    ],
  },
  reading: {
    title: "Une affiche et un film pour l'inauguration",
    paragraphs: [
      "Neema est graphiste et vidéaste. Une école lui demande une affiche et un petit film pour l'inauguration de sa nouvelle bibliothèque. Elle commence par un croquis de l'affiche : un titre en grand, une photo du bâtiment, la date, le lieu et un logo. Elle crée ensuite l'affiche dans Photoshop, en grande taille et en haute résolution pour que l'impression soit nette.",
      "Pour le film, elle filme la directrice avec un téléphone sur un trépied, près d'une fenêtre, avec un micro cravate. Au montage, elle coupe les silences, ajoute des plans de coupe, une musique libre de droits et des sous-titres. Elle exporte une version horizontale pour l'école et une version verticale pour les réseaux sociaux.",
    ],
    q: [
      ["Que fait Neema avant de créer l'affiche dans le logiciel ?", "Elle dessine un croquis", "Elle imprime directement", "Elle choisit une musique"],
      ["Pourquoi filme-t-elle près d'une fenêtre ?", "Pour profiter de la lumière naturelle", "Pour cacher le micro", "Pour avoir moins de son"],
      ["Que produit-elle à la fin du film ?", "Une version horizontale et une version verticale", "Une seule version en noir et blanc", "Aucune version"],
    ],
  },
  // Pas d'écoute ni de lecture à voix haute pour ce programme.
  readAloud: "",
  listening: { lines: [], q: [] },
};

export default content;
