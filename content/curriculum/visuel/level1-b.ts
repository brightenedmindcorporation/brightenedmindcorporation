import { finalQuiz, lesson, quiz } from "../bureautique/builders";

// Niveau 1 · Image et design graphique — leçons 7 à 12 : texte, affiche, Illustrator, logo et projet.

export const lessonsB = [
  lesson({
    id: 7,
    title: "Photoshop : texte et effets de calque",
    subtitle: "Écrire, styliser et mettre en valeur un texte.",
    sections: [
      {
        heading: "Ajouter du texte",
        body: [
          "L'outil Texte (T) : cliquez dans l'image, tapez, puis validez avec la coche ou Ctrl + Entrée.",
          "Un texte « ponctuel » (un clic) convient aux titres ; un texte « de paragraphe » (on trace une zone) convient aux textes longs.",
          "Chaque texte crée automatiquement son propre calque.",
          "Le panneau Caractère règle la police, la taille, l'interlignage, l'espacement et la couleur.",
        ],
      },
      {
        heading: "Mise en forme",
        body: [
          "Choisissez une police lisible et adaptée au message : sobre pour une entreprise, expressive pour un événement.",
          "Alignez le texte (gauche, centré, droite) en cohérence avec le reste du visuel.",
          "Un interlignage trop serré ou trop large fatigue la lecture : essayez 110 à 130 % de la taille.",
          "Vérifiez toujours l'orthographe avant d'exporter.",
        ],
      },
      {
        heading: "Effets de calque",
        body: [
          "Double-clic sur un calque ouvre les Styles de calque : ombre portée, contour, lueur, incrustation de couleur ou de dégradé.",
          "Une légère ombre portée détache un texte de son fond ; un contour fin améliore la lisibilité.",
          "Évitez l'excès : trop d'effets donnent un aspect brouillon.",
          "Copiez un style d'un calque à un autre : clic droit > Copier le style de calque.",
        ],
      },
      {
        heading: "Lisibilité",
        body: [
          "Le contraste entre le texte et le fond est la première règle : texte clair sur fond sombre ou l'inverse.",
          "Sur une photo chargée, ajoutez un calque sombre à faible opacité sous le texte.",
          "Gardez une marge de sécurité : le texte ne doit pas toucher les bords.",
          "Pour l'impression, convertissez ou fournissez les polices utilisées pour éviter les remplacements.",
        ],
      },
    ],
    caseTitle: "Le titre du concert",
    caseLines: [
      "Neema écrit « Grand concert de louange » en grosses lettres blanches sur une photo de foule.",
      "Le texte se perd dans la lumière du fond : elle ajoute un calque noir à 40 % d'opacité sous le titre.",
      "Elle applique une ombre portée légère et choisit un sous-titre plus petit dans la même famille de polices.",
      "Elle contrôle l'orthographe et laisse une marge autour du texte avant d'exporter.",
    ],
    tasks: [
      "Écrivez un titre et un sous-titre avec la même police en deux tailles.",
      "Ajoutez une ombre portée et un contour à un texte, puis supprimez ce qui est de trop.",
      "Améliorez la lisibilité d'un texte sur une photo chargée.",
      "Copiez un style de calque d'un texte à un autre.",
    ],
    goal: "Ajouter, mettre en forme et styliser un texte lisible dans Photoshop.",
    video: "Photoshop : texte et styles de calque",
  }),
  lesson({
    id: 8,
    title: "Créer une affiche ou un flyer",
    subtitle: "Assembler tous les éléments d'un visuel complet.",
    sections: [
      {
        heading: "Préparer le projet",
        body: [
          "Définissez l'objectif : annoncer, vendre, informer ? Pour qui ? Où sera-t-il affiché ou publié ?",
          "Rassemblez le contenu : texte final, logo, photos libres de droits, coordonnées.",
          "Choisissez le format : A4 ou A3 pour l'impression, carré ou vertical pour les réseaux sociaux.",
          "Faites un croquis rapide (zones titre, image, informations, logo) avant d'ouvrir le logiciel.",
        ],
      },
      {
        heading: "Construire le visuel",
        body: [
          "Créez le document à la bonne taille et au bon mode de couleur.",
          "Placez d'abord le fond et l'image principale, puis le titre, puis les informations, enfin le logo.",
          "Respectez la hiérarchie : titre (le plus grand), date et lieu (moyens), détails (petits).",
          "Gardez des marges régulières et alignez les éléments.",
        ],
      },
      {
        heading: "Les éléments obligatoires",
        body: [
          "Un titre accrocheur qui dit l'essentiel en quelques mots.",
          "La date, l'heure et le lieu ; un contact ou un lien.",
          "Un appel à l'action : « Réservez », « Inscrivez-vous », « Venez nombreux ».",
          "Le logo et, si besoin, les mentions légales ou les partenaires.",
        ],
      },
      {
        heading: "Contrôler et livrer",
        body: [
          "Relisez chaque mot, chaque chiffre, chaque numéro de téléphone.",
          "Demandez l'avis de quelqu'un qui ne connaît pas le projet.",
          "Exportez en JPG ou PNG pour les réseaux sociaux ; en PDF haute qualité pour l'imprimeur.",
          "Gardez le fichier de travail PSD pour de futures modifications.",
        ],
      },
    ],
    caseTitle: "L'affiche de l'inauguration",
    caseLines: [
      "Une école veut une affiche pour l'inauguration de sa nouvelle bibliothèque.",
      "Neema fait un croquis, rassemble la photo du bâtiment, le logo et le texte validé par la direction.",
      "Elle construit l'affiche en A3 en 300 ppi avec un titre fort, la date, le lieu et un appel à venir nombreux.",
      "Après relecture par la directrice, elle exporte un PDF pour l'imprimeur et un PNG pour les réseaux sociaux.",
    ],
    tasks: [
      "Rédigez le brief d'une affiche : objectif, public, support, contenus.",
      "Dessinez un croquis avec les zones titre, image, informations et logo.",
      "Réalisez l'affiche dans Photoshop au bon format.",
      "Exportez deux versions : pour l'impression et pour les réseaux sociaux.",
    ],
    goal: "Concevoir une affiche ou un flyer complet, lisible et prêt à être diffusé.",
    video: "Créer une affiche professionnelle avec Photoshop",
  }),
  lesson({
    id: 9,
    title: "Illustrator : découvrir le vectoriel",
    subtitle: "Formes, couleurs et plans de travail.",
    sections: [
      {
        heading: "L'espace de travail",
        body: [
          "Comme dans Photoshop : barre de menus, barre d'outils à gauche, panneaux à droite.",
          "Le plan de travail est la zone qui sera exportée ou imprimée ; on peut en créer plusieurs.",
          "Le panneau Propriétés donne accès aux réglages de l'objet sélectionné.",
          "Fichier > Nouveau : choisissez le profil (Web, Impression) et la taille du plan de travail.",
        ],
      },
      {
        heading: "Dessiner des formes",
        body: [
          "Rectangle (M), Ellipse (L), Polygone, Étoile, Trait : dessinez en cliquant et en glissant.",
          "Maintenez Maj pour des formes parfaites (carré, cercle).",
          "Chaque forme a un fond (remplissage) et un contour (trait) réglables séparément.",
          "L'outil Sélection (V) déplace et redimensionne ; l'outil Sélection directe (A) modifie les points.",
        ],
      },
      {
        heading: "Couleurs et dégradés",
        body: [
          "Le panneau Nuancier regroupe vos couleurs : enregistrez celles de la marque.",
          "Les dégradés se règlent avec le panneau Dégradé : couleurs, positions, angle.",
          "Le contour peut avoir une épaisseur, des pointillés et des extrémités arrondies.",
          "Travaillez en RVB pour le web, en CMJN pour l'impression.",
        ],
      },
      {
        heading: "Organiser et aligner",
        body: [
          "Le panneau Aligner place les objets précisément : au centre, à gauche, répartis uniformément.",
          "Ctrl + G groupe des objets ; Ctrl + Maj + G les dissocie.",
          "L'ordre de superposition se règle avec Objet > Disposition.",
          "Les calques d'Illustrator servent à organiser les éléments d'un dessin complexe.",
        ],
      },
    ],
    caseTitle: "Le premier dessin vectoriel",
    caseLines: [
      "Neema dessine un simple soleil : un cercle jaune, des triangles orange et un fond bleu.",
      "Elle utilise Maj pour obtenir un cercle parfait et le panneau Aligner pour le centrer.",
      "Elle enregistre ses trois couleurs dans le nuancier pour les réutiliser.",
      "Quand elle agrandit son dessin à dix fois sa taille, il reste parfaitement net.",
    ],
    tasks: [
      "Créez un document avec un plan de travail de 1000 × 1000 pixels.",
      "Dessinez cinq formes avec des couleurs et des contours différents.",
      "Alignez et répartissez trois formes avec le panneau Aligner.",
      "Enregistrez trois couleurs dans le nuancier.",
    ],
    goal: "Dessiner, colorer et organiser des formes vectorielles dans Illustrator.",
    video: "Illustrator : découverte du dessin vectoriel pour débutants",
  }),
  lesson({
    id: 10,
    title: "Illustrator : la plume et les tracés",
    subtitle: "Dessiner des courbes et modifier des formes.",
    sections: [
      {
        heading: "L'outil Plume",
        body: [
          "La plume (P) dessine des tracés point par point : un clic crée un angle, un clic-glissé crée une courbe.",
          "Chaque point d'ancrage a des poignées qui règlent la courbure.",
          "Fermez un tracé en cliquant sur son premier point.",
          "Les tracés ouverts (lignes) et fermés (formes) se traitent différemment.",
        ],
      },
      {
        heading: "Modifier un tracé",
        body: [
          "L'outil Sélection directe (A) permet de déplacer les points et d'ajuster les poignées.",
          "Ajoutez ou supprimez un point d'ancrage avec les outils + et −.",
          "Le contour peut avoir des extrémités arrondies pour un style plus doux.",
          "Moins de points donne des courbes plus propres.",
        ],
      },
      {
        heading: "Pathfinder",
        body: [
          "Le panneau Pathfinder combine des formes : Union (fusionne), Intersection (garde la partie commune), Soustraction.",
          "Il permet de créer des formes complexes à partir de formes simples (cercles, rectangles).",
          "Un logo se construit souvent ainsi, avec quelques formes bien alignées.",
          "Gardez une copie avant de fusionner les formes pour pouvoir revenir en arrière.",
        ],
      },
      {
        heading: "Texte et vectorisation",
        body: [
          "Le texte d'Illustrator reste modifiable ; Texte > Vectoriser le texte le transforme en formes (pour un logo prêt à l'envoi).",
          "La vectorisation de l'image (Tracé de l'image) convertit une image simple en vectoriel.",
          "Réservez-la aux dessins simples : une photo vectorisée donne un résultat lourd et peu fidèle.",
          "Nettoyez les points inutiles après une vectorisation.",
        ],
      },
    ],
    caseTitle: "Une feuille et un cœur",
    caseLines: [
      "Neema dessine une feuille avec la plume : quelques points et des poignées bien réglées donnent une courbe douce.",
      "Elle crée un cœur en combinant deux cercles et un triangle avec le Pathfinder (Union).",
      "Elle vectorise un dessin fait à la main sur papier après l'avoir photographié, puis nettoie les points.",
      "Elle garde ces formes comme éléments de son futur logo.",
    ],
    tasks: [
      "Dessinez une feuille et une goutte avec la plume.",
      "Modifiez leurs courbes avec la sélection directe.",
      "Créez une forme complexe avec le Pathfinder (Union et Soustraction).",
      "Vectorisez un croquis simple et nettoyez le résultat.",
    ],
    goal: "Dessiner et modifier des tracés avec la plume et combiner des formes avec Pathfinder.",
    video: "Illustrator : l'outil Plume et Pathfinder",
  }),
  lesson({
    id: 11,
    title: "Illustrator : créer un logo",
    subtitle: "Du croquis au fichier prêt à l'emploi.",
    sections: [
      {
        heading: "Qu'est-ce qu'un bon logo",
        body: [
          "Simple : reconnaissable en quelques secondes.",
          "Lisible en petit (carte de visite) comme en grand (panneau).",
          "Adaptable : efficace en couleurs, en noir et blanc, sur fond clair ou foncé.",
          "Unique : différent de ceux des concurrents, et jamais copié.",
        ],
      },
      {
        heading: "De l'idée au dessin",
        body: [
          "Définissez la marque : métier, valeurs, public, style (sérieux, jeune, chaleureux).",
          "Faites plusieurs croquis à la main avant d'ouvrir le logiciel.",
          "Construisez la version retenue avec des formes simples et la plume.",
          "Choisissez une police adaptée pour le nom et réglez l'espacement des lettres.",
        ],
      },
      {
        heading: "Les déclinaisons",
        body: [
          "Version principale (symbole + nom), version horizontale, version verticale, symbole seul.",
          "Version en noir et blanc et en négatif (clair sur fond sombre).",
          "Une zone de protection autour du logo évite que d'autres éléments l'écrasent.",
          "Une taille minimale garantit la lisibilité.",
        ],
      },
      {
        heading: "Les fichiers à livrer",
        body: [
          "Un fichier source AI avec les calques et les couleurs.",
          "Des exports vectoriels : SVG et PDF.",
          "Des exports PNG avec fond transparent en plusieurs tailles.",
          "Les codes couleur (RVB et CMJN) et les polices utilisées.",
        ],
      },
    ],
    caseTitle: "Le logo de la boutique",
    caseLines: [
      "Neema veut un logo pour sa boutique « Les Cahiers de Neema ». Elle dessine d'abord cinq croquis sur papier.",
      "Elle retient un cahier ouvert dont les pages forment un petit oiseau, dessiné avec trois formes et la plume.",
      "Elle teste le logo en noir et blanc, en petit sur une carte et en grand sur une enseigne.",
      "Elle livre le fichier source, les exports SVG, PDF et PNG transparents, et la liste des couleurs.",
    ],
    tasks: [
      "Faites cinq croquis de logo pour une marque fictive.",
      "Dessinez le logo choisi dans Illustrator avec des formes simples.",
      "Créez la version noir et blanc et la version négatif.",
      "Exportez en SVG, PDF et PNG transparent et nommez les fichiers clairement.",
    ],
    goal: "Concevoir un logo simple et adaptable, et livrer tous les fichiers nécessaires.",
    video: "Créer un logo avec Illustrator",
  }),
  lesson({
    id: 12,
    title: "Révision finale et mini-projet",
    subtitle: "Un visuel complet pour un événement.",
    sections: [
      {
        heading: "Ce que vous avez appris",
        body: [
          "L'image numérique : pixels, résolution, formats, RVB et CMJN.",
          "Les règles du design : couleur, typographie, composition, hiérarchie.",
          "Photoshop : interface, calques, détourage, retouche, texte.",
          "Illustrator : formes, plume, Pathfinder, logo.",
        ],
      },
      {
        heading: "Le projet",
        body: [
          "Choisissez un événement fictif (concert, conférence, inauguration, vente).",
          "Créez le logo de l'organisateur dans Illustrator.",
          "Réalisez l'affiche A3 et la version carrée pour les réseaux sociaux dans Photoshop.",
          "Préparez les exports et un petit dossier de présentation.",
        ],
      },
      {
        heading: "La liste de contrôle",
        body: [
          "Format, résolution et mode de couleur corrects.",
          "Titre, date, lieu, contact et appel à l'action présents.",
          "Texte relu, contraste suffisant, marges respectées.",
          "Fichiers sources et exports bien nommés et classés.",
        ],
      },
      {
        heading: "Présenter son travail",
        body: [
          "Présentez le brief, les choix de couleurs et de polices, puis le résultat.",
          "Montrez quelques versions testées et expliquez celle que vous avez gardée.",
          "Recevez les critiques avec ouverture : elles font progresser.",
          "Constituez un portfolio avec vos meilleurs projets.",
        ],
      },
    ],
    caseTitle: "Le dossier du client",
    caseLines: [
      "Neema remet à son client le logo, l'affiche A3, la version carrée et un document expliquant ses choix.",
      "Le client demande de changer la couleur du titre : grâce aux calques et aux fichiers sources, c'est fait en deux minutes.",
      "Il imprime l'affiche et publie la version carrée sur ses réseaux.",
      "Neema ajoute ce projet à son portfolio.",
    ],
    tasks: [
      "Réalisez le projet complet avec votre événement fictif.",
      "Vérifiez la liste de contrôle et corrigez les erreurs.",
      "Présentez votre projet en cinq minutes à un collègue.",
      "Ajoutez-le à un portfolio (dossier ou page en ligne).",
    ],
    goal: "Réaliser un projet de visuel complet : logo, affiche imprimée et version pour les réseaux sociaux.",
    video: "Projet complet de design graphique avec Photoshop et Illustrator",
  }),
];

