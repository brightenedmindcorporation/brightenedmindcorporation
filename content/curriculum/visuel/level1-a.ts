import { lesson, quiz } from "../bureautique/builders";

// Niveau 1 · Image et design graphique — leçons 1 à 6 : l'image numérique, la couleur, la composition et Photoshop.
// Les menus peuvent varier légèrement selon la version de Photoshop et d'Illustrator.

export const lessonsA = [
  lesson({
    id: 1,
    title: "L'image numérique",
    subtitle: "Pixels, résolution, formats et modes de couleur.",
    sections: [
      {
        heading: "Pixels et résolution",
        body: [
          "Une image numérique de type photo (matricielle) est faite de petits carrés de couleur : les pixels.",
          "La définition est le nombre de pixels : par exemple 1920 × 1080 pixels.",
          "La résolution est la densité de pixels : 72 ppi suffisent pour un écran, 300 ppi sont conseillés pour l'impression.",
          "Agrandir trop une image matricielle la rend floue ou pixelisée : partez toujours d'une image assez grande.",
        ],
      },
      {
        heading: "Matriciel et vectoriel",
        body: [
          "Une image matricielle (photo) est composée de pixels : Photoshop la traite.",
          "Une image vectorielle est décrite par des formes et des courbes mathématiques : Illustrator la traite.",
          "Un dessin vectoriel peut être agrandi à l'infini sans perdre en netteté : idéal pour un logo.",
          "Une photo reste matricielle : un logo se dessine en vectoriel.",
        ],
      },
      {
        heading: "Les formats de fichier",
        body: [
          "JPG : photos, fichier léger, compression avec perte de qualité.",
          "PNG : images avec fond transparent, sans perte, parfaite pour le web.",
          "PSD : fichier de travail de Photoshop avec ses calques. AI : fichier de travail d'Illustrator.",
          "SVG : vectoriel pour le web. PDF : document prêt à imprimer ou à partager. TIFF : image sans perte pour l'impression.",
        ],
      },
      {
        heading: "RVB ou CMJN",
        body: [
          "RVB (rouge, vert, bleu) : les couleurs des écrans, créées avec de la lumière.",
          "CMJN (cyan, magenta, jaune, noir) : les couleurs de l'impression, créées avec de l'encre.",
          "Travaillez en RVB pour le web et les réseaux sociaux, en CMJN pour l'imprimerie.",
          "Les couleurs CMJN paraissent un peu moins vives que celles de l'écran : c'est normal.",
        ],
      },
    ],
    caseTitle: "Une affiche floue",
    caseLines: [
      "Neema envoie à l'imprimeur une affiche créée à partir d'une photo téléchargée de petite taille (600 × 400 pixels).",
      "L'imprimeur lui explique que l'image sera floue en format A3 : il faudrait une résolution de 300 ppi, soit bien plus de pixels.",
      "Elle refait l'affiche avec la photo originale de son appareil, en haute définition.",
      "Elle apprend aussi à garder son logo en vectoriel pour pouvoir l'agrandir sans perte.",
    ],
    tasks: [
      "Ouvrez trois images et comparez leurs dimensions en pixels et leur taille en Mo.",
      "Exportez la même photo en JPG puis en PNG et comparez le poids des fichiers.",
      "Agrandissez une petite photo à 300 % et notez ce qui se passe.",
      "Expliquez en une phrase la différence entre RVB et CMJN.",
    ],
    goal: "Choisir la bonne résolution, le bon format de fichier et le bon mode de couleur pour un projet.",
    video: "L'image numérique : pixels, résolution et formats",
  }),
  lesson({
    id: 2,
    title: "Couleur, typographie et composition",
    subtitle: "Les règles de base d'un visuel réussi.",
    sections: [
      {
        heading: "La couleur",
        body: [
          "Le cercle chromatique classe les couleurs : primaires (rouge, jaune, bleu), secondaires et tertiaires.",
          "Couleurs complémentaires (opposées sur le cercle) : fort contraste. Couleurs analogues (voisines) : harmonie douce.",
          "Limitez-vous à deux ou trois couleurs principales, plus le blanc et le noir.",
          "Les couleurs transmettent des émotions : le rouge attire l'attention, le bleu inspire la confiance, le vert rappelle la nature.",
        ],
      },
      {
        heading: "La typographie",
        body: [
          "Les polices serif (avec empattements) donnent un aspect classique ; les polices sans serif sont modernes et lisibles à l'écran.",
          "N'utilisez pas plus de deux polices dans un même visuel : une pour les titres, une pour le texte.",
          "La taille, le gras et la couleur créent la hiérarchie : on lit d'abord le titre, puis le sous-titre, puis le détail.",
          "Vérifiez la lisibilité : un fort contraste entre le texte et le fond.",
        ],
      },
      {
        heading: "La composition",
        body: [
          "La règle des tiers : divisez l'image en trois lignes et trois colonnes ; placez les éléments importants sur les lignes ou leurs croisements.",
          "L'alignement donne de l'ordre : alignez les textes et les éléments sur les mêmes axes.",
          "L'espace vide (le blanc) fait respirer le visuel : ne remplissez pas tout.",
          "Créez un point d'attention clair : l'œil doit savoir où regarder en premier.",
        ],
      },
      {
        heading: "La hiérarchie de l'information",
        body: [
          "Un bon visuel répond à trois questions : quoi, pour qui, que faire ?",
          "Mettez en avant l'essentiel : titre, date, lieu, appel à l'action.",
          "Groupez les informations liées et séparez-les des autres.",
          "Testez votre visuel : montrez-le à quelqu'un pendant 5 secondes et demandez ce qu'il a retenu.",
        ],
      },
    ],
    caseTitle: "Le flyer du concert",
    caseLines: [
      "Pour un concert de son église, Neema réalise un flyer avec six couleurs et quatre polices différentes.",
      "Un ami lui dit que personne ne sait où regarder : le titre se perd dans le décor.",
      "Elle garde deux couleurs, une seule police en trois tailles et un grand titre contrasté.",
      "Le nouveau flyer est lisible en quelques secondes : date, lieu et nom du concert se voient tout de suite.",
    ],
    tasks: [
      "Choisissez une palette de trois couleurs pour une marque fictive et justifiez-la.",
      "Associez deux polices (titre et texte) et composez un petit texte.",
      "Placez trois éléments d'un visuel selon la règle des tiers.",
      "Critiquez une affiche de rue : couleurs, polices, hiérarchie.",
    ],
    goal: "Appliquer les règles de couleur, de typographie et de composition à un visuel simple.",
    video: "Couleur, typographie et composition en design graphique",
  }),
  lesson({
    id: 3,
    title: "Photoshop : découvrir l'interface",
    subtitle: "Ouvrir, créer, naviguer et enregistrer un document.",
    sections: [
      {
        heading: "L'espace de travail",
        body: [
          "La barre de menus en haut : Fichier, Édition, Image, Calque, Texte, Sélection, Filtre…",
          "La barre d'options sous les menus : elle change selon l'outil choisi.",
          "La barre d'outils à gauche : déplacement, sélection, recadrage, pinceau, tampon, texte, plume…",
          "Les panneaux à droite : Calques, Propriétés, Couleurs, Historique.",
        ],
      },
      {
        heading: "Créer un document",
        body: [
          "Fichier > Nouveau : choisissez la largeur, la hauteur, la résolution et le mode de couleur.",
          "Pour un visuel de réseaux sociaux : par exemple 1080 × 1080 pixels, 72 ppi, RVB.",
          "Pour une affiche A4 imprimée : 210 × 297 mm, 300 ppi, CMJN.",
          "Fichier > Ouvrir permet de retoucher une photo existante.",
        ],
      },
      {
        heading: "Naviguer et zoomer",
        body: [
          "Ctrl + molette ou Ctrl + + / Ctrl + − : zoomer et dézoomer.",
          "Barre d'espace + glisser : déplacer l'image dans la fenêtre.",
          "Ctrl + 0 : afficher l'image entière à l'écran. Ctrl + 1 : afficher à 100 %.",
          "Ctrl + Z annule la dernière action ; le panneau Historique permet de revenir plusieurs étapes en arrière.",
        ],
      },
      {
        heading: "Enregistrer et exporter",
        body: [
          "Enregistrez en PSD pour garder les calques et pouvoir modifier plus tard.",
          "Exportez en JPG ou PNG pour partager : Fichier > Exporter > Exporter sous.",
          "Gardez toujours une copie du fichier d'origine avant toute retouche.",
          "Donnez des noms clairs : affiche-concert-v2.psd.",
        ],
      },
    ],
    caseTitle: "Le premier document",
    caseLines: [
      "Neema ouvre Photoshop pour la première fois et crée un document de 1080 × 1080 pixels pour son réseau social.",
      "Elle repère la barre d'outils, le panneau des calques et la barre d'options.",
      "Elle zoome sur une zone, déplace l'image avec la barre d'espace, puis annule une erreur avec Ctrl + Z.",
      "Elle enregistre en PSD, puis exporte une copie en PNG pour la publier.",
    ],
    tasks: [
      "Créez un document 1080 × 1080 pixels en RVB et un autre en A4 en CMJN.",
      "Repérez et nommez cinq outils de la barre d'outils.",
      "Zoomez, déplacez, annulez trois actions avec l'historique.",
      "Enregistrez en PSD puis exportez en JPG et en PNG.",
    ],
    goal: "Se repérer dans l'interface de Photoshop, créer un document et enregistrer ou exporter son travail.",
    video: "Photoshop : découverte de l'interface pour débutants",
  }),
  lesson({
    id: 4,
    title: "Photoshop : les calques",
    subtitle: "Superposer, organiser et modifier sans abîmer l'image.",
    sections: [
      {
        heading: "Qu'est-ce qu'un calque",
        body: [
          "Un calque est comme une feuille transparente posée sur l'image : on peut y dessiner sans toucher aux autres.",
          "Le panneau Calques les liste de haut en bas : le calque du haut est devant.",
          "Cliquez sur l'œil pour afficher ou cacher un calque.",
          "Travailler par calques permet de corriger plus tard sans tout refaire.",
        ],
      },
      {
        heading: "Gérer les calques",
        body: [
          "Créer : le bouton « Nouveau calque » en bas du panneau, ou Ctrl + Maj + N.",
          "Renommer : double-clic sur le nom ; donnez des noms clairs (Fond, Logo, Titre).",
          "Réordonner : glissez un calque vers le haut ou le bas.",
          "Grouper : sélectionnez plusieurs calques puis Ctrl + G ; supprimer : touche Suppr.",
        ],
      },
      {
        heading: "Opacité et modes de fusion",
        body: [
          "L'opacité règle la transparence d'un calque de 0 à 100 %.",
          "Les modes de fusion (Produit, Superposition, Écran…) mélangent un calque avec ceux du dessous.",
          "Produit assombrit, Écran éclaircit, Superposition renforce le contraste.",
          "Testez-les : ils offrent beaucoup d'effets sans rien détruire.",
        ],
      },
      {
        heading: "Transformer",
        body: [
          "Ctrl + T : transformation libre (taille, rotation) d'un calque.",
          "Maintenez Maj pour garder les proportions pendant le redimensionnement.",
          "Verrouillez un calque (cadenas) pour éviter de le modifier par erreur.",
          "Convertissez un calque en objet dynamique pour redimensionner sans perdre en qualité.",
        ],
      },
    ],
    caseTitle: "Un visuel en couches",
    caseLines: [
      "Neema construit son visuel en plusieurs calques : fond, photo, filtre de couleur, titre et logo.",
      "Elle règle l'opacité du filtre à 40 % pour que la photo reste visible.",
      "Le client demande de déplacer le logo : un seul calque à bouger, tout le reste est intact.",
      "Elle regroupe les éléments de texte dans un dossier nommé « Textes » pour rester organisée.",
    ],
    tasks: [
      "Créez un document de cinq calques nommés : Fond, Photo, Filtre, Titre, Logo.",
      "Réglez l'opacité d'un calque et testez trois modes de fusion.",
      "Regroupez deux calques et masquez le groupe.",
      "Redimensionnez un calque avec Ctrl + T en gardant les proportions.",
    ],
    goal: "Organiser un visuel en calques bien nommés et utiliser l'opacité et les modes de fusion.",
    video: "Photoshop : comprendre et utiliser les calques",
  }),
  lesson({
    id: 5,
    title: "Photoshop : sélections et détourage",
    subtitle: "Isoler un sujet pour le déplacer ou changer son fond.",
    sections: [
      {
        heading: "Les outils de sélection",
        body: [
          "Rectangle et ellipse de sélection : formes simples.",
          "Lasso et lasso polygonal : dessiner une sélection à la main ou par points.",
          "Sélection rapide et baguette magique : sélectionner par couleur ou par contraste.",
          "Maj ajoute à la sélection, Alt retire de la sélection ; Ctrl + D désélectionne.",
        ],
      },
      {
        heading: "Affiner une sélection",
        body: [
          "Sélection > Sélectionner et masquer : améliore les bords, surtout les cheveux et les contours flous.",
          "Le contour progressif (pondération) adoucit le bord de la sélection.",
          "Zoomez à 200 % et plus pour contrôler le détourage.",
          "Choisissez en sortie « Nouveau calque avec masque de fusion » pour garder la possibilité de corriger.",
        ],
      },
      {
        heading: "Détourer un sujet",
        body: [
          "Sélectionnez le sujet avec Sélection rapide ou la fonction « Sélectionner le sujet » de Photoshop.",
          "Affinez les bords, puis créez un masque de fusion : le fond disparaît sans être supprimé.",
          "Avec le pinceau noir ou blanc sur le masque, on cache ou on révèle des parties.",
          "Placez ensuite le sujet sur un nouveau fond et ajustez la lumière et les couleurs pour que l'ensemble paraisse naturel.",
        ],
      },
      {
        heading: "Pièges à éviter",
        body: [
          "Un détourage à bords durs fait un effet « collé » : adoucissez les bords.",
          "Évitez de supprimer le fond directement : le masque est réversible.",
          "Comparez toujours le sujet et le nouveau fond : sens de la lumière, couleurs, ombres.",
          "Respectez le droit d'auteur : n'utilisez que des photos dont vous avez les droits.",
        ],
      },
    ],
    caseTitle: "Changer le fond d'une photo",
    caseLines: [
      "Neema doit placer la photo d'un directeur sur le fond bleu de l'affiche de l'entreprise.",
      "Elle sélectionne le sujet, affine les cheveux avec « Sélectionner et masquer » et crée un masque de fusion.",
      "Elle découvre quelques pixels blancs sur les bords : elle retouche le masque avec un petit pinceau noir.",
      "Elle ajuste ensuite la lumière pour que le sujet ait l'air d'être vraiment devant le fond bleu.",
    ],
    tasks: [
      "Détourez un objet simple avec la sélection rapide et un masque de fusion.",
      "Détourez une personne et améliorez les bords avec « Sélectionner et masquer ».",
      "Placez le sujet sur un nouveau fond et ajustez les couleurs.",
      "Retrouvez une partie masquée à l'aide du pinceau blanc.",
    ],
    goal: "Détourer un sujet proprement avec un masque de fusion et le placer sur un nouveau fond.",
    video: "Photoshop : sélection et détourage d'un sujet",
  }),
  lesson({
    id: 6,
    title: "Photoshop : retouche photo",
    subtitle: "Corriger la lumière, les couleurs et les défauts d'une photo.",
    sections: [
      {
        heading: "Recadrer et redresser",
        body: [
          "L'outil Recadrage supprime les bords inutiles et change la composition.",
          "Utilisez une grille de composition (règle des tiers) pour placer le sujet.",
          "Redressez l'horizon avec l'outil Règle ou l'option Redresser du recadrage.",
          "Recadrez en gardant le même format que celui de la publication (carré, vertical, panoramique).",
        ],
      },
      {
        heading: "Lumière et couleurs",
        body: [
          "Les calques de réglage (Niveaux, Courbes, Luminosité/Contraste, Teinte/Saturation) retouchent sans abîmer la photo d'origine.",
          "Niveaux : règle les ombres, les tons moyens et les hautes lumières.",
          "Teinte/Saturation : change l'intensité ou la couleur ; ne forcez pas, au risque de rendre les couleurs artificielles.",
          "Comparez avant et après en cachant et affichant le calque de réglage.",
        ],
      },
      {
        heading: "Corriger les défauts",
        body: [
          "Correcteur de tache : supprime une petite tache ou un bouton en un clic.",
          "Tampon de duplication : copie une zone saine sur une zone à cacher (Alt + clic pour définir la source).",
          "Pièce et Remplissage selon le contenu : supprime un objet gênant dans le décor.",
          "Travaillez sur un nouveau calque pour pouvoir annuler ou ajuster.",
        ],
      },
      {
        heading: "Retouche portrait et éthique",
        body: [
          "Une bonne retouche reste naturelle : on corrige sans transformer la personne.",
          "Évitez les déformations irréalistes du corps ou du visage.",
          "Ne retouchez pas une photo pour tromper : une image de presse ne se modifie pas.",
          "Conservez toujours l'original et travaillez sur une copie.",
        ],
      },
    ],
    caseTitle: "La photo d'équipe",
    caseLines: [
      "La photo de l'équipe de Neema est sombre et un peu penchée.",
      "Elle redresse l'horizon, recadre en carré pour le réseau social et ajoute un calque Niveaux pour éclaircir.",
      "Elle supprime un câble disgracieux avec le tampon de duplication sur un calque séparé.",
      "Elle compare avant et après : la photo est plus lumineuse et naturelle.",
    ],
    tasks: [
      "Recadrez et redressez une photo penchée.",
      "Améliorez la lumière avec un calque Niveaux ou Courbes.",
      "Supprimez un défaut avec le correcteur ou le tampon sur un calque séparé.",
      "Présentez l'avant et l'après et expliquez vos réglages.",
    ],
    goal: "Réaliser une retouche photo simple et naturelle avec des réglages non destructifs.",
    video: "Photoshop : retouche photo pour débutants",
  }),
];

