"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Download, BookText, CheckCircle2 } from "lucide-react";
import type { VerbReference } from "@/content/verbs";
import { downloadVerbsPdf } from "@/lib/academy/verbsPdf";
import SpeakIcon from "@/components/academy/SpeakIcon";
import { irregularVerbSpeech, regularVerbSpeech, verbExampleSpeech, verbPhrases } from "@/lib/academy/audioClips";
import { downloadLessonAudio, isLessonCached } from "@/lib/academy/lessonAudioPlayer";

function matches(query: string, ...fields: string[]): boolean {
  if (!query) return true;
  return fields.some((f) => f.toLowerCase().includes(query));
}

/** Downloads every verb recording so the whole page can be heard offline. */
function OfflineVerbsAudio({ reference, langSlug }: { reference: VerbReference; langSlug: string }) {
  const phrases = useMemo(() => verbPhrases(reference), [reference]);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    isLessonCached(langSlug, phrases).then((cached) => {
      if (!cancelled && cached) setState("done");
    });
    return () => {
      cancelled = true;
    };
  }, [langSlug, phrases]);

  if (typeof window !== "undefined" && !("caches" in window)) return null;

  if (state === "done") {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500">
        <CheckCircle2 size={16} /> Audios des verbes disponibles hors ligne
      </span>
    );
  }
  return (
    <button
      onClick={async () => {
        setState("loading");
        setProgress(0);
        const stored = await downloadLessonAudio(langSlug, phrases, (done) => setProgress(done));
        setState(stored > 0 ? "done" : "idle");
      }}
      disabled={state === "loading"}
      className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink border border-line rounded-xl px-4 py-2 transition disabled:opacity-60"
    >
      <Download size={15} />
      {state === "loading" ? `Téléchargement… ${progress}/${phrases.length}` : "Télécharger les audios pour les écouter hors ligne"}
    </button>
  );
}