export const quizzesB = [
  quiz(7, "Quiz 7 — Photoshop : texte", "Texte et effets de calque", [
    ["Quelle touche active l'outil Texte ?", "T", "R", "Z"],
    ["Que crée automatiquement un texte ?", "Son propre calque", "Un fichier PDF", "Un nouveau document"],
    ["Quel panneau règle la police et la taille ?", "Le panneau Caractère", "Le panneau Historique", "Le panneau Couleur de l'écran"],
    ["Comment ouvrir les styles de calque ?", "Double-clic sur le calque", "Appuyer sur Échap", "Fermer Photoshop"],
    ["À quoi sert une ombre portée légère ?", "Détacher le texte de son fond", "Supprimer le texte", "Alourdir le fichier"],
    ["Quelle règle est essentielle pour un texte ?", "Un bon contraste avec le fond", "Utiliser toutes les polices", "Écrire en petit"],
    ["Que faire d'une photo chargée sous un titre ?", "Ajouter un calque sombre à faible opacité", "Supprimer le titre", "Passer en CMJN"],
    ["Pourquoi laisser une marge de sécurité ?", "Pour que le texte ne touche pas les bords", "Pour changer la couleur", "Pour imprimer plus vite"],
    ["Que faut-il toujours faire avant d'exporter ?", "Vérifier l'orthographe", "Éteindre l'écran", "Doubler le texte"],
    ["Que faire pour copier un style d'un calque à un autre ?", "Clic droit > Copier le style de calque", "Ctrl + Q", "Renommer le calque"],
  ]),
  quiz(8, "Quiz 8 — Affiche et flyer", "Du brief à l'export", [
    ["Quelle est la première étape d'une affiche ?", "Définir l'objectif et le public", "Choisir l'imprimante", "Exporter en PDF"],
    ["Quel format pour imprimer une affiche ?", "A3 ou A4 en 300 ppi", "100 × 100 pixels", "72 ppi minuscule"],
    ["Quelles informations sont indispensables sur une affiche d'événement ?", "Titre, date, lieu et contact", "Seulement le logo", "Seulement une photo"],
    ["Qu'est-ce qu'un appel à l'action ?", "Une phrase qui invite à agir (réservez, venez)", "Un type de police", "Un fond d'écran"],
    ["Que montre un croquis ?", "La disposition des zones avant de commencer", "Le prix de l'impression", "La couleur de l'écran"],
    ["Quel ordre de taille respecter ?", "Titre, puis date et lieu, puis détails", "Détails, puis titre", "Tout à la même taille"],
    ["Que faire avant de livrer ?", "Relire chaque mot et chaque chiffre", "Supprimer le logo", "Changer de police"],
    ["Quelle version pour l'imprimeur ?", "Un PDF haute qualité", "Une capture d'écran", "Un GIF"],
    ["Que garder pour de futures modifications ?", "Le fichier de travail PSD", "Rien", "Une photo de l'écran"],
    ["Pourquoi demander l'avis de quelqu'un qui ne connaît pas le projet ?", "Pour vérifier que le message est clair", "Pour changer de logiciel", "Pour gagner du temps"],
  ]),
  quiz(9, "Quiz 9 — Illustrator : bases", "Formes, couleurs et alignement", [
    ["Qu'est-ce que le plan de travail ?", "La zone exportée ou imprimée", "Un type de police", "Un fichier PDF"],
    ["Quelle touche garde les proportions d'une forme ?", "Maj", "Tab", "Échap"],
    ["Quel outil déplace et redimensionne ?", "Sélection (V)", "Texte", "Gomme"],
    ["Quel outil modifie les points d'un tracé ?", "Sélection directe (A)", "Rectangle", "Zoom"],
    ["Que règle le contour d'une forme ?", "L'épaisseur et le style du trait", "Le fond de l'écran", "Le format du fichier"],
    ["Quel panneau place précisément les objets ?", "Aligner", "Historique", "Couleur de l'écran"],
    ["Quel raccourci groupe des objets ?", "Ctrl + G", "Ctrl + Q", "Ctrl + W"],
    ["À quoi sert le nuancier ?", "Enregistrer les couleurs à réutiliser", "Imprimer", "Changer la langue"],
    ["Quel mode de couleur pour le web ?", "RVB", "CMJN", "Aucun"],
    ["Pourquoi le vectoriel est-il pratique ?", "On l'agrandit sans perte de qualité", "Il est toujours plus léger qu'une photo", "Il ne contient pas de couleurs"],
  ]),
  quiz(10, "Quiz 10 — Illustrator : la plume", "Tracés et Pathfinder", [
    ["Quelle touche active la plume ?", "P", "X", "K"],
    ["Que crée un clic-glissé avec la plume ?", "Une courbe", "Un angle droit", "Un texte"],
    ["Comment fermer un tracé ?", "Cliquer sur son premier point", "Appuyer sur Échap", "Fermer le logiciel"],
    ["Que permettent les poignées d'un point ?", "Régler la courbure", "Changer la couleur", "Imprimer"],
    ["Que fait l'Union dans Pathfinder ?", "Elle fusionne les formes", "Elle les supprime", "Elle les imprime"],
    ["Que fait l'Intersection ?", "Elle garde la partie commune", "Elle fusionne tout", "Elle copie le fichier"],
    ["Que fait Texte > Vectoriser ?", "Il transforme le texte en formes", "Il corrige l'orthographe", "Il change la police"],
    ["Pour quoi réserver le Tracé de l'image ?", "Pour des dessins simples", "Pour toutes les photos", "Pour supprimer le fond"],
    ["Pourquoi limiter le nombre de points ?", "Pour des courbes plus propres", "Pour augmenter le poids", "Pour changer de format"],
    ["Que faire avant de fusionner des formes ?", "Garder une copie", "Tout supprimer", "Éteindre l'ordinateur"],
  ]),
  quiz(11, "Quiz 11 — Le logo", "Conception et livraison", [
    ["Quelle qualité a un bon logo ?", "Simple et reconnaissable", "Très chargé", "Illisible en petit"],
    ["Que tester pour un logo ?", "Noir et blanc, petit et grand", "Seulement en 3D", "Seulement en rouge"],
    ["Que faire avant d'ouvrir le logiciel ?", "Faire plusieurs croquis à la main", "Exporter", "Imprimer"],
    ["Qu'est-ce qu'une zone de protection ?", "L'espace libre autour du logo", "Un dossier protégé par mot de passe", "Un type de police"],
    ["Quel format de fichier pour le logo vectoriel web ?", "SVG", "PSD", "MP3"],
    ["Quel format garde un fond transparent ?", "PNG", "JPG", "BMP"],
    ["À quoi sert la version en négatif ?", "Servir sur un fond sombre", "Supprimer le logo", "Réduire le poids"],
    ["Que livrer en plus des fichiers ?", "Les codes couleur et les polices utilisées", "Une photo du bureau", "Rien"],
    ["Peut-on copier le logo d'un concurrent ?", "Non, un logo doit être unique", "Oui, toujours", "Oui, s'il est joli"],
    ["Pourquoi une taille minimale ?", "Garantir la lisibilité", "Gagner de la place", "Alourdir le fichier"],
  ]),
  quiz(12, "Quiz 12 — Révision du niveau 1", "Image, design, Photoshop et Illustrator", [
    ["Quel logiciel pour retoucher une photo ?", "Photoshop", "Illustrator", "Excel"],
    ["Quel logiciel pour dessiner un logo ?", "Illustrator", "Photoshop", "Word"],
    ["Quel format garde les calques ?", "PSD", "JPG", "PNG seulement"],
    ["Quelle résolution pour l'impression ?", "300 ppi", "30 ppi", "3 ppi"],
    ["Quel mode de couleur pour l'écran ?", "RVB", "CMJN", "Aucun"],
    ["Quel raccourci annule ?", "Ctrl + Z", "Ctrl + P", "Ctrl + W"],
    ["Quel est un bon contraste ?", "Texte clair sur fond sombre ou l'inverse", "Gris sur gris", "Jaune sur blanc"],
    ["Que garantit un masque de fusion ?", "Un travail réversible", "Un fichier plus lourd", "Aucun effet"],
    ["Combien de polices maximum conseillées ?", "Deux", "Dix", "Vingt"],
    ["Que faire avant de livrer un visuel ?", "Relire et vérifier", "Supprimer la source", "Changer le logo"],
  ]),
];

