import type { PlacementContent } from "./types";

// Test de niveau de Logiciels de gestion : seulement des questions et une lecture (pas d'écoute ni de lecture à voix haute).
// Écrit pour le test lui-même : rien ne vient des leçons, que l'étudiant n'a pas encore suivies.
const content: PlacementContent = {
  levels: {
    1: [
      ["À quoi sert un logiciel de gestion ?", "À enregistrer et relier les informations de l'entreprise", "À retoucher des photos", "À naviguer sur Internet"],
      ["Que signifie « HT » sur une facture ?", "Hors taxes", "Haute tension", "Heures de travail"],
      ["Quel document est envoyé au client pour proposer un prix avant la vente ?", "Le devis", "Le bon de livraison", "L'avoir"],
      ["Quel document prouve que les marchandises ont été remises au client ?", "Le bon de livraison", "Le devis", "Le relevé bancaire"],
      ["Qu'est-ce qu'un client ?", "Une personne ou une entreprise qui achète à l'entreprise", "Un employé", "Un produit en stock"],
      ["Que veut dire TVA ?", "Taxe sur la valeur ajoutée", "Taux de vente annuel", "Total des ventes affichées"],
    ],
    2: [
      ["Dans la partie double, que vaut le total des débits ?", "Le total des crédits", "Zéro", "Le nombre de comptes"],
      ["Quel numéro de compte OHADA désigne les clients ?", "411", "401", "701"],
      ["Que fait un rapprochement bancaire ?", "Il compare le relevé de la banque avec les écritures comptables", "Il supprime des factures", "Il crée un nouveau client"],
      ["À quoi sert le lettrage d'un compte client ?", "Associer une facture à son règlement", "Écrire une lettre", "Calculer la TVA"],
      ["Que représente une immobilisation ?", "Un bien durable utilisé plusieurs années", "Une dépense de la semaine", "Un client en retard"],
      ["Quelle application d'un ERP gère les entrepôts et les quantités ?", "L'inventaire (le stock)", "Le CRM", "Les ressources humaines"],
    ],
    3: [
      ["Que veut dire le principe du moindre privilège ?", "Chacun n'a que les droits utiles à son travail", "Tout le monde est administrateur", "Personne ne peut se connecter"],
      ["Que calcule le taux de conversion d'un CRM ?", "La part des opportunités gagnées", "Le total des salaires", "La valeur du stock"],
      ["Que signifie CIF en douane ?", "Coût, assurance, fret", "Certificat d'importation final", "Contrôle interne de facturation"],
      ["Qu'est-ce que la marge brute ?", "Le chiffre d'affaires moins le coût d'achat des marchandises vendues", "Le total des dettes", "Le nombre de clients"],
      ["Pourquoi tester la restauration d'une sauvegarde ?", "Pour savoir qu'elle fonctionne vraiment", "Pour supprimer la base", "Pour changer d'ordinateur"],
      ["Que permet un guichet unique du commerce extérieur ?", "Déposer ses demandes une seule fois sur une plateforme commune", "Éviter tout contrôle", "Supprimer les taxes"],
    ],
  },
  reading: {
    title: "La boutique de Neema",
    paragraphs: [
      "Neema tient une petite boutique de fournitures scolaires. Jusqu'ici, elle notait ses ventes dans un cahier. Un jour, elle perd trois pages et ne sait plus quels clients lui doivent de l'argent. Elle décide d'utiliser un logiciel de gestion pour enregistrer ses clients, ses produits, ses factures et ses paiements.",
      "Au début, elle crée les fiches de ses clients et de ses produits. Ensuite, elle établit un devis pour une école, le transforme en facture et enregistre le règlement quand l'école paie. À la fin du mois, elle compare le stock du logiciel avec les cartons de la boutique et rapproche son relevé bancaire avec ses écritures.",
    ],
    q: [
      ["Pourquoi Neema décide-t-elle d'utiliser un logiciel de gestion ?", "Elle a perdu des pages de son cahier et ne sait plus qui lui doit de l'argent", "Elle veut fermer la boutique", "Elle veut changer de métier"],
      ["Quelle est la première chose qu'elle enregistre ?", "Les fiches de ses clients et de ses produits", "Ses employés", "Ses vacances"],
      ["Que fait-elle à la fin du mois ?", "Elle compare le stock et rapproche le relevé bancaire", "Elle supprime la base", "Elle éteint le logiciel pour toujours"],
    ],
  },
  // Pas d'écoute ni de lecture à voix haute pour ce programme.
  readAloud: "",
  listening: { lines: [], q: [] },
};

export default content;
