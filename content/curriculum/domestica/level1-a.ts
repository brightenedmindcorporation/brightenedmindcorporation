import { lesson, quiz } from "../bureautique/builders";

// BM Domestica · Formation du personnel domestique — leçons 1 à 6 : le métier, l'hygiène, l'entretien, le linge, la cuisine.
// Les conseils de santé et de sécurité sont des règles de base : ils ne remplacent pas une formation certifiée (premiers secours, cuisine professionnelle).

export const lessonsA = [
  lesson({
    id: 1,
    title: "Le métier de personnel domestique",
    subtitle: "Un vrai métier : respect, ponctualité, discrétion et sens du service.",
    sections: [
      {
        heading: "Un métier à part entière",
        body: [
          "Le personnel domestique prend soin d'un foyer : la maison, le linge, les repas, les enfants, la sécurité.",
          "C'est un métier de confiance : on vous ouvre sa maison et on vous confie ce qui compte le plus.",
          "Un travail bien fait, régulier et honnête construit votre réputation et ouvre de meilleurs postes.",
          "Chaque métier (aide ménagère, nounou, cuisinier, chauffeur, gardien, jardinier) a ses missions précises.",
        ],
      },
      {
        heading: "Les qualités attendues",
        body: [
          "La ponctualité : arriver à l'heure et prévenir si vous avez un empêchement.",
          "L'honnêteté : ne prendre jamais rien qui ne vous appartient pas, dire la vérité sur une erreur ou une casse.",
          "La discrétion : ne pas répéter ce que vous voyez ou entendez dans la maison.",
          "Le respect : saluer, parler poliment, respecter les habitudes et les biens de la famille.",
        ],
      },
      {
        heading: "La présentation",
        body: [
          "Une tenue propre et adaptée à la tâche ; des ongles courts et propres ; des cheveux attachés si vous cuisinez.",
          "Une bonne hygiène personnelle : douche, vêtements lavés, mains propres.",
          "Un téléphone silencieux pendant le travail, sauf urgence.",
          "Un sourire et une attitude calme valent mieux que de grandes paroles.",
        ],
      },
      {
        heading: "Travailler avec méthode",
        body: [
          "Demandez les consignes au début : horaires, tâches, règles de la maison, personnes à contacter.",
          "Faites une liste de ce qu'il faut faire chaque jour et chaque semaine.",
          "Posez des questions quand vous ne savez pas : mieux vaut demander que mal faire.",
          "Signalez tout problème (panne, produit manquant, accident) sans attendre.",
        ],
      },
    ],
    caseTitle: "Le premier jour de Rose",
    caseLines: [
      "Rose arrive vingt minutes avant l'heure chez sa nouvelle employeuse, Mme Kasongo, dans une tenue propre.",
      "Elle demande la liste des tâches, les horaires et où se trouvent les produits.",
      "En fin de matinée, elle casse un verre : elle le signale tout de suite, avec ses excuses.",
      "Mme Kasongo apprécie son honnêteté et lui confie davantage de responsabilités.",
    ],
    tasks: [
      "Citez quatre qualités du bon personnel domestique et donnez un exemple pour chacune.",
      "Écrivez la liste des questions à poser à un employeur le premier jour.",
      "Décrivez comment vous réagiriez après avoir cassé un objet de valeur.",
      "Préparez une liste de tâches quotidiennes pour une maison de trois pièces.",
    ],
    goal: "Expliquer les qualités attendues du personnel domestique et préparer son premier jour de travail.",
    video: "Le métier d'employé de maison : qualités et savoir-être",
  }),
  lesson({
    id: 2,
    title: "L'hygiène personnelle et celle du foyer",
    subtitle: "Se laver les mains, utiliser les produits en sécurité.",
    sections: [
      {
        heading: "L'hygiène des mains",
        body: [
          "Lavez-vous les mains avec de l'eau et du savon pendant au moins 20 secondes : paumes, dos des mains, doigts, ongles, poignets.",
          "Faites-le avant de préparer à manger, avant de servir, après les toilettes, après avoir touché les déchets, après avoir changé un enfant.",
          "Séchez avec un linge propre ou du papier : des mains mouillées gardent les microbes.",
          "Les mains coupées ou blessées se protègent avec un pansement propre et, si besoin, un gant.",
        ],
      },
      {
        heading: "Les produits d'entretien",
        body: [
          "Lisez toujours l'étiquette et suivez le mode d'emploi du produit.",
          "Ne mélangez JAMAIS des produits entre eux, surtout l'eau de Javel avec un autre produit (ammoniaque, vinaigre, détartrant) : les gaz sont dangereux pour la santé.",
          "Gardez les produits dans leur bouteille d'origine, bien fermés, hors de portée des enfants et loin de la nourriture.",
          "Aérez la pièce en travaillant et utilisez des gants.",
        ],
      },
      {
        heading: "Nettoyer et désinfecter",
        body: [
          "Nettoyer enlève la saleté (eau, savon, brosse) ; désinfecter détruit les microbes (produit désinfectant, bien suivre le temps d'action).",
          "Nettoyez avant de désinfecter : un désinfectant agit mal sur une surface sale.",
          "Les endroits les plus touchés (poignées, interrupteurs, robinets, toilettes) demandent plus d'attention.",
          "Utilisez des chiffons différents pour la cuisine, la salle de bain et les toilettes.",
        ],
      },
      {
        heading: "Les déchets et les nuisibles",
        body: [
          "Videz les poubelles tous les jours et lavez-les régulièrement ; fermez-les bien.",
          "Ne laissez pas de nourriture ou d'eau stagnante : cela attire insectes et rongeurs.",
          "Gardez les aliments fermés et rangés.",
          "Signalez toute présence de nuisibles à votre employeur.",
        ],
      },
    ],
    caseTitle: "Un mélange dangereux",
    caseLines: [
      "Pour nettoyer les toilettes plus vite, Sarah veut mélanger de l'eau de Javel et un autre produit trouvé sous l'évier.",
      "Elle se souvient de sa formation : on ne mélange jamais les produits, et elle ouvre la fenêtre.",
      "Elle utilise un seul produit à la fois, avec des gants, en rinçant bien entre deux.",
      "Elle range ensuite les bouteilles à leur place, hors de portée des enfants.",
    ],
    tasks: [
      "Entraînez-vous au lavage des mains en comptant 20 secondes.",
      "Listez trois moments où il faut absolument se laver les mains.",
      "Expliquez pourquoi on ne mélange jamais des produits d'entretien.",
      "Préparez un plan de rangement sûr des produits d'une maison avec des enfants.",
    ],
    goal: "Appliquer les règles d'hygiène des mains et utiliser les produits d'entretien sans danger.",
    video: "Hygiène des mains et sécurité des produits ménagers",
  }),
  lesson({
    id: 3,
    title: "L'entretien de la maison",
    subtitle: "Organiser le travail, nettoyer chaque pièce avec méthode.",
    sections: [
      {
        heading: "Organiser son travail",
        body: [
          "Travaillez du haut vers le bas (poussière, puis sols) et du plus propre vers le plus sale.",
          "Commencez par ouvrir les fenêtres et rassembler le matériel avant de vous mettre au travail.",
          "Faites un planning : tâches quotidiennes (lits, vaisselle, sols) et tâches hebdomadaires (vitres, grands nettoyages).",
          "Gardez votre matériel propre : balai, serpillière, éponge, seaux.",
        ],
      },
      {
        heading: "Le salon et les chambres",
        body: [
          "Dépoussiérez avec un chiffon humide ou légèrement humidifié.",
          "Aspirez ou balayez, puis lavez le sol selon sa nature (carrelage, bois, ciment).",
          "Faites les lits : draps tirés, oreillers rangés ; changez les draps régulièrement.",
          "Rangez sans déplacer les objets personnels sans accord.",
        ],
      },
      {
        heading: "La cuisine et la salle de bain",
        body: [
          "Cuisine : lavez la vaisselle, nettoyez les plans de travail, la cuisinière, l'évier, videz la poubelle.",
          "Salle de bain et toilettes : nettoyez lavabo, douche, baignoire, toilettes avec des chiffons dédiés.",
          "Séchez les surfaces pour éviter moisissures et glissades.",
          "Réapprovisionnez le papier, le savon et les serviettes.",
        ],
      },
      {
        heading: "Les sols, les vitres et la sécurité",
        body: [
          "Les sols mouillés glissent : mettez un panneau ou séchez, surtout s'il y a des enfants ou des personnes âgées.",
          "Les vitres se nettoient avec un produit adapté et un chiffon propre, de haut en bas.",
          "Ne montez jamais sur une chaise instable : utilisez un escabeau solide.",
          "Signalez ce qui est cassé ou dangereux (prise abîmée, marche cassée).",
        ],
      },
    ],
    caseTitle: "La maison en ordre",
    caseLines: [
      "Chaque matin, Rose ouvre les fenêtres, fait les lits puis dépoussière les meubles avant de laver les sols.",
      "Elle prépare une liste hebdomadaire : lundi les vitres, mercredi la salle de bain, vendredi les placards.",
      "Un jour, elle laisse un sol humide dans le couloir : un enfant glisse sans gravité, elle apprend à le sécher et à prévenir.",
      "Sa maison est toujours propre et sans mauvaise surprise.",
    ],
    tasks: [
      "Rédigez un planning hebdomadaire d'entretien pour une maison de quatre pièces.",
      "Expliquez dans quel ordre nettoyer une chambre.",
      "Listez les produits et le matériel nécessaires pour une salle de bain.",
      "Citez trois dangers d'un sol mouillé et la façon de les éviter.",
    ],
    goal: "Organiser et réaliser l'entretien complet d'une maison, en suivant un ordre logique et en sécurité.",
    video: "Comment nettoyer une maison : méthode et organisation",
  }),
  lesson({
    id: 4,
    title: "Le linge : laver, repasser, ranger",
    subtitle: "Prendre soin des vêtements et du linge de maison.",
    sections: [
      {
        heading: "Trier et laver",
        body: [
          "Triez le linge : blanc, couleurs claires, couleurs foncées, délicat ; séparez les très sales.",
          "Lisez les étiquettes d'entretien (température, séchage, repassage).",
          "Vérifiez les poches et traitez les taches avant le lavage.",
          "Ne surchargez pas la machine ou le seau : le linge se rince mal et reste sale.",
        ],
      },
      {
        heading: "Sécher",
        body: [
          "Étendez à l'ombre les couleurs et les tissus délicats, au soleil le linge blanc et les draps.",
          "Secouez chaque pièce avant de l'étendre pour limiter les plis.",
          "Le linge doit être bien sec avant d'être rangé : l'humidité donne de l'odeur et des moisissures.",
          "Ramassez le linge avant la pluie ou la nuit.",
        ],
      },
      {
        heading: "Repasser",
        body: [
          "Réglez le fer selon le tissu (coton plus chaud, synthétique et soie plus doux).",
          "Repassez du plus délicat au plus résistant ; commencez par les petites zones (col, poignets).",
          "Ne laissez jamais le fer allumé sans surveillance ; posez-le sur son support, le cordon à l'écart.",
          "Débranchez le fer après usage et attendez qu'il refroidisse.",
        ],
      },
      {
        heading: "Plier et ranger",
        body: [
          "Pliez avec soin : chemises, pantalons, serviettes, draps.",
          "Rangez par type et par personne, avec le linge propre au-dessus ou à gauche selon la maison.",
          "Un linge bien rangé se retrouve vite et reste en bon état.",
          "Signalez les vêtements abîmés (boutons, ourlets) avant de les ranger.",
        ],
      },
    ],
    caseTitle: "Les chemises de M. Kasongo",
    caseLines: [
      "Pour la première fois, Rose lave les chemises blanches et les pantalons de couleur de M. Kasongo.",
      "Elle les sépare, lit les étiquettes et traite une tache de stylo avant de laver.",
      "Elle les repasse avec un fer réglé sur la bonne température et les range sur des cintres.",
      "M. Kasongo la félicite : ses chemises n'ont jamais été aussi propres.",
    ],
    tasks: [
      "Triez une pile de linge en quatre groupes et justifiez votre tri.",
      "Expliquez comment traiter une tache avant le lavage.",
      "Décrivez les règles de sécurité à respecter avec un fer à repasser.",
      "Montrez comment plier une chemise et un drap-housse.",
    ],
    goal: "Laver, sécher, repasser et ranger le linge en préservant les vêtements.",
    video: "Laver, repasser et plier le linge : les bases",
  }),
  lesson({
    id: 5,
    title: "La cuisine : hygiène et règles de base",
    subtitle: "Cuisiner en sécurité pour éviter les intoxications.",
    sections: [
      {
        heading: "Préparer en propre",
        body: [
          "Lavez-vous les mains et attachez vos cheveux avant de cuisiner.",
          "Lavez les fruits et légumes à l'eau potable.",
          "Utilisez des planches et des couteaux séparés pour la viande crue et pour les aliments prêts à manger.",
          "Nettoyez le plan de travail avant et après avoir préparé de la viande ou du poisson.",
        ],
      },
      {
        heading: "Cuire et conserver",
        body: [
          "Faites bien cuire la viande, la volaille, le poisson et les œufs : pas de partie rosée ou liquide dans une volaille.",
          "Réfrigérez rapidement les restes ; ne laissez pas un plat cuit plus de deux heures à température ambiante, moins en cas de forte chaleur.",
          "Réchauffez les restes jusqu'à ce qu'ils soient très chauds à cœur, une seule fois.",
          "Ne recongelez pas un aliment décongelé.",
        ],
      },
      {
        heading: "Ranger et vérifier",
        body: [
          "Respectez les dates limites et l'ordre : premier entré, premier sorti.",
          "Rangez la viande crue en bas du réfrigérateur, bien fermée.",
          "Jetez ce qui sent mauvais, a changé d'aspect ou est moisi.",
          "Gardez le réfrigérateur propre et à bonne température.",
        ],
      },
      {
        heading: "Sécurité en cuisine et allergies",
        body: [
          "Tournez les manches des casseroles vers l'intérieur ; éloignez les enfants des feux.",
          "Ne laissez jamais une friture sans surveillance : si l'huile prend feu, couvrez avec un couvercle, ne jetez jamais d'eau.",
          "Demandez si quelqu'un de la famille est allergique à certains aliments (arachide, œuf, poisson…) et lisez les étiquettes.",
          "Fermez le gaz ou l'électricité après usage.",
        ],
      },
    ],
    caseTitle: "Le repas de dimanche",
    caseLines: [
      "Rose prépare un poulet et du riz pour la famille : elle lave ses mains, utilise une planche pour la viande et une autre pour les légumes.",
      "Elle vérifie que le poulet est cuit à cœur, sans trace rosée.",
      "Elle range les restes au réfrigérateur dans l'heure qui suit le repas.",
      "Le lendemain, elle les réchauffe à fond avant de les servir.",
    ],
    tasks: [
      "Listez cinq règles d'hygiène à respecter avant de cuisiner.",
      "Expliquez comment éviter de contaminer des légumes avec de la viande crue.",
      "Décrivez comment ranger un réfrigérateur de façon sûre.",
      "Dites quoi faire si l'huile d'une friture prend feu.",
    ],
    goal: "Préparer, cuire et conserver les aliments en appliquant les règles d'hygiène et de sécurité.",
    video: "Hygiène alimentaire en cuisine : règles de base",
  }),
  lesson({
    id: 6,
    title: "Préparer des repas simples et équilibrés",
    subtitle: "Planifier, acheter malin et éviter le gaspillage.",
    sections: [
      {
        heading: "Un repas équilibré",
        body: [
          "Un repas varié contient un féculent (riz, manioc, pain, pomme de terre), des légumes ou des fruits, et une source de protéines (viande, poisson, œufs, haricots).",
          "Variez les aliments et les couleurs au fil de la semaine.",
          "Adaptez les repas aux besoins de la famille : enfants, personnes âgées, régimes particuliers demandés par un médecin.",
          "Buvez et faites boire suffisamment d'eau propre.",
        ],
      },
      {
        heading: "Planifier et acheter",
        body: [
          "Demandez les habitudes et les goûts de la famille et notez les repas de la semaine.",
          "Faites une liste de courses avant d'aller au marché pour ne rien oublier.",
          "Choisissez des produits frais, de saison et de bonne qualité ; comparez les prix.",
          "Gardez les tickets ou notez les dépenses et rendez compte avec exactitude de l'argent confié.",
        ],
      },
      {
        heading: "Cuisiner simple et bon",
        body: [
          "Apprenez quelques recettes de base : riz, sauces, soupe, légumes, œufs, poisson, viande.",
          "Goûtez et assaisonnez avec modération ; demandez les préférences de sel et de piment.",
          "Préparez à l'avance ce qui peut l'être (légumes lavés, haricots trempés).",
          "Servez les plats chauds chauds, avec une présentation soignée.",
        ],
      },
      {
        heading: "Limiter le gaspillage",
        body: [
          "Utilisez les restes dans de nouvelles recettes, après les avoir conservés correctement.",
          "Ne préparez pas trop : estimez les quantités selon le nombre de personnes.",
          "Rangez les aliments pour qu'ils ne s'abîment pas.",
          "Remplacez les produits chers par des alternatives de saison.",
        ],
      },
    ],
    caseTitle: "La semaine de Rose",
    caseLines: [
      "Chaque dimanche, Rose note avec Mme Kasongo les repas de la semaine et dresse la liste des courses.",
      "Au marché, elle compare les prix et choisit des légumes frais de saison.",
      "Elle garde les reçus et remet le reste de l'argent avec un petit cahier de comptes.",
      "Mme Kasongo lui fait confiance et lui confie les courses de la maison.",
    ],
    tasks: [
      "Composez un menu équilibré de cinq jours pour une famille de quatre personnes.",
      "Dressez la liste de courses correspondante avec les quantités.",
      "Tenez un petit cahier de comptes pour une journée de courses fictive.",
      "Proposez deux recettes pour utiliser des restes de riz et de poisson.",
    ],
    goal: "Composer des repas équilibrés, faire les courses avec une liste et limiter le gaspillage.",
    video: "Cuisine pour débutants : repas équilibrés et courses",
  }),
];

