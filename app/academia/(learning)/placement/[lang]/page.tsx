"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { availableLanguages, getLevelCurriculum } from "@/content/curriculum";
import { CharPalette, ImeTextarea } from "@/components/academy/ImeField";
import { lessonChars, textLength } from "@/lib/academy/writingLab";
import { sfx } from "@/lib/academy/sfx";

interface Question {
  id: string;
  level: number;
  question: string;
  options: string[];
}
interface State {
  status: "requested" | "submitted" | "decided";
  questions?: Question[];
  writingMin?: { words: number; chars: number };
  level?: number | null;
  comment?: string | null;
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

  // Chinese helpers (the characters and words of level 1 for the built-in pinyin input).
  const chinese = useMemo(() => {
    if (!cjk) return null;
    const lessons = getLevelCurriculum("chinese", 1)?.lessons ?? [];
    const chars = Array.from(new Set(lessons.flatMap((l) => lessonChars(l))));
    const corpus = lessons.flatMap((l) => [l.title, ...l.sections.flatMap((s) => s.body), ...l.reading]);
    return { chars, corpus };
  }, [cjk]);

  if (!lang) return <main className="min-h-screen flex items-center justify-center text-ink-soft">Langue inconnue.</main>;

  const questions = state?.questions ?? [];
  const writingMin = cjk ? state?.writingMin?.chars ?? 18 : state?.writingMin?.words ?? 15;
  const answered = questions.filter((q) => answers[q.id]).length;
  const writingLength = textLength(writing, cjk);
  const ready = questions.length > 0 && answered === questions.length && writingLength >= writingMin;

  const submit = async () => {
    setSending(true);
    setError(null);
    try {
      const idToken = await token();
      const response = await fetch("/api/academy/placement", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ langCode: lang.code, answers, writing }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      sfx.success();
      setState({ status: "submitted" });
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
            Quelques questions et un petit texte pour trouver le niveau qui vous convient. Ce n&apos;est pas un examen : répondez de votre mieux, sans aide.
          </p>
        </div>

        {error && <p className="text-red-500 text-sm bg-red-500/10 border border-red-600/30 rounded-xl p-3">{error}</p>}
        {!state && !error && <p className="text-ink-soft">Chargement…</p>}

        {state?.status === "submitted" && (
          <div className="bg-surface border border-line rounded-3xl p-8 text-center space-y-3">
            <p className="text-2xl font-black">Test envoyé ✓</p>
            <p className="text-ink-soft text-sm">
              L&apos;administration ou un professeur corrige votre test et vous attribue le niveau qui vous convient. Vous serez prévenu(e) dans votre espace et par e-mail.
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
            <div className="bg-surface border border-line rounded-3xl p-6 md:p-8 space-y-8">
              <div>
                <h2 className="text-xl font-black">Partie 1 : questions</h2>
                <p className="text-xs text-ink-soft mt-0.5">
                  {answered}/{questions.length} réponses. Certaines questions sont faciles, d&apos;autres plus difficiles : c&apos;est normal.
                </p>
              </div>
              {questions.map((q, index) => (
                <div key={q.id} className="border-b border-line/80 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-bold text-lg mb-3 flex gap-3">
                    <span className="text-red-500">{index + 1}.</span>
                    <span translate="no" className="notranslate">{q.question}</span>
                  </h3>
                  <div className="space-y-2.5">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          sfx.tap();
                          setAnswers((a) => ({ ...a, [q.id]: option }));
                        }}
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
            </div>

            <div className="bg-surface border border-line rounded-3xl p-6 md:p-8 space-y-4">
              <div>
                <h2 className="text-xl font-black">Partie 2 : présentez-vous</h2>
                <p className="text-xs text-ink-soft mt-0.5">
                  Écrivez en {lang.label.toLowerCase()} : votre nom, votre âge, où vous habitez, ce que vous faites et ce que vous aimez. Un professeur lira votre texte. Au moins {writingMin} {cjk ? "caractères" : "mots"}.
                </p>
              </div>
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
            </div>

            <button
              onClick={submit}
              disabled={!ready || sending}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition ${
                !ready || sending ? "bg-surface-alt text-ink-faint cursor-not-allowed border border-line" : "glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white"
              }`}
            >
              {sending ? "Envoi…" : ready ? "Envoyer mon test" : `À compléter : ${answered < questions.length ? "les questions" : "le texte"}`}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
