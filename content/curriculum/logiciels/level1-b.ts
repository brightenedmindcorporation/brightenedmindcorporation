import { finalQuiz, lesson, quiz } from "../bureautique/builders";

// Niveau 1 · Les bases de la gestion informatisée — leçons 7 à 12 : Dolibarr (ventes, banque, achats, stock, CRM) et révision.

export const lessonsB = [
  lesson({
    id: 7,
    title: "Dolibarr : devis, commandes et factures clients",
    subtitle: "Suivre une vente du devis à la facture.",
    sections: [
      {
        heading: "Créer un devis",
        body: [
          "Menu Commercial > Propositions commerciales > Nouvelle proposition : choisissez le client.",
          "Ajoutez les lignes : produit, quantité, prix, remise éventuelle ; la TVA et le total se calculent seuls.",
          "Validez le devis : il passe de brouillon à validé et reçoit un numéro (par exemple PR2501-0001).",
          "Générez le document PDF, envoyez-le par e-mail, puis notez la réponse : signé ou refusé.",
        ],
      },
      {
        heading: "De la proposition à la commande",
        body: [
          "Quand le client accepte, classez le devis « signé » puis créez la commande client en un clic.",
          "La commande reprend les lignes du devis : il n'y a pas à les ressaisir.",
          "Validez la commande ; si vous gérez le stock, la livraison (expédition) peut en être tirée.",
          "Chaque document garde un lien avec le précédent : on peut remonter toute l'histoire de la vente.",
        ],
      },
      {
        heading: "Facturer",
        body: [
          "Depuis la commande, cliquez sur Créer facture : les lignes sont reprises automatiquement.",
          "Vérifiez les quantités, les prix, la TVA et les conditions de règlement avant de valider.",
          "Une fois validée, la facture reçoit son numéro définitif et ne peut plus être modifiée.",
          "En cas d'erreur sur une facture validée, on établit un avoir plutôt que de la supprimer.",
        ],
      },
      {
        heading: "Modèles et documents",
        body: [
          "Les modèles de documents (PDF) affichent votre logo, vos mentions légales et vos conditions de vente.",
          "Choisissez la langue et la monnaie du document.",
          "Les documents sont rattachés à la fiche du client : onglet Documents.",
          "Imprimez ou envoyez par e-mail directement depuis le logiciel.",
        ],
      },
    ],
    caseTitle: "La première vente de Neema",
    caseLines: [
      "L'école Bonne Étoile demande un prix pour 200 cahiers et 100 stylos : Neema crée un devis et l'envoie en PDF.",
      "L'école accepte : Neema classe le devis « signé » et crée la commande puis la facture sans retaper les lignes.",
      "Elle découvre une erreur de quantité avant de valider : elle corrige, car la facture est encore en brouillon.",
      "Une fois validée, la facture porte un numéro définitif et part par e-mail au client.",
    ],
    tasks: [
      "Créez un devis de trois lignes pour un de vos clients fictifs et validez-le.",
      "Transformez le devis en commande, puis en facture.",
      "Générez la facture en PDF et vérifiez les mentions.",
      "Établissez un avoir pour annuler partiellement une facture validée.",
    ],
    goal: "Établir un devis, le transformer en commande puis en facture, et corriger une erreur avec un avoir.",
    video: "Dolibarr : devis, commande et facture client",
  }),
  lesson({
    id: 8,
    title: "Dolibarr : règlements, banque et impayés",
    subtitle: "Enregistrer les paiements, suivre la trésorerie et relancer.",
    sections: [
      {
        heading: "Enregistrer un règlement",
        body: [
          "Ouvrez la facture validée, puis cliquez sur Saisir règlement.",
          "Choisissez la date, le mode de paiement (virement, espèces, mobile money, chèque) et le compte bancaire ou la caisse.",
          "Si le montant est inférieur au total, la facture reste « commencée » ; si elle est entièrement réglée, elle passe en « payée ».",
          "Chaque règlement alimente le compte de banque ou de caisse choisi.",
        ],
      },
      {
        heading: "Banque et caisse",
        body: [
          "Menu Banque | Caisse : créez un compte pour chaque banque, chaque caisse et chaque compte mobile money.",
          "Les mouvements (encaissements, décaissements) apparaissent dans la liste des écritures du compte.",
          "Le rapprochement bancaire compare le relevé de la banque avec les écritures du logiciel.",
          "Le solde du logiciel doit correspondre au solde réel après rapprochement.",
        ],
      },
      {
        heading: "Suivre les impayés",
        body: [
          "La liste des factures clients permet de filtrer les factures impayées et en retard.",
          "Notez la date d'échéance de chaque facture et envoyez une relance dès qu'elle est dépassée.",
          "Gardez la trace des relances dans l'agenda du client.",
          "Un client en retard trop souvent peut recevoir des conditions de paiement plus strictes.",
        ],
      },
      {
        heading: "Contrôler les chiffres",
        body: [
          "Comparez le total des règlements avec les encaissements réels de la caisse et de la banque.",
          "Les écarts doivent être expliqués : erreur de saisie, paiement oublié ou frais bancaires.",
          "Exportez la liste des factures et des règlements pour les analyser dans Excel.",
          "Ne supprimez jamais un règlement sans en comprendre la raison : annulez-le avec une trace.",
        ],
      },
    ],
    caseTitle: "Les paiements de la semaine",
    caseLines: [
      "L'école Bonne Étoile paie 300 000 FC par virement : Neema saisit le règlement, la facture reste en partie ouverte.",
      "Un parent règle son achat en espèces : le paiement est enregistré dans le compte Caisse.",
      "En fin de semaine, Neema filtre les factures en retard et envoie trois relances polies.",
      "Elle rapproche le relevé bancaire de son logiciel : tous les montants correspondent.",
    ],
    tasks: [
      "Enregistrez un règlement partiel puis le solde d'une facture.",
      "Créez trois comptes : banque, caisse et mobile money.",
      "Listez les factures impayées et préparez un message de relance.",
      "Comparez les écritures d'un compte avec un relevé fictif et expliquez un écart.",
    ],
    goal: "Enregistrer les règlements, tenir les comptes de banque et de caisse et relancer les impayés.",
    video: "Dolibarr : paiements, banque et factures impayées",
  }),
  lesson({
    id: 9,
    title: "Dolibarr : achats et fournisseurs",
    subtitle: "Commander, recevoir et payer ses fournisseurs.",
    sections: [
      {
        heading: "Le cycle des achats",
        body: [
          "Demande de prix ou commande fournisseur, réception de la marchandise, facture fournisseur, règlement.",
          "Activez les modules Fournisseurs (commandes et factures) dans la configuration.",
          "Chaque fournisseur a sa fiche, avec ses conditions de paiement et ses prix d'achat.",
          "La symétrie avec la vente aide à retenir les étapes : c'est le même circuit, dans l'autre sens.",
        ],
      },
      {
        heading: "Commander",
        body: [
          "Menu Achats (ou Commandes fournisseurs) > Nouvelle commande : choisissez le fournisseur.",
          "Ajoutez les produits avec les quantités et le prix d'achat convenu.",
          "Validez puis approuvez la commande : certains droits permettent à un responsable de l'autoriser.",
          "Envoyez la commande au fournisseur et notez la date de livraison prévue.",
        ],
      },
      {
        heading: "Réceptionner et enregistrer la facture",
        body: [
          "À la livraison, comparez la marchandise avec la commande : quantité, qualité, état.",
          "Enregistrez la réception : le stock augmente si la gestion de stock est activée.",
          "Créez la facture fournisseur depuis la commande, avec le numéro de la facture reçue.",
          "Contrôlez que le total correspond à celui de la facture papier du fournisseur.",
        ],
      },
      {
        heading: "Payer les fournisseurs",
        body: [
          "Saisissez le règlement sur la facture fournisseur, avec le compte bancaire ou la caisse utilisé.",
          "Suivez les échéances pour ne pas payer trop tard ni trop tôt.",
          "Un bon suivi des dettes fournisseurs évite les pénalités et protège la relation de confiance.",
          "Comparez les prix des fournisseurs avant de commander à nouveau.",
        ],
      },
    ],
    caseTitle: "Réapprovisionner la boutique",
    caseLines: [
      "Le stock de cahiers de Neema baisse : elle commande 500 cahiers chez son fournisseur habituel.",
      "À la livraison, elle compte les cartons et signale qu'il en manque un ; elle ne valide la réception que pour ce qu'elle a reçu.",
      "Elle enregistre la facture fournisseur et vérifie qu'elle correspond à la livraison.",
      "Elle règle la facture à l'échéance par virement : la dette est soldée.",
    ],
    tasks: [
      "Créez une commande fournisseur de trois produits et validez-la.",
      "Enregistrez la réception partielle de la commande.",
      "Créez la facture fournisseur correspondante et saisissez son règlement.",
      "Comparez deux fournisseurs fictifs sur le prix et le délai.",
    ],
    goal: "Suivre un achat de la commande au paiement du fournisseur.",
    video: "Dolibarr : commandes et factures fournisseurs",
  }),
  lesson({
    id: 10,
    title: "Dolibarr : stocks et entrepôts",
    subtitle: "Suivre les entrées, les sorties et l'inventaire.",
    sections: [
      {
        heading: "Principes du stock",
        body: [
          "Le stock est la quantité d'un produit en réserve, dans un ou plusieurs entrepôts.",
          "Chaque entrée (achat, retour client) augmente le stock ; chaque sortie (vente, casse) le diminue.",
          "Les mouvements de stock gardent l'historique : date, quantité, motif, utilisateur.",
          "Seuls les produits (et non les services) sont stockés.",
        ],
      },
      {
        heading: "Entrepôts et mouvements",
        body: [
          "Menu Stocks > Nouvel entrepôt : créez un entrepôt par lieu (magasin, dépôt).",
          "Les réceptions fournisseurs et les expéditions clients créent des mouvements automatiquement.",
          "Une correction de stock sert à ajuster une quantité après un comptage ; un transfert déplace un produit d'un entrepôt à un autre.",
          "Indiquez toujours le motif d'un mouvement manuel.",
        ],
      },
      {
        heading: "Seuils et alertes",
        body: [
          "Le seuil d'alerte est la quantité minimale souhaitée : en dessous, le produit est signalé.",
          "Le stock désiré est la quantité à retrouver après un réapprovisionnement.",
          "Le logiciel peut proposer la liste des produits à recommander.",
          "Un bon seuil évite la rupture (plus de produit) comme le surstock (trop de produit immobilisé).",
        ],
      },
      {
        heading: "L'inventaire",
        body: [
          "L'inventaire compare le stock du logiciel avec le comptage réel des produits sur les étagères.",
          "Comptez à deux personnes et notez les quantités sur une feuille de comptage.",
          "Saisissez les écarts dans le logiciel : le stock se corrige et l'écart est tracé.",
          "Cherchez toujours la cause d'un écart : vol, casse, erreur de livraison ou erreur de saisie.",
        ],
      },
    ],
    caseTitle: "L'inventaire de fin de mois",
    caseLines: [
      "À la fin du mois, Neema et son employé comptent tous les articles de la boutique.",
      "Le logiciel indique 320 stylos, mais ils n'en comptent que 312 : ils notent l'écart de 8 stylos.",
      "Ils cherchent la cause : un carton de stylos abîmés avait été jeté sans être enregistré.",
      "Neema corrige le stock avec le motif « casse » et règle le seuil d'alerte à 100 stylos.",
    ],
    tasks: [
      "Créez deux entrepôts et transférez cinq articles de l'un à l'autre.",
      "Réglez un seuil d'alerte sur trois produits.",
      "Faites une correction de stock avec un motif écrit.",
      "Préparez une feuille de comptage pour un inventaire de dix articles.",
    ],
    goal: "Suivre les mouvements de stock, régler les seuils et réaliser un inventaire.",
    video: "Dolibarr : gestion de stock et inventaire",
  }),
  lesson({
    id: 11,
    title: "Dolibarr : CRM, agenda et tableaux de bord",
    subtitle: "Suivre les prospects, les rendez-vous et les indicateurs.",
    sections: [
      {
        heading: "Suivre les prospects",
        body: [
          "Le CRM (gestion de la relation client) garde l'historique de tous les contacts avec un prospect ou un client.",
          "Un prospect passe par des étapes : premier contact, proposition, négociation, signature.",
          "Dolibarr permet de créer des opportunités liées à un tiers, avec un montant et un état.",
          "Mettre à jour l'état régulièrement permet de prévoir le chiffre d'affaires à venir.",
        ],
      },
      {
        heading: "L'agenda",
        body: [
          "L'agenda enregistre les rendez-vous, les appels et les tâches à faire.",
          "Liez chaque événement à un tiers ou à un contact pour retrouver l'historique.",
          "Les rappels évitent d'oublier de relancer un devis ou une facture.",
          "L'agenda peut être partagé avec l'équipe.",
        ],
      },
      {
        heading: "Les projets",
        body: [
          "Un projet regroupe des tâches, des documents et des factures autour d'un même objectif (une installation, un contrat).",
          "Chaque tâche a un responsable, une date limite et un avancement.",
          "On peut rattacher les devis et factures à un projet pour mesurer sa rentabilité.",
          "Les projets sont utiles pour les entreprises de services.",
        ],
      },
      {
        heading: "Lire les indicateurs",
        body: [
          "Le tableau de bord de l'accueil affiche les propositions à traiter, les factures en retard et les commandes à livrer.",
          "Les statistiques montrent les ventes par mois, par client et par produit.",
          "Les listes se filtrent et s'exportent en fichier pour une analyse plus poussée.",
          "Regardez les indicateurs chaque semaine : ils servent à décider, pas seulement à contrôler.",
        ],
      },
    ],
    caseTitle: "La réunion du lundi",
    caseLines: [
      "Chaque lundi, Neema ouvre le tableau de bord : deux devis attendent une réponse et quatre factures sont en retard.",
      "Elle planifie dans l'agenda un appel avec chaque client concerné.",
      "Elle consulte les ventes du mois par produit et constate que les stylos se vendent mieux que prévu.",
      "Elle décide d'augmenter son stock de stylos avant la rentrée.",
    ],
    tasks: [
      "Créez deux opportunités liées à des prospects et faites évoluer leur état.",
      "Planifiez trois événements d'agenda avec rappel.",
      "Créez un projet avec trois tâches et un responsable.",
      "Notez cinq indicateurs du tableau de bord et ce que chacun vous apprend.",
    ],
    goal: "Utiliser le CRM, l'agenda, les projets et les indicateurs pour piloter l'activité.",
    video: "Dolibarr : CRM, agenda et tableau de bord",
  }),
  lesson({
    id: 12,
    title: "Révision finale et mini-projet",
    subtitle: "Gérer une petite entreprise de bout en bout dans un logiciel.",
    sections: [
      {
        heading: "Ce que vous avez appris",
        body: [
          "Les bases d'un logiciel de gestion : modules, fiches, droits, base de données.",
          "Les notions de comptabilité : partie double, plan OHADA, TVA.",
          "Le cycle commercial : devis, commande, livraison, facture, règlement.",
          "Dolibarr : configuration, tiers, produits, ventes, banque, achats, stock, CRM.",
        ],
      },
      {
        heading: "Le mini-projet",
        body: [
          "Créez votre société fictive avec son logo, sa monnaie et ses utilisateurs.",
          "Enregistrez cinq clients, trois fournisseurs et dix produits.",
          "Réalisez deux ventes complètes (devis, commande, facture, règlement) et un achat complet.",
          "Faites un inventaire, corrigez le stock et analysez les indicateurs.",
        ],
      },
      {
        heading: "La liste de contrôle",
        body: [
          "Toutes les fiches sont complètes et sans doublon.",
          "Les factures ont les bons montants, la bonne TVA et les bonnes échéances.",
          "Les paiements sont enregistrés dans le bon compte.",
          "Le stock du logiciel correspond au comptage réel.",
        ],
      },
      {
        heading: "Pour aller plus loin",
        body: [
          "Au niveau 2, vous découvrirez la comptabilité informatisée avec Sage et un premier ERP, Odoo.",
          "Au niveau 3, vous approfondirez Odoo, la douane, l'audit et la sécurité des données.",
          "Entraînez-vous régulièrement avec une entreprise fictive de votre choix.",
          "Demandez l'avis d'un comptable ou d'un gestionnaire sur vos résultats.",
        ],
      },
    ],
    caseTitle: "Un mois de gestion",
    caseLines: [
      "Neema gère maintenant sa boutique dans Dolibarr : clients, produits, ventes, achats et stock sont à jour.",
      "En fin de mois, elle exporte la liste de ses ventes et la compare à l'argent réellement encaissé.",
      "Elle constate un écart de 20 000 FC : un paiement en espèces n'avait pas été saisi.",
      "Elle corrige le règlement et garde cette habitude : tout paiement est enregistré le jour même.",
    ],
    tasks: [
      "Réalisez le mini-projet complet avec votre entreprise fictive.",
      "Imprimez ou exportez votre liste de ventes du mois et comparez-la à vos encaissements.",
      "Vérifiez la liste de contrôle et corrigez les erreurs trouvées.",
      "Présentez votre projet à un collègue en cinq minutes.",
    ],
    goal: "Gérer une petite entreprise fictive de bout en bout dans un logiciel de gestion.",
    video: "Gérer une petite entreprise avec un logiciel de gestion",
  }),
];

