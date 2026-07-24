"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_qjux4yb",
        "template_v0melap",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "I5Po_j3t-2H5h9OGV"
      );

      setSent(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 4000);

    } catch (error) {
      console.log(error);
      alert("Erreur lors de l’envoi.");
    }
  };

  return (
    <section id="contact" className="py-28 bg-white">

      <div className="max-w-3xl mx-auto px-8">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-red-600 font-semibold">
            Contact
          </p>

          <h2 className="text-5xl font-black mt-5 text-[#111111]">
            Parlons de votre projet
          </h2>

        </div>

        <form onSubmit={sendEmail} className="flex flex-col gap-6">

          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-4 rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-4 rounded-xl"
          />

          <textarea
            name="message"
            placeholder="Votre message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            className="border p-4 rounded-xl"
          />

          <button
            type="submit"
            className="bg-red-600 text-white py-4 rounded-xl hover:bg-black transition"
          >
            Envoyer
          </button>

          {sent && (
            <p className="text-green-600 text-center font-medium">
              Message envoyé avec succès.
            </p>
          )}

        </form>

      </div>

    </section>
  );
}