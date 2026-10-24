import { lesson, quiz } from "./builders";

// Niveau 1 · Initiation — leçons 1 à 6 : Windows et Word.

export const lessonsA = [
  lesson({
    id: 1,
    title: "Découvrir l'ordinateur et Windows",
    subtitle: "Reconnaître les éléments d'un ordinateur et se repérer dans Windows.",
    sections: [
      {
        heading: "Les éléments de l'ordinateur",
        body: [
          "L'unité centrale : le « cerveau » de l'ordinateur (processeur, mémoire, disque).",
          "L'écran : il affiche ce que fait l'ordinateur.",
          "Le clavier : il sert à écrire du texte et à donner des commandes.",
          "La souris : elle sert à déplacer le pointeur et à cliquer.",
          "Un ordinateur portable regroupe tout cela dans un seul appareil, avec une batterie.",
        ],
      },
      {
        heading: "Démarrer et éteindre",
        body: [
          "Pour démarrer : appuyez sur le bouton d'alimentation, puis saisissez votre mot de passe.",
          "Pour éteindre : menu Démarrer > Alimentation > Arrêter.",
          "Ne coupez jamais le courant brutalement : vous risquez de perdre votre travail.",
          "La veille garde votre session ouverte et consomme très peu d'énergie.",
        ],
      },
      {
        heading: "Le bureau de Windows",
        body: [
          "Le bureau : l'écran d'accueil, avec le fond d'écran et les icônes.",
          "La barre des tâches : la bande en bas de l'écran, avec les programmes ouverts.",
          "Le bouton Démarrer : il ouvre la liste de tous les programmes.",
          "La zone de notification : l'heure, le volume, le Wi-Fi et la batterie.",
        ],
      },
      {
        heading: "Les fenêtres et la souris",
        body: [
          "Chaque programme s'ouvre dans une fenêtre : Réduire (−), Agrandir (□), Fermer (✕).",
          "Pour déplacer une fenêtre, faites glisser sa barre de titre.",
          "Alt + Tab : passer d'une fenêtre à l'autre. Windows + D : afficher le bureau.",
          "Clic gauche : sélectionner. Double-clic : ouvrir. Clic droit : menu contextuel.",
          "Glisser-déposer : maintenez le clic gauche, déplacez, puis relâchez.",
        ],
      },
    ],
    caseTitle: "Le premier jour de Sarah",
    caseLines: [
      "Sarah vient de recevoir son premier ordinateur portable pour ses études.",
      "Elle appuie sur le bouton d'alimentation, saisit son mot de passe et arrive sur le bureau de Windows.",
      "Elle ouvre le menu Démarrer, lance un programme, puis le réduit dans la barre des tâches.",
      "Le soir, elle éteint l'ordinateur correctement avec Démarrer, Alimentation, Arrêter.",
    ],
    tasks: [
      "Démarrez l'ordinateur et identifiez la barre des tâches, le bouton Démarrer et la zone de notification.",
      "Ouvrez deux programmes, puis passez de l'un à l'autre avec Alt + Tab.",
      "Déplacez, réduisez, agrandissez puis fermez une fenêtre.",
      "Éteignez l'ordinateur en suivant la bonne méthode.",
    ],
    goal: "Utiliser la souris, ouvrir et fermer des fenêtres, démarrer et éteindre correctement l'ordinateur.",
    video: "Découvrir l'ordinateur et le bureau Windows",
  }),
  lesson({
    id: 2,
    title: "Fichiers et dossiers",
    subtitle: "Créer, ranger, copier et retrouver ses documents.",
    sections: [
      {
        heading: "Fichier et dossier",
        body: [
          "Un fichier est un document : lettre, photo, tableau, vidéo, musique.",
          "Un dossier est comme un classeur : il sert à ranger des fichiers.",
          "L'extension indique le type du fichier : .docx (Word), .xlsx (Excel), .pptx (PowerPoint), .pdf, .jpg.",
          "L'Explorateur de fichiers (Windows + E) permet de voir tous vos dossiers.",
        ],
      },
      {
        heading: "Créer et renommer",
        body: [
          "Clic droit dans un espace vide > Nouveau > Dossier.",
          "Donnez un nom clair : par exemple « Études 2026 » ou « Factures ».",
          "Un nom ne peut pas contenir ces signes : / \\ : * ? \" < > |",
          "Pour renommer : sélectionnez, appuyez sur F2, tapez le nouveau nom, puis Entrée.",
        ],
      },
      {
        heading: "Copier, couper, coller",
        body: [
          "Copier : Ctrl + C. Couper : Ctrl + X. Coller : Ctrl + V.",
          "Copier garde l'original. Couper déplace le fichier.",
          "Sélectionner plusieurs fichiers : Ctrl + clic. Tout sélectionner : Ctrl + A.",
          "Annuler la dernière action : Ctrl + Z.",
        ],
      },
      {
        heading: "Supprimer et restaurer",
        body: [
          "Supprimer : touche Suppr. Le fichier va dans la Corbeille.",
          "Pour le récupérer : ouvrez la Corbeille, clic droit > Restaurer.",
          "Vider la Corbeille supprime les fichiers définitivement.",
        ],
      },
      {
        heading: "Clé USB et organisation",
        body: [
          "Branchez la clé USB, puis ouvrez-la dans l'Explorateur de fichiers.",
          "Avant de la retirer : clic droit sur la clé > Éjecter.",
          "Rangez par thème, puis par année : Documents > Études > 2026.",
        ],
      },
    ],
    caseTitle: "Le bureau en désordre de David",
    caseLines: [
      "David a trente fichiers éparpillés sur son bureau et ne retrouve plus ses factures.",
      "Il crée un dossier « Factures », puis un dossier « Études », et déplace ses fichiers avec Couper et Coller.",
      "Il copie ses documents importants sur une clé USB pour en avoir une deuxième copie.",
      "Maintenant, il retrouve tout en quelques secondes.",
    ],
    tasks: [
      "Créez un dossier « Mes documents BM » et deux sous-dossiers : « Word » et « Excel ».",
      "Renommez un fichier avec F2, puis copiez-le dans un autre dossier avec Ctrl + C et Ctrl + V.",
      "Supprimez un fichier, puis restaurez-le depuis la Corbeille.",
      "Copiez votre dossier sur une clé USB et éjectez la clé correctement.",
    ],
    goal: "Créer des dossiers, copier, déplacer, supprimer et restaurer des fichiers, et utiliser une clé USB.",
    video: "Gérer ses fichiers et dossiers sous Windows",
  }),
  lesson({
    id: 3,
    title: "Sécurité et bonnes habitudes",
    subtitle: "Protéger son ordinateur, ses comptes et ses documents.",
    sections: [
      {
        heading: "Les mots de passe",
        body: [
          "Un bon mot de passe fait au moins 12 caractères, avec lettres, chiffres et symboles.",
          "N'utilisez jamais votre date de naissance, ni « 123456 », ni votre prénom.",
          "Utilisez un mot de passe différent pour chaque compte important.",
          "Ne partagez jamais votre mot de passe, même avec un ami.",
        ],
      },
      {
        heading: "Virus et antivirus",
        body: [
          "Un virus est un programme malveillant qui abîme l'ordinateur ou vole des informations.",
          "Windows Sécurité (Microsoft Defender) est un antivirus déjà installé : gardez-le activé.",
          "N'ouvrez pas les pièces jointes ou les liens d'un message suspect.",
          "Analysez toute clé USB inconnue avant de l'ouvrir.",
        ],
      },
      {
        heading: "Sauvegarder",
        body: [
          "Une sauvegarde est une copie de vos fichiers importants, gardée ailleurs.",
          "Règle simple : 3 copies, sur 2 supports différents, dont 1 hors de la maison ou dans le cloud.",
          "Exemples de supports : clé USB, disque dur externe, stockage en ligne (OneDrive, Google Drive).",
        ],
      },
      {
        heading: "Internet prudent",
        body: [
          "Vérifiez le cadenas et « https » dans l'adresse d'un site avant de saisir des informations.",
          "L'hameçonnage (phishing) est un faux message qui imite une banque ou un service pour voler vos données.",
          "Aucun service sérieux ne vous demande votre mot de passe par e-mail ou WhatsApp.",
        ],
      },
      {
        heading: "Mises à jour et santé",
        body: [
          "Installez les mises à jour de Windows : elles corrigent des failles de sécurité.",
          "Faites une pause toutes les heures et gardez le dos droit, l'écran à hauteur des yeux.",
        ],
      },
    ],
    caseTitle: "Le message suspect",
    caseLines: [
      "Grace reçoit un message : « Votre compte sera fermé, cliquez ici et saisissez votre mot de passe. »",
      "Elle remarque que l'adresse de l'expéditeur est bizarre et que le lien ne commence pas par https.",
      "Elle ne clique pas, supprime le message et prévient sa banque.",
      "Le soir, elle fait une sauvegarde de ses documents sur une clé USB.",
    ],
    tasks: [
      "Créez un mot de passe solide de 12 caractères ou plus (sans l'écrire dans ce cahier).",
      "Ouvrez Windows Sécurité et vérifiez que la protection est active.",
      "Sauvegardez votre dossier « Mes documents BM » sur une clé USB ou en ligne.",
      "Listez trois signes qui montrent qu'un message est un faux (hameçonnage).",
    ],
    goal: "Choisir un bon mot de passe, reconnaître un message dangereux et faire une sauvegarde.",
    video: "Sécurité informatique pour débutants",
  }),
  lesson({
    id: 4,
    title: "Word : découvrir et saisir un texte",
    subtitle: "Ouvrir Word, écrire, corriger, sélectionner et enregistrer un document.",
    sections: [
      {
        heading: "Ouvrir Word",
        body: [
          "Menu Démarrer > Word, puis « Document vierge ».",
          "Word sert à écrire des lettres, des CV, des rapports et des courriers.",
        ],
      },
      {
        heading: "L'écran de Word",
        body: [
          "La barre de titre : le nom du document.",
          "Le ruban : les onglets Accueil, Insertion, Mise en page, Révision…",
          "La page : la zone blanche où l'on écrit.",
          "La barre d'état : le nombre de pages et de mots, et le zoom.",
        ],
      },
      {
        heading: "Saisir du texte",
        body: [
          "Entrée : passer à un nouveau paragraphe. Ne l'utilisez pas à la fin de chaque ligne : Word passe à la ligne tout seul.",
          "Retour arrière efface à gauche du curseur. Suppr efface à droite.",
          "Maj + une lettre donne une majuscule. Verr Maj bloque les majuscules.",
          "Un seul espace après chaque mot, et un espace après la virgule et le point.",
        ],
      },
      {
        heading: "Sélectionner",
        body: [
          "Double-clic sur un mot : le sélectionne. Triple-clic : sélectionne le paragraphe.",
          "Ctrl + A : sélectionne tout le document.",
          "Ctrl + Z annule la dernière action. Ctrl + Y la rétablit.",
        ],
      },
      {
        heading: "Enregistrer",
        body: [
          "Ctrl + S : enregistrer. La première fois, choisissez le dossier et le nom.",
          "Un document Word porte l'extension .docx.",
          "Enregistrez souvent : en cas de coupure de courant, vous perdez moins de travail.",
        ],
      },
    ],
    caseTitle: "La lettre de motivation de Joseph",
    caseLines: [
      "Joseph doit écrire une lettre pour demander un stage.",
      "Il ouvre Word, choisit un document vierge et tape son texte sans appuyer sur Entrée à chaque ligne.",
      "Il corrige une faute avec Retour arrière et annule une erreur avec Ctrl + Z.",
      "Il enregistre la lettre dans son dossier « Mes documents BM » sous le nom « Lettre stage ».",
    ],
    tasks: [
      "Ouvrez un document vierge et écrivez un petit texte de cinq lignes sur vous.",
      "Sélectionnez un mot, un paragraphe, puis tout le document avec Ctrl + A.",
      "Supprimez une phrase, puis annulez avec Ctrl + Z.",
      "Enregistrez le document sous le nom « Présentation personnelle » dans votre dossier Word.",
    ],
    goal: "Ouvrir Word, saisir et corriger un texte, sélectionner et enregistrer un document.",
    video: "Word pour débutants : premier document",
  }),
  lesson({
    id: 5,
    title: "Word : mettre en forme",
    subtitle: "Rendre un texte clair et agréable à lire.",
    sections: [
      {
        heading: "Police et caractères",
        body: [
          "Sélectionnez d'abord le texte, puis appliquez la mise en forme (onglet Accueil).",
          "Police : le style des lettres (Calibri, Arial, Times New Roman). Taille : 11 ou 12 pour un courrier.",
          "Gras : Ctrl + G. Italique : Ctrl + I. Souligné : Ctrl + U.",
          "Une couleur de texte ne doit jamais gêner la lecture.",
        ],
      },
      {
        heading: "Alignement du paragraphe",
        body: [
          "Centrer : Ctrl + E (pour un titre).",
          "Aligner à droite : Ctrl + D.",
          "Justifier : Ctrl + J (le texte forme un bloc régulier).",
        ],
      },
      {
        heading: "Interligne et espacement",
        body: [
          "L'interligne est l'espace entre les lignes : 1,15 ou 1,5 pour un texte aéré.",
          "L'espacement avant et après un paragraphe remplace les lignes vides.",
        ],
      },
      {
        heading: "Listes",
        body: [
          "Liste à puces : pour énumérer sans ordre.",
          "Liste numérotée : pour des étapes dans un ordre précis.",
          "Appuyez deux fois sur Entrée pour terminer une liste.",
        ],
      },
      {
        heading: "Gagner du temps",
        body: [
          "Le pinceau (Reproduire la mise en forme) copie un style d'un texte vers un autre.",
          "Un document propre : une seule police, deux ou trois tailles au maximum.",
        ],
      },
    ],
    caseTitle: "Le CV d'Anna",
    caseLines: [
      "Anna prépare son CV. Elle écrit son nom en gras, en taille 18, et le centre en haut de la page.",
      "Elle présente ses études et ses compétences sous forme de liste à puces.",
      "Elle utilise une seule police et justifie ses paragraphes pour une page très propre.",
      "Le responsable des ressources humaines trouve son CV clair et facile à lire.",
    ],
    tasks: [
      "Reprenez votre « Présentation personnelle » : mettez le titre en gras, taille 16, centré.",
      "Transformez trois de vos qualités en liste à puces.",
      "Appliquez l'interligne 1,5 et justifiez le texte.",
      "Utilisez le pinceau pour copier la mise en forme d'un mot sur un autre.",
    ],
    goal: "Mettre en forme des caractères et des paragraphes, et créer des listes.",
    video: "Word : mise en forme du texte",
  }),
  lesson({
    id: 6,
    title: "Word : insérer, vérifier et imprimer",
    subtitle: "Ajouter une image ou un tableau, corriger l'orthographe et imprimer.",
    sections: [
      {
        heading: "Insérer une image",
        body: [
          "Onglet Insertion > Images, puis choisissez un fichier.",
          "Redimensionnez en tirant sur un coin de l'image (jamais sur un côté : elle serait déformée).",
          "Habillage du texte : choisit comment le texte entoure l'image.",
        ],
      },
      {
        heading: "Insérer un tableau",
        body: [
          "Insertion > Tableau : choisissez le nombre de colonnes et de lignes.",
          "Tab passe à la cellule suivante. Clic droit permet d'insérer ou de supprimer une ligne.",
          "Un tableau sert à présenter des informations comparables : horaires, prix, listes.",
        ],
      },
      {
        heading: "Orthographe et recherche",
        body: [
          "Soulignement rouge : faute d'orthographe probable. Soulignement bleu : problème de grammaire.",
          "F7 lance la vérification complète du document.",
          "Ctrl + F recherche un mot. Ctrl + H le remplace partout.",
        ],
      },
      {
        heading: "Mise en page",
        body: [
          "Onglet Mise en page : marges, orientation (portrait ou paysage) et taille du papier (A4).",
          "Numéro de page : Insertion > Numéro de page.",
        ],
      },
      {
        heading: "Aperçu et impression",
        body: [
          "Ctrl + P ouvre l'aperçu avant impression : vérifiez toujours avant d'imprimer.",
          "Choisissez l'imprimante, le nombre de copies et les pages à imprimer.",
          "Pour envoyer un document sans qu'il soit modifié : Fichier > Exporter > Créer un document PDF.",
        ],
      },
    ],
    caseTitle: "L'affiche de l'association",
    caseLines: [
      "Peter prépare l'annonce d'une réunion de son association.",
      "Il insère le logo, ajoute un tableau avec les horaires et corrige les fautes avec F7.",
      "Il regarde l'aperçu avec Ctrl + P et remarque que la page est coupée : il change les marges.",
      "Il imprime dix copies, puis envoie aussi la version PDF par e-mail.",
    ],
    tasks: [
      "Insérez une image dans votre document et réduisez-la en tirant sur un coin.",
      "Créez un tableau de 3 colonnes et 4 lignes avec un emploi du temps.",
      "Lancez la vérification orthographique avec F7 et corrigez les fautes.",
      "Ouvrez l'aperçu avant impression, puis exportez le document en PDF.",
    ],
    goal: "Insérer une image et un tableau, corriger un document, l'imprimer ou l'exporter en PDF.",
    video: "Word : images, tableaux et impression",
  }),
];

