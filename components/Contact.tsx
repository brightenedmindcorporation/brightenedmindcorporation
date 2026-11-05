"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Paperclip, X } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [attachment, setAttachment] = useState<File | null>(null);
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

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
    setSendError(null);
    setSent(false);

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
        setEmailError(check.message || "Cette adresse e-mail n'est pas valide.");
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

      const persistForm = new FormData();
      persistForm.append("name", form.name);
      persistForm.append("email", form.email);
      persistForm.append("message", form.message);
      if (attachment) persistForm.append("attachment", attachment);

      fetch("/api/contact/submit", { method: "POST", body: persistForm }).catch((err) =>
        console.error("Project request persistence failed (non-fatal):", err)
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });
      setAttachment(null);

    } catch (error: any) {
      console.error("EmailJS error:", error);
      setSendError("Votre message n'a pas pu partir (connexion ou service indisponible). Réessayez dans un instant, ou écrivez-nous directement sur WhatsApp : +243 988 830 799.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <section id="contact-form" className="py-14 md:py-28 bg-page">

      <div className="max-w-3xl mx-auto px-5 md:px-8">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-red-500 font-semibold text-sm">
            Contact
          </p>

          <h2 className="text-3xl min-[400px]:text-4xl md:text-5xl font-black mt-5 text-ink">
            Parlons de votre projet
          </h2>

          <div className="divider-red w-16 mx-auto mt-6" />

        </div>

        <form onSubmit={sendEmail} className="glass-panel rounded-3xl p-5 md:p-10 flex flex-col gap-5 shadow-xl shadow-black/30">

          <label htmlFor="contact-name" className="sr-only">Votre nom</label>
          <input
            id="contact-name"
            autoComplete="name"
            type="text"
            name="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
            required
            className="font-sans border border-line bg-surface-sunken/60 text-ink placeholder:text-ink-faint p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/60 focus:border-red-600/60"
          />

          <label htmlFor="contact-email" className="sr-only">Votre adresse e-mail</label>
          <input
            id="contact-email"
            autoComplete="email"
            type="email"
            name="email"
            placeholder="Votre e-mail (pour vous répondre)"
            value={form.email}
            onChange={handleChange}
            required
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "contact-email-error" : undefined}
            className={`${emailError ? "field-invalid " : ""}font-sans border border-line bg-surface-sunken/60 text-ink placeholder:text-ink-faint p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/60 focus:border-red-600/60`}
          />
          {emailError && (
            <p id="contact-email-error" role="alert" className="field-error -mt-3">
              {emailError}
            </p>
          )}

          <label htmlFor="contact-message" className="sr-only">Votre message</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Votre message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            className="font-sans border border-line bg-surface-sunken/60 text-ink placeholder:text-ink-faint p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/60 focus:border-red-600/60"
          />

          {attachment ? (
            <span className="inline-flex items-center gap-2 self-start text-sm font-sans bg-surface-sunken/60 border border-line rounded-xl px-4 py-2.5 text-ink-soft">
              <Paperclip size={15} className="shrink-0" />
              <span className="truncate max-w-[240px]">{attachment.name}</span>
              <button
                type="button"
                onClick={() => setAttachment(null)}
                aria-label="Retirer la pièce jointe"
                className="text-ink-faint hover:text-red-500"
              >
                <X size={14} />
              </button>
            </span>
          ) : (
            <label className="inline-flex items-center gap-2 self-start cursor-pointer text-sm font-sans font-semibold text-ink-soft hover:text-ink border border-line rounded-xl px-4 py-2.5 transition bg-surface-sunken/60">
              <Paperclip size={15} />
              Joindre un fichier (optionnel)
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
              />
            </label>
          )}

          {sendError && (
            <p role="alert" className="field-error text-center">
              {sendError}
            </p>
          )}

          <button
            type="submit"
            disabled={checking}
            className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold min-h-[52px] rounded-xl transition disabled:opacity-60"
          >
            {checking ? "Envoi en cours…" : "Envoyer le message"}
          </button>

          {sent && (
            <div role="status" className="rounded-xl border border-emerald-600/40 bg-emerald-600/10 p-4 text-center font-sans">
              <p className="font-bold text-emerald-700 dark:text-emerald-300">Message bien reçu. Merci !</p>
              <p className="text-sm text-ink-soft mt-1">Nous vous répondons en général dans la journée (au plus tard sous 24 heures ouvrables).</p>
            </div>
          )}

          <p className="text-center text-sm text-ink-soft">
            Plus rapide ? Écrivez-nous sur{" "}
            <a href="https://wa.me/243988830799" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 dark:text-emerald-300 underline">
              WhatsApp
            </a>
            .
          </p>

        </form>

      </div>

    </section>
  );
}