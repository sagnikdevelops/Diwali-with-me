"use client";

import React from "react";
import { DiyaVisual } from "@/components/diya/DiyaVisual";

interface CardProps {
  recipient: string;
  sender: string;
  message: string;
  blessing?: string;
}

export function RoyalTraditional({ recipient, sender, message, blessing }: CardProps) {
  return (
    <div className="relative w-full aspect-[4/5] max-w-sm mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#381154] via-[#210935] to-[#12041D] text-[#FFF6E5] border-2 border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.35)] overflow-hidden flex flex-col justify-between select-none">
      {/* Ornate Arch Frame Outline */}
      <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/50 rounded-2xl pointer-events-none" />
      <div className="absolute inset-3 sm:inset-4 border border-[#FFE27B]/30 rounded-xl pointer-events-none" />

      {/* Mughal / Rajasthani Arch Top SVG */}
      <div className="absolute top-4 inset-x-8 h-12 flex justify-center pointer-events-none">
        <svg viewBox="0 0 200 40" className="w-full h-full stroke-[#D4AF37] fill-none" strokeWidth="1.5">
          <path d="M0,40 Q50,0 100,20 Q150,0 200,40" />
          <circle cx="100" cy="18" r="3" fill="#D4AF37" />
          <circle cx="50" cy="28" r="2" fill="#D4AF37" />
          <circle cx="150" cy="28" r="2" fill="#D4AF37" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-8">
        <p className="text-[10px] tracking-[0.25em] text-[#FFE27B] uppercase font-serif">
          Auspicious Festivities
        </p>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF6E5] tracking-wide mt-1 drop-shadow-md">
          Shubh Deepavali
        </h3>
        <p className="text-xs text-[#D4AF37] font-serif italic mt-0.5">
          {blessing || "May Light & Prosperity Reign Supreme"}
        </p>
      </div>

      {/* Diya Centerpiece */}
      <div className="relative z-10 flex justify-center my-1 transform scale-90 sm:scale-100">
        <DiyaVisual styleName="brass" isLit={true} size="md" />
      </div>

      {/* Recipient & Message */}
      <div className="relative z-10 text-center px-2">
        <p className="text-xs text-[#FFE27B] font-serif font-semibold tracking-wider">
          To {recipient || "Dearest Loved Ones"}
        </p>
        <p className="text-xs sm:text-sm text-[#F7E19A] mt-2 font-light leading-relaxed max-h-28 overflow-y-auto italic">
          &ldquo;{message || "Wishing you and your family a radiant, joyful, and prosperous Diwali filled with divine grace."}&rdquo;
        </p>
      </div>

      {/* Footer / Sender */}
      <div className="relative z-10 text-center pt-2 border-t border-[#D4AF37]/30">
        <p className="text-[11px] text-[#B9B5C9] font-serif">
          With royal blessings & warmth,
        </p>
        <p className="text-sm font-serif font-bold text-[#FFE27B]">
          {sender || "Your Well-Wisher"}
        </p>
      </div>
    </div>
  );
}

