import { lesson, quiz } from "./builders";

// Niveau 3 · Avancé — leçons 1 à 6 : Windows professionnel, collaboration et Word.

export const lessonsA3 = [
  lesson({
    id: 1,
    title: "Windows : sécurité avancée et sauvegarde",
    subtitle: "Protéger ses données de façon professionnelle.",
    sections: [
      {
        heading: "Les comptes utilisateurs",
        body: [
          "Chaque personne devrait avoir son propre compte, avec son mot de passe.",
          "Un compte administrateur peut tout installer ; un compte standard est plus sûr pour le travail de tous les jours.",
          "Verrouillez la session (Windows + L) dès que vous quittez votre poste.",
          "Windows Hello (code PIN, empreinte, visage) : connexion rapide et sûre sur les appareils compatibles.",
        ],
      },
      {
        heading: "Chiffrer et protéger",
        body: [
          "Le chiffrement rend les données illisibles sans la clé : BitLocker (versions Pro) protège le disque d'un ordinateur perdu ou volé.",
          "Gardez la clé de récupération en lieu sûr, hors de l'ordinateur.",
          "Un fichier peut être protégé par un mot de passe dans Word ou Excel : Fichier > Informations > Protéger le document.",
        ],
      },
      {
        heading: "Sauvegarder professionnellement",
        body: [
          "Historique des fichiers : copie automatique de vos dossiers sur un disque externe.",
          "Sauvegarde en ligne (OneDrive) : vos Documents et votre Bureau sont copiés en continu.",
          "Un point de restauration permet de revenir à l'état de Windows d'avant un problème.",
          "Testez vos sauvegardes : une sauvegarde jamais testée n'est pas une sauvegarde.",
        ],
      },
      {
        heading: "Réagir à un incident",
        body: [
          "Un virus suspecté : déconnectez l'ordinateur d'Internet, lancez une analyse complète avec Windows Sécurité.",
          "Une demande de rançon (ransomware) : ne payez pas ; sauvegardes et réinstallation sont la solution.",
          "Compte piraté : changez le mot de passe, activez la validation en deux étapes, prévenez vos contacts.",
        ],
      },
    ],
    caseTitle: "L'ordinateur volé",
    caseLines: [
      "L'ordinateur portable de Pascal est volé dans un taxi. Il contenait les dossiers de ses clients.",
      "Heureusement, le disque était chiffré avec BitLocker et la session protégée par un code.",
      "Toutes ses données étaient aussi sauvegardées sur OneDrive : il les retrouve sur un nouvel ordinateur en une heure.",
      "Il change tous ses mots de passe par précaution.",
    ],
    tasks: [
      "Vérifiez les paramètres de Windows Sécurité et lancez une analyse rapide.",
      "Créez un compte standard et un code PIN sur votre appareil, si possible.",
      "Mettez en place une sauvegarde automatique de vos Documents (OneDrive ou disque externe).",
      "Rédigez une liste de cinq réflexes à avoir en cas de piratage de compte.",
    ],
    goal: "Mettre en place une protection et une sauvegarde professionnelles et réagir à un incident.",
    video: "Windows : sécurité et sauvegarde",
  }),
  lesson({
    id: 2,
    title: "Windows : maintenance et dépannage",
    subtitle: "Garder un ordinateur rapide et résoudre les pannes courantes.",
    sections: [
      {
        heading: "Un ordinateur lent",
        body: [
          "Gestionnaire des tâches (Ctrl + Maj + Échap) : l'onglet Processus montre ce qui consomme le processeur, la mémoire et le disque.",
          "Onglet Démarrage : désactivez les programmes inutiles au démarrage.",
          "Libérez de la place : Paramètres > Système > Stockage, ou l'outil Nettoyage de disque.",
          "Un disque presque plein (moins de 10 % libre) ralentit tout.",
        ],
      },
      {
        heading: "Programmes et mises à jour",
        body: [
          "Désinstaller un programme : Paramètres > Applications.",
          "Windows Update : installez les mises à jour de sécurité régulièrement.",
          "Le gestionnaire de périphériques liste le matériel ; un point d'exclamation jaune signale un problème de pilote.",
        ],
      },
      {
        heading: "Pannes courantes",
        body: [
          "Écran noir : vérifiez le câble, la luminosité, puis redémarrez.",
          "Pas de son : vérifiez le volume, la sortie choisie (haut-parleurs, casque) et les câbles.",
          "Programme qui plante : fermez-le, redémarrez, mettez-le à jour, réinstallez-le en dernier recours.",
          "Mode sans échec : démarre Windows avec le minimum, pour réparer un problème sérieux.",
        ],
      },
      {
        heading: "Prévenir les pannes",
        body: [
          "Protégez l'ordinateur de la poussière, de la chaleur et des coupures : un onduleur ou un parasurtenseur protège des variations de courant.",
          "Ne débranchez jamais un disque externe sans l'éjecter.",
          "Notez la marque, le modèle et le numéro de série de votre matériel.",
        ],
      },
    ],
    caseTitle: "Le bureau qui ralentit",
    caseLines: [
      "Dans un petit bureau, les ordinateurs mettent cinq minutes à démarrer.",
      "Marie ouvre le Gestionnaire des tâches et trouve quinze programmes inutiles au démarrage.",
      "Elle les désactive, nettoie le disque et installe les mises à jour.",
      "Le démarrage passe à moins d'une minute.",
    ],
    tasks: [
      "Ouvrez le Gestionnaire des tâches et classez les processus par utilisation de la mémoire.",
      "Désactivez deux programmes inutiles au démarrage.",
      "Libérez de la place avec l'outil de stockage de Windows.",
      "Notez la marque, le modèle et la version de Windows de votre ordinateur.",
    ],
    goal: "Diagnostiquer et accélérer un ordinateur, et résoudre les pannes courantes.",
    video: "Windows : maintenance et dépannage",
  }),
  lesson({
    id: 3,
    title: "Travail collaboratif en ligne",
    subtitle: "Travailler à plusieurs sur les mêmes documents et se réunir à distance.",
    sections: [
      {
        heading: "Documents partagés",
        body: [
          "Avec OneDrive ou Google Drive, plusieurs personnes peuvent modifier le même document en même temps.",
          "Les modifications de chacun apparaissent en direct, avec la couleur de la personne.",
          "Un lien de partage : choisissez « Peut modifier » ou « Peut afficher » ; limitez-le aux personnes invitées.",
        ],
      },
      {
        heading: "Commentaires et versions",
        body: [
          "Les commentaires (Révision > Nouveau commentaire) permettent de discuter sans toucher au texte.",
          "L'historique des versions permet de revenir à un état précédent du document.",
          "Une règle d'équipe : un seul fichier de référence, au lieu de dix copies par e-mail.",
        ],
      },
      {
        heading: "Réunions en ligne",
        body: [
          "Teams, Zoom, Google Meet : visioconférences avec partage d'écran.",
          "Préparez : testez le micro et la caméra, fermez les programmes inutiles, choisissez un endroit calme.",
          "Coupez votre micro quand vous ne parlez pas. Levez la main (ou utilisez le chat) pour intervenir.",
          "Partagez seulement la fenêtre utile : pas tout votre écran, pour ne pas montrer d'informations privées.",
        ],
      },
      {
        heading: "Communiquer efficacement",
        body: [
          "Un message clair : le sujet, ce que vous demandez, la date limite.",
          "Un e-mail pour une demande formelle, un message instantané pour une question rapide.",
          "Respectez les horaires de travail des autres.",
        ],
      },
    ],
    caseTitle: "Le rapport écrit à trois",
    caseLines: [
      "Esther, David et Joseph rédigent ensemble un rapport, chacun depuis une ville différente.",
      "Ils partagent un seul document en ligne, et laissent leurs commentaires dans les marges.",
      "Une fausse manipulation efface un paragraphe : l'historique des versions le ramène en deux clics.",
      "Une réunion vidéo de vingt minutes règle les derniers points, avec partage de la fenêtre du document.",
    ],
    tasks: [
      "Partagez un document en ligne avec une autre personne en lecture seule, puis en modification.",
      "Ajoutez un commentaire dans un document partagé et répondez à un commentaire.",
      "Retrouvez l'historique des versions d'un document.",
      "Participez à une réunion en ligne et partagez une seule fenêtre.",
    ],
    goal: "Partager et modifier un document à plusieurs et participer à une réunion en ligne.",
    video: "Travail collaboratif : documents partagés et visioconférence",
  }),
  lesson({
    id: 4,
    title: "Word : rapports et mémoires",
    subtitle: "Produire un long document professionnel, structuré et référencé.",
    sections: [
      {
        heading: "Planifier le document",
        body: [
          "Un plan clair : introduction, développement en parties, conclusion, annexes.",
          "Commencez par le plan avec les styles Titre 1, Titre 2, Titre 3 ; rédigez ensuite.",
          "Un style Normal soigné (police, interligne 1,15 à 1,5, espacement après 6 pt) rend tout le texte cohérent.",
        ],
      },
      {
        heading: "Légendes et tables",
        body: [
          "Références > Insérer une légende : numérote automatiquement les figures et les tableaux.",
          "Références > Insérer une table des illustrations : liste de toutes les figures avec leur page.",
          "Références croisées : « voir la Figure 2 » se met à jour tout seul si la numérotation change.",
        ],
      },
      {
        heading: "Citer ses sources",
        body: [
          "Références > Insérer une citation, puis Bibliographie : liste des sources.",
          "Toute idée ou tout chiffre emprunté doit citer son auteur : c'est l'honnêteté intellectuelle, et cela évite le plagiat.",
          "Notes de bas de page pour les précisions, bibliographie pour les sources.",
        ],
      },
      {
        heading: "Une présentation irréprochable",
        body: [
          "Page de garde : titre, auteur, date, organisation.",
          "Sommaire, numéros de page, en-têtes cohérents.",
          "Relisez deux fois : une fois pour le fond, une fois pour la forme.",
          "Exportez en PDF et vérifiez le résultat page par page.",
        ],
      },
    ],
    caseTitle: "Le mémoire de fin d'études",
    caseLines: [
      "Anna rédige son mémoire de 60 pages. Elle construit le plan avec les styles de titre dès le début.",
      "Elle ajoute des légendes à ses tableaux, une table des illustrations et une bibliographie.",
      "À la fin, elle met à jour tous les champs (Ctrl + A puis F9) : sommaire et numéros se corrigent.",
      "Son jury félicite la qualité de la présentation.",
    ],
    tasks: [
      "Construisez le plan d'un rapport de cinq pages avec les styles Titre 1 et Titre 2.",
      "Insérez deux tableaux avec légendes et une table des illustrations.",
      "Ajoutez deux citations et une bibliographie.",
      "Mettez à jour tous les champs avec Ctrl + A puis F9, puis exportez en PDF.",
    ],
    goal: "Rédiger un long rapport structuré avec légendes, références croisées et bibliographie.",
    video: "Word : rapport ou mémoire professionnel",
  }),
  lesson({
    id: 5,
    title: "Word : révision et collaboration",
    subtitle: "Relire à plusieurs, suivre les modifications et protéger un document.",
    sections: [
      {
        heading: "Suivi des modifications",
        body: [
          "Révision > Suivi des modifications : chaque ajout et chaque suppression est visible et attribué à son auteur.",
          "Accepter ou refuser chaque modification, ou toutes d'un coup.",
          "Idéal pour relire le travail d'un collègue sans l'écraser.",
        ],
      },
      {
        heading: "Commentaires",
        body: [
          "Révision > Nouveau commentaire : une remarque attachée à une partie du texte.",
          "On peut répondre à un commentaire et le résoudre quand il est traité.",
          "Soyez précis et poli : « Pouvez-vous préciser ce chiffre ? ».",
        ],
      },
      {
        heading: "Comparer et fusionner",
        body: [
          "Révision > Comparer : montre les différences entre deux versions d'un document.",
          "Révision > Combiner : fusionne les corrections de plusieurs relecteurs.",
        ],
      },
      {
        heading: "Protéger et finaliser",
        body: [
          "Fichier > Informations > Protéger le document : mot de passe, lecture seule, marquer comme final.",
          "Inspecter le document : supprime les métadonnées et commentaires cachés avant l'envoi.",
          "Envoyez la version finale en PDF.",
        ],
      },
    ],
    caseTitle: "Le contrat à relire",
    caseLines: [
      "Un contrat de partenariat doit être relu par trois personnes. Le suivi des modifications est activé.",
      "Chacun corrige et laisse des commentaires. Le directeur accepte ou refuse chaque changement.",
      "Avant l'envoi, Grace inspecte le document, enlève les commentaires et l'exporte en PDF.",
      "Le contrat est signé deux jours plus tard.",
    ],
    tasks: [
      "Activez le suivi des modifications et corrigez un texte.",
      "Ajoutez deux commentaires et répondez à un commentaire.",
      "Acceptez une modification et refusez-en une autre.",
      "Inspectez le document, puis exportez-le en PDF.",
    ],
    goal: "Relire à plusieurs avec le suivi des modifications, les commentaires et la comparaison.",
    video: "Word : suivi des modifications et commentaires",
  }),
  lesson({
    id: 6,
    title: "Word : documents professionnels",
    subtitle: "CV, lettres officielles, formulaires et documents types.",
    sections: [
      {
        heading: "Le CV professionnel",
        body: [
          "Une page (deux au maximum), lisible : identité, profil, expérience, formation, compétences.",
          "Une seule police, des titres de rubriques en gras, des listes à puces courtes.",
          "Informations fiables seulement : ne mentionnez jamais un diplôme ou une expérience que vous n'avez pas.",
        ],
      },
      {
        heading: "La lettre officielle",
        body: [
          "Expéditeur en haut à gauche, destinataire en haut à droite, lieu et date, objet, formule d'appel.",
          "Corps : une idée par paragraphe, ton poli et direct.",
          "Formule de politesse, puis signature avec nom et fonction.",
          "Une lettre d'une page vaut mieux que trois pages floues.",
        ],
      },
      {
        heading: "Formulaires et modèles",
        body: [
          "Onglet Développeur > contrôles de contenu : cases à cocher, listes déroulantes, zones de date.",
          "Un formulaire rempli au clavier évite les fautes d'écriture manuelle.",
          "Enregistrez le formulaire vierge comme modèle et distribuez-le en PDF ou en .docx protégé.",
        ],
      },
      {
        heading: "Organisation des documents",
        body: [
          "Un modèle par type de document de l'entreprise : lettre, facture, devis, compte rendu.",
          "Mêmes polices, mêmes couleurs, même logo : l'image de l'entreprise.",
          "Rangez les modèles dans un dossier partagé que tous peuvent utiliser.",
        ],
      },
    ],
    caseTitle: "La papeterie de l'entreprise",
    caseLines: [
      "Une petite entreprise écrit tous ses courriers de façons différentes. Pascal crée un modèle de lettre avec logo, en-tête et pied de page.",
      "Il crée aussi un modèle de devis et un formulaire de demande avec des cases à cocher.",
      "Tout le monde utilise les modèles, qui sont rangés dans un dossier partagé.",
      "Les documents ont désormais une image soignée et homogène.",
    ],
    tasks: [
      "Réalisez votre CV en une page avec une mise en forme sobre.",
      "Rédigez une lettre de demande officielle dans les règles.",
      "Créez un formulaire simple avec une liste déroulante et une case à cocher.",
      "Enregistrez un modèle de lettre à en-tête de votre organisation.",
    ],
    goal: "Produire des documents professionnels soignés : CV, lettres, formulaires et modèles.",
    video: "Word : CV, lettres officielles et formulaires",
  }),
];

