"use client";

import React from "react";
import { FESTIVE_FACTS } from "@/config/festive";
import { Sparkles, Leaf, Heart, Flower } from "lucide-react";

export function FireworkFacts() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-diwali-amber" />;
      case "leaf":
        return <Leaf className="w-5 h-5 text-emerald-400" />;
      case "heart":
        return <Heart className="w-5 h-5 text-diwali-crimson fill-current" />;
      case "flower":
        return <Flower className="w-5 h-5 text-diwali-goldLight" />;
      default:
        return <Sparkles className="w-5 h-5 text-diwali-gold" />;
    }
  };

  return (
    <div className="mt-12 pt-12 border-t border-diwali-gold/20">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-diwali-ivory mb-2">
          Mindful Festive Wisdom & Pet Safety
        </h3>
        <p className="text-xs sm:text-sm text-diwali-lavender">
          Celebrating the victory of light with compassion for our environment, elders, and four-legged companions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FESTIVE_FACTS.map((fact, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-diwali-midnight/80 border border-diwali-gold/20 hover:border-diwali-gold/40 transition-colors flex items-start gap-4"
          >
            <div className="p-2.5 rounded-xl bg-diwali-surface border border-white/10 shrink-0">
              {getIcon(fact.icon)}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-diwali-goldLight">
                {fact.subtitle}
              </span>
              <h4 className="text-sm font-serif font-bold text-diwali-ivory mt-0.5 mb-1.5">
                {fact.title}
              </h4>
              <p className="text-xs text-diwali-lavender leading-relaxed font-light">
                {fact.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

