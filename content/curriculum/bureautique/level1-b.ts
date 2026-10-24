import { finalQuiz, lesson, quiz } from "./builders";

// Niveau 1 · Initiation — leçons 7 à 12 : Excel, PowerPoint et révision.

export const lessonsB = [
  lesson({
    id: 7,
    title: "Excel : découvrir le tableur",
    subtitle: "Comprendre un classeur, saisir des données et les organiser.",
    sections: [
      {
        heading: "Le vocabulaire d'Excel",
        body: [
          "Un classeur est un fichier Excel (.xlsx). Il contient une ou plusieurs feuilles.",
          "Une feuille est un grand tableau fait de colonnes (A, B, C…) et de lignes (1, 2, 3…).",
          "Une cellule est le croisement d'une colonne et d'une ligne. Son adresse est, par exemple, B3.",
          "La barre de formule affiche le contenu de la cellule sélectionnée.",
        ],
      },
      {
        heading: "Saisir et corriger",
        body: [
          "Cliquez sur une cellule, tapez, puis validez avec Entrée (descend) ou Tab (va à droite).",
          "Le texte s'aligne à gauche. Les nombres s'alignent à droite.",
          "Pour corriger une cellule : sélectionnez-la et appuyez sur F2.",
          "Suppr efface le contenu. Ctrl + Z annule.",
        ],
      },
      {
        heading: "Sélectionner une plage",
        body: [
          "Une plage est un groupe de cellules : A1:C5 va de A1 jusqu'à C5.",
          "Cliquez sur la lettre d'une colonne pour la sélectionner en entier. Même chose avec le numéro d'une ligne.",
          "Ctrl + A sélectionne toute la feuille.",
        ],
      },
      {
        heading: "Colonnes, lignes et recopie",
        body: [
          "Double-cliquez sur la limite d'une colonne pour l'ajuster à son contenu.",
          "Clic droit > Insérer ou Supprimer pour ajouter ou retirer une ligne ou une colonne.",
          "La poignée de recopie (petit carré en bas à droite) étire une série : lundi, mardi, mercredi… ou 1, 2, 3…",
        ],
      },
      {
        heading: "Les feuilles",
        body: [
          "Clic droit sur l'onglet d'une feuille > Renommer (par exemple « Janvier »).",
          "Le bouton « + » ajoute une nouvelle feuille.",
          "Enregistrez avec Ctrl + S : le classeur porte l'extension .xlsx.",
        ],
      },
    ],
    caseTitle: "La liste des élèves de Marie",
    caseLines: [
      "Marie est responsable d'une petite école. Elle veut une liste de ses élèves avec leurs notes.",
      "Elle ouvre Excel et tape les noms dans la colonne A, les classes dans la colonne B, les notes dans la colonne C.",
      "Elle élargit les colonnes en double-cliquant sur leurs limites et renomme la feuille « Classe 1 ».",
      "Elle enregistre le classeur sous le nom « Notes de l'école ».",
    ],
    tasks: [
      "Ouvrez un classeur vide et tapez la liste de cinq amis, avec leur ville et leur âge.",
      "Ajustez la largeur des colonnes avec un double-clic.",
      "Utilisez la poignée de recopie pour écrire les jours de la semaine.",
      "Renommez la feuille et enregistrez le classeur.",
    ],
    goal: "Reconnaître une cellule, une ligne et une colonne, saisir des données et enregistrer un classeur.",
    video: "Excel pour débutants : cellules, lignes, colonnes",
  }),
  lesson({
    id: 8,
    title: "Excel : les premiers calculs",
    subtitle: "Écrire des formules et utiliser les fonctions SOMME et MOYENNE.",
    sections: [
      {
        heading: "La formule",
        body: [
          "Une formule commence toujours par le signe égal (=).",
          "Exemple : =A1+B1 additionne le contenu des cellules A1 et B1.",
          "Opérateurs : + (addition), - (soustraction), * (multiplication), / (division).",
          "Excel calcule la multiplication et la division avant l'addition. Les parenthèses changent l'ordre : =(A1+B1)*C1.",
        ],
      },
      {
        heading: "Les fonctions essentielles",
        body: [
          "=SOMME(B2:B10) : additionne toutes les cellules de B2 à B10.",
          "=MOYENNE(B2:B10) : calcule la moyenne.",
          "=MIN(B2:B10) et =MAX(B2:B10) : donnent la plus petite et la plus grande valeur.",
          "Le bouton Σ (Somme automatique) écrit la formule SOMME pour vous : Alt + =.",
        ],
      },
      {
        heading: "Recopier une formule",
        body: [
          "Étirez la poignée de recopie : la formule s'adapte à chaque ligne (=B2*C2 devient =B3*C3).",
          "Pour garder une cellule fixe, ajoutez des $ : $B$1 (touche F4).",
        ],
      },
      {
        heading: "Pourcentages",
        body: [
          "Pour calculer 16 % de 200 : =200*16% ou =B2*C2 si C2 contient 16 %.",
          "Format Pourcentage : Accueil > bouton %.",
        ],
      },
      {
        heading: "Les messages d'erreur",
        body: [
          "#DIV/0! : division par zéro.",
          "#NOM? : le nom d'une fonction est mal écrit.",
          "#VALEUR! : on calcule avec du texte au lieu d'un nombre.",
          "#### : la colonne est trop étroite pour afficher le nombre.",
        ],
      },
    ],
    caseTitle: "La facture de la boutique de David",
    caseLines: [
      "David vend des cahiers, des stylos et des sacs. Il note les quantités et les prix dans Excel.",
      "Dans la colonne D, il écrit =B2*C2 pour obtenir le total de chaque article, puis étire la formule vers le bas.",
      "En bas du tableau, il utilise =SOMME(D2:D4) pour le total général.",
      "Quand un client demande 10 % de réduction, il calcule le nouveau total en deux secondes.",
    ],
    tasks: [
      "Créez un tableau avec Article, Quantité, Prix et Total pour quatre articles.",
      "Calculez chaque total avec une formule, puis le total général avec SOMME.",
      "Calculez la moyenne, le minimum et le maximum de vos prix.",
      "Provoquez volontairement l'erreur #DIV/0!, puis expliquez-la.",
    ],
    goal: "Écrire des formules, utiliser SOMME, MOYENNE, MIN, MAX et recopier un calcul.",
    video: "Excel : formules et fonction SOMME",
  }),
  lesson({
    id: 9,
    title: "Excel : mise en forme et graphique",
    subtitle: "Présenter un tableau proprement et créer un premier graphique.",
    sections: [
      {
        heading: "Formats des nombres",
        body: [
          "Accueil > menu Format de nombre : Nombre, Monétaire, Pourcentage, Date.",
          "Le format Monétaire ajoute le sigle de la monnaie (FC, $, €).",
          "Réglez le nombre de décimales avec les boutons « Ajouter / Réduire les décimales ».",
        ],
      },
      {
        heading: "Aspect du tableau",
        body: [
          "Bordures : donnent la forme d'un tableau imprimable.",
          "Couleur de remplissage : fait ressortir la ligne des titres.",
          "Fusionner et centrer : pour un titre qui couvre plusieurs colonnes.",
          "Renvoyer à la ligne automatiquement : un long texte s'affiche sur plusieurs lignes dans la cellule.",
        ],
      },
      {
        heading: "Trier et filtrer",
        body: [
          "Données > Trier : du plus petit au plus grand, ou de A à Z.",
          "Données > Filtrer : n'affiche que les lignes qui vous intéressent.",
        ],
      },
      {
        heading: "Un graphique",
        body: [
          "Sélectionnez les données (avec les titres), puis Insertion > Graphiques recommandés.",
          "Colonnes : comparer des valeurs. Secteurs : montrer les parts d'un tout. Courbes : suivre une évolution.",
          "Ajoutez un titre clair et vérifiez la légende.",
        ],
      },
      {
        heading: "Avant d'imprimer",
        body: [
          "Mise en page > Orientation : portrait ou paysage.",
          "Mise en page > Ajuster à une page de large pour que le tableau tienne sur le papier.",
          "Ctrl + P pour l'aperçu avant impression.",
        ],
      },
    ],
    caseTitle: "Le rapport des ventes de Grace",
    caseLines: [
      "Grace suit les ventes de son magasin sur trois mois.",
      "Elle met les titres en gras avec un fond coloré, applique le format monétaire et ajoute des bordures.",
      "Elle crée un graphique en colonnes pour comparer janvier, février et mars.",
      "Son responsable comprend les résultats en un coup d'œil.",
    ],
    tasks: [
      "Reprenez votre tableau de facture : appliquez le format monétaire et ajoutez des bordures.",
      "Mettez la ligne de titres en gras avec un fond de couleur.",
      "Triez les articles du plus cher au moins cher.",
      "Créez un graphique en colonnes avec un titre et imprimez-le sur une seule page.",
    ],
    goal: "Mettre en forme un tableau, le trier et créer un graphique lisible.",
    video: "Excel : mise en forme et graphiques",
  }),
  lesson({
    id: 10,
    title: "PowerPoint : créer une présentation",
    subtitle: "Construire des diapositives claires et bien organisées.",
    sections: [
      {
        heading: "L'écran de PowerPoint",
        body: [
          "Les miniatures des diapositives sont à gauche.",
          "La diapositive en cours de modification est au centre.",
          "Le ruban regroupe les onglets Accueil, Insertion, Création, Transitions, Animations, Diaporama.",
        ],
      },
      {
        heading: "Ajouter et organiser les diapositives",
        body: [
          "Nouvelle diapositive : Ctrl + M, ou Accueil > Nouvelle diapositive.",
          "Chaque diapositive a une disposition : Titre, Titre et contenu, Deux contenus, Vide.",
          "Pour changer l'ordre, faites glisser une miniature. Pour dupliquer ou supprimer, utilisez le clic droit.",
        ],
      },
      {
        heading: "Choisir un thème",
        body: [
          "Création > Thèmes : donne la même allure à toutes les diapositives.",
          "Choisissez un thème sobre, avec un bon contraste entre le texte et le fond.",
        ],
      },
      {
        heading: "Bien structurer",
        body: [
          "Une diapositive = une idée.",
          "Un titre court. Pas plus de 6 lignes de texte, et pas de longues phrases : des mots-clés.",
          "Une présentation type : titre, plan, trois ou quatre idées, conclusion, questions.",
        ],
      },
      {
        heading: "Enregistrer",
        body: [
          "Ctrl + S : le fichier porte l'extension .pptx.",
          "Enregistrez avant de présenter : la clé USB de secours est une bonne habitude.",
        ],
      },
    ],
    caseTitle: "L'exposé de Joseph",
    caseLines: [
      "Joseph doit présenter son projet devant la classe en cinq minutes.",
      "Il crée une diapositive de titre, une diapositive « Plan », trois diapositives de contenu et une conclusion.",
      "Il choisit un thème sobre et une seule idée par diapositive.",
      "Il enregistre le fichier et une copie sur une clé USB.",
    ],
    tasks: [
      "Créez une présentation de cinq diapositives sur « Ma ville ».",
      "Choisissez un thème et changez la disposition d'une diapositive.",
      "Changez l'ordre de deux diapositives, puis dupliquez-en une.",
      "Enregistrez la présentation sous le nom « Exposé ».",
    ],
    goal: "Créer une présentation structurée de plusieurs diapositives avec un thème.",
    video: "PowerPoint pour débutants : première présentation",
  }),
  lesson({
    id: 11,
    title: "PowerPoint : texte, images et diaporama",
    subtitle: "Rendre les diapositives lisibles et présenter devant un public.",
    sections: [
      {
        heading: "Un texte lisible",
        body: [
          "Taille minimale : 24 points, pour être lu depuis le fond de la salle.",
          "Fort contraste : texte foncé sur fond clair, ou l'inverse.",
          "Peu de couleurs, une seule police.",
        ],
      },
      {
        heading: "Images et formes",
        body: [
          "Insertion > Images pour ajouter une photo. Redimensionnez par un coin.",
          "Insertion > Formes : flèches, cadres, symboles.",
          "Une bonne image remplace plusieurs lignes de texte.",
        ],
      },
      {
        heading: "Transitions et animations",
        body: [
          "Une transition est l'effet entre deux diapositives (onglet Transitions).",
          "Une animation fait apparaître un élément d'une diapositive (onglet Animations).",
          "Restez sobre : un seul style d'effet pour toute la présentation.",
        ],
      },
      {
        heading: "Lancer le diaporama",
        body: [
          "F5 : commence depuis la première diapositive.",
          "Maj + F5 : commence depuis la diapositive actuelle.",
          "Flèche droite, Entrée ou clic : diapositive suivante. Flèche gauche : précédente. Échap : quitter.",
        ],
      },
      {
        heading: "Partager",
        body: [
          "Fichier > Exporter > Créer un document PDF : pour envoyer ou imprimer.",
          "Fichier > Imprimer > Documents : 3 diapositives par page pour un support de lecture.",
        ],
      },
    ],
    caseTitle: "La présentation d'Esther",
    caseLines: [
      "Esther présente un projet de jardin scolaire. Elle écrit 5 mots-clés par diapositive, en taille 28.",
      "Elle ajoute une photo du terrain et une flèche pour montrer l'emplacement.",
      "Elle teste le diaporama avec F5 et chronomètre sa présentation : quatre minutes quarante.",
      "Le jour J, elle a aussi une version PDF au cas où l'ordinateur tomberait en panne.",
    ],
    tasks: [
      "Dans « Exposé », mettez tout le texte en taille 24 ou plus.",
      "Ajoutez une image et une forme sur deux diapositives.",
      "Ajoutez une transition identique à toutes les diapositives.",
      "Lancez le diaporama avec F5, puis exportez la présentation en PDF.",
    ],
    goal: "Rendre une présentation lisible, ajouter des images, lancer le diaporama et l'exporter en PDF.",
    video: "PowerPoint : images, transitions et diaporama",
  }),
  lesson({
    id: 12,
    title: "Révision finale et mini-projet",
    subtitle: "Réunir tout ce que vous avez appris dans un projet complet.",
    sections: [
      {
        heading: "Ce que nous avons appris",
        body: [
          "Windows : utiliser le bureau, les fenêtres et la souris.",
          "Fichiers : créer, copier, déplacer, supprimer et sauvegarder.",
          "Sécurité : mots de passe, antivirus, sauvegardes et prudence en ligne.",
          "Word : saisir, mettre en forme, insérer des images et tableaux, imprimer et exporter en PDF.",
          "Excel : saisir des données, calculer avec des formules, mettre en forme et faire un graphique.",
          "PowerPoint : créer des diapositives lisibles et présenter un diaporama.",
        ],
      },
      {
        heading: "Raccourcis essentiels",
        body: [
          "Ctrl + C, Ctrl + X, Ctrl + V : copier, couper, coller.",
          "Ctrl + Z, Ctrl + Y : annuler, rétablir.",
          "Ctrl + S : enregistrer. Ctrl + P : imprimer. Ctrl + A : tout sélectionner.",
          "Ctrl + G, Ctrl + I, Ctrl + U : gras, italique, souligné (Word).",
          "F5 : lancer le diaporama (PowerPoint). F2 : modifier une cellule ou renommer.",
        ],
      },
      {
        heading: "Le mini-projet",
        body: [
          "Étape 1 (Windows) : créez un dossier « Projet BM » avec trois sous-dossiers : Word, Excel, PowerPoint.",
          "Étape 2 (Word) : écrivez une lettre d'une page à un futur employeur, mise en forme et exportée en PDF.",
          "Étape 3 (Excel) : faites le budget d'un mois avec des formules SOMME et un graphique en secteurs.",
          "Étape 4 (PowerPoint) : présentez le projet en cinq diapositives.",
          "Étape 5 : sauvegardez tout le dossier sur une clé USB.",
        ],
      },
      {
        heading: "Pour progresser",
        body: [
          "Pratiquez un peu chaque jour : l'ordinateur s'apprend avec les mains.",
          "Le niveau 2 vous apprendra à travailler plus vite : styles, fonctions SI et RECHERCHEV, diapositive maîtresse.",
        ],
      },
    ],
    caseTitle: "Le projet d'Emma",
    caseLines: [
      "Emma veut créer sa petite entreprise de couture et prépare un dossier complet.",
      "Dans Word, elle rédige une lettre de présentation ; dans Excel, elle calcule ses coûts et ses prix de vente.",
      "Dans PowerPoint, elle prépare cinq diapositives pour convaincre la banque.",
      "Elle range tout dans un dossier « Projet couture » et le sauvegarde sur une clé USB.",
    ],
    tasks: [
      "Réalisez les cinq étapes du mini-projet.",
      "Vérifiez que chaque fichier a un nom clair et se trouve dans le bon dossier.",
      "Faites une sauvegarde sur une clé USB et éjectez-la.",
      "Présentez votre projet à un proche en utilisant le diaporama.",
    ],
    goal: "Réaliser un projet complet qui utilise Windows, Word, Excel et PowerPoint.",
    video: "Révision : projet complet en bureautique",
  }),
];

