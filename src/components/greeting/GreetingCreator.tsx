"use client";

import React, { useState, useRef } from "react";
import { RoyalTraditional } from "./templates/RoyalTraditional";
import { MinimalElegant } from "./templates/MinimalElegant";
import { GoldenLuxury } from "./templates/GoldenLuxury";
import { ColourfulFamily } from "./templates/ColourfulFamily";
import { ModernFestive } from "./templates/ModernFestive";
import { SpiritualSerene } from "./templates/SpiritualSerene";
import { AiGreetingModal } from "./AiGreetingModal";
import { encodeGreetingData, ShareableGreetingData } from "@/lib/share-codec";
import { toPng } from "html-to-image";
import {
  Sparkles,
  Download,
  Share2,
  Copy,
  Check,
  Wand2,
  Send,
  MessageCircle,
} from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

type TemplateType = "royal" | "minimal" | "gold" | "family" | "modern" | "spiritual";

const TEMPLATES: { id: TemplateType; name: string; tag: string }[] = [
  { id: "royal", name: "Royal Traditional", tag: "Mughal Arch & Brass" },
  { id: "minimal", name: "Minimal Elegant", tag: "Clean Charcoal Line" },
  { id: "gold", name: "Golden Luxury", tag: "Velvet Foil & Dust" },
  { id: "family", name: "Colourful Family", tag: "Vibrant Sweets Joy" },
  { id: "modern", name: "Modern Festive", tag: "Cyan Neon Glass" },
  { id: "spiritual", name: "Spiritual Serene", tag: "Sacred Shloka & Lotus" },
];

