"use client";

import type { Lesson } from "@/content/curriculum/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { Volume2, BookOpen, FileText, Mic, MessageSquare, PlayCircle, Download, CheckCircle2, Target } from "lucide-react";
import { isOfficeProgram } from "@/content/curriculum";
import { extractSpeechText, isSpokenText, lessonNarrations } from "@/lib/academy/audioClips";
import OfficeFigure from "@/components/academy/OfficeFigure";
import NarrationPlayer from "@/components/academy/NarrationPlayer";
import WritingLab from "@/components/academy/WritingLab";
import { downloadLessonAudio, isLessonCached, lessonPhrases } from "@/lib/academy/lessonAudioPlayer";
import { useYouTubeMeter } from "@/lib/youtubeMeter";
import ListenButton from "@/components/academy/ListenButton";
import { frenchFor, hasFrenchTranslations } from "@/content/translations";
import { useFrenchVisible } from "@/lib/academy/frenchHelp";
import { playClipUrl } from "@/lib/academy/lessonAudioPlayer";
import { hasVoiceFor, speakPhrase as speak, speakWithDeviceVoice, stopSpeaking } from "@/lib/academy/deviceSpeech";

// Distraction-free params: rel=0 limits end-of-video suggestions to the
// same channel (YouTube no longer allows disabling them entirely),
// modestbranding/iv_load_policy/disablekb trim branding, annotations and
// keyboard shortcuts that could lead off the lesson. There is no official
// way to remove the clickable YouTube logo from the embedded player itself.
const YOUTUBE_EMBED_PARAMS = "rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1";
const VIMEO_EMBED_PARAMS = "title=0&byline=0&portrait=0";

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) return `${url}${url.includes("?") ? "&" : "?"}${YOUTUBE_EMBED_PARAMS}`;
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?${YOUTUBE_EMBED_PARAMS}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}?${YOUTUBE_EMBED_PARAMS}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}?${VIMEO_EMBED_PARAMS}`;
    }
    return null;
  } catch {
    return null;
  }
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-surface rounded-3xl p-8 border border-line shadow-xl">{children}</div>;
}

function CardTitle({ icon: Icon, children }: { icon: React.ComponentType<{ size?: number }>; children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
      <Icon size={22} /> {children}
    </h2>
  );
}

function SpeakIconButton({ text, langSlug }: { text: string; langSlug: string }) {
  return (
    <ListenButton
      play={(id) => speak(text, langSlug, id)}
      title="Écouter cette phrase"
      size={13}
      className="inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-surface-alt hover:bg-red-600 hover:text-white text-ink-soft transition mt-0.5"
    />
  );
}

/** The French translation under an English line (the voice never reads it). */
function Fr({ langSlug, text, className = "" }: { langSlug: string; text: string; className?: string }) {
  const [visible] = useFrenchVisible();
  const fr = frenchFor(langSlug, text);
  if (!visible || !fr) return null;
  return (
    <span lang="fr" className={`block text-[13px] leading-snug italic text-ink-faint ${className}`}>
      {fr}
    </span>
  );
}

/** An alphabet row ("A B C D …"): every letter gets its own speaker so the student can hear each one. */
const LETTER_ROW = /^(?:\p{Lu}\s){3,}\p{Lu}$/u;

function LetterRow({ text, langSlug }: { text: string; langSlug: string }) {
  return (
    <div className="flex flex-wrap gap-2 py-1" translate="no">
      {text.split(/\s+/).map((letter, i) => (
        <span key={i} className="notranslate inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-alt py-1 pl-1 pr-3">
          <ListenButton
            play={async (id) => {
              if (langSlug !== "english") return speak(letter, langSlug, id);
              // A recorded clip of the letter's name; the device voice only when it can't be played.
              if (await playClipUrl(`/audio/letters/en/${letter.toLowerCase()}.mp3?v=2`, id)) return;
              // No recording: the device voice, but only an English one (a French default voice would spell the letters in French).
              if (hasVoiceFor("english")) await speakWithDeviceVoice(`${letter}.`, "english", { id });
            }}
            title={`Écouter la lettre ${letter}`}
            size={13}
            className="inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-surface hover:bg-red-600 hover:text-white text-ink-soft transition"
          />
          <span className="text-lg font-semibold text-ink">{letter}</span>
        </span>
      ))}
    </div>
  );
}

function SpeakableLine({ text, langSlug, className = "" }: { text: string; langSlug: string; className?: string }) {
  if (LETTER_ROW.test(text.trim())) return <LetterRow text={text.trim()} langSlug={langSlug} />;
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {/* Only the language being learned is voiced: a French explanation gets no speaker. */}
      {isSpokenText(langSlug, extractSpeechText(text)) ? <SpeakIconButton text={extractSpeechText(text)} langSlug={langSlug} /> : <span className="w-7 shrink-0" aria-hidden="true" />}
      <div className="min-w-0">
        <span translate="no" className="notranslate">{text}</span>
        <Fr langSlug={langSlug} text={text} />
      </div>
    </div>
  );
}

/** Show or hide the French translations under the English lines. */
function FrenchToggle({ langSlug }: { langSlug: string }) {
  const [visible, set] = useFrenchVisible();
  if (!hasFrenchTranslations(langSlug)) return null;
  return (
    <button
      type="button"
      onClick={() => set(!visible)}
      className="inline-flex items-center gap-2 text-xs font-bold text-ink-soft hover:text-ink border border-line rounded-xl px-3 py-1.5 bg-surface"
      aria-pressed={visible}
    >
      🇫🇷 Traduction française : {visible ? "masquer" : "afficher"}
    </button>
  );
}

function VideoCard({ lesson, statsKey }: { lesson: Lesson; statsKey?: string }) {
  const embedUrl = lesson.videoUrl ? getEmbedUrl(lesson.videoUrl) : null;
  const frame = useRef<HTMLIFrameElement>(null);
  // Plays, time watched and drop-off of the lesson video (anonymous statistics for the administration).
  const [failed, setFailed] = useState(false);
  useYouTubeMeter(frame, "lesson", statsKey ?? "", lesson.title, Boolean(embedUrl && /youtube/.test(embedUrl)), () => setFailed(true));

  return (
    <Card>
      <CardTitle icon={PlayCircle}>Video</CardTitle>
      {embedUrl && failed ? (
        <div className="mt-4 rounded-2xl border border-line bg-surface-alt p-6 text-center space-y-3">
          <p className="font-bold text-ink">Cette vidéo n&apos;est pas disponible pour le moment.</p>
          <p className="text-sm text-ink-soft">{lesson.videoTopic}</p>
          <p className="text-xs text-ink-faint">Le reste de la leçon (texte, audio, exercices) fonctionne normalement. L&apos;administration a été informée.</p>
        </div>
      ) : embedUrl ? (
        <div
          className="mt-4 aspect-video rounded-2xl overflow-hidden border border-line bg-black"
          onContextMenu={(e) => e.preventDefault()}
        >
          <iframe
            ref={frame}
            src={embedUrl}
            className="w-full h-full"
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            // Deliberately omits allow-popups and allow-top-navigation: the
            // player's own "watch on YouTube"/channel-logo links try to open
            // youtube.com via window.open()/top navigation, and without
            // those tokens the browser silently blocks it instead of
            // leaving the lesson — the closest thing to hiding that link
            // an iframe embed allows (the underlying URL is still visible
            // to anyone opening devtools, which no embed can prevent).
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        </div>
      ) : (
        <p className="text-ink-soft mt-3">{lesson.videoTopic}</p>
      )}
    </Card>
  );
}

function OfflineAudioButton({ lesson, langSlug }: { lesson: Lesson; langSlug: string }) {
  const phrases = useMemo(() => lessonPhrases(langSlug, lesson), [langSlug, lesson]);
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

  const download = async () => {
    setState("loading");
    setProgress(0);
    const stored = await downloadLessonAudio(langSlug, phrases, (done) => setProgress(done));
    setState(stored > 0 ? "done" : "idle");
  };

  if (state === "done") {
    return (
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-500">
        <CheckCircle2 size={16} /> Audio de la leçon disponible hors ligne
      </span>
    );
  }
  return (
    <button
      onClick={download}
      disabled={state === "loading"}
      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink border border-line rounded-xl px-4 py-2 transition disabled:opacity-60"
    >
      <Download size={15} />
      {state === "loading" ? `Téléchargement… ${progress}/${phrases.length}` : "Télécharger l'audio pour l'écouter hors ligne"}
    </button>
  );
}

export default function LessonRenderer({ lesson, langSlug, statsKey }: { lesson: Lesson; langSlug: string; statsKey?: string }) {
  const narration = useMemo(() => lessonNarrations(langSlug, lesson), [langSlug, lesson]);

  // Office course (Windows, Word, Excel, PowerPoint): text, optional video and practical work, no audio.
  if (isOfficeProgram(langSlug)) {
    return (
      <div className="space-y-8">
        <Card>
          <CardTitle icon={BookOpen}>Leçon</CardTitle>
          <div className="text-ink-soft mt-4 space-y-6">
            {lesson.sections.map((section, i) => (
              <div key={i}>
                <p className="font-bold text-ink">{section.heading}</p>
                <ul className="mt-2 space-y-2">
                  {section.body.map((line, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <OfficeFigure id={lesson.figure} />
        </Card>

        {lesson.videoUrl && <VideoCard lesson={lesson} statsKey={statsKey} />}

        <Card>
          <CardTitle icon={FileText}>Cas pratique</CardTitle>
          <div className="text-ink-soft mt-4 space-y-3">
            <p className="font-bold text-ink">{lesson.readingTitle}</p>
            {lesson.reading.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle icon={Mic}>Travaux pratiques</CardTitle>
          <p className="text-ink-soft mt-4">Faites ces exercices sur votre ordinateur :</p>
          <ol className="list-decimal ml-6 text-ink-soft mt-4 space-y-2">
            {lesson.exercises.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ol>
        </Card>

        <Card>
          <CardTitle icon={Target}>À la fin de cette leçon, vous saurez</CardTitle>
          <p className="text-ink-soft mt-4">{lesson.speakingTopic}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <FrenchToggle langSlug={langSlug} />
      <Card>
        <CardTitle icon={BookOpen}>Lesson</CardTitle>
        <div className="text-ink-soft mt-4 space-y-4">
          {lesson.sections.map((section, i) => (
            <div key={i}>
              <p className="font-semibold text-ink mt-4 first:mt-0">
                {section.heading}
                <Fr langSlug={langSlug} text={section.heading} className="font-normal" />
              </p>
              <div className="space-y-1 mt-1">
                {section.body.map((line, j) => (
                  <SpeakableLine key={j} text={line} langSlug={langSlug} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <NarrationPlayer
          text={narration.lesson}
          langSlug={langSlug}
          label="Listen Lesson"
          onFallbackSpeak={() => speakWithDeviceVoice(narration.lesson, langSlug)}
          onFallbackStop={stopSpeaking}
        />
        <OfflineAudioButton lesson={lesson} langSlug={langSlug} />
      </Card>

      <VideoCard lesson={lesson} statsKey={statsKey} />

      <Card>
        <CardTitle icon={FileText}>Reading Text</CardTitle>
        <div className="text-ink-soft mt-4 space-y-3">
          <p className="font-bold text-ink">
            {lesson.readingTitle}
            <Fr langSlug={langSlug} text={lesson.readingTitle} className="font-normal" />
          </p>
          {lesson.reading.map((p, i) => (
            <SpeakableLine key={i} text={p} langSlug={langSlug} />
          ))}
        </div>
        <NarrationPlayer
          text={narration.reading}
          langSlug={langSlug}
          label="Listen Reading"
          onFallbackSpeak={() => speakWithDeviceVoice(narration.reading, langSlug)}
          onFallbackStop={stopSpeaking}
        />
      </Card>

      <Card>
        <CardTitle icon={Mic}>Exercises</CardTitle>
        <p className="text-ink-soft mt-4">Complete the sentences:</p>
        <ul className="list-disc ml-6 text-ink-soft mt-4 space-y-1">
          {lesson.exercises.map((ex, i) => (
            <li key={i}>
              <span translate="no" className="notranslate">{ex}</span>
              <Fr langSlug={langSlug} text={ex} />
            </li>
          ))}
        </ul>
      </Card>

      <WritingLab lesson={lesson} langSlug={langSlug} />

      <Card>
        <CardTitle icon={MessageSquare}>Speaking Topic</CardTitle>
        <p className="text-ink-soft mt-4">
          {lesson.speakingTopic}
          <Fr langSlug={langSlug} text={lesson.speakingTopic} />
        </p>
      </Card>
    </div>
  );
}
