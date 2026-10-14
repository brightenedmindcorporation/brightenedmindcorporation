import { LANGS, WORK, collectTexts, textsFile, fs, path } from "./lib.mjs";

let total = 0;
let chars = 0;
for (const lang of LANGS) {
  const items = await collectTexts(lang);
  fs.mkdirSync(path.dirname(textsFile(lang)), { recursive: true });
  fs.writeFileSync(textsFile(lang), JSON.stringify(items, null, 1));
  const c = items.reduce((n, i) => n + i.text.length, 0);
  console.log(`${lang.padEnd(11)} ${String(items.length).padStart(4)} clips  ${String(c).padStart(7)} chars`);
  total += items.length;
  chars += c;
}
console.log(`TOTAL ${total} clips, ${chars} characters → ${WORK}`);
