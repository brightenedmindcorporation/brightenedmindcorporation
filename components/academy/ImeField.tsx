"use client";

import { useEffect, useRef, useState } from "react";
import { buildPinyinIndex, type PinyinIndex } from "@/lib/academy/pinyinIndex";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

/**
 * Text fields that behave with input-method editors (Chinese pinyin, etc.).
 *
 * The field is UNCONTROLLED: the browser alone owns the text while the student types, so React never
 * rewrites the field's value in the middle of a composition ("ni" → 你) — which is what makes an
 * IME's candidate list vanish. The page is told about the text after each keystroke outside a
 * composition, and once when a character is chosen. When the page itself changes the text (a
 * character tapped in the palette, a reset), the field is updated — never during a composition.
 */
function useImeField<T extends HTMLInputElement | HTMLTextAreaElement>(value: string, onValueChange: (v: string) => void) {
  const ref = useRef<T>(null);
  const composing = useRef(false);
  const report = useRef(onValueChange);
  report.current = onValueChange;
  // Only the first value is given to React as the default: a changing `defaultValue` makes React
  // rewrite the field's text node, which can cancel a composition in progress.
  const initial = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (el && !composing.current && el.value !== value) el.value = value;
  }, [value]);

  return {
    ref,
    defaultValue: initial.current,
    onChange: (e: { target: { value: string } }) => {
      if (!composing.current) report.current(e.target.value);
    },
    onCompositionStart: () => {
      composing.current = true;
    },
    onCompositionEnd: (e: { currentTarget: { value: string } }) => {
      composing.current = false;
      report.current(e.currentTarget.value);
    },
  };
}

type Extra = { value: string; onValueChange: (v: string) => void };

export function ImeTextarea({
  value,
  onValueChange,
  ...rest
}: Extra & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue" | "onChange">) {
  return <textarea {...rest} {...useImeField<HTMLTextAreaElement>(value, onValueChange)} />;
}

export function ImeInput({
  value,
  onValueChange,
  ...rest
}: Extra & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange">) {
  return <input {...rest} {...useImeField<HTMLInputElement>(value, onValueChange)} />;
}

/**
 * A tap-to-type bank of the characters used in the lesson, so a Chinese
 * exercise can always be done even when the device's own keyboard fails to
 * show its candidates in the browser.
 */
/**
 * Pinyin typing built into the site: type "nihao", touch 你好. For students whose own Chinese keyboard
 * does not engage in the browser. The candidates come from the course's own Chinese text.
 */
function PinyinBox({ corpus, onPick }: { corpus: string[]; onPick: (c: string) => void }) {
  const [index, setIndex] = useState<PinyinIndex | null>(null);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let alive = true;
    buildPinyinIndex(corpus)
      .then((i) => alive && setIndex(i))
      .catch(() => {});
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corpus.length]);
  const candidates = index ? index.lookup(typed) : [];
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-ink-soft">Saisie pinyin du site : écrivez le son (sans les tons), puis touchez le mot. « nv » donne 女.</label>
      <input
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        placeholder={index ? "nihao, wo, xuesheng…" : "Chargement…"}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
      />
      {typed && (
        <div className="flex flex-wrap gap-1.5" translate="no">
          {candidates.length === 0 && <span className="text-xs text-ink-faint">Aucun mot de la leçon ne correspond.</span>}
          {candidates.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                onPick(c);
                setTyped("");
              }}
              className="notranslate px-3 h-9 rounded-lg bg-surface border border-line text-lg text-ink hover:border-red-600/60 hover:bg-red-600 hover:text-white transition"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CharPalette({ chars, onPick, corpus }: { chars: string[]; onPick: (c: string) => void; corpus?: string[] }) {
  if (chars.length === 0) return null;
  return (
    <details className="rounded-xl border border-line bg-surface-alt p-3">
      <summary className="cursor-pointer text-xs font-semibold text-ink-soft">
        Le clavier chinois ne marche pas ici ? Touchez pour écrire en pinyin ou avec les caractères de la leçon
      </summary>
      {corpus && corpus.length > 0 && (
        <div className="mt-3">
          <PinyinBox corpus={corpus} onPick={onPick} />
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5" translate="no">
        {chars.map((c) => (
          <button
            key={c}
            type="button"
            // Keep the focus in the field being filled.
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPick(c)}
            className="notranslate w-9 h-9 rounded-lg bg-surface border border-line text-lg text-ink hover:border-red-600/60 hover:bg-red-600 hover:text-white transition"
          >
            {c}
          </button>
        ))}
      </div>
    </details>
  );
}
