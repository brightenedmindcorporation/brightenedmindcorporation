import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-12">

        {/* COLUMN 1 */}

        <div>

          <Image
            src="/logo-bm.png"
            alt="BM Logo"
            width={80}
            height={80}
          />

          <h3 className="text-2xl font-bold mt-6">
            Brightened Mind Corporation
          </h3>

          <p className="mt-4 text-gray-400 leading-8">
            Former, connecter et valoriser à travers
            l’innovation, l’éducation et les services professionnels.
          </p>

        </div>

        {/* COLUMN 2 */}

        <div>

          <h4 className="text-xl font-semibold mb-6 text-red-500">
            Navigation
          </h4>

          <div className="flex flex-col gap-4 text-gray-400">

            <a href="#" className="hover:text-white">
              Home
            </a>

            <a href="#about" className="hover:text-white">
              About
            </a>

            <a href="#departments" className="hover:text-white">
              Departments
            </a>

            <a href="#contact" className="hover:text-white">
              Contact
            </a>

          </div>

        </div>

        {/* COLUMN 3 */}

        <div>

          <h4 className="text-xl font-semibold mb-6 text-red-500">
            Départements
          </h4>

          <div className="flex flex-col gap-4 text-gray-400">

            <a href="#">BM Communication</a>

            <a
              href="https://brightenedmindacademy.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              BM Academia
            </a>

            <a href="#">BM Domestica</a>

          </div>

        </div>

        {/* COLUMN 4 */}

        <div>

          <h4 className="text-xl font-semibold mb-6 text-red-500">
            Contact
          </h4>

          <div className="flex flex-col gap-4 text-gray-400">

            <a href="mailto:brightenedmindcorporation@gmail.com">
              📧 brightenedmindcorporation@gmail.com
            </a>

            <a href="https://wa.me/243970874852">
              📱 +243 970 874 852
            </a>

            <a
              href="https://www.facebook.com/share/1HFQjG2p11/"
              target="_blank"
              rel="noopener noreferrer"
            >
              🌐 Facebook Page
            </a>

            <p>
              📍 RDC Congo
            </p>

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="border-t border-gray-800 mt-14 pt-8 text-center text-gray-500">

        © 2026 Brightened Mind Corporation — All Rights Reserved.

      </div>

    </footer>
  );
}