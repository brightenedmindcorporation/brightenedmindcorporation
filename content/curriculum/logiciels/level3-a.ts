import { lesson, quiz } from "../bureautique/builders";

// Niveau 3 · ERP avancé et spécialisations — leçons 1 à 6 : Odoo avancé et sécurité.
// Les écrans exacts varient selon les versions d'Odoo ; les principes restent les mêmes.

export const lessonsA3 = [
  lesson({
    id: 1,
    title: "Odoo : comptabilité et facturation",
    subtitle: "Factures, paiements, taxes et rapprochement bancaire dans Odoo.",
    sections: [
      {
        heading: "Facturation et comptabilité",
        body: [
          "L'application Facturation gère les factures clients, les factures fournisseurs et les avoirs ; l'édition Enterprise ajoute la comptabilité complète.",
          "Chaque facture validée génère automatiquement ses écritures comptables.",
          "Le plan comptable et les taxes dépendent du pays choisi à la création de la société.",
          "Les journaux d'Odoo (ventes, achats, banque, opérations diverses) fonctionnent comme dans un logiciel de comptabilité classique.",
        ],
      },
      {
        heading: "Taxes et conditions de paiement",
        body: [
          "Les taxes se paramètrent par taux (par exemple 16 %) et par type : ventes, achats.",
          "Les conditions de paiement fixent l'échéance : à réception, 15 jours, 30 jours fin de mois…",
          "Les positions fiscales adaptent les taxes selon le type de client (exonéré, étranger).",
          "Vérifiez toujours la taxe appliquée aux lignes avant de valider.",
        ],
      },
      {
        heading: "Paiements et rapprochement",
        body: [
          "Enregistrez le paiement d'une facture en choisissant le journal de banque ou de caisse.",
          "Le rapprochement bancaire associe les lignes du relevé aux paiements et aux factures.",
          "Les relevés peuvent être importés depuis un fichier, selon la configuration et l'édition.",
          "Les factures non payées restent visibles dans le suivi des créances.",
        ],
      },
      {
        heading: "Les rapports",
        body: [
          "Les rapports de base : balance, grand livre, balance âgée clients et fournisseurs, rapport de TVA.",
          "Filtrez par période, comparez avec la période précédente et exportez en Excel.",
          "Contrôlez que les totaux des rapports correspondent aux totaux des factures.",
          "Faites valider les états importants par un comptable.",
        ],
      },
    ],
    caseTitle: "Fermer le mois dans Odoo",
    caseLines: [
      "À la fin du mois, Neema vérifie que toutes les factures de vente sont validées et que les paiements sont enregistrés.",
      "Elle importe le relevé de la banque et rapproche chaque ligne avec les paiements.",
      "Elle imprime la balance âgée et appelle deux clients en retard.",
      "Elle exporte le rapport de TVA pour son comptable.",
    ],
    tasks: [
      "Paramétrez une taxe à 16 % et une condition de paiement à 30 jours.",
      "Enregistrez trois paiements dans le journal de banque.",
      "Réalisez un rapprochement bancaire avec un relevé fictif.",
      "Éditez la balance âgée clients et notez les retards.",
    ],
    goal: "Gérer la facturation, les taxes, les paiements et le rapprochement dans Odoo.",
    video: "Odoo : comptabilité et facturation",
  }),
  lesson({
    id: 2,
    title: "Odoo : CRM et opportunités",
    subtitle: "Suivre les prospects de la première rencontre à la vente.",
    sections: [
      {
        heading: "Le pipeline commercial",
        body: [
          "Le CRM d'Odoo présente les opportunités en colonnes : nouveau, qualifié, proposition, gagné.",
          "Chaque carte contient le prospect, le montant espéré, la probabilité et la date prévue de clôture.",
          "On fait glisser la carte d'une colonne à l'autre quand la discussion avance.",
          "Les colonnes se personnalisent selon la méthode de vente de l'entreprise.",
        ],
      },
      {
        heading: "Activités et rappels",
        body: [
          "Planifiez des activités sur une opportunité : appel, e-mail, réunion, visite.",
          "Chaque activité a une date limite et un responsable ; elle apparaît dans l'agenda.",
          "Les activités en retard apparaissent en rouge : elles rappellent qui doit agir.",
          "Les notes et les e-mails restent dans le chatter de l'opportunité.",
        ],
      },
      {
        heading: "De l'opportunité au devis",
        body: [
          "Depuis une opportunité qualifiée, créez un devis en un clic : les informations du client sont reprises.",
          "Quand le devis est confirmé, marquez l'opportunité comme gagnée.",
          "Si la vente est perdue, indiquez la raison : prix, concurrent, délai. Elle sert à améliorer l'offre.",
          "Les prospects non retenus peuvent être archivés sans être supprimés.",
        ],
      },
      {
        heading: "Mesurer l'efficacité",
        body: [
          "Le taux de conversion : part des opportunités gagnées sur l'ensemble.",
          "Le chiffre d'affaires prévisionnel : somme des montants pondérés par la probabilité.",
          "Comparez les commerciaux, les sources de prospects et les produits vendus.",
          "Analysez les raisons de perte pour corriger votre argumentaire.",
        ],
      },
    ],
    caseTitle: "Le pipeline de la rentrée",
    caseLines: [
      "Avant la rentrée, Neema enregistre sept écoles comme opportunités dans le CRM.",
      "Elle planifie un appel pour chacune et déplace les cartes à mesure que les discussions avancent.",
      "Deux écoles passent en proposition : elle crée les devis directement depuis les cartes.",
      "À la fin du mois, elle analyse son taux de conversion et les raisons de ses ventes perdues.",
    ],
    tasks: [
      "Créez cinq opportunités avec montant et probabilité.",
      "Planifiez trois activités et marquez une comme faite.",
      "Transformez une opportunité en devis.",
      "Calculez le chiffre d'affaires prévisionnel pondéré de votre pipeline.",
    ],
    goal: "Piloter un pipeline commercial et convertir les opportunités en devis dans Odoo.",
    video: "Odoo : CRM et gestion des opportunités",
  }),
  lesson({
    id: 3,
    title: "Odoo : ressources humaines",
    subtitle: "Employés, congés, présences et recrutement.",
    sections: [
      {
        heading: "La fiche employé",
        body: [
          "La fiche contient les informations personnelles, le poste, le département, le responsable et le contact d'urgence.",
          "Les informations sensibles (salaire, pièces d'identité) ne doivent être visibles que des personnes autorisées.",
          "Un employé peut être lié à un utilisateur du logiciel pour accéder à ses propres informations.",
          "Les départements forment l'organigramme de l'entreprise.",
        ],
      },
      {
        heading: "Congés et absences",
        body: [
          "L'application Congés définit des types (congé annuel, maladie, maternité…) et un nombre de jours par employé.",
          "L'employé fait sa demande ; le responsable l'accepte ou la refuse.",
          "Le calendrier des absences aide à planifier le travail de l'équipe.",
          "Les soldes de congés se mettent à jour automatiquement.",
        ],
      },
      {
        heading: "Présences et temps de travail",
        body: [
          "L'application Présences enregistre les entrées et les sorties de chaque employé.",
          "Les heures travaillées servent de base au calcul des heures supplémentaires.",
          "Les feuilles de temps permettent de rattacher le travail à des projets.",
          "Les données de présence doivent être traitées avec respect de la vie privée des employés.",
        ],
      },
      {
        heading: "Recrutement et paie",
        body: [
          "L'application Recrutement suit les candidatures : réception, entretien, offre, embauche.",
          "La paie dépend de la législation du pays : la RDC a ses propres règles sur les cotisations et les impôts.",
          "Avant d'automatiser la paie, faites valider les règles par un spécialiste local.",
          "Gardez une trace de chaque décision d'embauche et de chaque contrat.",
        ],
      },
    ],
    caseTitle: "Organiser l'équipe de la boutique",
    caseLines: [
      "La boutique grandit : Neema enregistre ses trois employés dans l'application RH avec leur poste et leur responsable.",
      "Elle définit trois types de congés et le nombre de jours de chacun.",
      "Un employé demande trois jours de congé : Neema vérifie le calendrier de l'équipe avant d'accepter.",
      "Elle publie une offre de poste et suit les candidatures dans l'application Recrutement.",
    ],
    tasks: [
      "Créez trois fiches d'employés avec leur poste et leur responsable.",
      "Paramétrez deux types de congés avec un nombre de jours.",
      "Simulez une demande de congé et son acceptation.",
      "Listez les informations RH qui ne doivent pas être visibles de tous.",
    ],
    goal: "Gérer les fiches, les congés et les présences d'une petite équipe dans Odoo.",
    video: "Odoo : ressources humaines, congés et présences",
  }),
  lesson({
    id: 4,
    title: "Odoo : projets et feuilles de temps",
    subtitle: "Organiser des tâches, suivre le temps et facturer des services.",
    sections: [
      {
        heading: "Créer un projet",
        body: [
          "L'application Projet affiche les tâches en colonnes (à faire, en cours, terminé) selon la méthode kanban.",
          "Chaque tâche a un responsable, une échéance, une description et des pièces jointes.",
          "Les sous-tâches et les étiquettes aident à organiser les projets complexes.",
          "Les clients peuvent être invités à suivre l'avancement via un portail, selon la configuration.",
        ],
      },
      {
        heading: "Les feuilles de temps",
        body: [
          "Chaque employé enregistre le temps passé sur chaque tâche : quantité d'heures, date et description.",
          "Les feuilles de temps donnent le coût réel d'un projet.",
          "Un chronomètre permet d'enregistrer le temps en direct.",
          "Les responsables valident les heures avant de les facturer.",
        ],
      },
      {
        heading: "Facturer le temps",
        body: [
          "Pour un service vendu à l'heure, le temps passé est facturé au client selon un taux horaire.",
          "On peut aussi vendre un forfait : prix fixe quelle que soit la durée.",
          "Comparez le temps prévu et le temps réel pour améliorer vos devis.",
          "Un devis clair indique la nature du service, la durée estimée et le prix.",
        ],
      },
      {
        heading: "Piloter la rentabilité",
        body: [
          "Rentabilité d'un projet = produits facturés moins coûts (temps, achats).",
          "Les tableaux de bord de projet montrent les tâches en retard et les charges.",
          "Un projet en retard doit déclencher une discussion : ressources, délais, périmètre.",
          "Clôturez le projet quand tout est livré et facturé, puis tirez-en les leçons.",
        ],
      },
    ],
    caseTitle: "Installer un réseau chez un client",
    caseLines: [
      "Un technicien de l'entreprise de Neema installe un petit réseau dans une école : la mission est vendue 500 000 FC en forfait.",
      "Un projet est créé avec cinq tâches : étude, câblage, configuration, tests et formation.",
      "Le technicien enregistre ses heures chaque jour dans la feuille de temps.",
      "À la fin, Neema compare le temps prévu et le temps passé, et ajuste ses prochains devis.",
    ],
    tasks: [
      "Créez un projet de cinq tâches avec responsables et échéances.",
      "Enregistrez des heures sur trois tâches.",
      "Calculez le coût d'un projet à partir des heures et d'un taux horaire.",
      "Expliquez la différence entre une vente au forfait et une vente à l'heure.",
    ],
    goal: "Organiser un projet, suivre le temps et facturer un service.",
    video: "Odoo : projets et feuilles de temps",
  }),
  lesson({
    id: 5,
    title: "Odoo : rapports, import et personnalisation",
    subtitle: "Analyser les données, importer des fichiers et adapter les écrans.",
    sections: [
      {
        heading: "Analyser avec les filtres et regroupements",
        body: [
          "Dans toute liste, utilisez la barre de recherche pour filtrer par client, période, statut.",
          "Regroupez les lignes par client, par produit ou par mois pour voir les totaux.",
          "Les vues graphique et tableau croisé présentent les chiffres de façon visuelle.",
          "Enregistrez vos filtres favoris pour les retrouver en un clic.",
        ],
      },
      {
        heading: "Importer des données",
        body: [
          "L'importation permet de charger des clients, des produits ou des soldes depuis un fichier Excel ou CSV.",
          "Téléchargez d'abord un modèle de fichier : il indique les colonnes attendues.",
          "Testez l'import avec quelques lignes ; corrigez les erreurs signalées.",
          "Ne chargez jamais de données non vérifiées dans une base de production.",
        ],
      },
      {
        heading: "Exporter",
        body: [
          "Sélectionnez des lignes dans une liste puis choisissez Action > Exporter.",
          "Choisissez les champs à exporter et le format (CSV ou Excel).",
          "Utilisez l'export pour analyser les données dans Excel ou les partager avec le comptable.",
          "Attention aux données personnelles : n'exportez que ce qui est nécessaire.",
        ],
      },
      {
        heading: "Adapter les écrans",
        body: [
          "Certaines éditions permettent d'ajouter des champs ou de modifier les vues sans programmer.",
          "Les modèles de documents (devis, factures) se personnalisent : logo, mentions, pied de page.",
          "Les automatisations déclenchent des actions : un rappel, un e-mail, une tâche.",
          "Toute personnalisation doit être documentée et testée avant d'être utilisée.",
        ],
      },
    ],
    caseTitle: "Un tableau de bord sur mesure",
    caseLines: [
      "Neema veut connaître ses cinq meilleurs clients : elle filtre les ventes de l'année et les regroupe par client.",
      "Elle enregistre ce filtre comme favori pour le retrouver chaque mois.",
      "Elle exporte la liste en Excel et crée un graphique pour son rapport.",
      "Elle importe ensuite une liste de nouveaux produits après avoir testé le fichier sur trois lignes.",
    ],
    tasks: [
      "Filtrez et regroupez vos ventes par produit puis par mois.",
      "Enregistrez un filtre favori.",
      "Importez un fichier de cinq produits en testant d'abord le modèle.",
      "Exportez une liste en Excel et créez-en un graphique.",
    ],
    goal: "Analyser, importer et exporter des données dans Odoo en toute sécurité.",
    video: "Odoo : rapports, import et export de données",
  }),
  lesson({
    id: 6,
    title: "Sécurité, droits et sauvegarde d'un ERP",
    subtitle: "Protéger les données de l'entreprise.",
    sections: [
      {
        heading: "Les droits d'accès",
        body: [
          "Principe du moindre privilège : chaque personne n'a que les droits dont elle a besoin pour son travail.",
          "Séparez les rôles : celui qui saisit une facture n'est pas celui qui la paie ni celui qui la valide.",
          "Les droits se donnent par groupe (vendeur, comptable, administrateur) plutôt que personne par personne.",
          "Retirez immédiatement les droits d'un employé qui quitte l'entreprise.",
        ],
      },
      {
        heading: "Mots de passe et connexions",
        body: [
          "Chaque utilisateur a son propre compte : ne partagez jamais un identifiant.",
          "Utilisez des mots de passe longs et uniques, et activez la double authentification quand elle existe.",
          "Déconnectez-vous d'un poste partagé.",
          "Surveillez les connexions inhabituelles : heures étranges, lieux inconnus.",
        ],
      },
      {
        heading: "Sauvegarde et restauration",
        body: [
          "Sauvegardez la base de données régulièrement (chaque jour pour une activité intense), avec les fichiers joints.",
          "Gardez plusieurs copies : sur le serveur, sur un disque externe et hors du lieu de travail.",
          "Testez la restauration : une sauvegarde jamais restaurée n'est qu'une supposition.",
          "Notez qui est responsable des sauvegardes et comment les rétablir.",
        ],
      },
      {
        heading: "Traçabilité et conformité",
        body: [
          "L'historique (journal des actions) permet de savoir qui a fait quoi, et quand.",
          "Ne supprimez pas les traces : conservez les pièces comptables pendant la durée légale.",
          "Les données personnelles des clients et des employés doivent être protégées et utilisées avec respect.",
          "Un plan de continuité décrit comment travailler en cas de panne : papier, copie, procédure.",
        ],
      },
    ],
    caseTitle: "Après un incident",
    caseLines: [
      "Un employé de Neema quitte la boutique mais son compte reste actif plusieurs semaines.",
      "Elle découvre que quelqu'un s'est connecté avec ce compte et a modifié des prix.",
      "Elle désactive le compte, consulte l'historique des actions et rétablit les prix à partir de la dernière sauvegarde.",
      "Elle crée une procédure : tout départ entraîne la désactivation du compte le jour même.",
    ],
    tasks: [
      "Définissez trois groupes d'utilisateurs avec leurs droits.",
      "Rédigez une procédure de départ d'un employé en cinq étapes.",
      "Planifiez la fréquence et l'emplacement des sauvegardes de votre entreprise fictive.",
      "Listez trois signes qu'un compte a été utilisé par quelqu'un d'autre.",
    ],
    goal: "Mettre en place des droits, des sauvegardes et des règles de sécurité pour un logiciel de gestion.",
    video: "Sécurité d'un ERP : droits, sauvegardes et bonnes pratiques",
  }),
];

