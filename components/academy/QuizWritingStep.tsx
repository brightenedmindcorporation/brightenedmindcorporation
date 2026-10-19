"use client";

import { useState } from "react";
import { Volume2, Lightbulb } from "lucide-react";
import { CharPalette, ImeTextarea } from "@/components/academy/ImeField";
import { DiffView } from "@/components/academy/WritingLab";
import { dialogueClipText } from "@/lib/academy/audioClips";
import { playClip } from "@/lib/academy/lessonAudioPlayer";
import { speakWithDeviceVoice } from "@/lib/academy/deviceSpeech";
import { diffAnswer, textLength } from "@/lib/academy/writingLab";

/**
 * The written part of a quiz, in three short tasks taken from the conversation of the quiz and the
 * lesson (the way the big language apps do it): listen and write, answer a question for yourself,
 * then write a few sentences on the lesson's topic. Nothing here asks the student to "use words from
 * a list": every task says exactly what to write.
 */
export interface QuizWriting {
  cjk: boolean;
  /** Listen and write: whole lines of the quiz conversation (their recording is played). */
  dictation: { speaker: "A" | "B"; text: string }[];
  /** Questions asked in the conversation, to answer about oneself. */
  replies: { speaker: "A" | "B"; question: string; line: string }[];
  /** Sujet of the free text, with the lesson's own ideas to start from. */
  topic: string;
  ideas: string[];
  /** Minimum length of the free text: words, or characters for Chinese. */
  minLength: number;
  /** Tap-to-type characters (Chinese only). */
  chars?: string[];
  /** The lesson and conversation's Chinese text: vocabulary of the built-in pinyin input. */
  corpus?: string[];
}

export interface WritingState {
  dictation: string[];
  replies: string[];
  free: string;
}

export const emptyWritingState = (w?: QuizWriting): WritingState => ({
  dictation: Array(w?.dictation.length ?? 0).fill(""),
  replies: Array(w?.replies.length ?? 0).fill(""),
  free: "",
});

// An honest attempt is enough (the step is not graded): a dictation needs about a third of the
// expected letters, an answer needs a word. Counting words alone failed for a spelled name
// ("J-O-R-D-I") or an e-mail address, which are one "word" each.
const letters = (t: string) => Array.from(t).filter((c) => /[\p{L}\p{N}]/u.test(c)).length;
const dictationOk = (w: QuizWriting, i: number, typed: string) => letters(typed) >= Math.max(2, Math.ceil(letters(w.dictation[i].text) * 0.35));
const replyOk = (typed: string) => letters(typed) >= 2;

/** What is still missing, for the "À compléter" message (empty = ready). */
export function writingMissing(w: QuizWriting, s: WritingState): string[] {
  const missing: string[] = [];
  if (w.dictation.some((_, i) => !dictationOk(w, i, s.dictation[i] ?? ""))) missing.push("la dictée");
  if (w.replies.some((_, i) => !replyOk(s.replies[i] ?? ""))) missing.push("vos réponses");
  if (textLength(s.free, w.cjk) < w.minLength) missing.push("le texte libre");
  return missing;
}

/** What a teacher reads and corrects: every text the student wrote, with what it was an answer to. */
export interface WritingItem {
  kind: "dictation" | "reply" | "free";
  /** The instruction or question the student answered. */
  prompt: string;
  /** For a dictation: the sentence that was dictated. */
  expected?: string;
  text: string;
}

export function writingItems(w: QuizWriting, s: WritingState): WritingItem[] {
  return [
    ...w.dictation.map((d, i): WritingItem => ({ kind: "dictation", prompt: "Dictée", expected: d.text, text: s.dictation[i] ?? "" })),
    ...w.replies.map((r, i): WritingItem => ({ kind: "reply", prompt: r.question, text: s.replies[i] ?? "" })),
    { kind: "free", prompt: w.topic, text: s.free },
  ];
}

/** One text to save with the quiz. */
export function writingSummary(w: QuizWriting, s: WritingState): string {
  return [
    ...w.dictation.map((d, i) => `[Dictée ${i + 1}] ${s.dictation[i] ?? ""}`),
    ...w.replies.map((r, i) => `[Réponse ${i + 1}] ${r.question} → ${s.replies[i] ?? ""}`),
    `[Texte] ${s.free}`,
  ].join("\n");
}

const field =
  "w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60";
const listenBtn =
  "inline-flex items-center gap-2 bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-4 py-2 rounded-xl transition shrink-0";

async function playLine(langSlug: string, speaker: "A" | "B", text: string) {
  const ok = await playClip(langSlug, dialogueClipText(speaker, text));
  if (!ok) speakWithDeviceVoice(text, langSlug, { pitch: speaker === "A" ? 1.15 : 0.8 });
}

function Part({ n, title, hint, children }: { n: string; title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface-alt/40 p-4 md:p-5 space-y-4">
      <div>
        <p className="font-bold text-ink">
          <span className="text-red-500 mr-2">{n}</span>
          {title}
        </p>
        <p className="text-xs text-ink-soft mt-0.5">{hint}</p>
      </div>
      {children}
    </div>
  );
}

