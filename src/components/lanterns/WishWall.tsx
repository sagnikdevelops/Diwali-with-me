"use client";

import React, { useState, useEffect } from "react";
import { SkyLanterns, SkyLanternData } from "./SkyLanterns";
import { AllWishesModal } from "./AllWishesModal";
import { Sparkles, Heart, ArrowRight, Trash2 } from "lucide-react";

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

const MAIN_PAGE_WISHES_LIMIT = 4;

export function WishWall() {
  const [wishes, setWishes] = useState<SkyLanternData[]>(INITIAL_WISHES);
  const [isAllWishesModalOpen, setIsAllWishesModalOpen] = useState<boolean>(false);
  const [myWishIds, setMyWishIds] = useState<string[]>([]);
  const [myPrivateWish, setMyPrivateWish] = useState<SkyLanternData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("diwali_my_lanterns");
      if (stored) {
        const parsed: SkyLanternData[] = JSON.parse(stored);
        if (parsed.length > 0) {
          setMyWishIds(parsed.map((w) => w.id));
          // If the most recent wish was private, record it for private feedback
          const latest = parsed[0];
          if (!latest.isPublic) {
            setMyPrivateWish(latest);
          }
          // Merge ONLY public wishes onto the wall; private wishes are strictly excluded
          setWishes((prev) => {
            const ids = new Set(prev.map((w) => w.id));
            const publicNewOnes = parsed.filter((w) => w.isPublic === true && !ids.has(w.id));
            return [...publicNewOnes, ...prev];
          });
        }
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleLanternReleased = (lantern: SkyLanternData) => {
    setMyWishIds((prev) => [lantern.id, ...prev]);

    // Only render on the Wish Wall if user gave explicit consent (isPublic === true)
    if (lantern.isPublic) {
      setWishes((prev) => [lantern, ...prev]);
    } else {
      setMyPrivateWish(lantern);
    }

    try {
      const stored = localStorage.getItem("diwali_my_lanterns");
      const list: SkyLanternData[] = stored ? JSON.parse(stored) : [];
      list.unshift(lantern);
      localStorage.setItem("diwali_my_lanterns", JSON.stringify(list));
    } catch {
      // Ignore
    }
  };

  const handleDeleteMyWish = (id: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
    setMyWishIds((prev) => prev.filter((wId) => wId !== id));
    if (myPrivateWish?.id === id) {
      setMyPrivateWish(null);
    }
    try {
      const stored = localStorage.getItem("diwali_my_lanterns");
      if (stored) {
        const list: SkyLanternData[] = JSON.parse(stored);
        const filtered = list.filter((w) => w.id !== id);
        localStorage.setItem("diwali_my_lanterns", JSON.stringify(filtered));
      }
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

      {/* Wish Wall Grid */}
      <div className="mt-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-2">
            <Heart className="w-3.5 h-3.5 text-diwali-crimson fill-current" />
            <span>Wish Constellation</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-diwali-ivory">
            The Wish Wall
          </h3>
          <p className="text-xs sm:text-sm text-diwali-lavender mt-1">
            Read inspiring festive intentions floating under the starlit sky (entries saved in your current browser).
          </p>
        </div>

        {/* Private Wish Card if user opted out of public wall */}
        {myPrivateWish && (
          <div className="mb-6 p-4 rounded-2xl bg-diwali-purple/20 border border-diwali-gold/30 max-w-xl mx-auto flex items-center justify-between text-left">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-diwali-goldLight">
                Personal Sky Wish (Private)
              </span>
              <p className="text-xs font-semibold text-diwali-ivory">
                {myPrivateWish.name}: &ldquo;{myPrivateWish.wish}&rdquo;
              </p>
              <p className="text-[10px] text-diwali-lavender">
                Ascending privately; not displayed on the public Wish Wall per your preference.
              </p>
            </div>
            <button
              onClick={() => {
                const wishId = myPrivateWish.id;
                setMyPrivateWish(null);
                try {
                  const stored = localStorage.getItem("diwali_my_lanterns");
                  if (stored) {
                    const list: SkyLanternData[] = JSON.parse(stored);
                    const filtered = list.filter((w) => w.id !== wishId);
                    localStorage.setItem("diwali_my_lanterns", JSON.stringify(filtered));
                  }
                } catch {
                  // Ignore
                }
              }}
              className="text-xs text-diwali-lavender hover:text-diwali-crimson p-1.5 ml-3 shrink-0"
              title="Remove private wish"
            >
              Clear
            </button>
          </div>
        )}

        {/* Wish Wall Grid (Preview capped on main page to keep layout uncluttered) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishes.slice(0, MAIN_PAGE_WISHES_LIMIT).map((item) => {
            const isMine = myWishIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl bg-diwali-midnight/80 border transition-all flex flex-col justify-between group ${
                  isMine
                    ? "border-diwali-gold shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                    : "border-diwali-gold/20 hover:border-diwali-gold/50 shadow-lg"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getLanternAccent(
                        item.color
                      )}`}
                    >
                      {item.color.toUpperCase()} LANTERN
                    </span>
                    <div className="flex items-center gap-1">
                      {isMine && (
                        <span className="px-2 py-0.5 rounded-full bg-diwali-gold/25 border border-diwali-gold/50 text-[10px] text-diwali-goldLight font-bold">
                          Your Wish
                        </span>
                      )}
                      {isMine && (
                        <button
                          onClick={() => handleDeleteMyWish(item.id)}
                          title="Delete my lantern"
                          className="p-1 rounded text-diwali-lavender hover:text-diwali-crimson transition-colors"
                          aria-label="Delete my lantern wish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

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
            );
          })}
        </div>

        {/* View All Wishes Trigger Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsAllWishesModalOpen(true)}
            aria-label="View all sky lantern wishes"
            className="px-7 py-3.5 rounded-2xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-diwali-gold/40 hover:border-diwali-gold text-diwali-goldLight hover:text-white font-bold text-sm shadow-lg hover:shadow-diwali-gold/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-diwali-amber" />
            <span>View All Sky Wishes ({wishes.length} Floating)</span>
            <ArrowRight className="w-4 h-4 text-diwali-gold" />
          </button>
        </div>
      </div>

      {/* View All Wishes Overlay Modal */}
      <AllWishesModal
        isOpen={isAllWishesModalOpen}
        onClose={() => setIsAllWishesModalOpen(false)}
        wishes={wishes}
        myWishIds={myWishIds}
        onDeleteWish={handleDeleteMyWish}
        onOpenReleaseModal={() => {
          const el = document.getElementById("sky-lanterns");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </section>
  );
}

