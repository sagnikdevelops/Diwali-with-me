"use client";

import React, { useState, useEffect } from "react";
import { X, Flame, Sparkles, Check, Share2, AlertCircle } from "lucide-react";
import { DiyaVisual, DiyaColorStyle } from "./DiyaVisual";
import { audioSynth } from "@/lib/audio-synth";
import { copyToClipboard } from "@/lib/utils";

export interface LitDiyaData {
  id: string;
  name: string;
  message: string;
  style: DiyaColorStyle;
  isPublic: boolean;
  createdAt: number;
}

interface DiyaLightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiyaLit: (data: LitDiyaData) => void;
}

const STYLES: { id: DiyaColorStyle; label: string; previewColor: string }[] = [
  { id: "terracotta", label: "Classic Terracotta", previewColor: "#A84218" },
  { id: "brass", label: "Royal Brass Gold", previewColor: "#D4AF37" },
  { id: "peacock", label: "Peacock Blue", previewColor: "#0D6E6E" },
  { id: "rose", label: "Rose Quartz", previewColor: "#A33B58" },
  { id: "amethyst", label: "Amethyst Violet", previewColor: "#592E83" },
];

export function DiyaLightModal({ isOpen, onClose, onDiyaLit }: DiyaLightModalProps) {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<DiyaColorStyle>("terracotta");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isLighting, setIsLighting] = useState<boolean>(false);
  const [flameIgnited, setFlameIgnited] = useState<boolean>(false);
  const [justLit, setJustLit] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyFailed, setCopyFailed] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setFlameIgnited(false);
      setIsLighting(false);
      setJustLit(false);
      setCopied(false);
      setCopyFailed(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLightDiya = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLighting(true);
    setFlameIgnited(false);
    audioSynth.playDiyaLight();

    // Flame ignites at exact moment match strikes (~220ms)
    setTimeout(() => {
      setFlameIgnited(true);
    }, 220);

    const newDiya: LitDiyaData = {
      id: "diya-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      name: name.trim().slice(0, 30),
      message: message.trim().slice(0, 140),
      style: selectedStyle,
      isPublic: isPublic,
      createdAt: Date.now(),
    };

    setTimeout(() => {
      setIsLighting(false);
      setJustLit(true);
      onDiyaLit(newDiya);
    }, 1800);
  };

  const handleShare = async () => {
    const text = `I just lit a digital Diya for Diwali! 🪔✨ Light your own diya and spread the light: ${window.location.origin}`;
    setCopyFailed(false);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Lit a Diwali Diya",
          text: text,
          url: window.location.origin,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-diwali-navy/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-gradient-to-b from-diwali-surface to-diwali-midnight border border-diwali-gold/40 rounded-3xl p-6 shadow-2xl text-diwali-ivory">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-diwali-lavender hover:text-white rounded-full hover:bg-diwali-surfaceLight transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!justLit ? (
          <div>
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs text-diwali-goldLight mb-2">
                <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
                <span>Sacred Festive Ritual</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-diwali-ivory">
                Light Your Digital Diya
              </h2>
              <p className="text-xs text-diwali-lavender mt-1">
                Dedicate a flame of peace, health, and joy for someone you love.
              </p>
            </div>

            {/* Live Diya Preview */}
            <div className="flex flex-col items-center justify-center my-4 py-4 bg-diwali-navy/60 rounded-2xl border border-white/5 relative overflow-hidden">
              <DiyaVisual styleName={selectedStyle} isLit={flameIgnited} size="lg" />
              {!flameIgnited && !isLighting && (
                <span className="text-[10px] text-diwali-lavender/70 mt-2 font-mono">
                  Select craft style below • Click to ignite
                </span>
              )}
              {isLighting && !flameIgnited && (
                <span className="text-[10px] text-diwali-goldLight mt-2 animate-pulse font-mono">
                  Striking festive match...
                </span>
              )}
              {isLighting && flameIgnited && (
                <span className="text-[10px] text-diwali-amber mt-2 font-bold animate-bounce">
                  ✨ Sacred Flame Ignited!
                </span>
              )}
            </div>

            <form onSubmit={handleLightDiya} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="diya-name-input" className="block text-xs font-medium text-diwali-lavender mb-1">
                  Your Name or Family Name <span className="text-diwali-gold">*</span>
                </label>
                <input
                  id="diya-name-input"
                  type="text"
                  required
                  maxLength={30}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-sm text-diwali-ivory placeholder-diwali-lavender/50 transition-colors"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="diya-message-input" className="block text-xs font-medium text-diwali-lavender mb-1">
                  Festive Wish or Dedication (Optional)
                </label>
                <textarea
                  id="diya-message-input"
                  maxLength={140}
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Wishing eternal light, love, and laughter to all!"
                  className="w-full px-3.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory placeholder-diwali-lavender/50 resize-none transition-colors"
                />
              </div>

              {/* Diya Style Picker */}
              <div>
                <label className="block text-xs font-medium text-diwali-lavender mb-2">
                  Choose Diya Craft Style
                </label>
                <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Diya Craft Style">
                  {STYLES.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      role="radio"
                      aria-checked={selectedStyle === st.id}
                      onClick={() => setSelectedStyle(st.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        selectedStyle === st.id
                          ? "border-diwali-gold bg-diwali-gold/20 scale-105"
                          : "border-white/10 hover:border-white/30 bg-diwali-surface"
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: st.previewColor }}
                      />
                      <span className="text-[10px] text-diwali-lavender truncate w-full text-center">
                        {st.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy & Opt-in Consent */}
              <div className="pt-2">
                <label htmlFor="diya-consent-checkbox" className="flex items-start gap-2.5 cursor-pointer text-left">
                  <input
                    id="diya-consent-checkbox"
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="mt-0.5 rounded border-diwali-gold/40 text-diwali-gold focus:ring-0 accent-diwali-gold"
                  />
                  <span className="text-[11px] text-diwali-lavender leading-tight">
                    Display my Diya on the global <strong className="text-diwali-ivory">Celebration Wall of Light</strong> (synced live worldwide so all devotees can see it; no personal contact data collected).
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLighting || !name.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-semibold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(255,181,71,0.6)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Flame className={`w-4 h-4 text-diwali-crimson fill-current ${isLighting ? "animate-bounce" : ""}`} />
                <span>{isLighting ? "Igniting Auspicious Flame..." : "Light My Diya"}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-diwali-gold/20 border border-diwali-gold/50 flex items-center justify-center mx-auto mb-4 text-diwali-goldLight animate-bounce">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-diwali-goldLight mb-2">
              Your Diya is Shining!
            </h3>
            <p className="text-sm text-diwali-ivory mb-1">
              Thank you, <span className="font-semibold text-diwali-goldLight">{name}</span>.
            </p>
            <p className="text-xs text-diwali-lavender mb-6">
              May the warm glow of your lamp inspire peace and happiness.
            </p>

            <div className="flex justify-center my-4 py-4 bg-diwali-navy/80 rounded-2xl border border-diwali-gold/30">
              <DiyaVisual styleName={selectedStyle} isLit={true} size="xl" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 px-4 rounded-xl bg-diwali-surfaceLight hover:bg-diwali-surface border border-diwali-gold/40 text-xs font-medium text-diwali-ivory flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Link Copied!</span>
                  </>
                ) : copyFailed ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-diwali-crimson" />
                    <span className="text-diwali-crimson font-semibold">Copy Failed</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-diwali-gold" />
                    <span>Share the Light</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-diwali-gold text-diwali-navy font-semibold text-xs hover:bg-diwali-goldLight transition-colors"
              >
                View on Wall
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