export const quizzesB = [
  quiz(7, "Quiz 7 — Excel : le tableur", "Cellules, lignes, colonnes et saisie", [
    ["Comment s'appelle le croisement d'une colonne et d'une ligne ?", "Une cellule", "Une plage", "Un classeur"],
    ["Que désigne l'adresse B3 ?", "La colonne B, ligne 3", "La ligne B, colonne 3", "La feuille B3"],
    ["Quelle extension a un classeur Excel ?", ".xlsx", ".docx", ".pptx"],
    ["Que désigne A1:C5 ?", "Une plage de cellules de A1 à C5", "Une seule cellule", "Une formule"],
    ["Quelle touche permet de modifier le contenu d'une cellule ?", "F2", "F7", "F12"],
    ["Comment ajuster la largeur d'une colonne à son contenu ?", "Double-clic sur sa limite", "Supprimer la colonne", "Appuyer sur Échap"],
    ["Comment s'alignent les nombres par défaut ?", "À droite", "À gauche", "Au centre"],
    ["À quoi sert la poignée de recopie ?", "À étirer une série ou une formule", "À imprimer", "À fermer le fichier"],
    ["Comment renommer une feuille ?", "Clic droit sur l'onglet > Renommer", "Ctrl + R", "F5"],
    ["Quel est le contenu de la barre de formule ?", "Le contenu de la cellule sélectionnée", "Le nom du fichier", "L'heure"],
  ]),
  quiz(8, "Quiz 8 — Excel : les calculs", "Formules et fonctions", [
    ["Par quel signe commence une formule ?", "=", "+", "#"],
    ["Quelle formule additionne B2 jusqu'à B10 ?", "=SOMME(B2:B10)", "=B2+B10", "=TOTAL(B2;B10)"],
    ["Quelle fonction calcule la moyenne ?", "MOYENNE", "SOMME", "MAX"],
    ["Quelle fonction donne la plus grande valeur ?", "MAX", "MIN", "NB"],
    ["Que fait le bouton Σ ?", "Écrit automatiquement la somme", "Ferme Excel", "Change la police"],
    ["Que signifie #DIV/0! ?", "Une division par zéro", "Un nom de fonction faux", "Une colonne trop étroite"],
    ["Que fait =(A1+B1)*C1 ?", "Additionne A1 et B1, puis multiplie par C1", "Multiplie B1 par C1, puis ajoute A1", "Divise A1 par B1"],
    ["Que signifient les $ dans $B$1 ?", "La cellule reste fixe quand on recopie", "Le montant est en dollars", "La cellule est protégée"],
    ["Que signifie #### dans une cellule ?", "La colonne est trop étroite", "Le fichier est abîmé", "Le calcul est faux"],
    ["Quelle formule calcule 16 % de la cellule B2 ?", "=B2*16%", "=B2+16", "=B2/16%"],
  ]),
  quiz(9, "Quiz 9 — Excel : forme et graphique", "Formats, tri et graphique", [
    ["Quel type de graphique montre les parts d'un tout ?", "Secteurs", "Courbes", "Nuage de points"],
    ["Quel type de graphique suit une évolution dans le temps ?", "Courbes", "Secteurs", "Aucun"],
    ["Que faut-il sélectionner avant d'insérer un graphique ?", "Les données, avec leurs titres", "Une cellule vide", "Le nom du fichier"],
    ["Quel onglet permet de trier des données ?", "Données", "Affichage", "Révision"],
    ["À quoi sert un filtre ?", "À n'afficher que les lignes voulues", "À supprimer des lignes", "À imprimer"],
    ["Quel format affiche une monnaie (FC, $) ?", "Monétaire", "Date", "Texte"],
    ["Que fait « Fusionner et centrer » ?", "Réunit plusieurs cellules en une et centre le contenu", "Supprime des cellules", "Additionne des cellules"],
    ["Que faut-il ajouter à un graphique pour qu'il soit clair ?", "Un titre", "Du texte en rouge", "Un deuxième tableau"],
    ["Comment faire tenir un tableau large sur une page ?", "Ajuster à une page de large", "Supprimer les colonnes", "Imprimer deux fois"],
    ["Quel graphique compare bien les ventes de trois mois ?", "Colonnes", "Secteurs", "Aucun des deux"],
  ]),
  quiz(10, "Quiz 10 — PowerPoint : créer", "Diapositives, thème et structure", [
    ["Quelle extension a une présentation PowerPoint ?", ".pptx", ".xlsx", ".docx"],
    ["Quel raccourci ajoute une diapositive ?", "Ctrl + M", "Ctrl + D", "Ctrl + W"],
    ["Combien d'idées par diapositive ?", "Une", "Dix", "Autant que possible"],
    ["Où voit-on les miniatures des diapositives ?", "À gauche de l'écran", "Dans la Corbeille", "Dans l'onglet Révision"],
    ["À quoi sert un thème ?", "À donner la même allure à toutes les diapositives", "À imprimer", "À chronométrer"],
    ["Comment changer l'ordre des diapositives ?", "Faire glisser une miniature", "Supprimer et recommencer", "Appuyer sur F5"],
    ["Quelle disposition convient à la première diapositive ?", "Titre", "Vide", "Deux contenus"],
    ["Quel texte vaut mieux sur une diapositive ?", "Des mots-clés courts", "De longs paragraphes", "Tout le discours"],
    ["Quel onglet contient les thèmes ?", "Création", "Révision", "Diaporama"],
    ["Que faut-il faire avant de présenter ?", "Enregistrer et prévoir une copie de secours", "Éteindre l'écran", "Supprimer les images"],
  ]),
  quiz(11, "Quiz 11 — PowerPoint : diaporama", "Lisibilité, effets et présentation", [
    ["Quelle touche lance le diaporama depuis le début ?", "F5", "F2", "F7"],
    ["Quelle taille minimale pour un texte lisible ?", "24 points environ", "8 points", "10 points"],
    ["Comment quitter le diaporama ?", "Échap", "Ctrl + S", "Tab"],
    ["Qu'est-ce qu'une transition ?", "L'effet entre deux diapositives", "Un type d'image", "Une liste à puces"],
    ["Comment commencer le diaporama depuis la diapositive actuelle ?", "Maj + F5", "Ctrl + F5", "Alt + F5"],
    ["Quel conseil donner sur les animations ?", "Rester sobre, avec un seul style", "En mettre partout", "Utiliser une couleur différente à chaque fois"],
    ["Comment envoyer une présentation sans qu'elle soit facilement modifiée ?", "L'exporter en PDF", "La renommer", "La copier deux fois"],
    ["Quel contraste choisir ?", "Un fort contraste entre le texte et le fond", "Texte gris sur fond gris clair", "Texte jaune sur fond blanc"],
    ["Comment avancer d'une diapositive pendant le diaporama ?", "Flèche droite ou Entrée", "Suppr", "F12"],
    ["Qu'apporte une image bien choisie ?", "Elle remplace plusieurs lignes de texte", "Elle augmente la taille du fichier seulement", "Elle cache le titre"],
  ]),
  quiz(12, "Quiz 12 — Révision du niveau 1", "Windows, Word, Excel et PowerPoint", [
    ["Quel raccourci enregistre dans tous les programmes ?", "Ctrl + S", "Ctrl + E", "Ctrl + Q"],
    ["Quel programme sert à faire un budget avec des calculs ?", "Excel", "Word", "PowerPoint"],
    ["Quel programme sert à écrire une lettre ?", "Word", "Excel", "Windows Sécurité"],
    ["Quel programme sert à préparer un exposé ?", "PowerPoint", "Excel", "L'Explorateur"],
    ["Que fait Ctrl + Z ?", "Annule la dernière action", "Enregistre", "Imprime"],
    ["Où va un fichier supprimé avec Suppr ?", "Dans la Corbeille", "Dans Word", "Dans Excel"],
    ["Combien de copies faut-il pour une bonne sauvegarde (règle 3-2-1) ?", "3", "1", "0"],
    ["Quelle formule additionne les cellules de A1 à A5 ?", "=SOMME(A1:A5)", "=A1:A5", "=PLUS(A1;A5)"],
    ["Quel raccourci met un texte en gras dans Word ?", "Ctrl + G", "Ctrl + B", "Ctrl + A"],
    ["Quel format permet d'envoyer un document non modifiable facilement ?", "PDF", "DOCX", "XLSX"],
  ]),
];