export function GreetingCreator() {
  const [template, setTemplate] = useState<TemplateType>("royal");
  const [recipient, setRecipient] = useState<string>("Priya & Family");
  const [sender, setSender] = useState<string>("Aarav");
  const [message, setMessage] = useState<string>(
    "May the sacred glow of diyas illuminate your home with good health, unshakeable peace, and golden prosperity this Diwali."
  );
  const [blessing, setBlessing] = useState<string>("Shubh Deepavali!");

  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Download Card as PNG
  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    audioSynth.playDiyaChime();

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High resolution
      });
      const link = document.createElement("a");
      link.download = `diwali-greeting-${recipient.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export image:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Generate Unique Share URL
  const getShareUrl = (): string => {
    const greetingPayload: ShareableGreetingData = {
      recipient,
      sender,
      message,
      template,
      blessing,
      createdAt: Date.now(),
    };
    const code = encodeGreetingData(greetingPayload);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/share?data=${code}`;
  };

  // Share via Web Share API
  const handleShare = async () => {
    const shareUrl = getShareUrl();
    const shareText = `🪔 A personalised Diwali greeting card for ${recipient} from ${sender}!\nOpen your card here: ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Diwali Greeting for ${recipient}`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // Fallback to clipboard
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    const shareUrl = getShareUrl();
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsApp = () => {
    const shareUrl = getShareUrl();
    const text = encodeURIComponent(
      `🪔 *Shubh Deepavali!*\nDearest ${recipient}, I created a personalised festive Diwali card for you.\n\nOpen your card here:\n${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const renderActiveCard = () => {
    const props = { recipient, sender, message, blessing };
    switch (template) {
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
    <section id="greeting-creator" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-3">
          <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
          <span>Festive Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-diwali-ivory mb-3">
          Personalised Greeting Creator
        </h2>
        <p className="text-sm sm:text-base text-diwali-lavender">
          Choose from six handcrafted royal themes, customize your blessings, or let our AI copywriter compose words straight from the heart.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form Column */}
        <div className="lg:col-span-6 space-y-6 bg-gradient-to-b from-diwali-surface to-diwali-midnight/90 border border-diwali-gold/30 rounded-3xl p-6 sm:p-7 shadow-xl text-diwali-ivory">
          {/* Template Style Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-diwali-goldLight uppercase tracking-wider">
                1. Select Card Theme (6 Distinct Styles)
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setTemplate(tmpl.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    template === tmpl.id
                      ? "border-diwali-gold bg-diwali-gold/20 shadow-md shadow-diwali-gold/20 scale-[1.02]"
                      : "border-white/10 hover:border-white/20 bg-diwali-surface/60 text-diwali-lavender"
                  }`}
                >
                  <p className="text-xs font-bold text-diwali-ivory">{tmpl.name}</p>
                  <p className="text-[10px] text-diwali-lavender mt-0.5">{tmpl.tag}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 pt-2 border-t border-diwali-gold/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Recipient */}
              <div>
                <label className="block text-xs font-medium text-diwali-lavender mb-1">
                  Recipient Name <span className="text-diwali-gold">*</span>
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Grandma, Rohit & Riya"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory"
                />
              </div>

              {/* Sender */}
              <div>
                <label className="block text-xs font-medium text-diwali-lavender mb-1">
                  Sender Name <span className="text-diwali-gold">*</span>
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g. Aarav, The Mehtas"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory"
                />
              </div>
            </div>

            {/* Custom Message & AI Trigger */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-diwali-lavender">
                  Festive Message
                </label>
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="text-xs text-diwali-goldLight hover:text-white font-medium flex items-center gap-1.5 transition-colors px-2 py-0.5 rounded-lg bg-diwali-purple/40 border border-diwali-gold/30"
                >
                  <Wand2 className="w-3.5 h-3.5 text-diwali-amber" />
                  <span>AI Copywriter</span>
                </button>
              </div>
              <textarea
                rows={3}
                maxLength={300}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt festive wish..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory resize-none leading-relaxed"
              />
            </div>

            {/* Blessing Subtitle */}
            <div>
              <label className="block text-xs font-medium text-diwali-lavender mb-1">
                Short Blessing or Sanskrit Shloka
              </label>
              <input
                type="text"
                maxLength={60}
                value={blessing}
                onChange={(e) => setBlessing(e.target.value)}
                placeholder="e.g. Shubh Deepavali! / Tamaso Ma Jyotirgamaya"
                className="w-full px-3.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-diwali-gold/20 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Download PNG */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 py-3 rounded-2xl bg-diwali-gold hover:bg-diwali-goldLight text-diwali-navy font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-diwali-gold/20"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? "Rasterizing PNG..." : "Download High-Res PNG"}</span>
              </button>

              {/* Share Native */}
              <button
                onClick={handleShare}
                className="flex-1 py-3 rounded-2xl bg-diwali-surfaceLight hover:bg-diwali-surface border border-diwali-gold/40 text-xs font-bold text-diwali-ivory transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-diwali-gold" />
                <span>Share Card</span>
              </button>
            </div>

            {/* Quick Share: WhatsApp & Copy Link */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleWhatsApp}
                className="py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Send on WhatsApp</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="py-2.5 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-white/10 text-[11px] font-semibold text-diwali-lavender flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied!" : "Copy Greeting Link"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Card Preview Column */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="text-center mb-3">
            <span className="text-xs uppercase tracking-widest text-diwali-goldLight font-medium">
              Live Card Preview
            </span>
          </div>

          {/* Render target for html-to-image */}
          <div className="w-full flex justify-center p-2 sm:p-4 rounded-3xl bg-diwali-navy/60 border border-diwali-gold/20 backdrop-blur-sm shadow-2xl">
            <div ref={cardRef} className="w-full max-w-sm">
              {renderActiveCard()}
            </div>
          </div>

          <p className="text-[11px] text-diwali-lavender/70 mt-3 text-center">
            Cards are rendered natively as vector elements and exported directly as crisp PNG files.
          </p>
        </div>
      </div>

      {/* AI Generator Modal */}
      <AiGreetingModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialRecipient={recipient}
        onApplyGreeting={(msg, bls) => {
          setMessage(msg);
          if (bls) setBlessing(bls);
        }}
      />
    </section>
  );
}

