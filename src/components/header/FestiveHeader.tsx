"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Sparkles,
  Menu,
  X,
  Palette,
  Mail,
  Camera,
  Send,
  Gift,
  Package,
  HelpCircle,
  Volume2,
  VolumeX,
} from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

interface FestiveHeaderProps {
  onOpenSurprise: () => void;
  onOpenSweetModal: () => void;
  sweetChoice: string | null;
  onQuickLightDiya?: () => void;
}

const NAV_ITEMS = [
  { href: "#wall-of-light", label: "Wall of Light", icon: Flame },
  { href: "#rangoli-studio", label: "Rangoli", icon: Palette },
  { href: "#greeting-creator", label: "Greetings", icon: Mail },
  { href: "#photo-greeting", label: "Photo", icon: Camera },
  { href: "#mithai-box", label: "Mithai Box", icon: Package },
  { href: "#fireworks", label: "Fireworks", icon: Sparkles },
  { href: "#sky-lanterns", label: "Lanterns", icon: Send },
  { href: "#mystery-gift", label: "Gift", icon: Gift },
  { href: "#festive-quiz", label: "Quiz", icon: HelpCircle },
];

export function FestiveHeader({
  onOpenSurprise,
  onOpenSweetModal,
  sweetChoice,
  onQuickLightDiya,
}: FestiveHeaderProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDiyaHovered, setIsDiyaHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
      }

      // Detect active section
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    audioSynth.playDiyaChime();
  };

  const getSweetBadge = () => {
    if (!sweetChoice) {
      return { label: "Pick Sweet", emoji: "🍬", note: "Choose" };
    }
    if (sweetChoice === "kaju-katli") {
      return { label: "Kaju Katli", emoji: "💎", note: "Royal" };
    }
    if (sweetChoice === "soan-papdi") {
      return { label: "Soan Papdi", emoji: "🎁", note: "Legendary" };
    }
    return { label: "Both Sweets", emoji: "✨", note: "Connoisseur" };
  };

  const sweetBadge = getSweetBadge();

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-diwali-navy/92 backdrop-blur-xl border-b border-diwali-gold/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-diwali-navy/90 via-diwali-navy/60 to-transparent backdrop-blur-md border-b border-diwali-gold/15"
      }`}
    >
      {/* Top Gold Scroll Progress Bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-goldLight transition-all duration-150 shadow-[0_0_8px_#FFB547]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          onMouseEnter={() => setIsDiyaHovered(true)}
          onMouseLeave={() => setIsDiyaHovered(false)}
          className="flex items-center gap-2 group focus:outline-none shrink-0"
          title="Shubh Deepavali"
        >
          {/* Glowing Diya Emblem */}
          <div className="relative flex items-center justify-center">
            <div
              className={`absolute -inset-1 rounded-full blur-md transition-all duration-300 ${
                isDiyaHovered
                  ? "bg-diwali-amber/70 scale-125"
                  : "bg-diwali-gold/35 scale-100"
              }`}
            />
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-diwali-purple via-diwali-midnight to-diwali-surface border border-diwali-gold/60 flex items-center justify-center shadow-md">
              <Flame
                className={`w-4 h-4 text-diwali-amber fill-current transition-all duration-300 ${
                  isDiyaHovered ? "scale-110 drop-shadow-[0_0_8px_#FFE27B]" : ""
                }`}
              />
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col text-left">
            <span className="font-serif font-black text-sm tracking-wide leading-none text-transparent bg-clip-text bg-gradient-to-r from-diwali-ivory via-diwali-goldLight to-diwali-gold group-hover:from-white group-hover:to-diwali-amber transition-colors">
              Shubh Deepavali
            </span>
            <span className="hidden sm:block text-[9px] text-diwali-lavender/80 tracking-[0.15em] uppercase font-light mt-0.5">
              Festival of Lights
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 text-xs font-medium text-diwali-lavender">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => audioSynth.playSubtleClick()}
                className={`relative px-2.5 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-1 group ${
                  isActive
                    ? "text-diwali-goldLight bg-diwali-gold/15 border border-diwali-gold/35 font-semibold"
                    : "hover:text-white hover:bg-diwali-surface/50 border border-transparent"
                }`}
              >
                <Icon
                  className={`w-3 h-3 shrink-0 ${
                    isActive ? "text-diwali-gold" : "text-diwali-lavender group-hover:text-diwali-goldLight"
                  }`}
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Sweet Choice Pill */}
          <button
            onClick={() => {
              audioSynth.playGiftReveal();
              onOpenSweetModal();
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-diwali-surface/80 hover:bg-diwali-surfaceLight border border-diwali-gold/30 hover:border-diwali-gold/60 text-diwali-ivory text-xs transition-all group cursor-pointer"
            title="Change sweet preference"
          >
            <span className="text-sm group-hover:scale-125 transition-transform">{sweetBadge.emoji}</span>
            <span className="hidden md:inline font-semibold text-diwali-goldLight text-[11px]">{sweetBadge.label}</span>
          </button>

          {/* Surprise Button */}
          <button
            onClick={() => {
              audioSynth.playGiftReveal();
              onOpenSurprise();
            }}
            className="relative px-3 py-1.5 rounded-full bg-gradient-to-r from-diwali-purple via-diwali-gold to-diwali-amber text-diwali-navy font-black text-xs shadow-[0_0_14px_rgba(212,175,55,0.35)] hover:shadow-[0_0_22px_rgba(255,181,71,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1 group cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <Sparkles className="w-3 h-3 text-diwali-navy fill-current" />
            <span>Surprise</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              audioSynth.playSubtleClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 text-diwali-lavender hover:text-white rounded-lg bg-diwali-surface/60 border border-white/10 hover:border-diwali-gold/40 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-diwali-gold" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="lg:hidden bg-diwali-midnight/98 border-b border-diwali-gold/30 backdrop-blur-2xl px-4 py-4 shadow-2xl animate-in slide-in-from-top-4 duration-200"
        >
          <div className="grid grid-cols-2 gap-2 mb-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    audioSynth.playSubtleClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl border flex items-center gap-2 transition-all text-xs ${
                    isActive
                      ? "bg-diwali-gold/25 border-diwali-gold text-diwali-goldLight font-bold"
                      : "bg-diwali-surface/60 border-white/5 text-diwali-ivory hover:bg-diwali-surface hover:border-diwali-gold/30"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-diwali-gold shrink-0" />
                  <span className="truncate">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Quick Actions */}
          <div className="flex gap-2 pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSweetModal();
              }}
              className="flex-1 py-2.5 rounded-xl bg-diwali-surface border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight flex items-center justify-center gap-1.5"
            >
              <span>{sweetBadge.emoji}</span>
              <span>Change Sweet</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSurprise();
              }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-diwali-gold to-diwali-amber text-diwali-navy font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Surprise</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
