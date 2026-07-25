"use client";

import { useState } from "react";

interface SpeakingExerciseProps {
  phrase?: string;
  expectedText?: string;
}

export default function SpeakingExercise({
  phrase,
  expectedText,
}: SpeakingExerciseProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const targetText = phrase || expectedText || "";

  const handleListen = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES"; // Modifiez selon la langue ciblée
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);
    };

    recognition.start();
  };

  return (
    <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm my-4">
      <h3 className="text-lg font-semibold mb-2">Exercice d'élocution</h3>
      {targetText && (
        <p className="text-sm text-muted-foreground mb-3">
          Répétez la phrase : <strong className="text-foreground">{targetText}</strong>
        </p>
      )}

      <button
        onClick={handleListen}
        disabled={isListening}
        className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${
          isListening ? "bg-red-500 animate-pulse" : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isListening ? "Écoute en cours..." : "🎤 Parler"}
      </button>

      {transcript && (
        <div className="mt-3 text-sm">
          <p className="font-medium">Vous avez dit :</p>
          <p className="italic text-muted-foreground">"{transcript}"</p>
        </div>
      )}
    </div>
  );
}