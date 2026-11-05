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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Brightened Mind Corporation", template: "%s | Brightened Mind" },
  alternates: { canonical: "./" },
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
    locale: "fr_FR",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a1f2b",
};

// Runs before paint (blocking, in <head>) so the page never flashes the
// wrong theme: reads the stored preference (a visitor who never chose follows
// the device's light/dark/automatic setting) and sets the `dark` class
// synchronously, before React hydrates.
const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark'||s==='system')?s:'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

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
// Structured data: tells Google who the company is (name, logo, phone, e-mail, town).
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": SITE_URL + "/#organization",
      name: "Brightened Mind Corporation",
      alternateName: "BM Corporation",
      url: SITE_URL,
      logo: SITE_URL + "/logo-bm.png",
      description: "Brightened Mind Corporation : BM Academia (formations en ligne), BM Communication et BM Domestica, à Lubumbashi, en République démocratique du Congo.",
      email: "info@bmcorporation-cd.com",
      telephone: "+243988830799",
      address: { "@type": "PostalAddress", addressLocality: "Lubumbashi", addressCountry: "CD" },
      areaServed: "CD",
      contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", telephone: "+243988830799", email: "info@bmcorporation-cd.com", availableLanguage: ["fr", "en", "sw"] }],
    },
    { "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL, name: "Brightened Mind Corporation", inLanguage: "fr", publisher: { "@id": SITE_URL + "/#organization" } },
  ],
});

// Android/Chrome fires its install event once, early; kept here so the install buttons can use it whenever they appear.
const installCaptureScript = `(function(){window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__bmInstall=e;window.dispatchEvent(new Event('bm-install-ready'));});})();`;
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
        <script dangerouslySetInnerHTML={{ __html: installCaptureScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      </head>
      <body className="bg-page text-ink font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}