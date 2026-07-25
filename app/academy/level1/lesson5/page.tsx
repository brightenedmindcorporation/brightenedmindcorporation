"use client";

import Link from "next/link";

export default function Lesson5Page() {

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
            Lesson 5:
            Everyday Objects
          </h1>

          <p className="mt-2 text-red-100">
            Learn common objects
            we use every day
            and how to describe them.
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
                Common Everyday Objects
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>Book</li>
              <li>Pen</li>
              <li>Chair</li>
              <li>Table</li>
              <li>Phone</li>
              <li>Bag</li>
              <li>Computer</li>
              <li>Bottle</li>
              <li>Notebook</li>
              <li>Key</li>

            </ul>

            <p>
              <strong>
                Useful Sentences
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>
                This is my book.
              </li>

              <li>
                I write with a pen.
              </li>

              <li>
                The chair is blue.
              </li>

              <li>
                My phone is
                on the table.
              </li>

              <li>
                I carry my bag
                to school.
              </li>

            </ul>

            <p>
              <strong>
                Describing Objects
              </strong>
            </p>

            <p>
              We can describe
              objects by color,
              size, and use.
            </p>

            <ul className="list-disc ml-6">

              <li>
                The book is small.
              </li>

              <li>
                The bottle is full.
              </li>

              <li>
                The computer is new.
              </li>

              <li>
                The bag is heavy.
              </li>

            </ul>

            <p>
              <strong>
                Remember:
              </strong>
            </p>

            <p>
              Everyday objects
              are things we use
              at home,
              at school,
              or at work
              every day.
            </p>

          </div>

          {/* Lesson Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
Common everyday objects.

Book.
Pen.
Chair.
Table.
Phone.
Bag.
Computer.
Bottle.
Notebook.
Key.

Useful sentences.

This is my book.

I write with a pen.

The chair is blue.

My phone is on the table.

I carry my bag to school.

Describing objects.

We can describe objects by color, size, and use.

The book is small.

The bottle is full.

The computer is new.

The bag is heavy.

Remember.

Everyday objects are things we use at home, at school, or at work every day.
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
            Learn common objects
            and their pronunciation.
          </p>

        </div>

        {/* Reading Text */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            📄 Reading Text
          </h2>

          <div className="text-black mt-4 space-y-3">

            <p>
              My name is Peter.
            </p>

            <p>
              Every day I go
              to school with
              my bag and
              my notebook.
            </p>

            <p>
              I use a pen
              to write
              in my book.
            </p>

            <p>
              My phone
              is in my bag.
            </p>

            <p>
              I sit on a chair
              and study
              every morning.
            </p>

          </div>

          {/* Reading Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
My name is Peter.

Every day I go to schoolwith my bag and my notebook.

I use a pen to write in my book. My fonn is in my bagg.

I sit on a chair and study every morning.
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
              Name five objects
              around you.
            </li>

            <li>
              Describe your
              school bag.
            </li>

            <li>
              Make three
              sentences using
              object names.
            </li>

            <li>
              Practice
              pronunciation aloud.
            </li>

          </ul>

        </div>

        {/* Speaking Topic */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Talk about the
            objects you use
            every day.
          </p>

        </div>

        {/* Quiz */}
        <div className="text-center mt-10">

          <Link href="/level1/quiz5">

            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">

              📝 Take Quiz

            </button>

          </Link>

        </div>

      </div>
    </main>
  );
}