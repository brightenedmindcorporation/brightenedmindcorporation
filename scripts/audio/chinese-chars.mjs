// Builds content/vocabulary/chinese.json: pinyin for every character used in
// the Chinese lessons. Pinyin comes from the lessons' own "字 (pīnyīn) - sens"
// entries when the syllables line up with the characters, otherwise from the
// pinyin-pro dictionary.
import { pinyin } from "pinyin-pro";
import { ROOT, fs, path } from "./lib.mjs";
import { pathToFileURL } from "url";
import { extractSpeechText } from "../../lib/academy/audioClips.ts";

const CJK = /[\u4e00-\u9fff]/;
const triple = /^(.+?)\s*\(([^)]+)\)\s*[-–—]\s*(.+)$/;
const fromLessons = new Map(); // char -> pinyin (aligned)
const used = []; // [level, char]

for (const level of [1, 2, 3]) {
  const mod = await import(pathToFileURL(path.join(ROOT, "content", "curriculum", "chinese", `level${level}.ts`)).href);
  const c = Object.values(mod).find((v) => v && v.lessons);
  for (const lesson of c.lessons) {
    const lines = [...lesson.sections.flatMap((s) => s.body), ...lesson.reading, lesson.speakText, lesson.readingSpeakText];
    for (const line of lines) {
      const m = line.match(triple);
      if (m && CJK.test(m[1])) {
        const chars = [...m[1]].filter((ch) => CJK.test(ch));
        const syllables = m[2].trim().split(/\s+/);
        if (chars.length === syllables.length) chars.forEach((ch, i) => { if (!fromLessons.has(ch)) fromLessons.set(ch, syllables[i].replace(/[.,!?]/g, "")); });
      }
      for (const ch of extractSpeechText(line)) if (CJK.test(ch)) used.push([level, ch]);
    }
  }
}

const out = {};
for (const [, ch] of used) {
  if (out[ch]) continue;
  out[ch] = fromLessons.get(ch) ?? pinyin(ch, { toneType: "symbol" });
}
fs.writeFileSync(path.join(ROOT, "content", "vocabulary", "chinese.json"), JSON.stringify(out, null, 1));
console.log("characters:", Object.keys(out).length, "aligned from lessons:", [...fromLessons.keys()].length);
