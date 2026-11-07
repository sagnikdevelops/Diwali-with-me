import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubh Deepavali — Diwali Greetings & Festive Sanctuary",
  description:
    "Light digital diyas, draw interactive rangolis, compose personalized royal Diwali greetings with AI, and launch virtual eco-friendly fireworks in a ₹0-budget festival celebration.",
  keywords: [
    "Diwali greeting",
    "Shubh Deepavali",
    "Digital Diya",
    "Rangoli Studio",
    "Diwali celebration",
    "Indian festival of lights",
  ],
  authors: [{ name: "Sagnik Dutta", url: "https://www.linkedin.com/in/sagnikduttahere/" }],
  creator: "Sagnik Dutta",
  publisher: "Sagnik Dutta",
  openGraph: {
    title: "Shubh Deepavali — Festival of Lights Sanctuary",
    description: "Light digital diyas, create personalized cards, and experience sacred Indian festivities.",
    type: "website",
    siteName: "Shubh Deepavali",
  },
  other: {
    "copyright": "Copyright (c) 2026 Sagnik Dutta. All rights reserved.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="antialiased font-sans bg-diwali-navy text-diwali-ivory selection:bg-diwali-gold selection:text-diwali-navy">
        {children}
      </body>
    </html>
  );
}

