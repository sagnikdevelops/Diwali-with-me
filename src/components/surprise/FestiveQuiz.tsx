"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, RotateCcw, Share2, Award } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

interface Question {
  question: string;
  options: { text: string; sweet: "kaju" | "jamun" | "laddu" | "jalebi" }[];
}

const QUESTIONS: Question[] = [
  {
    question: "1. What is your quintessential Diwali evening vibe?",
    options: [
      { text: "Elegantly dressed, sipping chai, enjoying calm aesthetic decor", sweet: "kaju" },
      { text: "Hugging family, sharing nostalgic childhood stories by the diyas", sweet: "jamun" },
      { text: "Organising the puja, distributing sweets, and managing the music playlist", sweet: "laddu" },
      { text: "Bursting virtual fireworks, dancing with cousins, laughing out loud", sweet: "jalebi" },
    ],
  },
  {
    question: "2. Your friend hands you a mysterious festive gift box. What do you do?",
    options: [
      { text: "Carefully admire the packaging craftsmanship before gently opening", sweet: "kaju" },
      { text: "Warmly express gratitude and share whatever is inside with everyone", sweet: "jamun" },
      { text: "Check if all cousins received their share fairly first", sweet: "laddu" },
      { text: "Rip the ribbon open with excitement and celebrate the surprise!", sweet: "jalebi" },
    ],
  },
  {
    question: "3. If you were a festive light, what would you be?",
    options: [
      { text: "A pristine brass diya burning with steady golden grace", sweet: "kaju" },
      { text: "A warm clay terracotta diya softly comforting a doorstep", sweet: "jamun" },
      { text: "A grand chandelier illuminating the entire family hall", sweet: "laddu" },
      { text: "A sparkling rocket tracing dazzling spirals in the night sky", sweet: "jalebi" },
    ],
  },
];

const PROFILES = {
  kaju: {
    title: "Kaju Katli: The Royal Luminary",
    badge: "Royalty & Class",
    description: "You embody effortless elegance, sophistication, and refined taste. When you enter a room, your serene presence immediately elevates the entire festive aura.",
    color: "#D4AF37",
  },
  jamun: {
    title: "Gulab Jamun: The Warm Soul",
    badge: "Comfort & Sweetness",
    description: "You are the emotional heartbeat of the family. Warm, deeply loving, and generous, your warmth melts away every sorrow just like a hot syrup-soaked jamun.",
    color: "#D9383A",
  },
  laddu: {
    title: "Motichoor Laddu: The Festive Pillar",
    badge: "Unity & Auspiciousness",
    description: "You bring people together! Auspicious, reliable, and vibrant, no puja or milestone celebration feels truly complete without your cheerful leadership.",
    color: "#FF8C00",
  },
  jalebi: {
    title: "Jalebi: The Spirited Spark",
    badge: "Zest & Spontaneity",
    description: "You are adventurous, spontaneous, delightfully unpredictable, and full of lively zest. You bring pure laughter, surprises, and unstoppable energy to the party!",
    color: "#FFB547",
  },
};

export function FestiveQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({ kaju: 0, jamun: 0, laddu: 0, jalebi: 0 });
  const [result, setResult] = useState<keyof typeof PROFILES | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectOption = (sweet: "kaju" | "jamun" | "laddu" | "jalebi") => {
    audioSynth.playSubtleClick();
    const newScores = { ...scores, [sweet]: scores[sweet] + 1 };
    setScores(newScores);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate top scoring personality
      audioSynth.playGiftReveal();
      let topSweet: keyof typeof PROFILES = "kaju";
      let maxScore = -1;
      (Object.keys(newScores) as (keyof typeof PROFILES)[]).forEach((key) => {
        if (newScores[key] > maxScore) {
          maxScore = newScores[key];
          topSweet = key;
        }
      });
      setResult(topSweet);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setScores({ kaju: 0, jamun: 0, laddu: 0, jalebi: 0 });
    setResult(null);
  };

  const handleShare = () => {
    if (!result) return;
    const profile = PROFILES[result];
    const text = `I took the Diwali Mithai Personality Quiz and got: ${profile.title}! ✨ Find out your festive sweet: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ title: "My Diwali Mithai Personality", text, url: window.location.origin }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="festive-quiz" className="py-16 sm:py-20 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-3">
          <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
          <span>Festive Psychology</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-diwali-ivory mb-2">
          Which Diwali Mithai Are You?
        </h2>
        <p className="text-xs sm:text-sm text-diwali-lavender">
          Take our quick 3-question festive quiz to discover your Indian festive confectionery personality.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-diwali-surface via-diwali-midnight to-diwali-navy border border-diwali-gold/30 shadow-2xl text-diwali-ivory">
        {!result ? (
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-diwali-lavender mb-4">
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              <span className="text-diwali-goldLight font-bold">
                {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-diwali-midnight h-1.5 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-diwali-gold h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-serif font-bold text-diwali-ivory mb-6">
              {QUESTIONS[currentStep].question}
            </h3>

            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.sweet)}
                  className="w-full p-4 rounded-2xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-white/10 hover:border-diwali-gold/50 text-left text-xs sm:text-sm text-diwali-ivory transition-all flex items-center justify-between group"
                >
                  <span>{opt.text}</span>
                  <CheckCircle2 className="w-4 h-4 text-diwali-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="text-center py-4 animate-in zoom-in-95 duration-400">
            <div className="inline-block px-4 py-1.5 rounded-full border border-diwali-gold/40 bg-diwali-gold/20 text-xs font-bold text-diwali-goldLight mb-3">
              {PROFILES[result].badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-diwali-ivory mb-3">
              {PROFILES[result].title}
            </h3>

            <p className="text-xs sm:text-sm text-diwali-lavender max-w-md mx-auto leading-relaxed mb-6 font-light">
              {PROFILES[result].description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-diwali-gold text-diwali-navy font-bold text-xs hover:bg-diwali-goldLight transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? "Result Copied!" : "Share My Result"}</span>
              </button>

              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-white/10 text-xs text-diwali-lavender hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
