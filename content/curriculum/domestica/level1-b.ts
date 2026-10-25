import { finalQuiz, lesson, quiz } from "../bureautique/builders";

// BM Domestica · Formation du personnel domestique — leçons 7 à 12 : enfants, premiers secours, sécurité, relations, droits, carrière.
// Les conseils de santé sont des règles de base, pas une formation certifiée : suivez aussi un cours de secourisme.

export const lessonsB = [
  lesson({
    id: 7,
    title: "Garder des enfants en sécurité",
    subtitle: "Surveillance, repas, repos et jeux.",
    sections: [
      {
        heading: "La sécurité avant tout",
        body: [
          "Ne laissez jamais un jeune enfant seul, même un instant, surtout près de l'eau, d'un escalier, d'une fenêtre, du feu ou d'une route.",
          "Éloignez les objets dangereux : produits d'entretien, médicaments, couteaux, petits objets qu'un enfant pourrait avaler, sacs plastiques.",
          "Vérifiez les prises, les meubles instables et les portes que l'enfant peut ouvrir.",
          "Gardez les numéros d'urgence et ceux des parents à portée de main.",
        ],
      },
      {
        heading: "Les soins de base",
        body: [
          "Lavez-vous les mains avant de donner à manger ou de préparer un biberon, et après avoir changé l'enfant.",
          "Respectez les consignes des parents pour les repas, les horaires et les allergies.",
          "Un bébé se couche sur le dos pour dormir, sur une surface plane et ferme, sans coussin ni peluche dans le lit.",
          "Ne donnez jamais de médicament sans instruction claire des parents ou d'un médecin.",
        ],
      },
      {
        heading: "Jeux, rythme et éducation",
        body: [
          "Respectez le rythme de l'enfant : repas, sieste, jeux, bain, coucher.",
          "Jouez, chantez, racontez des histoires, proposez des activités adaptées à son âge.",
          "Soyez calme et patient : ne criez pas, ne frappez jamais, ne menacez pas ; expliquez et donnez l'exemple.",
          "Félicitez les efforts et les bons comportements.",
        ],
      },
      {
        heading: "Communiquer avec les parents",
        body: [
          "Donnez des nouvelles de la journée : repas, sieste, humeur, incidents.",
          "Prévenez immédiatement les parents en cas de fièvre, de chute, de blessure ou de comportement inhabituel.",
          "Respectez les règles sur les écrans, les sorties et les visiteurs.",
          "Gardez la discrétion sur la vie de la famille.",
        ],
      },
    ],
    caseTitle: "Une après-midi avec Emma",
    caseLines: [
      "Rose garde Emma, trois ans, pendant que ses parents travaillent.",
      "Elle range le produit d'entretien en hauteur, ferme la porte de la terrasse et surveille Emma en permanence.",
      "Emma se plaint d'avoir chaud et Rose constate qu'elle a de la fièvre : elle appelle tout de suite la maman.",
      "Elle ne donne aucun médicament avant d'avoir reçu la consigne des parents.",
    ],
    tasks: [
      "Listez dix dangers possibles dans une maison avec un enfant de trois ans.",
      "Décrivez une journée type d'un enfant de deux ans avec les horaires.",
      "Rédigez le message que vous enverriez aux parents si l'enfant a de la fièvre.",
      "Proposez trois jeux simples sans matériel coûteux pour un enfant de quatre ans.",
    ],
    goal: "Garder des enfants en sécurité, respecter leur rythme et informer correctement les parents.",
    video: "Garde d'enfants : sécurité et bonnes pratiques de la nounou",
  }),
  lesson({
    id: 8,
    title: "Les gestes de premiers secours",
    subtitle: "Savoir réagir et alerter en cas d'accident à la maison.",
    sections: [
      {
        heading: "Les principes de base",
        body: [
          "D'abord, protéger : assurez-vous que vous et la victime ne risquez plus rien (éteindre le feu, couper le courant).",
          "Ensuite, alerter : appelez les secours (numéro d'urgence local) ou un médecin, et prévenez la famille.",
          "Puis, secourir : faites seulement les gestes simples que vous connaissez.",
          "Restez calme, rassurez la victime et ne la laissez pas seule.",
        ],
      },
      {
        heading: "Coupures, brûlures, saignements",
        body: [
          "Petite coupure : lavez-la à l'eau propre et au savon, puis couvrez avec un pansement propre.",
          "Saignement important : appuyez fermement sur la plaie avec un linge propre et appelez les secours.",
          "Brûlure : refroidissez immédiatement à l'eau courante fraîche (pas glacée) pendant au moins 10 à 20 minutes ; n'appliquez ni huile, ni dentifrice, ni beurre ; couvrez avec un linge propre et appelez de l'aide pour une brûlure étendue, au visage ou chez un enfant.",
          "Saignement de nez : penchez la tête légèrement en avant et pincez le nez pendant 10 minutes.",
        ],
      },
      {
        heading: "Malaises, étouffement, intoxication",
        body: [
          "Malaise ou évanouissement : allongez la personne, surélevez ses jambes, desserrez les vêtements et appelez de l'aide si elle ne reprend pas vite conscience.",
          "Étouffement : si la personne ne peut plus parler, tousser ou respirer, appelez immédiatement les secours ; les gestes de désobstruction s'apprennent en formation de secourisme avec un instructeur.",
          "Intoxication ou produit avalé : ne faites pas vomir ; gardez l'emballage du produit et appelez un médecin ou un centre antipoison.",
          "Convulsions ou perte de connaissance : protégez la tête, ne mettez rien dans la bouche et appelez les secours.",
        ],
      },
      {
        heading: "Se préparer",
        body: [
          "Gardez une trousse de secours complète : pansements, compresses, antiseptique, gants, ciseaux, thermomètre.",
          "Affichez les numéros d'urgence, du médecin de famille et des parents.",
          "Notez les allergies et les traitements de chaque membre de la famille.",
          "Suivez une formation de secourisme certifiée : ce cours ne la remplace pas.",
        ],
      },
    ],
    caseTitle: "Une brûlure à la cuisine",
    caseLines: [
      "En cuisine, de l'eau chaude éclabousse le bras de Rose.",
      "Elle met aussitôt le bras sous l'eau courante fraîche pendant quinze minutes, sans appliquer d'huile.",
      "Elle couvre ensuite la brûlure d'un linge propre et prévient sa patronne, qui l'emmène consulter.",
      "Le médecin la félicite d'avoir pris les bons réflexes.",
    ],
    tasks: [
      "Citez dans l'ordre les trois premiers réflexes en cas d'accident.",
      "Expliquez comment soigner une petite brûlure et ce qu'il ne faut pas appliquer.",
      "Préparez la liste du contenu d'une trousse de secours familiale.",
      "Rédigez une fiche avec les numéros d'urgence à afficher dans la cuisine.",
    ],
    goal: "Appliquer les premiers réflexes (protéger, alerter, secourir) et les gestes simples en cas d'accident domestique.",
    video: "Premiers secours : brûlures, coupures et malaises",
  }),
  lesson({
    id: 9,
    title: "La sécurité du foyer",
    subtitle: "Protéger la maison, les clés, les accès et les personnes.",
    sections: [
      {
        heading: "Les clés et les accès",
        body: [
          "Ne prêtez jamais les clés, ne faites pas de double sans accord, et ne les laissez pas à la vue.",
          "Ne laissez entrer personne que vous ne connaissez pas sans l'autorisation de l'employeur.",
          "Vérifiez que portes, fenêtres et portails sont fermés en partant et à la nuit tombée.",
          "Demandez à l'employeur la liste des personnes autorisées (livreurs, artisans, famille).",
        ],
      },
      {
        heading: "Les visiteurs et les appels",
        body: [
          "Demandez le nom et le motif de la visite avant d'ouvrir ; vérifiez avec l'employeur si besoin.",
          "Ne donnez jamais d'informations sur la famille (adresse, horaires, argent) par téléphone ou à des inconnus.",
          "Notez les messages avec la date, l'heure et le nom de la personne.",
          "Prévenez l'employeur de tout comportement suspect.",
        ],
      },
      {
        heading: "Incendie et électricité",
        body: [
          "Ne laissez pas de bougie, de fer, de cuisinière ou de chauffage sans surveillance.",
          "N'utilisez pas de multiprises surchargées ; ne touchez pas un appareil électrique avec les mains mouillées.",
          "Repérez les sorties, l'extincteur éventuel et le plan d'évacuation.",
          "En cas de feu : faites sortir tout le monde d'abord, appelez les secours, ne prenez pas les objets.",
        ],
      },
      {
        heading: "Gardiens, chauffeurs et jardiniers",
        body: [
          "Gardien : faites des rondes régulières, contrôlez les accès, tenez un cahier des entrées et sorties, signalez tout incident.",
          "Chauffeur : respectez le code de la route, entretenez le véhicule, ne conduisez jamais fatigué ni sous l'influence de l'alcool.",
          "Jardinier : rangez les outils, manipulez avec précaution les produits de traitement, éloignez-les des enfants.",
          "Chacun garde le matériel de travail en bon état et rend compte des pannes.",
        ],
      },
    ],
    caseTitle: "Un visiteur inattendu",
    caseLines: [
      "Un homme sonne au portail et dit venir de la part du propriétaire pour récupérer un colis.",
      "Samuel, le gardien, ne l'ouvre pas : il appelle l'employeur, qui ne connaît pas cette personne.",
      "Samuel note l'heure et la description dans son cahier et prévient l'employeur.",
      "Grâce à sa prudence, aucun objet n'est perdu.",
    ],
    tasks: [
      "Rédigez cinq règles de sécurité pour les clés d'une maison.",
      "Écrivez ce que vous répondriez à un inconnu qui demande où travaille votre employeur.",
      "Décrivez la marche à suivre en cas de début d'incendie.",
      "Préparez un cahier d'entrées et sorties de gardien (colonnes et exemples).",
    ],
    goal: "Protéger la maison et ses habitants en gérant les accès, les visiteurs et les risques d'incendie.",
    video: "Sécurité à la maison : accès, visiteurs et incendie",
  }),
  lesson({
    id: 10,
    title: "Communiquer avec l'employeur et la famille",
    subtitle: "Écouter, rendre compte, résoudre les difficultés.",
    sections: [
      {
        heading: "Bien communiquer",
        body: [
          "Écoutez les consignes en entier, puis reformulez pour vérifier que vous avez compris.",
          "Parlez poliment et calmement, même si vous êtes fatigué ou contrarié.",
          "Utilisez les mots de politesse : bonjour, s'il vous plaît, merci, pardon.",
          "Si vous ne comprenez pas une langue, demandez de répéter ou d'expliquer autrement.",
        ],
      },
      {
        heading: "Rendre compte",
        body: [
          "Dites ce qui a été fait, ce qui reste à faire et ce qui manque (produits, nourriture).",
          "Signalez les problèmes sans attendre, avec des faits précis.",
          "Notez les consignes importantes sur un cahier ou un téléphone.",
          "Rendez compte de l'argent confié avec des reçus et des chiffres exacts.",
        ],
      },
      {
        heading: "Respecter la vie privée",
        body: [
          "Ne fouillez pas dans les affaires de la famille ; n'ouvrez pas le courrier ni les tiroirs.",
          "Ne prenez pas de photos dans la maison et ne partagez rien sur les réseaux sociaux sans accord.",
          "Ne répétez à personne les conversations ou les problèmes de la famille.",
          "Limitez les visites et les appels personnels pendant le travail.",
        ],
      },
      {
        heading: "Gérer les désaccords",
        body: [
          "Si vous n'êtes pas d'accord ou si une demande vous semble injuste, parlez-en calmement au bon moment, jamais devant les enfants.",
          "Proposez des solutions plutôt que de seulement vous plaindre.",
          "Si la situation ne s'améliore pas, demandez conseil à BM Domestica ou à une personne de confiance.",
          "Si vous subissez violence, menace ou harcèlement, ne restez pas seul(e) : parlez-en à BM Domestica ou à une personne de confiance et cherchez de l'aide.",
        ],
      },
    ],
    caseTitle: "Une consigne mal comprise",
    caseLines: [
      "Mme Kasongo demande à Rose de préparer le repas « pour sept heures ».",
      "Rose n'est pas sûre : elle reformule et demande « sept heures du soir, pour toute la famille ? ».",
      "Elle évite ainsi un malentendu et prépare le repas à l'heure.",
      "En fin de journée, elle donne un compte rendu simple des courses et des tâches effectuées.",
    ],
    tasks: [
      "Jouez une scène où vous reformulez une consigne pour vérifier que vous l'avez comprise.",
      "Rédigez le compte rendu d'une journée de travail en cinq lignes.",
      "Écrivez ce que vous diriez pour signaler poliment un désaccord sur un horaire.",
      "Listez quatre règles de respect de la vie privée de la famille.",
    ],
    goal: "Communiquer avec respect, rendre compte avec précision et résoudre calmement les difficultés.",
    video: "Bien communiquer avec son employeur : écoute et respect",
  }),
  lesson({
    id: 11,
    title: "Droits et devoirs du travail domestique",
    subtitle: "Contrat, horaires, salaire et protection de la personne.",
    sections: [
      {
        heading: "Le contrat de travail",
        body: [
          "Un contrat écrit protège les deux parties : il indique le poste, les tâches, les horaires, le salaire, le lieu et la durée d'essai.",
          "Lisez-le entièrement avant de signer ; demandez des explications si quelque chose n'est pas clair ; gardez-en une copie.",
          "Les conditions convenues (jours de repos, congés, heures supplémentaires, logement éventuel) doivent y figurer.",
          "Toute modification se fait par accord écrit.",
        ],
      },
      {
        heading: "Salaire et temps de travail",
        body: [
          "Le salaire est discuté et fixé à l'avance ; il doit être payé à la date convenue, en respectant le minimum prévu par la réglementation.",
          "Demandez un reçu ou notez chaque paiement.",
          "Les horaires, les jours de repos hebdomadaire et les congés doivent être respectés, et les heures supplémentaires convenues.",
          "En cas de doute sur vos droits, renseignez-vous auprès de l'inspection du travail ou de BM Domestica.",
        ],
      },
      {
        heading: "Vos devoirs",
        body: [
          "Accomplir les tâches convenues avec soin et honnêteté.",
          "Respecter les horaires, les consignes de sécurité et la confidentialité.",
          "Prévenir à l'avance en cas d'absence, avec un justificatif si c'est demandé.",
          "Préserver les biens de la famille et signaler toute casse ou panne.",
        ],
      },
      {
        heading: "Votre protection",
        body: [
          "Vous avez droit au respect, à des conditions de travail dignes, au repos et à la sécurité.",
          "Personne n'a le droit de vous frapper, de vous humilier, de vous harceler ou de confisquer vos papiers.",
          "Gardez vos pièces d'identité et vos documents personnels.",
          "En cas de problème grave, parlez-en à une personne de confiance, à BM Domestica ou aux autorités compétentes.",
        ],
      },
    ],
    caseTitle: "Un contrat avant de commencer",
    caseLines: [
      "Avant de commencer chez M. Kalala, Rose demande un contrat écrit avec ses horaires, son salaire et son jour de repos.",
      "Elle le lit en entier, pose une question sur les congés et obtient une clarification.",
      "Elle garde une copie et note chaque paiement reçu.",
      "Quand une difficulté apparaît, le contrat permet de la régler calmement.",
    ],
    tasks: [
      "Listez les informations qui doivent figurer dans un contrat de travail domestique.",
      "Rédigez trois questions à poser avant de signer un contrat.",
      "Expliquez quels comportements d'un employeur sont interdits.",
      "Préparez un petit tableau pour noter vos paiements reçus.",
    ],
    goal: "Connaître le contrat, le salaire, les horaires, ses devoirs et sa protection dans le travail domestique.",
    video: "Droits et devoirs de l'employé de maison : contrat et salaire",
  }),
  lesson({
    id: 12,
    title: "Organiser son travail et construire sa carrière",
    subtitle: "Gérer son temps, son argent et progresser.",
    sections: [
      {
        heading: "Gérer son temps",
        body: [
          "Commencez par les tâches prioritaires et les plus longues.",
          "Faites un planning journalier et hebdomadaire, et cochez ce qui est fait.",
          "Prévoyez du temps pour les imprévus et les pauses.",
          "Soyez régulier : un petit travail fait chaque jour vaut mieux qu'un grand ménage rare.",
        ],
      },
      {
        heading: "Gérer son argent",
        body: [
          "Notez vos revenus et vos dépenses chaque mois.",
          "Mettez de côté une petite somme dès que vous êtes payé, même modeste, pour les imprévus et vos projets.",
          "Évitez les dettes à taux élevé et les propositions « miracles » : méfiez-vous de ceux qui demandent de l'argent pour vous trouver un emploi sans reçu.",
          "Utilisez un compte (banque ou mobile money) sécurisé et ne donnez jamais votre code à personne.",
        ],
      },
      {
        heading: "Se former et progresser",
        body: [
          "Apprenez de nouvelles compétences : cuisine, soins aux enfants, secourisme, conduite, informatique de base.",
          "Gardez les attestations et certificats de formation, comme celui de BM Academia.",
          "Demandez des lettres de recommandation à vos anciens employeurs satisfaits.",
          "Faites-vous connaître par votre sérieux : le bouche-à-oreille est puissant.",
        ],
      },
      {
        heading: "Votre dossier professionnel",
        body: [
          "Préparez un petit CV : identité, métier, expériences, formations, langues, références.",
          "Gardez copie de votre contrat, de vos reçus et de vos attestations.",
          "Présentez-vous avec assurance à un entretien : ponctuel, propre, honnête, motivé.",
          "Fixez-vous un objectif à deux ans : un meilleur poste, une spécialisation, ou un petit projet à votre compte.",
        ],
      },
    ],
    caseTitle: "Le projet de Rose",
    caseLines: [
      "Rose met de côté une petite somme chaque mois et note ses dépenses.",
      "Elle suit des formations de cuisine et de secourisme et obtient son certificat de BM Academia.",
      "Elle demande une lettre de recommandation à Mme Kasongo et prépare un petit CV.",
      "Un an plus tard, elle obtient un poste de cuisinière dans une famille qui la paie mieux.",
    ],
    tasks: [
      "Établissez un budget mensuel simple avec vos revenus et dépenses.",
      "Rédigez votre CV en une page, ou celui d'un personnage fictif.",
      "Fixez trois objectifs professionnels à un an et à deux ans.",
      "Listez les signes d'une fausse proposition d'emploi qui demande de l'argent.",
    ],
    goal: "Organiser son travail, gérer son argent et préparer son évolution professionnelle.",
    video: "Gérer son budget et construire sa carrière professionnelle",
  }),
];

