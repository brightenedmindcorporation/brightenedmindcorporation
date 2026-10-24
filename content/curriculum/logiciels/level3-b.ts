import { finalQuiz, lesson, quiz } from "../bureautique/builders";

// Niveau 3 · ERP avancé et spécialisations — leçons 7 à 12 : douane, guichet unique, audit et projet final.
// Les procédures douanières, le guichet unique et les logiciels d'audit sont présentés dans leurs principes généraux :
// les écrans, les formulaires et les règles précises sont ceux de l'administration ou de l'éditeur, à confirmer avec le formateur.

export const lessonsB3 = [
  lesson({
    id: 7,
    title: "Les opérations douanières : notions de base",
    subtitle: "Importer et exporter : régimes, tarif douanier, valeur et taxes.",
    sections: [
      {
        heading: "Pourquoi une douane",
        body: [
          "La douane contrôle les marchandises qui entrent dans un pays (importation) et en sortent (exportation).",
          "Elle perçoit des droits et taxes, protège les consommateurs et applique les règles du commerce international.",
          "Le déclarant en douane (ou commissionnaire agréé) prépare et dépose les déclarations pour le compte de l'importateur ou de l'exportateur.",
          "Chaque opération laisse des documents à conserver : ils servent de preuve en cas de contrôle.",
        ],
      },
      {
        heading: "Le tarif douanier",
        body: [
          "Chaque marchandise est classée dans une position du Système harmonisé (code SH) à plusieurs chiffres.",
          "Le classement détermine le taux des droits de douane et les taxes à payer.",
          "Un classement erroné peut causer des redressements et des amendes.",
          "En cas de doute, demandez l'avis de l'administration ou d'un déclarant expérimenté.",
        ],
      },
      {
        heading: "La valeur en douane",
        body: [
          "Les droits se calculent sur la valeur en douane : en général le prix de la marchandise, plus le transport et l'assurance jusqu'à la frontière.",
          "Cette valeur est souvent exprimée en CIF (coût, assurance, fret) à l'importation.",
          "Les conditions de vente internationales (Incoterms) précisent qui paie quoi : transport, assurance, formalités.",
          "La facture commerciale, le connaissement ou la lettre de transport et la liste de colisage justifient la valeur et la marchandise.",
        ],
      },
      {
        heading: "Les droits et taxes",
        body: [
          "Droits de douane : un pourcentage de la valeur en douane, selon le code SH.",
          "Autres taxes possibles : TVA à l'importation, redevances, frais de service.",
          "Le total à payer s'appelle la liquidation.",
          "Les taux changent : vérifiez toujours la réglementation en vigueur.",
        ],
      },
    ],
    caseTitle: "Importer des cahiers",
    caseLines: [
      "Neema veut importer 5 000 cahiers pour la rentrée et demande l'aide d'un déclarant en douane.",
      "Le déclarant lui demande la facture du fournisseur, le document de transport et la liste de colisage.",
      "Il classe les cahiers dans la bonne position du tarif et calcule la valeur en douane avec le transport et l'assurance.",
      "Neema comprend le montant des droits et taxes à payer avant même l'arrivée de la marchandise.",
    ],
    tasks: [
      "Expliquez avec vos mots la différence entre importation et exportation.",
      "Listez les documents nécessaires à une déclaration d'importation.",
      "Calculez la valeur CIF : prix 10 000 USD, transport 800 USD, assurance 200 USD.",
      "Expliquez pourquoi le classement tarifaire doit être précis.",
    ],
    goal: "Comprendre les notions de base de l'importation et de l'exportation : tarif, valeur en douane, droits et documents.",
    video: "Les opérations douanières : importation, exportation et droits",
  }),
  lesson({
    id: 8,
    title: "La déclaration en douane avec Sydonia",
    subtitle: "Les grandes étapes d'une déclaration dans un système douanier informatisé.",
    sections: [
      {
        heading: "Un système douanier informatisé",
        body: [
          "SYDONIA est un système informatisé de gestion douanière utilisé dans de nombreux pays pour traiter les déclarations.",
          "Il enregistre les déclarations, les calcule, les contrôle et suit leur paiement.",
          "L'accès se fait avec un compte personnel dont les droits dépendent du rôle : déclarant, agent, vérificateur.",
          "Les écrans exacts dépendent de la version déployée par l'administration douanière.",
        ],
      },
      {
        heading: "Préparer la déclaration",
        body: [
          "Rassemblez les documents : facture commerciale, document de transport, liste de colisage, certificat d'origine si nécessaire, licence ou autorisation éventuelle.",
          "Vérifiez les noms, adresses et numéros d'identification de l'importateur, du fournisseur et du transporteur.",
          "Déterminez le code SH, l'origine, la valeur, le poids et le régime douanier de chaque article.",
          "Préparez à l'avance les informations pour limiter les erreurs de saisie.",
        ],
      },
      {
        heading: "Les étapes générales",
        body: [
          "Saisie de la déclaration : en-tête, articles, valeurs, documents joints.",
          "Enregistrement : la déclaration reçoit un numéro et le système calcule les droits et taxes.",
          "Circuit de contrôle : acceptation directe, contrôle documentaire ou vérification physique selon le risque.",
          "Liquidation et paiement, puis bon à enlever : la marchandise peut être retirée.",
        ],
      },
      {
        heading: "Éviter les erreurs",
        body: [
          "Une erreur de code, de valeur ou d'origine peut entraîner des pénalités.",
          "Relisez chaque champ avant l'enregistrement : après enregistrement, la correction demande une procédure.",
          "Gardez une copie de la déclaration, de la quittance et des documents liés.",
          "Respectez les délais de dépôt et de dédouanement pour éviter les frais de stockage.",
        ],
      },
    ],
    caseTitle: "Le dossier des cahiers",
    caseLines: [
      "Le déclarant de Neema rassemble tous les documents avant de saisir la déclaration.",
      "Il enregistre la déclaration, qui reçoit un numéro et calcule les droits et taxes à payer.",
      "Le circuit de contrôle demande un contrôle documentaire : il apporte les originaux demandés.",
      "Après paiement, il reçoit le bon à enlever et Neema peut récupérer ses cartons au port.",
    ],
    tasks: [
      "Listez les informations qu'il faut avoir avant de commencer une déclaration.",
      "Mettez dans l'ordre : enregistrement, saisie, paiement, bon à enlever, contrôle.",
      "Expliquez ce qui peut se passer en cas d'erreur de classement.",
      "Préparez une liste de contrôle de dix points avant l'enregistrement d'une déclaration.",
    ],
    goal: "Décrire les étapes d'une déclaration en douane dans un système informatisé et préparer un dossier sans erreur.",
    video: "Sydonia : déclaration en douane, étapes et dédouanement",
  }),
  lesson({
    id: 9,
    title: "Le guichet unique du commerce extérieur",
    subtitle: "Un seul point d'entrée pour les formalités d'import-export.",
    sections: [
      {
        heading: "Le principe du guichet unique",
        body: [
          "Sans guichet unique, l'importateur ou l'exportateur doit se rendre dans plusieurs administrations pour chaque opération.",
          "Le guichet unique est une plateforme électronique où l'on dépose une fois les documents et les demandes.",
          "Les administrations concernées (douane, commerce, normes, santé, transport) y traitent leur partie.",
          "Le but : réduire les délais, les coûts et les risques d'erreur ou de corruption.",
        ],
      },
      {
        heading: "Les démarches typiques",
        body: [
          "Créer son compte d'opérateur avec les documents de l'entreprise (identification, registre de commerce).",
          "Déposer les demandes de documents préalables : déclaration d'importation, licence, certificat, autorisation sanitaire selon la marchandise.",
          "Suivre l'état d'avancement de chaque demande en ligne.",
          "Payer les frais par les moyens indiqués et conserver les reçus.",
        ],
      },
      {
        heading: "Les bonnes pratiques de conformité",
        body: [
          "Fournissez des informations exactes et cohérentes entre tous les documents.",
          "Respectez les délais de validité des autorisations.",
          "Tenez un dossier par opération avec tous les justificatifs.",
          "Ne payez jamais de sommes non prévues par les barèmes officiels : demandez un reçu officiel.",
        ],
      },
      {
        heading: "Travailler avec les partenaires",
        body: [
          "Le transitaire, la banque et la compagnie de transport interviennent dans le processus.",
          "Échangez les documents de façon sûre et vérifiez leur authenticité.",
          "Informez rapidement l'équipe en cas de blocage ou de demande de précision.",
          "La procédure exacte et les écrans sont ceux de la plateforme officielle du pays : suivez les instructions de l'administration.",
        ],
      },
    ],
    caseTitle: "Un dossier sans aller-retour",
    caseLines: [
      "Neema dépose en ligne sa demande d'importation avec la facture et les documents de l'entreprise.",
      "Elle suit l'avancement : la demande est acceptée par l'administration concernée en deux jours.",
      "Elle paie les frais officiels et garde les reçus dans le dossier de l'opération.",
      "Grâce à la plateforme, elle n'a plus à faire le tour des bureaux pour chaque importation.",
    ],
    tasks: [
      "Expliquez les avantages d'un guichet unique pour une entreprise et pour l'État.",
      "Listez les documents d'une entreprise pour créer un compte d'opérateur.",
      "Décrivez comment organiser le dossier d'une opération d'importation.",
      "Expliquez quoi faire si on vous demande un paiement qui ne figure pas sur un barème officiel.",
    ],
    goal: "Expliquer le rôle d'un guichet unique du commerce extérieur et préparer un dossier conforme.",
    video: "Le guichet unique du commerce extérieur : principes et démarches",
  }),
  lesson({
    id: 10,
    title: "Audit et contrôle de gestion",
    subtitle: "Vérifier les comptes et piloter l'entreprise avec des chiffres.",
    sections: [
      {
        heading: "Audit et contrôle interne",
        body: [
          "L'audit est un examen indépendant qui vérifie si les comptes sont réguliers et si les règles sont respectées.",
          "L'audit externe est réalisé par un cabinet indépendant ; l'audit interne par un service de l'entreprise.",
          "Le contrôle interne regroupe les règles de l'entreprise pour éviter les erreurs et les fraudes : séparation des tâches, validations, rapprochements.",
          "Un bon contrôle interne rend l'audit plus simple et la gestion plus sûre.",
        ],
      },
      {
        heading: "La démarche d'audit",
        body: [
          "Planifier : comprendre l'entreprise, repérer les risques et choisir les points à contrôler.",
          "Tester : examiner les pièces, rapprocher les comptes, contrôler des échantillons d'opérations.",
          "Conclure : relever les écarts, évaluer leur importance et rédiger un rapport.",
          "La piste d'audit est le chemin qui permet de retrouver une opération depuis les états jusqu'à la pièce justificative.",
        ],
      },
      {
        heading: "Le contrôle de gestion",
        body: [
          "Il compare le budget (ce qui était prévu) avec le réalisé (ce qui s'est passé) et analyse les écarts.",
          "Il utilise des indicateurs : chiffre d'affaires, marge, coût, trésorerie, délai de paiement des clients.",
          "Le tableau de bord présente ces indicateurs simplement pour le dirigeant.",
          "Il aide à décider : investir, réduire un coût, changer un prix.",
        ],
      },
      {
        heading: "Les indicateurs essentiels",
        body: [
          "Marge brute = chiffre d'affaires − coût d'achat des marchandises vendues.",
          "Taux de marge = marge ÷ coût d'achat. Taux de marque = marge ÷ prix de vente.",
          "Seuil de rentabilité : le chiffre d'affaires à partir duquel l'entreprise ne perd plus d'argent.",
          "Trésorerie : l'argent disponible ; une entreprise rentable peut manquer de trésorerie si les clients paient tard.",
        ],
      },
    ],
    caseTitle: "Le budget de la boutique",
    caseLines: [
      "Neema avait prévu 10 000 000 FC de ventes pour le trimestre ; elle en a réalisé 8 500 000.",
      "Elle analyse l'écart : les ventes de cahiers sont conformes, mais celles de stylos sont en retard.",
      "Elle calcule sa marge brute et constate que les remises accordées ont réduit son bénéfice.",
      "Elle décide de limiter les remises et d'animer la vente de stylos le mois suivant.",
    ],
    tasks: [
      "Calculez la marge brute et le taux de marge d'un produit acheté 800 FC et vendu 1 000 FC.",
      "Expliquez la différence entre audit interne et audit externe.",
      "Comparez un budget et un réalisé de votre choix, et expliquez l'écart.",
      "Citez trois mesures de contrôle interne pour une petite entreprise.",
    ],
    goal: "Expliquer la démarche d'audit, le contrôle interne et calculer les indicateurs de gestion de base.",
    video: "Audit et contrôle de gestion : notions essentielles",
  }),
  lesson({
    id: 11,
    title: "Logiciels d'audit et de comptabilité spécialisée",
    subtitle: "Utiliser des outils informatiques pour contrôler les comptes.",
    sections: [
      {
        heading: "À quoi servent ces logiciels",
        body: [
          "Les logiciels d'audit aident l'auditeur à planifier la mission, à analyser les données comptables et à conserver ses feuilles de travail.",
          "Des logiciels de comptabilité spécialisés répondent aux besoins d'un secteur ou d'un type d'organisation (projets, associations, institutions).",
          "Ils importent les données d'un logiciel comptable : balance, grand livre, journaux.",
          "Les fonctions exactes dépendent de l'éditeur : suivez le manuel et la formation du logiciel utilisé.",
        ],
      },
      {
        heading: "Fonctions courantes",
        body: [
          "Import des données comptables et contrôle de leur cohérence (totaux, équilibre débit-crédit).",
          "Tests automatiques : doublons, numérotation manquante, écritures hors période, montants inhabituels.",
          "Sélection d'échantillons pour vérifier les pièces.",
          "Feuilles de travail et notes liées à chaque compte, et génération de rapports.",
        ],
      },
      {
        heading: "Une mission pas à pas",
        body: [
          "Importez la balance et comparez-la avec celle du logiciel comptable de l'entreprise.",
          "Lancez les contrôles automatiques et examinez chaque anomalie : toute anomalie n'est pas une faute.",
          "Choisissez un échantillon de factures et vérifiez leurs pièces.",
          "Rédigez vos constats et classez toutes les preuves dans le dossier de mission.",
        ],
      },
      {
        heading: "Éthique et confidentialité",
        body: [
          "L'auditeur doit être indépendant, honnête et objectif.",
          "Les informations de l'entreprise sont confidentielles : n'en parlez pas à des tiers.",
          "Conservez les données de façon sûre et supprimez les copies inutiles à la fin de la mission.",
          "Signalez les fraudes selon la procédure prévue : jamais de règlement de comptes personnel.",
        ],
      },
    ],
    caseTitle: "Contrôler un exercice",
    caseLines: [
      "Un auditeur reçoit les données comptables de la boutique de Neema pour contrôler son exercice.",
      "Le logiciel signale deux factures en doublon et un numéro de pièce manquant.",
      "L'auditeur examine les pièces : l'une des factures est un vrai doublon, l'autre est un paiement par tranches.",
      "Il rédige ses constats dans un rapport et recommande à Neema de contrôler les doublons avant chaque clôture.",
    ],
    tasks: [
      "Listez cinq contrôles automatiques utiles à un auditeur.",
      "Décrivez comment choisir un échantillon de dix factures à vérifier.",
      "Expliquez pourquoi une anomalie signalée par un logiciel n'est pas forcément une erreur.",
      "Rédigez un constat d'audit en trois lignes à partir d'un exemple de doublon.",
    ],
    goal: "Utiliser les fonctions générales d'un logiciel d'audit et respecter l'éthique de la mission.",
    video: "Logiciels d'audit : contrôler et analyser des comptes",
  }),
  lesson({
    id: 12,
    title: "Révision finale et projet de fin de formation",
    subtitle: "Un dossier complet de gestion informatisée.",
    sections: [
      {
        heading: "Ce que vous avez appris",
        body: [
          "Niveau 1 : notions de gestion, comptabilité OHADA, cycle commercial, Dolibarr.",
          "Niveau 2 : Sage, comptabilité informatisée, immobilisations, gestion commerciale, Odoo ventes et stock.",
          "Niveau 3 : Odoo comptabilité, CRM, RH, projets, sécurité, douane, guichet unique, audit.",
          "Une même idée relie tout : des informations justes, saisies une fois, utilisées par tous.",
        ],
      },
      {
        heading: "Le projet final",
        body: [
          "Choisissez une entreprise fictive (commerce, service, import-export).",
          "Paramétrez-la dans un ERP : société, clients, produits, utilisateurs et droits.",
          "Réalisez le cycle complet : vente, achat, stock, paiement, rapprochement bancaire.",
          "Produisez un tableau de bord et un rapport de contrôle interne.",
        ],
      },
      {
        heading: "Le dossier à rendre",
        body: [
          "Un document de présentation de l'entreprise et de ses choix de paramétrage.",
          "Les captures ou exports des principales opérations et des états (balance, balance âgée, stock).",
          "La liste de vos règles de sécurité et de sauvegarde.",
          "Une conclusion : ce qui a bien marché, les erreurs rencontrées et les améliorations possibles.",
        ],
      },
      {
        heading: "Continuer à progresser",
        body: [
          "Pratiquez régulièrement sur des cas réels ou fictifs : la maîtrise vient de la répétition.",
          "Suivez les évolutions des logiciels et de la réglementation locale.",
          "Échangez avec des comptables, des douaniers et des gestionnaires pour confirmer vos pratiques.",
          "Gardez toujours le même réflexe : vérifier avant de valider.",
        ],
      },
    ],
    caseTitle: "Le grand bilan",
    caseLines: [
      "Un an après avoir commencé la formation, Neema gère sa boutique avec un ERP : ventes, achats, stock et comptabilité sont reliés.",
      "Elle suit ses indicateurs chaque semaine et relance ses clients en retard avec méthode.",
      "Elle a pu importer ses cahiers avec l'aide d'un déclarant, sans mauvaise surprise sur les droits.",
      "Elle forme maintenant son employé à utiliser les mêmes outils avec les mêmes règles de sécurité.",
    ],
    tasks: [
      "Réalisez le projet final complet avec votre entreprise fictive.",
      "Rédigez le dossier à rendre en suivant la liste ci-dessus.",
      "Présentez votre projet en dix minutes et répondez aux questions.",
      "Faites relire votre dossier par un comptable ou un gestionnaire.",
    ],
    goal: "Concevoir et présenter un dossier complet de gestion informatisée d'une entreprise.",
    video: "Projet de fin de formation en gestion informatisée",
  }),
];

