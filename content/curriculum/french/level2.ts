import type { LevelCurriculum } from "../types";

// New content authored for Phase 4, written entirely in French, mirroring
// the other languages' Level 2 topic plan and matching the B1-B2 feature
// list already promised on app/academia/francais/page.tsx: fluidity,
// complex tenses and syntax, writing emails/letters/reports, and
// understanding complex texts.
export const frenchLevel2: LevelCurriculum = {
  langCode: "FR",
  langLabel: "Français",
  langSlug: "french",
  level: 2,
  levelTitle: "Niveau 2 - Français Intermédiaire (B1-B2)",
  levelSubtitle: "Développer la fluidité, la grammaire avancée et la rédaction structurée.",

  lessons: [
    {
      id: 1,
      title: "Révision de Grammaire Intermédiaire",
      subtitle: "Révisez la structure de la phrase et l'accord sujet-verbe.",
      sections: [
        { heading: "Les Parties d'une Phrase", body: ["Chaque phrase a besoin d'un sujet et d'un verbe.", "Sujet = de qui ou de quoi parle la phrase.", "Verbe = l'action ou l'état.", "Exemple : Sarah (sujet) lit (verbe) un livre (complément)."] },
        { heading: "L'Accord Sujet-Verbe", body: ["Un sujet singulier prend un verbe au singulier.", "Elle travaille dans un hôpital.", "Un sujet pluriel prend un verbe au pluriel.", "Ils travaillent dans un hôpital."] },
        { heading: "Erreurs Courantes", body: ["Incorrect : Les enfants joue dehors.", "Correct : Les enfants jouent dehors.", "Incorrect : Il va à l'école hier.", "Correct : Il est allé à l'école hier."] },
      ],
      speakText: `Chaque phrase a besoin d'un sujet et d'un verbe.

Sujet signifie de qui ou de quoi parle la phrase. Verbe signifie l'action.

Exemple : Sarah lit un livre.

L'accord sujet-verbe. Un sujet singulier prend un verbe au singulier : elle travaille dans un hôpital.

Erreurs courantes. Incorrect : les enfants joue dehors. Correct : les enfants jouent dehors.`,
      videoTopic: "Réviser la structure de la phrase et l'accord sujet-verbe avec des exemples.",
      videoUrl: "https://www.youtube.com/watch?v=k93o98SdZDc",
      readingTitle: "Je m'appelle Grace.",
      reading: [
        "J'étudie maintenant le français de niveau intermédiaire.",
        "Chaque jour, je m'entraîne à construire des phrases correctes.",
        "Ma professeure dit qu'une bonne phrase a toujours un sujet clair et un verbe qui s'accorde.",
        "La semaine dernière, j'ai fait beaucoup d'erreurs, mais cette semaine je vérifie ma grammaire avec soin avant de parler.",
      ],
      readingSpeakText: `Je m'appelle Grace. J'étudie maintenant le français de niveau intermédiaire. Chaque jour, je m'entraîne à construire des phrases correctes.`,
      exercises: ["Identifiez le sujet et le verbe dans trois phrases d'un journal.", "Corrigez cette phrase : Les élèves est prêts.", "Écrivez deux phrases avec 'je' et deux avec 'elle'.", "Expliquez pourquoi 'Les enfants joue' est incorrect."],
      speakingTopic: "Expliquez avec vos propres mots ce que sont le sujet et le verbe.",
    },
    {
      id: 2,
      title: "Les Temps Complexes : Passé et Futur",
      subtitle: "Apprenez à parler de ce qui s'est déjà passé et de ce qui va arriver.",
      sections: [
        { heading: "Le Passé Composé", body: ["Utilisé pour des actions terminées dans le passé.", "Hier, j'ai rendu visite à ma grand-mère.", "Elle est allée au marché ce matin."] },
        { heading: "L'Imparfait", body: ["Utilisé pour une action en cours dans le passé ou une habitude.", "À 20 heures hier, j'étudiais le français.", "Pendant qu'elle cuisinait, le téléphone a sonné."] },
        { heading: "Le Futur Proche et le Futur Simple", body: ["Le futur proche sert pour des projets déjà décidés.", "Je vais visiter Paris l'année prochaine.", "Le futur simple sert pour des prédictions ou des décisions rapides.", "Je pense qu'il pleuvra demain.", "Je t'aiderai pour tes devoirs."] },
      ],
      speakText: `Le passé composé est utilisé pour des actions terminées dans le passé. Hier, j'ai rendu visite à ma grand-mère.

L'imparfait est utilisé pour une action en cours dans le passé. À vingt heures hier, j'étudiais le français.

Le futur proche et le futur simple. Je vais visiter Paris l'année prochaine. Je pense qu'il pleuvra demain.`,
      videoTopic: "Comparer le passé composé, l'imparfait et les deux formes de futur.",
      videoUrl: "https://www.youtube.com/watch?v=4IexZtlIqF0",
      readingTitle: "L'année dernière, Thomas a voyagé à Lubumbashi pour la première fois.",
      reading: [
        "Pendant qu'il attendait le bus, il a rencontré un vieil ami de l'école.",
        "Ils ont discuté pendant presque une heure et se sont rappelé leur enfance ensemble.",
        "Thomas a dit qu'il va revisiter Lubumbashi l'été prochain.",
        "Il a aussi dit qu'il invitera son ami à venir avec lui cette fois.",
      ],
      readingSpeakText: `L'année dernière, Thomas a voyagé à Lubumbashi pour la première fois. Pendant qu'il attendait le bus, il a rencontré un vieil ami de l'école.`,
      exercises: ["Écrivez trois phrases sur ce que vous avez fait hier au passé composé.", "Écrivez une phrase à l'imparfait.", "Écrivez une phrase sur vos projets pour l'année prochaine avec le futur proche.", "Faites une prédiction rapide sur la météo."],
      speakingTopic: "Parlez de ce que vous avez fait le week-end dernier et de ce que vous ferez le prochain.",
    },
    {
      id: 3,
      title: "Pratique de Conversation",
      subtitle: "Pratiquez les questions et comment faire durer une conversation naturellement.",
      sections: [
        { heading: "Types de Questions", body: ["Questions oui/non : Tu aimes le café ?", "Questions avec Quoi, Où, Quand, Qui, Pourquoi, Comment.", "Qu'est-ce que tu fais dans la vie ?", "D'où viens-tu ?"] },
        { heading: "Faire Durer une Conversation", body: ["Montrez de l'intérêt : Vraiment ? C'est intéressant ! Raconte-moi.", "Posez une question de suivi au lieu de simplement répondre.", "A : Je suis allé au marché ce matin. B : Ah super, qu'est-ce que tu as acheté ?"] },
        { heading: "Ìtre d'Accord et Pas d'Accord Poliment", body: ["Je suis d'accord avec toi.", "C'est un bon point, mais je pense que...", "Je ne suis pas sûr d'être d'accord. À mon avis..."] },
      ],
      speakText: `Types de questions. Questions oui ou non : tu aimes le café ? Questions avec quoi, où, quand, qui.

Faire durer une conversation. Montrez de l'intérêt : vraiment ? Raconte-moi.

Être d'accord et pas d'accord poliment. Je suis d'accord avec toi. C'est un bon point, mais je pense que...`,
      videoTopic: "Pratiquer les questions de suivi dans une vraie conversation.",
      videoUrl: "https://www.youtube.com/watch?v=ogBJ1EeQTSM",
      readingTitle: "Vendredi dernier, Paul a rencontré une nouvelle collègue appelée Clara au travail.",
      reading: [
        "Il lui a demandé, « D'où viens-tu ? » et elle a dit qu'elle venait de Goma.",
        "Paul a ensuite posé une question de suivi : « Depuis combien de temps habites-tu ici ? »",
        "Clara a dit qu'elle était d'accord que la ville était très accueillante, mais elle a ajouté que la circulation pouvait être difficile.",
        "Paul a dit que c'était un bon point, et ils ont tous les deux ri.",
      ],
      readingSpeakText: `Vendredi dernier, Paul a rencontré une nouvelle collègue appelée Clara au travail. Il lui a demandé, d'où viens-tu ?`,
      exercises: ["Écrivez trois questions avec Quoi/Où que vous pourriez poser à un nouveau collègue.", "Pratiquez un dialogue court où vous êtes d'accord puis pas d'accord poliment.", "Écrivez une question de suivi pour : 'J'ai regardé un film hier soir.'", "Jouez le rôle de vous présenter et poser deux questions."],
      speakingTopic: "Ayez une conversation courte avec un partenaire en utilisant au moins deux questions de suivi.",
    },
    {
      id: 4,
      title: "Rédaction : Mails, Lettres et Compte-Rendus",
      subtitle: "Apprenez à organiser des idées en paragraphes clairs avec des connecteurs.",
      sections: [
        { heading: "Structure du Paragraphe", body: ["Un paragraphe a une idée principale.", "Phrase thématique : introduit l'idée principale.", "Phrases de soutien : donnent des détails et des exemples.", "Phrase de conclusion : ferme l'idée."] },
        { heading: "Mots de Liaison", body: ["Addition : et, aussi, de plus.", "Contraste : mais, cependant, bien que.", "Cause et conséquence : parce que, donc, par conséquent.", "Séquence : d'abord, ensuite, puis, enfin."] },
        { heading: "Structure d'un E-mail Formel", body: ["Madame, Monsieur, (formule d'appel)", "Je vous écris afin de... (objet)", "Je reste à votre disposition pour tout renseignement. (formule de politesse)", "Cordialement, (signature)"] },
      ],
      speakText: `Un paragraphe a une idée principale. La phrase thématique introduit l'idée principale.

Mots de liaison. Addition : et, aussi. Contraste : mais, cependant. Cause et conséquence : parce que, donc.

Structure d'un e-mail formel. Madame, Monsieur. Je vous écris afin de... Cordialement.`,
      videoTopic: "Voir comment les mots de liaison relient les idées dans un paragraphe.",
      videoUrl: "https://www.youtube.com/watch?v=6XsOGbPfguM",
      readingTitle: "Pourquoi j'Aime Lire",
      reading: [
        "J'aime lire parce que ça m'aide à me détendre après une longue journée.",
        "D'abord, je choisis un endroit calme dans ma maison.",
        "Ensuite, je lis pendant une trentaine de minutes.",
        "Bien que je m'endorme parfois, j'apprends toujours quelque chose de nouveau.",
        "Par conséquent, la lecture est devenue une de mes habitudes préférées.",
      ],
      readingSpeakText: `Pourquoi j'aime lire. J'aime lire parce que ça m'aide à me détendre après une longue journée.`,
      exercises: ["Écrivez une phrase thématique sur votre loisir préféré.", "Ajoutez deux phrases de soutien avec des détails.", "Utilisez 'parce que' et 'cependant' dans deux phrases différentes.", "Écrivez un e-mail formel court demandant un renseignement."],
      speakingTopic: "Décrivez votre loisir préféré avec une phrase thématique claire et des détails de soutien.",
    },
    {
      id: 5,
      title: "Compréhension Orale",
      subtitle: "Apprenez des stratégies pour comprendre le français parlé plus facilement.",
      sections: [
        { heading: "Stratégies d'Écoute", body: ["Écoutez les mots-clés, pas chaque mot.", "Portez attention au sujet principal d'abord.", "Utilisez le contexte pour deviner le sens des mots nouveaux.", "C'est normal de demander à quelqu'un de répéter : 'Tu peux répéter, s'il te plaît ?'"] },
        { heading: "Phrases Utiles pour Écouter", body: ["Je n'ai pas compris ça.", "Tu peux parler plus lentement, s'il te plaît ?", "Désolé, qu'est-ce que tu as dit ?", "Donc, si je comprends bien, tu veux dire que..."] },
        { heading: "Suivre des Directions", body: ["Tourne à gauche / Tourne à droite.", "Continue tout droit.", "C'est sur ta gauche / droite.", "Prends la deuxième rue à droite."] },
      ],
      speakText: `Stratégies d'écoute. Écoutez les mots-clés, pas chaque mot. Portez attention au sujet principal d'abord.

C'est normal de demander à quelqu'un de répéter : tu peux répéter, s'il te plaît ?

Suivre des directions. Tourne à gauche. Tourne à droite. Continue tout droit.`,
      videoTopic: "Pratiquer suivre des directions parlées en ville.",
      videoUrl: "https://www.youtube.com/watch?v=INoRYq_bbjw",
      readingTitle: "Marie a demandé à un inconnu le chemin de la poste.",
      reading: [
        "L'homme a dit, « Continue tout droit, puis tourne à gauche au marché. »",
        "Marie n'a pas tout compris, alors elle a dit, « Désolée, tu peux répéter, s'il te plaît ? »",
        "L'homme a répété lentement : « Continue tout droit, tourne à gauche au marché, et la poste est sur ta droite. »",
        "Marie l'a remercié et a trouvé la poste facilement.",
      ],
      readingSpeakText: `Marie a demandé à un inconnu le chemin de la poste. L'homme a dit, continue tout droit, puis tourne à gauche au marché.`,
      exercises: ["Écrivez trois phrases que vous pouvez utiliser quand vous ne comprenez pas quelqu'un.", "Donnez des directions de chez vous jusqu'au marché le plus proche.", "Pratiquez écouter quelqu'un parler puis résumez ce qu'il a dit.", "Expliquez à quoi sert 'si je comprends bien'."],
      speakingTopic: "Donnez à un partenaire des directions de l'école jusqu'à chez vous.",
    },
    {
      id: 6,
      title: "Compréhension de Textes Complexes",
      subtitle: "Apprenez des techniques pour comprendre des textes plus longs efficacement.",
      sections: [
        { heading: "Lecture Rapide et Lecture Ciblée", body: ["Lecture rapide : lire vite pour comprendre l'idée générale.", "Lecture ciblée : chercher rapidement une information précise, comme une date ou un nom.", "Lisez le titre et la première phrase de chaque paragraphe avant de lire en détail."] },
        { heading: "Utiliser les Indices du Contexte", body: ["Vous n'avez pas besoin de comprendre chaque mot pour comprendre un texte.", "Utilisez les mots autour d'un mot inconnu pour deviner son sens.", "Exemple : 'Le temps était glacial, alors tout le monde portait un manteau épais.' Glacial signifie probablement très froid."] },
      ],
      speakText: `La lecture rapide signifie lire vite pour comprendre l'idée générale.

La lecture ciblée signifie chercher rapidement une information précise, comme une date ou un nom.

Utiliser les indices du contexte. Vous n'avez pas besoin de comprendre chaque mot pour comprendre un texte.`,
      videoTopic: "Pratiquer la lecture rapide d'un article court pour trouver l'idée principale.",
      videoUrl: "https://www.youtube.com/watch?v=nJDh41k11Fo",
      readingTitle: "Le Marché de Kolwezi",
      reading: [
        "Chaque samedi, des centaines de personnes se rassemblent au marché central de Kolwezi.",
        "Les vendeurs vendent de tout, des légumes frais aux vêtements faits main.",
        "L'ambiance est animée, avec de la musique et des vendeurs qui crient leurs prix.",
        "Beaucoup de familles arrivent tôt le matin avant que ça devienne trop bondé.",
        "Vers midi, le marché est plein de couleurs, de bruit et de l'odeur de nourriture fraîche.",
      ],
      readingSpeakText: `Le marché de Kolwezi. Chaque samedi, des centaines de personnes se rassemblent au marché central de Kolwezi.`,
      exercises: ["Lisez le texte rapidement en 10 secondes et dites de quoi il parle.", "Cherchez dans le texte quel jour le marché a lieu.", "Devinez le sens de 'animée' grâce au contexte.", "Écrivez deux phrases décrivant un marché que vous connaissez."],
      speakingTopic: "Décrivez un marché ou un endroit animé que vous avez visité.",
    },
    {
      id: 7,
      title: "Enrichissement du Vocabulaire",
      subtitle: "Enrichissez votre vocabulaire avec des synonymes, antonymes et familles de mots.",
      sections: [
        { heading: "Synonymes (sens similaire)", body: ["Heureux = content, joyeux", "Grand = immense, énorme", "Intelligent = malin, perspicace", "Rapide = vite, prompt"] },
        { heading: "Antonymes (sens opposé)", body: ["Chaud ↔ Froid", "Facile ↔ Difficile", "Tôt ↔ Tard", "Commencer ↔ Terminer"] },
        { heading: "Familles de Mots", body: ["Réussir (verbe) → réussite (nom) → réussi (adjectif).", "Décider (verbe) → décision (nom) → décisif (adjectif)."] },
        { heading: "Expressions Figées", body: ["Prendre une décision (pas 'faire une décision')", "Prendre une photo", "Faire ses devoirs", "Prendre le petit-déjeuner"] },
      ],
      speakText: `Synonymes, mots au sens similaire. Heureux signifie content ou joyeux. Grand signifie immense ou énorme.

Antonymes, mots au sens opposé. Chaud et froid. Facile et difficile.

Familles de mots. Réussir, réussite, réussi.

Les expressions figées sont des mots qui vont ensemble. Prendre une décision. Prendre une photo.`,
      videoTopic: "Enrichir son vocabulaire grâce aux synonymes, antonymes et expressions figées.",
      videoUrl: "https://www.youtube.com/watch?v=uYRiOJ9PCPs",
      readingTitle: "Enrichir son Vocabulaire",
      reading: [
        "Apprendre des mots nouveaux chaque jour est l'une des meilleures façons d'améliorer rapidement son français.",
        "Au lieu de mémoriser des mots isolés, essayez de les apprendre en groupes, comme des synonymes ou des familles de mots.",
        "Par exemple, si vous apprenez 'décider', apprenez aussi 'décision' et 'décisif'.",
        "De cette façon, un seul mot nouveau vous en enseigne en réalité trois ou quatre.",
      ],
      readingSpeakText: `Enrichir son vocabulaire. Apprendre des mots nouveaux chaque jour est l'une des meilleures façons d'améliorer rapidement son français.`,
      exercises: ["Trouvez un synonyme de 'heureux' et 'rapide'.", "Trouvez un antonyme de 'commencer' et 'facile'.", "Écrivez le nom et l'adjectif de 'réussir'.", "Utilisez 'prendre une décision' et 'prendre une photo' dans deux phrases."],
      speakingTopic: "Décrivez votre journée en utilisant au moins trois mots nouveaux de cette leçon.",
    },
    {
      id: 8,
      title: "Maîtrise de la Prononciation",
      subtitle: "Améliorez l'intonation et les sons souvent confondus.",
      sections: [
        { heading: "L'Intonation", body: ["Les questions oui/non montent souvent à la fin : Tu viens ? ↗", "Les questions avec Quoi/Où descendent souvent à la fin : Où vas-tu ? ↘", "L'intonation montante peut montrer la surprise ou une question ; l'intonation descendante sonne plus sûre."] },
        { heading: "Les Liaisons", body: ["En français, on relie souvent la consonne finale d'un mot à la voyelle du mot suivant.", "Les amis se prononce « lez-ami ».", "Un petit enfant se prononce avec une liaison entre 'petit' et 'enfant'."] },
        { heading: "Sons Souvent Confondus", body: ["U vs OU : rue vs roue.", "P vs B : pain vs bain.", "É vs È : été vs ère."] },
      ],
      speakText: `L'intonation. Les questions oui ou non montent souvent à la fin : tu viens ?

Les liaisons. En français, on relie souvent la consonne finale d'un mot à la voyelle du mot suivant.

Sons souvent confondus. Rue versus roue. Pain versus bain.`,
      videoTopic: "Entendre la différence entre l'intonation montante et descendante.",
      videoUrl: "https://www.youtube.com/watch?v=YTBeLibLQjs",
      readingTitle: "Pourquoi la Prononciation est Importante",
      reading: [
        "Une bonne grammaire est importante, mais une prononciation claire aide les gens à vous comprendre immédiatement.",
        "Beaucoup d'apprenants se concentrent seulement sur les sons individuels et oublient les liaisons.",
        "Une phrase sans liaisons peut sembler hachée et moins naturelle.",
        "S'entraîner un peu chaque jour, même cinq minutes, fait une grande différence avec le temps.",
      ],
      readingSpeakText: `Pourquoi la prononciation est importante. Une bonne grammaire est importante, mais une prononciation claire aide les gens à vous comprendre immédiatement.`,
      exercises: ["Pratiquez dire 'les amis' avec la liaison.", "Dites une question oui/non avec une intonation montante.", "Dites une question avec Quoi/Où avec une intonation descendante.", "Pratiquez les mots 'rue' et 'roue'."],
      speakingTopic: "Lisez le texte de lecture à voix haute en faisant attention aux liaisons.",
    },
    {
      id: 9,
      title: "Français pour Situations Réelles",
      subtitle: "Apprenez des phrases utiles pour des situations quotidiennes de la vie réelle.",
      sections: [
        { heading: "Au Restaurant", body: ["Je pourrais avoir le menu, s'il vous plaît ?", "Je voudrais le poulet, s'il vous plaît.", "Nous pourrions avoir l'addition, s'il vous plaît ?", "Le service est-il compris ?"] },
        { heading: "À l'Aéroport", body: ["Où se trouve le comptoir d'enregistrement ?", "Je voudrais une place côté fenêtre, s'il vous plaît.", "À quelle heure embarque le vol ?", "Où se trouve le tapis à bagages ?"] },
        { heading: "En Entretien d'Embauche", body: ["Parlez-moi de vous.", "Quels sont vos points forts ?", "Pourquoi voulez-vous travailler ici ?", "Je suis une personne travailleuse et fiable."] },
      ],
      speakText: `Au restaurant. Je pourrais avoir le menu, s'il vous plaît ? Je voudrais le poulet, s'il vous plaît.

À l'aéroport. Où se trouve le comptoir d'enregistrement ? Je voudrais une place côté fenêtre.

En entretien d'embauche. Parlez-moi de vous. Quels sont vos points forts ?`,
      videoTopic: "Pratiquer des dialogues réels au restaurant, à l'aéroport et en entretien.",
      videoUrl: "https://www.youtube.com/watch?v=MZ8XpKpvJxw",
      readingTitle: "L'Entretien d'Embauche d'Anna",
      reading: [
        "Anna est arrivée tôt pour son entretien d'embauche et a salué le responsable poliment.",
        "Quand le responsable a demandé, « Parlez-moi de vous », Anna a parlé avec confiance de ses études et de son expérience.",
        "Elle a expliqué que son point fort principal était d'être travailleuse et fiable.",
        "À la fin, Anna a posé sa propre question : « À quoi ressemble une journée type dans ce poste ? »",
        "Le responsable a été impressionné par sa préparation.",
      ],
      readingSpeakText: `L'entretien d'embauche d'Anna. Anna est arrivée tôt pour son entretien d'embauche et a salué le responsable poliment.`,
      exercises: ["Écrivez un dialogue court de restaurant pour commander un plat.", "Écrivez deux questions que vous pourriez poser au comptoir d'enregistrement.", "Répondez à la question d'entretien 'Quels sont vos points forts ?' sur vous-même.", "Pratiquez le dialogue d'entretien complet avec un partenaire."],
      speakingTopic: "Jouez un entretien d'embauche avec un partenaire, en posant et répondant à des questions courantes.",
    },
    {
      id: 10,
      title: "Français Professionnel de Base",
      subtitle: "Apprenez le vocabulaire professionnel pour les e-mails et les réunions.",
      sections: [
        { heading: "Écrire un E-mail Professionnel", body: ["Cher Monsieur Kasongo, (formule d'appel)", "Je vous écris afin de me renseigner sur... (objet)", "N'hésitez pas à me contacter pour plus d'informations. (formule de clôture)", "Cordialement, (signature)"] },
        { heading: "Phrases Utiles pour les Réunions", body: ["Commençons.", "Pourriez-vous clarifier ce point ?", "J'aimerais ajouter quelque chose.", "Passons au point suivant.", "Pour résumer, nous avons convenu que..."] },
        { heading: "Vocabulaire Professionnel", body: ["Délai : la date à laquelle quelque chose doit être terminé.", "Collègue : une personne avec qui vous travaillez.", "Client : une personne ou une entreprise à qui vous fournissez un service.", "Rapport : un résumé écrit d'informations."] },
      ],
      speakText: `Écrire un e-mail professionnel. Cher Monsieur Kasongo. Je vous écris afin de me renseigner sur... Cordialement.

Phrases utiles pour les réunions. Commençons. Pourriez-vous clarifier ce point ? J'aimerais ajouter quelque chose.

Vocabulaire professionnel. Délai signifie la date à laquelle quelque chose doit être terminé.`,
      videoTopic: "Voir comment un e-mail professionnel et une réunion sont structurés.",
      videoUrl: "https://www.youtube.com/watch?v=YDJ7BmqtA3w",
      readingTitle: "La Première Semaine de David dans un Nouveau Travail",
      reading: [
        "Pendant sa première réunion, David a entendu sa responsable dire, « Commençons. »",
        "Il a écouté attentivement et, quand il n'a pas compris un point, il a dit, « Pourriez-vous clarifier ça, s'il vous plaît ? »",
        "Plus tard dans la journée, David a écrit son premier e-mail professionnel à un client, en commençant par « Chère Madame Tshisekedi » et en terminant par « Cordialement. »",
        "Son collègue lui a dit que l'e-mail était clair et bien écrit.",
      ],
      readingSpeakText: `La première semaine de David dans un nouveau travail. Pendant sa première réunion, David a entendu sa responsable dire, commençons.`,
      exercises: ["Écrivez un e-mail professionnel court demandant des renseignements sur une offre d'emploi.", "Écrivez deux phrases que vous pourriez utiliser pour intervenir en réunion.", "Utilisez 'délai', 'collègue' et 'client' chacun dans une phrase.", "Pratiquez dire 'Pourriez-vous clarifier ce point ?' à voix haute."],
      speakingTopic: "Expliquez ce qui rend un e-mail professionnel.",
    },
    {
      id: 11,
      title: "Débats et Arguments",
      subtitle: "Apprenez à exprimer et défendre votre opinion avec respect.",
      sections: [
        { heading: "Donner son Opinion", body: ["À mon avis, ...", "Je pense personnellement que ...", "De mon point de vue, ...", "En ce qui me concerne, ..."] },
        { heading: "Être d'Accord et Pas d'Accord Formellement", body: ["Je suis tout à fait d'accord avec ce point.", "Je comprends votre point de vue, mais j'ai un avis différent.", "Je crains de devoir être en désaccord.", "C'est vrai, cependant, nous devrions aussi considérer..."] },
        { heading: "Appuyer un Argument", body: ["Par exemple, ...", "Cela est confirmé par le fait que ...", "Les études montrent que ...", "En conclusion, je pense que ..."] },
      ],
      speakText: `Donner son opinion. À mon avis... Je pense personnellement que... De mon point de vue...

Être d'accord et pas d'accord formellement. Je suis tout à fait d'accord avec ce point. Je comprends votre point de vue, mais j'ai un avis différent.

Appuyer un argument. Par exemple... Les études montrent que... En conclusion, je pense que...`,
      videoTopic: "Regarder un débat court et respectueux utilisant des phrases d'opinion et d'argument.",
      videoUrl: "https://www.youtube.com/watch?v=vx6ITjUaD94",
      readingTitle: "Un Débat en Classe",
      reading: [
        "En classe, les élèves ont débattu de savoir si les téléphones devaient être autorisés à l'école.",
        "Joseph a dit, « À mon avis, les téléphones nous aident à apprendre parce que nous pouvons chercher des informations rapidement. »",
        "Grace a répondu, « Je comprends votre point de vue, mais j'ai un avis différent. Les téléphones peuvent être très distrayants pendant les cours. »",
        "Le professeur a dit que les deux arguments étaient bien appuyés et a encouragé la classe à continuer à discuter avec respect.",
      ],
      readingSpeakText: `Un débat en classe. En classe, les élèves ont débattu de savoir si les téléphones devaient être autorisés à l'école.`,
      exercises: ["Donnez votre opinion sur l'apprentissage du français avec 'À mon avis...'.", "Pratiquez être poliment pas d'accord avec l'opinion d'un partenaire.", "Écrivez un argument appuyé par 'Par exemple...'.", "Écrivez une conclusion courte avec 'En conclusion, je pense que...'."],
      speakingTopic: "Débattez d'un sujet simple (comme la vie en ville contre la vie à la campagne) avec un partenaire.",
    },
    {
      id: 12,
      title: "Révision Finale et Conversation Réelle",
      subtitle: "Révisez tout ce qui a été appris au Niveau 2 et pratiquez une conversation plus longue de la vie réelle.",
      sections: [
        {
          heading: "Ce que Nous Avons Appris",
          body: [
            "Réviser la structure de la phrase et l'accord sujet-verbe",
            "Utiliser correctement le passé et le futur",
            "Faire durer les conversations avec des questions de suivi",
            "Écrire des paragraphes organisés avec des connecteurs",
            "Stratégies d'écoute et demander des clarifications",
            "Lecture rapide et lecture ciblée pour la compréhension de textes",
            "Enrichir le vocabulaire avec synonymes et familles de mots",
            "Améliorer la prononciation et les liaisons",
            "Utiliser le français au restaurant, à l'aéroport et en entretien",
            "Écrire des e-mails professionnels et parler en réunion",
            "Donner son opinion et débattre avec respect",
          ],
        },
        {
          heading: "Exemple de Conversation Réelle",
          body: [
            "A : Salut, j'ai entendu dire que tu avais commencé un nouveau travail. Comment ça se passe ?",
            "B : Ça se passe bien, merci ! J'étais nerveuse au début, mais mes collègues sont très sympas.",
            "A : C'est super à entendre. Tu fais quoi exactement ?",
            "B : J'écris des rapports et je réponds aux e-mails des clients. C'est un défi, mais j'apprends beaucoup.",
            "A : À mon avis, c'est une compétence très utile à avoir.",
            "B : Je suis d'accord. Je vais continuer à améliorer mon français pour le travail aussi.",
          ],
        },
      ],
      speakText: `Les choses importantes que nous avons apprises au Niveau 2 incluent la révision de la structure de la phrase, l'utilisation du passé et du futur, faire durer les conversations, écrire des paragraphes, les stratégies d'écoute, la compréhension de textes, l'enrichissement du vocabulaire, la prononciation, le français pour situations réelles, le français professionnel, et débattre avec respect.

Exemple de conversation réelle.

Salut, j'ai entendu dire que tu avais commencé un nouveau travail. Comment ça se passe ?
Ça se passe bien, merci ! J'étais nerveuse au début, mais mes collègues sont très sympas.`,
      videoTopic: "Réviser tous les sujets du Niveau 2 à travers une conversation étendue.",
      videoUrl: "https://www.youtube.com/watch?v=IouDPhAibrY",
      readingTitle: "Un An de Progrès",
      reading: [
        "Il y a un an, Patrick pouvait à peine se présenter en français.",
        "Après avoir terminé le Niveau 1 et le Niveau 2, il peut maintenant tenir une conversation complète sur son travail, ses opinions et sa vie quotidienne.",
        "Il écrit des e-mails professionnels au travail et se sent confiant en réunion.",
        "Patrick dit que la clé de son progrès a été de s'entraîner un peu chaque jour.",
        "Il est maintenant impatient de commencer le Niveau 3 et de continuer à s'améliorer.",
      ],
      readingSpeakText: `Un an de progrès. Il y a un an, Patrick pouvait à peine se présenter en français.`,
      exercises: ["Présentez-vous en utilisant au moins deux points de grammaire du Niveau 2.", "Écrivez un paragraphe court sur votre progrès en français.", "Pratiquez la conversation d'exemple à voix haute avec un partenaire.", "Donnez votre opinion sur l'utilité d'apprendre le français pour le travail."],
      speakingTopic: "Ayez une conversation complète sur vos études, vos opinions et vos projets d'avenir.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Quiz 1",
      subtitle: "Révision de Grammaire Intermédiaire",
      passingScore: 7,
      questions: [
        { question: "De quoi chaque phrase a-t-elle besoin ?", options: ["D'un sujet et d'un verbe", "Seulement d'un adjectif", "Seulement d'un point d'interrogation"], answer: "D'un sujet et d'un verbe" },
        { question: "Dans 'Sarah lit un livre', quel est le complément ?", options: ["Sarah", "lit", "un livre"], answer: "un livre" },
        { question: "Choisissez la phrase correcte.", options: ["Les enfants joue dehors", "Les enfants jouent dehors", "Les enfants jouant dehors"], answer: "Les enfants jouent dehors" },
        { question: "Choisissez la phrase correcte.", options: ["Il est allé à l'école hier", "Il va à l'école hier", "Il aller à l'école hier"], answer: "Il est allé à l'école hier" },
        { question: "Quelle forme verbale correspond à un sujet pluriel ?", options: ["La forme singulier", "La forme pluriel", "Aucun verbe n'est nécessaire"], answer: "La forme pluriel" },
        { question: "Qu'est-ce que Grace étudie ?", options: ["Le français de niveau intermédiaire", "Les mathématiques", "L'histoire"], answer: "Le français de niveau intermédiaire" },
        { question: "Que fait Grace chaque jour ?", options: ["Elle s'entraîne à construire des phrases correctes", "Elle dort toute la journée", "Elle évite la grammaire"], answer: "Elle s'entraîne à construire des phrases correctes" },
        { question: "Que dit la professeure de Grace qu'une bonne phrase a besoin ?", options: ["Un sujet clair et un verbe qui s'accorde", "Seulement des mots longs", "Aucune ponctuation"], answer: "Un sujet clair et un verbe qui s'accorde" },
        { question: "Comment Grace se sent-elle à propos de son progrès ?", options: ["Fière", "En colère", "Fatiguée"], answer: "Fière" },
        { question: "Qu'est-ce qui a changé entre la semaine dernière et cette semaine pour Grace ?", options: ["Elle a arrêté d'étudier", "Elle vérifie maintenant sa grammaire avec soin", "Elle a changé d'école"], answer: "Elle vérifie maintenant sa grammaire avec soin" },
      ],
    },
    {
      lessonId: 2,
      title: "Quiz 2",
      subtitle: "Les Temps Complexes : Passé et Futur",
      passingScore: 7,
      questions: [
        { question: "Quel temps décrit une action terminée dans le passé ?", options: ["Le passé composé", "Le futur simple", "Le présent"], answer: "Le passé composé" },
        { question: "Quelle phrase utilise correctement l'imparfait ?", options: ["J'étudiais à 20 heures", "J'étudie à 20 heures hier", "J'étudierai à 20 heures"], answer: "J'étudiais à 20 heures" },
        { question: "Quelle forme sert pour un projet déjà décidé ?", options: ["le futur proche", "le passé composé", "l'imparfait"], answer: "le futur proche" },
        { question: "Quelle forme sert pour une décision rapide ou une prédiction ?", options: ["le futur simple", "le passé composé", "l'imparfait"], answer: "le futur simple" },
        { question: "Où Thomas a-t-il voyagé l'année dernière ?", options: ["Lubumbashi", "Paris", "Kinshasa"], answer: "Lubumbashi" },
        { question: "Qui Thomas a-t-il rencontré en attendant le bus ?", options: ["Un inconnu", "Un vieil ami de l'école", "Son professeur"], answer: "Un vieil ami de l'école" },
        { question: "Que vont faire Thomas et son ami l'été prochain ?", options: ["Revisiter Lubumbashi", "Déménager dans une autre ville", "Arrêter d'être amis"], answer: "Revisiter Lubumbashi" },
        { question: "Quelle phrase est correcte pour un projet futur ?", options: ["Je vais visiter Paris l'année prochaine", "Je suis allé visiter Paris l'année prochaine", "Je visite Paris l'année dernière"], answer: "Je vais visiter Paris l'année prochaine" },
        { question: "Combien de temps ont-ils discuté ?", options: ["Presque une heure", "Cinq minutes", "Toute la semaine"], answer: "Presque une heure" },
        { question: "De quoi se sont-ils souvenus ensemble ?", options: ["Leur enfance", "Leur travail", "Leurs études universitaires"], answer: "Leur enfance" },
      ],
    },
    {
      lessonId: 3,
      title: "Quiz 3",
      subtitle: "Pratique de Conversation",
      passingScore: 7,
      questions: [
        { question: "Laquelle est une question oui/non ?", options: ["Tu aimes le café ?", "Qu'est-ce que tu fais dans la vie ?", "D'où viens-tu ?"], answer: "Tu aimes le café ?" },
        { question: "Laquelle est une question avec Quoi/Où ?", options: ["D'où viens-tu ?", "Tu aimes le café ?", "Tu es d'accord ?"], answer: "D'où viens-tu ?" },
        { question: "Quelle est une bonne façon de faire durer une conversation ?", options: ["Poser une question de suivi", "Rester silencieux", "Changer de sujet immédiatement"], answer: "Poser une question de suivi" },
        { question: "Quelle phrase marque un désaccord poli ?", options: ["Je ne suis pas sûr d'être d'accord", "Je suis complètement d'accord", "C'est exactement juste"], answer: "Je ne suis pas sûr d'être d'accord" },
        { question: "Quelle phrase montre de l'intérêt dans une conversation ?", options: ["Raconte-moi", "Ça ne m'intéresse pas", "Arrête de parler"], answer: "Raconte-moi" },
        { question: "Qui Paul a-t-il rencontré au travail ?", options: ["Clara", "Grace", "Anna"], answer: "Clara" },
        { question: "D'où vient Clara ?", options: ["Goma", "Kinshasa", "Lubumbashi"], answer: "Goma" },
        { question: "Quelle question de suivi Paul a-t-il posée ?", options: ["Depuis combien de temps habites-tu ici ?", "Comment tu t'appelles ?", "Tu aimes le café ?"], answer: "Depuis combien de temps habites-tu ici ?" },
        { question: "Qu'a dit Clara sur la ville ?", options: ["Elle était accueillante mais la circulation pouvait être difficile", "Elle était ennuyeuse", "Elle la détestait"], answer: "Elle était accueillante mais la circulation pouvait être difficile" },
        { question: "Comment Paul a-t-il répondu au commentaire de Clara sur la circulation ?", options: ["Il a dit que c'était un bon point", "Il n'était pas d'accord avec force", "Il a quitté la conversation"], answer: "Il a dit que c'était un bon point" },
      ],
    },
    {
      lessonId: 4,
      title: "Quiz 4",
      subtitle: "Rédaction : Mails, Lettres et Compte-Rendus",
      passingScore: 7,
      questions: [
        { question: "Que fait une phrase thématique ?", options: ["Elle introduit l'idée principale", "Elle termine le paragraphe", "Elle liste des faits au hasard"], answer: "Elle introduit l'idée principale" },
        { question: "Quel mot montre le contraste ?", options: ["cependant", "aussi", "d'abord"], answer: "cependant" },
        { question: "Quel mot montre la cause et la conséquence ?", options: ["parce que", "et", "ensuite"], answer: "parce que" },
        { question: "Quel mot montre la séquence ?", options: ["d'abord", "mais", "bien que"], answer: "d'abord" },
        { question: "Quelle est la formule d'appel d'un e-mail formel ?", options: ["Madame, Monsieur,", "Salut !", "Yo !"], answer: "Madame, Monsieur," },
        { question: "Pourquoi l'auteure aime-t-elle lire ?", options: ["Ça l'aide à se détendre après une longue journée", "Ça la fatigue", "Elle n'a pas d'autre loisir"], answer: "Ça l'aide à se détendre après une longue journée" },
        { question: "Combien de temps lit-elle habituellement ?", options: ["Une trentaine de minutes", "Deux heures", "Cinq minutes"], answer: "Une trentaine de minutes" },
        { question: "Quel connecteur est utilisé avant 'elle s'endort parfois' ?", options: ["Bien que", "Parce que", "D'abord"], answer: "Bien que" },
        { question: "Qu'est-ce que la lecture est devenue pour elle ?", options: ["Une de ses habitudes préférées", "Une perte de temps", "Son travail"], answer: "Une de ses habitudes préférées" },
        { question: "Quelle formule termine un e-mail formel ?", options: ["Cordialement,", "Salut,", "Tchao,"], answer: "Cordialement," },
      ],
    },
    {
      lessonId: 5,
      title: "Quiz 5",
      subtitle: "Compréhension Orale",
      passingScore: 7,
      questions: [
        { question: "Qu'est-ce que vous devez écouter en premier ?", options: ["Les mots-clés et le sujet principal", "Chaque mot individuellement", "Seulement le dernier mot"], answer: "Les mots-clés et le sujet principal" },
        { question: "Que pouvez-vous faire si vous ne comprenez pas ?", options: ["Demander à la personne de répéter", "Faire semblant d'avoir compris", "Partir"], answer: "Demander à la personne de répéter" },
        { question: "Quelle phrase demande à quelqu'un de parler plus lentement ?", options: ["Tu peux parler plus lentement, s'il te plaît ?", "Tais-toi", "Je sais tout"], answer: "Tu peux parler plus lentement, s'il te plaît ?" },
        { question: "Quelle phrase vérifie votre compréhension ?", options: ["Donc, si je comprends bien, tu veux dire que...", "Ça ne m'intéresse pas ce que tu veux dire", "Laisse tomber"], answer: "Donc, si je comprends bien, tu veux dire que..." },
        { question: "Quelle phrase donne une direction ?", options: ["Tourne à gauche", "Je suis d'accord", "Enchanté"], answer: "Tourne à gauche" },
        { question: "Qu'est-ce que Marie a demandé à l'inconnu ?", options: ["Le chemin de la poste", "L'heure", "De l'argent"], answer: "Le chemin de la poste" },
        { question: "Qu'a dit Marie quand elle n'a pas compris ?", options: ["Désolée, tu peux répéter, s'il te plaît ?", "Je ne veux pas savoir", "Au revoir"], answer: "Désolée, tu peux répéter, s'il te plaît ?" },
        { question: "Où se trouve la poste selon l'homme ?", options: ["À droite, après avoir tourné à gauche au marché", "Derrière l'école", "Près de chez Marie"], answer: "À droite, après avoir tourné à gauche au marché" },
        { question: "Comment l'homme a-t-il répondu à la demande de Marie ?", options: ["Il a répété les directions lentement", "Il a refusé d'aider", "Il est parti"], answer: "Il a répété les directions lentement" },
        { question: "Qu'a fait Marie après avoir reçu les directions ?", options: ["Elle a trouvé la poste facilement", "Elle s'est perdue", "Elle est rentrée chez elle à la place"], answer: "Elle a trouvé la poste facilement" },
      ],
    },
    {
      lessonId: 6,
      title: "Quiz 6",
      subtitle: "Compréhension de Textes Complexes",
      passingScore: 7,
      questions: [
        { question: "Qu'est-ce que la lecture rapide ?", options: ["Lire vite pour comprendre l'idée générale", "Lire chaque mot lentement", "Ne pas lire du tout"], answer: "Lire vite pour comprendre l'idée générale" },
        { question: "Qu'est-ce que la lecture ciblée ?", options: ["Chercher rapidement une information précise", "Mémoriser un texte", "Traduire un texte"], answer: "Chercher rapidement une information précise" },
        { question: "Qu'est-ce qui peut aider à deviner le sens d'un mot inconnu ?", options: ["Les indices du contexte", "Deviner au hasard sans le texte", "Ignorer la phrase"], answer: "Les indices du contexte" },
        { question: "Dans 'le temps était glacial, alors tout le monde portait un manteau épais', que signifie probablement 'glacial' ?", options: ["Très froid", "Très chaud", "Très coloré"], answer: "Très froid" },
        { question: "Que devez-vous lire en premier pour trouver l'idée principale rapidement ?", options: ["Le titre et la première phrase de chaque paragraphe", "Seulement le dernier mot", "Le numéro de page"], answer: "Le titre et la première phrase de chaque paragraphe" },
        { question: "Où a lieu le marché ?", options: ["Kolwezi", "Goma", "Lubumbashi"], answer: "Kolwezi" },
        { question: "Quel jour le marché a-t-il lieu ?", options: ["Samedi", "Lundi", "Dimanche"], answer: "Samedi" },
        { question: "Que vendent les vendeurs au marché ?", options: ["Des légumes et des vêtements faits main", "Seulement des chaussures", "Seulement des livres"], answer: "Des légumes et des vêtements faits main" },
        { question: "Comment est l'ambiance du marché ?", options: ["Animée, avec de la musique et des vendeurs qui crient", "Silencieuse et vide", "Dangereuse"], answer: "Animée, avec de la musique et des vendeurs qui crient" },
        { question: "Quand beaucoup de familles arrivent-elles au marché ?", options: ["Tôt le matin", "Tard le soir", "Jamais"], answer: "Tôt le matin" },
      ],
    },
    {
      lessonId: 7,
      title: "Quiz 7",
      subtitle: "Enrichissement du Vocabulaire",
      passingScore: 7,
      questions: [
        { question: "Quel mot est synonyme de 'heureux' ?", options: ["content", "froid", "lent"], answer: "content" },
        { question: "Quel mot est antonyme de 'facile' ?", options: ["difficile", "simple", "rapide"], answer: "difficile" },
        { question: "Quelle est la forme nominale de 'réussir' ?", options: ["réussite", "réussi", "réussissant"], answer: "réussite" },
        { question: "Quelle est l'expression figée correcte ?", options: ["prendre une décision", "faire une décision", "porter une décision"], answer: "prendre une décision" },
        { question: "Quelle est l'expression figée correcte ?", options: ["faire ses devoirs", "prendre ses devoirs", "porter ses devoirs"], answer: "faire ses devoirs" },
        { question: "Pourquoi devriez-vous apprendre des mots en groupes ?", options: ["Un seul mot nouveau vous en enseigne trois ou quatre", "C'est plus rapide de les oublier", "C'est obligatoire par la loi"], answer: "Un seul mot nouveau vous en enseigne trois ou quatre" },
        { question: "Quel est un exemple de famille de mots du texte ?", options: ["décider, décision, décisif", "rouge, bleu, vert", "un, deux, trois"], answer: "décider, décision, décisif" },
        { question: "Quelle est la façon la plus rapide d'améliorer son vocabulaire selon le texte ?", options: ["Apprendre des mots nouveaux chaque jour", "Ne jamais réviser les anciens mots", "Éviter les mots nouveaux"], answer: "Apprendre des mots nouveaux chaque jour" },
        { question: "Quel mot est synonyme de 'grand' ?", options: ["énorme", "petit", "tard"], answer: "énorme" },
        { question: "Quel mot est antonyme de 'commencer' ?", options: ["terminer", "débuter", "ouvrir"], answer: "terminer" },
      ],
    },
    {
      lessonId: 8,
      title: "Quiz 8",
      subtitle: "Maîtrise de la Prononciation",
      passingScore: 7,
      questions: [
        { question: "Que font souvent les questions oui/non à la fin ?", options: ["Elles montent", "Elles descendent toujours", "Elles restent plates"], answer: "Elles montent" },
        { question: "Que font souvent les questions avec Quoi/Où à la fin ?", options: ["Elles descendent", "Elles montent beaucoup", "Elles disparaissent"], answer: "Elles descendent" },
        { question: "Qu'est-ce qu'une liaison en français ?", options: ["Relier la consonne finale d'un mot à la voyelle du mot suivant", "Un signe de ponctuation", "Une règle de conjugaison"], answer: "Relier la consonne finale d'un mot à la voyelle du mot suivant" },
        { question: "Quelle paire montre des sons souvent confondus ?", options: ["rue / roue", "rouge / bleu", "un / deux"], answer: "rue / roue" },
        { question: "Que peut-il se passer sans liaisons ?", options: ["La phrase peut sembler hachée", "Rien ne change", "Le mot devient plus court"], answer: "La phrase peut sembler hachée" },
        { question: "Selon le texte, qu'est-ce qui est aussi très important en plus de la grammaire ?", options: ["Une prononciation claire", "Seulement l'orthographe", "Seulement le nombre de mots"], answer: "Une prononciation claire" },
        { question: "Qu'est-ce que beaucoup d'apprenants oublient ?", options: ["Les liaisons", "Les temps verbaux", "La ponctuation"], answer: "Les liaisons" },
        { question: "Comment peut sembler une phrase sans liaisons ?", options: ["Moins naturelle", "Plus longue", "Sans aucune différence"], answer: "Moins naturelle" },
        { question: "Combien de minutes de pratique quotidienne le texte suggère-t-il ?", options: ["Même cinq minutes", "Cinq heures", "Aucune pratique"], answer: "Même cinq minutes" },
        { question: "Quelle paire montre une différence de son ?", options: ["pain / bain", "rouge / bleu", "un / deux"], answer: "pain / bain" },
      ],
    },
    {
      lessonId: 9,
      title: "Quiz 9",
      subtitle: "Français pour Situations Réelles",
      passingScore: 7,
      questions: [
        { question: "Quelle phrase est utilisée au restaurant ?", options: ["Je pourrais avoir le menu, s'il vous plaît ?", "Où se trouve le comptoir d'enregistrement ?", "Parlez-moi de vous"], answer: "Je pourrais avoir le menu, s'il vous plaît ?" },
        { question: "Quelle phrase est utilisée à l'aéroport ?", options: ["Je voudrais une place côté fenêtre, s'il vous plaît", "Nous pourrions avoir l'addition, s'il vous plaît ?", "Quels sont vos points forts ?"], answer: "Je voudrais une place côté fenêtre, s'il vous plaît" },
        { question: "Quelle phrase est courante en entretien d'embauche ?", options: ["Parlez-moi de vous", "Le service est-il compris ?", "Où se trouve le tapis à bagages ?"], answer: "Parlez-moi de vous" },
        { question: "Que fait Anna au début de son entretien ?", options: ["Elle salue le responsable poliment", "Elle arrive en retard", "Elle refuse de répondre aux questions"], answer: "Elle salue le responsable poliment" },
        { question: "Qu'est-ce qu'Anna dit être son point fort principal ?", options: ["Être travailleuse et fiable", "Être la plus rapide à taper", "Être très silencieuse"], answer: "Être travailleuse et fiable" },
        { question: "Quelle question Anna pose-t-elle au responsable ?", options: ["À quoi ressemble une journée type dans ce poste ?", "Combien est le salaire ?", "Puis-je partir tôt ?"], answer: "À quoi ressemble une journée type dans ce poste ?" },
        { question: "Comment le responsable s'est-il senti à propos d'Anna ?", options: ["Impressionné par sa préparation", "Agacé", "Confus"], answer: "Impressionné par sa préparation" },
        { question: "Quelle phrase utiliseriez-vous pour commander à manger ?", options: ["Je voudrais le poulet, s'il vous plaît", "Où se trouve le tapis à bagages ?", "Quels sont vos points forts ?"], answer: "Je voudrais le poulet, s'il vous plaît" },
        { question: "Quelle phrase demande des informations sur un vol ?", options: ["À quelle heure embarque le vol ?", "Nous pourrions avoir l'addition ?", "Parlez-moi de vous"], answer: "À quelle heure embarque le vol ?" },
        { question: "Quelle phrase décrit une qualité positive pour un entretien ?", options: ["Je suis une personne travailleuse et fiable", "J'arrive toujours en retard", "Je n'aime pas travailler"], answer: "Je suis une personne travailleuse et fiable" },
      ],
    },
    {
      lessonId: 10,
      title: "Quiz 10",
      subtitle: "Français Professionnel de Base",
      passingScore: 7,
      questions: [
        { question: "Quelle phrase est une formule d'appel d'e-mail professionnel ?", options: ["Cher Monsieur Kasongo,", "Salut !", "Yo !"], answer: "Cher Monsieur Kasongo," },
        { question: "Quelle phrase est une formule de clôture d'e-mail professionnel ?", options: ["Cordialement,", "Salut,", "Tchao,"], answer: "Cordialement," },
        { question: "Quelle phrase commence une réunion ?", options: ["Commençons", "Arrêtons pour toujours", "Je pars maintenant"], answer: "Commençons" },
        { question: "Quelle phrase demande une clarification en réunion ?", options: ["Pourriez-vous clarifier ce point ?", "Ça ne m'intéresse pas", "C'est faux"], answer: "Pourriez-vous clarifier ce point ?" },
        { question: "Que signifie 'délai' ?", options: ["La date à laquelle quelque chose doit être terminé", "Un type d'e-mail", "Une salle de réunion"], answer: "La date à laquelle quelque chose doit être terminé" },
        { question: "Qu'a entendu David dire par sa responsable pour commencer la réunion ?", options: ["Commençons", "Au revoir tout le monde", "Pas de réunion aujourd'hui"], answer: "Commençons" },
        { question: "Qu'a dit David quand il n'a pas compris un point ?", options: ["Pourriez-vous clarifier ça, s'il vous plaît ?", "Je ne comprends jamais rien", "Il n'a rien dit"], answer: "Pourriez-vous clarifier ça, s'il vous plaît ?" },
        { question: "À qui David a-t-il écrit son premier e-mail professionnel ?", options: ["À un client", "À sa mère", "À un inconnu"], answer: "À un client" },
        { question: "Comment David a-t-il terminé son e-mail ?", options: ["Cordialement", "Salut", "Tchao"], answer: "Cordialement" },
        { question: "Qu'a pensé son collègue de l'e-mail ?", options: ["Qu'il était clair et bien écrit", "Qu'il était confus", "Qu'il était trop court"], answer: "Qu'il était clair et bien écrit" },
      ],
    },
    {
      lessonId: 11,
      title: "Quiz 11",
      subtitle: "Débats et Arguments",
      passingScore: 7,
      questions: [
        { question: "Quelle phrase donne une opinion ?", options: ["À mon avis,...", "Commençons", "Où est la banque ?"], answer: "À mon avis,..." },
        { question: "Quelle phrase marque un désaccord poli ?", options: ["Je crains de devoir être en désaccord", "Tu as complètement tort", "Ça ne m'intéresse pas"], answer: "Je crains de devoir être en désaccord" },
        { question: "Quelle phrase appuie un argument avec un exemple ?", options: ["Par exemple,...", "Au revoir,...", "Peut-être,..."], answer: "Par exemple,..." },
        { question: "Quelle phrase sert à conclure un argument ?", options: ["En conclusion, je pense que...", "Commençons", "Tu peux répéter ça ?"], answer: "En conclusion, je pense que..." },
        { question: "De quoi les élèves débattaient-ils ?", options: ["Si les téléphones devaient être autorisés à l'école", "Quoi manger au déjeuner", "Quel sport est le meilleur"], answer: "Si les téléphones devaient être autorisés à l'école" },
        { question: "Quelle était l'opinion de Joseph ?", options: ["Les téléphones aident les élèves à apprendre", "Les téléphones doivent être interdits pour toujours", "Les téléphones sont trop chers"], answer: "Les téléphones aident les élèves à apprendre" },
        { question: "Quelle était l'opinion de Grace ?", options: ["Les téléphones peuvent être très distrayants", "Les téléphones aident toujours", "Elle n'avait pas d'opinion"], answer: "Les téléphones peuvent être très distrayants" },
        { question: "Comment Grace a-t-elle exprimé son désaccord avec Joseph ?", options: ["Poliment, en disant 'Je comprends votre point de vue, mais...'", "En criant", "En quittant la salle"], answer: "Poliment, en disant 'Je comprends votre point de vue, mais...'" },
        { question: "Qu'a pensé le professeur du débat ?", options: ["Les deux arguments étaient bien appuyés", "Les deux élèves avaient tort", "Le débat n'avait pas de sens"], answer: "Les deux arguments étaient bien appuyés" },
        { question: "Qu'est-ce que le professeur a encouragé la classe à faire ?", options: ["Continuer à discuter avec respect", "Arrêter complètement de parler", "Être d'accord immédiatement"], answer: "Continuer à discuter avec respect" },
      ],
    },
    {
      lessonId: 12,
      title: "Quiz 12",
      subtitle: "Révision Finale et Conversation Réelle",
      passingScore: 7,
      questions: [
        { question: "Quel sujet de grammaire a été révisé dans la Leçon 1 ?", options: ["La structure de la phrase et l'accord sujet-verbe", "Les couleurs", "Les nombres"], answer: "La structure de la phrase et l'accord sujet-verbe" },
        { question: "Quels temps ont été enseignés dans la Leçon 2 ?", options: ["Le passé et le futur", "Seulement le présent", "Aucun temps"], answer: "Le passé et le futur" },
        { question: "Quelle compétence aide à poser des questions de suivi ?", options: ["Faire durer une conversation", "Terminer les conversations rapidement", "Éviter les gens"], answer: "Faire durer une conversation" },
        { question: "Que pouvait à peine faire Patrick il y a un an ?", options: ["Se présenter", "Donner des discours avancés", "Enseigner le français"], answer: "Se présenter" },
        { question: "Que peut faire Patrick maintenant ?", options: ["Tenir une conversation complète sur son travail et ses opinions", "Toujours rien", "Seulement conduire"], answer: "Tenir une conversation complète sur son travail et ses opinions" },
        { question: "Qu'est-ce que Patrick dit être la clé de son progrès ?", options: ["S'entraîner un peu chaque jour", "Étudier une fois par an", "Arrêter d'étudier"], answer: "S'entraîner un peu chaque jour" },
        { question: "Dans la conversation d'exemple, que fait le locuteur B au travail ?", options: ["Il écrit des rapports et répond aux e-mails des clients", "Il chante", "Rien"], answer: "Il écrit des rapports et répond aux e-mails des clients" },
        { question: "Comment le locuteur B se sentait-il au début du nouveau travail ?", options: ["Nerveuse", "Fatiguée", "En colère"], answer: "Nerveuse" },
        { question: "Que va faire le locuteur B de plus ?", options: ["Améliorer son français pour le travail", "Quitter son emploi", "Éviter le français"], answer: "Améliorer son français pour le travail" },
        { question: "Qu'est-ce que Patrick est impatient de commencer ?", options: ["Le Niveau 3", "Le Niveau 1 encore", "Une autre matière"], answer: "Le Niveau 3" },
      ],
    },
  ],

  finalQuiz: {
    title: "Quiz Final - Niveau 2",
    subtitle: "Ce quiz couvre toutes les leçons du Niveau 2.",
    passingScore: 15,
    questions: [
      { question: "Choisissez la phrase correcte.", options: ["Elle travaille tous les jours", "Elle travaillent tous les jours", "Elle travaillant tous les jours"], answer: "Elle travaille tous les jours" },
      { question: "Quel temps montre le passé ?", options: ["Le passé composé", "Le futur simple", "Le présent"], answer: "Le passé composé" },
      { question: "Quelle forme montre un projet décidé ?", options: ["le futur proche", "le passé composé", "l'imparfait"], answer: "le futur proche" },
      { question: "Quelle question de suivi est bonne après 'Je suis allé au marché' ?", options: ["Qu'est-ce que tu as acheté ?", "Au revoir", "Ça ne m'intéresse pas"], answer: "Qu'est-ce que tu as acheté ?" },
      { question: "Quel mot montre le contraste à l'écrit ?", options: ["cependant", "et", "ensuite"], answer: "cependant" },
      { question: "Que devriez-vous faire si vous ne comprenez pas quelqu'un qui parle ?", options: ["Demander de répéter ou de parler plus lentement", "Faire semblant d'avoir compris", "Partir en silence"], answer: "Demander de répéter ou de parler plus lentement" },
      { question: "À quoi sert la lecture ciblée ?", options: ["À trouver rapidement une information précise", "À mémoriser chaque mot", "À écrire des e-mails"], answer: "À trouver rapidement une information précise" },
      { question: "Quel mot est synonyme de 'heureux' ?", options: ["content", "froid", "tard"], answer: "content" },
      { question: "Quelle paire montre des sons souvent confondus ?", options: ["rue / roue", "rouge / bleu", "un / deux"], answer: "rue / roue" },
      { question: "Quelle phrase sert à commander à manger au restaurant ?", options: ["Je voudrais le poulet, s'il vous plaît", "Où est la banque ?", "Commençons"], answer: "Je voudrais le poulet, s'il vous plaît" },
      { question: "Quelle phrase est une formule de clôture d'e-mail professionnel ?", options: ["Cordialement,", "Salut,", "Tchao,"], answer: "Cordialement," },
      { question: "Quelle phrase marque un désaccord poli dans un débat ?", options: ["Je crains de devoir être en désaccord", "Tu as tort", "Ça ne m'intéresse pas"], answer: "Je crains de devoir être en désaccord" },
      { question: "Quel mot complète correctement : 'Je m'entraîne tous les jours, ___ je m'améliore.'", options: ["donc", "mais", "ou"], answer: "donc" },
      { question: "Quelle est l'expression figée correcte ?", options: ["prendre une décision", "faire une décision", "porter une décision"], answer: "prendre une décision" },
      { question: "Que font souvent les questions avec Quoi/Où à la fin ?", options: ["Elles descendent", "Elles montent beaucoup", "Elles disparaissent"], answer: "Elles descendent" },
      { question: "Que prévoyait de faire Thomas l'été prochain ?", options: ["Revisiter Lubumbashi", "Déménager à l'étranger", "Arrêter de voyager"], answer: "Revisiter Lubumbashi" },
      { question: "Qu'a dit Anna être son point fort principal en entretien ?", options: ["Être travailleuse et fiable", "Être la plus jeune candidate", "Connaître plusieurs langues"], answer: "Être travailleuse et fiable" },
      { question: "Qu'a pensé le collègue de David de son e-mail ?", options: ["Qu'il était clair et bien écrit", "Qu'il était trop long", "Qu'il était impoli"], answer: "Qu'il était clair et bien écrit" },
      { question: "Qu'a pensé le professeur du débat de la classe ?", options: ["Les deux arguments étaient bien appuyés", "Le débat devrait s'arrêter", "Un seul élève avait raison"], answer: "Les deux arguments étaient bien appuyés" },
      { question: "Qu'est-ce qui a le plus aidé Patrick à progresser ?", options: ["S'entraîner un peu chaque jour", "Étudier une seule fois", "Éviter de parler français"], answer: "S'entraîner un peu chaque jour" },
    ],
  },
};
