import { finalQuiz, lesson, quiz } from "../bureautique/builders";

// Niveau 2 · Comptabilité informatisée et premier ERP — leçons 7 à 12 : clôture, gestion commerciale, Odoo.
// Les écrans exacts varient selon les versions de Sage et d'Odoo ; les principes restent les mêmes.

export const lessonsB2 = [
  lesson({
    id: 7,
    title: "Sage : clôture mensuelle et immobilisations",
    subtitle: "Contrôler les comptes, régulariser et amortir les biens durables.",
    sections: [
      {
        heading: "La clôture mensuelle",
        body: [
          "Avant de clôturer un mois, vérifiez que toutes les pièces sont saisies, lettrées et rapprochées.",
          "Contrôlez la balance : totaux égaux, comptes de tiers sans solde anormal, caisse jamais négative.",
          "Faites les régularisations : charges payées d'avance, charges à payer, produits à recevoir.",
          "Verrouillez la période pour qu'on ne puisse plus la modifier par erreur, puis sauvegardez.",
        ],
      },
      {
        heading: "Les immobilisations",
        body: [
          "Une immobilisation est un bien durable acheté pour servir plusieurs années : ordinateur, véhicule, machine, meuble.",
          "Elle est enregistrée en classe 2 (par exemple matériel informatique) et non en charge.",
          "Elle perd de la valeur avec le temps et l'usage : c'est l'amortissement.",
          "Une fiche d'immobilisation garde la date d'achat, le prix, la durée d'utilisation et le mode d'amortissement.",
        ],
      },
      {
        heading: "Calculer l'amortissement",
        body: [
          "L'amortissement linéaire répartit le coût du bien en parts égales sur sa durée d'utilisation.",
          "Annuité = valeur du bien ÷ durée en années. Exemple : 3 000 000 FC sur 5 ans = 600 000 FC par an.",
          "L'écriture débite une dotation aux amortissements (charge, classe 6) et crédite un compte d'amortissement (classe 2).",
          "Les logiciels d'immobilisations calculent les annuités et génèrent les écritures.",
        ],
      },
      {
        heading: "Sortir un bien",
        body: [
          "Quand un bien est vendu ou mis au rebut, on le sort de l'actif et on constate le gain ou la perte.",
          "La valeur nette comptable est le prix d'achat moins les amortissements cumulés.",
          "Conservez la facture d'achat, la fiche de l'immobilisation et le justificatif de la sortie.",
          "Faites un inventaire physique des immobilisations au moins une fois par an.",
        ],
      },
    ],
    caseTitle: "Le nouvel ordinateur de la boutique",
    caseLines: [
      "Neema achète un ordinateur de 3 000 000 FC pour la boutique : elle l'enregistre en immobilisation et non en dépense.",
      "Elle choisit un amortissement linéaire sur cinq ans, soit 600 000 FC par an.",
      "Avant de clôturer le mois, elle vérifie la balance et enregistre une charge payée d'avance : l'assurance de l'année.",
      "Elle verrouille la période et sauvegarde le dossier.",
    ],
    tasks: [
      "Calculez l'annuité d'amortissement d'un bien de 4 500 000 FC amorti sur 3 ans.",
      "Enregistrez l'achat d'une immobilisation et créez sa fiche.",
      "Préparez la liste de contrôle d'une clôture mensuelle de dix points.",
      "Expliquez la différence entre une charge et une immobilisation.",
    ],
    goal: "Clôturer une période en sécurité et amortir une immobilisation.",
    video: "Sage : clôture et immobilisations",
  }),
  lesson({
    id: 8,
    title: "La gestion commerciale dans Sage",
    subtitle: "Devis, factures, stocks et transfert en comptabilité.",
    sections: [
      {
        heading: "À quoi sert la gestion commerciale",
        body: [
          "Elle gère les articles, les clients, les devis, les commandes, les livraisons, les factures et le stock.",
          "Elle fonctionne comme le cycle commercial : un document engendre le suivant sans ressaisie.",
          "Elle est reliée à la comptabilité : les factures peuvent être transférées en écritures comptables.",
          "Elle s'utilise seule ou avec le logiciel de comptabilité du même éditeur.",
        ],
      },
      {
        heading: "Articles et tarifs",
        body: [
          "Chaque article a une référence, un libellé, une famille, un prix d'achat, un prix de vente et un taux de TVA.",
          "On peut créer plusieurs tarifs (détail, gros, client particulier) et des remises.",
          "Le compte comptable de vente et d'achat de l'article est paramétré pour automatiser les écritures.",
          "Le stock se suit par article et par dépôt.",
        ],
      },
      {
        heading: "Du devis à la facture",
        body: [
          "Créez le devis, transformez-le en commande, en bon de livraison puis en facture.",
          "À la livraison, le stock diminue ; à la réception d'un achat, il augmente.",
          "La facture contient les mentions légales et calcule les totaux HT, TVA et TTC.",
          "Les règlements clients sont saisis et rattachés aux factures.",
        ],
      },
      {
        heading: "Transfert en comptabilité",
        body: [
          "Le transfert (ou intégration) génère les écritures de vente, de TVA et de règlement dans la comptabilité.",
          "Contrôlez les paramètres de comptes avant le premier transfert.",
          "Après transfert, vérifiez la balance : les ventes de la gestion commerciale doivent correspondre à celles de la comptabilité.",
          "Évitez de saisir deux fois la même opération (dans les deux logiciels).",
        ],
      },
    ],
    caseTitle: "Une seule saisie pour tout",
    caseLines: [
      "Neema utilise la gestion commerciale : elle crée un devis pour une école, le transforme en facture et le stock baisse tout seul.",
      "En fin de semaine, elle transfère les factures vers la comptabilité.",
      "Elle contrôle que le total des ventes de la balance correspond au total des factures.",
      "Elle gagne du temps : plus besoin de ressaisir chaque facture dans la comptabilité.",
    ],
    tasks: [
      "Créez dix articles avec leur famille, leur prix et leur TVA.",
      "Réalisez un cycle complet devis, livraison, facture pour un client fictif.",
      "Simulez un transfert en comptabilité et listez les écritures obtenues.",
      "Comparez le total des ventes de la gestion commerciale et celui de la comptabilité.",
    ],
    goal: "Utiliser la gestion commerciale et expliquer son lien avec la comptabilité.",
    video: "Sage : gestion commerciale, devis et facturation",
  }),
  lesson({
    id: 9,
    title: "Odoo : découvrir l'ERP",
    subtitle: "Comprendre les applications d'Odoo et se repérer dans l'interface.",
    sections: [
      {
        heading: "Qu'est-ce qu'Odoo",
        body: [
          "Odoo est un ERP modulaire : ventes, achats, stock, comptabilité, CRM, ressources humaines, projets, site web, etc.",
          "Toutes les applications partagent la même base de données : une vente met à jour le stock et la comptabilité.",
          "Il existe une édition Community (libre) et une édition Enterprise (payante, avec plus de fonctions).",
          "Il s'utilise dans un navigateur, en ligne (hébergé) ou sur un serveur de l'entreprise.",
        ],
      },
      {
        heading: "L'interface",
        body: [
          "Le menu principal (icône en haut à gauche) affiche les applications installées.",
          "Chaque application a ses menus : opérations, rapports, configuration.",
          "Les listes se filtrent, se regroupent, s'exportent et se trient.",
          "Les vues disponibles : liste, kanban (cartes), calendrier, graphique, tableau croisé.",
        ],
      },
      {
        heading: "Installer et configurer",
        body: [
          "Dans Applications, installez uniquement celles dont vous avez besoin.",
          "Dans Paramètres, renseignez la société : nom, logo, adresse, monnaie, taxes.",
          "Créez les utilisateurs et attribuez-leur des droits par application.",
          "Choisissez le pays pour charger le plan comptable et les taxes adaptés.",
        ],
      },
      {
        heading: "Premiers réflexes",
        body: [
          "Enregistrez toujours une fiche avant de quitter ; Odoo enregistre aussi automatiquement dans certains cas.",
          "Utilisez la barre de recherche pour retrouver un client, un produit ou un document.",
          "Le chatter (zone de messages en bas ou à droite d'une fiche) garde l'historique des échanges et des actions.",
          "Faites des essais sur une base de démonstration avant de saisir des données réelles.",
        ],
      },
    ],
    caseTitle: "Une journée de découverte",
    caseLines: [
      "Neema crée une base d'essai Odoo avec des données de démonstration.",
      "Elle ouvre successivement les applications Ventes, Achats, Inventaire et Facturation.",
      "Elle remarque que chaque application garde l'historique des messages dans le chatter.",
      "Elle décide d'installer d'abord les applications Ventes, Achats et Inventaire, et d'ajouter les autres plus tard.",
    ],
    tasks: [
      "Créez une base d'essai Odoo (ou utilisez une démonstration).",
      "Ouvrez cinq applications et décrivez leur rôle en une phrase.",
      "Passez d'une vue liste à une vue kanban dans une application.",
      "Créez un utilisateur et attribuez-lui les droits de l'application Ventes.",
    ],
    goal: "Se repérer dans Odoo, installer des applications et paramétrer la société.",
    video: "Odoo : découverte et prise en main",
  }),
  lesson({
    id: 10,
    title: "Odoo : ventes et facturation",
    subtitle: "Du devis à la facture client dans Odoo.",
    sections: [
      {
        heading: "Clients et produits",
        body: [
          "Dans Contacts (ou Ventes > Clients), créez les clients avec leurs coordonnées et conditions de paiement.",
          "Dans Produits, créez les articles : nom, prix de vente, taxes, catégorie et type (biens ou services).",
          "Pour suivre le stock, choisissez le type de produit qui gère l'inventaire.",
          "Des listes de prix permettent d'appliquer des tarifs selon le client.",
        ],
      },
      {
        heading: "Le devis",
        body: [
          "Ventes > Devis > Nouveau : choisissez le client, ajoutez les lignes (produit, quantité, prix, remise).",
          "Envoyez le devis par e-mail ou aperçu client ; le client peut aussi le signer en ligne selon la configuration.",
          "Cliquez sur Confirmer : le devis devient un bon de commande.",
          "Le chatter garde la trace des envois et des modifications.",
        ],
      },
      {
        heading: "Livraison et facture",
        body: [
          "À la confirmation, Odoo peut créer automatiquement un ordre de livraison dans l'application Inventaire.",
          "Cliquez sur Créer une facture : choisissez facture normale, acompte ou facture sur quantités livrées.",
          "Validez la facture : elle reçoit son numéro et son écriture comptable est générée.",
          "Enregistrez le paiement : la facture passe à l'état payée.",
        ],
      },
      {
        heading: "Suivre les ventes",
        body: [
          "Le rapport des ventes montre le chiffre d'affaires par période, par client, par produit.",
          "Les filtres et regroupements permettent d'analyser en quelques clics.",
          "Les factures en retard apparaissent dans les listes de suivi : pensez à relancer.",
          "Un avoir corrige une facture validée.",
        ],
      },
    ],
    caseTitle: "Une vente dans Odoo",
    caseLines: [
      "Neema crée un devis pour l'école Bonne Étoile : 200 cahiers et 100 stylos.",
      "L'école accepte : elle confirme le devis, ce qui crée la livraison dans l'Inventaire.",
      "Après la livraison, elle crée la facture, la valide et enregistre le paiement reçu par virement.",
      "Elle ouvre le rapport des ventes et voit son chiffre d'affaires du mois augmenter.",
    ],
    tasks: [
      "Créez trois clients et cinq produits dans Odoo.",
      "Établissez un devis, confirmez-le et créez la facture.",
      "Enregistrez le paiement d'une facture et vérifiez son statut.",
      "Utilisez le rapport des ventes pour trouver votre meilleur produit.",
    ],
    goal: "Réaliser une vente complète dans Odoo, du devis au paiement.",
    video: "Odoo : ventes, devis et facturation",
  }),
  lesson({
    id: 11,
    title: "Odoo : achats et inventaire",
    subtitle: "Commander, recevoir et suivre le stock dans Odoo.",
    sections: [
      {
        heading: "Les achats",
        body: [
          "Achats > Demandes de prix > Nouveau : choisissez le fournisseur et les produits à commander.",
          "Confirmez la commande : elle devient un bon de commande envoyé au fournisseur.",
          "Les prix d'achat peuvent être enregistrés par fournisseur sur la fiche produit.",
          "Les règles de réapprovisionnement peuvent proposer automatiquement des commandes.",
        ],
      },
      {
        heading: "Réception et facture fournisseur",
        body: [
          "À la livraison, validez la réception dans l'Inventaire : le stock augmente.",
          "Contrôlez les quantités reçues ; une livraison partielle crée un reliquat.",
          "Créez la facture fournisseur depuis la commande et comparez-la à la facture papier.",
          "Enregistrez le paiement à l'échéance.",
        ],
      },
      {
        heading: "Le stock",
        body: [
          "L'application Inventaire gère les emplacements (entrepôts), les mouvements et les quantités.",
          "Opérations : réceptions, livraisons, transferts internes et ajustements d'inventaire.",
          "Le stock prévisionnel tient compte des commandes en cours : le stock réel moins les ventes, plus les achats attendus.",
          "Les ajustements d'inventaire corrigent le stock après comptage, avec une raison.",
        ],
      },
      {
        heading: "Valorisation et suivi",
        body: [
          "La valorisation donne la valeur monétaire du stock : quantité multipliée par le coût.",
          "Les méthodes de coût courantes : prix standard, coût moyen, premier entré premier sorti.",
          "Les rapports de stock montrent les mouvements, les produits en rupture et ceux qui dorment.",
          "Les numéros de lot ou de série permettent de tracer des produits sensibles.",
        ],
      },
    ],
    caseTitle: "Le réapprovisionnement",
    caseLines: [
      "Le stock de cahiers descend sous le minimum : Neema crée une demande de prix de 500 cahiers et la confirme.",
      "À la livraison, 450 cahiers arrivent : elle valide la réception partielle, il reste 50 cahiers à recevoir.",
      "Elle crée la facture fournisseur et la compare à la livraison.",
      "Elle fait un ajustement d'inventaire pour les cahiers abîmés trouvés dans un carton.",
    ],
    tasks: [
      "Créez une commande fournisseur de trois produits et confirmez-la.",
      "Validez une réception partielle et notez le reliquat.",
      "Faites un ajustement d'inventaire avec une raison écrite.",
      "Consultez le rapport de valorisation du stock et notez la valeur totale.",
    ],
    goal: "Réaliser un achat complet et suivre le stock et sa valeur dans Odoo.",
    video: "Odoo : achats, réception et gestion de stock",
  }),
  lesson({
    id: 12,
    title: "Révision du niveau 2 et projet",
    subtitle: "Comptabilité informatisée et ERP : un dossier complet.",
    sections: [
      {
        heading: "Ce que vous avez appris",
        body: [
          "Sage : dossier, plan comptable, journaux, tiers, saisie des factures, banque, lettrage, états, clôture.",
          "Les immobilisations et l'amortissement linéaire.",
          "La gestion commerciale et son transfert en comptabilité.",
          "Odoo : ventes, achats, inventaire, rapports.",
        ],
      },
      {
        heading: "Le projet",
        body: [
          "Dans Sage, créez le dossier d'une société fictive et saisissez un mois d'opérations (au moins vingt écritures).",
          "Lettrez les clients, faites un rapprochement bancaire et éditez la balance.",
          "Dans Odoo, réalisez une vente complète et un achat complet pour la même société.",
          "Comparez les chiffres : les ventes et les achats doivent être cohérents entre les deux logiciels.",
        ],
      },
      {
        heading: "Les erreurs à éviter",
        body: [
          "Saisir sans pièce justificative.",
          "Oublier la TVA ou utiliser le mauvais code taxe.",
          "Ne pas rapprocher la banque avant de clôturer.",
          "Supprimer des écritures au lieu de passer une écriture de correction.",
        ],
      },
      {
        heading: "Présenter vos résultats",
        body: [
          "Préparez une page de synthèse : chiffre d'affaires, charges, résultat, créances, dettes, trésorerie.",
          "Joignez la balance et le rapprochement bancaire.",
          "Expliquez les écarts et vos choix de paramétrage.",
          "Demandez l'avis d'un comptable : un regard extérieur rassure.",
        ],
      },
    ],
    caseTitle: "Le dossier de fin de mois",
    caseLines: [
      "Neema remet à son comptable la balance de janvier, le rapprochement bancaire et la balance âgée.",
      "Le comptable constate que les totaux sont égaux et que la banque est rapprochée.",
      "Il lui conseille de relancer deux clients en retard et de clôturer le mois.",
      "Neema verrouille la période et prépare février avec le même rythme de travail.",
    ],
    tasks: [
      "Réalisez le projet Sage d'un mois d'opérations fictives.",
      "Réalisez dans Odoo une vente et un achat complets.",
      "Rédigez la page de synthèse du mois avec six indicateurs.",
      "Présentez votre travail à un collègue en cinq minutes.",
    ],
    goal: "Tenir la comptabilité d'une société fictive dans Sage et réaliser des opérations dans Odoo.",
    video: "Comptabilité informatisée : exercice complet",
  }),
];

