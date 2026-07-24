"use client";

import Link from "next/link";

export default function Lesson11Page() {
  const speakText = (text: string) => {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  const lessonText = `
  Common hobbies include reading books, playing football,
  listening to music, watching movies, drawing, dancing,
  singing, cooking, swimming, and playing video games.

  My favorite hobby is reading.
  I enjoy playing football.
  She likes listening to music.
  We watch movies on weekends.
  He loves drawing pictures.

  What do you like doing?
  I enjoy spending time with friends.
  My hobby helps me relax.
  I practice my hobby after school.
  `;

  const readingText = `
  On Saturday afternoon, James visited his cousin Daniel.
  When he arrived, Daniel was sitting outside and reading a book about animals.
  After reading, both boys decided to play football in the neighborhood park.
  Later, they returned home and listened to music while Daniel's sister was drawing in the living room.
  During dinner, James said that he enjoyed the day because spending time doing fun activities made him happy.
  Before leaving, Daniel told James that reading books was still his favorite hobby.
  `;

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-red-800 text-white rounded-3xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold">
            Lesson 11: Hobbies and Interests
          </h1>

          <p className="mt-2 text-red-100">
            Learn how to talk about hobbies,
            interests, and free time activities.
          </p>
        </div>

        {/* Lesson */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-red-800">
              📘 Lesson
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  speakText(lessonText)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                🔊 Read Lesson
              </button>

              <button
                onClick={stopSpeaking}
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                ⏹ Stop
              </button>
            </div>
          </div>

          <div className="text-black mt-4 space-y-4">

            <p>
              <strong>Common Hobbies</strong>
            </p>

            <ul className="list-disc ml-6">
              <li>Reading books</li>
              <li>Playing football</li>
              <li>Listening to music</li>
              <li>Watching movies</li>
              <li>Drawing</li>
              <li>Dancing</li>
              <li>Singing</li>
              <li>Cooking</li>
              <li>Swimming</li>
              <li>Playing video games</li>
            </ul>

            <p>
              <strong>Useful Sentences</strong>
            </p>

            <ul className="list-disc ml-6">
              <li>My favorite hobby is reading.</li>
              <li>I enjoy playing football.</li>
              <li>She likes listening to music.</li>
              <li>We watch movies on weekends.</li>
              <li>He loves drawing pictures.</li>
            </ul>

            <p>
              <strong>Talking About Interests</strong>
            </p>

            <ul className="list-disc ml-6">
              <li>What do you like doing?</li>
              <li>
                I enjoy spending time with friends.
              </li>
              <li>
                My hobby helps me relax.
              </li>
              <li>
                I practice my hobby after school.
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
            Learn vocabulary about hobbies
            and free time activities.
          </p>
        </div>

        {/* Reading Text */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-red-800">
              📄 Reading Text
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  speakText(readingText)
                }
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                🔊 Read Text
              </button>

              <button
                onClick={stopSpeaking}
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                ⏹ Stop
              </button>
            </div>
          </div>

          <div className="text-black mt-4 space-y-3">

            <p>
              On Saturday afternoon, James visited
              his cousin Daniel.
            </p>

            <p>
              When he arrived, Daniel was sitting
              outside and reading a book about animals.
            </p>

            <p>
              After reading, both boys decided to
              play football in the neighborhood park.
            </p>

            <p>
              Later, they returned home and listened
              to music while Daniel’s sister was
              drawing in the living room.
            </p>

            <p>
              During dinner, James said that he
              enjoyed the day because spending time
              doing fun activities made him happy.
            </p>

            <p>
              Before leaving, Daniel told James that
              reading books was still his favorite
              hobby.
            </p>

          </div>
        </div>

        {/* Exercises */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🎤 Exercises
          </h2>

          <ul className="list-disc ml-6 text-black mt-4">
            <li>Name three hobbies you enjoy.</li>
            <li>
              Talk about what you do in your free time.
            </li>
            <li>
              Make sentences using hobby vocabulary.
            </li>
            <li>
              Describe your favorite weekend activity.
            </li>
          </ul>
        </div>

        {/* Speaking */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Talk about your favorite hobby
            and why you enjoy it.
          </p>
        </div>

        {/* Quiz */}
        <div className="text-center mt-10">
          <Link href="/level1/quiz11">
            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">
              📝 Take Quiz
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}