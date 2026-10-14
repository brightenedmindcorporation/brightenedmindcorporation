"use client";

import type { Lesson } from "@/content/curriculum/types";
import { useEffect, useMemo, useState } from "react";
import { Volume2, BookOpen, FileText, Mic, MessageSquare, PlayCircle, Download, CheckCircle2 } from "lucide-react";
import { extractSpeechText } from "@/lib/academy/audioClips";
import { downloadLessonAudio, isLessonCached, lessonPhrases, playClip, stopClip } from "@/lib/academy/lessonAudioPlayer";

// Maps our URL language slugs to BCP-47 tags for the Web Speech API.
// Without this, every language's "Listen" buttons were reading the text
// aloud with an English voice (the bug this fixes).
const SPEECH_LANG: Record<string, string> = {
  english: "en-US",
  french: "fr-FR",
  swahili: "sw-KE",
  spanish: "es-ES",
  portuguese: "pt-PT",
  chinese: "zh-CN",
};

let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    cachedVoices = window.speechSynthesis.getVoices();
  });
}

// Prefers a voice the device has installed locally (works without a network
// request) over a cloud-streamed one, when the browser exposes that choice.
function pickVoice(langTag: string): SpeechSynthesisVoice | undefined {
  const base = langTag.split("-")[0];
  const matches = cachedVoices.filter((v) => v.lang === langTag || v.lang.startsWith(base));
  return matches.find((v) => v.localService) ?? matches[0];
}

// Recorded clip first (works offline once downloaded/played); the device's own
// voice is only the fallback when no clip is available.
async function speak(text: string, langSlug: string) {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  const played = await playClip(langSlug, text);
  if (!played) speakWithDeviceVoice(text, langSlug);
}

function speakWithDeviceVoice(text: string, langSlug: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  const langTag = SPEECH_LANG[langSlug] ?? "en-US";
  speech.lang = langTag;
  const voice = pickVoice(langTag);
  if (voice) speech.voice = voice;
  speech.rate = 0.9;
  speech.pitch = 1;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
}

function stopSpeaking() {
  stopClip();
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}

// Distraction-free params: rel=0 limits end-of-video suggestions to the
// same channel (YouTube no longer allows disabling them entirely),
// modestbranding/iv_load_policy/disablekb trim branding, annotations and
// keyboard shortcuts that could lead off the lesson. There is no official
// way to remove the clickable YouTube logo from the embedded player itself.
const YOUTUBE_EMBED_PARAMS = "rel=0&modestbranding=1&iv_load_policy=3&disablekb=1";
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

function SpeakButtons({ text, langSlug, label = "Listen" }: { text: string; langSlug: string; label?: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <button
        onClick={() => speak(text, langSlug)}
        className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-red-950/50 inline-flex items-center gap-2"
      >
        <Volume2 size={16} /> {label}
      </button>
      <button
        onClick={stopSpeaking}
        className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-6 py-3 rounded-xl border border-line transition"
      >
        ⏹ Stop
      </button>
    </div>
  );
}

function SpeakIconButton({ text, langSlug }: { text: string; langSlug: string }) {
  return (
    <button
      onClick={() => speak(text, langSlug)}
      aria-label="Écouter cette phrase"
      title="Écouter cette phrase"
      className="inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-surface-alt hover:bg-red-600 hover:text-white text-ink-soft transition mt-0.5"
    >
      <Volume2 size={13} />
    </button>
  );
}

function SpeakableLine({ text, langSlug, className = "" }: { text: string; langSlug: string; className?: string }) {
  return (
    <p className={`flex items-start gap-2 ${className}`}>
      <SpeakIconButton text={extractSpeechText(text)} langSlug={langSlug} />
      <span>{text}</span>
    </p>
  );
}

function VideoCard({ lesson }: { lesson: Lesson }) {
  const embedUrl = lesson.videoUrl ? getEmbedUrl(lesson.videoUrl) : null;

  return (
    <Card>
      <CardTitle icon={PlayCircle}>Video</CardTitle>
      {embedUrl ? (
        <div
          className="mt-4 aspect-video rounded-2xl overflow-hidden border border-line bg-black"
          onContextMenu={(e) => e.preventDefault()}
        >
          <iframe
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
  const phrases = useMemo(() => lessonPhrases(lesson), [lesson]);
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

export default function LessonRenderer({ lesson, langSlug }: { lesson: Lesson; langSlug: string }) {
  return (
    <div className="space-y-8">
      <Card>
        <CardTitle icon={BookOpen}>Lesson</CardTitle>
        <div className="text-ink-soft mt-4 space-y-4">
          {lesson.sections.map((section, i) => (
            <div key={i}>
              <p className="font-semibold text-ink mt-4 first:mt-0">{section.heading}</p>
              <div className="space-y-1 mt-1">
                {section.body.map((line, j) => (
                  <SpeakableLine key={j} text={line} langSlug={langSlug} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <SpeakButtons text={lesson.speakText} langSlug={langSlug} label="Listen Lesson" />
        <OfflineAudioButton lesson={lesson} langSlug={langSlug} />
      </Card>

      <VideoCard lesson={lesson} />

      <Card>
        <CardTitle icon={FileText}>Reading Text</CardTitle>
        <div className="text-ink-soft mt-4 space-y-3">
          <p className="font-bold text-ink">{lesson.readingTitle}</p>
          {lesson.reading.map((p, i) => (
            <SpeakableLine key={i} text={p} langSlug={langSlug} />
          ))}
        </div>
        <SpeakButtons text={lesson.readingSpeakText} langSlug={langSlug} label="Listen Reading" />
      </Card>

      <Card>
        <CardTitle icon={Mic}>Exercises</CardTitle>
        <p className="text-ink-soft mt-4">Complete the sentences:</p>
        <ul className="list-disc ml-6 text-ink-soft mt-4 space-y-1">
          {lesson.exercises.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle icon={MessageSquare}>Speaking Topic</CardTitle>
        <p className="text-ink-soft mt-4">{lesson.speakingTopic}</p>
      </Card>
    </div>
  );
}
