import type { LevelCurriculum } from "../types";

// New content authored for Phase 4 of the site restructuring plan,
// written entirely in French (unlike the English course, this targets
// learners perfecting French itself - see app/academia/francais/page.tsx's
// "Niveau Débutant (A1-A2)" promise: pronunciation, everyday vocabulary,
// basic grammar/conjugation, and simple sentences).
export const frenchLevel1: LevelCurriculum = {
  langCode: "FR",
  langLabel: "Français",
  langSlug: "french",
  level: 1,
  levelTitle: "Niveau 1 - Français Débutant (A1-A2)",
  levelSubtitle: "Poser des bases solides pour comprendre et s'exprimer simplement au quotidien.",

  lessons: [
    {
      id: 1,
      title: "Se présenter et saluer",
      subtitle: "Apprenez à saluer et à vous présenter en français.",
      sections: [
        { heading: "Salutations courantes", body: ["Bonjour / Salut", "Bonsoir", "Comment ça va ?", "Ça va bien, merci."] },
        {
          heading: "Se présenter",
          body: ["Je m'appelle...", "J'ai... ans", "J'habite à...", "Je suis élève / étudiant(e)", "Enchanté(e)"],
        },
      ],
      speakText: `Les salutations sont importantes quand on rencontre quelqu'un.

Salutations courantes :
Bonjour. Salut. Bonsoir. Comment ça va ? Ça va bien, merci.

Se présenter.

Je m'appelle... J'ai... ans. J'habite à... Je suis élève. Enchanté.`,
      videoTopic: "Comment se présenter en français.",
      videoUrl: "https://www.youtube.com/watch?v=Nv2RIgLcX_U",
      readingTitle: "Bonjour !",
      reading: [
        "Je m'appelle Chantal. J'ai 13 ans. J'habite à Kolwezi. Je suis élève.",
        "Chaque matin, je dis « Bonjour » à mes professeurs et à mes amis.",
        "J'aime rencontrer de nouvelles personnes. Quand je rencontre quelqu'un pour la première fois, je dis : « Bonjour, je m'appelle Chantal. Enchantée. »",
      ],
      readingSpeakText: `Bonjour ! Je m'appelle Chantal. J'ai treize ans. J'habite à Kolwezi. Je suis élève.

Chaque matin, je dis bonjour à mes professeurs et à mes amis.

J'aime rencontrer de nouvelles personnes. Quand je rencontre quelqu'un pour la première fois, je dis : bonjour, je m'appelle Chantal, enchantée.`,
      exercises: ["Bonjour, je m'appelle ...", "J'ai ... ans", "J'habite à ...", "Je suis ..."],
      speakingTopic: "Présentez-vous à la classe en trois phrases.",
    },
    {
      id: 2,
      title: "L'alphabet et la prononciation",
      subtitle: "Apprenez l'alphabet français et pratiquez la prononciation.",
      sections: [
        { heading: "L'alphabet français", body: ["L'alphabet français a 26 lettres.", "A B C D E F G H I J K L M", "N O P Q R S T U V W X Y Z"] },
        { heading: "Les voyelles", body: ["A", "E", "I", "O", "U"] },
        { heading: "Exemple", body: ["On utilise les lettres pour épeler les noms et les mots.", "Mon nom est David.", "D - A - V - I - D"] },
      ],
      speakText: `L'alphabet français a vingt-six lettres.

A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.

Les voyelles : A, E, I, O, U.

On utilise les lettres pour épeler les noms et les mots.

Exemple : mon nom est David. D, A, V, I, D.`,
      videoTopic: "Réciter l'alphabet français de A à Z.",
      videoUrl: "https://www.youtube.com/watch?v=mOaJwzvWTp4",
      readingTitle: "Bonjour, je m'appelle Anna.",
      reading: [
        "J'apprends le français à l'école.",
        "Aujourd'hui, j'apprends l'alphabet.",
        "Je m'entraîne tous les jours et j'aime apprendre de nouveaux mots.",
        "Je sais épeler mon nom : A - N - N - A.",
      ],
      readingSpeakText: `Bonjour, je m'appelle Anna.

J'apprends le français à l'école. Aujourd'hui, j'apprends l'alphabet.

Je m'entraîne tous les jours et j'aime apprendre de nouveaux mots.

Je sais épeler mon nom : A, N, N, A.`,
      exercises: ["Récitez l'alphabet de A à Z.", "Épelez votre nom en français.", "Épelez votre adresse e-mail.", "Entraînez-vous à prononcer les voyelles."],
      speakingTopic: "Présentez-vous et épelez votre nom complet.",
    },
    {
      id: 3,
      title: "Les nombres et les informations personnelles",
      subtitle: "Apprenez les nombres et comment partager vos informations personnelles.",
      sections: [
        { heading: "Les nombres de 1 à 10", body: ["1 - Un", "2 - Deux", "3 - Trois", "4 - Quatre", "5 - Cinq", "6 - Six", "7 - Sept", "8 - Huit", "9 - Neuf", "10 - Dix"] },
        {
          heading: "Informations personnelles",
          body: ["Questions importantes :", "Comment tu t'appelles ?", "Quel âge as-tu ?", "Où habites-tu ?", "Quel est ton numéro de téléphone ?"],
        },
        { heading: "Exemple de réponses", body: ["Je m'appelle David.", "J'ai 15 ans.", "J'habite à Kinshasa.", "Mon numéro de téléphone est le 123456789."] },
      ],
      speakText: `Les nombres de un à dix : un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix.

Informations personnelles.

Comment tu t'appelles ? Quel âge as-tu ? Où habites-tu ? Quel est ton numéro de téléphone ?

Exemple de réponses : je m'appelle David. J'ai quinze ans. J'habite à Kinshasa.`,
      videoTopic: "Apprendre les nombres et se présenter.",
      videoUrl: "https://www.youtube.com/watch?v=lFvsnqJT1aA",
      readingTitle: "Bonjour, je m'appelle Sarah.",
      reading: ["J'ai 14 ans.", "J'habite à Kinshasa.", "Mon numéro de téléphone est le 987654321."],
      readingSpeakText: `Bonjour, je m'appelle Sarah. J'ai quatorze ans. J'habite à Kinshasa. Mon numéro de téléphone est le neuf huit sept six cinq quatre trois deux un.`,
      exercises: ["Comptez de 1 à 10 en français.", "Écrivez votre nom en français.", "Dites votre âge en français.", "Écrivez votre numéro de téléphone en français."],
      speakingTopic: "Présentez-vous avec vos informations personnelles.",
    },
    {
      id: 4,
      title: "La famille",
      subtitle: "Apprenez les membres de la famille et comment en parler.",
      sections: [
        { heading: "Les membres de la famille", body: ["Père", "Mère", "Frère", "Sœur", "Oncle", "Tante", "Grand-père", "Grand-mère", "Cousin", "Parents"] },
        {
          heading: "Phrases utiles",
          body: ["C'est mon père.", "Ma mère est très gentille.", "J'ai un frère et deux sœurs.", "J'aime ma famille."],
        },
        { heading: "Exemple", body: ["J'habite avec ma famille.", "Mon père travaille dans un bureau.", "Ma mère est enseignante.", "Nous sommes heureux ensemble."] },
      ],
      speakText: `Les membres de la famille : père, mère, frère, sœur, oncle, tante, grand-père, grand-mère, cousin, parents.

Phrases utiles : c'est mon père. Ma mère est très gentille. J'ai un frère et deux sœurs.

Exemple : j'habite avec ma famille. Mon père travaille dans un bureau. Ma mère est enseignante.`,
      videoTopic: "Apprendre le vocabulaire de la famille.",
      videoUrl: "https://www.youtube.com/watch?v=8rOj0ccPhiY",
      readingTitle: "Je m'appelle Jean.",
      reading: ["J'habite avec mes parents et ma sœur.", "Mon père est médecin.", "Ma mère est très attentionnée.", "J'aime passer du temps avec ma famille."],
      readingSpeakText: `Je m'appelle Jean. J'habite avec mes parents et ma sœur. Mon père est médecin. Ma mère est très attentionnée. J'aime passer du temps avec ma famille.`,
      exercises: ["Nommez cinq membres de la famille en français.", "Décrivez votre famille en phrases simples.", "Dites qui habite chez vous.", "Entraînez-vous à dire les liens de parenté à voix haute."],
      speakingTopic: "Parlez de votre famille et des personnes proches de vous.",
    },
    {
      id: 5,
      title: "Les objets du quotidien",
      subtitle: "Apprenez les objets que nous utilisons tous les jours.",
      sections: [
        { heading: "Objets courants", body: ["Livre", "Stylo", "Chaise", "Table", "Téléphone", "Sac", "Ordinateur", "Bouteille", "Cahier", "Clé"] },
        { heading: "Phrases utiles", body: ["C'est mon livre.", "J'écris avec un stylo.", "La chaise est bleue.", "Mon téléphone est sur la table."] },
        { heading: "Décrire les objets", body: ["On peut décrire les objets par la couleur, la taille et l'usage.", "Le livre est petit.", "L'ordinateur est neuf.", "Le sac est lourd."] },
      ],
      speakText: `Objets courants : livre, stylo, chaise, table, téléphone, sac, ordinateur, bouteille, cahier, clé.

Phrases utiles : c'est mon livre. J'écris avec un stylo. La chaise est bleue.

Décrire les objets : le livre est petit. L'ordinateur est neuf. Le sac est lourd.`,
      videoTopic: "Apprendre les objets courants et leur prononciation.",
      videoUrl: "https://www.youtube.com/watch?v=LHILn-NQMwY",
      readingTitle: "Je m'appelle Pierre.",
      reading: ["Chaque jour, je vais à l'école avec mon sac et mon cahier.", "J'utilise un stylo pour écrire dans mon livre.", "Mon téléphone est dans mon sac.", "Je m'assois sur une chaise et j'étudie chaque matin."],
      readingSpeakText: `Je m'appelle Pierre. Chaque jour, je vais à l'école avec mon sac et mon cahier. J'utilise un stylo pour écrire dans mon livre. Mon téléphone est dans mon sac.`,
      exercises: ["Nommez cinq objets autour de vous.", "Décrivez votre sac d'école.", "Écrivez trois phrases avec des noms d'objets.", "Entraînez-vous à la prononciation."],
      speakingTopic: "Parlez des objets que vous utilisez tous les jours.",
    },
    {
      id: 6,
      title: "Les couleurs et les descriptions",
      subtitle: "Apprenez les couleurs et comment décrire les personnes et les objets.",
      sections: [
        { heading: "Couleurs courantes", body: ["Rouge", "Bleu", "Vert", "Jaune", "Noir", "Blanc", "Orange", "Marron", "Rose", "Violet"] },
        { heading: "Décrire les objets", body: ["Le sac est rouge.", "Le téléphone est noir.", "La chaise est bleue.", "Le cahier est vert."] },
        { heading: "Décrire les personnes", body: ["Elle est grande.", "Il est petit.", "Elle est heureuse.", "Il est fort.", "Elle est gentille."] },
      ],
      speakText: `Couleurs courantes : rouge, bleu, vert, jaune, noir, blanc, orange, marron, rose, violet.

Décrire les objets : le sac est rouge. Le téléphone est noir. La chaise est bleue.

Décrire les personnes : elle est grande. Il est petit. Elle est heureuse. Il est fort.`,
      videoTopic: "Apprendre les couleurs et pratiquer les descriptions.",
      videoUrl: "https://www.youtube.com/watch?v=xfcnf7vZ7mA",
      readingTitle: "Je m'appelle Lisa.",
      reading: ["J'ai un sac d'école bleu.", "Mon cahier est vert et mon téléphone est noir.", "Je suis heureuse et gentille.", "Mon petit frère est petit mais très fort."],
      readingSpeakText: `Je m'appelle Lisa. J'ai un sac d'école bleu. Mon cahier est vert et mon téléphone est noir. Je suis heureuse et gentille.`,
      exercises: ["Nommez cinq couleurs en français.", "Décrivez votre téléphone.", "Décrivez-vous en deux phrases.", "Utilisez trois adjectifs dans des phrases."],
      speakingTopic: "Décrivez-vous et trois objets autour de vous.",
    },
    {
      id: 7,
      title: "Les jours, les mois et les dates",
      subtitle: "Apprenez à parler des jours, des mois et des dates importantes.",
      sections: [
        { heading: "Les jours de la semaine", body: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"] },
        { heading: "Les mois de l'année", body: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"] },
        { heading: "Phrases utiles", body: ["Aujourd'hui, c'est lundi.", "Mon anniversaire est en juillet.", "L'école commence en septembre.", "Je vais à l'église le dimanche."] },
      ],
      speakText: `Les jours de la semaine : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.

Les mois de l'année : janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.

Phrases utiles : aujourd'hui, c'est lundi. Mon anniversaire est en juillet.`,
      videoTopic: "Apprendre les jours, les mois et comment dire les dates.",
      videoUrl: "https://www.youtube.com/watch?v=q-wjUX3GSnk",
      readingTitle: "Je m'appelle Kevin.",
      reading: [
        "Aujourd'hui, c'est vendredi 12 juin. Je me réveille tôt chaque matin.",
        "Je vais à l'école du lundi au vendredi et je me repose le samedi.",
        "Mon mois préféré est juillet, car c'est le mois de mon anniversaire.",
        "Chaque dimanche, je vais à l'église avec mes parents.",
      ],
      readingSpeakText: `Je m'appelle Kevin. Aujourd'hui, c'est vendredi douze juin. Je me réveille tôt chaque matin. Je vais à l'école du lundi au vendredi et je me repose le samedi.`,
      exercises: ["Dites tous les jours de la semaine.", "Dites tous les mois de l'année.", "Donnez la date de votre anniversaire.", "Dites quel jour on est aujourd'hui."],
      speakingTopic: "Parlez de votre anniversaire et de vos activités de la semaine.",
    },
    {
      id: 8,
      title: "Les routines quotidiennes",
      subtitle: "Apprenez à parler de vos activités et habitudes quotidiennes.",
      sections: [
        { heading: "Activités quotidiennes courantes", body: ["Se réveiller", "Se brosser les dents", "Prendre une douche", "Prendre le petit-déjeuner", "Aller à l'école", "Étudier", "Déjeuner", "Jouer avec des amis", "Faire les devoirs", "Dormir"] },
        { heading: "Phrases utiles", body: ["Je me réveille à 6 heures.", "Je me brosse les dents chaque matin.", "Je vais à l'école à 7 heures.", "Je fais mes devoirs le soir."] },
      ],
      speakText: `Activités quotidiennes : se réveiller, se brosser les dents, prendre une douche, prendre le petit-déjeuner, aller à l'école, étudier, déjeuner, jouer avec des amis, faire les devoirs, dormir.

Phrases utiles : je me réveille à six heures. Je vais à l'école à sept heures. Je fais mes devoirs le soir.`,
      videoTopic: "Apprendre le vocabulaire des routines quotidiennes.",
      videoUrl: "https://www.youtube.com/watch?v=ukklE6c-DD4",
      readingTitle: "Je m'appelle Daniel.",
      reading: [
        "Chaque jour, je me réveille à 6 heures du matin.",
        "Je me brosse les dents et je prends une douche avant le petit-déjeuner.",
        "À 7 heures, je vais à l'école et j'étudie avec mes camarades.",
        "L'après-midi, je joue au football avec mes amis.",
        "Le soir, je fais mes devoirs et je dors à 21 heures.",
      ],
      readingSpeakText: `Je m'appelle Daniel. Chaque jour, je me réveille à six heures du matin. Je me brosse les dents et je prends une douche avant le petit-déjeuner.`,
      exercises: ["Décrivez votre routine du matin.", "Dites à quelle heure vous vous réveillez.", "Écrivez trois phrases sur vos activités quotidiennes.", "Parlez de ce que vous faites après l'école."],
      speakingTopic: "Parlez de votre routine quotidienne du matin au soir.",
    },
    {
      id: 9,
      title: "La nourriture et les boissons",
      subtitle: "Apprenez le vocabulaire des aliments, des boissons et des repas.",
      sections: [
        { heading: "Aliments courants", body: ["Riz", "Pain", "Viande", "Poisson", "Œufs", "Poulet", "Banane", "Pomme"] },
        { heading: "Boissons courantes", body: ["Eau", "Lait", "Jus", "Thé", "Café"] },
        { heading: "Phrases utiles", body: ["Je bois de l'eau chaque jour.", "Mon aliment préféré est le riz.", "Je mange du pain au petit-déjeuner.", "Nous mangeons du poulet au dîner."] },
      ],
      speakText: `Aliments courants : riz, pain, viande, poisson, œufs, poulet, banane, pomme.

Boissons courantes : eau, lait, jus, thé, café.

Phrases utiles : je bois de l'eau chaque jour. Mon aliment préféré est le riz. Je mange du pain au petit-déjeuner.`,
      videoTopic: "Apprendre le vocabulaire de la nourriture et des boissons.",
      videoUrl: "https://www.youtube.com/watch?v=ptT-wTW14yM",
      readingTitle: "Je m'appelle Emma.",
      reading: [
        "Chaque matin, je mange du pain et des œufs au petit-déjeuner.",
        "À l'école, je bois de l'eau et parfois du jus de fruits.",
        "Mon aliment préféré est le riz avec du poulet.",
        "Le soir, ma famille mange du poisson et des légumes ensemble.",
      ],
      readingSpeakText: `Je m'appelle Emma. Chaque matin, je mange du pain et des œufs au petit-déjeuner. À l'école, je bois de l'eau et parfois du jus de fruits.`,
      exercises: ["Nommez cinq aliments en français.", "Nommez trois boissons en français.", "Dites ce que vous mangez au petit-déjeuner.", "Décrivez votre repas préféré."],
      speakingTopic: "Parlez de votre nourriture préférée et de ce que vous buvez chaque jour.",
    },
    {
      id: 10,
      title: "Les lieux en ville",
      subtitle: "Apprenez le vocabulaire des lieux que l'on trouve en ville.",
      sections: [
        { heading: "Lieux courants en ville", body: ["École", "Hôpital", "Marché", "Banque", "Restaurant", "Église", "Commissariat", "Gare routière", "Bibliothèque", "Parc"] },
        { heading: "Phrases utiles", body: ["Je vais à l'école chaque matin.", "Ma mère travaille à l'hôpital.", "Nous achèterons la nourriture au marché.", "Les enfants jouent dans le parc."] },
        { heading: "Demander son chemin", body: ["Où est l'hôpital ?", "Comment aller à la banque ?", "Le marché est près de l'église.", "La bibliothèque est à côté de l'école."] },
      ],
      speakText: `Lieux courants en ville : école, hôpital, marché, banque, restaurant, église, commissariat, gare routière, bibliothèque, parc.

Demander son chemin : où est l'hôpital ? Comment aller à la banque ? Le marché est près de l'église.`,
      videoTopic: "Apprendre le vocabulaire des lieux et des directions.",
      videoUrl: "https://www.youtube.com/watch?v=1AuJcIR6M40",
      readingTitle: "Mercredi dernier, Michaël est allé au centre-ville avec son père.",
      reading: [
        "D'abord, ils se sont arrêtés à la banque car son père devait retirer de l'argent.",
        "Après la banque, ils ont marché jusqu'au marché pour acheter des fruits et des légumes frais.",
        "En marchant, Michaël a vu un grand hôpital près du commissariat.",
        "Avant de rentrer, ils se sont assis dans un petit restaurant et ont déjeuné ensemble.",
      ],
      readingSpeakText: `Mercredi dernier, Michaël est allé au centre-ville avec son père. D'abord, ils se sont arrêtés à la banque car son père devait retirer de l'argent.`,
      exercises: ["Nommez cinq lieux de votre ville.", "Dites où les gens achètent la nourriture.", "Décrivez les lieux près de chez vous.", "Faites des phrases avec le vocabulaire de la ville."],
      speakingTopic: "Décrivez les lieux que vous visitez souvent en ville.",
    },
    {
      id: 11,
      title: "Les loisirs et les centres d'intérêt",
      subtitle: "Apprenez à parler de vos loisirs et de votre temps libre.",
      sections: [
        { heading: "Loisirs courants", body: ["Lire des livres", "Jouer au football", "Écouter de la musique", "Regarder des films", "Dessiner", "Danser", "Chanter", "Cuisiner", "Nager", "Jouer aux jeux vidéo"] },
        { heading: "Phrases utiles", body: ["Mon loisir préféré est la lecture.", "J'aime jouer au football.", "Elle aime écouter de la musique.", "Nous regardons des films le week-end."] },
        { heading: "Parler de ses centres d'intérêt", body: ["Qu'est-ce que tu aimes faire ?", "J'aime passer du temps avec mes amis.", "Mon loisir m'aide à me relaxer."] },
      ],
      speakText: `Loisirs courants : lire des livres, jouer au football, écouter de la musique, regarder des films, dessiner, danser, chanter, cuisiner, nager, jouer aux jeux vidéo.

Phrases utiles : mon loisir préféré est la lecture. J'aime jouer au football.

Qu'est-ce que tu aimes faire ? Mon loisir m'aide à me relaxer.`,
      videoTopic: "Apprendre le vocabulaire des loisirs et du temps libre.",
      videoUrl: "https://www.youtube.com/watch?v=-0YM3EFcl2A",
      readingTitle: "Samedi après-midi, James a rendu visite à son cousin Daniel.",
      reading: [
        "Quand il est arrivé, Daniel était assis dehors et lisait un livre sur les animaux.",
        "Après la lecture, les deux garçons ont décidé de jouer au football dans le parc du quartier.",
        "Plus tard, ils sont rentrés écouter de la musique pendant que la sœur de Daniel dessinait au salon.",
        "James a dit qu'il avait passé une bonne journée car faire des activités amusantes le rendait heureux.",
      ],
      readingSpeakText: `Samedi après-midi, James a rendu visite à son cousin Daniel. Quand il est arrivé, Daniel était assis dehors et lisait un livre sur les animaux.`,
      exercises: ["Nommez trois loisirs que vous aimez.", "Parlez de ce que vous faites pendant votre temps libre.", "Faites des phrases avec le vocabulaire des loisirs.", "Décrivez votre activité préférée du week-end."],
      speakingTopic: "Parlez de votre loisir préféré et expliquez pourquoi vous l'aimez.",
    },
    {
      id: 12,
      title: "Révision finale et conversation réelle",
      subtitle: "Revoyez tout ce que vous avez appris et pratiquez une vraie conversation en français.",
      sections: [
        {
          heading: "Ce que nous avons appris",
          body: [
            "Saluer poliment",
            "Se présenter",
            "Parler de son âge et de ses informations personnelles",
            "Parler des membres de la famille",
            "Nommer les objets du quotidien",
            "Utiliser les couleurs et les descriptions",
            "Parler des dates et des mois",
            "Décrire les routines quotidiennes",
            "Parler de la nourriture et des boissons",
            "Décrire les lieux en ville",
            "Parler de ses loisirs et centres d'intérêt",
          ],
        },
        {
          heading: "Exemple de conversation réelle",
          body: [
            "A : Bonjour ! Je m'appelle David. Comment tu t'appelles ?",
            "B : Salut David, je m'appelle Sarah. Enchantée.",
            "A : Enchanté aussi. Quel âge as-tu ?",
            "B : J'ai 15 ans. J'habite près du marché de la ville.",
            "A : Super. Qu'est-ce que tu aimes faire pendant ton temps libre ?",
            "B : J'aime lire des livres et écouter de la musique.",
            "A : Quel est ton aliment préféré ?",
            "B : J'adore le riz avec du poulet.",
          ],
        },
      ],
      speakText: `Les choses importantes que nous avons apprises : saluer poliment, se présenter, parler de son âge, parler de sa famille, nommer les objets du quotidien, utiliser les couleurs, parler des dates, décrire les routines, parler de la nourriture, décrire les lieux en ville, et parler des loisirs.

Exemple de conversation réelle.

Bonjour, je m'appelle David. Comment tu t'appelles ?
Salut David, je m'appelle Sarah. Enchantée.
Enchanté aussi. Quel âge as-tu ?
J'ai quinze ans. J'habite près du marché de la ville.`,
      videoTopic: "Réviser la conversation de base et le vocabulaire du Niveau 1.",
      videoUrl: "https://www.youtube.com/watch?v=c-S1vghfIbo",
      readingTitle: "Dimanche dernier, Kevin a voyagé avec sa famille pour rendre visite à son oncle en ville.",
      reading: [
        "Avant de partir, il a mangé du pain et bu du thé au petit-déjeuner.",
        "À son arrivée, Kevin a salué tout le monde poliment et s'est présenté à des visiteurs qu'il n'avait jamais rencontrés.",
        "Plus tard, il est allé au marché avec son cousin et a aidé à acheter des légumes, du poisson et du riz pour le déjeuner.",
        "À la fin de la journée, Kevin a dit qu'il avait aimé passer du temps en famille et faire des activités qu'il aimait.",
      ],
      readingSpeakText: `Dimanche dernier, Kevin a voyagé avec sa famille pour rendre visite à son oncle en ville. Avant de partir, il a mangé du pain et bu du thé au petit-déjeuner.`,
      exercises: ["Présentez-vous en français.", "Parlez de votre famille.", "Décrivez votre aliment préféré.", "Décrivez votre routine quotidienne.", "Parlez de vos loisirs."],
      speakingTopic: "Présentez-vous et décrivez une journée normale de votre vie.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Quiz 1",
      subtitle: "Se présenter et saluer",
      passingScore: 7,
      questions: [
        { question: "Comment salue-t-on quelqu'un ?", options: ["Bonjour", "Chaise", "Eau"], answer: "Bonjour" },
        { question: "Comment se présente-t-on ?", options: ["Je m'appelle Jean", "Bonne nuit", "Banque"], answer: "Je m'appelle Jean" },
        { question: "Comment s'appelle la fille du texte ?", options: ["Jean", "Chantal", "Sarah"], answer: "Chantal" },
        { question: "Quel âge a Chantal ?", options: ["20 ans", "13 ans", "12 ans"], answer: "13 ans" },
        { question: "Où habite Chantal ?", options: ["Kolwezi", "Kinshasa", "Paris"], answer: "Kolwezi" },
        { question: "Choisissez une présentation :", options: ["Je m'appelle Chantal", "L'école est grande", "Chaise bleue"], answer: "Je m'appelle Chantal" },
        { question: "Que dit Chantal le matin ?", options: ["Au revoir", "Bonjour", "Salut"], answer: "Bonjour" },
        { question: "Choisissez un mot de salutation :", options: ["Bonjour", "Poulet", "Lundi"], answer: "Bonjour" },
        { question: "Que dit-elle quand elle rencontre quelqu'un de nouveau ?", options: ["Enchantée", "Bonjour, je m'appelle Chantal, enchantée", "Bonjour, bienvenue"], answer: "Bonjour, je m'appelle Chantal, enchantée" },
        { question: "Que dit-on pour se présenter ?", options: ["Je m'appelle...", "Tourne à gauche", "Je mange du riz"], answer: "Je m'appelle..." },
      ],
    },
    {
      lessonId: 2,
      title: "Quiz 2",
      subtitle: "L'alphabet et la prononciation",
      passingScore: 7,
      questions: [
        { question: "Combien de lettres compte l'alphabet français ?", options: ["24", "26", "28"], answer: "26" },
        { question: "Laquelle de ces lettres est une voyelle ?", options: ["B", "E", "T"], answer: "E" },
        { question: "Comment épelle-t-on le nom David ?", options: ["D-A-V-I-D", "D-A-V-I-T", "D-E-V-I-D"], answer: "D-A-V-I-D" },
        { question: "À quoi servent les lettres ?", options: ["À épeler les noms et les mots", "À cuisiner", "À jouer au football"], answer: "À épeler les noms et les mots" },
        { question: "Comment s'appelle la fille du texte ?", options: ["Sarah", "Anna", "Emma"], answer: "Anna" },
        { question: "Qu'apprend Anna aujourd'hui ?", options: ["L'alphabet", "Les nombres", "Les couleurs"], answer: "L'alphabet" },
        { question: "Où Anna apprend-elle le français ?", options: ["À la maison", "À l'école", "Au marché"], answer: "À l'école" },
        { question: "Comment Anna épelle-t-elle son nom ?", options: ["A-N-N-A", "A-N-A", "A-N-N-E"], answer: "A-N-N-A" },
        { question: "Qu'est-ce qu'Anna aime ?", options: ["Apprendre de nouveaux mots", "Dormir", "Regarder la télévision"], answer: "Apprendre de nouveaux mots" },
        { question: "Combien de voyelles y a-t-il en français ?", options: ["5", "10", "20"], answer: "5" },
      ],
    },
    {
      lessonId: 3,
      title: "Quiz 3",
      subtitle: "Les nombres et les informations personnelles",
      passingScore: 7,
      questions: [
        { question: "Comment dit-on le chiffre 5 en français ?", options: ["Sept", "Cinq", "Quatre"], answer: "Cinq" },
        { question: "Comment dit-on le chiffre 8 en français ?", options: ["Trois", "Dix", "Huit"], answer: "Huit" },
        { question: "Quelle question demande l'âge ?", options: ["Comment tu t'appelles ?", "Quel âge as-tu ?", "Où est le livre ?"], answer: "Quel âge as-tu ?" },
        { question: "Quelle phrase est correcte ?", options: ["David je suis", "Je m'appelle David", "Suis David je"], answer: "Je m'appelle David" },
        { question: "Comment s'appelle la fille du texte ?", options: ["Marie", "Sarah", "Anna"], answer: "Sarah" },
        { question: "Quel âge a Sarah ?", options: ["18 ans", "14 ans", "10 ans"], answer: "14 ans" },
        { question: "Où habite Sarah ?", options: ["Londres", "Paris", "Kinshasa"], answer: "Kinshasa" },
        { question: "Quel est le numéro de téléphone de Sarah ?", options: ["123456789", "987654321", "555666777"], answer: "987654321" },
        { question: "Quelle information est une information personnelle ?", options: ["Chaise bleue", "Football", "Numéro de téléphone"], answer: "Numéro de téléphone" },
        { question: "Comment compte-on de 1 à 3 en français ?", options: ["Un, deux, trois", "Un, trois, deux", "Deux, un, trois"], answer: "Un, deux, trois" },
      ],
    },
    {
      lessonId: 4,
      title: "Quiz 4",
      subtitle: "La famille",
      passingScore: 7,
      questions: [
        { question: "Quel mot signifie parent de sexe masculin ?", options: ["Frère", "Père", "Oncle"], answer: "Père" },
        { question: "Qui est votre parent de sexe féminin ?", options: ["Mère", "Sœur", "Cousine"], answer: "Mère" },
        { question: "Quelle phrase est correcte ?", options: ["Ma mère est gentille", "Gentille mère ma est", "Mère est ma gentille"], answer: "Ma mère est gentille" },
        { question: "Qui sont vos parents ?", options: ["Père et mère", "Professeur et médecin", "Frère et ami"], answer: "Père et mère" },
        { question: "Quel mot signifie le frère de votre père ?", options: ["Cousin", "Oncle", "Grand-mère"], answer: "Oncle" },
        { question: "Comment s'appelle le garçon du texte ?", options: ["David", "Jean", "Marc"], answer: "Jean" },
        { question: "Avec qui habite Jean ?", options: ["Ses amis", "Ses parents et sa sœur", "Son professeur"], answer: "Ses parents et sa sœur" },
        { question: "Quel est le métier du père de Jean ?", options: ["Médecin", "Chauffeur", "Agriculteur"], answer: "Médecin" },
        { question: "Comment la mère de Jean est-elle décrite ?", options: ["Sévère", "Très attentionnée", "Fâchée"], answer: "Très attentionnée" },
        { question: "Qu'est-ce que Jean aime faire ?", options: ["Jouer seul au football", "Passer du temps avec sa famille", "Regarder la télévision toute la journée"], answer: "Passer du temps avec sa famille" },
      ],
    },
    {
      lessonId: 5,
      title: "Quiz 5",
      subtitle: "Les objets du quotidien",
      passingScore: 7,
      questions: [
        { question: "Quel objet utilise-t-on pour écrire ?", options: ["Bouteille", "Stylo", "Chaise"], answer: "Stylo" },
        { question: "Quel objet permet d'appeler quelqu'un ?", options: ["Téléphone", "Livre", "Table"], answer: "Téléphone" },
        { question: "Où les élèves transportent-ils généralement leurs livres ?", options: ["Sac", "Bouteille", "Clé"], answer: "Sac" },
        { question: "Quelle phrase est correcte ?", options: ["C'est mon livre", "Livre mon c'est", "Est ce mon livre"], answer: "C'est mon livre" },
        { question: "Qu'est-ce qui peut être lourd ?", options: ["Le sac", "Le sourire", "L'air"], answer: "Le sac" },
        { question: "Comment s'appelle le garçon du texte ?", options: ["Pierre", "Daniel", "Tom"], answer: "Pierre" },
        { question: "Où Pierre va-t-il chaque jour ?", options: ["École", "Hôpital", "Marché"], answer: "École" },
        { question: "Qu'utilise Pierre pour écrire ?", options: ["Stylo", "Bouteille", "Ordinateur"], answer: "Stylo" },
        { question: "Où est le téléphone de Pierre ?", options: ["Dans son sac", "Sur le toit", "Sous la chaise"], answer: "Dans son sac" },
        { question: "Sur quoi Pierre s'assoit-il ?", options: ["Chaise", "Table", "Bouteille"], answer: "Chaise" },
      ],
    },
    {
      lessonId: 6,
      title: "Quiz 6",
      subtitle: "Les couleurs et les descriptions",
      passingScore: 7,
      questions: [
        { question: "Lequel est une couleur ?", options: ["Médecin", "Bleu", "Table"], answer: "Bleu" },
        { question: "Quelle phrase est correcte ?", options: ["Sac est le rouge", "Le sac est rouge", "Rouge sac le est"], answer: "Le sac est rouge" },
        { question: "Quel adjectif décrit la taille ?", options: ["Bouteille", "Grand", "Lundi"], answer: "Grand" },
        { question: "Quelle couleur est souvent l'opposé du noir ?", options: ["Vert", "Blanc", "Orange"], answer: "Blanc" },
        { question: "Quel adjectif décrit une personne ?", options: ["Cahier", "Fenêtre", "Gentille"], answer: "Gentille" },
        { question: "Comment s'appelle la fille du texte ?", options: ["Sarah", "Lisa", "Anna"], answer: "Lisa" },
        { question: "De quelle couleur est le sac d'école de Lisa ?", options: ["Jaune", "Bleu", "Noir"], answer: "Bleu" },
        { question: "De quelle couleur est le téléphone de Lisa ?", options: ["Rouge", "Vert", "Noir"], answer: "Noir" },
        { question: "Comment Lisa est-elle décrite ?", options: ["Triste et silencieuse", "Heureuse et gentille", "Fâchée et fatiguée"], answer: "Heureuse et gentille" },
        { question: "Comment est le petit frère de Lisa ?", options: ["Calme et triste", "Petit et fort", "Grand et faible"], answer: "Petit et fort" },
      ],
    },
    {
      lessonId: 7,
      title: "Quiz 7",
      subtitle: "Les jours, les mois et les dates",
      passingScore: 7,
      questions: [
        { question: "Lequel est un jour de la semaine ?", options: ["Professeur", "Mardi", "Bouteille"], answer: "Mardi" },
        { question: "Lequel est un mois ?", options: ["Vendredi", "Juillet", "Fenêtre"], answer: "Juillet" },
        { question: "Combien de jours y a-t-il dans une semaine ?", options: ["Dix", "Sept", "Cinq"], answer: "Sept" },
        { question: "Quelle phrase est correcte ?", options: ["Lundi aujourd'hui est", "Aujourd'hui, c'est lundi", "Est lundi aujourd'hui"], answer: "Aujourd'hui, c'est lundi" },
        { question: "Quelle question demande l'anniversaire ?", options: ["Où est ton sac ?", "Quand est ton anniversaire ?", "De quelle couleur est ton téléphone ?"], answer: "Quand est ton anniversaire ?" },
        { question: "Comment s'appelle le garçon du texte ?", options: ["Kevin", "Jean", "Pierre"], answer: "Kevin" },
        { question: "Quel jour sommes-nous dans l'histoire ?", options: ["Dimanche", "Vendredi", "Mardi"], answer: "Vendredi" },
        { question: "Quel est le mois préféré de Kevin ?", options: ["Juin", "Juillet", "Décembre"], answer: "Juillet" },
        { question: "Quelle est la date de l'anniversaire de Kevin ?", options: ["25 juillet", "12 juin", "10 août"], answer: "25 juillet" },
        { question: "Que fait Kevin chaque dimanche ?", options: ["Il reste à la maison", "Il va à l'église", "Il joue au football"], answer: "Il va à l'église" },
      ],
    },
    {
      lessonId: 8,
      title: "Quiz 8",
      subtitle: "Les routines quotidiennes",
      passingScore: 7,
      questions: [
        { question: "Que fait-on généralement en premier le matin ?", options: ["Se réveiller", "Dormir", "Jouer au football"], answer: "Se réveiller" },
        { question: "Quelle activité se passe dans la salle de bain ?", options: ["Se brosser les dents", "Étudier les maths", "Regarder la télévision"], answer: "Se brosser les dents" },
        { question: "Quelle phrase est correcte ?", options: ["Je vais à l'école", "École je à vais", "Vais école à je"], answer: "Je vais à l'école" },
        { question: "Quand les élèves font-ils généralement leurs devoirs ?", options: ["Le soir", "À minuit", "Avant le petit-déjeuner"], answer: "Le soir" },
        { question: "Comment s'appelle le garçon du texte ?", options: ["Pierre", "Daniel", "Kevin"], answer: "Daniel" },
        { question: "À quelle heure Daniel se réveille-t-il ?", options: ["6 heures", "21 heures", "midi"], answer: "6 heures" },
        { question: "Que fait Daniel avant le petit-déjeuner ?", options: ["Il se brosse les dents et prend une douche", "Il joue au football", "Il fait ses devoirs"], answer: "Il se brosse les dents et prend une douche" },
        { question: "Que fait Daniel l'après-midi ?", options: ["Il dort", "Il joue au football avec ses amis", "Il va à l'église"], answer: "Il joue au football avec ses amis" },
        { question: "À quelle heure Daniel dort-il ?", options: ["6 heures", "21 heures", "14 heures"], answer: "21 heures" },
      ],
    },
    {
      lessonId: 9,
      title: "Quiz 9",
      subtitle: "La nourriture et les boissons",
      passingScore: 7,
      questions: [
        { question: "Lequel est une boisson ?", options: ["Pain", "Jus", "Poisson"], answer: "Jus" },
        { question: "Comment s'appelle la fille du texte ?", options: ["Sarah", "Emma", "Lisa"], answer: "Emma" },
        { question: "Que mange Emma au petit-déjeuner ?", options: ["Riz et poulet", "Pain et œufs", "Poisson et légumes"], answer: "Pain et œufs" },
        { question: "Que boit Emma à l'école ?", options: ["Du café", "De l'eau et parfois du jus", "Du lait"], answer: "De l'eau et parfois du jus" },
        { question: "Quel est l'aliment préféré d'Emma ?", options: ["Le riz avec du poulet", "Le pain avec du thé", "La banane avec du lait"], answer: "Le riz avec du poulet" },
        { question: "Que mange la famille d'Emma le soir ?", options: ["Seulement du pain", "Du poisson et des légumes", "Une pizza"], answer: "Du poisson et des légumes" },
        { question: "Lequel est un fruit ?", options: ["Banane", "Cahier", "Chaise"], answer: "Banane" },
        { question: "Que boit Emma avant de dormir ?", options: ["Du café", "De l'eau", "Du thé"], answer: "De l'eau" },
        { question: "Que nous donnent la nourriture et les boissons ?", options: ["De l'énergie et la santé", "De l'argent", "Des devoirs"], answer: "De l'énergie et la santé" },
        { question: "Quelle phrase est correcte ?", options: ["Elle a bu du jus de fruits", "Jus de fruits elle a bu", "A bu elle jus de fruits"], answer: "Elle a bu du jus de fruits" },
      ],
    },
    {
      lessonId: 10,
      title: "Quiz 10",
      subtitle: "Les lieux en ville",
      passingScore: 7,
      questions: [
        { question: "Où les gens achètent-ils généralement leur nourriture ?", options: ["Marché", "Bibliothèque", "Hôpital"], answer: "Marché" },
        { question: "Quel lieu aide les personnes malades ?", options: ["Banque", "Hôpital", "Restaurant"], answer: "Hôpital" },
        { question: "Où les enfants peuvent-ils jouer ?", options: ["Commissariat", "Parc", "Banque"], answer: "Parc" },
        { question: "Où les gens gardent-ils leur argent ?", options: ["Restaurant", "École", "Banque"], answer: "Banque" },
        { question: "Qui est allé en ville avec Michaël ?", options: ["Son père", "Son professeur", "Sa sœur"], answer: "Son père" },
        { question: "Pourquoi le père de Michaël s'est-il arrêté à la banque ?", options: ["Pour retirer de l'argent", "Pour acheter de la nourriture", "Pour voir un médecin"], answer: "Pour retirer de l'argent" },
        { question: "Qu'ont-ils acheté au marché ?", options: ["Des livres", "Des fruits et légumes", "Des chaussures"], answer: "Des fruits et légumes" },
        { question: "Qu'est-ce que Michaël a vu près du commissariat ?", options: ["Un hôpital", "Une école", "Un parc"], answer: "Un hôpital" },
        { question: "Où se sont-ils assis avant de rentrer ?", options: ["Dans un restaurant", "Dans un parc", "À la banque"], answer: "Dans un restaurant" },
        { question: "Quelle phrase est correcte ?", options: ["Le marché est près de l'église", "Près église marché le est", "Est près le marché église"], answer: "Le marché est près de l'église" },
      ],
    },
    {
      lessonId: 11,
      title: "Quiz 11",
      subtitle: "Les loisirs et les centres d'intérêt",
      passingScore: 7,
      questions: [
        { question: "Lequel est un loisir ?", options: ["Hôpital", "Dessiner", "Cuisine (le lieu)"], answer: "Dessiner" },
        { question: "Quelle phrase est correcte ?", options: ["J'aime jouer au football", "Jouer football j'aime au", "Football j'aime jouer au"], answer: "J'aime jouer au football" },
        { question: "À quoi servent souvent les loisirs ?", options: ["À relaxer", "À faire pousser la nourriture", "À changer le temps"], answer: "À relaxer" },
        { question: "Lequel est une activité de temps libre ?", options: ["Nager", "Commissariat", "Cahier"], answer: "Nager" },
        { question: "Quelle question porte sur les centres d'intérêt ?", options: ["Qu'est-ce que tu aimes faire ?", "Où est le marché ?", "Quel âge as-tu ?"], answer: "Qu'est-ce que tu aimes faire ?" },
        { question: "Qui James a-t-il visité samedi ?", options: ["Son cousin Daniel", "Son professeur", "Son oncle"], answer: "Son cousin Daniel" },
        { question: "Que faisait Daniel à l'arrivée de James ?", options: ["Il jouait au football", "Il lisait un livre", "Il cuisinait"], answer: "Il lisait un livre" },
        { question: "Où les garçons ont-ils joué au football ?", options: ["À l'école", "Dans le parc du quartier", "Au restaurant"], answer: "Dans le parc du quartier" },
        { question: "Que faisait la sœur de Daniel ?", options: ["Elle dessinait", "Elle nageait", "Elle regardait la télévision"], answer: "Elle dessinait" },
        { question: "Quel est le loisir préféré de Daniel ?", options: ["Lire des livres", "Écouter de la musique", "Jouer aux jeux vidéo"], answer: "Lire des livres" },
      ],
    },
    {
      lessonId: 12,
      title: "Quiz 12",
      subtitle: "Révision finale et conversation réelle",
      passingScore: 7,
      questions: [
        { question: "Comment salue-t-on poliment quelqu'un ?", options: ["Bonjour", "Banane", "Fenêtre"], answer: "Bonjour" },
        { question: "Quelle phrase se présente correctement ?", options: ["Je m'appelle Daniel", "Daniel mon nom", "Nom Daniel est moi"], answer: "Je m'appelle Daniel" },
        { question: "Lequel est un loisir ?", options: ["Lire des livres", "Hôpital", "Bouteille"], answer: "Lire des livres" },
        { question: "Où les gens achètent-ils des légumes ?", options: ["Aéroport", "Marché", "Bibliothèque"], answer: "Marché" },
        { question: "Lequel est une boisson ?", options: ["Riz", "Thé", "Poulet"], answer: "Thé" },
        { question: "Qui a voyagé avec Kevin ?", options: ["Sa famille", "Son professeur", "Ses camarades"], answer: "Sa famille" },
        { question: "Qu'a mangé Kevin avant de partir ?", options: ["Poisson et riz", "Pain et thé", "Poulet et jus"], answer: "Pain et thé" },
        { question: "Où Kevin est-il allé avec son cousin ?", options: ["Le marché", "L'hôpital", "La bibliothèque"], answer: "Le marché" },
        { question: "Qu'ont-ils fait l'après-midi ?", options: ["Joué au football et écouté de la musique", "Vont à l'école", "Regardé la télévision"], answer: "Joué au football et écouté de la musique" },
        { question: "Qu'a dit Kevin à la fin de la journée ?", options: ["Il a aimé passer du temps en famille", "Il était fâché toute la journée", "Il voulait partir tôt"], answer: "Il a aimé passer du temps en famille" },
      ],
    },
  ],

  finalQuiz: {
    title: "Quiz Final - Niveau 1",
    subtitle: "Ce quiz couvre toutes les leçons du Niveau 1.",
    passingScore: 15,
    questions: [
      { question: "Comment salue-t-on quelqu'un le matin ?", options: ["Bonjour", "Au revoir", "Poulet"], answer: "Bonjour" },
      { question: "Choisissez la bonne présentation.", options: ["Je m'appelle Alex", "Alex nom mon est", "Nom Alex moi"], answer: "Je m'appelle Alex" },
      { question: "Quelle lettre vient après G ?", options: ["H", "J", "F"], answer: "H" },
      { question: "Comment écrit-on le nombre 15 ?", options: ["Cinquante", "Quinze", "Cinq"], answer: "Quinze" },
      { question: "Qui est la fille de votre père ?", options: ["Votre sœur", "Votre professeur", "Votre oncle"], answer: "Votre sœur" },
      { question: "Lequel est un objet du quotidien ?", options: ["Bouteille", "Hôpital", "Professeur"], answer: "Bouteille" },
      { question: "Lequel est une couleur ?", options: ["Bleu", "Jeudi", "Cahier"], answer: "Bleu" },
      { question: "Quel mois vient après avril ?", options: ["Mai", "Janvier", "Juillet"], answer: "Mai" },
      { question: "Que fait-on généralement après s'être réveillé ?", options: ["Se brosser les dents", "Aller dormir", "Manger le dîner"], answer: "Se brosser les dents" },
      { question: "Lequel est une boisson ?", options: ["Thé", "Riz", "Poulet"], answer: "Thé" },
      { question: "Où garde-t-on son argent ?", options: ["École", "Banque", "Restaurant"], answer: "Banque" },
      { question: "Lequel est un loisir ?", options: ["Nager", "Hôpital", "Fenêtre"], answer: "Nager" },
      { question: "Choisissez la phrase correcte.", options: ["J'aime lire des livres", "Livres lire j'aime", "Aime livres je lire"], answer: "J'aime lire des livres" },
      { question: "Où va-t-on quand on est malade ?", options: ["Hôpital", "Bibliothèque", "Marché"], answer: "Hôpital" },
      { question: "Quel jour vient avant vendredi ?", options: ["Jeudi", "Dimanche", "Lundi"], answer: "Jeudi" },
      { question: "Lecture : Sarah mange du pain et boit du lait. Que boit Sarah ?", options: ["Thé", "Lait", "Café"], answer: "Lait" },
      { question: "Lecture : Kevin joue au football chaque samedi. Quel est le loisir de Kevin ?", options: ["Lecture", "Football", "Cuisine"], answer: "Football" },
      { question: "Choisissez la bonne réponse : Je ___ à l'école chaque jour.", options: ["vais", "va", "allant"], answer: "vais" },
      { question: "Si quelqu'un dit « Enchanté », que peut-on répondre ?", options: ["Enchanté aussi", "Cahier bleu", "Je dors"], answer: "Enchanté aussi" },
      {
        question: "Quel élève est prêt pour le Niveau 2 ?",
        options: [
          "Un élève qui comprend et utilise correctement le français de base",
          "Un élève qui répond au hasard",
          "Un élève qui saute chaque leçon",
        ],
        answer: "Un élève qui comprend et utilise correctement le français de base",
      },
    ],
  },
};
