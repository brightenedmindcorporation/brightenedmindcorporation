import type { ReactNode } from "react";
import { BLUE, GREEN, INK, LINE, MINT, ORANGE, PAPER, PEACH, Pill, RED, ROSE, Rect, SKY, SOFT, SUNK, Txt, YELLOW, Line, Grid, Dot, Win, type Fig } from "../figureKit";

// Diagrams of the Logiciels de gestion course, keyed "lg-<level>-<lesson>".

const Box = ({ x, y, w, h, t, s, fill = SKY, stroke = BLUE, size = 13 }: { x: number; y: number; w: number; h: number; t: string; s?: string; fill?: string; stroke?: string; size?: number }) => (
  <g>
    <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={stroke} sw={2} r={10} />
    <Txt x={x + w / 2} y={y + (s ? h / 2 - 2 : h / 2 + 5)} anchor="middle" bold s={size}>{t}</Txt>
    {s && <Txt x={x + w / 2} y={y + h / 2 + 15} anchor="middle" s={10.5} fill={SOFT}>{s}</Txt>}
  </g>
);
const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => <Line a={{ x: x1, y: y1 }} b={{ x: x2, y: y2 }} c={RED} sw={2.5} arrow />;

/** A row of boxes joined by arrows. */
const Flow = ({ y, items, h = 54, x0 = 20, w = 600, fill = SKY, stroke = BLUE }: { y: number; items: [string, string?][]; h?: number; x0?: number; w?: number; fill?: string; stroke?: string }) => {
  const n = items.length;
  const gap = 22;
  const bw = (w - gap * (n - 1)) / n;
  return (
    <g>
      {items.map(([t, s], i) => (
        <g key={t}>
          <Box x={x0 + i * (bw + gap)} y={y} w={bw} h={h} t={t} s={s} fill={fill} stroke={stroke} size={bw < 100 ? 11.5 : 13} />
          {i < n - 1 && <Arrow x1={x0 + i * (bw + gap) + bw + 2} y1={y + h / 2} x2={x0 + (i + 1) * (bw + gap) - 2} y2={y + h / 2} />}
        </g>
      ))}
    </g>
  );
};
const Note = ({ x, y, children, anchor = "start" as "start" | "middle" | "end" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) => (
  <Txt x={x} y={y} s={12} fill={SOFT} anchor={anchor}>{children}</Txt>
);
const Screen = ({ title, color = BLUE, children }: { title: string; color?: string; children?: ReactNode }) => (
  <g>
    <Win x={20} y={8} w={600} h={268} title={title} color={color} />
    {children}
  </g>
);
const Menu = ({ x, y, items, color = BLUE }: { x: number; y: number; items: string[]; color?: string }) => (
  <g>
    {items.map((t, i) => (
      <Txt key={t} x={x + i * 78} y={y} s={11} fill={i === 1 ? color : SOFT} bold={i === 1}>{t}</Txt>
    ))}
  </g>
);
const Kanban = ({ cols, y = 40, h = 190 }: { cols: { t: string; cards: string[]; c: string }[]; y?: number; h?: number }) => {
  const w = (600 - 15 * (cols.length - 1)) / cols.length;
  return (
    <g>
      {cols.map((c, i) => (
        <g key={c.t}>
          <Rect x={20 + i * (w + 15)} y={y} w={w} h={h} fill={SUNK} stroke={LINE} r={8} />
          <Rect x={20 + i * (w + 15)} y={y} w={w} h={26} fill={c.c} stroke={c.c} r={8} />
          <Txt x={20 + i * (w + 15) + w / 2} y={y + 18} anchor="middle" bold s={12} fill="#fff">{c.t}</Txt>
          {c.cards.map((t, j) => (
            <g key={t}>
              <Rect x={28 + i * (w + 15)} y={y + 36 + j * 50} w={w - 16} h={42} fill={PAPER} stroke={LINE} r={6} />
              <Txt x={36 + i * (w + 15)} y={y + 54 + j * 50} s={11} bold>{t.split("|")[0]}</Txt>
              <Txt x={36 + i * (w + 15)} y={y + 70 + j * 50} s={10} fill={SOFT}>{t.split("|")[1] ?? ""}</Txt>
            </g>
          ))}
        </g>
      ))}
    </g>
  );
};

export const LOGICIELS_FIGS: Record<string, Fig> = {
  // ───────────── Niveau 1 ─────────────
  "lg-1-1": {
    caption: "Un ERP relie tous les modules dans une seule base de données.",
    body: (
      <>
        {[
          { x: 20, y: 20, t: "Ventes", c: BLUE },
          { x: 250, y: 12, t: "Achats", c: GREEN },
          { x: 480, y: 20, t: "Stock", c: ORANGE },
          { x: 20, y: 200, t: "Comptabilité", c: RED },
          { x: 250, y: 212, t: "CRM", c: BLUE },
          { x: 480, y: 200, t: "RH", c: GREEN },
        ].map((m) => (
          <g key={m.t}>
            <Line a={{ x: m.x + 70, y: m.y + 28 }} b={{ x: 320, y: 140 }} c={m.c} sw={2} dash="5 4" />
            <Rect x={m.x} y={m.y} w={140} h={56} fill={PAPER} stroke={m.c} sw={2} r={12} />
            <Txt x={m.x + 70} y={m.y + 33} anchor="middle" bold>{m.t}</Txt>
          </g>
        ))}
        <Rect x={240} y={100} w={160} h={80} fill={YELLOW} stroke={ORANGE} sw={2} r={40} />
        <Txt x={320} y={136} anchor="middle" bold>Base de</Txt>
        <Txt x={320} y={156} anchor="middle" bold>données</Txt>
        <Note x={320} y={284} anchor="middle">Une information saisie une seule fois sert à tous les modules.</Note>
      </>
    ),
  },
  "lg-1-2": {
    caption: "La partie double : chaque écriture touche deux comptes, débit = crédit.",
    body: (
      <>
        <Txt x={20} y={26} bold s={14}>Vente à crédit : 500 000 HT + TVA 16 %</Txt>
        {[
          { x: 20, t: "411 Clients", d: "580 000", c: "" },
          { x: 230, t: "701 Ventes", d: "", c: "500 000" },
          { x: 440, t: "4431 TVA facturée", d: "", c: "80 000" },
        ].map((a) => (
          <g key={a.t}>
            <Rect x={a.x} y={40} w={180} h={100} fill={PAPER} stroke={SOFT} r={4} />
            <Txt x={a.x + 90} y={60} anchor="middle" bold s={12}>{a.t}</Txt>
            <Line a={{ x: a.x, y: 68 }} b={{ x: a.x + 180, y: 68 }} c={SOFT} sw={1.5} />
            <Line a={{ x: a.x + 90, y: 68 }} b={{ x: a.x + 90, y: 140 }} c={SOFT} sw={1.5} />
            <Txt x={a.x + 45} y={86} anchor="middle" s={11} fill={SOFT}>Débit</Txt>
            <Txt x={a.x + 135} y={86} anchor="middle" s={11} fill={SOFT}>Crédit</Txt>
            <Txt x={a.x + 45} y={115} anchor="middle" bold fill={BLUE}>{a.d}</Txt>
            <Txt x={a.x + 135} y={115} anchor="middle" bold fill={GREEN}>{a.c}</Txt>
          </g>
        ))}
        <Txt x={320} y={170} anchor="middle" bold fill={RED}>580 000 débit = 500 000 + 80 000 crédit ✔</Txt>
        <Rect x={20} y={186} w={600} h={86} fill={SUNK} stroke={LINE} dash="5 4" />
        <Txt x={32} y={206} bold s={12}>Plan OHADA :</Txt>
        <Txt x={32} y={226} s={11.5}>1 Capitaux · 2 Immobilisations · 3 Stocks · 4 Tiers (401 fournisseurs, 411 clients)</Txt>
        <Txt x={32} y={246} s={11.5}>5 Trésorerie (521 banque, 571 caisse) · 6 Charges (601 achats) · 7 Produits (701 ventes)</Txt>
      </>
    ),
  },
  "lg-1-3": {
    caption: "Le cycle commercial : les documents de la vente et de l'achat.",
    body: (
      <>
        <Txt x={20} y={24} bold fill={BLUE}>VENTE</Txt>
        <Flow y={34} items={[["Devis"], ["Commande"], ["Livraison"], ["Facture"], ["Règlement"]]} />
        <Txt x={20} y={142} bold fill={GREEN}>ACHAT</Txt>
        <Flow y={152} items={[["Commande"], ["Réception"], ["Facture fourn."], ["Règlement"]]} fill={MINT} stroke={GREEN} />
        <Note x={20} y={240}>Avoir = facture négative qui corrige une facture. Relance = rappel après l'échéance.</Note>
        <Note x={20} y={262}>Le bon de livraison prouve la remise ; la facture demande le paiement.</Note>
      </>
    ),
  },
  "lg-1-4": {
    caption: "Une fiche client et une fiche produit complètes évitent les erreurs.",
    body: (
      <>
        <Rect x={20} y={14} w={290} h={250} fill={PAPER} stroke={BLUE} sw={2} r={10} />
        <Rect x={20} y={14} w={290} h={30} fill={BLUE} stroke={BLUE} r={10} />
        <Txt x={34} y={34} bold fill="#fff">Fiche client</Txt>
        {[["Nom", "École Bonne Étoile"], ["Code", "CU-0001"], ["Contact", "M. Kasongo"], ["Téléphone", "+243 …"], ["E-mail", "ecole@exemple.cd"], ["Paiement", "30 jours"], ["N° identif.", "RCCM / NIF"]].map(([a, b], i) => (
          <g key={a}>
            <Txt x={34} y={66 + i * 28} s={11.5} fill={SOFT}>{a}</Txt>
            <Rect x={118} y={52 + i * 28} w={180} h={22} fill={SUNK} stroke={LINE} r={4} />
            <Txt x={126} y={67 + i * 28} s={11.5}>{b}</Txt>
          </g>
        ))}
        <Rect x={330} y={14} w={290} h={250} fill={PAPER} stroke={ORANGE} sw={2} r={10} />
        <Rect x={330} y={14} w={290} h={30} fill={ORANGE} stroke={ORANGE} r={10} />
        <Txt x={344} y={34} bold fill="#fff">Fiche produit</Txt>
        {[["Référence", "CAH-A4-96"], ["Libellé", "Cahier A4 96 pages"], ["Prix achat", "2 000 FC"], ["Prix vente HT", "2 500 FC"], ["TVA", "16 %"], ["Unité", "pièce"], ["Stock mini", "100"]].map(([a, b], i) => (
          <g key={a}>
            <Txt x={344} y={66 + i * 28} s={11.5} fill={SOFT}>{a}</Txt>
            <Rect x={436} y={52 + i * 28} w={172} h={22} fill={SUNK} stroke={LINE} r={4} />
            <Txt x={444} y={67 + i * 28} s={11.5}>{b}</Txt>
          </g>
        ))}
      </>
    ),
  },
  "lg-1-5": {
    caption: "L'écran de Dolibarr : menu du haut, menu de gauche et tableau de bord.",
    body: (
      <Screen title="Dolibarr ERP & CRM" color="#2563eb">
        <Rect x={22} y={34} w={596} h={26} fill="#1e3a8a" stroke="#1e3a8a" r={0} />
        {["Accueil", "Tiers", "Produits", "Commercial", "Facturation", "Banque", "Projets"].map((t, i) => (
          <Txt key={t} x={32 + i * 80} y={52} s={11} fill="#fff" bold={i === 0}>{t}</Txt>
        ))}
        <Rect x={22} y={60} w={120} h={214} fill={SUNK} stroke={SUNK} r={0} />
        {["Propositions", "Commandes", "Expéditions", "Contrats", "Statistiques"].map((t, i) => (
          <Txt key={t} x={32} y={86 + i * 28} s={11.5} fill={SOFT}>{t}</Txt>
        ))}
        {[["Devis à traiter", "4", BLUE], ["Commandes à livrer", "2", ORANGE], ["Factures en retard", "5", RED]].map(([a, b, c], i) => (
          <g key={a as string}>
            <Rect x={160 + i * 152} y={76} w={140} h={74} fill={PAPER} stroke={c as string} sw={2} r={8} />
            <Txt x={170 + i * 152} y={98} s={11} fill={SOFT}>{a}</Txt>
            <Txt x={170 + i * 152} y={134} s={26} bold fill={c as string}>{b}</Txt>
          </g>
        ))}
        <Rect x={160} y={166} w={444} h={96} fill={PAPER} stroke={LINE} r={8} />
        <Txt x={172} y={186} bold s={12}>Configuration &gt; Modules</Txt>
        <Note x={172} y={208}>Activez seulement les modules utiles : Tiers, Produits, Propositions,</Note>
        <Note x={172} y={226}>Factures, Banque, Stocks. Puis renseignez la société (nom, logo, monnaie).</Note>
      </Screen>
    ),
  },
  "lg-1-6": {
    caption: "Créer un tiers : une fiche, des contacts, des produits.",
    body: (
      <>
        <Rect x={20} y={14} w={290} h={250} fill={PAPER} stroke={BLUE} sw={2} r={10} />
        <Txt x={34} y={38} bold>Tiers &gt; Nouveau tiers</Txt>
        {["Nom du tiers", "Nature : ☑ Client  ☐ Fournisseur", "Adresse, ville, pays", "TVA, conditions de règlement"].map((t, i) => (
          <g key={t}>
            <Rect x={34} y={52 + i * 36} w={262} h={28} fill={SUNK} stroke={LINE} r={4} />
            <Txt x={44} y={71 + i * 36} s={11.5}>{t}</Txt>
          </g>
        ))}
        <Pill x={34} y={210} w={110} fill={MINT} stroke={GREEN}>Créer</Pill>
        <Txt x={160} y={230} s={11} fill={SOFT}>→ code client CU2501-0001</Txt>
        <Grid x={330} y={14} cols={3} rows={4} cw={90} head={false} cells={[["Tiers", "Contact", "Ville"], ["École B. É.", "M. Kasongo", "Lubum."], ["Ets Mama", "Mme Neema", "Kolwezi"], ["Papeterie X", "M. Paul", "Lubum."]]} />
        <Note x={330} y={140}>Filtrer par ville, catégorie, nature…</Note>
        <Txt x={330} y={170} bold s={12}>Import CSV</Txt>
        <Note x={330} y={190}>Outils &gt; Import : charger des dizaines</Note>
        <Note x={330} y={208}>de fiches sans les saisir une à une.</Note>
        <Note x={330} y={236}>Vérifier les colonnes et les doublons.</Note>
      </>
    ),
  },
  "lg-1-7": {
    caption: "Un devis : lignes, remise et totaux calculés automatiquement.",
    body: (
      <>
        <Rect x={20} y={10} w={420} h={254} fill={PAPER} stroke={BLUE} sw={2} r={8} />
        <Txt x={34} y={32} bold>Proposition PR2501-0001 — École Bonne Étoile</Txt>
        <Rect x={34} y={42} w={392} h={24} fill={SKY} stroke={SKY} r={0} />
        {[["Produit", 34], ["Qté", 230], ["PU HT", 280], ["Total HT", 350]].map(([t, x]) => (
          <Txt key={t as string} x={x as number} y={59} s={11} bold>{t}</Txt>
        ))}
        {[["Cahier A4 96p", "200", "2 500", "500 000"], ["Stylo bleu", "100", "300", "30 000"], ["Règle 30 cm", "50", "600", "30 000"]].map((r, i) => (
          <g key={r[0]}>
            <Line a={{ x: 34, y: 72 + i * 28 }} b={{ x: 426, y: 72 + i * 28 }} c={LINE} sw={1} />
            <Txt x={34} y={90 + i * 28} s={11.5}>{r[0]}</Txt>
            <Txt x={230} y={90 + i * 28} s={11.5}>{r[1]}</Txt>
            <Txt x={280} y={90 + i * 28} s={11.5}>{r[2]}</Txt>
            <Txt x={350} y={90 + i * 28} s={11.5}>{r[3]}</Txt>
          </g>
        ))}
        <Txt x={270} y={190} s={12}>Total HT : 560 000</Txt>
        <Txt x={270} y={210} s={12}>TVA 16 % : 89 600</Txt>
        <Txt x={270} y={234} bold>Total TTC : 649 600 FC</Txt>
        <Flow y={20} x0={460} w={160} h={34} items={[["Brouillon"]]} />
        {["Valider", "Envoyer (PDF)", "Classer signé", "Créer commande", "Créer facture"].map((t, i) => (
          <Pill key={t} x={462} y={74 + i * 38} w={156} fill={i > 2 ? MINT : SKY} stroke={i > 2 ? GREEN : BLUE}>{t}</Pill>
        ))}
      </>
    ),
  },
  "lg-1-8": {
    caption: "Règlements : une facture, un ou plusieurs paiements, un compte de banque ou de caisse.",
    body: (
      <>
        <Rect x={20} y={14} w={190} h={110} fill={PAPER} stroke={BLUE} sw={2} r={8} />
        <Txt x={34} y={36} bold>Facture FA2501-0007</Txt>
        <Txt x={34} y={60} s={12}>Total : 649 600 FC</Txt>
        <Txt x={34} y={80} s={12} fill={GREEN}>Payé : 300 000 FC</Txt>
        <Txt x={34} y={100} s={12} fill={RED} bold>Reste : 349 600 FC</Txt>
        <Arrow x1={214} y1={70} x2={260} y2={70} />
        <Box x={264} y={30} w={170} h={80} t="Saisir règlement" s="virement · espèces · mobile" fill={YELLOW} stroke={ORANGE} />
        <Arrow x1={438} y1={70} x2={480} y2={70} />
        <Rect x={484} y={20} w={136} h={100} fill={PAPER} stroke={GREEN} sw={2} r={8} />
        <Txt x={552} y={42} anchor="middle" bold s={12}>Comptes</Txt>
        <Txt x={496} y={64} s={11.5}>🏦 Banque</Txt>
        <Txt x={496} y={84} s={11.5}>💵 Caisse</Txt>
        <Txt x={496} y={104} s={11.5}>📱 Mobile money</Txt>
        <Txt x={20} y={160} bold s={13}>Suivre les impayés</Txt>
        <Flow y={172} items={[["Échéance dépassée"], ["Relance"], ["Règlement"]]} h={44} fill={ROSE} stroke={RED} w={380} />
        <Note x={20} y={246}>Rapprochement bancaire : comparer le relevé de la banque avec les écritures du logiciel.</Note>
        <Pill x={420} y={176} w={200} fill={MINT} stroke={GREEN}>Facture payée ✔</Pill>
      </>
    ),
  },
  "lg-1-9": {
    caption: "Les achats : le même circuit que la vente, dans l'autre sens.",
    body: (
      <>
        <Flow y={20} items={[["Commande", "fournisseur"], ["Réception", "contrôle"], ["Facture", "fournisseur"], ["Règlement", "banque / caisse"]]} fill={MINT} stroke={GREEN} h={64} />
        <Rect x={20} y={110} w={290} h={150} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={34} y={134} bold s={13}>À la livraison, vérifier</Txt>
        <Note x={34} y={158}>• la quantité reçue = la quantité commandée</Note>
        <Note x={34} y={178}>• la qualité et l'état des produits</Note>
        <Note x={34} y={198}>• le total de la facture = la livraison</Note>
        <Note x={34} y={226}>Livraison partielle : ne valider que ce qui est reçu.</Note>
        <Rect x={330} y={110} w={290} h={150} fill={PAPER} stroke={ORANGE} sw={2} r={8} />
        <Txt x={344} y={134} bold s={13}>Effets dans le logiciel</Txt>
        <Note x={344} y={158}>Réception → le stock augmente</Note>
        <Note x={344} y={178}>Facture fournisseur → une dette</Note>
        <Note x={344} y={198}>Règlement → la dette est soldée</Note>
        <Note x={344} y={226}>Comparer plusieurs fournisseurs avant d'acheter.</Note>
      </>
    ),
  },
  "lg-1-10": {
    caption: "Le stock : entrées, sorties, seuil d'alerte et inventaire.",
    body: (
      <>
        <Box x={20} y={30} w={130} h={56} t="Achat" s="entrée +" fill={MINT} stroke={GREEN} />
        <Box x={20} y={110} w={130} h={56} t="Retour client" s="entrée +" fill={MINT} stroke={GREEN} />
        <Arrow x1={152} y1={58} x2={206} y2={110} />
        <Arrow x1={152} y1={138} x2={206} y2={128} />
        <Rect x={210} y={70} w={160} h={90} fill={YELLOW} stroke={ORANGE} sw={2} r={10} />
        <Txt x={290} y={100} anchor="middle" bold>Entrepôt</Txt>
        <Txt x={290} y={124} anchor="middle" s={22} bold fill={ORANGE}>312</Txt>
        <Txt x={290} y={146} anchor="middle" s={11} fill={SOFT}>stylos en stock</Txt>
        <Arrow x1={374} y1={110} x2={430} y2={58} />
        <Arrow x1={374} y1={128} x2={430} y2={138} />
        <Box x={434} y={30} w={130} h={56} t="Vente" s="sortie −" fill={ROSE} stroke={RED} />
        <Box x={434} y={110} w={130} h={56} t="Casse" s="sortie −" fill={ROSE} stroke={RED} />
        <Txt x={20} y={206} bold s={12}>Seuil d'alerte</Txt>
        <Rect x={130} y={192} w={300} h={18} fill={SUNK} stroke={LINE} r={9} />
        <Rect x={130} y={192} w={200} h={18} fill={GREEN} stroke={GREEN} r={9} />
        <Line a={{ x: 230, y: 186 }} b={{ x: 230, y: 216 }} c={RED} sw={3} />
        <Txt x={230} y={230} anchor="middle" s={11} fill={RED} bold>seuil : 100</Txt>
        <Note x={440} y={206}>Sous le seuil :</Note>
        <Note x={440} y={224}>produit à recommander.</Note>
        <Note x={20} y={262}>Inventaire : comparer le comptage réel au stock du logiciel, puis corriger et noter la cause.</Note>
      </>
    ),
  },
  "lg-1-11": {
    caption: "Le CRM : suivre les prospects et lire les indicateurs de la semaine.",
    body: (
      <>
        <Kanban
          y={14}
          h={160}
          cols={[
            { t: "Premier contact", c: BLUE, cards: ["École B. É.|2 000 000 FC", "Ets Mama|800 000 FC"] },
            { t: "Proposition", c: ORANGE, cards: ["Lycée Z|1 500 000 FC"] },
            { t: "Négociation", c: "#7c3aed", cards: ["Collège K|3 000 000 FC"] },
            { t: "Signé", c: GREEN, cards: ["Institut M|900 000 FC"] },
          ]}
        />
        {[["Devis en attente", "2", BLUE], ["Factures en retard", "4", RED], ["Ventes du mois", "8,5 M", GREEN]].map(([a, b, c], i) => (
          <g key={a as string}>
            <Rect x={20 + i * 205} y={190} w={190} h={66} fill={PAPER} stroke={c as string} sw={2} r={8} />
            <Txt x={32 + i * 205} y={212} s={11} fill={SOFT}>{a}</Txt>
            <Txt x={32 + i * 205} y={244} s={22} bold fill={c as string}>{b}</Txt>
          </g>
        ))}
        <Note x={20} y={278}>Agenda : un rappel pour chaque relance ; projets : tâches, responsables, échéances.</Note>
      </>
    ),
  },
  "lg-1-12": {
    caption: "Le mini-projet : une petite entreprise gérée de bout en bout.",
    body: (
      <>
        <Flow y={16} items={[["Société", "logo, monnaie"], ["Fiches", "clients, produits"], ["Ventes", "devis → paiement"], ["Achats", "commande → paiement"]]} h={62} />
        <Flow y={104} items={[["Stock", "inventaire"], ["Banque", "rapprochement"], ["Indicateurs", "tableau de bord"]]} h={62} fill={PEACH} stroke={ORANGE} w={420} />
        <Rect x={20} y={192} w={600} h={78} fill={SUNK} stroke={LINE} dash="5 4" />
        <Txt x={34} y={214} bold s={12.5}>Liste de contrôle</Txt>
        <Txt x={34} y={236} s={11.5}>☑ fiches sans doublon   ☑ factures avec la bonne TVA   ☑ paiements dans le bon compte</Txt>
        <Txt x={34} y={256} s={11.5}>☑ stock du logiciel = comptage réel   ☑ tout paiement saisi le jour même</Txt>
      </>
    ),
  },
  // ───────────── Niveau 2 ─────────────
  "lg-2-1": {
    caption: "Sage : un dossier, un exercice, un plan comptable, des utilisateurs.",
    body: (
      <Screen title="Sage — Comptabilité" color="#16a34a">
        <Menu x={32} y={52} items={["Fichier", "Saisie", "Traitement", "États", "Aide"]} color="#16a34a" />
        <Rect x={22} y={62} w={596} h={212} fill={SUNK} stroke={SUNK} r={0} />
        <Rect x={46} y={80} w={260} h={170} fill={PAPER} stroke={LINE} r={6} />
        <Txt x={60} y={102} bold s={12.5}>Nouveau dossier</Txt>
        {[["Société", "Boutique Neema"], ["Exercice", "01/01 → 31/12"], ["Plan comptable", "OHADA"], ["Monnaie", "FC"]].map(([a, b], i) => (
          <g key={a}>
            <Txt x={60} y={128 + i * 30} s={11} fill={SOFT}>{a}</Txt>
            <Rect x={150} y={114 + i * 30} w={142} h={22} fill={SUNK} stroke={LINE} r={4} />
            <Txt x={158} y={129 + i * 30} s={11}>{b}</Txt>
          </g>
        ))}
        <Rect x={330} y={80} w={270} h={80} fill={PAPER} stroke={LINE} r={6} />
        <Txt x={344} y={102} bold s={12.5}>Utilisateurs et droits</Txt>
        <Note x={344} y={124}>Neema : administratrice</Note>
        <Note x={344} y={144}>Comptable : saisie + états</Note>
        <Rect x={330} y={174} w={270} h={76} fill={YELLOW} stroke={ORANGE} r={6} />
        <Txt x={344} y={196} bold s={12.5}>Sauvegarde</Txt>
        <Note x={344} y={218}>avant toute opération importante</Note>
        <Note x={344} y={236}>et en fin de journée.</Note>
      </Screen>
    ),
  },
  "lg-2-2": {
    caption: "Paramétrage : journaux, comptes de tiers et codes de TVA.",
    body: (
      <>
        {[["ACH", "Achats", BLUE], ["VTE", "Ventes", GREEN], ["BQ", "Banque", ORANGE], ["CAI", "Caisse", RED], ["OD", "Opér. diverses", "#7c3aed"]].map(([c, t, col], i) => (
          <g key={c as string}>
            <Rect x={20 + i * 122} y={16} w={112} h={66} fill={PAPER} stroke={col as string} sw={2} r={10} />
            <Txt x={76 + i * 122} y={46} anchor="middle" s={20} bold fill={col as string}>{c}</Txt>
            <Txt x={76 + i * 122} y={68} anchor="middle" s={11} fill={SOFT}>{t}</Txt>
          </g>
        ))}
        <Rect x={20} y={104} w={290} h={150} fill={SKY} stroke={BLUE} r={8} />
        <Txt x={34} y={128} bold>411 Clients (collectif)</Txt>
        <Note x={44} y={152}>CLI-ECOLE   École Bonne Étoile</Note>
        <Note x={44} y={172}>CLI-MAMA    Ets Mama</Note>
        <Note x={44} y={192}>CLI-PARENT  Clients comptoir</Note>
        <Note x={34} y={226}>Total des auxiliaires = compte collectif.</Note>
        <Rect x={330} y={104} w={290} h={150} fill={MINT} stroke={GREEN} r={8} />
        <Txt x={344} y={128} bold>401 Fournisseurs (collectif)</Txt>
        <Note x={354} y={152}>FOU-PAPIER  Papeterie Centrale</Note>
        <Note x={354} y={172}>FOU-IMPORT  Import Kasai</Note>
        <Txt x={344} y={210} bold s={12}>Codes taxe</Txt>
        <Note x={344} y={232}>TVA 16 % ventes · TVA 16 % achats · exonéré 0 %</Note>
      </>
    ),
  },
  "lg-2-3": {
    caption: "Saisir une vente et un achat : les écritures avec la TVA.",
    body: (
      <>
        <Txt x={20} y={24} bold fill={GREEN}>Journal VTE — facture de vente</Txt>
        <Grid x={20} y={32} cols={4} rows={4} cw={140} ch={26} head={false} cells={[["Compte", "Libellé", "Débit", "Crédit"], ["411 CLI-ECOLE", "Facture 07", "580 000", ""], ["701", "Ventes marchandises", "", "500 000"], ["4431", "TVA facturée 16 %", "", "80 000"]]} />
        <Txt x={20} y={156} bold fill={BLUE}>Journal ACH — facture d'achat</Txt>
        <Grid x={20} y={164} cols={4} rows={4} cw={140} ch={26} head={false} cells={[["Compte", "Libellé", "Débit", "Crédit"], ["601", "Achats marchandises", "300 000", ""], ["4452", "TVA récupérable 16 %", "48 000", ""], ["401 FOU-PAPIER", "Facture A-112", "", "348 000"]]} />
        <Note x={20} y={284}>Débit = crédit avant d'enregistrer. Toujours indiquer le numéro de la pièce.</Note>
      </>
    ),
  },
  "lg-2-4": {
    caption: "Banque et caisse : encaissements et décaissements.",
    body: (
      <>
        {[
          { x: 20, t: "Encaissement (virement)", d: "521 Banque  580 000", c: "411 Client  580 000", col: GREEN },
          { x: 330, t: "Paiement en caisse", d: "6… Charge  25 000", c: "571 Caisse  25 000", col: RED },
        ].map((e) => (
          <g key={e.t}>
            <Rect x={e.x} y={14} w={290} h={110} fill={PAPER} stroke={e.col} sw={2} r={10} />
            <Txt x={e.x + 14} y={36} bold s={12.5}>{e.t}</Txt>
            <Txt x={e.x + 14} y={64} s={11.5} fill={BLUE}>Débit  : {e.d}</Txt>
            <Txt x={e.x + 14} y={88} s={11.5} fill={GREEN}>Crédit : {e.c}</Txt>
            <Txt x={e.x + 14} y={112} s={10.5} fill={SOFT}>Référence : n° de la facture réglée</Txt>
          </g>
        ))}
        <Rect x={20} y={140} w={290} h={124} fill={YELLOW} stroke={ORANGE} r={10} />
        <Txt x={34} y={162} bold s={12.5}>Arrêté de caisse</Txt>
        <Note x={34} y={186}>Argent compté : 124 000 FC</Note>
        <Note x={34} y={206}>Solde du logiciel : 120 000 FC</Note>
        <Txt x={34} y={232} bold s={12} fill={RED}>Écart 4 000 → à expliquer</Txt>
        <Rect x={330} y={140} w={290} h={124} fill={SUNK} stroke={LINE} r={10} />
        <Txt x={344} y={162} bold s={12.5}>Règles d'or</Txt>
        <Note x={344} y={186}>• Le solde de caisse n'est jamais négatif</Note>
        <Note x={344} y={206}>• Pas de dépense sans reçu</Note>
        <Note x={344} y={226}>• Frais bancaires et mobile money saisis</Note>
        <Note x={344} y={246}>• Garder les messages de confirmation</Note>
      </>
    ),
  },
  "lg-2-5": {
    caption: "Lettrage et rapprochement bancaire.",
    body: (
      <>
        <Txt x={20} y={22} bold>Lettrage du compte CLI-ECOLE</Txt>
        <Grid x={20} y={30} cols={4} rows={3} cw={140} ch={26} head={false} hi={[[1, 3], [2, 3]]} hiFill={MINT} cells={[["Date", "Pièce", "Montant", "Lettre"], ["02/03", "Facture 07", "580 000 D", "A"], ["20/03", "Virement", "580 000 C", "A"]]} />
        <Note x={20} y={132}>Même lettre = facture réglée. Sans lettre = reste dû.</Note>
        <Txt x={20} y={162} bold>Rapprochement bancaire</Txt>
        <Rect x={20} y={172} w={290} h={96} fill={PAPER} stroke={BLUE} sw={2} r={8} />
        <Txt x={34} y={194} bold s={12}>Relevé de la banque</Txt>
        <Note x={34} y={216}>✔ Virement école  +580 000</Note>
        <Note x={34} y={236}>✔ Paiement fournisseur  −348 000</Note>
        <Txt x={34} y={256} s={11.5} fill={RED}>✘ Frais de compte  −5 000</Txt>
        <Rect x={330} y={172} w={290} h={96} fill={PAPER} stroke={GREEN} sw={2} r={8} />
        <Txt x={344} y={194} bold s={12}>Compte 521 du logiciel</Txt>
        <Note x={344} y={216}>✔ Virement école  +580 000</Note>
        <Note x={344} y={236}>✔ Paiement fournisseur  −348 000</Note>
        <Txt x={344} y={256} s={11.5} fill={RED}>→ saisir les frais manquants</Txt>
      </>
    ),
  },
  "lg-2-6": {
    caption: "Les états : la balance et la balance âgée.",
    body: (
      <>
        <Txt x={20} y={22} bold>Balance</Txt>
        <Grid x={20} y={30} cols={4} rows={5} cw={110} ch={24} head={false} cells={[["Compte", "Débit", "Crédit", "Solde"], ["411 Clients", "1 160 000", "580 000", "580 000 D"], ["521 Banque", "580 000", "353 000", "227 000 D"], ["701 Ventes", "", "1 000 000", "1 000 000 C"], ["Totaux", "…", "…", "= ="]]} hi={[[4, 1], [4, 2], [4, 3]]} hiFill={MINT} />
        <Txt x={20} y={176} bold>Balance âgée des clients</Txt>
        {[["Non échu", 150, GREEN], ["< 30 j", 90, BLUE], ["30-60 j", 60, ORANGE], ["> 60 j", 40, RED]].map(([t, w, c], i) => (
          <g key={t as string}>
            <Txt x={20} y={202 + i * 24} s={11.5}>{t}</Txt>
            <rect x={96} y={190 + i * 24} width={(w as number) * 3} height={16} rx={4} fill={c as string} />
            <Txt x={100 + (w as number) * 3} y={203 + i * 24} s={11} fill={SOFT}>{w as number} 000</Txt>
          </g>
        ))}
        <Note x={420} y={206}>Les retards de plus de 60 jours</Note>
        <Note x={420} y={224}>sont à relancer en priorité.</Note>
      </>
    ),
  },
  "lg-2-7": {
    caption: "Amortissement linéaire : un bien perd sa valeur par parts égales.",
    body: (
      <>
        <Txt x={20} y={26} bold>Ordinateur : 3 000 000 FC sur 5 ans = 600 000 FC par an</Txt>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={60 + i * 110} y={50} width={90} height={120} rx={4} fill={PEACH} stroke={ORANGE} />
            <rect x={60 + i * 110} y={50} width={90} height={120 - (120 / 5) * (i + 1)} fill={SKY} />
            <Txt x={105 + i * 110} y={190} anchor="middle" s={11.5} bold>Année {i + 1}</Txt>
            <Txt x={105 + i * 110} y={206} anchor="middle" s={10.5} fill={SOFT}>VNC {(3000 - 600 * (i + 1)).toLocaleString("fr-FR")} k</Txt>
          </g>
        ))}
        <Note x={20} y={238}>Dotation aux amortissements (charge, classe 6) / Amortissement du matériel (classe 2).</Note>
        <Note x={20} y={258}>VNC = valeur nette comptable = prix d'achat − amortissements cumulés.</Note>
        <Note x={20} y={278}>Clôture : pièces saisies, lettrées, rapprochées, balance équilibrée, période verrouillée.</Note>
      </>
    ),
  },
  "lg-2-8": {
    caption: "La gestion commerciale alimente la comptabilité.",
    body: (
      <>
        <Rect x={20} y={14} w={290} h={150} fill={SKY} stroke={BLUE} sw={2} r={10} />
        <Txt x={34} y={36} bold fill={BLUE}>Gestion commerciale</Txt>
        <Flow y={50} x0={34} w={262} h={34} items={[["Devis"], ["Livraison"], ["Facture"]]} />
        <Note x={34} y={112}>Articles, tarifs, stocks par dépôt.</Note>
        <Note x={34} y={134}>Le stock baisse à la livraison.</Note>
        <Arrow x1={314} y1={90} x2={346} y2={90} />
        <Txt x={330} y={78} anchor="middle" s={10} fill={RED} bold>transfert</Txt>
        <Rect x={350} y={14} w={270} h={150} fill={MINT} stroke={GREEN} sw={2} r={10} />
        <Txt x={364} y={36} bold fill={GREEN}>Comptabilité</Txt>
        <Note x={364} y={62}>411 Clients        580 000  D</Note>
        <Note x={364} y={82}>701 Ventes         500 000  C</Note>
        <Note x={364} y={102}>4431 TVA facturée   80 000  C</Note>
        <Note x={364} y={134}>Écritures générées automatiquement.</Note>
        <Rect x={20} y={184} w={600} h={80} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={34} y={208} bold s={12.5}>Après le transfert</Txt>
        <Note x={34} y={230}>Contrôler : ventes de la gestion commerciale = ventes de la balance.</Note>
        <Note x={34} y={250}>Ne jamais saisir deux fois la même opération.</Note>
      </>
    ),
  },
  "lg-2-9": {
    caption: "Odoo : les applications partagent la même base de données.",
    body: (
      <>
        {[
          ["Ventes", BLUE], ["Achats", GREEN], ["Inventaire", ORANGE], ["Facturation", RED],
          ["CRM", "#7c3aed"], ["Employés", GREEN], ["Projet", BLUE], ["Site web", ORANGE],
        ].map(([t, c], i) => (
          <g key={t as string}>
            <Rect x={30 + (i % 4) * 150} y={20 + Math.floor(i / 4) * 90} w={130} h={74} fill={PAPER} stroke={c as string} sw={2} r={14} />
            <circle cx={95 + (i % 4) * 150} cy={46 + Math.floor(i / 4) * 90} r={14} fill={c as string} opacity={0.2} />
            <Txt x={95 + (i % 4) * 150} y={82 + Math.floor(i / 4) * 90} anchor="middle" bold s={12.5}>{t as string}</Txt>
          </g>
        ))}
        <Rect x={20} y={206} w={600} h={62} fill={SUNK} stroke={LINE} dash="5 4" r={8} />
        <Txt x={34} y={228} bold s={12}>Interface</Txt>
        <Note x={34} y={250}>Menu principal (applications) · barre de recherche · vues liste, kanban, graphique · chatter = historique.</Note>
      </>
    ),
  },
  "lg-2-10": {
    caption: "Une vente dans Odoo : du devis au paiement.",
    body: (
      <>
        <Flow y={18} items={[["Devis", "brouillon"], ["Bon de commande", "confirmé"], ["Livraison", "Inventaire"], ["Facture", "validée"], ["Payée", "paiement"]]} h={66} />
        <Rect x={20} y={110} w={290} h={150} fill={PAPER} stroke={BLUE} sw={2} r={8} />
        <Txt x={34} y={132} bold s={12.5}>Ventes &gt; Devis &gt; Nouveau</Txt>
        <Note x={34} y={154}>Client · lignes (produit, qté, prix, remise)</Note>
        <Note x={34} y={174}>Envoyer par e-mail ou aperçu client</Note>
        <Pill x={34} y={190} w={130} fill={MINT} stroke={GREEN}>Confirmer</Pill>
        <Pill x={174} y={190} w={130} fill={SKY}>Créer facture</Pill>
        <Rect x={330} y={110} w={290} h={150} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={344} y={132} bold s={12.5}>Suivre les ventes</Txt>
        <Note x={344} y={154}>Rapport : chiffre d'affaires par client,</Note>
        <Note x={344} y={172}>produit et période.</Note>
        <Note x={344} y={198}>Avoir = correction d'une facture validée.</Note>
        <Note x={344} y={218}>Chatter = historique de tous les envois.</Note>
      </>
    ),
  },
  "lg-2-11": {
    caption: "Achats et inventaire dans Odoo.",
    body: (
      <>
        <Flow y={16} items={[["Demande de prix"], ["Commande"], ["Réception"], ["Facture fournisseur"]]} fill={MINT} stroke={GREEN} h={50} />
        <Rect x={20} y={92} w={290} h={172} fill={PAPER} stroke={ORANGE} sw={2} r={8} />
        <Txt x={34} y={114} bold s={12.5}>Réception partielle</Txt>
        <Note x={34} y={138}>Commandé : 500 cahiers</Note>
        <Note x={34} y={158}>Reçu : 450 → stock +450</Note>
        <Txt x={34} y={184} s={12} fill={RED} bold>Reliquat : 50 à recevoir</Txt>
        <Note x={34} y={214}>Ajustement d'inventaire :</Note>
        <Note x={34} y={232}>corriger après comptage, avec une raison.</Note>
        <Rect x={330} y={92} w={290} h={172} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={344} y={114} bold s={12.5}>Stock</Txt>
        {[["Réel", 62], ["Prévisionnel", 48]].map(([t, w], i) => (
          <g key={t as string}>
            <Txt x={344} y={142 + i * 32} s={11.5}>{t as string}</Txt>
            <rect x={430} y={130 + i * 32} width={(w as number) * 3} height={16} rx={4} fill={i ? ORANGE : BLUE} />
          </g>
        ))}
        <Note x={344} y={212}>Valorisation = quantité × coût</Note>
        <Note x={344} y={232}>(prix standard, coût moyen, PEPS).</Note>
      </>
    ),
  },
  "lg-2-12": {
    caption: "Le projet du niveau 2 : la même société dans Sage et dans Odoo.",
    body: (
      <>
        <Rect x={20} y={14} w={290} h={190} fill={MINT} stroke={GREEN} sw={2} r={10} />
        <Txt x={34} y={38} bold fill={GREEN} s={14}>Sage — comptabilité</Txt>
        {["Dossier, plan, journaux, tiers", "20 écritures saisies", "Lettrage + rapprochement", "Balance et balance âgée"].map((t, i) => (
          <Note key={t} x={34} y={66 + i * 30}>☑ {t}</Note>
        ))}
        <Rect x={330} y={14} w={290} h={190} fill={SKY} stroke={BLUE} sw={2} r={10} />
        <Txt x={344} y={38} bold fill={BLUE} s={14}>Odoo — ERP</Txt>
        {["Vente complète", "Achat complet", "Ajustement d'inventaire", "Rapport des ventes"].map((t, i) => (
          <Note key={t} x={344} y={66 + i * 30}>☑ {t}</Note>
        ))}
        <Arrow x1={312} y1={110} x2={328} y2={110} />
        <Rect x={20} y={222} w={600} h={48} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={320} y={252} anchor="middle" bold s={12.5}>Les ventes et les achats doivent être cohérents entre les deux logiciels.</Txt>
      </>
    ),
  },
  // ───────────── Niveau 3 ─────────────
  "lg-3-1": {
    caption: "Odoo comptabilité : facture, paiement, rapprochement.",
    body: (
      <>
        <Flow y={18} items={[["Facture", "validée"], ["Écritures", "automatiques"], ["Paiement", "journal banque"], ["Rapprochement", "relevé ↔ paiement"]]} h={66} />
        <Rect x={20} y={110} w={290} h={150} fill={PAPER} stroke={BLUE} sw={2} r={8} />
        <Txt x={34} y={132} bold s={12.5}>Paramètres à contrôler</Txt>
        <Note x={34} y={156}>• Pays → plan comptable et taxes</Note>
        <Note x={34} y={176}>• Taxe 16 % ventes / achats</Note>
        <Note x={34} y={196}>• Condition de paiement : 30 jours</Note>
        <Note x={34} y={216}>• Position fiscale (exonéré, étranger)</Note>
        <Rect x={330} y={110} w={290} h={150} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={344} y={132} bold s={12.5}>Rapports</Txt>
        <Note x={344} y={156}>Balance · grand livre</Note>
        <Note x={344} y={176}>Balance âgée clients / fournisseurs</Note>
        <Note x={344} y={196}>Rapport de TVA</Note>
        <Note x={344} y={222}>Totaux des rapports = totaux des factures.</Note>
      </>
    ),
  },
  "lg-3-2": {
    caption: "Le pipeline du CRM d'Odoo.",
    body: (
      <>
        <Kanban
          y={14}
          h={196}
          cols={[
            { t: "Nouveau", c: BLUE, cards: ["École A|1,2 M · 10 %", "École B|0,8 M · 10 %"] },
            { t: "Qualifié", c: ORANGE, cards: ["Lycée C|2 M · 30 %", "Collège D|1 M · 30 %"] },
            { t: "Proposition", c: "#7c3aed", cards: ["Institut E|3 M · 60 %"] },
            { t: "Gagné", c: GREEN, cards: ["Ecole F|0,9 M · 100 %"] },
          ]}
        />
        <Txt x={20} y={236} bold s={12}>CA prévisionnel pondéré = Σ montant × probabilité</Txt>
        <Note x={20} y={258}>Activités planifiées (appel, e-mail, réunion) · raison de perte notée · taux de conversion.</Note>
      </>
    ),
  },
  "lg-3-3": {
    caption: "Ressources humaines : organigramme, congés et présences.",
    body: (
      <>
        <Box x={250} y={14} w={140} h={44} t="Directrice" s="Neema" fill={YELLOW} stroke={ORANGE} />
        {[
          { x: 60, t: "Vente", s: "Paul" },
          { x: 250, t: "Stock", s: "Rose" },
          { x: 440, t: "Compta", s: "David" },
        ].map((e) => (
          <g key={e.t}>
            <Line a={{ x: 320, y: 58 }} b={{ x: e.x + 70, y: 90 }} />
            <Box x={e.x} y={90} w={140} h={44} t={e.t} s={e.s} />
          </g>
        ))}
        <Rect x={20} y={156} w={290} h={110} fill={PAPER} stroke={GREEN} sw={2} r={8} />
        <Txt x={34} y={178} bold s={12.5}>Congés</Txt>
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={34 + i * 19} y={192} width={16} height={16} rx={3} fill={[3, 4, 5, 9].includes(i) ? ORANGE : SUNK} stroke={LINE} />
        ))}
        <Note x={34} y={232}>Demande → accord du responsable</Note>
        <Note x={34} y={250}>→ le solde se met à jour.</Note>
        <Rect x={330} y={156} w={290} h={110} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={344} y={178} bold s={12.5}>À protéger</Txt>
        <Note x={344} y={202}>🔒 salaire, pièces d'identité</Note>
        <Note x={344} y={222}>🔒 données de présence (vie privée)</Note>
        <Note x={344} y={242}>Paie : règles du pays à faire valider.</Note>
      </>
    ),
  },
  "lg-3-4": {
    caption: "Projets : tâches en kanban et temps passé.",
    body: (
      <>
        <Kanban
          y={12}
          h={150}
          cols={[
            { t: "À faire", c: BLUE, cards: ["Étude|Paul · 02/03"] },
            { t: "En cours", c: ORANGE, cards: ["Câblage|Paul · 06/03", "Config.|Rose · 08/03"] },
            { t: "Terminé", c: GREEN, cards: ["Cahier des charges|Neema"] },
          ]}
        />
        <Txt x={20} y={184} bold s={12.5}>Feuille de temps (heures)</Txt>
        {[["Étude", 6], ["Câblage", 14], ["Config.", 8], ["Tests", 4]].map(([t, h], i) => (
          <g key={t as string}>
            <Txt x={20} y={206 + i * 18} s={11}>{t as string}</Txt>
            <rect x={90} y={195 + i * 18} width={(h as number) * 14} height={12} rx={3} fill={BLUE} />
            <Txt x={96 + (h as number) * 14} y={206 + i * 18} s={10.5} fill={SOFT}>{h as number} h</Txt>
          </g>
        ))}
        <Rect x={340} y={184} w={280} h={84} fill={YELLOW} stroke={ORANGE} r={8} />
        <Txt x={352} y={206} bold s={12}>Forfait 500 000 FC</Txt>
        <Note x={352} y={228}>32 h × 12 000 FC = 384 000 FC de coût</Note>
        <Note x={352} y={248}>Rentabilité = 500 000 − 384 000.</Note>
      </>
    ),
  },
  "lg-3-5": {
    caption: "Analyser, importer, exporter.",
    body: (
      <>
        <Flow y={14} items={[["Filtrer", "année 2026"], ["Regrouper", "par client"], ["Favori", "enregistré"], ["Exporter", "Excel"]]} h={60} />
        <Grid x={20} y={92} cols={3} rows={5} cw={110} ch={24} head={false} cells={[["Client", "Ventes", "Part"], ["École B. É.", "4 200 000", "42 %"], ["Collège K", "2 800 000", "28 %"], ["Ets Mama", "1 900 000", "19 %"], ["Autres", "1 100 000", "11 %"]]} />
        {[42, 28, 19, 11].map((p, i) => (
          <rect key={i} x={380} y={120 + i * 24 - 0} width={p * 4} height={16} rx={3} fill={[BLUE, GREEN, ORANGE, SOFT][i]} />
        ))}
        <Rect x={20} y={226} w={600} h={44} fill={SUNK} stroke={LINE} dash="5 4" r={8} />
        <Txt x={34} y={246} bold s={12}>Import :</Txt>
        <Note x={96} y={246}>télécharger le modèle → tester sur 3 lignes → importer. Ne charger que des données vérifiées.</Note>
        <Note x={34} y={262}>Exporter seulement les champs nécessaires (données personnelles).</Note>
      </>
    ),
  },
  "lg-3-6": {
    caption: "La sécurité d'un ERP : droits, mots de passe, sauvegardes.",
    body: (
      <>
        {[
          { x: 20, t: "Droits", s: "moindre privilège", i: "🔑", c: BLUE, f: SKY },
          { x: 175, t: "Comptes", s: "un compte par personne", i: "👤", c: GREEN, f: MINT },
          { x: 330, t: "Sauvegarde", s: "3 copies · 1 ailleurs", i: "💾", c: ORANGE, f: PEACH },
          { x: 485, t: "Traçabilité", s: "historique des actions", i: "📜", c: RED, f: ROSE },
        ].map((k) => (
          <g key={k.t}>
            <Rect x={k.x} y={16} w={135} h={140} fill={k.f} stroke={k.c} sw={2} r={14} />
            <Txt x={k.x + 67} y={68} s={34} anchor="middle">{k.i}</Txt>
            <Txt x={k.x + 67} y={104} anchor="middle" bold s={14}>{k.t}</Txt>
            <Txt x={k.x + 67} y={128} anchor="middle" s={10.5} fill={SOFT}>{k.s}</Txt>
          </g>
        ))}
        <Rect x={20} y={176} w={600} h={92} fill={SUNK} stroke={LINE} dash="5 4" r={8} />
        <Txt x={34} y={198} bold s={12.5}>Réflexes</Txt>
        <Note x={34} y={220}>• Départ d'un employé : désactiver son compte le jour même</Note>
        <Note x={34} y={240}>• Tester la restauration d'une sauvegarde de temps en temps</Note>
        <Note x={34} y={260}>• Séparer les rôles : saisir, valider, payer</Note>
      </>
    ),
  },
  "lg-3-7": {
    caption: "Importation : de la valeur CIF aux droits et taxes.",
    body: (
      <>
        <Txt x={20} y={24} bold>Valeur en douane (CIF)</Txt>
        {[["Prix de la marchandise", 10000, BLUE], ["Transport (fret)", 800, ORANGE], ["Assurance", 200, GREEN]].map(([t, v, c], i) => {
          const x0 = 20 + ([0, 10000, 10800][i] as number) / 11000 * 400;
          return (
            <g key={t as string}>
              <rect x={x0} y={34} width={((v as number) / 11000) * 400} height={34} fill={c as string} />
              <Txt x={x0 + 4} y={56} s={10} fill="#fff" bold>{i === 0 ? "10 000" : ""}</Txt>
            </g>
          );
        })}
        <Note x={430} y={50}>= 11 000 USD (CIF)</Note>
        <Note x={20} y={90}>■ marchandise 10 000   ■ fret 800   ■ assurance 200</Note>
        <Flow y={108} items={[["Code SH", "classement"], ["Taux", "droits de douane"], ["Taxes", "TVA, redevances"], ["Liquidation", "total à payer"]]} h={60} />
        <Rect x={20} y={192} w={600} h={78} fill={SUNK} stroke={LINE} dash="5 4" r={8} />
        <Txt x={34} y={214} bold s={12}>Documents à conserver</Txt>
        <Note x={34} y={236}>Facture commerciale · connaissement ou lettre de transport · liste de colisage</Note>
        <Note x={34} y={256}>Certificat d'origine, licence ou autorisation selon la marchandise.</Note>
      </>
    ),
  },
  "lg-3-8": {
    caption: "Les étapes d'une déclaration en douane informatisée.",
    body: (
      <>
        <Flow y={20} items={[["1 Préparer", "documents"], ["2 Saisir", "articles, valeurs"], ["3 Enregistrer", "n° + calcul"], ["4 Contrôle", "circuit"]]} h={66} />
        <Flow y={110} items={[["5 Liquidation", "droits et taxes"], ["6 Paiement", "quittance"], ["7 Bon à enlever", "retrait"]]} h={66} fill={MINT} stroke={GREEN} w={450} />
        <Rect x={20} y={200} w={600} h={68} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={34} y={222} bold s={12}>Avant d'enregistrer, relire</Txt>
        <Note x={34} y={244}>code SH · valeur · origine · quantités · identités. Une erreur peut entraîner des pénalités.</Note>
        <Note x={34} y={262}>Écrans et circuits : ceux de l'administration douanière de votre pays.</Note>
      </>
    ),
  },
  "lg-3-9": {
    caption: "Le guichet unique : une seule porte d'entrée pour les formalités.",
    body: (
      <>
        <Box x={20} y={100} w={140} h={60} t="Opérateur" s="importateur / exportateur" fill={YELLOW} stroke={ORANGE} />
        <Arrow x1={164} y1={130} x2={230} y2={130} />
        <Rect x={234} y={84} w={172} h={92} fill={SKY} stroke={BLUE} sw={3} r={14} />
        <Txt x={320} y={122} anchor="middle" bold s={14}>Guichet unique</Txt>
        <Txt x={320} y={144} anchor="middle" s={11} fill={SOFT}>plateforme en ligne</Txt>
        {[["Douane", 14], ["Commerce", 62], ["Normes", 110], ["Santé", 158], ["Transport", 206]].map(([t, y], i) => (
          <g key={t as string}>
            <Line a={{ x: 410, y: 130 }} b={{ x: 470, y: (y as number) + 20 }} c={GREEN} sw={2} />
            <Rect x={470} y={y as number} w={150} h={38} fill={MINT} stroke={GREEN} r={8} />
            <Txt x={545} y={(y as number) + 24} anchor="middle" bold s={12}>{t as string}</Txt>
          </g>
        ))}
        <Note x={20} y={226}>Un dépôt unique, un suivi en ligne, des frais officiels avec reçu.</Note>
        <Note x={20} y={246}>Informations exactes et cohérentes dans tous les documents.</Note>
        <Note x={20} y={266}>Jamais de somme hors barème officiel sans reçu.</Note>
      </>
    ),
  },
  "lg-3-10": {
    caption: "Budget et réalisé : analyser les écarts.",
    body: (
      <>
        <Txt x={20} y={24} bold>Ventes du trimestre (millions de FC)</Txt>
        {[["Cahiers", 5, 5.1], ["Stylos", 3, 1.9], ["Autres", 2, 1.5]].map(([t, b, r], i) => (
          <g key={t as string}>
            <Txt x={20} y={64 + i * 44} s={12}>{t as string}</Txt>
            <rect x={90} y={48 + i * 44} width={(b as number) * 50} height={14} rx={3} fill={LINE} />
            <rect x={90} y={64 + i * 44} width={(r as number) * 50} height={14} rx={3} fill={(r as number) >= (b as number) ? GREEN : RED} />
            <Txt x={100 + Math.max(b as number, r as number) * 50} y={60 + i * 44} s={10.5} fill={SOFT}>budget {b as number}</Txt>
            <Txt x={100 + Math.max(b as number, r as number) * 50} y={76 + i * 44} s={10.5} fill={SOFT}>réalisé {r as number}</Txt>
          </g>
        ))}
        <Rect x={20} y={190} w={290} h={78} fill={YELLOW} stroke={ORANGE} r={8} />
        <Txt x={34} y={212} bold s={12}>Marge brute</Txt>
        <Note x={34} y={234}>= ventes − coût d'achat</Note>
        <Note x={34} y={252}>1 000 − 800 = 200 (20 % du prix)</Note>
        <Rect x={330} y={190} w={290} h={78} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={344} y={212} bold s={12}>Contrôle interne</Txt>
        <Note x={344} y={234}>séparer les tâches · valider · rapprocher</Note>
        <Note x={344} y={252}>piste d'audit : de l'état à la pièce.</Note>
      </>
    ),
  },
  "lg-3-11": {
    caption: "Une mission d'audit avec un logiciel : planifier, tester, conclure.",
    body: (
      <>
        <Flow y={16} items={[["Planifier", "risques"], ["Importer", "balance, journaux"], ["Tester", "contrôles auto."], ["Conclure", "rapport"]]} h={62} />
        <Rect x={20} y={102} w={290} h={162} fill={PAPER} stroke={RED} sw={2} r={8} />
        <Txt x={34} y={124} bold s={12.5}>Tests automatiques</Txt>
        {["Doublons de factures", "Numéros de pièces manquants", "Écritures hors période", "Montants inhabituels"].map((t, i) => (
          <Note key={t} x={34} y={150 + i * 24}>⚠ {t}</Note>
        ))}
        <Rect x={330} y={102} w={290} h={162} fill={SUNK} stroke={LINE} r={8} />
        <Txt x={344} y={124} bold s={12.5}>Ensuite</Txt>
        <Note x={344} y={150}>• Examiner chaque anomalie</Note>
        <Note x={344} y={172}>• Échantillon : vérifier les pièces</Note>
        <Note x={344} y={194}>• Noter les constats, classer les preuves</Note>
        <Note x={344} y={222}>Indépendance, honnêteté, confidentialité.</Note>
      </>
    ),
  },
  "lg-3-12": {
    caption: "Le projet final : une entreprise gérée de bout en bout.",
    body: (
      <>
        {[
          ["Gestion", "ERP paramétré", BLUE, SKY],
          ["Comptabilité", "écritures, états", GREEN, MINT],
          ["Sécurité", "droits, sauvegardes", ORANGE, PEACH],
          ["Commerce international", "douane, guichet", RED, ROSE],
          ["Contrôle", "audit, indicateurs", "#7c3aed", "#ede9fe"],
        ].map(([t, s, c, f], i) => (
          <g key={t as string}>
            <Rect x={20 + i * 122} y={20} w={112} h={130} fill={f as string} stroke={c as string} sw={2} r={14} />
            <Txt x={76 + i * 122} y={70} anchor="middle" bold s={12}>{t as string}</Txt>
            <Txt x={76 + i * 122} y={94} anchor="middle" s={10.5} fill={SOFT}>{s as string}</Txt>
          </g>
        ))}
        <Rect x={20} y={172} w={600} h={96} fill={YELLOW} stroke={ORANGE} dash="5 4" r={8} />
        <Txt x={34} y={196} bold s={12.5}>Dossier à rendre</Txt>
        <Note x={34} y={220}>Présentation de l'entreprise · captures et états · règles de sécurité · conclusion</Note>
        <Note x={34} y={242}>Réflexe final : vérifier avant de valider.</Note>
      </>
    ),
  },
};
