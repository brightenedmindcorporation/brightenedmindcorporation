import { finalQuiz, lesson, quiz } from "./builders";

// Niveau 3 · Avancé — leçons 7 à 12 : Excel, PowerPoint et projet final.

export const lessonsB3 = [
  lesson({
    id: 7,
    title: "Excel : fonctions avancées",
    subtitle: "Combiner les fonctions pour traiter des données complexes.",
    sections: [
      {
        heading: "Les SI imbriqués et SIERREUR",
        body: [
          "Un SI peut en contenir un autre : =SI(B2>=16;\"Très bien\";SI(B2>=12;\"Bien\";SI(B2>=10;\"Passable\";\"Insuffisant\"))).",
          "=SIERREUR(formule;valeur_si_erreur) remplace une erreur par un texte propre : =SIERREUR(RECHERCHEV(...);\"Introuvable\").",
          "Gardez les formules lisibles : au-delà de trois niveaux, cherchez une autre méthode.",
        ],
      },
      {
        heading: "Conditions multiples",
        body: [
          "=SOMME.SI.ENS(somme;plage1;critère1;plage2;critère2) : additionne selon plusieurs critères.",
          "=NB.SI.ENS(plage1;critère1;plage2;critère2) : compte selon plusieurs critères.",
          "Exemple : total des ventes de « Cahier » à « Kolwezi ».",
        ],
      },
      {
        heading: "INDEX et EQUIV, RECHERCHEX",
        body: [
          "RECHERCHEV ne regarde que vers la droite. INDEX + EQUIV peuvent chercher dans n'importe quelle colonne.",
          "=INDEX(plage_résultat;EQUIV(valeur;plage_recherche;0)).",
          "RECHERCHEX (Excel récent) fait la même chose en plus simple : =RECHERCHEX(valeur;plage_recherche;plage_résultat).",
        ],
      },
      {
        heading: "Texte, dates et arrondis",
        body: [
          "=TEXTE(A2;\"jj/mm/aaaa\") met en forme une date dans un texte.",
          "=ARRONDI(B2;2) arrondit à 2 décimales. =ENT(B2) garde la partie entière.",
          "=NB.JOURS.OUVRES(date1;date2) compte les jours de travail.",
          "=CONCAT et =JOINDRE.TEXTE assemblent des textes (versions récentes).",
        ],
      },
    ],
    caseTitle: "Le tableau de bord des commerciaux",
    caseLines: [
      "Grace analyse les ventes de six commerciaux sur douze mois dans un grand classeur.",
      "Avec SOMME.SI.ENS, elle calcule les ventes d'un produit pour une ville et un mois précis.",
      "Elle protège ses recherches avec SIERREUR, pour ne plus voir d'erreurs #N/A.",
      "Elle classe les commerciaux avec des SI imbriqués : Excellent, Bon, À encourager.",
    ],
    tasks: [
      "Écrivez une formule SI imbriquée avec quatre mentions.",
      "Utilisez SOMME.SI.ENS avec deux critères sur une liste de ventes.",
      "Reprenez un RECHERCHEV et entourez-le de SIERREUR.",
      "Remplacez un RECHERCHEV par INDEX et EQUIV.",
    ],
    goal: "Combiner SI, SIERREUR, SOMME.SI.ENS, INDEX/EQUIV et fonctions de texte et de date.",
    video: "Excel : fonctions avancées",
  }),
  lesson({
    id: 8,
    title: "Excel : tableaux croisés dynamiques avancés",
    subtitle: "Analyser, regrouper et filtrer visuellement avec les segments.",
    sections: [
      {
        heading: "Aller plus loin avec un tableau croisé",
        body: [
          "Plusieurs champs dans les Lignes : une hiérarchie (Région > Ville > Produit).",
          "Plusieurs champs dans Valeurs : total ET nombre de ventes.",
          "Afficher les valeurs en % du total : clic droit > Afficher les valeurs > % du total général.",
        ],
      },
      {
        heading: "Grouper",
        body: [
          "Clic droit sur une date > Grouper : par mois, trimestre, année.",
          "On peut aussi grouper des nombres par tranches (0-10, 10-20…).",
          "Idéal pour des tendances mensuelles ou trimestrielles.",
        ],
      },
      {
        heading: "Segments et chronologies",
        body: [
          "Un segment est un bouton-filtre visuel : cliquez sur « Kolwezi » et le tableau se limite à cette ville.",
          "Analyse du tableau croisé > Insérer un segment.",
          "Une chronologie filtre par période sur une règle de temps.",
          "Un segment peut piloter plusieurs tableaux croisés d'un même classeur.",
        ],
      },
      {
        heading: "Du tableau au rapport",
        body: [
          "Nommez clairement les champs et les en-têtes : « Total des ventes (FC) ».",
          "Mettez des couleurs sobres et des formats de nombre (séparateur de milliers).",
          "Ajoutez un graphique croisé dynamique pour une lecture rapide.",
        ],
      },
    ],
    caseTitle: "La réunion mensuelle",
    caseLines: [
      "Chaque mois, Ruth présente les ventes à la direction. Elle ouvre son classeur et clique sur les segments « Région » et « Produit ».",
      "Les chiffres et le graphique s'adaptent immédiatement à chaque question de la direction.",
      "Elle découvre une baisse de 30 % dans une région, puis trouve la cause grâce au regroupement par mois.",
      "Une action est décidée dans la réunion même.",
    ],
    tasks: [
      "Construisez un tableau croisé avec Région, Ville et Produit en lignes, et Montant en valeurs.",
      "Groupez des dates par mois et par trimestre.",
      "Insérez deux segments et reliez-les à un graphique croisé.",
      "Affichez les valeurs en pourcentage du total général.",
    ],
    goal: "Analyser des données avec des tableaux croisés dynamiques, des regroupements et des segments.",
    video: "Excel : segments et tableaux croisés avancés",
  }),
  lesson({
    id: 9,
    title: "Excel : tableaux de bord et graphiques",
    subtitle: "Présenter les chiffres clés sur une seule page.",
    sections: [
      {
        heading: "Qu'est-ce qu'un tableau de bord ?",
        body: [
          "Une page qui résume l'essentiel : 3 à 5 indicateurs clés, 2 à 4 graphiques.",
          "Il répond à une question : « Où en sommes-nous ? »",
          "Les chiffres du tableau de bord viennent de formules et de tableaux croisés : ils se mettent à jour tout seuls.",
        ],
      },
      {
        heading: "Choisir le bon graphique",
        body: [
          "Colonnes : comparer des catégories. Courbes : une évolution dans le temps.",
          "Secteurs : seulement pour 3 à 5 parts d'un tout. Barres : classements.",
          "Graphique combiné : colonnes pour les ventes + courbe pour l'objectif.",
          "Jamais d'effet 3D qui fausse la lecture.",
        ],
      },
      {
        heading: "Les petits plus",
        body: [
          "Minigraphiques (sparklines) : de minuscules courbes dans une cellule.",
          "Mise en forme conditionnelle : jeux d'icônes (flèches, feux tricolores).",
          "Cellules d'indicateurs : un grand nombre, un libellé court, une couleur.",
        ],
      },
      {
        heading: "Mise en page soignée",
        body: [
          "Masquez le quadrillage (Affichage > Quadrillage) pour un rendu propre.",
          "Alignez les éléments sur une grille, avec peu de couleurs.",
          "Orientation paysage, impression sur une page, export en PDF.",
        ],
      },
    ],
    caseTitle: "Le tableau de bord du directeur",
    caseLines: [
      "Le directeur d'une école veut suivre, en un coup d'œil, les inscriptions, les paiements et les présences.",
      "Joseph crée une feuille unique avec quatre indicateurs, un graphique des inscriptions par mois et un jeu de feux tricolores pour les paiements.",
      "Chaque lundi, il actualise les données et le directeur reçoit le PDF.",
      "Les décisions se prennent plus vite.",
    ],
    tasks: [
      "Créez une feuille « Tableau de bord » avec trois indicateurs calculés.",
      "Ajoutez un graphique combiné (colonnes et courbe) avec un titre explicite.",
      "Ajoutez des minigraphiques et un jeu d'icônes.",
      "Masquez le quadrillage, mettez la page en paysage et exportez en PDF.",
    ],
    goal: "Concevoir un tableau de bord clair avec indicateurs, graphiques combinés et mise en forme.",
    video: "Excel : créer un tableau de bord",
  }),
  lesson({
    id: 10,
    title: "Excel : protection, import et premières macros",
    subtitle: "Fiabiliser un classeur, importer des données et automatiser une tâche.",
    sections: [
      {
        heading: "Protéger un classeur",
        body: [
          "Révision > Protéger la feuille : empêche de modifier les formules.",
          "Avant de protéger : déverrouillez les cellules de saisie (Format de cellule > Protection).",
          "Fichier > Informations > Protéger le classeur : mot de passe pour ouvrir le fichier.",
          "Notez le mot de passe en lieu sûr : sans lui, le fichier est perdu.",
        ],
      },
      {
        heading: "Importer des données",
        body: [
          "Un fichier CSV est un tableau en texte, avec des séparateurs (point-virgule).",
          "Données > À partir d'un fichier texte/CSV : Excel propose un aperçu avant l'import.",
          "Après import : vérifiez les dates, les nombres et les accents.",
          "Supprimez les doublons : Données > Supprimer les doublons.",
        ],
      },
      {
        heading: "Les macros",
        body: [
          "Une macro est une suite d'actions enregistrées qu'on rejoue en un clic.",
          "Affichage > Macros > Enregistrer une macro : faites les actions, puis Arrêter.",
          "Un classeur avec macros s'enregistre au format .xlsm.",
          "N'activez que les macros de fichiers dont vous connaissez la source : une macro peut contenir un virus.",
        ],
      },
      {
        heading: "Bonnes pratiques de gestion",
        body: [
          "Une feuille de paramètres (taux, listes) séparée des calculs.",
          "Des noms de feuilles clairs, des couleurs d'onglets.",
          "Une feuille « Mode d'emploi » pour que d'autres utilisent le fichier sans vous.",
        ],
      },
    ],
    caseTitle: "Le fichier de la caisse",
    caseLines: [
      "Le comptable d'une boutique remplit un classeur de caisse chaque jour. Parfois, une formule est effacée par erreur.",
      "Pascal protège la feuille en laissant seulement les cellules de saisie modifiables.",
      "Il importe les relevés bancaires en CSV et supprime les doublons.",
      "Il enregistre une macro qui met en forme le rapport du jour en un clic.",
    ],
    tasks: [
      "Protégez une feuille en laissant deux colonnes de saisie modifiables.",
      "Importez un fichier CSV et supprimez les doublons.",
      "Enregistrez une macro simple qui met en gras et colore une ligne de titres.",
      "Enregistrez le classeur au format .xlsm et rejouez la macro.",
    ],
    goal: "Protéger un classeur, importer un fichier CSV et enregistrer une macro simple.",
    video: "Excel : protection, import CSV et macros",
  }),
  lesson({
    id: 11,
    title: "PowerPoint : présentation professionnelle",
    subtitle: "Convaincre avec une histoire claire et des diapositives sobres.",
    sections: [
      {
        heading: "Raconter une histoire",
        body: [
          "Une bonne présentation répond à trois questions : pourquoi (le problème), quoi (la solution), comment (le plan).",
          "Un message principal par diapositive, répété dans le titre.",
          "Une ouverture marquante (un chiffre, une question) et une conclusion avec un appel à l'action.",
        ],
      },
      {
        heading: "Un design professionnel",
        body: [
          "Un masque personnalisé : couleurs de l'entreprise, deux polices maximum, logo discret.",
          "Beaucoup d'espace blanc, peu de texte, images de bonne qualité.",
          "Des chiffres mis en valeur : un grand nombre et une explication courte valent mieux qu'un tableau.",
        ],
      },
      {
        heading: "Médias et interaction",
        body: [
          "Insertion > Vidéo ou Audio : à utiliser si c'est utile, jamais pour décorer.",
          "Liens hypertexte : un sommaire cliquable pour naviguer entre les parties.",
          "Zoom de section : aller directement à une partie pendant la présentation.",
        ],
      },
      {
        heading: "Présenter avec assurance",
        body: [
          "Répétez à voix haute, en chronométrant. Prévoyez une version courte et une version longue.",
          "Regardez le public, pas l'écran. Parlez lentement.",
          "Préparez une copie PDF et une clé USB de secours.",
          "Exportez en vidéo (Fichier > Exporter > Créer une vidéo) pour une diffusion sans présentateur.",
        ],
      },
    ],
    caseTitle: "Convaincre la banque",
    caseLines: [
      "Esther présente le projet d'une petite coopérative de couture à une banque. Elle a dix minutes.",
      "Elle commence par un chiffre frappant : 120 emplois potentiels. Chaque diapositive a un seul message.",
      "Elle prépare une version courte de six diapositives et une version longue, avec les chiffres détaillés en annexe.",
      "La banque accepte de financer le premier atelier.",
    ],
    tasks: [
      "Préparez le plan d'une présentation de dix minutes : problème, solution, plan, chiffres, appel à l'action.",
      "Créez un masque personnalisé avec deux couleurs, une police et un logo.",
      "Ajoutez un sommaire cliquable avec des liens vers les parties.",
      "Répétez en chronométrant, puis exportez le PDF de secours.",
    ],
    goal: "Concevoir et présenter une présentation professionnelle structurée et convaincante.",
    video: "PowerPoint : présentation professionnelle",
  }),
  lesson({
    id: 12,
    title: "Projet final et organisation professionnelle",
    subtitle: "Un dossier complet, du chiffre au rapport et à la présentation.",
    sections: [
      {
        heading: "Ce que vous savez faire maintenant",
        body: [
          "Windows : sécuriser, sauvegarder, dépanner, collaborer en ligne.",
          "Word : rapports longs, références, révision à plusieurs, documents professionnels, modèles.",
          "Excel : fonctions avancées, tableaux croisés et segments, tableaux de bord, protection, macros.",
          "PowerPoint : présentation professionnelle, masque personnalisé, présentation avec assurance.",
        ],
      },
      {
        heading: "Le projet : le dossier d'activité d'une entreprise",
        body: [
          "Étape 1 (Excel) : une base de 100 lignes de ventes ; des formules SOMME.SI.ENS et SIERREUR.",
          "Étape 2 (Excel) : un tableau croisé avec segments, puis un tableau de bord d'une page.",
          "Étape 3 (Word) : un rapport de 6 à 8 pages avec plan, légendes, table des illustrations, sommaire et bibliographie.",
          "Étape 4 (PowerPoint) : une présentation de dix diapositives pour convaincre un partenaire.",
          "Étape 5 : partagez les documents en ligne, faites relire avec le suivi des modifications, sauvegardez sur deux supports.",
        ],
      },
      {
        heading: "Organiser son travail",
        body: [
          "Une arborescence claire par projet : 01-Données, 02-Rapport, 03-Présentation, 04-Archives.",
          "Un nom de fichier avec la date et la version : « Rapport-activité-2026-10-v3 ».",
          "Une sauvegarde planifiée chaque semaine.",
          "Un journal des décisions pour garder la trace de ce qui a été validé.",
        ],
      },
      {
        heading: "Continuer à progresser",
        body: [
          "Pratiquez sur de vrais cas : votre école, votre association, votre commerce.",
          "Apprenez un raccourci par jour.",
          "Partagez vos connaissances : enseigner est la meilleure façon de progresser.",
        ],
      },
    ],
    caseTitle: "L'entreprise de Marie",
    caseLines: [
      "Marie dirige une petite entreprise de transformation alimentaire. Elle veut convaincre un partenaire d'investir.",
      "Elle analyse ses ventes avec un tableau de bord, rédige un rapport clair avec ses graphiques et prépare une présentation de dix diapositives.",
      "Un collègue relit le rapport avec le suivi des modifications, et toutes les sauvegardes sont faites.",
      "Le partenaire est impressionné par le sérieux du dossier et signe un accord.",
    ],
    tasks: [
      "Réalisez les cinq étapes du projet.",
      "Organisez vos dossiers avec l'arborescence proposée et nommez vos fichiers avec la date et la version.",
      "Faites relire votre rapport par une personne avec le suivi des modifications.",
      "Présentez le projet en dix minutes et sauvegardez sur deux supports différents.",
    ],
    goal: "Réaliser un dossier professionnel complet avec Excel, Word et PowerPoint et l'organiser correctement.",
    video: "Projet final de bureautique",
  }),
];

