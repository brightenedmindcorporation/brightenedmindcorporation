import type { PlacementContent } from "./types";

// Test de niveau de Bureautique : seulement des questions et une lecture (pas d'écoute ni de lecture à voix haute).
// Écrit pour le test lui-même : rien ne vient des leçons, que l'étudiant n'a pas encore suivies.
const content: PlacementContent = {
  levels: {
    1: [
      ["Quel raccourci clavier sert à copier un élément sélectionné ?", "Ctrl + C", "Ctrl + V", "Ctrl + Z"],
      ["Dans Windows, à quoi sert la Corbeille ?", "Garder les fichiers supprimés avant leur suppression définitive", "Ouvrir Internet", "Éteindre l'ordinateur"],
      ["Quel logiciel de la suite Office sert surtout à écrire un courrier ou un rapport ?", "Word", "Excel", "PowerPoint"],
      ["Dans Excel, comment appelle-t-on le croisement d'une colonne et d'une ligne ?", "Une cellule", "Une feuille", "Un classeur"],
      ["Quelle formule calcule la somme des cellules B2 à B4 ?", "=SOMME(B2:B4)", "=B2+B4+", "SOMME(B2;B4)"],
      ["Quel est le bon geste pour agrandir une image sans la déformer ?", "Tirer sur un coin de l'image", "Tirer sur un côté de l'image", "Cliquer deux fois sur l'image"],
    ],
    2: [
      ["Pourquoi utiliser les styles de titre (Titre 1, Titre 2) dans Word ?", "Pour structurer le document et créer un sommaire automatique", "Pour changer la couleur de l'écran", "Pour protéger le document par mot de passe"],
      ["Que fait la fonction =SI(A1>=10;\"Admis\";\"Ajourné\") ?", "Elle affiche « Admis » si A1 vaut au moins 10, sinon « Ajourné »", "Elle additionne A1 et 10", "Elle compte les cellules égales à 10"],
      ["À quoi sert le publipostage dans Word ?", "Envoyer le même courrier personnalisé à plusieurs destinataires", "Imprimer plusieurs pages par feuille", "Corriger l'orthographe"],
      ["Que signifie la référence absolue $A$1 dans une formule Excel ?", "La cellule A1 ne change pas quand on recopie la formule", "La cellule A1 est supprimée", "La cellule A1 est cachée"],
      ["Dans Excel, que permet de faire un tableau croisé dynamique ?", "Résumer et analyser rapidement une longue liste de données", "Dessiner une image", "Écrire une lettre"],
      ["Quelle option de PowerPoint permet de modifier la mise en page de toutes les diapositives à la fois ?", "Le masque des diapositives", "Les transitions", "Le mode lecture"],
    ],
    3: [
      ["Quelle règle de sauvegarde recommande 3 copies, sur 2 supports, dont 1 hors du lieu de travail ?", "La règle 3-2-1", "La règle 1-2-3", "La règle 5-5-5"],
      ["Dans Word, comment relire un document à plusieurs en gardant la trace de chaque changement ?", "Avec le suivi des modifications et les commentaires", "En imprimant le document", "En le renommant à chaque relecture"],
      ["Quelle combinaison de fonctions Excel permet de chercher une valeur même vers la gauche du tableau ?", "INDEX et EQUIV", "SOMME et MOYENNE", "NB et MAX"],
      ["Que fait la fonction SIERREUR ?", "Elle remplace un message d'erreur par un texte ou une valeur choisis", "Elle supprime la feuille", "Elle trie les données"],
      ["À quoi sert un segment dans un tableau croisé dynamique ?", "À filtrer le tableau avec des boutons faciles à utiliser", "À imprimer le tableau", "À protéger le classeur"],
      ["Quel outil de Windows permet de repérer un programme qui ralentit l'ordinateur ?", "Le Gestionnaire des tâches", "Le Bloc-notes", "La Calculatrice"],
    ],
  },
  reading: {
    title: "Un nouveau poste de secrétaire",
    paragraphs: [
      "Amina vient d'être embauchée comme secrétaire dans une petite entreprise. Le premier jour, sa responsable lui demande de saisir un compte rendu dans Word, de le mettre en forme avec des titres, puis de l'enregistrer dans le dossier « Réunions » sous un nom clair : « Compte-rendu_2026-03-12.docx ».",
      "L'après-midi, Amina prépare un tableau Excel pour suivre les dépenses du mois. Elle utilise la fonction SOMME pour calculer le total, puis crée un graphique en colonnes. Enfin, elle envoie le tout à sa responsable par e-mail, avec les fichiers en pièces jointes.",
    ],
    q: [
      ["Quel logiciel Amina utilise-t-elle pour écrire le compte rendu ?", "Word", "Excel", "PowerPoint"],
      ["Pourquoi donne-t-elle un nom clair au fichier ?", "Pour le retrouver facilement", "Pour le rendre plus lourd", "Pour le cacher"],
      ["Qu'utilise Amina pour calculer le total des dépenses ?", "La fonction SOMME", "Un graphique", "Une pièce jointe"],
    ],
  },
  // Pas d'écoute ni de lecture à voix haute pour ce programme.
  readAloud: "",
  listening: { lines: [], q: [] },
};

export default content;
