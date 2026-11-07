"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { decodeGreetingData, ShareableGreetingData } from "@/lib/share-codec";
import { RoyalTraditional } from "@/components/greeting/templates/RoyalTraditional";
import { MinimalElegant } from "@/components/greeting/templates/MinimalElegant";
import { GoldenLuxury } from "@/components/greeting/templates/GoldenLuxury";
import { ColourfulFamily } from "@/components/greeting/templates/ColourfulFamily";
import { ModernFestive } from "@/components/greeting/templates/ModernFestive";
import { SpiritualSerene } from "@/components/greeting/templates/SpiritualSerene";
import { DiyaVisual } from "@/components/diya/DiyaVisual";
import { AudioBar } from "@/components/audio/AudioBar";
import { FestiveFooter } from "@/components/footer/FestiveFooter";
import { Sparkles, Flame, Share2, Copy, Check, ArrowRight, Home, AlertCircle } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";

function ShareViewerContent() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");

  const [greeting, setGreeting] = useState<ShareableGreetingData | null>(null);
  const [isInvalidLink, setIsInvalidLink] = useState<boolean>(false);
  const [hasLitResponseDiya, setHasLitResponseDiya] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyFailed, setCopyFailed] = useState<boolean>(false);

  useEffect(() => {
    if (dataParam !== null && dataParam !== "") {
      const decoded = decodeGreetingData(dataParam);
      if (decoded) {
        setGreeting(decoded);
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
    }
  }, [dataParam]);

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

      {/* Main Greeting Card Display or Invalid Link State */}
      <main className="relative z-10 w-full max-w-md flex flex-col items-center my-auto">
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

