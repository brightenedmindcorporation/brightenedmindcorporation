"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PenLine, Volume2, CheckCircle2, RotateCcw, Copy, Eye } from "lucide-react";
import type { Lesson } from "@/content/curriculum/types";
import { speakPhrase, speakWithDeviceVoice } from "@/lib/academy/deviceSpeech";
import { CharPalette, ImeInput, ImeTextarea } from "@/components/academy/ImeField";
import { sfx } from "@/lib/academy/sfx";
import {
  buildWritingTask,
  diffAnswer,
  foldAccents,
  textLength,
  usedKeyWords,
  type ClozeItem,
  type DiffOp,
  type OrderItem,
} from "@/lib/academy/writingLab";

type StepId = "dictation" | "cloze" | "order" | "free";

interface Saved {
  done: Partial<Record<StepId, boolean>>;
  draft: string;
  checks: boolean[];
}

const EMPTY: Saved = { done: {}, draft: "", checks: [false, false, false, false] };

const fieldClass =
  "w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60";
const primaryBtn =
  "inline-flex items-center gap-2 bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white text-sm font-bold px-4 py-2 rounded-xl transition";
const ghostBtn =
  "inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink border border-line rounded-xl px-3 py-2 transition disabled:opacity-50";

function StepHeader({ n, title, hint, done }: { n: number; title: string; hint: string; done: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-black ${
          done ? "bg-emerald-500 text-white" : "bg-surface-alt text-ink border border-line"
        }`}
      >
        {done ? <CheckCircle2 size={16} /> : n}
      </span>
      <div>
        <p className="font-bold text-ink">{title}</p>
        <p className="text-xs text-ink-soft mt-0.5">{hint}</p>
      </div>
    </div>
  );
}

/** The typed answer, word by word: green = right, orange = accent, red = wrong/extra, "[…]" = forgotten. */
export function DiffView({ ops }: { ops: DiffOp[] }) {
  return (
    <p translate="no" className="notranslate leading-8 text-lg">
      {ops.map((op, i) => {
        if (op.kind === "ok") return <span key={i} className="text-emerald-500 font-semibold mr-1.5">{op.typed}</span>;
        if (op.kind === "accent")
          return (
            <span key={i} className="text-amber-500 font-semibold mr-1.5" title="Attention aux accents">
              {op.typed}
              <span className="text-xs"> → {op.expected}</span>
            </span>
          );
        if (op.kind === "extra") return <span key={i} className="text-red-500 line-through mr-1.5">{op.typed}</span>;
        return <span key={i} className="text-red-500 font-semibold mr-1.5">[{op.expected}]</span>;
      })}
    </p>
  );
}

function Dictation({ items, langSlug, cjk, chars, corpus, onDone }: { items: { text: string }[]; langSlug: string; cjk: boolean; chars: string[]; corpus: string[]; onDone: () => void }) {
  const [typed, setTyped] = useState<string[]>(() => items.map(() => ""));
  const [focused, setFocused] = useState(0);
  const [results, setResults] = useState<(ReturnType<typeof diffAnswer> | null)[]>(() => items.map(() => null));

  const check = (i: number) => {
    const res = diffAnswer(items[i].text, typed[i], cjk);
    const next = [...results];
    next[i] = res;
    setResults(next);
    if (res.score >= 0.7) sfx.correct();
    else sfx.wrong();
    if (next.every((r) => r && r.score >= 0.7)) onDone();
  };
  const retry = (i: number) => {
    const next = [...results];
    next[i] = null;
    setResults(next);
  };

  return (
    <div className="space-y-5 mt-4">
      {items.map((item, i) => {
        const res = results[i];
        return (
          <div key={i} className="rounded-2xl border border-line bg-surface-alt p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => speakPhrase(item.text, langSlug)} className={primaryBtn}>
                <Volume2 size={15} /> Écouter la phrase {i + 1}
              </button>
              <span className="text-xs text-ink-faint">Écoutez autant de fois que nécessaire, puis écrivez ce que vous entendez.</span>
            </div>
            {!res ? (
              <>
                <ImeTextarea
                  value={typed[i]}
                  onValueChange={(v) => setTyped((prev) => prev.map((t, k) => (k === i ? v : t)))}
                  onFocus={() => setFocused(i)}
                  rows={2}
                  className={fieldClass}
                  placeholder="Écrivez la phrase ici…"
                  lang={cjk ? "zh-CN" : undefined}
                  {...(cjk ? {} : { spellCheck: false, autoCorrect: "off", autoCapitalize: "off" })}
                />
                <button onClick={() => check(i)} disabled={!typed[i].trim()} className={primaryBtn}>
                  Vérifier
                </button>
              </>
            ) : (
              <div className="space-y-3">
                <p className={`text-sm font-bold ${res.score >= 0.7 ? "text-emerald-500" : "text-red-500"}`}>
                  {Math.round(res.score * 100)} % de mots justes
                  {res.score >= 0.95 ? " — parfait !" : res.score >= 0.7 ? " — bien joué, corrigez les détails." : " — réécoutez et réessayez."}
                </p>
                <DiffView ops={res.ops} />
                <div className="text-sm text-ink-soft">
                  Phrase correcte : <span translate="no" className="notranslate text-ink font-semibold">{item.text}</span>
                </div>
                <button onClick={() => retry(i)} className={ghostBtn}>
                  <RotateCcw size={14} /> Réessayer
                </button>
              </div>
            )}
          </div>
        );
      })}
      {cjk && <CharPalette chars={chars} corpus={corpus} onPick={(c) => setTyped((prev) => prev.map((t, k) => (k === focused ? t + c : t)))} />}
    </div>
  );
}

function Cloze({ items, cjk, chars, corpus, onDone }: { items: ClozeItem[]; cjk: boolean; chars: string[]; corpus: string[]; onDone: () => void }) {
  const [answers, setAnswers] = useState<string[]>(() => items.map(() => ""));
  const [focused, setFocused] = useState(0);
  const [state, setState] = useState<("idle" | "ok" | "accent" | "wrong")[]>(() => items.map(() => "idle"));

  const check = () => {
    const next = items.map((it, i) => {
      const a = answers[i].trim();
      const exact = cjk ? a === it.answer : a.toLowerCase() === it.answer.toLowerCase();
      if (exact) return "ok" as const;
      if (!cjk && foldAccents(a.toLowerCase()) === foldAccents(it.answer.toLowerCase())) return "accent" as const;
      return "wrong" as const;
    });
    setState(next);
    if (next.every((s) => s === "ok")) sfx.correct();
    else sfx.wrong();
    if (next.every((s) => s === "ok")) onDone();
  };

  return (
    <div className="space-y-4 mt-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-line bg-surface-alt p-4 space-y-2">
          <p translate="no" className="notranslate text-lg text-ink leading-10">
            {it.before}
            <ImeInput
              value={answers[i]}
              onValueChange={(v) => {
                setAnswers((prev) => prev.map((a, k) => (k === i ? v : a)));
                setState((prev) => prev.map((s, k) => (k === i ? "idle" : s)));
              }}
              onFocus={() => setFocused(i)}
              lang={cjk ? "zh-CN" : undefined}
              {...(cjk ? {} : { spellCheck: false, autoCorrect: "off", autoCapitalize: "off" })}
              style={{ width: `${cjk ? Math.max(it.answer.length * 2, 8) : Math.max(it.answer.length, 4) + 2}ch` }}
              className={`mx-1.5 text-center bg-surface border-b-2 rounded px-1 py-0.5 focus:outline-none ${
                state[i] === "ok"
                  ? "border-emerald-500 text-emerald-500"
                  : state[i] === "idle"
                    ? "border-red-600/60 text-ink"
                    : "border-red-500 text-red-500"
              }`}
              aria-label={`Mot manquant, phrase ${i + 1}`}
            />
            {it.after}
          </p>
          {state[i] === "ok" && <p className="text-sm font-semibold text-emerald-500">Correct !</p>}
          {state[i] === "accent" && (
            <p className="text-sm font-semibold text-amber-500">
              Presque : attention aux accents → <span translate="no" className="notranslate">{it.answer}</span>
            </p>
          )}
          {state[i] === "wrong" && <p className="text-sm font-semibold text-red-500">Pas tout à fait. Relisez la phrase et réessayez.</p>}
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        <button onClick={check} disabled={answers.some((a) => !a.trim())} className={primaryBtn}>
          Vérifier mes réponses
        </button>
        {state.some((s) => s === "wrong") && (
          <button
            onClick={() => setState(state.map((s, i) => (s === "wrong" ? "idle" : s)))}
            className={ghostBtn}
            title="Efface les marques d'erreur"
          >
            <RotateCcw size={14} /> Réessayer
          </button>
        )}
      </div>
      {state.every((s) => s === "ok") && (
        <p className="text-sm font-semibold text-emerald-500">Toutes les phrases sont complètes. Bravo !</p>
      )}
      {cjk && <CharPalette chars={chars} corpus={corpus} onPick={(c) => setAnswers((prev) => prev.map((a, k) => (k === focused ? a + c : a)))} />}
    </div>
  );
}

function OrderTask({ item, cjk, onSolved }: { item: OrderItem; cjk: boolean; onSolved: () => void }) {
  const [built, setBuilt] = useState<number[]>([]);
  const [result, setResult] = useState<"idle" | "ok" | "wrong">("idle");
  const byId = useMemo(() => new Map(item.tiles.map((t) => [t.id, t.text])), [item]);
  const remaining = item.tiles.filter((t) => !built.includes(t.id));

  const check = () => {
    const ok = built.length === item.solution.length && built.every((id, i) => byId.get(id) === byId.get(item.solution[i]));
    setResult(ok ? "ok" : "wrong");
    if (ok) sfx.correct();
    else sfx.wrong();
    if (ok) onSolved();
  };

  return (
    <div className="rounded-2xl border border-line bg-surface-alt p-4 space-y-3">
      <div
        translate="no"
        className={`notranslate min-h-14 rounded-xl border-2 border-dashed p-2 flex flex-wrap gap-2 ${
          result === "ok" ? "border-emerald-500" : result === "wrong" ? "border-red-500" : "border-line"
        }`}
      >
        {built.length === 0 && <span className="text-xs text-ink-faint p-2">Touchez les mots dans le bon ordre…</span>}
        {built.map((id) => (
          <button
            key={id}
            onClick={() => {
              setBuilt(built.filter((b) => b !== id));
              setResult("idle");
            }}
            className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold"
          >
            {byId.get(id)}
          </button>
        ))}
      </div>
      <div translate="no" className="notranslate flex flex-wrap gap-2">
        {remaining.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              sfx.tap();
              setBuilt([...built, t.id]);
              setResult("idle");
            }}
            className="px-3 py-1.5 rounded-lg bg-surface border border-line text-ink font-semibold hover:border-red-600/60"
          >
            {t.text}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={check} disabled={remaining.length > 0} className={primaryBtn}>
          Vérifier
        </button>
        <button
          onClick={() => {
            setBuilt([]);
            setResult("idle");
          }}
          className={ghostBtn}
        >
          <RotateCcw size={14} /> Recommencer
        </button>
        {result === "ok" && (
          <span className="text-sm font-semibold text-emerald-500">
            Correct ! <span translate="no" className="notranslate text-ink">{item.full}</span>
          </span>
        )}
        {result === "wrong" && <span className="text-sm font-semibold text-red-500">Ce n'est pas encore ça — déplacez les mots et vérifiez à nouveau.</span>}
      </div>
    </div>
  );
}

export default function WritingLab({ lesson, langSlug }: { lesson: Lesson; langSlug: string }) {
  const task = useMemo(() => buildWritingTask(langSlug, lesson), [langSlug, lesson]);
  const storageKey = `bm-writing:${langSlug}:${lesson.id}:${lesson.title}`;
  const [saved, setSaved] = useState<Saved>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderSolved, setOrderSolved] = useState<boolean[]>(() => task.order.map(() => false));
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      // storage unavailable: the lab still works, just without memory
    }
    setLoaded(true);
  }, [storageKey]);

  const persist = (next: Saved) => {
    setSaved(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // ignore
      }
    }, 400);
  };

  const markDone = (step: StepId) => {
    if (!saved.done[step]) {
      sfx.complete();
      persist({ ...saved, done: { ...saved.done, [step]: true } });
    }
  };

  const steps: { id: StepId; present: boolean }[] = [
    { id: "dictation", present: task.dictation.length > 0 },
    { id: "cloze", present: task.cloze.length > 0 },
    { id: "order", present: task.order.length > 0 },
    { id: "free", present: true },
  ];
  const present = steps.filter((s) => s.present);
  const doneCount = present.filter((s) => saved.done[s.id]).length;

  // Free writing
  const used = usedKeyWords(saved.draft, task.keyWords);
  const length = textLength(saved.draft, task.cjk);
  const neededWords = Math.min(3, task.keyWords.length);
  const freeReady = length >= task.goal && used.length >= neededWords;
  useEffect(() => {
    if (loaded && freeReady && !saved.done.free) markDone("free");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freeReady, loaded]);

  const orderAllSolved = orderSolved.length > 0 && orderSolved.every(Boolean);
  useEffect(() => {
    if (loaded && orderAllSolved && !saved.done.order) markDone("order");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderAllSolved, loaded]);

  let n = 0;
  const checklist = [
    "Mes phrases commencent par une majuscule et finissent par un point.",
    "J'ai relu l'orthographe et les accents.",
    "Mes verbes s'accordent avec le sujet.",
    "J'ai écouté mon texte et il sonne naturel.",
  ];

  return (
    <div className="bg-surface rounded-3xl p-8 border border-line shadow-xl">
      <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
        <PenLine size={22} /> Writing Practice
      </h2>
      <p className="text-ink-soft mt-3 text-sm max-w-2xl">
        Quatre étapes pour passer de la copie à la production : écouter et écrire, compléter, reconstruire, puis écrire
        votre propre texte avec le vocabulaire de la leçon. Votre progression est enregistrée sur cet appareil.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-surface-alt overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(doneCount / present.length) * 100}%` }} />
        </div>
        <span className="text-xs font-bold text-ink-soft">
          {doneCount}/{present.length}
        </span>
      </div>

      <div className="mt-8 space-y-10">
        {task.dictation.length > 0 && (
          <section>
            <StepHeader
              n={++n}
              title="Dictée"
              hint="Écoutez, écrivez, puis comparez mot à mot. Les accents comptent ; les majuscules et la ponctuation ne sont pas notées."
              done={!!saved.done.dictation}
            />
            <Dictation items={task.dictation} langSlug={langSlug} cjk={task.cjk} chars={task.chars} corpus={task.corpus} onDone={() => markDone("dictation")} />
          </section>
        )}

        {task.cloze.length > 0 && (
          <section>
            <StepHeader
              n={++n}
              title="Phrases à compléter"
              hint="Retrouvez le mot manquant dans chaque phrase du texte de lecture."
              done={!!saved.done.cloze}
            />
            <Cloze items={task.cloze} cjk={task.cjk} chars={task.chars} corpus={task.corpus} onDone={() => markDone("cloze")} />
          </section>
        )}

        {task.order.length > 0 && (
          <section>
            <StepHeader
              n={++n}
              title="Remettre dans l'ordre"
              hint={task.cjk ? "Reconstruisez la phrase en replaçant les caractères." : "Reconstruisez la phrase en replaçant les mots."}
              done={!!saved.done.order}
            />
            <div className="space-y-4 mt-4">
              {task.order.map((item, i) => (
                <OrderTask
                  key={i}
                  item={item}
                  cjk={task.cjk}
                  onSolved={() => setOrderSolved((prev) => prev.map((v, k) => (k === i ? true : v)))}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <StepHeader
            n={++n}
            title="À vous d'écrire"
            hint={`Rédigez un texte d'au moins ${task.goal} ${task.cjk ? "caractères" : "mots"} en réutilisant des mots de la leçon.`}
            done={!!saved.done.free}
          />
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-red-700/30 bg-red-500/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-red-500">Sujet</p>
              <p className="text-ink font-semibold mt-1">{task.prompt}</p>
              {task.starters.length > 0 && (
                <>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-soft mt-3">Pour démarrer</p>
                  <ul className="list-disc ml-5 mt-1 text-sm text-ink-soft space-y-0.5">
                    {task.starters.map((s, i) => (
                      <li key={i} translate="no" className="notranslate">{s}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {task.keyWords.length > 0 && (
              <div>
                <p className="text-xs font-bold text-ink-soft mb-2">
                  Mots de la leçon à utiliser ({used.length}/{task.keyWords.length}, au moins {neededWords})
                </p>
                <div className="flex flex-wrap gap-2" translate="no">
                  {task.keyWords.map((w) => {
                    const ok = used.includes(w);
                    return (
                      <span
                        key={w}
                        className={`notranslate text-sm font-semibold px-3 py-1 rounded-full border ${
                          ok ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/40" : "bg-surface-alt text-ink-soft border-line"
                        }`}
                      >
                        {ok ? "✓ " : ""}
                        {w}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <ImeTextarea
              value={saved.draft}
              onValueChange={(v) => persist({ ...saved, draft: v })}
              rows={7}
              className={fieldClass}
              placeholder="Écrivez votre texte ici…"
              lang={task.cjk ? "zh-CN" : undefined}
              {...(task.cjk ? {} : { spellCheck: false, autoCorrect: "off" })}
            />
            {task.cjk && <CharPalette chars={task.chars} corpus={task.corpus} onPick={(c) => persist({ ...saved, draft: saved.draft + c })} />}
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-sm font-bold ${length >= task.goal ? "text-emerald-500" : "text-ink-soft"}`}>
                {length}/{task.goal} {task.cjk ? "caractères" : "mots"}
              </span>
              <button
                onClick={() => speakWithDeviceVoice(saved.draft, langSlug)}
                disabled={!saved.draft.trim()}
                className={ghostBtn}
                title="Écouter votre texte lu par une voix de synthèse"
              >
                <Volume2 size={14} /> Écouter mon texte
              </button>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(saved.draft);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  } catch {
                    // clipboard unavailable
                  }
                }}
                disabled={!saved.draft.trim()}
                className={ghostBtn}
              >
                <Copy size={14} /> {copied ? "Copié !" : "Copier"}
              </button>
            </div>

            <div className="rounded-2xl border border-line bg-surface-alt p-4">
              <p className="text-xs font-bold text-ink-soft mb-2">Relecture : cochez quand c'est fait</p>
              <div className="space-y-1.5">
                {checklist.map((label, i) => (
                  <label key={i} className="flex items-start gap-2 text-sm text-ink-soft cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!saved.checks[i]}
                      onChange={() => persist({ ...saved, checks: saved.checks.map((c, k) => (k === i ? !c : c)) })}
                      className="mt-0.5"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {task.model.length > 0 && (
              <div>
                {length >= Math.ceil(task.goal / 2) ? (
                  <button onClick={() => setShowModel(!showModel)} className={ghostBtn}>
                    <Eye size={14} /> {showModel ? "Masquer le texte modèle" : "Comparer avec un texte modèle"}
                  </button>
                ) : (
                  <p className="text-xs text-ink-faint">
                    Un texte modèle se débloque quand vous avez écrit la moitié du minimum : essayez d'abord seul.
                  </p>
                )}
                {showModel && (
                  <div className="mt-3 rounded-2xl border border-line bg-surface-alt p-4 space-y-1.5 text-ink-soft" translate="no">
                    {task.model.map((l, i) => (
                      <p key={i} className="notranslate">{l}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {doneCount === present.length && (
        <p className="mt-8 flex items-center gap-2 text-emerald-500 font-bold">
          <CheckCircle2 size={18} /> Atelier d'écriture terminé pour cette leçon.
        </p>
      )}
    </div>
  );
}
