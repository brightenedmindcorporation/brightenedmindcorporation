// Generates one mp3 per phrase with Microsoft Edge's neural voices (free).
// Resumable: clips that already exist are skipped, so it can be stopped and
// restarted at any time. Paced and retried because the service answers 429
// when pushed too hard.
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { VOICES, selectedLangs, textsFile, audioDir, fs, path } from "./lib.mjs";

const CONCURRENCY = Number(process.env.AUDIO_CONCURRENCY || 2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function makeClip(tts, text, outFile, tmpDir) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      fs.mkdirSync(tmpDir, { recursive: true });
      const res = await tts.toFile(tmpDir, text, { rate: "-8%" });
      fs.renameSync(res.audioFilePath, outFile);
      fs.rmSync(tmpDir, { recursive: true, force: true });
      return true;
    } catch (error) {
      // 429 / network hiccup: back off, then retry with a fresh connection.
      await sleep(1500 * attempt * attempt);
    }
  }
  return false;
}

for (const lang of selectedLangs()) {
  const items = JSON.parse(fs.readFileSync(textsFile(lang), "utf8"));
  const dir = audioDir(lang);
  fs.mkdirSync(dir, { recursive: true });
  // Remember which voice made each clip, so a clip made with the wrong voice
  // (e.g. French read by the Chinese voice) is redone when the rule changes.
  const registryFile = path.join(dir, "_voices.json");
  const registry = fs.existsSync(registryFile) ? JSON.parse(fs.readFileSync(registryFile, "utf8")) : {};
  const changedFile = path.join(dir, "_changed.json");
  const changed = fs.existsSync(changedFile) ? JSON.parse(fs.readFileSync(changedFile, "utf8")) : [];
  const todo = items.filter((i) => {
    const file = path.join(dir, `${i.id}.mp3`);
    if (!fs.existsSync(file)) return true;
    return (registry[i.id] ?? VOICES[lang]) !== i.voice;
  });
  console.log(`${lang}: ${items.length - todo.length}/${items.length} already done, ${todo.length} to generate (${VOICES[lang]})`);

  let done = 0;
  let failed = 0;
  const queue = [...todo];

  async function worker(n) {
    // One connection per voice, created on first use.
    const engines = {};
    const engineFor = async (voice) => {
      if (engines[voice]) return engines[voice];
      const tts = new MsEdgeTTS();
      // The handshake itself can be rate-limited too (429): retry it.
      for (let attempt = 1; ; attempt++) {
        try {
          await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
          break;
        } catch (error) {
          if (attempt >= 30) throw error;
          await sleep(Math.min(60000, 5000 * attempt));
        }
      }
      engines[voice] = tts;
      return tts;
    };
    while (queue.length) {
      const item = queue.shift();
      const existed = fs.existsSync(path.join(dir, `${item.id}.mp3`));
      const tts = await engineFor(item.voice);
      const ok = await makeClip(tts, item.text, path.join(dir, `${item.id}.mp3`), path.join(dir, `.tmp-${n}`));
      if (ok) {
        done++;
        registry[item.id] = item.voice;
        if (existed) changed.push(item.id);
      } else failed++;
      if ((done + failed) % 25 === 0) console.log(`  ${lang}: ${done + failed}/${todo.length} (${failed} failed)`);
      await sleep(250);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, (_, n) => worker(n)));
  fs.writeFileSync(registryFile, JSON.stringify(registry));
  fs.writeFileSync(changedFile, JSON.stringify(changed));
  console.log(`${lang}: finished — ${done} generated, ${failed} failed`);
}
process.exit(0);
