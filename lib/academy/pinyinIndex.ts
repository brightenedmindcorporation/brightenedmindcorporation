"use client";

/**
 * A small pinyin input method built from the course's own Chinese text, for students whose
 * keyboard does not offer Chinese characters in the browser. The student types pinyin without
 * tones (nihao, nv for 女) and gets the words and characters of the lessons that match.
 */

export interface PinyinIndex {
  /** Candidates for what the student typed, best first. */
  lookup(typed: string, limit?: number): string[];
}

const CJK = /[㐀-鿿]/;
const MAX_WORD = 6;

let pinyinModule: Promise<typeof import("pinyin-pro")> | null = null;

export async function buildPinyinIndex(corpus: string[]): Promise<PinyinIndex> {
  pinyinModule ||= import("pinyin-pro");
  const { pinyin } = await pinyinModule;

  // key (toneless pinyin, no spaces) → text → how often it appears in the course
  const table = new Map<string, Map<string, number>>();
  const add = (key: string, text: string) => {
    let bucket = table.get(key);
    if (!bucket) table.set(key, (bucket = new Map()));
    bucket.set(text, (bucket.get(text) ?? 0) + 1);
  };

  for (const line of corpus) {
    // Runs of characters between punctuation, with their pinyin read in context.
    for (const run of line.match(/[㐀-鿿]+/g) ?? []) {
      const syllables = pinyin(run, { toneType: "none", type: "array", v: true });
      const chars = Array.from(run);
      if (syllables.length !== chars.length) continue;
      for (let start = 0; start < chars.length; start++) {
        for (let len = 1; len <= MAX_WORD && start + len <= chars.length; len++) {
          add(syllables.slice(start, start + len).join(""), chars.slice(start, start + len).join(""));
        }
      }
    }
  }

  const entries = Array.from(table, ([key, bucket]) => ({
    key,
    items: Array.from(bucket).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length).map(([text]) => text),
  })).sort((a, b) => a.key.length - b.key.length);

  return {
    lookup(typed, limit = 12) {
      const q = typed.toLowerCase().replace(/[^a-zv]/g, "");
      if (!q) return [];
      const out: string[] = [];
      const push = (text: string) => {
        if (CJK.test(text) && !out.includes(text)) out.push(text);
      };
      const exact = table.get(q);
      if (exact) Array.from(exact).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length).forEach(([t]) => push(t));
      // Then everything that starts with what was typed (nih → nihao), shortest first.
      for (const e of entries) {
        if (out.length >= limit) break;
        if (e.key !== q && e.key.startsWith(q)) e.items.slice(0, 2).forEach(push);
      }
      return out.slice(0, limit);
    },
  };
}
