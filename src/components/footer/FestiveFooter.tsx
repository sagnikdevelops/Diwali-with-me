"use client";

import React from "react";
import { Flame, ArrowUp, Sparkles } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

export function FestiveFooter() {
  const scrollToTop = () => {
    audioSynth.playDiyaChime();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 pt-16 pb-12 px-4 bg-gradient-to-b from-transparent via-diwali-midnight/60 to-diwali-navy text-diwali-ivory overflow-hidden select-none">
      {/* Decorative Golden Divider with Center Diya */}
      <div className="relative max-w-4xl mx-auto flex items-center justify-center my-6">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-diwali-gold/40 to-diwali-gold/80" />
        
        {/* Centerpiece Diya Emblem */}
        <button
          onClick={scrollToTop}
          className="mx-4 p-2.5 rounded-full bg-diwali-surface border border-diwali-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(255,181,71,0.6)] hover:scale-110 active:scale-95 transition-all group"
          title="Scroll back to top with festive chime"
          aria-label="Scroll back to top"
        >
          <Flame className="w-5 h-5 text-diwali-amber fill-current group-hover:scale-110 transition-transform animate-flame-flicker" />
        </button>

        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-diwali-gold/40 to-diwali-gold/80" />
      </div>

      {/* Sacred Shloka */}
      <div className="text-center max-w-xl mx-auto px-4 mb-6">
        <p className="text-xs sm:text-sm font-serif text-diwali-gold tracking-widest leading-relaxed">
          ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ।
        </p>
        <p className="text-[11px] text-diwali-lavender/80 italic font-serif mt-1">
          Lead us from the unreal to the real, from darkness unto light, from mortality to immortality.
        </p>
      </div>

      {/* Main Signature & Copyright Statement */}
      <div className="text-center max-w-lg mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-diwali-surface/80 border border-diwali-gold/30 shadow-sm text-xs text-diwali-ivory">
          <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
          <span>Shubh Deepavali 2026</span>
          <span className="text-diwali-gold">•</span>
          <span className="text-diwali-goldLight font-medium">Festival of Lights</span>
        </div>

        <p className="text-sm sm:text-base font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-diwali-ivory via-diwali-goldLight to-diwali-amber pt-2">
          Crafted with devotion & festive light
        </p>

        {/* Copyright Signature */}
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-diwali-goldLight font-semibold">
          <span>&copy; {new Date().getFullYear()}</span>
          <a
            href="https://www.linkedin.com/in/sagnikduttahere/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-diwali-ivory hover:text-diwali-gold transition-colors font-bold tracking-wide underline-offset-2 hover:underline"
          >
            Sagnik Dutta
          </a>
          <span className="text-diwali-lavender font-normal">• All Rights Reserved</span>
        </div>

        <p className="text-[11px] text-diwali-lavender/70 font-light pt-1">
          May the divine radiance of a million diyas illuminate your home and heart forever.
        </p>
      </div>

      {/* Quick Interactive Scroll-To-Top Link */}
      <div className="mt-8 text-center">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-xs text-diwali-lavender hover:text-diwali-goldLight transition-colors px-3 py-1 rounded-full hover:bg-diwali-surface/60 border border-transparent hover:border-diwali-gold/20"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
}

