"use client";

import { useEffect, useRef, useState } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

/**
 * Text fields that behave with input-method editors (Chinese pinyin, etc.).
 *
 * While the student is composing ("ni" → 你), the field keeps its own text and
 * only reports the result to the page once the character is chosen. A field
 * that re-renders and rewrites its value on every keystroke can close the
 * IME's candidate list before the student can pick a character.
 */
function useImeValue(value: string, onValueChange: (v: string) => void) {
  const [local, setLocal] = useState(value);
  const composing = useRef(false);

  useEffect(() => {
    if (!composing.current) setLocal(value);
  }, [value]);

  return {
    value: local,
    onChange: (e: { target: { value: string } }) => {
      setLocal(e.target.value);
      if (!composing.current) onValueChange(e.target.value);
    },
    onCompositionStart: () => {
      composing.current = true;
    },
    onCompositionEnd: (e: { currentTarget: { value: string } }) => {
      composing.current = false;
      setLocal(e.currentTarget.value);
      onValueChange(e.currentTarget.value);
    },
  };
}

type Extra = { value: string; onValueChange: (v: string) => void };

export function ImeTextarea({
  value,
  onValueChange,
  ...rest
}: Extra & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">) {
  return <textarea {...rest} {...useImeValue(value, onValueChange)} />;
}

export function ImeInput({
  value,
  onValueChange,
  ...rest
}: Extra & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return <input {...rest} {...useImeValue(value, onValueChange)} />;
}

/**
 * A tap-to-type bank of the characters used in the lesson, so a Chinese
 * exercise can always be done even when the device's own keyboard fails to
 * show its candidates in the browser.
 */
export function CharPalette({ chars, onPick }: { chars: string[]; onPick: (c: string) => void }) {
  if (chars.length === 0) return null;
  return (
    <details className="rounded-xl border border-line bg-surface-alt p-3">
      <summary className="cursor-pointer text-xs font-semibold text-ink-soft">
        Le clavier chinois ne propose pas de caractères ? Touchez ici pour utiliser les caractères de la leçon
      </summary>
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