export default function QuizWritingStep({
  writing,
  state,
  onChange,
  submitted,
  langSlug,
}: {
  writing: QuizWriting;
  state: WritingState;
  onChange: (next: WritingState) => void;
  submitted: boolean;
  langSlug: string;
}) {
  const unit = writing.cjk ? "caractères" : "mots";
  // Which field the character palette types into (Chinese).
  const [focus, setFocus] = useState<string>("free");

  const setDictation = (i: number, v: string) => !submitted && onChange({ ...state, dictation: state.dictation.map((t, k) => (k === i ? v : t)) });
  const setReply = (i: number, v: string) => !submitted && onChange({ ...state, replies: state.replies.map((t, k) => (k === i ? v : t)) });
  const setFree = (v: string) => !submitted && onChange({ ...state, free: v });

  const pick = (c: string) => {
    if (submitted) return;
    if (focus.startsWith("d")) setDictation(Number(focus.slice(1)), (state.dictation[Number(focus.slice(1))] ?? "") + c);
    else if (focus.startsWith("r")) setReply(Number(focus.slice(1)), (state.replies[Number(focus.slice(1))] ?? "") + c);
    else setFree(state.free + c);
  };

  const fieldProps = writing.cjk ? { lang: "zh-CN" } : { spellCheck: false, autoCorrect: "off" as const, autoCapitalize: "off" as const };
  const freeLength = textLength(state.free, writing.cjk);
  let part = 0;
  const letter = () => String.fromCharCode(65 + part++);

  return (
    <div className="space-y-5">
      {writing.dictation.length > 0 && (
        <Part n={letter()} title="Écoutez et écrivez" hint="Écoutez chaque phrase autant de fois que nécessaire, puis écrivez exactement ce que vous entendez.">
          {writing.dictation.map((d, i) => {
            const typed = state.dictation[i] ?? "";
            return (
              <div key={i} className="space-y-2">
                <button type="button" onClick={() => playLine(langSlug, d.speaker, d.text)} className={listenBtn}>
                  <Volume2 size={15} /> Phrase {i + 1}
                </button>
                <ImeTextarea
                  value={typed}
                  onValueChange={(v) => setDictation(i, v)}
                  onFocus={() => setFocus(`d${i}`)}
                  readOnly={submitted}
                  rows={2}
                  className={field}
                  placeholder="Écrivez la phrase entendue…"
                  {...fieldProps}
                />
                {submitted && (
                  <div className="space-y-1">
                    <DiffView ops={diffAnswer(d.text, typed, writing.cjk).ops} />
                    <p className="text-sm text-ink-soft">
                      Phrase correcte : <span translate="no" className="notranslate text-ink font-semibold">{d.text}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </Part>
      )}

      {writing.replies.length > 0 && (
        <Part n={letter()} title="Répondez pour vous-même" hint="On vous pose une question : répondez par une phrase complète, avec vos propres informations.">
          {writing.replies.map((r, i) => (
            <div key={i} className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => playLine(langSlug, r.speaker, r.line)} className={listenBtn} aria-label="Écouter la question">
                  <Volume2 size={15} /> Écouter
                </button>
                <p translate="no" className="notranslate font-semibold text-ink">{r.question}</p>
              </div>
              <ImeTextarea
                value={state.replies[i] ?? ""}
                onValueChange={(v) => setReply(i, v)}
                onFocus={() => setFocus(`r${i}`)}
                readOnly={submitted}
                rows={2}
                className={field}
                placeholder="Votre réponse…"
                {...fieldProps}
              />
            </div>
          ))}
        </Part>
      )}

      <Part n={letter()} title="Écrivez votre texte" hint={`Au moins ${writing.minLength} ${unit}. Servez-vous des idées proposées et de ce que vous avez appris dans la leçon.`}>
        <div className="rounded-xl border border-red-700/30 bg-red-500/5 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-red-500">Sujet</p>
          <p className="text-ink font-semibold mt-1">{writing.topic}</p>
        </div>
        {writing.ideas.length > 0 && (
          <div className="text-sm text-ink-soft">
            <p className="flex items-center gap-1.5 font-semibold text-ink mb-1.5">
              <Lightbulb size={14} /> Pour vous aider
            </p>
            <ul className="space-y-1" translate="no">
              {writing.ideas.map((idea) => (
                <li key={idea} className="notranslate">
                  • {idea}
                </li>
              ))}
            </ul>
          </div>
        )}
        <ImeTextarea
          value={state.free}
          onValueChange={setFree}
          onFocus={() => setFocus("free")}
          readOnly={submitted}
          rows={6}
          className={field}
          placeholder="Écrivez votre texte ici…"
          {...fieldProps}
        />
        <p className={`text-sm font-bold ${freeLength >= writing.minLength ? "text-emerald-500" : "text-ink-soft"}`}>
          {freeLength}/{writing.minLength} {unit}
        </p>
      </Part>

      {writing.cjk && !submitted && writing.chars && <CharPalette chars={writing.chars} corpus={writing.corpus} onPick={pick} />}
    </div>
  );
}
