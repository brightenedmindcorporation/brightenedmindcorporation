"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { SEAL_INFO, cachetSvg, sealSvg, type SealKind } from "@/lib/seals";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const KINDS: SealKind[] = ["company", "academia", "communication", "domestica"];

function download(name: string, href: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  a.click();
}

/** Draws a seal to a transparent PNG (2000 px) and downloads it. */
function downloadPng(kind: SealKind, opts: { ink?: string; worn?: boolean }, name: string) {
  const svg = sealSvg(kind, { ...opts, size: 2000, idPrefix: `png-${kind}` });
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    canvas.getContext("2d")!.drawImage(img, 0, 0, 2000, 2000);
    canvas.toBlob((blob) => {
      if (blob) download(name, URL.createObjectURL(blob));
      URL.revokeObjectURL(url);
    }, "image/png");
  };
  img.src = url;
}

export default function SealsPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [mono, setMono] = useState(false);
  const [worn, setWorn] = useState(false);

  useEffect(() => onAuthStateChanged(auth, (user) => setAllowed(user?.email === ADMIN_EMAIL)), []);

  if (allowed === null) return <main className="min-h-screen flex items-center justify-center text-ink-soft">Chargement…</main>;
  if (!allowed)
    return (
      <main className="min-h-screen flex items-center justify-center text-ink-soft p-6 text-center">
        <p>
          Page réservée à l&apos;administration. <Link href="/admin" className="text-red-500 font-bold">Se connecter</Link>
        </p>
      </main>
    );

  return (
    <main className="min-h-screen bg-surface-sunken text-ink p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Link href="/admin" className="text-sm font-bold text-ink-soft hover:text-ink">← Administration</Link>
          <h1 className="text-3xl font-black mt-3">Sceaux de Brightened Mind Corporation</h1>
          <p className="text-ink-soft mt-2 max-w-3xl text-sm">
            Une même famille : double anneau, même lettrage, même emblème (les demi-cercles de votre logo). Seuls l&apos;icône, le ruban et la couleur d&apos;encre changent selon le
            département. Téléchargez en SVG (net à toute taille) ou en PNG transparent.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={mono} onChange={(e) => setMono(e.target.checked)} /> Version noir et blanc (impression)</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={worn} onChange={(e) => setWorn(e.target.checked)} /> Effet tampon encré</label>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {KINDS.map((kind) => {
            const info = SEAL_INFO[kind];
            const opts = { ink: mono ? "#111111" : undefined, worn };
            return (
              <div key={kind} className="bg-white text-neutral-900 rounded-2xl border border-line p-4 flex flex-col items-center gap-3 shadow-sm">
                <div className="w-full max-w-[260px]" dangerouslySetInnerHTML={{ __html: sealSvg(kind, { ...opts, size: 260, idPrefix: `view-${kind}` }) }} />
                <div className="text-center">
                  <p className="font-bold">{info.label}</p>
                  <p className="text-xs text-neutral-500 mt-1">{info.note}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const svg = sealSvg(kind, { ...opts, size: 1000, idPrefix: `dl-${kind}` });
                      download(`sceau-${kind}${mono ? "-nb" : ""}.svg`, URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })));
                    }}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-red-600"
                  >
                    SVG
                  </button>
                  <button onClick={() => downloadPng(kind, opts, `sceau-${kind}${mono ? "-nb" : ""}.png`)} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-500">
                    PNG
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="text-xl font-black mb-3">Cachets (avec la date)</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {KINDS.map((kind) => (
              <div key={kind} className="bg-white text-neutral-900 rounded-2xl border border-line p-4 flex flex-col items-center gap-3 shadow-sm">
                <div className="w-full" dangerouslySetInnerHTML={{ __html: cachetSvg(kind, { ink: mono ? "#111111" : undefined, worn, size: 300, idPrefix: `cv-${kind}` }) }} />
                <p className="font-bold text-sm">{SEAL_INFO[kind].label}</p>
                <div className="flex gap-2">
                  {[
                    ["SVG", `/seals/cachet-${kind}${mono ? "-nb" : ""}.svg`],
                    ["PNG", `/seals/cachet-${kind}${mono ? "-nb" : ""}.png`],
                  ].map(([label, href]) => (
                    <a key={label} href={href} download className="text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-red-600">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-md">
          <h2 className="text-xl font-black mb-3">Signature</h2>
          <div className="bg-white text-neutral-900 rounded-2xl border border-line p-4 flex flex-col items-center gap-3 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/seals/signature-jordi-mukosa.png" alt="Signature de Jordi Mukosa" className="w-56" />
            <p className="font-bold text-sm">Jordi Mukosa</p>
            <a href="/seals/signature-jordi-mukosa.png" download className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-600 text-white">PNG sans fond</a>
          </div>
        </div>

        <p className="text-sm text-ink-soft">
          Les PNG sans fond (2000 px et plus) sont dans le dossier <code>public/seals</code> du projet, avec les versions noir et blanc (<code>-nb</code>) et tampon encré (<code>-tampon</code>).{" "}
          <Link href="/admin/journal" className="text-red-500 font-bold">Journal des notifications →</Link>
        </p>

        <section className="bg-surface border border-line rounded-2xl p-6 text-sm text-ink-soft space-y-2 max-w-3xl">
          <h2 className="font-bold text-ink text-base">Ce que j&apos;ai amélioré par rapport à un sceau classique</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Le centre reprend vos demi-cercles : le sceau est reconnaissable sans lire le texte, même tamponné petit.</li>
            <li>Un seul cadre pour tout le groupe : un cachet de département ne peut pas être confondu avec celui d&apos;une autre entreprise.</li>
            <li>Une couleur par département (rouge, bleu, violet, vert) pour trier les documents d&apos;un coup d&apos;œil, et une version noir et blanc pour les photocopies.</li>
            <li>Le texte du bas peut recevoir votre numéro d&apos;enregistrement officiel (RCCM / Id. Nat.) : je ne l&apos;ai pas inventé, donnez-le-moi et je l&apos;ajoute.</li>
          </ul>
          <p>
            Attention : un sceau dessiné n&apos;a de valeur légale que s&apos;il correspond à celui déposé ou reconnu par votre administration. Pour les documents officiels, faites-le valider avant de l&apos;imprimer sur des certificats.
          </p>
        </section>
      </div>
    </main>
  );
}
