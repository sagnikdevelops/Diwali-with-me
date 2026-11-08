"use client";

import React, { useState, useEffect } from "react";
import { CinematicWelcome } from "@/components/intro/CinematicWelcome";
import { SweetChoiceModal } from "@/components/intro/SweetChoiceModal";
import { DiwaliCountdown } from "@/components/countdown/DiwaliCountdown";
import { WallOfLight } from "@/components/diya/WallOfLight";
import { DiyaVisual } from "@/components/diya/DiyaVisual";
import { RangoliStudio } from "@/components/rangoli/RangoliStudio";
import { GreetingCreator } from "@/components/greeting/GreetingCreator";
import { PhotoGreeting } from "@/components/greeting/PhotoGreeting";
import { MithaiBoxStudio } from "@/components/mithai/MithaiBoxStudio";
import { FireworksCanvas } from "@/components/fireworks/FireworksCanvas";
import { FireworkFacts } from "@/components/fireworks/FireworkFacts";
import { SurpriseMode } from "@/components/fireworks/SurpriseMode";
import { WishWall } from "@/components/lanterns/WishWall";
import { MysteryGift } from "@/components/surprise/MysteryGift";
import { FestiveQuiz } from "@/components/surprise/FestiveQuiz";
import { FestiveHeader } from "@/components/header/FestiveHeader";
import { FestiveFooter } from "@/components/footer/FestiveFooter";
import { AudioBar } from "@/components/audio/AudioBar";
import { Sparkles, Flame, Zap } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [showSweetModal, setShowSweetModal] = useState<boolean>(false);
  const [sweetChoice, setSweetChoice] = useState<string | null>(null);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState<boolean>(false);

  useEffect(() => {
    // Explicitly do not store sweet preference; ask it on every visit.
    // Clean up any previously cached sweet preference from localStorage.
    try {
      localStorage.removeItem("diwali_sweet_choice");
      sessionStorage.removeItem("diwali_sweet_choice");
      const visited = sessionStorage.getItem("diwali_visited");
      if (visited === "true") {
        setShowIntro(false);
        setShowSweetModal(true);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleEnterIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem("diwali_visited", "true");
    setShowSweetModal(true);
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem("diwali_visited", "true");
    setShowSweetModal(true);
  };

  const handleSweetSelected = (sweet: "kaju-katli" | "soan-papdi" | "surprise") => {
    setSweetChoice(sweet);
    setShowSweetModal(false);
    // Kept strictly in component memory for this visit; never persisted to localStorage
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

      {/* 4. Interactive Festive Header Navigation */}
      <FestiveHeader
        onOpenSurprise={() => {
          audioSynth.playGiftReveal();
          setIsSurpriseOpen(true);
        }}
        onOpenSweetModal={() => setShowSweetModal(true)}
        sweetChoice={sweetChoice}
      />

      {/* Sweet choice welcome pill if chosen */}
      {sweetChoice && (
        <div className="bg-diwali-purple/30 border-b border-diwali-gold/20 py-1.5 px-4 text-center text-xs text-diwali-goldLight flex flex-wrap items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
          <span>
            {sweetChoice === "kaju-katli"
              ? "Welcome, Royal Kaju Katli Connoisseur! Enjoy your festive journey."
              : sweetChoice === "soan-papdi"
              ? "Welcome, Legendary Soan Papdi Ambassador! Your festival is indestructible."
              : "Welcome, Sweet Festive Lover! May all sweets bring you pure joy."}
          </span>
          <button
            onClick={() => setShowSweetModal(true)}
            className="text-[11px] underline text-diwali-ivory/80 hover:text-white transition-colors cursor-pointer ml-1"
          >
            (Change Sweet)
          </button>
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

      {/* 10. Royal Diwali Mithai Box Studio Section */}
      <MithaiBoxStudio />

      {/* 11. Interactive Fireworks Section */}
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
      <FestiveFooter />
    </div>
  );
}

