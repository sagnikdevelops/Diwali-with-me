"use client";

import React from "react";

interface CardProps {
  recipient: string;
  sender: string;
  message: string;
  blessing?: string;
}

export function GoldenLuxury({ recipient, sender, message, blessing }: CardProps) {
  return (
    <div className="relative w-full aspect-[4/5] max-w-sm mx-auto rounded-3xl p-6 sm:p-8 bg-[#09090C] text-[#FFF6E5] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.45)] overflow-hidden flex flex-col justify-between select-none font-serif">
      {/* Golden Corner Embellishments */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#FFE27B]" />
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#FFE27B]" />
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#FFE27B]" />
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#FFE27B]" />

      {/* Floating Golden Dust */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-8 left-12 w-1.5 h-1.5 rounded-full bg-[#FFE27B] animate-ping" />
        <div className="absolute bottom-12 right-12 w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
        <div className="absolute top-1/2 left-8 w-1 h-1 rounded-full bg-[#FFF6E5]" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 text-center pt-4">
        <div className="inline-block px-3 py-1 border border-[#D4AF37]/60 rounded-full bg-[#181820] text-[9px] tracking-[0.25em] text-[#FFE27B] uppercase mb-2">
          Royal Festive Edition
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFE27B] via-[#D4AF37] to-[#FFE27B] drop-shadow">
          Shubh Deepavali
        </h3>
        <p className="text-[11px] text-[#D4AF37]/90 mt-1 italic">
          {blessing || "May Opulence & Golden Health Illuminate Your Home"}
        </p>
      </div>

      {/* Golden Diya Mandala */}
      <div className="relative z-10 my-auto flex justify-center py-2">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 animate-spin-slow" />
          <svg viewBox="0 0 100 80" className="w-16 h-14 drop-shadow-[0_0_15px_#FFE27B]">
            {/* Glowing Flame */}
            <path
              d="M50 5 Q60 25 50 40 Q40 25 50 5"
              fill="url(#goldFlameGrad)"
              className="animate-flame-flicker"
            />
            {/* Diya Bowl */}
            <path
              d="M20 40 Q50 75 80 40 Q50 50 20 40"
              fill="url(#goldMetalGrad)"
              stroke="#FFF6E5"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="goldFlameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FF8C00" />
                <stop offset="60%" stopColor="#FFE27B" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
              <linearGradient id="goldMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE27B" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#996515" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Recipient & Message */}
      <div className="relative z-10 text-center px-4">
        <p className="text-xs uppercase tracking-widest text-[#FFE27B] font-semibold">
          Honoured {recipient || "Family & Friends"}
        </p>
        <p className="text-xs sm:text-sm text-[#FFF6E5]/90 mt-2 font-normal leading-relaxed max-h-24 overflow-y-auto italic">
          &ldquo;{message || "Sending our most distinguished regards and wishes for boundless triumph and luminous joy this Deepavali."}&rdquo;
        </p>
      </div>

      {/* Sender */}
      <div className="relative z-10 text-center pt-3 border-t border-[#D4AF37]/40">
        <p className="text-[10px] uppercase tracking-widest text-[#B9B5C9]">
          Warmest Regards
        </p>
        <p className="text-sm font-bold text-[#FFE27B] mt-0.5">
          {sender || "Your Sincere Well-Wisher"}
        </p>
      </div>
    </div>
  );
}