export const quizzesB3 = [
  quiz(7, "Quiz 7 — Opérations douanières", "Importation, tarif, valeur et taxes", [
    ["Que contrôle la douane ?", "Les marchandises qui entrent et sortent d'un pays", "Les salaires des employés", "Les résultats sportifs"],
    ["Qu'est-ce qu'un déclarant en douane ?", "Une personne qui prépare et dépose les déclarations", "Un client", "Un vendeur de cahiers"],
    ["Que détermine le code SH ?", "Le classement tarifaire et donc les taux des droits", "Le prix d'une facture", "La couleur du colis"],
    ["Que signifie CIF ?", "Coût, assurance, fret", "Contrat, impôt, facture", "Commande, import, fournisseur"],
    ["Quelle est la valeur CIF d'une marchandise de 10 000 avec 800 de transport et 200 d'assurance ?", "11 000", "10 000", "10 800"],
    ["Que précisent les Incoterms ?", "Qui paie quoi dans une vente internationale", "La langue du contrat", "Le nom du navire"],
    ["Quels documents justifient la valeur et la marchandise ?", "Facture commerciale, document de transport, liste de colisage", "Une photo du colis seulement", "Un ticket de caisse"],
    ["Que peut causer un classement tarifaire erroné ?", "Des redressements et des amendes", "Une remise", "Un cadeau"],
    ["Que veut dire liquidation ?", "Le calcul et le total des droits et taxes à payer", "La fermeture de l'entreprise", "La vente du stock"],
    ["Pourquoi conserver les documents d'une opération ?", "Ils servent de preuve en cas de contrôle", "Pour décorer le bureau", "Pour réduire la taxe"],
  ]),
  quiz(8, "Quiz 8 — Déclaration informatisée", "Étapes d'une déclaration en douane", [
    ["Qu'est-ce que Sydonia ?", "Un système douanier informatisé", "Un logiciel de retouche photo", "Un logiciel de paie"],
    ["Quelle étape donne un numéro à la déclaration ?", "L'enregistrement", "Le paiement", "La livraison"],
    ["Que fait le circuit de contrôle ?", "Il détermine acceptation, contrôle documentaire ou vérification physique", "Il supprime les droits", "Il change le prix"],
    ["Quand la marchandise peut-elle être retirée ?", "Après le paiement et le bon à enlever", "Avant tout contrôle", "Dès la saisie"],
    ["Que faut-il préparer avant de saisir ?", "Les documents et les informations de chaque article", "Rien", "Seulement le nom du client"],
    ["Pourquoi relire avant l'enregistrement ?", "La correction après enregistrement demande une procédure", "Pour changer de logiciel", "Pour supprimer la facture"],
    ["Que peut entraîner une erreur de valeur ou d'origine ?", "Des pénalités", "Une promotion", "Une réduction"],
    ["Pourquoi respecter les délais de dédouanement ?", "Pour éviter des frais de stockage", "Pour augmenter la TVA", "Pour changer de port"],
    ["Que garder après la déclaration ?", "La déclaration, la quittance et les documents liés", "Rien", "Seulement la photo du colis"],
    ["Qui détermine les droits d'accès dans le système ?", "Le rôle de l'utilisateur", "La couleur de l'écran", "Le nom du port"],
  ]),
  quiz(9, "Quiz 9 — Guichet unique", "Démarches et conformité", [
    ["Quel est le principe du guichet unique ?", "Déposer une fois ses documents sur une plateforme commune", "Aller dans chaque bureau", "Se passer de documents"],
    ["Quel est un objectif du guichet unique ?", "Réduire les délais, les coûts et les erreurs", "Augmenter les files d'attente", "Supprimer les contrôles"],
    ["Que faut-il pour créer un compte d'opérateur ?", "Les documents d'identification de l'entreprise", "Un nom de fantaisie", "Aucun document"],
    ["Que faire pour suivre une demande ?", "Consulter son avancement en ligne", "Attendre sans rien vérifier", "Refaire la demande chaque jour"],
    ["Que faire si on vous demande un paiement non prévu par le barème ?", "Refuser et demander un reçu officiel pour toute somme officielle", "Payer sans rien dire", "Cacher la demande"],
    ["Pourquoi garder un dossier par opération ?", "Pour disposer de tous les justificatifs", "Pour remplir une armoire", "Pour augmenter les frais"],
    ["Que doivent être les informations entre les documents ?", "Exactes et cohérentes", "Différentes", "Vides"],
    ["Que faire en cas de blocage ?", "Informer rapidement l'équipe et demander des précisions", "Abandonner", "Changer de pays"],
    ["Qui intervient aussi dans le processus ?", "Le transitaire, la banque et le transporteur", "Seulement les clients", "Personne"],
    ["Que faut-il suivre pour les écrans exacts ?", "Les instructions de l'administration", "Un tutoriel d'un autre pays", "Un message anonyme"],
  ]),
  quiz(10, "Quiz 10 — Audit et contrôle de gestion", "Contrôle interne, budget, indicateurs", [
    ["Qu'est-ce que l'audit ?", "Un examen indépendant de la régularité des comptes", "Une vente", "Un type de produit"],
    ["Qui réalise l'audit externe ?", "Un cabinet indépendant", "Un employé du stock", "Un client"],
    ["Qu'est-ce que le contrôle interne ?", "Les règles de l'entreprise pour éviter erreurs et fraudes", "Un logiciel de retouche", "Un compte bancaire"],
    ["Que veut dire séparation des tâches ?", "Des personnes différentes saisissent, valident et paient", "Une seule personne fait tout", "Personne ne contrôle"],
    ["Qu'est-ce que la piste d'audit ?", "Le chemin pour retrouver une opération jusqu'à sa pièce", "Une route de livraison", "Un dossier de photos"],
    ["Que compare le contrôle de gestion ?", "Le budget et le réalisé", "Deux couleurs", "Deux logos"],
    ["Que vaut la marge brute ?", "Chiffre d'affaires moins coût d'achat des marchandises vendues", "Le total des dettes", "Le nombre de clients"],
    ["Quelle est la marge d'un produit acheté 800 et vendu 1 000 ?", "200", "800", "1 800"],
    ["Que définit le seuil de rentabilité ?", "Le chiffre d'affaires à partir duquel on ne perd plus d'argent", "Le prix maximum", "La taille du magasin"],
    ["Une entreprise rentable peut-elle manquer de trésorerie ?", "Oui, si ses clients paient tard", "Non, jamais", "Seulement en décembre"],
  ]),
  quiz(11, "Quiz 11 — Logiciels d'audit", "Contrôles automatiques et éthique", [
    ["À quoi servent les logiciels d'audit ?", "À analyser les données et conserver les feuilles de travail", "À monter des vidéos", "À créer des logos"],
    ["Que peuvent détecter les tests automatiques ?", "Doublons, numéros manquants, écritures hors période", "La couleur des cartons", "L'âge des clients"],
    ["Qu'est-ce qu'un échantillon ?", "Une sélection d'opérations à vérifier", "Un produit gratuit", "Un fichier vide"],
    ["Toute anomalie est-elle une faute ?", "Non, il faut l'examiner", "Oui, toujours", "Elle est toujours ignorable"],
    ["Que doit être un auditeur ?", "Indépendant, honnête et objectif", "Proche de l'entreprise auditée", "Anonyme"],
    ["Que faire des informations de l'entreprise auditée ?", "Les garder confidentielles", "Les publier", "Les vendre"],
    ["Que faire des copies inutiles de données à la fin ?", "Les supprimer de façon sûre", "Les envoyer à des amis", "Les laisser traîner"],
    ["Que faut-il comparer au début de la mission ?", "La balance importée et celle du logiciel de l'entreprise", "Deux logos", "Deux photos"],
    ["Où classer les preuves ?", "Dans le dossier de mission", "Sur le bureau", "Dans la corbeille"],
    ["Que faire en cas de suspicion de fraude ?", "La signaler selon la procédure prévue", "La garder secrète seul", "Accuser publiquement"],
  ]),
  quiz(12, "Quiz 12 — Révision du niveau 3", "ERP, douane, audit et sécurité", [
    ["Que veut dire le moindre privilège ?", "N'avoir que les droits utiles à son travail", "Avoir tous les droits", "Ne jamais se connecter"],
    ["Quelle règle de sauvegarde est conseillée ?", "Plusieurs copies, dont une hors du lieu de travail", "Une seule copie sur le même disque", "Aucune copie"],
    ["Que fait un pipeline CRM ?", "Présente les opportunités par étape", "Imprime les bulletins de paie", "Supprime les clients"],
    ["Que donne la valeur CIF ?", "La base de calcul des droits à l'importation", "Le prix de vente", "Le salaire"],
    ["Quelle est la première étape de l'audit ?", "Planifier : comprendre l'entreprise et repérer les risques", "Rédiger le rapport sans rien lire", "Supprimer les comptes"],
    ["Que faut-il faire avant d'automatiser la paie ?", "Faire valider les règles par un spécialiste local", "Désactiver la sécurité", "Supprimer les contrats"],
    ["Que faut-il faire d'une sauvegarde ?", "Tester sa restauration", "L'effacer", "L'oublier"],
    ["Que permet un guichet unique ?", "Déposer ses demandes une seule fois sur une plateforme", "Supprimer les taxes", "Éviter les contrôles"],
    ["Que faut-il faire avant de valider un document important ?", "Vérifier", "Éteindre l'écran", "Le copier sans lire"],
    ["Que fait la gestion de projets d'un ERP ?", "Organiser des tâches, le temps et la facturation", "Retoucher des images", "Monter des films"],
  ]),
];

