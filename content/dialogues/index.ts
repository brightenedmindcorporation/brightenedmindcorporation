import { buildDialogues, type Dialogue, type RawDialogue } from "./types";
import english from "./english";
import french from "./french";
import spanish from "./spanish";
import portuguese from "./portuguese";
import swahili from "./swahili";
import chinese from "./chinese";

// One conversation per lesson quiz and per level's final quiz, per language.
// Keys: "<level>-<lessonId>" and "<level>-final".
const RAW: Record<string, Record<string, RawDialogue>> = { english, french, spanish, portuguese, swahili, chinese };

const built = new Map<string, Record<string, Dialogue>>();

export function getDialogue(langSlug: string, level: number, key: number | "final"): Dialogue | null {
  const raw = RAW[langSlug];
  if (!raw) return null;
  let lang = built.get(langSlug);
  if (!lang) {
    lang = buildDialogues(raw);
    built.set(langSlug, lang);
  }
  return lang[`${level}-${key}`] ?? null;
}