export const quizzesB = [
  quiz(7, "Quiz 7 — Dolibarr : ventes", "Devis, commande et facture", [
    ["Dans quel menu crée-t-on un devis ?", "Commercial > Propositions commerciales", "Banque > Caisse", "Stocks > Inventaire"],
    ["Que fait la validation d'un devis ?", "Elle lui donne un numéro et il quitte l'état de brouillon", "Elle le supprime", "Elle l'envoie au fournisseur"],
    ["Que permet « Créer facture » depuis la commande ?", "Reprendre les lignes sans les ressaisir", "Effacer la commande", "Changer le client"],
    ["Que faire en cas d'erreur sur une facture validée ?", "Établir un avoir", "La supprimer sans trace", "La cacher"],
    ["Quand peut-on corriger librement une facture ?", "Tant qu'elle est en brouillon", "Jamais", "Après l'avoir payée"],
    ["Que signifie classer un devis « signé » ?", "Le client a accepté le devis", "Le devis est annulé", "Le devis est payé"],
    ["Où retrouve-t-on les documents d'un client ?", "Dans l'onglet Documents de sa fiche", "Dans le menu Éteindre", "Dans la Corbeille de Windows"],
    ["Que contrôler avant de valider une facture ?", "Les quantités, les prix, la TVA et les conditions", "La couleur du logo seulement", "La météo"],
    ["Pourquoi les documents gardent-ils un lien entre eux ?", "Pour remonter l'histoire complète d'une vente", "Pour ralentir le logiciel", "Pour supprimer des fiches"],
    ["Comment envoyer un devis au client ?", "En PDF par e-mail depuis le logiciel", "Par un appel sans trace", "En le supprimant"],
  ]),
  quiz(8, "Quiz 8 — Dolibarr : règlements et banque", "Paiements, comptes et impayés", [
    ["Où saisit-on un paiement client ?", "Sur la facture validée, avec Saisir règlement", "Dans le menu Éteindre", "Dans la fiche produit"],
    ["Que devient une facture partiellement payée ?", "Elle reste ouverte pour le reste à payer", "Elle est supprimée", "Elle devient un avoir"],
    ["Quel compte utiliser pour un paiement en espèces ?", "Un compte de caisse", "Un compte de stock", "Un compte client"],
    ["À quoi sert le rapprochement bancaire ?", "Comparer le relevé de la banque avec les écritures du logiciel", "Changer la banque", "Imprimer les factures"],
    ["Que faire quand une facture est en retard ?", "Envoyer une relance et garder la trace", "L'oublier", "La supprimer"],
    ["Comment retrouver les factures impayées ?", "Avec les filtres de la liste des factures", "En les cherchant dans la corbeille", "Impossible"],
    ["Que faire d'un écart entre la banque et le logiciel ?", "En chercher la cause : oubli, erreur ou frais", "Le supprimer sans l'expliquer", "Fermer le logiciel"],
    ["Pourquoi créer un compte pour le mobile money ?", "Pour suivre les encaissements faits par ce canal", "Pour payer moins de TVA", "Pour supprimer la caisse"],
    ["Que faire plutôt que supprimer un règlement erroné ?", "L'annuler avec une trace", "Le cacher", "Le doubler"],
    ["Pourquoi exporter les règlements ?", "Pour les analyser dans Excel", "Pour les effacer", "Pour changer de client"],
  ]),
  quiz(9, "Quiz 9 — Dolibarr : achats", "Commandes et factures fournisseurs", [
    ["Quel est l'ordre normal d'un achat ?", "Commande, réception, facture fournisseur, règlement", "Règlement, commande, réception, facture", "Facture, règlement, commande, réception"],
    ["Que faire à la livraison d'une commande ?", "Comparer la marchandise avec la commande", "Ne rien contrôler", "Jeter l'emballage tout de suite"],
    ["Que fait la réception d'une commande fournisseur ?", "Elle augmente le stock si la gestion de stock est activée", "Elle supprime la facture", "Elle réduit la TVA"],
    ["Pourquoi vérifier la facture fournisseur ?", "Pour s'assurer que le total correspond à la livraison", "Pour changer le logo", "Pour supprimer le fournisseur"],
    ["Où saisit-on le paiement d'un fournisseur ?", "Sur la facture fournisseur", "Dans la fiche client", "Dans l'agenda"],
    ["Pourquoi suivre les échéances fournisseurs ?", "Pour ne pas payer trop tard ni trop tôt", "Pour augmenter les prix", "Pour supprimer des produits"],
    ["Que gagne-t-on à comparer plusieurs fournisseurs ?", "De meilleurs prix et délais", "Une fiche supplémentaire seulement", "Rien"],
    ["Qui peut approuver une commande ?", "Une personne qui en a le droit", "N'importe quel visiteur", "Le fournisseur seul"],
    ["Que faire si un carton manque à la livraison ?", "Ne valider la réception que pour ce qui est reçu et le signaler", "Valider tout sans rien dire", "Refaire le devis du client"],
    ["Que veut dire dette fournisseur ?", "L'argent que l'entreprise doit encore à ses fournisseurs", "L'argent que les clients doivent", "Le stock disponible"],
  ]),
  quiz(10, "Quiz 10 — Dolibarr : stocks", "Mouvements, seuils et inventaire", [
    ["Qu'est-ce qu'un entrepôt dans Dolibarr ?", "Un lieu où sont stockés les produits", "Un type de facture", "Un utilisateur"],
    ["Que fait une vente de produit stocké ?", "Elle diminue le stock", "Elle augmente le stock", "Elle ne change rien"],
    ["Peut-on stocker un service ?", "Non, seuls les produits sont stockés", "Oui, toujours", "Seulement en dollars"],
    ["À quoi sert un seuil d'alerte ?", "À signaler un produit dont le stock est trop bas", "À changer le prix", "À supprimer le produit"],
    ["Que fait une correction de stock ?", "Elle ajuste une quantité après un comptage", "Elle supprime l'entrepôt", "Elle envoie une facture"],
    ["Que fait un transfert de stock ?", "Déplacer un produit d'un entrepôt à un autre", "Vendre le produit", "Changer la monnaie"],
    ["Que compare l'inventaire ?", "Le stock du logiciel et le comptage réel", "Deux factures", "Deux clients"],
    ["Que faire d'un écart d'inventaire ?", "Corriger le stock et chercher la cause", "L'ignorer", "Supprimer les fiches"],
    ["Pourquoi compter à deux personnes ?", "Pour réduire les erreurs de comptage", "Pour aller plus vite sans vérifier", "Pour ne pas utiliser de feuille"],
    ["Quel risque présente une rupture de stock ?", "Perdre des ventes faute de produit", "Gagner de la TVA", "Réduire les dettes"],
  ]),
  quiz(11, "Quiz 11 — Dolibarr : CRM et indicateurs", "Prospects, agenda, projets", [
    ["Que veut dire CRM ?", "Gestion de la relation client", "Contrôle des réseaux mobiles", "Compte rendu mensuel"],
    ["Qu'est-ce qu'une opportunité ?", "Une vente possible liée à un prospect, avec un montant et un état", "Une facture payée", "Un produit en stock"],
    ["À quoi sert l'agenda ?", "Planifier rendez-vous, appels et tâches", "Imprimer les factures", "Supprimer les clients"],
    ["Pourquoi lier un événement à un tiers ?", "Pour retrouver l'historique avec ce client", "Pour le supprimer", "Pour changer sa TVA"],
    ["Qu'est-ce qu'un projet dans Dolibarr ?", "Un ensemble de tâches et de documents autour d'un objectif", "Un type de produit", "Un compte bancaire"],
    ["Que montre le tableau de bord ?", "Les devis à traiter, les factures en retard, les commandes à livrer", "Les photos de l'équipe", "La liste des mots de passe"],
    ["Comment utiliser les statistiques de vente ?", "Pour décider quoi réapprovisionner ou promouvoir", "Pour les cacher", "Pour supprimer des clients"],
    ["À quelle fréquence regarder les indicateurs ?", "Régulièrement, par exemple chaque semaine", "Jamais", "Une fois en dix ans"],
    ["Que permet d'exporter une liste ?", "L'analyser dans Excel", "La rendre illisible", "La supprimer"],
    ["Pourquoi mettre à jour l'état des opportunités ?", "Pour prévoir le chiffre d'affaires à venir", "Pour ralentir le logiciel", "Pour changer le logo"],
  ]),
  quiz(12, "Quiz 12 — Révision du niveau 1", "Notions, comptabilité et Dolibarr", [
    ["Que veut dire ERP ?", "Progiciel de gestion intégré", "Éditeur de rapports publics", "Écran rapide professionnel"],
    ["Quelle est l'écriture d'une vente à crédit ?", "Débit Clients, crédit Ventes (et TVA)", "Débit Ventes, crédit Banque", "Débit Stock, crédit Caisse"],
    ["Quel document demande le paiement au client ?", "La facture", "Le bon de livraison", "Le devis"],
    ["Comment corriger une facture validée ?", "Avec un avoir", "En la supprimant sans trace", "En changeant le client"],
    ["Quel module suit les quantités de produits ?", "Stocks", "Agenda", "Projets"],
    ["Quel taux de TVA est le taux normal en RDC ?", "16 %", "5 %", "50 %"],
    ["Quelle formule donne le prix TTC ?", "HT + TVA", "HT − TVA", "TVA × 2"],
    ["Pourquoi donner des droits adaptés aux utilisateurs ?", "Chacun ne voit que ce qui correspond à son rôle", "Pour supprimer des fiches", "Pour ralentir le logiciel"],
    ["Pourquoi sauvegarder la base de données ?", "Pour pouvoir restaurer en cas de problème", "Pour changer de couleur", "Pour ajouter des produits"],
    ["Que faut-il faire de chaque paiement reçu ?", "L'enregistrer le jour même dans le bon compte", "Le garder dans un tiroir sans le noter", "Le supprimer"],
  ]),
];

