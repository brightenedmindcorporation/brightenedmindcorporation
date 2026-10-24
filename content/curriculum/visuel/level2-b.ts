import { finalQuiz, lesson, quiz } from "../bureautique/builders";

// Niveau 2 · Montage vidéo — leçons 7 à 12 : titres, effets, étalonnage, réseaux sociaux, export et projet.

export const lessonsB2 = [
  lesson({
    id: 7,
    title: "Titres, sous-titres et habillage",
    subtitle: "Ajouter du texte lisible et un habillage cohérent.",
    sections: [
      {
        heading: "Les titres",
        body: [
          "Le titre d'ouverture annonce le sujet ; les bandeaux (lower thirds) présentent une personne avec son nom et sa fonction.",
          "Choisissez une police lisible, deux couleurs et gardez le même style dans toute la vidéo.",
          "Placez le texte dans la zone de sécurité : loin des bords de l'écran.",
          "Un titre doit rester assez longtemps pour être lu deux fois à voix haute.",
        ],
      },
      {
        heading: "Les sous-titres",
        body: [
          "Beaucoup de personnes regardent les vidéos sans le son : les sous-titres augmentent l'audience.",
          "Écrivez des lignes courtes (une ou deux lignes, une trentaine de caractères maximum par ligne).",
          "Synchronisez-les avec la voix et relisez l'orthographe.",
          "Utilisez la transcription automatique pour gagner du temps, puis corrigez toujours le texte.",
        ],
      },
      {
        heading: "L'habillage",
        body: [
          "Le logo : placez-le discrètement dans un coin, avec une opacité légère.",
          "Un générique de début et de fin court (quelques secondes) avec le nom, le contact ou l'appel à l'action.",
          "Les animations de texte simples (apparition en fondu ou glissement) suffisent ; évitez les effets trop chargés.",
          "Enregistrez vos réglages comme modèles pour les réutiliser dans d'autres vidéos.",
        ],
      },
      {
        heading: "Lisibilité sur petit écran",
        body: [
          "Testez la vidéo sur un téléphone : le texte doit rester lisible.",
          "Utilisez un fort contraste et, si besoin, un fond semi-transparent derrière le texte.",
          "Évitez de placer des textes là où l'interface de la plateforme masque l'image (en bas des vidéos verticales).",
          "Gardez la cohérence de vos choix avec l'identité visuelle de la marque.",
        ],
      },
    ],
    caseTitle: "Habiller l'interview",
    caseLines: [
      "Neema ajoute un bandeau avec le nom de la directrice au premier plan où elle parle, pendant cinq secondes.",
      "Elle génère les sous-titres automatiquement, puis corrige trois mots mal compris.",
      "Elle place le logo de l'école en haut à droite avec une opacité de 60 %.",
      "Elle teste sur son téléphone : tout est lisible, même sans le son.",
    ],
    tasks: [
      "Créez un titre d'ouverture et un bandeau nom-fonction avec le même style.",
      "Ajoutez des sous-titres à trente secondes de vidéo et corrigez-les.",
      "Placez un logo discret et réglez son opacité.",
      "Enregistrez votre titre comme modèle réutilisable.",
    ],
    goal: "Ajouter des titres, des sous-titres et un habillage lisibles et cohérents.",
    video: "Montage vidéo : titres, sous-titres et habillage",
  }),
  lesson({
    id: 8,
    title: "Transitions et effets",
    subtitle: "Enchaîner les plans et corriger ou transformer l'image.",
    sections: [
      {
        heading: "Les transitions",
        body: [
          "La coupe franche est la transition la plus courante et la plus discrète.",
          "Le fondu enchaîné marque un passage de temps ou une douceur ; le fondu au noir marque une fin ou un début.",
          "Évitez les transitions voyantes (tourbillons, cubes) : elles datent un montage.",
          "Réglez la durée : une transition courte (une demi-seconde à une seconde) est souvent suffisante.",
        ],
      },
      {
        heading: "Vitesse et stabilisation",
        body: [
          "Ralenti : donne de l'émotion ou met en valeur un geste ; accéléré : montre le passage du temps.",
          "Si le ralenti est saccadé, c'est que le plan n'a pas été filmé avec assez d'images par seconde.",
          "La stabilisation corrige les petits tremblements de la caméra ; elle recadre un peu l'image.",
          "Évitez de tout stabiliser : une légère vie de l'image reste naturelle.",
        ],
      },
      {
        heading: "Les images clés",
        body: [
          "Une image clé (keyframe) enregistre une valeur à un instant précis : position, taille, opacité.",
          "Deux images clés créent un mouvement : le logiciel calcule ce qui se passe entre elles.",
          "Utilisez-les pour un zoom doux, un déplacement de logo ou un fondu manuel.",
          "Adoucissez les mouvements avec les courbes d'accélération pour qu'ils paraissent naturels.",
        ],
      },
      {
        heading: "Incrustation et fond vert",
        body: [
          "Le fond vert (chroma key) permet de remplacer l'arrière-plan d'une personne par une autre image.",
          "Éclairez bien le fond vert, uniformément et sans plis, et éloignez la personne du fond.",
          "Évitez les vêtements verts : ils disparaîtraient avec le fond.",
          "Réglez la clé de couleur et adoucissez les bords pour un résultat naturel.",
        ],
      },
    ],
    caseTitle: "Un clip dynamique",
    caseLines: [
      "Neema monte le clip du concert : des coupes franches sur le rythme et un fondu au noir à la fin.",
      "Elle ralentit la montée en puissance du chanteur grâce à un plan filmé à 50 i/s.",
      "Elle crée un zoom lent sur la foule avec deux images clés.",
      "Elle teste un fond vert pour la présentation d'un sponsor, mais constate une ombre sur le fond : elle rééclaire et recommence.",
    ],
    tasks: [
      "Montez dix plans avec des coupes et un seul fondu enchaîné.",
      "Ralentissez un plan puis accélérez-en un autre.",
      "Créez un zoom doux avec deux images clés.",
      "Réalisez un essai de fond vert avec un fond uni et réglez la clé.",
    ],
    goal: "Utiliser avec mesure les transitions, la vitesse, les images clés et l'incrustation.",
    video: "Montage vidéo : transitions, effets et images clés",
  }),
  lesson({
    id: 9,
    title: "L'étalonnage des couleurs",
    subtitle: "Corriger l'image puis lui donner une ambiance.",
    sections: [
      {
        heading: "Correction puis étalonnage",
        body: [
          "La correction rend l'image juste : bonne exposition, bon contraste, bonnes couleurs.",
          "L'étalonnage (color grading) donne ensuite un style : chaud, froid, contrasté, cinématographique.",
          "Corrigez toujours avant d'étalonner et harmonisez les plans entre eux.",
          "Travaillez dans un lieu à lumière contrôlée si possible, avec un écran fiable.",
        ],
      },
      {
        heading: "Les réglages de base",
        body: [
          "Exposition : éclaircit ou assombrit l'image. Contraste : écart entre les clairs et les sombres.",
          "Balance des blancs : température (bleuté ou jaunâtre) et teinte (vert ou magenta).",
          "Saturation : intensité des couleurs ; ne l'augmentez pas trop pour garder des teintes de peau naturelles.",
          "Utilisez les outils de contrôle : histogramme, forme d'onde (waveform), parade RVB, vectorscope.",
        ],
      },
      {
        heading: "Harmoniser les plans",
        body: [
          "Prenez un plan de référence bien exposé et alignez les autres sur lui.",
          "Copiez les réglages d'un plan à un autre quand la lumière est similaire.",
          "Les plans filmés avec des lumières différentes doivent être rapprochés par la balance des blancs.",
          "Vérifiez les peaux : elles doivent rester naturelles quelle que soit l'ambiance.",
        ],
      },
      {
        heading: "Les LUT et le style",
        body: [
          "Une LUT est un fichier qui applique un look de couleur en un clic : un point de départ, pas un résultat final.",
          "Réglez son intensité et corrigez ensuite plan par plan.",
          "Gardez le même style pour toute la vidéo, sauf intention narrative.",
          "Utilisez des masques pour retoucher une zone précise (un visage, le ciel).",
        ],
      },
    ],
    caseTitle: "Harmoniser un reportage",
    caseLines: [
      "Les plans du reportage de Neema ont été filmés à différentes heures : certains sont bleutés, d'autres jaunâtres.",
      "Elle choisit un plan bien exposé comme référence et règle la balance des blancs des autres.",
      "Elle ajoute un léger contraste et une teinte chaude pour une ambiance accueillante.",
      "Elle vérifie le vectoriscope : les peaux restent dans la bonne zone.",
    ],
    tasks: [
      "Corrigez l'exposition et la balance des blancs de trois plans.",
      "Alignez deux plans de lumière différente sur un plan de référence.",
      "Appliquez une LUT et réglez son intensité.",
      "Comparez l'avant et l'après et expliquez vos choix.",
    ],
    goal: "Corriger l'exposition et les couleurs de plans variés et leur donner une ambiance cohérente.",
    video: "L'étalonnage vidéo pour débutants",
  }),
  lesson({
    id: 10,
    title: "Monter pour les réseaux sociaux",
    subtitle: "Des vidéos courtes, verticales et efficaces.",
    sections: [
      {
        heading: "Les formats",
        body: [
          "Vertical 9:16 (1080 × 1920) pour Reels, TikTok, Shorts et statuts ; carré ou 4:5 pour certains fils d'actualité.",
          "Horizontal 16:9 pour YouTube et les écrans larges.",
          "Les durées recommandées changent selon la plateforme : vérifiez les limites actuelles.",
          "Concevez la vidéo pour son format dès le tournage.",
        ],
      },
      {
        heading: "Accrocher en trois secondes",
        body: [
          "Les premières secondes décident si la personne continue : posez une question, montrez le résultat ou un moment fort.",
          "Allez à l'essentiel : un message par vidéo.",
          "Coupez les silences et les temps morts : un rythme rapide garde l'attention.",
          "Terminez par un appel à l'action : suivre, partager, écrire, venir.",
        ],
      },
      {
        heading: "Texte, sous-titres et son",
        body: [
          "Ajoutez des sous-titres grands et lisibles : beaucoup regardent sans le son.",
          "Placez le texte dans la zone de sécurité : évitez le bas et les côtés où s'affichent les boutons de la plateforme.",
          "Choisissez une musique tendance mais libre de droits ou proposée par la plateforme.",
          "Équilibrez la voix et la musique : la voix doit rester claire.",
        ],
      },
      {
        heading: "Travailler vite avec CapCut",
        body: [
          "CapCut propose des modèles, des sous-titres automatiques et des effets prêts à l'emploi.",
          "Utilisez-le pour des montages rapides, puis gardez la même identité visuelle (couleurs, polices, logo).",
          "Vérifiez les droits d'utilisation des musiques et des effets avant la publication commerciale.",
          "Enregistrez une version sans filigrane si la plateforme en ajoute un.",
        ],
      },
    ],
    caseTitle: "Une annonce en trente secondes",
    caseLines: [
      "Neema doit annoncer l'ouverture d'une boutique en vidéo verticale de trente secondes.",
      "Elle commence par la phrase « Ça y est, nous ouvrons ! » avec un plan du magasin illuminé.",
      "Elle ajoute des sous-titres, un titre court et une musique rythmée en baissant son volume sous la voix.",
      "Elle termine par « Rendez-vous samedi à 9 heures » et place le logo en fin de vidéo.",
    ],
    tasks: [
      "Montez une vidéo verticale de trente secondes pour un sujet de votre choix.",
      "Écrivez trois accroches possibles et choisissez la meilleure.",
      "Ajoutez des sous-titres dans la zone de sécurité.",
      "Exportez une version verticale et une version carrée.",
    ],
    goal: "Réaliser une vidéo courte, verticale et accrocheuse, lisible sans le son.",
    video: "Monter une vidéo pour les réseaux sociaux avec CapCut",
  }),
  lesson({
    id: 11,
    title: "Exporter pour chaque plateforme",
    subtitle: "Choisir les bons réglages d'export.",
    sections: [
      {
        heading: "Les paramètres d'export",
        body: [
          "Format : MP4 avec le codec H.264 convient à presque toutes les plateformes.",
          "Résolution et cadence : celles du projet (par exemple 1920 × 1080 à 25 i/s).",
          "Débit : environ 8 à 12 Mb/s pour du Full HD à diffuser sur YouTube ; moins pour un envoi par WhatsApp.",
          "Audio : AAC stéréo, 48 kHz, 192 à 320 kb/s.",
        ],
      },
      {
        heading: "Selon la plateforme",
        body: [
          "YouTube : 16:9, Full HD ou 4K, écran large, miniature personnalisée.",
          "Instagram, TikTok, Facebook : 9:16 pour les formats courts, avec zone de sécurité.",
          "WhatsApp et téléphone : exporter plus léger (720p ou 1080p avec un débit réduit) pour un envoi rapide.",
          "Télévision et projection : suivre les consignes de la chaîne ou de la salle.",
        ],
      },
      {
        heading: "Contrôler avant de publier",
        body: [
          "Regardez l'export en entier avant l'envoi : image, son, titres, orthographe.",
          "Vérifiez le poids du fichier et la durée.",
          "Testez sur un téléphone et sur un grand écran.",
          "Gardez le projet, les rushes et l'export dans un dossier archivé.",
        ],
      },
      {
        heading: "Archiver et partager",
        body: [
          "Exportez aussi une version de haute qualité conservée pour de futurs usages.",
          "Nommez les fichiers : projet_version_format_date.mp4.",
          "Utilisez des services de transfert ou de stockage en ligne pour les gros fichiers.",
          "Respectez les droits : musique, images et personnes filmées (autorisations).",
        ],
      },
    ],
    caseTitle: "Trois exports pour une vidéo",
    caseLines: [
      "Neema exporte son film en 1920 × 1080 H.264 pour YouTube avec un débit de 10 Mb/s.",
      "Elle crée une version verticale 1080 × 1920 pour les réseaux sociaux et une version légère pour WhatsApp.",
      "Elle visionne chaque export en entier et trouve une faute dans un sous-titre : elle corrige et réexporte.",
      "Elle archive le projet, les rushes et les trois versions dans un dossier daté.",
    ],
    tasks: [
      "Exportez une vidéo en MP4 H.264 Full HD avec un débit de 10 Mb/s.",
      "Exportez une version légère pour l'envoi par message.",
      "Comparez le poids de vos fichiers selon le débit choisi.",
      "Archivez le projet avec un nom clair et un dossier daté.",
    ],
    goal: "Exporter un montage avec les bons réglages pour chaque plateforme et le contrôler avant diffusion.",
    video: "Exporter une vidéo : réglages pour YouTube et les réseaux sociaux",
  }),
  lesson({
    id: 12,
    title: "Révision du niveau 2 et projet",
    subtitle: "Monter un film court de A à Z.",
    sections: [
      {
        heading: "Ce que vous avez appris",
        body: [
          "La vidéo numérique : cadence, résolution, formats et codecs.",
          "Le tournage : plans, lumière, son.",
          "Le montage : interface, coupe, rythme, plans de coupe, J-cut et L-cut.",
          "Le son, les titres, les effets, l'étalonnage et l'export pour chaque plateforme.",
        ],
      },
      {
        heading: "Le projet",
        body: [
          "Réalisez un film de deux à trois minutes sur un sujet de votre choix (portrait, reportage, présentation de service).",
          "Écrivez le message, la liste des plans et le plan de tournage.",
          "Tournez, montez, mixez, étalonnez, ajoutez titres et sous-titres.",
          "Exportez une version horizontale et une verticale de trente secondes.",
        ],
      },
      {
        heading: "La liste de contrôle",
        body: [
          "Le début accroche et la fin conclut.",
          "Le son est clair, sans saturation ; la musique ne couvre pas la voix.",
          "Les couleurs sont harmonisées ; les titres sont lisibles.",
          "Les droits des musiques, images et personnes sont respectés.",
        ],
      },
      {
        heading: "Présenter et progresser",
        body: [
          "Projetez votre film devant un petit public et notez les réactions.",
          "Demandez ce qui était clair, ennuyeux ou confus.",
          "Corrigez et publiez la version améliorée.",
          "Gardez vos projets dans un portfolio vidéo.",
        ],
      },
    ],
    caseTitle: "Le film de l'école",
    caseLines: [
      "Neema livre à l'école un film de trois minutes avec l'interview de la directrice, des plans de coupe, une voix off et de la musique.",
      "La directrice demande une version courte pour les réseaux sociaux : Neema en tire un montage vertical de trente secondes.",
      "Elle exporte les deux versions et les envoie avec un lien de téléchargement.",
      "Elle ajoute les deux vidéos à son portfolio.",
    ],
    tasks: [
      "Réalisez le film complet de deux à trois minutes.",
      "Créez la version verticale de trente secondes.",
      "Passez la liste de contrôle et corrigez les défauts.",
      "Présentez le film et recueillez trois retours.",
    ],
    goal: "Réaliser un film court complet et ses déclinaisons pour les réseaux sociaux.",
    video: "Projet complet de montage vidéo, de A à Z",
  }),
];

