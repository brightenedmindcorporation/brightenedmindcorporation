import { lesson, quiz } from "./builders";

// Niveau 2 · Intermédiaire — leçons 1 à 6 : Windows, Internet et Word.

export const lessonsA2 = [
  lesson({
    id: 1,
    title: "Windows : organiser son travail",
    subtitle: "Travailler plus vite : recherche, raccourcis, captures d'écran et bureaux multiples.",
    sections: [
      {
        heading: "Retrouver un fichier",
        body: [
          "La barre de recherche de la barre des tâches cherche dans l'ordinateur et dans les programmes.",
          "Dans l'Explorateur de fichiers, tapez le nom dans la zone de recherche en haut à droite.",
          "Le joker * remplace plusieurs lettres : *.docx affiche tous les documents Word.",
          "Triez les fichiers par date de modification pour retrouver votre dernier travail.",
        ],
      },
      {
        heading: "Raccourcis de Windows",
        body: [
          "Windows + E : Explorateur de fichiers. Windows + D : afficher le bureau. Windows + L : verrouiller la session.",
          "Windows + flèches : placer une fenêtre à gauche ou à droite pour travailler sur deux documents côte à côte.",
          "Windows + V : historique du presse-papiers. Windows + Tab : vue de toutes les fenêtres et bureaux.",
          "Ctrl + Maj + Échap : ouvre le Gestionnaire des tâches.",
        ],
      },
      {
        heading: "Captures d'écran",
        body: [
          "Windows + Maj + S : capturer une zone de l'écran, qui va dans le presse-papiers.",
          "Touche Impr écran : capture tout l'écran.",
          "Collez ensuite la capture (Ctrl + V) dans Word ou PowerPoint.",
        ],
      },
      {
        heading: "Personnaliser et organiser",
        body: [
          "Épinglez vos programmes préférés à la barre des tâches (clic droit > Épingler).",
          "Paramètres (Windows + I) : affichage, son, réseau, comptes, mises à jour.",
          "Les bureaux virtuels séparent le travail et les loisirs : Windows + Ctrl + D en crée un.",
        ],
      },
    ],
    caseTitle: "La rédactrice pressée",
    caseLines: [
      "Ruth prépare un rapport et doit comparer deux documents. Elle les place côte à côte avec Windows + flèches.",
      "Elle retrouve un vieux fichier en tapant son nom dans la recherche et en triant par date.",
      "Elle capture un graphique avec Windows + Maj + S et le colle directement dans son rapport.",
      "Elle gagne ainsi près d'une heure par semaine.",
    ],
    tasks: [
      "Trouvez tous les fichiers .docx de votre ordinateur avec la recherche.",
      "Placez deux fenêtres côte à côte avec Windows + flèches.",
      "Faites une capture d'écran d'une zone et collez-la dans un document Word.",
      "Épinglez trois programmes à la barre des tâches.",
    ],
    goal: "Rechercher efficacement, utiliser les raccourcis Windows et faire des captures d'écran.",
    video: "Windows : astuces et raccourcis",
  }),
  lesson({
    id: 2,
    title: "Windows : Internet, e-mail et cloud",
    subtitle: "Naviguer sans danger, envoyer des e-mails professionnels et utiliser le stockage en ligne.",
    sections: [
      {
        heading: "Le navigateur",
        body: [
          "Un navigateur (Edge, Chrome, Firefox) permet d'ouvrir des sites web.",
          "Ctrl + T : nouvel onglet. Ctrl + W : fermer l'onglet. Ctrl + D : ajouter aux favoris.",
          "Pour chercher, écrivez des mots-clés précis ; mettez une expression entre guillemets pour la trouver telle quelle.",
          "Téléchargez uniquement depuis les sites officiels ; vérifiez toujours le dossier « Téléchargements ».",
        ],
      },
      {
        heading: "L'e-mail professionnel",
        body: [
          "Une adresse sérieuse : prenom.nom@... plutôt qu'un surnom.",
          "Objet clair et court : « Demande de stage — Marie Kasongo ».",
          "Commencez par une formule de politesse, rédigez court, relisez, puis terminez par votre nom et votre téléphone.",
          "Pièce jointe : cliquez sur le trombone ; vérifiez le nom du fichier et sa taille (souvent limitée à 20 Mo).",
          "À : destinataire. Cc : en copie visible. Cci : en copie cachée (pour un envoi groupé).",
        ],
      },
      {
        heading: "Le cloud",
        body: [
          "Le cloud, c'est du stockage sur Internet : OneDrive, Google Drive.",
          "Avantages : accessible depuis tous vos appareils et protégé en cas de panne de l'ordinateur.",
          "Partager : clic droit > Partager, puis choisissez qui peut seulement lire ou aussi modifier.",
        ],
      },
      {
        heading: "Bonnes pratiques en ligne",
        body: [
          "Déconnectez-vous d'un ordinateur public (cybercafé) et n'enregistrez pas votre mot de passe.",
          "Activez la validation en deux étapes sur votre e-mail : un code reçu par téléphone s'ajoute au mot de passe.",
          "Ne diffusez jamais de photo ou d'information privée sans réfléchir : ce qui est en ligne reste.",
        ],
      },
    ],
    caseTitle: "La candidature de Paul",
    caseLines: [
      "Paul envoie sa candidature à une entreprise. Il choisit l'objet « Candidature stagiaire — Paul Mbuyi ».",
      "Il joint son CV en PDF et sa lettre, et vérifie que la taille totale est inférieure à 20 Mo.",
      "Il enregistre une copie de ses documents sur OneDrive pour les retrouver depuis son téléphone.",
      "Trois jours plus tard, il reçoit une invitation à un entretien.",
    ],
    tasks: [
      "Ouvrez un navigateur, ajoutez trois sites utiles à vos favoris et classez-les dans un dossier.",
      "Rédigez un e-mail de candidature avec un objet clair, un CV en pièce jointe et une signature.",
      "Envoyez un fichier à vous-même en pièce jointe, puis téléchargez-le.",
      "Téléversez un dossier sur un stockage en ligne et partagez-le en lecture seule.",
    ],
    goal: "Naviguer prudemment, écrire un e-mail professionnel avec pièce jointe et utiliser le cloud.",
    video: "Internet, e-mail et cloud pour débutants",
  }),
  lesson({
    id: 3,
    title: "Windows : imprimantes, réseau et dépannage",
    subtitle: "Connecter des appareils et résoudre les petits problèmes courants.",
    sections: [
      {
        heading: "Imprimer",
        body: [
          "Paramètres > Bluetooth et appareils > Imprimantes et scanners > Ajouter un appareil.",
          "Avant d'imprimer, choisissez la bonne imprimante par défaut et vérifiez le papier et l'encre.",
          "Une impression bloquée : ouvrez la file d'attente, annulez le document, puis recommencez.",
        ],
      },
      {
        heading: "Le réseau Wi-Fi",
        body: [
          "Cliquez sur l'icône Wi-Fi de la zone de notification, choisissez le réseau, saisissez la clé.",
          "Un réseau public n'est pas sûr : évitez d'y saisir un mot de passe ou des informations bancaires.",
          "Mode avion : coupe le Wi-Fi et le Bluetooth ; utile pour économiser la batterie.",
        ],
      },
      {
        heading: "Périphériques",
        body: [
          "Bluetooth : pour une souris, un casque, une enceinte. Activez-le dans les Paramètres puis associez l'appareil.",
          "Clé USB, disque dur externe, téléphone en câble : le branchement ouvre une fenêtre automatique.",
          "Une imprimante ou un scanner demandent parfois d'installer un pilote : téléchargez-le sur le site du fabricant.",
        ],
      },
      {
        heading: "Les petits dépannages",
        body: [
          "Un programme est figé : Ctrl + Maj + Échap, puis « Fin de tâche ».",
          "L'ordinateur est lent : fermez les programmes inutiles, redémarrez, libérez de la place sur le disque.",
          "Pas d'Internet : vérifiez le Wi-Fi, redémarrez la box, puis l'ordinateur.",
          "Redémarrer règle plus de problèmes qu'on ne le croit.",
        ],
      },
    ],
    caseTitle: "Le jour de l'examen",
    caseLines: [
      "Sarah doit imprimer son dossier avant midi, mais l'imprimante ne répond pas.",
      "Elle regarde la file d'attente, annule le document bloqué et vérifie que l'imprimante est bien celle par défaut.",
      "Elle se connecte au Wi-Fi de l'école, puis imprime en PDF pour garder une copie.",
      "Son dossier est rendu à temps.",
    ],
    tasks: [
      "Affichez la liste des imprimantes de votre ordinateur et repérez l'imprimante par défaut.",
      "Connectez-vous à un réseau Wi-Fi et déconnectez-vous.",
      "Ouvrez le Gestionnaire des tâches et repérez le programme qui utilise le plus de mémoire.",
      "Redémarrez l'ordinateur proprement et notez ce que vous avez remarqué.",
    ],
    goal: "Ajouter une imprimante, se connecter au Wi-Fi et résoudre des problèmes simples.",
    video: "Windows : imprimante, Wi-Fi et dépannage",
  }),
  lesson({
    id: 4,
    title: "Word : styles et mise en page avancée",
    subtitle: "Utiliser les styles, les colonnes, les tabulations et les sauts de page.",
    sections: [
      {
        heading: "Pourquoi les styles ?",
        body: [
          "Un style est une mise en forme enregistrée : Titre 1, Titre 2, Normal…",
          "Changer un style change d'un coup tous les paragraphes qui l'utilisent.",
          "Les styles de titre servent aussi à construire automatiquement un sommaire.",
          "Ne simulez jamais un titre avec gras et grande taille : appliquez le style Titre 1.",
        ],
      },
      {
        heading: "Mise en page",
        body: [
          "Mise en page > Colonnes : un texte en deux ou trois colonnes, comme un journal.",
          "Saut de page : Ctrl + Entrée. Il remplace les lignes vides répétées.",
          "Retrait : décale la première ligne ou tout le paragraphe. Utilisez la règle ou la boîte Paragraphe.",
          "Marges : 2,5 cm sont courantes pour un document officiel.",
        ],
      },
      {
        heading: "Tabulations et espaces",
        body: [
          "La touche Tab aligne du texte à des positions précises (ex. un prix à droite).",
          "N'alignez jamais avec la barre d'espace : l'alignement se casse à la moindre modification.",
          "Pour une présentation en colonnes, un tableau sans bordures est plus sûr.",
        ],
      },
      {
        heading: "Afficher les marques",
        body: [
          "Le bouton ¶ affiche les marques de paragraphe et les espaces cachés.",
          "Il aide à repérer les doubles espaces et les paragraphes inutiles.",
        ],
      },
    ],
    caseTitle: "Le bulletin de l'association",
    caseLines: [
      "Anna prépare le bulletin mensuel de son association : cinq pages avec titres, textes et photos.",
      "Elle applique Titre 1 aux grands titres et Titre 2 aux sous-titres, puis modifie le style Titre 1 en bleu foncé.",
      "En un clic, tous les titres changent de couleur.",
      "Elle insère un saut de page avant chaque nouvelle rubrique.",
    ],
    tasks: [
      "Appliquez les styles Titre 1 et Titre 2 à un document de plusieurs sections.",
      "Modifiez le style Titre 1 (police, taille, couleur) et observez l'effet.",
      "Mettez un paragraphe en deux colonnes et ajoutez un saut de page.",
      "Affichez les marques ¶ et supprimez les espaces en trop.",
    ],
    goal: "Utiliser les styles de titre, les colonnes, les sauts de page et les tabulations.",
    video: "Word : les styles et la mise en page",
  }),
  lesson({
    id: 5,
    title: "Word : documents longs",
    subtitle: "Sommaire automatique, en-têtes, pieds de page et notes.",
    sections: [
      {
        heading: "Le sommaire automatique",
        body: [
          "Appliquez d'abord Titre 1, Titre 2… aux titres du document.",
          "Références > Table des matières : choisissez un modèle.",
          "Pour mettre à jour : clic droit sur le sommaire > Mettre à jour le champ.",
        ],
      },
      {
        heading: "En-têtes et pieds de page",
        body: [
          "L'en-tête est en haut de chaque page : titre du document, nom de l'entreprise.",
          "Le pied de page est en bas : numéro de page, date.",
          "Insertion > Numéro de page. Double-cliquez dans la zone pour la modifier.",
          "Option « Première page différente » : pour une page de garde sans numéro.",
        ],
      },
      {
        heading: "Notes de bas de page",
        body: [
          "Références > Insérer une note de bas de page : Word numérote et place la note en bas.",
          "Sert à expliquer un mot ou à citer une source.",
        ],
      },
      {
        heading: "Sections et orientation",
        body: [
          "Une section permet de changer la mise en page à un endroit (par exemple une page en paysage).",
          "Mise en page > Sauts > Page suivante crée une nouvelle section.",
        ],
      },
      {
        heading: "Relire avant de rendre",
        body: [
          "Utilisez F7 (orthographe), puis relisez à voix haute.",
          "Vérifiez les titres, les numéros de page et le sommaire mis à jour.",
          "Exportez en PDF avant l'envoi.",
        ],
      },
    ],
    caseTitle: "Le rapport de stage de David",
    caseLines: [
      "David doit rendre un rapport de stage de trente pages.",
      "Il applique les styles de titre dès le départ, insère une page de garde, un sommaire automatique et les numéros de page.",
      "Deux jours avant le rendu, il ajoute une partie : le sommaire se met à jour en un clic.",
      "Son encadrant apprécie la présentation claire et professionnelle.",
    ],
    tasks: [
      "Créez un document de trois chapitres avec les styles de titre.",
      "Ajoutez un sommaire automatique et mettez-le à jour après avoir ajouté un chapitre.",
      "Ajoutez un en-tête (titre du document) et un pied de page (numéro de page).",
      "Insérez une note de bas de page et exportez le document en PDF.",
    ],
    goal: "Construire un document long avec sommaire, en-têtes, pieds de page et notes.",
    video: "Word : sommaire, en-têtes et numéros de page",
  }),
  lesson({
    id: 6,
    title: "Word : publipostage et modèles",
    subtitle: "Envoyer le même courrier à plusieurs personnes et réutiliser des modèles.",
    sections: [
      {
        heading: "À quoi sert le publipostage ?",
        body: [
          "C'est un document type (une lettre) fusionné avec une liste (noms, adresses).",
          "Chaque destinataire reçoit une lettre personnalisée : « Cher Monsieur Ilunga, … ».",
          "Utile pour des convocations, des invitations, des attestations, des étiquettes.",
        ],
      },
      {
        heading: "Les trois ingrédients",
        body: [
          "Le document principal : la lettre avec le texte commun.",
          "La source de données : un tableau Excel avec une ligne par personne et des titres de colonnes (Nom, Prénom, Adresse).",
          "Les champs de fusion : des repères comme «Nom» insérés dans la lettre.",
        ],
      },
      {
        heading: "Réaliser un publipostage",
        body: [
          "Publipostage > Démarrer la fusion > Lettres.",
          "Sélectionner les destinataires > Utiliser une liste existante : choisissez le fichier Excel.",
          "Insérer un champ de fusion aux bons endroits.",
          "Aperçu des résultats pour vérifier, puis Terminer et fusionner.",
        ],
      },
      {
        heading: "Les modèles",
        body: [
          "Un modèle (.dotx) est un document déjà mis en forme qu'on réutilise.",
          "Fichier > Nouveau : modèles de CV, de lettre, de rapport.",
          "Créez le vôtre : Enregistrer sous > Modèle Word.",
        ],
      },
      {
        heading: "Conseils",
        body: [
          "Vérifiez que les noms de colonnes d'Excel ne contiennent pas de fautes.",
          "Testez avec deux personnes avant de lancer 200 lettres.",
          "Gardez toujours le fichier Excel et la lettre dans le même dossier.",
        ],
      },
    ],
    caseTitle: "Les convocations de l'école",
    caseLines: [
      "Le directeur doit convoquer 120 parents à une réunion. Écrire 120 lettres à la main prendrait des jours.",
      "Il prépare une liste Excel avec les noms et les adresses, et une lettre avec des champs de fusion.",
      "En quelques minutes, Word génère 120 lettres personnalisées, prêtes à imprimer.",
      "Il garde la lettre comme modèle pour l'an prochain.",
    ],
    tasks: [
      "Créez une liste Excel de cinq personnes avec Nom, Prénom et Ville.",
      "Écrivez une lettre d'invitation et insérez les champs de fusion.",
      "Faites l'aperçu des résultats, puis fusionnez vers un nouveau document.",
      "Enregistrez votre lettre comme modèle Word.",
    ],
    goal: "Réaliser un publipostage à partir d'une liste Excel et créer un modèle de document.",
    video: "Word : le publipostage pas à pas",
  }),
];

