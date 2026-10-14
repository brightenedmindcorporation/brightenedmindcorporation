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
  const todo = items.filter((i) => !fs.existsSync(path.join(dir, `${i.id}.mp3`)));
  console.log(`${lang}: ${items.length - todo.length}/${items.length} already done, ${todo.length} to generate (${VOICES[lang]})`);

  let done = 0;
  let failed = 0;
  const queue = [...todo];

  async function worker(n) {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(VOICES[lang], OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    while (queue.length) {
      const item = queue.shift();
      const ok = await makeClip(tts, item.text, path.join(dir, `${item.id}.mp3`), path.join(dir, `.tmp-${n}`));
      if (ok) done++;
      else failed++;
      if ((done + failed) % 25 === 0) console.log(`  ${lang}: ${done + failed}/${todo.length} (${failed} failed)`);
      await sleep(250);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, (_, n) => worker(n)));
  console.log(`${lang}: finished — ${done} generated, ${failed} failed`);
}
process.exit(0);
