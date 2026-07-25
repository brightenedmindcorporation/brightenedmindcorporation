"use client";

import Link from "next/link";

export default function Lesson2Page() {

  const speakText = (
    text: string
  ) => {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    speech.lang =
      "en-US";

    speech.rate =
      0.9;

    speech.pitch =
      1;

    speech.volume =
      1;

    window.speechSynthesis.speak(
      speech
    );
  };

  const stopAudio =
    () => {
      window.speechSynthesis.cancel();
    };
  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-red-800 text-white rounded-3xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold">
            Lesson 2: Alphabet and Pronunciation
          </h1>

          <p className="mt-2 text-red-100">
            Learn the English alphabet and practice correct pronunciation.
          </p>
        </div>

        {/* Lesson */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            📘 Lesson
          </h2>

          <div className="text-black mt-4 space-y-4">

            <p><strong>The English Alphabet</strong></p>

            <p>
              The English alphabet has 26 letters.
            </p>

            <p>
              A B C D E F G H I J K L M <br />
              N O P Q R S T U V W X Y Z
            </p>

            <p><strong>Vowels</strong></p>

            <ul className="list-disc ml-6">
              <li>A</li>
              <li>E</li>
              <li>I</li>
              <li>O</li>
              <li>U</li>
            </ul>

            <p><strong>Consonants</strong></p>

            <p>
              All other letters are consonants.
            </p>

            <p><strong>Pronunciation Practice</strong></p>

            <ul className="list-disc ml-6">
              <li>A = /eɪ/</li>
              <li>B = /biː/</li>
              <li>C = /siː/</li>
              <li>D = /diː/</li>
              <li>E = /iː/</li>
            </ul>

            <p>
              We use letters to spell names, words, and email addresses.
            </p>

            <p><strong>Example:</strong></p>

            <p>
              My name is David.
            </p>

            <p>
              D - A - V - I - D
            </p>

          </div>
          <div className="mt-6 flex gap-4 flex-wrap">

  <button
    onClick={() =>
      speakText(`
The English alphabet has 26 letters.

A, bee, sea, di:, e, f: ,jee, etsh, eye, jay, kay, el, am

N, O, P, Q ,R, S, T, U, V, W, X, Y, Z.

Vowels:
A, E, I, O, U.

All other letters are consonants.

Pronunciation practice.

A
B
C
D
E

We use letters to spell names,
words,
and email addresses.

Example:
My name is David.

D A V I D.
      `)
    }
    className="bg-blue-700 text-white px-6 py-3 rounded-xl"
  >
    🔊 Listen Lesson
  </button>

  <button
    onClick={stopAudio}
    className="bg-red-600 text-white px-6 py-3 rounded-xl"
  >
    ⏹ Stop
  </button>

</div>
        </div>

        {/* Video */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            ▶ Video
          </h2>

          <p className="text-black mt-3">
            Learn and repeat the English alphabet from A to Z.
          </p>
        </div>

        {/* Audio */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🎧 Audio Practice
          </h2>

          <p className="text-black mt-3">
            Listen and repeat each letter carefully.
          </p>

          <audio controls className="w-full mt-4">
            <source
              src="/audio/lesson2.mp3"
              type="audio/mpeg"
            />
          </audio>
        </div>

        {/* Reading */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            📄 Reading Text
          </h2>

          <div className="text-black mt-4 space-y-3">
            <p>
              Hello! My name is Anna.
            </p>

            <p>
              I am learning English at school.
            </p>

            <p>
              Today I am learning the alphabet.
            </p>

            <p>
              I practice every day and I enjoy learning new words.
            </p>

            <p>
              I can spell my name: A - N - N - A.
            </p>
          </div>
        <div className="mt-6 flex gap-4 flex-wrap">

  <button
    onClick={() =>
      speakText(`
Hello. My name is Anna.

I am learning English at school.

Today, I am learning the alphabet.

I practice every day and I enjoy learning new words.

I can spell my name.

A, N, N, A.
      `)
    }
    className="bg-blue-700 text-white px-6 py-3 rounded-xl"
  >
    🔊 Listen Reading
  </button>

  <button
    onClick={stopAudio}
    className="bg-red-600 text-white px-6 py-3 rounded-xl"
  >
    ⏹ Stop
  </button>

</div>
        </div>
        {/* Exercises */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🎤 Exercises
          </h2>

          <ul className="list-disc ml-6 text-black mt-4">
            <li>Say the alphabet from A to Z.</li>
            <li>Spell your name in English.</li>
            <li>Spell your email address.</li>
            <li>Practice pronunciation of vowels.</li>
          </ul>
        </div>

        {/* Speaking */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Introduce yourself and spell your full name.
          </p>
        </div>

        {/* Quiz */}
        <div className="text-center mt-10">
          <Link href="/level1/quiz2">
            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">
              📝 Take Quiz
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}