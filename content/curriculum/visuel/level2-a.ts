import { lesson, quiz } from "../bureautique/builders";

// Niveau 2 · Montage vidéo — leçons 1 à 6 : vidéo numérique, tournage, interface, coupe, rythme et son.
// Les principes valent pour DaVinci Resolve, Premiere Pro et CapCut ; les noms de menus varient selon le logiciel et la version.

export const lessonsA2 = [
  lesson({
    id: 1,
    title: "La vidéo numérique",
    subtitle: "Images par seconde, résolution, formats et codecs.",
    sections: [
      {
        heading: "Une vidéo, c'est des images qui défilent",
        body: [
          "Une vidéo est une suite d'images fixes affichées très vite : le nombre d'images par seconde (i/s ou fps).",
          "24 i/s : l'aspect cinéma. 25 i/s : télévision dans de nombreux pays. 30 i/s : web et réseaux sociaux. 50 ou 60 i/s : mouvements rapides et ralentis.",
          "Gardez la même cadence du tournage à l'export pour éviter des saccades.",
          "Un ralenti propre se filme à plus de 50 i/s puis se ralentit au montage.",
        ],
      },
      {
        heading: "Résolution et format d'image",
        body: [
          "HD : 1280 × 720. Full HD : 1920 × 1080. 4K : 3840 × 2160 pixels.",
          "Le format 16:9 (horizontal) convient à YouTube et à la télévision ; 9:16 (vertical) aux Reels, TikTok et statuts ; 1:1 ou 4:5 aux publications carrées.",
          "Une résolution plus élevée donne plus de détails mais des fichiers plus lourds et un montage plus lent.",
          "Choisissez le format de votre projet selon l'endroit où il sera diffusé.",
        ],
      },
      {
        heading: "Codecs et conteneurs",
        body: [
          "Le conteneur (MP4, MOV, MKV) est la « boîte » du fichier ; le codec (H.264, H.265, ProRes) est la façon de compresser l'image et le son.",
          "H.264 en MP4 : très répandu, léger, accepté partout, idéal pour la diffusion.",
          "ProRes ou autres codecs de montage : plus lourds mais plus faciles à travailler.",
          "Le débit (en Mb/s) est la quantité de données par seconde : plus il est élevé, meilleure est la qualité et plus le fichier est lourd.",
        ],
      },
      {
        heading: "Gérer l'espace et les copies",
        body: [
          "Une minute de vidéo 4K peut peser plusieurs centaines de Mo : prévoyez un disque assez grand.",
          "Copiez les rushes (fichiers filmés) sur un disque dès la fin du tournage, puis sur une deuxième copie.",
          "Gardez les originaux intacts : on monte avec des copies liées au logiciel.",
          "Nommez les dossiers par date ou par projet pour retrouver vos fichiers.",
        ],
      },
    ],
    caseTitle: "Une vidéo saccadée",
    caseLines: [
      "Neema filme son événement à 60 i/s mais monte et exporte sa vidéo à 25 i/s dans un projet mal réglé : l'image saccade.",
      "Un ami lui explique que les réglages du projet doivent correspondre à ses rushes.",
      "Elle recrée le projet en 1920 × 1080 à 25 i/s et réserve les passages à 60 i/s aux ralentis.",
      "Elle copie aussi ses rushes sur un second disque avant de commencer le montage.",
    ],
    tasks: [
      "Filmez dix secondes à 25 i/s et dix secondes à 50 i/s avec votre téléphone, puis comparez.",
      "Notez la résolution, la cadence et le codec de trois fichiers vidéo.",
      "Calculez le poids approximatif d'une vidéo de 10 minutes à 10 Mb/s.",
      "Organisez un dossier de projet avec rushes, musique, titres et exports.",
    ],
    goal: "Choisir la cadence, la résolution, le format et le codec adaptés à un projet vidéo.",
    video: "La vidéo numérique : images par seconde, résolution et codecs",
  }),
  lesson({
    id: 2,
    title: "Tourner de bons plans",
    subtitle: "Cadrage, lumière et son : tout se joue avant le montage.",
    sections: [
      {
        heading: "Les valeurs de plan",
        body: [
          "Plan large : montre le lieu et le contexte. Plan moyen : montre la personne en entier ou jusqu'à la taille.",
          "Gros plan : montre le visage et les émotions. Très gros plan : un détail (une main, un objet).",
          "Alternez les valeurs de plan pour que le montage soit vivant.",
          "Filmez plusieurs plans de chaque scène : large, moyen, gros plan, plans de coupe.",
        ],
      },
      {
        heading: "Cadrer proprement",
        body: [
          "Appliquez la règle des tiers : le sujet sur une ligne ou un croisement.",
          "Laissez de l'espace devant le regard (la « respiration ») et au-dessus de la tête, mais pas trop.",
          "Gardez l'horizon droit et stabilisez la caméra : trépied, appui ou stabilisateur.",
          "Pour les réseaux sociaux, tournez en vertical (9:16) ; pour YouTube, en horizontal (16:9).",
        ],
      },
      {
        heading: "La lumière",
        body: [
          "La meilleure lumière gratuite est la lumière naturelle : près d'une fenêtre ou en fin de journée.",
          "Évitez de filmer face à une source de lumière forte derrière le sujet (contre-jour), sauf effet voulu.",
          "L'éclairage « trois points » : une lumière principale, une lumière de remplissage plus douce et une lumière de contre-jour.",
          "Évitez les ombres dures sur le visage et mélangez le moins possible lumières chaudes et froides.",
        ],
      },
      {
        heading: "Le son au tournage",
        body: [
          "Un mauvais son gâche une belle image : placez le micro près de la voix.",
          "Écoutez avec un casque pendant l'enregistrement et évitez le bruit de fond (ventilateur, circulation).",
          "Un micro cravate ou un micro externe améliore beaucoup la qualité par rapport au micro du téléphone.",
          "Enregistrez quelques secondes de silence de la pièce (ambiance) pour nettoyer le son au montage.",
        ],
      },
    ],
    caseTitle: "L'interview de la directrice",
    caseLines: [
      "Neema doit filmer l'interview de la directrice d'une école avec un téléphone.",
      "Elle choisit une salle près d'une fenêtre, place le téléphone sur un trépied et un micro cravate sur la directrice.",
      "Elle filme un plan large, un plan moyen de l'interview, un gros plan du visage et des plans de coupe des élèves.",
      "Au montage, elle aura de quoi alterner les plans et masquer les coupures.",
    ],
    tasks: [
      "Filmez le même sujet en plan large, moyen et gros plan.",
      "Réalisez un plan avec la règle des tiers et un plan avec le sujet centré, puis comparez.",
      "Enregistrez une phrase avec le micro du téléphone puis avec un micro externe.",
      "Préparez une liste de plans à tourner pour un reportage de deux minutes.",
    ],
    goal: "Tourner des plans variés, bien cadrés, bien éclairés et avec un son propre.",
    video: "Tourner de bons plans : cadrage, lumière et son",
  }),
  lesson({
    id: 3,
    title: "Préparer le projet et découvrir l'interface",
    subtitle: "Importer, organiser et se repérer dans un logiciel de montage.",
    sections: [
      {
        heading: "Les logiciels de montage",
        body: [
          "DaVinci Resolve : gratuit, complet, avec ses « pages » (Média, Cut, Montage, Fusion, Étalonnage, Fairlight, Livraison).",
          "Premiere Pro : payant, très utilisé en production, intégré à la suite Adobe.",
          "CapCut : simple et rapide, très utilisé sur téléphone et ordinateur pour les réseaux sociaux.",
          "Le principe est le même partout : importer, monter sur une timeline, corriger, exporter.",
        ],
      },
      {
        heading: "Créer un projet",
        body: [
          "Créez un nouveau projet et donnez-lui un nom clair.",
          "Réglez la résolution (par exemple 1920 × 1080) et la cadence (par exemple 25 i/s) selon vos rushes et votre diffusion.",
          "Importez les rushes, la musique et les images dans la bibliothèque de médias (chutier).",
          "Rangez-les dans des dossiers : plans, interviews, musique, logos.",
        ],
      },
      {
        heading: "Les zones de l'interface",
        body: [
          "La bibliothèque : tous les médias importés.",
          "Le moniteur source : on regarde un plan et on choisit la partie à utiliser. Le moniteur programme : on regarde le montage.",
          "La timeline : la ligne du temps où l'on assemble les plans sur des pistes vidéo (V) et audio (A).",
          "Les panneaux d'effets, de titres et de réglages complètent l'espace de travail.",
        ],
      },
      {
        heading: "Premiers gestes",
        body: [
          "Glissez un plan de la bibliothèque vers la timeline.",
          "Barre d'espace : lecture et pause ; J, K, L : reculer, arrêter, avancer.",
          "Ctrl + Z annule ; Ctrl + S enregistre : enregistrez souvent.",
          "Sauvegardez le projet et gardez une copie de secours ailleurs.",
        ],
      },
    ],
    caseTitle: "Le premier projet",
    caseLines: [
      "Neema installe DaVinci Resolve et crée un projet « Interview directrice » en 1920 × 1080 à 25 i/s.",
      "Elle importe ses vidéos, sa musique et le logo, et les range dans quatre dossiers.",
      "Elle glisse un premier plan sur la timeline et le lit avec la barre d'espace.",
      "Elle enregistre le projet et le copie sur une clé USB avant de continuer.",
    ],
    tasks: [
      "Créez un projet avec la bonne résolution et la bonne cadence.",
      "Importez dix médias et classez-les dans des dossiers.",
      "Placez trois plans sur la timeline et lisez-les.",
      "Repérez et nommez les quatre grandes zones de l'interface.",
    ],
    goal: "Créer et organiser un projet de montage et se repérer dans l'interface.",
    video: "DaVinci Resolve : prise en main pour débutants",
  }),
  lesson({
    id: 4,
    title: "Couper et assembler",
    subtitle: "Dérusher, couper et construire une première séquence.",
    sections: [
      {
        heading: "Le dérushage",
        body: [
          "Dérusher, c'est regarder tous les rushes et choisir les meilleurs passages.",
          "Notez avec des marqueurs ou des étoiles les bons plans et les erreurs.",
          "Ne gardez que le nécessaire : un bon montage est souvent plus court qu'on ne le pense.",
          "Utilisez les points d'entrée et de sortie (I et O) pour ne prendre que la partie utile d'un plan.",
        ],
      },
      {
        heading: "Les outils de coupe",
        body: [
          "Lame (C ou B) : coupe un plan en deux à l'endroit du curseur.",
          "Suppression avec décalage (Ripple Delete) : supprime un passage et referme le trou.",
          "Raccourcir un plan : tirer son bord à la souris (ajustement).",
          "Déplacer un plan : le faire glisser sur la timeline ; le copier avec Ctrl + C, Ctrl + V.",
        ],
      },
      {
        heading: "Assembler",
        body: [
          "Placez les plans dans l'ordre du récit : début, développement, fin.",
          "Coupez les silences, les hésitations et les temps morts.",
          "Vérifiez que chaque plan apporte une information ou une émotion.",
          "Regardez régulièrement le montage en entier, pas seulement plan par plan.",
        ],
      },
      {
        heading: "Organiser la timeline",
        body: [
          "Pistes vidéo : V1 pour les plans principaux, V2 pour les images ou titres superposés.",
          "Pistes audio : A1 pour la voix, A2 pour la musique, A3 pour les ambiances.",
          "Nommez ou colorez les pistes et les clips importants.",
          "Verrouillez une piste terminée pour ne pas la modifier par erreur.",
        ],
      },
    ],
    caseTitle: "La première version",
    caseLines: [
      "Neema regarde les quarante minutes d'interview et marque les quatre meilleures réponses.",
      "Elle coupe les hésitations et les silences avec la lame et la suppression avec décalage.",
      "Elle place un plan large au début, les réponses au milieu et un gros plan en conclusion.",
      "La première version dure trois minutes au lieu de quarante : elle est claire et vivante.",
    ],
    tasks: [
      "Dérushez un plan de cinq minutes en notant les quatre meilleurs passages.",
      "Coupez un plan et supprimez un passage avec décalage.",
      "Assemblez une séquence d'une minute avec cinq plans.",
      "Organisez trois pistes audio : voix, musique, ambiance.",
    ],
    goal: "Dérusher et assembler une première séquence cohérente avec les outils de coupe.",
    video: "Les bases du montage vidéo : couper et assembler",
  }),
  lesson({
    id: 5,
    title: "Le rythme et le récit",
    subtitle: "Raconter une histoire par le montage.",
    sections: [
      {
        heading: "La structure d'un récit",
        body: [
          "Un début accrocheur (quelques secondes pour retenir l'attention), un développement clair, une fin qui conclut ou appelle à l'action.",
          "Écrivez en une phrase le message de la vidéo avant de monter.",
          "Chaque plan doit servir ce message : sinon, on le coupe.",
          "Un plan trop long lasse ; trop de plans trop courts fatiguent. Variez le rythme.",
        ],
      },
      {
        heading: "Les plans de coupe",
        body: [
          "Un plan de coupe est un plan qui illustre ce que dit la personne : une image du lieu, des mains, des objets.",
          "Il permet de cacher une coupure dans une interview et d'éviter les sauts d'image.",
          "Posez-le sur la piste vidéo du dessus : le son de l'interview continue en dessous.",
          "Utilisez des plans de coupe pertinents, pas n'importe quelle image.",
        ],
      },
      {
        heading: "Les raccords",
        body: [
          "Raccord de mouvement : on coupe pendant un mouvement pour que l'action semble continue.",
          "Raccord de regard : un personnage regarde hors champ, le plan suivant montre ce qu'il voit.",
          "Respectez l'axe : ne passez pas de l'autre côté de la ligne entre deux personnages (règle des 180°).",
          "Les J-cut et L-cut : le son du plan suivant démarre avant l'image (J) ou le son du plan précédent continue après (L).",
        ],
      },
      {
        heading: "Le rythme et la musique",
        body: [
          "Coupez sur le rythme de la musique pour un clip dynamique ; plus lentement pour un sujet émotionnel.",
          "Laissez des respirations : un plan calme entre deux plans rapides.",
          "Revoyez le montage sans le son pour vérifier que l'image raconte déjà l'histoire.",
          "Faites visionner à quelqu'un d'extérieur : il verra ce que vous ne voyez plus.",
        ],
      },
    ],
    caseTitle: "Rendre l'interview vivante",
    caseLines: [
      "L'interview de la directrice est claire mais statique : une seule image pendant trois minutes.",
      "Neema ajoute des plans de coupe de la bibliothèque et des élèves quand la directrice en parle.",
      "Elle utilise un L-cut : la voix de la directrice continue pendant que l'image montre déjà les élèves.",
      "L'ami qui visionne la vidéo la trouve beaucoup plus vivante et ne s'ennuie pas.",
    ],
    tasks: [
      "Écrivez en une phrase le message d'une vidéo de deux minutes.",
      "Ajoutez cinq plans de coupe sur une interview.",
      "Réalisez un raccord de mouvement entre deux plans.",
      "Testez un L-cut et un J-cut et décrivez l'effet obtenu.",
    ],
    goal: "Construire un récit rythmé avec plans de coupe, raccords et L-cut ou J-cut.",
    video: "Le rythme au montage : plans de coupe, J-cut et L-cut",
  }),
  lesson({
    id: 6,
    title: "Le son : voix, musique et mixage",
    subtitle: "Un son propre et équilibré fait une vidéo professionnelle.",
    sections: [
      {
        heading: "Les niveaux sonores",
        body: [
          "Le son se mesure en décibels (dB). Ne dépassez jamais 0 dB : au-delà, le son sature (distorsion).",
          "Gardez la voix autour de −12 à −6 dB en crête, la musique plus basse (environ −20 à −18 dB) quand quelqu'un parle.",
          "Surveillez le vumètre pendant la lecture : il doit rester dans le vert et le jaune, jamais dans le rouge.",
          "Pour le web, un niveau global d'environ −14 LUFS est un bon repère (selon la plateforme).",
        ],
      },
      {
        heading: "Nettoyer et améliorer la voix",
        body: [
          "Réduction de bruit : supprime le souffle et le bruit de fond léger.",
          "Égaliseur : retire les graves inutiles et améliore la clarté de la voix.",
          "Compresseur : rend le volume plus régulier.",
          "N'abusez pas : une voix trop traitée devient artificielle.",
        ],
      },
      {
        heading: "La musique et les bruitages",
        body: [
          "Choisissez une musique qui correspond à l'émotion et ne couvre pas la voix.",
          "Baissez automatiquement la musique pendant la parole (ducking) puis remontez-la.",
          "Ajoutez des bruitages et des ambiances (portes, foule, vent) pour donner de la vie.",
          "Utilisez uniquement des musiques dont vous avez les droits (musiques libres ou achetées).",
        ],
      },
      {
        heading: "La voix off",
        body: [
          "Enregistrez dans une pièce calme, avec des tissus pour absorber l'écho.",
          "Parlez à 10-20 cm du micro, avec un filtre anti-pop si possible.",
          "Faites plusieurs prises et gardez la meilleure.",
          "Écrivez le texte avant : des phrases courtes, un ton naturel.",
        ],
      },
    ],
    caseTitle: "Une voix off claire",
    caseLines: [
      "Neema enregistre la voix off de son film dans un placard rempli de vêtements pour éviter l'écho.",
      "Elle nettoie le souffle, règle le volume autour de −9 dB et choisit une musique douce libre de droits.",
      "Elle baisse la musique pendant qu'elle parle, puis la remonte entre deux phrases.",
      "Son film a un son propre, sans saturation, que l'on comprend même sur un téléphone.",
    ],
    tasks: [
      "Enregistrez une voix off de trente secondes et choisissez la meilleure prise.",
      "Réduisez le bruit de fond et réglez le volume autour de −9 dB.",
      "Ajoutez une musique et baissez-la pendant la parole.",
      "Vérifiez qu'aucun niveau ne dépasse 0 dB.",
    ],
    goal: "Régler le volume, nettoyer la voix et mixer voix, musique et ambiances sans saturation.",
    video: "Le montage audio : voix off, musique et mixage",
  }),
];