export const quizzesA = [
  quiz(1, "Quiz 1 — Le métier", "Qualités et savoir-être", [
    ["Qu'est-ce que le métier de personnel domestique ?", "Prendre soin d'un foyer avec confiance et professionnalisme", "Un métier sans règles", "Un passe-temps"],
    ["Que veut dire ponctualité ?", "Arriver à l'heure et prévenir en cas d'empêchement", "Arriver quand on peut", "Ne jamais prévenir"],
    ["Que faire si vous cassez un objet ?", "Le signaler tout de suite, honnêtement", "Le cacher", "Accuser quelqu'un d'autre"],
    ["Que signifie la discrétion ?", "Ne pas répéter ce qu'on voit et entend dans la maison", "Parler de la famille avec les voisins", "Poster des photos de la maison"],
    ["Que demander au premier jour ?", "Les horaires, les tâches et les règles de la maison", "Rien du tout", "Le salaire des autres employés"],
    ["Que faire si vous ne savez pas faire une tâche ?", "Poser une question", "L'ignorer", "Faire au hasard"],
    ["Que faire d'un téléphone pendant le travail ?", "Le garder silencieux, sauf urgence", "Passer de longs appels", "Le laisser sonner fort"],
    ["Pourquoi l'honnêteté est-elle importante ?", "Elle construit la confiance et la réputation", "Elle n'a pas d'importance", "Elle fait perdre du temps"],
    ["Que faire d'un problème (panne, accident) ?", "Le signaler sans attendre", "Attendre une semaine", "Le cacher"],
    ["Que montre une tenue propre et adaptée ?", "Le sérieux et le respect", "Rien", "Un manque de confiance"],
  ]),
  quiz(2, "Quiz 2 — Hygiène", "Mains et produits d'entretien", [
    ["Combien de temps se laver les mains au minimum ?", "Au moins 20 secondes avec du savon", "2 secondes", "Pas besoin de savon"],
    ["Quand se laver les mains ?", "Avant de cuisiner et après les toilettes", "Seulement le soir", "Jamais"],
    ["Que ne faut-il jamais faire avec des produits d'entretien ?", "Les mélanger, surtout avec l'eau de Javel", "Les lire", "Les ranger"],
    ["Où ranger les produits d'entretien ?", "Dans leur bouteille d'origine, hors de portée des enfants", "Dans une bouteille d'eau", "Près de la nourriture"],
    ["Quelle différence entre nettoyer et désinfecter ?", "Nettoyer enlève la saleté, désinfecter détruit les microbes", "Aucune", "Désinfecter enlève la saleté seulement"],
    ["Que faire avant de désinfecter ?", "Nettoyer la surface", "Rien", "Mélanger les produits"],
    ["Pourquoi utiliser des chiffons différents ?", "Pour ne pas transporter les microbes d'une zone à l'autre", "Pour en avoir plus", "Pour gaspiller"],
    ["À quelle fréquence vider les poubelles ?", "Tous les jours", "Une fois par mois", "Jamais"],
    ["Que faire d'une blessure à la main avant de cuisiner ?", "La protéger avec un pansement propre et un gant", "L'ignorer", "Cuisiner sans protéger la blessure"],
    ["Pourquoi aérer en nettoyant ?", "Pour évacuer les vapeurs des produits", "Pour refroidir la maison", "Pour sécher plus lentement"],
  ]),
  quiz(3, "Quiz 3 — Entretien de la maison", "Ordre et sécurité", [
    ["Dans quel sens travaille-t-on ?", "Du haut vers le bas", "Du bas vers le haut", "Au hasard"],
    ["Que faire avant de commencer ?", "Ouvrir les fenêtres et rassembler le matériel", "Éteindre toutes les lumières", "Ranger les produits"],
    ["Que faire des tâches ?", "Les organiser en planning quotidien et hebdomadaire", "Les improviser", "Ne jamais les noter"],
    ["Que risque-t-on avec un sol mouillé ?", "Glisser", "Rien", "Voir mieux"],
    ["Avec quoi monter pour nettoyer en hauteur ?", "Un escabeau solide", "Une chaise instable", "Une table cassée"],
    ["Que faire avec les objets personnels des habitants ?", "Ne pas les déplacer sans accord", "Les jeter", "Les prendre"],
    ["Quels chiffons pour toilettes et cuisine ?", "Des chiffons séparés", "Le même chiffon", "Aucun chiffon"],
    ["Que faire d'une prise abîmée ?", "La signaler à l'employeur", "La réparer soi-même sans compétence", "L'ignorer"],
    ["Que faire pour éviter la moisissure en salle de bain ?", "Sécher les surfaces et aérer", "Laisser humide", "Fermer les fenêtres"],
    ["Comment se nettoient les vitres ?", "Avec un produit adapté et un chiffon propre, de haut en bas", "Avec de l'huile", "Avec un sac poussiéreux"],
  ]),
  quiz(4, "Quiz 4 — Le linge", "Tri, séchage, repassage", [
    ["Pourquoi trier le linge ?", "Pour éviter les décolorations et adapter le lavage", "Pour perdre du temps", "Pour salir plus"],
    ["Où lire les consignes de lavage ?", "Sur l'étiquette du vêtement", "Sur le fer", "Sur le savon"],
    ["Que faire avant le lavage d'une tache ?", "La traiter", "L'ignorer", "La repasser"],
    ["Où faire sécher les couleurs ?", "À l'ombre", "En plein soleil toute la journée", "Dans l'eau"],
    ["Que faut-il vérifier avant de ranger ?", "Que le linge est bien sec", "Qu'il est mouillé", "Qu'il est plié en boule"],
    ["Que faire d'un fer à repasser allumé ?", "Ne jamais le laisser sans surveillance", "Le laisser dans le lit", "Le poser sur le tissu"],
    ["Quel tissu demande une température plus douce ?", "Les synthétiques et la soie", "Le coton épais", "Le jean"],
    ["Que faire après usage du fer ?", "Le débrancher et le laisser refroidir", "Le ranger chaud", "Le mouiller"],
    ["Pourquoi ne pas surcharger la machine ou le seau ?", "Le linge se rince mal", "Le linge se lave mieux", "Cela économise l'eau"],
    ["Que faire des vêtements abîmés ?", "Les signaler avant de les ranger", "Les jeter", "Les cacher"],
  ]),
  quiz(5, "Quiz 5 — Hygiène alimentaire", "Cuire, conserver, sécurité", [
    ["Que faire avant de cuisiner ?", "Se laver les mains et attacher les cheveux", "Rien", "Goûter avec les doigts"],
    ["Pourquoi séparer planches et couteaux ?", "Pour ne pas contaminer les aliments prêts à manger", "Pour avoir plus de vaisselle", "Pour aller plus vite"],
    ["Que vérifier pour une volaille ?", "Qu'elle est cuite à cœur, sans partie rosée", "Qu'elle est brûlée dehors", "Qu'elle est froide"],
    ["Combien de temps laisser un plat cuit à température ambiante ?", "Pas plus de deux heures, moins s'il fait très chaud", "Toute la journée", "Toute la nuit"],
    ["Peut-on recongeler un aliment décongelé ?", "Non", "Oui, toujours", "Oui, si c'est du poisson"],
    ["Où ranger la viande crue au réfrigérateur ?", "En bas, bien fermée", "En haut, à découvert", "Sur les fruits"],
    ["Que faire si l'huile d'une friture prend feu ?", "Couvrir avec un couvercle, jamais d'eau", "Jeter de l'eau", "Souffler dessus"],
    ["Comment placer les manches de casseroles ?", "Vers l'intérieur, hors de portée des enfants", "Vers l'extérieur", "Au-dessus du feu"],
    ["Que faire d'un aliment qui sent mauvais ?", "Le jeter", "Le servir quand même", "Le recouvrir de sauce"],
    ["Pourquoi demander les allergies ?", "Pour éviter de servir un aliment dangereux", "Pour changer de recette", "Pour cuisiner moins"],
  ]),
  quiz(6, "Quiz 6 — Repas équilibrés", "Menus, courses et gaspillage", [
    ["Que contient un repas équilibré ?", "Féculent, légumes ou fruits et protéines", "Seulement des sucreries", "Seulement du pain"],
    ["Que faire avant d'aller au marché ?", "Faire une liste de courses", "Rien", "Acheter au hasard"],
    ["Que faire de l'argent confié pour les courses ?", "En rendre compte avec exactitude", "Garder le reste sans le dire", "Le dépenser librement"],
    ["Que choisir pour les fruits et légumes ?", "Des produits frais et de saison", "Des produits abîmés", "Des produits très chers seulement"],
    ["Comment limiter le gaspillage ?", "Utiliser les restes conservés correctement", "Jeter les restes", "Cuisiner toujours trop"],
    ["Que faire pour un repas pour un enfant ou un malade ?", "Adapter aux besoins et aux consignes données", "Servir la même chose à tous sans réfléchir", "Ne rien demander"],
    ["Pourquoi goûter en cuisinant ?", "Pour ajuster l'assaisonnement", "Pour finir la casserole", "Pour perdre du temps"],
    ["Que boire en quantité suffisante ?", "De l'eau propre", "Seulement des boissons sucrées", "Rien"],
    ["Pourquoi planifier les repas de la semaine ?", "Pour mieux acheter et mieux organiser", "Pour dépenser plus", "Pour tout jeter"],
    ["Que faire avant de cuire des haricots secs ?", "Les faire tremper à l'avance", "Les manger crus", "Les jeter"],
  ]),
];
