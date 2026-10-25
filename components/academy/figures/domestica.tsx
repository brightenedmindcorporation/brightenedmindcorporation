import { BLUE, GREEN, LINE, MINT, ORANGE, PAPER, PEACH, RED, ROSE, Rect, SKY, SOFT, SUNK, Txt, YELLOW, Line, Box, Flow, Note, Pill, type Fig } from "../figureKit";

// Diagrams of the BM Domestica training, keyed "dm-<level>-<lesson>".

const Card = ({ x, y, w, h, title, lines, fill = SUNK, stroke = LINE }: { x: number; y: number; w: number; h: number; title: string; lines: string[]; fill?: string; stroke?: string }) => (
  <g>
    <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={stroke} sw={2} r={10} />
    <Txt x={x + 14} y={y + 24} bold s={13}>{title}</Txt>
    {lines.map((t, i) => (
      <Txt key={t} x={x + 14} y={y + 48 + i * 20} s={11.5} fill={SOFT}>{t}</Txt>
    ))}
  </g>
);

export const DOMESTICA_FIGS: Record<string, Fig> = {
  "dm-1-1": {
    caption: "Un métier de confiance : quatre qualités et une bonne méthode.",
    body: (
      <>
        {[
          ["Ponctualité", "arriver à l'heure", "⏰", BLUE, SKY],
          ["Honnêteté", "dire la vérité", "🤝", GREEN, MINT],
          ["Discrétion", "ne rien répéter", "🤐", ORANGE, PEACH],
          ["Respect", "politesse, soin", "🙂", RED, ROSE],
        ].map(([t, s, i, c, f], k) => (
          <g key={t as string}>
            <Rect x={20 + k * 152} y={16} w={142} h={130} fill={f as string} stroke={c as string} sw={2} r={14} />
            <Txt x={91 + k * 152} y={66} anchor="middle" s={32}>{i as string}</Txt>
            <Txt x={91 + k * 152} y={100} anchor="middle" bold s={14}>{t as string}</Txt>
            <Txt x={91 + k * 152} y={122} anchor="middle" s={11} fill={SOFT}>{s as string}</Txt>
          </g>
        ))}
        <Flow y={166} items={[["Demander les consignes"], ["Faire une liste"], ["Poser des questions"], ["Signaler un problème"]]} h={46} fill={YELLOW} stroke={ORANGE} />
        <Note x={20} y={252}>Tenue propre, mains propres, téléphone silencieux : le premier jour donne la confiance.</Note>
      </>
    ),
  },
  "dm-1-2": {
    caption: "Se laver les mains et ne jamais mélanger les produits.",
    body: (
      <>
        <Rect x={20} y={14} w={290} h={150} fill={SKY} stroke={BLUE} sw={2} r={10} />
        <Txt x={34} y={38} bold s={13}>Lavage des mains : 20 secondes</Txt>
        {["Mouiller + savon", "Paumes et dos des mains", "Doigts, ongles, poignets", "Rincer et sécher"].map((t, i) => (
          <g key={t}>
            <circle cx={44} cy={66 + i * 24} r={9} fill={BLUE} />
            <Txt x={44} y={70 + i * 24} anchor="middle" s={10} bold fill="#fff">{i + 1}</Txt>
            <Txt x={62} y={70 + i * 24} s={12}>{t}</Txt>
          </g>
        ))}
        <Rect x={330} y={14} w={290} h={150} fill={ROSE} stroke={RED} sw={2} r={10} />
        <Txt x={344} y={38} bold s={13} fill={RED}>Ne mélangez JAMAIS</Txt>
        <Txt x={344} y={70} s={30}>🧴 + 🧴</Txt>
        <Txt x={344} y={100} s={12}>Eau de Javel + vinaigre / ammoniaque /</Txt>
        <Txt x={344} y={118} s={12}>détartrant = gaz dangereux</Txt>
        <Note x={344} y={146}>Un seul produit à la fois, bien rincer.</Note>
        <Card x={20} y={184} w={290} h={84} title="Après les produits" lines={["Bouteille d'origine, bien fermée", "Hors de portée des enfants"]} />
        <Card x={330} y={184} w={290} h={84} title="Nettoyer puis désinfecter" lines={["Nettoyer = enlever la saleté", "Désinfecter = détruire les microbes"]} />
      </>
    ),
  },
  "dm-1-3": {
    caption: "Nettoyer avec méthode : du haut vers le bas.",
    body: (
      <>
        <Rect x={30} y={20} w={200} h={160} fill={PAPER} stroke={SOFT} sw={2} r={4} />
        {[["1", "Aérer, ranger", 44], ["2", "Dépoussiérer (haut)", 76], ["3", "Balayer / aspirer", 108], ["4", "Laver le sol (bas)", 140]].map(([n, t, y]) => (
          <g key={n as string}>
            <circle cx={50} cy={(y as number)} r={11} fill={ORANGE} />
            <Txt x={50} y={(y as number) + 4} anchor="middle" bold s={12} fill="#fff">{n as string}</Txt>
            <Txt x={70} y={(y as number) + 4} s={12}>{t as string}</Txt>
          </g>
        ))}
        <Txt x={30} y={204} s={12} fill={SOFT}>Du plus propre vers le plus sale.</Txt>
        <Card x={260} y={20} w={170} h={110} title="Chaque jour" lines={["Lits, vaisselle", "Sols, poubelles"]} fill={MINT} stroke={GREEN} />
        <Card x={450} y={20} w={170} h={110} title="Chaque semaine" lines={["Vitres, placards", "Salle de bain"]} fill={SKY} stroke={BLUE} />
        <Card x={260} y={146} w={360} h={74} title="Sécurité" lines={["Sol mouillé : le sécher ou signaler · escabeau solide"]} fill={ROSE} stroke={RED} />
        <Note x={30} y={250}>Planning écrit · matériel propre · signaler ce qui est cassé ou dangereux.</Note>
      </>
    ),
  },
  "dm-1-4": {
    caption: "Le linge : trier, laver, sécher, repasser, ranger.",
    body: (
      <>
        <Flow y={18} items={[["Trier", "couleurs"], ["Laver", "étiquette"], ["Sécher", "ombre / soleil"], ["Repasser", "bonne chaleur"], ["Ranger", "bien sec"]]} h={64} />
        <Rect x={20} y={106} w={290} h={150} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={130} bold s={13}>Trier en groupes</Txt>
        {[["Blanc", "#fff"], ["Clair", SKY], ["Foncé", BLUE], ["Délicat", ROSE]].map(([t, c], i) => (
          <g key={t as string}>
            <rect x={34 + i * 68} y={146} width={56} height={44} rx={8} fill={c as string} stroke={SOFT} />
            <Txt x={62 + i * 68} y={205} anchor="middle" s={11}>{t as string}</Txt>
          </g>
        ))}
        <Note x={34} y={236}>Vérifier les poches · traiter les taches</Note>
        <Rect x={330} y={106} w={290} h={150} fill={YELLOW} stroke={ORANGE} sw={2} r={8} />
        <Txt x={344} y={130} bold s={13}>Le fer à repasser</Txt>
        <Note x={344} y={156}>Température adaptée au tissu</Note>
        <Note x={344} y={178}>Jamais sans surveillance</Note>
        <Note x={344} y={200}>Sur son support, cordon à l'écart</Note>
        <Note x={344} y={222}>Débrancher et laisser refroidir</Note>
      </>
    ),
  },
  "dm-1-5": {
    caption: "Hygiène en cuisine : séparer, cuire, conserver.",
    body: (
      <>
        <Card x={20} y={14} w={200} h={120} title="Séparer" lines={["Planche viande crue", "Planche légumes", "Mains lavées"]} fill={SKY} stroke={BLUE} />
        <Card x={240} y={14} w={180} h={120} title="Bien cuire" lines={["Volaille cuite à cœur", "Pas de partie rosée", "Œufs cuits"]} fill={PEACH} stroke={ORANGE} />
        <Card x={440} y={14} w={180} h={120} title="Conserver" lines={["Restes au froid vite", "Max 2 h dehors", "Réchauffer à cœur"]} fill={MINT} stroke={GREEN} />
        <Rect x={20} y={152} w={290} h={106} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={176} bold s={13}>Dans le réfrigérateur</Txt>
        <Note x={34} y={198}>Viande crue en bas, bien fermée</Note>
        <Note x={34} y={218}>Premier entré, premier sorti</Note>
        <Note x={34} y={238}>Jeter ce qui sent mauvais</Note>
        <Rect x={330} y={152} w={290} h={106} fill={ROSE} stroke={RED} sw={2} r={8} />
        <Txt x={344} y={176} bold s={13} fill={RED}>Sécurité</Txt>
        <Note x={344} y={198}>Manches de casseroles vers l'intérieur</Note>
        <Note x={344} y={218}>Huile en feu : couvercle, jamais d'eau</Note>
        <Note x={344} y={238}>Demander les allergies</Note>
      </>
    ),
  },
  "dm-1-6": {
    caption: "Un repas équilibré et des courses organisées.",
    body: (
      <>
        <circle cx={120} cy={110} r={84} fill={PAPER} stroke={SOFT} strokeWidth={3} />
        <path d="M120 110 L120 26 A84 84 0 0 1 192 152 Z" fill={YELLOW} stroke={SOFT} />
        <path d="M120 110 L192 152 A84 84 0 0 1 48 152 Z" fill={MINT} stroke={SOFT} />
        <path d="M120 110 L48 152 A84 84 0 0 1 120 26 Z" fill={PEACH} stroke={SOFT} />
        <Txt x={160} y={78} anchor="middle" bold s={11}>Féculents</Txt>
        <Txt x={120} y={170} anchor="middle" bold s={11}>Légumes, fruits</Txt>
        <Txt x={78} y={86} anchor="middle" bold s={11}>Protéines</Txt>
        <Flow y={18} x0={240} w={380} h={50} items={[["Menus"], ["Liste"], ["Marché"], ["Comptes"]]} />
        <Rect x={240} y={92} w={380} h={170} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={254} y={116} bold s={13}>Courses</Txt>
        <Note x={254} y={140}>• liste avant d'aller au marché</Note>
        <Note x={254} y={160}>• produits frais, de saison, comparer les prix</Note>
        <Note x={254} y={180}>• garder les reçus, rendre compte exactement</Note>
        <Note x={254} y={200}>• utiliser les restes, éviter le gaspillage</Note>
        <Note x={254} y={220}>• boire de l'eau propre</Note>
      </>
    ),
  },
  "dm-1-7": {
    caption: "Garder un enfant : surveiller, prévenir les dangers, informer les parents.",
    body: (
      <>
        <Rect x={20} y={14} w={290} h={150} fill={ROSE} stroke={RED} sw={2} r={10} />
        <Txt x={34} y={38} bold s={13} fill={RED}>Jamais seul près de…</Txt>
        {["L'eau", "Un escalier / une fenêtre", "Le feu et la cuisine", "La route"].map((t, i) => (
          <Note key={t} x={44} y={64 + i * 22}>⚠ {t}</Note>
        ))}
        <Rect x={330} y={14} w={290} h={150} fill={MINT} stroke={GREEN} sw={2} r={10} />
        <Txt x={344} y={38} bold s={13} fill={GREEN}>Rangés en hauteur</Txt>
        {["Produits d'entretien", "Médicaments", "Couteaux, petits objets", "Sacs plastiques"].map((t, i) => (
          <Note key={t} x={354} y={64 + i * 22}>✔ {t}</Note>
        ))}
        <Flow y={184} items={[["Repas"], ["Sieste"], ["Jeux"], ["Bain"], ["Coucher"]]} h={40} fill={YELLOW} stroke={ORANGE} />
        <Note x={20} y={250}>Calme et patience : ne frappez jamais. Prévenir les parents si fièvre, chute, blessure.</Note>
        <Note x={20} y={270}>Aucun médicament sans consigne claire des parents ou du médecin.</Note>
      </>
    ),
  },
  "dm-1-8": {
    caption: "Premiers secours : protéger, alerter, secourir.",
    body: (
      <>
        <Flow y={16} items={[["1 Protéger", "écarter le danger"], ["2 Alerter", "secours, famille"], ["3 Secourir", "gestes simples"]]} h={64} fill={ROSE} stroke={RED} />
        <Card x={20} y={104} w={190} h={156} title="Brûlure" lines={["Eau courante fraîche", "10 à 20 minutes", "Pas d'huile ni dentifrice", "Couvrir d'un linge propre"]} fill={SKY} stroke={BLUE} />
        <Card x={225} y={104} w={190} h={156} title="Saignement" lines={["Appuyer fermement", "avec un linge propre", "Appeler les secours", "Nez : pencher en avant"]} fill={PEACH} stroke={ORANGE} />
        <Card x={430} y={104} w={190} h={156} title="Produit avalé" lines={["Ne pas faire vomir", "Garder l'emballage", "Appeler médecin ou", "centre antipoison"]} fill={MINT} stroke={GREEN} />
      </>
    ),
  },
  "dm-1-9": {
    caption: "Sécuriser la maison : clés, visiteurs, incendie.",
    body: (
      <>
        {[
          ["Clés", "ne jamais prêter", "🔑", BLUE, SKY],
          ["Visiteurs", "nom + motif + accord", "🚪", GREEN, MINT],
          ["Téléphone", "aucune info privée", "📞", ORANGE, PEACH],
          ["Incendie", "sortir, appeler", "🔥", RED, ROSE],
        ].map(([t, s, i, c, f], k) => (
          <g key={t as string}>
            <Rect x={20 + k * 152} y={16} w={142} h={130} fill={f as string} stroke={c as string} sw={2} r={14} />
            <Txt x={91 + k * 152} y={66} anchor="middle" s={32}>{i as string}</Txt>
            <Txt x={91 + k * 152} y={100} anchor="middle" bold s={14}>{t as string}</Txt>
            <Txt x={91 + k * 152} y={122} anchor="middle" s={10.5} fill={SOFT}>{s as string}</Txt>
          </g>
        ))}
        <Card x={20} y={166} w={290} h={96} title="Gardien" lines={["Rondes régulières", "Cahier d'entrées et sorties", "Signaler tout incident"]} />
        <Card x={330} y={166} w={290} h={96} title="Chauffeur · jardinier" lines={["Jamais fatigué ni après alcool", "Outils et produits rangés"]} />
      </>
    ),
  },
  "dm-1-10": {
    caption: "Bien communiquer : écouter, reformuler, rendre compte.",
    body: (
      <>
        <Rect x={20} y={20} w={250} h={74} fill={SKY} stroke={BLUE} sw={2} r={16} />
        <Txt x={34} y={46} s={12} bold>« Préparez le repas pour sept heures »</Txt>
        <Txt x={34} y={70} s={11} fill={SOFT}>L'employeur donne une consigne</Txt>
        <Rect x={370} y={104} w={250} h={74} fill={MINT} stroke={GREEN} sw={2} r={16} />
        <Txt x={384} y={130} s={12} bold>« Sept heures du soir, pour tous ? »</Txt>
        <Txt x={384} y={154} s={11} fill={SOFT}>Vous reformulez pour vérifier</Txt>
        <Rect x={20} y={192} w={290} h={74} fill={YELLOW} stroke={ORANGE} r={10} />
        <Txt x={34} y={216} bold s={13}>Rendre compte</Txt>
        <Note x={34} y={240}>fait · reste à faire · manque · dépenses</Note>
        <Rect x={330} y={192} w={290} h={74} fill={ROSE} stroke={RED} r={10} />
        <Txt x={344} y={216} bold s={13} fill={RED}>Vie privée</Txt>
        <Note x={344} y={240}>ne pas fouiller · pas de photos · discrétion</Note>
      </>
    ),
  },
  "dm-1-11": {
    caption: "Droits et devoirs : un contrat clair protège tout le monde.",
    body: (
      <>
        <Rect x={20} y={14} w={290} h={176} fill={PAPER} stroke={SOFT} sw={2} r={6} />
        <Txt x={34} y={38} bold s={13}>Contrat de travail</Txt>
        {["Poste et tâches", "Horaires, jour de repos", "Salaire et date de paiement", "Congés, essai, durée"].map((t, i) => (
          <Note key={t} x={44} y={64 + i * 24}>☑ {t}</Note>
        ))}
        <Note x={34} y={170}>Lire en entier · garder une copie · reçus</Note>
        <Card x={330} y={14} w={290} h={84} title="Vos devoirs" lines={["Soin, honnêteté, confidentialité", "Prévenir en cas d'absence"]} fill={SKY} stroke={BLUE} />
        <Card x={330} y={108} w={290} h={82} title="Votre protection" lines={["Respect, repos, sécurité", "Papiers d'identité : à vous"]} fill={MINT} stroke={GREEN} />
        <Rect x={20} y={208} w={600} h={58} fill={ROSE} stroke={RED} dash="5 4" r={8} />
        <Txt x={34} y={230} bold s={12.5} fill={RED}>Interdit : violence, humiliation, harcèlement, papiers confisqués</Txt>
        <Note x={34} y={252}>En cas de problème : BM Domestica, personne de confiance, autorités.</Note>
      </>
    ),
  },
  "dm-1-12": {
    caption: "Organiser son temps, son argent et sa carrière.",
    body: (
      <>
        <Flow y={16} items={[["Planning", "tâches prioritaires"], ["Budget", "revenus, dépenses"], ["Épargne", "un peu chaque mois"], ["Formation", "certificats"]]} h={64} />
        <Rect x={20} y={104} w={290} h={156} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={128} bold s={13}>Mon dossier professionnel</Txt>
        <Note x={34} y={152}>• CV d'une page</Note>
        <Note x={34} y={172}>• attestations (BM Academia)</Note>
        <Note x={34} y={192}>• lettres de recommandation</Note>
        <Note x={34} y={212}>• contrat et reçus gardés</Note>
        <Rect x={330} y={104} w={290} h={156} fill={ROSE} stroke={RED} sw={2} r={8} />
        <Txt x={344} y={128} bold s={13} fill={RED}>Méfiance</Txt>
        <Note x={344} y={152}>• on ne paie jamais sans reçu officiel</Note>
        <Note x={344} y={172}>• promesses « miracle » d'emploi</Note>
        <Note x={344} y={192}>• code secret mobile money : à personne</Note>
        <Pill x={344} y={212} w={200} fill={MINT} stroke={GREEN}>Objectif à 2 ans</Pill>
      </>
    ),
  },
};