export const quizzesA2 = [
  quiz(1, "Quiz 1 — La vidéo numérique", "Cadence, résolution et codecs", [
    ["Que sont les i/s (fps) ?", "Le nombre d'images par seconde", "Le nombre de pistes", "Le volume sonore"],
    ["Quelle cadence donne l'aspect cinéma ?", "24 i/s", "1 i/s", "500 i/s"],
    ["Quelle est la résolution Full HD ?", "1920 × 1080", "640 × 480", "100 × 100"],
    ["Quel format pour une vidéo verticale de réseau social ?", "9:16", "16:9", "21:9"],
    ["Que décrit un codec ?", "La façon de compresser l'image et le son", "Le nom du film", "Le prix du logiciel"],
    ["Quel codec est très répandu pour la diffusion ?", "H.264", "Aucun", "ZIP"],
    ["Que fait un débit élevé ?", "Plus de qualité et un fichier plus lourd", "Moins de qualité", "Aucun effet"],
    ["Pourquoi copier les rushes sur deux supports ?", "Pour ne pas les perdre", "Pour alourdir le fichier", "Pour changer de format"],
    ["Que faut-il faire des originaux ?", "Les garder intacts", "Les supprimer", "Les renommer sans suivi"],
    ["Comment réussir un ralenti propre ?", "Filmer à plus d'images par seconde", "Filmer à 1 i/s", "Ne pas utiliser de caméra"],
  ]),
  quiz(2, "Quiz 2 — Tourner", "Plans, lumière et son", [
    ["Quel plan montre le lieu et le contexte ?", "Le plan large", "Le très gros plan", "Le plan noir"],
    ["Quel plan montre les émotions du visage ?", "Le gros plan", "Le plan large", "Le plan de coupe"],
    ["Quelle est la meilleure lumière gratuite ?", "La lumière naturelle", "Le flash en plein visage", "Aucune lumière"],
    ["Que veut dire éclairage trois points ?", "Une lumière principale, de remplissage et de contre-jour", "Trois caméras", "Trois micros"],
    ["Pourquoi stabiliser la caméra ?", "Pour éviter une image tremblante", "Pour alourdir le fichier", "Pour réduire le son"],
    ["Que gâche un mauvais son ?", "Une belle image", "Rien", "Le fichier PDF"],
    ["Où placer le micro ?", "Près de la voix", "Loin, dans un autre local", "Sous la table"],
    ["Pourquoi tourner plusieurs valeurs de plan ?", "Pour avoir de quoi varier le montage", "Pour alourdir les rushes", "Pour changer de caméra"],
    ["Quelle règle de cadrage place le sujet sur les lignes d'une grille ?", "La règle des tiers", "La règle des couleurs", "La règle des pistes"],
    ["À quoi sert l'enregistrement du silence de la pièce ?", "À nettoyer le bruit de fond au montage", "À augmenter le volume", "À ajouter de la musique"],
  ]),
  quiz(3, "Quiz 3 — Projet et interface", "Créer, importer, se repérer", [
    ["Quel logiciel de montage est gratuit et complet ?", "DaVinci Resolve", "Word", "Excel"],
    ["Que règle-t-on à la création du projet ?", "La résolution et la cadence", "Le nom de l'écran", "Le mot de passe de la caméra"],
    ["Qu'est-ce que la timeline ?", "La ligne du temps où l'on assemble les plans", "Une page web", "Un type de micro"],
    ["Que montre le moniteur programme ?", "Le montage en cours", "Un seul rush brut", "La liste des fichiers"],
    ["Quelle touche lance ou arrête la lecture ?", "La barre d'espace", "Tab", "F12"],
    ["Pourquoi ranger les médias dans des dossiers ?", "Pour les retrouver facilement", "Pour les supprimer", "Pour changer la résolution"],
    ["Quel raccourci enregistre le projet ?", "Ctrl + S", "Ctrl + P", "Ctrl + Q"],
    ["Pourquoi faire une copie de secours du projet ?", "Pour ne pas tout perdre en cas de problème", "Pour changer de logiciel", "Pour alourdir le fichier"],
    ["Que signifient les pistes V et A ?", "Vidéo et audio", "Vitesse et attaque", "Vert et argent"],
    ["Quel est le principe commun à tous les logiciels de montage ?", "Importer, monter, corriger, exporter", "Imprimer, copier, supprimer", "Écrire, peindre, jouer"],
  ]),
  quiz(4, "Quiz 4 — Couper et assembler", "Dérushage et outils", [
    ["Que veut dire dérusher ?", "Regarder les rushes et choisir les meilleurs passages", "Supprimer tout le film", "Exporter en MP4"],
    ["Que fait la lame ?", "Elle coupe un plan en deux", "Elle ajoute de la musique", "Elle change la couleur"],
    ["Que fait la suppression avec décalage ?", "Elle supprime un passage et referme le trou", "Elle crée une piste", "Elle copie un plan"],
    ["Que permettent les points d'entrée et de sortie ?", "Ne prendre que la partie utile d'un plan", "Imprimer le plan", "Changer le format"],
    ["Que faire des silences et hésitations ?", "Les couper", "Les agrandir", "Les doubler"],
    ["Sur quelle piste met-on la voix ?", "Une piste audio, par exemple A1", "La piste de titres uniquement", "Aucune piste"],
    ["Que fait-on avec une piste terminée ?", "La verrouiller", "La supprimer", "La renommer en secret"],
    ["Que doit apporter chaque plan ?", "Une information ou une émotion", "Du poids au fichier", "Rien"],
    ["Pourquoi regarder le montage en entier ?", "Pour juger l'ensemble, pas seulement plan par plan", "Pour économiser de l'énergie", "Pour changer d'écran"],
    ["Comment déplacer un plan ?", "Le faire glisser sur la timeline", "Éteindre le logiciel", "L'imprimer"],
  ]),
  quiz(5, "Quiz 5 — Rythme et récit", "Plans de coupe, raccords", [
    ["Qu'est-ce qu'un plan de coupe ?", "Un plan qui illustre ce que dit la personne", "Un plan supprimé", "Un titre"],
    ["À quoi sert-il aussi ?", "À cacher une coupure dans une interview", "À augmenter le volume", "À changer la résolution"],
    ["Que fait un L-cut ?", "Le son du plan précédent continue après le changement d'image", "Il supprime le son", "Il ajoute un titre"],
    ["Que fait un J-cut ?", "Le son du plan suivant démarre avant l'image", "Il supprime l'image", "Il change la couleur"],
    ["Que dit la règle des 180° ?", "Ne pas passer de l'autre côté de l'axe entre deux personnages", "Tourner la caméra de 180° à chaque plan", "Couper tous les 180 secondes"],
    ["Qu'est-ce qu'un raccord de mouvement ?", "Couper pendant un mouvement pour garder la continuité", "Un moteur de caméra", "Un type de micro"],
    ["Par quoi commencer une vidéo ?", "Un début accrocheur", "Un long générique", "Un écran noir de dix secondes"],
    ["Que faire avant de monter ?", "Écrire le message de la vidéo en une phrase", "Exporter", "Changer d'ordinateur"],
    ["Pourquoi laisser des respirations ?", "Pour varier le rythme", "Pour alourdir le fichier", "Pour changer de format"],
    ["Pourquoi faire visionner à une personne extérieure ?", "Elle voit ce qu'on ne voit plus", "Pour la fatiguer", "Pour gagner du temps"],
  ]),
  quiz(6, "Quiz 6 — Le son", "Niveaux, mixage et voix off", [
    ["Quel niveau ne faut-il jamais dépasser ?", "0 dB", "−60 dB", "−20 dB"],
    ["Que provoque un son au-dessus de 0 dB ?", "De la saturation (distorsion)", "Un meilleur son", "Un fichier plus léger"],
    ["Où placer la musique par rapport à la voix ?", "Plus basse quand quelqu'un parle", "Plus forte que la voix", "À la même hauteur toujours"],
    ["À quoi sert la réduction de bruit ?", "À supprimer le souffle et le bruit de fond léger", "À ajouter du bruit", "À couper les images"],
    ["Que fait le compresseur ?", "Il rend le volume plus régulier", "Il supprime la voix", "Il change le format"],
    ["Que veut dire ducking ?", "Baisser automatiquement la musique pendant la parole", "Couper la caméra", "Ajouter un titre"],
    ["Quelle musique peut-on utiliser ?", "Celle dont on a les droits", "N'importe quelle musique trouvée", "Seulement celle des autres vidéos"],
    ["Où enregistrer une voix off ?", "Dans une pièce calme, avec des tissus contre l'écho", "Dans un couloir vide très bruyant", "Dehors sous la pluie"],
    ["À quelle distance parler du micro ?", "À 10-20 cm environ", "À 5 mètres", "Au fond de la pièce"],
    ["Pourquoi faire plusieurs prises ?", "Pour garder la meilleure", "Pour alourdir le fichier", "Pour changer de logiciel"],
  ]),
];
