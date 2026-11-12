"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, RotateCcw, Upload, CheckCircle2 } from "lucide-react";
import { sfx } from "@/lib/academy/sfx";
import Zh from "@/components/academy/Zh";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

/** The reading-aloud part of a quiz: the passage to read, in the language of the quiz. */
export interface QuizReading {
  text: string;
  cjk: boolean;
}

export interface ReadingState {
  /** Kept only so that an older saved draft still loads: the voice is no longer scored by the site. */
  transcript: string;
  percent: number | null;
  /** True when this browser cannot record at all (the administration will ask the student to read aloud). */
  skipped: boolean;
  /** The recording of the student's voice, sent to the administration, which listens to it and gives the mark by hand. */
  audioUrl?: string;
}

export const emptyReadingState = (): ReadingState => ({ transcript: "", percent: null, skipped: false });
/** Done once the recording is sent (or, when the browser cannot record, once the student chose to skip). */
export const readingDone = (s: ReadingState) => Boolean(s.audioUrl) || s.skipped;

const MAX_RECORD_SECONDS = 150;

/** The audio format this browser can record (Safari: mp4/aac; Chrome, Edge, Firefox: webm/opus). */
function pickRecorderType(): string {
  if (typeof MediaRecorder === "undefined" || typeof MediaRecorder.isTypeSupported !== "function") return "";
  return ["audio/mp4", "audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"].find((t) => MediaRecorder.isTypeSupported(t)) ?? "";
}

async function currentToken(): Promise<string | undefined> {
  const user =
    auth.currentUser ??
    (await new Promise<import("firebase/auth").User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        unsubscribe();
        resolve(u);
      });
    }));
  return user?.getIdToken();
}

