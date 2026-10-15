// Shared helpers for the lesson-audio tooling (collect / generate / upload).
//
//   node --experimental-strip-types scripts/audio/collect.mjs
//   node --experimental-strip-types scripts/audio/generate.mjs [lang…]
//   node --experimental-strip-types scripts/audio/upload.mjs   [lang…]
//
// Work files (texts + mp3s) live OUTSIDE the repo, in ../bm-audio, so the
// ~100 MB of audio never enters git — it is hosted on Cloudinary.
import path from "path";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { clipId, extractSpeechText, lessonNarrations, verbPhrases } from "../../lib/academy/audioClips.ts";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const WORK = process.env.AUDIO_WORK_DIR || path.resolve(ROOT, "..", "bm-audio");

export const LANGS = ["english", "french", "spanish", "portuguese", "chinese", "swahili"];

// One consistent teacher voice per language (Microsoft Edge neural voices).
export const VOICES = {
  english: "en-US-AriaNeural",
  french: "fr-FR-DeniseNeural",
  spanish: "es-ES-ElviraNeural",
  portuguese: "pt-BR-FranciscaNeural",
  chinese: "zh-CN-XiaoxiaoNeural",
  swahili: "sw-KE-ZuriNeural",
};

// Some lessons mix languages: e.g. the Chinese course explains in French and
// only the examples are Chinese. Reading a French explanation with the
// Chinese voice (or the reverse) sounds wrong, so each phrase gets the voice
// of the language it is actually written in.
const FRENCH_MARKERS = new Set(
  "les des du est sont avec pour dans cette vous nous très être avoir aux sur par pas ne mais où leur leurs mon mes notre votre exemple verbe verbes pluriel singulier prononciation exercice phrase phrases mot mots voyelle voyelles consonne consonnes lettre lettres chinois français anglais qui quoi ces elle ils elles".split(" ")
);

export function looksFrench(text) {
  const tokens = text.toLowerCase().replace(/[.,;:!?()«»"'’\-–—]/g, " ").split(/\s+/).filter(Boolean);
  if (tokens.length < 3) return false;
  const strong = tokens.filter((t) => FRENCH_MARKERS.has(t)).length;
  return strong >= 2 && strong / tokens.length >= 0.2;
}

export function voiceFor(lang, text) {
  if (lang === "chinese") return /[\u4e00-\u9fff]/.test(text) ? VOICES.chinese : VOICES.french;
  if (lang !== "french" && looksFrench(text)) return VOICES.french;
  return VOICES[lang];
}

export function selectedLangs() {
  const args = process.argv.slice(2).filter((a) => LANGS.includes(a));
  return args.length ? args : LANGS;
}

/** Every distinct phrase a student can play in a language, as {id, text}. */
export async function collectTexts(lang) {
  const texts = new Map();
  const add = (t) => {
    const text = (t || "").trim();
    if (text) texts.set(clipId(lang, text), text);
  };
  for (const level of [1, 2, 3]) {
    const file = path.join(ROOT, "content", "curriculum", lang, `level${level}.ts`);
    const mod = await import(pathToFileURL(file).href);
    const curriculum = Object.values(mod).find((v) => v && v.lessons);
    if (!curriculum) continue;
    for (const lesson of curriculum.lessons) {
      const narration = lessonNarrations(lang, lesson);
      add(narration.lesson);
      add(narration.reading);
      for (const section of lesson.sections) for (const line of section.body) add(extractSpeechText(line));
      for (const line of lesson.reading) add(extractSpeechText(line));
    }
  }
  // The verb reference page (verb + forms + example sentence).
  const verbFile = path.join(ROOT, "content", "verbs", `${lang}.ts`);
  if (fs.existsSync(verbFile)) {
    const mod = await import(pathToFileURL(verbFile).href);
    if (mod.default) for (const phrase of verbPhrases(mod.default)) add(phrase);
  }
  if (lang === "chinese") {
    const charsFile = path.join(ROOT, "content", "vocabulary", "chinese.json");
    if (fs.existsSync(charsFile)) for (const ch of Object.keys(JSON.parse(fs.readFileSync(charsFile, "utf8")))) add(ch);
  }
  return Array.from(texts, ([id, text]) => ({ id, text, voice: voiceFor(lang, text) }));
}

export function textsFile(lang) {
  return path.join(WORK, "texts", `${lang}.json`);
}
export function audioDir(lang) {
  return path.join(WORK, "audio", lang);
}
export { fs, path };
