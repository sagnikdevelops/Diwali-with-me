"use client";

import React, { useState } from "react";
import { Gift, Sparkles, RotateCcw, Heart, Award } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

interface GiftSurprise {
  title: string;
  blessing: string;
  source: string;
  voucher: string;
}

const SURPRISES: GiftSurprise[] = [
  {
    title: "Divine Abundance & Inner Peace",
    blessing: "May the divine grace of Goddess Lakshmi bless your home with unshakeable contentment, radiant health, and boundless generosity.",
    source: "Ancient Vedic Blessing",
    voucher: "Golden Fortune Token: Claim 100% unconditional happiness today!",
  },
  {
    title: "Sacred Victory of Wisdom",
    blessing: "Tamaso Ma Jyotirgamaya — May the light of knowledge dissolve every doubt, anxiety, and shadow from your path.",
    source: "Brihadaranyaka Upanishad",
    voucher: "Illumination Voucher: Valid for 365 days of clarity & purpose.",
  },
  {
    title: "Sweet Festivity & Endless Laughs",
    blessing: "Life is sweeter when shared! May every box of sweets bring memories that melt gently in your heart for years to come.",
    source: "Festive Folk Wisdom",
    voucher: "Zero Guilt Sweet Pass: Enjoy your favorite mithai guilt-free today!",
  },
  {
    title: "The Lamp of Kindness",
    blessing: "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.",
    source: "Timeless Compassion",
    voucher: "Sparkle of Kindness: Pay one compliment forward today.",
  },
];

export function MysteryGift() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleOpenGift = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    audioSynth.playGiftReveal();

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 600);
  };

  const handleReplay = () => {
    setIsOpen(false);
    setCurrentIndex((prev) => (prev + 1) % SURPRISES.length);
  };

  const surprise = SURPRISES[currentIndex];

  return (
    <section id="mystery-gift" className="py-16 sm:py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-3">
          <Gift className="w-3.5 h-3.5 text-diwali-amber" />
          <span>Surprise Token</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-diwali-ivory mb-2">
          Mystery Diwali Gift Box
        </h2>
        <p className="text-xs sm:text-sm text-diwali-lavender">
          Tap the royal festive box to untie the golden ribbon and reveal your secret Diwali blessing.
        </p>
      </div>

      <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-diwali-surface via-diwali-midnight to-diwali-navy border border-diwali-gold/40 shadow-2xl flex flex-col items-center text-center overflow-hidden">
        {/* Background Sparkles */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-diwali-gold animate-ping" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-diwali-amber animate-pulse" />
        </div>

        {!isOpen ? (
          /* Closed Box State */
          <div className="flex flex-col items-center">
            <button
              onClick={handleOpenGift}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenGift();
                }
              }}
              tabIndex={0}
              className={`group relative p-8 cursor-pointer focus:outline-none transition-transform duration-300 ${
                isAnimating ? "scale-110 rotate-6" : "hover:scale-105"
              }`}
              aria-label="Open Diwali Gift Box"
            >
              {/* Box Glow */}
              <div className="absolute inset-0 bg-diwali-gold/20 rounded-full blur-2xl group-hover:bg-diwali-gold/40 transition-colors" />

              {/* Gift Box Graphic SVG */}
              <svg viewBox="0 0 140 140" className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-2xl">
                {/* Box Base */}
                <rect x="25" y="55" width="90" height="70" rx="8" fill="#54258C" stroke="#D4AF37" strokeWidth="2" />
                {/* Golden Ribbon Vertical */}
                <rect x="62" y="55" width="16" height="70" fill="#FFE27B" />
                {/* Box Lid */}
                <rect x="20" y="42" width="100" height="18" rx="5" fill="#6B2D5C" stroke="#FFE27B" strokeWidth="2" />
                {/* Golden Ribbon on Lid */}
                <rect x="62" y="42" width="16" height="18" fill="#FFE27B" />
                {/* Golden Ribbon Bow Top */}
                <path d="M70,42 C50,15 35,30 65,40" fill="#FFE27B" stroke="#D4AF37" strokeWidth="1.5" />
                <path d="M70,42 C90,15 105,30 75,40" fill="#FFE27B" stroke="#D4AF37" strokeWidth="1.5" />
                <circle cx="70" cy="42" r="5" fill="#D4AF37" />
              </svg>

              <span className="inline-block mt-4 text-xs font-semibold text-diwali-goldLight group-hover:text-white transition-colors bg-diwali-midnight/80 px-4 py-1.5 rounded-full border border-diwali-gold/40">
                {isAnimating ? "Untying Golden Ribbon..." : "Click or Press Space to Open"}
              </span>
            </button>
          </div>
        ) : (
          /* Opened Gift Box State */
          <div className="max-w-md w-full animate-in zoom-in-95 duration-400 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-diwali-gold/20 border border-diwali-gold/50 flex items-center justify-center text-diwali-gold mb-3 animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-diwali-goldLight">
              {surprise.source}
            </span>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-diwali-ivory mt-1 mb-3">
              {surprise.title}
            </h3>

            <div className="p-4 rounded-2xl bg-diwali-midnight/90 border border-diwali-gold/30 shadow-inner mb-4 text-left">
              <p className="text-xs sm:text-sm text-diwali-ivory font-light leading-relaxed italic">
                &ldquo;{surprise.blessing}&rdquo;
              </p>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-diwali-goldLight font-medium">
                <Award className="w-4 h-4 text-diwali-amber shrink-0" />
                <span>{surprise.voucher}</span>
              </div>
            </div>

            {/* Replay Button */}
            <button
              onClick={handleReplay}
              className="px-5 py-2.5 rounded-xl bg-diwali-gold hover:bg-diwali-goldLight text-diwali-navy font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-diwali-gold/30 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Open Another Surprise</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
