"use client";

import Link from "next/link";

export default function Lesson10Page() {

  const speakText = (text: string) => {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    const voices =
      window.speechSynthesis.getVoices();

    const englishVoice =
      voices.find(
        (voice) =>
          voice.lang.includes("en")
      );

    if (englishVoice) {
      speech.voice =
        englishVoice;
    }

    window.speechSynthesis.speak(
      speech
    );
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-red-800 text-white rounded-3xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold">
            Lesson 10: Places in Town
          </h1>

          <p className="mt-2 text-red-100">
            Learn vocabulary about places
            you can find in a town or city.
          </p>
        </div>

        {/* Lesson */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <div className="flex justify-between items-center flex-wrap gap-3">

            <h2 className="text-2xl font-bold text-red-800">
              📘 Lesson
            </h2>

            <div className="flex gap-3 flex-wrap">

              <button
                onClick={() =>
                  speakText(`
                  Common Places in Town.
                  School, Hospital, Market,
                  Bank, Restaurant, Church,
                  Police Station, Bus Station,
                  Library, Park.

                  Useful Sentences.
                  I go to school every morning.
                  My mother works at the hospital.
                  We buy food at the market.
                  He goes to the bank on Friday.
                  Children play in the park.

                  Asking About Places.
                  Where is the hospital?
                  How do I get to the bank?
                  The market is near the church.
                  The library is next to the school.
                `)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                🔊 Listen Lesson
              </button>

              <button
                onClick={stopSpeech}
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                ⏹ Stop
              </button>

            </div>
          </div>

          <div className="text-black mt-4 space-y-4">

            <p>
              <strong>
                Common Places in Town
              </strong>
            </p>

            <ul className="list-disc ml-6">
              <li>School</li>
              <li>Hospital</li>
              <li>Market</li>
              <li>Bank</li>
              <li>Restaurant</li>
              <li>Church</li>
              <li>Police Station</li>
              <li>Bus Station</li>
              <li>Library</li>
              <li>Park</li>
            </ul>

            <p>
              <strong>
                Useful Sentences
              </strong>
            </p>

            <ul className="list-disc ml-6">
              <li>
                I go to school every morning.
              </li>

              <li>
                My mother works at the hospital.
              </li>

              <li>
                We buy food at the market.
              </li>

              <li>
                He goes to the bank on Friday.
              </li>

              <li>
                Children play in the park.
              </li>
            </ul>

            <p>
              <strong>
                Asking About Places
              </strong>
            </p>

            <ul className="list-disc ml-6">
              <li>
                Where is the hospital?
              </li>

              <li>
                How do I get to the bank?
              </li>

              <li>
                The market is near the church.
              </li>

              <li>
                The library is next to the school.
              </li>
            </ul>

          </div>
        </div>

        {/* Video */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            ▶ Video
          </h2>

          <p className="text-black mt-3">
            Learn vocabulary about places
            in town and directions.
          </p>
        </div>

        {/* Reading Text */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <div className="flex justify-between items-center flex-wrap gap-3">

            <h2 className="text-2xl font-bold text-red-800">
              📄 Reading Text
            </h2>

            <div className="flex gap-3 flex-wrap">

              <button
                onClick={() =>
                  speakText(`
                  Last Wednesday, Michael went to the town center with his father.

                  First, they stopped at the bank because his father needed to withdraw money.

                  After leaving the bank, they walked to the market to buy fresh fruit and vegetables.

                  While they were walking, Michael saw a large hospital near the police station.

                  Before going home, they sat in a small restaurant and ate lunch together.

                  Michael said he liked the town because everything was close and easy to find.
                `)
                }
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                🔊 Listen Reading
              </button>

              <button
                onClick={stopSpeech}
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                ⏹ Stop
              </button>

            </div>
          </div>

          <div className="text-black mt-4 space-y-3">

            <p>
              Last Wednesday, Michael went
              to the town center with
              his father.
            </p>

            <p>
              First, they stopped at
              the bank because his father
              needed to withdraw money.
            </p>

            <p>
              After leaving the bank,
              they walked to the market
              to buy fresh fruit and vegetables.
            </p>

            <p>
              While they were walking,
              Michael saw a large hospital
              near the police station.
            </p>

            <p>
              Before going home,
              they sat in a small restaurant
              and ate lunch together.
            </p>

            <p>
              Michael said he liked the town
              because everything was close
              and easy to find.
            </p>

          </div>
        </div>

        {/* Exercises */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🎤 Exercises
          </h2>

          <ul className="list-disc ml-6 text-black mt-4">
            <li>
              Name five places in your town.
            </li>

            <li>
              Say where people buy food.
            </li>

            <li>
              Describe places near your house.
            </li>

            <li>
              Make sentences using town vocabulary.
            </li>
          </ul>
        </div>

        {/* Speaking */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Describe places you often
            visit in your town.
          </p>
        </div>

        {/* Quiz */}
        <div className="text-center mt-10">
          <Link href="/level1/quiz10">
            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">
              📝 Take Quiz
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}