"use client";

import React, { useState } from "react";
import { Sparkles, Send, Check, Share2, Flame } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

export interface SkyLanternData {
  id: string;
  name: string;
  wish: string;
  color: "amber" | "saffron" | "rose" | "emerald";
  isPublic: boolean;
  createdAt: number;
}

interface SkyLanternsProps {
  onLanternReleased: (lantern: SkyLanternData) => void;
}

const LANTERN_COLORS: { id: SkyLanternData["color"]; label: string; glow: string; hex: string }[] = [
  { id: "amber", label: "Golden Amber", glow: "rgba(255, 181, 71, 0.6)", hex: "#FFB547" },
  { id: "saffron", label: "Saffron Peace", glow: "rgba(255, 140, 0, 0.6)", hex: "#FF8C00" },
  { id: "rose", label: "Rose Harmony", glow: "rgba(229, 117, 147, 0.6)", hex: "#E57593" },
  { id: "emerald", label: "Emerald Hope", glow: "rgba(46, 196, 182, 0.6)", hex: "#2EC4B6" },
];

export function SkyLanterns({ onLanternReleased }: SkyLanternsProps) {
  const [name, setName] = useState<string>("");
  const [wish, setWish] = useState<string>("");
  const [color, setColor] = useState<SkyLanternData["color"]>("amber");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isReleasing, setIsReleasing] = useState<boolean>(false);
  const [hasReleased, setHasReleased] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;

    setIsReleasing(true);
    audioSynth.playLanternShimmer();

    const newLantern: SkyLanternData = {
      id: "lantern-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      name: name.trim().slice(0, 30) || "Anonymous Soul",
      wish: wish.trim().slice(0, 140),
      color: color,
      isPublic: isPublic,
      createdAt: Date.now(),
    };

    setTimeout(() => {
      setIsReleasing(false);
      setHasReleased(true);
      onLanternReleased(newLantern);
    }, 2000);
  };

  const handleShare = () => {
    const text = `I just released a Diwali Sky Lantern with a wish for peace! 🏮✨ Release yours here: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ title: "Diwali Sky Lantern", text, url: window.location.origin }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeColorConfig = LANTERN_COLORS.find((c) => c.id === color) || LANTERN_COLORS[0];

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-diwali-surface via-diwali-midnight to-diwali-navy border border-diwali-gold/30 p-6 sm:p-8 shadow-2xl text-diwali-ivory overflow-hidden">
      {/* Background Star Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 left-12 w-1 h-1 bg-white rounded-full animate-ping" />
        <div className="absolute top-20 right-16 w-1.5 h-1.5 bg-diwali-goldLight rounded-full animate-pulse" />
        <div className="absolute bottom-16 left-1/4 w-1 h-1 bg-white rounded-full" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Form */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-3">
            <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
            <span>Digital Akash Kandil</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-diwali-ivory mb-2">
            Release a Sky Lantern
          </h3>
          <p className="text-xs sm:text-sm text-diwali-lavender mb-6 leading-relaxed">
            Write your heartfelt prayer or wish for the world, ignite the paper lantern with warm intentions, and watch it ascend into the celestial night sky.
          </p>

          {!hasReleased ? (
            <form onSubmit={handleRelease} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-diwali-lavender mb-1">
                  Your Wish or Blessing for the World <span className="text-diwali-gold">*</span>
                </label>
                <textarea
                  required
                  maxLength={140}
                  rows={2}
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="e.g. May every family find peace, shelter, and reason to smile this year..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory placeholder-diwali-lavender/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-diwali-lavender mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav, or leave blank for Anonymous"
                  className="w-full px-3.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory placeholder-diwali-lavender/50"
                />
              </div>

              {/* Lantern Color Style */}
              <div>
                <label className="block text-xs font-medium text-diwali-lavender mb-2">
                  Lantern Paper Glow
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {LANTERN_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColor(c.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        color === c.id
                          ? "border-diwali-gold bg-diwali-gold/20 scale-105"
                          : "border-white/10 hover:border-white/30 bg-diwali-surface"
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] text-diwali-lavender truncate w-full text-center">
                        {c.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer text-left">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="mt-0.5 rounded border-diwali-gold/40 text-diwali-gold focus:ring-0 accent-diwali-gold"
                  />
                  <span className="text-[11px] text-diwali-lavender leading-tight">
                    Display my wish in the community <strong className="text-diwali-ivory">Wish Wall</strong>.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isReleasing || !wish.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(255,181,71,0.6)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Flame className={`w-4 h-4 text-diwali-crimson fill-current ${isReleasing ? "animate-bounce" : ""}`} />
                <span>{isReleasing ? "Ascending Into The Heavens..." : "Release Sky Lantern"}</span>
              </button>
            </form>
          ) : (
            /* Confirmation */
            <div className="py-4 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                <Check className="w-4 h-4" />
                <span>Lantern Released Successfully</span>
              </div>
              <h4 className="text-xl font-serif font-bold text-diwali-goldLight mb-1">
                Your Wish Ascends!
              </h4>
              <p className="text-xs text-diwali-lavender mb-6">
                May your prayers be carried upon the gentle winds and bring peace to the cosmos.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleShare}
                  className="py-2.5 px-4 rounded-xl bg-diwali-surfaceLight hover:bg-diwali-surface border border-diwali-gold/40 text-xs font-medium text-diwali-ivory flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-diwali-gold" />
                  <span>{copied ? "Link Copied!" : "Share the Magic"}</span>
                </button>

                <button
                  onClick={() => {
                    setHasReleased(false);
                    setWish("");
                  }}
                  className="py-2.5 px-4 rounded-xl bg-diwali-gold text-diwali-navy font-bold text-xs hover:bg-diwali-goldLight transition-colors"
                >
                  Release Another Lantern
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Animated Lantern Display */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center min-h-[280px]">
          <div
            className={`relative flex flex-col items-center transition-all duration-1000 ${
              isReleasing ? "-translate-y-32 opacity-20 scale-75" : "translate-y-0 opacity-100 scale-100"
            }`}
          >
            {/* Lantern Aura Glow */}
            <div
              className="absolute -inset-4 rounded-full blur-2xl animate-pulse pointer-events-none"
              style={{ backgroundColor: activeColorConfig.glow }}
            />

            {/* Lantern Body SVG */}
            <svg viewBox="0 0 100 140" className="w-32 h-44 drop-shadow-2xl">
              {/* Paper cylinder */}
              <path
                d="M20,20 Q50,15 80,20 L88,110 Q50,120 12,110 Z"
                fill={activeColorConfig.hex}
                opacity="0.85"
                stroke="#FFE27B"
                strokeWidth="1.5"
              />
              {/* Interior Flame */}
              <circle cx="50" cy="95" r="10" fill="#FFF6E5" className="animate-pulse" />
              <path
                d="M50,75 Q56,90 50,105 Q44,90 50,75"
                fill="#FF8C00"
                className="animate-flame-flicker"
              />
              {/* Base ring */}
              <ellipse cx="50" cy="115" rx="38" ry="6" fill="#782E0E" stroke="#D4AF37" strokeWidth="1" />
            </svg>

            {/* Live Wish label on lantern */}
            <div className="absolute top-12 inset-x-4 text-center px-1">
              <p className="text-[10px] font-serif font-bold text-diwali-navy line-clamp-3 leading-tight opacity-90">
                {wish || "May peace and health illuminate all beings"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