export default function VerbsReference({
  reference,
  langLabel,
  langSlug,
}: {
  reference: VerbReference;
  langLabel: string;
  langSlug: string;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const [downloading, setDownloading] = useState(false);

  const filteredParticles = useMemo(
    () => (reference.kind === "particles" ? reference.particles.filter((p) => matches(q, p.particle, p.pinyin, p.translation, p.example)) : []),
    [reference, q]
  );
  const filteredChineseVerbs = useMemo(
    () => (reference.kind === "particles" ? reference.verbs.filter((v) => matches(q, v.hanzi, v.pinyin, v.meaning, v.translation)) : []),
    [reference, q]
  );

  const download = async () => {
    setDownloading(true);
    try {
      await downloadVerbsPdf(reference, langLabel);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Le PDF n'a pas pu être généré. Réessayez.");
    } finally {
      setDownloading(false);
    }
  };
  const filteredIrregular = useMemo(
    () => (reference.kind === "standard" ? reference.irregular.filter((v) => matches(q, v.base, v.forms, v.translation)) : []),
    [reference, q]
  );
  const filteredRegular = useMemo(
    () => (reference.kind === "standard" ? reference.regular.filter((v) => matches(q, v.base, v.translation)) : []),
    [reference, q]
  );

  const noResults =
    reference.kind === "particles"
      ? filteredParticles.length === 0 && filteredChineseVerbs.length === 0
      : filteredIrregular.length === 0 && filteredRegular.length === 0;

  const placeholder =
    reference.kind === "particles" ? "Rechercher un verbe, une particule, un pinyin ou une traduction…" : "Rechercher un verbe (ou sa traduction)…";

  return (
    <div className="bg-surface rounded-3xl p-8 border border-line shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
          <BookText size={22} /> {reference.kind === "particles" ? "Verbes & particules" : "Verbes irréguliers & réguliers"}
        </h2>
        <button
          onClick={download}
          disabled={downloading}
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink border border-line hover:border-red-600/50 px-4 py-2 rounded-xl transition-all bg-surface-alt shrink-0 disabled:opacity-50"
        >
          <Download size={15} /> {downloading ? "Préparation du PDF…" : "Télécharger en PDF"}
        </button>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full bg-surface-alt border border-line rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
        />
      </div>

      <div className="mb-6">
        <OfflineVerbsAudio reference={reference} langSlug={langSlug} />
      </div>

      {reference.kind === "particles" ? (
        <>
          <p className="text-sm text-ink-soft mb-5">{reference.intro}</p>
          {filteredParticles.length > 0 && (
            <div className="border border-line rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[90px_80px_1.6fr_1.3fr] bg-surface-sunken text-ink-faint text-[11px] font-bold uppercase tracking-wide">
                <div className="px-3 py-2.5">Particule</div>
                <div className="px-3 py-2.5">Pinyin</div>
                <div className="px-3 py-2.5">Usage & exemple</div>
                <div className="px-3 py-2.5">Traduction</div>
              </div>
              {filteredParticles.map((p, i) => (
                <div
                  key={p.particle}
                  className={`grid grid-cols-[90px_80px_1.6fr_1.3fr] text-sm border-t border-line ${i % 2 === 0 ? "" : "bg-surface-sunken/40"}`}
                >
                  <div className="px-3 py-3 font-bold text-red-500 text-lg">{p.particle}</div>
                  <div className="px-3 py-3 text-ink-soft italic">{p.pinyin}</div>
                  <div className="px-3 py-3 text-ink-soft">
                    <p>{p.usage}</p>
                    <p className="mt-1 text-ink-faint italic flex items-start gap-2">
                      <SpeakIcon text={verbExampleSpeech(p.example)} langSlug={langSlug} label="Écouter l'exemple" />
                      <span>{p.example}</span>
                    </p>
                  </div>
                  <div className="px-3 py-3 text-ink-soft">{p.translation}</div>
                </div>
              ))}
            </div>
          )}

          {filteredChineseVerbs.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                <h3 className="text-sm font-extrabold text-ink uppercase tracking-wide">
                  Les {reference.verbs.length} verbes essentiels
                </h3>
              </div>
              <p className="text-xs text-ink-faint mb-3">{reference.verbsIntro}</p>
              <div className="border border-line rounded-2xl overflow-hidden overflow-x-auto">
                <div className="min-w-[640px]">
                  <div className="grid grid-cols-[80px_110px_1.7fr_1.3fr] bg-surface-sunken text-ink-faint text-[11px] font-bold uppercase tracking-wide">
                    <div className="px-3 py-2.5">Verbe</div>
                    <div className="px-3 py-2.5">Pinyin / sens</div>
                    <div className="px-3 py-2.5">Exemple</div>
                    <div className="px-3 py-2.5">Traduction</div>
                  </div>
                  {filteredChineseVerbs.map((v, i) => (
                    <div
                      key={v.hanzi}
                      className={`grid grid-cols-[80px_110px_1.7fr_1.3fr] text-sm border-t border-line ${i % 2 === 0 ? "" : "bg-surface-sunken/40"}`}
                    >
                      <div className="px-3 py-2.5 font-bold text-red-500 text-lg flex items-center gap-2">
                        {v.hanzi}
                        <SpeakIcon text={v.hanzi} langSlug={langSlug} label="Écouter le verbe" />
                      </div>
                      <div className="px-3 py-2.5 text-ink-soft">
                        <p className="italic">{v.pinyin}</p>
                        <p className="text-xs text-ink-faint">{v.meaning}</p>
                      </div>
                      <div className="px-3 py-2.5 text-ink-soft flex items-start gap-2">
                        <SpeakIcon text={verbExampleSpeech(v.example)} langSlug={langSlug} label="Écouter l'exemple" />
                        <span>{v.example}</span>
                      </div>
                      <div className="px-3 py-2.5 text-ink-soft">{v.translation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {filteredIrregular.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                <h3 className="text-sm font-extrabold text-ink uppercase tracking-wide">Verbes irréguliers</h3>
              </div>
              <p className="text-xs text-ink-faint mb-3">{reference.irregularIntro}</p>
              <div className="border border-line rounded-2xl overflow-hidden overflow-x-auto">
                <div className="min-w-[640px]">
                  <div className="grid grid-cols-[110px_160px_1.6fr_1.3fr] bg-surface-sunken text-ink-faint text-[11px] font-bold uppercase tracking-wide">
                    <div className="px-3 py-2.5">Verbe</div>
                    <div className="px-3 py-2.5">{reference.formsLabel}</div>
                    <div className="px-3 py-2.5">Exemple</div>
                    <div className="px-3 py-2.5">Traduction</div>
                  </div>
                  {filteredIrregular.map((v, i) => (
                    <div
                      key={v.base}
                      className={`grid grid-cols-[110px_160px_1.6fr_1.3fr] text-sm border-t border-line ${i % 2 === 0 ? "" : "bg-surface-sunken/40"}`}
                    >
                      <div className="px-3 py-2.5 font-bold text-red-500 flex items-center gap-2">
                        {v.base}
                        <SpeakIcon text={irregularVerbSpeech(v)} langSlug={langSlug} label="Écouter le verbe et ses formes" />
                      </div>
                      <div className="px-3 py-2.5 text-ink-soft">{v.forms}</div>
                      <div className="px-3 py-2.5 text-ink-soft italic flex items-start gap-2">
                        <SpeakIcon text={verbExampleSpeech(v.example)} langSlug={langSlug} label="Écouter l'exemple" />
                        <span>{v.example}</span>
                      </div>
                      <div className="px-3 py-2.5 text-ink-soft">{v.translation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {filteredRegular.length > 0 && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-5 bg-ink-faint rounded-full" />
                <h3 className="text-sm font-extrabold text-ink uppercase tracking-wide">Verbes réguliers</h3>
              </div>
              <p className="text-xs text-ink-faint mb-3">{reference.regularIntro}</p>
              <div className="border border-line rounded-2xl overflow-hidden overflow-x-auto">
                <div className="min-w-[640px]">
                  <div className="grid grid-cols-[110px_160px_1.6fr_1.3fr] bg-surface-sunken text-ink-faint text-[11px] font-bold uppercase tracking-wide">
                    <div className="px-3 py-2.5">Verbe</div>
                    <div className="px-3 py-2.5">Forme conjuguée</div>
                    <div className="px-3 py-2.5">Exemple</div>
                    <div className="px-3 py-2.5">Traduction</div>
                  </div>
                  {filteredRegular.map((v, i) => (
                    <div
                      key={v.base}
                      className={`grid grid-cols-[110px_160px_1.6fr_1.3fr] text-sm border-t border-line ${i % 2 === 0 ? "" : "bg-surface-sunken/40"}`}
                    >
                      <div className="px-3 py-2.5 font-bold text-ink-soft flex items-center gap-2">
                        {v.base}
                        <SpeakIcon text={regularVerbSpeech(v)} langSlug={langSlug} label="Écouter le verbe conjugué" />
                      </div>
                      <div className="px-3 py-2.5 text-ink-soft">
                        {v.prefix ? (
                          <>
                            <b className="text-red-500">{v.prefix}</b>
                            {v.stem}
                          </>
                        ) : (
                          <>
                            {v.stem ?? v.base}
                            <b className="text-red-500">{v.suffix}</b>
                          </>
                        )}
                      </div>
                      <div className="px-3 py-2.5 text-ink-soft italic flex items-start gap-2">
                        <SpeakIcon text={verbExampleSpeech(v.example)} langSlug={langSlug} label="Écouter l'exemple" />
                        <span>{v.example}</span>
                      </div>
                      <div className="px-3 py-2.5 text-ink-soft">{v.translation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {noResults && (
        <div className="text-center py-10 text-ink-faint text-sm">Aucun résultat pour « {query} ».</div>
      )}
    </div>
  );
}
