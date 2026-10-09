"use client";

import type { Lesson } from "@/content/curriculum/types";

function speak(text: string) {
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 0.9;
  speech.pitch = 1;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl">{children}</div>;
}

function CardTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
      <span>{icon}</span> {children}
    </h2>
  );
}

function SpeakButtons({ text, label = "Listen" }: { text: string; label?: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <button
        onClick={() => speak(text)}
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-red-950/50"
      >
        🔊 {label}
      </button>
      <button
        onClick={stopSpeaking}
        className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold px-6 py-3 rounded-xl border border-neutral-700 transition"
      >
        ⏹ Stop
      </button>
    </div>
  );
}

export default function LessonRenderer({ lesson }: { lesson: Lesson }) {
  return (
    <div className="space-y-8">
      <Card>
        <CardTitle icon="📘">Lesson</CardTitle>
        <div className="text-neutral-300 mt-4 space-y-4">
          {lesson.sections.map((section, i) => (
            <div key={i}>
              <p className="font-semibold text-white mt-4 first:mt-0">{section.heading}</p>
              <div className="space-y-1 mt-1">
                {section.body.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <SpeakButtons text={lesson.speakText} label="Listen Lesson" />
      </Card>

      <Card>
        <CardTitle icon="▶">Video</CardTitle>
        <p className="text-neutral-300 mt-3">{lesson.videoTopic}</p>
      </Card>

      <Card>
        <CardTitle icon="📄">Reading Text</CardTitle>
        <div className="text-neutral-300 mt-4 space-y-3">
          <p className="font-bold text-white">{lesson.readingTitle}</p>
          {lesson.reading.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <SpeakButtons text={lesson.readingSpeakText} label="Listen Reading" />
      </Card>

      <Card>
        <CardTitle icon="🎤">Exercises</CardTitle>
        <p className="text-neutral-300 mt-4">Complete the sentences:</p>
        <ul className="list-disc ml-6 text-neutral-300 mt-4 space-y-1">
          {lesson.exercises.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle icon="🗣">Speaking Topic</CardTitle>
        <p className="text-neutral-300 mt-4">{lesson.speakingTopic}</p>
      </Card>
    </div>
  );
}
