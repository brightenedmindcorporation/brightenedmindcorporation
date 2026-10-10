"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Étudiant BM Academia",
    text: "Grâce à BM Academia, j’ai amélioré mes compétences linguistiques et gagné plus de confiance dans mon parcours professionnel.",
  },

  {
    name: "Client BM Communication",
    text: "Un service professionnel, une excellente qualité visuelle et un accompagnement sérieux pour notre communication digitale.",
  },

  {
    name: "Famille BM Domestica",
    text: "Nous avons trouvé un personnel fiable et bien formé. Le processus a été transparent et très professionnel.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-background">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[4px] text-gold-500 font-semibold text-sm">
            Témoignages
          </p>

          <h2 className="text-5xl font-black mt-5 text-white">
            Ils nous font confiance
          </h2>

          <div className="divider-gold w-16 mx-auto mt-6" />

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-neutral-900/60 border border-neutral-800 hover:border-gold-700/30 rounded-[25px] p-10 shadow-lg shadow-black/20 transition-colors duration-500"
            >

              <span className="text-5xl text-gold-600/50 leading-none">"</span>

              <p className="text-neutral-300 leading-8 italic font-sans -mt-4">
                {item.text}
              </p>

              <h4 className="mt-6 font-bold text-gold-400 font-sans text-sm uppercase tracking-wide">
                — {item.name}
              </h4>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}