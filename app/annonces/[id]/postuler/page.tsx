"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Paperclip, X } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "job" | "normal";
  details?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
}

export default function JobApplyPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [announcement, setAnnouncement] = useState<Announcement | null | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [referenceLetter, setReferenceLetter] = useState<File | null>(null);
  const [otherDocuments, setOtherDocuments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(`/api/announcements/${params.id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setAnnouncement(data.announcement))
      .catch(() => setAnnouncement(null));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!cv) {
      setError("Le CV est obligatoire.");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("announcementId", params.id);
      form.append("name", name);
      form.append("email", email);
      form.append("phone", phone);
      form.append("message", message);
      form.append("cv", cv);
      if (coverLetter) form.append("coverLetter", coverLetter);
      if (referenceLetter) form.append("referenceLetter", referenceLetter);
      otherDocuments.forEach((file) => form.append("otherDocuments", file));

      const response = await fetch("/api/academy/jobs/apply", { method: "POST", body: form });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Une erreur est survenue lors de l'envoi de votre candidature.");
        setLoading(false);
        return;
      }

      setDone(true);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de l'envoi de votre candidature.");
    } finally {
      setLoading(false);
    }
  };

  if (announcement === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page text-ink-soft pt-28">
        Chargement...
      </main>
    );
  }

  if (!announcement) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page text-ink-soft pt-28 px-4 text-center">
        <div>
          <p className="text-2xl font-bold text-ink mb-2">Offre introuvable</p>
          <Link href="/" className="text-red-500 hover:text-red-400 font-semibold">
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page px-4 pt-28 pb-20">
        <div className="bg-surface-sunken border border-line p-8 rounded-2xl w-full max-w-md text-center text-ink">
          <h1 className="text-2xl font-bold mb-2">Candidature envoyée !</h1>
          <p className="text-ink-soft text-sm mb-6">
            Merci {name}, nous avons bien reçu votre candidature pour <b>{announcement.title}</b>. Vous recevrez une
            réponse à l'adresse email indiquée.
          </p>
          <button
            onClick={() => router.push("/")}
            className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-5 py-2.5 rounded-lg font-semibold transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-page text-ink pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-block mb-6 text-sm font-bold text-ink-soft hover:text-ink transition">
          ← Retour à l'accueil
        </Link>

        <div className="bg-surface-sunken border border-line rounded-3xl overflow-hidden shadow-xl mb-8">
          {announcement.imageUrl && (
            <div className="relative w-full aspect-video bg-surface-alt">
              <Image src={announcement.imageUrl} alt={announcement.title} fill unoptimized className="object-cover" />
            </div>
          )}
          <div className="p-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-700/40 mb-4">
              Offre d'emploi
            </span>
            <h1 className="text-3xl font-black text-ink mb-4">{announcement.title}</h1>
            <p className="text-ink-soft leading-relaxed mb-4">{announcement.description}</p>
            {announcement.details && (
              <div className="text-ink-soft leading-relaxed whitespace-pre-line border-t border-line pt-4">
                {announcement.details}
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface-sunken border border-line p-8 rounded-3xl shadow-xl">
          <h2 className="text-xl font-bold text-ink mb-6">Postuler à cette offre</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-950 border border-red-800 text-red-200 text-sm rounded-lg">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">Nom complet</label>
              <input
                required
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="votre.email@exemple.com"
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-ink-faint mt-1">
                Utilisez une vraie adresse email — c'est là que nous vous répondrons.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">Téléphone</label>
              <input
                required
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">Message (optionnel)</label>
              <textarea
                rows={3}
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">CV (obligatoire)</label>
              <input
                type="file"
                required
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-red-600 file:text-white file:font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">Lettre de motivation (optionnel)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCoverLetter(e.target.files?.[0] ?? null)}
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-surface-alt file:text-ink file:font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">Lettre d'emploi / référence (optionnel)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setReferenceLetter(e.target.files?.[0] ?? null)}
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-surface-alt file:text-ink file:font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">Autres documents (optionnel)</label>
              <p className="text-xs text-ink-faint mb-1.5">Certificats, diplômes, attestations ou tout autre document utile à votre candidature.</p>
              {otherDocuments.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {otherDocuments.map((file, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs bg-surface border border-line rounded-full px-3 py-1 text-ink-soft">
                      <Paperclip size={12} /> {file.name}
                      <button
                        type="button"
                        onClick={() => setOtherDocuments((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-ink-faint hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => {
                  setOtherDocuments((prev) => [...prev, ...Array.from(e.target.files || [])]);
                  e.target.value = "";
                }}
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-surface-alt file:text-ink file:font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Envoi..." : "Envoyer ma candidature"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