export const quizzesA = [
  quiz(1, "Quiz 1 — Ordinateur et Windows", "Les éléments de l'ordinateur et le bureau de Windows", [
    ["Quel élément est le « cerveau » de l'ordinateur ?", "L'unité centrale", "L'écran", "La souris"],
    ["Comment éteindre correctement un ordinateur ?", "Démarrer > Alimentation > Arrêter", "Débrancher le câble", "Fermer l'écran seulement"],
    ["Où se trouvent les programmes ouverts ?", "Dans la barre des tâches", "Dans la Corbeille", "Dans la zone de notification"],
    ["Que fait un clic droit ?", "Ouvre un menu contextuel", "Ferme la fenêtre", "Éteint l'ordinateur"],
    ["Quelle combinaison permet de passer d'une fenêtre à l'autre ?", "Alt + Tab", "Ctrl + Z", "Windows + L"],
    ["Que fait le bouton « − » d'une fenêtre ?", "Il la réduit", "Il la ferme", "Il la supprime"],
    ["Que fait un double-clic sur une icône ?", "Il ouvre le programme ou le fichier", "Il supprime l'icône", "Il éteint l'écran"],
    ["Où voit-on l'heure et le niveau de batterie ?", "Dans la zone de notification", "Dans la Corbeille", "Dans le ruban"],
    ["Pourquoi ne faut-il pas couper le courant brutalement ?", "On peut perdre son travail", "L'écran devient bleu pour toujours", "Cela efface Windows"],
    ["À quoi sert le bouton Démarrer ?", "À ouvrir la liste des programmes", "À imprimer", "À régler l'heure"],
  ]),
  quiz(2, "Quiz 2 — Fichiers et dossiers", "Créer, copier, déplacer et supprimer", [
    ["Qu'est-ce qu'un dossier ?", "Un classeur qui range des fichiers", "Un programme antivirus", "Un type d'écran"],
    ["Quel raccourci copie un fichier ?", "Ctrl + C", "Ctrl + V", "Ctrl + X"],
    ["Quelle touche permet de renommer un fichier ?", "F2", "F5", "Échap"],
    ["Que fait « Couper » puis « Coller » ?", "Déplace le fichier", "Garde l'original au même endroit", "Supprime définitivement"],
    ["Où va un fichier supprimé avec la touche Suppr ?", "Dans la Corbeille", "Dans la clé USB", "Dans le Bureau"],
    ["Comment sélectionner tous les fichiers d'un dossier ?", "Ctrl + A", "Ctrl + Z", "Alt + F4"],
    ["Quelle extension a un document Word ?", ".docx", ".xlsx", ".pptx"],
    ["Que faut-il faire avant de retirer une clé USB ?", "L'éjecter", "Éteindre l'écran", "Vider la Corbeille"],
    ["Quel signe est interdit dans un nom de fichier ?", "Le point d'interrogation ?", "Le tiret -", "Le chiffre 5"],
    ["Quel raccourci annule la dernière action ?", "Ctrl + Z", "Ctrl + P", "Ctrl + S"],
  ]),
  quiz(3, "Quiz 3 — Sécurité", "Mots de passe, antivirus et sauvegardes", [
    ["Quel est le meilleur mot de passe ?", "Un long mot de passe mélangeant lettres, chiffres et symboles", "Votre date de naissance", "123456"],
    ["Que faire d'un message qui demande votre mot de passe ?", "Ne pas répondre et le supprimer", "Répondre vite", "Le transférer à vos amis"],
    ["Qu'est-ce que l'hameçonnage (phishing) ?", "Un faux message pour voler vos données", "Une mise à jour de Windows", "Un type de clé USB"],
    ["Combien de copies conseille la règle 3-2-1 ?", "3 copies", "1 copie", "10 copies"],
    ["Que signifie le cadenas et « https » dans l'adresse ?", "La connexion au site est protégée", "Le site est gratuit", "Le site est rapide"],
    ["Quel logiciel de protection est déjà installé dans Windows ?", "Windows Sécurité (Defender)", "Paint", "Calculatrice"],
    ["À quoi servent les mises à jour de Windows ?", "À corriger des failles de sécurité", "À changer la couleur du bureau", "À supprimer vos fichiers"],
    ["Que faire d'une clé USB trouvée dans la rue ?", "Ne pas la brancher sur son ordinateur", "La brancher tout de suite", "La partager"],
    ["Pourquoi sauvegarder ses fichiers ?", "Pour pouvoir les retrouver en cas de panne ou de perte", "Pour libérer la mémoire vive", "Pour accélérer Internet"],
    ["À quelle fréquence faut-il faire une pause devant l'écran ?", "Environ toutes les heures", "Jamais", "Une fois par semaine"],
  ]),
  quiz(4, "Quiz 4 — Word : saisir un texte", "Écrire, sélectionner et enregistrer", [
    ["Quelle touche crée un nouveau paragraphe ?", "Entrée", "Tab", "Échap"],
    ["Comment sélectionner tout le document ?", "Ctrl + A", "Ctrl + S", "Ctrl + P"],
    ["Quel raccourci enregistre un document ?", "Ctrl + S", "Ctrl + O", "Ctrl + N"],
    ["Quelle extension a un document Word ?", ".docx", ".pdf", ".jpg"],
    ["Que faut-il éviter à la fin de chaque ligne d'un paragraphe ?", "Appuyer sur Entrée", "Écrire une virgule", "Appuyer sur Espace"],
    ["Que fait un triple-clic dans un texte ?", "Sélectionne le paragraphe", "Ferme le document", "Imprime la page"],
    ["Quelle touche efface le caractère à gauche du curseur ?", "Retour arrière", "Suppr", "Entrée"],
    ["Comment rétablir une action annulée ?", "Ctrl + Y", "Ctrl + C", "Ctrl + X"],
    ["Où se trouvent les onglets Accueil, Insertion et Mise en page ?", "Dans le ruban", "Dans la barre d'état", "Dans la Corbeille"],
    ["Pourquoi enregistrer souvent ?", "Pour perdre moins de travail en cas de coupure", "Pour que Word aille plus vite", "Pour réduire la taille de l'écran"],
  ]),
  quiz(5, "Quiz 5 — Word : mise en forme", "Caractères, paragraphes et listes", [
    ["Quel raccourci met un texte en gras ?", "Ctrl + G", "Ctrl + U", "Ctrl + E"],
    ["Quel raccourci centre un paragraphe ?", "Ctrl + E", "Ctrl + J", "Ctrl + D"],
    ["Avant de mettre en forme un texte, que faut-il faire ?", "Le sélectionner", "L'imprimer", "Le copier dans un autre fichier"],
    ["Quelle liste utiliser pour des étapes dans un ordre précis ?", "La liste numérotée", "La liste à puces", "Le tableau"],
    ["À quoi sert « Justifier » (Ctrl + J) ?", "À aligner le texte à gauche et à droite", "À souligner le texte", "À changer la police"],
    ["Que fait le pinceau (Reproduire la mise en forme) ?", "Copie le style d'un texte sur un autre", "Colorie la page", "Efface la mise en forme du document"],
    ["Quel raccourci met un texte en italique ?", "Ctrl + I", "Ctrl + G", "Ctrl + B"],
    ["Quelle taille de police est courante pour un courrier ?", "11 ou 12", "2", "72"],
    ["Que mesure l'interligne ?", "L'espace entre les lignes", "La largeur de la page", "Le nombre de mots"],
    ["Combien de polices vaut-il mieux utiliser dans un document propre ?", "Une seule, ou deux au maximum", "Dix", "Autant que possible"],
  ]),
  quiz(6, "Quiz 6 — Word : insérer et imprimer", "Images, tableaux, orthographe, PDF", [
    ["Comment redimensionner une image sans la déformer ?", "En tirant sur un coin", "En tirant sur un côté", "En l'imprimant"],
    ["Quelle touche lance la vérification orthographique ?", "F7", "F2", "F12"],
    ["Que signifie un soulignement rouge dans Word ?", "Une faute d'orthographe probable", "Un mot en gras", "Un lien Internet"],
    ["Quel raccourci ouvre l'aperçu avant impression ?", "Ctrl + P", "Ctrl + F", "Ctrl + Q"],
    ["Quel onglet permet d'insérer un tableau ?", "Insertion", "Révision", "Affichage"],
    ["Quelle touche passe à la cellule suivante d'un tableau ?", "Tab", "Échap", "Suppr"],
    ["Que fait Ctrl + H ?", "Remplace un mot par un autre", "Imprime la page", "Ferme Word"],
    ["Pourquoi exporter un document en PDF ?", "Pour l'envoyer sans qu'il soit facilement modifié", "Pour le rendre plus long", "Pour le supprimer"],
    ["Quelle orientation est « paysage » ?", "La page est plus large que haute", "La page est plus haute que large", "La page est vide"],
    ["Que faut-il toujours faire avant d'imprimer ?", "Regarder l'aperçu", "Éteindre l'ordinateur", "Supprimer le document"],
  ]),
];