export const quizzesA = [
  quiz(1, "Quiz 1 — L'image numérique", "Pixels, formats et couleurs", [
    ["De quoi est faite une image matricielle ?", "De pixels", "De formes mathématiques", "De son"],
    ["Quelle résolution est conseillée pour l'impression ?", "300 ppi", "10 ppi", "1 ppi"],
    ["Quel logiciel traite surtout le vectoriel ?", "Illustrator", "Photoshop", "Word"],
    ["Quel format garde un fond transparent ?", "PNG", "JPG", "MP3"],
    ["Quel format conserve les calques de Photoshop ?", "PSD", "JPG", "SVG"],
    ["Quel mode de couleur est pour l'écran ?", "RVB", "CMJN", "Noir et blanc"],
    ["Quel mode de couleur est pour l'imprimerie ?", "CMJN", "RVB", "Sépia"],
    ["Que se passe-t-il quand on agrandit trop une petite photo ?", "Elle devient floue ou pixelisée", "Elle devient plus nette", "Rien"],
    ["Pourquoi dessiner un logo en vectoriel ?", "Pour pouvoir l'agrandir sans perdre en netteté", "Pour qu'il soit plus lourd", "Pour qu'il soit en noir et blanc"],
    ["Que veut dire 1920 × 1080 ?", "La définition en pixels de l'image", "Le poids en Mo", "Le nombre de couleurs"],
  ]),
  quiz(2, "Quiz 2 — Couleur, typographie, composition", "Les règles d'un bon visuel", [
    ["Que sont des couleurs complémentaires ?", "Des couleurs opposées sur le cercle chromatique", "Des couleurs voisines", "Du noir et du blanc"],
    ["Combien de polices maximum dans un visuel simple ?", "Deux", "Dix", "Autant que possible"],
    ["Que crée la hiérarchie visuelle ?", "L'ordre de lecture : titre, sous-titre, détails", "La taille du fichier", "Le format PDF"],
    ["Que dit la règle des tiers ?", "Placer les éléments importants sur les lignes de la grille 3×3", "Utiliser trois polices", "Utiliser trois logos"],
    ["Que permet l'espace vide ?", "Faire respirer le visuel", "Cacher des erreurs", "Augmenter le poids"],
    ["Pourquoi vérifier le contraste entre texte et fond ?", "Pour que le texte soit lisible", "Pour changer de logiciel", "Pour imprimer plus vite"],
    ["Quelle couleur inspire souvent la confiance ?", "Le bleu", "Le rouge fluo", "Le noir seul"],
    ["Quelles questions doit résoudre un visuel ?", "Quoi, pour qui, que faire ?", "Quand, où, combien de fichiers ?", "Aucune"],
    ["Quel est un bon test d'un visuel ?", "Le montrer 5 secondes et demander ce qui est retenu", "L'enregistrer en PDF", "Le renommer"],
    ["Que vaut-il mieux faire avec les couleurs ?", "En limiter le nombre à deux ou trois principales", "En utiliser dix", "Utiliser uniquement des couleurs fluo"],
  ]),
  quiz(3, "Quiz 3 — Photoshop : interface", "Documents, navigation et export", [
    ["Où se trouve la barre d'outils ?", "À gauche de l'écran", "En bas, dans la barre d'état", "Dans l'imprimante"],
    ["Quel panneau liste les calques ?", "Le panneau Calques", "Le panneau Météo", "Le panneau Son"],
    ["Quel raccourci annule la dernière action ?", "Ctrl + Z", "Ctrl + P", "Ctrl + Q"],
    ["Comment déplacer l'image dans la fenêtre ?", "Barre d'espace + glisser", "Appuyer sur Échap", "Double-cliquer sur le bureau"],
    ["Quel format garder pour pouvoir modifier plus tard ?", "PSD", "JPG", "GIF"],
    ["Quelle taille pour un visuel carré de réseau social ?", "Environ 1080 × 1080 pixels", "10 × 10 pixels", "100 000 × 100 000 pixels"],
    ["Quel mode de couleur choisir pour une affiche imprimée ?", "CMJN", "RVB", "Aucun"],
    ["Que montre le panneau Historique ?", "Les dernières actions, pour revenir en arrière", "Les polices", "Les couleurs de l'écran"],
    ["Pourquoi garder une copie de l'original ?", "Pour pouvoir recommencer si besoin", "Pour gagner de la place", "Pour changer de logiciel"],
    ["Quel raccourci affiche l'image entière ?", "Ctrl + 0", "Ctrl + 9", "Ctrl + 5"],
  ]),
  quiz(4, "Quiz 4 — Photoshop : calques", "Organiser et fusionner", [
    ["Qu'est-ce qu'un calque ?", "Une feuille transparente superposée à l'image", "Un fichier PDF", "Un type de police"],
    ["Quel calque est devant dans le panneau ?", "Celui du haut", "Celui du bas", "Aucun"],
    ["À quoi sert l'œil d'un calque ?", "Afficher ou cacher le calque", "Supprimer le calque", "Imprimer le calque"],
    ["Que règle l'opacité ?", "La transparence du calque", "La taille de la police", "La couleur du fond"],
    ["Quel raccourci groupe des calques ?", "Ctrl + G", "Ctrl + P", "Ctrl + W"],
    ["Quel raccourci lance la transformation libre ?", "Ctrl + T", "Ctrl + J", "Ctrl + F"],
    ["Quelle touche garde les proportions pendant le redimensionnement ?", "Maj", "Alt", "Tab"],
    ["À quoi sert un objet dynamique ?", "Redimensionner sans perdre en qualité", "Imprimer", "Supprimer le fond"],
    ["Pourquoi nommer ses calques ?", "Pour s'y retrouver facilement", "Pour réduire la taille du fichier", "Pour changer de format"],
    ["Que fait le mode de fusion Produit ?", "Il assombrit en mélangeant avec les calques du dessous", "Il supprime le calque", "Il éclaircit toujours"],
  ]),
  quiz(5, "Quiz 5 — Photoshop : détourage", "Sélections et masques", [
    ["Quel outil sélectionne par couleur ou contraste ?", "Sélection rapide ou baguette magique", "Gomme", "Texte"],
    ["Quelle touche ajoute à une sélection ?", "Maj", "Alt", "Suppr"],
    ["Quel raccourci désélectionne ?", "Ctrl + D", "Ctrl + S", "Ctrl + E"],
    ["Que fait « Sélectionner et masquer » ?", "Il améliore les bords de la sélection", "Il imprime", "Il change de langue"],
    ["Pourquoi préférer un masque de fusion à la suppression ?", "Il est réversible", "Il pèse plus", "Il supprime l'original"],
    ["Que fait le pinceau noir sur un masque ?", "Il cache des parties", "Il révèle des parties", "Il enregistre"],
    ["Que fait le pinceau blanc sur un masque ?", "Il révèle des parties", "Il cache des parties", "Il imprime"],
    ["Pourquoi adoucir les bords d'un détourage ?", "Pour éviter l'effet « collé »", "Pour réduire la taille du fichier", "Pour changer de couleur"],
    ["Que comparer entre le sujet et le nouveau fond ?", "La lumière, les couleurs et les ombres", "Le nom du fichier", "Le format"],
    ["Quelles images peut-on utiliser ?", "Celles dont on a les droits", "N'importe quelle image trouvée", "Seulement celles d'autrui sans autorisation"],
  ]),
  quiz(6, "Quiz 6 — Photoshop : retouche", "Lumière, couleurs et défauts", [
    ["Que fait l'outil Recadrage ?", "Il supprime les bords inutiles et change la composition", "Il colorie", "Il imprime"],
    ["Pourquoi utiliser un calque de réglage ?", "Retoucher sans abîmer la photo d'origine", "Réduire le poids du fichier à zéro", "Changer de format"],
    ["Que règle le calque Niveaux ?", "Les ombres, tons moyens et hautes lumières", "La police", "Le format du papier"],
    ["Que fait le tampon de duplication ?", "Il copie une zone saine sur une zone à cacher", "Il supprime tout", "Il agrandit l'image"],
    ["Quelle touche définit la source du tampon ?", "Alt + clic", "Maj + clic", "Tab"],
    ["Pourquoi retoucher sur un calque séparé ?", "Pour pouvoir annuler ou ajuster", "Pour alourdir le fichier", "Pour cacher l'original"],
    ["Que faire d'un horizon penché ?", "Le redresser", "Le laisser", "Supprimer la photo"],
    ["Quel risque présente l'abus de saturation ?", "Des couleurs artificielles", "Un fichier plus léger", "Une meilleure impression"],
    ["Que respecter dans une retouche de portrait ?", "L'aspect naturel de la personne", "L'effet maximal", "Aucune règle"],
    ["Peut-on modifier une photo de presse pour tromper ?", "Non", "Oui, toujours", "Seulement le lundi"],
  ]),
];