export const quizzesA3 = [
  quiz(1, "Quiz 1 — Odoo : comptabilité", "Facturation, taxes et rapprochement", [
    ["Que génère la validation d'une facture ?", "Ses écritures comptables", "Un nouveau produit", "Un utilisateur"],
    ["De quoi dépendent le plan comptable et les taxes d'Odoo ?", "Du pays choisi pour la société", "De la couleur du thème", "Du navigateur"],
    ["À quoi sert une condition de paiement ?", "À fixer l'échéance de la facture", "À changer le logo", "À supprimer la TVA"],
    ["Que fait un rapprochement bancaire ?", "Il associe les lignes du relevé aux paiements et factures", "Il supprime les factures", "Il crée des clients"],
    ["Que montre la balance âgée ?", "Les créances ou dettes par ancienneté", "Les produits par couleur", "Les employés par ville"],
    ["Que faut-il vérifier avant de valider une facture ?", "La taxe appliquée aux lignes", "La météo", "L'orthographe du nom du fichier"],
    ["Que permet une position fiscale ?", "Adapter les taxes selon le type de client", "Changer de langue", "Supprimer une société"],
    ["Que faire des rapports importants ?", "Les faire valider par un comptable", "Les cacher", "Les modifier sans contrôle"],
    ["Quel est un journal d'Odoo ?", "Le journal de banque", "Le journal des couleurs", "Le journal des photos"],
    ["Que faire des factures non payées ?", "Les suivre dans le suivi des créances", "Les supprimer", "Les ignorer"],
  ]),
  quiz(2, "Quiz 2 — Odoo : CRM", "Pipeline et opportunités", [
    ["Comment le CRM présente-t-il les opportunités ?", "En colonnes selon leur étape", "En photos", "En fichiers audio"],
    ["Que contient une carte d'opportunité ?", "Le prospect, le montant, la probabilité et la date prévue", "Une facture payée", "Un mot de passe"],
    ["À quoi servent les activités ?", "À planifier appels, e-mails et réunions", "À supprimer des clients", "À changer les taxes"],
    ["Que faire d'une vente perdue ?", "Indiquer la raison pour améliorer l'offre", "L'ignorer", "La supprimer sans trace"],
    ["Que permet « créer un devis » depuis une opportunité ?", "Reprendre les informations du client", "Effacer l'opportunité", "Créer une facture fournisseur"],
    ["Que mesure le taux de conversion ?", "La part des opportunités gagnées", "Le nombre d'employés", "Le stock"],
    ["Comment calculer un chiffre d'affaires prévisionnel pondéré ?", "En multipliant les montants par leur probabilité", "En additionnant les stocks", "En divisant par le nombre de clients"],
    ["Où restent les e-mails et notes d'une opportunité ?", "Dans le chatter", "Sur le bureau de Windows", "Dans l'imprimante"],
    ["Pourquoi archiver un prospect plutôt que le supprimer ?", "Pour garder l'historique", "Pour augmenter les taxes", "Pour libérer de la mémoire"],
    ["Que montrent les activités en rouge ?", "Qu'elles sont en retard", "Qu'elles sont terminées", "Qu'elles sont supprimées"],
  ]),
  quiz(3, "Quiz 3 — Odoo : ressources humaines", "Employés, congés et présences", [
    ["Quelles informations n'ont pas à être visibles de tous ?", "Le salaire et les pièces d'identité", "Le nom du poste", "Le nom du département"],
    ["Que définit un type de congé ?", "Un genre d'absence avec un nombre de jours", "Un taux de TVA", "Un produit"],
    ["Qui accepte ou refuse une demande de congé ?", "Le responsable", "Le client", "Le fournisseur"],
    ["À quoi sert le calendrier des absences ?", "À planifier le travail de l'équipe", "À calculer la TVA", "À imprimer des factures"],
    ["Que fait l'application Présences ?", "Elle enregistre les entrées et sorties", "Elle crée les produits", "Elle envoie des factures"],
    ["Pourquoi respecter la vie privée dans les présences ?", "Parce que ce sont des données personnelles", "Parce qu'elles sont gratuites", "Parce qu'elles sont secrètes pour le comptable"],
    ["Que suit l'application Recrutement ?", "Les candidatures jusqu'à l'embauche", "Les ventes", "Les stocks"],
    ["De quoi dépend la paie ?", "De la législation du pays", "De la couleur du thème", "Du nom du logiciel"],
    ["Que faire avant d'automatiser la paie ?", "Faire valider les règles par un spécialiste", "Supprimer les fiches", "Désactiver le recrutement"],
    ["Que forme l'ensemble des départements ?", "L'organigramme de l'entreprise", "Un plan comptable", "Un stock"],
  ]),
  quiz(4, "Quiz 4 — Odoo : projets", "Tâches, temps et rentabilité", [
    ["Comment sont présentées les tâches d'un projet ?", "En colonnes kanban", "En images", "En tableaux de TVA"],
    ["Que contient une tâche ?", "Un responsable, une échéance et une description", "Un mot de passe", "Une taxe"],
    ["À quoi servent les feuilles de temps ?", "À enregistrer le temps passé sur les tâches", "À imprimer les bilans", "À importer des produits"],
    ["Que donne le total des heures d'un projet ?", "Son coût réel en temps", "Son logo", "Sa taxe"],
    ["Quelle est la différence entre un forfait et une vente à l'heure ?", "Le forfait a un prix fixe, l'heure dépend du temps", "Aucune", "Le forfait n'a pas de client"],
    ["Que calcule la rentabilité d'un projet ?", "Produits facturés moins coûts", "Le nombre de tâches", "Le nombre de clients"],
    ["Pourquoi comparer temps prévu et temps réel ?", "Pour améliorer les devis suivants", "Pour supprimer le projet", "Pour changer la monnaie"],
    ["Quand clôturer un projet ?", "Quand tout est livré et facturé", "Dès le premier jour", "Jamais"],
    ["Que faire d'un projet en retard ?", "En discuter : ressources, délais, périmètre", "L'ignorer", "Le supprimer"],
    ["Que fait le chronomètre ?", "Enregistre le temps en direct", "Imprime une facture", "Sauvegarde la base"],
  ]),
  quiz(5, "Quiz 5 — Odoo : analyse et import", "Filtres, import, export", [
    ["Que permet de faire un regroupement ?", "Voir les totaux par client, produit ou mois", "Supprimer la liste", "Changer le mot de passe"],
    ["Que sauvegarde un filtre favori ?", "Une recherche à retrouver en un clic", "Un mot de passe", "Une facture"],
    ["Par quoi commence-t-on avant un import ?", "Par télécharger le modèle de fichier", "Par supprimer la base", "Par éteindre Odoo"],
    ["Comment tester un import ?", "Avec quelques lignes d'abord", "Avec dix mille lignes sans vérifier", "Sans fichier"],
    ["Que faut-il éviter ?", "Charger des données non vérifiées en production", "Utiliser des filtres", "Exporter en Excel"],
    ["Comment exporter des lignes d'une liste ?", "Les sélectionner puis Action > Exporter", "Les imprimer en photo", "Les supprimer"],
    ["Pourquoi n'exporter que ce qui est nécessaire ?", "Pour protéger les données personnelles", "Pour réduire la TVA", "Pour accélérer l'écran"],
    ["Qu'est-ce qu'une automatisation ?", "Une action déclenchée automatiquement (rappel, e-mail, tâche)", "Un virus", "Un type de produit"],
    ["Que faire avant d'utiliser une personnalisation ?", "La documenter et la tester", "La cacher", "La déployer sans test"],
    ["Que montre une vue graphique ?", "Les chiffres de façon visuelle", "Le mot de passe", "Les droits d'accès"],
  ]),
  quiz(6, "Quiz 6 — Sécurité d'un ERP", "Droits, mots de passe et sauvegardes", [
    ["Que veut dire le moindre privilège ?", "Chacun n'a que les droits utiles à son travail", "Tout le monde a tous les droits", "Personne n'a de droit"],
    ["Pourquoi séparer les rôles de saisie et de paiement ?", "Pour réduire les risques de fraude et d'erreur", "Pour ralentir le logiciel", "Pour supprimer des fiches"],
    ["Que faire du compte d'un employé qui part ?", "Le désactiver immédiatement", "Le laisser actif", "Le donner à un autre"],
    ["Peut-on partager un identifiant ?", "Non, chaque utilisateur a son propre compte", "Oui, toujours", "Seulement le week-end"],
    ["Que fait la double authentification ?", "Ajoute une seconde preuve d'identité", "Double les prix", "Supprime les droits"],
    ["À quelle fréquence sauvegarder pour une activité intense ?", "Chaque jour", "Une fois par an", "Jamais"],
    ["Où garder des copies de sauvegarde ?", "Sur plusieurs supports, dont un hors du lieu de travail", "Sur le même disque seulement", "Nulle part"],
    ["Pourquoi tester la restauration ?", "Pour savoir que la sauvegarde fonctionne vraiment", "Pour supprimer la base", "Pour changer de serveur"],
    ["Que permet l'historique des actions ?", "Savoir qui a fait quoi et quand", "Imprimer les affiches", "Changer les prix"],
    ["Que décrit un plan de continuité ?", "Comment travailler en cas de panne", "Comment fermer l'entreprise", "Comment augmenter les prix"],
  ]),
];