export const quizzesB2 = [
  quiz(7, "Quiz 7 — Titres et habillage", "Texte, sous-titres, logo", [
    ["Qu'est-ce qu'un bandeau (lower third) ?", "Un titre qui présente une personne avec son nom et sa fonction", "Un type de caméra", "Un format de fichier"],
    ["Pourquoi ajouter des sous-titres ?", "Beaucoup regardent sans le son", "Pour alourdir la vidéo", "Pour cacher l'image"],
    ["Quelle longueur pour une ligne de sous-titre ?", "Courte, une trentaine de caractères maximum", "Un paragraphe entier", "Aucune limite"],
    ["Que faire de la transcription automatique ?", "La corriger", "La publier sans la relire", "La supprimer"],
    ["Où placer le texte ?", "Dans la zone de sécurité, loin des bords", "Au tout bord de l'écran", "Hors de l'image"],
    ["Comment placer un logo ?", "Discrètement, avec une opacité légère", "En énorme au centre", "Sans jamais le montrer"],
    ["Comment tester la lisibilité ?", "Sur un téléphone", "Sur un écran éteint", "Sans regarder"],
    ["Que faire d'un titre réussi ?", "L'enregistrer comme modèle", "L'effacer", "Le refaire à chaque fois"],
    ["Pourquoi un fort contraste ?", "Pour que le texte soit lisible", "Pour alourdir la vidéo", "Pour changer le format"],
    ["Combien de temps un titre doit-il rester ?", "Assez pour être lu deux fois", "Une fraction de seconde", "Toute la vidéo"],
  ]),
  quiz(8, "Quiz 8 — Transitions et effets", "Vitesse, images clés, fond vert", [
    ["Quelle est la transition la plus courante ?", "La coupe franche", "Le tourbillon", "Le cube 3D"],
    ["Que marque un fondu au noir ?", "Un début ou une fin", "Un changement de logiciel", "Un problème de son"],
    ["Quelle durée pour une transition ?", "Courte, une demi-seconde à une seconde", "Dix secondes", "Une minute"],
    ["Pourquoi un ralenti peut-il saccader ?", "Le plan n'a pas été filmé avec assez d'images par seconde", "Le micro est cassé", "La musique est trop forte"],
    ["Que fait la stabilisation ?", "Elle corrige les petits tremblements", "Elle ajoute du bruit", "Elle supprime l'image"],
    ["Qu'enregistre une image clé ?", "Une valeur à un instant précis", "Le nom du film", "Un mot de passe"],
    ["Combien d'images clés faut-il pour un mouvement ?", "Au moins deux", "Aucune", "Dix"],
    ["Que permet le fond vert ?", "Remplacer l'arrière-plan", "Supprimer le son", "Changer la cadence"],
    ["Quel vêtement éviter devant un fond vert ?", "Un vêtement vert", "Un vêtement noir", "Un vêtement bleu"],
    ["Que faire avec les effets ?", "En user avec mesure", "En mettre sur chaque plan", "Les cacher"],
  ]),
  quiz(9, "Quiz 9 — Étalonnage", "Correction, style et contrôle", [
    ["Que fait la correction ?", "Elle rend l'image juste : exposition et couleurs", "Elle donne un style fantaisiste", "Elle coupe le son"],
    ["Que fait l'étalonnage ?", "Il donne une ambiance à l'image", "Il filme les plans", "Il exporte"],
    ["Que règle la balance des blancs ?", "La température et la teinte des couleurs", "Le volume", "La durée"],
    ["Qu'indique une saturation trop forte ?", "Des couleurs artificielles", "Un fichier léger", "Une meilleure image"],
    ["Quel outil permet de contrôler les niveaux de luminosité ?", "La forme d'onde (waveform)", "Le vumètre", "Le chutier"],
    ["Qu'est-ce qu'une LUT ?", "Un fichier qui applique un look de couleur", "Un type de micro", "Un format vidéo"],
    ["Comment utiliser une LUT ?", "Comme point de départ, en réglant son intensité", "Comme résultat final sans contrôle", "Jamais"],
    ["Que faire pour harmoniser les plans ?", "S'aligner sur un plan de référence", "Les mettre au hasard", "Les supprimer"],
    ["Que vérifier particulièrement ?", "Les teintes de peau", "Le nom du fichier", "Le poids du disque"],
    ["Que faire avant d'étalonner ?", "Corriger l'exposition et les couleurs", "Exporter", "Éteindre le logiciel"],
  ]),
  quiz(10, "Quiz 10 — Réseaux sociaux", "Formats et accroche", [
    ["Quel format pour les Reels et TikTok ?", "9:16 vertical", "16:9 horizontal", "21:9 panoramique"],
    ["Pourquoi soigner les premières secondes ?", "Elles décident si le spectateur continue", "Elles ne comptent pas", "Elles pèsent plus lourd"],
    ["Combien de messages par vidéo courte ?", "Un", "Dix", "Aucun"],
    ["Pourquoi ajouter des sous-titres ?", "Beaucoup regardent sans le son", "Pour alourdir la vidéo", "Pour cacher l'image"],
    ["Que faire de la zone de sécurité ?", "Y placer le texte important", "L'ignorer", "La remplir de bruit"],
    ["Quel est un bon appel à l'action ?", "Suivez-nous, partagez, venez samedi", "Aucune phrase", "Un long texte"],
    ["Que faire des silences ?", "Les couper", "Les doubler", "Les chanter"],
    ["Quel logiciel est apprécié pour les montages rapides ?", "CapCut", "Excel", "Word"],
    ["Que vérifier pour une musique ?", "Les droits d'utilisation", "Sa couleur", "Son poids en lettres"],
    ["Pourquoi garder la même identité visuelle ?", "Pour que la marque soit reconnaissable", "Pour alourdir le fichier", "Pour changer le format"],
  ]),
  quiz(11, "Quiz 11 — Export", "Réglages et contrôle", [
    ["Quel format convient à presque toutes les plateformes ?", "MP4 H.264", "DOC", "PSD"],
    ["Que règle le débit ?", "La quantité de données par seconde", "La couleur", "Le nom"],
    ["Quel format pour la vidéo verticale ?", "1080 × 1920", "1920 × 1080", "200 × 200"],
    ["Quelle version pour un envoi rapide par message ?", "Une version plus légère", "Une version 8K", "Un fichier brut"],
    ["Que faire avant de publier ?", "Regarder l'export en entier", "Rien", "Supprimer le projet"],
    ["Où tester l'export ?", "Sur un téléphone et un grand écran", "Dans un four", "Nulle part"],
    ["Que garder après l'export ?", "Le projet et les rushes archivés", "Rien", "Seulement l'export"],
    ["Comment nommer les fichiers ?", "projet_version_format_date", "fichier sans nom", "azerty123"],
    ["Que faut-il respecter ?", "Les droits de la musique, des images et des personnes", "Aucun droit", "Seulement ses propres droits"],
    ["Pourquoi garder une version haute qualité ?", "Pour de futurs usages", "Pour alourdir", "Pour supprimer l'export"],
  ]),
  quiz(12, "Quiz 12 — Révision du niveau 2", "Montage vidéo complet", [
    ["Quel est le principe de tout montage ?", "Importer, monter, corriger, exporter", "Imprimer, relier, envoyer", "Peindre, dessiner, effacer"],
    ["Quelle règle placer sur les lignes d'une grille ?", "La règle des tiers", "La règle des pistes", "La règle des fichiers"],
    ["Que fait le L-cut ?", "Le son précédent continue après le changement d'image", "Il supprime le son", "Il imprime"],
    ["Quel niveau ne pas dépasser ?", "0 dB", "−60 dB", "−20 dB"],
    ["Que fait l'étalonnage ?", "Il donne une ambiance de couleur", "Il coupe le son", "Il exporte"],
    ["Quelle cadence cinéma ?", "24 i/s", "1 i/s", "500 i/s"],
    ["Quel format pour YouTube ?", "16:9", "9:16 seulement", "1:100"],
    ["Que faire avant de publier ?", "Vérifier l'export", "Rien", "Éteindre"],
    ["Quel appel à l'action en fin de vidéo ?", "Suivez, partagez, venez", "Aucun", "Un écran noir"],
    ["Que faut-il conserver ?", "Le projet et les rushes", "Rien", "Une photo de l'écran"],
  ]),
];

