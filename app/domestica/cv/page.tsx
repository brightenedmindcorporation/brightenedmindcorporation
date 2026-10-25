import type { Metadata } from "next";
import CvBuilder from "@/components/cv/CvBuilder";

export const metadata: Metadata = {
  title: "Créer mon CV gratuitement — BM Domestica",
  description: "Remplissez vos informations, ajoutez vos documents et téléchargez un CV professionnel en PDF, prêt à imprimer.",
};

export default function CvPage() {
  return (
    <main className="min-h-screen bg-page px-4 pb-20 pt-32 text-ink md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full border border-red-700/40 bg-red-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">BM Domestica</span>
          <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">Créez votre CV professionnel</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
            Remplissez vos informations, ajoutez la photo et les copies de vos documents. Nous mettons en page votre CV : vous le téléchargez en PDF, vous l'imprimez, ou vous l'envoyez directement avec votre candidature.
          </p>
        </div>
        <CvBuilder />
      </div>
    </main>
  );
}
