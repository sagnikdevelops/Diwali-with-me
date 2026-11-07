"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Flame, Sparkles, Trash2, Filter } from "lucide-react";
import { DiyaVisual, DiyaColorStyle } from "./DiyaVisual";
import { LitDiyaData } from "./DiyaLightModal";

interface AllDiyasModalProps {
  isOpen: boolean;
  onClose: () => void;
  diyas: LitDiyaData[];
  myDiyaIds: string[];
  onDeleteDiya: (id: string) => void;
  onOpenLightModal: () => void;
}

const STYLE_FILTERS: { id: DiyaColorStyle | "all"; label: string }[] = [
  { id: "all", label: "All Styles" },
  { id: "brass", label: "Royal Brass" },
  { id: "terracotta", label: "Terracotta" },
  { id: "peacock", label: "Peacock Blue" },
  { id: "rose", label: "Rose Quartz" },
  { id: "amethyst", label: "Amethyst Violet" },
];

export function AllDiyasModal({
  isOpen,
  onClose,
  diyas,
  myDiyaIds,
  onDeleteDiya,
  onOpenLightModal,
}: AllDiyasModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<DiyaColorStyle | "all">("all");

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

  const filteredDiyas = diyas.filter((diya) => {
    const matchesStyle = selectedStyle === "all" || diya.style === selectedStyle;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      diya.name.toLowerCase().includes(q) ||
      diya.message.toLowerCase().includes(q);
    return matchesStyle && matchesSearch;
  });

  const formatRelativeTime = (timestamp?: number) => {
    if (!timestamp) return "Lit with devotion";
    const diffHours = Math.floor((Date.now() - timestamp) / 3600000);
    if (diffHours < 1) return "Just now";
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
      aria-labelledby="all-diyas-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-gradient-to-b from-diwali-surface via-diwali-midnight to-diwali-navy border border-diwali-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.25)] text-diwali-ivory overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-diwali-gold/20 flex items-start justify-between gap-4 bg-diwali-midnight/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-2">
              <Flame className="w-3.5 h-3.5 fill-current text-diwali-crimson" />
              <span>Sanctuary Constellation</span>
            </div>
            <h2 id="all-diyas-title" className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-diwali-ivory">
              The Wall of Light — All Illuminated Diyas
            </h2>
            <p className="text-xs sm:text-sm text-diwali-lavender mt-1">
              Showing {filteredDiyas.length} of {diyas.length} sacred flames lit by visitors and devotees.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close all diyas view"
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
              placeholder="Search by devotee name or dedication..."
              aria-label="Search diyas by name or dedication"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-diwali-midnight/80 border border-diwali-gold/30 focus:border-diwali-gold text-xs sm:text-sm text-diwali-ivory placeholder:text-diwali-lavender/50 focus:outline-none focus:ring-1 focus:ring-diwali-gold transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search input"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-diwali-lavender hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Style Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-diwali-goldLight shrink-0 hidden sm:block mr-1" />
            {STYLE_FILTERS.map((filter) => {
              const active = selectedStyle === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedStyle(filter.id)}
                  aria-label={`Filter by ${filter.label}`}
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

        {/* Scrollable Diyas Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-h-[58vh]">
          {filteredDiyas.length === 0 ? (
            <div className="py-16 text-center">
              <Flame className="w-10 h-10 text-diwali-lavender/40 mx-auto mb-3" />
              <h3 className="text-base font-serif font-bold text-diwali-ivory">No diyas found</h3>
              <p className="text-xs text-diwali-lavender mt-1">
                No lit diyas matched your current search or style filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStyle("all");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight text-xs text-diwali-goldLight border border-diwali-gold/30"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDiyas.map((diya) => {
                const isMine = myDiyaIds.includes(diya.id);

                return (
                  <div
                    key={diya.id}
                    className={`relative rounded-3xl p-5 bg-gradient-to-b from-diwali-surface to-diwali-midnight/90 border transition-all duration-300 flex flex-col items-center text-center group ${
                      isMine
                        ? "border-diwali-gold shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                        : "border-diwali-gold/20 hover:border-diwali-gold/50 shadow-md"
                    }`}
                  >
                    {/* Mine Badge */}
                    {isMine && (
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-diwali-gold/25 border border-diwali-gold/50 text-[10px] text-diwali-goldLight font-bold">
                        Your Diya
                      </div>
                    )}

                    {/* Delete for user's own Diya */}
                    {isMine && (
                      <button
                        onClick={() => onDeleteDiya(diya.id)}
                        title="Remove my Diya"
                        className="absolute top-3 right-3 p-1.5 rounded-lg text-diwali-lavender hover:text-diwali-crimson hover:bg-diwali-surfaceLight transition-colors"
                        aria-label="Remove my Diya"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Diya Visual */}
                    <div className="my-2 transform group-hover:scale-105 transition-transform duration-300">
                      <DiyaVisual styleName={diya.style} isLit={true} size="md" />
                    </div>

                    {/* Devotee Name */}
                    <h3 className="font-serif font-bold text-base text-diwali-goldLight mt-2">
                      {diya.name}
                    </h3>

                    {/* Style tag */}
                    <span className="text-[10px] uppercase tracking-wider text-diwali-lavender/70 mt-0.5">
                      {diya.style} style
                    </span>

                    {/* Dedication message */}
                    {diya.message && (
                      <p className="text-xs text-diwali-lavender mt-2.5 italic max-w-xs leading-relaxed line-clamp-3">
                        &ldquo;{diya.message}&rdquo;
                      </p>
                    )}

                    {/* Timestamp */}
                    <span className="text-[10px] text-diwali-lavender/60 mt-auto pt-3 border-t border-white/5 w-full">
                      {formatRelativeTime(diya.createdAt)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-diwali-gold/20 bg-diwali-midnight/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-diwali-lavender text-center sm:text-left">
            Total of <span className="text-diwali-gold font-bold">{diyas.length}</span> illuminated diyas preserved in your sanctuary.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenLightModal();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Light Another Diya</span>
            </button>
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
