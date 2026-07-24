"use client";

import Link from "next/link";

export default function Lesson6Page() {

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
            Lesson 6:
            Colors and Descriptions
          </h1>

          <p className="mt-2 text-red-100">
            Learn colors and
            how to describe
            people and objects.
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
                Common Colors
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>Red</li>
              <li>Blue</li>
              <li>Green</li>
              <li>Yellow</li>
              <li>Black</li>
              <li>White</li>
              <li>Orange</li>
              <li>Brown</li>
              <li>Pink</li>
              <li>Purple</li>

            </ul>

            <p>
              <strong>
                Describing Objects
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>
                The bag is red.
              </li>

              <li>
                The phone is black.
              </li>

              <li>
                The chair is blue.
              </li>

              <li>
                The notebook is green.
              </li>

            </ul>

            <p>
              <strong>
                Describing People
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>
                She is tall.
              </li>

              <li>
                He is short.
              </li>

              <li>
                She is happy.
              </li>

              <li>
                He is strong.
              </li>

              <li>
                She is friendly.
              </li>

            </ul>

            <p>
              <strong>
                Useful Adjectives
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>Big</li>
              <li>Small</li>
              <li>Heavy</li>
              <li>Light</li>
              <li>Beautiful</li>
              <li>Clean</li>

            </ul>

            <p>
              We use colors
              and adjectives
              to describe
              what we see
              around us.
            </p>

          </div>

          {/* Lesson Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
Common colors.

Red.
Blue.
Green.
Yellow.
Black.
White.
Orange.
Brown.
Pink.
Purple.

Describing objects.

The bag is red.

The phone is black.

The chair is blue.

The notebook is green.

Describing people.

She is tall.

He is short.

She is happy.

He is strong.

She is friendly.

Useful adjectives.

Big.
Small.
Heavy.
Light.
Beautiful.
Clean.

We use colors and adjectives to describe what we see around us.
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
            Learn colors and
            practice descriptions.
          </p>

        </div>

        {/* Reading */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            📄 Reading Text
          </h2>

          <div className="text-black mt-4 space-y-3">

            <p>
              My name is Lisa.
            </p>

            <p>
              I have a blue
              school bag.
            </p>

            <p>
              My notebook
              is green
              and my phone
              is black.
            </p>

            <p>
              I am happy
              and friendly.
            </p>

            <p>
              My little brother
              is short
              but very strong.
            </p>

          </div>

          {/* Reading Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
My name is Lisa.

I have a blue school bag.

My notebook is green and my phone is black.

I am happy and friendly.

My little brother is short but very strong.
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
              Name five colors
              in English.
            </li>

            <li>
              Describe
              your phone.
            </li>

            <li>
              Describe yourself
              in two sentences.
            </li>

            <li>
              Use three adjectives
              in sentences.
            </li>

          </ul>

        </div>

        {/* Speaking */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Describe yourself
            and three objects
            around you.
          </p>

        </div>

        {/* Quiz */}
        <div className="text-center mt-10">

          <Link href="/level1/quiz6">

            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">

              📝 Take Quiz

            </button>

          </Link>

        </div>

      </div>
    </main>
  );
}