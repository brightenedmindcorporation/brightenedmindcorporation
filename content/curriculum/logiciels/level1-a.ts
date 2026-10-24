import { lesson, quiz } from "../bureautique/builders";

// Niveau 1 · Les bases de la gestion informatisée — leçons 1 à 6 : notions, comptabilité, cycle commercial, Dolibarr.

export const lessonsA = [
  lesson({
    id: 1,
    title: "Qu'est-ce qu'un logiciel de gestion ?",
    subtitle: "Comprendre à quoi servent un progiciel, un ERP et leurs modules.",
    sections: [
      {
        heading: "Pourquoi informatiser la gestion",
        body: [
          "Une entreprise manipule chaque jour des clients, des produits, des factures, des paiements et des stocks.",
          "Sur papier ou dans des fichiers séparés, les erreurs, les doublons et les pertes d'information sont fréquents.",
          "Un logiciel de gestion enregistre chaque information une seule fois et la rend disponible à tous ceux qui en ont besoin.",
          "Il fait gagner du temps, réduit les erreurs de calcul et permet de suivre l'activité en temps réel.",
        ],
      },
      {
        heading: "Les grandes familles de logiciels",
        body: [
          "Logiciel de comptabilité : enregistre les écritures et produit la balance, le bilan et le compte de résultat (exemple : Sage).",
          "Logiciel de gestion commerciale : devis, commandes, factures, stocks (exemples : Dolibarr, Sage gestion commerciale).",
          "ERP (progiciel de gestion intégré) : plusieurs modules reliés dans une seule base de données (exemple : Odoo).",
          "Logiciels spécialisés : douane (Sydonia), audit et contrôle de gestion.",
        ],
      },
      {
        heading: "Le vocabulaire de base",
        body: [
          "Module (ou application) : une partie du logiciel dédiée à un métier : ventes, achats, stock, comptabilité, RH.",
          "Fiche : l'enregistrement d'un client, d'un produit ou d'un fournisseur.",
          "Utilisateur et droits : chaque personne a un identifiant et ne voit que ce qui correspond à son rôle.",
          "Base de données : l'endroit où toutes les informations sont stockées.",
        ],
      },
      {
        heading: "Choisir et utiliser un logiciel",
        body: [
          "Installé sur un ordinateur ou en ligne (cloud) : le cloud permet de travailler de partout avec Internet.",
          "Open source (Dolibarr, Odoo Community) : le code est ouvert et le logiciel peut être gratuit ; une licence payante (Sage, Odoo Enterprise) offre plus de fonctions et un support.",
          "Un bon logiciel s'adapte à la taille de l'entreprise, à son métier et à son budget.",
          "Le logiciel est un outil : la qualité des résultats dépend d'abord de la qualité des informations saisies.",
        ],
      },
    ],
    caseTitle: "La boutique de Neema",
    caseLines: [
      "Neema tient une boutique de fournitures scolaires à Lubumbashi. Elle note ses ventes dans un cahier et ses stocks dans un autre.",
      "À la fin du mois, elle ne retrouve plus quels clients lui doivent de l'argent ni quels articles sont presque épuisés.",
      "Un ami lui conseille un logiciel de gestion : les ventes, les paiements et le stock y seraient reliés automatiquement.",
      "Neema comprend que le logiciel ne remplace pas son sérieux : il l'aide à garder des informations justes.",
    ],
    tasks: [
      "Citez trois informations que votre entreprise (ou une entreprise que vous connaissez) doit suivre chaque jour.",
      "Pour chacune, dites dans quel module d'un logiciel elle serait enregistrée.",
      "Listez deux avantages et deux limites d'un logiciel en ligne par rapport à un logiciel installé.",
      "Expliquez avec vos mots la différence entre un logiciel de comptabilité et un ERP.",
    ],
    goal: "Expliquer à quoi sert un logiciel de gestion, citer ses grandes familles et employer le vocabulaire de base (module, fiche, utilisateur, base de données).",
    video: "Qu'est-ce qu'un ERP et un logiciel de gestion ?",
  }),
  lesson({
    id: 2,
    title: "Notions de comptabilité",
    subtitle: "Débit, crédit, plan comptable OHADA, journaux et états.",
    sections: [
      {
        heading: "Le principe de la comptabilité",
        body: [
          "La comptabilité enregistre toutes les opérations de l'entreprise (achats, ventes, paiements, salaires…) pour en connaître la situation financière.",
          "Chaque opération est une écriture qui touche au moins deux comptes : c'est la partie double.",
          "Le total des montants au débit est toujours égal au total des montants au crédit.",
          "Exemple : vous vendez pour 100 à crédit : le compte Clients est débité de 100 et le compte Ventes est crédité de 100.",
        ],
      },
      {
        heading: "Le plan comptable OHADA",
        body: [
          "En RDC, la comptabilité suit le référentiel OHADA (SYSCOHADA) : chaque compte a un numéro.",
          "Classe 1 : capitaux et ressources durables. Classe 2 : immobilisations. Classe 3 : stocks.",
          "Classe 4 : tiers (401 fournisseurs, 411 clients, 44 État et taxes). Classe 5 : trésorerie (52 banques, 57 caisse).",
          "Classe 6 : charges (601 achats de marchandises). Classe 7 : produits (701 ventes de marchandises).",
        ],
      },
      {
        heading: "Les journaux et les livres",
        body: [
          "Le journal enregistre les écritures dans l'ordre : journal des achats, des ventes, de banque, de caisse et des opérations diverses.",
          "Le grand livre regroupe les écritures par compte.",
          "La balance donne, pour chaque compte, le total des débits, le total des crédits et le solde.",
          "À la fin de l'exercice, on produit le bilan (ce que l'entreprise possède et doit) et le compte de résultat (bénéfice ou perte).",
        ],
      },
      {
        heading: "La TVA",
        body: [
          "La TVA est une taxe sur la consommation : l'entreprise la collecte sur ses ventes et la déduit sur ses achats.",
          "TVA facturée (collectée) moins TVA récupérable (déductible) = TVA à reverser à l'État.",
          "Le taux normal en RDC est de 16 % ; vérifiez toujours le taux en vigueur auprès de l'administration fiscale.",
          "Prix hors taxes (HT) + TVA = prix toutes taxes comprises (TTC).",
        ],
      },
    ],
    caseTitle: "Une vente à crédit",
    caseLines: [
      "La boutique de Neema vend 100 cahiers à une école pour 500 000 FC hors taxes, avec 16 % de TVA.",
      "Le montant TTC est de 580 000 FC : 500 000 de vente et 80 000 de TVA.",
      "L'école paiera le mois suivant : le compte Clients est débité de 580 000 FC.",
      "Le compte Ventes est crédité de 500 000 FC et le compte TVA facturée de 80 000 FC : débit et crédit sont égaux.",
    ],
    tasks: [
      "Écrivez l'écriture d'une vente de 200 000 FC HT avec 16 % de TVA, payée par la banque.",
      "Associez chaque compte à sa classe : 411, 521, 601, 701, 401.",
      "Calculez le prix TTC d'un article à 25 000 FC HT avec 16 % de TVA.",
      "Expliquez pourquoi le total des débits est toujours égal au total des crédits.",
    ],
    goal: "Comprendre la partie double, repérer les classes du plan comptable OHADA et calculer la TVA.",
    video: "Les bases de la comptabilité : débit, crédit et plan comptable",
  }),
  lesson({
    id: 3,
    title: "Le cycle commercial",
    subtitle: "Du devis à l'encaissement : les documents de la vente et de l'achat.",
    sections: [
      {
        heading: "Les documents de la vente",
        body: [
          "Le devis (ou proposition commerciale) : le prix proposé au client, valable pendant une durée.",
          "La commande client (bon de commande) : le client confirme qu'il achète.",
          "Le bon de livraison : la preuve que les marchandises ont été remises au client.",
          "La facture : le document qui demande le paiement. L'avoir : la facture négative qui annule ou corrige une facture.",
        ],
      },
      {
        heading: "Les documents de l'achat",
        body: [
          "La demande de prix (ou commande) au fournisseur : on demande ou on confirme un achat.",
          "Le bon de réception : on contrôle ce qui est livré par rapport à ce qui a été commandé.",
          "La facture fournisseur : le document qu'on doit payer ; il est contrôlé avant le règlement.",
          "Le règlement du fournisseur : par banque, caisse ou mobile money, selon les échéances.",
        ],
      },
      {
        heading: "Mentions d'une facture",
        body: [
          "Le nom et l'adresse du vendeur et du client, avec les numéros d'identification (RCCM, NIF…).",
          "Un numéro unique, la date et la désignation des produits avec quantités et prix unitaires.",
          "Le total hors taxes, la TVA et le total TTC, ainsi que la monnaie utilisée (FC ou USD).",
          "Les conditions de paiement : date limite et modes de règlement.",
        ],
      },
      {
        heading: "Suivre les paiements",
        body: [
          "Facture impayée : le client n'a pas encore payé ; on suit l'échéance.",
          "Paiement partiel : le client règle une partie ; le reste à payer reste ouvert.",
          "Relance : un rappel poli envoyé quand l'échéance est dépassée.",
          "Un bon suivi des créances protège la trésorerie de l'entreprise.",
        ],
      },
    ],
    caseTitle: "De la demande à l'encaissement",
    caseLines: [
      "Une école demande un prix pour 100 cahiers : la boutique de Neema envoie un devis valable 15 jours.",
      "L'école accepte, une commande est enregistrée, puis les cahiers sont livrés avec un bon de livraison signé.",
      "Neema établit la facture avec une échéance à 30 jours, puis envoie une relance le jour suivant l'échéance.",
      "Le paiement arrive : la facture est soldée et la vente est terminée.",
    ],
    tasks: [
      "Classez dans l'ordre : facture, devis, bon de livraison, commande, règlement.",
      "Dites quel document protège le vendeur si le client conteste la livraison.",
      "Listez cinq mentions obligatoires d'une facture.",
      "Rédigez un court message de relance poli pour une facture en retard.",
    ],
    goal: "Connaître les documents de la vente et de l'achat, leur ordre et leur utilité.",
    video: "Le cycle de vente : devis, commande, livraison, facture",
  }),
  lesson({
    id: 4,
    title: "Tiers et produits",
    subtitle: "Organiser les fiches clients, fournisseurs, produits et services.",
    sections: [
      {
        heading: "Les tiers",
        body: [
          "Un tiers est toute personne ou entreprise avec laquelle vous travaillez : client, prospect, fournisseur.",
          "Un prospect est un client potentiel qui n'a pas encore acheté.",
          "Une fiche tiers contient : nom, adresse, téléphone, e-mail, numéro d'identification, conditions de paiement.",
          "Une même société peut avoir plusieurs contacts (directeur, comptable, responsable des achats).",
        ],
      },
      {
        heading: "Les produits et services",
        body: [
          "Un produit est un bien physique que l'on stocke ; un service est une prestation (livraison, formation, installation).",
          "Une fiche produit contient : référence, libellé, prix de vente HT, prix d'achat, taux de TVA, unité.",
          "La référence doit être unique et lisible : par exemple CAH-A4-96 pour un cahier A4 de 96 pages.",
          "Les catégories (papeterie, informatique…) permettent de retrouver et d'analyser les produits.",
        ],
      },
      {
        heading: "Les bonnes pratiques de saisie",
        body: [
          "Vérifiez qu'une fiche n'existe pas déjà avant d'en créer une : évitez les doublons.",
          "Écrivez les noms toujours de la même façon (majuscules, abréviations).",
          "Renseignez les champs importants : un client sans e-mail ni téléphone est difficile à relancer.",
          "Ne supprimez pas une fiche déjà utilisée ; désactivez-la ou archivez-la.",
        ],
      },
      {
        heading: "La monnaie et les unités",
        body: [
          "Beaucoup d'entreprises facturent en dollars (USD) et en francs congolais (FC) : choisissez la monnaie de chaque document.",
          "Le taux de change doit être clair et noté pour chaque opération.",
          "L'unité de vente (pièce, carton, kilo, heure) évite les confusions de quantités.",
          "Les prix doivent indiquer s'ils sont HT ou TTC.",
        ],
      },
    ],
    caseTitle: "Les fiches de la boutique",
    caseLines: [
      "Neema crée la fiche de son premier client, l'école Bonne Étoile, avec ses coordonnées et son contact principal.",
      "Elle enregistre ensuite ses produits : cahiers, stylos et règles, chacun avec une référence unique et un prix HT.",
      "Elle découvre qu'elle avait créé deux fois la fiche d'un fournisseur et décide de ne garder qu'une seule fiche.",
      "Grâce à ces fiches propres, ses futurs devis et factures seront remplis en quelques clics.",
    ],
    tasks: [
      "Rédigez la fiche complète d'un client fictif (huit champs au moins).",
      "Créez cinq références de produits avec une règle de codification claire.",
      "Expliquez la différence entre un prospect et un client.",
      "Citez deux erreurs courantes de saisie des fiches et la façon de les éviter.",
    ],
    goal: "Préparer des fiches clients, fournisseurs et produits propres, avec des références claires.",
    video: "Gérer ses clients, fournisseurs et produits dans un logiciel",
  }),
  lesson({
    id: 5,
    title: "Dolibarr : découvrir et configurer",
    subtitle: "Se connecter, repérer les menus, régler la société et activer les modules.",
    sections: [
      {
        heading: "Présentation de Dolibarr",
        body: [
          "Dolibarr est un ERP/CRM libre et gratuit, adapté aux petites entreprises, aux associations et aux indépendants.",
          "Il fonctionne dans un navigateur web : on y accède avec une adresse, un identifiant et un mot de passe.",
          "Il est modulaire : on active seulement les modules dont on a besoin (tiers, produits, factures, stocks…).",
          "Les noms des menus peuvent varier légèrement selon la version et la langue.",
        ],
      },
      {
        heading: "L'interface",
        body: [
          "Le menu du haut : Accueil, Tiers, Produits/Services, Commercial, Facturation/Paiement, Banque/Caisse, Projets…",
          "Le menu de gauche change selon le module choisi : listes, créations, statistiques.",
          "L'accueil affiche un tableau de bord avec les indicateurs : propositions ouvertes, factures impayées…",
          "La zone en haut à droite donne accès à votre profil, à la déconnexion et à l'aide.",
        ],
      },
      {
        heading: "Configurer la société",
        body: [
          "Accueil > Configuration > Société/Organisation : nom, adresse, logo, numéros d'identification, monnaie.",
          "Accueil > Configuration > Modules : activer les modules utiles (Tiers, Produits, Propositions commerciales, Factures, Banque, Stocks).",
          "Indiquer le taux de TVA, les modes de paiement et les conditions de règlement.",
          "Créer les utilisateurs et leur donner des droits adaptés à leur rôle (Accueil > Utilisateurs & groupes).",
        ],
      },
      {
        heading: "Premiers réflexes",
        body: [
          "Utilisez les boutons Créer, Modifier, Valider et Supprimer avec attention : une facture validée ne se modifie plus.",
          "Les statuts (brouillon, validé, payé…) indiquent où en est un document.",
          "La recherche rapide permet de retrouver un tiers, un produit ou une facture.",
          "Faites régulièrement une sauvegarde de la base de données.",
        ],
      },
    ],
    caseTitle: "La première configuration",
    caseLines: [
      "Neema reçoit l'adresse de son Dolibarr de démonstration et se connecte avec son identifiant.",
      "Elle commence par renseigner les informations de sa boutique et téléverse son logo.",
      "Elle active les modules dont elle a besoin et laisse les autres désactivés pour garder une interface simple.",
      "Elle crée un utilisateur pour son employé, avec le droit de créer des factures mais pas de modifier la configuration.",
    ],
    tasks: [
      "Connectez-vous à Dolibarr (ou à une démonstration) et repérez les menus principaux.",
      "Renseignez les informations de votre société fictive : nom, adresse, monnaie.",
      "Activez trois modules et notez à quoi sert chacun.",
      "Créez un utilisateur avec des droits limités et expliquez pourquoi.",
    ],
    goal: "Se repérer dans Dolibarr, configurer la société et activer les modules utiles.",
    video: "Dolibarr : installation et prise en main",
  }),
  lesson({
    id: 6,
    title: "Dolibarr : tiers, contacts et produits",
    subtitle: "Créer et gérer les fiches dans Dolibarr.",
    sections: [
      {
        heading: "Créer un tiers",
        body: [
          "Menu Tiers > Nouveau tiers : saisissez le nom, la nature (client, prospect, fournisseur) et les coordonnées.",
          "Cochez Client et/ou Fournisseur : une même société peut avoir les deux rôles.",
          "Renseignez les numéros d'identification, la TVA, les conditions et le mode de règlement.",
          "Cliquez sur Créer : la fiche reçoit un code client (par exemple CU2501-0001).",
        ],
      },
      {
        heading: "Contacts et adresses",
        body: [
          "Dans la fiche du tiers, l'onglet Contacts/Adresses permet d'ajouter les personnes à joindre.",
          "Indiquez la fonction (directeur, comptable) et l'e-mail : il servira à envoyer les devis et factures.",
          "Un tiers peut avoir plusieurs adresses (facturation, livraison).",
          "L'onglet Agenda garde la trace des échanges avec le client.",
        ],
      },
      {
        heading: "Créer un produit ou un service",
        body: [
          "Menu Produits/Services > Nouveau produit (ou service).",
          "Saisissez la référence, le libellé, le prix de vente HT, le taux de TVA et la nature (produit ou service).",
          "Pour suivre le stock, activez la gestion de stock sur la fiche et indiquez le seuil d'alerte.",
          "Vous pouvez ajouter une photo, une description et une catégorie.",
        ],
      },
      {
        heading: "Importer et rechercher",
        body: [
          "Pour de nombreuses fiches, l'import d'un fichier CSV (Outils > Import) évite la saisie une à une.",
          "Préparez le fichier avec les colonnes dans le bon ordre et sans doublon.",
          "Utilisez les filtres des listes (par nom, ville, catégorie) pour retrouver une fiche.",
          "Exportez les listes en fichier pour les travailler dans Excel.",
        ],
      },
    ],
    caseTitle: "Remplir la base de la boutique",
    caseLines: [
      "Neema crée trois clients : deux écoles et un particulier, avec un contact pour chaque école.",
      "Elle saisit sa liste de produits : au lieu de les taper un par un, elle les importe depuis un fichier Excel enregistré en CSV.",
      "Elle vérifie les fiches importées et corrige deux références mal écrites.",
      "Sa base est prête : elle peut maintenant établir ses premiers devis.",
    ],
    tasks: [
      "Créez trois tiers (deux clients et un fournisseur) avec un contact chacun.",
      "Créez cinq produits ou services avec leur prix et leur TVA.",
      "Préparez un fichier CSV de dix produits prêt à être importé.",
      "Utilisez un filtre pour retrouver tous les clients d'une même ville.",
    ],
    goal: "Créer et organiser les tiers, les contacts et les produits dans Dolibarr.",
    video: "Dolibarr : créer des tiers et des produits",
  }),
];

