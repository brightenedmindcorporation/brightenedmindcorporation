import { finalQuiz, lesson, quiz } from "./builders";

// Niveau 2 · Intermédiaire — leçons 7 à 12 : Excel, PowerPoint et projet.

export const lessonsB2 = [
  lesson({
    id: 7,
    title: "Excel : fonctions logiques et de comptage",
    subtitle: "Faire décider Excel avec SI, ET, OU et compter avec NB.SI et SOMME.SI.",
    sections: [
      {
        heading: "La fonction SI",
        body: [
          "=SI(test; si_vrai; si_faux) : Excel choisit entre deux résultats.",
          "Exemple : =SI(B2>=10;\"Admis\";\"Ajourné\") affiche Admis si la note est 10 ou plus.",
          "Les textes s'écrivent entre guillemets. Les séparateurs sont des points-virgules dans la version française.",
          "Opérateurs de comparaison : = (égal), <> (différent), > , < , >= , <= .",
        ],
      },
      {
        heading: "ET et OU",
        body: [
          "=ET(B2>=10;C2>=10) : vrai seulement si les deux conditions sont vraies.",
          "=OU(B2>=10;C2>=10) : vrai si au moins une condition est vraie.",
          "On les place dans un SI : =SI(ET(B2>=10;C2>=10);\"Admis\";\"Ajourné\").",
        ],
      },
      {
        heading: "Compter et additionner avec condition",
        body: [
          "=NB.SI(plage;critère) : compte les cellules qui respectent le critère. Ex. =NB.SI(C2:C30;\"Admis\").",
          "=SOMME.SI(plage;critère;plage_somme) : additionne selon un critère. Ex. =SOMME.SI(A2:A50;\"Cahier\";C2:C50).",
          "=NB(plage) compte les nombres. =NBVAL(plage) compte les cellules non vides.",
        ],
      },
      {
        heading: "Le texte",
        body: [
          "L'opérateur & colle des textes : =A2&\" \"&B2 donne « Marie Kasongo ».",
          "=GAUCHE(A2;3) prend les 3 premières lettres. =DROITE(A2;2) les 2 dernières.",
          "=MAJUSCULE(A2) met en majuscules. =NOMPROPRE(A2) met une majuscule à chaque mot.",
        ],
      },
    ],
    caseTitle: "Le bulletin de la classe",
    caseLines: [
      "Un professeur gère les notes de 40 élèves. Il veut savoir d'un coup d'œil qui est admis.",
      "Il écrit =SI(B2>=10;\"Admis\";\"Ajourné\") dans une colonne et recopie la formule vers le bas.",
      "Avec =NB.SI(C2:C41;\"Admis\"), il compte tout de suite le nombre d'admis.",
      "Il colle prénom et nom avec & pour éditer une liste propre.",
    ],
    tasks: [
      "Créez un tableau de notes de dix élèves et écrivez une formule SI pour l'admission.",
      "Comptez les admis avec NB.SI et calculez la moyenne des admis.",
      "Créez une colonne qui colle prénom et nom avec l'opérateur &.",
      "Écrivez un SI avec ET pour exiger deux notes supérieures ou égales à 10.",
    ],
    goal: "Écrire des formules SI, ET, OU, NB.SI et SOMME.SI et manipuler du texte.",
    video: "Excel : la fonction SI et NB.SI",
  }),
  lesson({
    id: 8,
    title: "Excel : références, RECHERCHEV et dates",
    subtitle: "Comprendre les références et chercher une valeur dans un tableau.",
    sections: [
      {
        heading: "Références relatives et absolues",
        body: [
          "Relative (A1) : change quand on recopie la formule.",
          "Absolue ($A$1) : reste fixe. La touche F4 ajoute les $.",
          "Mixte ($A1 ou A$1) : fixe seulement la colonne ou seulement la ligne.",
          "Exemple : =B2*$F$1 recopié vers le bas garde toujours le taux de la cellule F1.",
        ],
      },
      {
        heading: "RECHERCHEV",
        body: [
          "=RECHERCHEV(valeur_cherchée; tableau; n°_colonne; FAUX) : cherche une valeur dans la première colonne d'un tableau et renvoie une autre colonne.",
          "Exemple : retrouver le prix d'un article à partir de son code.",
          "FAUX (ou 0) demande une correspondance exacte : mettez-le presque toujours.",
          "L'erreur #N/A veut dire que la valeur cherchée n'existe pas dans la première colonne.",
        ],
      },
      {
        heading: "Les dates",
        body: [
          "Excel stocke une date comme un nombre : on peut la calculer.",
          "=AUJOURDHUI() donne la date du jour. =B2-A2 donne le nombre de jours entre deux dates.",
          "=ANNEE(A2), =MOIS(A2), =JOUR(A2) extraient une partie de la date.",
          "Format de cellule > Date : choisissez l'affichage 24/10/2026 ou « 24 octobre 2026 ».",
        ],
      },
      {
        heading: "Les erreurs courantes",
        body: [
          "#REF! : une cellule référencée a été supprimée.",
          "#N/A : valeur introuvable.",
          "#NOM? : nom de fonction mal écrit.",
          "Lisez le message : il dit presque toujours où est le problème.",
        ],
      },
    ],
    caseTitle: "La boutique de pièces",
    caseLines: [
      "David a une liste de 300 articles avec un code et un prix. À chaque vente, il tape seulement le code.",
      "Avec RECHERCHEV, Excel retrouve automatiquement le nom et le prix de l'article.",
      "Il fixe la cellule de la TVA avec $F$1 pour recopier la formule sur toutes les lignes.",
      "Il suit les échéances de paiement en calculant des écarts de dates.",
    ],
    tasks: [
      "Créez une table de cinq articles avec code et prix sur une feuille « Tarifs ».",
      "Sur une autre feuille, tapez un code et récupérez le prix avec RECHERCHEV.",
      "Utilisez une référence absolue pour appliquer un taux de TVA à toute une colonne.",
      "Calculez le nombre de jours entre aujourd'hui et une date d'échéance.",
    ],
    goal: "Utiliser les références absolues, RECHERCHEV et les calculs de dates.",
    video: "Excel : RECHERCHEV pas à pas",
  }),
  lesson({
    id: 9,
    title: "Excel : gérer des tableaux de données",
    subtitle: "Trier, filtrer, mettre en valeur et contrôler la saisie.",
    sections: [
      {
        heading: "Préparer ses données",
        body: [
          "Une ligne = un enregistrement. Une colonne = une information. Un titre par colonne.",
          "Pas de cellule fusionnée ni de ligne vide au milieu : cela gêne le tri et les filtres.",
          "Insertion > Tableau (Ctrl + T) : Excel étend automatiquement le tableau et ajoute les filtres.",
        ],
      },
      {
        heading: "Trier et filtrer",
        body: [
          "Trier sur plusieurs niveaux : par ville, puis par nom.",
          "Filtrer : cochez les valeurs à afficher. Les filtres textuels et numériques permettent « supérieur à », « contient »…",
          "Pour effacer les filtres : Données > Effacer.",
        ],
      },
      {
        heading: "Mise en forme conditionnelle",
        body: [
          "Accueil > Mise en forme conditionnelle : colore automatiquement selon la valeur.",
          "Exemples : notes inférieures à 10 en rouge, ventes élevées en vert, doublons en jaune.",
          "Barres de données et jeux d'icônes : une lecture visuelle immédiate.",
        ],
      },
      {
        heading: "Validation et volets figés",
        body: [
          "Données > Validation des données : limite ce qu'on peut saisir (nombre entre 0 et 20, liste déroulante).",
          "Une liste déroulante évite les fautes de frappe (« Kolwezi » écrit de 5 façons).",
          "Affichage > Figer les volets : la ligne des titres reste visible quand on descend.",
        ],
      },
    ],
    caseTitle: "Le registre des membres",
    caseLines: [
      "Une association gère 500 membres dans Excel. Les villes sont écrites de plusieurs manières, ce qui rend les statistiques fausses.",
      "Elle ajoute une liste déroulante de villes et supprime les doublons.",
      "Elle fige la ligne des titres et filtre les membres d'une ville en un clic.",
      "La mise en forme conditionnelle met en rouge les cotisations en retard.",
    ],
    tasks: [
      "Transformez une plage de données en tableau avec Ctrl + T.",
      "Triez par ville puis par nom, puis filtrez une ville.",
      "Mettez en rouge les valeurs inférieures à 10 avec la mise en forme conditionnelle.",
      "Ajoutez une liste déroulante dans une colonne et figez la ligne de titres.",
    ],
    goal: "Organiser, trier, filtrer et contrôler un tableau de données.",
    video: "Excel : tableaux, filtres et validation des données",
  }),
  lesson({
    id: 10,
    title: "Excel : premiers tableaux croisés dynamiques",
    subtitle: "Résumer en quelques clics une grande liste de données.",
    sections: [
      {
        heading: "À quoi sert un tableau croisé dynamique ?",
        body: [
          "Il résume une longue liste : total des ventes par produit, par mois, par vendeur.",
          "On n'écrit aucune formule : on glisse des champs dans des zones.",
          "Les données d'origine ne sont pas modifiées.",
        ],
      },
      {
        heading: "Le créer",
        body: [
          "Cliquez dans le tableau de données puis Insertion > Tableau croisé dynamique.",
          "Une nouvelle feuille s'ouvre avec la liste des champs.",
          "Les quatre zones : Lignes, Colonnes, Valeurs, Filtres.",
        ],
      },
      {
        heading: "Un exemple",
        body: [
          "Champ « Produit » dans Lignes. Champ « Montant » dans Valeurs : le total par produit s'affiche.",
          "Ajoutez « Mois » dans Colonnes : un tableau croisé complet apparaît.",
          "Clic droit sur une valeur > Résumer les valeurs par : Somme, Nombre, Moyenne.",
        ],
      },
      {
        heading: "Actualiser et illustrer",
        body: [
          "Si les données changent : clic droit sur le tableau croisé > Actualiser.",
          "Insertion > Graphique croisé dynamique : un graphique lié au tableau.",
          "Un titre clair et des couleurs sobres rendent le graphique convaincant.",
        ],
      },
    ],
    caseTitle: "Le bilan de l'année",
    caseLines: [
      "Grace a 2 000 lignes de ventes. Son patron demande le total par produit et par mois pour la réunion de demain.",
      "En trois minutes, elle crée un tableau croisé dynamique et un graphique.",
      "Elle découvre que deux produits font la moitié du chiffre d'affaires.",
      "La direction décide de concentrer l'effort sur ces deux produits.",
    ],
    tasks: [
      "Préparez une liste de 20 ventes avec Produit, Mois et Montant.",
      "Créez un tableau croisé dynamique qui donne le total par produit.",
      "Ajoutez les mois en colonnes et changez en moyenne au lieu de somme.",
      "Insérez un graphique croisé dynamique et donnez-lui un titre.",
    ],
    goal: "Créer un tableau croisé dynamique et un graphique associé.",
    video: "Excel : tableau croisé dynamique pour débutants",
  }),
  lesson({
    id: 11,
    title: "PowerPoint : masque, graphiques et SmartArt",
    subtitle: "Donner une identité à ses présentations et illustrer des données.",
    sections: [
      {
        heading: "Le masque des diapositives",
        body: [
          "Affichage > Masque des diapositives : on y règle la police, les couleurs et le logo pour toutes les diapositives.",
          "Mettre le logo une seule fois sur le masque évite de le copier sur chaque diapositive.",
          "Fermez ensuite le mode Masque pour revenir au travail normal.",
        ],
      },
      {
        heading: "SmartArt",
        body: [
          "Insertion > SmartArt : transforme une liste en schéma (processus, hiérarchie, cycle).",
          "Utile pour montrer des étapes, un organigramme, un plan.",
          "Gardez peu d'éléments : 3 à 6.",
        ],
      },
      {
        heading: "Tableaux et graphiques",
        body: [
          "Insertion > Tableau pour des données simples. Insertion > Graphique pour des chiffres.",
          "On peut coller un graphique Excel : il garde sa mise en forme.",
          "Un graphique par diapositive, avec un titre qui donne la conclusion (« Les ventes ont doublé »).",
        ],
      },
      {
        heading: "Préparer la présentation",
        body: [
          "Diaporama > Chronométrer : répétez et enregistrez le minutage réel.",
          "Les notes du présentateur (sous la diapositive) contiennent ce que vous voulez dire.",
          "Mode Présentateur : vous voyez les notes, le public voit la diapositive.",
        ],
      },
    ],
    caseTitle: "La présentation de l'entreprise",
    caseLines: [
      "Ruth prépare une présentation de dix diapositives pour des clients. Elle place le logo sur le masque et choisit deux couleurs.",
      "Elle transforme sa liste d'étapes en schéma SmartArt et colle un graphique des ventes depuis Excel.",
      "Elle écrit ses notes sous chaque diapositive et répète en chronométrant.",
      "Le jour de la présentation, tout est fluide et professionnel.",
    ],
    tasks: [
      "Ouvrez le masque des diapositives, changez la police des titres et ajoutez un logo.",
      "Transformez une liste de quatre étapes en SmartArt.",
      "Collez un graphique créé dans Excel dans une diapositive.",
      "Ajoutez des notes de présentateur et chronométrez votre présentation.",
    ],
    goal: "Utiliser le masque, SmartArt, les graphiques et le chronométrage dans PowerPoint.",
    video: "PowerPoint : masque, SmartArt et graphiques",
  }),
  lesson({
    id: 12,
    title: "Révision du niveau 2 et projet",
    subtitle: "Un dossier complet : rapport, tableau de gestion et présentation.",
    sections: [
      {
        heading: "Ce que vous savez faire maintenant",
        body: [
          "Windows : rechercher, utiliser les raccourcis, capturer l'écran, gérer l'e-mail, le cloud et les petits dépannages.",
          "Word : styles, sommaire, en-têtes, pieds de page, publipostage et modèles.",
          "Excel : SI, ET, OU, NB.SI, SOMME.SI, RECHERCHEV, dates, filtres, mise en forme conditionnelle, tableaux croisés dynamiques.",
          "PowerPoint : masque, SmartArt, graphiques, chronométrage.",
        ],
      },
      {
        heading: "Le projet : le dossier d'une petite entreprise",
        body: [
          "Étape 1 (Excel) : une liste de 30 ventes avec Produit, Mois, Montant ; un tableau croisé dynamique par produit.",
          "Étape 2 (Excel) : une feuille « Tarifs » et une recherche avec RECHERCHEV.",
          "Étape 3 (Word) : un rapport de trois pages avec styles de titre, sommaire automatique et numéros de page.",
          "Étape 4 (PowerPoint) : huit diapositives avec masque, graphique et SmartArt.",
          "Étape 5 : exportez le rapport en PDF et rangez tout dans un dossier clair, sauvegardé sur le cloud et sur une clé USB.",
        ],
      },
      {
        heading: "Bonnes habitudes professionnelles",
        body: [
          "Nommez vos fichiers de façon claire : « Rapport-ventes-2026-10.docx ».",
          "Relisez toujours avant d'envoyer.",
          "Gardez une version par date quand un document change souvent.",
        ],
      },
      {
        heading: "Et après ?",
        body: [
          "Le niveau 3 prépare au travail professionnel : fonctions avancées, tableaux de bord, collaboration en ligne et sécurité.",
        ],
      },
    ],
    caseTitle: "Le dossier de Joseph",
    caseLines: [
      "Joseph lance un petit commerce et doit présenter ses chiffres à un partenaire.",
      "Il analyse ses ventes avec un tableau croisé, écrit un rapport clair dans Word et prépare une présentation de huit diapositives.",
      "Il envoie le rapport en PDF et présente son travail avec assurance.",
      "Le partenaire accepte de travailler avec lui.",
    ],
    tasks: [
      "Réalisez les cinq étapes du projet.",
      "Vérifiez que chaque document a un nom clair et se trouve dans le bon dossier.",
      "Faites relire votre rapport par une personne de confiance.",
      "Présentez votre travail en chronométrant votre exposé.",
    ],
    goal: "Réaliser un dossier complet qui combine Excel, Word et PowerPoint.",
    video: "Révision niveau 2 : projet complet",
  }),
];

