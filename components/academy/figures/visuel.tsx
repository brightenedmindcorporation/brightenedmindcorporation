import { BLUE, GREEN, LINE, MINT, ORANGE, PAPER, PEACH, Pill, RED, ROSE, Rect, SKY, SOFT, SUNK, Txt, YELLOW, Line, Win, Box, Arrow, Flow, Note, Screen, Menu, type Fig } from "../figureKit";

// Diagrams of the Visuel & Audiovisuel course, keyed "va-<level>-<lesson>".

const PURPLE = "#7c3aed";
const DARK = "#1f2937";
const INK_ = "#1f2937";

/** A pretend photo: sky, sun and hills. */
const Photo = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <g>
    <Rect x={x} y={y} w={w} h={h} fill={SKY} stroke={LINE} r={4} />
    <circle cx={x + w * 0.75} cy={y + h * 0.28} r={h * 0.12} fill={YELLOW} />
    <path d={`M${x} ${y + h} L${x + w * 0.3} ${y + h * 0.5} L${x + w * 0.55} ${y + h * 0.8} L${x + w * 0.75} ${y + h * 0.55} L${x + w} ${y + h} Z`} fill={GREEN} opacity={0.75} />
  </g>
);
/** A video frame with a person-shaped subject. */
const Frame = ({ x, y, w, h, shot = "moyen", label }: { x: number; y: number; w: number; h: number; shot?: "large" | "moyen" | "gros"; label?: string }) => {
  const r = shot === "large" ? 0.1 : shot === "moyen" ? 0.2 : 0.38;
  return (
    <g>
      <Rect x={x} y={y} w={w} h={h} fill={SKY} stroke={DARK} sw={2} r={4} />
      <rect x={x + 2} y={y + h * 0.72} width={w - 4} height={h * 0.26} fill={GREEN} opacity={0.5} />
      <circle cx={x + w / 2} cy={y + h * (shot === "gros" ? 0.5 : 0.45)} r={h * r} fill={ORANGE} />
      {shot !== "gros" && <rect x={x + w / 2 - h * r} y={y + h * (0.45 + r)} width={h * r * 2} height={h * (shot === "large" ? 0.18 : 0.3)} rx={4} fill={BLUE} />}
      {label && <Txt x={x + w / 2} y={y + h + 16} anchor="middle" s={11.5} bold>{label}</Txt>}
    </g>
  );
};
const Track = ({ x, y, w, label, color, clips }: { x: number; y: number; w: number; label: string; color: string; clips: [number, number, string?][] }) => (
  <g>
    <Rect x={x} y={y} w={w} h={30} fill={SUNK} stroke={LINE} r={3} />
    <Txt x={x + 6} y={y + 19} s={10.5} bold fill={SOFT}>{label}</Txt>
    {clips.map(([a, b, t], i) => (
      <g key={i}>
        <Rect x={x + 34 + a} y={y + 3} w={b} h={24} fill={color} stroke={PAPER} r={3} />
        {t && <Txt x={x + 40 + a} y={y + 19} s={10} fill="#fff" bold>{t}</Txt>}
      </g>
    ))}
  </g>
);

