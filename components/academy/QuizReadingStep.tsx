"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, RotateCcw, Upload, CheckCircle2 } from "lucide-react";
import { sfx } from "@/lib/academy/sfx";
import { SPEECH_LANG } from "@/lib/academy/deviceSpeech";
import { diffAnswer } from "@/lib/academy/writingLab";
import { DiffView } from "@/components/academy/WritingLab";
import Zh from "@/components/academy/Zh";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

/** The reading-aloud part of a quiz: the passage to read, in the language of the quiz. */
export interface QuizReading {
  text: string;
  cjk: boolean;
}

export interface ReadingState {
  /** What the browser's speech recognition heard. */
  transcript: string;
  /** Out of 100 (how close the reading was to the passage), null until the student has read or skipped. */
  percent: number | null;
  skipped: boolean;
  /** A recording of the student's voice sent to the administration (when the browser cannot recognise speech). */
  audioUrl?: string;
}

export const emptyReadingState = (): ReadingState => ({ transcript: "", percent: null, skipped: false });
export const readingDone = (s: ReadingState) => s.percent !== null || s.skipped;

/** Speech recognition never writes exactly the passage: 85 % of the words right already earns the full part. */
export function readingPercent(text: string, transcript: string, cjk: boolean): number {
  if (!transcript.trim()) return 0;
  return Math.min(100, Math.round((diffAnswer(text, transcript, cjk).score * 100) / 0.85));
}

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

