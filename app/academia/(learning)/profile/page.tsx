"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, CheckCircle2, KeyRound, Trash2, UserRound } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import AcademyHeader from "../components/AcademyHeader";
import { compressImage } from "@/lib/imageClient";
import { findProgramByCode } from "@/content/curriculum";
import { levelNumber } from "@/lib/academy/levelAccess";

interface Profile {
  name: string;
  displayName: string;
  email: string;
  gender: string;
  phone: string;
  whatsapp: string;
  city: string;
  photoUrl: string;
}
interface EnrollmentRow {
  langCode: string;
  level?: string;
  status?: string;
  matricule?: string;
}

const STATUS_FR: Record<string, string> = { Pending: "En attente de validation", Approved: "Actif", Suspended: "Suspendu", Expired: "Accès terminé", Rejected: "Refusé" };

const field = "w-full min-h-[48px] border border-line bg-surface px-3.5 py-3 rounded-lg text-base text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoMessage, setPhotoMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [resetMessage, setResetMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const token = async () => auth.currentUser?.getIdToken();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      try {
        const response = await fetch("/api/academy/profile", { headers: { Authorization: `Bearer ${await user.getIdToken()}` } });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Impossible de charger le profil.");
        setProfile(result.profile);
        setEnrollments(result.enrollments || []);
        setDisplayName(result.profile.displayName || "");
        setPhone(result.profile.phone || "");
        setWhatsapp(result.profile.whatsapp || "");
        setCity(result.profile.city || "");
      } catch (error: any) {
        setMessage({ kind: "error", text: error.message || "Impossible de charger le profil." });
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/academy/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        body: JSON.stringify({ displayName, phone, whatsapp, city }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "L'enregistrement a échoué.");
      setProfile((p) => (p ? { ...p, displayName: displayName.trim(), phone: phone.trim(), whatsapp: whatsapp.trim(), city: city.trim() } : p));
      setMessage({ kind: "ok", text: "Vos informations sont enregistrées." });
    } catch (error: any) {
      setMessage({ kind: "error", text: error.message || "L'enregistrement a échoué." });
    } finally {
      setSaving(false);
    }
  };

  const chooseFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const original = event.target.files?.[0];
    event.target.value = "";
    if (!original) return;
    setPhotoBusy(true);
    setPhotoMessage(null);
    try {
      // Lightened here first (a phone photo is several MB); the server crops it to a square and lightens it again.
      const file = await compressImage(original, 1200, 0.8);
      const form = new FormData();
      form.append("photo", file, file.name);
      const response = await fetch("/api/academy/profile/photo", { method: "POST", headers: { Authorization: `Bearer ${await token()}` }, body: form });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.url) throw new Error(result.error || "L'envoi de la photo a échoué.");
      setProfile((p) => (p ? { ...p, photoUrl: `${result.url}?v=${Date.now()}` } : p));
      setPhotoMessage({ kind: "ok", text: "Votre photo est enregistrée." });
    } catch (error: any) {
      setPhotoMessage({ kind: "error", text: error.message || "L'envoi de la photo a échoué." });
    } finally {
      setPhotoBusy(false);
    }
  };

  const removePhoto = async () => {
    if (!confirm("Supprimer votre photo de profil ?")) return;
    setPhotoBusy(true);
    setPhotoMessage(null);
    try {
      const response = await fetch("/api/academy/profile/photo", { method: "DELETE", headers: { Authorization: `Bearer ${await token()}` } });
      if (!response.ok) throw new Error("La suppression a échoué.");
      setProfile((p) => (p ? { ...p, photoUrl: "" } : p));
      setPhotoMessage({ kind: "ok", text: "Photo supprimée." });
    } catch (error: any) {
      setPhotoMessage({ kind: "error", text: error.message || "La suppression a échoué." });
    } finally {
      setPhotoBusy(false);
    }
  };

  const resetPassword = async () => {
    const email = profile?.email || auth.currentUser?.email;
    if (!email) return;
    setResetMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage({ kind: "ok", text: `Un lien pour choisir un nouveau mot de passe vient d'être envoyé à ${email}. Pensez à regarder aussi dans les courriers indésirables (spam).` });
    } catch {
      setResetMessage({ kind: "error", text: "Le lien n'a pas pu être envoyé. Réessayez dans un instant." });
    }
  };

  const shownName = profile?.displayName || profile?.name || "";
  const initials = shownName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const note = (m: { kind: "ok" | "error"; text: string } | null) =>
    m && (
      <p role={m.kind === "error" ? "alert" : "status"} className={`text-sm font-semibold ${m.kind === "error" ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-300"}`}>
        {m.text}
      </p>
    );

  return (
    <div className="min-h-screen bg-surface-sunken text-ink">
      <AcademyHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-black font-serif flex items-center gap-2">
            <UserRound size={28} aria-hidden="true" /> Mon profil
          </h1>
          <p className="text-ink-soft mt-1">Votre photo et vos informations de contact.</p>
        </div>

        {loading ? (
          <div className="p-5 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
        ) : !profile ? (
          <div className="p-5 rounded-2xl border border-line bg-surface text-red-700 dark:text-red-300">{message?.text || "Profil introuvable."}</div>
        ) : (
          <>
            {/* Photo */}
            <section className="p-5 rounded-2xl border border-line bg-surface flex flex-col sm:flex-row items-center gap-5">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photoUrl} alt="Votre photo de profil" className="h-28 w-28 rounded-full object-cover border border-line" />
              ) : (
                <div className="h-28 w-28 rounded-full bg-red-900/20 text-red-700 dark:text-red-300 flex items-center justify-center text-3xl font-black border border-line" aria-hidden="true">
                  {initials || "?"}
                </div>
              )}
              <div className="space-y-3 text-center sm:text-left">
                <p className="font-bold text-ink text-lg">{shownName}</p>
                <p className="text-sm text-ink-soft">Vous seul et l&apos;administration voyez cette photo. Choisissez-en une où l&apos;on voit bien votre visage.</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  {/* No "capture" attribute: the phone offers both the camera and the gallery. */}
                  <input ref={fileInput} type="file" accept="image/*" onChange={chooseFile} className="sr-only" aria-label="Choisir une photo" />
                  <button
                    type="button"
                    onClick={() => fileInput.current?.click()}
                    disabled={photoBusy}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-xl font-bold text-white bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-60"
                  >
                    <Camera size={16} aria-hidden="true" /> {photoBusy ? "Envoi…" : profile.photoUrl ? "Changer la photo" : "Ajouter une photo"}
                  </button>
                  {profile.photoUrl && (
                    <button type="button" onClick={removePhoto} disabled={photoBusy} className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 rounded-xl border border-line text-ink-soft hover:text-ink font-semibold">
                      <Trash2 size={16} aria-hidden="true" /> Supprimer
                    </button>
                  )}
                </div>
                {note(photoMessage)}
              </div>
            </section>

            {/* Information */}
            <form onSubmit={save} className="p-5 rounded-2xl border border-line bg-surface space-y-4">
              <h2 className="text-xl font-bold">Mes informations</h2>
              <div>
                <label htmlFor="pf-official" className="block text-sm font-semibold text-ink mb-1">Nom sur le certificat</label>
                <input id="pf-official" value={profile.name} readOnly className={`${field} bg-surface-alt text-ink-soft`} />
                <p className="text-sm text-ink-faint mt-1">Ce nom, l&apos;adresse e-mail et le titre ne se changent pas ici. Pour une correction, écrivez à l&apos;administration.</p>
              </div>
              <div>
                <label htmlFor="pf-email" className="block text-sm font-semibold text-ink mb-1">Adresse e-mail</label>
                <input id="pf-email" value={profile.email} readOnly className={`${field} bg-surface-alt text-ink-soft`} />
              </div>
              <div>
                <label htmlFor="pf-display" className="block text-sm font-semibold text-ink mb-1">Nom affiché (facultatif)</label>
                <input id="pf-display" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={60} autoComplete="nickname" placeholder="Comment voulez-vous qu'on vous appelle ?" className={field} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pf-phone" className="block text-sm font-semibold text-ink mb-1">Téléphone</label>
                  <input id="pf-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={25} placeholder="+243 …" className={field} />
                </div>
                <div>
                  <label htmlFor="pf-wa" className="block text-sm font-semibold text-ink mb-1">WhatsApp</label>
                  <input id="pf-wa" type="tel" inputMode="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} maxLength={25} placeholder="+243 …" className={field} />
                </div>
              </div>
              <div>
                <label htmlFor="pf-city" className="block text-sm font-semibold text-ink mb-1">Ville</label>
                <input id="pf-city" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} maxLength={60} placeholder="Lubumbashi" className={field} />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-xl font-bold text-white bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-60">
                  <CheckCircle2 size={16} aria-hidden="true" /> {saving ? "Enregistrement…" : "Enregistrer"}
                </button>
                {note(message)}
              </div>
            </form>

            {/* Password */}
            <section className="p-5 rounded-2xl border border-line bg-surface space-y-3">
              <h2 className="text-xl font-bold">Mot de passe</h2>
              <p className="text-sm text-ink-soft">Pour votre sécurité, le changement se fait par un lien envoyé à votre adresse e-mail.</p>
              <button type="button" onClick={resetPassword} className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-xl border border-line text-ink font-bold hover:border-red-600/60">
                <KeyRound size={16} aria-hidden="true" /> Changer mon mot de passe
              </button>
              {note(resetMessage)}
            </section>

            {/* Follow-up */}
            <section className="p-5 rounded-2xl border border-line bg-surface space-y-3">
              <h2 className="text-xl font-bold">Mes formations</h2>
              {enrollments.length === 0 ? (
                <p className="text-sm text-ink-soft">Aucune formation pour le moment.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {enrollments.map((e) => {
                    const program = findProgramByCode(e.langCode);
                    const level = e.level && /\d/.test(String(e.level)) ? `Niveau ${levelNumber(e.level)}` : "";
                    return (
                      <li key={e.langCode} className="py-3 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="font-bold text-ink">{program?.label ?? e.langCode}</p>
                          <p className="text-sm text-ink-soft">
                            {[level, STATUS_FR[e.status || ""] || e.status, e.matricule].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                        {program && e.status === "Approved" && level && (
                          <Link href={`/academia/${program.slug}/level/${levelNumber(e.level)}`} className="inline-flex items-center min-h-[44px] font-bold text-red-700 dark:text-red-300 underline">
                            Ouvrir mon niveau et mes certificats
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/academia/dashboard" className="inline-flex items-center min-h-[44px] font-bold text-red-700 dark:text-red-300 underline">
                  Retour à mon tableau de bord
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
