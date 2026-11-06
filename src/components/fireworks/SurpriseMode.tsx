"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { X, Sparkles, Flame, Volume2 } from "lucide-react";
import { DiyaVisual } from "@/components/diya/DiyaVisual";
import { audioSynth } from "@/lib/audio-synth";

interface SurpriseModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SurpriseMode({ isOpen, onClose }: SurpriseModeProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Esc key to exit
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Initial Celebration Sound & Fireworks
    audioSynth.playDiyaChime();
    audioSynth.playFireworkBurst();

    // Trigger golden festive confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#FFE27B", "#D4AF37", "#FF8C00", "#D9383A", "#00D2D3"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Repeating interval for continuous magic
    const interval = setInterval(() => {
      audioSynth.playFireworkBurst();
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFE27B", "#FF8C00", "#D4AF37"],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFE27B", "#00D2D3", "#D9383A"],
      });
    }, 2200);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-diwali-navy/95 backdrop-blur-2xl animate-in fade-in duration-300 select-none overflow-hidden text-center text-diwali-ivory">
      {/* Close Action */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-diwali-surface/80 hover:bg-diwali-surfaceLight border border-diwali-gold/40 text-diwali-goldLight hover:text-white transition-all shadow-xl z-20 group"
        aria-label="Exit celebration"
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
      </button>

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-diwali-gold rounded-full blur-[1px] animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-diwali-amber rounded-full animate-bounce" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-diwali-goldBright rounded-full animate-pulse" />
      </div>

      {/* Center Celebration Showcase */}
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        {/* Trio of glowing diyas */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
          <div className="transform scale-90 sm:scale-100 animate-float-slow">
            <DiyaVisual styleName="peacock" isLit={true} size="md" />
          </div>
          <div className="transform scale-110 sm:scale-125 -translate-y-2">
            <DiyaVisual styleName="brass" isLit={true} size="lg" />
          </div>
          <div className="transform scale-90 sm:scale-100 animate-float-slow">
            <DiyaVisual styleName="rose" isLit={true} size="md" />
          </div>
        </div>

        {/* Auspicious Devanagari Banner */}
        <p className="text-sm sm:text-base font-serif tracking-[0.3em] text-diwali-gold uppercase mb-2">
          ॥ ॐ श्री महालक्ष्म्यै नमः ॥
        </p>

        {/* Big Radiant Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-diwali-goldLight via-diwali-gold to-diwali-amber drop-shadow-[0_0_35px_rgba(255,181,71,0.5)] mb-4">
          Shubh Deepavali!
        </h1>

        <p className="text-base sm:text-xl text-diwali-ivory font-light leading-relaxed max-w-xl mx-auto mb-8">
          May the divine brilliance of a billion diyas illuminate your home with good health, unshakeable serenity, boundless joy, and golden fortune.
        </p>

        {/* Exit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-sm shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            Return to Exploration (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}

