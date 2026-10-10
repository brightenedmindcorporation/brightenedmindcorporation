import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brightened Mind Corporation",
  description:
    "Construire, développer et transformer grâce à la communication, aux services et à l’éducation.",

  keywords: [
    "Brightened Mind Corporation",
    "BM Academy",
    "BM Communication",
    "BM Domestica",
    "Education",
    "Business",
    "Innovation",
    "Corporate",
  ],

  authors: [
    {
      name: "Brightened Mind Corporation",
    },
  ],

  creator: "Brightened Mind Corporation",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Brightened Mind Corporation",
    description:
      "Construire, développer et transformer grâce à la communication, aux services et à l’éducation.",
    siteName: "Brightened Mind Corporation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`dark ${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-gold-100">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}