"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { decodeGreetingData, decodeMithaiBoxData, ShareableGreetingData, ShareableMithaiBoxData } from "@/lib/share-codec";
import { RoyalTraditional } from "@/components/greeting/templates/RoyalTraditional";
import { MinimalElegant } from "@/components/greeting/templates/MinimalElegant";
import { GoldenLuxury } from "@/components/greeting/templates/GoldenLuxury";
import { ColourfulFamily } from "@/components/greeting/templates/ColourfulFamily";
import { ModernFestive } from "@/components/greeting/templates/ModernFestive";
import { SpiritualSerene } from "@/components/greeting/templates/SpiritualSerene";
import { DiyaVisual } from "@/components/diya/DiyaVisual";
import { SweetVisual } from "@/components/mithai/SweetVisual";
import { BOX_THEMES, MITHAI_MENU } from "@/components/mithai/types";
import { AudioBar } from "@/components/audio/AudioBar";
import { FestiveFooter } from "@/components/footer/FestiveFooter";
import { Sparkles, Flame, Share2, Copy, Check, ArrowRight, Home, AlertCircle, Gift, Heart, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { audioSynth } from "@/lib/audio-synth";
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";

function ShareViewerContent() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");
  const boxParam = searchParams.get("box");

  const [greeting, setGreeting] = useState<ShareableGreetingData | null>(null);
  const [mithaiBox, setMithaiBox] = useState<ShareableMithaiBoxData | null>(null);
  const [isBoxOpened, setIsBoxOpened] = useState<boolean>(false);
  const [isInvalidLink, setIsInvalidLink] = useState<boolean>(false);
  const [hasLitResponseDiya, setHasLitResponseDiya] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyFailed, setCopyFailed] = useState<boolean>(false);

  useEffect(() => {
    if (boxParam !== null && boxParam !== "") {
      const decodedBox = decodeMithaiBoxData(boxParam);
      if (decodedBox) {
        setMithaiBox(decodedBox);
        setGreeting(null);
        setIsInvalidLink(false);
      } else {
        setIsInvalidLink(true);
        setMithaiBox(null);
      }
    } else if (dataParam !== null && dataParam !== "") {
      const decoded = decodeGreetingData(dataParam);
      if (decoded) {
        setGreeting(decoded);
        setMithaiBox(null);
        setIsInvalidLink(false);
      } else {
        // Link parameter is present but invalid/corrupted
        setIsInvalidLink(true);
        setGreeting(null);
      }
    } else {
      // No parameter provided: render sample card preview
      setIsInvalidLink(false);
      setGreeting(null);
      setMithaiBox(null);
    }
  }, [dataParam, boxParam]);

  const activeGreeting: ShareableGreetingData = greeting || {
    recipient: "Dear Friend",
    sender: "A Well-Wisher",
    message: "May the divine brilliance of Diwali illuminate your home with good health, unshakeable peace, and eternal joy.",
    template: "royal",
    blessing: "Shubh Deepavali!",
  };

  const handleLightResponse = () => {
    setHasLitResponseDiya(true);
    audioSynth.playDiyaChime();
  };

  const handleOpenMithaiBox = () => {
    audioSynth.playGiftReveal();
    setIsBoxOpened(true);
    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.55 },
        colors: ["#D4AF37", "#FFB547", "#FFE27B", "#E11D48", "#22C55E"],
      });
    } catch {
      // Ignore
    }
  };

  const handleCopyLink = async () => {
    if (typeof window === "undefined") return;
    setCopyFailed(false);
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 3000);
    }
  };

  const renderCard = () => {
    const props = {
      recipient: activeGreeting.recipient,
      sender: activeGreeting.sender,
      message: activeGreeting.message,
      blessing: activeGreeting.blessing,
    };

    switch (activeGreeting.template) {
      case "royal":
        return <RoyalTraditional {...props} />;
      case "minimal":
        return <MinimalElegant {...props} />;
      case "gold":
        return <GoldenLuxury {...props} />;
      case "family":
        return <ColourfulFamily {...props} />;
      case "modern":
        return <ModernFestive {...props} />;
      case "spiritual":
        return <SpiritualSerene {...props} />;
      default:
        return <RoyalTraditional {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-diwali-navy text-diwali-ivory flex flex-col items-center justify-between p-4 sm:p-8 relative">
      {/* Background Star field */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-diwali-gold animate-ping" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-diwali-amber animate-pulse" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-diwali-goldLight hover:text-white transition-colors px-3 py-1.5 rounded-full bg-diwali-midnight/80 border border-diwali-gold/30"
        >
          <Home className="w-4 h-4" />
          <span>Festival Sanctuary</span>
        </Link>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 text-xs text-diwali-lavender hover:text-diwali-ivory px-3 py-1.5 rounded-full bg-diwali-surface border border-white/10 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-semibold">Link Copied!</span>
            </>
          ) : copyFailed ? (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-diwali-crimson" />
              <span className="text-diwali-crimson font-semibold">Copy Failed</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Card Link</span>
            </>
          )}
        </button>
      </header>

      {/* Main Greeting Card Display, Mithai Box Ceremony, or Invalid Link State */}
      <main className="relative z-10 w-full max-w-xl flex flex-col items-center my-auto">
        {isInvalidLink ? (
          /* QA-03 Invalid Link State */
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-diwali-surface to-diwali-midnight border border-diwali-crimson/40 shadow-2xl text-center space-y-4 my-auto">
            <div className="w-14 h-14 rounded-full bg-diwali-crimson/20 border border-diwali-crimson/40 flex items-center justify-center mx-auto text-diwali-crimson animate-pulse">
              <AlertCircle className="w-8 h-8" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-diwali-crimson/20 border border-diwali-crimson/30 text-xs font-semibold text-diwali-crimson">
              Invalid or Incomplete Link
            </span>

            <h2 className="text-2xl font-serif font-bold text-diwali-ivory">
              Greeting Link Incomplete
            </h2>

            <p className="text-xs sm:text-sm text-diwali-lavender max-w-sm mx-auto leading-relaxed font-light">
              The personalized greeting link you opened appears to be corrupted, truncated, or modified. Don&apos;t worry — you can create a fresh royal Diwali greeting card right now!
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-3 rounded-2xl bg-diwali-gold hover:bg-diwali-goldLight text-diwali-navy font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-diwali-gold/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Fresh Greeting Card</span>
              </Link>

              <button
                onClick={() => setIsInvalidLink(false)}
                className="px-5 py-3 rounded-2xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-white/10 text-xs text-diwali-lavender hover:text-white"
              >
                View Sample Card
              </button>
            </div>
          </div>
        ) : mithaiBox ? (
          /* MITHAI GIFT BOX CEREMONY FOR RECIPIENT */
          <div className="w-full flex flex-col items-center my-auto animate-fade-in">
            {!isBoxOpened ? (
              /* CLOSED BOX WITH SATIN RIBBON & WAX SEAL */
              <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-diwali-surface to-diwali-midnight border border-diwali-gold/40 shadow-2xl text-center space-y-6">
                <div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-diwali-purple/40 border border-diwali-gold/30 text-diwali-goldLight inline-flex items-center gap-1.5 mb-3">
                    <Gift className="w-3.5 h-3.5 text-diwali-amber animate-pulse" />
                    <span>Royal Festive Delivery</span>
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-diwali-ivory">
                    A Royal Mithai Box For You!
                  </h1>
                  <p className="text-xs sm:text-sm text-diwali-lavender mt-1">
                    Carefully curated with warm festive love by <strong className="text-diwali-goldLight">{mithaiBox.sender}</strong>
                  </p>
                </div>

                {/* Box Exterior Container */}
                <div
                  onClick={handleOpenMithaiBox}
                  className={`mx-auto relative w-64 sm:w-72 h-64 sm:h-72 rounded-3xl bg-gradient-to-br ${
                    BOX_THEMES[mithaiBox.boxStyle]?.boxBg || BOX_THEMES["royal-crimson"].boxBg
                  } border-2 ${
                    BOX_THEMES[mithaiBox.boxStyle]?.boxBorder || BOX_THEMES["royal-crimson"].boxBorder
                  } shadow-2xl p-6 flex flex-col items-center justify-center cursor-pointer group hover:scale-[1.03] transition-all duration-300`}
                >
                  <div className="absolute inset-2 rounded-2xl border border-diwali-gold/25 pointer-events-none" />

                  {/* Satin Ribbons */}
                  <div
                    className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 bg-gradient-to-r ${
                      BOX_THEMES[mithaiBox.boxStyle]?.ribbonGradient || BOX_THEMES["royal-crimson"].ribbonGradient
                    } shadow-md opacity-90`}
                  />
                  <div
                    className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 bg-gradient-to-b ${
                      BOX_THEMES[mithaiBox.boxStyle]?.ribbonGradient || BOX_THEMES["royal-crimson"].ribbonGradient
                    } shadow-md opacity-90`}
                  />

                  {/* Golden Wax Seal */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-diwali-goldLight via-diwali-gold to-diwali-amber border-2 border-white/60 shadow-[0_0_25px_rgba(212,175,55,0.7)] flex flex-col items-center justify-center text-diwali-navy group-hover:scale-110 transition-transform">
                    <span className="text-lg">🪔</span>
                    <span className="text-[8px] font-serif font-black tracking-widest uppercase">SHUBH</span>
                  </div>

                  {/* Gift Tag */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-xl bg-black/60 border border-diwali-gold/40 shadow-lg text-left -rotate-6 transform group-hover:rotate-0 transition-transform">
                    <div className="text-[8px] uppercase tracking-wider text-diwali-lavender">To:</div>
                    <div className="text-xs font-bold text-diwali-goldLight truncate max-w-[110px]">
                      {mithaiBox.recipient}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleOpenMithaiBox}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  <span>Tap to Untie Ribbon & Open Box</span>
                </button>
              </div>
            ) : (
              /* OPENED SWEETS TRAY & PERSONAL CARD */
              <div className="w-full space-y-6 animate-fade-in">
                {/* Mithai Tray Box */}
                <div
                  className={`w-full rounded-3xl bg-gradient-to-br ${
                    BOX_THEMES[mithaiBox.boxStyle]?.boxBg || BOX_THEMES["royal-crimson"].boxBg
                  } border-2 ${
                    BOX_THEMES[mithaiBox.boxStyle]?.boxBorder || BOX_THEMES["royal-crimson"].boxBorder
                  } shadow-2xl p-5 sm:p-7 text-center`}
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-diwali-gold/25">
                    <span className="font-serif font-bold text-diwali-goldLight text-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
                      <span>Curated by {mithaiBox.sender}</span>
                    </span>
                    <span className="text-[10px] text-diwali-lavender">
                      {mithaiBox.sweets.length} Festive Sweets
                    </span>
                  </div>

                  {/* 6-slot Sweets Grid */}
                  <div className="border border-diwali-gold/30 rounded-2xl p-4 bg-black/40 backdrop-blur-sm">
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      {mithaiBox.sweets.map((sweetId, sIdx) => {
                        const sweetMeta = MITHAI_MENU.find((s) => s.id === sweetId);
                        return (
                          <div
                            key={sIdx}
                            className={`aspect-square rounded-2xl ${
                              BOX_THEMES[mithaiBox.boxStyle]?.compartmentBg || BOX_THEMES["royal-crimson"].compartmentBg
                            } border ${
                              BOX_THEMES[mithaiBox.boxStyle]?.compartmentBorder ||
                              BOX_THEMES["royal-crimson"].compartmentBorder
                            } p-2 flex flex-col items-center justify-center relative shadow-inner group transition-transform duration-300 hover:scale-105`}
                          >
                            <div className="absolute inset-1 rounded-xl border border-diwali-gold/15 pointer-events-none" />
                            {sweetMeta ? (
                              <>
                                <SweetVisual id={sweetMeta.id} size="sm" />
                                <span className="text-[10px] sm:text-[11px] font-bold text-diwali-ivory mt-1 truncate max-w-full text-center">
                                  {sweetMeta.name}
                                </span>
                              </>
                            ) : (
                              <span className="text-[10px] text-diwali-lavender/50">Festive Sweet</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Personal Letter Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-b from-diwali-purple/25 via-diwali-surface to-diwali-midnight border border-diwali-gold/30 shadow-xl text-left relative overflow-hidden">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-diwali-gold/15 border border-diwali-gold/30 text-[11px] font-semibold text-diwali-goldLight mb-3">
                    <Heart className="w-3.5 h-3.5 text-diwali-crimson fill-current" />
                    <span>Personal Festive Dedication</span>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-diwali-lavender block">
                    To: {mithaiBox.recipient}
                  </span>

                  <p className="text-sm text-diwali-ivory italic leading-relaxed my-3 font-light p-3 rounded-xl bg-black/30 border border-white/5">
                    &ldquo;{mithaiBox.message}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-diwali-gold/15 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-diwali-lavender block">
                        With boundless love & sweetness,
                      </span>
                      <span className="font-bold text-diwali-goldLight text-sm">{mithaiBox.sender}</span>
                    </div>
                    <span className="text-2xl">🪔</span>
                  </div>
                </div>

                {/* Send a Mithai Box Back CTA */}
                <div className="space-y-3">
                  <Link
                    href="/#mithai-box"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Send a Mithai Box Back to {mithaiBox.sender}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/"
                    className="w-full py-3 rounded-2xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight flex items-center justify-center gap-2 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explore Festive Sanctuary (Diyas, Rangoli, Fireworks)</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {!dataParam && (
              <div className="mb-3 px-3.5 py-1 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-[11px] text-diwali-goldLight text-center font-medium">
                Sample Greeting Preview • Create your own below
              </div>
            )}

            <div className="w-full flex justify-center p-2 sm:p-4 rounded-3xl bg-diwali-midnight/60 border border-diwali-gold/30 backdrop-blur-md shadow-2xl mb-6">
              {renderCard()}
            </div>

            {/* Interactive Response: Light a Diya for the Sender */}
            <div className="w-full p-5 rounded-3xl bg-gradient-to-b from-diwali-surface to-diwali-midnight border border-diwali-gold/30 text-center shadow-xl mb-6">
              {!hasLitResponseDiya ? (
                <div>
                  <p className="text-xs font-semibold text-diwali-goldLight mb-1">
                    Touch this flame to send love back to {activeGreeting.sender}
                  </p>
                  <button
                    onClick={handleLightResponse}
                    className="mt-3 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-diwali-gold via-diwali-amber to-diwali-gold text-diwali-navy font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
                  >
                    <Flame className="w-4 h-4 text-diwali-crimson fill-current" />
                    <span>Light a Diya in Return</span>
                  </button>
                </div>
              ) : (
                <div className="animate-in zoom-in-95 duration-300 flex flex-col items-center">
                  <DiyaVisual styleName="brass" isLit={true} size="md" />
                  <p className="text-xs font-bold text-diwali-goldLight mt-2">
                    Your Diya is Shining for {activeGreeting.sender}!
                  </p>
                  <p className="text-[11px] text-diwali-lavender mt-0.5">
                    May your mutual bonds grow ever brighter and stronger.
                  </p>
                </div>
              )}
            </div>

            {/* CTA to Create Own Card */}
            <Link
              href="/"
              className="w-full py-3.5 rounded-2xl bg-diwali-gold hover:bg-diwali-goldLight text-diwali-navy font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Your Own Personalised Greeting</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        )}
      </main>

      {/* Floating Audio Bar */}
      <AudioBar />

      {/* Festive Signature Footer */}
      <FestiveFooter />
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-diwali-navy flex items-center justify-center text-diwali-goldLight">
          Loading Festive Greeting...
        </div>
      }
    >
      <ShareViewerContent />
    </Suspense>
  );
}

