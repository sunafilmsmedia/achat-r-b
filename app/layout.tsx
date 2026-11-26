import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import Clarity from "@/components/Clarity";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Roux et Bachand — Quelle maison peux-tu vraiment te permettre ?",
  description:
    "Un guide gratuit personnalisé, propulsé par l'intelligence artificielle, pour connaître ton pouvoir d'achat réel et ce qu'il te manque pour acheter en Estrie.",
  metadataBase: new URL("https://rouxetbachand.example"),
  openGraph: {
    title: "Quelle maison peux-tu vraiment te permettre ?",
    description:
      "Guide d'achat gratuit personnalisé — Équipe Roux et Bachand, courtiers immobiliers en Estrie.",
    locale: "fr_CA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen antialiased">
        <MetaPixel />
        <Clarity />
        {children}
        <footer style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', opacity: 0.5 }}>
          <a href="https://sunafilmsmedia.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Conçu par Suna Films Media
          </a>
        </footer>
        <Script
          src="https://clarity-scanner.vercel.app/tracker.js"
          data-project="achat-r-b"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
