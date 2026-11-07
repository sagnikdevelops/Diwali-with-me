"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CinematicWelcome } from "@/components/intro/CinematicWelcome";
import { SweetChoiceModal } from "@/components/intro/SweetChoiceModal";
import { DiwaliCountdown } from "@/components/countdown/DiwaliCountdown";
import { WallOfLight } from "@/components/diya/WallOfLight";
import { DiyaVisual } from "@/components/diya/DiyaVisual";
import { RangoliStudio } from "@/components/rangoli/RangoliStudio";
import { GreetingCreator } from "@/components/greeting/GreetingCreator";
import { PhotoGreeting } from "@/components/greeting/PhotoGreeting";
import { FireworksCanvas } from "@/components/fireworks/FireworksCanvas";
import { FireworkFacts } from "@/components/fireworks/FireworkFacts";
import { SurpriseMode } from "@/components/fireworks/SurpriseMode";
import { WishWall } from "@/components/lanterns/WishWall";
import { MysteryGift } from "@/components/surprise/MysteryGift";
import { FestiveQuiz } from "@/components/surprise/FestiveQuiz";
import { AudioBar } from "@/components/audio/AudioBar";
import {
  Sparkles,
  Flame,
  Menu,
  X,
  Gift,
  Camera,
  Heart,
  HelpCircle,
  ArrowRight,
  Zap,
} from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [showSweetModal, setShowSweetModal] = useState<boolean>(false);
  const [sweetChoice, setSweetChoice] = useState<string | null>(null);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already visited in this session
    try {
      const visited = sessionStorage.getItem("diwali_visited");
      const sweet = localStorage.getItem("diwali_sweet_choice");
      if (sweet) setSweetChoice(sweet);
      if (visited === "true") {
        setShowIntro(false);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleEnterIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem("diwali_visited", "true");
    if (!sweetChoice) {
      setShowSweetModal(true);
    }
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem("diwali_visited", "true");
  };

  const handleSweetSelected = (sweet: "kaju-katli" | "soan-papdi" | "surprise") => {
    setSweetChoice(sweet);
    setShowSweetModal(false);
    try {
      localStorage.setItem("diwali_sweet_choice", sweet);
    } catch {
      // Ignore
    }
  };

  const handleSkipSweet = () => {
    setShowSweetModal(false);
  };

  return (
    <div className="min-h-screen bg-diwali-navy text-diwali-ivory selection:bg-diwali-gold selection:text-diwali-navy relative overflow-hidden">
      {/* 1. Cinematic Welcome Overlay */}
      {showIntro && (
        <CinematicWelcome onEnter={handleEnterIntro} onSkip={handleSkipIntro} />
      )}

      {/* 2. Playful Sweet Choice Modal */}
      <SweetChoiceModal
        isOpen={showSweetModal}
        onChoiceSelected={handleSweetSelected}
        onSkip={handleSkipSweet}
      />

      {/* 3. Fullscreen Surprise Mode Celebration */}
      <SurpriseMode
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
      />

      {/* Floating Audio Controller */}
      <AudioBar />

      {/* 4. Sticky Header Navigation */}
      <header className="sticky top-0 z-40 bg-diwali-navy/85 backdrop-blur-md border-b border-diwali-gold/20 transition-all">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-diwali-goldLight hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-diwali-purple/50 border border-diwali-gold/40 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Flame className="w-4 h-4 text-diwali-amber fill-current" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-sm tracking-wider leading-none">
                Shubh Deepavali
              </span>
              <span className="text-[9px] text-diwali-lavender tracking-widest uppercase mt-0.5">
                Festival of Lights
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs text-diwali-lavender font-medium">
            <a href="#wall-of-light" className="hover:text-diwali-goldLight transition-colors">
              Wall of Light
            </a>
            <a href="#rangoli-studio" className="hover:text-diwali-goldLight transition-colors">
              Rangoli Studio
            </a>
            <a href="#greeting-creator" className="hover:text-diwali-goldLight transition-colors">
              Greeting Creator
            </a>
            <a href="#photo-greeting" className="hover:text-diwali-goldLight transition-colors">
              Photo Cards
            </a>
            <a href="#fireworks" className="hover:text-diwali-goldLight transition-colors">
              Fireworks
            </a>
            <a href="#sky-lanterns" className="hover:text-diwali-goldLight transition-colors">
              Sky Lanterns
            </a>
            <a href="#mystery-gift" className="hover:text-diwali-goldLight transition-colors">
              Gift Box
            </a>
            <a href="#festive-quiz" className="hover:text-diwali-goldLight transition-colors">
              Mithai Quiz
            </a>
          </nav>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioSynth.playGiftReveal();
                setIsSurpriseOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-diwali-purple to-diwali-gold text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
              <span>Surprise Mode</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-diwali-lavender hover:text-white rounded-lg hover:bg-diwali-surface"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-diwali-midnight border-b border-diwali-gold/30 p-4 space-y-3 text-sm">
            <a
              href="#wall-of-light"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-diwali-ivory hover:text-diwali-gold"
            >
              Wall of Light
            </a>
            <a
              href="#rangoli-studio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-diwali-ivory hover:text-diwali-gold"
            >
              Rangoli Studio
            </a>
            <a
              href="#greeting-creator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-diwali-ivory hover:text-diwali-gold"
            >
              Greeting Creator
            </a>
            <a
              href="#photo-greeting"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-diwali-ivory hover:text-diwali-gold"
            >
              Photo Cards
            </a>
            <a
              href="#fireworks"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-diwali-ivory hover:text-diwali-gold"
            >
              Interactive Fireworks
            </a>
            <a
              href="#sky-lanterns"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-diwali-ivory hover:text-diwali-gold"
            >
              Sky Lanterns & Wish Wall
            </a>
            <a
              href="#mystery-gift"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-diwali-ivory hover:text-diwali-gold"
            >
              Mystery Diwali Gift
            </a>
            <a
              href="#festive-quiz"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-diwali-ivory hover:text-diwali-gold"
            >
              Mithai Personality Quiz
            </a>
          </div>
        )}
      </header>

      {/* Sweet choice welcome pill if chosen */}
      {sweetChoice && (
        <div className="bg-diwali-purple/30 border-b border-diwali-gold/20 py-1.5 px-4 text-center text-xs text-diwali-goldLight flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
          <span>
            {sweetChoice === "kaju-katli"
              ? "Welcome, Royal Kaju Katli Connoisseur! Enjoy your festive journey."
              : sweetChoice === "soan-papdi"
              ? "Welcome, Legendary Soan Papdi Ambassador! Your festival is indestructible."
              : "Welcome, Sweet Festive Lover! May all sweets bring you pure joy."}
          </span>
        </div>
      )}

      {/* 5. Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 text-center max-w-5xl mx-auto">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-diwali-purple/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-diwali-purple/40 border border-diwali-gold/40 text-xs font-semibold text-diwali-goldLight mb-6 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-diwali-amber animate-pulse" />
            <span>The Festival of Lights 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-diwali-ivory mb-6 leading-tight drop-shadow-md">
            Light Up <span className="text-transparent bg-clip-text bg-gradient-to-r from-diwali-goldLight via-diwali-gold to-diwali-amber">Someone&apos;s World.</span>
          </h1>

          <p className="text-sm sm:text-lg text-diwali-lavender max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Immerse yourself in sacred Indian traditions. Light glowing diyas, craft intricate rangolis, create personalized royal greetings, and share timeless blessings with everyone you cherish.
          </p>

          {/* Primary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#greeting-creator"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(255,181,71,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create a Greeting</span>
            </a>

            <a
              href="#wall-of-light"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-diwali-gold/40 text-diwali-ivory font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-diwali-amber fill-current" />
              <span>Light a Diya</span>
            </a>

            <button
              onClick={() => {
                audioSynth.playGiftReveal();
                setIsSurpriseOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-diwali-purple/50 hover:bg-diwali-purple/70 border border-diwali-gold/30 text-diwali-goldLight font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-diwali-amber" />
              <span>Explore Celebration</span>
            </button>
          </div>

          {/* Diya Centerpiece */}
          <div className="flex justify-center my-6">
            <div className="p-4 rounded-3xl bg-diwali-midnight/40 border border-diwali-gold/20 backdrop-blur-sm shadow-2xl">
              <DiyaVisual styleName="brass" isLit={true} size="xl" />
            </div>
          </div>

          {/* Live Countdown Component */}
          <DiwaliCountdown />
        </div>
      </section>

      {/* 6. Wall of Light Section */}
      <WallOfLight />

      {/* 7. Rangoli Studio Section */}
      <RangoliStudio />

      {/* 8. Greeting Creator Section */}
      <GreetingCreator />

      {/* 9. Photo Greeting Studio Section */}
      <PhotoGreeting />

      {/* 10. Interactive Fireworks Section */}
      <section id="fireworks" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-3">
            <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
            <span>Eco-Friendly Sky Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-diwali-ivory mb-3">
            Interactive Celestial Fireworks
          </h2>
          <p className="text-sm sm:text-base text-diwali-lavender">
            Tap or click upon the night canvas to ignite bursts of golden sparks and crackling lights. Zero emissions, zero acoustic trauma for neighborhood pets.
          </p>
        </div>

        <FireworksCanvas />
        <FireworkFacts />
      </section>

      {/* 11. Sky Lanterns & Wish Wall Section */}
      <WishWall />

      {/* 12. Mystery Diwali Gift Box */}
      <MysteryGift />

      {/* 13. Festive Mithai Personality Quiz */}
      <FestiveQuiz />

      {/* 14. Grand Festive Footer */}
      <footer className="mt-20 border-t border-diwali-gold/30 bg-diwali-midnight/90 py-12 px-4 text-diwali-ivory">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-diwali-purple border border-diwali-gold/40 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-diwali-amber fill-current" />
              </div>
              <span className="font-serif font-bold text-base tracking-wider text-diwali-goldLight">
                Shubh Deepavali 2026
              </span>
            </div>
            <p className="text-xs text-diwali-lavender leading-relaxed max-w-sm">
              An immersive Indian festival sanctuary blending sacred traditions, royal design, and modern interactive web technology. Built strictly under ₹0 budget compliance.
            </p>
            <p className="text-[11px] text-diwali-gold/80 italic font-serif">
              ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ।
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-diwali-goldLight uppercase tracking-wider mb-3">
              Festive Features
            </h4>
            <ul className="space-y-2 text-xs text-diwali-lavender">
              <li><a href="#wall-of-light" className="hover:text-white transition-colors">Wall of Light</a></li>
              <li><a href="#rangoli-studio" className="hover:text-white transition-colors">Rangoli Studio</a></li>
              <li><a href="#greeting-creator" className="hover:text-white transition-colors">Greeting Creator</a></li>
              <li><a href="#photo-greeting" className="hover:text-white transition-colors">Photo Frame Studio</a></li>
              <li><a href="#fireworks" className="hover:text-white transition-colors">Safe Fireworks</a></li>
              <li><a href="#sky-lanterns" className="hover:text-white transition-colors">Sky Lanterns & Wish Wall</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-diwali-goldLight uppercase tracking-wider mb-3">
              Zero-Budget Architecture
            </h4>
            <p className="text-xs text-diwali-lavender leading-relaxed mb-2">
              Runs 100% on open-source web technologies, native Web Audio API oscillators, client-side vector graphics, and URL-state codecs with ₹0 total hosting expenditure.
            </p>
            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold">
              Verified ₹0 Cloud Budget
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-diwali-lavender/70 gap-2">
          <span>&copy; 2026 Shubh Deepavali Celebration. All festive traditions honoured with reverence.</span>
          <span>Designed with devotion for the Website Building Competition.</span>
        </div>
      </footer>
    </div>
  );
}
