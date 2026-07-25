"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import SpeakingExercise from "@/components/SpeakingExercise";

export default function Lesson1Page() {
  const speakText = (text: string) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Back Button */}
          <div>
            <Link
              href="/academy/level1"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl border border-neutral-800 transition shadow-lg"
            >
              ← Back to Level 1
            </Link>
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white rounded-3xl p-8 shadow-2xl border border-red-900/40">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-red-50">
              Lesson 1: Greetings and Introductions
            </h1>
            <p className="text-red-200/80 mt-2 text-sm md:text-base">
              Learn greetings and how to introduce yourself in English.
            </p>
          </div>

          {/* Lesson */}
          <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              📘 Lesson
            </h2>

            <div className="text-neutral-300 mt-4 space-y-2">
              <p>Greetings are important when meeting people.</p>
              <p className="font-semibold text-white mt-4">Common greetings:</p>
              <p>• Hello / Hi</p>
              <p>• Good morning</p>
              <p>• Good afternoon</p>
              <p>• Good evening</p>

              <p className="font-semibold text-white mt-6">INTRODUCING YOURSELF</p>
              <p>• My name is...</p>
              <p>• I am... years old</p>
              <p>• I live in...</p>
              <p>• I am a student</p>
              <p>• Nice to meet you</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() =>
                  speakText(`
Greetings are important when meeting people.

Common greetings:
Hello.
Hi.
Good morning.
Good afternoon.
Good evening.

Introducing yourself.

My name is.
I am years old.
I live in.
I am a student.
Nice to meet you.
                  `)
                }
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-red-950/50"
              >
                🔊 Listen Lesson
              </button>

              <button
                onClick={stopAudio}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold px-6 py-3 rounded-xl border border-neutral-700 transition"
              >
                ⏹ Stop
              </button>
            </div>
          </div>

          {/* Video */}
          <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              ▶ Video
            </h2>
            <p className="text-neutral-300 mt-3">
              How to Introduce Yourself in English
            </p>
          </div>

          {/* Audio */}
          <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              🎧 Audio Conversation
            </h2>
            <p className="text-neutral-300 mt-3">
              Listen and repeat the conversation.
            </p>

            <audio controls className="w-full mt-4 rounded-xl">
              <source src="/audio/lesson1.mp3" type="audio/mpeg" />
            </audio>
          </div>

          {/* Reading Text */}
          <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              📄 Reading Text
            </h2>

            {/* Balise parent changée de <p> à <div> pour éviter l'erreur de hydration */}
            <div className="text-neutral-300 mt-4 space-y-3">
              <p className="font-bold text-white">Hello!</p>
              <p>
                My name is Sarah. I am 12 years old. I live in Kolwezi. I am a student.
              </p>
              <p>
                Every morning, I say “Good morning” to my teachers and friends. I like meeting new people. When I meet someone for the first time, I say: “Hello, my name is Sarah. Nice to meet you.”
              </p>
              <p>I am friendly and happy to learn English.</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() =>
                  speakText(`
Hello.
My name is Sarah.
I am 12 years old. I live in Kolwezi. I am a student.

Every morning, I say good morning to my teachers and friends.

I like meeting new people.

When I meet someone for the first time,
I say: Hello, my name is Sarah. Nice to meet you.

I am friendly and happy to learn English.
                  `)
                }
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-red-950/50"
              >
                🔊 Listen Reading
              </button>

              <button
                onClick={stopAudio}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold px-6 py-3 rounded-xl border border-neutral-700 transition"
              >
                ⏹ Stop
              </button>
            </div>
          </div>

          {/* Exercises */}
          <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              🎤 Exercises
            </h2>
            <p className="text-neutral-300 mt-4">Complete the sentences:</p>

            <ul className="list-disc ml-6 text-neutral-300 mt-4 space-y-1">
              <li>Hello, my name is ...</li>
              <li>I am ... years old</li>
              <li>I live in ...</li>
              <li>I am a ...</li>
            </ul>
          </div>

          {/* Speaking Topic */}
          <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              🗣 Speaking Topic
            </h2>
            <p className="text-neutral-300 mt-4">
              First time in the Democratic Republic of the Congo
            </p>
          </div>

          {/* Quiz Button */}
          <div className="text-center pt-4 pb-10">
            <Link href="/academy/level1/quiz1">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-2xl transition shadow-xl shadow-red-950/60">
                📝 Take Quiz
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}