export const final1 = finalQuiz(
  "Quiz final — Niveau 1 Initiation",
  "Windows, fichiers, sécurité, Word, Excel et PowerPoint",
  [
    ["Quel élément affiche les programmes ouverts en bas de l'écran ?", "La barre des tâches", "Le ruban", "La Corbeille"],
    ["Comment éteindre proprement Windows ?", "Démarrer > Alimentation > Arrêter", "Couper le courant", "Fermer le capot sans rien faire"],
    ["Quel raccourci copie un fichier ?", "Ctrl + C", "Ctrl + V", "Ctrl + P"],
    ["Quel raccourci annule la dernière action ?", "Ctrl + Z", "Ctrl + S", "Ctrl + N"],
    ["Où va un fichier supprimé avec Suppr ?", "Dans la Corbeille", "Sur la clé USB", "Dans Excel"],
    ["Que signifie un dossier dans Windows ?", "Un endroit pour ranger des fichiers", "Un virus", "Une extension"],
    ["Quel est un bon mot de passe ?", "Long, avec lettres, chiffres et symboles", "Le prénom", "123456"],
    ["Que faire d'un message qui demande votre mot de passe ?", "Le supprimer et ne pas répondre", "Y répondre vite", "Cliquer sur le lien"],
    ["Quelle règle de sauvegarde est conseillée ?", "3 copies sur 2 supports dont 1 ailleurs", "Une seule copie sur le même disque", "Aucune copie"],
    ["Quel raccourci enregistre un document Word ?", "Ctrl + S", "Ctrl + R", "Ctrl + F4"],
    ["Quelle extension a un document Word ?", ".docx", ".xlsx", ".pptx"],
    ["Quel raccourci centre un paragraphe dans Word ?", "Ctrl + E", "Ctrl + D", "Ctrl + J"],
    ["Que fait F7 dans Word ?", "Lance la vérification orthographique", "Imprime", "Enregistre"],
    ["Que fait Ctrl + P ?", "Ouvre l'aperçu et l'impression", "Copie le texte", "Ferme Windows"],
    ["Par quel signe commence une formule Excel ?", "=", "#", "@"],
    ["Quelle formule calcule la moyenne de B2 à B10 ?", "=MOYENNE(B2:B10)", "=MOY(B2+B10)", "=B2:B10"],
    ["Quel graphique montre les parts d'un tout ?", "Le graphique en secteurs", "La courbe", "Le tableau"],
    ["Quelle touche lance un diaporama depuis le début ?", "F5", "F2", "F7"],
    ["Combien d'idées par diapositive ?", "Une", "Dix", "Vingt"],
    ["Quel format est pratique pour envoyer un document sans qu'il soit modifié ?", "PDF", "Un brouillon", "Une image du bureau"],
  ]
);