export const quizzesA2 = [
  quiz(1, "Quiz 1 — Organiser son travail", "Recherche, raccourcis et captures d'écran", [
    ["Quel raccourci capture une zone de l'écran ?", "Windows + Maj + S", "Windows + L", "Ctrl + Alt + C"],
    ["Quel raccourci verrouille la session ?", "Windows + L", "Windows + D", "Windows + E"],
    ["Que fait *.docx dans une recherche ?", "Affiche tous les fichiers Word", "Supprime les fichiers Word", "Ouvre Word"],
    ["Quel raccourci ouvre l'Explorateur de fichiers ?", "Windows + E", "Windows + I", "Windows + V"],
    ["Quel raccourci ouvre le Gestionnaire des tâches ?", "Ctrl + Maj + Échap", "Alt + F4", "Windows + T"],
    ["Comment placer deux fenêtres côte à côte ?", "Windows + flèches gauche / droite", "Alt + Tab", "Ctrl + Z"],
    ["Que fait Windows + V ?", "Affiche l'historique du presse-papiers", "Ouvre les Paramètres", "Éteint l'écran"],
    ["Où va une capture faite avec Windows + Maj + S ?", "Dans le presse-papiers", "Dans la Corbeille", "Sur la clé USB"],
    ["Quel raccourci ouvre les Paramètres ?", "Windows + I", "Windows + P", "Windows + R"],
    ["À quoi servent les bureaux virtuels ?", "À séparer des groupes de fenêtres (travail, loisirs)", "À imprimer", "À supprimer des fichiers"],
  ]),
  quiz(2, "Quiz 2 — Internet, e-mail et cloud", "Navigateur, e-mail professionnel et stockage en ligne", [
    ["Quel raccourci ouvre un nouvel onglet ?", "Ctrl + T", "Ctrl + N", "Ctrl + O"],
    ["Que signifie « Cci » dans un e-mail ?", "Copie cachée", "Copie carbone intégrale", "Courrier confidentiel"],
    ["Quel objet d'e-mail est le plus professionnel ?", "Demande de stage — Marie Kasongo", "Salut", "URGENT!!!!!"],
    ["Qu'est-ce que le cloud ?", "Du stockage sur Internet", "Un virus", "Un programme de dessin"],
    ["Que faut-il faire sur un ordinateur public ?", "Se déconnecter à la fin", "Enregistrer son mot de passe", "Laisser la session ouverte"],
    ["Que protège la validation en deux étapes ?", "Votre compte, avec un code supplémentaire", "Votre imprimante", "Votre écran"],
    ["Où télécharger un programme ?", "Sur le site officiel de l'éditeur", "Sur un lien reçu d'un inconnu", "Sur n'importe quel site de téléchargement"],
    ["Que montre un partage en « lecture seule » ?", "La personne peut lire mais pas modifier", "La personne peut tout supprimer", "Le fichier est caché"],
    ["Quelle icône sert à joindre un fichier à un e-mail ?", "Le trombone", "La loupe", "L'horloge"],
    ["Quel est l'avantage du cloud ?", "Les fichiers sont accessibles depuis plusieurs appareils", "Il remplace l'antivirus", "Il accélère l'écran"],
  ]),
  quiz(3, "Quiz 3 — Imprimantes, réseau et dépannage", "Connecter et réparer", [
    ["Que faire si un programme est figé ?", "Fin de tâche dans le Gestionnaire des tâches", "Débrancher l'ordinateur", "Supprimer Windows"],
    ["Comment se connecter au Wi-Fi ?", "Icône Wi-Fi > choisir le réseau > saisir la clé", "Appuyer sur Suppr", "Redémarrer la souris"],
    ["Un réseau Wi-Fi public est…", "Peu sûr : évitez d'y saisir des mots de passe", "Toujours totalement sûr", "Réservé aux imprimantes"],
    ["Que faire si une impression est bloquée ?", "Annuler le document dans la file d'attente et recommencer", "Éteindre la box", "Changer le fond d'écran"],
    ["Que fait le mode avion ?", "Coupe le Wi-Fi et le Bluetooth", "Augmente le son", "Ferme les programmes"],
    ["À quoi sert le Bluetooth ?", "Connecter sans fil une souris, un casque, une enceinte", "Imprimer en couleur", "Sauvegarder sur le cloud"],
    ["Pourquoi redémarrer l'ordinateur lent ?", "Cela règle souvent le problème", "Cela supprime Windows", "Cela chauffe la batterie"],
    ["Où télécharger le pilote d'une imprimante ?", "Sur le site du fabricant", "Sur un site inconnu", "Il n'existe pas de pilote"],
    ["Pas d'Internet : première vérification ?", "Le Wi-Fi et la box", "La couleur du bureau", "Le nombre de fichiers"],
    ["Que fait « Ajouter un appareil » dans les imprimantes ?", "Installe une nouvelle imprimante", "Efface l'imprimante", "Imprime une page de test seulement"],
  ]),
  quiz(4, "Quiz 4 — Word : styles et mise en page", "Styles, colonnes et sauts de page", [
    ["À quoi sert un style de titre ?", "À mettre en forme et à construire le sommaire", "À imprimer plus vite", "À supprimer les fautes"],
    ["Quel raccourci insère un saut de page ?", "Ctrl + Entrée", "Ctrl + Tab", "Ctrl + Maj + P"],
    ["Que fait le bouton ¶ ?", "Affiche les marques de paragraphe et d'espaces", "Ajoute un paragraphe", "Imprime le document"],
    ["Quel est le défaut d'un titre fait seulement en gras et en grande taille ?", "Il n'apparaît pas dans le sommaire automatique", "Il est trop petit", "Il change de couleur"],
    ["Comment aligner un prix à droite proprement ?", "Avec une tabulation", "Avec beaucoup d'espaces", "Avec la touche Entrée"],
    ["Quel onglet permet de créer des colonnes ?", "Mise en page", "Révision", "Affichage"],
    ["Que se passe-t-il si on modifie le style Titre 1 ?", "Tous les titres 1 du document changent", "Seul le premier titre change", "Rien"],
    ["Comment changer l'orientation de la page ?", "Mise en page > Orientation", "Accueil > Gras", "Fichier > Fermer"],
    ["Pourquoi éviter les lignes vides répétées ?", "Elles cassent la mise en page à la moindre modification", "Elles sont interdites par Windows", "Elles ralentissent l'imprimante"],
    ["Quelles marges sont courantes pour un document officiel ?", "2,5 cm environ", "10 cm", "0 cm"],
  ]),
  quiz(5, "Quiz 5 — Word : documents longs", "Sommaire, en-têtes et notes", [
    ["Que faut-il faire avant d'insérer un sommaire automatique ?", "Appliquer les styles de titre", "Imprimer le document", "Fermer Word"],
    ["Comment mettre à jour le sommaire ?", "Clic droit > Mettre à jour le champ", "Le retaper", "Appuyer sur Échap"],
    ["Où se trouve l'en-tête ?", "En haut de chaque page", "À la fin du document", "Dans la Corbeille"],
    ["À quoi sert une note de bas de page ?", "Expliquer un mot ou citer une source", "Changer la police", "Insérer une image"],
    ["Comment avoir une page de garde sans numéro ?", "Option « Première page différente »", "Supprimer le numéro à la main", "Mettre la page en paysage"],
    ["Quel onglet contient la table des matières ?", "Références", "Insertion", "Affichage"],
    ["Que fait un saut de section « Page suivante » ?", "Permet une mise en page différente à partir de là", "Supprime la page", "Imprime en double"],
    ["Que faut-il vérifier avant de rendre un document long ?", "Les numéros de page et le sommaire mis à jour", "La couleur du bureau", "La taille de l'écran"],
    ["Quel format est conseillé pour envoyer le rapport final ?", "PDF", "Un brouillon", "Une capture d'écran"],
    ["Où insère-t-on le numéro de page ?", "Insertion > Numéro de page", "Révision > Commentaire", "Accueil > Police"],
  ]),
  quiz(6, "Quiz 6 — Word : publipostage et modèles", "Lettres en série et modèles", [
    ["À quoi sert le publipostage ?", "À envoyer le même courrier personnalisé à plusieurs personnes", "À traduire un texte", "À corriger l'orthographe"],
    ["Quelle est la source de données la plus courante ?", "Un tableau Excel", "Une image", "Un fichier audio"],
    ["Que sont les champs de fusion ?", "Des repères remplacés par les données de chaque personne", "Des fautes d'orthographe", "Des styles de titre"],
    ["Que doit contenir la première ligne de la liste Excel ?", "Les titres des colonnes", "Le total", "Un dessin"],
    ["Que faut-il faire avant de lancer 200 lettres ?", "Faire l'aperçu et tester avec quelques personnes", "Éteindre l'ordinateur", "Supprimer le modèle"],
    ["Quelle est l'extension d'un modèle Word ?", ".dotx", ".xlsx", ".mp3"],
    ["Quel onglet contient les outils de publipostage ?", "Publipostage", "Affichage", "Mise en page"],
    ["Dans quel type de document utilise-t-on souvent un publipostage ?", "Convocations, invitations, attestations", "Un texte d'une ligne", "Un tableau de calcul"],
    ["Où garder le fichier Excel et la lettre ?", "Dans le même dossier", "Sur le bureau d'un ami", "Dans la Corbeille"],
    ["Quel avantage apporte un modèle ?", "On réutilise une mise en forme déjà prête", "On évite d'enregistrer", "On supprime les images"],
  ]),
];
