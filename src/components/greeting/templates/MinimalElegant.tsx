"use client";

import React from "react";

interface CardProps {
  recipient: string;
  sender: string;
  message: string;
  blessing?: string;
}

export function MinimalElegant({ recipient, sender, message, blessing }: CardProps) {
  return (
    <div className="relative w-full aspect-[4/5] max-w-sm mx-auto rounded-3xl p-8 bg-[#0F141E] text-[#F3F4F6] border border-[#D4AF37]/40 shadow-xl overflow-hidden flex flex-col justify-between select-none font-sans">
      {/* Sleek Geometric Line Accents */}
      <div className="absolute top-6 left-6 w-12 h-0.5 bg-[#D4AF37]" />
      <div className="absolute bottom-6 right-6 w-12 h-0.5 bg-[#D4AF37]" />

      {/* Header */}
      <div className="text-left pt-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
          Festival of Lights
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-light tracking-wide text-white mt-1">
          Deepavali
        </h3>
        <p className="text-xs text-gray-400 font-light mt-1">
          {blessing || "Stillness, clarity, and boundless illumination."}
        </p>
      </div>

      {/* Modern Minimal Diya Silhouette SVG */}
      <div className="my-auto py-2 flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <svg viewBox="0 0 60 40" className="w-12 h-8">
              {/* Flame */}
              <path
                d="M30 5 C33 15, 36 20, 30 25 C24 20, 27 15, 30 5"
                fill="#FFB547"
                className="animate-pulse"
              />
              {/* Base */}
              <path
                d="M10 26 C15 36, 45 36, 50 26"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Recipient & Message */}
      <div className="text-left my-2">
        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
          For {recipient || "You"}
        </p>
        <p className="text-xs sm:text-sm text-gray-200 mt-2 font-light leading-relaxed max-h-24 overflow-y-auto">
          {message || "Wishing you peace in every quiet breath, joy in every shared smile, and success in every noble journey."}
        </p>
      </div>

      {/* Sender */}
      <div className="pt-3 border-t border-white/10 flex justify-between items-end">
        <span className="text-[11px] text-gray-500 uppercase tracking-widest">
          With warmth
        </span>
        <span className="text-xs font-semibold text-[#D4AF37]">
          {sender || "A Well-Wisher"}
        </span>
      </div>
    </div>
  );
}