export const quizzesB3 = [
  quiz(7, "Quiz 7 — Excel : fonctions avancées", "SI imbriqués, SIERREUR, INDEX/EQUIV", [
    ["Que fait =SIERREUR(RECHERCHEV(...);\"Introuvable\") ?", "Affiche « Introuvable » à la place d'une erreur", "Supprime la formule", "Imprime le tableau"],
    ["Quelle fonction additionne selon plusieurs critères ?", "SOMME.SI.ENS", "SOMME", "MAX"],
    ["Quelle fonction compte selon plusieurs critères ?", "NB.SI.ENS", "NBVAL", "SI"],
    ["Quel avantage d'INDEX + EQUIV sur RECHERCHEV ?", "Chercher dans n'importe quelle colonne", "Aucun", "Fonctionner sans données"],
    ["Que fait =ARRONDI(B2;2) ?", "Arrondit à deux décimales", "Supprime la cellule", "Multiplie par deux"],
    ["Que fait =ENT(B2) ?", "Garde la partie entière", "Garde les décimales", "Donne le texte"],
    ["Quelle fonction compte les jours ouvrés ?", "NB.JOURS.OUVRES", "AUJOURDHUI", "JOUR"],
    ["À partir de combien de niveaux un SI imbriqué devient-il difficile à lire ?", "Au-delà de trois niveaux", "Dès le premier", "Jamais"],
    ["Que fait =TEXTE(A2;\"jj/mm/aaaa\") ?", "Met une date en forme dans un texte", "Supprime la date", "Calcule une moyenne"],
    ["Quelle fonction récente simplifie la recherche en remplaçant RECHERCHEV ?", "RECHERCHEX", "SOMMEX", "NBX"],
  ]),
  quiz(8, "Quiz 8 — Tableaux croisés avancés", "Groupes, segments et chronologies", [
    ["Qu'est-ce qu'un segment ?", "Un bouton-filtre visuel pour un tableau croisé", "Un type de graphique", "Une formule"],
    ["À quoi sert « Grouper » sur des dates ?", "Regrouper par mois, trimestre ou année", "Supprimer les dates", "Changer la police"],
    ["Que fait une chronologie ?", "Filtre par période sur une règle de temps", "Imprime la feuille", "Calcule la TVA"],
    ["Comment afficher les valeurs en pourcentage du total ?", "Clic droit > Afficher les valeurs > % du total général", "En ajoutant un %", "Impossible"],
    ["Peut-on avoir plusieurs champs dans les Lignes ?", "Oui, pour faire une hiérarchie", "Non, jamais", "Seulement un champ de texte"],
    ["Que fait « Actualiser » ?", "Met à jour le tableau avec les nouvelles données", "Supprime le tableau", "Change les couleurs"],
    ["Pourquoi nommer clairement les champs ?", "Pour une lecture claire du rapport", "Pour alourdir le fichier", "Pour cacher les données"],
    ["Que permet un graphique croisé dynamique ?", "Visualiser rapidement le résultat du tableau", "Saisir des données", "Protéger le fichier"],
    ["Un segment peut-il commander plusieurs tableaux croisés ?", "Oui, dans un même classeur", "Non, jamais", "Seulement un tableau à la fois"],
    ["Quel intérêt d'un segment lors d'une réunion ?", "Répondre aux questions en un clic", "Imprimer en couleur", "Bloquer le fichier"],
  ]),
  quiz(9, "Quiz 9 — Tableaux de bord", "Indicateurs et graphiques", [
    ["Qu'est-ce qu'un tableau de bord ?", "Une page qui résume les chiffres clés", "Un document de 50 pages", "Une liste de mots de passe"],
    ["Quel graphique convient pour une évolution dans le temps ?", "Courbes", "Secteurs", "Tableau croisé"],
    ["Quand utiliser un graphique en secteurs ?", "Pour 3 à 5 parts d'un tout", "Pour 30 catégories", "Pour une évolution sur 5 ans"],
    ["Que sont les minigraphiques (sparklines) ?", "De petites courbes dans une cellule", "Des images", "Des macros"],
    ["Pourquoi éviter la 3D dans les graphiques ?", "Elle fausse la lecture des valeurs", "Elle est trop colorée", "Elle est interdite par Windows"],
    ["Combien d'indicateurs clés dans un tableau de bord ?", "3 à 5 environ", "40", "Aucun"],
    ["Que permet un graphique combiné ?", "Colonnes et courbe dans le même graphique", "Imprimer en PDF", "Supprimer les erreurs"],
    ["Que fait la mise en forme conditionnelle avec icônes ?", "Affiche des flèches ou des feux selon la valeur", "Change le nom du fichier", "Protège la feuille"],
    ["Quelle disposition est conseillée pour imprimer un tableau de bord ?", "Paysage, sur une page", "Dix pages en portrait", "Sans marges"],
    ["D'où viennent les chiffres d'un bon tableau de bord ?", "De formules et tableaux croisés qui se mettent à jour", "De chiffres tapés à la main", "D'images collées"],
  ]),
  quiz(10, "Quiz 10 — Protection, import et macros", "Fiabiliser et automatiser", [
    ["À quoi sert « Protéger la feuille » ?", "À empêcher de modifier les formules", "À imprimer", "À créer un graphique"],
    ["Que faut-il faire avant de protéger une feuille de saisie ?", "Déverrouiller les cellules de saisie", "Supprimer les formules", "Fermer Excel"],
    ["Qu'est-ce qu'un fichier CSV ?", "Un tableau en texte avec séparateurs", "Une image", "Un antivirus"],
    ["Quelle extension a un classeur avec macros ?", ".xlsm", ".docx", ".pdf"],
    ["Qu'est-ce qu'une macro ?", "Une suite d'actions enregistrées rejouable en un clic", "Un virus obligatoire", "Un type de graphique"],
    ["Que faire d'une macro dont on ignore la source ?", "Ne pas l'activer", "L'activer vite", "L'envoyer à tous"],
    ["Que faire si l'on oublie le mot de passe d'un classeur chiffré ?", "Le fichier est perdu : notez-le en lieu sûr", "On peut l'ouvrir sans mot de passe", "Redémarrer l'ordinateur"],
    ["À quoi sert « Supprimer les doublons » ?", "À éliminer les lignes en double", "À doubler les lignes", "À protéger la feuille"],
    ["Que vérifier après un import CSV ?", "Les dates, les nombres et les accents", "La couleur du bureau", "Le volume du son"],
    ["Pourquoi une feuille de paramètres séparée ?", "Pour garder taux et listes hors des calculs", "Pour alourdir le fichier", "Pour cacher les erreurs"],
  ]),
  quiz(11, "Quiz 11 — PowerPoint professionnel", "Histoire, design et présentation", [
    ["Quelles questions guident une bonne présentation ?", "Pourquoi, quoi, comment", "Qui, où, combien d'écrans", "Aucune"],
    ["Combien de messages principaux par diapositive ?", "Un seul", "Dix", "Quinze"],
    ["Que privilégier pour le design ?", "Peu de texte, beaucoup d'espace blanc", "Beaucoup de couleurs", "Du texte partout"],
    ["Combien de polices maximum ?", "Deux", "Dix", "Une par diapositive"],
    ["À quoi servent les liens hypertexte dans une présentation ?", "À créer un sommaire cliquable", "À imprimer", "À corriger l'orthographe"],
    ["Que préparer en cas de panne d'ordinateur ?", "Un PDF et une clé USB de secours", "Rien", "Un deuxième titre"],
    ["Comment diffuser sans présentateur ?", "Exporter en vidéo", "Imprimer en couleur", "Copier-coller dans Word"],
    ["Où doit se porter votre regard en parlant ?", "Vers le public", "Vers l'écran seulement", "Vers vos pieds"],
    ["Quelle ouverture marque le public ?", "Un chiffre frappant ou une question", "Dix lignes de texte", "Une excuse"],
    ["Pourquoi préparer une version courte et une version longue ?", "S'adapter au temps disponible", "Doubler les fichiers", "Éviter de répéter"],
  ]),
  quiz(12, "Quiz 12 — Révision du niveau 3", "Excel, Word, PowerPoint et organisation", [
    ["Quel nom de fichier est le plus professionnel ?", "Rapport-activité-2026-10-v3.docx", "doc final FINAL (2).docx", "essai.docx"],
    ["Quel outil permet de relire un document à plusieurs ?", "Le suivi des modifications", "Le pinceau", "Le bouton gras"],
    ["Quel outil résume des milliers de lignes de ventes ?", "Le tableau croisé dynamique", "Le publipostage", "Le diaporama"],
    ["Que fait SIERREUR ?", "Remplace une erreur par un résultat propre", "Supprime la feuille", "Impression"],
    ["Quel format conserve une macro ?", ".xlsm", ".xlsx", ".pdf"],
    ["Quelle bonne pratique de sauvegarde ?", "Sauvegarder sur deux supports différents", "Une seule copie", "Aucune sauvegarde"],
    ["Quel outil sécurise un disque perdu ou volé ?", "Le chiffrement (BitLocker)", "Le pinceau", "Le diaporama"],
    ["Que doit contenir un rapport long ?", "Un plan, un sommaire, des légendes et une bibliographie", "Seulement des images", "Rien de précis"],
    ["Quel graphique pour comparer ventes et objectif ?", "Un graphique combiné", "Un graphique en secteurs de 40 parts", "Un tableau vide"],
    ["Pourquoi progresser régulièrement ?", "Parce que la bureautique s'apprend en pratiquant", "Parce que c'est obligatoire chaque jour", "Pour supprimer ses fichiers"],
  ]),
];