export const quizzesB2 = [
  quiz(7, "Quiz 7 — Excel : SI et comptage", "Fonctions logiques et de comptage", [
    ["Que fait =SI(B2>=10;\"Admis\";\"Ajourné\") si B2 vaut 12 ?", "Affiche Admis", "Affiche Ajourné", "Affiche une erreur"],
    ["Quelle fonction compte les cellules qui respectent un critère ?", "NB.SI", "SOMME", "MIN"],
    ["Quelle fonction additionne selon un critère ?", "SOMME.SI", "MOYENNE", "NBVAL"],
    ["Quel séparateur utilise-t-on dans les formules en version française ?", "Le point-virgule", "Les deux-points", "Le tiret"],
    ["Que signifie <> ?", "Différent de", "Égal à", "Supérieur à"],
    ["Quelle fonction est vraie seulement si les deux conditions sont vraies ?", "ET", "OU", "SI"],
    ["Quel opérateur colle deux textes ?", "&", "+", "#"],
    ["Que renvoie =GAUCHE(A2;3) ?", "Les 3 premiers caractères", "Les 3 derniers caractères", "Le mot 3"],
    ["Comment écrit-on un texte dans une formule ?", "Entre guillemets", "Entre crochets", "Sans rien"],
    ["Quelle fonction compte les cellules non vides ?", "NBVAL", "NB.SI", "MAX"],
  ]),
  quiz(8, "Quiz 8 — Excel : RECHERCHEV et dates", "Références et recherche", [
    ["Que fait la touche F4 sur une référence ?", "Ajoute les $ pour la rendre absolue", "Supprime la cellule", "Imprime la feuille"],
    ["Que signifie $A$1 ?", "Une référence qui ne change pas à la recopie", "Une référence en dollars", "Une cellule protégée"],
    ["Quel dernier argument faut-il en général dans RECHERCHEV ?", "FAUX (correspondance exacte)", "VRAI", "0,5"],
    ["Où RECHERCHEV cherche-t-elle la valeur ?", "Dans la première colonne du tableau", "Dans la dernière colonne", "Dans toute la feuille"],
    ["Que veut dire l'erreur #N/A ?", "La valeur cherchée est introuvable", "Le fichier est abîmé", "La colonne est trop étroite"],
    ["Quelle fonction donne la date du jour ?", "AUJOURDHUI", "MAINTENANT_JOUR", "DATE_ACTUELLE"],
    ["Comment calculer le nombre de jours entre deux dates ?", "En soustrayant les deux dates", "En les additionnant", "En les multipliant"],
    ["Que signifie #REF! ?", "Une cellule référencée a été supprimée", "Un nom de fonction faux", "Une division par zéro"],
    ["Quelle fonction extrait l'année d'une date ?", "ANNEE", "JOUR", "TEXTE"],
    ["Pourquoi utiliser une référence absolue pour un taux de TVA ?", "Pour recopier la formule en gardant le même taux", "Pour cacher le taux", "Pour changer la police"],
  ]),
  quiz(9, "Quiz 9 — Excel : tableaux de données", "Tri, filtre et validation", [
    ["Quel raccourci transforme une plage en tableau ?", "Ctrl + T", "Ctrl + L", "Ctrl + K"],
    ["À quoi sert une liste déroulante de validation ?", "À éviter les fautes de saisie", "À imprimer", "À protéger le fichier"],
    ["À quoi sert « Figer les volets » ?", "Garder les titres visibles quand on descend", "Verrouiller le fichier", "Supprimer des lignes"],
    ["Que fait la mise en forme conditionnelle ?", "Colore automatiquement selon la valeur", "Corrige les formules", "Trie les colonnes"],
    ["Que peut gêner une cellule fusionnée dans une liste de données ?", "Le tri et les filtres", "L'impression en couleur", "La sauvegarde"],
    ["Que fait un tri sur plusieurs niveaux ?", "Trie d'abord par une colonne puis par une autre", "Supprime les doublons", "Cache les titres"],
    ["Comment retirer tous les filtres ?", "Données > Effacer", "Fermer Excel", "Supprimer la feuille"],
    ["Quelle règle de présentation convient à une liste de données ?", "Une ligne par enregistrement, un titre par colonne", "Plusieurs informations par cellule", "Des lignes vides entre chaque ligne"],
    ["Que peut limiter la validation des données ?", "Les valeurs que l'on peut saisir", "La taille de l'écran", "La couleur des cellules"],
    ["Comment repérer les doublons ?", "Mise en forme conditionnelle > Valeurs en double", "Ctrl + D", "En imprimant"],
  ]),
  quiz(10, "Quiz 10 — Tableaux croisés dynamiques", "Résumer des données", [
    ["À quoi sert un tableau croisé dynamique ?", "À résumer une longue liste de données", "À écrire une lettre", "À protéger une feuille"],
    ["Où le trouve-t-on ?", "Insertion > Tableau croisé dynamique", "Révision > Commentaire", "Fichier > Fermer"],
    ["Quelles sont les zones d'un tableau croisé ?", "Lignes, Colonnes, Valeurs, Filtres", "Haut, Bas, Droite, Gauche", "Titre, Image, Notes, Pied"],
    ["Que faut-il faire si les données d'origine changent ?", "Actualiser le tableau croisé", "Le supprimer", "Redémarrer l'ordinateur"],
    ["Les données d'origine sont-elles modifiées par le tableau croisé ?", "Non", "Oui, toujours", "Seulement les nombres"],
    ["Quel champ met-on dans Valeurs pour obtenir un total ?", "Un champ numérique, comme Montant", "Un champ de texte, comme Nom", "N'importe quel titre"],
    ["Comment passer de la somme à la moyenne ?", "Clic droit > Résumer les valeurs par", "Supprimer la colonne", "Fermer le fichier"],
    ["Que peut-on ajouter au tableau croisé pour l'illustrer ?", "Un graphique croisé dynamique", "Une image du bureau", "Un son"],
    ["Que faut-il écrire pour faire un tableau croisé ?", "Aucune formule : on glisse des champs", "Dix formules RECHERCHEV", "Une macro"],
    ["Dans quel cas le tableau croisé est-il particulièrement utile ?", "Quand il y a beaucoup de lignes à résumer", "Quand il n'y a que 3 lignes", "Quand le fichier est vide"],
  ]),
  quiz(11, "Quiz 11 — PowerPoint avancé", "Masque, SmartArt et préparation", [
    ["Où règle-t-on la police et le logo pour toutes les diapositives ?", "Dans le masque des diapositives", "Dans chaque diapositive", "Dans les notes"],
    ["À quoi sert SmartArt ?", "À transformer une liste en schéma", "À corriger l'orthographe", "À imprimer en PDF"],
    ["Combien d'éléments convient-il de garder dans un SmartArt ?", "3 à 6", "30", "50"],
    ["Que fait « Chronométrer » ?", "Enregistre la durée réelle de chaque diapositive", "Accélère l'ordinateur", "Supprime les animations"],
    ["Où écrit-on ses notes de présentateur ?", "Sous la diapositive", "Dans le ruban", "Dans le masque"],
    ["Que voit le public en mode Présentateur ?", "Seulement la diapositive", "Les notes et la liste des diapositives", "Le bureau de l'ordinateur"],
    ["Quel titre est le plus efficace sur un graphique ?", "Une conclusion claire (« Les ventes ont doublé »)", "« Graphique 1 »", "Le nom du fichier"],
    ["Combien de graphiques par diapositive ?", "Un seul, de préférence", "Dix", "Autant que possible"],
    ["Comment mettre le logo sur toutes les diapositives ?", "Une seule fois, sur le masque", "En le copiant sur chaque diapositive à la main", "Dans la barre des tâches"],
    ["Peut-on coller un graphique Excel dans PowerPoint ?", "Oui", "Non, jamais", "Seulement en PDF"],
  ]),
  quiz(12, "Quiz 12 — Révision du niveau 2", "Windows, Word, Excel et PowerPoint", [
    ["Quelle fonction cherche un prix à partir d'un code ?", "RECHERCHEV", "SOMME", "MAX"],
    ["Quel outil construit automatiquement un sommaire Word ?", "Les styles de titre et la table des matières", "Le pinceau", "Le correcteur"],
    ["Quel outil envoie un courrier personnalisé à 200 personnes ?", "Le publipostage", "Le tableau croisé", "Le diaporama"],
    ["Quel outil résume 2 000 lignes de ventes ?", "Le tableau croisé dynamique", "Le pinceau", "Le Bluetooth"],
    ["Quel raccourci ouvre le Gestionnaire des tâches ?", "Ctrl + Maj + Échap", "Alt + Tab", "Ctrl + T"],
    ["Quelle bonne habitude garde vos documents en sécurité ?", "Sauvegarder sur le cloud et sur une clé USB", "Garder une seule copie", "Les mettre sur le bureau"],
    ["Quelle fonction compte les cellules égales à « Admis » ?", "NB.SI", "NBVAL", "SOMME"],
    ["Où met-on le logo de l'entreprise pour toute une présentation ?", "Dans le masque des diapositives", "Sur chaque diapositive", "Dans la Corbeille"],
    ["Quel format est conseillé pour envoyer un rapport final ?", "PDF", "Capture d'écran", "Brouillon"],
    ["Quel nom de fichier est le plus clair ?", "Rapport-ventes-2026-10.docx", "Nouveau document (3).docx", "aaa.docx"],
  ]),
];

