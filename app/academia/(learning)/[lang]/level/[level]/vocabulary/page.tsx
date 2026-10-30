"use client";

import { canAccessLevel } from "@/lib/academy/levelAccess";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Download, CheckCircle2, Search, FileDown } from "lucide-react";
import { getLevelCurriculum } from "@/content/curriculum";
import SpeakIcon from "@/components/academy/SpeakIcon";
import { extractSpeechText } from "@/lib/academy/audioClips";
import { frenchFor } from "@/content/translations";
import { printVocabulary } from "@/lib/academy/vocabularyPrint";
import { useFrenchVisible } from "@/lib/academy/frenchHelp";
import { downloadLessonAudio, isLessonCached } from "@/lib/academy/lessonAudioPlayer";
import chineseChars from "@/content/vocabulary/chinese.json";
import chineseMeanings from "@/content/vocabulary/chinese-meanings.json";
import english from "@/content/vocabulary/english.json";
import french from "@/content/vocabulary/french.json";
import spanish from "@/content/vocabulary/spanish.json";
import portuguese from "@/content/vocabulary/portuguese.json";
import swahili from "@/content/vocabulary/swahili.json";

const MEANINGS = chineseMeanings as Record<string, string>;
const PHONETICS: Record<string, Record<string, string>> = { english, french, spanish, portuguese, swahili };
const CJK = /[一-鿿]/;
const TRIPLE = /^(.+?)\s*\(([^)]+)\)\s*[-–—]\s*(.+)$/;

interface Word {
  text: string;
  pinyin: string;
  meaning: string;
  lesson: number;
}
interface Item {
  text: string;
  phonetic?: string;
  translation?: string;
  lesson: number;
}

