import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brightened Mind Corporation",
  description:
    "Construire, développer et transformer grâce à la communication, aux services et à l’éducation.",

  keywords: [
    "Brightened Mind Corporation",
    "BM Academia",
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

  appleWebApp: { capable: true, title: "BM Academia", statusBarStyle: "default" },
  openGraph: {
    title: "Brightened Mind Corporation",
    description:
      "Construire, développer et transformer grâce à la communication, aux services et à l’éducation.",
    siteName: "Brightened Mind Corporation",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a1f2b",
};

// Runs before paint (blocking, in <head>) so the page never flashes the
// wrong theme: reads the stored preference (defaulting to light on a first
// visit, never to the OS/browser setting) and sets the `dark` class
// synchronously, before React hydrates.
const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark'||s==='system')?s:'light';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

// A phone browser's "Request desktop site" changes the User-Agent string
// but, because this page declares width=device-width, many browsers still
// honor that and keep the real (narrow) layout viewport — so the page
// never actually gets wide enough for the md:/lg: desktop CSS to kick in
// and visually nothing changes. Detected here (UA no longer says "Mobile"
// even though the hardware is touch-capable, i.e. desktop mode was
// explicitly requested on a phone) and fixed by swapping the viewport
// meta tag for a fixed desktop-width one, before first paint. Real
// desktop/laptop browsers ignore the viewport meta entirely, so this is a
// no-op for them either way — only mobile desktop-site requests are
// affected. A genuine phone in its normal (non-desktop-site) mode keeps
// "Mobile"/"iPhone"/"iPod" in its UA and is left alone.
const desktopSiteFixScript = `(function(){try{var ua=navigator.userAgent||"";var looksMobile=/Mobi|iPhone|iPod/i.test(ua);var hasTouch=('ontouchstart' in window)||(navigator.maxTouchPoints>0);if(!looksMobile&&hasTouch){var m=document.querySelector('meta[name="viewport"]');if(m)m.setAttribute('content','width=1280');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: desktopSiteFixScript }} />
      </head>
      <body className="bg-page text-ink font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}