export const final3 = finalQuiz(
  "Quiz final — Niveau 3 Avancé",
  "Sécurité, collaboration, Word, Excel et PowerPoint professionnels",
  [
    ["Quel outil chiffre le disque d'un ordinateur sous Windows Pro ?", "BitLocker", "Paint", "Calculatrice"],
    ["Que faire en cas de rançongiciel (ransomware) ?", "Ne pas payer ; restaurer depuis les sauvegardes", "Payer rapidement", "Éteindre l'antivirus"],
    ["Où voit-on les programmes qui ralentissent un ordinateur ?", "Dans le Gestionnaire des tâches", "Dans Word", "Dans l'Explorateur de fichiers seulement"],
    ["Quelle autorisation pour que quelqu'un lise sans modifier ?", "« Peut afficher »", "« Peut modifier »", "« Propriétaire »"],
    ["Que permet l'historique des versions ?", "Revenir à un état précédent du document", "Imprimer plus vite", "Changer la langue"],
    ["Que fait une légende insérée avec Word ?", "Numérote automatiquement les figures et tableaux", "Change la police", "Supprime les images"],
    ["Que fait Ctrl + A puis F9 dans Word ?", "Met à jour tous les champs", "Ferme le document", "Enregistre sous un autre nom"],
    ["À quoi sert le suivi des modifications ?", "À voir et contrôler chaque changement de chacun", "À sauvegarder", "À compresser le fichier"],
    ["Que faut-il éviter dans un CV ?", "Mentionner un diplôme que l'on n'a pas", "Une mise en forme sobre", "Des listes à puces"],
    ["Quelle fonction additionne selon plusieurs critères ?", "SOMME.SI.ENS", "SOMME", "MIN"],
    ["Que fait SIERREUR ?", "Remplace une erreur par un résultat propre", "Supprime la feuille", "Trie les données"],
    ["Qu'est-ce qu'un segment dans un tableau croisé ?", "Un bouton-filtre visuel", "Une formule", "Un type de police"],
    ["Quel graphique pour une évolution dans le temps ?", "Courbes", "Secteurs", "Aucun"],
    ["Que fait « Protéger la feuille » ?", "Empêche de modifier les formules", "Imprime la feuille", "Ouvre un nouveau fichier"],
    ["Quelle extension a un classeur avec macros ?", ".xlsm", ".docx", ".jpg"],
    ["Que faire d'une macro dont on ignore la source ?", "Ne pas l'activer", "L'activer vite", "L'envoyer à tous ses contacts"],
    ["Combien de messages principaux par diapositive ?", "Un seul", "Dix", "Autant que possible"],
    ["Que préparer en cas de panne pendant une présentation ?", "Un PDF et une clé USB de secours", "Rien", "Un autre écran de télévision"],
    ["Quel nom de fichier est le plus professionnel ?", "Rapport-activité-2026-10-v3.docx", "doc final FINAL (2).docx", "essai.docx"],
    ["Quelle règle de sauvegarde est conseillée ?", "3 copies, 2 supports différents, dont 1 ailleurs", "Une copie sur le bureau", "Aucune"],
  ]
);
