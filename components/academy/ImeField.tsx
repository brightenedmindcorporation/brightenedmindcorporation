"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const el = ref.current;
    if (el && !composing.current && el.value !== value) el.value = value;
  }, [value]);

  return {
    ref,
    defaultValue: value,
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
