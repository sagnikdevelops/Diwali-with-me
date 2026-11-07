"use client";

import React from "react";
import { Sparkles, Zap } from "lucide-react";

interface CardProps {
  recipient: string;
  sender: string;
  message: string;
  blessing?: string;
}

export function ModernFestive({ recipient, sender, message, blessing }: CardProps) {
  return (
    <div className="relative w-full aspect-[4/5] max-w-sm mx-auto rounded-3xl p-6 sm:p-7 bg-[#0B0F19]/90 backdrop-blur-xl text-white border border-[#00D2D3]/40 shadow-[0_0_35px_rgba(0,210,211,0.2)] overflow-hidden flex flex-col justify-between select-none">
      {/* Dynamic Gradient Blobs */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00D2D3]/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#FFB547]/20 rounded-full blur-2xl pointer-events-none" />

      {/* Modern Badge Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#00D2D3] uppercase tracking-wider font-mono">
          <Zap className="w-3 h-3 text-[#FFB547]" />
          <span>Diwali 2.0</span>
        </div>
        <span className="text-[10px] text-gray-400 font-mono">
          #SHUBHDEEPAVALI
        </span>
      </div>

      {/* Main Title */}
      <div className="relative z-10 text-left pt-3">
        <h3 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00D2D3] to-[#FFB547]">
          Light The World
        </h3>
        <p className="text-xs text-gray-300 font-light mt-1">
          {blessing || "Reimagined traditions. Infinite luminescence."}
        </p>
      </div>

      {/* Center Modern Glowing Light Art */}
      <div className="relative z-10 my-auto py-2 flex justify-center">
        <div className="relative p-3 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D2D3] to-[#FFB547] flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white">Luminous Energy</p>
            <p className="text-[10px] text-gray-400 font-mono">Vibe: Pure Festive Glow</p>
          </div>
        </div>
      </div>

      {/* Recipient & Message */}
      <div className="relative z-10 text-left px-1">
        <p className="text-xs font-mono text-[#00D2D3]">
          @to: {recipient || "Friend"}
        </p>
        <p className="text-xs sm:text-sm text-gray-200 mt-2 font-normal leading-relaxed max-h-24 overflow-y-auto">
          {message || "May your journey glow with unstoppable breakthroughs, crystal clarity, and joyful celebration this festive season."}
        </p>
      </div>

      {/* Sender */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
        <span className="text-gray-400 font-mono text-[11px]">from:</span>
        <span className="font-bold text-[#FFB547]">
          {sender || "Devoted Friend"}
        </span>
      </div>
    </div>
  );
}
