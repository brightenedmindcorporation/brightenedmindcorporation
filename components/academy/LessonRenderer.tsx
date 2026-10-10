"use client";

import type { Lesson } from "@/content/curriculum/types";

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

function speak(text: string, langSlug: string) {
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = SPEECH_LANG[langSlug] ?? "en-US";
  speech.rate = 0.9;
  speech.pitch = 1;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-surface rounded-3xl p-8 border border-line shadow-xl">{children}</div>;
}

function CardTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
      <span>{icon}</span> {children}
    </h2>
  );
}

function SpeakButtons({ text, langSlug, label = "Listen" }: { text: string; langSlug: string; label?: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <button
        onClick={() => speak(text, langSlug)}
        className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-red-950/50"
      >
        🔊 {label}
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

export default function LessonRenderer({ lesson, langSlug }: { lesson: Lesson; langSlug: string }) {
  return (
    <div className="space-y-8">
      <Card>
        <CardTitle icon="📘">Lesson</CardTitle>
        <div className="text-ink-soft mt-4 space-y-4">
          {lesson.sections.map((section, i) => (
            <div key={i}>
              <p className="font-semibold text-ink mt-4 first:mt-0">{section.heading}</p>
              <div className="space-y-1 mt-1">
                {section.body.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <SpeakButtons text={lesson.speakText} langSlug={langSlug} label="Listen Lesson" />
      </Card>

      <Card>
        <CardTitle icon="▶">Video</CardTitle>
        <p className="text-ink-soft mt-3">{lesson.videoTopic}</p>
      </Card>

      <Card>
        <CardTitle icon="📄">Reading Text</CardTitle>
        <div className="text-ink-soft mt-4 space-y-3">
          <p className="font-bold text-ink">{lesson.readingTitle}</p>
          {lesson.reading.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <SpeakButtons text={lesson.readingSpeakText} langSlug={langSlug} label="Listen Reading" />
      </Card>

      <Card>
        <CardTitle icon="🎤">Exercises</CardTitle>
        <p className="text-ink-soft mt-4">Complete the sentences:</p>
        <ul className="list-disc ml-6 text-ink-soft mt-4 space-y-1">
          {lesson.exercises.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle icon="🗣">Speaking Topic</CardTitle>
        <p className="text-ink-soft mt-4">{lesson.speakingTopic}</p>
      </Card>
    </div>
  );
}
