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

          <h2 className="text-3xl min-[400px]:text-4xl md:text-5xl font-black mt-5 text-ink">
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