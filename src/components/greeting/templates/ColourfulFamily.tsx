"use client";

import React from "react";
import { Sparkles, Heart } from "lucide-react";

interface CardProps {
  recipient: string;
  sender: string;
  message: string;
  blessing?: string;
}

export function ColourfulFamily({ recipient, sender, message, blessing }: CardProps) {
  return (
    <div className="relative w-full aspect-[4/5] max-w-sm mx-auto rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#800E3F] via-[#A83216] to-[#6B2D5C] text-white border-3 border-[#FFB547] shadow-2xl overflow-hidden flex flex-col justify-between select-none">
      {/* Playful Festive Bunting / Lantern Garland SVG */}
      <div className="absolute top-0 inset-x-0 h-10 pointer-events-none flex justify-center">
        <svg viewBox="0 0 200 40" className="w-full h-full">
          <path d="M0,5 Q50,20 100,5 Q150,20 200,5" stroke="#FFE27B" strokeWidth="1.5" fill="none" />
          {/* Triangular Bunting flags */}
          <polygon points="20,10 32,25 44,10" fill="#FF8C00" />
          <polygon points="56,12 68,28 80,12" fill="#00D2D3" />
          <polygon points="92,10 104,27 116,10" fill="#FFB547" />
          <polygon points="128,12 140,28 152,12" fill="#E57593" />
          <polygon points="164,10 176,25 188,10" fill="#2EC4B6" />
        </svg>
      </div>

      {/* Header */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold text-[#FFE27B] mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB547]" />
          <span>Joy • Sweets • Togetherness</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide drop-shadow">
          Happy Diwali!
        </h3>
        <p className="text-xs text-[#FFE27B] font-medium mt-0.5">
          {blessing || "Sweet Smiles, Full Bellies & Countless Memories!"}
        </p>
      </div>

      {/* Illustration: Diya + Sweets SVG */}
      <div className="my-auto py-1 flex items-center justify-center gap-3">
        {/* Playful Diya */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-[#FF8C00]/40 animate-ping absolute -top-2 left-2" />
          <svg viewBox="0 0 60 40" className="w-14 h-10">
            <path d="M30 2 Q38 14 30 22 Q22 14 30 2" fill="#FFE27B" className="animate-bounce" />
            <path d="M10 22 Q30 38 50 22 Z" fill="#D9383A" stroke="#FFE27B" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Heart Sparkle */}
        <div className="p-2.5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 text-[#FFE27B]">
          <Heart className="w-5 h-5 fill-current" />
        </div>
      </div>

      {/* Recipient & Message */}
      <div className="text-center px-2">
        <p className="text-xs uppercase tracking-wider text-[#FFE27B] font-bold">
          Dearest {recipient || "Family & Friends"}!
        </p>
        <p className="text-xs sm:text-sm text-white/95 mt-2 font-medium leading-relaxed max-h-24 overflow-y-auto">
          &ldquo;{message || "May this Diwali bring boundless laughter, endless boxes of mithai, and warm cuddles to every corner of your home!"}&rdquo;
        </p>
      </div>

      {/* Sender */}
      <div className="text-center pt-2 border-t border-white/20">
        <p className="text-[11px] text-[#FFD1DC] font-medium">
          Lots of love & tight hugs from,
        </p>
        <p className="text-sm font-bold text-[#FFE27B]">
          {sender || "All of Us"}
        </p>
      </div>
    </div>
  );
}

