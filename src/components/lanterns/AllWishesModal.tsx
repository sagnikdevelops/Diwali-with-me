"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Heart, Sparkles, Trash2, Filter, Send, Share2, Check } from "lucide-react";
import { SkyLanternData } from "./SkyLanterns";
import { encodeLanternData } from "@/lib/share-codec";
import { copyToClipboard } from "@/lib/utils";

interface AllWishesModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: SkyLanternData[];
  myWishIds: string[];
  onDeleteWish: (id: string) => void;
  onOpenReleaseModal?: () => void;
}

const COLOR_FILTERS: { id: SkyLanternData["color"] | "all"; label: string; accentColor: string }[] = [
  { id: "all", label: "All Lanterns", accentColor: "#D4AF37" },
  { id: "amber", label: "Golden Amber", accentColor: "#FFB547" },
  { id: "saffron", label: "Saffron Peace", accentColor: "#FF8C00" },
  { id: "rose", label: "Rose Harmony", accentColor: "#E57593" },
  { id: "emerald", label: "Emerald Hope", accentColor: "#2EC4B6" },
];

export function AllWishesModal({
  isOpen,
  onClose,
  wishes,
  myWishIds,
  onDeleteWish,
  onOpenReleaseModal,
}: AllWishesModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<SkyLanternData["color"] | "all">("all");
  const [copiedLanternId, setCopiedLanternId] = useState<string | null>(null);

  const handleShareLantern = async (item: SkyLanternData) => {
    if (typeof window === "undefined") return;
    const encoded = encodeLanternData({
      id: item.id,
      name: item.name,
      wish: item.wish,
      color: item.color,
      createdAt: item.createdAt,
    });
    const url = `${window.location.origin}/share?lantern=${encoded}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.name}'s Diwali Sky Lantern`,
          text: `Diwali Sky Lantern lit by ${item.name}: "${item.wish}" 🏮✨`,
          url: url,
        });
        return;
      } catch {
        // Fallback
      }
    }
    await copyToClipboard(url);
    setCopiedLanternId(item.id);
    setTimeout(() => setCopiedLanternId(null), 2500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredWishes = wishes.filter((wish) => {
    const matchesColor = selectedColor === "all" || wish.color === selectedColor;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      wish.name.toLowerCase().includes(q) ||
      wish.wish.toLowerCase().includes(q);
    return matchesColor && matchesSearch;
  });

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

  const formatRelativeTime = (timestamp?: number) => {
    if (!timestamp) return "Floating into starlight";
    const diffHours = Math.floor((Date.now() - timestamp) / 3600000);
    if (diffHours < 1) return "Just released";
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-wishes-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-gradient-to-b from-diwali-surface via-diwali-midnight to-diwali-navy border border-diwali-gold/40 shadow-[0_0_50px_rgba(255,181,71,0.25)] text-diwali-ivory overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-diwali-gold/20 flex items-start justify-between gap-4 bg-diwali-midnight/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-2">
              <Heart className="w-3.5 h-3.5 text-diwali-crimson fill-current" />
              <span>Celestial Wish Constellation</span>
            </div>
            <h2 id="all-wishes-title" className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-diwali-ivory">
              The Wish Wall — All Sky Lanterns
            </h2>
            <p className="text-xs sm:text-sm text-diwali-lavender mt-1">
              Showing {filteredWishes.length} of {wishes.length} wishes ascending through the festive night.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close all wishes view"
            className="p-2 sm:p-2.5 rounded-full bg-diwali-surface/80 hover:bg-diwali-surfaceLight text-diwali-lavender hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 border-b border-diwali-gold/15 bg-diwali-surface/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-diwali-lavender absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wishes by name or keywords..."
              aria-label="Search sky wishes"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-diwali-midnight/80 border border-diwali-gold/30 focus:border-diwali-gold text-xs sm:text-sm text-diwali-ivory placeholder:text-diwali-lavender/50 focus:outline-none focus:ring-1 focus:ring-diwali-gold transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear wish search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-diwali-lavender hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Color Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-diwali-goldLight shrink-0 hidden sm:block mr-1" />
            {COLOR_FILTERS.map((filter) => {
              const active = selectedColor === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedColor(filter.id)}
                  aria-label={`Filter wishes by ${filter.label}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-diwali-gold text-diwali-navy font-bold shadow-md shadow-diwali-gold/20"
                      : "bg-diwali-midnight/70 text-diwali-lavender hover:text-white border border-diwali-gold/20 hover:border-diwali-gold/50"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Wishes Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-h-[58vh]">
          {filteredWishes.length === 0 ? (
            <div className="py-16 text-center">
              <Heart className="w-10 h-10 text-diwali-lavender/40 mx-auto mb-3" />
              <h3 className="text-base font-serif font-bold text-diwali-ivory">No wishes found</h3>
              <p className="text-xs text-diwali-lavender mt-1">
                No lanterns matched your current search or color filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedColor("all");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight text-xs text-diwali-goldLight border border-diwali-gold/30"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredWishes.map((item) => {
                const isMine = myWishIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`relative p-5 rounded-2xl bg-diwali-midnight/90 border transition-all duration-300 flex flex-col justify-between group ${
                      isMine
                        ? "border-diwali-gold shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                        : "border-diwali-gold/20 hover:border-diwali-gold/50 shadow-md"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getLanternAccent(
                            item.color
                          )}`}
                        >
                          {item.color.toUpperCase()} LANTERN
                        </span>

                        <div className="flex items-center gap-1.5">
                          {isMine && (
                            <span className="px-2 py-0.5 rounded-full bg-diwali-gold/25 border border-diwali-gold/50 text-[10px] text-diwali-goldLight font-bold">
                              Your Wish
                            </span>
                          )}
                          <button
                            onClick={() => handleShareLantern(item)}
                            title="Share this sky lantern"
                            className="p-1 rounded text-diwali-lavender hover:text-diwali-goldLight transition-colors"
                            aria-label={`Share ${item.name}'s sky lantern`}
                          >
                            {copiedLanternId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Share2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                          {isMine && (
                            <button
                              onClick={() => onDeleteWish(item.id)}
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

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-diwali-goldLight truncate max-w-[130px]">
                        {item.name}
                      </span>
                      <span className="text-diwali-lavender/60 text-[10px]">
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-diwali-gold/20 bg-diwali-midnight/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-diwali-lavender text-center sm:text-left">
            Total of <span className="text-diwali-gold font-bold">{wishes.length}</span> wishes ascending toward the stars.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onOpenReleaseModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenReleaseModal();
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-diwali-amber via-diwali-gold to-diwali-amber text-diwali-navy font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Release a Lantern</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-white/10 text-xs sm:text-sm text-diwali-ivory font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

