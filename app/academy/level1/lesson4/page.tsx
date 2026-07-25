"use client";

import Link from "next/link";

export default function Lesson4Page() {

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
            Lesson 4:
            Family and Relationships
          </h1>

          <p className="mt-2 text-red-100">
            Learn family members
            and how to talk about
            relationships.
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
                Family Members
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>Father</li>
              <li>Mother</li>
              <li>Brother</li>
              <li>Sister</li>
              <li>Uncle</li>
              <li>Aunt</li>
              <li>Grandfather</li>
              <li>Grandmother</li>
              <li>Cousin</li>
              <li>Parents</li>

            </ul>

            <p>
              <strong>
                Relationships
              </strong>
            </p>

            <p>
              Family relationships
              are important in
              everyday life.
            </p>

            <p>
              Useful sentences:
            </p>

            <ul className="list-disc ml-6">

              <li>
                This is my father.
              </li>

              <li>
                My mother is
                very kind.
              </li>

              <li>
                I have one brother
                and two sisters.
              </li>

              <li>
                I love my family.
              </li>

              <li>
                My parents help me
                every day.
              </li>

            </ul>

            <p>
              <strong>
                Example
              </strong>
            </p>

            <p>
              I live with my family.
              <br />
              My father works
              in an office.
              <br />
              My mother is
              a teacher.
              <br />
              I have one brother
              and one sister.
              <br />
              We are happy
              together.
            </p>

          </div>

          {/* Lesson Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
Family members.

Father.
Mother.
Brother.
Sister.
Uncle.
Aunt.
Grandfather.
Grandmother.
Cousin.
Parents.

Relationships.

Family relationships are important in everyday life.

Useful sentences.

This is my father.

My mother is very kind.

I have one brother and two sisters.

I love my family.

My parents help me every day.

Example.

I live with my family.

My father works in an office.

My mother is a teacher.

I have one brother and one sister.

We are happy together.
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
            Learn family vocabulary
            and relationship words.
          </p>

        </div>

        {/* Reading Text */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            📄 Reading Text
          </h2>

          <div className="text-black mt-4 space-y-3">

            <p>
              My name is John.
            </p>

            <p>
              I live with my
              parents and
              my sister.
            </p>

            <p>
              My father is
              a doctor.
            </p>

            <p>
              My mother is
              very caring.
            </p>

            <p>
              I love spending
              time with
              my family.
            </p>

          </div>

          {/* Reading Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
My name is John.

I live with my parents and my sister.

My father is a doctor.

My mother is very caring.

I love spending time with my family.
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
              Name five family
              members in English.
            </li>

            <li>
              Describe your family
              in simple sentences.
            </li>

            <li>
              Say who lives
              in your house.
            </li>

            <li>
              Practice saying
              family relationships
              aloud.
            </li>

          </ul>

        </div>

        {/* Speaking Topic */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Talk about your family
            and the people
            close to you.
          </p>

        </div>

        {/* Quiz */}
        <div className="text-center mt-10">

          <Link href="/level1/quiz4">

            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">

              📝 Take Quiz

            </button>

          </Link>

        </div>

      </div>
    </main>
  );
}