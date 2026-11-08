"use client";

import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";
import {
  Gift,
  Sparkles,
  Heart,
  Share2,
  Copy,
  Check,
  Send,
  Download,
  Trash2,
  Shuffle,
  Eye,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";
import { SweetVisual } from "./SweetVisual";
import { MithaiUnboxModal } from "./MithaiUnboxModal";
import { MITHAI_MENU, BOX_THEMES, BoxPackagingStyle } from "./types";
import { encodeMithaiBoxData } from "@/lib/share-codec";
import { audioSynth } from "@/lib/audio-synth";
import { copyToClipboard } from "@/lib/utils";

const BOX_CAPACITY = 6;

const MESSAGE_PRESETS = [
  "May your Diwali be as sweet, radiant, and joyous as this special box of mithai!",
  "Sending you boxes of love, golden sweets, and Maa Lakshmi's eternal abundance!",
  "From our family to yours: may every bite bring sweet laughter and festive warmth!",
  "May your new year be illuminated with auspicious joy, health, and delightful treats!",
];

export function MithaiBoxStudio() {
  const [selectedSweets, setSelectedSweets] = useState<string[]>([
    "kaju-katli",
    "motichoor-ladoo",
    "gulab-jamun",
    "soan-papdi",
  ]);
  const [boxStyle, setBoxStyle] = useState<BoxPackagingStyle>("royal-crimson");
  const [recipient, setRecipient] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const [message, setMessage] = useState<string>(
    "Wishing your festival of lights is sweetened with endless joy and warm memories!"
  );

  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);

  const boxCardRef = useRef<HTMLDivElement | null>(null);

  const theme = BOX_THEMES[boxStyle] || BOX_THEMES["royal-crimson"];

  // Add a sweet to the box
  const handleAddSweet = (sweetId: string) => {
    if (selectedSweets.length >= BOX_CAPACITY) {
      audioSynth.playDiyaChime();
      return;
    }

    const nextIndex = selectedSweets.length;
    setSelectedSweets((prev) => [...prev, sweetId]);
    setLastAddedIndex(nextIndex);
    audioSynth.playDiyaChime();

    // Trigger confetti if box becomes full
    if (nextIndex + 1 === BOX_CAPACITY) {
      setTimeout(() => {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.65 },
            colors: ["#D4AF37", "#FFB547", "#FFE27B"],
          });
        } catch {
          // Ignore
        }
      }, 150);
    }
  };

  // Remove a sweet by slot index
  const handleRemoveSweet = (slotIndex: number) => {
    setSelectedSweets((prev) => prev.filter((_, idx) => idx !== slotIndex));
    audioSynth.playDiyaChime();
  };

  // Quick Randomize Chef's Assortment
  const handleRandomize = () => {
    const shuffled = [...MITHAI_MENU].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, BOX_CAPACITY).map((s) => s.id);
    setSelectedSweets(picked);
    audioSynth.playDiyaChime();
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } catch {
      // Ignore
    }
  };

  // Clear Box
  const handleClear = () => {
    setSelectedSweets([]);
    audioSynth.playDiyaChime();
  };

  // Generate share URL
  const generateShareUrl = () => {
    const encoded = encodeMithaiBoxData({
      recipient: recipient.trim().slice(0, 50) || "Beloved Friend",
      sender: sender.trim().slice(0, 50) || "Your Well-Wisher",
      message: message.trim().slice(0, 500) || "May your Diwali be blessed with sweetness and light!",
      boxStyle,
      sweets: selectedSweets,
      createdAt: Date.now(),
    });

    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    return `${origin}/share?box=${encoded}`;
  };

  const handleCopyLink = async () => {
    const url = generateShareUrl();
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleShareWhatsApp = () => {
    const url = generateShareUrl();
    const text = `Namaste ${recipient || "Dear"}! 🪔✨ I curated a royal Diwali Mithai Box for you with love and blessings! Open your festive sweets gift here: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleDownloadPng = async () => {
    if (!boxCardRef.current || isExporting) return;
    setIsExporting(true);

    try {
      const dataUrl = await toPng(boxCardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `Diwali-Mithai-Box-${(recipient || "Friend").replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export mithai box image:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="mithai-box" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-3">
          <Gift className="w-3.5 h-3.5 text-diwali-amber" />
          <span>Festive Confectionery Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-diwali-ivory mb-3">
          Curate a Royal Mithai Box
        </h2>
        <p className="text-sm sm:text-base text-diwali-lavender">
          Hand-pick authentic Diwali sweets from our royal menu tray, arrange them in a luxury velvet gift box, and send a personalized festive surprise to your loved ones anywhere in the world!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Mithai Box & Personal Card Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Exportable Gift Card Container */}
          <div
            ref={boxCardRef}
            className={`w-full max-w-lg rounded-3xl bg-gradient-to-br ${theme.boxBg} border-2 ${theme.boxBorder} ${theme.boxShadow} p-5 sm:p-7 relative transition-all duration-300`}
          >
            {/* Box Header Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-diwali-gold/25">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-diwali-goldLight">
                    Shubh Deepavali Sweets
                  </h3>
                  <span className="text-[10px] text-diwali-lavender">
                    {theme.label}
                  </span>
                </div>
              </div>

              {/* Box Capacity Counter Badge */}
              <div className="px-3 py-1 rounded-full bg-black/40 border border-diwali-gold/30 text-xs font-bold text-diwali-gold">
                {selectedSweets.length} / {BOX_CAPACITY} Sweets
              </div>
            </div>

            {/* Mithai Box Compartment Grid (6 slots: 2 rows x 3 columns) */}
            <div className="border border-diwali-gold/30 rounded-2xl p-4 bg-black/40 backdrop-blur-sm relative overflow-hidden">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: BOX_CAPACITY }).map((_, slotIndex) => {
                  const sweetId = selectedSweets[slotIndex];
                  const sweetMeta = sweetId ? MITHAI_MENU.find((s) => s.id === sweetId) : null;
                  const isJustAdded = lastAddedIndex === slotIndex;

                  return (
                    <div
                      key={slotIndex}
                      className={`aspect-square rounded-2xl ${theme.compartmentBg} border ${theme.compartmentBorder} p-2 flex flex-col items-center justify-center relative shadow-inner group transition-all duration-300 ${
                        isJustAdded ? "scale-105 animate-pulse ring-2 ring-diwali-gold" : ""
                      }`}
                    >
                      {/* Pleated Paper Base Cup Rim */}
                      <div className="absolute inset-1.5 rounded-xl border border-diwali-gold/15 pointer-events-none" />

                      {sweetMeta ? (
                        <>
                          {/* Remove button on hover / touch */}
                          <button
                            onClick={() => handleRemoveSweet(slotIndex)}
                            title={`Remove ${sweetMeta.name}`}
                            aria-label={`Remove ${sweetMeta.name} from box`}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-diwali-crimson text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                          >
                            <X className="w-3 h-3 stroke-[3]" />
                          </button>

                          {/* Sweet Visual */}
                          <div className="transform group-hover:scale-110 transition-transform duration-300">
                            <SweetVisual id={sweetMeta.id} size="sm" />
                          </div>

                          {/* Sweet Name Label */}
                          <span className="text-[10px] sm:text-[11px] font-bold text-diwali-ivory mt-1 truncate max-w-full text-center px-1">
                            {sweetMeta.name}
                          </span>
                        </>
                      ) : (
                        <div className="text-center flex flex-col items-center justify-center p-2 text-diwali-lavender/40">
                          <Plus className="w-4 h-4 mb-1 stroke-[1.5]" />
                          <span className="text-[9px] uppercase tracking-wider">Empty</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attached Dedicated Gift Note */}
            <div className="mt-5 p-4 rounded-2xl bg-black/50 border border-diwali-gold/20 flex flex-col gap-1.5 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-diwali-goldLight truncate">
                  To: {recipient || "Beloved Family & Friends"}
                </span>
                <span className="text-[10px] text-diwali-lavender/70">From: {sender || "Well-wisher"}</span>
              </div>
              <p className="text-xs text-diwali-ivory/90 italic font-light line-clamp-2">
                &ldquo;{message || "Wishing you sweet moments and luminous blessings this Diwali!"}&rdquo;
              </p>
            </div>
          </div>

          {/* Box Actions Toolbar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={handleRandomize}
              aria-label="Chef's Assortment randomizer"
              className="px-3.5 py-2 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-diwali-gold/30 text-xs text-diwali-goldLight flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Chef&apos;s Royal Assortment</span>
            </button>

            <button
              onClick={handleClear}
              aria-label="Empty sweet box"
              className="px-3.5 py-2 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-white/10 text-xs text-diwali-lavender hover:text-diwali-crimson flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Box</span>
            </button>

            <button
              onClick={() => setIsPreviewOpen(true)}
              aria-label="Preview gift box unboxing experience"
              className="px-4 py-2 rounded-xl bg-diwali-purple/50 hover:bg-diwali-purple/70 border border-diwali-gold/40 text-xs font-bold text-diwali-goldLight flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-diwali-amber" />
              <span>Preview Unboxing</span>
            </button>
          </div>
        </div>

        {/* Right Column: Menu Tray, Packaging Selector & Message Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Packaging Style Picker */}
          <div className="p-5 rounded-3xl bg-diwali-surface/70 border border-diwali-gold/25">
            <label className="block text-xs font-bold uppercase tracking-wider text-diwali-goldLight mb-3">
              1. Choose Luxury Box Theme
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(Object.keys(BOX_THEMES) as BoxPackagingStyle[]).map((themeKey) => {
                const item = BOX_THEMES[themeKey];
                const active = boxStyle === themeKey;

                return (
                  <button
                    key={themeKey}
                    type="button"
                    onClick={() => {
                      setBoxStyle(themeKey);
                      audioSynth.playDiyaChime();
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      active
                        ? "border-diwali-gold bg-diwali-gold/20 scale-[1.02] shadow-md shadow-diwali-gold/20"
                        : "border-white/10 hover:border-white/30 bg-diwali-midnight/60"
                    }`}
                  >
                    <span className="text-lg mb-1">
                      {themeKey === "royal-crimson" ? "🏮" : themeKey === "midnight-gold" ? "🌌" : "✨"}
                    </span>
                    <span className="text-xs font-bold text-diwali-ivory leading-tight">
                      {item.label.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-diwali-lavender/70">
                      {themeKey === "royal-crimson" ? "Ruby Velvet" : themeKey === "midnight-gold" ? "Navy Gold" : "Saffron Silk"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sweet Menu Tray */}
          <div className="p-5 rounded-3xl bg-diwali-surface/70 border border-diwali-gold/25">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-diwali-goldLight">
                2. Tap Sweets to Pack Box
              </label>
              <span className="text-[11px] text-diwali-lavender">
                {selectedSweets.length >= BOX_CAPACITY ? "Box is Full! Ready to send." : `Tap to add (Space for ${BOX_CAPACITY - selectedSweets.length})`}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
              {MITHAI_MENU.map((sweet) => {
                const countInBox = selectedSweets.filter((id) => id === sweet.id).length;
                const isFull = selectedSweets.length >= BOX_CAPACITY;

                return (
                  <button
                    key={sweet.id}
                    onClick={() => handleAddSweet(sweet.id)}
                    disabled={isFull}
                    aria-label={`Add ${sweet.name} to box`}
                    className={`p-2.5 rounded-2xl border text-center flex flex-col items-center relative transition-all cursor-pointer group ${
                      isFull
                        ? "opacity-60 border-white/5 bg-diwali-midnight/40 cursor-not-allowed"
                        : "border-white/10 hover:border-diwali-gold/50 bg-diwali-midnight/80 hover:bg-diwali-surfaceLight shadow-md hover:scale-[1.03]"
                    }`}
                  >
                    {/* Badge if already in box */}
                    {countInBox > 0 && (
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-diwali-gold text-diwali-navy text-[9px] font-black shadow-sm">
                        x{countInBox}
                      </span>
                    )}

                    <div className="transform group-hover:scale-110 transition-transform duration-200">
                      <SweetVisual id={sweet.id} size="sm" />
                    </div>

                    <span className="text-xs font-bold text-diwali-ivory mt-1 leading-tight line-clamp-1">
                      {sweet.name}
                    </span>
                    <span className="text-[9px] text-diwali-goldLight/80">
                      {sweet.hindiName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Card & Dedication Form */}
          <div className="p-5 rounded-3xl bg-diwali-surface/70 border border-diwali-gold/25">
            <label className="block text-xs font-bold uppercase tracking-wider text-diwali-goldLight mb-3">
              3. Personalize Gift Card
            </label>

            <div className="space-y-3">
              <div>
                <label htmlFor="mithai-recipient" className="block text-xs text-diwali-lavender mb-1">
                  Recipient Name <span className="text-diwali-gold">*</span>
                </label>
                <input
                  id="mithai-recipient"
                  type="text"
                  maxLength={50}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Priya & Family"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-diwali-midnight/80 border border-diwali-gold/30 focus:border-diwali-gold text-xs sm:text-sm text-diwali-ivory placeholder:text-diwali-lavender/50 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="mithai-sender" className="block text-xs text-diwali-lavender mb-1">
                  Sender Name
                </label>
                <input
                  id="mithai-sender"
                  type="text"
                  maxLength={50}
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g. Sagnik"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-diwali-midnight/80 border border-diwali-gold/30 focus:border-diwali-gold text-xs sm:text-sm text-diwali-ivory placeholder:text-diwali-lavender/50 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="mithai-message" className="block text-xs text-diwali-lavender mb-1">
                  Personal Festive Message
                </label>
                <textarea
                  id="mithai-message"
                  maxLength={300}
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a sweet festive note..."
                  className="w-full px-3.5 py-2 rounded-xl bg-diwali-midnight/80 border border-diwali-gold/30 focus:border-diwali-gold text-xs text-diwali-ivory placeholder:text-diwali-lavender/50 focus:outline-none resize-none transition-all"
                />

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {MESSAGE_PRESETS.map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setMessage(preset)}
                      className="px-2.5 py-1 rounded-lg bg-diwali-midnight/90 border border-white/10 hover:border-diwali-gold/40 text-[10px] text-diwali-lavender hover:text-diwali-goldLight transition-colors text-left"
                    >
                      {preset.slice(0, 26)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="pt-4 mt-4 border-t border-diwali-gold/20 flex flex-col gap-2.5">
              <button
                onClick={handleShareWhatsApp}
                aria-label="Share mithai box on WhatsApp"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Box via WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy gift box link"
                  className="py-3 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-diwali-gold/40 text-diwali-goldLight hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadPng}
                  disabled={isExporting}
                  aria-label="Download gift card PNG image"
                  className="py-3 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-diwali-gold/40 text-diwali-goldLight hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? "Saving..." : "Save Image"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unboxing Experience Modal */}
      <MithaiUnboxModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        recipient={recipient || "Beloved Friend"}
        sender={sender || "Your Well-Wisher"}
        message={message}
        boxStyle={boxStyle}
        sweets={selectedSweets}
        shareUrl={generateShareUrl()}
      />
    </section>
  );
}

