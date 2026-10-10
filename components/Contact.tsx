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
  const [emailError, setEmailError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

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
    setEmailError(null);

    try {
      setChecking(true);
      const checkResponse = await fetch("/api/validate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim() }),
      });
      const check = await checkResponse.json();
      setChecking(false);

      if (!check.valid) {
        setEmailError(
          check.reason === "format"
            ? "Le format de l'adresse email n'est pas valide."
            : "Cette adresse email semble invalide : son domaine ne peut pas recevoir d'emails. Vérifiez qu'il n'y a pas de faute de frappe."
        );
        return;
      }

      await emailjs.send(
        "service_m7rwnia",
        "template_slt7mce",
        {
          name: form.name,
          email: form.email,
          message: form.message,
          title: "Nouveau message depuis le site",
          time: new Date().toLocaleString("fr-FR"),
        },
        "I5Po_j3t-2H5h9OGV"
      );

      setSent(true);

      fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      }).catch((err) => console.error("Project request persistence failed (non-fatal):", err));

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 4000);

    } catch (error: any) {
      console.error("EmailJS error:", error);
      const detail = error?.text || error?.message || JSON.stringify(error);
      alert(`Erreur lors de l'envoi : ${detail}`);
    } finally {
      setChecking(false);
    }
  };

  return (
    <section id="contact-form" className="py-28 bg-page">

      <div className="max-w-3xl mx-auto px-8">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-red-500 font-semibold text-sm">
            Contact
          </p>

          <h2 className="text-5xl font-black mt-5 text-ink">
            Parlons de votre projet
          </h2>

          <div className="divider-red w-16 mx-auto mt-6" />

        </div>

        <form onSubmit={sendEmail} className="glass-panel rounded-3xl p-8 md:p-10 flex flex-col gap-6 shadow-xl shadow-black/30">

          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
            required
            className="font-sans border border-line bg-surface-sunken/60 text-ink placeholder:text-ink-faint p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/60 focus:border-red-600/60"
          />

          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={form.email}
            onChange={handleChange}
            required
            className="font-sans border border-line bg-surface-sunken/60 text-ink placeholder:text-ink-faint p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/60 focus:border-red-600/60"
          />

          <textarea
            name="message"
            placeholder="Votre message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            className="font-sans border border-line bg-surface-sunken/60 text-ink placeholder:text-ink-faint p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/60 focus:border-red-600/60"
          />

          {emailError && (
            <p className="text-red-500 text-sm text-center font-medium font-sans">
              {emailError}
            </p>
          )}

          <button
            type="submit"
            disabled={checking}
            className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-semibold py-4 rounded-xl transition disabled:opacity-50"
          >
            {checking ? "Vérification..." : "Envoyer"}
          </button>

          {sent && (
            <p className="text-emerald-500 text-center font-medium font-sans">
              Message envoyé avec succès.
            </p>
          )}

        </form>

      </div>

    </section>
  );
}