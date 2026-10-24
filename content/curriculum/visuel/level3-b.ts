import { finalQuiz, lesson, quiz } from "../bureautique/builders";

// Niveau 3 · Perfectionnement et diffusion en direct — leçons 7 à 12 : étalonnage avancé, OBS, vMix, direct, droits et projet final.
// Les réglages exacts dépendent de la version des logiciels et de la plateforme de diffusion.

export const lessonsB3 = [
  lesson({
    id: 7,
    title: "Étalonnage avancé et suivi d'objets",
    subtitle: "Des courbes, des masques et des corrections locales.",
    sections: [
      {
        heading: "Courbes et séparation des tons",
        body: [
          "Les courbes permettent de régler précisément les ombres, les tons moyens et les hautes lumières.",
          "Une courbe en S légère augmente le contraste tout en gardant des tons naturels.",
          "Les roues chromatiques (ombres, tons moyens, hautes lumières) colorent chaque zone séparément.",
          "Les réglages se font par touches légères : mieux vaut plusieurs petits ajustements qu'un seul réglage extrême.",
        ],
      },
      {
        heading: "Corrections locales avec des masques",
        body: [
          "Un masque limite une correction à une zone : un visage à éclaircir, un ciel à assombrir.",
          "Les masques adoucis (bord progressif) se fondent naturellement dans l'image.",
          "Les masques sur la couleur (qualificateur) isolent par exemple la peau ou le ciel selon leur couleur.",
          "Plusieurs corrections locales peuvent se combiner : ciel, sujet, arrière-plan.",
        ],
      },
      {
        heading: "Le suivi d'objets (tracking)",
        body: [
          "Le tracking fait suivre un masque à un objet ou à un visage qui bouge.",
          "On analyse le mouvement avant puis après le point de départ, puis on vérifie sur toute la durée.",
          "Corrigez à la main les images où le suivi dérape.",
          "On peut aussi flouter un visage ou une plaque pour protéger la vie privée.",
        ],
      },
      {
        heading: "Cohérence et contrôle",
        body: [
          "Étalonnez dans l'ordre : correction primaire, harmonisation, puis style.",
          "Contrôlez avec la forme d'onde, la parade RVB et le vectoriscope : l'œil se fatigue et trompe.",
          "Regardez le résultat sur plusieurs écrans (ordinateur, téléphone, télévision).",
          "Gardez une version sans étalonnage pour comparer.",
        ],
      },
    ],
    caseTitle: "Le clip en extérieur",
    caseLines: [
      "Dans le clip tourné en plein soleil, le visage du chanteur est trop sombre et le ciel brûlé.",
      "Neema crée un masque doux sur le visage et l'éclaircit ; un autre masque assombrit légèrement le ciel.",
      "Elle utilise le tracking pour que le masque suive le chanteur pendant qu'il marche.",
      "Elle contrôle avec la forme d'onde et vérifie le résultat sur son téléphone.",
    ],
    tasks: [
      "Réglez une courbe en S légère sur un plan et comparez l'avant et l'après.",
      "Éclaircissez un visage avec un masque doux.",
      "Faites suivre ce masque à un sujet qui bouge avec le tracking.",
      "Contrôlez le résultat avec la forme d'onde et sur un téléphone.",
    ],
    goal: "Réaliser des corrections locales suivies avec des masques et contrôler le résultat.",
    video: "Étalonnage avancé : courbes, masques et tracking",
  }),
  lesson({
    id: 8,
    title: "OBS Studio : scènes, sources et enregistrement",
    subtitle: "Préparer une émission et l'enregistrer ou la diffuser.",
    sections: [
      {
        heading: "Découvrir OBS Studio",
        body: [
          "OBS Studio est un logiciel gratuit pour enregistrer et diffuser en direct.",
          "Il fonctionne avec des scènes (des « décors ») composées de sources (caméra, écran, image, texte, navigateur).",
          "Le mixeur audio règle les niveaux de chaque micro et source sonore.",
          "Les contrôles : Démarrer le streaming, Démarrer l'enregistrement, Mode Studio.",
        ],
      },
      {
        heading: "Les scènes et les sources",
        body: [
          "Créez une scène par moment de l'émission : introduction, plateau, présentation, fin.",
          "Ajoutez des sources : caméra (périphérique de capture vidéo), capture d'écran ou de fenêtre, image, texte, source navigateur, média.",
          "Redimensionnez et placez les sources dans la scène ; l'ordre dans la liste est l'ordre de superposition.",
          "Utilisez les transitions entre scènes : coupe ou fondu.",
        ],
      },
      {
        heading: "Les réglages importants",
        body: [
          "Vidéo : résolution de base (celle de votre écran ou de votre caméra) et résolution de sortie (par exemple 1920 × 1080), images par seconde (30 ou 25).",
          "Sortie : encodeur et débit vidéo (par exemple 4 500 à 6 000 kb/s pour du 1080p à 30 i/s).",
          "Audio : micro et sorties ; vérifiez qu'aucune source ne sature.",
          "Enregistrez d'abord un test de quelques minutes et regardez-le pour contrôler le résultat.",
        ],
      },
      {
        heading: "Habillage et préparation",
        body: [
          "Ajoutez un logo, un bandeau et un titre comme sources d'image ou de texte.",
          "Préparez les médias à l'avance : intro, musique, photos, vidéo d'attente.",
          "Enregistrez vos collections de scènes : une par type d'émission.",
          "Faites un essai complet avant l'événement, avec le matériel final.",
        ],
      },
    ],
    caseTitle: "Préparer l'émission du samedi",
    caseLines: [
      "Neema prépare une émission d'une heure avec quatre scènes : accueil, interview, présentation et au revoir.",
      "Elle ajoute pour chaque scène la caméra, un bandeau texte et le logo, puis règle la musique d'attente.",
      "Elle fait un enregistrement test de cinq minutes pour vérifier le son et l'image.",
      "Elle règle le niveau du micro après avoir constaté une saturation sur sa voix.",
    ],
    tasks: [
      "Créez trois scènes dans OBS avec une caméra, un logo et un texte.",
      "Réglez les niveaux audio du micro et d'une musique.",
      "Enregistrez un test de trois minutes et corrigez ce qui ne va pas.",
      "Préparez une collection de scènes pour une émission fictive.",
    ],
    goal: "Préparer dans OBS des scènes avec leurs sources, régler l'audio et réaliser un enregistrement test.",
    video: "OBS Studio : tutoriel complet pour débutants",
  }),
  lesson({
    id: 9,
    title: "vMix et la régie multicaméra",
    subtitle: "Conduire une émission avec plusieurs caméras.",
    sections: [
      {
        heading: "La régie vidéo",
        body: [
          "La régie est le poste de contrôle qui choisit ce qui est montré au public : caméras, titres, vidéos, ordinateur.",
          "vMix est un logiciel de régie (pour Windows) offrant un grand nombre d'entrées, de transitions et d'effets.",
          "Principe : l'aperçu montre ce qui va être diffusé ; le programme montre ce qui est en direct.",
          "Le technicien prépare le prochain plan dans l'aperçu, puis déclenche la transition.",
        ],
      },
      {
        heading: "Entrées et matériel",
        body: [
          "Les caméras se connectent par HDMI avec des cartes ou boîtiers de capture, ou par le réseau (NDI, flux IP).",
          "On ajoute aussi des entrées : ordinateur pour les diapositives, vidéos, photos, écran de titre.",
          "Un ordinateur puissant, des câbles fiables et un bon réseau sont essentiels.",
          "Étiquetez les caméras et les câbles ; testez chaque entrée avant l'événement.",
        ],
      },
      {
        heading: "Transitions, titres et effets",
        body: [
          "Coupe pour les changements rapides ; fondu pour les passages doux.",
          "Les titres (bandeaux, noms) se préparent à l'avance et s'affichent à la demande.",
          "Les incrustations (image dans l'image) servent pour un interlocuteur à distance ou une présentation.",
          "Évitez les effets inutiles : la clarté prime sur le spectacle.",
        ],
      },
      {
        heading: "Travailler en équipe",
        body: [
          "Un réalisateur (qui choisit les plans), des cadreurs, un technicien son et un technicien titres.",
          "Utilisez un système d'interphonie pour communiquer sans bruit.",
          "Répétez : un déroulé écrit avec les moments clés (ouverture, interventions, musique, fin).",
          "Prévoyez un plan de secours : caméra de réserve, écran d'attente, enregistrement local.",
        ],
      },
    ],
    caseTitle: "La retransmission du concert",
    caseLines: [
      "Neema installe une régie de trois caméras pour un concert : une large, une sur la scène et une sur la chorale.",
      "Elle prépare dans le logiciel les titres des chanteurs, un écran d'attente et le logo.",
      "Pendant le concert, elle prépare le plan suivant dans l'aperçu et le passe à l'antenne au bon moment.",
      "Une caméra perd le signal : un coéquipier signale la panne et elle bascule immédiatement sur l'autre caméra.",
    ],
    tasks: [
      "Décrivez le rôle de l'aperçu et du programme dans une régie.",
      "Dessinez le schéma de câblage d'une régie de trois caméras.",
      "Préparez la liste des titres et des écrans d'une émission.",
      "Rédigez un déroulé de trente minutes avec un plan de secours.",
    ],
    goal: "Concevoir et conduire une régie multicaméra avec aperçu, programme, titres et plan de secours.",
    video: "vMix : régie vidéo multicaméra, tutoriel",
  }),
  lesson({
    id: 10,
    title: "Le son et la diffusion en direct",
    subtitle: "Diffuser sur Internet sans mauvaise surprise.",
    sections: [
      {
        heading: "Le son en direct",
        body: [
          "Un direct avec une mauvaise image mais un bon son se regarde ; l'inverse est difficile à supporter.",
          "Utilisez une table de mixage ou une interface audio pour régler les micros et envoyer un mélange propre à l'ordinateur.",
          "Surveillez les niveaux : jamais dans le rouge ; gardez de la marge pour les moments forts.",
          "Écoutez au casque et évitez le retour (larsen) en éloignant micros et haut-parleurs.",
        ],
      },
      {
        heading: "Les paramètres de diffusion",
        body: [
          "La plateforme (YouTube, Facebook…) donne une clé de diffusion à copier dans le logiciel : ne la partagez jamais.",
          "Le débit doit être inférieur à votre vitesse d'envoi (upload) disponible : prévoyez une marge d'au moins 30 %.",
          "Repères pour du 1080p à 30 i/s : environ 4 500 à 6 000 kb/s ; pour du 720p : environ 2 500 à 4 000 kb/s.",
          "Une connexion par câble réseau est plus stable que le Wi-Fi.",
        ],
      },
      {
        heading: "Latence et interaction",
        body: [
          "Il y a toujours un décalage (latence) de quelques secondes entre le direct et ce que voit le spectateur.",
          "Surveillez le chat : un animateur peut lire les questions et saluer les spectateurs.",
          "Annoncez l'horaire à l'avance, avec un écran d'attente.",
          "Enregistrez aussi en local pour avoir une copie de haute qualité.",
        ],
      },
      {
        heading: "Plan B et surveillance",
        body: [
          "Testez la connexion à l'avance, à la même heure que l'événement.",
          "Prévoyez une seconde connexion (partage de connexion du téléphone) en secours.",
          "Surveillez en direct : image, son, débit, état de la diffusion.",
          "Après l'événement, vérifiez l'enregistrement et publiez la rediffusion si besoin.",
        ],
      },
    ],
    caseTitle: "Le direct du dimanche",
    caseLines: [
      "Neema teste la diffusion du culte le samedi : elle mesure la vitesse d'envoi et choisit un débit de 4 500 kb/s.",
      "Le dimanche, elle connecte l'ordinateur par câble réseau et surveille le son au casque.",
      "Pendant l'événement, la connexion principale devient lente : elle bascule sur le partage de connexion du téléphone.",
      "Grâce à son enregistrement local, elle publie ensuite une rediffusion de très bonne qualité.",
    ],
    tasks: [
      "Mesurez votre vitesse d'envoi et choisissez un débit adapté avec 30 % de marge.",
      "Configurez une diffusion test non répertoriée sur une plateforme.",
      "Préparez un écran d'attente et une liste de contrôle d'avant-direct.",
      "Prévoyez un plan de secours pour une panne de connexion.",
    ],
    goal: "Diffuser en direct avec un son propre, un débit adapté et un plan de secours.",
    video: "Faire un direct sur YouTube : son, débit et réglages",
  }),
  lesson({
    id: 11,
    title: "Droits, éthique et organisation professionnelle",
    subtitle: "Travailler avec des clients en respectant la loi.",
    sections: [
      {
        heading: "Les droits d'auteur",
        body: [
          "Une œuvre (photo, musique, vidéo, logo, texte) appartient à son auteur ; on ne l'utilise qu'avec son accord ou une licence.",
          "Utilisez des banques d'images et de musiques libres de droits ou avec licence, en vérifiant les conditions (usage commercial, mention de l'auteur).",
          "Les polices ont aussi des licences : certaines sont gratuites seulement pour un usage personnel.",
          "Gardez la trace de vos licences et sources.",
        ],
      },
      {
        heading: "Le droit à l'image",
        body: [
          "Filmer ou photographier une personne et diffuser son image nécessite en principe son accord, surtout pour un usage commercial.",
          "Pour les mineurs, l'accord des parents est nécessaire.",
          "Une autorisation écrite simple protège le créateur et la personne.",
          "Respectez la dignité des personnes : pas de montage pour les ridiculiser ou les tromper.",
        ],
      },
      {
        heading: "Travailler avec un client",
        body: [
          "Commencez par un brief : objectif, public, contenu, format, délai, budget.",
          "Établissez un devis détaillé, un calendrier et le nombre de modifications incluses.",
          "Faites valider chaque étape (croquis, première version, version finale) par écrit.",
          "Précisez dans le contrat les droits cédés au client et ce que vous conservez (par exemple le droit de montrer le travail dans votre portfolio).",
        ],
      },
      {
        heading: "Organisation, éthique et portfolio",
        body: [
          "Rangez les projets, les sources et les exports : un client peut revenir des mois plus tard.",
          "Soyez honnête sur vos compétences et vos délais ; ne promettez pas l'impossible.",
          "Respectez la confidentialité des projets des clients.",
          "Constituez un portfolio avec vos meilleurs travaux et mettez-le à jour régulièrement.",
        ],
      },
    ],
    caseTitle: "Une commande à clarifier",
    caseLines: [
      "Un client demande à Neema une vidéo promotionnelle avec une chanson connue : elle explique qu'elle n'a pas les droits et lui propose une musique sous licence.",
      "Elle rédige avec lui un brief, un devis, un calendrier et deux séries de corrections incluses.",
      "Elle fait signer une autorisation pour filmer les employés avant le tournage.",
      "À la livraison, elle archive le projet et demande l'accord du client pour l'ajouter à son portfolio.",
    ],
    tasks: [
      "Rédigez un brief client de dix lignes pour une vidéo promotionnelle.",
      "Préparez un devis avec étapes, délais et nombre de corrections.",
      "Rédigez une autorisation de droit à l'image simple.",
      "Listez cinq sources de musiques et d'images libres de droits ou sous licence et leurs conditions.",
    ],
    goal: "Respecter les droits d'auteur et le droit à l'image et organiser une relation professionnelle avec un client.",
    video: "Droits d'auteur et droit à l'image pour créateurs de contenu",
  }),
  lesson({
    id: 12,
    title: "Projet de fin de formation",
    subtitle: "Un projet complet : identité, vidéo et direct.",
    sections: [
      {
        heading: "Ce que vous avez appris",
        body: [
          "Niveau 1 : image numérique, design, Photoshop, Illustrator, affiche et logo.",
          "Niveau 2 : tournage, montage vidéo, son, étalonnage, export.",
          "Niveau 3 : Photoshop avancé, identité visuelle, impression, montage multicaméra, motion design, étalonnage avancé, OBS, vMix, direct, droits.",
          "Vous pouvez maintenant concevoir et réaliser un projet visuel et audiovisuel complet.",
        ],
      },
      {
        heading: "Le projet final",
        body: [
          "Choisissez un événement ou une marque réelle ou fictive (association, entreprise, église, école).",
          "Créez son identité visuelle : logo, couleurs, polices, charte, affiche et visuels de réseaux sociaux.",
          "Réalisez un film de promotion de deux minutes, avec titres animés et sous-titres.",
          "Préparez et testez la diffusion en direct d'un moment de l'événement avec OBS ou vMix.",
        ],
      },
      {
        heading: "Le dossier à rendre",
        body: [
          "Le brief, le planning et le devis du projet.",
          "Les fichiers sources et les exports (affiche, visuels, film, enregistrement du direct test).",
          "La charte graphique et la liste des licences utilisées.",
          "Un bilan : ce qui a bien marché, les difficultés, les améliorations.",
        ],
      },
      {
        heading: "Pour continuer",
        body: [
          "Publiez vos travaux dans un portfolio en ligne et sur les réseaux.",
          "Continuez à pratiquer sur de vrais projets, même petits : la pratique construit l'expérience.",
          "Suivez les évolutions des logiciels et des plateformes.",
          "Échangez avec d'autres créateurs et demandez des avis.",
        ],
      },
    ],
    caseTitle: "Le bilan de Neema",
    caseLines: [
      "Un an après avoir commencé, Neema livre à une association une identité visuelle complète, un film de présentation et une retransmission en direct.",
      "Elle respecte le brief, les délais et les droits des musiques et des images.",
      "L'association publie ses visuels et son film, et la retransmission réunit des centaines de spectateurs.",
      "Neema ajoute le projet à son portfolio et commence la préparation du suivant.",
    ],
    tasks: [
      "Réalisez le projet final complet avec votre marque ou événement.",
      "Constituez le dossier à rendre avec sources, exports et licences.",
      "Présentez votre projet en dix minutes.",
      "Publiez au moins trois de vos réalisations dans un portfolio.",
    ],
    goal: "Concevoir et réaliser un projet visuel et audiovisuel complet, de l'identité au direct.",
    video: "Projet complet de communication visuelle et audiovisuelle",
  }),
];

