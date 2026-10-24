import type { ReactNode } from "react";
import { INK, SOFT, LINE, PAPER, SUNK, RED, BLUE, GREEN, ORANGE, SKY, MINT, PEACH, ROSE, YELLOW, Rect, Txt, Line, Dot, Key, Win, Grid, Pill, Page, Ribbon, type Fig } from "./figureKit";
import { LOGICIELS_FIGS } from "./figures/logiciels";
import { VISUEL_FIGS } from "./figures/visuel";

// Hand-drawn diagrams for the courses. Bureautique: "<level>-<lesson>"; Logiciels: "lg-<level>-<lesson>"; Visuel: "va-<level>-<lesson>".

const OFFICE_FIGS: Record<string, Fig> = {
  // ───────────── Niveau 1 ─────────────
  "1-1": {
    caption: "L'ordinateur et l'écran de Windows : les éléments à connaître.",
    body: (
      <>
        <Rect x={20} y={20} w={300} h={190} fill="#0f4c81" stroke={INK} sw={3} r={10} />
        <Rect x={32} y={32} w={276} h={150} fill="#3b82c4" stroke="#0f4c81" r={4} />
        <Rect x={44} y={44} w={36} h={36} fill={PAPER} r={6} />
        <Txt x={62} y={95} s={10} fill="#fff" anchor="middle">Corbeille</Txt>
        <Rect x={44} y={105} w={36} h={36} fill={YELLOW} r={6} />
        <Txt x={62} y={156} s={10} fill="#fff" anchor="middle">Dossier</Txt>
        <Rect x={32} y={182} w={276} h={22} fill="#1e293b" r={0} />
        <rect x={40} y={187} width={14} height={14} rx={2} fill="#60a5fa" />
        <rect x={62} y={187} width={80} height={12} rx={6} fill="#475569" />
        <Txt x={296} y={198} s={10} fill="#fff" anchor="end">14:30</Txt>
        <Rect x={150} y={210} w={20} h={16} fill={SOFT} stroke={SOFT} r={0} />
        <Rect x={110} y={226} w={100} h={8} fill={SOFT} stroke={SOFT} r={4} />
        <Dot x={48} y={64} n={1} />
        <Dot x={48} y={187} n={2} />
        <Dot x={290} y={187} n={3} />
        <Rect x={80} y={250} w={130} h={22} fill={SUNK} stroke={SOFT} r={5} />
        <Txt x={145} y={266} s={11} anchor="middle" fill={SOFT}>Clavier</Txt>
        <circle cx={250} cy={262} r={9} fill={SUNK} stroke={SOFT} strokeWidth={1.5} />
        <Txt x={266} y={266} s={11} fill={SOFT}>Souris</Txt>
        <Txt x={360} y={50} bold s={15}>Sur l'écran</Txt>
        <Dot x={372} y={78} n={1} />
        <Txt x={392} y={83}>Le Bureau : les icônes et les raccourcis</Txt>
        <Dot x={372} y={112} n={2} />
        <Txt x={392} y={117}>Le menu Démarrer : lancer un programme</Txt>
        <Dot x={372} y={146} n={3} />
        <Txt x={392} y={151}>La barre des tâches : l'heure, les applis</Txt>
        <Txt x={360} y={200} bold s={15}>Sur la table</Txt>
        <Txt x={360} y={226} fill={SOFT}>Le clavier sert à écrire,</Txt>
        <Txt x={360} y={246} fill={SOFT}>la souris à pointer et à cliquer.</Txt>
      </>
    ),
  },
  "1-2": {
    caption: "Une arborescence : des dossiers rangés dans des dossiers.",
    body: (
      <>
        <Rect x={20} y={20} w={150} h={40} fill={YELLOW} stroke={ORANGE} />
        <Txt x={95} y={45} anchor="middle" bold>📁 Documents</Txt>
        {[
          { x: 40, n: "Travail" },
          { x: 230, n: "Études" },
          { x: 420, n: "Photos" },
        ].map((d) => (
          <g key={d.n}>
            <Line a={{ x: 95, y: 60 }} b={{ x: d.x + 70, y: 110 }} />
            <Rect x={d.x} y={110} w={140} h={38} fill={YELLOW} stroke={ORANGE} />
            <Txt x={d.x + 70} y={134} anchor="middle" bold>📁 {d.n}</Txt>
          </g>
        ))}
        {[
          { x: 20, n: "Facture.docx", c: BLUE },
          { x: 130, n: "Budget.xlsx", c: GREEN },
        ].map((f) => (
          <g key={f.n}>
            <Line a={{ x: 110, y: 148 }} b={{ x: f.x + 50, y: 200 }} />
            <Rect x={f.x} y={200} w={100} h={34} fill={PAPER} stroke={f.c} />
            <Txt x={f.x + 50} y={221} anchor="middle" s={11}>{f.n}</Txt>
          </g>
        ))}
        <Line a={{ x: 300, y: 148 }} b={{ x: 300, y: 200 }} />
        <Rect x={250} y={200} w={100} h={34} fill={PAPER} stroke={BLUE} />
        <Txt x={300} y={221} anchor="middle" s={11}>Cours.docx</Txt>
        <Line a={{ x: 490, y: 148 }} b={{ x: 490, y: 200 }} />
        <Rect x={440} y={200} w={100} h={34} fill={PAPER} stroke={RED} />
        <Txt x={490} y={221} anchor="middle" s={11}>Voyage.jpg</Txt>
        <Rect x={200} y={20} w={420} h={46} fill={SUNK} stroke={LINE} dash="5 4" />
        <Txt x={410} y={40} anchor="middle" s={12} fill={SOFT}>Chemin : Documents ▸ Travail ▸ Facture.docx</Txt>
        <Txt x={410} y={57} anchor="middle" s={11} fill={SOFT}>Un nom clair + un bon dossier = on retrouve tout.</Txt>
        <Txt x={20} y={265} s={12} fill={SOFT}>Copier : Ctrl+C · Coller : Ctrl+V · Couper : Ctrl+X</Txt>
      </>
    ),
  },
  "1-3": {
    caption: "Les quatre réflexes de sécurité de base.",
    body: (
      <>
        {[
          { x: 20, t: "Mot de passe", s: "long, unique, secret", c: BLUE, f: SKY, icon: "🔑" },
          { x: 175, t: "Antivirus", s: "actif et à jour", c: GREEN, f: MINT, icon: "🛡" },
          { x: 330, t: "Sauvegarde", s: "une copie ailleurs", c: ORANGE, f: PEACH, icon: "💾" },
          { x: 485, t: "Mises à jour", s: "Windows Update", c: RED, f: ROSE, icon: "⟳" },
        ].map((k) => (
          <g key={k.t}>
            <Rect x={k.x} y={40} w={135} h={180} fill={k.f} stroke={k.c} sw={2} r={14} />
            <Txt x={k.x + 67} y={110} s={44} anchor="middle">{k.icon}</Txt>
            <Txt x={k.x + 67} y={160} bold anchor="middle" s={15}>{k.t}</Txt>
            <Txt x={k.x + 67} y={182} anchor="middle" s={12} fill={SOFT}>{k.s}</Txt>
          </g>
        ))}
        <Txt x={320} y={255} anchor="middle" s={13} fill={SOFT}>Jamais de lien ni de pièce jointe inconnue : en cas de doute, on ne clique pas.</Txt>
      </>
    ),
  },
  "1-4": {
    caption: "La fenêtre de Word et ses zones principales.",
    body: (
      <>
        <Win x={20} y={10} w={600} h={262} title="Document1 - Word" color={BLUE} />
        <Ribbon x={22} y={36} w={596} tabs={["Fichier", "Accueil", "Insertion", "Mise en page", "Révision"]} color={BLUE} />
        <Rect x={22} y={98} w={596} h={150} fill={SUNK} stroke={SUNK} r={0} />
        <Rect x={150} y={106} w={340} h={142} fill={PAPER} stroke={LINE} r={0} />
        <rect x={170} y={124} width={200} height={6} rx={3} fill={LINE} />
        <rect x={170} y={140} width={290} height={6} rx={3} fill={LINE} />
        <rect x={170} y={156} width={250} height={6} rx={3} fill={LINE} />
        <rect x={172} y={172} width={2} height={14} fill={INK} />
        <Rect x={22} y={248} w={596} h={22} fill={BLUE} stroke={BLUE} r={0} />
        <Txt x={32} y={263} s={11} fill="#fff">Page 1 sur 1 · 24 mots</Txt>
        <Dot x={596} y={70} n={1} />
        <Dot x={300} y={82} n={2} />
        <Dot x={330} y={190} n={3} />
        <Dot x={560} y={259} n={4} />
        <Rect x={430} y={112} w={0} h={0} />
        <g>
          <Txt x={26} y={288} s={11} fill={SOFT}>1 Onglets · 2 Ruban (boutons) · 3 Page blanche : on écrit ici, au point d'insertion (le trait qui clignote) · 4 Barre d'état</Txt>
        </g>
      </>
    ),
  },
  "1-5": {
    caption: "Avant / après : la mise en forme rend le texte lisible.",
    body: (
      <>
        <Rect x={20} y={20} w={270} h={200} fill={PAPER} stroke={LINE} />
        <Txt x={155} y={44} anchor="middle" bold fill={SOFT}>AVANT</Txt>
        <Txt x={34} y={80} s={13}>annonce reunion</Txt>
        <Txt x={34} y={102} s={13}>la reunion aura lieu lundi a 9h dans la salle</Txt>
        <Txt x={34} y={122} s={13}>de conference. merci de venir a l'heure</Txt>
        <Txt x={34} y={142} s={13}>apportez votre ordinateur</Txt>
        <Line a={{ x: 300, y: 120 }} b={{ x: 340, y: 120 }} c={RED} sw={4} arrow />
        <Rect x={350} y={20} w={270} h={200} fill={PAPER} stroke={BLUE} sw={2} />
        <Txt x={485} y={44} anchor="middle" bold fill={BLUE}>APRÈS</Txt>
        <Txt x={485} y={82} s={20} anchor="middle" bold fill={BLUE}>Annonce de réunion</Txt>
        <Txt x={364} y={112} s={13}>La réunion aura lieu <tspan fontWeight="700">lundi à 9 h</tspan> dans</Txt>
        <Txt x={364} y={132} s={13}>la salle de conférence.</Txt>
        <Txt x={364} y={156} s={13} italic>Merci de venir à l'heure.</Txt>
        <Txt x={364} y={178} s={13}><tspan textDecoration="underline">Apportez votre ordinateur.</tspan></Txt>
        <Pill x={20} y={236} w={90} fill={SKY}>G Gras</Pill>
        <Pill x={120} y={236} w={90} fill={SKY}>I Italique</Pill>
        <Pill x={220} y={236} w={100} fill={SKY}>S Souligné</Pill>
        <Pill x={330} y={236} w={130} fill={SKY}>Titre centré</Pill>
        <Pill x={470} y={236} w={150} fill={SKY}>Taille · Couleur</Pill>
      </>
    ),
  },
  "1-6": {
    caption: "Insérer une image : on redimensionne par un coin, jamais par un côté.",
    body: (
      <>
        <Page x={30} y={15} w={250} h={255} lines={3} />
        <Rect x={70} y={85} w={150} h={95} fill={SKY} stroke={BLUE} sw={2} r={2} />
        <path d="M70 180 l45 -45 30 28 25 -22 50 39 Z" fill="#93c5fd" />
        <circle cx={185} cy={110} r={12} fill={YELLOW} />
        {[[70, 85], [220, 85], [70, 180], [220, 180]].map(([cx, cy]) => (
          <rect key={`${cx}${cy}`} x={cx - 5} y={cy - 5} width={10} height={10} fill={PAPER} stroke={BLUE} strokeWidth={2} />
        ))}
        <Line a={{ x: 300, y: 215 }} b={{ x: 228, y: 188 }} c={GREEN} sw={3} arrow />
        <Txt x={310} y={222} bold fill={GREEN}>Coin = proportions gardées ✔</Txt>
        <Line a={{ x: 300, y: 130 }} b={{ x: 228, y: 132 }} c={RED} sw={3} arrow />
        <Txt x={310} y={135} bold fill={RED}>Côté = image déformée ✘</Txt>
        <Txt x={310} y={60} bold s={15}>Insertion ▸ Images</Txt>
        <Txt x={310} y={82} fill={SOFT}>puis choisir le fichier sur l'ordinateur.</Txt>
        <Txt x={310} y={255} fill={SOFT} s={12}>Insertion ▸ Tableau : colonnes et lignes.</Txt>
      </>
    ),
  },
  "1-7": {
    caption: "Le tableur Excel : colonnes, lignes, cellules.",
    body: (
      <>
        <Rect x={20} y={10} w={110} h={26} fill={SUNK} stroke={LINE} />
        <Txt x={30} y={28} s={12} bold>B3</Txt>
        <Rect x={138} y={10} w={482} h={26} fill={PAPER} stroke={LINE} />
        <Txt x={148} y={28} s={12} fill={SOFT} italic>Formule ou contenu de la cellule</Txt>
        <Grid x={20} y={46} cols={5} rows={6} cw={104} cells={[["Produit", "Quantité", "Prix"], ["Cahier", "10", "2,50"], ["Stylo", "25", "0,80"], ["Règle", "8", "1,20"]]} hi={[[1, 1]]} />
        <Dot x={60} y={22} n={1} />
        <Dot x={170} y={32} n={2} />
        <Dot x={110} y={58} n={3} />
        <Dot x={146} y={100} n={4} />
                <Txt x={20} y={248} s={12} fill={SOFT}>1 Zone Nom · 2 Barre de formule · 3 Lettres = colonnes · 4 Numéros = lignes · Une cellule = colonne + ligne (ex. B3)</Txt>
        <Txt x={20} y={268} s={12} fill={SOFT}>Cellule active entourée d'orange. Un classeur contient plusieurs feuilles (onglets en bas).</Txt>
      </>
    ),
  },
  "1-8": {
    caption: "Une formule commence toujours par = ; SOMME additionne une plage.",
    body: (
      <>
        <Grid x={20} y={14} cols={3} rows={5} cw={110} cells={[["Mois", "Ventes"], ["Janvier", "120"], ["Février", "95"], ["Mars", "140"], ["Total", "355"]]} hi={[[1, 1], [2, 1], [3, 1]]} hiFill={MINT} />
        <rect x={60 + 110 + 110 - 110} y={14 + 26 + 4 * 26} width={0} height={0} />
        <Rect x={50 + 110 + 0} y={14 + 26 + 4 * 26} w={110} h={26} fill={SKY} stroke={BLUE} sw={2} r={0} />
        <Txt x={168} y={14 + 26 + 4 * 26 + 17} s={12} bold>355</Txt>
        <Rect x={400} y={20} w={220} h={44} fill={SUNK} stroke={LINE} />
        <Txt x={410} y={48} bold s={14}>=SOMME(B2:B4)</Txt>
        <Line a={{ x: 480, y: 70 }} b={{ x: 480, y: 100 }} arrow />
        <Pill x={400} y={104} w={50} fill={YELLOW} stroke={ORANGE}>=</Pill>
        <Txt x={458} y={124} s={12} fill={SOFT}>début d'une formule</Txt>
        <Pill x={400} y={140} w={80} fill={MINT} stroke={GREEN}>SOMME</Pill>
        <Txt x={488} y={160} s={12} fill={SOFT}>la fonction (additionner)</Txt>
        <Pill x={400} y={176} w={80} fill={SKY} stroke={BLUE}>B2:B4</Pill>
        <Txt x={488} y={196} s={12} fill={SOFT}>la plage : de B2 à B4</Txt>
        <Txt x={400} y={236} s={12} fill={SOFT}>Autres : MOYENNE, MIN, MAX, NB.</Txt>
      </>
    ),
  },
  "1-9": {
    caption: "Du tableau au graphique : les données deviennent visibles d'un coup d'œil.",
    body: (
      <>
        <Grid x={20} y={20} cols={2} rows={5} cw={90} cells={[["Mois", "Ventes"], ["Janv.", "120"], ["Févr.", "95"], ["Mars", "140"], ["Avril", "80"]]} />
        <Line a={{ x: 250, y: 120 }} b={{ x: 300, y: 120 }} c={RED} sw={4} arrow />
        <Txt x={275} y={104} s={11} fill={SOFT} anchor="middle">Insertion</Txt><Txt x={275} y={142} s={11} fill={SOFT} anchor="middle">Graphique</Txt>
        <Rect x={320} y={14} w={300} h={252} fill={PAPER} stroke={LINE} />
        <Txt x={470} y={38} anchor="middle" bold>Ventes par mois</Txt>
        <Line a={{ x: 350, y: 60 }} b={{ x: 350, y: 220 }} c={SOFT} sw={1.5} />
        <Line a={{ x: 350, y: 220 }} b={{ x: 600, y: 220 }} c={SOFT} sw={1.5} />
        {[["Janv.", 120], ["Févr.", 95], ["Mars", 140], ["Avril", 80]].map(([m, v], i) => {
          const h = (v as number) * 1.1;
          return (
            <g key={m as string}>
              <rect x={368 + i * 58} y={220 - h} width={40} height={h} fill={i === 2 ? GREEN : BLUE} rx={3} />
              <Txt x={388 + i * 58} y={215 - h} anchor="middle" s={11} bold>{v}</Txt>
              <Txt x={388 + i * 58} y={238} anchor="middle" s={11} fill={SOFT}>{m}</Txt>
            </g>
          );
        })}
        <Txt x={20} y={190} s={12} fill={SOFT}>Un graphique a un titre,</Txt>
        <Txt x={20} y={208} s={12} fill={SOFT}>des axes et des étiquettes.</Txt>
        <Txt x={20} y={236} s={12} fill={SOFT}>Colonnes : comparer · Courbe : évolution</Txt>
        <Txt x={20} y={254} s={12} fill={SOFT}>Secteurs : parts d'un tout</Txt>
      </>
    ),
  },
  "1-10": {
    caption: "La fenêtre de PowerPoint : miniatures, diapositive, notes.",
    body: (
      <>
        <Win x={20} y={10} w={600} h={262} title="Présentation1 - PowerPoint" color={ORANGE} />
        <Ribbon x={22} y={36} w={596} tabs={["Fichier", "Accueil", "Insertion", "Création", "Transitions"]} color={ORANGE} />
        <Rect x={22} y={98} w={110} h={174} fill={SUNK} stroke={SUNK} r={0} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Rect x={34} y={106 + i * 52} w={84} h={44} fill={PAPER} stroke={i === 0 ? ORANGE : LINE} sw={i === 0 ? 2 : 1} r={2} />
            <Txt x={30} y={118 + i * 52} s={9} fill={SOFT}>{i + 1}</Txt>
          </g>
        ))}
        <Rect x={150} y={106} w={330} h={110} fill={PAPER} stroke={LINE} r={2} />
        <Txt x={315} y={150} anchor="middle" s={18} bold>Titre de la présentation</Txt>
        <Txt x={315} y={178} anchor="middle" s={13} fill={SOFT}>Sous-titre</Txt>
        <Rect x={150} y={222} w={330} h={44} fill={PAPER} stroke={LINE} dash="4 3" r={2} />
        <Txt x={160} y={248} s={11} fill={SOFT}>Cliquez pour ajouter des notes</Txt>
        <Dot x={80} y={105} n={1} />
        <Dot x={310} y={112} n={2} />
        <Dot x={470} y={228} n={3} />
        <Txt x={496} y={140} s={11} fill={SOFT}>1 Miniatures : l'ordre</Txt>
        <Txt x={496} y={158} s={11} fill={SOFT}>2 Diapositive : on édite</Txt>
        <Txt x={496} y={176} s={11} fill={SOFT}>3 Notes : texte de l'orateur</Txt>
      </>
    ),
  },
  "1-11": {
    caption: "Une diapositive lisible : peu de texte, une image, un contraste fort.",
    body: (
      <>
        <Rect x={20} y={20} w={290} h={180} fill="#fff7ed" stroke={RED} sw={2} />
        <Txt x={165} y={14} anchor="middle" s={12} bold fill={RED}>✘ À éviter</Txt>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect key={i} x={32} y={34 + i * 17} width={i % 2 ? 250 : 266} height={5} rx={2} fill={SOFT} />
        ))}
        <Txt x={165} y={225} anchor="middle" s={12} fill={SOFT}>trop de texte, police minuscule</Txt>
        <Rect x={330} y={20} w={290} h={180} fill={PAPER} stroke={GREEN} sw={2} />
        <Txt x={475} y={14} anchor="middle" s={12} bold fill={GREEN}>✔ Bon exemple</Txt>
        <Txt x={348} y={58} s={22} bold fill={ORANGE}>Nos résultats</Txt>
        <Txt x={348} y={92} s={15}>• Ventes en hausse</Txt>
        <Txt x={348} y={116} s={15}>• Clients satisfaits</Txt>
        <Txt x={348} y={140} s={15}>• Objectif atteint</Txt>
        <Rect x={510} y={90} w={90} h={90} fill={PEACH} stroke={ORANGE} r={6} />
        <path d="M520 170 l25 -35 20 22 15 -14 20 27 Z" fill={ORANGE} opacity={0.6} />
        <Txt x={475} y={225} anchor="middle" s={12} fill={SOFT}>3 idées, police ≥ 24, une image</Txt>
        <Pill x={20} y={246} w={170} fill={PEACH} stroke={ORANGE}>Transitions : entre diapos</Pill>
        <Pill x={200} y={246} w={170} fill={PEACH} stroke={ORANGE}>Animations : sur un objet</Pill>
        <Pill x={380} y={246} w={240} fill={PEACH} stroke={ORANGE}>Diaporama : touche F5</Pill>
      </>
    ),
  },
  "1-12": {
    caption: "Le mini-projet : un même sujet traité avec les trois logiciels.",
    body: (
      <>
        {[
          { x: 20, t: "Word", s: "le rapport", c: BLUE, f: SKY },
          { x: 230, t: "Excel", s: "les chiffres", c: GREEN, f: MINT },
          { x: 440, t: "PowerPoint", s: "la présentation", c: ORANGE, f: PEACH },
        ].map((k) => (
          <g key={k.t}>
            <Rect x={k.x} y={50} w={180} h={110} fill={k.f} stroke={k.c} sw={2} r={14} />
            <Txt x={k.x + 90} y={98} bold s={20} anchor="middle" fill={k.c}>{k.t}</Txt>
            <Txt x={k.x + 90} y={126} anchor="middle" fill={SOFT}>{k.s}</Txt>
          </g>
        ))}
        <Line a={{ x: 200, y: 105 }} b={{ x: 230, y: 105 }} c={RED} sw={3} arrow />
        <Line a={{ x: 410, y: 105 }} b={{ x: 440, y: 105 }} c={RED} sw={3} arrow />
        <Rect x={20} y={185} w={600} h={64} fill={SUNK} stroke={LINE} dash="5 4" />
        <Txt x={320} y={211} anchor="middle" bold>Checklist : nom de fichier clair · dossier rangé · orthographe vérifiée</Txt>
        <Txt x={320} y={233} anchor="middle" fill={SOFT} s={12}>copie de sauvegarde faite · version imprimée ou PDF prête</Txt>
      </>
    ),
  },
  // ───────────── Niveau 2 ─────────────
  "2-1": {
    caption: "Les raccourcis clavier qui font gagner du temps.",
    body: (
      <>
        {[
          { y: 20, keys: ["Win", "D"], t: "Afficher le Bureau" },
          { y: 20, x: 330, keys: ["Win", "Maj", "S"], t: "Capture d'écran" },
          { y: 90, keys: ["Alt", "Tab"], t: "Changer de fenêtre" },
          { y: 90, x: 330, keys: ["Ctrl", "Z"], t: "Annuler" },
          { y: 160, keys: ["Ctrl", "C"], t: "Copier", sep: "+" },
          { y: 160, x: 330, keys: ["Ctrl", "V"], t: "Coller" },
          { y: 225, keys: ["Win", "L"], t: "Verrouiller la session" },
          { y: 225, x: 330, keys: ["Ctrl", "F"], t: "Rechercher" },
        ].map((r, i) => {
          const x0 = r.x ?? 20;
          const widths = r.keys.map((k) => (k.length > 2 ? 54 : 40));
          let cx = x0;
          return (
            <g key={i}>
              {r.keys.map((k, j) => {
                const el = (
                  <g key={k}>
                    <Key x={cx} y={r.y} w={widths[j]}>{k}</Key>
                    {j < r.keys.length - 1 && <Txt x={cx + widths[j] + 6} y={r.y + 22} bold fill={SOFT}>+</Txt>}
                  </g>
                );
                cx += widths[j] + 20;
                return el;
              })}
              <Txt x={x0 + 135} y={r.y + 22}>{r.t}</Txt>
            </g>
          );
        })}
      </>
    ),
  },
  "2-2": {
    caption: "Anatomie d'un e-mail professionnel.",
    body: (
      <>
        <Rect x={20} y={10} w={600} h={262} fill={PAPER} stroke={SOFT} sw={2} />
        {[
          { y: 30, l: "À :", v: "marie.dupont@entreprise.com", n: 1 },
          { y: 62, l: "Cc :", v: "responsable@entreprise.com", n: 2 },
          { y: 94, l: "Objet :", v: "Compte rendu de la réunion du 12 mars", n: 3 },
        ].map((r) => (
          <g key={r.l}>
            <Rect x={34} y={r.y} w={500} h={26} fill={SUNK} stroke={LINE} r={4} />
            <Txt x={44} y={r.y + 18} bold fill={SOFT}>{r.l}</Txt>
            <Txt x={110} y={r.y + 18}>{r.v}</Txt>
            <Dot x={565} y={r.y + 13} n={r.n} />
          </g>
        ))}
        <Txt x={44} y={146}>Bonjour Madame Dupont,</Txt>
        <Txt x={44} y={170}>Veuillez trouver ci-joint le compte rendu de la réunion.</Txt>
        <Txt x={44} y={194}>Cordialement,  Jordi M.</Txt>
        <Dot x={565} y={170} n={4} />
        <Rect x={34} y={216} w={170} h={30} fill={YELLOW} stroke={ORANGE} />
        <Txt x={46} y={236} s={12}>📎 compte-rendu.pdf</Txt>
        <Dot x={226} y={231} n={5} />
        <Rect x={470} y={226} w={100} h={32} fill={BLUE} stroke={BLUE} r={8} />
        <Txt x={520} y={247} anchor="middle" fill="#fff" bold>Envoyer</Txt>
        <Txt x={250} y={235} s={11} fill={SOFT}>1 Destinataire · 2 Copie · 3 Objet clair · 4 Formule de politesse · 5 Pièce jointe</Txt>
      </>
    ),
  },
  "2-3": {
    caption: "Un réseau local : la box relie l'ordinateur, l'imprimante et Internet.",
    body: (
      <>
        <Rect x={270} y={100} w={100} h={56} fill={SUNK} stroke={INK} sw={2} />
        <Txt x={320} y={133} anchor="middle" bold>Box / routeur</Txt>
        {[
          { x: 40, y: 30, t: "Ordinateur", i: "🖥" },
          { x: 40, y: 190, t: "Téléphone", i: "📱" },
          { x: 500, y: 30, t: "Imprimante", i: "🖨" },
          { x: 500, y: 190, t: "Portable", i: "💻" },
        ].map((d) => (
          <g key={d.t}>
            <Line a={{ x: d.x + 50, y: d.y + 35 }} b={{ x: 320, y: 128 }} c={BLUE} sw={2.5} dash="6 4" />
            <Rect x={d.x} y={d.y} w={100} h={70} fill={SKY} stroke={BLUE} r={10} />
            <Txt x={d.x + 50} y={d.y + 40} s={26} anchor="middle">{d.i}</Txt>
            <Txt x={d.x + 50} y={d.y + 62} anchor="middle" s={11}>{d.t}</Txt>
          </g>
        ))}
        <Line a={{ x: 320, y: 100 }} b={{ x: 320, y: 40 }} c={GREEN} sw={3} />
        <Rect x={270} y={10} w={100} h={30} fill={MINT} stroke={GREEN} r={15} />
        <Txt x={320} y={30} anchor="middle" bold>Internet</Txt>
        <Txt x={320} y={190} anchor="middle" s={12} fill={SOFT}>Les pointillés bleus = Wi-Fi (ou câble)</Txt>
        <Txt x={320} y={216} anchor="middle" s={12} fill={SOFT}>Panne ? Vérifier les câbles, redémarrer la box,</Txt>
        <Txt x={320} y={234} anchor="middle" s={12} fill={SOFT}>puis redémarrer l'ordinateur.</Txt>
      </>
    ),
  },
  "2-4": {
    caption: "Les styles : une hiérarchie qui structure tout le document.",
    body: (
      <>
        <Page x={20} y={14} w={230} h={256} lines={0} />
        <Txt x={34} y={50} s={20} bold fill={BLUE}>1. Introduction</Txt>
        <rect x={34} y={62} width={190} height={5} rx={2} fill={LINE} />
        <rect x={34} y={74} width={160} height={5} rx={2} fill={LINE} />
        <Txt x={34} y={104} s={15} bold fill={BLUE}>1.1 Contexte</Txt>
        <rect x={34} y={116} width={190} height={5} rx={2} fill={LINE} />
        <rect x={34} y={128} width={140} height={5} rx={2} fill={LINE} />
        <Txt x={34} y={158} s={15} bold fill={BLUE}>1.2 Objectif</Txt>
        <rect x={34} y={170} width={190} height={5} rx={2} fill={LINE} />
        <Txt x={34} y={204} s={20} bold fill={BLUE}>2. Méthode</Txt>
        <rect x={34} y={216} width={190} height={5} rx={2} fill={LINE} />
        <Pill x={290} y={30} w={150} fill={SKY}>Titre 1 → grandes parties</Pill>
        <Pill x={290} y={76} w={150} fill={SKY}>Titre 2 → sous-parties</Pill>
        <Pill x={290} y={122} w={150} fill={SUNK} stroke={SOFT}>Normal → le texte</Pill>
        <Line a={{ x: 440, y: 45 }} b={{ x: 480, y: 45 }} arrow />
        <Rect x={490} y={20} w={130} h={100} fill={YELLOW} stroke={ORANGE} />
        <Txt x={555} y={46} anchor="middle" bold s={12}>Sommaire auto</Txt>
        <Txt x={500} y={68} s={11}>1. Introduction …… 1</Txt>
        <Txt x={510} y={86} s={11}>1.1 Contexte …… 1</Txt>
        <Txt x={500} y={104} s={11}>2. Méthode …… 2</Txt>
        <Txt x={290} y={190} s={12} fill={SOFT}>Changer un style = tous les titres changent.</Txt>
        <Txt x={290} y={210} s={12} fill={SOFT}>Jamais de titres « faits à la main » (gras + grand).</Txt>
        <Txt x={290} y={236} s={12} fill={SOFT}>Mise en page : colonnes, tabulations, sauts de page.</Txt>
      </>
    ),
  },
  "2-5": {
    caption: "Un document long : en-tête, pied de page, numéros et sommaire.",
    body: (
      <>
        <Page x={30} y={10} w={190} h={262} lines={0} />
        <Rect x={30} y={10} w={190} h={30} fill={SKY} stroke={BLUE} r={4} />
        <Txt x={125} y={30} anchor="middle" s={11} bold>En-tête : titre du rapport</Txt>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={46} y={62 + i * 24} width={i % 3 === 2 ? 90 : 158} height={5} rx={2} fill={LINE} />
        ))}
        <Rect x={30} y={242} w={190} h={30} fill={MINT} stroke={GREEN} r={4} />
        <Txt x={50} y={262} s={11} bold>Pied de page</Txt>
        <Txt x={200} y={262} s={12} bold anchor="end">3</Txt>
        <Page x={250} y={10} w={190} h={262} lines={0} />
        <Txt x={266} y={40} bold s={14}>Sommaire</Txt>
        {[["1. Introduction", "2"], ["2. Analyse", "4"], ["3. Résultats", "7"], ["Conclusion", "9"]].map(([t, p], i) => (
          <g key={t}>
            <Txt x={266} y={72 + i * 26} s={12}>{t}</Txt>
            <Txt x={424} y={72 + i * 26} s={12} anchor="end">{p}</Txt>
            <line x1={340} y1={69 + i * 26} x2={400} y2={69 + i * 26} stroke={LINE} strokeDasharray="2 3" />
          </g>
        ))}
        <Txt x={448} y={50} bold s={11}>Insertion ▸ En-tête, pied de page</Txt>
        <Txt x={450} y={72} s={12} fill={SOFT}>Insertion ▸ Numéro de page</Txt>
        <Txt x={450} y={110} bold s={12}>Références ▸ Table des matières</Txt>
        <Txt x={450} y={132} s={12} fill={SOFT}>Clic droit ▸ Mettre à jour</Txt>
        <Txt x={450} y={170} bold s={12}>Notes de bas de page</Txt>
        <Txt x={450} y={192} s={12} fill={SOFT}>Références ▸ Insérer une note</Txt>
      </>
    ),
  },
  "2-6": {
    caption: "Le publipostage : un modèle + une liste = autant de courriers que de personnes.",
    body: (
      <>
        <Page x={20} y={20} w={160} h={190} lines={0} fill={SKY} />
        <Txt x={32} y={46} s={11} bold>Modèle</Txt>
        <Txt x={32} y={74} s={12}>Bonjour</Txt>
        <Rect x={32} y={82} w={120} h={20} fill={YELLOW} stroke={ORANGE} r={3} />
        <Txt x={38} y={96} s={11} bold>« Prénom » « Nom »</Txt>
        <rect x={32} y={116} width={130} height={5} rx={2} fill={LINE} />
        <rect x={32} y={128} width={110} height={5} rx={2} fill={LINE} />
        <Txt x={32} y={168} s={12}>Bonne année !</Txt>
        <Txt x={186} y={118} s={26} bold fill={RED}>+</Txt>
        <Grid x={218} y={50} cols={2} rows={4} cw={76} head={false} cells={[["Prénom", "Nom"], ["Anna", "Mbuyi"], ["Paul", "Kalala"], ["Rose", "Ilunga"]]} />
        <Line a={{ x: 380, y: 112 }} b={{ x: 420, y: 112 }} c={RED} sw={4} arrow />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Page x={430 + i * 18} y={30 + i * 14} w={140} h={150} lines={0} />
          </g>
        ))}
        <Txt x={472} y={134} s={11}>Bonjour</Txt>
        <Txt x={472} y={150} s={12} bold>Rose Ilunga</Txt>
        <Txt x={20} y={240} bold>Publipostage ▸ Démarrer ▸ Sélectionner les destinataires</Txt>
        <Txt x={20} y={260} fill={SOFT} s={12}>Insérer un champ de fusion ▸ Aperçu ▸ Terminer et fusionner.</Txt>
      </>
    ),
  },
  "2-7": {
    caption: "La fonction SI : Excel choisit entre deux réponses.",
    body: (
      <>
        <Rect x={20} y={16} w={250} h={34} fill={SUNK} stroke={LINE} />
        <Txt x={32} y={38} bold>=SI(B2&gt;=10 ; "Admis" ; "Ajourné")</Txt>
        <Rect x={210} y={74} w={220} h={52} fill={YELLOW} stroke={ORANGE} r={26} />
        <Txt x={320} y={105} anchor="middle" bold>Note ≥ 10 ?</Txt>
        <Line a={{ x: 250 + 20, y: 126 }} b={{ x: 150, y: 170 }} c={GREEN} sw={3} arrow />
        <Line a={{ x: 390, y: 126 }} b={{ x: 490, y: 170 }} c={RED} sw={3} arrow />
        <Txt x={178} y={152} fill={GREEN} bold>OUI</Txt>
        <Txt x={448} y={152} fill={RED} bold>NON</Txt>
        <Rect x={60} y={172} w={180} h={44} fill={MINT} stroke={GREEN} r={10} />
        <Txt x={150} y={200} anchor="middle" bold>Admis</Txt>
        <Rect x={400} y={172} w={180} h={44} fill={ROSE} stroke={RED} r={10} />
        <Txt x={490} y={200} anchor="middle" bold>Ajourné</Txt>
        <Txt x={310} y={246} anchor="middle" s={12} fill={SOFT}>NB.SI compte les cellules qui remplissent un critère · SOMME.SI additionne celles-ci.</Txt>
        <Txt x={310} y={266} anchor="middle" s={12} fill={SOFT}>ET(…) : tout vrai · OU(…) : au moins un vrai</Txt>
      </>
    ),
  },
  "2-8": {
    caption: "RECHERCHEV : retrouver une information dans un tableau à partir d'un code.",
    body: (
      <>
        <Grid x={20} y={14} cols={3} rows={5} cw={96} cells={[["Code", "Produit", "Prix"], ["A10", "Cahier", "2,50"], ["A20", "Stylo", "0,80"], ["A30", "Règle", "1,20"], ["A40", "Classeur", "4,00"]]} hi={[[2, 0], [2, 2]]} hiFill={MINT} />
        <Txt x={20} y={188} s={12} fill={SOFT}>Tableau de référence (colonnes 1, 2, 3)</Txt>
        <Rect x={360} y={14} w={260} h={34} fill={SUNK} stroke={LINE} />
        <Txt x={370} y={36} bold s={13}>=RECHERCHEV("A20" ; A2:C5 ; 3 ; FAUX)</Txt>
        {[
          { y: 66, c: ORANGE, f: PEACH, t: "A20", s: "la valeur cherchée" },
          { y: 104, c: BLUE, f: SKY, t: "A2:C5", s: "où chercher" },
          { y: 142, c: GREEN, f: MINT, t: "3", s: "n° de la colonne à rendre" },
          { y: 180, c: RED, f: ROSE, t: "FAUX", s: "valeur exacte" },
        ].map((r) => (
          <g key={r.t}>
            <Pill x={360} y={r.y} w={70} fill={r.f} stroke={r.c}>{r.t}</Pill>
            <Txt x={440} y={r.y + 20} s={12} fill={SOFT}>{r.s}</Txt>
          </g>
        ))}
        <Rect x={360} y={222} w={260} h={40} fill={MINT} stroke={GREEN} sw={2} r={8} />
        <Txt x={490} y={248} anchor="middle" bold>Résultat : 0,80</Txt>
      </>
    ),
  },
  "2-9": {
    caption: "Trier, filtrer et mettre en valeur un tableau de données.",
    body: (
      <>
        <Grid x={20} y={14} cols={4} rows={6} cw={104} cells={[["Nom ▼", "Ville ▼", "Ventes ▼", "Statut"], ["Anna", "Kinshasa", "450", "OK"], ["Paul", "Lubumbashi", "120", "Faible"], ["Rose", "Kinshasa", "380", "OK"], ["David", "Goma", "90", "Faible"], ["Léa", "Kinshasa", "510", "OK"]]} />
        <rect x={50 + 2 * 104} y={14 + 26 + 2 * 26} width={104} height={26} fill={ROSE} />
        <Txt x={50 + 2 * 104 + 8} y={14 + 26 + 2 * 26 + 17} s={12}>120</Txt>
        <rect x={50 + 2 * 104} y={14 + 26 + 4 * 26} width={104} height={26} fill={ROSE} />
        <Txt x={50 + 2 * 104 + 8} y={14 + 26 + 4 * 26 + 17} s={12}>90</Txt>
        <rect x={50 + 2 * 104} y={14 + 26 + 5 * 26} width={104} height={26} fill={MINT} />
        <Txt x={50 + 2 * 104 + 8} y={14 + 26 + 5 * 26 + 17} s={12}>510</Txt>
        <Pill x={20} y={216} w={120} fill={SKY}>Trier A→Z</Pill>
        <Pill x={150} y={216} w={150} fill={SKY}>Filtrer par ville</Pill>
        <Pill x={310} y={216} w={170} fill={ROSE} stroke={RED}>Mise en forme cond.</Pill>
        <Pill x={490} y={216} w={130} fill={MINT} stroke={GREEN}>Liste déroulante</Pill>
        <Txt x={20} y={266} s={12} fill={SOFT}>Données ▸ Validation des données limite la saisie à des valeurs permises.</Txt>
      </>
    ),
  },
  "2-10": {
    caption: "Le tableau croisé dynamique : résumer une longue liste en quelques clics.",
    body: (
      <>
        <Grid x={10} y={14} cols={3} rows={7} cw={78} ch={24} cells={[["Ville", "Produit", "Ventes"], ["Kin", "Cahier", "50"], ["Kin", "Stylo", "30"], ["Lub", "Cahier", "20"], ["Lub", "Stylo", "40"], ["Kin", "Cahier", "10"], ["Lub", "Stylo", "15"]]} head={false} />
        <Txt x={10} y={216} s={11} fill={SOFT}>Liste brute (des centaines de lignes)</Txt>
        <Line a={{ x: 260, y: 100 }} b={{ x: 305, y: 100 }} c={RED} sw={4} arrow />
        <Txt x={252} y={84} s={11} fill={SOFT}>Insertion</Txt>
        <Grid x={320} y={14} cols={3} rows={4} cw={90} cells={[["Ville", "Cahier", "Stylo"], ["Kin", "60", "30"], ["Lub", "20", "55"], ["Total", "80", "85"]]} head={false} hi={[[3, 0], [3, 1], [3, 2]]} hiFill={MINT} />
        <Txt x={320} y={140} s={12} fill={SOFT}>Résultat : sommes par ville et par produit</Txt>
        <Pill x={320} y={156} w={80} fill={SKY}>Lignes</Pill>
        <Pill x={410} y={156} w={90} fill={PEACH} stroke={ORANGE}>Colonnes</Pill>
        <Pill x={510} y={156} w={90} fill={MINT} stroke={GREEN}>Valeurs</Pill>
        <Txt x={320} y={216} s={12} fill={SOFT}>On glisse les champs dans ces zones.</Txt>
        <Txt x={320} y={236} s={12} fill={SOFT}>Si les données changent : Actualiser.</Txt>
      </>
    ),
  },
  "2-11": {
    caption: "Le masque donne une identité commune ; SmartArt illustre un processus.",
    body: (
      <>
        <Rect x={20} y={14} w={260} h={150} fill={PAPER} stroke={ORANGE} sw={2} />
        <Rect x={20} y={14} w={260} h={28} fill={ORANGE} stroke={ORANGE} r={4} />
        <Txt x={34} y={33} fill="#fff" bold>Titre (masque)</Txt>
        <Rect x={232} y={118} w={38} h={36} fill={PEACH} stroke={ORANGE} r={6} />
        <Txt x={251} y={141} anchor="middle" s={10} fill={ORANGE} bold>LOGO</Txt>
        <rect x={34} y={58} width={170} height={6} rx={3} fill={LINE} />
        <rect x={34} y={74} width={140} height={6} rx={3} fill={LINE} />
        <Txt x={150} y={186} anchor="middle" s={12} fill={SOFT}>Affichage ▸ Masque des diapositives</Txt>
        <Txt x={150} y={204} anchor="middle" s={12} fill={SOFT}>Logo, couleurs et polices sur toutes les diapos.</Txt>
        {["Idée", "Plan", "Action", "Bilan"].map((t, i) => (
          <g key={t}>
            <Rect x={310 + i * 78} y={56} w={66} h={52} fill={i % 2 ? PEACH : SKY} stroke={i % 2 ? ORANGE : BLUE} r={26} />
            <Txt x={343 + i * 78} y={86} anchor="middle" bold s={12}>{t}</Txt>
            {i < 3 && <Line a={{ x: 378 + i * 78, y: 82 }} b={{ x: 388 + i * 78, y: 82 }} arrow />}
          </g>
        ))}
        <Txt x={310} y={42} bold>SmartArt : processus</Txt>
        <Txt x={310} y={140} s={12} fill={SOFT}>Insertion ▸ SmartArt ▸ choisir un modèle.</Txt>
        <Txt x={310} y={190} bold>Graphique : mêmes données qu'Excel</Txt>
        {[40, 70, 55, 85].map((h, i) => (
          <rect key={i} x={330 + i * 40} y={262 - h} width={28} height={h} fill={i === 3 ? ORANGE : BLUE} rx={3} />
        ))}
      </>
    ),
  },
  "2-12": {
    caption: "Le dossier de fin de niveau : rapport, tableau de gestion, présentation.",
    body: (
      <>
        {[
          { x: 20, t: "Rapport", s: "Word : styles, sommaire", c: BLUE, f: SKY },
          { x: 230, t: "Gestion", s: "Excel : SI, RECHERCHEV, TCD", c: GREEN, f: MINT },
          { x: 440, t: "Soutenance", s: "PowerPoint : masque, graphique", c: ORANGE, f: PEACH },
        ].map((k) => (
          <g key={k.t}>
            <Rect x={k.x} y={40} w={180} h={130} fill={k.f} stroke={k.c} sw={2} r={14} />
            <Txt x={k.x + 90} y={90} bold s={20} anchor="middle" fill={k.c}>{k.t}</Txt>
            <Txt x={k.x + 90} y={120} anchor="middle" s={11} fill={SOFT}>{k.s}</Txt>
          </g>
        ))}
        <Rect x={20} y={196} w={600} h={56} fill={SUNK} stroke={LINE} dash="5 4" />
        <Txt x={320} y={220} anchor="middle" bold>Même sujet, mêmes chiffres dans les trois documents</Txt>
        <Txt x={320} y={240} anchor="middle" s={12} fill={SOFT}>cohérence des titres, des couleurs et des noms de fichiers</Txt>
      </>
    ),
  },
  // ───────────── Niveau 3 ─────────────
  "3-1": {
    caption: "La règle de sauvegarde 3-2-1.",
    body: (
      <>
        {[
          { x: 40, t: "3 copies", s: "l'original + 2 copies", i: "📄", c: BLUE, f: SKY },
          { x: 245, t: "2 supports", s: "disque externe + cloud", i: "💽", c: GREEN, f: MINT },
          { x: 450, t: "1 copie ailleurs", s: "hors de la maison/du bureau", i: "☁", c: ORANGE, f: PEACH },
        ].map((k) => (
          <g key={k.t}>
            <Rect x={k.x} y={30} w={150} h={150} fill={k.f} stroke={k.c} sw={2} r={14} />
            <Txt x={k.x + 75} y={90} s={40} anchor="middle">{k.i}</Txt>
            <Txt x={k.x + 75} y={125} anchor="middle" bold s={15}>{k.t}</Txt>
            <Txt x={k.x + 75} y={148} anchor="middle" s={11} fill={SOFT}>{k.s}</Txt>
          </g>
        ))}
        <Txt x={320} y={218} anchor="middle" s={12} fill={SOFT}>BitLocker chiffre le disque · Historique des fichiers sauvegarde automatiquement.</Txt>
        <Txt x={320} y={240} anchor="middle" s={12} fill={SOFT}>Tester de temps en temps la restauration d'un fichier.</Txt>
      </>
    ),
  },
  "3-2": {
    caption: "Le Gestionnaire des tâches : repérer ce qui ralentit l'ordinateur.",
    body: (
      <>
        <Win x={20} y={10} w={600} h={262} title="Gestionnaire des tâches" color="#475569" />
        <Txt x={40} y={52} bold s={12} fill={SOFT}>Nom</Txt>
        {["Processeur", "Mémoire", "Disque"].map((h, i) => (
          <Txt key={h} x={330 + i * 100} y={52} bold s={12} fill={SOFT}>{h}</Txt>
        ))}
        {[
          ["Navigateur (12 onglets)", 38, 62, 4],
          ["Word", 6, 18, 1],
          ["Excel", 15, 28, 2],
          ["Mise à jour inconnue", 82, 40, 88],
          ["Antivirus", 5, 12, 3],
        ].map(([n, c, m, d], i) => (
          <g key={n as string}>
            <rect x={30} y={62 + i * 34} width={580} height={30} fill={i === 3 ? ROSE : i % 2 ? SUNK : PAPER} />
            <Txt x={40} y={82 + i * 34} s={12}>{n}</Txt>
            {[c, m, d].map((v, j) => (
              <g key={j}>
                <rect x={330 + j * 100} y={68 + i * 34} width={(v as number) * 0.8} height={14} rx={3} fill={(v as number) > 70 ? RED : BLUE} opacity={0.75} />
                <Txt x={410 + j * 100 - 4} y={80 + i * 34} s={10} anchor="end" fill={INK}>{v} %</Txt>
              </g>
            ))}
          </g>
        ))}
        <Txt x={40} y={258} s={11} fill={SOFT}>Ctrl+Maj+Échap ouvre ce gestionnaire · Une ligne rouge = programme gourmand : Fin de tâche.</Txt>
      </>
    ),
  },
  "3-3": {
    caption: "Le travail collaboratif : un seul document en ligne, plusieurs personnes.",
    body: (
      <>
        <Rect x={240} y={90} w={160} h={90} fill={MINT} stroke={GREEN} sw={2} r={45} />
        <Txt x={320} y={128} anchor="middle" s={26}>☁</Txt>
        <Txt x={320} y={155} anchor="middle" bold>Document partagé</Txt>
        {[
          { x: 40, y: 30, n: "Anna", c: BLUE },
          { x: 40, y: 190, n: "Paul", c: ORANGE },
          { x: 500, y: 30, n: "Rose", c: GREEN },
          { x: 500, y: 190, n: "David", c: RED },
        ].map((u) => (
          <g key={u.n}>
            <Line a={{ x: u.x + 50, y: u.y + 35 }} b={{ x: 320, y: 135 }} c={u.c} sw={2.5} />
            <circle cx={u.x + 50} cy={u.y + 28} r={24} fill={u.c} opacity={0.15} stroke={u.c} strokeWidth={2} />
            <Txt x={u.x + 50} y={u.y + 36} anchor="middle" s={22}>👤</Txt>
            <Txt x={u.x + 50} y={u.y + 70} anchor="middle" bold s={12} fill={u.c}>{u.n}</Txt>
          </g>
        ))}
        <Txt x={320} y={232} anchor="middle" s={12} fill={SOFT}>OneDrive / Teams : partager par lien, choisir « peut modifier » ou « lecture seule ».</Txt>
        <Txt x={320} y={252} anchor="middle" s={12} fill={SOFT}>Les modifications de chacun apparaissent en direct.</Txt>
      </>
    ),
  },
  "3-4": {
    caption: "La structure d'un rapport ou d'un mémoire.",
    body: (
      <>
        {[
          { x: 20, t: "Page de garde", l: ["Titre", "Auteur", "Date"] },
          { x: 150, t: "Sommaire", l: ["1. …… 2", "2. …… 5", "3. …… 9"] },
          { x: 280, t: "Chapitres", l: ["Intro", "Corps", "Conclusion"] },
          { x: 410, t: "Figures", l: ["Fig. 1 …", "Fig. 2 …", "Légendes"] },
          { x: 540, t: "Bibliographie", l: ["Auteur, 2023", "Site web", "Livre"] },
        ].map((p) => (
          <g key={p.t}>
            <Page x={p.x} y={20} w={100} h={140} lines={0} />
            {p.l.map((s, i) => (
              <Txt key={s} x={p.x + 10} y={56 + i * 24} s={11}>{s}</Txt>
            ))}
            <Txt x={p.x + 50} y={182} anchor="middle" bold s={12}>{p.t}</Txt>
          </g>
        ))}
        <Txt x={320} y={222} anchor="middle" s={12} fill={SOFT}>Références ▸ Insérer une légende · Table des illustrations · Gérer les sources.</Txt>
        <Txt x={320} y={244} anchor="middle" s={12} fill={SOFT}>Numérotation des pages : la page de garde n'est pas comptée.</Txt>
      </>
    ),
  },
  "3-5": {
    caption: "Suivi des modifications et commentaires : relire à plusieurs sans rien perdre.",
    body: (
      <>
        <Page x={20} y={14} w={400} h={250} lines={0} />
        <Txt x={36} y={56}>Le rapport sera</Txt>
        <Txt x={140} y={56} fill={RED}><tspan textDecoration="line-through">terminé en mai</tspan></Txt>
        <Txt x={256} y={56} fill={GREEN}><tspan textDecoration="underline">remis le 15 juin</tspan>.</Txt>
        <rect x={36} y={80} width={340} height={5} rx={2} fill={LINE} />
        <rect x={36} y={96} width={300} height={5} rx={2} fill={LINE} />
        <Rect x={36} y={118} w={200} h={22} fill={YELLOW} stroke={YELLOW} r={2} />
        <Txt x={42} y={134} s={12}>Chiffres à vérifier</Txt>
        <rect x={36} y={160} width={330} height={5} rx={2} fill={LINE} />
        <rect x={36} y={176} width={250} height={5} rx={2} fill={LINE} />
        <Rect x={440} y={50} w={180} h={58} fill={SKY} stroke={BLUE} r={8} />
        <Txt x={452} y={72} s={11} bold fill={BLUE}>Paul</Txt>
        <Txt x={452} y={90} s={11}>Date confirmée ?</Txt>
        <Rect x={440} y={118} w={180} h={50} fill={PEACH} stroke={ORANGE} r={8} />
        <Txt x={452} y={140} s={11} bold fill={ORANGE}>Anna</Txt>
        <Txt x={452} y={156} s={11}>Voir tableau p. 4</Txt>
        <Line a={{ x: 440, y: 130 }} b={{ x: 240, y: 130 }} c={ORANGE} dash="4 3" />
        <Txt x={430} y={206} s={12} fill={SOFT}>Révision ▸ Suivi des modifications</Txt>
        <Txt x={430} y={226} s={12} fill={SOFT}>Accepter ou refuser</Txt>
        <Txt x={430} y={246} s={12} fill={SOFT}>Protéger : mot de passe</Txt>
      </>
    ),
  },
  "3-6": {
    caption: "Un CV clair : une page, une structure simple, une mise en page soignée.",
    body: (
      <>
        <Page x={20} y={8} w={210} h={268} lines={0} />
        <Rect x={20} y={8} w={72} h={268} fill={SKY} stroke={BLUE} r={4} />
        <circle cx={56} cy={46} r={22} fill={PAPER} stroke={BLUE} strokeWidth={2} />
        <Txt x={56} y={54} anchor="middle" s={22}>👤</Txt>
        {["Contact", "Langues", "Outils"].map((t, i) => (
          <g key={t}>
            <Txt x={28} y={98 + i * 52} s={10} bold fill={BLUE}>{t}</Txt>
            <rect x={28} y={106 + i * 52} width={52} height={4} rx={2} fill={PAPER} />
            <rect x={28} y={116 + i * 52} width={40} height={4} rx={2} fill={PAPER} />
          </g>
        ))}
        <Txt x={104} y={36} bold s={14}>PRÉNOM NOM</Txt>
        <Txt x={104} y={52} s={10} fill={SOFT}>Poste visé</Txt>
        {["Expérience", "Formation", "Compétences"].map((t, i) => (
          <g key={t}>
            <Txt x={104} y={86 + i * 62} bold s={11} fill={BLUE}>{t}</Txt>
            <line x1={104} y1={90 + i * 62} x2={220} y2={90 + i * 62} stroke={BLUE} />
            <rect x={104} y={98 + i * 62} width={110} height={4} rx={2} fill={LINE} />
            <rect x={104} y={110 + i * 62} width={90} height={4} rx={2} fill={LINE} />
          </g>
        ))}
        <Txt x={260} y={46} bold s={15}>Bonnes pratiques</Txt>
        <Txt x={260} y={76}>• Une page, police lisible (11-12 pt)</Txt>
        <Txt x={260} y={100}>• Colonnes ou tableau sans bordures</Txt>
        <Txt x={260} y={124}>• Résultats concrets plutôt que listes vagues</Txt>
        <Txt x={260} y={148}>• Relire : zéro faute d'orthographe</Txt>
        <Txt x={260} y={172}>• Enregistrer en PDF pour l'envoyer</Txt>
        <Rect x={260} y={196} w={350} h={60} fill={YELLOW} stroke={ORANGE} dash="5 4" />
        <Txt x={272} y={220} bold s={12}>Modèle (.dotx)</Txt>
        <Txt x={272} y={240} s={12} fill={SOFT}>Enregistrer comme modèle pour réutiliser la mise en page.</Txt>
      </>
    ),
  },
  "3-7": {
    caption: "Fonctions avancées : se protéger des erreurs et croiser des données.",
    body: (
      <>
        <Rect x={20} y={14} w={600} h={34} fill={SUNK} stroke={LINE} />
        <Txt x={32} y={36} bold>=SIERREUR(INDEX(C2:C20 ; EQUIV("A20" ; A2:A20 ; 0)) ; "Introuvable")</Txt>
        <Line a={{ x: 100, y: 52 }} b={{ x: 100, y: 84 }} c={RED} arrow />
        <Line a={{ x: 300, y: 52 }} b={{ x: 300, y: 84 }} c={BLUE} arrow />
        <Line a={{ x: 480, y: 52 }} b={{ x: 480, y: 84 }} c={GREEN} arrow />
        <Rect x={20} y={88} w={190} h={70} fill={ROSE} stroke={RED} r={10} />
        <Txt x={115} y={114} anchor="middle" bold>SIERREUR</Txt>
        <Txt x={115} y={136} anchor="middle" s={11} fill={SOFT}>texte clair si erreur</Txt>
        <Rect x={225} y={88} w={190} h={70} fill={SKY} stroke={BLUE} r={10} />
        <Txt x={320} y={114} anchor="middle" bold>INDEX</Txt>
        <Txt x={320} y={136} anchor="middle" s={11} fill={SOFT}>rend la valeur d'une position</Txt>
        <Rect x={430} y={88} w={190} h={70} fill={MINT} stroke={GREEN} r={10} />
        <Txt x={525} y={114} anchor="middle" bold>EQUIV</Txt>
        <Txt x={525} y={136} anchor="middle" s={11} fill={SOFT}>trouve la position d'un code</Txt>
        <Txt x={20} y={200} bold>SOMME.SI.ENS</Txt>
        <Txt x={20} y={220} s={12} fill={SOFT}>additionne en respectant plusieurs critères (ville ET produit).</Txt>
        <Txt x={20} y={248} bold>INDEX + EQUIV</Txt>
        <Txt x={20} y={268} s={12} fill={SOFT}>cherche vers la gauche aussi, contrairement à RECHERCHEV.</Txt>
      </>
    ),
  },
  "3-8": {
    caption: "Segments : des boutons qui filtrent le tableau croisé dynamique.",
    body: (
      <>
        <Rect x={20} y={20} w={150} h={150} fill={SUNK} stroke={LINE} />
        <Txt x={32} y={42} bold s={12}>Segment : Ville</Txt>
        {["Kinshasa", "Lubumbashi", "Goma"].map((v, i) => (
          <g key={v}>
            <Rect x={32} y={54 + i * 36} w={126} h={28} fill={i === 0 ? BLUE : PAPER} stroke={BLUE} r={4} />
            <Txt x={95} y={73 + i * 36} anchor="middle" s={12} fill={i === 0 ? "#fff" : INK} bold>{v}</Txt>
          </g>
        ))}
        <Line a={{ x: 180, y: 95 }} b={{ x: 230, y: 95 }} c={RED} sw={4} arrow />
        <Grid x={240} y={20} cols={3} rows={4} cw={120} head={false} cells={[["Produit", "Ventes", "% total"], ["Cahier", "60", "67 %"], ["Stylo", "30", "33 %"], ["Total", "90", "100 %"]]} hi={[[3, 0], [3, 1], [3, 2]]} hiFill={MINT} />
        <Txt x={240} y={140} s={12} fill={SOFT}>Le tableau n'affiche que « Kinshasa ».</Txt>
        <Rect x={20} y={192} w={600} h={64} fill={YELLOW} stroke={ORANGE} dash="5 4" />
        <Txt x={32} y={216} bold>Analyse ▸ Insérer un segment</Txt>
        <Txt x={32} y={238} s={12} fill={SOFT}>Un segment peut piloter plusieurs tableaux et graphiques à la fois.</Txt>
      </>
    ),
  },
  "3-9": {
    caption: "Un tableau de bord : les indicateurs clés sur une seule page.",
    body: (
      <>
        {[
          { x: 20, t: "Ventes", v: "355", c: BLUE, f: SKY },
          { x: 225, t: "Objectif", v: "92 %", c: GREEN, f: MINT },
          { x: 430, t: "Clients", v: "128", c: ORANGE, f: PEACH },
        ].map((k) => (
          <g key={k.t}>
            <Rect x={k.x} y={14} w={190} h={64} fill={k.f} stroke={k.c} sw={2} r={10} />
            <Txt x={k.x + 14} y={38} s={12} fill={SOFT}>{k.t}</Txt>
            <Txt x={k.x + 14} y={66} s={26} bold fill={k.c}>{k.v}</Txt>
          </g>
        ))}
        <Rect x={20} y={94} w={300} h={170} fill={PAPER} stroke={LINE} />
        <Txt x={34} y={114} bold s={12}>Ventes (colonnes) et objectif (courbe)</Txt>
        {[60, 85, 70, 110].map((h, i) => (
          <rect key={i} x={50 + i * 60} y={244 - h} width={34} height={h} fill={BLUE} rx={3} />
        ))}
        <polyline points="67,170 127,160 187,166 247,142" fill="none" stroke={RED} strokeWidth={3} />
        {[[67, 170], [127, 160], [187, 166], [247, 142]].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r={4} fill={RED} />
        ))}
        <Rect x={340} y={94} w={280} h={170} fill={PAPER} stroke={LINE} />
        <Txt x={354} y={114} bold s={12}>Répartition par produit</Txt>
        <circle cx={430} cy={185} r={52} fill={BLUE} />
        <path d="M430 185 L430 133 A52 52 0 0 1 480 200 Z" fill={ORANGE} />
        <path d="M430 185 L480 200 A52 52 0 0 1 400 228 Z" fill={GREEN} />
        <Txt x={500} y={160} s={12}>■ Cahiers</Txt>
        <Txt x={500} y={182} s={12} fill={ORANGE}>■ Stylos</Txt>
        <Txt x={500} y={204} s={12} fill={GREEN}>■ Autres</Txt>
      </>
    ),
  },
  "3-10": {
    caption: "Protéger une feuille, importer des données et automatiser avec une macro.",
    body: (
      <>
        <Rect x={20} y={20} w={190} h={160} fill={YELLOW} stroke={ORANGE} sw={2} r={12} />
        <Txt x={115} y={72} anchor="middle" s={34}>🔒</Txt>
        <Txt x={115} y={108} anchor="middle" bold>Protéger</Txt>
        <Txt x={115} y={130} anchor="middle" s={11} fill={SOFT}>Révision ▸ Protéger la feuille</Txt>
        <Txt x={115} y={148} anchor="middle" s={11} fill={SOFT}>cellules verrouillées</Txt>
        <Rect x={225} y={20} w={190} h={160} fill={SKY} stroke={BLUE} sw={2} r={12} />
        <Txt x={320} y={72} anchor="middle" s={34}>📥</Txt>
        <Txt x={320} y={108} anchor="middle" bold>Importer CSV</Txt>
        <Txt x={320} y={130} anchor="middle" s={11} fill={SOFT}>Données ▸ À partir d'un</Txt>
        <Txt x={320} y={148} anchor="middle" s={11} fill={SOFT}>fichier texte/CSV</Txt>
        <Rect x={430} y={20} w={190} h={160} fill={MINT} stroke={GREEN} sw={2} r={12} />
        <Txt x={525} y={72} anchor="middle" s={34}>⏺</Txt>
        <Txt x={525} y={108} anchor="middle" bold>Macro</Txt>
        <Txt x={525} y={130} anchor="middle" s={11} fill={SOFT}>Affichage ▸ Macros ▸</Txt>
        <Txt x={525} y={148} anchor="middle" s={11} fill={SOFT}>Enregistrer une macro</Txt>
        <Txt x={20} y={216} s={12} fill={SOFT}>Une macro rejoue vos actions en un clic. Enregistrer le classeur au format .xlsm.</Txt>
        <Txt x={20} y={238} s={12} fill={SOFT}>N'activez jamais une macro dont vous ne connaissez pas l'origine.</Txt>
      </>
    ),
  },
  "3-11": {
    caption: "Une présentation professionnelle : un message par diapositive.",
    body: (
      <>
        <Rect x={20} y={20} w={190} h={110} fill={PAPER} stroke={ORANGE} sw={2} />
        <Txt x={115} y={64} anchor="middle" s={15} bold>1 message</Txt>
        <Txt x={115} y={86} anchor="middle" s={11} fill={SOFT}>un titre = la conclusion</Txt>
        <Rect x={225} y={20} w={190} h={110} fill={PAPER} stroke={ORANGE} sw={2} />
        {[30, 55, 40, 70].map((h, i) => (
          <rect key={i} x={250 + i * 38} y={118 - h} width={26} height={h} fill={i === 3 ? ORANGE : LINE} rx={2} />
        ))}
        <Txt x={320} y={142} anchor="middle" s={11} fill={SOFT}>un graphique qui parle</Txt>
        <Rect x={430} y={20} w={190} h={110} fill={PAPER} stroke={ORANGE} sw={2} />
        <Txt x={525} y={64} anchor="middle" s={15} bold>Merci !</Txt>
        <Txt x={525} y={86} anchor="middle" s={11} fill={SOFT}>contacts, questions</Txt>
        {[
          { x: 20, t: "Contraste", s: "texte foncé sur fond clair" },
          { x: 175, t: "Cohérence", s: "mêmes polices, mêmes couleurs" },
          { x: 330, t: "Sobriété", s: "peu d'animations" },
          { x: 485, t: "Répétition", s: "s'entraîner à voix haute" },
        ].map((r) => (
          <g key={r.t}>
            <Rect x={r.x} y={176} w={135} h={70} fill={PEACH} stroke={ORANGE} r={10} />
            <Txt x={r.x + 67} y={202} anchor="middle" bold s={13}>{r.t}</Txt>
            <Txt x={r.x + 67} y={222} anchor="middle" s={10} fill={SOFT}>{r.s}</Txt>
          </g>
        ))}
      </>
    ),
  },
  "3-12": {
    caption: "Organiser un projet professionnel : un dossier, des sous-dossiers, des noms clairs.",
    body: (
      <>
        <Rect x={20} y={14} w={230} h={34} fill={YELLOW} stroke={ORANGE} />
        <Txt x={32} y={36} bold>📁 Projet_Formation_2026</Txt>
        {[
          { y: 62, n: "01_Rapport", f: ["Rapport_v3.docx", "Rapport_final.pdf"] },
          { y: 134, n: "02_Chiffres", f: ["Budget_2026.xlsx", "Donnees.csv"] },
          { y: 206, n: "03_Presentation", f: ["Soutenance.pptx"] },
        ].map((d) => (
          <g key={d.n}>
            <Line a={{ x: 38, y: 48 }} b={{ x: 38, y: d.y + 17 }} />
            <Line a={{ x: 38, y: d.y + 17 }} b={{ x: 60, y: d.y + 17 }} />
            <Rect x={60} y={d.y} w={190} h={34} fill={YELLOW} stroke={ORANGE} />
            <Txt x={72} y={d.y + 22}>📁 {d.n}</Txt>
            {d.f.map((f, i) => (
              <g key={f}>
                <Line a={{ x: 250, y: d.y + 17 }} b={{ x: 290, y: d.y + 17 + (i - (d.f.length - 1) / 2) * 24 }} c={LINE} sw={1.5} />
                <Rect x={290} y={d.y + 4 + (i - (d.f.length - 1) / 2) * 24 + 0} w={170} h={22} fill={PAPER} stroke={LINE} r={4} />
                <Txt x={300} y={d.y + 19 + (i - (d.f.length - 1) / 2) * 24} s={11}>{f}</Txt>
              </g>
            ))}
          </g>
        ))}
        <Rect x={480} y={14} w={140} h={250} fill={SUNK} stroke={LINE} dash="5 4" />
        <Txt x={550} y={40} anchor="middle" bold s={12}>Règles</Txt>
        <Txt x={490} y={66} s={11}>• Numéroter les dossiers</Txt>
        <Txt x={490} y={90} s={11}>• Date ou version</Txt>
        <Txt x={490} y={114} s={11}>• Pas d'espaces ni</Txt>
        <Txt x={490} y={130} s={11}>  de « final2 »</Txt>
        <Txt x={490} y={154} s={11}>• Sauvegarde 3-2-1</Txt>
        <Txt x={490} y={178} s={11}>• Partage par lien</Txt>
      </>
    ),
  },
};

const FIGS: Record<string, Fig> = { ...OFFICE_FIGS, ...LOGICIELS_FIGS, ...VISUEL_FIGS };

export function hasOfficeFigure(id?: string): boolean {
  return !!id && id in FIGS;
}

export default function OfficeFigure({ id }: { id?: string }) {
  const fig = id ? FIGS[id] : undefined;
  if (!fig) return null;
  return (
    <figure className="mt-6 rounded-2xl border border-line bg-white p-3 shadow-sm">
      <svg viewBox="0 0 640 290" role="img" aria-label={fig.caption} className="w-full h-auto" style={{ background: PAPER }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill={RED} />
          </marker>
        </defs>
        {fig.body}
      </svg>
      <figcaption className="mt-2 text-center text-xs font-semibold text-gray-600">{fig.caption}</figcaption>
    </figure>
  );
}