export default function VocabularyPage() {
  const router = useRouter();
  const params = useParams<{ lang: string; level: string }>();
  const langSlug = params.lang;
  const level = Number(params.level);
  const base = `/academia/${langSlug}/level/${level}`;
  const isChinese = langSlug === "chinese";

  const curriculum = getLevelCurriculum(langSlug, level);
  const [allowed, setAllowed] = useState(false);
  const [query, setQuery] = useState("");
  const [offline, setOffline] = useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [showFr] = useFrenchVisible();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("loggedStudent");
      if (!saved) {
        router.push("/login");
        return;
      }
      const parsed = JSON.parse(saved);
      const enrollment = (parsed.enrollments || []).find((e: any) => e.langCode === curriculum?.langCode && e.status === "Approved");
      if (!enrollment) {
        router.push(`/login?program=${curriculum?.langCode ?? ""}`);
        return;
      }
      // A level is reachable from the one the student registered at, up to the highest the administration unlocked.
      if (!canAccessLevel(enrollment, level)) {
        router.push("/academia/dashboard");
        return;
      }
      setAllowed(true);
    } catch {
      router.push("/login");
    }
  }, [router, curriculum?.langCode]);

  // ---- Chinese: words (hanzi + pinyin + meaning) and the characters of the level
  const chinese = useMemo(() => {
    if (!curriculum || !isChinese) return null;
    const words: Word[] = [];
    const seenWords = new Set<string>();
    const chars: string[] = [];
    const seenChars = new Set<string>();
    for (const lesson of curriculum.lessons) {
      const lines = [...lesson.sections.flatMap((s) => s.body), ...lesson.reading];
      for (const line of lines) {
        const m = line.match(TRIPLE);
        if (m && CJK.test(m[1]) && !seenWords.has(m[1])) {
          seenWords.add(m[1]);
          words.push({ text: m[1].trim(), pinyin: m[2].trim(), meaning: m[3].trim(), lesson: lesson.id });
        }
        for (const ch of extractSpeechText(line)) {
          if (CJK.test(ch) && !seenChars.has(ch)) {
            seenChars.add(ch);
            chars.push(ch);
          }
        }
      }
    }
    return { words, chars };
  }, [curriculum, isChinese]);

  // ---- Other languages: every phrase of the level with its phonetics
  const items = useMemo<Item[]>(() => {
    if (!curriculum || isChinese) return [];
    const dict = PHONETICS[langSlug] ?? {};
    const out: Item[] = [];
    const seen = new Set<string>();
    for (const lesson of curriculum.lessons) {
      for (const section of lesson.sections) {
        for (const line of section.body) {
          const text = extractSpeechText(line).trim();
          const tokens = text.split(/\s+/);
          if (text.length < 2 || seen.has(text) || tokens.every((t) => t.length <= 1 || /^[-–—,.:]$/.test(t))) continue;
          if (/^\d+\s*[-–]/.test(text)) continue;
          seen.add(text);
          out.push({ text, phonetic: dict[text], translation: frenchFor(langSlug, text), lesson: lesson.id });
        }
      }
    }
    return out;
  }, [curriculum, langSlug, isChinese]);

  const phrases = useMemo(
    () => (chinese ? [...chinese.chars, ...chinese.words.map((w) => w.text)] : items.map((i) => i.text)),
    [chinese, items]
  );

  useEffect(() => {
    if (!phrases.length) return;
    isLessonCached(langSlug, phrases).then((cached) => cached && setOffline("done"));
  }, [langSlug, phrases]);

  if (!curriculum) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <p>Contenu introuvable.</p>
      </main>
    );
  }
  if (!allowed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-sunken text-ink-soft">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const q = query.trim().toLowerCase();
  const match = (...fields: (string | undefined)[]) => !q || fields.some((f) => f?.toLowerCase().includes(q));

  /** Downloads the page as a printable sheet (the print dialog saves it as a PDF). */
  const downloadPage = () => {
    if (chinese) {
      printVocabulary({
        title: "Caractères chinois et vocabulaire",
        levelTitle: curriculum.levelTitle,
        langLabel: curriculum.langLabel,
        wordsHeading: "Mot",
        chars: chinese.chars,
        charNotes: Object.fromEntries(chinese.chars.map((ch) => [ch, { pinyin: (chineseChars as Record<string, string>)[ch], meaning: MEANINGS[ch] }])),
        rows: chinese.words.map((wd) => ({ text: wd.text, phonetic: wd.pinyin, translation: wd.meaning })),
      });
    } else {
      printVocabulary({
        title: "Vocabulaire et prononciation",
        levelTitle: curriculum.levelTitle,
        langLabel: curriculum.langLabel,
        note:
          langSlug === "french"
            ? "Prononciation en alphabet phonétique international (API)."
            : "Prononciation figurée, à lire avec les sons du français : les syllabes sont séparées par des tirets et la syllabe accentuée est en MAJUSCULES.",
        rows: items.map((i) => ({ text: i.text, phonetic: i.phonetic, translation: i.translation })),
      });
    }
  };

  const downloadAll = async () => {
    setOffline("loading");
    setProgress(0);
    const stored = await downloadLessonAudio(langSlug, phrases, (done) => setProgress(done));
    setOffline(stored > 0 ? "done" : "idle");
  };

  const title = isChinese ? "Caractères chinois" : "Vocabulaire & prononciation";

  return (
    <div className="min-h-screen bg-surface-sunken text-ink selection:bg-red-600 selection:text-white">
      <main className="p-6 md:p-10 pt-28 md:pt-28">
        <div className="max-w-5xl mx-auto space-y-6">
          <Link
            href={base}
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink bg-surface hover:bg-surface-alt px-4 py-2 rounded-xl border border-line transition shadow-lg"
          >
            ← Back to Level
          </Link>

          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-red-50">{title}</h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">{curriculum.levelTitle}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
            <div className="relative sm:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher…"
                className="w-full bg-surface border border-line rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
              />
            </div>
            <button
              onClick={downloadPage}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink border border-line hover:border-red-600/60 rounded-xl px-4 py-2 transition bg-surface"
            >
              <FileDown size={15} /> Télécharger la page (PDF)
            </button>
            {offline === "done" ? (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500">
                <CheckCircle2 size={16} /> Audios disponibles hors ligne
              </span>
            ) : (
              <button
                onClick={downloadAll}
                disabled={offline === "loading"}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink border border-line rounded-xl px-4 py-2 transition disabled:opacity-60 bg-surface"
              >
                <Download size={15} />
                {offline === "loading" ? `Téléchargement… ${progress}/${phrases.length}` : "Télécharger les audios (hors ligne)"}
              </button>
            )}
          </div>

          {chinese ? (
            <>
              <section className="bg-surface rounded-3xl p-6 border border-line shadow-xl">
                <h2 className="text-xl font-bold text-red-500 mb-1">Les {chinese.chars.length} caractères de ce niveau</h2>
                <p className="text-xs text-ink-faint mb-5">Cliquez sur le haut-parleur pour écouter ; le sens en français est sous le pinyin. Les caractères sont classés dans l'ordre où ils apparaissent dans les leçons.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" translate="no">
                  {chinese.chars
                    .filter((ch) => match(ch, (chineseChars as Record<string, string>)[ch], MEANINGS[ch]))
                    .map((ch) => (
                      <div key={ch} className="relative rounded-2xl border border-line bg-surface-alt p-3 text-center">
                        <div className="absolute top-2 right-2">
                          <SpeakIcon text={ch} langSlug={langSlug} label={`Écouter ${ch}`} />
                        </div>
                        <p className="text-4xl font-bold text-ink mt-2">{ch}</p>
                        <p className="text-sm text-red-500 font-semibold mt-1">{(chineseChars as Record<string, string>)[ch]}</p>
                        {MEANINGS[ch] && <p className="text-xs text-ink-soft mt-1 leading-snug">{MEANINGS[ch]}</p>}
                      </div>
                    ))}
                </div>
              </section>

              <section className="bg-surface rounded-3xl p-6 border border-line shadow-xl">
                <h2 className="text-xl font-bold text-red-500 mb-4">Vocabulaire du niveau ({chinese.words.length} mots)</h2>
                <div className="divide-y divide-line/60">
                  {chinese.words
                    .filter((w) => match(w.text, w.pinyin, w.meaning))
                    .map((w) => (
                      <div key={w.text} className="flex items-center gap-4 py-3">
                        <SpeakIcon text={w.text} langSlug={langSlug} label={`Écouter ${w.text}`} />
                        <span className="text-2xl font-bold text-ink w-32 shrink-0" translate="no">{w.text}</span>
                        <span className="text-red-500 font-semibold w-40 shrink-0" translate="no">{w.pinyin}</span>
                        <span className="text-ink-soft text-sm">{w.meaning}</span>
                      </div>
                    ))}
                </div>
              </section>
            </>
          ) : (
            <section className="bg-surface rounded-3xl p-6 border border-line shadow-xl">
              <h2 className="text-xl font-bold text-red-500 mb-1">Mots et phrases du niveau ({items.length})</h2>
              <p className="text-xs text-ink-faint mb-5">
                {langSlug === "french"
                  ? "Prononciation en alphabet phonétique international (API)."
                  : "Prononciation figurée, à lire avec les sons du français : les syllabes sont séparées par des tirets et la syllabe accentuée est en MAJUSCULES."}
              </p>
              <div className="divide-y divide-line/60">
                {items
                  .filter((i) => match(i.text, i.phonetic, i.translation))
                  .map((i) => (
                    <div key={i.text} className="flex items-start gap-3 py-3">
                      <SpeakIcon text={i.text} langSlug={langSlug} label={`Écouter : ${i.text}`} className="mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-semibold text-ink" translate="no">{i.text}</p>
                        {i.phonetic && (
                          <p className="text-sm text-red-500 mt-0.5" translate="no">
                            {i.phonetic}
                          </p>
                        )}
                        {showFr && i.translation && (
                          <p lang="fr" className="text-sm text-ink-soft italic mt-0.5">
                            {i.translation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
