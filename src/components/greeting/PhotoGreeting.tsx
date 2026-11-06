"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, Sparkles, Trash2, ZoomIn, ZoomOut, RotateCcw, Camera, ShieldCheck } from "lucide-react";
import { toPng } from "html-to-image";
import { audioSynth } from "@/lib/audio-synth";

type FrameType = "royal-arch" | "marigold-wreath" | "glowing-diyas" | "velvet-gold";

const FRAMES: { id: FrameType; label: string; preview: string }[] = [
  { id: "royal-arch", label: "Mughal Golden Arch", preview: "#D4AF37" },
  { id: "marigold-wreath", label: "Marigold Floral Garland", preview: "#FF8C00" },
  { id: "glowing-diyas", label: "Illuminated Diyas Border", preview: "#FFB547" },
  { id: "velvet-gold", label: "Royal Velvet Frame", preview: "#54258C" },
];

export function PhotoGreeting() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [frame, setFrame] = useState<FrameType>("royal-arch");
  const [scale, setScale] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>("Our Family & Friends");
  const [sender, setSender] = useState<string>("The Sharmas");
  const [caption, setCaption] = useState<string>("May our smiles shine as bright as our diyas!");
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File Upload Handler (100% Client-Side)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPEG, WebP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image is larger than 10MB. Please select a smaller photo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setImageSrc(event.target.result);
        setScale(1);
        audioSynth.playGiftReveal();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    setImageSrc(null);
    setScale(1);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleExport = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    audioSynth.playDiyaChime();

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `diwali-photo-greeting-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export photo greeting error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="photo-greeting" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-3">
          <Camera className="w-3.5 h-3.5 text-diwali-amber" />
          <span>Festive Memories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-diwali-ivory mb-3">
          Photo Greeting Studio
        </h2>
        <p className="text-sm sm:text-base text-diwali-lavender">
          Turn your cherished family moments into exquisite framed festive cards. 100% processed directly in your browser with zero cloud storage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6 bg-gradient-to-b from-diwali-surface to-diwali-midnight/90 border border-diwali-gold/30 rounded-3xl p-6 sm:p-7 shadow-xl text-diwali-ivory">
          {/* Upload trigger */}
          <div>
            <label className="block text-xs font-semibold text-diwali-goldLight uppercase tracking-wider mb-2">
              1. Upload Your Photo
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="photo-upload-input"
            />
            {!imageSrc ? (
              <label
                htmlFor="photo-upload-input"
                className="w-full h-32 rounded-2xl border-2 border-dashed border-diwali-gold/40 hover:border-diwali-gold hover:bg-diwali-surfaceLight/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-diwali-gold/20 flex items-center justify-center text-diwali-gold">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-diwali-ivory">Choose or drag a photo</span>
                  <p className="text-[10px] text-diwali-lavender">PNG, JPG, WebP up to 10MB</p>
                </div>
              </label>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-diwali-navy border border-diwali-gold/30">
                <span className="text-xs text-diwali-goldLight font-medium">Photo loaded successfully</span>
                <button
                  onClick={handleResetPhoto}
                  className="px-2.5 py-1 rounded-lg bg-diwali-crimson/20 border border-diwali-crimson/40 text-[11px] text-diwali-crimson hover:bg-diwali-crimson/30 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            )}
          </div>

          {/* Photo Zoom Control */}
          {imageSrc && (
            <div className="pt-2">
              <div className="flex justify-between text-xs text-diwali-lavender mb-1">
                <span>Reposition / Zoom Scale</span>
                <span className="text-diwali-goldLight">{Math.round(scale * 100)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <ZoomOut className="w-4 h-4 text-diwali-lavender" />
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-diwali-gold cursor-pointer h-1.5 bg-diwali-navy rounded-lg"
                />
                <ZoomIn className="w-4 h-4 text-diwali-lavender" />
              </div>
            </div>
          )}

          {/* Frame Style Picker */}
          <div>
            <label className="block text-xs font-semibold text-diwali-goldLight uppercase tracking-wider mb-2">
              2. Choose Festive Frame
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {FRAMES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrame(f.id)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    frame === f.id
                      ? "border-diwali-gold bg-diwali-gold/20 scale-[1.02] shadow-md shadow-diwali-gold/20"
                      : "border-white/10 hover:border-white/20 bg-diwali-surface/60 text-diwali-lavender"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: f.preview }} />
                  <span className="text-xs font-bold text-diwali-ivory">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text fields */}
          <div className="space-y-3 pt-2 border-t border-diwali-gold/20">
            <div>
              <label className="block text-xs font-medium text-diwali-lavender mb-1">
                For (Recipient)
              </label>
              <input
                type="text"
                maxLength={40}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Friends & Family"
                className="w-full px-3.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-diwali-lavender mb-1">
                Custom Caption
              </label>
              <input
                type="text"
                maxLength={90}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Celebrating light and love together!"
                className="w-full px-3.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-diwali-lavender mb-1">
                From (Sender)
              </label>
              <input
                type="text"
                maxLength={40}
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g. The Vermas"
                className="w-full px-3.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory"
              />
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-diwali-purple/20 border border-diwali-gold/20 text-[11px] text-diwali-lavender">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Client-Side: Your photo stays on your device and is never uploaded to any server.</span>
          </div>

          {/* Export Action */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full py-3 rounded-2xl bg-diwali-gold hover:bg-diwali-goldLight text-diwali-navy font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-diwali-gold/20"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "Rasterizing Photo Card..." : "Download Photo Card (PNG)"}</span>
          </button>
        </div>

        {/* Live Card Preview Column */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex justify-center p-2 sm:p-4 rounded-3xl bg-diwali-navy/60 border border-diwali-gold/20 shadow-2xl">
            {/* The Photo Card Target */}
            <div
              ref={cardRef}
              className="relative w-full aspect-[4/5] max-w-sm rounded-3xl p-6 bg-gradient-to-b from-[#111A36] via-[#090D24] to-[#040612] text-[#FFF6E5] border-2 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col justify-between select-none"
            >
              {/* Outer Border Inset */}
              <div className="absolute inset-2 border border-[#D4AF37]/40 rounded-2xl pointer-events-none" />

              {/* Decorative Frame Elements */}
              {frame === "royal-arch" && (
                <div className="absolute top-2 inset-x-4 h-12 flex justify-center pointer-events-none">
                  <svg viewBox="0 0 200 40" className="w-full h-full stroke-[#D4AF37] fill-none" strokeWidth="1.5">
                    <path d="M0,40 Q50,0 100,20 Q150,0 200,40" />
                    <circle cx="100" cy="18" r="3" fill="#D4AF37" />
                  </svg>
                </div>
              )}

              {/* Card Top Title */}
              <div className="relative z-10 text-center pt-5">
                <span className="text-[10px] tracking-[0.25em] text-[#FFE27B] uppercase font-serif">
                  Festive Portrait
                </span>
                <h3 className="text-xl font-serif font-bold text-[#FFF6E5] tracking-wide">
                  Shubh Deepavali
                </h3>
              </div>

              {/* Photo Viewport Container */}
              <div className="relative z-10 my-2 w-full aspect-square max-h-56 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 bg-black/60 flex items-center justify-center">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Diwali celebration"
                    style={{ transform: `scale(${scale})` }}
                    className="w-full h-full object-cover transition-transform duration-100"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Camera className="w-10 h-10 text-[#D4AF37]/50 mx-auto mb-2" />
                    <p className="text-xs text-diwali-lavender">Your festive photo appears here</p>
                  </div>
                )}
              </div>

              {/* Caption & Sign-off */}
              <div className="relative z-10 text-center px-2">
                <p className="text-xs font-serif font-bold text-[#FFE27B]">
                  To {recipient || "Loved Ones"}
                </p>
                <p className="text-xs text-gray-200 mt-1 italic font-light">
                  &ldquo;{caption || "May this Diwali bring boundless joy and warmth!"}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 text-center pt-2 border-t border-[#D4AF37]/30">
                <span className="text-[11px] text-gray-400">Warmly from </span>
                <span className="text-xs font-bold text-[#FFE27B]">{sender || "Family"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

