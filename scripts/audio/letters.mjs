// One mp3 per English letter name (A "ay", B "bee"...), saved in public/audio/letters/en/.
// They are tiny, so they live in the repo and the lesson plays them without any network setup.
//   node scripts/audio/letters.mjs
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// The plain capital letter, which the voice reads as the English letter name. Respellings ("ay", "ee", "eff") are
// misread ("eye", "ee ee", "ee ef ef"), so they are not used.
const NAMES = Object.fromEntries("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => [c, `${c}.`]));
const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "public", "audio", "letters", "en");
fs.mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let tts;
for (let attempt = 1; ; attempt++) {
  try {
    tts = new MsEdgeTTS();
    await tts.setMetadata("en-US-AriaNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    break;
  } catch (error) {
    if (attempt >= 12) throw error;
    console.log("handshake retry", attempt);
    await sleep(4000 * attempt);
  }
}
for (const [letter, name] of Object.entries(NAMES)) {
  const file = path.join(out, `${letter.toLowerCase()}.mp3`);
  if (fs.existsSync(file)) continue;
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const tmp = path.join(out, `_tmp_${letter}`);
      fs.mkdirSync(tmp, { recursive: true });
      const res = await tts.toFile(tmp, name, { rate: "-15%" });
      fs.renameSync(res.audioFilePath, file);
      fs.rmSync(tmp, { recursive: true, force: true });
      console.log(letter, "ok");
      break;
    } catch (error) {
      console.log(letter, "retry", attempt);
      await sleep(1500 * attempt);
    }
  }
}