export const quizzesA = [
  quiz(1, "Quiz 1 — Logiciels de gestion", "ERP, modules et vocabulaire", [
    ["À quoi sert un logiciel de gestion ?", "À enregistrer et relier les informations de l'entreprise", "À remplacer les employés", "À dessiner des logos"],
    ["Qu'est-ce qu'un ERP ?", "Un progiciel qui relie plusieurs modules dans une seule base", "Un antivirus", "Un type d'imprimante"],
    ["Qu'est-ce qu'un module ?", "Une partie du logiciel dédiée à un métier", "Un mot de passe", "Un fichier PDF"],
    ["Qu'est-ce qu'une fiche ?", "L'enregistrement d'un client, d'un produit ou d'un fournisseur", "Un écran en panne", "Une facture imprimée"],
    ["Qu'est-ce qu'une base de données ?", "L'endroit où toutes les informations sont stockées", "Un clavier", "Une page web"],
    ["Quel avantage apporte un logiciel en ligne (cloud) ?", "On peut y travailler de partout avec Internet", "Il fonctionne sans électricité", "Il n'a pas besoin de mot de passe"],
    ["Dolibarr est un logiciel…", "Libre et gratuit, adapté aux petites entreprises", "Uniquement réservé aux banques", "Qui ne sert qu'à la douane"],
    ["Pourquoi donne-t-on des droits différents aux utilisateurs ?", "Chacun ne voit que ce qui correspond à son rôle", "Pour ralentir le logiciel", "Pour supprimer des fiches"],
    ["Que dépend de la qualité des informations saisies ?", "La qualité des résultats du logiciel", "La couleur de l'écran", "La vitesse d'Internet seulement"],
    ["Quel logiciel est surtout un logiciel de comptabilité ?", "Sage", "Paint", "VLC"],
  ]),
  quiz(2, "Quiz 2 — Comptabilité", "Partie double, plan OHADA et TVA", [
    ["Que signifie la partie double ?", "Chaque opération touche au moins deux comptes, débit et crédit égaux", "On écrit tout deux fois dans un cahier", "On fait deux factures"],
    ["Que dit la règle du débit et du crédit ?", "Le total des débits est égal au total des crédits", "Le débit est toujours plus grand", "Le crédit est toujours nul"],
    ["Quelle classe du plan comptable OHADA regroupe les tiers ?", "La classe 4", "La classe 6", "La classe 1"],
    ["Quel compte correspond aux clients ?", "411", "401", "701"],
    ["Quel compte correspond aux ventes de marchandises ?", "701", "601", "521"],
    ["Quel compte correspond aux achats de marchandises ?", "601", "411", "571"],
    ["Quelle classe regroupe la trésorerie (banque, caisse) ?", "La classe 5", "La classe 7", "La classe 2"],
    ["Que montre la balance ?", "Le total des débits, des crédits et le solde de chaque compte", "La liste des employés", "Les images du site"],
    ["Que calcule la formule TVA facturée − TVA récupérable ?", "La TVA à reverser à l'État", "Le bénéfice net", "Le prix d'achat"],
    ["Combien vaut le prix TTC d'un article de 100 HT avec 16 % de TVA ?", "116", "100,16", "84"],
  ]),
  quiz(3, "Quiz 3 — Cycle commercial", "Devis, commande, livraison, facture", [
    ["Quel document propose un prix au client ?", "Le devis", "Le bon de livraison", "L'avoir"],
    ["Quel document prouve que les marchandises ont été remises ?", "Le bon de livraison", "Le devis", "Le relevé bancaire"],
    ["Quel est l'ordre normal de la vente ?", "Devis, commande, livraison, facture, règlement", "Règlement, devis, facture, commande", "Facture, devis, commande, livraison"],
    ["Qu'est-ce qu'un avoir ?", "Une facture négative qui annule ou corrige une facture", "Un nouveau devis", "Un contrat de travail"],
    ["Que doit contenir une facture ?", "Numéro, date, désignations, prix HT, TVA et total TTC", "Seulement le nom du client", "Seulement un logo"],
    ["Qu'est-ce qu'une relance ?", "Un rappel envoyé quand l'échéance est dépassée", "Une remise exceptionnelle", "Un bon de commande"],
    ["Que faut-il contrôler à la réception d'une livraison fournisseur ?", "Que ce qui est livré correspond à la commande", "La couleur du carton seulement", "Rien du tout"],
    ["Qu'est-ce qu'un paiement partiel ?", "Le client règle une partie ; le reste reste à payer", "Le client paie deux fois", "Le fournisseur rembourse"],
    ["Pourquoi suivre les factures impayées ?", "Pour protéger la trésorerie de l'entreprise", "Pour augmenter la TVA", "Pour changer le logo"],
    ["Qu'indiquent les conditions de paiement ?", "La date limite et les modes de règlement", "La couleur de la facture", "Le nom du livreur"],
  ]),
  quiz(4, "Quiz 4 — Tiers et produits", "Fiches clients, fournisseurs et produits", [
    ["Qu'est-ce qu'un tiers ?", "Une personne ou une entreprise avec laquelle on travaille", "Un produit en stock", "Un compte bancaire"],
    ["Qu'est-ce qu'un prospect ?", "Un client potentiel qui n'a pas encore acheté", "Un fournisseur", "Un employé"],
    ["Quelle différence entre un produit et un service ?", "Un produit est un bien physique, un service est une prestation", "Aucune différence", "Un service a toujours un stock"],
    ["Que doit être une référence de produit ?", "Unique et lisible", "Toujours vide", "Identique pour tous les produits"],
    ["Que faire avant de créer une nouvelle fiche ?", "Vérifier qu'elle n'existe pas déjà", "L'imprimer", "Éteindre l'ordinateur"],
    ["Pourquoi ne faut-il pas supprimer une fiche déjà utilisée ?", "Elle apparaît dans des documents : on la désactive ou on l'archive", "Elle est protégée par un virus", "Elle ne peut jamais être modifiée"],
    ["Pourquoi renseigner l'e-mail et le téléphone d'un client ?", "Pour pouvoir envoyer les documents et relancer", "Pour changer la TVA", "Pour supprimer le client"],
    ["Que signifie HT ?", "Hors taxes", "Haute tension", "Heures de travail"],
    ["Que faut-il préciser quand on facture en plusieurs monnaies ?", "La monnaie et le taux de change", "Seulement la date", "Le nom du livreur"],
    ["Quelle unité évite les confusions de quantités ?", "L'unité de vente claire (pièce, carton, kilo, heure)", "Aucune unité", "Un nombre au hasard"],
  ]),
  quiz(5, "Quiz 5 — Dolibarr : configuration", "Interface, société et modules", [
    ["Comment utilise-t-on Dolibarr ?", "Dans un navigateur web", "Uniquement sur une clé USB", "Avec un téléphone sans Internet"],
    ["Quel menu permet d'activer un module ?", "Configuration > Modules", "Outils > Imprimer", "Accueil > Éteindre"],
    ["Que fait-on dans Configuration > Société ?", "On renseigne le nom, l'adresse, le logo et la monnaie", "On supprime les factures", "On change la couleur de l'écran"],
    ["Pourquoi activer seulement les modules utiles ?", "Pour garder une interface simple", "Pour que le logiciel soit payant", "Pour effacer la base"],
    ["Que veut dire statut « brouillon » ?", "Le document n'est pas encore validé", "Le document est payé", "Le document est supprimé"],
    ["Que se passe-t-il après la validation d'une facture ?", "Elle ne se modifie plus librement", "Elle disparaît", "Elle devient un devis"],
    ["Comment limiter les actions d'un employé ?", "En lui donnant des droits adaptés à son rôle", "En lui retirant son ordinateur", "En supprimant la société"],
    ["À quoi sert la recherche rapide ?", "À retrouver un tiers, un produit ou une facture", "À éteindre le logiciel", "À imprimer l'écran"],
    ["Pourquoi sauvegarder régulièrement la base de données ?", "Pour pouvoir restaurer les informations en cas de problème", "Pour accélérer la souris", "Pour changer de logiciel"],
    ["Que montre le tableau de bord de l'accueil ?", "Des indicateurs : propositions ouvertes, factures impayées…", "Les photos des clients", "La météo"],
  ]),
  quiz(6, "Quiz 6 — Dolibarr : tiers et produits", "Créer et importer des fiches", [
    ["Quel menu crée un client ?", "Tiers > Nouveau tiers", "Banque > Fermer", "Projets > Imprimer"],
    ["Une même société peut-elle être cliente et fournisseur ?", "Oui, on peut cocher les deux", "Non, jamais", "Seulement pour les banques"],
    ["À quoi sert l'onglet Contacts ?", "À ajouter les personnes à joindre dans la société", "À changer le logo", "À supprimer la société"],
    ["Quels champs sont essentiels sur une fiche produit ?", "Référence, libellé, prix HT et taux de TVA", "Seulement la photo", "La couleur de l'écran"],
    ["Que faut-il activer pour suivre le stock d'un produit ?", "La gestion de stock sur la fiche du produit", "Le mode économiseur", "L'impression recto verso"],
    ["Que permet l'import CSV ?", "Créer de nombreuses fiches sans les saisir une à une", "Envoyer un e-mail", "Sauvegarder les photos"],
    ["Que faut-il vérifier avant d'importer un fichier ?", "Les colonnes dans le bon ordre et l'absence de doublons", "La couleur des cellules", "La taille de la police"],
    ["Comment retrouver les clients d'une ville ?", "Avec les filtres de la liste", "En les comptant sur papier", "En redémarrant"],
    ["Que fait un export de liste ?", "Il sort les données dans un fichier utilisable dans Excel", "Il supprime la liste", "Il change les prix"],
    ["Quel est l'avantage de fiches propres ?", "Les devis et factures se remplissent en quelques clics", "Le logiciel devient gratuit", "Les clients paient plus vite sans raison"],
  ]),
];
