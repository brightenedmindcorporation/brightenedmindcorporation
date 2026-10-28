"use client";

import { setPinyin, usePinyin } from "@/lib/academy/pinyinPref";

/** Shows or hides the pinyin above the characters, in lessons, quizzes and the placement test. */
export default function PinyinToggle() {
  const on = usePinyin();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setPinyin(!on)}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-bold text-ink-soft hover:text-ink"
    >
      <span className={`h-4 w-7 rounded-full p-0.5 transition ${on ? "bg-emerald-500" : "bg-line"}`}>
        <span className={`block h-3 w-3 rounded-full bg-white transition ${on ? "translate-x-3" : ""}`} />
      </span>
      Pinyin {on ? "affiché" : "masqué"}
    </button>
  );
}
