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
  title: "Roux et Bachand — Quelle propriété peux-tu vraiment acheter ?",
  description:
    "Une analyse personnalisée, propulsée par l'intelligence artificielle, pour connaître ton pouvoir d'achat réel et ce qu'il te manque pour acheter en Estrie.",
  metadataBase: new URL("https://rouxetbachand.example"),
  openGraph: {
    title: "Quelle propriété peux-tu vraiment acheter ?",
    description:
      "Analyse d'achat personnalisée — Équipe Roux et Bachand, courtiers immobiliers en Estrie.",
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
        <Script
          src="https://clarity-scanner.vercel.app/tracker.js"
          data-project="achat-r-b"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
