"use client";

import React, { useState, useEffect } from "react";
import { SkyLanterns, SkyLanternData } from "./SkyLanterns";
import { Sparkles, Heart } from "lucide-react";

const INITIAL_WISHES: SkyLanternData[] = [
  {
    id: "wish-1",
    name: "Kavita R.",
    wish: "Wishing that every child finds warmth, education, and boundless laughter this year.",
    color: "amber",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 3,
  },
  {
    id: "wish-2",
    name: "Rishi & Friends",
    wish: "May our streets remain kind to strays and clean for the morning birds. Shubh Deepavali!",
    color: "emerald",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 6,
  },
  {
    id: "wish-3",
    name: "Ananya S.",
    wish: "To my dadi in Lucknow: miss your handmade gujiyas! Sending infinite love across the skies.",
    color: "rose",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 10,
  },
  {
    id: "wish-4",
    name: "The Gokhales",
    wish: "Health, courage, and renewed energy for all doctors, nurses, and frontline caretakers.",
    color: "saffron",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 16,
  },
];

export function WishWall() {
  const [wishes, setWishes] = useState<SkyLanternData[]>(INITIAL_WISHES);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("diwali_my_lanterns");
      if (stored) {
        const parsed: SkyLanternData[] = JSON.parse(stored);
        if (parsed.length > 0) {
          setWishes((prev) => {
            const ids = new Set(prev.map((w) => w.id));
            const newOnes = parsed.filter((w) => !ids.has(w.id));
            return [...newOnes, ...prev];
          });
        }
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleLanternReleased = (lantern: SkyLanternData) => {
    setWishes((prev) => [lantern, ...prev]);
    try {
      const stored = localStorage.getItem("diwali_my_lanterns");
      const list: SkyLanternData[] = stored ? JSON.parse(stored) : [];
      list.unshift(lantern);
      localStorage.setItem("diwali_my_lanterns", JSON.stringify(list));
    } catch {
      // Ignore
    }
  };

  const getLanternAccent = (color: SkyLanternData["color"]) => {
    switch (color) {
      case "amber":
        return "border-[#FFB547]/40 bg-[#FFB547]/10 text-[#FFE27B]";
      case "saffron":
        return "border-[#FF8C00]/40 bg-[#FF8C00]/10 text-[#FF8C00]";
      case "rose":
        return "border-[#E57593]/40 bg-[#E57593]/10 text-[#FFD1DC]";
      case "emerald":
        return "border-[#2EC4B6]/40 bg-[#2EC4B6]/10 text-[#2EC4B6]";
      default:
        return "border-[#FFB547]/40 bg-[#FFB547]/10 text-[#FFE27B]";
    }
  };

  return (
    <section id="sky-lanterns" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
      {/* Sky Lantern Release Canvas */}
      <SkyLanterns onLanternReleased={handleLanternReleased} />

      {/* Community Wish Wall Grid */}
      <div className="mt-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-2">
            <Heart className="w-3.5 h-3.5 text-diwali-crimson fill-current" />
            <span>Community Wish Constellation</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-diwali-ivory">
            The Wish Wall
          </h3>
          <p className="text-xs sm:text-sm text-diwali-lavender mt-1">
            Read inspiring festive intentions floating under the same starlit sky.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-diwali-midnight/80 border border-diwali-gold/20 hover:border-diwali-gold/50 shadow-lg flex flex-col justify-between transition-all"
            >
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border mb-3 ${getLanternAccent(
                    item.color
                  )}`}
                >
                  {item.color.toUpperCase()} LANTERN
                </span>
                <p className="text-xs text-diwali-ivory leading-relaxed font-light italic">
                  &ldquo;{item.wish}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="font-bold text-diwali-goldLight truncate max-w-[120px]">
                  {item.name}
                </span>
                <span className="text-diwali-lavender/60">Floating High</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
