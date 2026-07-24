import Link from "next/link";

export default function Whatsapp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">

      <Link
        href="https://wa.me/243000000000"
        target="_blank"
        className="bg-green-500 text-white px-5 py-4 rounded-full shadow-2xl hover:scale-110 transition duration-300"
      >
        WhatsApp
      </Link>

    </div>
  );
}