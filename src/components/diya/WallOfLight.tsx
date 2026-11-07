"use client";

import React, { useState, useEffect } from "react";
import { DiyaVisual, DiyaColorStyle } from "./DiyaVisual";
import { DiyaLightModal, LitDiyaData } from "./DiyaLightModal";
import { AllDiyasModal } from "./AllDiyasModal";
import { Flame, Sparkles, Plus, Trash2, ArrowRight } from "lucide-react";
import { isSupabaseConfigured, fetchRemotePublicDiyas, insertRemoteDiya, subscribeToRemoteDiyas } from "@/lib/supabase";

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

const MAIN_PAGE_DIYAS_LIMIT = 6;

export function WallOfLight() {
  const [diyas, setDiyas] = useState<LitDiyaData[]>(INITIAL_COMMUNITY_DIYAS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAllDiyasModalOpen, setIsAllDiyasModalOpen] = useState<boolean>(false);
  const [myDiyaId, setMyDiyaId] = useState<string | null>(null);
  const [myDiyaIds, setMyDiyaIds] = useState<string[]>([]);
  const [myDiya, setMyDiya] = useState<LitDiyaData | null>(null);

  // Load locally saved diyas on mount and connect Supabase sync
  useEffect(() => {
    try {
      const stored = localStorage.getItem("diwali_my_diyas");
      if (stored) {
        const parsed: LitDiyaData[] = JSON.parse(stored);
        if (parsed.length > 0) {
          setMyDiyaId(parsed[0].id);
          setMyDiya(parsed[0]);
          setMyDiyaIds(parsed.map((d) => d.id));
          // Merge ONLY opted-in public diyas onto the wall; private diyas are strictly excluded
          setDiyas((prev) => {
            const ids = new Set(prev.map((d) => d.id));
            const publicNewOnes = parsed.filter((d) => d.isPublic === true && !ids.has(d.id));
            return [...publicNewOnes, ...prev];
          });
        }
      }
    } catch {
      // Storage unavailable or disabled
    }

    // Connect to Supabase for multi-user real-time sync across devices if configured
    let unsubscribeRealtime: (() => void) | null = null;
    if (isSupabaseConfigured()) {
      fetchRemotePublicDiyas().then((remoteDiyas) => {
        if (remoteDiyas.length > 0) {
          setDiyas((prev) => {
            const ids = new Set(prev.map((d) => d.id));
            const newRemote = remoteDiyas.filter((d) => !ids.has(d.id));
            return [...newRemote, ...prev];
          });
        }
      });

      unsubscribeRealtime = subscribeToRemoteDiyas((newRemoteDiya) => {
        setDiyas((prev) => {
          if (prev.some((d) => d.id === newRemoteDiya.id)) return prev;
          return [newRemoteDiya, ...prev];
        });
      });
    }

    return () => {
      if (unsubscribeRealtime) unsubscribeRealtime();
    };
  }, []);

  const handleDiyaLit = (newDiya: LitDiyaData) => {
    setMyDiyaId(newDiya.id);
    setMyDiya(newDiya);
    setMyDiyaIds((prev) => [newDiya.id, ...prev]);

    // Only render on the wall if user gave explicit consent (isPublic === true)
    if (newDiya.isPublic) {
      setDiyas((prev) => [newDiya, ...prev]);
      if (isSupabaseConfigured()) {
        insertRemoteDiya(newDiya).catch(() => {});
      }
    }

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
    setMyDiyaIds((prev) => prev.filter((diyaId) => diyaId !== id));
    if (myDiyaId === id) {
      setMyDiyaId(null);
      setMyDiya(null);
    }
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
          <span>Celebration Sanctuary</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-diwali-ivory mb-3">
          The Wall of Light
        </h2>
        <p className="text-sm sm:text-base text-diwali-lavender">
          Every lit diya joins this illuminated constellation on your browser. Light your flame, leave a heartfelt dedication, and watch your festive illumination grow (saved locally on your device).
        </p>

        {/* CTA Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(255,181,71,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <Flame className="w-4 h-4 fill-current text-diwali-crimson" />
            <span>Light Your Diya on the Wall</span>
          </button>
        </div>
      </div>

      {/* Private Diya Sanctuary Card if user opted out of public wall */}
      {myDiya && !myDiya.isPublic && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-diwali-purple/20 border border-diwali-gold/30 max-w-xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <DiyaVisual styleName={myDiya.style} isLit={true} size="sm" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-diwali-goldLight">
                Personal Devotional Flame (Private)
              </span>
              <p className="text-xs font-semibold text-diwali-ivory">
                {myDiya.name}: &ldquo;{myDiya.message || "Auspicious prayers"}&rdquo;
              </p>
              <p className="text-[10px] text-diwali-lavender">
                Held in your private sanctuary; not shared on the celebration wall per your consent.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDeleteMyDiya(myDiya.id)}
            title="Extinguish my private Diya"
            className="p-2 text-diwali-lavender hover:text-diwali-crimson transition-colors"
            aria-label="Remove private Diya"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid of Lit Diyas (Preview capped on main page to prevent clutter) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {diyas.slice(0, MAIN_PAGE_DIYAS_LIMIT).map((diya) => {
          const isMine = myDiyaIds.includes(diya.id) || diya.id === myDiyaId;

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

      {/* View All Overlay Trigger Button */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => setIsAllDiyasModalOpen(true)}
          aria-label="View all lit diyas"
          className="px-7 py-3.5 rounded-2xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-diwali-gold/40 hover:border-diwali-gold text-diwali-goldLight hover:text-white font-bold text-sm shadow-lg hover:shadow-diwali-gold/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-diwali-amber" />
          <span>View All Diyas ({diyas.length} Illuminated)</span>
          <ArrowRight className="w-4 h-4 text-diwali-gold" />
        </button>
      </div>

      {/* Light Diya Modal */}
      <DiyaLightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDiyaLit={handleDiyaLit}
      />

      {/* View All Diyas Overlay Modal */}
      <AllDiyasModal
        isOpen={isAllDiyasModalOpen}
        onClose={() => setIsAllDiyasModalOpen(false)}
        diyas={diyas}
        myDiyaIds={myDiyaIds}
        onDeleteDiya={handleDeleteMyDiya}
        onOpenLightModal={() => setIsModalOpen(true)}
      />
    </section>
  );
}

