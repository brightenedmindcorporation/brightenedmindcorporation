"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "500+",
    label: "Apprenants Formés",
  },

  {
    number: "50+",
    label: "Clients Accompagnés",
  },

  {
    number: "100+",
    label: "Familles Servies",
  },

  {
    number: "3",
    label: "Départements Stratégiques",
  },
];

export default function Stats() {
  return (
    <section className="py-24 bg-surface-sunken">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-surface/60 border border-line hover:border-red-700/40 rounded-[25px] shadow-lg shadow-black/20 p-10 text-center hover:shadow-2xl transition"
            >

              <h2 className="text-3xl min-[400px]:text-4xl md:text-5xl font-black text-gradient-red">
                {stat.number}
              </h2>

              <p className="mt-4 text-ink-soft font-medium font-sans">
                {stat.label}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}