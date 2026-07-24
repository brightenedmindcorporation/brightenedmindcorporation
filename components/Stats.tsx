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
    <section className="py-24 bg-[#f8f8f8]">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-white rounded-[25px] shadow-lg p-10 text-center hover:shadow-2xl transition"
            >

              <h2 className="text-5xl font-black text-red-600">
                {stat.number}
              </h2>

              <p className="mt-4 text-gray-600 font-medium">
                {stat.label}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}