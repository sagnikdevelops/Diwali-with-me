"use client";

import React from "react";
import { DiyaVisual } from "@/components/diya/DiyaVisual";

interface CardProps {
  recipient: string;
  sender: string;
  message: string;
  blessing?: string;
}

export function SpiritualSerene({ recipient, sender, message, blessing }: CardProps) {
  return (
    <div className="relative w-full aspect-[4/5] max-w-sm mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#09112A] via-[#050B1B] to-[#02050E] text-[#FFF6E5] border border-[#D4AF37]/50 shadow-[0_0_35px_rgba(40,16,68,0.6)] overflow-hidden flex flex-col justify-between select-none">
      {/* Sacred Mandala Backdrop watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-80 h-80 animate-spin-slow">
          <circle cx="50" cy="50" r="45" stroke="#FFE27B" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="35" stroke="#FFE27B" strokeWidth="0.5" fill="none" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="50"
              x2={50 + 45 * Math.cos((deg * Math.PI) / 180)}
              y2={50 + 45 * Math.sin((deg * Math.PI) / 180)}
              stroke="#FFE27B"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Header with Sacred Sanskrit Inscription */}
      <div className="relative z-10 text-center pt-2">
        <p className="text-[11px] font-serif text-[#D4AF37] tracking-widest">
          ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।
        </p>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide mt-1">
          शुभ दीपावली
        </h3>
        <p className="text-xs text-[#FFE27B]/80 font-serif italic mt-0.5">
          {blessing || "Lead Us From Darkness Unto Light"}
        </p>
      </div>

      {/* Center Sacred Diya Visual */}
      <div className="relative z-10 flex justify-center my-1 transform scale-95">
        <DiyaVisual styleName="amethyst" isLit={true} size="md" />
      </div>

      {/* Recipient & Message */}
      <div className="relative z-10 text-center px-2">
        <p className="text-xs font-serif font-bold text-[#FFE27B] tracking-wider">
          To {recipient || "Honoured Soul"}
        </p>
        <p className="text-xs sm:text-sm text-[#FFF6E5]/90 mt-2 font-serif font-light leading-relaxed max-h-24 overflow-y-auto italic">
          &ldquo;{message || "May the sacred light awaken inner serenity, spiritual clarity, and boundless divine grace within your sacred heart."}&rdquo;
        </p>
      </div>

      {/* Footer / Sender */}
      <div className="relative z-10 text-center pt-2 border-t border-[#D4AF37]/30">
        <p className="text-[11px] text-[#B9B5C9] font-serif italic">
          With sincere prayers & reverence,
        </p>
        <p className="text-xs font-serif font-bold text-[#FFE27B]">
          {sender || "In Fellowship & Light"}
        </p>
      </div>
    </div>
  );
}

