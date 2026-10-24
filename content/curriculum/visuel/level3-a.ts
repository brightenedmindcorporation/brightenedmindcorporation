import { lesson, quiz } from "../bureautique/builders";

// Niveau 3 · Perfectionnement et diffusion en direct — leçons 1 à 6 : design avancé, impression et montage avancé.

export const lessonsA3 = [
  lesson({
    id: 1,
    title: "Photoshop avancé : travailler sans rien détruire",
    subtitle: "Masques, calques de réglage, objets dynamiques et filtres.",
    sections: [
      {
        heading: "Le travail non destructif",
        body: [
          "Un travail non destructif garde toujours la possibilité de revenir en arrière : on corrige sans perdre l'original.",
          "Il repose sur trois outils : les masques de fusion, les calques de réglage et les objets dynamiques.",
          "Évitez de peindre ou de gommer directement sur la photo d'origine ; travaillez sur des calques à part.",
          "Nommez et groupez vos calques : un fichier propre se relit en quelques secondes.",
        ],
      },
      {
        heading: "Masques et sélections avancées",
        body: [
          "Un masque de fusion cache ou révèle des parties d'un calque avec du noir et du blanc ; les gris donnent des transparences partielles.",
          "Un dégradé noir-blanc sur un masque crée une transition douce entre deux images.",
          "Les masques d'écrêtage limitent un calque à la forme du calque du dessous.",
          "Les plages de couleurs et les canaux aident à sélectionner des éléments délicats (cheveux, ciel, fumée).",
        ],
      },
      {
        heading: "Calques de réglage et objets dynamiques",
        body: [
          "Les calques de réglage (Courbes, Niveaux, Mélangeur de couches, Correspondance de couleur) retouchent toute l'image ou une zone grâce à leur masque.",
          "Un objet dynamique conserve les données d'origine : on le réduit puis on le réagrandit sans perte.",
          "Les filtres appliqués à un objet dynamique deviennent des filtres intelligents : modifiables et masquables à tout moment.",
          "Les fichiers sources liés se mettent à jour partout où ils sont utilisés.",
        ],
      },
      {
        heading: "Photomontage réaliste",
        body: [
          "Adaptez la lumière : direction, couleur et intensité identiques entre les éléments.",
          "Ajoutez des ombres : sous les objets et selon la source lumineuse.",
          "Harmonisez les couleurs avec un calque de réglage appliqué à tout l'ensemble.",
          "Zoomez à 100 % pour contrôler les bords, puis regardez l'image entière avec du recul.",
        ],
      },
    ],
    caseTitle: "La couverture du magazine",
    caseLines: [
      "Neema doit placer un artiste sur un fond de scène pour la couverture d'un magazine.",
      "Elle détoure l'artiste avec un masque de fusion, ajoute un calque Courbes pour la lumière et une ombre sur le sol.",
      "Elle convertit le logo du magazine en objet dynamique pour le réduire et l'agrandir sans perte.",
      "Quand l'éditeur change la photo, elle remplace simplement l'objet dynamique : tout le reste s'adapte.",
    ],
    tasks: [
      "Réalisez un photomontage avec trois éléments et un masque pour chacun.",
      "Ajoutez deux calques de réglage masqués sur une zone précise.",
      "Convertissez un calque en objet dynamique et appliquez un filtre intelligent.",
      "Vérifiez que tout est réversible : retrouvez l'original à tout moment.",
    ],
    goal: "Réaliser un photomontage réaliste avec masques, calques de réglage et objets dynamiques.",
    video: "Photoshop avancé : masques, calques de réglage et objets dynamiques",
  }),
  lesson({
    id: 2,
    title: "Visuels pour les réseaux sociaux et la publicité",
    subtitle: "Des séries cohérentes, adaptées à chaque plateforme.",
    sections: [
      {
        heading: "Les formats courants",
        body: [
          "Publication carrée : 1080 × 1080 pixels. Publication portrait : 1080 × 1350. Stories et formats verticaux : 1080 × 1920.",
          "Bannière ou couverture : de format large, avec le texte placé au centre pour éviter les coupures selon l'écran.",
          "Miniature de vidéo : 1280 × 720 avec un texte court et un visage ou un objet bien visible.",
          "Les formats changent : vérifiez les dimensions actuelles de chaque plateforme.",
        ],
      },
      {
        heading: "Une identité cohérente",
        body: [
          "Gardez les mêmes couleurs, polices et style de photos dans toutes vos publications.",
          "Créez des modèles (gabarits) pour gagner du temps et rester cohérent.",
          "Alternez les types de contenu : annonces, conseils, témoignages, coulisses.",
          "Prévoyez une grille de publications pour voir l'ensemble du fil.",
        ],
      },
      {
        heading: "Le message publicitaire",
        body: [
          "Un seul message par visuel : l'offre, l'événement ou le bénéfice.",
          "Un titre accrocheur, une image forte et un appel à l'action clair.",
          "Peu de texte : plus un visuel est simple, plus il est retenu.",
          "Mentionnez les informations légales nécessaires (prix, conditions) lisiblement.",
        ],
      },
      {
        heading: "Tester et mesurer",
        body: [
          "Testez deux versions d'un visuel (titre ou couleur différents) et regardez laquelle fonctionne mieux.",
          "Mesurez les résultats : vues, clics, messages, ventes.",
          "Adaptez vos prochains visuels en fonction des résultats.",
          "Respectez les règles de chaque plateforme (quantité de texte, contenus autorisés).",
        ],
      },
    ],
    caseTitle: "Une série pour la rentrée",
    caseLines: [
      "Pour la rentrée, Neema crée un gabarit avec les couleurs de la boutique, une police unique et un cadre pour la photo du produit.",
      "Elle décline le gabarit en cinq visuels carrés, trois stories et une bannière.",
      "Elle teste deux titres pour la promotion : « -20 % cette semaine » contre « Offre de rentrée ».",
      "Elle garde celui qui obtient le plus de messages et utilise le gabarit pour les prochains mois.",
    ],
    tasks: [
      "Créez un gabarit de publication avec trois couleurs, une police et un emplacement pour la photo.",
      "Déclinez-le en carré, portrait et story.",
      "Rédigez trois accroches pour une promotion et choisissez-en une.",
      "Préparez une grille de six publications cohérentes.",
    ],
    goal: "Créer une série de visuels cohérents, adaptés aux formats de chaque plateforme.",
    video: "Créer des visuels pour les réseaux sociaux avec Photoshop",
  }),
  lesson({
    id: 3,
    title: "Illustrator : l'identité visuelle",
    subtitle: "Du logo à la charte graphique.",
    sections: [
      {
        heading: "Qu'est-ce qu'une identité visuelle",
        body: [
          "C'est l'ensemble des éléments qui rendent une marque reconnaissable : logo, couleurs, polices, images, style.",
          "Elle doit refléter les valeurs de la marque (sérieux, jeunesse, tradition, innovation).",
          "Elle est utilisée partout : cartes, affiches, site, réseaux, emballages, vêtements.",
          "Une identité cohérente inspire confiance.",
        ],
      },
      {
        heading: "La charte graphique",
        body: [
          "C'est le document qui explique comment utiliser l'identité : un mode d'emploi de la marque.",
          "Elle contient : le logo et ses versions, la zone de protection, la taille minimale, les couleurs (codes RVB, CMJN), les polices.",
          "Elle donne des exemples de bon et de mauvais usage.",
          "Elle permet à tous (collaborateurs, imprimeurs) de respecter la même image.",
        ],
      },
      {
        heading: "Concevoir les éléments",
        body: [
          "Choisissez une palette de couleurs : une couleur principale, une ou deux secondaires, des neutres.",
          "Choisissez une police pour les titres et une pour les textes ; vérifiez qu'elles ont une licence d'utilisation adaptée.",
          "Créez des motifs ou des icônes dans le même style que le logo.",
          "Appliquez l'identité sur plusieurs supports : carte de visite, papier à en-tête, enseigne, publication.",
        ],
      },
      {
        heading: "Organiser le travail dans Illustrator",
        body: [
          "Utilisez plusieurs plans de travail dans un même document pour les différents supports.",
          "Enregistrez les couleurs globales dans le nuancier : une modification se répercute partout.",
          "Utilisez des styles de caractère et de paragraphe pour garder la cohérence.",
          "Exportez chaque plan de travail séparément en PDF, SVG ou PNG.",
        ],
      },
    ],
    caseTitle: "L'identité de la boutique",
    caseLines: [
      "Neema choisit pour sa boutique un orange chaleureux, un bleu profond et deux polices complémentaires.",
      "Elle crée dans Illustrator une carte de visite, un papier à en-tête et une enseigne avec le même logo.",
      "Elle rédige une charte de quatre pages : logo, zone de protection, couleurs, polices.",
      "Un imprimeur peut maintenant reproduire fidèlement sa marque sans lui poser de questions.",
    ],
    tasks: [
      "Définissez trois valeurs de marque fictive et une palette de couleurs correspondante.",
      "Créez une carte de visite et un papier à en-tête dans le même document.",
      "Enregistrez vos couleurs globales dans le nuancier.",
      "Rédigez une charte graphique d'une page avec le logo, les couleurs et les polices.",
    ],
    goal: "Concevoir une identité visuelle cohérente et rédiger sa charte graphique.",
    video: "Créer une identité visuelle et une charte graphique",
  }),
  lesson({
    id: 4,
    title: "Préparer des fichiers pour l'impression",
    subtitle: "Éviter les mauvaises surprises chez l'imprimeur.",
    sections: [
      {
        heading: "Les bases de l'impression",
        body: [
          "Travaillez en CMJN (ou selon la demande de l'imprimeur) et à 300 ppi pour les images.",
          "Le noir profond d'un texte se règle à part : évitez de créer du texte fin avec plusieurs encres.",
          "Les couleurs vives de l'écran peuvent paraître ternes à l'impression : testez avec une épreuve.",
          "Demandez toujours à l'imprimeur ses consignes de fichier.",
        ],
      },
      {
        heading: "Fond perdu et traits de coupe",
        body: [
          "Le fond perdu est un débordement de quelques millimètres (souvent 3 mm) autour du format pour éviter les liserés blancs à la coupe.",
          "Les traits de coupe indiquent à l'imprimeur où couper.",
          "Gardez les textes importants à l'intérieur d'une marge de sécurité (au moins 5 mm).",
          "Étendez les fonds et les images jusqu'au fond perdu.",
        ],
      },
      {
        heading: "Polices, images et exportation",
        body: [
          "Vectorisez les textes ou incorporez les polices pour éviter les remplacements.",
          "Vérifiez la résolution des images : 300 ppi à la taille d'impression.",
          "Exportez en PDF haute qualité pour l'impression, avec fond perdu et traits de coupe si demandés.",
          "Gardez une copie du fichier source ouvert pour de futures modifications.",
        ],
      },
      {
        heading: "Contrôler avant l'envoi",
        body: [
          "Relisez le texte, les numéros de téléphone, les adresses et les dates.",
          "Demandez un BAT (bon à tirer) : une épreuve à valider avant l'impression en grande quantité.",
          "Vérifiez le papier, la finition (mat, brillant) et la quantité sur le devis.",
          "Une fois validé, un fichier imprimé ne se corrige plus : relisez deux fois.",
        ],
      },
    ],
    caseTitle: "Les cartes de visite",
    caseLines: [
      "Neema envoie ses cartes de visite à l'imprimeur sans fond perdu : la bande blanche apparaît sur les bords de certaines cartes.",
      "Pour la commande suivante, elle ajoute 3 mm de fond perdu et garde le texte à 5 mm du bord.",
      "Elle exporte un PDF avec traits de coupe et demande un BAT avant le tirage.",
      "Le résultat est net et les cartes sont coupées proprement.",
    ],
    tasks: [
      "Créez une carte de visite 90 × 50 mm avec 3 mm de fond perdu.",
      "Exportez-la en PDF avec traits de coupe.",
      "Vérifiez la résolution de chaque image et la conversion des polices.",
      "Rédigez une liste de contrôle d'envoi en dix points.",
    ],
    goal: "Préparer et exporter un fichier prêt pour l'imprimerie, avec fond perdu et traits de coupe.",
    video: "Préparer un fichier pour l'imprimeur : fond perdu et PDF",
  }),
  lesson({
    id: 5,
    title: "Montage avancé : multicaméra et séquences imbriquées",
    subtitle: "Monter un événement filmé avec plusieurs caméras.",
    sections: [
      {
        heading: "Le multicaméra",
        body: [
          "Filmer un événement avec plusieurs caméras permet d'alterner les angles : plan large, plan moyen, gros plans.",
          "Les caméras doivent être synchronisées : par un son commun (une clap, un applaudissement) ou un code temporel.",
          "Les logiciels (Resolve, Premiere) synchronisent les caméras automatiquement avec le son et proposent un montage multicaméra.",
          "On « joue » le montage en temps réel en choisissant la caméra, puis on affine.",
        ],
      },
      {
        heading: "Séquences imbriquées",
        body: [
          "On imbrique (nest) plusieurs plans dans un seul bloc pour appliquer un effet ou un réglage à l'ensemble.",
          "On peut aussi créer des séquences pour des parties de film et les assembler dans une séquence principale.",
          "Cela rend les gros projets plus lisibles et modulaires.",
          "Pensez à renommer et colorer pour s'y retrouver.",
        ],
      },
      {
        heading: "Animation avec les images clés",
        body: [
          "Animez la position, l'échelle et l'opacité pour créer des effets : zoom, incrustations, écrans partagés.",
          "Les courbes d'accélération adoucissent le départ et l'arrivée des mouvements.",
          "Copier les réglages d'un clip à un autre accélère les montages répétitifs.",
          "Utilisez les marqueurs pour repérer les moments importants.",
        ],
      },
      {
        heading: "Organisation et performance",
        body: [
          "Utilisez des fichiers proxy (copies légères) pour monter fluidement des vidéos lourdes, puis exportez avec les originaux.",
          "Gardez une structure de dossiers stable : rushes, audio, graphiques, projets, exports.",
          "Sauvegardez votre projet et activez la sauvegarde automatique.",
          "Un ordinateur trop lent ralentit tout : fermez les autres programmes pendant le montage.",
        ],
      },
    ],
    caseTitle: "Le culte de dimanche",
    caseLines: [
      "Une église demande à Neema de monter le culte filmé avec trois caméras : une large, une sur le prédicateur et une sur la chorale.",
      "Elle synchronise les trois caméras avec le son, puis « joue » le montage multicaméra en choisissant l'angle.",
      "Elle ajoute des titres, un zoom lent en images clés et un fondu en fin de morceau.",
      "Elle monte avec des proxy pour rester fluide et exporte avec les fichiers originaux.",
    ],
    tasks: [
      "Synchronisez deux caméras qui filment la même scène à l'aide du son.",
      "Réalisez un montage multicaméra de deux minutes en alternant les angles.",
      "Imbriquez une séquence et appliquez un effet à l'ensemble.",
      "Créez des proxy et comparez la fluidité du montage.",
    ],
    goal: "Monter un événement filmé avec plusieurs caméras en gardant un projet organisé.",
    video: "Montage multicaméra avec DaVinci Resolve ou Premiere Pro",
  }),
  lesson({
    id: 6,
    title: "Titres animés et motion design de base",
    subtitle: "Donner du mouvement aux graphiques et au texte.",
    sections: [
      {
        heading: "Principes du mouvement",
        body: [
          "Un bon mouvement a un début, un milieu et une fin : accélération puis ralentissement.",
          "Gardez les animations courtes et sobres : elles accompagnent le message, elles ne le remplacent pas.",
          "Choisissez un style (glissement, fondu, zoom léger) et gardez-le dans toute la vidéo.",
          "Synchronisez les mouvements avec le rythme de la musique ou de la voix.",
        ],
      },
      {
        heading: "Titres animés",
        body: [
          "Animez l'apparition du texte : fondu, glissement depuis le bord, apparition lettre par lettre.",
          "Faites apparaître les informations une par une pour guider la lecture.",
          "Animez la sortie aussi : un texte qui disparaît proprement donne un aspect soigné.",
          "Utilisez des modèles de titres et personnalisez-les à votre identité.",
        ],
      },
      {
        heading: "Graphiques et infographies",
        body: [
          "Animez des chiffres qui défilent, des barres qui se remplissent, des cartes qui se colorent.",
          "Créez vos éléments graphiques dans Illustrator puis importez-les dans le logiciel de montage ou d'animation.",
          "Séparez les éléments en calques pour pouvoir les animer un par un.",
          "Gardez une lisibilité maximale : peu d'éléments, des couleurs de la charte.",
        ],
      },
      {
        heading: "Outils et formats",
        body: [
          "Fusion (DaVinci Resolve), After Effects et les modèles de titres de Premiere offrent des outils d'animation.",
          "Exportez les éléments animés avec transparence (formats prenant en charge un canal alpha) pour les superposer.",
          "Créez une bibliothèque d'éléments réutilisables : bandeaux, logos animés, transitions de marque.",
          "Respectez la durée : une animation d'introduction ne doit pas dépasser quelques secondes.",
        ],
      },
    ],
    caseTitle: "Le générique de l'émission",
    caseLines: [
      "Neema crée un petit générique animé de cinq secondes pour une émission de sa communauté.",
      "Elle dessine le logo dans Illustrator, sépare ses éléments en calques, puis les anime dans le logiciel de montage.",
      "Elle crée aussi un bandeau animé pour les invités, qui glisse depuis la gauche.",
      "Elle enregistre ces éléments dans sa bibliothèque pour les réutiliser dans chaque émission.",
    ],
    tasks: [
      "Animez l'apparition d'un titre avec un fondu et un glissement.",
      "Créez un bandeau animé nom-fonction et enregistrez-le comme modèle.",
      "Animez un petit graphique de trois chiffres.",
      "Créez un générique de cinq secondes avec le logo.",
    ],
    goal: "Créer des titres animés, des bandeaux et un générique sobres et cohérents.",
    video: "Motion design pour débutants : titres animés et génériques",
  }),
];