export const final3 = finalQuiz(
  "Quiz final — Niveau 3 ERP, douane et audit",
  "Odoo avancé, sécurité, opérations douanières et audit",
  [
    ["Que génère la validation d'une facture dans Odoo ?", "Ses écritures comptables", "Un mot de passe", "Un produit"],
    ["Que fait un rapprochement bancaire ?", "Il associe les lignes du relevé aux paiements et factures", "Il supprime les clients", "Il crée des projets"],
    ["Comment sont présentées les opportunités du CRM ?", "En colonnes selon l'étape", "En fichiers audio", "En photos"],
    ["Que calcule le chiffre d'affaires prévisionnel pondéré ?", "Les montants multipliés par leur probabilité", "Le stock", "Le nombre d'employés"],
    ["Quelles données RH ne doivent pas être visibles de tous ?", "Le salaire et les pièces d'identité", "Le nom du poste", "Le nom du département"],
    ["À quoi servent les feuilles de temps ?", "À enregistrer le temps passé et à le facturer", "À imprimer des affiches", "À créer des comptes"],
    ["Que fait un filtre favori ?", "Retrouver une recherche en un clic", "Supprimer la base", "Changer la langue"],
    ["Que veut dire principe du moindre privilège ?", "Chacun n'a que les droits utiles à son rôle", "Tout le monde est administrateur", "Personne n'a de droit"],
    ["Que faire du compte d'un employé qui quitte l'entreprise ?", "Le désactiver immédiatement", "Le laisser actif", "Le partager"],
    ["Pourquoi tester la restauration d'une sauvegarde ?", "Pour savoir qu'elle fonctionne", "Pour supprimer la base", "Pour changer d'ordinateur"],
    ["Que détermine le code SH ?", "Le classement tarifaire et les droits applicables", "Le nom du client", "La couleur du colis"],
    ["Quelle est la valeur CIF de 5 000 avec 400 de transport et 100 d'assurance ?", "5 500", "5 000", "5 400"],
    ["Qu'est-ce que la liquidation en douane ?", "Le calcul des droits et taxes à payer", "La vente aux enchères", "La fermeture du port"],
    ["Que permet le guichet unique ?", "Déposer ses demandes en un point d'entrée unique", "Éviter les documents", "Supprimer les taxes"],
    ["Que faire d'un paiement demandé hors barème officiel ?", "Le refuser et exiger un reçu officiel pour toute somme due", "Le payer sans reçu", "Le cacher"],
    ["Qu'est-ce que le contrôle interne ?", "Les règles qui réduisent les erreurs et les fraudes", "Un logiciel de retouche", "Un compte de banque"],
    ["Que montre l'écart budget / réalisé ?", "La différence entre le prévu et ce qui s'est passé", "Le nombre de clients", "La liste des employés"],
    ["Quelle est la marge d'un produit acheté 600 et vendu 900 ?", "300", "600", "1 500"],
    ["Que doit être un auditeur ?", "Indépendant, honnête et objectif", "Complice de l'entreprise", "Anonyme"],
    ["Quel réflexe garder avant de valider ?", "Vérifier", "Valider sans lire", "Éteindre l'ordinateur"],
  ]
);
