"use client";

import { useEffect, useState } from "react";

type PinyinFn = (text: string, options: { type: "array"; toneType: "symbol" }) => string[];

let loader: Promise<PinyinFn> | null = null;
let loaded: PinyinFn | null = null;
const load = () => (loader ||= import("pinyin-pro").then((m) => (loaded = m.pinyin as unknown as PinyinFn)));

const HAN = /([㐀-鿿]+)/;

/** Text where each Chinese character carries its pinyin above it (read in context); other text is left as is. */
export default function Zh({ text, on = true }: { text: string; on?: boolean }) {
  const [pinyin, setPinyin] = useState<PinyinFn | null>(loaded);
  useEffect(() => {
    if (on && !loaded) load().then(setPinyin).catch(() => {});
  }, [on]);

  if (!on || !pinyin) return <>{text}</>;
  return (
    <>
      {text.split(HAN).map((part, i) => {
        if (!HAN.test(part)) return part;
        const chars = Array.from(part);
        const syllables = pinyin(part, { type: "array", toneType: "symbol" });
        if (syllables.length !== chars.length) return part;
        return chars.map((c, k) => (
          <ruby key={`${i}-${k}`} className="[ruby-position:over]">
            {c}
            <rt className="text-[0.55em] font-normal not-italic tracking-normal opacity-80">{syllables[k]}</rt>
          </ruby>
        ));
      })}
    </>
  );
}

/** The pinyin hint some Chinese options carry at the end, "七月 (qīyuè)": it is replaced by the pinyin above the characters. */
export const withoutHint = (option: string) => option.replace(/\s*\([^()]*\)\s*$/, "") || option;
