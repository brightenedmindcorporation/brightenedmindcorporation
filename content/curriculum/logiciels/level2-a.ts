import { lesson, quiz } from "../bureautique/builders";

// Niveau 2 · Comptabilité informatisée avec Sage — leçons 1 à 6.
// Les écrans exacts varient selon la version de Sage ; les principes de saisie et les règles comptables restent les mêmes.

export const lessonsA2 = [
  lesson({
    id: 1,
    title: "Sage : découvrir et créer un dossier",
    subtitle: "Comprendre la structure d'un logiciel de comptabilité et ouvrir une société.",
    sections: [
      {
        heading: "À quoi sert Sage",
        body: [
          "Sage est un logiciel de comptabilité très utilisé par les PME : il enregistre les écritures et produit les états comptables.",
          "Les informations saisies une fois alimentent la balance, le grand livre, le bilan et le compte de résultat.",
          "Il existe plusieurs produits Sage : la comptabilité, la gestion commerciale, la paie, les immobilisations.",
          "L'aspect des écrans dépend de la version ; les menus se retrouvent d'une version à l'autre.",
        ],
      },
      {
        heading: "Le dossier et l'exercice",
        body: [
          "Un dossier (ou société) regroupe toutes les données comptables d'une entreprise.",
          "Un exercice comptable dure en général douze mois : on l'ouvre avec une date de début et une date de fin.",
          "Pour créer un dossier, on renseigne la raison sociale, l'adresse, les numéros d'identification et la monnaie.",
          "On choisit aussi le plan comptable : en RDC, le plan OHADA (SYSCOHADA).",
        ],
      },
      {
        heading: "Utilisateurs et sécurité",
        body: [
          "Chaque utilisateur a un identifiant et un mot de passe personnels.",
          "Les droits limitent ce que chacun peut faire : saisir, modifier, valider, clôturer.",
          "Gardez le mot de passe du responsable en lieu sûr et ne le partagez pas.",
          "Faites une sauvegarde du dossier avant toute opération importante.",
        ],
      },
      {
        heading: "Repérer l'interface",
        body: [
          "Un menu général donne accès aux fichiers de base, à la saisie, aux traitements et aux états.",
          "La barre d'outils offre les actions courantes : nouveau, enregistrer, imprimer, rechercher.",
          "Les listes se filtrent par compte, par journal, par période.",
          "L'aide intégrée explique chaque écran : consultez-la au début.",
        ],
      },
    ],
    caseTitle: "Ouvrir la comptabilité de la boutique",
    caseLines: [
      "Neema veut tenir la comptabilité de sa boutique avec Sage, car son comptable lui demande une balance chaque mois.",
      "Elle crée le dossier « Boutique Neema », renseigne l'adresse et choisit le plan comptable OHADA.",
      "Elle ouvre l'exercice du 1er janvier au 31 décembre et crée un utilisateur pour son comptable.",
      "Avant de commencer la saisie, elle fait une première sauvegarde du dossier.",
    ],
    tasks: [
      "Créez un dossier pour une société fictive avec un exercice de douze mois.",
      "Choisissez le plan comptable OHADA et notez ce que cela change.",
      "Créez un utilisateur avec des droits limités à la saisie.",
      "Effectuez une sauvegarde du dossier et notez son emplacement.",
    ],
    goal: "Créer un dossier comptable avec son exercice, son plan comptable et ses utilisateurs.",
    video: "Sage : prise en main et création d'un dossier",
  }),
  lesson({
    id: 2,
    title: "Sage : plan comptable, journaux et tiers",
    subtitle: "Paramétrer les comptes, les journaux et les comptes de tiers.",
    sections: [
      {
        heading: "Le plan comptable",
        body: [
          "Le plan comptable est la liste des comptes que l'entreprise peut utiliser, classés par numéro.",
          "Vous pouvez ajouter un compte propre à l'entreprise (par exemple un compte de banque précis), en respectant la classe et le début du numéro.",
          "Les comptes à trois chiffres sont des comptes principaux ; les comptes plus longs sont des subdivisions.",
          "Ne supprimez jamais un compte qui contient des écritures.",
        ],
      },
      {
        heading: "Les journaux",
        body: [
          "Chaque journal a un code et un type : achats (ACH), ventes (VTE), banque (BQ), caisse (CAI), opérations diverses (OD).",
          "Un compte de contrepartie est souvent associé au journal : le compte de banque pour le journal de banque, par exemple.",
          "Séparer les journaux facilite le contrôle et la recherche des pièces.",
          "Un journal par banque et un journal par caisse permettent de suivre chaque trésorerie.",
        ],
      },
      {
        heading: "Les comptes de tiers",
        body: [
          "Les clients (compte collectif 411) et les fournisseurs (compte collectif 401) ont chacun un compte auxiliaire.",
          "Le compte auxiliaire porte un code court : par exemple CLI-ECOLE pour un client, FOU-PAPIER pour un fournisseur.",
          "Chaque fiche contient les coordonnées, les conditions de règlement et le compte collectif de rattachement.",
          "Le total des comptes auxiliaires est égal au compte collectif.",
        ],
      },
      {
        heading: "Paramétrer la TVA",
        body: [
          "Les codes de taxe associent un taux (par exemple 16 %) et les comptes de TVA à utiliser.",
          "La TVA sur ventes se comptabilise dans un compte de TVA facturée, la TVA sur achats dans un compte de TVA récupérable.",
          "Choisissez le bon code taxe à chaque saisie pour que la déclaration de TVA soit juste.",
          "Une exonération se saisit avec un code taxe à zéro.",
        ],
      },
    ],
    caseTitle: "Paramétrer avant de saisir",
    caseLines: [
      "Avant de saisir, Neema vérifie le plan comptable et ajoute un compte de banque pour sa banque principale.",
      "Elle crée cinq journaux : achats, ventes, banque, caisse et opérations diverses.",
      "Elle crée les comptes auxiliaires de ses deux principaux clients et de son fournisseur de cahiers.",
      "Elle règle le code taxe à 16 % pour les ventes et les achats de marchandises.",
    ],
    tasks: [
      "Ajoutez deux comptes à votre plan comptable en respectant la classe.",
      "Créez les cinq journaux de base avec leur code et leur type.",
      "Créez trois comptes auxiliaires clients et deux fournisseurs.",
      "Paramétrez un code de TVA à 16 % et un code exonéré.",
    ],
    goal: "Paramétrer les comptes, les journaux, les tiers et la TVA d'un dossier comptable.",
    video: "Sage : plan comptable, journaux et comptes de tiers",
  }),
  lesson({
    id: 3,
    title: "Sage : saisir les achats et les ventes",
    subtitle: "Enregistrer les factures avec la TVA.",
    sections: [
      {
        heading: "La saisie d'une facture de vente",
        body: [
          "Choisissez le journal des ventes, la date et le numéro de la pièce.",
          "Débit du compte client pour le montant TTC ; crédit du compte de ventes pour le montant HT ; crédit de la TVA facturée.",
          "Exemple : vente de 500 000 FC HT, TVA 16 % : client 580 000 au débit ; ventes 500 000 et TVA 80 000 au crédit.",
          "Le logiciel contrôle que le total des débits est égal au total des crédits avant d'enregistrer.",
        ],
      },
      {
        heading: "La saisie d'une facture d'achat",
        body: [
          "Journal des achats : débit du compte d'achat (601) pour le HT et de la TVA récupérable ; crédit du fournisseur pour le TTC.",
          "Exemple : achat de 300 000 FC HT, TVA 16 % : achats 300 000 et TVA 48 000 au débit ; fournisseur 348 000 au crédit.",
          "Conservez la pièce (la facture) et indiquez son numéro dans la référence de la pièce.",
          "Une facture d'achat saisie deux fois fausse la comptabilité : vérifiez avant d'enregistrer.",
        ],
      },
      {
        heading: "Saisie guidée et saisie libre",
        body: [
          "La saisie guidée propose les comptes habituels selon le type de pièce : plus rapide, moins d'erreurs.",
          "La saisie libre laisse choisir tous les comptes : pratique pour les opérations rares.",
          "Les modèles de saisie évitent de retaper les écritures régulières (loyer, électricité).",
          "Utilisez la saisie par pièce : une pièce justificative = une écriture.",
        ],
      },
      {
        heading: "Contrôler sa saisie",
        body: [
          "Affichez le journal de la période pour relire les écritures et les comparer aux pièces.",
          "Un compte client ou fournisseur ne doit jamais avoir un solde contraire sans explication.",
          "Corrigez une erreur en passant une écriture inverse ou en modifiant la ligne tant que la période n'est pas validée.",
          "Respectez l'ordre chronologique des pièces et la numérotation continue.",
        ],
      },
    ],
    caseTitle: "Saisir la journée du lundi",
    caseLines: [
      "Neema saisit la facture de vente de 500 000 FC HT à l'école : 580 000 au débit du client, 500 000 et 80 000 au crédit.",
      "Elle saisit ensuite la facture d'achat de 300 000 FC HT de son fournisseur de cahiers.",
      "Le logiciel refuse d'enregistrer une écriture : le débit et le crédit ne sont pas égaux, elle a oublié la TVA.",
      "Elle corrige la ligne de TVA et la pièce est enregistrée.",
    ],
    tasks: [
      "Saisissez trois factures de vente avec leur TVA.",
      "Saisissez deux factures d'achat de marchandises.",
      "Affichez le journal des ventes et comparez-le à vos pièces.",
      "Corrigez une erreur volontaire de saisie avec la méthode la plus propre.",
    ],
    goal: "Enregistrer correctement les factures de vente et d'achat avec la TVA.",
    video: "Sage : saisir factures de vente et d'achat",
  }),
  lesson({
    id: 4,
    title: "Sage : banque, caisse et règlements",
    subtitle: "Enregistrer les encaissements et les décaissements.",
    sections: [
      {
        heading: "Les encaissements",
        body: [
          "Un client paie 580 000 FC par virement : débit du compte de banque (521), crédit du compte du client.",
          "Un client paie en espèces : débit du compte de caisse (571), crédit du compte du client.",
          "Le règlement se saisit dans le journal de banque ou de caisse.",
          "Indiquez en référence le numéro de la facture réglée pour faciliter le lettrage.",
        ],
      },
      {
        heading: "Les décaissements",
        body: [
          "Vous payez un fournisseur par banque : débit du compte du fournisseur, crédit du compte de banque.",
          "Vous payez une dépense en caisse : débit du compte de charge concerné, crédit du compte de caisse.",
          "Une dépense sans pièce justificative ne doit pas être saisie à la légère : exigez toujours un reçu.",
          "Les frais bancaires se saisissent au débit d'un compte de charge, au crédit de la banque.",
        ],
      },
      {
        heading: "La caisse",
        body: [
          "Le solde de la caisse ne peut jamais être négatif : on ne dépense pas plus d'argent qu'on n'en possède.",
          "Faites un arrêté de caisse en fin de journée : comptez l'argent et comparez-le au solde du logiciel.",
          "Les écarts de caisse sont expliqués et jamais cachés.",
          "Les versements en banque se saisissent comme des virements internes.",
        ],
      },
      {
        heading: "Le mobile money",
        body: [
          "Créez un compte de trésorerie pour chaque réseau de mobile money utilisé (classe 5).",
          "Les frais de transaction sont des charges à enregistrer séparément.",
          "Conservez les messages de confirmation comme pièces justificatives.",
          "Faites régulièrement le rapprochement avec le relevé de l'opérateur.",
        ],
      },
    ],
    caseTitle: "Encaisser et payer",
    caseLines: [
      "L'école règle sa facture de 580 000 FC par virement : Neema débite la banque et crédite le client.",
      "Elle paie le transporteur en espèces et saisit la dépense avec son reçu.",
      "À la fermeture, elle compte 124 000 FC dans la caisse alors que le logiciel en indique 120 000.",
      "Elle retrouve un paiement d'un client qui n'avait pas été saisi et corrige l'écriture.",
    ],
    tasks: [
      "Saisissez un encaissement par banque et un encaissement en caisse.",
      "Saisissez le paiement d'un fournisseur et d'une dépense en caisse.",
      "Faites l'arrêté de caisse d'une journée fictive.",
      "Saisissez les frais bancaires d'un relevé.",
    ],
    goal: "Saisir les opérations de banque, de caisse et de mobile money avec leurs pièces.",
    video: "Sage : saisir les opérations de banque et de caisse",
  }),
  lesson({
    id: 5,
    title: "Sage : lettrage et rapprochement bancaire",
    subtitle: "Associer factures et règlements, puis contrôler la banque.",
    sections: [
      {
        heading: "Le lettrage",
        body: [
          "Lettrer, c'est associer sur un même compte les écritures qui se compensent, par exemple une facture et son règlement.",
          "Les écritures lettrées reçoivent la même lettre (A, B, C…) et ne sont plus à suivre.",
          "Les écritures non lettrées d'un compte client représentent ce que le client doit encore.",
          "Le lettrage évite les paiements oubliés, les doubles paiements et les litiges.",
        ],
      },
      {
        heading: "Lettrer pas à pas",
        body: [
          "Ouvrez le compte du client ou du fournisseur et affichez toutes ses écritures.",
          "Sélectionnez la facture et le règlement de même montant, puis lancez le lettrage.",
          "Un lettrage partiel est possible quand le paiement est inférieur à la facture.",
          "Un lettrage automatique existe pour les cas simples ; contrôlez toujours le résultat.",
        ],
      },
      {
        heading: "Le rapprochement bancaire",
        body: [
          "Comparez le relevé de la banque avec le compte de banque du logiciel, ligne par ligne.",
          "Cochez les opérations qui apparaissent des deux côtés.",
          "Les opérations non cochées sont des différences : chèques non encaissés, frais non saisis, erreurs.",
          "Après rapprochement, le solde du logiciel plus ou moins les différences connues doit égaler le solde du relevé.",
        ],
      },
      {
        heading: "Corriger les écarts",
        body: [
          "Saisissez les frais et intérêts qui figurent sur le relevé mais pas dans le logiciel.",
          "Recherchez les opérations en double ou oubliées.",
          "Classez les relevés et les états de rapprochement avec les pièces comptables.",
          "Faites le rapprochement au moins une fois par mois.",
        ],
      },
    ],
    caseTitle: "Le contrôle de fin de mois",
    caseLines: [
      "À la fin du mois, Neema lettre le compte de l'école : la facture de 580 000 FC et le virement reçu portent la même lettre A.",
      "Elle ouvre le relevé de sa banque et coche chaque opération présente dans le logiciel.",
      "Deux lignes restent sans correspondance : des frais de tenue de compte et un virement oublié.",
      "Après leur saisie, le solde du logiciel est égal à celui du relevé.",
    ],
    tasks: [
      "Lettrez trois factures clients avec leurs règlements.",
      "Faites un lettrage partiel pour un paiement incomplet.",
      "Préparez un rapprochement bancaire avec un relevé fictif de dix lignes.",
      "Listez trois causes possibles d'écart entre le relevé et la comptabilité.",
    ],
    goal: "Lettrer les comptes de tiers et réaliser un rapprochement bancaire complet.",
    video: "Sage : lettrage et rapprochement bancaire",
  }),
  lesson({
    id: 6,
    title: "Sage : les états de gestion",
    subtitle: "Éditer la balance, le grand livre et la balance âgée.",
    sections: [
      {
        heading: "Le grand livre et le journal",
        body: [
          "Le journal liste les écritures dans l'ordre chronologique, journal par journal.",
          "Le grand livre liste les écritures compte par compte, avec le solde progressif.",
          "Le grand livre auxiliaire détaille les écritures de chaque client ou fournisseur.",
          "Imprimez-les sur une période pour contrôler et archiver.",
        ],
      },
      {
        heading: "La balance",
        body: [
          "La balance indique, pour chaque compte, le total des débits, le total des crédits et le solde.",
          "Le total des soldes débiteurs est égal au total des soldes créditeurs : sinon, il y a une erreur.",
          "On compare la balance d'un mois à celle du mois précédent pour repérer les variations anormales.",
          "La balance sert de base au bilan et au compte de résultat.",
        ],
      },
      {
        heading: "La balance âgée",
        body: [
          "La balance âgée classe les créances clients (ou les dettes fournisseurs) par ancienneté : non échues, moins de 30 jours, 30 à 60 jours, plus de 60 jours.",
          "Elle montre quels clients paient en retard et quels montants sont à risque.",
          "Elle guide les relances et la politique de crédit.",
          "Une créance très ancienne peut devenir une créance douteuse.",
        ],
      },
      {
        heading: "Exporter et présenter",
        body: [
          "Les états s'impriment en PDF ou s'exportent vers Excel pour être travaillés.",
          "Ajoutez le nom de la société, la période et la date d'édition.",
          "Présentez les résultats simplement au dirigeant : ventes, charges, bénéfice, créances, dettes.",
          "Archivez les états du mois avec les pièces correspondantes.",
        ],
      },
    ],
    caseTitle: "La balance du mois",
    caseLines: [
      "Neema édite la balance de janvier : les totaux débit et crédit sont égaux, ce qui rassure son comptable.",
      "Elle imprime le grand livre du compte de l'école pour répondre à une question sur une facture.",
      "La balance âgée montre qu'un client doit 200 000 FC depuis plus de 60 jours.",
      "Elle planifie une relance ferme et décide de réduire le crédit accordé à ce client.",
    ],
    tasks: [
      "Éditez le journal des ventes et la balance d'une période.",
      "Vérifiez que les totaux débit et crédit sont égaux.",
      "Éditez la balance âgée des clients et repérez les retards.",
      "Exportez une balance en Excel et calculez le total des ventes.",
    ],
    goal: "Éditer et lire la balance, le grand livre et la balance âgée.",
    video: "Sage : balance, grand livre et états comptables",
  }),
];

