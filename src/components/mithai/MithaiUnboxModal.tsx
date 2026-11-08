"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, Sparkles, Heart, Gift, Share2, Copy, Check, Send, RotateCcw } from "lucide-react";
import { SweetVisual } from "./SweetVisual";
import { BOX_THEMES, MITHAI_MENU, BoxPackagingStyle } from "./types";
import { audioSynth } from "@/lib/audio-synth";
import { copyToClipboard } from "@/lib/utils";

interface MithaiUnboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
  sender: string;
  message: string;
  boxStyle: BoxPackagingStyle;
  sweets: string[];
  shareUrl?: string;
  isRecipientView?: boolean;
}

export function MithaiUnboxModal({
  isOpen,
  onClose,
  recipient,
  sender,
  message,
  boxStyle,
  sweets,
  shareUrl,
  isRecipientView = false,
}: MithaiUnboxModalProps) {
  const [isOpenBox, setIsOpenBox] = useState<boolean>(!isRecipientView);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const theme = BOX_THEMES[boxStyle] || BOX_THEMES["royal-crimson"];

  const handleOpenBox = () => {
    audioSynth.playGiftReveal();
    setIsOpenBox(true);

    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#D4AF37", "#FFB547", "#FFE27B", "#E11D48", "#22C55E"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleShareWhatsApp = () => {
    const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
    const text = `Namaste ${recipient || "Dear"}! 🪔✨ I curated a royal Diwali Mithai Box for you with love and blessings! Open your festive sweets gift here: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopy = async () => {
    const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="unbox-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-gradient-to-b from-diwali-surface via-diwali-midnight to-diwali-navy border border-diwali-gold/40 shadow-[0_0_60px_rgba(212,175,55,0.3)] text-diwali-ivory overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-diwali-gold/20 flex items-center justify-between gap-4 bg-diwali-midnight/80">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-diwali-amber" />
            <h2 id="unbox-modal-title" className="font-serif font-bold text-lg sm:text-xl text-diwali-ivory">
              {isRecipientView ? "A Royal Diwali Sweet Gift For You" : "Mithai Box Gift Preview"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close mithai gift box modal"
            className="p-2 rounded-full bg-diwali-surface hover:bg-diwali-surfaceLight text-diwali-lavender hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center text-center">
          {!isOpenBox ? (
            /* CLOSED BOX STATE WITH RIBBON & WAX SEAL */
            <div className="w-full max-w-md my-6 flex flex-col items-center animate-fade-in">
              <div className="mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-diwali-purple/40 border border-diwali-gold/30 text-diwali-goldLight inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-diwali-amber animate-pulse" />
                  <span>Special Festive Delivery</span>
                </span>
              </div>

              {/* Box Exterior Illustration */}
              <div
                className={`relative w-72 sm:w-80 h-72 sm:h-80 rounded-3xl bg-gradient-to-br ${theme.boxBg} border-2 ${theme.boxBorder} ${theme.boxShadow} p-6 flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.02] cursor-pointer group`}
                onClick={handleOpenBox}
              >
                {/* Ornate Lid Filigree Pattern */}
                <div
                  className="absolute inset-2 rounded-2xl border border-diwali-gold/25 pointer-events-none"
                  style={{ backgroundImage: theme.lidPattern }}
                />

                {/* Corner Brass Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-diwali-gold/60" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-diwali-gold/60" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-diwali-gold/60" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-diwali-gold/60" />

                {/* Satin Ribbons Crossing Box */}
                <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r ${theme.ribbonGradient} shadow-md opacity-90`} />
                <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b ${theme.ribbonGradient} shadow-md opacity-90`} />

                {/* Golden Wax Seal Centerpiece */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-diwali-goldLight via-diwali-gold to-diwali-amber border-2 border-white/60 shadow-[0_0_25px_rgba(212,175,55,0.7)] flex flex-col items-center justify-center text-diwali-navy group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🪔</span>
                  <span className="text-[9px] font-serif font-black tracking-widest uppercase">SHUBH</span>
                </div>

                {/* Gift Tag Card */}
                <div className={`absolute bottom-5 right-5 px-3 py-1.5 rounded-xl border ${theme.tagColor} shadow-lg text-left -rotate-6 transform group-hover:rotate-0 transition-transform`}>
                  <div className="text-[9px] uppercase tracking-wider opacity-80">To:</div>
                  <div className="text-xs font-bold truncate max-w-[120px]">{recipient || "Beloved One"}</div>
                </div>
              </div>

              {/* Unbox CTA */}
              <button
                onClick={handleOpenBox}
                className="mt-8 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(255,181,71,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                <span>Tap to Untie & Open Mithai Box</span>
              </button>
            </div>
          ) : (
            /* OPENED BOX STATE SHOWING SWEETS & PERSONAL CARD */
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4 animate-fade-in">
              {/* Left Column: The Open Mithai Box */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div
                  className={`w-full max-w-md rounded-3xl bg-gradient-to-br ${theme.boxBg} border-2 ${theme.boxBorder} ${theme.boxShadow} p-5 sm:p-6`}
                >
                  {/* Ornate Gold Inner Rim */}
                  <div className="border border-diwali-gold/30 rounded-2xl p-4 bg-black/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-diwali-gold/20 text-xs">
                      <span className="font-serif font-bold text-diwali-goldLight flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
                        <span>Shubh Deepavali Assortment</span>
                      </span>
                      <span className="text-[10px] text-diwali-lavender">
                        {sweets.length} Sweets Selected
                      </span>
                    </div>

                    {/* 6-Compartment Tray Grid (2 rows x 3 cols) */}
                    <div className="grid grid-cols-3 gap-3">
                      {Array.from({ length: 6 }).map((_, idx) => {
                        const sweetId = sweets[idx];
                        const sweetMeta = sweetId ? MITHAI_MENU.find((s) => s.id === sweetId) : null;

                        return (
                          <div
                            key={idx}
                            className={`aspect-square rounded-2xl ${theme.compartmentBg} border ${theme.compartmentBorder} p-2 flex flex-col items-center justify-center relative shadow-inner group transition-transform duration-300 hover:scale-105`}
                          >
                            {/* Gold Pleated Cup Rim Pattern */}
                            <div className="absolute inset-1 rounded-xl border border-diwali-gold/15 pointer-events-none" />

                            {sweetMeta ? (
                              <>
                                <SweetVisual id={sweetMeta.id} size="sm" />
                                <span className="text-[10px] font-medium text-diwali-ivory mt-1 truncate max-w-[80px]">
                                  {sweetMeta.name}
                                </span>
                              </>
                            ) : (
                              <div className="text-center opacity-30 text-[10px] text-diwali-lavender">
                                <span>Slot {idx + 1}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {!isRecipientView && (
                  <button
                    onClick={() => setIsOpenBox(false)}
                    className="mt-4 text-xs text-diwali-lavender hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>View Closed Box Ribbon Again</span>
                  </button>
                )}
              </div>

              {/* Right Column: Personal Festive Card */}
              <div className="lg:col-span-5 flex flex-col items-stretch text-left">
                <div className="p-6 rounded-3xl bg-gradient-to-b from-diwali-purple/25 via-diwali-surface to-diwali-midnight border border-diwali-gold/30 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-diwali-gold/10 rounded-bl-full pointer-events-none" />

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-diwali-gold/15 border border-diwali-gold/30 text-[11px] font-semibold text-diwali-goldLight mb-4">
                    <Heart className="w-3.5 h-3.5 text-diwali-crimson fill-current" />
                    <span>Personal Festive Blessing</span>
                  </div>

                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-diwali-lavender block">
                      Dedicated To:
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-diwali-ivory">
                      {recipient || "Beloved One"}
                    </h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-diwali-midnight/60 border border-white/5 mb-4">
                    <p className="text-xs sm:text-sm text-diwali-ivory leading-relaxed italic font-light">
                      &ldquo;{message || "Wishing that this auspicious festival fills your days with celestial sweets, boundless laughter, and eternal abundance!"}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2 border-t border-diwali-gold/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-diwali-lavender block">
                        With Warmth & Love:
                      </span>
                      <span className="text-sm font-bold text-diwali-goldLight">
                        {sender || "Your Well-Wisher"}
                      </span>
                    </div>
                    <span className="text-2xl">🪔</span>
                  </div>
                </div>

                {/* Share CTAs */}
                <div className="mt-5 flex flex-col gap-2.5">
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Share on WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="w-full py-3 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-diwali-gold/40 text-diwali-goldLight hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Link Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Shareable Gift Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

