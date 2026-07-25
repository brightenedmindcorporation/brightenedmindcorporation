"use client";

import Link from "next/link";

export default function Lesson3Page() {

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
            Lesson 3:
            Numbers and Personal Information
          </h1>

          <p className="mt-2 text-red-100">
            Learn numbers and how
            to share personal
            information in English.
          </p>

        </div>

        {/* Lesson */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            📘 Lesson
          </h2>

          <div className="text-black mt-4 space-y-4">

            <p>
              <strong>
                Numbers from 1 to 10
              </strong>
            </p>

            <p>
              1 - One <br />
              2 - Two <br />
              3 - Three <br />
              4 - Four <br />
              5 - Five <br />
              6 - Six <br />
              7 - Seven <br />
              8 - Eight <br />
              9 - Nine <br />
              10 - Ten
            </p>

            <p>
              <strong>
                Personal Information
              </strong>
            </p>

            <p>
              We use personal
              information to
              introduce ourselves.
            </p>

            <p>
              Important questions:
            </p>

            <ul className="list-disc ml-6">
              <li>
                What is your name?
              </li>

              <li>
                How old are you?
              </li>

              <li>
                Where do you live?
              </li>

              <li>
                What is your phone number?
              </li>

              <li>
                What is your email address?
              </li>
            </ul>

            <p>
              <strong>
                Example Answers
              </strong>
            </p>

            <p>
              My name is David.
              <br />
              I am 15 years old.
              <br />
              I live in Kinshasa.
              <br />
              My phone number is
              123456789.
              <br />
              My email is
              david@gmail.com
            </p>

          </div>

          {/* Lesson Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
Numbers from one to ten.

One.
Two.
Three.
Four.
Five.
Six.
Seven.
Eight.
Nine.
Ten.

Personal Information.

We use personal
information to
introduce ourselves.

Important questions.

What is your name?

How old are you?

Where do you live?

What is your
phone number?

What is your
email address?

Example answers.

My name is David.

I am fifteen
years old.

I live in Kinshasa.

My phone number is
one two three
four five six
seven eight nine.

My email is
david@gmail.com
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
            Learn numbers and
            practice introducing
            yourself.
          </p>

        </div>

        {/* Reading Text */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            📄 Reading Text
          </h2>

          <div className="text-black mt-4 space-y-3">

            <p>
              Hello!
              My name is Sarah.
            </p>

            <p>
              I am 14 years old.
            </p>

            <p>
              I live in Kinshasa.
            </p>

            <p>
              My phone number is
              987654321.
            </p>

            <p>
              My email address is
              sarah@gmail.com.
            </p>

          </div>

          {/* Reading Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
Hello.

My name is Sarah.

I am fourteen years old.

I live in Kinshasa.

My phone number is nine eight seven six five four three two one.

My email address is sarah@gmail.com
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

            <li>
              Count from 1 to 10
              in English.
            </li>

            <li>
              Write your name
              in English.
            </li>

            <li>
              Say your age
              in English.
            </li>

            <li>
              Write your phone
              number in English.
            </li>

          </ul>

        </div>

        {/* Speaking Topic */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Introduce yourself
            using your personal
            information.
          </p>

        </div>

        {/* Quiz */}
        <div className="text-center mt-10">

          <Link href="/level1/quiz3">

            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">

              📝 Take Quiz

            </button>

          </Link>

        </div>

      </div>
    </main>
  );
}