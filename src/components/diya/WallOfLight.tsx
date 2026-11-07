"use client";

import React, { useState, useEffect } from "react";
import { DiyaVisual, DiyaColorStyle } from "./DiyaVisual";
import { DiyaLightModal, LitDiyaData } from "./DiyaLightModal";
import { Flame, Sparkles, Plus, Trash2 } from "lucide-react";

const INITIAL_COMMUNITY_DIYAS: LitDiyaData[] = [
  {
    id: "init-1",
    name: "Aaradhya & Family",
    message: "May the divine blessings of Maa Lakshmi bring eternal peace and abundance to every home.",
    style: "brass",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: "init-2",
    name: "Rohan & Devika",
    message: "Lighting this diya for harmony, clean air, and happiness across our beautiful nation.",
    style: "terracotta",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: "init-3",
    name: "Dr. K. S. Mukherjee",
    message: "Wishing health, recovery, and boundless positivity to everyone walking through tough times.",
    style: "peacock",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 8,
  },
  {
    id: "init-4",
    name: "Sneha & Kids",
    message: "Happy Diwali to our grandparents and friends everywhere! Lots of love and sweets!",
    style: "rose",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 12,
  },
  {
    id: "init-5",
    name: "Karan Verma",
    message: "From darkness unto light — Tamaso Ma Jyotirgamaya.",
    style: "amethyst",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 18,
  },
  {
    id: "init-6",
    name: "Meera Patel",
    message: "Sending golden warmth, good fortune, and lots of smiles this festive season!",
    style: "brass",
    isPublic: true,
    createdAt: Date.now() - 3600000 * 24,
  },
];

export function WallOfLight() {
  const [diyas, setDiyas] = useState<LitDiyaData[]>(INITIAL_COMMUNITY_DIYAS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [myDiyaId, setMyDiyaId] = useState<string | null>(null);

  // Load locally saved diyas on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("diwali_my_diyas");
      if (stored) {
        const parsed: LitDiyaData[] = JSON.parse(stored);
        if (parsed.length > 0) {
          setMyDiyaId(parsed[0].id);
          // Merge user diyas with community diyas ensuring no duplicates
          setDiyas((prev) => {
            const ids = new Set(prev.map((d) => d.id));
            const newOnes = parsed.filter((d) => !ids.has(d.id));
            return [...newOnes, ...prev];
          });
        }
      }
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  const handleDiyaLit = (newDiya: LitDiyaData) => {
    setMyDiyaId(newDiya.id);
    setDiyas((prev) => [newDiya, ...prev]);

    // Save to local storage
    try {
      const stored = localStorage.getItem("diwali_my_diyas");
      const list: LitDiyaData[] = stored ? JSON.parse(stored) : [];
      list.unshift(newDiya);
      localStorage.setItem("diwali_my_diyas", JSON.stringify(list));
    } catch {
      // Ignore
    }
  };

  const handleDeleteMyDiya = (id: string) => {
    setDiyas((prev) => prev.filter((d) => d.id !== id));
    if (myDiyaId === id) setMyDiyaId(null);
    try {
      const stored = localStorage.getItem("diwali_my_diyas");
      if (stored) {
        const list: LitDiyaData[] = JSON.parse(stored);
        const filtered = list.filter((d) => d.id !== id);
        localStorage.setItem("diwali_my_diyas", JSON.stringify(filtered));
      }
    } catch {
      // Ignore
    }
  };

  return (
    <section id="wall-of-light" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-3">
          <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
          <span>Sacred Community Sanctuary</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-diwali-ivory mb-3">
          The Wall of Light
        </h2>
        <p className="text-sm sm:text-base text-diwali-lavender">
          Every lit diya joins this sacred constellation of goodwill. Light your flame, leave a heartfelt dedication, and watch our shared illumination grow.
        </p>

        {/* CTA Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(255,181,71,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <Flame className="w-4 h-4 fill-current text-diwali-crimson" />
            <span>Light Your Diya on the Wall</span>
          </button>
        </div>
      </div>

      {/* Grid of Lit Diyas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {diyas.map((diya) => {
          const isMine = diya.id === myDiyaId;

          return (
            <div
              key={diya.id}
              className={`relative rounded-3xl p-6 bg-gradient-to-b from-diwali-surface to-diwali-midnight/90 border transition-all duration-300 flex flex-col items-center text-center group ${
                isMine
                  ? "border-diwali-gold shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                  : "border-diwali-gold/20 hover:border-diwali-gold/50 shadow-lg"
              }`}
            >
              {/* Mine Badge */}
              {isMine && (
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-diwali-gold/20 border border-diwali-gold/40 text-[10px] text-diwali-goldLight font-medium">
                  Your Diya
                </div>
              )}

              {/* Delete / Remove for user's own Diya */}
              {isMine && (
                <button
                  onClick={() => handleDeleteMyDiya(diya.id)}
                  title="Remove my Diya"
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-diwali-lavender hover:text-diwali-crimson hover:bg-diwali-surfaceLight transition-colors"
                  aria-label="Remove my Diya"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Diya Visual */}
              <div className="my-2 transform group-hover:scale-110 transition-transform duration-300">
                <DiyaVisual styleName={diya.style} isLit={true} size="md" />
              </div>

              {/* Name */}
              <h3 className="font-serif font-bold text-base text-diwali-goldLight mt-2">
                {diya.name}
              </h3>

              {/* Message */}
              {diya.message && (
                <p className="text-xs text-diwali-lavender mt-2 italic max-w-xs leading-relaxed">
                  &ldquo;{diya.message}&rdquo;
                </p>
              )}

              {/* Timestamp */}
              <span className="text-[10px] text-diwali-lavender/60 mt-auto pt-4">
                Lit with devotion
              </span>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <DiyaLightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDiyaLit={handleDiyaLit}
      />
    </section>
  );
}
