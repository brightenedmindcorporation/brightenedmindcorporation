"use client";

import Link from "next/link";

export default function Lesson9Page() {

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
            Lesson 9: Food and Drinks
          </h1>

          <p className="mt-2 text-red-100">
            Learn vocabulary about common food,
            drinks, and meals.
          </p>
        </div>

        {/* Lesson */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-800">
              📘 Lesson
            </h2>

            <div className="flex gap-3 flex-wrap">

              <button
                onClick={() =>
                  speakText(`
                  Common Foods.
                  Rice, Bread, Meat, Fish, Eggs, Chicken, Banana, Apple.

                  Common Drinks.
                  Water, Milk, Juice, Tea, Coffee.

                  Useful Sentences.
                  I drink water every day.
                  My favorite food is rice.
                  I eat bread for breakfast.
                  She likes apple juice.
                  We eat chicken for dinner.

                  Food gives us energy and drinks help our body stay healthy.
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
                Common Foods
              </strong>
            </p>

            <ul className="list-disc ml-6">
              <li>Rice</li>
              <li>Bread</li>
              <li>Meat</li>
              <li>Fish</li>
              <li>Eggs</li>
              <li>Chicken</li>
              <li>Banana</li>
              <li>Apple</li>
            </ul>

            <p>
              <strong>
                Common Drinks
              </strong>
            </p>

            <ul className="list-disc ml-6">
              <li>Water</li>
              <li>Milk</li>
              <li>Juice</li>
              <li>Tea</li>
              <li>Coffee</li>
            </ul>

            <p>
              <strong>
                Useful Sentences
              </strong>
            </p>

            <ul className="list-disc ml-6">
              <li>
                I drink water every day.
              </li>

              <li>
                My favorite food is rice.
              </li>

              <li>
                I eat bread for breakfast.
              </li>

              <li>
                She likes apple juice.
              </li>

              <li>
                We eat chicken for dinner.
              </li>
            </ul>

            <p>
              Food gives us energy and
              drinks help our body stay
              healthy.
            </p>

          </div>
        </div>

        {/* Video */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            ▶ Video
          </h2>

          <p className="text-black mt-3">
            Learn common food and drink
            vocabulary.
          </p>
        </div>

        {/* Reading Text */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-800">
              📄 Reading Text
            </h2>

            <div className="flex gap-3 flex-wrap">

              <button
                onClick={() =>
                  speakText(`
                  My name is Emma.
                  Every morning I eat bread and eggs for breakfast.

                  At school, I drink water and sometimes fruit juice.

                  My favorite food is rice with chicken.

                  In the evening, my family eats fish and vegetables together.

                  I always drink water before going to sleep.
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
              My name is Emma.
            </p>

            <p>
              Every morning I eat bread
              and eggs for breakfast.
            </p>

            <p>
              At school, I drink water
              and sometimes fruit juice.
            </p>

            <p>
              My favorite food is rice
              with chicken.
            </p>

            <p>
              In the evening, my family
              eats fish and vegetables
              together.
            </p>

            <p>
              I always drink water before
              going to sleep.
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
              Name five foods in English.
            </li>

            <li>
              Name three drinks in English.
            </li>

            <li>
              Say what you eat for breakfast.
            </li>

            <li>
              Describe your favorite meal.
            </li>
          </ul>
        </div>

        {/* Speaking */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Talk about your favorite food
            and what you drink every day.
          </p>
        </div>

        {/* Quiz */}
        <div className="text-center mt-10">
          <Link href="/level1/quiz9">
            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">
              📝 Take Quiz
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}