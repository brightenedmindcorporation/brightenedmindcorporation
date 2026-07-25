"use client";

import Link from "next/link";

export default function Lesson7Page() {

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
            Lesson 7:
            Days, Months,
            and Dates
          </h1>

          <p className="mt-2 text-red-100">
            Learn how to talk
            about days, months,
            and important dates.
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
                Days of the Week
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>Monday</li>
              <li>Tuesday</li>
              <li>Wednesday</li>
              <li>Thursday</li>
              <li>Friday</li>
              <li>Saturday</li>
              <li>Sunday</li>

            </ul>

            <p>
              <strong>
                Months of the Year
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>January</li>
              <li>February</li>
              <li>March</li>
              <li>April</li>
              <li>May</li>
              <li>June</li>
              <li>July</li>
              <li>August</li>
              <li>September</li>
              <li>October</li>
              <li>November</li>
              <li>December</li>

            </ul>

            <p>
              <strong>
                Useful Sentences
              </strong>
            </p>

            <ul className="list-disc ml-6">

              <li>
                Today is Monday.
              </li>

              <li>
                My birthday
                is in July.
              </li>

              <li>
                School starts
                in September.
              </li>

              <li>
                Today is
                June 15th.
              </li>

              <li>
                I go to church
                on Sunday.
              </li>

            </ul>

          </div>

          {/* Lesson Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
Days of the week.

Monday.
Tuesday.
Wednesday.
Thursday.
Friday.
Saturday.
Sunday.

Months of the year.

January.
February.
March.
April.
May.
June.
July.
August.
September.
October.
November.
December.

Useful sentences.

Today is Monday.

My birthday is in July.

School starts in September.

Today is June fifteenth.

I go to church on Sunday.
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
            Learn days
            of the week,
            months,
            and how to
            say dates.
          </p>

        </div>

        {/* Reading Text */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            📄 Reading Text
          </h2>

          <div className="text-black mt-4 space-y-3">

            <p>
              My name
              is Kevin.
            </p>

            <p>
              Today is Friday,
              June 12th.
              I wake up early
              every morning.
            </p>

            <p>
              I go to school
              from Monday
              to Friday
              and I rest
              on Saturday.
            </p>

            <p>
              My favorite month
              is July because
              it is my
              birthday month.
            </p>

            <p>
              My birthday is
              on July 25th
              and my family
              celebrates with me.
            </p>

            <p>
              Every Sunday,
              I go to church
              with my parents.
            </p>

          </div>

          {/* Reading Audio */}
          <div className="mt-6 flex gap-4 flex-wrap">

            <button
              onClick={() =>
                speakText(`
My name is Kevin.

Today is Friday, June twelfth.

I wake up early every morning.

I go to school from Monday to Friday and I rest on Saturday.

My favorite month is July because it is my birthday month.

My birthday is on July twenty-fifth and my family celebrates with me.

Every Sunday, I go to church with my parents.
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
              Say all days
              of the week.
            </li>

            <li>
              Say all months
              of the year.
            </li>

            <li>
              Tell your
              birthday date.
            </li>

            <li>
              Say what day
              it is today.
            </li>

          </ul>

        </div>

        {/* Speaking */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Talk about
            your birthday
            and your
            weekly activities.
          </p>

        </div>

        {/* Quiz */}
        <div className="text-center mt-10">

          <Link href="/level1/quiz7">

            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">

              📝 Take Quiz

            </button>

          </Link>

        </div>

      </div>
    </main>
  );
}