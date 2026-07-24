import type { Metadata } from "next";
import "./globals.css";

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
    "Corporate"
  ],

  authors: [
    {
      name: "Brightened Mind Corporation"
    }
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
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}