export const final2 = finalQuiz(
  "Quiz final — Niveau 2 Montage vidéo",
  "Tournage, montage, son, étalonnage et export",
  [
    ["Que signifie i/s ?", "Images par seconde", "Images supprimées", "Informations sonores"],
    ["Quel format pour une vidéo verticale de réseau social ?", "9:16", "16:9", "4:3"],
    ["Quel plan montre le lieu et le contexte ?", "Le plan large", "Le gros plan", "Le plan noir"],
    ["Que fait la règle des tiers ?", "Place le sujet sur les lignes d'une grille", "Divise le film en trois", "Coupe en trois"],
    ["Que permet la lame ?", "Couper un plan en deux", "Ajouter une musique", "Changer la résolution"],
    ["Qu'est-ce qu'un plan de coupe ?", "Un plan qui illustre ce que dit la personne", "Un plan supprimé", "Un titre"],
    ["Que fait un J-cut ?", "Le son du plan suivant démarre avant l'image", "Il supprime l'image", "Il agrandit"],
    ["Quel niveau sonore ne jamais dépasser ?", "0 dB", "−50 dB", "−10 dB"],
    ["Où placer la musique pendant la parole ?", "Plus basse que la voix", "Plus forte que la voix", "Au même volume"],
    ["Pourquoi des sous-titres ?", "Beaucoup regardent sans le son", "Pour alourdir", "Pour cacher la voix"],
    ["Quelle transition est la plus courante ?", "La coupe franche", "Le cube 3D", "Le tourbillon"],
    ["Combien d'images clés pour un mouvement ?", "Au moins deux", "Zéro", "Cent"],
    ["Que fait la balance des blancs ?", "Elle règle la température des couleurs", "Elle règle la cadence", "Elle règle le débit"],
    ["Qu'est-ce qu'une LUT ?", "Un look de couleur appliqué en un clic", "Un type de micro", "Un format de caméra"],
    ["Que décide les premières secondes d'une vidéo courte ?", "Si le spectateur continue", "Le prix du film", "Le poids du fichier"],
    ["Quel format d'export convient à presque toutes les plateformes ?", "MP4 H.264", "PSD", "DOC"],
    ["Que faire avant de publier ?", "Regarder l'export en entier", "Rien", "Supprimer les rushes"],
    ["Que respecter pour la musique ?", "Les droits d'utilisation", "Seulement le volume", "Rien"],
    ["Que garder après le montage ?", "Le projet, les rushes et les exports archivés", "Rien", "Seulement l'export"],
    ["Quel réflexe avant de livrer ?", "Vérifier le résultat et demander un avis", "Livrer sans voir", "Supprimer le projet"],
  ]
);
