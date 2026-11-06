"use client";

import React from "react";

export type DiyaColorStyle = "terracotta" | "brass" | "rose" | "peacock" | "amethyst";

interface DiyaVisualProps {
  styleName?: DiyaColorStyle;
  isLit?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function DiyaVisual({
  styleName = "terracotta",
  isLit = true,
  size = "md",
  className = "",
}: DiyaVisualProps) {
  // Color presets for Diya body
  const styleConfigs: Record<
    DiyaColorStyle,
    { bodyFill: string; bodyStroke: string; rimFill: string; accentColor: string }
  > = {
    terracotta: {
      bodyFill: "#A84218",
      bodyStroke: "#E57A44",
      rimFill: "#782E0E",
      accentColor: "#FFE27B",
    },
    brass: {
      bodyFill: "#C69214",
      bodyStroke: "#F9D976",
      rimFill: "#8C6308",
      accentColor: "#FFF4C2",
    },
    rose: {
      bodyFill: "#A33B58",
      bodyStroke: "#E57593",
      rimFill: "#691E33",
      accentColor: "#FFD1DC",
    },
    peacock: {
      bodyFill: "#0D6E6E",
      bodyStroke: "#48CAE4",
      rimFill: "#064646",
      accentColor: "#90E0EF",
    },
    amethyst: {
      bodyFill: "#592E83",
      bodyStroke: "#A06CD5",
      rimFill: "#361B52",
      accentColor: "#E2CFEA",
    },
  };

  const config = styleConfigs[styleName] || styleConfigs.terracotta;

  const sizeClasses = {
    sm: "w-16 h-10",
    md: "w-24 h-16",
    lg: "w-36 h-24",
    xl: "w-48 h-32",
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${sizeClasses[size]} ${className}`}>
      {/* Radiant Glow Behind Flame */}
      {isLit && (
        <div
          className="absolute -top-4 w-16 h-16 rounded-full blur-xl animate-pulse pointer-events-none"
          style={{ backgroundColor: "rgba(255, 181, 71, 0.45)" }}
        />
      )}

      {/* Flame Visual */}
      {isLit && (
        <div className="relative -top-2 flex flex-col items-center animate-flame-flicker pointer-events-none">
          {/* Flame outer */}
          <div
            className="w-5 h-10 rounded-full"
            style={{
              background: "linear-gradient(to top, #FF8C00, #FFB547 50%, #FFF6E5 100%)",
              boxShadow: "0 0 16px #FFB547, 0 0 28px rgba(255, 181, 71, 0.6)",
            }}
          />
          {/* Flame inner white core */}
          <div className="absolute bottom-1 w-2 h-5 bg-white/95 rounded-full blur-[0.5px]" />
          {/* Wick base */}
          <div className="w-1 h-2 bg-amber-950 rounded-t-sm" />
        </div>
      )}

      {/* Diya SVG Body */}
      <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-xl">
        {/* Clay base */}
        <path
          d="M10 20 Q50 48 90 20 Q50 30 10 20"
          fill={config.bodyFill}
          stroke={config.bodyStroke}
          strokeWidth="1.5"
        />
        {/* Diya Interior well */}
        <path d="M15 22 Q50 32 85 22" fill={config.rimFill} />
        {/* Golden or contrasting ornamentation beads */}
        <circle cx="28" cy="23" r="1.8" fill={config.accentColor} />
        <circle cx="38" cy="26" r="2" fill={config.accentColor} />
        <circle cx="50" cy="27" r="2.2" fill={config.accentColor} />
        <circle cx="62" cy="26" r="2" fill={config.accentColor} />
        <circle cx="72" cy="23" r="1.8" fill={config.accentColor} />
      </svg>
    </div>
  );
}

