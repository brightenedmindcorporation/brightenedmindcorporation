"use client";

import type { Lesson } from "@/content/curriculum/types";
import { Volume2, BookOpen, FileText, Mic, MessageSquare, PlayCircle } from "lucide-react";

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

function speak(text: string, langSlug: string) {
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
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}

// Lesson lines are written as "target-language phrase (phonetics) -
// translation" (e.g. Chinese: "你好 (nǐ hǎo) - Bonjour"). Speaking the raw
// line would read the phonetics and the French translation aloud too, so
// we only speak the part before the first parenthesis.
function extractSpeechText(line: string): string {
  const parenIndex = line.indexOf("(");
  if (parenIndex > 0) {
    return line.slice(0, parenIndex).trim();
  }
  return line;
}

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) return url;
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
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
        <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-line bg-black">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="text-ink-soft mt-3">{lesson.videoTopic}</p>
      )}
    </Card>
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
