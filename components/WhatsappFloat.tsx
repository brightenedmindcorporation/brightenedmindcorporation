"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsappFloat() {
  return (
    <a
      href="https://wa.me/243970874852"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-16 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300"
    >
      <MessageCircle size={22} strokeWidth={2} aria-hidden="true" />
    </a>
  );
}