export const quizzesB3 = [
  quiz(7, "Quiz 7 — Étalonnage avancé", "Courbes, masques, tracking", [
    ["Que règlent les courbes ?", "Les ombres, tons moyens et hautes lumières", "Le nom du fichier", "La durée"],
    ["Que fait une courbe en S légère ?", "Elle augmente le contraste en gardant des tons naturels", "Elle supprime les couleurs", "Elle change le format"],
    ["À quoi sert un masque en étalonnage ?", "Limiter une correction à une zone", "Imprimer", "Changer de logiciel"],
    ["Que fait le tracking ?", "Faire suivre un masque à un objet en mouvement", "Couper le son", "Exporter"],
    ["Pourquoi adoucir le bord d'un masque ?", "Pour une intégration naturelle", "Pour alourdir", "Pour supprimer l'image"],
    ["Quel outil montre les niveaux de luminosité ?", "La forme d'onde", "Le chutier", "Le titre"],
    ["Pourquoi contrôler avec des outils ?", "L'œil se fatigue et peut tromper", "Pour alourdir le fichier", "Pour changer la musique"],
    ["Dans quel ordre étalonner ?", "Correction, harmonisation, puis style", "Style puis correction", "Seulement le style"],
    ["Où vérifier le résultat ?", "Sur plusieurs écrans, dont un téléphone", "Sur un seul écran toujours", "Nulle part"],
    ["Que garder pour comparer ?", "Une version non étalonnée", "Rien", "Seulement l'export"],
  ]),
  quiz(8, "Quiz 8 — OBS Studio", "Scènes, sources, audio", [
    ["Qu'est-ce qu'OBS Studio ?", "Un logiciel gratuit d'enregistrement et de diffusion", "Un logiciel de comptabilité", "Un navigateur"],
    ["Qu'est-ce qu'une scène ?", "Un ensemble de sources organisées", "Un fichier audio", "Un câble"],
    ["Qu'est-ce qu'une source ?", "Une caméra, un écran, une image, un texte…", "Un mot de passe", "Un type de prise"],
    ["Que règle le mixeur audio ?", "Les niveaux de chaque source sonore", "La couleur", "La résolution"],
    ["Que faire avant l'événement ?", "Un enregistrement test", "Rien", "Supprimer les scènes"],
    ["Quel débit pour du 1080p à 30 i/s ?", "Environ 4 500 à 6 000 kb/s", "10 kb/s", "1 000 000 kb/s"],
    ["Que fait le mode Studio ?", "Préparer une scène avant de l'envoyer à l'antenne", "Éteindre", "Compresser"],
    ["Que préparer à l'avance ?", "Les médias : intro, musique, photos", "Rien", "Le décor de la maison"],
    ["Comment superposer des sources ?", "Selon leur ordre dans la liste", "Au hasard", "En les supprimant"],
    ["À quoi sert une collection de scènes ?", "Garder une configuration par type d'émission", "Alourdir", "Supprimer"],
  ]),
  quiz(9, "Quiz 9 — vMix et régie", "Aperçu, programme, équipe", [
    ["Que montre le programme ?", "Ce qui est en direct", "Le prochain plan préparé", "Le logo seulement"],
    ["Que montre l'aperçu ?", "Ce qui va être diffusé ensuite", "Le son", "Le titre du fichier"],
    ["Comment connecter une caméra ?", "Par HDMI avec une carte de capture ou par le réseau", "Par Bluetooth uniquement", "Sans câble ni réseau"],
    ["Quelle transition pour un changement rapide ?", "La coupe", "Le fondu de dix secondes", "Aucune"],
    ["Quand préparer les titres ?", "À l'avance", "Pendant la panne", "Jamais"],
    ["Pourquoi une interphonie ?", "Communiquer sans bruit dans l'équipe", "Diffuser de la musique", "Supprimer des caméras"],
    ["Que faut-il tester avant l'événement ?", "Chaque entrée et chaque câble", "Rien", "La couleur du mur"],
    ["Pourquoi un déroulé écrit ?", "Pour suivre les moments clés", "Pour alourdir", "Pour changer le format"],
    ["Que prévoir en cas de panne d'une caméra ?", "Un plan de secours", "Rien", "Fermer l'événement"],
    ["Que privilégier ?", "La clarté plutôt que les effets inutiles", "Les effets sans limite", "Le silence"],
  ]),
  quiz(10, "Quiz 10 — Diffusion en direct", "Son, débit et plan B", [
    ["Qu'est-ce qui est le plus difficile à supporter en direct ?", "Un mauvais son", "Un logo discret", "Un fondu"],
    ["Que ne faut-il jamais partager ?", "La clé de diffusion", "Le titre", "Le logo"],
    ["Que doit respecter le débit ?", "Il doit rester inférieur à la vitesse d'envoi avec une marge", "Il doit dépasser l'upload", "Il doit être aléatoire"],
    ["Quelle connexion est la plus stable ?", "Un câble réseau", "Le Wi-Fi saturé", "Aucune connexion"],
    ["Qu'est-ce que la latence ?", "Le décalage entre le direct et ce que voit le spectateur", "Le prix d'un forfait", "Le nom d'un logiciel"],
    ["Pourquoi enregistrer aussi en local ?", "Pour avoir une copie de haute qualité", "Pour alourdir", "Pour supprimer le direct"],
    ["Quel plan de secours pour la connexion ?", "Le partage de connexion du téléphone", "Aucun", "Arrêter la diffusion"],
    ["Que faire pendant le direct ?", "Surveiller image, son et débit", "Éteindre l'écran", "Débrancher le micro"],
    ["Que provoque un larsen ?", "Un sifflement par retour micro-haut-parleur", "Une meilleure qualité", "Un fichier plus léger"],
    ["Que faire avant l'événement ?", "Tester la connexion à la même heure", "Rien", "Changer de plateforme"],
  ]),
  quiz(11, "Quiz 11 — Droits et organisation", "Licences, droit à l'image, clients", [
    ["Qui détient les droits d'une œuvre ?", "Son auteur", "Le premier qui la télécharge", "Personne"],
    ["Que faut-il vérifier pour une musique ?", "Sa licence et les conditions d'usage", "Sa durée seulement", "Sa couleur"],
    ["Que demande le droit à l'image ?", "L'accord de la personne filmée ou photographiée", "Aucun accord", "Seulement l'accord de l'imprimeur"],
    ["Pour un mineur, qui doit autoriser ?", "Ses parents", "Personne", "Le monteur"],
    ["Que commencer avec un client ?", "Un brief", "L'exportation", "L'impression"],
    ["Que contient un devis ?", "Les étapes, les délais et le prix", "Seulement un logo", "Une photo"],
    ["Pourquoi faire valider par écrit ?", "Pour éviter les malentendus", "Pour alourdir", "Pour supprimer"],
    ["Que préciser dans le contrat ?", "Les droits cédés au client", "La couleur du bureau", "La marque de l'ordinateur"],
    ["Que faire de la confidentialité des projets ?", "La respecter", "La publier", "L'ignorer"],
    ["Pourquoi un portfolio ?", "Montrer son travail et trouver des clients", "Réduire le poids", "Remplacer le contrat"],
  ]),
  quiz(12, "Quiz 12 — Révision du niveau 3", "Perfectionnement et diffusion", [
    ["Que veut dire non destructif ?", "On peut revenir en arrière sans perdre l'original", "On supprime l'original", "On ne retouche pas"],
    ["Qu'est-ce que le fond perdu ?", "Un débordement autour du format pour la coupe", "Un fichier supprimé", "Un type de papier"],
    ["Que permet le multicaméra ?", "Alterner plusieurs angles", "Réduire la résolution", "Supprimer le son"],
    ["Qu'est-ce qu'une charte graphique ?", "Le mode d'emploi de l'identité visuelle", "Un contrat", "Un logiciel"],
    ["Que fait OBS ?", "Enregistre et diffuse", "Compte les stocks", "Écrit des courriers"],
    ["Que ne faut-il jamais partager ?", "La clé de diffusion", "Le logo", "Le titre"],
    ["Que faut-il vérifier pour une musique ?", "Sa licence", "Sa couleur", "Son poids en lettres"],
    ["Que faut-il demander pour filmer une personne ?", "Son accord", "Rien", "Son mot de passe"],
    ["Que prévoir pour un direct ?", "Un plan de secours", "Rien", "Un écran noir"],
    ["Quel est le bon réflexe avant de livrer ?", "Relire, tester et faire valider", "Livrer sans tester", "Supprimer les sources"],
  ]),
];