export const quizzesA2 = [
  quiz(1, "Quiz 1 — Sage : dossier", "Société, exercice et utilisateurs", [
    ["À quoi sert Sage ?", "Enregistrer les écritures et produire les états comptables", "Retoucher des photos", "Monter des vidéos"],
    ["Qu'est-ce qu'un dossier dans Sage ?", "L'ensemble des données comptables d'une société", "Un fichier image", "Un message"],
    ["Combien de temps dure en général un exercice ?", "Douze mois", "Une semaine", "Dix ans"],
    ["Quel plan comptable choisit-on en RDC ?", "Le plan OHADA (SYSCOHADA)", "Aucun plan", "Un plan au hasard"],
    ["Pourquoi donner des droits différents aux utilisateurs ?", "Pour limiter ce que chacun peut modifier ou valider", "Pour supprimer la comptabilité", "Pour ralentir le logiciel"],
    ["Quand faut-il faire une sauvegarde ?", "Avant toute opération importante", "Jamais", "Seulement chaque année"],
    ["Que doit-on faire avec le mot de passe du responsable ?", "Le garder en lieu sûr sans le partager", "L'afficher sur l'écran", "Le donner à tous"],
    ["Qu'indiquent la date de début et de fin d'un exercice ?", "La période comptable couverte", "L'âge de l'entreprise", "Le nombre de clients"],
    ["Que fait la comptabilité de la société avec les informations saisies ?", "Elle alimente la balance, le grand livre et les états", "Elle les efface", "Elle les envoie aux clients"],
    ["Où trouve-t-on l'explication d'un écran ?", "Dans l'aide intégrée", "Dans la corbeille", "Sur la facture"],
  ]),
  quiz(2, "Quiz 2 — Sage : paramétrage", "Comptes, journaux, tiers et TVA", [
    ["Que contient un plan comptable ?", "La liste des comptes utilisables, classés par numéro", "La liste des employés", "Les photos des produits"],
    ["Quel code correspond au journal des ventes ?", "VTE", "BQ", "CAI"],
    ["Quel compte collectif regroupe les clients ?", "411", "401", "521"],
    ["Quel compte collectif regroupe les fournisseurs ?", "401", "411", "701"],
    ["Pourquoi séparer les journaux ?", "Pour faciliter le contrôle et la recherche des pièces", "Pour ralentir la saisie", "Pour supprimer des écritures"],
    ["Que faut-il éviter avec un compte qui contient des écritures ?", "Le supprimer", "Le consulter", "L'imprimer"],
    ["Qu'associe un code taxe ?", "Un taux de TVA et des comptes de TVA", "Un client et un produit", "Une banque et une caisse"],
    ["Que se passe-t-il avec un code taxe mal choisi ?", "La déclaration de TVA est fausse", "Rien du tout", "Le logiciel se ferme"],
    ["Que porte un compte auxiliaire ?", "Un code court pour un client ou un fournisseur", "Un mot de passe", "Un taux de change"],
    ["Que vaut le total des comptes auxiliaires ?", "Le compte collectif", "Zéro", "Le nombre de journaux"],
  ]),
  quiz(3, "Quiz 3 — Sage : achats et ventes", "Saisir les factures avec la TVA", [
    ["Pour une facture de vente, que débite-t-on ?", "Le compte du client pour le TTC", "Le compte d'achats", "La caisse"],
    ["Quel compte crédite-t-on pour la vente HT ?", "Le compte de ventes (701)", "Le compte de banque", "Le compte fournisseur"],
    ["Que crédite-t-on pour la TVA d'une vente ?", "La TVA facturée", "La TVA récupérable", "Le capital"],
    ["Pour une facture d'achat, que crédite-t-on pour le TTC ?", "Le compte du fournisseur", "Le compte client", "Le compte de ventes"],
    ["Quel compte débite-t-on pour des marchandises achetées ?", "Le compte d'achats (601)", "Le compte 701", "Le compte 411"],
    ["Combien est le TTC d'un achat de 300 000 HT avec 16 % ?", "348 000", "316 000", "300 016"],
    ["Que contrôle le logiciel avant d'enregistrer ?", "Que débit et crédit sont égaux", "L'orthographe des noms", "La météo"],
    ["Quel intérêt a la saisie guidée ?", "Elle propose les comptes habituels et réduit les erreurs", "Elle supprime la TVA", "Elle masque les journaux"],
    ["Que faut-il toujours conserver ?", "La pièce justificative, avec son numéro", "Rien", "Seulement la date"],
    ["Que faire d'une facture saisie deux fois ?", "Corriger pour ne la garder qu'une seule fois", "La laisser", "Supprimer le dossier"],
  ]),
  quiz(4, "Quiz 4 — Sage : trésorerie", "Banque, caisse et règlements", [
    ["Un client paie par virement : quel compte débite-t-on ?", "Le compte de banque (521)", "Le compte 701", "Le compte 601"],
    ["Un client paie en espèces : quel compte débite-t-on ?", "Le compte de caisse (571)", "Le compte 401", "Le compte 411"],
    ["Quel compte crédite-t-on lors du paiement d'un client ?", "Le compte du client", "Le compte de ventes", "Le compte du fournisseur"],
    ["Que fait-on lorsqu'on paie un fournisseur par banque ?", "Débit fournisseur, crédit banque", "Débit banque, crédit client", "Débit ventes, crédit caisse"],
    ["Le solde de la caisse peut-il être négatif ?", "Non, jamais", "Oui, toujours", "Seulement le lundi"],
    ["Que faut-il faire en fin de journée avec la caisse ?", "Compter l'argent et comparer au logiciel", "L'ignorer", "Supprimer les écritures"],
    ["Comment traiter un écart de caisse ?", "L'expliquer et le corriger, jamais le cacher", "Le cacher", "L'ajouter aux ventes"],
    ["Où saisit-on les frais bancaires ?", "Au débit d'un compte de charge, au crédit de la banque", "Au crédit des ventes", "Au débit du client"],
    ["Que faut-il garder pour un paiement mobile money ?", "Le message de confirmation comme justificatif", "Rien du tout", "Une photo du téléphone"],
    ["Pourquoi indiquer le numéro de facture dans la référence ?", "Pour faciliter le lettrage", "Pour changer la TVA", "Pour supprimer le client"],
  ]),
  quiz(5, "Quiz 5 — Sage : lettrage et rapprochement", "Associer et contrôler", [
    ["Que signifie lettrer ?", "Associer des écritures qui se compensent sur un même compte", "Écrire une lettre au client", "Imprimer une facture"],
    ["Que reçoivent les écritures lettrées ?", "La même lettre", "Une photo", "Un mot de passe"],
    ["Que représentent les écritures non lettrées d'un client ?", "Ce que le client doit encore", "Les ventes de l'année", "Le stock restant"],
    ["Quand utilise-t-on un lettrage partiel ?", "Quand le paiement est inférieur à la facture", "Quand tout est payé", "Jamais"],
    ["Que compare le rapprochement bancaire ?", "Le relevé de la banque et le compte de banque du logiciel", "Deux clients", "Deux journaux de ventes"],
    ["Que fait-on des opérations non cochées ?", "On cherche leur cause : frais, oublis, erreurs", "On les supprime", "On les ignore"],
    ["Quelle est la fréquence conseillée du rapprochement ?", "Au moins une fois par mois", "Une fois en dix ans", "Jamais"],
    ["Que faire de frais présents sur le relevé mais absents du logiciel ?", "Les saisir", "Les cacher", "Les doubler"],
    ["Pourquoi contrôler un lettrage automatique ?", "Pour vérifier que les associations sont justes", "Pour le supprimer", "Pour changer la lettre"],
    ["Quel est le bon résultat d'un rapprochement ?", "Le solde du logiciel et celui du relevé s'expliquent", "Un solde négatif", "Un écart inexpliqué"],
  ]),
  quiz(6, "Quiz 6 — Sage : états de gestion", "Balance, grand livre, balance âgée", [
    ["Que liste le grand livre ?", "Les écritures compte par compte", "Les factures imprimées", "Les clients par ville"],
    ["Que montre la balance ?", "Débits, crédits et solde de chaque compte", "Les photos des produits", "Les rendez-vous"],
    ["Que doit valoir le total des soldes débiteurs ?", "Le total des soldes créditeurs", "Zéro", "Le nombre de comptes"],
    ["Que classe la balance âgée ?", "Les créances ou dettes par ancienneté", "Les produits par couleur", "Les employés par taille"],
    ["À quoi sert-elle surtout ?", "À guider les relances et la politique de crédit", "À imprimer des affiches", "À créer des comptes"],
    ["Pourquoi comparer deux balances de mois consécutifs ?", "Pour repérer les variations anormales", "Pour supprimer des comptes", "Pour changer de logiciel"],
    ["Quel journal liste les écritures dans l'ordre chronologique ?", "Le journal", "La balance âgée", "Le catalogue"],
    ["Que permet l'export vers Excel ?", "Retravailler les états", "Effacer la comptabilité", "Changer la monnaie"],
    ["Que faut-il ajouter à un état imprimé ?", "Le nom de la société, la période et la date d'édition", "Une photo du directeur", "Une liste de cadeaux"],
    ["Que faire des états du mois ?", "Les archiver avec les pièces correspondantes", "Les jeter", "Les envoyer à des inconnus"],
  ]),
];
