"use client";

import Link from "next/link";

export default function Lesson8Page() {

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
            Lesson 8:
            Daily Routines
          </h1>

          <p className="mt-2 text-red-100">
            Learn how to talk
            about everyday
            activities and
            routines.
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
                Common Daily Activities
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>Wake up</li>
              <li>Brush my teeth</li>
              <li>Take a shower</li>
              <li>Eat breakfast</li>
              <li>Go to school</li>
              <li>Study</li>
              <li>Eat lunch</li>
              <li>Play with friends</li>
              <li>Do homework</li>
              <li>Sleep</li>

            </ul>

            <p>
              <strong>
                Useful Sentences
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>
                I wake up
                at 6 o’clock.
              </li>

              <li>
                I brush my teeth
                every morning.
              </li>

              <li>
                I go to school
                at 7 a.m.
              </li>

              <li>
                I do my homework
                in the evening.
              </li>

              <li>
                I sleep at night.
              </li>

            </ul>

            <p>
              <strong>
                Talking About Routine
              </strong>
            </p>

            <p>
              Daily routine means
              the activities
              we do every day,
              usually in the
              same order.
            </p>

          </div>

          {/* Lesson Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
Common daily activities.

Wake up.

Brush my teeth.

Take a shower.

Eat breakfast.

Go to school.

Study.

Eat lunch.

Play with friends.

Do homework.

Sleep.

Useful sentences.

I wake up at six o’clock.

I brush my teeth every morning.

I go to school at seven a.m.

I do my homework in the evening.

I sleep at night.

Talking about routine.

Daily routine means the activities we do every day, usually in the same order.
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
            Learn vocabulary
            about everyday
            routines.
          </p>

        </div>

        {/* Reading */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            📄 Reading Text
          </h2>

          <div className="text-black mt-4 space-y-3">

            <p>
              My name
              is Daniel.
            </p>

            <p>
              Every day
              I wake up
              at 6 o’clock
              in the morning.
            </p>

            <p>
              I brush my teeth
              and take a shower
              before breakfast.
            </p>

            <p>
              At 7 a.m.,
              I go to school
              and study
              with my classmates.
            </p>

            <p>
              In the afternoon,
              I play football
              with my friends.
            </p>

            <p>
              In the evening,
              I do my homework
              and sleep
              at 9 p.m.
            </p>

          </div>

          {/* Reading Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
My name is Daniel.

Every day I wake up at six o’clock in the morning.

I brush my teeth and take a shower before breakfast.

At seven a.m., I go to school and study with my classmates.

In the afternoon, I play football with my friends.

In the evening, I do my homework and sleep at nine p.m.
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
              Describe your
              morning routine.
            </li>

            <li>
              Say what time
              you wake up.
            </li>

            <li>
              Make three sentences
              about your
              daily activities.
            </li>

            <li>
              Talk about what
              you do
              after school.
            </li>

          </ul>

        </div>

        {/* Speaking */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Talk about your
            daily routine
            from morning
            to night.
          </p>

        </div>

        {/* Quiz */}
        <div className="text-center mt-10">

          <Link href="/level1/quiz8">

            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">

              📝 Take Quiz

            </button>

          </Link>

        </div>

      </div>
    </main>
  );
}