export const final3 = finalQuiz(
  "Quiz final — Niveau 3 Perfectionnement et direct",
  "Design avancé, montage avancé, direct, droits",
  [
    ["Que permet un objet dynamique ?", "Redimensionner sans perte de qualité", "Supprimer la photo", "Compresser le son"],
    ["Que fait un masque de fusion ?", "Cache ou révèle sans supprimer", "Imprime", "Exporte"],
    ["Quelle taille pour une story verticale ?", "1080 × 1920", "1920 × 1080", "100 × 100"],
    ["Qu'est-ce qu'une charte graphique ?", "Un mode d'emploi de l'identité de la marque", "Une facture", "Une police"],
    ["Quelle valeur de fond perdu est courante ?", "3 mm", "30 cm", "0 mm exactement"],
    ["Quel mode de couleur pour l'impression ?", "CMJN", "RVB uniquement", "Aucun"],
    ["Qu'est-ce qu'un BAT ?", "Une épreuve à valider avant le tirage", "Un type d'encre", "Un logiciel"],
    ["Comment synchroniser plusieurs caméras ?", "Avec un son commun ou un code temporel", "Au hasard", "Par la couleur"],
    ["À quoi servent les proxy ?", "Monter fluidement des fichiers lourds", "Réduire la qualité finale", "Supprimer les rushes"],
    ["Que doit avoir un bon mouvement ?", "Une accélération puis un ralentissement", "Une vitesse constante absolue", "Aucune règle"],
    ["Que fait le tracking en étalonnage ?", "Il fait suivre un masque à un sujet en mouvement", "Il coupe le son", "Il exporte"],
    ["Qu'est-ce qu'une scène dans OBS ?", "Un ensemble de sources organisées", "Un câble", "Un mot de passe"],
    ["Quel débit pour du 1080p à 30 i/s ?", "Environ 4 500 à 6 000 kb/s", "10 kb/s", "100 000 kb/s"],
    ["Que montre le programme dans une régie ?", "Ce qui est en direct", "Le prochain plan", "Le logo"],
    ["Que ne faut-il jamais partager ?", "La clé de diffusion", "Le titre", "Le logo"],
    ["Que faire en cas de panne de connexion ?", "Basculer sur une connexion de secours", "Fermer l'événement", "Éteindre l'écran"],
    ["Que demande le droit à l'image ?", "L'accord de la personne filmée", "Aucun accord", "Seulement celui du monteur"],
    ["Que faut-il vérifier pour une musique ?", "Sa licence", "Sa couleur", "Sa taille de fichier"],
    ["Que commencer avec un client ?", "Un brief", "L'export", "L'impression"],
    ["Quel est le bon réflexe avant de livrer ?", "Relire, tester et faire valider", "Livrer sans vérifier", "Effacer les sources"],
  ]
);
