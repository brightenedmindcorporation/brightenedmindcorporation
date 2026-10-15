// Lists every distinct lesson phrase per language (for writing phonetics).
import { collectTexts, WORK, fs, path } from "./lib.mjs";
import { extractSpeechText } from "../../lib/academy/audioClips.ts";
import { pathToFileURL } from "url";
import { ROOT } from "./lib.mjs";

for (const lang of ["english", "french", "spanish", "portuguese", "swahili"]) {
  const seen = new Map();
  for (const level of [1, 2, 3]) {
    const mod = await import(pathToFileURL(path.join(ROOT, "content", "curriculum", lang, `level${level}.ts`)).href);
    const c = Object.values(mod).find((v) => v && v.lessons);
    for (const lesson of c.lessons)
      for (const section of lesson.sections)
        for (const line of section.body) {
          const text = extractSpeechText(line).trim();
          const tokens = text.split(/\s+/);
          if (text.length < 2 || tokens.every((t) => t.length <= 1 || /^[-–—,.:]$/.test(t))) continue; // alphabet rows etc.
          if (!seen.has(text)) seen.set(text, 1);
        }
  }
  const list = Array.from(seen.keys());
  fs.writeFileSync(path.join(WORK, "vocab", `${lang}-input.json`), JSON.stringify(list, null, 1));
  console.log(lang, list.length);
}
