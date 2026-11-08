"use client";

import React from "react";

interface SweetVisualProps {
  id: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showShine?: boolean;
}

export function SweetVisual({
  id,
  size = "md",
  className = "",
  showShine = true,
}: SweetVisualProps) {
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  const dimension = sizeMap[size];

  // Render SVG based on sweet ID
  const renderSweetSvg = () => {
    switch (id) {
      case "kaju-katli":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]">
            <defs>
              <linearGradient id="kk-base" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF7ED" />
                <stop offset="50%" stopColor="#F5E6CA" />
                <stop offset="100%" stopColor="#D8C29D" />
              </linearGradient>
              <linearGradient id="kk-silver" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#E2E8F0" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#CBD5E1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
              </linearGradient>
              <filter id="kk-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Pleated Paper Base Cup Shadow */}
            <ellipse cx="50" cy="72" rx="36" ry="14" fill="#000000" opacity="0.25" />

            {/* Diamond Cut Fudge */}
            <polygon
              points="50,15 88,50 50,85 12,50"
              fill="url(#kk-base)"
              stroke="#B39E79"
              strokeWidth="1.5"
              filter="url(#kk-shadow)"
            />

            {/* Silver Vark Foil Overlay with Organic Cuts */}
            <polygon
              points="45,22 82,48 53,78 20,48"
              fill="url(#kk-silver)"
            />
            {/* Organic silver crinkles */}
            <path
              d="M32 38 L42 42 L38 52 M56 32 L64 40 L60 55 M44 60 L50 66"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              opacity="0.8"
              strokeLinecap="round"
            />

            {/* Top Shine Flare */}
            {showShine && (
              <polygon
                points="42,22 62,38 48,52 30,36"
                fill="#FFFFFF"
                opacity="0.25"
              />
            )}
          </svg>
        );

      case "motichoor-ladoo":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]">
            <defs>
              <radialGradient id="ml-grad" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="45%" stopColor="#FF9900" />
                <stop offset="85%" stopColor="#D95700" />
                <stop offset="100%" stopColor="#8C2E00" />
              </radialGradient>
            </defs>

            {/* Pleated paper cup under ladoo */}
            <ellipse cx="50" cy="78" rx="34" ry="12" fill="#EAB308" opacity="0.35" />
            <ellipse cx="50" cy="76" rx="30" ry="9" fill="#CA8A04" opacity="0.4" />

            {/* Main Round Ladoo Body */}
            <circle cx="50" cy="50" r="36" fill="url(#ml-grad)" />

            {/* Clustered Boondi Pearls */}
            <g opacity="0.85">
              {/* Highlight Boondi Pearls */}
              <circle cx="42" cy="36" r="3.2" fill="#FFE27B" />
              <circle cx="48" cy="32" r="3" fill="#FFE27B" />
              <circle cx="36" cy="44" r="3.4" fill="#FFC72C" />
              <circle cx="54" cy="38" r="3.2" fill="#FFC72C" />
              <circle cx="46" cy="42" r="3" fill="#FFB703" />
              <circle cx="40" cy="52" r="3.5" fill="#FF9900" />
              <circle cx="52" cy="48" r="3.4" fill="#FF9900" />
              <circle cx="62" cy="44" r="3.2" fill="#FF9900" />
              <circle cx="32" cy="56" r="3" fill="#E65100" />
              <circle cx="58" cy="58" r="3.2" fill="#E65100" />
              <circle cx="46" cy="62" r="3.5" fill="#C83B00" />
              <circle cx="38" cy="66" r="2.8" fill="#C83B00" />
              <circle cx="56" cy="68" r="3" fill="#9F2500" />
              <circle cx="68" cy="54" r="3" fill="#BF360C" />
            </g>

            {/* Garnish: Crushed Emerald Pistachio and Melon Seed */}
            <polygon points="46,28 52,26 50,32" fill="#4ADE80" />
            <polygon points="38,34 42,32 40,37" fill="#22C55E" />
            <polygon points="56,33 60,32 58,36" fill="#86EFAC" />
            <ellipse cx="48" cy="36" rx="3" ry="1.2" fill="#FEF08A" transform="rotate(-20 48 36)" />
          </svg>
        );

      case "gulab-jamun":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]">
            <defs>
              <radialGradient id="gj-grad" cx="35%" cy="30%" r="68%">
                <stop offset="0%" stopColor="#A44A1E" />
                <stop offset="35%" stopColor="#6C2607" />
                <stop offset="75%" stopColor="#431407" />
                <stop offset="100%" stopColor="#1E0702" />
              </radialGradient>
              <radialGradient id="gj-syrup" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#B45309" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Syrup Pool */}
            <ellipse cx="50" cy="74" rx="38" ry="12" fill="url(#gj-syrup)" />

            {/* Deep Caramelized Ball */}
            <circle cx="50" cy="50" r="35" fill="url(#gj-grad)" />

            {/* Glistening Glaze Highlights */}
            <ellipse cx="40" cy="34" rx="14" ry="7" fill="#FFFFFF" opacity="0.32" transform="rotate(-30 40 34)" />
            <ellipse cx="42" cy="32" rx="7" ry="3" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 42 32)" />

            {/* Delicate Rose Petal sliver and Saffron thread */}
            <path
              d="M50 25 C54 22, 59 26, 56 31 C53 36, 48 30, 50 25 Z"
              fill="#E11D48"
              opacity="0.9"
            />
            <path
              d="M44 26 Q47 22 51 28"
              stroke="#FBBF24"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        );

      case "soan-papdi":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]">
            <defs>
              <linearGradient id="sp-top" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="60%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FDE047" />
              </linearGradient>
              <linearGradient id="sp-side" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="50" cy="75" rx="34" ry="12" fill="#000000" opacity="0.25" />

            {/* Isometric Flaky Cube */}
            {/* Left face */}
            <polygon points="18,52 50,68 50,86 18,70" fill="url(#sp-side)" opacity="0.85" />
            {/* Right face */}
            <polygon points="50,68 82,52 82,70 50,86" fill="url(#sp-side)" />
            {/* Top face */}
            <polygon points="50,34 82,52 50,68 18,52" fill="url(#sp-top)" stroke="#FACC15" strokeWidth="0.8" />

            {/* Delicate Flaky Strata Lines */}
            <path
              d="M22 56 L46 68 M22 62 L46 74 M54 68 L78 56 M54 74 L78 62"
              stroke="#FACC15"
              strokeWidth="0.75"
              opacity="0.6"
            />

            {/* Almond Slivers and Pistachios on top */}
            <ellipse cx="46" cy="48" rx="5" ry="2" fill="#B45309" transform="rotate(-15 46 48)" />
            <ellipse cx="46" cy="48" rx="4" ry="1.2" fill="#FDE68A" transform="rotate(-15 46 48)" />
            <polygon points="56,44 60,42 58,47" fill="#16A34A" />
            <polygon points="36,46 39,44 38,49" fill="#22C55E" />
            <polygon points="52,56 55,54 54,58" fill="#15803D" />
          </svg>
        );

      case "kaju-pista-roll":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]">
            <defs>
              <linearGradient id="kpr-cashew" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F5E6CA" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
              <linearGradient id="kpr-pista" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="50%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#14532D" />
              </linearGradient>
            </defs>

            {/* Outer Roll Cylinder Base */}
            <ellipse cx="50" cy="74" rx="34" ry="11" fill="#000000" opacity="0.25" />

            {/* Rolled Cylinder Body (angled) */}
            <path
              d="M26 38 L68 24 L78 62 L36 76 Z"
              fill="url(#kpr-cashew)"
              stroke="#D4AF37"
              strokeWidth="1.2"
            />

            {/* Silver Vark Foil Bands on Outer Cashew Skin */}
            <path
              d="M44 32 L49 71 M56 28 L61 67"
              stroke="#FFFFFF"
              strokeWidth="4"
              opacity="0.8"
            />

            {/* Cut End Facing Front (Showing Pista Core) */}
            <ellipse cx="36" cy="57" rx="14" ry="20" fill="url(#kpr-cashew)" transform="rotate(-18 36 57)" />
            {/* Emerald Pistachio Inner Center */}
            <ellipse cx="36" cy="57" rx="8" ry="12" fill="url(#kpr-pista)" transform="rotate(-18 36 57)" />

            {/* Pistachio crumbles on top */}
            <circle cx="62" cy="38" r="1.5" fill="#22C55E" />
            <circle cx="68" cy="44" r="1.2" fill="#15803D" />
          </svg>
        );

      case "besan-ladoo":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]">
            <defs>
              <radialGradient id="bl-grad" cx="35%" cy="30%" r="68%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="85%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>
            </defs>

            {/* Cup Base */}
            <ellipse cx="50" cy="78" rx="32" ry="10" fill="#000000" opacity="0.25" />

            {/* Sphere Body */}
            <circle cx="50" cy="50" r="35" fill="url(#bl-grad)" />

            {/* Ghee Shimmer Granules */}
            <g opacity="0.6">
              <circle cx="36" cy="38" r="1.2" fill="#FFFBEB" />
              <circle cx="44" cy="30" r="1.5" fill="#FFFBEB" />
              <circle cx="58" cy="36" r="1.2" fill="#FFFBEB" />
              <circle cx="38" cy="54" r="1.4" fill="#FEF3C7" />
              <circle cx="56" cy="52" r="1.3" fill="#FEF3C7" />
              <circle cx="48" cy="64" r="1.4" fill="#FDE68A" />
            </g>

            {/* Big Golden Roasted Cashew Crown */}
            <path
              d="M42 32 C42 24, 56 22, 58 28 C60 34, 52 38, 48 35 C45 33, 42 36, 42 32 Z"
              fill="#FFFBEB"
              stroke="#D97706"
              strokeWidth="0.8"
            />
            {/* Green cardamom sprinkle */}
            <circle cx="40" cy="38" r="1" fill="#15803D" />
            <circle cx="58" cy="40" r="1" fill="#15803D" />
          </svg>
        );

      case "jalebi":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_14px_rgba(255,107,0,0.35)]">
            <defs>
              <linearGradient id="jal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD000" />
                <stop offset="40%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#CC3700" />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="50" cy="74" rx="36" ry="12" fill="#000000" opacity="0.25" />

            {/* Characteristic Looped Coils */}
            <g stroke="url(#jal-grad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <circle cx="50" cy="48" r="22" />
              <circle cx="42" cy="44" r="14" />
              <circle cx="58" cy="44" r="14" />
              <path d="M38 56 Q50 32 62 56 Q50 68 38 56" />
              <path d="M48 24 Q68 40 54 62" />
            </g>

            {/* Glossy Syrup Glaze Highlight Strokes */}
            <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55">
              <path d="M34 40 A16 16 0 0 1 48 26" />
              <path d="M56 30 A14 14 0 0 1 68 42" />
              <path d="M42 56 Q48 44 54 54" />
            </g>

            {/* Saffron Strands & Pistachio garnish */}
            <path d="M45 42 Q49 38 55 42" stroke="#DC2626" strokeWidth="1" fill="none" />
            <circle cx="48" cy="46" r="1.5" fill="#16A34A" />
            <circle cx="54" cy="38" r="1.2" fill="#22C55E" />
          </svg>
        );

      case "rasgulla":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.3)]">
            <defs>
              <radialGradient id="rg-grad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#F8FAFC" />
                <stop offset="85%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </radialGradient>
              <radialGradient id="rg-syrup" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Chilled Syrup puddle */}
            <ellipse cx="50" cy="74" rx="38" ry="12" fill="url(#rg-syrup)" />

            {/* Snow White Spongy Chenna Dumpling */}
            <circle cx="50" cy="50" r="35" fill="url(#rg-grad)" stroke="#E2E8F0" strokeWidth="1" />

            {/* Spongy Chenna Texture Micro-dimples */}
            <g opacity="0.45" fill="#CBD5E1">
              <circle cx="38" cy="38" r="1.5" />
              <circle cx="48" cy="34" r="1.8" />
              <circle cx="42" cy="48" r="1.4" />
              <circle cx="58" cy="42" r="1.6" />
              <circle cx="52" cy="54" r="1.5" />
              <circle cx="36" cy="58" r="1.2" />
              <circle cx="62" cy="56" r="1.4" />
              <circle cx="48" cy="64" r="1.6" />
            </g>

            {/* Soft Glistening Sheen */}
            <ellipse cx="38" cy="32" rx="10" ry="5" fill="#FFFFFF" opacity="0.8" transform="rotate(-30 38 32)" />

            {/* Single Saffron Thread & Rose Essence Drop */}
            <path
              d="M46 28 Q49 22 53 30 Q57 26 55 33"
              stroke="#D97706"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="50" cy="32" r="1.2" fill="#E11D48" opacity="0.8" />
          </svg>
        );

      case "gujiya":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_14px_rgba(0,0,0,0.4)]">
            <defs>
              <linearGradient id="gj-crescent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="90%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="50" cy="74" rx="38" ry="12" fill="#000000" opacity="0.25" />

            {/* Crescent Hand-folded Pastry Body */}
            <path
              d="M15 62 C22 25, 78 25, 85 62 C62 50, 38 50, 15 62 Z"
              fill="url(#gj-crescent)"
              stroke="#B45309"
              strokeWidth="1.2"
            />

            {/* Ruffled Fluted Crimped Edge Pattern along the arched top */}
            <path
              d="M16 60 Q20 48 24 50 Q28 38 32 40 Q36 29 42 32 Q48 24 54 26 Q60 27 66 34 Q72 37 76 44 Q80 48 84 59"
              stroke="#FFFBEB"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 60 Q20 48 24 50 Q28 38 32 40 Q36 29 42 32 Q48 24 54 26 Q60 27 66 34 Q72 37 76 44 Q80 48 84 59"
              stroke="#B45309"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Fried Crisp Blister Dots */}
            <g fill="#B45309" opacity="0.4">
              <circle cx="34" cy="48" r="1.5" />
              <circle cx="48" cy="42" r="1.8" />
              <circle cx="62" cy="46" r="1.6" />
              <circle cx="44" cy="52" r="1.4" />
              <circle cx="56" cy="54" r="1.5" />
            </g>

            {/* Pistachio & Almond Crumb Dusting */}
            <circle cx="42" cy="38" r="1.2" fill="#16A34A" />
            <circle cx="54" cy="36" r="1.2" fill="#22C55E" />
            <circle cx="48" cy="45" r="1.5" fill="#FFFBEB" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-diwali-gold to-diwali-amber flex items-center justify-center font-bold text-xs text-diwali-navy">
            🍬
          </div>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${dimension} ${className}`}>
      {renderSweetSvg()}
    </div>
  );
}