export const quizzesB2 = [
  quiz(7, "Quiz 7 — Clôture et immobilisations", "Contrôles, amortissement linéaire", [
    ["Que vérifier avant de clôturer un mois ?", "Que les pièces sont saisies, lettrées et rapprochées", "La couleur du logiciel", "Le nom du fichier"],
    ["Qu'est-ce qu'une immobilisation ?", "Un bien durable qui sert plusieurs années", "Une dépense de papeterie", "Un client"],
    ["Dans quelle classe enregistre-t-on une immobilisation ?", "La classe 2", "La classe 7", "La classe 1"],
    ["Qu'est-ce que l'amortissement ?", "La perte de valeur d'un bien avec le temps et l'usage", "Un nouveau prêt", "Une remise du client"],
    ["Combien est l'annuité linéaire de 3 000 000 FC sur 5 ans ?", "600 000 FC", "500 000 FC", "1 500 000 FC"],
    ["Que fait le verrouillage d'une période ?", "Il empêche les modifications par erreur", "Il supprime la période", "Il crée une nouvelle société"],
    ["Qu'est-ce que la valeur nette comptable ?", "Le prix d'achat moins les amortissements cumulés", "Le prix de vente", "La TVA"],
    ["Que fait-on lors de la vente d'un bien amorti ?", "On le sort de l'actif et on constate le gain ou la perte", "On le laisse en immobilisation", "On supprime l'exercice"],
    ["Qu'est-ce qu'une charge payée d'avance ?", "Une dépense payée mais qui concerne une période suivante", "Une vente annulée", "Un impôt"],
    ["À quelle fréquence inventorier physiquement les immobilisations ?", "Au moins une fois par an", "Jamais", "Tous les dix ans"],
  ]),
  quiz(8, "Quiz 8 — Gestion commerciale", "Articles, documents, transfert", [
    ["Que gère la gestion commerciale ?", "Articles, clients, devis, factures et stock", "Uniquement les salaires", "Les images du site"],
    ["Que fait un document par rapport au suivant ?", "Il l'engendre sans ressaisie", "Il le supprime", "Il le copie à la main"],
    ["Que fait la livraison d'un article suivi en stock ?", "Elle diminue le stock", "Elle augmente la TVA", "Elle supprime le client"],
    ["À quoi sert un tarif ?", "À appliquer des prix différents selon la clientèle", "À changer le logo", "À imprimer"],
    ["Que fait le transfert en comptabilité ?", "Il génère les écritures de vente, de TVA et de règlement", "Il supprime les factures", "Il crée des clients"],
    ["Que contrôler avant le premier transfert ?", "Les paramètres de comptes", "La couleur du fond", "Le nom de l'imprimante"],
    ["Quel danger y a-t-il à saisir deux fois une opération ?", "Fausser les chiffres par un doublon", "Gagner du temps", "Réduire la TVA"],
    ["Que faut-il comparer après un transfert ?", "Les ventes de la gestion commerciale et celles de la comptabilité", "Deux photos", "Deux calendriers"],
    ["Que doit contenir un article ?", "Référence, libellé, prix, TVA et compte comptable", "Seulement un nom", "Une couleur"],
    ["Pourquoi associer des comptes comptables aux articles ?", "Pour automatiser les écritures", "Pour supprimer le stock", "Pour augmenter la TVA"],
  ]),
  quiz(9, "Quiz 9 — Odoo : découverte", "Applications et interface", [
    ["Qu'est-ce qu'Odoo ?", "Un ERP modulaire", "Un antivirus", "Un navigateur"],
    ["Où se trouvent les applications installées ?", "Dans le menu principal", "Dans la Corbeille", "Dans l'imprimante"],
    ["Que partagent les applications d'Odoo ?", "La même base de données", "Rien du tout", "Le même mot de passe seulement"],
    ["Quelle est la différence entre Community et Enterprise ?", "L'une est libre, l'autre payante avec plus de fonctions", "Aucune différence", "L'une n'a pas de ventes"],
    ["Que fait la vue kanban ?", "Elle affiche des cartes", "Elle supprime les listes", "Elle imprime"],
    ["Que garde le chatter ?", "L'historique des échanges et des actions", "Les mots de passe", "Les images du bureau"],
    ["Pourquoi choisir le pays de la société ?", "Pour charger le plan comptable et les taxes adaptés", "Pour changer la langue du clavier", "Pour supprimer la base"],
    ["Pourquoi tester sur une base de démonstration ?", "Pour apprendre sans risque pour les vraies données", "Pour gagner de l'argent", "Pour supprimer Odoo"],
    ["Comment retrouver rapidement un client ?", "Avec la barre de recherche", "En redémarrant l'ordinateur", "En changeant la monnaie"],
    ["Comment limiter l'accès d'un utilisateur ?", "En lui donnant des droits par application", "En supprimant son ordinateur", "En changeant le logo"],
  ]),
  quiz(10, "Quiz 10 — Odoo : ventes", "Devis, commande, facture", [
    ["Que fait « Confirmer » sur un devis ?", "Il le transforme en bon de commande", "Il le supprime", "Il l'imprime en noir et blanc"],
    ["Quelle application contient les livraisons ?", "L'Inventaire", "Le Calendrier", "Le Site web"],
    ["Que faut-il valider avant d'enregistrer un paiement ?", "La facture", "Le logo", "La langue"],
    ["Que peut-on faire pour corriger une facture validée ?", "Créer un avoir", "La supprimer sans trace", "Changer le client"],
    ["Que montre le rapport des ventes ?", "Le chiffre d'affaires par période, client et produit", "Les mots de passe", "La météo"],
    ["Que permet une liste de prix ?", "Appliquer des tarifs selon le client", "Changer de monnaie", "Supprimer des produits"],
    ["Que génère la validation d'une facture ?", "Son numéro et son écriture comptable", "Un nouveau client", "Une sauvegarde"],
    ["Pourquoi relancer les factures en retard ?", "Pour récupérer l'argent dû", "Pour changer de logiciel", "Pour augmenter les taxes"],
    ["Que choisir pour un produit dont on suit le stock ?", "Le type qui gère l'inventaire", "Le type service", "Le type vide"],
    ["Où voit-on l'historique d'un devis ?", "Dans le chatter", "Dans la barre des tâches", "Dans l'imprimante"],
  ]),
  quiz(11, "Quiz 11 — Odoo : achats et stock", "Réception, inventaire, valorisation", [
    ["Quelle est la première étape d'un achat dans Odoo ?", "La demande de prix", "Le paiement", "La facture client"],
    ["Que fait la validation d'une réception ?", "Elle augmente le stock", "Elle diminue le stock", "Elle supprime la commande"],
    ["Qu'est-ce qu'un reliquat ?", "Ce qui reste à recevoir d'une commande partielle", "Un paiement en retard", "Un client"],
    ["Que fait un ajustement d'inventaire ?", "Il corrige le stock après comptage", "Il supprime l'entrepôt", "Il crée une facture client"],
    ["Que veut dire stock prévisionnel ?", "Le stock réel tenant compte des commandes en cours", "Le prix d'achat", "Le nombre d'employés"],
    ["Que donne la valorisation du stock ?", "La valeur monétaire du stock", "Le nombre de clients", "La TVA"],
    ["Que permet un numéro de lot ?", "Tracer des produits", "Changer le prix", "Supprimer les ventes"],
    ["Quel rapport signale les produits en rupture ?", "Le rapport de stock", "Le rapport des couleurs", "Le rapport de connexion"],
    ["Que faire de la facture fournisseur ?", "La comparer à la livraison et à la facture papier", "L'ignorer", "La supprimer"],
    ["Que proposent les règles de réapprovisionnement ?", "Des commandes automatiques selon un minimum", "Des remises clients", "Des factures"],
  ]),
  quiz(12, "Quiz 12 — Révision du niveau 2", "Sage et ERP", [
    ["Que faut-il garder pour chaque écriture ?", "La pièce justificative", "Rien", "Une photo de l'écran"],
    ["Quel compte débite-t-on pour un client qui paie par banque ?", "Le compte de banque", "Le compte de ventes", "Le compte d'achats"],
    ["Que montre la balance âgée ?", "L'ancienneté des créances ou des dettes", "Les couleurs des produits", "Les départs en congé"],
    ["À quoi sert le lettrage ?", "Associer facture et règlement", "Écrire une lettre", "Fermer l'exercice"],
    ["Que calcule l'amortissement linéaire ?", "Des parts égales sur la durée du bien", "La TVA", "Le stock"],
    ["Quelle application d'Odoo gère les entrepôts ?", "L'Inventaire", "Le Calendrier", "Les Contacts"],
    ["Que faire avant de clôturer ?", "Vérifier la balance et le rapprochement", "Éteindre l'ordinateur", "Supprimer des pièces"],
    ["Quel mois de comptabilité peut-on modifier après verrouillage ?", "Aucun, sans réouverture", "Tous", "Seulement le premier"],
    ["Quel est le bon ordre d'une vente dans Odoo ?", "Devis, confirmation, livraison, facture, paiement", "Paiement, devis, facture", "Facture, livraison, devis"],
    ["Pourquoi comparer deux logiciels sur le même cas ?", "Pour vérifier la cohérence des chiffres", "Pour supprimer l'un des deux", "Pour changer de client"],
  ]),
];

