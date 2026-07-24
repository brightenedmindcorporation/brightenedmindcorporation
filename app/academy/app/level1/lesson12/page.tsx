"use client";

import Link from "next/link";

export default function Lesson12Page() {

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
  Important things we learned include greeting people politely,
  introducing yourself, talking about age and personal information,
  talking about family members, naming everyday objects,
  using colors and descriptions, talking about dates and months,
  describing daily routines, talking about food and drinks,
  describing places in town, and talking about hobbies and interests.

  Example real life conversation.

  Hello, my name is David. What is your name?
  Hi David, my name is Sarah. Nice to meet you.
  Nice to meet you too. How old are you?
  I am fifteen years old. I live near the city market.
  Great. What do you like doing in your free time?
  I like reading books and listening to music.
  Nice. What is your favorite food?
  I love rice and chicken.
  `;

  const readingText = `
  Last Sunday, Kevin traveled with his family to visit his uncle in town. Before leaving home, he ate bread and drank tea for breakfast.
  After arriving, Kevin greeted everyone politely and introduced himself to some visitors he had never met before.

  Later, he went to the market with his cousin and helped buy vegetables, fish, and rice for lunch.

  In the afternoon, they played football together in the park and listened to music while resting.

  When the day ended, Kevin said he had enjoyed spending time with family and doing activities he loved.
  `;

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-red-800 text-white rounded-3xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold">
            Lesson 12: Final Review and Real-Life Conversation
          </h1>

          <p className="mt-2 text-red-100">
            Review everything learned and practice
            real-life English conversation.
          </p>
        </div>

        {/* Lesson Review */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-red-800">
              📘 Lesson Review
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
              <strong>
                Important Things We Learned
              </strong>
            </p>

            <ul className="list-disc ml-6">
              <li>Greeting people politely</li>
              <li>Introducing yourself</li>
              <li>
                Talking about age and personal information
              </li>
              <li>
                Talking about family members
              </li>
              <li>
                Naming everyday objects
              </li>
              <li>
                Using colors and descriptions
              </li>
              <li>
                Talking about dates and months
              </li>
              <li>
                Describing daily routines
              </li>
              <li>
                Talking about food and drinks
              </li>
              <li>
                Describing places in town
              </li>
              <li>
                Talking about hobbies and interests
              </li>
            </ul>

            <p>
              <strong>
                Example Real-Life Conversation
              </strong>
            </p>

            <p>
              A: Hello! My name is David.
              What is your name?
            </p>

            <p>
              B: Hi David. My name is Sarah.
              Nice to meet you.
            </p>

            <p>
              A: Nice to meet you too.
              How old are you?
            </p>

            <p>
              B: I am 15 years old.
              I live near the city market.
            </p>

            <p>
              A: Great. What do you like
              doing in your free time?
            </p>

            <p>
              B: I like reading books and
              listening to music.
            </p>

            <p>
              A: Nice. What is your
              favorite food?
            </p>

            <p>
              B: I love rice and chicken.
            </p>

          </div>
        </div>

        {/* Video */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            ▶ Video
          </h2>

          <p className="text-black mt-3">
            Review beginner English
            conversation and vocabulary.
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
              Last Sunday, Kevin traveled
              with his family to visit his
              uncle in town.
            </p>

            <p>
              Before leaving home, he ate
              bread and drank tea for breakfast.
            </p>

            <p>
              After arriving, Kevin greeted
              everyone politely and introduced
              himself to some visitors he had
              never met before.
            </p>

            <p>
              Later, he went to the market
              with his cousin and helped buy
              vegetables, fish, and rice
              for lunch.
            </p>

            <p>
              In the afternoon, they played
              football together in the park
              and listened to music while resting.
            </p>

            <p>
              When the day ended, Kevin said
              he had enjoyed spending time with
              family and doing activities he loved.
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
              Introduce yourself in English.
            </li>
            <li>
              Talk about your family.
            </li>
            <li>
              Describe your favorite food.
            </li>
            <li>
              Describe your daily routine.
            </li>
            <li>
              Talk about your hobbies.
            </li>
          </ul>
        </div>

        {/* Speaking */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            Present yourself and describe
            a normal day in your life.
          </p>
        </div>

        {/* Quiz */}
        <div className="text-center mt-10">
          <Link href="/level1/quiz12">
            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">
              📝 Take Final Quiz
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}