export const quizzesA3 = [
  quiz(1, "Quiz 1 — Photoshop avancé", "Travail non destructif", [
    ["Que veut dire non destructif ?", "On peut toujours revenir en arrière sans perdre l'original", "On supprime l'original", "On ne retouche rien"],
    ["Que fait un masque de fusion ?", "Cache ou révèle des parties d'un calque", "Imprime le calque", "Ajoute de la musique"],
    ["Que donne un dégradé noir-blanc sur un masque ?", "Une transition douce entre deux images", "Une image supprimée", "Un fichier PDF"],
    ["Que conserve un objet dynamique ?", "Les données d'origine, pour redimensionner sans perte", "Seulement le nom", "Rien"],
    ["Que devient un filtre sur un objet dynamique ?", "Un filtre intelligent, modifiable", "Un fichier supprimé", "Un calque verrouillé"],
    ["À quoi sert un calque de réglage ?", "Retoucher sans modifier l'original", "Ajouter du son", "Changer de format"],
    ["Que faut-il adapter dans un photomontage ?", "La lumière, les ombres et les couleurs", "Seulement le nom du fichier", "La taille du disque"],
    ["À quel zoom contrôler les bords ?", "À 100 % ou plus", "À 1 %", "Jamais"],
    ["Que fait un masque d'écrêtage ?", "Limite un calque à la forme du calque du dessous", "Supprime le calque", "Copie le fichier"],
    ["Pourquoi nommer et grouper les calques ?", "Pour relire facilement le fichier", "Pour alourdir", "Pour imprimer"],
  ]),
  quiz(2, "Quiz 2 — Réseaux sociaux et publicité", "Formats et cohérence", [
    ["Quelle taille pour une publication carrée ?", "1080 × 1080 pixels", "10 × 10 pixels", "9999 × 9999 pixels"],
    ["Quelle taille pour une story verticale ?", "1080 × 1920", "1920 × 1080", "300 × 300"],
    ["Pourquoi créer des gabarits ?", "Pour gagner du temps et rester cohérent", "Pour alourdir", "Pour changer la marque"],
    ["Combien de messages par visuel publicitaire ?", "Un seul", "Dix", "Aucun"],
    ["Que doit contenir une publicité ?", "Un titre accrocheur, une image forte et un appel à l'action", "Un long texte sans image", "Seulement un logo"],
    ["Pourquoi tester deux versions ?", "Pour voir laquelle fonctionne mieux", "Pour alourdir", "Pour supprimer la marque"],
    ["Que mesurer ?", "Vues, clics, messages, ventes", "La météo", "La couleur de l'écran"],
    ["Que faire des dimensions des plateformes ?", "Vérifier les dimensions actuelles", "Les ignorer", "Les inventer"],
    ["Que garder dans toutes les publications ?", "Les mêmes couleurs, polices et style", "Un style différent à chaque fois", "Aucune règle"],
    ["Pourquoi prévoir une grille de publications ?", "Voir l'ensemble du fil et sa cohérence", "Augmenter le poids", "Changer de logiciel"],
  ]),
  quiz(3, "Quiz 3 — Identité visuelle", "Logo, charte et supports", [
    ["Qu'est-ce qu'une identité visuelle ?", "L'ensemble des éléments qui rendent une marque reconnaissable", "Un seul fichier", "Un type de papier"],
    ["Qu'est-ce qu'une charte graphique ?", "Le mode d'emploi de la marque", "Un contrat de travail", "Une facture"],
    ["Que contient une charte ?", "Logo, zone de protection, couleurs, polices", "Seulement les photos", "Seulement un prix"],
    ["Pourquoi enregistrer des couleurs globales ?", "Un changement se répercute partout", "Pour alourdir le fichier", "Pour supprimer le logo"],
    ["Combien de polices environ ?", "Deux : titres et textes", "Dix", "Aucune"],
    ["Pourquoi vérifier la licence d'une police ?", "Pour avoir le droit de l'utiliser", "Pour changer sa couleur", "Pour la supprimer"],
    ["Que permettent plusieurs plans de travail ?", "Créer plusieurs supports dans un document", "Imprimer plus vite", "Changer de logiciel"],
    ["Que rend une identité cohérente ?", "La confiance", "Un fichier plus lourd", "Rien"],
    ["Qui utilise la charte ?", "Collaborateurs et imprimeurs", "Personne", "Seulement le logiciel"],
    ["Que doit refléter l'identité ?", "Les valeurs de la marque", "Le hasard", "La météo"],
  ]),
  quiz(4, "Quiz 4 — Impression", "Fond perdu et PDF", [
    ["Quel est le fond perdu ?", "Un débordement autour du format pour éviter les liserés blancs", "Un fichier supprimé", "Un type de papier"],
    ["Quelle valeur courante de fond perdu ?", "3 mm", "30 cm", "0 mm"],
    ["À quoi servent les traits de coupe ?", "Indiquer où couper", "Imprimer le texte", "Changer la couleur"],
    ["Quelle marge de sécurité pour le texte ?", "Au moins 5 mm", "Aucune", "50 cm"],
    ["Quel mode de couleur pour l'impression ?", "CMJN", "RVB seulement", "Aucun"],
    ["Quelle résolution pour les images ?", "300 ppi", "10 ppi", "1 ppi"],
    ["Pourquoi vectoriser les polices ?", "Éviter les remplacements", "Alourdir le fichier", "Changer la couleur"],
    ["Qu'est-ce qu'un BAT ?", "Un bon à tirer : une épreuve à valider", "Un type de papier", "Un logiciel"],
    ["Que faire avant la validation ?", "Relire deux fois le texte et les numéros", "Ne rien relire", "Changer d'imprimante"],
    ["Quel format pour l'imprimeur ?", "PDF haute qualité", "Capture d'écran", "GIF"],
  ]),
  quiz(5, "Quiz 5 — Montage avancé", "Multicaméra et projets lourds", [
    ["Comment synchroniser deux caméras ?", "Par un son commun ou un code temporel", "Par la couleur", "Par le nom du fichier"],
    ["Que permet le multicaméra ?", "Alterner plusieurs angles d'un même événement", "Réduire la résolution", "Supprimer le son"],
    ["Qu'est-ce qu'une séquence imbriquée ?", "Un bloc qui regroupe plusieurs plans", "Un fichier supprimé", "Un format audio"],
    ["À quoi servent les proxy ?", "Monter fluidement des vidéos lourdes", "Réduire la qualité de l'export final", "Supprimer les rushes"],
    ["Avec quoi exporter après un montage proxy ?", "Les fichiers originaux", "Les proxy uniquement", "Aucun fichier"],
    ["Que font les marqueurs ?", "Repérer des moments importants", "Supprimer des plans", "Changer la résolution"],
    ["Que font les courbes d'accélération ?", "Adoucir un mouvement", "Couper le son", "Supprimer une image clé"],
    ["Que faire pour un projet lourd ?", "Sauvegarder et fermer les autres programmes", "Ouvrir tous les programmes", "Éteindre la sauvegarde"],
    ["Pourquoi renommer et colorer les clips ?", "Pour s'y retrouver", "Pour alourdir", "Pour supprimer"],
    ["Qu'est-ce qu'un montage multicam « joué » ?", "On choisit la caméra en temps réel pendant la lecture", "On supprime des caméras", "On ajoute un titre"],
  ]),
  quiz(6, "Quiz 6 — Motion design", "Titres animés et génériques", [
    ["Que doit avoir un bon mouvement ?", "Une accélération puis un ralentissement", "Une vitesse constante absolue", "Aucun mouvement"],
    ["Comment doivent être les animations ?", "Courtes et sobres", "Très longues", "Toujours différentes"],
    ["Pourquoi animer la sortie d'un texte ?", "Pour un aspect soigné", "Pour alourdir", "Pour supprimer le texte"],
    ["Que faire pour animer des éléments un par un ?", "Les séparer en calques", "Les fusionner", "Les imprimer"],
    ["Quel format garde la transparence pour superposer ?", "Un format avec canal alpha", "JPG", "MP3"],
    ["Pourquoi une bibliothèque d'éléments ?", "Les réutiliser", "Les cacher", "Les supprimer"],
    ["Quelle durée pour une introduction animée ?", "Quelques secondes", "Dix minutes", "Une heure"],
    ["Avec quoi synchroniser les mouvements ?", "Le rythme de la musique ou de la voix", "Le nom du fichier", "La couleur du bureau"],
    ["Quel type d'élément peut défiler en animation ?", "Des chiffres", "Des mots de passe", "Des fichiers système"],
    ["Quelle règle pour la lisibilité d'un graphique ?", "Peu d'éléments et des couleurs de la charte", "Le plus d'éléments possible", "Aucune règle"],
  ]),
];