export const final1 = finalQuiz(
  "Quiz final — Niveau 1 Gestion informatisée",
  "Notions, comptabilité, cycle commercial et Dolibarr",
  [
    ["À quoi sert un logiciel de gestion ?", "À enregistrer et relier les informations de l'entreprise", "À remplacer les clients", "À créer des images"],
    ["Qu'est-ce qu'un module ?", "Une partie du logiciel dédiée à un métier", "Un mot de passe", "Une facture"],
    ["Quelle est la règle de la partie double ?", "Le total des débits égale le total des crédits", "Le débit est toujours nul", "Le crédit dépasse toujours le débit"],
    ["Quel compte OHADA correspond aux clients ?", "411", "401", "701"],
    ["Quel compte OHADA correspond aux ventes de marchandises ?", "701", "601", "571"],
    ["Combien vaut 200 HT avec 16 % de TVA, TTC ?", "232", "216", "200,16"],
    ["Quel est le bon ordre de la vente ?", "Devis, commande, livraison, facture, règlement", "Facture, devis, livraison, commande", "Règlement, devis, commande, facture"],
    ["Qu'est-ce qu'un avoir ?", "Une facture négative qui corrige ou annule une facture", "Un nouveau client", "Un bon de commande"],
    ["Qu'est-ce qu'un prospect ?", "Un client potentiel qui n'a pas encore acheté", "Un fournisseur", "Un employé"],
    ["Quel menu active les modules de Dolibarr ?", "Configuration > Modules", "Outils > Éteindre", "Banque > Caisse"],
    ["Que fait la validation d'une facture ?", "Elle lui donne son numéro définitif et empêche la modification libre", "Elle la supprime", "Elle la transforme en devis"],
    ["Que faire d'un paiement partiel ?", "Enregistrer le règlement ; le reste reste à payer", "Supprimer la facture", "Ignorer le paiement"],
    ["À quoi sert le rapprochement bancaire ?", "Comparer le relevé de la banque avec les écritures", "Changer de banque", "Imprimer le catalogue"],
    ["Que permet l'import CSV ?", "Créer de nombreuses fiches rapidement", "Supprimer la base", "Changer les droits"],
    ["Que fait une réception de commande fournisseur ?", "Elle augmente le stock", "Elle diminue la TVA", "Elle supprime le fournisseur"],
    ["À quoi sert un seuil d'alerte de stock ?", "Signaler un produit à réapprovisionner", "Augmenter les prix", "Fermer l'entrepôt"],
    ["Que compare un inventaire ?", "Le stock du logiciel avec le comptage réel", "Deux devis", "Deux employés"],
    ["Que veut dire CRM ?", "Gestion de la relation client", "Compte de résultat mensuel", "Contrôle des réseaux"],
    ["Pourquoi regarder les indicateurs chaque semaine ?", "Pour décider et corriger à temps", "Pour les cacher", "Pour supprimer les clients"],
    ["Pourquoi enregistrer chaque paiement le jour même ?", "Pour garder des chiffres justes", "Pour payer moins de taxes illégalement", "Pour changer de logiciel"],
  ]
);
