"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Flame } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

interface CinematicWelcomeProps {
  onEnter: () => void;
  onSkip: () => void;
}

export function CinematicWelcome({ onEnter, onSkip }: CinematicWelcomeProps) {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Stage 1: Reveal stars and mandala
    const t1 = setTimeout(() => setStage(1), 500);
    // Stage 2: Light the center Diya
    const t2 = setTimeout(() => {
      setStage(2);
      audioSynth.playDiyaChime();
    }, 1800);
    // Stage 3: Reveal headline & Enter button
    const t3 = setTimeout(() => setStage(3), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-diwali-navy text-diwali-ivory overflow-hidden select-none">
      {/* Background radial cosmic glow */}
      <div
        className={`absolute inset-0 bg-radial-at-c from-diwali-purple/30 via-diwali-navy to-diwali-navy transition-opacity duration-1000 ${
          stage >= 1 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-diwali-gold animate-ping opacity-75" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-diwali-amber animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-diwali-goldLight animate-bounce opacity-60" />
        <div className="absolute top-2/3 right-1/5 w-2 h-2 rounded-full bg-diwali-gold animate-ping opacity-50" />
      </div>

      {/* Center Sacred Mandala / Rangoli Reveal SVG */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          className={`relative w-64 h-64 sm:w-80 sm:h-80 transition-all duration-1000 ${
            stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          {/* Rotating Mandala rings */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full animate-spin-slow opacity-80"
          >
            {/* Outer Petals */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#FFB547" strokeWidth="1.5" opacity="0.6" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#D4AF37" strokeWidth="1" />
            {/* 8-Petal Geometry */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <path
                  d="M100 25 C110 50, 110 70, 100 80 C90 70, 90 50, 100 25"
                  fill="rgba(212, 175, 55, 0.12)"
                  stroke="#FFE27B"
                  strokeWidth="1.2"
                />
                <circle cx="100" cy="22" r="3" fill="#FFB547" />
              </g>
            ))}
          </svg>

          {/* Center Glowing Diya */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
              stage >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <div className="relative">
              {/* Flame Glow Backdrop */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-diwali-amber/40 rounded-full blur-xl animate-pulse" />

              {/* Flame Visual */}
              <div className="relative -top-3 flex justify-center animate-flame-flicker">
                <div className="w-6 h-12 bg-gradient-to-t from-diwali-marigold via-diwali-amber to-diwali-goldLight rounded-full shadow-[0_0_25px_#FFB547]" />
                <div className="absolute bottom-1 w-2.5 h-6 bg-white/90 rounded-full blur-[1px]" />
              </div>

              {/* Clay Diya Body */}
              <svg viewBox="0 0 100 50" className="w-24 h-12 drop-shadow-2xl">
                <path
                  d="M10 20 Q50 48 90 20 Q50 30 10 20"
                  fill="#A84218"
                  stroke="#FFE27B"
                  strokeWidth="1.5"
                />
                <path
                  d="M15 22 Q50 32 85 22"
                  fill="#782E0E"
                />
                {/* Golden rim ornamentation */}
                <circle cx="30" cy="24" r="1.5" fill="#FFE27B" />
                <circle cx="50" cy="27" r="2" fill="#FFE27B" />
                <circle cx="70" cy="24" r="1.5" fill="#FFE27B" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Sequence */}
        <div
          className={`text-center mt-6 transition-all duration-700 px-4 ${
            stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xs sm:text-sm font-medium tracking-widest text-diwali-gold uppercase mb-2">
            The Festival of Lights
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-diwali-ivory mb-3 drop-shadow-md">
            Shubh Deepavali
          </h1>
          <p className="text-sm sm:text-base text-diwali-lavender max-w-md mx-auto mb-8 font-light">
            Step into a royal sanctuary of sacred light, golden greetings, and heartfelt celebrations.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                audioSynth.playDiyaChime();
                onEnter();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-semibold text-base shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(255,181,71,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Flame className="w-5 h-5 text-diwali-crimson fill-current group-hover:scale-110 transition-transform" />
              <span>Enter the Celebration</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onSkip}
              className="text-xs text-diwali-lavender hover:text-diwali-ivory py-2 px-4 transition-colors"
            >
              Skip sequence
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Skip button in corner for accessibility */}
      <button
        onClick={onSkip}
        className="absolute top-6 right-6 text-xs text-diwali-lavender/70 hover:text-diwali-ivory px-3 py-1.5 rounded-full border border-white/10 hover:border-diwali-gold/30 transition-colors z-20"
      >
        Skip intro
      </button>
    </div>
  );
}