export const final2 = finalQuiz(
  "Quiz final — Niveau 2 Comptabilité et ERP",
  "Sage, immobilisations, gestion commerciale et Odoo",
  [
    ["Que regroupe un dossier dans Sage ?", "Les données comptables d'une société", "Les photos d'un site", "Les vidéos d'un film"],
    ["Quel plan comptable utilise-t-on en RDC ?", "OHADA (SYSCOHADA)", "Aucun", "Un plan américain"],
    ["Quel code désigne le journal de banque ?", "BQ", "VTE", "ACH"],
    ["Quel compte collectif regroupe les clients ?", "411", "401", "571"],
    ["Que débite-t-on pour une vente TTC ?", "Le client", "Le fournisseur", "Les achats"],
    ["Que crédite-t-on pour la TVA d'une vente ?", "La TVA facturée", "Le capital", "Les stocks"],
    ["Combien vaut le TTC d'un achat de 100 HT avec 16 % de TVA ?", "116", "100,16", "84"],
    ["Qu'est-ce que le lettrage ?", "L'association d'une facture et de son règlement", "L'envoi d'un courrier", "La suppression d'écritures"],
    ["Que compare le rapprochement bancaire ?", "Le relevé de la banque et le compte de banque", "Deux balances âgées", "Deux clients"],
    ["Que doit valoir le total des soldes débiteurs de la balance ?", "Le total des soldes créditeurs", "Zéro", "Le nombre de journaux"],
    ["Que fait la balance âgée ?", "Elle classe les créances par ancienneté", "Elle imprime les affiches", "Elle crée les utilisateurs"],
    ["Quelle est l'annuité d'un bien de 600 000 FC sur 3 ans ?", "200 000 FC", "300 000 FC", "1 800 000 FC"],
    ["Qu'est-ce qu'une immobilisation ?", "Un bien durable utilisé plusieurs années", "Une dépense quotidienne", "Un salaire"],
    ["Que fait le transfert en comptabilité ?", "Il génère les écritures depuis la gestion commerciale", "Il crée des produits", "Il imprime le logo"],
    ["Qu'est-ce qu'Odoo ?", "Un ERP modulaire", "Un antivirus", "Un navigateur"],
    ["Que fait « Confirmer » sur un devis dans Odoo ?", "Il le transforme en bon de commande", "Il l'efface", "Il le met en PDF"],
    ["Que fait la validation d'une réception fournisseur ?", "Elle augmente le stock", "Elle réduit la TVA", "Elle supprime le fournisseur"],
    ["Que garde le chatter d'Odoo ?", "L'historique des échanges et actions", "Les mots de passe", "Les photos de profil seulement"],
    ["Pourquoi tester sur une base de démonstration ?", "Pour apprendre sans risquer les vraies données", "Pour supprimer des clients", "Pour changer de pays"],
    ["Que faut-il toujours conserver à l'appui d'une écriture ?", "La pièce justificative", "Un brouillon sans date", "Rien"],
  ]
);