/** Plain-French explanation for each way the microphone can fail, with what to do about it. */
function speechErrorMessage(code: string): string | null {
  switch (code) {
    case "not-allowed":
      return "Le micro n'est pas autorisé pour ce site. Autorisez-le dans les réglages du navigateur, puis réessayez.";
    case "service-not-allowed":
      return "La reconnaissance vocale est désactivée sur cet appareil. Sur iPhone ou iPad : Réglages > Général > Clavier > activez « Dictée » (et Siri). Sinon, utilisez l'enregistrement ci-dessous.";
    case "audio-capture":
      return "Aucun micro n'a été trouvé. Vérifiez qu'il est branché, ou utilisez un autre appareil.";
    case "network":
      return "La reconnaissance vocale a besoin d'internet et la connexion a coupé. Réessayez, ou utilisez l'enregistrement ci-dessous.";
    case "language-not-supported":
      return "Ce navigateur ne reconnaît pas cette langue à voix haute. Utilisez l'enregistrement ci-dessous.";
    case "no-speech":
      return "Je n'ai rien entendu. Parlez près du micro et réessayez.";
    default:
      return null;
  }
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
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognition = useRef<any>(null);
  const heard = useRef("");
  const [supported, setSupported] = useState(true);
  // The second way: record the voice and send it to the administration, which listens to it.
  const [canRecord, setCanRecord] = useState(false);
  const [rec, setRec] = useState<"idle" | "recording" | "ready" | "uploading" | "failed">("idle");
  const [recMessage, setRecMessage] = useState<string | null>(null);
  const [clip, setClip] = useState<{ blob: Blob; url: string; type: string } | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const autoStop = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSupported(Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition));
    setCanRecord(Boolean(navigator.mediaDevices?.getUserMedia) && typeof MediaRecorder !== "undefined");
    return () => {
      try {
        recognition.current?.abort();
      } catch {
        // not running
      }
      if (autoStop.current) clearTimeout(autoStop.current);
      stream.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ---- way 1: the browser recognises the speech ----
  const start = () => {
    setError(null);
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    heard.current = "";
    const r = new SR();
    r.lang = SPEECH_LANG[langSlug] ?? "en-US";
    // Safari (iPhone, iPad, Mac) stops at once with "continuous"; it works one sentence at a time, so it is only used elsewhere.
    const safari = /^((?!chrome|android|crios|fxios|edg|opr).)*safari/i.test(navigator.userAgent) || /iPhone|iPad|iPod/.test(navigator.userAgent);
    r.continuous = !safari;
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.onresult = (event: any) => {
      // The whole text heard so far (final and interim parts): some browsers never mark the last part as final.
      let text = "";
      for (let i = 0; i < event.results.length; i++) text += ` ${event.results[i][0].transcript}`;
      heard.current = text;
    };
    r.onerror = (e: any) => {
      const message = speechErrorMessage(e?.error);
      if (message) setError(message);
      else if (e?.error && e.error !== "aborted") setError("La reconnaissance vocale a rencontré un problème. Réessayez, ou utilisez l'enregistrement ci-dessous.");
    };
    r.onend = () => {
      setRecording(false);
      const transcript = heard.current.trim();
      if (transcript) onChange({ transcript, percent: readingPercent(reading.text, transcript, reading.cjk), skipped: false });
      else setError((prev) => prev ?? "Je n'ai rien compris. Parlez près du micro et réessayez, ou utilisez l'enregistrement ci-dessous.");
    };
    recognition.current = r;
    try {
      r.start();
      sfx.recordStart();
      setRecording(true);
    } catch {
      setError("Le micro n'a pas pu démarrer. Réessayez, ou utilisez l'enregistrement ci-dessous.");
    }
  };

  const stop = () => {
    try {
      recognition.current?.stop();
    } catch {
      // not running
    }
    sfx.recordStop();
  };

  // ---- way 2: record the voice, the administration listens ----
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
      onChange({ transcript: "", percent: null, skipped: true, audioUrl: result.url });
      setRec("idle");
    } catch (e: any) {
      setRec("ready");
      setRecMessage(e?.message || "L'envoi a échoué. Réessayez.");
    }
  };

  const diff = submitted && state.transcript ? diffAnswer(reading.text, state.transcript, reading.cjk).ops : null;
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
          {/* Way 1 */}
          <div className="flex flex-wrap items-center gap-3">
            {!recording ? (
              <button
                type="button"
                onClick={start}
                disabled={!supported}
                className={`${btn} bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white`}
              >
                {state.percent !== null ? <RotateCcw size={16} aria-hidden="true" /> : <Mic size={16} aria-hidden="true" />} {state.percent !== null ? "Lire à nouveau" : "Lire avec le micro"}
              </button>
            ) : (
              <button type="button" onClick={stop} className={`${btn} bg-ink text-surface animate-pulse`}>
                <Square size={14} aria-hidden="true" /> J&apos;ai fini de lire
              </button>
            )}
          </div>

          {!supported && (
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Ce navigateur ne reconnaît pas la voix. Utilisez l&apos;enregistrement ci-dessous : l&apos;administration écoutera votre lecture.
            </p>
          )}
          {error && (
            <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">
              {error}
            </p>
          )}
          {state.percent !== null && (
            <p className="text-sm text-ink-soft">
              Le micro a compris : <span translate="no" className="notranslate text-ink">{state.transcript}</span>
            </p>
          )}

          {/* Way 2 */}
          {state.percent === null && !recording && (
            <div className="rounded-2xl border border-line bg-surface-alt/60 p-4 space-y-3">
              <p className="text-sm font-bold text-ink">Le micro ne comprend pas ma voix ?</p>
              {canRecord ? (
                <>
                  <p className="text-sm text-ink-soft">Enregistrez-vous en lisant le texte : l&apos;administration écoutera votre lecture et vous donnera la note.</p>
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
                    <button type="button" onClick={startRecording} className={`${btn} border border-line bg-surface text-ink hover:border-red-600/60`}>
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
          )}

          {state.audioUrl && (
            <p role="status" className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 size={18} aria-hidden="true" /> Votre enregistrement est envoyé à l&apos;administration. Vous pouvez continuer.
            </p>
          )}

          {/* Way 3: only when this browser can neither recognise speech nor record (Opera Mini): otherwise the student could never send the quiz */}
          {!supported && !canRecord && !state.skipped && state.percent === null && (
            <button
              type="button"
              onClick={() => onChange({ transcript: "", percent: null, skipped: true })}
              className={`${btn} border border-line bg-surface text-ink-soft hover:text-ink hover:border-red-600/60 w-full sm:w-auto`}
            >
              Passer cette étape : l&apos;administration m&apos;interrogera à l&apos;oral
            </button>
          )}
          {state.skipped && !state.audioUrl && (
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
              Étape passée : l&apos;administration vous interrogera à l&apos;oral. Vous pouvez encore lire avec le micro.
            </p>
          )}
        </div>
      )}

      {submitted && (
        <div className="space-y-1 text-sm">
          {diff ? (
            <DiffView ops={diff} />
          ) : state.audioUrl ? (
            <p className="text-ink-soft">Votre enregistrement a été envoyé à l&apos;administration, qui vous donnera la note de lecture.</p>
          ) : state.skipped ? (
            <p className="text-ink-soft">Étape passée : l&apos;administration vous interrogera à l&apos;oral.</p>
          ) : (
            <p className="text-ink-soft">Pas de lecture enregistrée.</p>
          )}
          {!state.skipped && <p className="font-bold text-ink">Lecture : {state.percent ?? 0}/100</p>}
        </div>
      )}
    </div>
  );
}
