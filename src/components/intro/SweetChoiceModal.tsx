"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Gift, ArrowRight } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

interface SweetChoiceModalProps {
  isOpen: boolean;
  onChoiceSelected: (sweet: "kaju-katli" | "soan-papdi" | "surprise") => void;
  onSkip: () => void;
}

export function SweetChoiceModal({ isOpen, onChoiceSelected, onSkip }: SweetChoiceModalProps) {
  const [selectedSweet, setSelectedSweet] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelect = (sweet: "kaju-katli" | "soan-papdi" | "surprise") => {
    setSelectedSweet(sweet);
    audioSynth.playGiftReveal();
    setTimeout(() => {
      onChoiceSelected(sweet);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-diwali-navy/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative max-w-lg w-full bg-gradient-to-b from-diwali-surface to-diwali-navy border border-diwali-gold/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden">
        {/* Decorative corner borders */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-diwali-gold/50 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-diwali-gold/50 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-diwali-gold/50 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-diwali-gold/50 rounded-br-lg" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-purple/40 border border-diwali-gold/30 text-diwali-goldLight text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
          <span>A Royal Festive Debate</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-diwali-ivory mb-2">
          A Diwali Classic
        </h2>
        <p className="text-sm text-diwali-lavender mb-6 max-w-sm mx-auto">
          Before stepping into the royal festival, let our celebration know your heart’s true Diwali sweet:
        </p>

        {/* Sweet Choices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Kaju Katli Card */}
          <button
            onClick={() => handleSelect("kaju-katli")}
            className={`group relative p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col items-center sm:items-start ${
              selectedSweet === "kaju-katli"
                ? "bg-diwali-gold/25 border-diwali-gold shadow-lg shadow-diwali-gold/20 scale-105"
                : "bg-diwali-midnight/80 hover:bg-diwali-surfaceLight border-diwali-gold/20 hover:border-diwali-gold/60"
            }`}
          >
            {/* Visual SVG Diamond for Kaju Katli */}
            <div className="w-20 h-20 mb-3 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md transition-transform group-hover:scale-110 duration-300">
                {/* Silver foil diamond */}
                <polygon points="50,10 90,50 50,90 10,50" fill="#E8EDF2" stroke="#B8C4CE" strokeWidth="2" />
                <polygon points="50,20 80,50 50,80 20,50" fill="#F4F7F9" opacity="0.8" />
                {/* Silver Leaf / Varak sparkle accents */}
                <path d="M40 35 L55 35 L45 55 Z" fill="#FFFFFF" opacity="0.7" />
                <circle cx="50" cy="50" r="3" fill="#D4AF37" opacity="0.6" />
                <circle cx="65" cy="45" r="2" fill="#D4AF37" opacity="0.6" />
              </svg>
            </div>
            <div className="text-center sm:text-left w-full">
              <h3 className="font-serif font-bold text-lg text-diwali-ivory group-hover:text-diwali-goldLight transition-colors">
                Kaju Katli
              </h3>
              <p className="text-xs text-diwali-lavender mt-1">
                The royal cashew diamond. Shimmering silver leaf, melts in seconds.
              </p>
            </div>
            {selectedSweet === "kaju-katli" && (
              <span className="mt-3 text-xs text-diwali-goldBright font-medium animate-pulse flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-current" /> A Royal Connoisseur!
              </span>
            )}
          </button>

          {/* Soan Papdi Card */}
          <button
            onClick={() => handleSelect("soan-papdi")}
            className={`group relative p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col items-center sm:items-start ${
              selectedSweet === "soan-papdi"
                ? "bg-diwali-amber/25 border-diwali-amber shadow-lg shadow-diwali-amber/20 scale-105"
                : "bg-diwali-midnight/80 hover:bg-diwali-surfaceLight border-diwali-gold/20 hover:border-diwali-gold/60"
            }`}
          >
            {/* Visual SVG Cube for Soan Papdi */}
            <div className="w-20 h-20 mb-3 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md transition-transform group-hover:scale-110 duration-300">
                {/* Flaky golden square */}
                <rect x="20" y="20" width="60" height="60" rx="8" fill="#FCE59F" stroke="#E5B84B" strokeWidth="2" />
                {/* Flaky fiber striations */}
                <path d="M25 35 Q50 32 75 35" stroke="#E5B84B" strokeWidth="1.5" strokeDasharray="3,3" />
                <path d="M25 50 Q50 48 75 50" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4,2" />
                <path d="M25 65 Q50 62 75 65" stroke="#E5B84B" strokeWidth="1.5" strokeDasharray="3,3" />
                {/* Pistachio & almond garnishes */}
                <ellipse cx="45" cy="40" rx="4" ry="2" fill="#588157" transform="rotate(-20 45 40)" />
                <ellipse cx="60" cy="55" rx="5" ry="2.5" fill="#BC6C25" transform="rotate(30 60 55)" />
                <ellipse cx="38" cy="60" rx="3.5" ry="2" fill="#588157" transform="rotate(15 38 60)" />
              </svg>
            </div>
            <div className="text-center sm:text-left w-full">
              <h3 className="font-serif font-bold text-lg text-diwali-ivory group-hover:text-diwali-amber transition-colors">
                Soan Papdi
              </h3>
              <p className="text-xs text-diwali-lavender mt-1">
                The indestructible festive ambassador! Flaky, cardamom-scented bliss.
              </p>
            </div>
            {selectedSweet === "soan-papdi" && (
              <span className="mt-3 text-xs text-diwali-amber font-medium animate-pulse flex items-center gap-1">
                <Gift className="w-3.5 h-3.5" /> The Legendary Ambassador!
              </span>
            )}
          </button>
        </div>

        {/* Secondary Choices: Surprise Me & Skip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-diwali-gold/15">
          <button
            onClick={() => handleSelect("surprise")}
            className="text-xs text-diwali-goldLight hover:text-white flex items-center gap-1.5 transition-colors py-2 px-3 rounded-lg hover:bg-diwali-surface"
          >
            <Sparkles className="w-3.5 h-3.5 text-diwali-gold" />
            <span>Surprise me with both!</span>
          </button>

          <button
            onClick={onSkip}
            className="text-xs text-diwali-lavender hover:text-diwali-ivory flex items-center gap-1 transition-colors py-2 px-3 rounded-lg hover:bg-diwali-surface"
          >
            <span>Skip to celebration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