export const quizzesB = [
  quiz(7, "Quiz 7 — Garde d'enfants", "Sécurité et soins", [
    ["Peut-on laisser un jeune enfant seul près de l'eau ?", "Jamais", "Oui, un instant", "Oui, s'il sait nager"],
    ["Où ranger les produits d'entretien et les médicaments ?", "Hors de portée des enfants", "Sur la table", "Dans le jouet"],
    ["Comment faut-il coucher un bébé pour dormir ?", "Sur le dos, sur une surface ferme", "Sur le ventre avec un coussin", "Sur le canapé"],
    ["Peut-on donner un médicament à un enfant de sa propre initiative ?", "Non, seulement sur consigne des parents ou du médecin", "Oui, si l'enfant pleure", "Oui, si on a un peu de fièvre"],
    ["Que faire si l'enfant a de la fièvre ?", "Prévenir immédiatement les parents", "Ne rien dire", "L'enfermer dans sa chambre"],
    ["Comment réagir quand un enfant fait une bêtise ?", "Expliquer calmement sans crier ni frapper", "Le frapper", "Le menacer"],
    ["Que faire avant de donner à manger ou de préparer un biberon ?", "Se laver les mains", "Rien", "Goûter avec le doigt"],
    ["Que faut-il toujours avoir sous la main ?", "Les numéros d'urgence et des parents", "Rien", "Le catalogue de jouets"],
    ["Que faut-il respecter ?", "Le rythme de l'enfant : repas, sieste, jeux", "Aucun horaire", "Seulement ses propres envies"],
    ["Que faire des consignes sur les écrans ?", "Les respecter", "Les ignorer", "Faire l'inverse"],
  ]),
  quiz(8, "Quiz 8 — Premiers secours", "Réflexes et gestes simples", [
    ["Quels sont les trois premiers réflexes ?", "Protéger, alerter, secourir", "Courir, crier, fuir", "Attendre, regarder, partir"],
    ["Que faire pour une brûlure ?", "Refroidir à l'eau courante fraîche 10 à 20 minutes", "Appliquer de l'huile", "Mettre du dentifrice"],
    ["Que faire pour un saignement important ?", "Appuyer fermement avec un linge propre et appeler les secours", "Laver à l'alcool et attendre", "Ne rien faire"],
    ["Que faire si quelqu'un a avalé un produit dangereux ?", "Ne pas faire vomir, garder l'emballage et appeler un médecin", "Le faire vomir", "Lui donner à manger"],
    ["Que faire pour un malaise avec évanouissement ?", "Allonger la personne et surélever ses jambes", "La secouer", "La faire boire"],
    ["Pour un saignement de nez, que faire ?", "Pencher la tête légèrement en avant et pincer le nez", "Pencher la tête en arrière", "Introduire du coton profondément"],
    ["Que faire en cas de convulsions ?", "Protéger la tête et appeler les secours, sans rien mettre dans la bouche", "Mettre un objet dans la bouche", "Verser de l'eau"],
    ["Qu'affiche-t-on dans la maison ?", "Les numéros d'urgence", "Rien", "Un emploi du temps de sport"],
    ["Qu'est-ce qu'une formation de secourisme ?", "Un cours certifié qui apprend les gestes avec un instructeur", "Un jeu", "Une application de musique"],
    ["Que fait-on avec une petite coupure ?", "La laver à l'eau et au savon, puis la couvrir", "La laisser ouverte", "La frotter avec du sable"],
  ]),
  quiz(9, "Quiz 9 — Sécurité du foyer", "Accès, visiteurs, incendie", [
    ["Que faire des clés ?", "Ne jamais les prêter ni les laisser à la vue", "Les donner aux amis", "Les laisser sur la porte"],
    ["Que faire si un inconnu sonne ?", "Demander son nom et son motif, vérifier avec l'employeur", "Lui ouvrir tout de suite", "Lui donner les clés"],
    ["Que dire par téléphone aux inconnus sur la famille ?", "Aucune information personnelle", "Les horaires de la famille", "L'adresse et l'argent"],
    ["Peut-on laisser une bougie sans surveillance ?", "Non", "Oui", "Oui, si elle est petite"],
    ["Que faire en cas d'incendie ?", "Faire sortir tout le monde et appeler les secours", "Chercher d'abord ses affaires", "Rester pour éteindre seul"],
    ["Qu'est-ce que le rôle du gardien ?", "Rondes, contrôle des accès, cahier de sortie et entrée", "Dormir", "Inviter des amis"],
    ["Que ne faut-il jamais faire au volant ?", "Conduire fatigué ou après avoir bu de l'alcool", "Respecter le code", "Vérifier les pneus"],
    ["Que faire de produits de jardin ?", "Les ranger loin des enfants", "Les laisser dehors", "Les mélanger"],
    ["Que faire avec une multiprise surchargée ?", "L'éviter", "En ajouter", "La couvrir"],
    ["Que faire en cas de comportement suspect ?", "Prévenir l'employeur", "Ne rien dire", "Quitter la maison sans prévenir"],
  ]),
  quiz(10, "Quiz 10 — Communication", "Écoute, compte rendu, vie privée", [
    ["Que faire après une consigne ?", "Reformuler pour vérifier qu'on a compris", "Faire semblant d'avoir compris", "Ne rien dire"],
    ["Que rendre à l'employeur après des courses ?", "Un compte rendu précis avec les reçus", "Rien", "Seulement le reste d'argent"],
    ["Peut-on prendre des photos dans la maison pour les réseaux ?", "Non, sans accord", "Oui", "Seulement la cuisine"],
    ["Que faire des affaires de la famille ?", "Ne pas fouiller", "Les ouvrir", "Les emprunter"],
    ["Quand parler d'un désaccord ?", "Calmement, au bon moment, pas devant les enfants", "En criant", "Devant les visiteurs"],
    ["Que dire d'un problème de la famille aux voisins ?", "Rien : c'est confidentiel", "Tout", "Seulement le soir"],
    ["Que faire en cas de violence ou de harcèlement ?", "Ne pas rester seul(e) et chercher de l'aide", "Se taire", "Répondre par la violence"],
    ["Que faire si vous ne comprenez pas la langue ?", "Demander de répéter ou d'expliquer autrement", "Deviner", "Ignorer"],
    ["Que signaler sans attendre ?", "Les problèmes avec des faits précis", "Rien", "Seulement les bonnes nouvelles"],
    ["Que noter ?", "Les consignes importantes", "Rien", "Les secrets de la famille"],
  ]),
  quiz(11, "Quiz 11 — Droits et devoirs", "Contrat, salaire, protection", [
    ["Pourquoi un contrat écrit ?", "Il protège les deux parties", "Il n'a aucune utilité", "Il rend le travail impossible"],
    ["Que faire avant de signer ?", "Le lire en entier et poser des questions", "Signer sans lire", "Signer à la place d'un autre"],
    ["Que garder ?", "Une copie du contrat et les reçus", "Rien", "Le contrat seulement chez l'employeur"],
    ["Quand le salaire doit-il être payé ?", "À la date convenue", "Quand l'employeur veut", "Jamais"],
    ["Peut-on vous confisquer vos papiers d'identité ?", "Non, jamais", "Oui, par sécurité", "Oui, pendant le contrat"],
    ["Peut-on vous frapper ou vous humilier ?", "Non, c'est interdit", "Oui, si vous vous trompez", "Oui, une fois"],
    ["Que faire en cas d'absence ?", "Prévenir à l'avance", "Ne rien dire", "Venir quand on veut"],
    ["Que faire en cas de doute sur ses droits ?", "S'informer auprès de l'inspection du travail ou de BM Domestica", "Se taire", "Demander aux inconnus"],
    ["Quel est un devoir du personnel ?", "Respecter la confidentialité et les consignes de sécurité", "Prendre ce qui est utile", "Partager les secrets"],
    ["Que doivent contenir les conditions convenues ?", "Horaires, repos, congés, heures supplémentaires", "Rien", "Un secret"],
  ]),
  quiz(12, "Quiz 12 — Carrière et organisation", "Temps, argent, formation", [
    ["Par quoi commencer sa journée ?", "Par les tâches prioritaires", "Par les plus faciles seulement", "Par les pauses"],
    ["Que faire d'une petite somme chaque mois ?", "En mettre de côté", "La dépenser aussitôt", "La prêter à des inconnus"],
    ["Que faire si on demande de l'argent pour vous trouver un emploi sans reçu ?", "Refuser : c'est un risque d'arnaque", "Payer vite", "Payer tout"],
    ["Que fait un CV ?", "Présenter ses expériences, formations et références", "Cacher ses compétences", "Remplacer le contrat"],
    ["Pourquoi garder ses attestations ?", "Pour prouver ses compétences", "Pour les jeter", "Pour les prêter"],
    ["Que demander à un ancien employeur satisfait ?", "Une lettre de recommandation", "Un prêt", "Ses clés"],
    ["Que faire de son code secret mobile money ?", "Ne le donner à personne", "Le dire à un ami", "L'afficher"],
    ["Comment progresser dans le métier ?", "En se formant et en étant sérieux", "En s'absentant", "En changeant sans cesse sans raison"],
    ["Que faut-il prévoir dans un planning ?", "Du temps pour les imprévus et les pauses", "Aucune pause", "Aucune tâche"],
    ["Quel objectif se fixer ?", "Un meilleur poste ou une spécialisation à deux ans", "Aucun objectif", "Rester sans évoluer"],
  ]),
];