export const quizzesA3 = [
  quiz(1, "Quiz 1 — Sécurité avancée", "Comptes, chiffrement et sauvegarde", [
    ["Quel outil chiffre le disque d'un ordinateur sous Windows Pro ?", "BitLocker", "Paint", "Calculatrice"],
    ["Que faire d'une clé de récupération ?", "La garder en lieu sûr, hors de l'ordinateur", "La coller sur l'écran", "La publier en ligne"],
    ["Quel type de compte est le plus sûr au quotidien ?", "Un compte standard", "Toujours un administrateur", "Un compte sans mot de passe"],
    ["Que permet un point de restauration ?", "Revenir à un état antérieur de Windows", "Sauvegarder des photos", "Accélérer Internet"],
    ["Que faire en cas de rançongiciel (ransomware) ?", "Ne pas payer ; restaurer depuis les sauvegardes", "Payer rapidement", "Envoyer son mot de passe"],
    ["Pourquoi tester ses sauvegardes ?", "Pour s'assurer qu'elles fonctionnent vraiment", "Pour les rendre plus lourdes", "Pour supprimer l'original"],
    ["Quel raccourci verrouille la session ?", "Windows + L", "Windows + D", "Windows + E"],
    ["Que faire d'un compte piraté ?", "Changer le mot de passe et activer la validation en deux étapes", "Ne rien faire", "Le prêter à un ami"],
    ["Qu'est-ce que l'Historique des fichiers ?", "Une copie automatique de dossiers sur un disque externe", "Un antivirus", "Un navigateur"],
    ["Quelle règle simple de sauvegarde retenir ?", "3 copies, 2 supports, dont 1 ailleurs", "Une copie sur le bureau", "Aucune copie pour gagner de la place"],
  ]),
  quiz(2, "Quiz 2 — Maintenance et dépannage", "Ordinateur lent et pannes courantes", [
    ["Où voit-on les programmes qui ralentissent l'ordinateur ?", "Dans le Gestionnaire des tâches", "Dans la Corbeille", "Dans Word"],
    ["Que faire des programmes inutiles au démarrage ?", "Les désactiver", "Les agrandir", "Les imprimer"],
    ["Quel signe dans le gestionnaire de périphériques indique un problème de pilote ?", "Un point d'exclamation jaune", "Un cœur rouge", "Une coche verte"],
    ["Pourquoi libérer de la place sur le disque ?", "Un disque presque plein ralentit l'ordinateur", "Pour changer la couleur de l'écran", "Pour accélérer le clavier"],
    ["Que fait le mode sans échec ?", "Démarre Windows avec le minimum de programmes", "Supprime les fichiers", "Éteint l'écran"],
    ["Comment désinstaller un programme ?", "Paramètres > Applications", "Supprimer son icône du bureau", "Fermer le programme"],
    ["Que protège un onduleur ou parasurtenseur ?", "Contre les coupures et variations de courant", "Contre les virus", "Contre les fautes de frappe"],
    ["Pas de son : première vérification ?", "Le volume et la sortie audio choisie", "La couleur du bureau", "Le nombre de fichiers"],
    ["Pourquoi installer Windows Update ?", "Pour corriger des failles de sécurité", "Pour changer l'écran de démarrage seulement", "Pour supprimer les mots de passe"],
    ["Que faut-il noter sur son matériel ?", "La marque, le modèle et le numéro de série", "Seulement la couleur", "Rien"],
  ]),
  quiz(3, "Quiz 3 — Travail collaboratif", "Documents partagés et réunions", [
    ["Quel avantage apporte un document partagé en ligne ?", "Plusieurs personnes le modifient en même temps", "Il ne peut plus être lu", "Il devient plus lourd"],
    ["Que permet l'historique des versions ?", "Revenir à un état précédent du document", "Imprimer plus vite", "Changer de police"],
    ["Quelle autorisation donner pour que quelqu'un lise sans modifier ?", "« Peut afficher »", "« Peut modifier »", "« Propriétaire »"],
    ["Que faire de son micro quand on ne parle pas ?", "Le couper", "Le laisser ouvert", "Le brancher à l'enceinte"],
    ["Que partager de préférence pendant une réunion ?", "Seulement la fenêtre utile", "Tout l'écran avec tous les messages", "Le mot de passe"],
    ["Quelle règle d'équipe évite la confusion ?", "Un seul fichier de référence", "Dix copies par e-mail", "Un fichier par personne et par jour"],
    ["À quoi servent les commentaires d'un document ?", "Discuter sans toucher au texte", "Supprimer le texte", "Imprimer le document"],
    ["Pour une demande formelle, quel canal est le plus adapté ?", "Un e-mail", "Un message vocal de deux minutes", "Un appel à minuit"],
    ["Que faut-il tester avant une réunion en ligne ?", "Le micro et la caméra", "La couleur du fond d'écran", "Le clavier de l'imprimante"],
    ["Que contient un bon message de travail ?", "Le sujet, la demande et la date limite", "Seulement « bonjour »", "Des majuscules partout"],
  ]),
  quiz(4, "Quiz 4 — Word : rapports et mémoires", "Plan, légendes et bibliographie", [
    ["À quoi sert une légende insérée avec Word ?", "À numéroter automatiquement les figures et les tableaux", "À changer la police", "À imprimer en couleur"],
    ["Que fait une référence croisée ?", "Renvoie à une figure et se met à jour toute seule", "Supprime la figure", "Copie le texte"],
    ["Que fait Ctrl + A puis F9 ?", "Met à jour tous les champs du document", "Ferme Word", "Imprime"],
    ["Pourquoi citer ses sources ?", "Par honnêteté et pour éviter le plagiat", "Pour allonger le document", "Pour changer les marges"],
    ["Quel onglet contient la bibliographie ?", "Références", "Affichage", "Révision"],
    ["Par quoi commencer un long rapport ?", "Par un plan avec les styles de titre", "Par les images", "Par la bibliographie seulement"],
    ["Que contient une page de garde ?", "Titre, auteur, date, organisation", "Seulement des images", "Tout le texte du rapport"],
    ["Qu'est-ce qu'une table des illustrations ?", "La liste des figures avec leurs pages", "Un tableau de calcul", "Une image de fond"],
    ["Combien de relectures faire avant de rendre le document ?", "Au moins deux : fond puis forme", "Aucune", "Une seule, rapide"],
    ["Que faut-il faire avant d'envoyer le rapport final ?", "Exporter en PDF et le vérifier page par page", "Le renommer « test »", "Le supprimer"],
  ]),
  quiz(5, "Quiz 5 — Word : révision et collaboration", "Suivi des modifications et protection", [
    ["À quoi sert le suivi des modifications ?", "À voir et contrôler chaque changement fait par chacun", "À sauvegarder", "À corriger l'orthographe seulement"],
    ["Que peut-on faire d'une modification suivie ?", "L'accepter ou la refuser", "L'imprimer seulement", "La cacher définitivement"],
    ["Quel outil montre les différences entre deux versions ?", "Comparer", "Orthographe", "Insertion de tableau"],
    ["Que fait « Combiner » ?", "Fusionne les corrections de plusieurs relecteurs", "Additionne des nombres", "Ferme le fichier"],
    ["Pourquoi inspecter un document avant l'envoi ?", "Pour supprimer les commentaires et informations cachés", "Pour l'agrandir", "Pour changer son extension"],
    ["Quel format envoie une version finale difficilement modifiable ?", "PDF", "DOCX en mode suivi", "Un brouillon"],
    ["Comment répondre à un commentaire ?", "Avec le bouton Répondre du commentaire", "En supprimant le texte", "Par un autre fichier"],
    ["Que fait « Marquer comme final » ?", "Signale que le document est terminé", "Le verrouille avec mot de passe", "L'envoie par e-mail"],
    ["Dans quel onglet trouve-t-on le suivi des modifications ?", "Révision", "Accueil", "Insertion"],
    ["Quel ton adopter dans un commentaire ?", "Précis et poli", "Agressif", "Sans explication"],
  ]),
  quiz(6, "Quiz 6 — Word : documents professionnels", "CV, lettres et modèles", [
    ["Combien de pages doit faire un CV ?", "Une page, deux au maximum", "Dix pages", "Une demi-ligne"],
    ["Que faut-il éviter dans un CV ?", "Mentionner un diplôme que l'on n'a pas", "Une mise en forme sobre", "Des listes à puces courtes"],
    ["Que contient l'en-tête d'une lettre officielle ?", "Expéditeur, destinataire, lieu, date et objet", "Seulement la signature", "Des images"],
    ["À quoi servent les contrôles de contenu ?", "À créer des formulaires (cases, listes, dates)", "À corriger les fautes", "À insérer un sommaire"],
    ["Pourquoi avoir des modèles de documents ?", "Pour donner une image cohérente à l'entreprise", "Pour rendre les fichiers plus lourds", "Pour éviter d'enregistrer"],
    ["Où ranger les modèles de l'entreprise ?", "Dans un dossier partagé", "Sur le bureau de chaque employé uniquement", "Dans la Corbeille"],
    ["Quelle longueur pour une lettre de demande ?", "Environ une page, claire et directe", "Cinq pages", "Un mot"],
    ["Quelle formule termine une lettre ?", "Une formule de politesse puis la signature", "« Salut »", "Un point d'exclamation"],
    ["Combien de polices dans un CV soigné ?", "Une seule, ou deux au maximum", "Dix", "Une par ligne"],
    ["Comment diffuser un formulaire à remplir ?", "En .docx protégé ou en PDF", "En capture d'écran", "Par téléphone seulement"],
  ]),
];
