"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Headphones, Mic, Square, Play, BookOpenText, PenLine, ListChecks } from "lucide-react";
import { auth } from "@/lib/firebase";
import { availableLanguages, getLevelCurriculum } from "@/content/curriculum";
import { CharPalette, ImeTextarea } from "@/components/academy/ImeField";
import { lessonChars, textLength } from "@/lib/academy/writingLab";
import { SPEECH_LANG } from "@/lib/academy/deviceSpeech";
import { claimPlayback, releasePlayback } from "@/lib/academy/lessonAudioPlayer";
import { sfx } from "@/lib/academy/sfx";

interface Question {
  id: string;
  section: "level" | "reading" | "listening";
  level: number;
  question: string;
  options: string[];
}
interface State {
  status: "requested" | "submitted" | "decided";
  questions?: Question[];
  reading?: { title: string; paragraphs: string[] };
  readAloud?: string;
  listening?: { url: string }[];
  writingMin?: { words: number; chars: number };
  level?: number | null;
  comment?: string | null;
}
interface Spoken {
  transcript: string;
  audioUrl: string | null;
  skipped: boolean;
}

function Part({ n, icon: Icon, title, hint, children }: { n: number; icon: React.ComponentType<{ size?: number }>; title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-line rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex items-start gap-3">
        <span className="w-9 h-9 shrink-0 rounded-full bg-red-600 text-white font-black flex items-center justify-center">{n}</span>
        <div>
          <h2 className="text-xl font-black flex items-center gap-2">
            <Icon size={18} /> {title}
          </h2>
          <p className="text-xs text-ink-soft mt-0.5">{hint}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Questions({ list, offset = 0, answers, onPick }: { list: Question[]; offset?: number; answers: Record<string, string>; onPick: (id: string, option: string) => void }) {
  return (
    <>
      {list.map((q, index) => (
        <div key={q.id} className="border-b border-line/80 pb-6 last:border-b-0 last:pb-0">
          <h3 className="font-bold text-lg mb-3 flex gap-3">
            <span className="text-red-500">{offset + index + 1}.</span>
            <span translate="no" className="notranslate">{q.question}</span>
          </h3>
          <div className="space-y-2.5">
            {q.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onPick(q.id, option)}
                className={`w-full text-left px-5 py-3 rounded-2xl border transition ${
                  answers[q.id] === option ? "bg-red-600 border-red-500 text-white font-semibold" : "bg-surface-sunken/60 border-line text-ink-soft hover:border-red-600/50"
                }`}
              >
                <span translate="no" className="notranslate">{option}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default function PlacementPage() {
  const params = useParams<{ lang: string }>();
  const router = useRouter();
  const lang = availableLanguages.find((l) => l.slug === params.lang);
  const cjk = params.lang === "chinese";

  const [state, setState] = useState<State | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [writing, setWriting] = useState("");
  const [sending, setSending] = useState(false);
  const [spoken, setSpoken] = useState<Spoken>({ transcript: "", audioUrl: null, skipped: false });

  const token = async (): Promise<string | null> => {
    const user =
      auth.currentUser ??
      (await new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          unsubscribe();
          resolve(u);
        });
      }));
    return user ? user.getIdToken() : null;
  };

  useEffect(() => {
    if (!lang) return;
    (async () => {
      const idToken = await token();
      if (!idToken) {
        router.push("/login");
        return;
      }
      try {
        const response = await fetch(`/api/academy/placement?langCode=${lang.code}`, { headers: { Authorization: `Bearer ${idToken}` }, cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Erreur serveur");
        setState(result);
      } catch (e: any) {
        setError(e.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang?.code]);

  // Chinese helpers (characters and words of level 1 for the built-in pinyin input).
  const chinese = useMemo(() => {
    if (!cjk) return null;
    const lessons = getLevelCurriculum("chinese", 1)?.lessons ?? [];
    const chars = Array.from(new Set(lessons.flatMap((l) => lessonChars(l))));
    const corpus = lessons.flatMap((l) => [l.title, ...l.sections.flatMap((s) => s.body), ...l.reading]);
    return { chars, corpus };
  }, [cjk]);

  // ---- listening: the conversation as audio, two plays at most ----
  const [plays, setPlays] = useState(0);
  const [playing, setPlaying] = useState(false);
  const run = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopListening = () => {
    run.current++;
    audioRef.current?.pause();
    audioRef.current = null;
    setPlaying(false);
    releasePlayback(stopListening);
  };
  const playListening = async () => {
    const clips = state?.listening ?? [];
    if (playing || plays >= 2 || clips.length === 0) return;
    claimPlayback(stopListening);
    const mine = ++run.current;
    setPlaying(true);
    setPlays((p) => p + 1);
    for (const clip of clips) {
      if (run.current !== mine) return;
      await new Promise<void>((resolve) => {
        const audio = new Audio(clip.url);
        audioRef.current = audio;
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
        setTimeout(resolve, 30_000);
      });
      await new Promise((r) => setTimeout(r, 300));
    }
    if (run.current === mine) {
      setPlaying(false);
      releasePlayback(stopListening);
    }
  };
  useEffect(() => () => stopListening(), []); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- reading aloud: the browser transcribes, and the recording is kept for the reviewer ----
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const recognition = useRef<any>(null);
  const heard = useRef("");
  const chunks = useRef<Blob[]>([]);

  const startReading = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      heard.current = "";
      chunks.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => e.data.size > 0 && chunks.current.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
        const transcript = heard.current.trim();
        setSpoken((s) => ({ ...s, transcript, skipped: false }));
        if (blob.size > 0 && lang) {
          setUploading(true);
          try {
            const form = new FormData();
            form.append("langCode", lang.code);
            form.append("audio", blob, "reading.webm");
            const response = await fetch("/api/academy/placement/audio", { method: "POST", headers: { Authorization: `Bearer ${await token()}` }, body: form });
            const result = await response.json();
            if (response.ok) setSpoken({ transcript, audioUrl: result.url, skipped: false });
            else setMicError(result.error || "L'enregistrement n'a pas pu être envoyé.");
          } catch {
            setMicError("L'enregistrement n'a pas pu être envoyé. Réessayez.");
          } finally {
            setUploading(false);
          }
        }
      };
      recorder.current = rec;
      rec.start();

      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SR) {
        const r = new SR();
        r.lang = SPEECH_LANG[params.lang] ?? "en-US";
        r.continuous = true;
        r.interimResults = false;
        r.onresult = (event: any) => {
          for (let i = event.resultIndex; i < event.results.length; i++) if (event.results[i].isFinal) heard.current += ` ${event.results[i][0].transcript}`;
        };
        r.onerror = () => {};
        recognition.current = r;
        try {
          r.start();
        } catch {
          // already running: ignore
        }
      }
      sfx.recordStart();
      setRecording(true);
    } catch {
      setMicError("Le micro n'est pas accessible. Autorisez-le dans votre navigateur, ou passez cette partie si vous ne pouvez pas l'utiliser.");
    }
  };
  const stopReading = () => {
    try {
      recognition.current?.stop();
    } catch {
      // not running
    }
    // A short wait lets the recognition deliver its last words before the recording is closed.
    setTimeout(() => recorder.current?.state !== "inactive" && recorder.current?.stop(), 600);
    sfx.recordStop();
    setRecording(false);
  };

  if (!lang) return <main className="min-h-screen flex items-center justify-center text-ink-soft">Langue inconnue.</main>;

  const all = state?.questions ?? [];
  const levelQs = all.filter((q) => q.section === "level");
  const readingQs = all.filter((q) => q.section === "reading");
  const listeningQs = all.filter((q) => q.section === "listening");
  const writingMin = cjk ? state?.writingMin?.chars ?? 18 : state?.writingMin?.words ?? 15;
  const answered = all.filter((q) => answers[q.id]).length;
  const writingLength = textLength(writing, cjk);
  const readDone = Boolean(spoken.audioUrl) || spoken.skipped;
  const missing = [
    answered < all.length ? "les questions" : null,
    !readDone ? "la lecture à voix haute" : null,
    writingLength < writingMin ? "le texte" : null,
  ].filter(Boolean);
  const ready = all.length > 0 && missing.length === 0;
  const pick = (id: string, option: string) => {
    sfx.tap();
    setAnswers((a) => ({ ...a, [id]: option }));
  };

  const submit = async () => {
    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/academy/placement", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        body: JSON.stringify({ langCode: lang.code, answers, writing, readAloud: spoken }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      sfx.success();
      setState({ status: "submitted" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-sunken text-ink px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
          <span className="text-xs font-bold uppercase tracking-widest text-red-300">Test de niveau</span>
          <h1 className="text-3xl md:text-4xl font-black mt-2">{lang.label}</h1>
          <p className="text-red-200/80 mt-2 text-sm">
            Cinq parties pour trouver le niveau qui vous convient : questions, lecture, écoute, lecture à voix haute et écriture. Ce n&apos;est pas un examen : répondez de votre mieux, sans aide. Votre niveau vous sera attribué par l&apos;administration après correction.
          </p>
        </div>

        {error && <p className="text-red-500 text-sm bg-red-500/10 border border-red-600/30 rounded-xl p-3">{error}</p>}
        {!state && !error && <p className="text-ink-soft">Chargement…</p>}

        {state?.status === "submitted" && (
          <div className="bg-surface border border-line rounded-3xl p-8 text-center space-y-3">
            <p className="text-2xl font-black">Test envoyé ✓</p>
            <p className="text-ink-soft text-sm">
              L&apos;administration lit votre test et vous attribue le niveau qui vous convient. Vous serez prévenu(e) dans votre espace et par e-mail. Vos cours s&apos;ouvriront à ce moment-là.
            </p>
            <Link href="/academia/dashboard" className="inline-block mt-2 text-sm font-bold text-red-500 hover:underline">
              Aller à mon espace
            </Link>
          </div>
        )}

        {state?.status === "decided" && (
          <div className="bg-surface border border-line rounded-3xl p-8 text-center space-y-3">
            <p className="text-2xl font-black">Votre niveau : {state.level}</p>
            {state.comment && <p className="text-ink-soft text-sm">{state.comment}</p>}
            <Link href="/academia/dashboard" className="inline-block mt-2 text-sm font-bold text-red-500 hover:underline">
              Commencer
            </Link>
          </div>
        )}

        {state?.status === "requested" && (
          <>
            <Part n={1} icon={ListChecks} title="Vocabulaire et grammaire" hint="Certaines questions sont faciles, d'autres plus difficiles : c'est normal.">
              <Questions list={levelQs} answers={answers} onPick={pick} />
            </Part>

            <Part n={2} icon={BookOpenText} title="Lecture" hint="Lisez le texte, puis répondez aux questions.">
              <div className="rounded-2xl border border-line bg-surface-alt p-5 space-y-3" translate="no">
                <p className="notranslate font-black text-lg">{state.reading?.title}</p>
                {state.reading?.paragraphs.map((p, i) => (
                  <p key={i} className="notranslate leading-relaxed">{p}</p>
                ))}
              </div>
              <Questions list={readingQs} offset={levelQs.length} answers={answers} onPick={pick} />
            </Part>

            <Part n={3} icon={Headphones} title="Écoute" hint="Deux personnes parlent. Vous pouvez écouter deux fois, puis répondez aux questions.">
              <div className="rounded-2xl border border-line bg-surface-alt p-5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={playing ? stopListening : playListening}
                  disabled={!playing && plays >= 2}
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl transition"
                >
                  {playing ? <Square size={16} /> : <Play size={16} />}
                  {playing ? "Arrêter" : plays === 0 ? "Écouter la conversation" : plays === 1 ? "Réécouter (dernière fois)" : "Écoutes terminées"}
                </button>
                <span className="text-xs text-ink-soft">{plays}/2 écoutes</span>
              </div>
              <Questions list={listeningQs} offset={levelQs.length + readingQs.length} answers={answers} onPick={pick} />
            </Part>

            <Part n={4} icon={Mic} title="Lecture à voix haute" hint="Lisez ce texte à voix haute dans le micro. Un professeur écoutera votre prononciation.">
              <p translate="no" className="notranslate rounded-2xl border border-line bg-surface-alt p-5 text-lg leading-relaxed">{state.readAloud}</p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={recording ? stopReading : startReading}
                  disabled={uploading}
                  className={`inline-flex items-center gap-2 font-bold px-5 py-3 rounded-xl transition text-white disabled:opacity-50 ${
                    recording ? "bg-red-700 animate-pulse" : "bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800"
                  }`}
                >
                  {recording ? <Square size={16} /> : <Mic size={16} />}
                  {recording ? "Terminer la lecture" : spoken.audioUrl ? "Recommencer l'enregistrement" : "Commencer à lire"}
                </button>
                {uploading && <span className="text-sm text-ink-soft">Envoi de l&apos;enregistrement…</span>}
                {spoken.audioUrl && !uploading && <span className="text-sm text-emerald-500 font-semibold">✓ Enregistrement envoyé</span>}
              </div>
              {spoken.transcript && (
                <p className="text-sm text-ink-soft">
                  Le micro a compris : <i translate="no" className="notranslate">« {spoken.transcript} »</i>
                </p>
              )}
              {micError && <p className="text-sm text-red-500">{micError}</p>}
              {!spoken.audioUrl && !recording && (
                <button type="button" onClick={() => setSpoken((s) => ({ ...s, skipped: !s.skipped }))} className="text-xs font-semibold text-ink-faint hover:text-ink underline">
                  {spoken.skipped ? "✓ Partie passée (cliquez pour annuler)" : "Je ne peux pas utiliser le micro : passer cette partie"}
                </button>
              )}
            </Part>

            <Part
              n={5}
              icon={PenLine}
              title="Écriture : présentez-vous"
              hint={`Écrivez en ${lang.label.toLowerCase()} : votre nom, votre âge, où vous habitez, ce que vous faites et ce que vous aimez. Au moins ${writingMin} ${cjk ? "caractères" : "mots"}.`}
            >
              <ImeTextarea
                value={writing}
                onValueChange={setWriting}
                rows={7}
                className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                placeholder="Écrivez votre texte ici…"
                lang={cjk ? "zh-CN" : undefined}
                {...(cjk ? {} : { spellCheck: false, autoCorrect: "off" })}
              />
              {cjk && chinese && <CharPalette chars={chinese.chars} corpus={chinese.corpus} onPick={(c) => setWriting((t) => t + c)} />}
              <p className={`text-sm font-bold ${writingLength >= writingMin ? "text-emerald-500" : "text-ink-soft"}`}>
                {writingLength}/{writingMin} {cjk ? "caractères" : "mots"}
              </p>
            </Part>

            <button
              onClick={submit}
              disabled={!ready || sending}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition ${
                !ready || sending ? "bg-surface-alt text-ink-faint cursor-not-allowed border border-line" : "glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white"
              }`}
            >
              {sending ? "Envoi…" : ready ? "Envoyer mon test" : `À compléter : ${missing.join(", ")}`}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