export default function QuizReadingStep({
  reading,
  state,
  onChange,
  submitted,
  langSlug,
}: {
  reading: QuizReading;
  state: ReadingState;
  onChange: (next: ReadingState) => void;
  submitted: boolean;
  langSlug: string;
}) {
  const [canRecord, setCanRecord] = useState(false);
  const [rec, setRec] = useState<"idle" | "recording" | "ready" | "uploading" | "failed">("idle");
  const [recMessage, setRecMessage] = useState<string | null>(null);
  const [clip, setClip] = useState<{ blob: Blob; url: string; type: string } | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const autoStop = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCanRecord(Boolean(navigator.mediaDevices?.getUserMedia) && typeof MediaRecorder !== "undefined");
    return () => {
      if (autoStop.current) clearTimeout(autoStop.current);
      stream.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Record the voice and send it: the administration listens to it and gives the mark by hand.
  const startRecording = async () => {
    setRecMessage(null);
    setClip(null);
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = media;
      const type = pickRecorderType();
      const r = type ? new MediaRecorder(media, { mimeType: type }) : new MediaRecorder(media);
      chunks.current = [];
      r.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.current.push(e.data);
      };
      r.onstop = () => {
        media.getTracks().forEach((t) => t.stop());
        if (autoStop.current) clearTimeout(autoStop.current);
        const mime = r.mimeType || type || "audio/webm";
        const blob = new Blob(chunks.current, { type: mime });
        if (blob.size < 2000) {
          setRec("failed");
          setRecMessage("L'enregistrement est vide : le micro n'a rien capté. Vérifiez qu'il fonctionne, puis réessayez.");
          return;
        }
        setClip({ blob, url: URL.createObjectURL(blob), type: mime });
        setRec("ready");
      };
      recorder.current = r;
      r.start();
      sfx.recordStart();
      setRec("recording");
      // A recording never runs for ever (battery, size of the file).
      autoStop.current = setTimeout(() => {
        if (recorder.current?.state === "recording") recorder.current.stop();
      }, MAX_RECORD_SECONDS * 1000);
    } catch (e: any) {
      setRec("failed");
      setRecMessage(
        e?.name === "NotAllowedError" || e?.name === "SecurityError"
          ? "Le micro n'est pas autorisé pour ce site. Autorisez-le dans les réglages du navigateur (Safari : « aA » dans la barre d'adresse > Réglages du site web > Micro), puis réessayez."
          : e?.name === "NotFoundError"
          ? "Aucun micro n'a été trouvé sur cet appareil."
          : "Le micro n'a pas pu démarrer sur cet appareil."
      );
    }
  };

  const stopRecording = () => {
    try {
      if (recorder.current?.state === "recording") recorder.current.stop();
    } catch {
      // already stopped
    }
    sfx.recordStop();
  };

  const sendRecording = async () => {
    if (!clip) return;
    setRec("uploading");
    setRecMessage(null);
    try {
      const token = await currentToken();
      if (!token) throw new Error("Reconnectez-vous puis réessayez.");
      const form = new FormData();
      const ext = clip.type.includes("mp4") ? "m4a" : clip.type.includes("ogg") ? "ogg" : "webm";
      form.append("audio", clip.blob, `lecture.${ext}`);
      const response = await fetch("/api/academy/reading-audio", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.url) throw new Error(result.error || "L'envoi a échoué. Vérifiez votre connexion et réessayez.");
      onChange({ transcript: "", percent: null, skipped: false, audioUrl: result.url });
      setRec("idle");
    } catch (e: any) {
      setRec("ready");
      setRecMessage(e?.message || "L'envoi a échoué. Réessayez.");
    }
  };

  const btn = "inline-flex items-center justify-center gap-2 min-h-[52px] px-5 rounded-xl font-bold transition";

  return (
    <div className="space-y-4">
      <p translate="no" className="notranslate rounded-2xl border border-line bg-surface-alt p-5 text-lg leading-relaxed text-ink">
        <span className={reading.cjk ? "leading-[2.4]" : undefined}>
          <Zh text={reading.text} on={reading.cjk} />
        </span>
      </p>

      {!submitted && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-surface-alt/60 p-4 space-y-3">
            <p className="text-sm font-bold text-ink">Lisez le texte à voix haute et enregistrez-vous</p>
            {canRecord ? (
              <>
                <p className="text-sm text-ink-soft">Appuyez sur « Enregistrer ma voix », lisez le texte, arrêtez, écoutez-vous, puis envoyez. L&apos;administration écoutera votre lecture et vous donnera la note : le site ne la corrige pas.</p>
                {rec === "recording" ? (
                  <button type="button" onClick={stopRecording} className={`${btn} bg-ink text-surface animate-pulse`}>
                    <Square size={14} aria-hidden="true" /> Arrêter l&apos;enregistrement
                  </button>
                ) : rec === "ready" || rec === "uploading" ? (
                  <div className="space-y-3">
                    {clip && <audio controls src={clip.url} className="w-full" />}
                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={sendRecording} disabled={rec === "uploading"} className={`${btn} bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60`}>
                        <Upload size={16} aria-hidden="true" /> {rec === "uploading" ? "Envoi en cours…" : "Envoyer à l'administration"}
                      </button>
                      <button type="button" onClick={startRecording} disabled={rec === "uploading"} className={`${btn} border border-line bg-surface text-ink`}>
                        <RotateCcw size={16} aria-hidden="true" /> Recommencer
                      </button>
                    </div>
                  </div>
                ) : (
                  <button type="button" onClick={startRecording} className={`${btn} bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white`}>
                    <Mic size={16} aria-hidden="true" /> {state.audioUrl ? "Enregistrer à nouveau" : "Enregistrer ma voix"}
                  </button>
                )}
                {recMessage && (
                  <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">
                    {recMessage}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-ink-soft">
                Ce navigateur ne permet pas d&apos;utiliser le micro (c&apos;est le cas d&apos;Opera Mini). Ouvrez cette page avec Chrome, Safari ou Firefox, ou passez cette partie : l&apos;administration vous fera lire à l&apos;oral.
              </p>
            )}
          </div>

          {state.audioUrl && (
            <p role="status" className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 size={18} aria-hidden="true" /> Votre enregistrement est envoyé à l&apos;administration. Vous pouvez continuer.
            </p>
          )}

          {/* Only when this browser cannot record (Opera Mini): otherwise the student could never send the quiz */}
          {!canRecord && !state.skipped && (
            <button
              type="button"
              onClick={() => onChange({ transcript: "", percent: null, skipped: true })}
              className={`${btn} border border-line bg-surface text-ink-soft hover:text-ink hover:border-red-600/60 w-full sm:w-auto`}
            >
              Passer cette étape : l&apos;administration m&apos;interrogera à l&apos;oral
            </button>
          )}
          {state.skipped && !state.audioUrl && (
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Étape passée : l&apos;administration vous interrogera à l&apos;oral.</p>
          )}
        </div>
      )}

      {submitted && (
        <div className="space-y-1 text-sm">
          {state.audioUrl ? (
            <p className="text-ink-soft">Votre enregistrement a été envoyé à l&apos;administration, qui l&apos;écoutera et vous donnera la note de lecture.</p>
          ) : state.skipped ? (
            <p className="text-ink-soft">Étape passée : l&apos;administration vous interrogera à l&apos;oral.</p>
          ) : (
            <p className="text-ink-soft">Pas de lecture enregistrée.</p>
          )}
          <p className="font-bold text-ink">Lecture : note donnée par l&apos;administration</p>
        </div>
      )}
    </div>
  );
}