export const final2 = finalQuiz(
  "Quiz final — Niveau 2 Intermédiaire",
  "Internet, Word avancé, Excel et PowerPoint",
  [
    ["Quel raccourci capture une zone de l'écran ?", "Windows + Maj + S", "Windows + L", "Ctrl + Alt + C"],
    ["Que signifie « Cci » dans un e-mail ?", "Copie cachée", "Copie carbone intégrale", "Courrier confidentiel"],
    ["Que faire si un programme est figé ?", "Fin de tâche dans le Gestionnaire des tâches", "Débrancher l'ordinateur", "Réinstaller Windows"],
    ["Qu'apporte la validation en deux étapes ?", "Un code supplémentaire pour protéger le compte", "Un écran plus rapide", "Une imprimante de plus"],
    ["À quoi sert un style de titre dans Word ?", "À mettre en forme et à construire le sommaire", "À imprimer plus vite", "À corriger les fautes"],
    ["Comment mettre à jour un sommaire ?", "Clic droit > Mettre à jour le champ", "Le retaper", "Appuyer sur Échap"],
    ["Que permet le publipostage ?", "Envoyer un courrier personnalisé à plusieurs personnes", "Traduire un texte", "Faire un graphique"],
    ["Quel raccourci insère un saut de page ?", "Ctrl + Entrée", "Ctrl + Tab", "Ctrl + Maj + P"],
    ["Que renvoie =SI(B2>=10;\"Admis\";\"Ajourné\") si B2 vaut 8 ?", "Ajourné", "Admis", "Une erreur"],
    ["Quelle fonction compte selon un critère ?", "NB.SI", "SOMME", "ANNEE"],
    ["Que fait la touche F4 sur une référence ?", "Ajoute les $", "Supprime la cellule", "Imprime"],
    ["Que veut dire #N/A avec RECHERCHEV ?", "La valeur cherchée est introuvable", "Le fichier est abîmé", "La colonne est trop étroite"],
    ["Quel raccourci transforme des données en tableau ?", "Ctrl + T", "Ctrl + L", "Ctrl + K"],
    ["Que fait la mise en forme conditionnelle ?", "Colore automatiquement selon la valeur", "Corrige les formules", "Trie les colonnes"],
    ["Où trouve-t-on le tableau croisé dynamique ?", "Insertion > Tableau croisé dynamique", "Révision > Commentaire", "Fichier > Fermer"],
    ["Quelles sont les zones d'un tableau croisé ?", "Lignes, Colonnes, Valeurs, Filtres", "Haut, Bas, Droite, Gauche", "Titre, Image, Notes, Pied"],
    ["Où règle-t-on la police et le logo pour toutes les diapositives ?", "Dans le masque des diapositives", "Dans chaque diapositive", "Dans les notes"],
    ["À quoi sert SmartArt ?", "À transformer une liste en schéma", "À corriger l'orthographe", "À imprimer en PDF"],
    ["Quel titre est le plus efficace sur un graphique ?", "Une conclusion claire (« Les ventes ont doublé »)", "« Graphique 1 »", "Le nom du fichier"],
    ["Quel format est conseillé pour envoyer un rapport final ?", "PDF", "Une capture d'écran", "Un brouillon"],
  ]
);
