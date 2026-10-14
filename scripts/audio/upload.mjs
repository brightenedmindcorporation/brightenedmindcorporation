// Uploads the generated mp3s to Cloudinary under bm-audio/<lang>/<id>.
// Uses the same CLOUDINARY_* variables as the site (.env.local). Resumable:
// clips already on Cloudinary are not uploaded again.
import { v2 as cloudinary } from "cloudinary";
import { selectedLangs, audioDir, textsFile, ROOT, fs, path } from "./lib.mjs";

const env = Object.fromEntries(
  Object.entries(process.env).filter(([k]) => k.startsWith("CLOUDINARY_"))
);
const envFile = path.join(ROOT, ".env.local");
if (fs.existsSync(envFile)) {
  const parsed = (await import("util")).parseEnv(fs.readFileSync(envFile, "utf8"));
  for (const k of Object.keys(parsed)) if (k.startsWith("CLOUDINARY_")) env[k] = parsed[k];
}
if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
  console.error("CLOUDINARY_* variables missing (.env.local).");
  process.exit(1);
}
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const CONCURRENCY = Number(process.env.UPLOAD_CONCURRENCY || 6);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function listExisting(lang) {
  const existing = new Set();
  let cursor;
  do {
    const res = await cloudinary.api.resources({
      resource_type: "video",
      type: "upload",
      prefix: `bm-audio/${lang}/`,
      max_results: 500,
      next_cursor: cursor,
    });
    for (const r of res.resources) existing.add(r.public_id.split("/").pop());
    cursor = res.next_cursor;
  } while (cursor);
  return existing;
}

for (const lang of selectedLangs()) {
  const ids = JSON.parse(fs.readFileSync(textsFile(lang), "utf8")).map((i) => i.id);
  const dir = audioDir(lang);
  const existing = await listExisting(lang);
  const todo = ids.filter((id) => fs.existsSync(path.join(dir, `${id}.mp3`)) && !existing.has(id));
  const missing = ids.filter((id) => !fs.existsSync(path.join(dir, `${id}.mp3`))).length;
  console.log(`${lang}: ${existing.size} already online, ${todo.length} to upload, ${missing} not generated yet`);

  let done = 0;
  let failed = 0;
  const queue = [...todo];
  async function worker() {
    while (queue.length) {
      const id = queue.shift();
      let ok = false;
      for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
        try {
          await cloudinary.uploader.upload(path.join(dir, `${id}.mp3`), {
            resource_type: "video",
            public_id: `bm-audio/${lang}/${id}`,
            overwrite: false,
          });
          ok = true;
        } catch {
          await sleep(1000 * attempt);
        }
      }
      if (ok) done++;
      else failed++;
      if ((done + failed) % 50 === 0) console.log(`  ${lang}: ${done + failed}/${todo.length} (${failed} failed)`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`${lang}: upload finished — ${done} uploaded, ${failed} failed`);
}
