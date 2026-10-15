import type { RawDialogue } from "./types";

// Conversations des quiz (français). Les répliques alternent A, B, A, B…
// Chaque question : [question, bonne réponse, fausse, fausse].
const data: Record<string, RawDialogue> = {
  // ---------------- Niveau 1 ----------------
  "1-1": {
    lines: [
      "Bonjour ! Je m'appelle Tom. Comment vous appelez-vous ?",
      "Bonjour, Tom. Je suis Anna. Enchantée.",
      "Enchanté aussi. Vous êtes étudiante ?",
      "Oui, je suis étudiante. J'habite à Kolwezi. Et vous ?",
      "Je suis professeur. J'habite à Lubumbashi.",
      "Très bien ! À demain, Anna.",
    ],
    q: [
      ["Comment s'appelle la femme ?", "Anna", "Tom", "Emma"],
      ["Quel est le métier d'Anna ?", "Elle est étudiante", "Elle est professeur", "Elle est médecin"],
      ["Où habite Tom ?", "À Lubumbashi", "À Kolwezi", "À Kinshasa"],
    ],
  },
  "1-2": {
    lines: [
      "Bonjour. Pouvez-vous épeler votre prénom, s'il vous plaît ?",
      "Oui. S, A, R, A, H. Sarah.",
      "Merci. Et votre nom de famille ?",
      "B, R, O, W, N. Brown.",
      "Parfait. Sarah Brown. Maintenant, quelle est votre adresse e-mail ?",
      "C'est sarah point brown arobase mail point com.",
    ],
    q: [
      ["Comment Sarah épelle-t-elle son prénom ?", "S-A-R-A-H", "S-A-R-R-A", "Z-A-R-A-H"],
      ["Quel est le nom de famille de Sarah ?", "Brown", "Black", "Green"],
      ["Que demande l'homme à la fin ?", "Son adresse e-mail", "Son numéro de téléphone", "Son âge"],
    ],
  },
  "1-3": {
    lines: [
      "Salut ! Quel âge as-tu ?",
      "J'ai quatorze ans. Et toi ?",
      "J'ai quinze ans. Quel est ton numéro de téléphone ?",
      "C'est le zéro huit un, deux trois quatre, cinq six sept.",
      "Merci. Je t'appellerai samedi.",
      "Parfait ! Appelle-moi le matin.",
    ],
    q: [
      ["Quel âge a la fille ?", "Quatorze ans", "Quinze ans", "Seize ans"],
      ["Quel âge a le garçon ?", "Quinze ans", "Quatorze ans", "Treize ans"],
      ["Quand le garçon appellera-t-il ?", "Samedi", "Lundi", "Dimanche"],
    ],
  },
  "1-4": {
    lines: [
      "Qui est l'homme sur cette photo ?",
      "C'est mon père. Il s'appelle David.",
      "Et la femme à côté de lui ?",
      "C'est ma mère. J'ai aussi deux sœurs et un frère.",
      "Quel âge a ton frère ?",
      "Il a dix ans. Mes sœurs ont douze et dix-sept ans.",
    ],
    q: [
      ["Qui est David ?", "Le père de la personne", "Le frère de la personne", "L'oncle de la personne"],
      ["Combien de sœurs la personne a-t-elle ?", "Deux", "Une", "Trois"],
      ["Quel âge a le frère ?", "Dix ans", "Douze ans", "Dix-sept ans"],
    ],
  },
  "1-5": {
    lines: [
      "Excusez-moi, où est mon sac ?",
      "Il est sur la table, à côté du téléphone.",
      "Merci. Et mes clés ?",
      "Tes clés sont dans la boîte bleue, sous la chaise.",
      "Ah oui, je les vois. Et mon cahier ?",
      "Il est sur le lit. Tu l'oublies toujours !",
    ],
    q: [
      ["Où est le sac ?", "Sur la table", "Sous la chaise", "Sur le lit"],
      ["Où sont les clés ?", "Dans la boîte bleue", "Sur la table", "Dans le sac"],
      ["Où est le cahier ?", "Sur le lit", "Sur la table", "Sous la chaise"],
    ],
  },
  "1-6": {
    lines: [
      "Bonjour ! Je voudrais acheter une veste.",
      "Bien sûr. Quelle couleur aimez-vous ?",
      "J'aime le vert. Mais pas un vert foncé, un vert clair.",
      "Nous avons cette veste vert clair. Elle est grande et très douce.",
      "Elle est jolie. L'avez-vous aussi en noir ?",
      "Oui. La noire est moins chère.",
    ],
    q: [
      ["Que veut acheter la cliente ?", "Une veste", "Un sac", "Des chaussures"],
      ["Quelle couleur préfère-t-elle d'abord ?", "Vert clair", "Vert foncé", "Rouge"],
      ["Quelle veste est moins chère ?", "La noire", "La verte", "La bleue"],
    ],
  },
  "1-7": {
    lines: [
      "C'est quand, ton anniversaire ?",
      "C'est le douze mars. Et le tien ?",
      "Le mien est le trois juillet.",
      "Quel jour tombe le douze mars cette année ?",
      "C'est un vendredi. On peut faire une fête !",
      "Bonne idée ! J'inviterai tous nos amis.",
    ],
    q: [
      ["Quand est l'anniversaire de la fille ?", "Le douze mars", "Le trois juillet", "Le douze mai"],
      ["Quand est l'anniversaire du garçon ?", "Le trois juillet", "Le douze mars", "Le trois juin"],
      ["Quel jour a lieu la fête ?", "Vendredi", "Samedi", "Dimanche"],
    ],
  },
  "1-8": {
    lines: [
      "À quelle heure te réveilles-tu chaque jour ?",
      "Je me réveille à six heures. Ensuite je me lave et je prends le petit-déjeuner.",
      "À quelle heure vas-tu à l'école ?",
      "Je pars de la maison à sept heures et le cours commence à huit heures.",
      "Et le soir ?",
      "Je fais mes devoirs, je dîne et je me couche à neuf heures.",
    ],
    q: [
      ["À quelle heure la personne se réveille-t-elle ?", "À six heures", "À sept heures", "À huit heures"],
      ["À quelle heure le cours commence-t-il ?", "À huit heures", "À sept heures", "À neuf heures"],
      ["Que fait-elle avant de se coucher ?", "Ses devoirs et le dîner", "Regarder la télévision", "Jouer au football"],
    ],
  },
  "1-9": {
    lines: [
      "Bonjour. Que désirez-vous manger ?",
      "Je voudrais du riz avec du poulet, s'il vous plaît.",
      "Et comme boisson ?",
      "Un verre d'eau. Et mon ami voudrait un jus d'orange.",
      "Un dessert ?",
      "Oui, une banane pour moi, s'il vous plaît. C'est tout.",
    ],
    q: [
      ["Que commande le client à manger ?", "Du riz avec du poulet", "Du poisson et du pain", "De la soupe"],
      ["Que boit l'ami ?", "Un jus d'orange", "De l'eau", "Du lait"],
      ["Quel est le dessert ?", "Une banane", "Un gâteau", "Une glace"],
    ],
  },
  "1-10": {
    lines: [
      "Excusez-moi, où est la banque, s'il vous plaît ?",
      "Allez tout droit, puis tournez à gauche au marché.",
      "Est-ce loin ?",
      "Non, c'est à cinq minutes à pied. Elle est à côté de la pharmacie.",
      "Et il y a un bureau de poste près d'ici ?",
      "Oui, la poste est en face de la banque.",
    ],
    q: [
      ["Que cherche l'homme en premier ?", "La banque", "Le marché", "L'école"],
      ["Où faut-il tourner à gauche ?", "Au marché", "À la pharmacie", "À la poste"],
      ["Où est la poste ?", "En face de la banque", "À côté du marché", "Derrière la pharmacie"],
    ],
  },
  "1-11": {
    lines: [
      "Qu'est-ce que tu aimes faire pendant ton temps libre ?",
      "J'adore jouer au football avec mes amis. Et toi ?",
      "Je préfère lire des livres et écouter de la musique.",
      "Aimes-tu nager ?",
      "Pas vraiment, mais j'aime danser le dimanche.",
      "Alors dansons ensemble dimanche prochain !",
    ],
    q: [
      ["Qu'adore la première personne ?", "Jouer au football", "Lire", "Nager"],
      ["Que préfère la deuxième personne ?", "Lire et la musique", "Le football", "La cuisine"],
      ["Que prévoient-ils dimanche ?", "Danser ensemble", "Jouer au football", "Aller nager"],
    ],
  },
  "1-12": {
    lines: [
      "Bonjour ! C'est ton premier jour à l'école ?",
      "Oui. Je m'appelle Pierre. J'ai douze ans.",
      "Bienvenue, Pierre ! Moi, c'est Grâce. Où habites-tu ?",
      "J'habite près du marché, dans une maison verte.",
      "Mon cours commence à huit heures. Tu aimes le français ?",
      "Oui, c'est ma matière préférée. Asseyons-nous ensemble !",
    ],
    q: [
      ["Quel est le premier jour de qui ?", "De Pierre", "De Grâce", "Du professeur"],
      ["Où habite Pierre ?", "Près du marché", "Près de la banque", "Près de l'école"],
      ["Quelle est la matière préférée de Pierre ?", "Le français", "Les maths", "La musique"],
    ],
  },
  "1-final": {
    lines: [
      "Salut, je suis Julie. Je suis nouvelle dans ce quartier.",
      "Bienvenue, Julie ! Je suis Marc. D'où viens-tu ?",
      "Je viens de Lubumbashi. J'ai seize ans. Et toi ?",
      "J'ai dix-sept ans. J'habite avec ma mère, mon père et mes deux frères.",
      "As-tu des loisirs ? Moi, j'adore le basket le samedi.",
      "J'aime dessiner et cuisiner. Demain, je veux cuisiner du riz et du poisson.",
      "Ça a l'air super ! Puis-je avoir ton numéro de téléphone ?",
      "Bien sûr. C'est le zéro neuf neuf, un un un, deux deux deux.",
    ],
    q: [
      ["D'où vient Julie ?", "De Lubumbashi", "De Kolwezi", "De Kinshasa"],
      ["Quel âge a Marc ?", "Dix-sept ans", "Seize ans", "Quinze ans"],
      ["Qu'adore Marc le samedi ?", "Le basket", "La cuisine", "Le dessin"],
      ["Que veut cuisiner Julie demain ?", "Du riz et du poisson", "Du poulet et du pain", "De la soupe"],
    ],
  },

  // ---------------- Niveau 2 ----------------
  "2-1": {
    lines: [
      "As-tu fini le rapport que je t'ai demandé ?",
      "Pas encore. J'y travaille depuis ce matin.",
      "Si tu me l'avais dit plus tôt, je t'aurais aidée.",
      "Je sais, mais je pensais pouvoir le finir seule.",
      "Eh bien, envoie-le-moi quand il sera prêt, je vérifierai la grammaire.",
      "Merci. Je te l'envoie avant le déjeuner.",
    ],
    q: [
      ["La femme a-t-elle fini le rapport ?", "Non, pas encore", "Oui, elle l'a fini", "Elle n'a pas commencé"],
      ["Qu'aurait fait l'homme plus tôt ?", "L'aider", "Le rédiger lui-même", "L'annuler"],
      ["Que vérifiera l'homme ?", "La grammaire", "Les chiffres", "Les images"],
    ],
  },
  "2-2": {
    lines: [
      "Qu'as-tu fait le week-end dernier ?",
      "J'ai rendu visite à mes grands-parents. Nous avons cuisiné ensemble et regardé de vieux films.",
      "Ça a l'air charmant. Moi, je suis resté à la maison et j'ai fini un livre.",
      "Que vas-tu faire le week-end prochain ?",
      "Je vais voyager à Likasi pour voir un match de football.",
      "Alors je viendrai probablement avec toi, s'il y a un billet pour moi.",
    ],
    q: [
      ["Qu'a fait la première personne le week-end dernier ?", "Rendu visite à ses grands-parents", "Fini un livre", "Assisté à un match"],
      ["Qu'a fait la deuxième personne ?", "Elle est restée lire à la maison", "Elle a voyagé", "Elle a cuisiné pour des amis"],
      ["Où aura lieu le match ?", "À Likasi", "À Kolwezi", "À Kinshasa"],
    ],
  },
  "2-3": {
    lines: [
      "Bonjour, je crois que nous ne nous sommes pas encore rencontrés. Je suis Daniel.",
      "Enchantée, Daniel. Je suis Rose. Comment connaissez-vous l'hôtesse ?",
      "Nous avons étudié ensemble à l'université. Et vous ?",
      "Je travaille avec elle à la clinique. Que faites-vous ?",
      "Je suis ingénieur. Je conçois des réseaux d'eau pour les villages.",
      "C'est vraiment intéressant. Parlez-m'en davantage !",
    ],
    q: [
      ["Comment Daniel connaît-il l'hôtesse ?", "Ils ont étudié ensemble", "Ils sont voisins", "Ils travaillent ensemble"],
      ["Où travaille Rose ?", "À la clinique", "À l'école", "À la banque"],
      ["Que fait Daniel ?", "Il conçoit des réseaux d'eau", "Il construit des maisons", "Il enseigne le français"],
    ],
  },
  "2-4": {
    lines: [
      "Pourrais-tu relire ce mail avant que je l'envoie au directeur ?",
      "Bien sûr. La première phrase est un peu longue. Essaie de la raccourcir.",
      "Dois-je commencer par « Monsieur » ou par son nom ?",
      "Utilise son nom, monsieur Lewis. Et termine par « Cordialement ».",
      "Et l'objet du message ?",
      "Sois clair : « Demande de rendez-vous jeudi ».",
    ],
    q: [
      ["À quoi sert le mail ?", "Demander un rendez-vous", "Se plaindre d'un prix", "Dire merci"],
      ["Comment le mail doit-il commencer ?", "Par le nom du directeur", "Par « Salut mon ami »", "Sans formule d'appel"],
      ["Quel jour a lieu le rendez-vous ?", "Jeudi", "Mardi", "Vendredi"],
    ],
  },
  "2-5": {
    lines: [
      "Votre attention, s'il vous plaît. Le train pour Lubumbashi a quarante minutes de retard.",
      "Tu as entendu ? Notre train partira à trois heures dix.",
      "Alors nous avons le temps de prendre un café. Quel quai ?",
      "L'annonce a dit quai numéro quatre.",
      "Attendons au café, alors. J'ai faim de toute façon.",
      "Bonne idée. Nous irons sur le quai à trois heures.",
    ],
    q: [
      ["Quel est le retard du train ?", "Quarante minutes", "Dix minutes", "Une heure"],
      ["De quel quai part le train ?", "Quai quatre", "Quai deux", "Quai cinq"],
      ["Que décident-ils de faire ?", "Attendre au café", "Prendre un taxi", "Rentrer chez eux"],
    ],
  },
  "2-6": {
    lines: [
      "As-tu lu l'article sur la nouvelle bibliothèque de la ville ?",
      "Oui. Il dit qu'elle ouvrira en septembre et aura internet gratuit.",
      "J'aime que les étudiants puissent aussi y emprunter des tablettes.",
      "L'auteur dit aussi qu'elle restera ouverte jusqu'à dix heures chaque soir.",
      "Je crois que j'y étudierai. C'est plus calme que chez moi.",
      "Moi aussi. J'espère qu'il y aura assez de places assises !",
    ],
    q: [
      ["Quand la bibliothèque ouvrira-t-elle ?", "En septembre", "En janvier", "En juin"],
      ["Que peuvent emprunter les étudiants ?", "Des tablettes", "Des ordinateurs portables", "Des téléphones"],
      ["Jusqu'à quelle heure restera-t-elle ouverte ?", "Dix heures du soir", "Six heures du soir", "Minuit"],
    ],
  },
  "2-7": {
    lines: [
      "Qu'as-tu pensé du film hier soir ?",
      "Franchement, j'ai été déçu. L'histoire était prévisible.",
      "Vraiment ? Moi, je l'ai trouvé passionnant, et la musique était magnifique.",
      "À mon avis, les acteurs n'étaient pas convaincants.",
      "Je ne suis pas d'accord. L'actrice principale était fantastique, et la fin m'a surpris.",
      "Eh bien, nous n'avons pas les mêmes goûts. La prochaine fois, c'est toi qui choisis le film.",
    ],
    q: [
      ["Qu'a pensé la première personne du film ?", "Elle a été déçue", "Elle a été ravie", "Elle s'est ennuyée à cause de la musique"],
      ["Qu'a le plus aimé la deuxième personne ?", "La musique et l'actrice", "Le prix", "Le cinéma"],
      ["Sur quoi s'accordent-ils à la fin ?", "L'autre choisira la prochaine fois", "Revoir le film", "Lire le livre"],
    ],
  },
  "2-8": {
    lines: [
      "Écoute bien. Dans « je suis allé », on prononce le « s » de « suis » comme un « z ».",
      "Je suis... allé. C'est bon ?",
      "Pas tout à fait. Ne fais pas de pause : « je suiz-allé », tout est lié.",
      "Je suiz-allé. Je sens la différence.",
      "Bien. Maintenant répète la phrase : « Nous avons un ami à Kolwezi ».",
      "Nous avons un ami à Kolwezi. C'était correct ?",
    ],
    q: [
      ["Quelle liaison le professeur corrige-t-il ?", "Entre « suis » et « allé »", "Entre « ami » et « Kolwezi »", "Entre « un » et « ami »"],
      ["Comment prononcer le « s » de « suis » devant « allé » ?", "Comme un « z »", "Comme un « k »", "On ne le prononce pas"],
      ["Que doit répéter l'élève ?", "Une phrase entière", "L'alphabet", "Un nombre"],
    ],
  },
  "2-9": {
    lines: [
      "Excusez-moi, cette soupe est froide. Je l'avais commandée chaude.",
      "Je suis vraiment désolé, madame. Je vous en apporte une nouvelle tout de suite.",
      "Merci. Et pourrions-nous avoir l'addition, s'il vous plaît ?",
      "Bien sûr. Souhaitez-vous payer par carte ou en espèces ?",
      "Par carte. Le service est-il compris ?",
      "Oui, il est compris. Merci pour votre patience.",
    ],
    q: [
      ["Quel est le problème ?", "La soupe est froide", "Le plat est trop salé", "La table est sale"],
      ["Que fera le serveur ?", "Apporter une nouvelle soupe", "Faire une réduction", "Appeler le directeur"],
      ["Comment la cliente paiera-t-elle ?", "Par carte", "En espèces", "Par téléphone"],
    ],
  },
  "2-10": {
    lines: [
      "Bonjour, monsieur Okafor. Merci d'être venu dans nos bureaux.",
      "Merci de me recevoir. Je voudrais vous présenter le nouveau produit de notre entreprise.",
      "Commencez, je vous prie. Nous avons trente minutes avant la prochaine réunion.",
      "C'est une lampe solaire. Elle dure dix heures et coûte très peu.",
      "Dans combien de temps pouvez-vous livrer deux cents lampes ?",
      "En trois semaines. Je vous enverrai une offre écrite demain.",
    ],
    q: [
      ["Quel est le produit ?", "Une lampe solaire", "Un téléphone", "Une pompe à eau"],
      ["Combien de lampes le client veut-il ?", "Deux cents", "Cent", "Douze"],
      ["Quand monsieur Okafor enverra-t-il l'offre ?", "Demain", "Le mois prochain", "Aujourd'hui"],
    ],
  },
  "2-11": {
    lines: [
      "Je crois que travailler à la maison est mieux. On gagne du temps et de l'argent.",
      "Je comprends, mais je ne suis pas d'accord. À la maison, il est difficile de se concentrer.",
      "Cela dépend des personnes. Je suis plus efficace sans bruit.",
      "Mais les équipes communiquent mieux quand elles se voient tous les jours.",
      "On pourrait combiner les deux : trois jours au bureau, deux jours à la maison.",
      "C'est un compromis équitable. Je peux l'accepter.",
    ],
    q: [
      ["Que préfère la première personne ?", "Travailler à la maison", "Travailler au bureau", "Ne pas travailler"],
      ["Pourquoi la deuxième n'est-elle pas d'accord ?", "Il est difficile de se concentrer à la maison", "Cela coûte trop cher", "Il n'y a pas d'internet"],
      ["Quel compromis trouvent-ils ?", "Trois jours au bureau, deux à la maison", "Cinq jours à la maison", "Cinq jours au bureau"],
    ],
  },
  "2-12": {
    lines: [
      "Demain, j'ai un entretien d'embauche. Peux-tu m'aider à m'entraîner ?",
      "Bien sûr. Première question : pourquoi voulez-vous travailler pour cette entreprise ?",
      "Parce qu'elle aide les jeunes à apprendre des compétences, et j'aime enseigner.",
      "Bien. Maintenant, quel est votre plus grand point fort ?",
      "Je suis patient, et je travaille bien en équipe.",
      "Excellent. Reste calme, souris et parle lentement demain.",
    ],
    q: [
      ["À quoi se prépare l'homme ?", "À un entretien d'embauche", "À un examen", "À un voyage"],
      ["Pourquoi veut-il travailler pour l'entreprise ?", "Elle aide les jeunes à apprendre", "Elle paie le mieux", "Elle est près de chez lui"],
      ["Quel conseil donne l'ami à la fin ?", "Rester calme et parler lentement", "Arriver en retard", "Parler très vite"],
    ],
  },
  "2-final": {
    lines: [
      "Es-tu libre ce week-end ? Je voudrais organiser une excursion.",
      "Oui, je suis libre samedi. Où veux-tu aller ?",
      "Je pensais au lac. Nous pourrions partir tôt le matin.",
      "C'est loin ? La dernière fois, j'ai voyagé trois heures et j'étais épuisé.",
      "Ce n'est qu'à quatre-vingt-dix minutes en bus. On peut prendre des sandwichs et du jus.",
      "À mon avis, nous devrions aussi prendre un chapeau. Il faisait très chaud l'an dernier.",
      "Bonne remarque. On invite Maria et Jean ?",
      "Oui, mais demandons-leur ce soir. Le bus part à sept heures.",
    ],
    q: [
      ["Où veulent-ils aller ?", "Au lac", "À la montagne", "Au marché"],
      ["Combien de temps dure le trajet en bus ?", "Quatre-vingt-dix minutes", "Trois heures", "Trente minutes"],
      ["Que doivent-ils apporter en plus de la nourriture ?", "Un chapeau", "Un parapluie", "Un appareil photo"],
      ["À quelle heure part le bus ?", "Sept heures", "Six heures", "Huit heures"],
    ],
  },

  // ---------------- Niveau 3 ----------------
  "3-1": {
    lines: [
      "Si nous signons le contrat aujourd'hui, quand pourriez-vous commencer la livraison ?",
      "Si vous confirmez la commande avant midi, nous pourrions commencer lundi.",
      "Et si l'expédition était retardée, offririez-vous une compensation ?",
      "Oui. Si elle était retardée de plus d'une semaine, nous accorderions cinq pour cent de remise.",
      "C'est acceptable. À moins d'autres conditions, nous signerons.",
      "J'enverrai la version finale cet après-midi.",
    ],
    q: [
      ["Quand la livraison pourrait-elle commencer si la commande est confirmée avant midi ?", "Lundi", "Vendredi", "Le mois prochain"],
      ["Que propose-t-on pour un retard de plus d'une semaine ?", "Cinq pour cent de remise", "Un remboursement complet", "Un produit gratuit"],
      ["Quand la version finale sera-t-elle envoyée ?", "Cet après-midi", "Demain matin", "La semaine prochaine"],
    ],
  },
  "3-2": {
    lines: [
      "Vous devez remettre le formulaire de conformité avant la fin du mois.",
      "Dois-je aussi joindre les états financiers ?",
      "Oui, vous devriez les inclure. Il n'est pas nécessaire d'envoyer les anciennes factures.",
      "Puis-je l'envoyer par voie électronique, ou doit-il être signé sur papier ?",
      "Vous pouvez l'envoyer par voie électronique, mais le directeur doit d'abord le signer.",
      "Compris. Je devrais pouvoir terminer d'ici jeudi.",
    ],
    q: [
      ["Pour quand est le formulaire ?", "La fin du mois", "La semaine prochaine", "Demain"],
      ["Qu'est-ce qui n'est pas nécessaire ?", "Les anciennes factures", "Les états financiers", "Une signature"],
      ["Qui doit signer le formulaire ?", "Le directeur", "Le comptable", "Le client"],
    ],
  },
  "3-3": {
    lines: [
      "Notre prix est de trente mille dollars pour l'ensemble.",
      "C'est plus que notre budget. Nous pourrions proposer vingt-quatre mille.",
      "Je ne peux pas descendre autant, mais je peux inclure une formation gratuite pour votre personnel.",
      "C'est intéressant. Et si nous payons la moitié maintenant et la moitié dans soixante jours ?",
      "Je peux accepter, avec deux pour cent de frais sur le second paiement.",
      "Alors nous avons un accord à vingt-huit mille. Mettons-le par écrit.",
    ],
    q: [
      ["Quel était le premier prix ?", "Trente mille dollars", "Vingt-quatre mille", "Vingt-huit mille"],
      ["Quel extra offre le vendeur ?", "Une formation gratuite", "La livraison gratuite", "Un deuxième produit"],
      ["Quel est le prix final ?", "Vingt-huit mille dollars", "Trente mille dollars", "Vingt-quatre mille dollars"],
    ],
  },
  "3-4": {
    lines: [
      "Répétons votre présentation. Vous avez dix minutes. Commencez quand vous êtes prêt.",
      "Bonjour à tous. Aujourd'hui, je vais vous présenter nos résultats de ventes de l'année.",
      "Un bon début. N'oubliez pas de faire une pause après chaque chiffre clé.",
      "Dois-je utiliser d'abord le graphique de la deuxième diapositive ?",
      "Oui, puis passez au tableau. Gardez vos diapositives simples et regardez le public.",
      "Compris. Je préparerai aussi des réponses aux questions sur les coûts.",
    ],
    q: [
      ["Quelle est la durée de la présentation ?", "Dix minutes", "Trente minutes", "Une heure"],
      ["Quel est le sujet ?", "Les résultats de ventes de l'année", "Un nouvel employé", "Le déménagement du bureau"],
      ["Que conseille le formateur ?", "Garder les diapositives simples et regarder le public", "Lire chaque mot", "Éviter les graphiques"],
    ],
  },
  "3-5": {
    lines: [
      "Merci à tous d'être venus. Le premier point de l'ordre du jour est le budget.",
      "Je propose d'augmenter le budget de formation de dix pour cent.",
      "Qui est pour ? Levez la main, s'il vous plaît.",
      "Sept pour, un contre. La proposition est adoptée.",
      "Je rédigerai le compte rendu et le diffuserai demain matin.",
      "Ajoutez aussi la date de la prochaine réunion : le quinze à neuf heures.",
    ],
    q: [
      ["Quel est le premier point de l'ordre du jour ?", "Le budget", "Le recrutement", "Le nouveau bureau"],
      ["Quel est le résultat du vote ?", "Sept pour, un contre", "Cinq pour, trois contre", "Tous contre"],
      ["Quand est la prochaine réunion ?", "Le quinze à neuf heures", "Le cinq à neuf heures", "Le quinze à dix heures"],
    ],
  },
  "3-6": {
    lines: [
      "Je rédige le rapport trimestriel. Comment dois-je le structurer ?",
      "Commence par un résumé de synthèse d'une demi-page, avec les principaux résultats.",
      "Puis l'analyse, avec des tableaux, et enfin tes recommandations.",
      "La proposition pour le nouvel entrepôt doit-elle être dans le rapport ?",
      "Non, fais-en un document séparé. Inclus les coûts, un calendrier et les risques.",
      "Très bien. Je vous enverrai les deux documents d'ici vendredi.",
    ],
    q: [
      ["Comment le rapport doit-il commencer ?", "Par un résumé de synthèse", "Par les recommandations", "Par les tableaux"],
      ["Qu'est-ce qui doit être un document séparé ?", "La proposition d'entrepôt", "Le résumé", "Les tableaux"],
      ["Quand les documents seront-ils envoyés ?", "D'ici vendredi", "D'ici lundi", "Aujourd'hui"],
    ],
  },
  "3-7": {
    lines: [
      "Allô, m'entendez-vous ? Votre écran est figé de mon côté.",
      "Je vous entends, mais l'image est lente. Je coupe ma caméra.",
      "C'est mieux. Pouvez-vous partager votre présentation maintenant ?",
      "Oui, je partage. Voyez-vous la première diapositive ?",
      "Oui, très clairement. Coupez votre micro pendant que je pose une question, s'il vous plaît.",
      "Désolé, j'étais en train d'écrire. Je vous écoute.",
    ],
    q: [
      ["Quel est le problème au début ?", "L'image est figée ou lente", "Personne n'entend", "L'appel est annulé"],
      ["Qu'est-ce que la personne coupe ?", "La caméra", "Le micro", "L'écran"],
      ["Pourquoi lui demande-t-on de couper le micro ?", "Une question va être posée", "Il y a de l'écho", "La réunion est terminée"],
    ],
  },
  "3-8": {
    lines: [
      "Bonjour, je suis Amina, d'une entreprise de logistique. C'est votre première conférence ?",
      "Non, c'est la troisième. Je suis Pierre, je travaille dans les énergies renouvelables.",
      "Intéressant. Nous transportons souvent des panneaux solaires. Nous pourrions travailler ensemble.",
      "Avec plaisir. Avez-vous une carte de visite ?",
      "Bien sûr. Prenons un café demain pour en discuter en détail.",
      "Parfait. Je vous écrirai ce soir pour confirmer l'heure.",
    ],
    q: [
      ["Que fait l'entreprise d'Amina ?", "De la logistique", "De la banque", "De l'éducation"],
      ["Quelle conférence est-ce pour Pierre ?", "La troisième", "La première", "La deuxième"],
      ["Que fera Amina ce soir ?", "Écrire un e-mail à Pierre", "Appeler Pierre", "Rédiger un rapport"],
    ],
  },
  "3-9": {
    lines: [
      "L'expédition a cinq jours de retard et le client est très mécontent.",
      "Quelle est la cause du retard ?",
      "Un problème à la douane. Les documents étaient incomplets.",
      "Il nous faut deux solutions : d'abord corriger les documents aujourd'hui ; ensuite envoyer une petite partie par avion.",
      "Le fret aérien coûte cher. Combien cela coûterait-il ?",
      "Environ deux mille dollars. Je pense que cela vaut la peine pour garder le client.",
    ],
    q: [
      ["Quel est le retard de l'expédition ?", "Cinq jours", "Deux jours", "Un mois"],
      ["Quelle est la cause du retard ?", "Des documents incomplets à la douane", "Une grève", "Le mauvais temps"],
      ["Combien coûterait le fret aérien ?", "Environ deux mille dollars", "Environ cinq cents dollars", "Environ vingt mille dollars"],
    ],
  },
  "3-10": {
    lines: [
      "Mon partenaire m'a invité à dîner, mais je ne sais pas comment me comporter.",
      "Dans leur culture, il est poli d'arriver un peu en retard, jamais exactement à l'heure.",
      "Et dois-je apporter un cadeau ?",
      "Un petit cadeau est apprécié, comme des fruits ou des friandises. Évitez d'offrir quelque chose de cher.",
      "Est-il impoli de refuser un plat ?",
      "Oui, il vaut mieux goûter un peu de tout et dire merci.",
    ],
    q: [
      ["Quand l'invité doit-il arriver ?", "Un peu en retard", "Très en avance", "Exactement à l'heure"],
      ["Quel cadeau est apprécié ?", "Des fruits ou des friandises", "De l'argent", "Une montre chère"],
      ["Quel est le conseil sur la nourriture ?", "Goûter un peu de tout", "Refuser poliment", "Manger avant d'y aller"],
    ],
  },
  "3-11": {
    lines: [
      "Deux membres de mon équipe sont en conflit et cela affecte tout le groupe.",
      "D'abord, parle à chacun séparément et écoute sans juger.",
      "Puis réunis-les et concentre-toi sur les solutions, pas sur les reproches.",
      "Et s'ils n'arrivent pas à s'entendre ?",
      "Fixe des objectifs clairs, répartis les responsabilités et fais le point chaque semaine.",
      "Merci. Je planifierai la réunion pour mercredi.",
    ],
    q: [
      ["Quel est le problème ?", "Deux membres de l'équipe sont en conflit", "Les ventes baissent", "Un directeur a démissionné"],
      ["Que doit faire le responsable en premier ?", "Parler à chacun séparément", "Renvoyer l'un des deux", "Ignorer le problème"],
      ["Quand aura lieu la réunion ?", "Mercredi", "Lundi", "Vendredi"],
    ],
  },
  "3-12": {
    lines: [
      "Merci de nous recevoir. Nous aimerions renouveler notre contrat pour deux ans de plus.",
      "Nous en sommes ravis. Puis-je suggérer quelques modifications des conditions ?",
      "Certainement. Nos priorités sont une livraison plus rapide et un rapport mensuel.",
      "Nous pouvons garantir la livraison en dix jours, et je vous enverrai un rapport chaque mois.",
      "En échange, nous accepterions une légère hausse du prix.",
      "C'est équitable. Finalisons les détails et signons la semaine prochaine.",
    ],
    q: [
      ["Que veut faire le client ?", "Renouveler le contrat pour deux ans", "Annuler le contrat", "Acheter un nouveau produit"],
      ["Quel est le délai de livraison garanti ?", "Dix jours", "Deux jours", "Un mois"],
      ["Qu'accepte le client en échange ?", "Une légère hausse de prix", "Un retard plus long", "Moins de service"],
    ],
  },
  "3-final": {
    lines: [
      "Bonjour. Passons en revue les résultats du dernier trimestre.",
      "Les ventes ont augmenté de douze pour cent, principalement grâce aux nouveaux clients du nord.",
      "Si nous gardons ce rythme, pourrions-nous atteindre notre objectif annuel ?",
      "Oui, à condition d'embaucher deux personnes de plus au service client.",
      "Quels sont les principaux risques pour le trimestre prochain ?",
      "La hausse des coûts de transport et un possible retard de notre principal fournisseur.",
      "Alors je propose de contacter un second fournisseur et de préparer un plan de secours.",
      "D'accord. Je présenterai le plan au conseil le vingt.",
    ],
    q: [
      ["De combien les ventes ont-elles augmenté ?", "Douze pour cent", "Deux pour cent", "Vingt pour cent"],
      ["Que faut-il pour atteindre l'objectif annuel ?", "Deux personnes de plus au service client", "Un nouveau bureau", "Un prix plus bas"],
      ["Quel risque est mentionné ?", "La hausse des coûts de transport", "Un nouveau concurrent", "Une grève"],
      ["Quand le plan sera-t-il présenté au conseil ?", "Le vingt", "Le dix", "L'année prochaine"],
    ],
  },
};

export default data;