export const final1 = finalQuiz(
  "Quiz final — Formation du personnel domestique",
  "Métier, hygiène, entretien, cuisine, enfants, sécurité, droits",
  [
    ["Quelle qualité est essentielle dans ce métier ?", "L'honnêteté et la ponctualité", "L'inattention", "Le retard"],
    ["Combien de temps se laver les mains ?", "Au moins 20 secondes avec du savon", "2 secondes", "Pas besoin"],
    ["Que ne faut-il jamais mélanger ?", "Les produits d'entretien, surtout l'eau de Javel avec un autre produit", "Le riz et l'eau", "Les chiffons propres"],
    ["Dans quel sens nettoie-t-on une pièce ?", "Du haut vers le bas", "Du bas vers le haut", "Au hasard"],
    ["Que faire avant de ranger le linge ?", "Vérifier qu'il est bien sec", "Le ranger mouillé", "Le plier en boule"],
    ["Que faire d'un fer à repasser allumé ?", "Ne jamais le laisser sans surveillance", "L'oublier", "Le laisser sur le tissu"],
    ["Combien de temps un plat cuit peut-il rester à température ambiante ?", "Pas plus de deux heures, moins s'il fait très chaud", "Toute la nuit", "Une semaine"],
    ["Que faire de l'huile qui prend feu ?", "Couvrir avec un couvercle, jamais d'eau", "Jeter de l'eau", "Souffler dessus"],
    ["Que contient un repas équilibré ?", "Féculent, légumes ou fruits et protéines", "Seulement du sucre", "Seulement de la viande"],
    ["Peut-on laisser un jeune enfant seul près d'un escalier ?", "Jamais", "Oui", "Oui, un moment"],
    ["Que faire d'un enfant qui a de la fièvre ?", "Prévenir immédiatement les parents", "Ne rien dire", "Donner un médicament sans consigne"],
    ["Que faire pour une brûlure ?", "Refroidir à l'eau courante fraîche 10 à 20 minutes", "Appliquer de l'huile", "Percer les cloques"],
    ["Quels sont les trois premiers réflexes en cas d'accident ?", "Protéger, alerter, secourir", "Fuir, crier, attendre", "Attendre, regarder, rire"],
    ["Que faire si un inconnu sonne ?", "Demander son nom et vérifier avec l'employeur", "Ouvrir sans question", "Lui donner les clés"],
    ["Que faire d'un désaccord ?", "En parler calmement au bon moment", "Crier", "Partir sans prévenir"],
    ["Pourquoi un contrat écrit ?", "Il protège les deux parties", "Il n'a aucune utilité", "Il est interdit"],
    ["Peut-on vous confisquer vos papiers ?", "Non, jamais", "Oui", "Oui, pendant le contrat"],
    ["Que faire d'une proposition d'emploi qui demande de l'argent sans reçu ?", "Refuser : c'est un risque d'arnaque", "Payer", "Payer double"],
    ["Que faire de son code secret mobile money ?", "Ne le donner à personne", "Le dire à un ami", "L'afficher"],
    ["Que doit faire le personnel domestique chaque jour ?", "Travailler avec soin, honnêteté et respect", "Faire le minimum", "Ignorer les consignes"],
  ]
);