export const VISUEL_FIGS: Record<string, Fig> = {
  // ───────────── Niveau 1 ─────────────
  "va-1-1": {
    caption: "Pixels, résolution et formats de l'image numérique.",
    body: (
      <>
        <Photo x={20} y={20} w={170} h={120} />
        <Line a={{ x: 190, y: 60 }} b={{ x: 240, y: 40 }} c={RED} sw={2} arrow />
        <Rect x={240} y={20} w={110} h={110} fill={PAPER} stroke={SOFT} r={4} />
        {Array.from({ length: 36 }).map((_, i) => (
          <rect key={i} x={244 + (i % 6) * 17} y={24 + Math.floor(i / 6) * 17} width={16} height={16} fill={[SKY, GREEN, YELLOW, SKY, GREEN, SKY][(i * 7 + Math.floor(i / 6)) % 6]} />
        ))}
        <Note x={20} y={160}>Photo = des pixels</Note>
        <Note x={240} y={150}>zoom : carrés de couleur</Note>
        <Rect x={380} y={20} w={240} h={52} fill={MINT} stroke={GREEN} r={8} />
        <Txt x={392} y={42} bold s={12}>72 ppi = écran</Txt>
        <Txt x={392} y={62} bold s={12}>300 ppi = impression</Txt>
        <Rect x={380} y={84} w={240} h={46} fill={SKY} stroke={BLUE} r={8} />
        <Txt x={392} y={104} bold s={12}>Matriciel : Photoshop</Txt>
        <Txt x={392} y={122} bold s={12}>Vectoriel : Illustrator</Txt>
        <Txt x={20} y={196} bold s={13}>Formats</Txt>
        {[["JPG", "photos, léger", BLUE], ["PNG", "fond transparent", GREEN], ["PSD / AI", "fichiers de travail", ORANGE], ["SVG / PDF", "vectoriel, impression", RED]].map(([t, s, c], i) => (
          <g key={t as string}>
            <Rect x={20 + i * 152} y={206} w={142} h={52} fill={PAPER} stroke={c as string} sw={2} r={8} />
            <Txt x={91 + i * 152} y={228} anchor="middle" bold s={14} fill={c as string}>{t as string}</Txt>
            <Txt x={91 + i * 152} y={246} anchor="middle" s={10.5} fill={SOFT}>{s as string}</Txt>
          </g>
        ))}
        <Note x={20} y={278}>RVB (écran, lumière) · CMJN (imprimerie, encre)</Note>
      </>
    ),
  },
  "va-1-2": {
    caption: "Couleur, typographie et composition : les règles d'un visuel réussi.",
    body: (
      <>
        <circle cx={90} cy={90} r={64} fill="none" stroke={LINE} strokeWidth={1} />
        {[RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE].map((c, i) => {
          const a = (i * 60 - 90) * (Math.PI / 180);
          return <circle key={i} cx={90 + Math.cos(a) * 44} cy={90 + Math.sin(a) * 44} r={20} fill={c} />;
        })}
        <Line a={{ x: 90 + Math.cos((-90 * Math.PI) / 180) * 44, y: 90 - 44 }} b={{ x: 90, y: 90 + 44 }} c={DARK} sw={2} dash="4 3" />
        <Note x={20} y={178}>Opposées = complémentaires (contraste)</Note>
        <Note x={20} y={196}>Voisines = analogues (harmonie)</Note>
        <Rect x={230} y={20} w={190} h={170} fill={PAPER} stroke={SOFT} r={4} />
        {[63, 126].map((d) => (
          <g key={d}>
            <Line a={{ x: 230 + d, y: 20 }} b={{ x: 230 + d, y: 190 }} c={LINE} sw={1} />
            <Line a={{ x: 230, y: 20 + d * 0.9 }} b={{ x: 420, y: 20 + d * 0.9 }} c={LINE} sw={1} />
          </g>
        ))}
        <circle cx={293} cy={77} r={14} fill={RED} />
        <Note x={230} y={210}>Règle des tiers : sujet sur un croisement</Note>
        <Rect x={440} y={20} w={180} h={170} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={452} y={56} s={22} bold fill={DARK}>TITRE</Txt>
        <Txt x={452} y={82} s={15} fill={BLUE}>Sous-titre</Txt>
        <rect x={452} y={98} width={150} height={5} rx={2} fill={LINE} />
        <rect x={452} y={110} width={120} height={5} rx={2} fill={LINE} />
        <rect x={452} y={122} width={140} height={5} rx={2} fill={LINE} />
        <Pill x={452} y={144} w={100} fill={ORANGE} stroke={ORANGE}>Réservez</Pill>
        <Note x={440} y={210}>Hiérarchie : titre → détail → action</Note>
        <Rect x={20} y={228} w={600} h={44} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={34} y={248} bold s={12}>À retenir :</Txt>
        <Note x={110} y={248}>2 ou 3 couleurs · 2 polices maximum · fort contraste · de l'espace vide</Note>
        <Note x={34} y={264}>Un visuel répond à : quoi ? pour qui ? que faire ?</Note>
      </>
    ),
  },
  "va-1-3": {
    caption: "L'interface de Photoshop.",
    body: (
      <Screen title="Adobe Photoshop" color={BLUE}>
        <Menu x={32} y={52} items={["Fichier", "Édition", "Image", "Calque", "Texte", "Filtre"]} color={BLUE} />
        <Rect x={22} y={60} w={596} h={22} fill={SUNK} stroke={SUNK} r={0} />
        <Note x={32} y={76}>Barre d'options (change selon l'outil)</Note>
        <Rect x={22} y={82} w={34} h={192} fill={DARK} stroke={DARK} r={0} />
        {["✥", "▭", "✎", "✂", "T", "⌖"].map((t, i) => (
          <Txt key={t} x={30} y={104 + i * 28} s={15} fill="#fff">{t}</Txt>
        ))}
        <Rect x={64} y={90} w={360} h={176} fill={SUNK} stroke={SUNK} r={0} />
        <Photo x={100} y={102} w={290} h={150} />
        <Rect x={436} y={90} w={182} h={80} fill={PAPER} stroke={LINE} r={4} />
        <Txt x={446} y={108} bold s={11.5}>Propriétés</Txt>
        <Note x={446} y={130}>Largeur 1080 px</Note>
        <Note x={446} y={150}>Hauteur 1080 px · 72 ppi</Note>
        <Rect x={436} y={178} w={182} h={90} fill={PAPER} stroke={LINE} r={4} />
        <Txt x={446} y={196} bold s={11.5}>Calques</Txt>
        {["Texte", "Photo", "Fond"].map((t, i) => (
          <g key={t}>
            <Rect x={446} y={202 + i * 20} w={162} h={17} fill={i === 1 ? SKY : SUNK} stroke={LINE} r={2} />
            <Txt x={454} y={215 + i * 20} s={10.5}>👁 {t}</Txt>
          </g>
        ))}
      </Screen>
    ),
  },
  "va-1-4": {
    caption: "Les calques : des feuilles transparentes superposées.",
    body: (
      <>
        {[
          { y: 180, t: "Fond", c: SKY },
          { y: 150, t: "Photo", c: GREEN },
          { y: 120, t: "Filtre de couleur 40 %", c: ORANGE },
          { y: 90, t: "Titre", c: PURPLE },
          { y: 60, t: "Logo", c: RED },
        ].map((l, i) => (
          <g key={l.t}>
            <path d={`M${60 + i * 14} ${l.y + 26} l60 -26 h160 l-60 26 z`} fill={l.c} opacity={0.85} stroke={PAPER} />
          </g>
        ))}
        <Txt x={140} y={250} anchor="middle" s={12} fill={SOFT}>5 calques empilés</Txt>
        <Rect x={360} y={20} w={260} h={186} fill={PAPER} stroke={SOFT} sw={2} r={6} />
        <Txt x={372} y={42} bold s={12.5}>Panneau Calques</Txt>
        {[["Logo", RED], ["Titre", PURPLE], ["Filtre — 40 %", ORANGE], ["Photo", GREEN], ["Fond 🔒", SKY]].map(([t, c], i) => (
          <g key={t as string}>
            <Rect x={372} y={52 + i * 30} w={236} h={26} fill={SUNK} stroke={LINE} r={3} />
            <Txt x={380} y={70 + i * 30} s={11}>👁</Txt>
            <rect x={404} y={57 + i * 30} width={26} height={16} rx={2} fill={c as string} />
            <Txt x={440} y={70 + i * 30} s={11.5}>{t as string}</Txt>
          </g>
        ))}
        <Note x={360} y={228}>Le calque du haut est devant · l'œil affiche ou cache.</Note>
        <Note x={360} y={248}>Opacité · modes de fusion · Ctrl+T.</Note>
        <Note x={360} y={268}>Nommer et grouper : Ctrl+G.</Note>
      </>
    ),
  },
  "va-1-5": {
    caption: "Détourer un sujet avec un masque de fusion : réversible.",
    body: (
      <>
        <Rect x={20} y={20} w={170} h={140} fill={SKY} stroke={LINE} r={4} />
        <rect x={22} y={110} width={166} height={48} fill={GREEN} opacity={0.6} />
        <circle cx={105} cy={70} r={22} fill={ORANGE} />
        <rect x={80} y={92} width={50} height={60} rx={6} fill={BLUE} />
        <Txt x={105} y={182} anchor="middle" bold s={12}>1. Photo d'origine</Txt>
        <Arrow x1={196} y1={90} x2={228} y2={90} />
        <Rect x={232} y={20} w={170} h={140} fill={PAPER} stroke={LINE} r={4} />
        <circle cx={317} cy={70} r={22} fill="none" stroke={RED} strokeWidth={2} strokeDasharray="5 3" />
        <rect x={292} y={92} width={50} height={60} rx={6} fill="none" stroke={RED} strokeWidth={2} strokeDasharray="5 3" />
        <Txt x={317} y={182} anchor="middle" bold s={12}>2. Sélection du sujet</Txt>
        <Arrow x1={408} y1={90} x2={440} y2={90} />
        <Rect x={444} y={20} w={176} h={140} fill={PEACH} stroke={LINE} r={4} />
        <circle cx={532} cy={70} r={22} fill={ORANGE} />
        <rect x={507} y={92} width={50} height={60} rx={6} fill={BLUE} />
        <Txt x={532} y={182} anchor="middle" bold s={12}>3. Nouveau fond</Txt>
        <Rect x={20} y={204} w={290} h={64} fill={SUNK} stroke={LINE} r={8} />
        <rect x={34} y={218} width={36} height={36} fill={PAPER} stroke={LINE} />
        <rect x={42} y={226} width={20} height={20} rx={10} fill={DARK} />
        <rect x={34} y={218} width={36} height={36} fill="none" stroke={DARK} />
        <Txt x={82} y={232} bold s={12}>Masque de fusion</Txt>
        <Note x={82} y={252}>blanc = visible · noir = caché</Note>
        <Rect x={330} y={204} w={290} h={64} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={344} y={226} bold s={12}>Sélectionner et masquer</Txt>
        <Note x={344} y={246}>adoucir les bords, vérifier à 200 %</Note>
        <Note x={344} y={262}>adapter lumière et couleurs au nouveau fond</Note>
      </>
    ),
  },
  "va-1-6": {
    caption: "Retouche photo : avant, après et réglages non destructifs.",
    body: (
      <>
        <g opacity={0.6}>
          <Photo x={20} y={20} w={200} h={140} />
          <rect x={20} y={20} width={200} height={140} fill={DARK} opacity={0.45} />
        </g>
        <Txt x={120} y={182} anchor="middle" bold s={12.5}>AVANT : sombre, penchée</Txt>
        <Arrow x1={228} y1={90} x2={262} y2={90} />
        <Photo x={268} y={20} w={200} h={140} />
        <Txt x={368} y={182} anchor="middle" bold s={12.5} fill={GREEN}>APRÈS : lumineuse</Txt>
        <Rect x={484} y={20} w={136} h={140} fill={PAPER} stroke={LINE} r={6} />
        <Txt x={494} y={40} bold s={11.5}>Courbes</Txt>
        <Line a={{ x: 498, y: 140 }} b={{ x: 606, y: 140 }} c={SOFT} sw={1.5} />
        <Line a={{ x: 498, y: 140 }} b={{ x: 498, y: 50 }} c={SOFT} sw={1.5} />
        <path d="M498 140 C530 120 560 70 606 52" fill="none" stroke={BLUE} strokeWidth={3} />
        <Rect x={20} y={206} w={600} h={62} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={228} bold s={12.5}>Dans l'ordre</Txt>
        <Note x={34} y={248}>Recadrer / redresser → calques de réglage (Niveaux, Courbes) → tampon et correcteur sur un calque séparé.</Note>
        <Note x={34} y={264}>Rester naturel · garder l'original · ne jamais tromper avec une retouche.</Note>
      </>
    ),
  },
  "va-1-7": {
    caption: "Texte lisible : contraste, hiérarchie et effets mesurés.",
    body: (
      <>
        <Photo x={20} y={20} w={280} h={190} />
        <Txt x={34} y={62} s={22} bold fill="#fff">Grand concert</Txt>
        <Txt x={34} y={86} s={13} fill="#fff">de louange · samedi 18 h</Txt>
        <Txt x={34} y={230} anchor="start" s={11.5} fill={RED} bold>✘ texte clair sur ciel clair : illisible</Txt>
        <Rect x={330} y={20} w={290} h={190} fill={DARK} stroke={DARK} r={4} />
        <rect x={330} y={20} width={290} height={190} fill="#000" opacity={0.2} />
        <Txt x={346} y={64} s={22} bold fill="#fff">Grand concert</Txt>
        <Txt x={346} y={88} s={13} fill="#fde68a">de louange · samedi 18 h</Txt>
        <Rect x={346} y={112} w={110} h={30} fill={ORANGE} stroke={ORANGE} r={15} />
        <Txt x={401} y={132} anchor="middle" bold s={12} fill="#fff">Réservez</Txt>
        <Txt x={346} y={230} s={11.5} fill={GREEN} bold>✔ calque sombre + ombre légère</Txt>
        <Rect x={20} y={246} w={600} h={28} fill={YELLOW} stroke={ORANGE} dash="5 4" r={6} />
        <Note x={34} y={265}>Panneau Caractère : police, taille, interlignage 110–130 % · Styles de calque : ombre, contour · marges de sécurité.</Note>
      </>
    ),
  },
  "va-1-8": {
    caption: "Les zones d'une affiche : du croquis au résultat.",
    body: (
      <>
        <Rect x={20} y={14} w={190} h={258} fill={PAPER} stroke={SOFT} sw={2} r={4} />
        <Rect x={32} y={26} w={166} h={30} fill={SKY} stroke={BLUE} r={4} />
        <Txt x={115} y={46} anchor="middle" s={12} bold>TITRE</Txt>
        <Rect x={32} y={64} w={166} h={104} fill={SUNK} stroke={LINE} dash="4 3" r={4} />
        <Txt x={115} y={120} anchor="middle" s={12} fill={SOFT}>IMAGE PRINCIPALE</Txt>
        <Rect x={32} y={176} w={166} h={46} fill={MINT} stroke={GREEN} r={4} />
        <Txt x={115} y={196} anchor="middle" s={11.5} bold>DATE · LIEU · HEURE</Txt>
        <Txt x={115} y={212} anchor="middle" s={10.5} fill={SOFT}>contact / lien</Txt>
        <Rect x={32} y={230} w={90} h={30} fill={ORANGE} stroke={ORANGE} r={15} />
        <Txt x={77} y={250} anchor="middle" s={11} bold fill="#fff">Réservez !</Txt>
        <Rect x={134} y={230} w={64} h={30} fill={PEACH} stroke={ORANGE} r={4} />
        <Txt x={166} y={250} anchor="middle" s={11}>LOGO</Txt>
        <Flow y={24} x0={236} w={384} h={44} items={[["Brief"], ["Croquis"], ["Création"], ["Export"]]} />
        <Rect x={236} y={92} w={384} h={176} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={250} y={114} bold s={12.5}>Format et réglages</Txt>
        <Note x={250} y={138}>Impression : A3 / A4 · 300 ppi · CMJN</Note>
        <Note x={250} y={158}>Réseaux : 1080 × 1080 · 72 ppi · RVB</Note>
        <Txt x={250} y={188} bold s={12.5}>Contrôle final</Txt>
        <Note x={250} y={210}>☑ orthographe, numéros, dates relus</Note>
        <Note x={250} y={230}>☑ avis d'une personne extérieure</Note>
        <Note x={250} y={250}>☑ PDF imprimeur + PNG réseaux + PSD gardé</Note>
      </>
    ),
  },
  "va-1-9": {
    caption: "L'interface d'Illustrator : formes, couleurs, alignement.",
    body: (
      <Screen title="Adobe Illustrator" color={ORANGE}>
        <Menu x={32} y={52} items={["Fichier", "Édition", "Objet", "Texte", "Sélection", "Affichage"]} color={ORANGE} />
        <Rect x={22} y={60} w={34} h={214} fill={DARK} stroke={DARK} r={0} />
        {["▶", "▭", "◯", "✎", "T", "✋"].map((t, i) => (
          <Txt key={t} x={30} y={84 + i * 30} s={15} fill="#fff">{t}</Txt>
        ))}
        <Rect x={72} y={70} w={340} h={196} fill={PAPER} stroke={SOFT} r={0} />
        <circle cx={160} cy={150} r={44} fill={YELLOW} stroke={ORANGE} strokeWidth={4} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i * 45 * Math.PI) / 180;
          return <polygon key={i} points={`${160 + Math.cos(a) * 54},${150 + Math.sin(a) * 54} ${160 + Math.cos(a + 0.2) * 74},${150 + Math.sin(a + 0.2) * 74} ${160 + Math.cos(a - 0.2) * 74},${150 + Math.sin(a - 0.2) * 74}`} fill={ORANGE} />;
        })}
        <Rect x={270} y={100} w={120} h={90} fill={BLUE} stroke={DARK} sw={3} r={6} />
        <Txt x={72} y={284} s={10.5} fill={SOFT}>Plan de travail</Txt>
        <Rect x={424} y={70} w={190} h={92} fill={PAPER} stroke={LINE} r={4} />
        <Txt x={434} y={88} bold s={11.5}>Nuancier</Txt>
        {[ORANGE, YELLOW, BLUE, GREEN, RED, DARK].map((c, i) => (
          <rect key={i} x={434 + i * 28} y={98} width={22} height={22} fill={c} />
        ))}
        <Note x={434} y={142}>Remplissage · contour · dégradé</Note>
        <Rect x={424} y={170} w={190} h={96} fill={PAPER} stroke={LINE} r={4} />
        <Txt x={434} y={188} bold s={11.5}>Aligner</Txt>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={434 + i * 30} y={200} width={22} height={16} rx={2} fill={SUNK} stroke={LINE} />
        ))}
        <Note x={434} y={242}>Ctrl+G grouper · V / A sélection</Note>
      </Screen>
    ),
  },
  "va-1-10": {
    caption: "La plume et Pathfinder : dessiner des courbes et combiner des formes.",
    body: (
      <>
        <path d="M40 150 C80 40 160 40 200 120 S300 190 330 90" fill="none" stroke={BLUE} strokeWidth={4} />
        {[[40, 150], [200, 120], [330, 90]].map(([x, y]) => (
          <rect key={x} x={x - 5} y={y - 5} width={10} height={10} fill={PAPER} stroke={RED} strokeWidth={2} />
        ))}
        <Line a={{ x: 200, y: 120 }} b={{ x: 150, y: 75 }} c={RED} sw={1.5} />
        <Line a={{ x: 200, y: 120 }} b={{ x: 250, y: 165 }} c={RED} sw={1.5} />
        <circle cx={150} cy={75} r={4} fill={RED} />
        <circle cx={250} cy={165} r={4} fill={RED} />
        <Txt x={20} y={200} bold s={12.5}>Plume (P)</Txt>
        <Note x={20} y={220}>clic = angle · clic-glissé = courbe</Note>
        <Note x={20} y={238}>poignées = courbure · A = ajuster les points</Note>
        <Note x={20} y={256}>peu de points = courbes propres</Note>
        <Txt x={400} y={30} bold s={12.5}>Pathfinder</Txt>
        {[
          { x: 380, t: "Union", draw: "u" },
          { x: 460, t: "Soustraction", draw: "s" },
          { x: 540, t: "Intersection", draw: "i" },
        ].map((p) => (
          <g key={p.t}>
            <circle cx={p.x + 22} cy={86} r={24} fill={p.draw === "s" ? "none" : BLUE} stroke={BLUE} strokeWidth={2} opacity={0.8} />
            <circle cx={p.x + 46} cy={86} r={24} fill={p.draw === "u" ? ORANGE : "none"} stroke={ORANGE} strokeWidth={2} opacity={0.8} />
            <Txt x={p.x + 34} y={134} anchor="middle" s={10.5} bold>{p.t}</Txt>
          </g>
        ))}
        <Rect x={380} y={160} w={240} h={100} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={392} y={182} bold s={12}>Un cœur = 2 cercles + 1 triangle</Txt>
        <Note x={392} y={204}>combinés avec Union</Note>
        <Note x={392} y={226}>Texte → Vectoriser le texte</Note>
        <Note x={392} y={246}>Tracé de l'image : dessins simples seulement</Note>
      </>
    ),
  },
  "va-1-11": {
    caption: "Un logo et ses déclinaisons.",
    body: (
      <>
        {[
          { x: 20, bg: PAPER, fg: ORANGE, t: "Couleur", tc: DARK },
          { x: 170, bg: PAPER, fg: DARK, t: "Noir et blanc", tc: DARK },
          { x: 320, bg: DARK, fg: "#fff", t: "Négatif", tc: "#fff" },
          { x: 470, bg: ORANGE, fg: "#fff", t: "Sur couleur", tc: "#fff" },
        ].map((v) => (
          <g key={v.t}>
            <Rect x={v.x} y={20} w={140} h={120} fill={v.bg} stroke={LINE} r={10} />
            <path d={`M${v.x + 38} 92 Q${v.x + 70} 52 ${v.x + 102} 92 Q${v.x + 70} 78 ${v.x + 38} 92 Z`} fill={v.fg} />
            <circle cx={v.x + 70} cy={50} r={9} fill={v.fg} />
            <Txt x={v.x + 70} y={118} anchor="middle" s={12} bold fill={v.tc}>LES CAHIERS</Txt>
            <Txt x={v.x + 70} y={160} anchor="middle" s={11.5} bold>{v.t}</Txt>
          </g>
        ))}
        <Rect x={20} y={184} w={290} h={86} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={206} bold s={12.5}>Un bon logo</Txt>
        <Note x={34} y={228}>simple · lisible petit et grand · adaptable · unique</Note>
        <Note x={34} y={248}>tester en noir et blanc, en petit, sur fond sombre</Note>
        <Rect x={330} y={184} w={290} h={86} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={344} y={206} bold s={12.5}>Fichiers à livrer</Txt>
        <Note x={344} y={228}>AI (source) · SVG · PDF · PNG transparent</Note>
        <Note x={344} y={248}>codes couleur RVB / CMJN · polices</Note>
      </>
    ),
  },
  "va-1-12": {
    caption: "Le mini-projet : l'identité, l'affiche et la version réseaux sociaux.",
    body: (
      <>
        <Flow y={20} items={[["Brief", "événement fictif"], ["Logo", "Illustrator"], ["Affiche A3", "Photoshop"], ["Version carrée", "réseaux sociaux"]]} h={66} />
        <Rect x={20} y={114} w={600} h={86} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={136} bold s={12.5}>Liste de contrôle</Txt>
        <Note x={34} y={158}>☑ format, résolution, mode de couleur · ☑ titre, date, lieu, contact, appel à l'action</Note>
        <Note x={34} y={178}>☑ texte relu, contraste, marges · ☑ fichiers sources et exports bien nommés</Note>
        <Rect x={20} y={216} w={600} h={54} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={34} y={238} bold s={12.5}>Présenter</Txt>
        <Note x={34} y={258}>Brief, choix de couleurs et de polices, versions testées, résultat final → portfolio.</Note>
      </>
    ),
  },
  // ───────────── Niveau 2 ─────────────
  "va-2-1": {
    caption: "La vidéo numérique : cadence, résolution, format et codec.",
    body: (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i}>
            <Rect x={20 + i * 76} y={20} w={66} h={46} fill={SKY} stroke={DARK} r={3} />
            <circle cx={40 + i * 76 + i * 3} cy={44} r={7} fill={ORANGE} />
          </g>
        ))}
        <Txt x={20} y={86} s={12} bold>Images par seconde : 24 (cinéma) · 25 (TV) · 30 (web) · 50-60 (ralentis)</Txt>
        <Txt x={20} y={116} bold s={12.5}>Résolutions</Txt>
        {[["HD", 1280, 720], ["Full HD", 1920, 1080], ["4K", 3840, 2160]].map(([t, w, h], i) => (
          <g key={t as string}>
            <Rect x={20 + i * 140} y={130 + (2 - i) * 6} w={(w as number) / 22} h={(h as number) / 22} fill={i === 1 ? MINT : PAPER} stroke={i === 1 ? GREEN : SOFT} sw={2} r={3} />
            <Txt x={26 + i * 140} y={150 + (2 - i) * 6 + (h as number) / 22 - 20} s={11.5} bold>{t as string}</Txt>
          </g>
        ))}
        {[["16:9", 64, 36], ["9:16", 36, 64], ["1:1", 48, 48]].map(([t, w, h], i) => (
          <g key={t as string}>
            <Rect x={470 + i * 54} y={130} w={(w as number) * 0.7} h={(h as number) * 0.7} fill={PEACH} stroke={ORANGE} sw={2} r={3} />
            <Txt x={470 + i * 54 + (w as number) * 0.35} y={200} anchor="middle" s={11} bold>{t as string}</Txt>
          </g>
        ))}
        <Rect x={20} y={216} w={600} h={54} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={238} bold s={12}>Conteneur : MP4, MOV · Codec : H.264 (diffusion), ProRes (montage)</Txt>
        <Note x={34} y={258}>Débit en Mb/s : plus il est haut, meilleure est la qualité et plus le fichier est lourd.</Note>
      </>
    ),
  },
  "va-2-2": {
    caption: "Valeurs de plan et éclairage à trois points.",
    body: (
      <>
        <Frame x={20} y={16} w={130} h={92} shot="large" label="Plan large" />
        <Frame x={170} y={16} w={130} h={92} shot="moyen" label="Plan moyen" />
        <Frame x={320} y={16} w={130} h={92} shot="gros" label="Gros plan" />
        <Rect x={470} y={16} w={150} h={92} fill={SUNK} stroke={LINE} r={6} />
        <Txt x={480} y={38} bold s={11.5}>Plans de coupe</Txt>
        <Note x={480} y={60}>mains, objets, lieu</Note>
        <Note x={480} y={78}>pour illustrer et</Note>
        <Note x={480} y={96}>masquer une coupure</Note>
        <Rect x={20} y={146} w={290} h={124} fill={PAPER} stroke={ORANGE} sw={2} r={8} />
        <circle cx={140} cy={226} r={14} fill={ORANGE} />
        <Txt x={140} y={252} anchor="middle" s={11}>sujet</Txt>
        <circle cx={80} cy={188} r={11} fill={YELLOW} stroke={ORANGE} strokeWidth={2} />
        <Txt x={80} y={176} anchor="middle" s={10.5} bold>Principale</Txt>
        <circle cx={200} cy={188} r={9} fill={SKY} stroke={BLUE} strokeWidth={2} />
        <Txt x={230} y={176} anchor="middle" s={10.5} bold>Remplissage</Txt>
        <circle cx={140} cy={166} r={9} fill={MINT} stroke={GREEN} strokeWidth={2} />
        <Txt x={140} y={160} anchor="middle" s={10.5} bold>Contre-jour</Txt>
        <Rect x={330} y={146} w={290} h={124} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={344} y={168} bold s={12.5}>Avant le montage</Txt>
        <Note x={344} y={190}>• cadrer avec la règle des tiers</Note>
        <Note x={344} y={210}>• trépied ou appui : image stable</Note>
        <Note x={344} y={230}>• micro près de la voix, casque</Note>
        <Note x={344} y={250}>• lumière naturelle près d'une fenêtre</Note>
      </>
    ),
  },
  "va-2-3": {
    caption: "L'interface d'un logiciel de montage.",
    body: (
      <Screen title="DaVinci Resolve — Montage" color={PURPLE}>
        <Rect x={22} y={34} w={150} h={116} fill={SUNK} stroke={LINE} r={0} />
        <Txt x={30} y={52} bold s={11}>Bibliothèque</Txt>
        {["📁 Plans", "📁 Interviews", "📁 Musique", "📁 Logos"].map((t, i) => (
          <Txt key={t} x={32} y={72 + i * 18} s={11}>{t}</Txt>
        ))}
        <Rect x={180} y={34} w={216} h={116} fill={DARK} stroke={DARK} r={0} />
        <Photo x={200} y={44} w={176} h={86} />
        <Txt x={288} y={142} anchor="middle" s={10} fill="#fff">Moniteur source</Txt>
        <Rect x={404} y={34} w={214} h={116} fill={DARK} stroke={DARK} r={0} />
        <Photo x={424} y={44} w={174} h={86} />
        <Txt x={511} y={142} anchor="middle" s={10} fill="#fff">Moniteur programme</Txt>
        <Rect x={22} y={158} w={596} h={116} fill={PAPER} stroke={LINE} r={0} />
        <Track x={26} y={166} w={588} label="V2" color={PURPLE} clips={[[40, 80, "Titre"], [300, 90, "Logo"]]} />
        <Track x={26} y={198} w={588} label="V1" color={BLUE} clips={[[0, 120, "Plan 1"], [124, 150, "Plan 2"], [278, 100, "Plan 3"], [382, 160, "Plan 4"]]} />
        <Track x={26} y={230} w={588} label="A1" color={GREEN} clips={[[0, 540, "Voix"]]} />
        <Line a={{ x: 220, y: 164 }} b={{ x: 220, y: 268 }} c={RED} sw={2} />
      </Screen>
    ),
  },
  "va-2-4": {
    caption: "Couper et assembler : dérusher, couper, refermer les trous.",
    body: (
      <>
        <Txt x={20} y={24} bold s={12.5}>Rush brut (5 minutes)</Txt>
        <Rect x={20} y={32} w={600} h={34} fill={SKY} stroke={BLUE} r={4} />
        {[[90, 60], [250, 40], [380, 80], [520, 50]].map(([x, w], i) => (
          <rect key={i} x={x} y={32} width={w} height={34} fill={GREEN} opacity={0.8} />
        ))}
        <Txt x={20} y={86} s={11.5} fill={SOFT}>vert = bons passages repérés par des marqueurs (silences et hésitations à couper)</Txt>
        <Arrow x1={320} y1={92} x2={320} y2={118} />
        <Txt x={20} y={138} bold s={12.5}>Timeline après coupe</Txt>
        <Rect x={20} y={146} w={600} h={34} fill={SUNK} stroke={LINE} r={4} />
        {[[24, 60], [90, 40], [136, 80], [222, 50]].map(([x, w], i) => (
          <g key={i}>
            <rect x={x} y={150} width={w} height={26} rx={3} fill={BLUE} />
            <Txt x={x + 6} y={168} s={10} fill="#fff" bold>{["Plan 1", "Plan 2", "Plan 3", "Plan 4"][i]}</Txt>
          </g>
        ))}
        <Rect x={20} y={206} w={290} h={64} fill={YELLOW} stroke={ORANGE} r={8} />
        <Txt x={34} y={228} bold s={12}>Outils</Txt>
        <Note x={34} y={248}>Lame (C / B) · suppression avec décalage · I et O</Note>
        <Note x={34} y={264}>Raccourcir en tirant le bord du clip.</Note>
        <Rect x={330} y={206} w={290} h={64} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={344} y={228} bold s={12}>Pistes</Txt>
        <Note x={344} y={248}>V1 plans · V2 titres · A1 voix · A2 musique</Note>
        <Note x={344} y={264}>Verrouiller une piste terminée.</Note>
      </>
    ),
  },
  "va-2-5": {
    caption: "Plans de coupe, L-cut et J-cut.",
    body: (
      <>
        <Txt x={20} y={24} bold s={12.5}>Plan de coupe sur une interview</Txt>
        <Track x={20} y={34} w={600} label="V2" color={ORANGE} clips={[[160, 130, "Coupe : élèves"]]} />
        <Track x={20} y={68} w={600} label="V1" color={BLUE} clips={[[0, 510, "Interview (la personne parle)"]]} />
        <Track x={20} y={102} w={600} label="A1" color={GREEN} clips={[[0, 510, "Voix de l'interview continue"]]} />
        <Txt x={20} y={162} bold s={12.5}>L-cut : le son continue après le changement d'image</Txt>
        <Track x={20} y={172} w={290} label="V" color={BLUE} clips={[[0, 100, "A"], [100, 150, "B"]]} />
        <Track x={20} y={204} w={290} label="A" color={GREEN} clips={[[0, 160, "Son de A"], [160, 90, "B"]]} />
        <Txt x={330} y={162} bold s={12.5}>J-cut : le son suivant démarre avant</Txt>
        <Track x={330} y={172} w={290} label="V" color={BLUE} clips={[[0, 130, "A"], [130, 120, "B"]]} />
        <Track x={330} y={204} w={290} label="A" color={GREEN} clips={[[0, 100, "A"], [100, 150, "Son de B"]]} />
        <Note x={20} y={254}>Raccord de mouvement · raccord de regard · règle des 180° · rythme varié avec des respirations.</Note>
      </>
    ),
  },
  "va-2-6": {
    caption: "Le son : niveaux, voix et musique.",
    body: (
      <>
        <Rect x={20} y={14} w={120} h={200} fill={DARK} stroke={DARK} r={6} />
        {[[-6, GREEN], [-12, GREEN], [-18, GREEN], [-24, "#eab308"], [0, RED]].map(([db], i) => (
          <Txt key={i} x={34} y={34 + i * 38} s={11} fill="#fff">{db as number} dB</Txt>
        ))}
        <rect x={100} y={30} width={26} height={170} fill="#111" />
        <rect x={100} y={90} width={26} height={110} fill={GREEN} />
        <rect x={100} y={58} width={26} height={32} fill="#eab308" />
        <Txt x={80} y={236} anchor="middle" s={11} bold fill={RED}>jamais au-dessus de 0 dB</Txt>
        <Txt x={170} y={24} bold s={12.5}>Mixage</Txt>
        <Track x={160} y={34} w={460} label="Voix" color={BLUE} clips={[[0, 90], [110, 70], [200, 120]]} />
        <Txt x={600} y={54} s={10} anchor="end" fill={SOFT}>−9 dB</Txt>
        <Track x={160} y={70} w={460} label="Musique" color={ORANGE} clips={[[0, 400]]} />
        <path d="M194 112 H252 L262 100 H340 L350 112 H420 L430 100 H554" fill="none" stroke={RED} strokeWidth={2} />
        <Note x={160} y={132}>↑ musique baissée automatiquement quand la voix parle (ducking)</Note>
        <Track x={160} y={142} w={460} label="Ambiance" color={GREEN} clips={[[0, 400]]} />
        <Rect x={160} y={186} w={460} h={84} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={174} y={208} bold s={12}>Voix off</Txt>
        <Note x={174} y={228}>pièce calme · 10–20 cm du micro · plusieurs prises</Note>
        <Note x={174} y={248}>réduction de bruit · égaliseur · compresseur (sans abuser)</Note>
        <Note x={174} y={264}>musique libre de droits uniquement</Note>
      </>
    ),
  },
  "va-2-7": {
    caption: "Titres, bandeaux et sous-titres dans la zone de sécurité.",
    body: (
      <>
        <Rect x={20} y={14} w={380} h={214} fill={SKY} stroke={DARK} sw={2} r={4} />
        <rect x={28} y={22} width={364} height={198} fill="none" stroke={RED} strokeWidth={1.5} strokeDasharray="5 4" />
        <circle cx={210} cy={96} r={34} fill={ORANGE} />
        <rect x={170} y={130} width={80} height={60} rx={8} fill={BLUE} />
        <Rect x={40} y={150} w={160} h={36} fill={DARK} stroke={DARK} r={3} />
        <Txt x={50} y={166} s={12} bold fill="#fff">Mme Kasongo</Txt>
        <Txt x={50} y={180} s={10} fill="#fde68a">Directrice de l'école</Txt>
        <Rect x={90} y={196} w={240} h={22} fill="#000" stroke="#000" r={3} />
        <Txt x={210} y={212} anchor="middle" s={11.5} fill="#fff">Nous avons ouvert la bibliothèque</Txt>
        <circle cx={364} cy={40} r={14} fill={PEACH} stroke={ORANGE} />
        <Txt x={364} y={44} anchor="middle" s={9} bold>LOGO</Txt>
        <Txt x={30} y={244} s={11} fill={RED}>--- zone de sécurité</Txt>
        <Rect x={420} y={14} w={200} h={214} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={432} y={38} bold s={12.5}>À retenir</Txt>
        <Note x={432} y={62}>• bandeau : nom + fonction</Note>
        <Note x={432} y={84}>• sous-titres : 1 à 2 lignes courtes</Note>
        <Note x={432} y={106}>• transcription auto → corriger</Note>
        <Note x={432} y={128}>• logo discret, opacité réduite</Note>
        <Note x={432} y={150}>• même police et mêmes couleurs</Note>
        <Note x={432} y={172}>• tester sur téléphone</Note>
        <Note x={432} y={194}>• enregistrer en modèle</Note>
        <Note x={20} y={270}>Beaucoup regardent sans le son : les sous-titres augmentent l'audience.</Note>
      </>
    ),
  },
  "va-2-8": {
    caption: "Transitions, images clés et fond vert.",
    body: (
      <>
        {[["Coupe", "A | B"], ["Fondu enchaîné", "A ⟶ B"], ["Fondu au noir", "A ▮"]].map(([t, s], i) => (
          <g key={t as string}>
            <Rect x={20 + i * 150} y={16} w={140} h={64} fill={PAPER} stroke={BLUE} sw={2} r={8} />
            <Txt x={90 + i * 150} y={42} anchor="middle" bold s={12.5}>{t as string}</Txt>
            <Txt x={90 + i * 150} y={64} anchor="middle" s={12} fill={SOFT}>{s as string}</Txt>
          </g>
        ))}
        <Rect x={476} y={16} w={144} h={64} fill={ROSE} stroke={RED} r={8} />
        <Txt x={548} y={42} anchor="middle" s={11.5} bold fill={RED}>À éviter</Txt>
        <Txt x={548} y={62} anchor="middle" s={10.5} fill={SOFT}>tourbillons, cubes 3D</Txt>
        <Rect x={20} y={100} w={290} h={170} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={122} bold s={12.5}>Images clés (keyframes)</Txt>
        <Line a={{ x: 40, y: 230 }} b={{ x: 290, y: 230 }} c={SOFT} sw={1.5} />
        <Line a={{ x: 40, y: 230 }} b={{ x: 40, y: 138 }} c={SOFT} sw={1.5} />
        <path d="M60 220 C120 220 160 150 270 150" fill="none" stroke={BLUE} strokeWidth={3} />
        <rect x={54} y={214} width={12} height={12} fill={ORANGE} transform="rotate(45 60 220)" />
        <rect x={264} y={144} width={12} height={12} fill={ORANGE} transform="rotate(45 270 150)" />
        <Note x={34} y={256}>2 images clés = un mouvement (zoom, position)</Note>
        <Rect x={330} y={100} w={290} h={170} fill={MINT} stroke={GREEN} r={8} />
        <Txt x={344} y={122} bold s={12.5}>Fond vert (chroma key)</Txt>
        <Rect x={344} y={134} w={120} h={90} fill={GREEN} stroke={GREEN} r={4} />
        <circle cx={404} cy={170} r={14} fill={ORANGE} />
        <rect x={388} y={184} width={32} height={40} rx={5} fill={BLUE} />
        <Arrow x1={470} y1={180} x2={498} y2={180} />
        <Photo x={502} y={134} w={108} h={90} />
        <circle cx={546} cy={176} r={11} fill={ORANGE} />
        <rect x={534} y={186} width={24} height={34} rx={4} fill={BLUE} />
        <Note x={344} y={248}>fond uni éclairé · éviter les vêtements verts</Note>
      </>
    ),
  },
  "va-2-9": {
    caption: "L'étalonnage : corriger puis donner une ambiance, avec des outils de contrôle.",
    body: (
      <>
        <g>
          <Photo x={20} y={16} w={160} h={112} />
          <rect x={20} y={16} width={160} height={112} fill="#1e3a8a" opacity={0.35} />
        </g>
        <Txt x={100} y={146} anchor="middle" bold s={12}>Avant : bleuté, sombre</Txt>
        <Arrow x1={186} y1={72} x2={214} y2={72} />
        <Photo x={218} y={16} w={160} h={112} />
        <Txt x={298} y={146} anchor="middle" bold s={12} fill={GREEN}>Après : équilibré</Txt>
        <Rect x={400} y={16} w={220} h={112} fill={DARK} stroke={DARK} r={6} />
        <Txt x={410} y={34} s={11} fill="#fff" bold>Forme d'onde</Txt>
        <path d="M410 110 L430 90 L470 96 L520 60 L560 70 L610 50" fill="none" stroke={GREEN} strokeWidth={2} />
        <path d="M410 116 L460 100 L520 80 L610 70" fill="none" stroke={GREEN} strokeWidth={1.5} opacity={0.6} />
        <Rect x={20} y={176} w={190} h={92} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={198} bold s={12}>Réglages</Txt>
        <Note x={34} y={218}>exposition · contraste</Note>
        <Note x={34} y={236}>balance des blancs</Note>
        <Note x={34} y={254}>saturation (sans exagérer)</Note>
        <Rect x={225} y={176} w={190} h={92} fill={YELLOW} stroke={ORANGE} r={8} />
        <Txt x={239} y={198} bold s={12}>Méthode</Txt>
        <Note x={239} y={218}>1 corriger → 2 harmoniser</Note>
        <Note x={239} y={236}>→ 3 style (LUT, ambiance)</Note>
        <Note x={239} y={254}>plan de référence</Note>
        <Rect x={430} y={176} w={190} h={92} fill={PAPER} stroke={LINE} r={8} />
        <Txt x={444} y={198} bold s={12}>Contrôles</Txt>
        <Note x={444} y={218}>histogramme · parade RVB</Note>
        <Note x={444} y={236}>vectoriscope : teintes de peau</Note>
        <Note x={444} y={254}>vérifier sur un téléphone</Note>
      </>
    ),
  },
  "va-2-10": {
    caption: "Une vidéo verticale : accroche, zone de sécurité et appel à l'action.",
    body: (
      <>
        <Rect x={40} y={10} w={150} h={262} fill={DARK} stroke={DARK} r={20} />
        <Rect x={48} y={22} w={134} h={238} fill={SKY} stroke={SKY} r={10} />
        <rect x={56} y={40} width={118} height={170} fill="none" stroke={RED} strokeWidth={1.5} strokeDasharray="4 3" />
        <circle cx={115} cy={110} r={26} fill={ORANGE} />
        <rect x={92} y={136} width={46} height={50} rx={6} fill={BLUE} />
        <Rect x={60} y={50} w={110} h={20} fill="#000" stroke="#000" r={3} />
        <Txt x={115} y={64} anchor="middle" s={10} fill="#fff" bold>Ça y est, on ouvre !</Txt>
        <Rect x={60} y={190} w={110} h={18} fill={ORANGE} stroke={ORANGE} r={9} />
        <Txt x={115} y={203} anchor="middle" s={9.5} fill="#fff" bold>Samedi 9 h</Txt>
        <Txt x={115} y={246} anchor="middle" s={9} fill={SOFT}>boutons de la plateforme</Txt>
        <Flow y={20} x0={230} w={390} h={50} items={[["0–3 s", "accroche"], ["Message", "un seul"], ["Fin", "action"]]} />
        <Rect x={230} y={92} w={390} h={178} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={244} y={114} bold s={12.5}>Réseaux sociaux</Txt>
        <Note x={244} y={138}>• vertical 9:16 : 1080 × 1920</Note>
        <Note x={244} y={158}>• sous-titres grands, dans la zone de sécurité</Note>
        <Note x={244} y={178}>• couper les silences, rythme rapide</Note>
        <Note x={244} y={198}>• musique libre de droits, voix claire</Note>
        <Note x={244} y={218}>• même identité visuelle (couleurs, logo)</Note>
        <Note x={244} y={238}>• vérifier les limites de durée actuelles</Note>
        <Note x={244} y={258}>• CapCut : modèles, sous-titres automatiques</Note>
      </>
    ),
  },
  "va-2-11": {
    caption: "Exporter : les bons réglages pour chaque plateforme.",
    body: (
      <>
        <Rect x={20} y={14} w={290} h={256} fill={PAPER} stroke={PURPLE} sw={2} r={8} />
        <Txt x={34} y={38} bold s={12.5}>Réglages d'export</Txt>
        {[["Format", "MP4"], ["Codec", "H.264"], ["Résolution", "1920 × 1080"], ["Cadence", "25 i/s"], ["Débit vidéo", "10 Mb/s"], ["Audio", "AAC 48 kHz"]].map(([a, b], i) => (
          <g key={a}>
            <Txt x={34} y={66 + i * 32} s={11.5} fill={SOFT}>{a}</Txt>
            <Rect x={140} y={50 + i * 32} w={156} h={24} fill={SUNK} stroke={LINE} r={4} />
            <Txt x={150} y={67 + i * 32} s={12} bold>{b}</Txt>
          </g>
        ))}
        {[["YouTube", "16:9 · Full HD ou 4K", BLUE], ["Réseaux courts", "9:16 · 1080 × 1920", ORANGE], ["WhatsApp", "léger : 720p ou 1080p", GREEN], ["Archive", "haute qualité gardée", PURPLE]].map(([t, s, c], i) => (
          <g key={t as string}>
            <Rect x={330} y={14 + i * 62} w={290} h={54} fill={PAPER} stroke={c as string} sw={2} r={8} />
            <Txt x={344} y={38 + i * 62} bold s={13} fill={c as string}>{t as string}</Txt>
            <Txt x={344} y={58 + i * 62} s={11} fill={SOFT}>{s as string}</Txt>
          </g>
        ))}
        <Note x={330} y={274}>Regarder l'export en entier avant de publier.</Note>
      </>
    ),
  },
  "va-2-12": {
    caption: "Le projet du niveau 2 : un film court de A à Z.",
    body: (
      <>
        <Flow y={16} items={[["Message", "1 phrase"], ["Tournage", "plans, son"], ["Montage", "rythme"], ["Finition", "son, couleur"], ["Export", "2 versions"]]} h={64} />
        <Rect x={20} y={104} w={290} h={166} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={126} bold s={12.5}>À livrer</Txt>
        <Note x={34} y={150}>• film de 2 à 3 minutes (16:9)</Note>
        <Note x={34} y={170}>• version verticale de 30 secondes</Note>
        <Note x={34} y={190}>• titres, sous-titres, logo</Note>
        <Note x={34} y={210}>• projet et rushes archivés</Note>
        <Note x={34} y={230}>• droits de la musique vérifiés</Note>
        <Rect x={330} y={104} w={290} h={166} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={344} y={126} bold s={12.5}>Liste de contrôle</Txt>
        <Note x={344} y={150}>☑ début accrocheur, fin claire</Note>
        <Note x={344} y={170}>☑ son sans saturation</Note>
        <Note x={344} y={190}>☑ couleurs harmonisées</Note>
        <Note x={344} y={210}>☑ titres lisibles</Note>
        <Note x={344} y={230}>☑ avis d'un spectateur extérieur</Note>
      </>
    ),
  },
  // ───────────── Niveau 3 ─────────────
  "va-3-1": {
    caption: "Un travail non destructif : masques, calques de réglage, objets dynamiques.",
    body: (
      <>
        <Rect x={20} y={14} w={200} h={140} fill={PAPER} stroke={SOFT} r={4} />
        <Photo x={30} y={24} w={90} h={120} />
        <Rect x={120} y={24} w={90} h={120} fill={PEACH} stroke={LINE} r={0} />
        <defs>
          <linearGradient id="va31" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
        </defs>
        <rect x={236} y={24} width={90} height={120} fill="url(#va31)" stroke={LINE} />
        <Txt x={281} y={160} anchor="middle" s={11} bold>masque en dégradé</Txt>
        <Arrow x1={226} y1={84} x2={232} y2={84} />
        <Txt x={120} y={172} anchor="middle" s={11.5} bold>deux images fondues</Txt>
        <Rect x={350} y={14} w={270} h={156} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={362} y={36} bold s={12.5}>Pile de calques</Txt>
        {[["Courbes (réglage) + masque", ORANGE], ["Photomontage — objet dynamique", BLUE], ["Ombre", DARK], ["Fond", GREEN]].map(([t, c], i) => (
          <g key={t as string}>
            <Rect x={362} y={46 + i * 28} w={246} h={24} fill={PAPER} stroke={c as string} r={3} />
            <Txt x={370} y={62 + i * 28} s={11}>{t as string}</Txt>
          </g>
        ))}
        <Rect x={20} y={192} w={600} h={78} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={34} y={214} bold s={12.5}>Non destructif = on peut toujours revenir en arrière</Txt>
        <Note x={34} y={236}>masque noir/blanc · calque de réglage · objet dynamique + filtre intelligent</Note>
        <Note x={34} y={256}>photomontage : même lumière, ombres cohérentes, couleurs harmonisées</Note>
      </>
    ),
  },
  "va-3-2": {
    caption: "Formats des visuels pour les réseaux sociaux.",
    body: (
      <>
        {[["Carré", "1080 × 1080", 100, 100], ["Portrait", "1080 × 1350", 90, 112], ["Story", "1080 × 1920", 66, 118], ["Miniature", "1280 × 720", 140, 80]].map(([t, s, w, h], i) => (
          <g key={t as string}>
            <Rect x={30 + i * 150} y={20 + (120 - (h as number)) / 2} w={w as number} h={h as number} fill={[SKY, MINT, PEACH, ROSE][i]} stroke={[BLUE, GREEN, ORANGE, RED][i]} sw={2} r={6} />
            <Txt x={30 + i * 150 + (w as number) / 2} y={160} anchor="middle" bold s={12.5}>{t as string}</Txt>
            <Txt x={30 + i * 150 + (w as number) / 2} y={178} anchor="middle" s={11} fill={SOFT}>{s as string}</Txt>
          </g>
        ))}
        <Rect x={20} y={198} w={290} h={72} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={220} bold s={12.5}>Un gabarit</Txt>
        <Note x={34} y={242}>mêmes couleurs, même police, un cadre photo</Note>
        <Note x={34} y={258}>décliné en carré, portrait et story</Note>
        <Rect x={330} y={198} w={290} h={72} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={344} y={220} bold s={12.5}>Publicité efficace</Txt>
        <Note x={344} y={242}>1 message · image forte · peu de texte</Note>
        <Note x={344} y={258}>tester 2 versions · mesurer les résultats</Note>
      </>
    ),
  },
  "va-3-3": {
    caption: "L'identité visuelle : logo, couleurs, polices, supports.",
    body: (
      <>
        <Rect x={20} y={14} w={160} h={120} fill={PAPER} stroke={SOFT} sw={2} r={8} />
        <circle cx={100} cy={58} r={22} fill={ORANGE} />
        <path d="M78 94 Q100 66 122 94 Q100 84 78 94 Z" fill={BLUE} />
        <Txt x={100} y={116} anchor="middle" bold s={12}>LES CAHIERS</Txt>
        <Rect x={196} y={14} w={160} h={120} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={208} y={36} bold s={12}>Palette</Txt>
        {[ORANGE, BLUE, YELLOW, DARK, "#fff"].map((c, i) => (
          <rect key={i} x={208 + i * 28} y={46} width={24} height={44} rx={4} fill={c} stroke={LINE} />
        ))}
        <Note x={208} y={112}>codes RVB et CMJN</Note>
        <Rect x={372} y={14} w={248} h={120} fill={PAPER} stroke={LINE} r={8} />
        <Txt x={384} y={44} s={26} bold>Aa</Txt>
        <Txt x={384} y={64} s={11.5} fill={SOFT}>Titres : police 1</Txt>
        <Txt x={470} y={44} s={20}>Aa</Txt>
        <Txt x={384} y={84} s={11.5} fill={SOFT}>Textes : police 2</Txt>
        <Note x={384} y={116}>2 polices avec licence adaptée</Note>
        <Rect x={20} y={150} w={110} h={64} fill={PAPER} stroke={SOFT} r={4} />
        <circle cx={44} cy={176} r={9} fill={ORANGE} />
        <Txt x={60} y={180} s={9.5} bold>Neema K.</Txt>
        <Txt x={30} y={198} s={8.5} fill={SOFT}>Carte de visite</Txt>
        <Rect x={146} y={150} w={92} h={64} fill={PAPER} stroke={SOFT} r={4} />
        <rect x={156} y={160} width={30} height={5} fill={ORANGE} />
        <rect x={156} y={172} width={70} height={4} fill={LINE} />
        <rect x={156} y={182} width={60} height={4} fill={LINE} />
        <Txt x={156} y={206} s={8.5} fill={SOFT}>Papier à en-tête</Txt>
        <Rect x={254} y={150} w={100} h={64} fill={ORANGE} stroke={ORANGE} r={4} />
        <Txt x={304} y={186} anchor="middle" s={11} bold fill="#fff">ENSEIGNE</Txt>
        <Rect x={372} y={150} w={248} h={64} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={384} y={172} bold s={12}>Charte graphique</Txt>
        <Note x={384} y={192}>logo, zone de protection, taille minimale,</Note>
        <Note x={384} y={208}>couleurs, polices, bons et mauvais usages</Note>
        <Note x={20} y={246}>Une identité cohérente inspire confiance : mêmes éléments sur tous les supports.</Note>
        <Note x={20} y={266}>Dans Illustrator : plusieurs plans de travail, couleurs globales, export séparé.</Note>
      </>
    ),
  },
  "va-3-4": {
    caption: "Fond perdu, traits de coupe et marge de sécurité.",
    body: (
      <>
        <Rect x={60} y={20} w={250} h={240} fill={PEACH} stroke={ORANGE} dash="5 4" r={0} />
        <Rect x={78} y={38} w={214} h={204} fill={SKY} stroke={BLUE} sw={2} r={0} />
        <Rect x={96} y={56} w={178} h={168} fill="none" stroke={GREEN} dash="4 3" r={0} />
        <Txt x={185} y={134} anchor="middle" bold s={13}>Texte important</Txt>
        <Txt x={185} y={152} anchor="middle" s={11} fill={SOFT}>dans la marge de sécurité</Txt>
        {[[78, 38], [292, 38], [78, 242], [292, 242]].map(([x, y], i) => (
          <g key={i}>
            <Line a={{ x: x - (i % 2 ? -8 : 8), y }} b={{ x: x - (i % 2 ? -22 : 22), y }} c={DARK} sw={1.5} />
            <Line a={{ x, y: y - (i < 2 ? 8 : -8) }} b={{ x, y: y - (i < 2 ? 22 : -22) }} c={DARK} sw={1.5} />
          </g>
        ))}
        <Rect x={340} y={20} w={280} h={78} fill={PEACH} stroke={ORANGE} r={8} />
        <Txt x={352} y={42} bold s={12.5} fill={ORANGE}>Fond perdu : 3 mm</Txt>
        <Note x={352} y={64}>le fond et les images débordent</Note>
        <Note x={352} y={82}>pour éviter un liseré blanc à la coupe</Note>
        <Rect x={340} y={108} w={280} h={64} fill={SKY} stroke={BLUE} r={8} />
        <Txt x={352} y={130} bold s={12.5} fill={BLUE}>Format fini + traits de coupe</Txt>
        <Note x={352} y={152}>l'imprimeur coupe à ces repères</Note>
        <Rect x={340} y={182} w={280} h={78} fill={MINT} stroke={GREEN} r={8} />
        <Txt x={352} y={204} bold s={12.5} fill={GREEN}>CMJN · 300 ppi · PDF</Txt>
        <Note x={352} y={226}>polices vectorisées ou incorporées</Note>
        <Note x={352} y={244}>BAT à valider avant le tirage</Note>
      </>
    ),
  },
  "va-3-5": {
    caption: "Un montage multicaméra : trois angles, un seul programme.",
    body: (
      <>
        <Frame x={20} y={16} w={130} h={86} shot="large" label="Caméra 1 · large" />
        <Frame x={170} y={16} w={130} h={86} shot="moyen" label="Caméra 2 · prédicateur" />
        <Frame x={320} y={16} w={130} h={86} shot="gros" label="Caméra 3 · chorale" />
        <Arrow x1={470} y1={60} x2={496} y2={60} />
        <Rect x={500} y={16} w={120} h={86} fill={DARK} stroke={DARK} r={4} />
        <Txt x={560} y={52} anchor="middle" s={12} bold fill="#fff">PROGRAMME</Txt>
        <Txt x={560} y={72} anchor="middle" s={10.5} fill="#fde68a">angle choisi</Txt>
        <Track x={20} y={136} w={600} label="Cam1" color={BLUE} clips={[[0, 100], [210, 120], [460, 100]]} />
        <Track x={20} y={170} w={600} label="Cam2" color={GREEN} clips={[[100, 110], [330, 130]]} />
        <Track x={20} y={204} w={600} label="Cam3" color={ORANGE} clips={[[0, 0], [430, 30]]} />
        <Track x={20} y={238} w={600} label="Son" color={PURPLE} clips={[[0, 540, "son commun : synchronisation"]]} />
        <Note x={20} y={284}>Synchroniser par le son · jouer le montage en temps réel · proxy pour rester fluide.</Note>
      </>
    ),
  },
  "va-3-6": {
    caption: "Titres animés : un mouvement qui accélère puis ralentit.",
    body: (
      <>
        <Rect x={20} y={14} w={330} h={150} fill={DARK} stroke={DARK} r={6} />
        {[0, 1, 2].map((i) => (
          <g key={i} opacity={0.35 + i * 0.3}>
            <Txt x={40 + i * 26} y={60 + i * 6} s={22} bold fill="#fff">Émission</Txt>
          </g>
        ))}
        <Rect x={40} y={110} w={200} h={30} fill={ORANGE} stroke={ORANGE} r={4} />
        <Txt x={50} y={130} s={12} bold fill="#fff">Invité : M. Kalala</Txt>
        <Arrow x1={300} y1={125} x2={262} y2={125} />
        <Rect x={370} y={14} w={250} h={150} fill={SUNK} stroke={LINE} r={6} />
        <Txt x={382} y={34} bold s={12}>Courbe d'accélération</Txt>
        <Line a={{ x: 384, y: 148 }} b={{ x: 606, y: 148 }} c={SOFT} sw={1.5} />
        <Line a={{ x: 384, y: 148 }} b={{ x: 384, y: 46 }} c={SOFT} sw={1.5} />
        <path d="M384 148 C440 148 460 54 606 54" fill="none" stroke={BLUE} strokeWidth={3} />
        <rect x={378} y={142} width={12} height={12} fill={ORANGE} transform="rotate(45 384 148)" />
        <rect x={600} y={48} width={12} height={12} fill={ORANGE} transform="rotate(45 606 54)" />
        <Rect x={20} y={186} w={290} h={84} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={34} y={208} bold s={12.5}>Bonnes pratiques</Txt>
        <Note x={34} y={230}>courtes et sobres · même style partout</Note>
        <Note x={34} y={248}>animer l'entrée ET la sortie</Note>
        <Note x={34} y={264}>caler sur le rythme de la voix ou de la musique</Note>
        <Rect x={330} y={186} w={290} h={84} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={344} y={208} bold s={12.5}>Éléments réutilisables</Txt>
        <Note x={344} y={230}>générique de 5 s · bandeau nom-fonction</Note>
        <Note x={344} y={248}>logo animé · export avec transparence (alpha)</Note>
        <Note x={344} y={264}>bibliothèque de modèles</Note>
      </>
    ),
  },
  "va-3-7": {
    caption: "Étalonnage avancé : courbes, masque local et suivi.",
    body: (
      <>
        <Rect x={20} y={14} w={170} h={150} fill={PAPER} stroke={LINE} r={6} />
        <Txt x={30} y={34} bold s={12}>Courbe en S</Txt>
        <Line a={{ x: 36, y: 148 }} b={{ x: 176, y: 148 }} c={SOFT} sw={1.5} />
        <Line a={{ x: 36, y: 148 }} b={{ x: 36, y: 44 }} c={SOFT} sw={1.5} />
        <Line a={{ x: 36, y: 148 }} b={{ x: 176, y: 44 }} c={LINE} sw={1} dash="4 3" />
        <path d="M36 148 C80 158 90 100 106 96 S150 40 176 44" fill="none" stroke={BLUE} strokeWidth={3} />
        <Frame x={210} y={14} w={180} h={150} shot="moyen" />
        <ellipse cx={300} cy={74} rx={32} ry={36} fill="none" stroke={RED} strokeWidth={2.5} strokeDasharray="6 3" />
        <Txt x={300} y={182} anchor="middle" bold s={12}>Masque doux sur le visage</Txt>
        <Rect x={410} y={14} w={210} h={150} fill={SUNK} stroke={LINE} r={6} />
        <Txt x={422} y={34} bold s={12}>Tracking</Txt>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={424 + i * 44} y={60 + (i % 2) * 8} width={32} height={40} rx={16} fill="none" stroke={RED} strokeWidth={2} strokeDasharray="4 2" />
            <circle cx={440 + i * 44} cy={78 + (i % 2) * 8} r={9} fill={ORANGE} />
          </g>
        ))}
        <Note x={422} y={132}>le masque suit le sujet</Note>
        <Note x={422} y={150}>corriger où le suivi dérape</Note>
        <Rect x={20} y={204} w={600} h={66} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={34} y={226} bold s={12.5}>Ordre et contrôle</Txt>
        <Note x={34} y={246}>correction primaire → harmonisation → style · par petites touches</Note>
        <Note x={34} y={262}>forme d'onde et vectoriscope · plusieurs écrans · version non étalonnée gardée</Note>
      </>
    ),
  },
  "va-3-8": {
    caption: "OBS Studio : scènes, sources et mixeur audio.",
    body: (
      <Screen title="OBS Studio" color={DARK}>
        <Rect x={22} y={34} w={380} h={170} fill="#111827" stroke="#111827" r={0} />
        <Rect x={44} y={48} w={336} h={142} fill={SKY} stroke={LINE} r={0} />
        <circle cx={212} cy={98} r={24} fill={ORANGE} />
        <rect x={190} y={122} width={44} height={50} rx={6} fill={BLUE} />
        <Rect x={50} y={150} w={120} h={34} fill={DARK} stroke={DARK} r={3} />
        <Txt x={58} y={170} s={11} bold fill="#fff">Mme Kasongo</Txt>
        <circle cx={350} cy={68} r={13} fill={PEACH} stroke={ORANGE} />
        <Rect x={22} y={210} w={190} h={64} fill={PAPER} stroke={LINE} r={0} />
        <Txt x={30} y={226} bold s={11}>Scènes</Txt>
        {["Accueil", "Interview", "Au revoir"].map((t, i) => (
          <Txt key={t} x={32} y={242 + i * 14} s={10.5} fill={i === 1 ? BLUE : INK_}>{t}</Txt>
        ))}
        <Rect x={212} y={210} w={190} h={64} fill={PAPER} stroke={LINE} r={0} />
        <Txt x={220} y={226} bold s={11}>Sources</Txt>
        {["Caméra", "Bandeau texte", "Logo"].map((t, i) => (
          <Txt key={t} x={222} y={242 + i * 14} s={10.5}>👁 {t}</Txt>
        ))}
        <Rect x={410} y={34} w={208} h={100} fill={PAPER} stroke={LINE} r={0} />
        <Txt x={420} y={52} bold s={11}>Mixeur audio</Txt>
        {[["Micro", 70], ["Musique", 38]].map(([t, w], i) => (
          <g key={t as string}>
            <Txt x={420} y={78 + i * 26} s={10.5}>{t as string}</Txt>
            <rect x={480} y={68 + i * 26} width={130} height={12} fill={SUNK} />
            <rect x={480} y={68 + i * 26} width={(w as number) * 1.3} height={12} fill={(w as number) > 60 ? "#eab308" : GREEN} />
          </g>
        ))}
        <Rect x={410} y={142} w={208} h={132} fill={PAPER} stroke={LINE} r={0} />
        <Pill x={422} y={152} w={184} fill={RED} stroke={RED}>▶ Démarrer le streaming</Pill>
        <Pill x={422} y={190} w={184} fill={SKY}>⏺ Démarrer l'enregistrement</Pill>
        <Pill x={422} y={228} w={184} fill={SUNK} stroke={SOFT}>Paramètres</Pill>
      </Screen>
    ),
  },
  "va-3-9": {
    caption: "Une régie vidéo : aperçu, programme et entrées.",
    body: (
      <>
        <Rect x={20} y={14} w={200} h={130} fill={DARK} stroke={GREEN} sw={3} r={4} />
        <Photo x={30} y={24} w={180} h={96} />
        <Txt x={120} y={136} anchor="middle" s={11} bold fill={GREEN}>APERÇU (prochain plan)</Txt>
        <Rect x={240} y={14} w={200} h={130} fill={DARK} stroke={RED} sw={3} r={4} />
        <Photo x={250} y={24} w={180} h={96} />
        <circle cx={420} cy={34} r={6} fill={RED} />
        <Txt x={340} y={136} anchor="middle" s={11} bold fill={RED}>PROGRAMME (en direct)</Txt>
        <Pill x={460} y={22} w={80} fill={SKY}>Coupe</Pill>
        <Pill x={550} y={22} w={70} fill={SKY}>Fondu</Pill>
        <Pill x={460} y={60} w={160} fill={PEACH} stroke={ORANGE}>Titre : nom du chanteur</Pill>
        <Pill x={460} y={98} w={160} fill={MINT} stroke={GREEN}>▶ Lancer la diffusion</Pill>
        {["Cam 1 large", "Cam 2 scène", "Cam 3 chorale", "Écran titres", "Attente"].map((t, i) => (
          <g key={t}>
            <Rect x={20 + i * 122} y={166} w={112} h={56} fill={i === 1 ? RED : PAPER} stroke={i === 1 ? RED : LINE} sw={2} r={6} />
            <Photo x={26 + i * 122} y={172} w={44} h={30} />
            <Txt x={75 + i * 122} y={190} s={10} bold fill={i === 1 ? "#fff" : INK_}>{t}</Txt>
          </g>
        ))}
        <Rect x={20} y={236} w={600} h={34} fill={YELLOW} stroke={ORANGE} dash="5 4" r={6} />
        <Note x={34} y={258}>Équipe : réalisateur · cadreurs · son · titres · interphonie · plan de secours (caméra de réserve, écran d'attente).</Note>
      </>
    ),
  },
  "va-3-10": {
    caption: "La chaîne d'un direct : du micro au spectateur, avec un plan B.",
    body: (
      <>
        <Flow y={20} items={[["Caméras", "+ micros"], ["Table de mixage", "son propre"], ["Ordinateur", "OBS / vMix"], ["Internet", "câble réseau"], ["Plateforme", "clé secrète"]]} h={64} />
        <Rect x={20} y={110} w={290} h={160} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={132} bold s={12.5}>Réglages</Txt>
        <Note x={34} y={156}>1080p à 30 i/s : ≈ 4 500 – 6 000 kb/s</Note>
        <Note x={34} y={176}>720p : ≈ 2 500 – 4 000 kb/s</Note>
        <Note x={34} y={196}>débit inférieur à l'envoi moins 30 %</Note>
        <Note x={34} y={216}>câble réseau plutôt que Wi-Fi</Note>
        <Note x={34} y={236}>ne jamais partager la clé de diffusion</Note>
        <Rect x={330} y={110} w={290} h={160} fill={ROSE} stroke={RED} r={8} />
        <Txt x={344} y={132} bold s={12.5} fill={RED}>Plan B</Txt>
        <Note x={344} y={156}>• partage de connexion du téléphone</Note>
        <Note x={344} y={176}>• enregistrement local en parallèle</Note>
        <Note x={344} y={196}>• écran d'attente prêt</Note>
        <Note x={344} y={216}>• test à la même heure, la veille</Note>
        <Note x={344} y={236}>• surveiller image, son, débit</Note>
      </>
    ),
  },
  "va-3-11": {
    caption: "Droits d'auteur, droit à l'image et relation avec le client.",
    body: (
      <>
        {[
          { x: 20, t: "Droits d'auteur", s: "musique, photo, police, logo", i: "©", c: BLUE, f: SKY },
          { x: 175, t: "Droit à l'image", s: "accord de la personne", i: "👤", c: GREEN, f: MINT },
          { x: 330, t: "Contrat", s: "droits cédés, délais", i: "📝", c: ORANGE, f: PEACH },
          { x: 485, t: "Confidentialité", s: "projets des clients", i: "🔒", c: RED, f: ROSE },
        ].map((k) => (
          <g key={k.t}>
            <Rect x={k.x} y={16} w={135} h={130} fill={k.f} stroke={k.c} sw={2} r={14} />
            <Txt x={k.x + 67} y={62} s={30} anchor="middle">{k.i}</Txt>
            <Txt x={k.x + 67} y={98} anchor="middle" bold s={13}>{k.t}</Txt>
            <Txt x={k.x + 67} y={120} anchor="middle" s={10} fill={SOFT}>{k.s}</Txt>
          </g>
        ))}
        <Flow y={168} items={[["Brief"], ["Devis"], ["Validation"], ["Livraison"]]} h={44} fill={YELLOW} stroke={ORANGE} />
        <Note x={20} y={240}>Musiques et images : libres de droits ou sous licence, conditions vérifiées.</Note>
        <Note x={20} y={258}>Mineurs : accord des parents · autorisation écrite simple · portfolio avec l'accord du client.</Note>
      </>
    ),
  },
  "va-3-12": {
    caption: "Le projet final : identité, film et direct.",
    body: (
      <>
        {[
          ["Identité", "logo, charte, affiche", ORANGE, PEACH],
          ["Visuels", "réseaux sociaux", BLUE, SKY],
          ["Film", "2 min, titres animés", PURPLE, "#ede9fe"],
          ["Direct", "OBS ou vMix", RED, ROSE],
          ["Dossier", "sources, licences", GREEN, MINT],
        ].map(([t, s, c, f], i) => (
          <g key={t as string}>
            <Rect x={20 + i * 122} y={20} w={112} h={130} fill={f as string} stroke={c as string} sw={2} r={14} />
            <Txt x={76 + i * 122} y={74} anchor="middle" bold s={13}>{t as string}</Txt>
            <Txt x={76 + i * 122} y={98} anchor="middle" s={10} fill={SOFT}>{s as string}</Txt>
          </g>
        ))}
        <Rect x={20} y={172} w={600} h={98} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={34} y={196} bold s={12.5}>À rendre</Txt>
        <Note x={34} y={218}>brief, planning, devis · fichiers sources et exports · charte et licences</Note>
        <Note x={34} y={238}>enregistrement du direct test · bilan : réussites, difficultés, améliorations</Note>
        <Note x={34} y={258}>Puis : portfolio en ligne, vrais petits projets, avis d'autres créateurs.</Note>
      </>
    ),
  },
};
