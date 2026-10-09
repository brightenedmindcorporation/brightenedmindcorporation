import type { LevelCurriculum } from "../types";

// New content authored for Phase 4, written entirely in French, matching
// the C1-C2 feature list already promised on app/academia/francais/page.tsx:
// business French and negotiation, advanced writing, public speaking, and
// DELF/DALF exam preparation.
export const frenchLevel3: LevelCurriculum = {
  langCode: "FR",
  langLabel: "Français",
  langSlug: "french",
  level: 3,
  levelTitle: "Niveau 3 - Français Avancé et Professionnel (C1-C2)",
  levelSubtitle: "Français des affaires, rédaction administrative et éloquence professionnelle.",

  lessons: [
    {
      id: 1,
      title: "Le Conditionnel pour les Affaires",
      subtitle: "Utilisez le conditionnel pour parler de possibilités et de conséquences au travail.",
      sections: [
        { heading: "Conditionnel Présent (possibilité probable)", body: ["Si + présent, futur simple.", "Si nous terminons le rapport tôt, nous l'enverrons aujourd'hui.", "Si le client appelle, je répondrai immédiatement."] },
        { heading: "Conditionnel Passé et Hypothèse (peu probable)", body: ["Si + imparfait, conditionnel présent.", "Si j'avais plus de temps, je relirais la proposition.", "Si elle était directrice, elle changerait l'horaire."] },
        { heading: "Usage en Entreprise", body: ["Le conditionnel est fréquent dans les négociations et la planification.", "Si vous baissiez le prix, nous signerions le contrat.", "Si le marché se développait, nous envisagerions une expansion."] },
      ],
      speakText: `Conditionnel présent, pour une possibilité probable. Si nous terminons le rapport tôt, nous l'enverrons aujourd'hui.

Hypothèse peu probable. Si j'avais plus de temps, je relirais la proposition.

Usage en entreprise. Le conditionnel est fréquent dans les négociations et la planification.`,
      videoTopic: "Comparer les différentes formes de conditionnel dans une négociation d'entreprise.",
      readingTitle: "Une Négociation à l'Entreprise Brightened Mind",
      reading: [
        "Pendant la réunion, le fournisseur a dit, « Si vous commandez plus d'unités, nous vous offrirons une remise. »",
        "La directrice a répondu, « Si nous avions un budget plus important ce trimestre, nous commanderions le double tout de suite. »",
        "Les deux parties ont continué à négocier jusqu'à trouver un accord qui convenait à tous.",
        "À la fin de la réunion, ils avaient signé un nouveau contrat.",
      ],
      readingSpeakText: `Une négociation à l'entreprise Brightened Mind. Pendant la réunion, le fournisseur a dit, si vous commandez plus d'unités, nous vous offrirons une remise.`,
      exercises: ["Écrivez une phrase conditionnelle sur un délai de travail.", "Écrivez une phrase hypothétique sur une promotion imaginaire.", "Reformulez 'Nous nous développerions si le marché croît' autrement.", "Expliquez la différence entre une possibilité probable et une hypothèse peu probable."],
      speakingTopic: "Décrivez une décision professionnelle en utilisant le conditionnel présent et une hypothèse.",
    },
    {
      id: 2,
      title: "Les Verbes Modaux pour les Affaires",
      subtitle: "Utilisez les verbes modaux pour exprimer l'obligation, le conseil et la possibilité professionnellement.",
      sections: [
        { heading: "Obligation et Nécessité", body: ["Devoir : une obligation forte.", "Tout le personnel doit envoyer le rapport avant vendredi.", "Vous devez signer le contrat avant de commencer."] },
        { heading: "Conseil et Suggestion", body: ["Devrait / Il faudrait : pour donner un conseil.", "Vous devriez revoir les chiffres avant d'envoyer.", "Il faudrait informer le client du retard."] },
        { heading: "Possibilité", body: ["Pourrait / Il se peut que : quelque chose est possible mais pas certain.", "Le délai pourrait changer la semaine prochaine.", "Nous pourrions envisager un autre fournisseur."] },
      ],
      speakText: `Obligation et nécessité. Devoir exprime une obligation forte. Tout le personnel doit envoyer le rapport avant vendredi.

Conseil et suggestion. Devrait et il faudrait servent à donner un conseil. Vous devriez revoir les chiffres.

Possibilité. Pourrait et il se peut que montrent que quelque chose est possible mais pas certain.`,
      videoTopic: "Entendre la différence entre obligation, conseil et possibilité au travail.",
      readingTitle: "Préparatifs pour l'Audit",
      reading: [
        "La directrice financière a dit, « Nous devons terminer les documents de l'audit avant lundi. »",
        "Elle a ajouté, « Vous devriez aussi préparer un court résumé pour le directeur. »",
        "Un employé a demandé si le délai pourrait changer, mais la directrice a dit que c'était peu probable.",
        "Finalement, l'équipe a tout terminé à temps et a évité le stress de dernière minute.",
      ],
      readingSpeakText: `Préparatifs pour l'audit. La directrice financière a dit, nous devons terminer les documents de l'audit avant lundi.`,
      exercises: ["Écrivez une phrase avec 'devoir' sur une obligation professionnelle.", "Écrivez une phrase avec 'devrait' donnant un conseil à un collègue.", "Écrivez une phrase avec 'pourrait' sur un projet incertain.", "Expliquez la différence entre 'devoir' et 'devrait'."],
      speakingTopic: "Donnez à un collègue un conseil et une obligation ferme en utilisant des verbes modaux.",
    },
    {
      id: 3,
      title: "Langage de Négociation",
      subtitle: "Apprenez des phrases pour négocier des prix, des délais et des accords.",
      sections: [
        { heading: "Ouvrir une Négociation", body: ["Nous aimerions discuter des termes du contrat.", "Parlons de ce que nous pouvons nous offrir mutuellement."] },
        { heading: "Faire une Offre", body: ["Nous pouvons vous offrir une remise de 10% pour une commande plus importante.", "Notre meilleure offre est...", "Nous sommes prêts à prolonger le délai d'une semaine."] },
        { heading: "Répondre et Trouver un Compromis", body: ["Cela semble raisonnable, mais pourriez-vous aussi...?", "Nous pouvons trouver un terrain d'entente.", "Cherchons une solution qui convienne aux deux parties."] },
        { heading: "Conclure un Accord", body: ["Je pense que nous avons un accord.", "Mettons cela par écrit.", "Nous sommes impatients de travailler avec vous."] },
      ],
      speakText: `Ouvrir une négociation. Nous aimerions discuter des termes du contrat.

Faire une offre. Nous pouvons vous offrir une remise de dix pour cent pour une commande plus importante.

Répondre et trouver un compromis. Cela semble raisonnable, mais pourriez-vous aussi...?

Conclure un accord. Je pense que nous avons un accord. Mettons cela par écrit.`,
      videoTopic: "Voir une négociation complète du début à la conclusion de l'accord.",
      readingTitle: "Conclure l'Accord",
      reading: [
        "Deux entreprises ont négocié pendant presque deux heures le prix du nouvel équipement.",
        "Au début, l'acheteur a dit que le prix était trop élevé, mais le vendeur a offert une remise de 10% pour une commande plus importante.",
        "L'acheteur a répondu, « Cela semble raisonnable, mais pourriez-vous aussi inclure la livraison gratuite ? »",
        "Le vendeur a accepté, et les deux parties se sont serré la main en disant, « Nous sommes impatients de travailler avec vous. »",
      ],
      readingSpeakText: `Conclure l'accord. Deux entreprises ont négocié pendant presque deux heures le prix du nouvel équipement.`,
      exercises: ["Écrivez une phrase pour ouvrir une négociation.", "Écrivez une phrase faisant une offre avec une remise.", "Écrivez une phrase trouvant un compromis entre deux positions.", "Écrivez une phrase pour conclure une négociation réussie."],
      speakingTopic: "Jouez une négociation courte sur le prix et le délai de livraison avec un partenaire.",
    },
    {
      id: 4,
      title: "Prise de Parole en Public",
      subtitle: "Apprenez le langage pour structurer et donner une présentation professionnelle claire.",
      sections: [
        { heading: "Ouvrir une Présentation", body: ["Bonjour à tous, merci d'être présents.", "Aujourd'hui, je vais vous parler de...", "La présentation durera environ 15 minutes, suivie de questions."] },
        { heading: "Organiser ses Points", body: ["D'abord, j'expliquerai... Ensuite, je passerai à... Enfin, je conclurai par...", "Passons à la diapositive suivante.", "Comme vous pouvez le voir sur ce graphique..."] },
        { heading: "Clôturer une Présentation", body: ["Pour résumer, les points clés sont...", "Merci de votre attention.", "Avez-vous des questions ?"] },
      ],
      speakText: `Ouvrir une présentation. Bonjour à tous, merci d'être présents. Aujourd'hui, je vais vous parler de...

Organiser ses points. D'abord, j'expliquerai... Ensuite, je passerai à... Enfin, je conclurai par...

Clôturer une présentation. Pour résumer, les points clés sont... Merci de votre attention. Avez-vous des questions ?`,
      videoTopic: "Voir une présentation professionnelle courte et bien structurée.",
      readingTitle: "La Première Présentation de Linda",
      reading: [
        "Linda était nerveuse avant sa première présentation devant l'équipe de direction.",
        "Elle a commencé en disant, « Bonjour à tous, merci d'être présents. »",
        "Elle a structuré son discours clairement : d'abord le problème, puis sa solution, et enfin les résultats.",
        "À la fin, elle a dit, « Pour résumer, les points clés sont la réduction des coûts et une livraison plus rapide. Merci de votre attention. Avez-vous des questions ? »",
        "L'équipe a été impressionnée par la clarté et l'organisation de sa présentation.",
      ],
      readingSpeakText: `La première présentation de Linda. Linda était nerveuse avant sa première présentation devant l'équipe de direction.`,
      exercises: ["Écrivez une phrase d'ouverture pour une présentation sur votre travail.", "Écrivez trois phrases de transition pour passer entre les points.", "Écrivez une phrase de clôture qui invite aux questions.", "Préparez une présentation d'1 minute sur votre projet préféré."],
      speakingTopic: "Faites une présentation courte d'1 minute sur un sujet de votre choix.",
    },
    {
      id: 5,
      title: "Réunions Formelles et Comptes-Rendus",
      subtitle: "Apprenez à participer à des réunions et à rédiger un résumé de ce qui a été discuté.",
      sections: [
        { heading: "Pendant une Réunion", body: ["Pouvons-nous commencer ?", "Est-ce que tout le monde m'entend bien ?", "J'aimerais soulever un point.", "Pouvons-nous revenir à cela plus tard ?"] },
        { heading: "Demander la Parole", body: ["Puis-je dire quelque chose ?", "Si je peux ajouter...", "Désolé de vous interrompre, mais..."] },
        { heading: "Rédiger un Compte-Rendu de Réunion", body: ["Le compte-rendu enregistre ce qui a été discuté et décidé.", "Présents : qui était là.", "Ordre du jour : la liste des sujets traités.", "Actions à mener : les tâches assignées, avec le responsable et l'échéance."] },
      ],
      speakText: `Pendant une réunion. Pouvons-nous commencer ? Est-ce que tout le monde m'entend bien ? J'aimerais soulever un point.

Demander la parole. Puis-je dire quelque chose ? Si je peux ajouter... Désolé de vous interrompre, mais...

Rédiger un compte-rendu de réunion. Le compte-rendu enregistre ce qui a été discuté et décidé.`,
      videoTopic: "Voir comment se déroule une réunion formelle du début à la fin.",
      readingTitle: "La Réunion du Lundi",
      reading: [
        "À 9 heures, le chef d'équipe a dit, « Pouvons-nous commencer ? » et tout le monde a été d'accord.",
        "Pendant la discussion, Pierre a dit, « Si je peux ajouter, je pense que nous devrions aussi revoir le budget. »",
        "Après la réunion, la secrétaire a rédigé le compte-rendu, listant les présents, l'ordre du jour et trois actions à mener avec des échéances.",
        "Tout le monde a reçu une copie du compte-rendu par e-mail le jour même.",
      ],
      readingSpeakText: `La réunion du lundi. À neuf heures, le chef d'équipe a dit, pouvons-nous commencer ? Et tout le monde a été d'accord.`,
      exercises: ["Écrivez une phrase pour interrompre une réunion poliment.", "Écrivez une phrase pour demander à ajouter un point.", "Listez les quatre parties d'un compte-rendu de réunion.", "Écrivez un exemple d'action à mener avec un responsable et une échéance."],
      speakingTopic: "Animez une réunion courte simulée avec un partenaire et pratiquez demander la parole poliment.",
    },
    {
      id: 6,
      title: "Rédaction Administrative : Rapports et Propositions",
      subtitle: "Apprenez la structure d'un rapport ou d'une proposition professionnelle.",
      sections: [
        { heading: "Structure d'un Rapport", body: ["Introduction : l'objectif du rapport.", "Résultats : les faits et les données.", "Conclusion : un résumé de ce qui a été trouvé.", "Recommandations : les prochaines étapes suggérées."] },
        { heading: "Phrases Utiles", body: ["L'objectif de ce rapport est de...", "Les données montrent que...", "Sur la base de ces résultats, nous recommandons...", "En conclusion, ..."] },
      ],
      speakText: `Structure d'un rapport. L'introduction explique l'objectif du rapport. Les résultats présentent les faits et les données. La conclusion résume ce qui a été trouvé. Les recommandations suggèrent les prochaines étapes.

Phrases utiles. L'objectif de ce rapport est de... Les données montrent que... Sur la base de ces résultats, nous recommandons...`,
      videoTopic: "Voir comment un rapport professionnel est organisé de l'introduction aux recommandations.",
      readingTitle: "Un Rapport sur la Satisfaction Client",
      reading: [
        "L'objectif de ce rapport est d'évaluer la satisfaction client au cours du dernier trimestre.",
        "Les données montrent que 85% des clients étaient satisfaits du service, une augmentation par rapport à l'année dernière.",
        "Cependant, certains clients ont mentionné que les temps de réponse pourraient être plus rapides.",
        "Sur la base de ces résultats, nous recommandons d'embaucher deux employés supplémentaires pour le support client.",
        "En conclusion, la satisfaction client s'améliore, mais de petits changements pourraient la rendre encore meilleure.",
      ],
      readingSpeakText: `Un rapport sur la satisfaction client. L'objectif de ce rapport est d'évaluer la satisfaction client au cours du dernier trimestre.`,
      exercises: ["Écrivez une introduction d'une phrase pour un rapport sur votre travail.", "Écrivez une phrase de résultats avec 'Les données montrent que...'.", "Écrivez une recommandation avec 'nous recommandons'.", "Écrivez une conclusion courte (2 phrases) d'un rapport imaginaire."],
      speakingTopic: "Résumez un rapport imaginaire sur la performance de votre équipe.",
    },
    {
      id: 7,
      title: "Français pour Appels Téléphoniques et Visioconférences",
      subtitle: "Apprenez des phrases pour les appels téléphoniques et visioconférences professionnels.",
      sections: [
        { heading: "Démarrer un Appel", body: ["Bonjour, c'est... de l'entreprise Brightened Mind.", "Je vous appelle au sujet de...", "Est-ce un bon moment pour parler ?"] },
        { heading: "Pendant l'Appel", body: ["Pourriez-vous répéter cela, s'il vous plaît ?", "Désolé, la ligne n'est pas très claire.", "Laissez-moi vérifier cela et je vous recontacte.", "M'entendez-vous bien ?"] },
        { heading: "Terminer un Appel", body: ["Merci pour votre temps.", "Je vais vous envoyer un e-mail pour confirmer.", "À bientôt. Au revoir."] },
      ],
      speakText: `Démarrer un appel. Bonjour, c'est... de l'entreprise Brightened Mind. Je vous appelle au sujet de... Est-ce un bon moment pour parler ?

Pendant l'appel. Pourriez-vous répéter cela, s'il vous plaît ? Désolé, la ligne n'est pas très claire.

Terminer un appel. Merci pour votre temps. Je vais vous envoyer un e-mail pour confirmer.`,
      videoTopic: "Écouter un appel professionnel du début à la fin.",
      readingTitle: "Un Appel à un Client",
      reading: [
        "« Bonjour, c'est Sara de l'entreprise Brightened Mind. Je vous appelle au sujet de votre commande récente. »",
        "La connexion du client n'était pas très claire, alors Sara a dit, « Désolée, la ligne n'est pas très claire, pourriez-vous répéter cela, s'il vous plaît ? »",
        "Après avoir résolu le problème, Sara a dit, « Merci pour votre temps, je vais vous envoyer un e-mail pour tout confirmer. »",
        "Le client l'a remerciée, et ils ont terminé l'appel poliment.",
      ],
      readingSpeakText: `Un appel à un client. Bonjour, c'est Sara de l'entreprise Brightened Mind. Je vous appelle au sujet de votre commande récente.`,
      exercises: ["Écrivez comment vous démarreriez un appel professionnel.", "Écrivez une phrase pour demander à quelqu'un de répéter.", "Écrivez une phrase pour terminer un appel poliment.", "Pratiquez un dialogue téléphonique court avec un partenaire."],
      speakingTopic: "Jouez un appel téléphonique en vous présentant et en expliquant la raison de votre appel.",
    },
    {
      id: 8,
      title: "Réseautage et Conversation Informelle",
      subtitle: "Apprenez à faire une bonne impression professionnelle dans des conversations informelles.",
      sections: [
        { heading: "Engager une Conversation Informelle", body: ["Alors, comment connaissez-vous les organisateurs ?", "Qu'est-ce que vous faites dans la vie ?", "Êtes-vous déjà venu à un de ces événements ?"] },
        { heading: "Échanger des Coordonnées", body: ["C'était un plaisir de discuter avec vous. Puis-je avoir votre carte de visite ?", "Connectons-nous sur LinkedIn.", "Je vous enverrai un e-mail la semaine prochaine."] },
        { heading: "Sujets Sûrs vs. Sujets à Éviter", body: ["Sûrs : le travail, les tendances du secteur, l'événement lui-même, les voyages.", "À éviter : le salaire, la politique, les problèmes personnels, la religion."] },
      ],
      speakText: `Engager une conversation informelle. Alors, comment connaissez-vous les organisateurs ? Qu'est-ce que vous faites dans la vie ?

Échanger des coordonnées. C'était un plaisir de discuter avec vous. Puis-je avoir votre carte de visite ? Connectons-nous sur LinkedIn.

Sujets sûrs versus sujets à éviter. Sûrs : le travail, les tendances du secteur. À éviter : le salaire, la politique.`,
      videoTopic: "Voir une conversation informelle naturelle lors d'un événement professionnel.",
      readingTitle: "Rencontrer Quelqu'un de Nouveau à une Conférence",
      reading: [
        "À la conférence, Michel s'est présenté à un inconnu qui se tenait près de la table à café.",
        "Il a demandé, « Qu'est-ce que vous faites dans la vie ? » et ils ont découvert qu'ils travaillaient dans des secteurs similaires.",
        "Ils ont parlé des tendances du secteur et des voyages pendant une dizaine de minutes.",
        "Avant de partir, Michel a dit, « C'était un plaisir de discuter avec vous, puis-je avoir votre carte de visite ? Connectons-nous sur LinkedIn. »",
      ],
      readingSpeakText: `Rencontrer quelqu'un de nouveau à une conférence. À la conférence, Michel s'est présenté à un inconnu qui se tenait près de la table à café.`,
      exercises: ["Écrivez deux questions de conversation informelle pour un événement professionnel.", "Écrivez une phrase pour demander les coordonnées de quelqu'un.", "Listez deux sujets sûrs et deux sujets à éviter.", "Pratiquez une conversation courte de réseautage avec un partenaire."],
      speakingTopic: "Pratiquez vous présenter et faire la conversation à un événement de réseautage imaginaire.",
    },
    {
      id: 9,
      title: "Résolution de Problèmes et Prise de Décision",
      subtitle: "Apprenez le langage pour identifier des problèmes et prendre des décisions au travail.",
      sections: [
        { heading: "Identifier un Problème", body: ["Nous avons rencontré un problème avec...", "Le problème principal semble être...", "Cela a causé un retard dans..."] },
        { heading: "Proposer des Solutions", body: ["Une option serait de...", "Nous pourrions essayer...", "Et si nous...?"] },
        { heading: "Prendre une Décision", body: ["Allons-y avec cette option.", "Je pense que c'est la meilleure solution.", "Nous avons décidé d'aller de l'avant avec..."] },
      ],
      speakText: `Identifier un problème. Nous avons rencontré un problème avec... Le problème principal semble être... Cela a causé un retard dans...

Proposer des solutions. Une option serait de... Nous pourrions essayer... Et si nous...?

Prendre une décision. Allons-y avec cette option. Nous avons décidé d'aller de l'avant avec...`,
      videoTopic: "Voir une équipe identifier un problème et s'accorder sur une solution ensemble.",
      readingTitle: "Un Problème de Livraison",
      reading: [
        "L'équipe logistique a dit, « Nous avons rencontré un problème avec le camion de livraison. Le problème principal semble être une panne mécanique. »",
        "Le directeur a demandé des suggestions, et un employé a dit, « Et si nous louions un camion pour les livraisons d'aujourd'hui ? »",
        "Après une brève discussion, le directeur a dit, « Allons-y avec cette option. Nous avons décidé de louer un camion immédiatement. »",
        "Les livraisons ont été effectuées à temps grâce à cette décision rapide.",
      ],
      readingSpeakText: `Un problème de livraison. L'équipe logistique a dit, nous avons rencontré un problème avec le camion de livraison.`,
      exercises: ["Écrivez une phrase identifiant un problème au travail.", "Écrivez deux solutions proposées avec 'Nous pourrions essayer' et 'Et si nous'.", "Écrivez une phrase prenant une décision finale.", "Décrivez un problème que vous avez résolu récemment en utilisant le langage de cette leçon."],
      speakingTopic: "Décrivez un problème au travail et proposez deux solutions possibles.",
    },
    {
      id: 10,
      title: "Communication Interculturelle",
      subtitle: "Apprenez à communiquer avec respect et efficacité avec des collègues internationaux.",
      sections: [
        { heading: "Pourquoi la Sensibilité Culturelle Compte", body: ["Les cultures différentes ont des normes différentes sur le temps, la formalité et la franchise.", "Être conscient de ces différences aide à éviter les malentendus."] },
        { heading: "Phrases Utiles", body: ["Pourriez-vous m'aider à comprendre comment cela se fait habituellement dans votre pays ?", "Je veux m'assurer d'avoir bien compris.", "Merci de me dire si je dis quelque chose qui n'est pas clair."] },
        { heading: "Conseils pour une Communication Claire", body: ["Parlez clairement et évitez les expressions idiomatiques compliquées.", "Vérifiez la compréhension avec des questions de suivi simples.", "Soyez patient et respectueux envers des styles de communication différents."] },
      ],
      speakText: `Pourquoi la sensibilité culturelle compte. Les cultures différentes ont des normes différentes sur le temps, la formalité et la franchise.

Phrases utiles. Pourriez-vous m'aider à comprendre comment cela se fait habituellement dans votre pays ?

Conseils pour une communication claire. Parlez clairement et évitez les expressions idiomatiques compliquées.`,
      videoTopic: "Voir comment une équipe internationale communique clairement entre les cultures.",
      readingTitle: "Travailler avec une Équipe Internationale",
      reading: [
        "Quand l'entreprise Brightened Mind a commencé à travailler avec des partenaires à l'étranger, l'équipe a remarqué des différences culturelles.",
        "Dans certaines réunions, les collègues étaient très directs, tandis que dans d'autres, ils préféraient discuter plus lentement.",
        "Pour éviter les malentendus, le chef d'équipe demandait souvent, « Pourriez-vous m'aider à comprendre comment cela se fait habituellement dans votre pays ? »",
        "Cette habitude simple a aidé toute l'équipe à communiquer plus respectueusement et efficacement.",
      ],
      readingSpeakText: `Travailler avec une équipe internationale. Quand l'entreprise Brightened Mind a commencé à travailler avec des partenaires à l'étranger, l'équipe a remarqué des différences culturelles.`,
      exercises: ["Écrivez une phrase demandant comment les choses se font dans une autre culture.", "Écrivez une phrase pour vérifier votre compréhension poliment.", "Listez deux conseils pour une communication interculturelle claire.", "Décrivez une fois où vous avez communiqué avec quelqu'un d'un horizon différent."],
      speakingTopic: "Parlez de la façon dont vous communiqueriez respectueusement avec un collègue international.",
    },
    {
      id: 11,
      title: "Vocabulaire du Leadership et de la Gestion",
      subtitle: "Apprenez le vocabulaire clé utilisé par les managers et les leaders au travail.",
      sections: [
        { heading: "Vocabulaire Clé", body: ["Déléguer : confier une tâche à quelqu'un d'autre.", "Motiver : encourager quelqu'un à bien travailler.", "Feedback : des commentaires sur la performance de quelqu'un.", "Responsabilité : assumer ses actions et ses résultats."] },
        { heading: "Donner du Feedback", body: ["J'apprécie vraiment l'effort que vous avez mis dans ce travail.", "Un domaine que vous pourriez améliorer est...", "Fixons un objectif clair pour la prochaine fois."] },
        { heading: "Diriger une Équipe", body: ["J'aimerais vous déléguer cette tâche.", "Bon travail pour avoir motivé l'équipe cette semaine.", "Nous devons tous être responsables de nos délais."] },
      ],
      speakText: `Vocabulaire clé. Déléguer signifie confier une tâche à quelqu'un d'autre. Motiver signifie encourager quelqu'un à bien travailler. Le feedback, ce sont des commentaires sur la performance. La responsabilité, c'est assumer ses résultats.

Donner du feedback. J'apprécie vraiment l'effort que vous avez mis dans ce travail.

Diriger une équipe. J'aimerais vous déléguer cette tâche.`,
      videoTopic: "Voir un manager donner un feedback clair et respectueux à un membre de l'équipe.",
      readingTitle: "Un Nouveau Chef d'Équipe",
      reading: [
        "Quand Joseph est devenu chef d'équipe, il a appris à déléguer des tâches au lieu de tout faire lui-même.",
        "Il a aussi appris à donner un feedback clair, en disant des choses comme, « J'apprécie vraiment l'effort que vous avez mis dans ce travail. Un domaine que vous pourriez améliorer est le respect des délais. »",
        "Son équipe est devenue plus motivée car elle se sentait digne de confiance et responsable de son propre travail.",
        "En quelques mois, la performance de l'équipe s'est considérablement améliorée.",
      ],
      readingSpeakText: `Un nouveau chef d'équipe. Quand Joseph est devenu chef d'équipe, il a appris à déléguer des tâches au lieu de tout faire lui-même.`,
      exercises: ["Définissez 'déléguer', 'motiver', 'feedback' et 'responsabilité' avec vos propres mots.", "Écrivez une phrase de feedback positif pour un collègue.", "Écrivez une phrase de feedback constructif polie.", "Décrivez un bon leader que vous connaissez en utilisant le vocabulaire de la leçon."],
      speakingTopic: "Donnez un feedback à un membre imaginaire de votre équipe sur son travail récent.",
    },
    {
      id: 12,
      title: "Révision Finale et Conversation Professionnelle Réelle",
      subtitle: "Révisez tout ce qui a été appris au Niveau 3 et pratiquez une conversation professionnelle complète.",
      sections: [
        {
          heading: "Ce que Nous Avons Appris",
          body: [
            "Utiliser le conditionnel et les verbes modaux professionnellement",
            "Négocier des prix et des accords",
            "Donner des présentations claires",
            "Participer à des réunions et rédiger des comptes-rendus",
            "Écrire des rapports et des propositions",
            "Gérer les appels et les visioconférences",
            "Faire du réseautage et de la conversation informelle",
            "Résoudre des problèmes et prendre des décisions",
            "Communiquer entre les cultures",
            "Utiliser le vocabulaire du leadership et de la gestion",
          ],
        },
        {
          heading: "Exemple de Conversation Professionnelle Réelle",
          body: [
            "A : Bonjour. Merci de vous joindre à cet appel.",
            "B : Bonjour, ravi d'être là. Je vous appelle au sujet de la proposition que vous avez envoyée.",
            "A : Bien sûr. Qu'en pensez-vous ?",
            "B : Dans l'ensemble, elle semble solide. Si vous pouviez prolonger le délai de livraison d'une semaine, nous signerions immédiatement.",
            "A : Cela semble raisonnable. Laissez-moi vérifier avec mon équipe et je vous réponds aujourd'hui.",
            "B : Parfait, merci pour votre temps. J'espère que nous travaillerons ensemble.",
          ],
        },
      ],
      speakText: `Les choses importantes que nous avons apprises au Niveau 3 incluent utiliser le conditionnel et les verbes modaux professionnellement, négocier, donner des présentations, participer à des réunions, écrire des rapports, gérer les appels, faire du réseautage, résoudre des problèmes, communiquer entre les cultures, et le vocabulaire du leadership.

Exemple de conversation professionnelle réelle.

Bonjour. Merci de vous joindre à cet appel.
Bonjour, ravi d'être là. Je vous appelle au sujet de la proposition que vous avez envoyée.`,
      videoTopic: "Réviser tous les sujets du Niveau 3 à travers une conversation professionnelle complète.",
      readingTitle: "Terminer le Programme",
      reading: [
        "Après avoir terminé les Niveaux 1, 2 et 3, Chantal peut maintenant diriger des réunions, rédiger des rapports professionnels et négocier avec des clients internationaux en toute confiance.",
        "Elle se souvient avoir eu du mal avec des salutations simples quand elle a commencé, et maintenant elle donne des présentations complètes en français.",
        "Chantal dit que pratiquer de vraies conversations, pas seulement les règles de grammaire, a fait la plus grande différence.",
        "Elle est maintenant prête à utiliser le français en toute confiance dans sa carrière à l'entreprise Brightened Mind.",
      ],
      readingSpeakText: `Terminer le programme. Après avoir terminé les Niveaux 1, 2 et 3, Chantal peut maintenant diriger des réunions, rédiger des rapports professionnels et négocier avec des clients internationaux en toute confiance.`,
      exercises: ["Écrivez un dialogue professionnel court utilisant au moins trois sujets du Niveau 3.", "Pratiquez la conversation d'exemple à voix haute avec un partenaire.", "Écrivez un paragraphe court sur votre parcours d'apprentissage du français.", "Donnez une présentation résumé d'1 minute sur ce que vous avez appris dans les trois niveaux."],
      speakingTopic: "Faites un appel professionnel complet : saluez, discutez d'une proposition, négociez et terminez poliment.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Quiz 1",
      subtitle: "Le Conditionnel pour les Affaires",
      passingScore: 7,
      questions: [
        { question: "Laquelle est une phrase de possibilité probable ?", options: ["Si nous terminons tôt, nous enverrons aujourd'hui", "Si j'avais des ailes, je volerais", "S'il a plu"], answer: "Si nous terminons tôt, nous enverrons aujourd'hui" },
        { question: "Laquelle est une phrase hypothétique peu probable ?", options: ["Si j'avais plus de temps, je relirais", "Si tu appelles, je répondrai", "Si nous gagnons, nous célébrons"], answer: "Si j'avais plus de temps, je relirais" },
        { question: "Quel temps suit 'si' pour une possibilité probable ?", options: ["présent", "imparfait", "conditionnel"], answer: "présent" },
        { question: "Quel temps suit 'si' pour une hypothèse peu probable ?", options: ["imparfait", "présent", "futur"], answer: "imparfait" },
        { question: "Le conditionnel est fréquent dans quelle activité professionnelle ?", options: ["Les négociations et la planification", "Nettoyer le bureau", "Les pauses déjeuner"], answer: "Les négociations et la planification" },
        { question: "Qu'a offert le fournisseur dans la conversation ?", options: ["Une remise pour une commande plus importante", "Un cadeau gratuit", "Rien"], answer: "Une remise pour une commande plus importante" },
        { question: "Qu'a dit la directrice sur le budget ?", options: ["S'ils avaient un budget plus important, ils commanderaient le double", "Ils n'avaient aucun budget", "Le budget était illimité"], answer: "S'ils avaient un budget plus important, ils commanderaient le double" },
        { question: "Que s'est-il passé à la fin de la réunion ?", options: ["Ils ont signé un nouveau contrat", "Ils ont annulé l'accord", "Rien n'a été décidé"], answer: "Ils ont signé un nouveau contrat" },
        { question: "Choisissez la phrase correcte avec 'avais'.", options: ["Si j'avais plus de temps, je relirais la proposition", "Si j'avais plus de temps je relirai la proposition", "Avais si plus de temps"], answer: "Si j'avais plus de temps, je relirais la proposition" },
        { question: "Pourquoi le conditionnel est-il important en français des affaires ?", options: ["Il aide à discuter des possibilités et des conséquences", "Il ne sert qu'à cuisiner", "Il n'a pas d'utilité réelle"], answer: "Il aide à discuter des possibilités et des conséquences" },
      ],
    },
    {
      lessonId: 2,
      title: "Quiz 2",
      subtitle: "Les Verbes Modaux pour les Affaires",
      passingScore: 7,
      questions: [
        { question: "Quel verbe exprime une obligation forte ?", options: ["devoir", "pourrait", "devrait"], answer: "devoir" },
        { question: "Quel verbe sert à donner un conseil ?", options: ["devrait", "devoir", "vais"], answer: "devrait" },
        { question: "Quel verbe montre une possibilité ?", options: ["pourrait", "doit", "avait besoin"], answer: "pourrait" },
        { question: "Choisissez la phrase correcte.", options: ["Tout le personnel doit envoyer le rapport avant vendredi", "Tout le personnel pourrait envoyer doit", "Doit pourrait le personnel envoyer"], answer: "Tout le personnel doit envoyer le rapport avant vendredi" },
        { question: "Choisissez la phrase de conseil.", options: ["Vous devriez revoir les chiffres", "Vous devez revoir jamais", "Vous pourriez revoir toujours"], answer: "Vous devriez revoir les chiffres" },
        { question: "Qu'a dit la directrice financière être nécessaire ?", options: ["Terminer les documents de l'audit avant lundi", "Fermer le bureau", "Commencer les vacances"], answer: "Terminer les documents de l'audit avant lundi" },
        { question: "Qu'a-t-elle suggéré de plus ?", options: ["Préparer un court résumé pour le directeur", "Annuler l'audit", "Retarder le travail"], answer: "Préparer un court résumé pour le directeur" },
        { question: "Le délai a-t-il changé ?", options: ["Non, c'était peu probable", "Oui, immédiatement", "Le délai n'a jamais été mentionné"], answer: "Non, c'était peu probable" },
        { question: "Quand l'équipe a-t-elle terminé le travail ?", options: ["À temps", "Très en retard", "Jamais"], answer: "À temps" },
        { question: "Quelle est la différence entre 'devoir' et 'devrait' ?", options: ["'Devoir' est une obligation forte, 'devrait' est un conseil", "Ils signifient exactement la même chose", "'Devrait' est plus fort"], answer: "'Devoir' est une obligation forte, 'devrait' est un conseil" },
      ],
    },
    {
      lessonId: 3,
      title: "Quiz 3",
      subtitle: "Langage de Négociation",
      passingScore: 7,
      questions: [
        { question: "Quelle phrase ouvre une négociation ?", options: ["Nous aimerions discuter des termes du contrat", "Adieu pour toujours", "Je ne veux pas parler"], answer: "Nous aimerions discuter des termes du contrat" },
        { question: "Quelle phrase fait une offre ?", options: ["Nous pouvons vous offrir une remise de 10%", "Nous refusons complètement", "Il n'y a pas d'accord"], answer: "Nous pouvons vous offrir une remise de 10%" },
        { question: "Quelle phrase montre un compromis ?", options: ["Nous pouvons trouver un terrain d'entente", "Nous ne serons jamais d'accord", "C'est à prendre ou à laisser"], answer: "Nous pouvons trouver un terrain d'entente" },
        { question: "Quelle phrase conclut un accord ?", options: ["Mettons cela par écrit", "Oublions que c'est arrivé", "Je ne suis pas du tout d'accord"], answer: "Mettons cela par écrit" },
        { question: "Pendant combien de temps les deux entreprises ont-elles négocié ?", options: ["Presque deux heures", "Cinq minutes", "Toute la semaine"], answer: "Presque deux heures" },
        { question: "Qu'a pensé l'acheteur du prix au début ?", options: ["Il était trop élevé", "Il était trop bas", "Il était parfait"], answer: "Il était trop élevé" },
        { question: "Quelle remise le vendeur a-t-il offerte ?", options: ["10% pour une commande plus importante", "50% pour tout le monde", "Aucune remise"], answer: "10% pour une commande plus importante" },
        { question: "Qu'a demandé l'acheteur en plus ?", options: ["La livraison gratuite", "Un nouveau logo", "Une réunion plus longue"], answer: "La livraison gratuite" },
        { question: "Comment la négociation s'est-elle terminée ?", options: ["Les deux parties se sont serré la main et se sont mises d'accord", "L'accord s'est effondré", "Ils ne se sont plus jamais parlé"], answer: "Les deux parties se sont serré la main et se sont mises d'accord" },
        { question: "Quelle phrase ont-ils utilisée à la fin ?", options: ["Nous sommes impatients de travailler avec vous", "Nous ne voulons plus nous revoir", "C'était une perte de temps"], answer: "Nous sommes impatients de travailler avec vous" },
      ],
    },
    {
      lessonId: 4,
      title: "Quiz 4",
      subtitle: "Prise de Parole en Public",
      passingScore: 7,
      questions: [
        { question: "Quelle phrase ouvre une présentation ?", options: ["Bonjour à tous, merci d'être présents", "Au revoir à tous", "Je n'ai rien à dire"], answer: "Bonjour à tous, merci d'être présents" },
        { question: "Quelle phrase avance vers un nouveau point ?", options: ["Passons à la diapositive suivante", "La fin", "Rien"], answer: "Passons à la diapositive suivante" },
        { question: "Quelle phrase clôture une présentation ?", options: ["Pour résumer, les points clés sont...", "J'ai oublié ce que je voulais dire", "Recommençons"], answer: "Pour résumer, les points clés sont..." },
        { question: "Quelle phrase invite aux questions ?", options: ["Avez-vous des questions ?", "Aucune question n'est autorisée", "C'est tout, au revoir"], answer: "Avez-vous des questions ?" },
        { question: "Qui était nerveuse avant sa première présentation ?", options: ["Linda", "Sara", "Clara"], answer: "Linda" },
        { question: "Comment Linda a-t-elle structuré son discours ?", options: ["Problème, puis solution, puis résultats", "Sans aucun ordre", "Seulement des blagues"], answer: "Problème, puis solution, puis résultats" },
        { question: "Quels étaient les points clés que Linda a résumés ?", options: ["La réduction des coûts et une livraison plus rapide", "La décoration du bureau", "Le menu du déjeuner"], answer: "La réduction des coûts et une livraison plus rapide" },
        { question: "Comment l'équipe s'est-elle sentie par rapport à la présentation de Linda ?", options: ["Impressionnée par sa clarté", "Confuse", "Elle a quitté la salle"], answer: "Impressionnée par sa clarté" },
        { question: "Que doit avoir une présentation au début ?", options: ["Une idée claire de ce qui sera discuté", "Rien, commencer au hasard", "Seulement la conclusion"], answer: "Une idée claire de ce qui sera discuté" },
        { question: "Quelle phrase aide à expliquer un graphique ?", options: ["Comme vous pouvez le voir sur ce graphique...", "Je ne comprends pas ce graphique", "Les graphiques ne servent à rien"], answer: "Comme vous pouvez le voir sur ce graphique..." },
      ],
    },
    {
      lessonId: 5,
      title: "Quiz 5",
      subtitle: "Réunions Formelles et Comptes-Rendus",
      passingScore: 7,
      questions: [
        { question: "Quelle phrase commence une réunion ?", options: ["Pouvons-nous commencer ?", "La réunion est annulée", "Au revoir"], answer: "Pouvons-nous commencer ?" },
        { question: "Quelle phrase interrompt poliment ?", options: ["Désolé de vous interrompre, mais...", "Taisez-vous", "Arrêtez de parler maintenant"], answer: "Désolé de vous interrompre, mais..." },
        { question: "Quelle phrase demande à ajouter un point ?", options: ["Si je peux ajouter...", "Je refuse de parler", "C'est absurde"], answer: "Si je peux ajouter..." },
        { question: "Que consigne un compte-rendu de réunion ?", options: ["Ce qui a été discuté et décidé", "Seulement les blagues racontées", "Rien d'important"], answer: "Ce qui a été discuté et décidé" },
        { question: "Que sont les 'actions à mener' ?", options: ["Des tâches assignées, avec un responsable et une échéance", "Des collations servies en réunion", "Le nom de la réunion"], answer: "Des tâches assignées, avec un responsable et une échéance" },
        { question: "À quelle heure la réunion du lundi a-t-elle commencé ?", options: ["À 9 heures", "À midi", "À 18 heures"], answer: "À 9 heures" },
        { question: "Qu'a suggéré Pierre de revoir ?", options: ["Le budget", "Le menu", "Le logo"], answer: "Le budget" },
        { question: "Qui a rédigé le compte-rendu ?", options: ["La secrétaire", "Pierre", "Personne"], answer: "La secrétaire" },
        { question: "Que contenait le compte-rendu ?", options: ["Les présents, l'ordre du jour et les actions à mener", "Seulement la date", "Seulement des blagues"], answer: "Les présents, l'ordre du jour et les actions à mener" },
        { question: "Comment l'équipe a-t-elle reçu le compte-rendu ?", options: ["Par e-mail le jour même", "Ils ne l'ont jamais reçu", "Par courrier un mois plus tard"], answer: "Par e-mail le jour même" },
      ],
    },
    {
      lessonId: 6,
      title: "Quiz 6",
      subtitle: "Rédaction Administrative : Rapports et Propositions",
      passingScore: 7,
      questions: [
        { question: "Quelle est la première partie d'un rapport ?", options: ["Introduction", "Recommandations", "Résultats"], answer: "Introduction" },
        { question: "Quelle section présente les faits et les données ?", options: ["Résultats", "Introduction", "Conclusion"], answer: "Résultats" },
        { question: "Quelle section suggère les prochaines étapes ?", options: ["Recommandations", "Résultats", "Introduction"], answer: "Recommandations" },
        { question: "Quelle phrase présente l'objectif d'un rapport ?", options: ["L'objectif de ce rapport est de...", "Il était une fois...", "Fin."], answer: "L'objectif de ce rapport est de..." },
        { question: "Quelle phrase présente des données ?", options: ["Les données montrent que...", "Je pense peut-être que...", "Qui sait..."], answer: "Les données montrent que..." },
        { question: "De quoi parlait le rapport ?", options: ["La satisfaction client", "Les vacances des employés", "Le mobilier de bureau"], answer: "La satisfaction client" },
        { question: "Quel pourcentage de clients était satisfait ?", options: ["85%", "15%", "50%"], answer: "85%" },
        { question: "Qu'ont mentionné certains clients ?", options: ["Les temps de réponse pourraient être plus rapides", "Les prix étaient trop bas", "Rien"], answer: "Les temps de réponse pourraient être plus rapides" },
        { question: "Qu'a recommandé le rapport ?", options: ["D'embaucher deux employés supplémentaires pour le support client", "De fermer l'entreprise", "De réduire le personnel"], answer: "D'embaucher deux employés supplémentaires pour le support client" },
        { question: "Quelle était la conclusion du rapport ?", options: ["La satisfaction s'améliore mais de petits changements pourraient aider", "Tout était parfait", "Tout était terrible"], answer: "La satisfaction s'améliore mais de petits changements pourraient aider" },
      ],
    },
    {
      lessonId: 7,
      title: "Quiz 7",
      subtitle: "Français pour Appels Téléphoniques et Visioconférences",
      passingScore: 7,
      questions: [
        { question: "Quelle phrase démarre un appel professionnel ?", options: ["Bonjour, c'est... de...", "Qui êtes-vous ?", "Qu'est-ce que vous voulez ?"], answer: "Bonjour, c'est... de..." },
        { question: "Quelle phrase demande à quelqu'un de répéter ?", options: ["Pourriez-vous répéter cela, s'il vous plaît ?", "Ça ne m'intéresse pas ce que vous avez dit", "Taisez-vous"], answer: "Pourriez-vous répéter cela, s'il vous plaît ?" },
        { question: "Quelle phrase termine un appel poliment ?", options: ["Merci pour votre temps", "Je raccroche maintenant", "Peu importe"], answer: "Merci pour votre temps" },
        { question: "Quelle phrase vérifie la connexion ?", options: ["M'entendez-vous bien ?", "Ça ne m'intéresse pas si vous m'entendez", "Cet appel est ennuyeux"], answer: "M'entendez-vous bien ?" },
        { question: "Qui a appelé le client ?", options: ["Sara", "Linda", "Clara"], answer: "Sara" },
        { question: "De quoi parlait l'appel ?", options: ["La commande récente du client", "Un entretien d'embauche", "Une plainte pour bruit"], answer: "La commande récente du client" },
        { question: "Quel problème s'est produit pendant l'appel ?", options: ["La ligne n'était pas très claire", "L'appel a été coupé", "Personne n'a répondu"], answer: "La ligne n'était pas très claire" },
        { question: "Qu'a dit Sara qu'elle ferait après l'appel ?", options: ["Envoyer un e-mail pour confirmer", "Rappeler dans 5 minutes", "Rien"], answer: "Envoyer un e-mail pour confirmer" },
        { question: "Comment l'appel s'est-il terminé ?", options: ["Poliment, avec des remerciements des deux côtés", "Le client a raccroché en colère", "Il n'a jamais été résolu"], answer: "Poliment, avec des remerciements des deux côtés" },
        { question: "Quelle phrase est utile si vous n'avez pas compris quelque chose ?", options: ["Désolé, la ligne n'est pas très claire", "J'ai tout compris parfaitement", "Veuillez arrêter d'appeler"], answer: "Désolé, la ligne n'est pas très claire" },
      ],
    },
    {
      lessonId: 8,
      title: "Quiz 8",
      subtitle: "Réseautage et Conversation Informelle",
      passingScore: 7,
      questions: [
        { question: "Quelle est une bonne question de conversation informelle ?", options: ["Qu'est-ce que vous faites dans la vie ?", "Combien gagnez-vous ?", "Pourquoi êtes-vous ici ?"], answer: "Qu'est-ce que vous faites dans la vie ?" },
        { question: "Quelle phrase demande des coordonnées ?", options: ["Puis-je avoir votre carte de visite ?", "Donnez-moi votre téléphone maintenant", "Je n'ai pas besoin de votre contact"], answer: "Puis-je avoir votre carte de visite ?" },
        { question: "Quel sujet est généralement sûr pour une conversation informelle ?", options: ["Les tendances du secteur", "Le salaire", "Les problèmes personnels"], answer: "Les tendances du secteur" },
        { question: "Quel sujet faut-il généralement éviter ?", options: ["La politique", "L'événement lui-même", "Les voyages"], answer: "La politique" },
        { question: "Où Michel a-t-il rencontré quelqu'un de nouveau ?", options: ["À une conférence", "Sur un terrain de sport", "Dans un restaurant"], answer: "À une conférence" },
        { question: "Quelle question Michel a-t-il posée ?", options: ["Qu'est-ce que vous faites dans la vie ?", "Quel âge avez-vous ?", "Où habitez-vous ?"], answer: "Qu'est-ce que vous faites dans la vie ?" },
        { question: "Qu'ont-ils découvert avoir en commun ?", options: ["Ils travaillaient dans des secteurs similaires", "Ils étaient voisins", "Ils avaient étudié ensemble"], answer: "Ils travaillaient dans des secteurs similaires" },
        { question: "De quoi ont-ils parlé pendant dix minutes ?", options: ["Des tendances du secteur et des voyages", "Seulement de la météo", "De rien"], answer: "Des tendances du secteur et des voyages" },
        { question: "Qu'a demandé Michel avant de partir ?", options: ["Une carte de visite", "De l'argent", "Un cadeau"], answer: "Une carte de visite" },
        { question: "Quelle plateforme Michel a-t-il suggérée pour se connecter ?", options: ["LinkedIn", "N'importe quelle plateforme au hasard", "Aucune plateforme"], answer: "LinkedIn" },
      ],
    },
    {
      lessonId: 9,
      title: "Quiz 9",
      subtitle: "Résolution de Problèmes et Prise de Décision",
      passingScore: 7,
      questions: [
        { question: "Quelle phrase identifie un problème ?", options: ["Nous avons rencontré un problème avec...", "Tout est parfait", "Il n'y a aucun problème ici"], answer: "Nous avons rencontré un problème avec..." },
        { question: "Quelle phrase suggère une solution ?", options: ["Et si nous...?", "Je refuse de réfléchir", "Rien ne peut être fait"], answer: "Et si nous...?" },
        { question: "Quelle phrase prend une décision finale ?", options: ["Allons-y avec cette option", "Peut-être un autre jour", "Je ne peux jamais décider"], answer: "Allons-y avec cette option" },
        { question: "À quel problème l'équipe logistique était-elle confrontée ?", options: ["Une panne mécanique du camion de livraison", "Un employé absent", "Un bureau fermé"], answer: "Une panne mécanique du camion de livraison" },
        { question: "Quelle solution un employé a-t-il suggérée ?", options: ["Louer un camion pour les livraisons d'aujourd'hui", "Annuler toutes les livraisons", "Attendre un mois"], answer: "Louer un camion pour les livraisons d'aujourd'hui" },
        { question: "Qu'a décidé le directeur ?", options: ["Louer un camion immédiatement", "Ne rien faire", "Licencier l'équipe"], answer: "Louer un camion immédiatement" },
        { question: "Les livraisons ont-elles été effectuées à temps ?", options: ["Oui, grâce à la décision rapide", "Non, tout était en retard", "Le texte ne le dit pas"], answer: "Oui, grâce à la décision rapide" },
        { question: "Quelle phrase montre que quelque chose a causé un retard ?", options: ["Cela a causé un retard dans...", "Tout est à l'heure", "Il n'y a aucun retard"], answer: "Cela a causé un retard dans..." },
        { question: "Quelle phrase propose une option ?", options: ["Une option serait de...", "Il n'y a aucune option", "Arrêtez de proposer des choses"], answer: "Une option serait de..." },
        { question: "Pourquoi ce langage est-il important au travail ?", options: ["Il aide à identifier des problèmes et à s'accorder rapidement sur des solutions", "Il ne sert qu'au restaurant", "Il n'a pas d'utilité réelle"], answer: "Il aide à identifier des problèmes et à s'accorder rapidement sur des solutions" },
      ],
    },
    {
      lessonId: 10,
      title: "Quiz 10",
      subtitle: "Communication Interculturelle",
      passingScore: 7,
      questions: [
        { question: "Pourquoi la sensibilité culturelle compte-t-elle au travail ?", options: ["Elle aide à éviter les malentendus", "Elle n'a pas d'utilité réelle", "Elle ne concerne que les vacances"], answer: "Elle aide à éviter les malentendus" },
        { question: "Quelle phrase aide à comprendre le style d'une autre culture ?", options: ["Pourriez-vous m'aider à comprendre comment cela se fait dans votre pays ?", "Votre façon de faire est fausse", "Ça ne m'intéresse pas votre culture"], answer: "Pourriez-vous m'aider à comprendre comment cela se fait dans votre pays ?" },
        { question: "Quelle phrase vérifie la compréhension poliment ?", options: ["Je veux m'assurer d'avoir bien compris", "Ça n'a pas de sens ce que vous dites", "Laissez tomber"], answer: "Je veux m'assurer d'avoir bien compris" },
        { question: "Quel est un conseil pour une communication claire ?", options: ["Éviter les expressions compliquées", "Parler le plus vite possible", "N'utiliser que de l'argot"], answer: "Éviter les expressions compliquées" },
        { question: "Quelle différence l'équipe a-t-elle remarquée ?", options: ["Des différences de franchise et de rythme des réunions", "Aucune différence", "Seulement des différences de nourriture"], answer: "Des différences de franchise et de rythme des réunions" },
        { question: "Que demandait souvent le chef d'équipe ?", options: ["Comment les choses se font dans le pays du collègue", "Il ne posait jamais de questions", "Seulement sur la météo"], answer: "Comment les choses se font dans le pays du collègue" },
        { question: "Qu'est-ce que cette habitude a aidé l'équipe à faire ?", options: ["Communiquer plus respectueusement et efficacement", "Éviter de communiquer complètement", "Ignorer les différences culturelles"], answer: "Communiquer plus respectueusement et efficacement" },
        { question: "Comment devriez-vous être en communiquant entre les cultures ?", options: ["Patient et respectueux", "Pressé et brusque", "Complètement silencieux"], answer: "Patient et respectueux" },
        { question: "Qu'est-ce qui aide à vérifier la compréhension dans une conversation ?", options: ["Des questions de suivi simples", "Ignorer l'interlocuteur", "Changer de sujet immédiatement"], answer: "Des questions de suivi simples" },
        { question: "Sur quoi les cultures peuvent-elles avoir des normes différentes ?", options: ["Le temps, la formalité et la franchise", "Seulement les vêtements", "Rien d'important"], answer: "Le temps, la formalité et la franchise" },
      ],
    },
    {
      lessonId: 11,
      title: "Quiz 11",
      subtitle: "Vocabulaire du Leadership et de la Gestion",
      passingScore: 7,
      questions: [
        { question: "Que signifie 'déléguer' ?", options: ["Confier une tâche à quelqu'un d'autre", "Ignorer une tâche", "Annuler une réunion"], answer: "Confier une tâche à quelqu'un d'autre" },
        { question: "Que signifie 'motiver' ?", options: ["Encourager quelqu'un à bien travailler", "Décourager quelqu'un", "Licencier quelqu'un"], answer: "Encourager quelqu'un à bien travailler" },
        { question: "Que signifie 'feedback' ?", options: ["Des commentaires sur la performance de quelqu'un", "Un type de salle de réunion", "Un jour férié de l'entreprise"], answer: "Des commentaires sur la performance de quelqu'un" },
        { question: "Que signifie 'responsabilité' ?", options: ["Assumer ses actions et ses résultats", "Éviter la responsabilité", "Travailler toujours seul"], answer: "Assumer ses actions et ses résultats" },
        { question: "Qu'a appris Joseph en devenant chef d'équipe ?", options: ["À déléguer des tâches au lieu de tout faire lui-même", "À tout faire seul", "À éviter de donner du feedback"], answer: "À déléguer des tâches au lieu de tout faire lui-même" },
        { question: "Quel type de feedback Joseph a-t-il donné ?", options: ["Clair et constructif", "Seulement sévère", "Il n'a jamais donné de feedback"], answer: "Clair et constructif" },
        { question: "Pourquoi l'équipe est-elle devenue plus motivée ?", options: ["Elle se sentait digne de confiance et responsable", "Elle a eu plus de vacances", "Elle a eu moins de travail"], answer: "Elle se sentait digne de confiance et responsable" },
        { question: "Qu'est-il arrivé à la performance de l'équipe ?", options: ["Elle s'est considérablement améliorée", "Elle a empiré", "Elle est restée exactement la même"], answer: "Elle s'est considérablement améliorée" },
        { question: "Quelle phrase donne un feedback positif ?", options: ["J'apprécie vraiment l'effort que vous avez mis dans ce travail", "Vous ne faites jamais rien de bien", "Ça ne m'intéresse pas votre travail"], answer: "J'apprécie vraiment l'effort que vous avez mis dans ce travail" },
        { question: "Quelle phrase concerne la responsabilité ?", options: ["Nous devons tous être responsables de nos délais", "Les délais n'importent à personne", "Vous seul êtes responsable"], answer: "Nous devons tous être responsables de nos délais" },
      ],
    },
    {
      lessonId: 12,
      title: "Quiz 12",
      subtitle: "Révision Finale et Conversation Professionnelle Réelle",
      passingScore: 7,
      questions: [
        { question: "Quelle grammaire a été révisée dans la Leçon 1 ?", options: ["Le conditionnel", "Les couleurs", "Les nombres"], answer: "Le conditionnel" },
        { question: "De quoi parlait la Leçon 3 ?", options: ["Le langage de négociation", "Le vocabulaire de cuisine", "Le sport"], answer: "Le langage de négociation" },
        { question: "Sur quelle compétence la Leçon 4 était-elle centrée ?", options: ["La prise de parole en public", "Le jardinage", "La conduite"], answer: "La prise de parole en public" },
        { question: "Avec quoi Chantal avait-elle du mal au début ?", options: ["Les salutations simples", "Les calculs compliqués", "L'écriture de chansons"], answer: "Les salutations simples" },
        { question: "Que peut faire Chantal maintenant ?", options: ["Diriger des réunions, rédiger des rapports et négocier avec des clients internationaux", "Rien de nouveau", "Seulement dire des salutations"], answer: "Diriger des réunions, rédiger des rapports et négocier avec des clients internationaux" },
        { question: "Qu'est-ce qui a fait la plus grande différence pour Chantal selon le texte ?", options: ["Pratiquer de vraies conversations", "Lire seulement des livres de grammaire", "Éviter de parler français au travail"], answer: "Pratiquer de vraies conversations" },
        { question: "Dans l'appel d'exemple, qu'a demandé le locuteur B ?", options: ["Prolonger le délai de livraison d'une semaine", "Une remise de 50%", "Annuler le contrat"], answer: "Prolonger le délai de livraison d'une semaine" },
        { question: "Comment le locuteur A a-t-il répondu à la demande ?", options: ["Il a accepté de vérifier avec son équipe et de répondre aujourd'hui", "Il a refusé immédiatement", "Il a raccroché"], answer: "Il a accepté de vérifier avec son équipe et de répondre aujourd'hui" },
        { question: "Comment l'appel d'exemple s'est-il terminé ?", options: ["Poliment, en espérant travailler ensemble", "Dans une dispute", "Sans aucune résolution"], answer: "Poliment, en espérant travailler ensemble" },
        { question: "Qu'est-ce que Chantal est prête à faire maintenant ?", options: ["Utiliser le français en toute confiance au travail", "Quitter son emploi", "Éviter le français des affaires"], answer: "Utiliser le français en toute confiance au travail" },
      ],
    },
  ],

  finalQuiz: {
    title: "Quiz Final - Niveau 3",
    subtitle: "Ce quiz couvre toutes les leçons du Niveau 3.",
    passingScore: 15,
    questions: [
      { question: "Laquelle est une phrase de possibilité probable ?", options: ["Si nous terminons tôt, nous enverrons aujourd'hui", "Si j'avais des ailes, je volerais", "S'il a plu"], answer: "Si nous terminons tôt, nous enverrons aujourd'hui" },
      { question: "Quel verbe exprime une obligation forte ?", options: ["devoir", "pourrait", "peut"], answer: "devoir" },
      { question: "Quelle phrase fait une offre dans une négociation ?", options: ["Nous pouvons vous offrir une remise", "Nous refusons de parler", "Il n'y a pas d'offre"], answer: "Nous pouvons vous offrir une remise" },
      { question: "Quelle phrase ouvre une présentation ?", options: ["Bonjour à tous, merci d'être présents", "Au revoir", "Je n'ai rien à dire"], answer: "Bonjour à tous, merci d'être présents" },
      { question: "Quelle phrase commence une réunion ?", options: ["Pouvons-nous commencer ?", "La réunion est annulée", "Aucun avis"], answer: "Pouvons-nous commencer ?" },
      { question: "Quelle est la première partie d'un rapport professionnel ?", options: ["Introduction", "Recommandations", "Conclusion"], answer: "Introduction" },
      { question: "Quelle phrase démarre un appel professionnel ?", options: ["Bonjour, c'est... de...", "Qui êtes-vous ?", "Qu'est-ce que vous voulez ?"], answer: "Bonjour, c'est... de..." },
      { question: "Quel sujet est sûr pour une conversation informelle ?", options: ["Les tendances du secteur", "Le salaire", "La politique"], answer: "Les tendances du secteur" },
      { question: "Quelle phrase identifie un problème ?", options: ["Nous avons rencontré un problème avec...", "Tout est parfait", "Il n'y a aucun problème"], answer: "Nous avons rencontré un problème avec..." },
      { question: "Quelle phrase aide à la communication interculturelle ?", options: ["Pourriez-vous m'aider à comprendre comment cela se fait dans votre pays ?", "Votre façon de faire est fausse", "Ça ne m'intéresse pas votre culture"], answer: "Pourriez-vous m'aider à comprendre comment cela se fait dans votre pays ?" },
      { question: "Que signifie 'déléguer' ?", options: ["Confier une tâche à quelqu'un d'autre", "Ignorer une tâche", "Annuler une réunion"], answer: "Confier une tâche à quelqu'un d'autre" },
      { question: "Qu'a offert le fournisseur dans la Leçon 1 ?", options: ["Une remise pour une commande plus importante", "Un cadeau gratuit", "Rien"], answer: "Une remise pour une commande plus importante" },
      { question: "Comment Linda a-t-elle structuré sa présentation ?", options: ["Problème, puis solution, puis résultats", "Sans aucun ordre", "Seulement des blagues"], answer: "Problème, puis solution, puis résultats" },
      { question: "Que contenait le compte-rendu de la réunion ?", options: ["Les présents, l'ordre du jour et les actions à mener", "Seulement la date", "Seulement des blagues"], answer: "Les présents, l'ordre du jour et les actions à mener" },
      { question: "Quel pourcentage de clients était satisfait dans le rapport ?", options: ["85%", "15%", "50%"], answer: "85%" },
      { question: "Qu'a dit Sara qu'elle ferait après l'appel avec le client ?", options: ["Envoyer un e-mail pour confirmer", "Rappeler immédiatement", "Rien"], answer: "Envoyer un e-mail pour confirmer" },
      { question: "Qu'a demandé Michel à la personne qu'il a rencontrée ?", options: ["Une carte de visite", "De l'argent", "Un cadeau"], answer: "Une carte de visite" },
      { question: "Quelle solution l'équipe logistique a-t-elle choisie ?", options: ["Louer un camion immédiatement", "Attendre un mois", "Annuler les livraisons"], answer: "Louer un camion immédiatement" },
      { question: "Qu'est-ce qui a aidé l'équipe de Joseph à se motiver davantage ?", options: ["Se sentir digne de confiance et responsable", "Avoir plus de vacances", "Avoir moins de travail"], answer: "Se sentir digne de confiance et responsable" },
      { question: "Qu'est-ce qui a fait la plus grande différence pour Chantal à la fin ?", options: ["Pratiquer de vraies conversations", "Lire seulement des livres de grammaire", "Éviter le français au travail"], answer: "Pratiquer de vraies conversations" },
    ],
  },
};