export const final1 = finalQuiz(
  "Quiz final — Niveau 1 Image et design",
  "Image numérique, design graphique, Photoshop et Illustrator",
  [
    ["De quoi est faite une photo numérique ?", "De pixels", "De vecteurs seulement", "De son"],
    ["Quelle résolution pour imprimer ?", "300 ppi", "72 ppi uniquement", "1 ppi"],
    ["Quel format garde la transparence ?", "PNG", "JPG", "MP4"],
    ["Quel mode de couleur pour l'imprimerie ?", "CMJN", "RVB", "Gris"],
    ["Combien de polices maximum dans un visuel simple ?", "Deux", "Dix", "Cinq par ligne"],
    ["Que dit la règle des tiers ?", "Placer les éléments importants sur les lignes d'une grille 3×3", "Utiliser trois couleurs seulement", "Faire trois versions"],
    ["Qu'est-ce qu'un calque ?", "Une feuille transparente superposée", "Un type de fichier", "Une police"],
    ["Que fait un masque de fusion ?", "Cache ou révèle sans supprimer", "Supprime définitivement", "Imprime"],
    ["Quel raccourci lance la transformation libre ?", "Ctrl + T", "Ctrl + J", "Ctrl + F"],
    ["Pourquoi utiliser des calques de réglage ?", "Retoucher sans abîmer l'original", "Ajouter du poids", "Changer de format"],
    ["Quelle information est indispensable sur une affiche d'événement ?", "Date, lieu et contact", "Seulement le titre", "Seulement une photo"],
    ["Que fait le tampon de duplication ?", "Copie une zone saine sur une autre", "Imprime une copie", "Agrandit l'image"],
    ["Quel outil dessine des courbes dans Illustrator ?", "La plume", "La gomme", "Le zoom"],
    ["Que fait Pathfinder ?", "Combine des formes", "Importe des vidéos", "Exporte en MP3"],
    ["Quel format vectoriel pour le web ?", "SVG", "PSD", "DOC"],
    ["Qu'est-ce qu'une déclinaison de logo ?", "Une version adaptée (noir et blanc, horizontale…)", "Un autre logo", "Une copie du concurrent"],
    ["Pourquoi garder les fichiers sources ?", "Pour modifier plus tard", "Pour alourdir le dossier", "Pour les supprimer"],
    ["Que faut-il vérifier avant d'envoyer à l'imprimeur ?", "Format, résolution, mode de couleur et orthographe", "La météo", "La couleur de l'ordinateur"],
    ["Peut-on utiliser n'importe quelle image trouvée en ligne ?", "Non, il faut en avoir les droits", "Oui, toujours", "Oui, si elle est belle"],
    ["Quel est le bon réflexe avant de livrer ?", "Relire et demander un avis", "Livrer sans relire", "Tout supprimer"],
  ]
);
