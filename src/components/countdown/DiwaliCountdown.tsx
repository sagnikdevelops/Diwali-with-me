"use client";

import React, { useState, useEffect } from "react";
import { FESTIVE_CONFIG } from "@/config/festive";
import { Clock, Sparkles } from "lucide-react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export function DiwaliCountdown() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);

    const calculateTime = () => {
      const targetTime = new Date(FESTIVE_CONFIG.targetIsoDate).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds, isPassed: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) {
    return (
      <div className="flex justify-center my-6">
        <div className="h-20 w-80 bg-diwali-surface/40 animate-pulse rounded-2xl border border-diwali-gold/20" />
      </div>
    );
  }

  if (timeRemaining.isPassed) {
    return (
      <div className="my-8 p-6 max-w-xl mx-auto rounded-3xl bg-gradient-to-r from-diwali-purple/40 via-diwali-surface to-diwali-purple/40 border border-diwali-gold/50 shadow-2xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-diwali-gold/20 text-diwali-goldLight text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
          <span>Auspicious Moment Arrived</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-diwali-goldLight mb-1">
          {FESTIVE_CONFIG.celebrationTitle}
        </h3>
        <p className="text-xs sm:text-sm text-diwali-lavender mb-3">
          {FESTIVE_CONFIG.celebrationSubtitle}
        </p>
        <p className="text-[11px] text-diwali-gold/80">
          Next Grand Deepavali Celebration: October 29, 2027
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeRemaining.days },
    { label: "Hours", value: timeRemaining.hours },
    { label: "Minutes", value: timeRemaining.minutes },
    { label: "Seconds", value: timeRemaining.seconds },
  ];

  return (
    <div className="my-8 max-w-xl mx-auto px-4">
      {/* Timezone label */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-diwali-lavender/80 mb-3 tracking-wide">
        <Clock className="w-3.5 h-3.5 text-diwali-gold" />
        <span>Diwali Countdown to November 8, 2026 • Timezone: {FESTIVE_CONFIG.timezone}</span>
      </div>

      {/* Countdown Digits */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-diwali-surface to-diwali-midnight/90 border border-diwali-gold/30 shadow-lg relative overflow-hidden group hover:border-diwali-gold/60 transition-colors"
          >
            {/* Ambient top light */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-diwali-gold to-transparent opacity-75" />

            <span className="text-2xl sm:text-4xl font-serif font-bold text-diwali-goldLight tabular-nums drop-shadow-sm group-hover:scale-105 transition-transform">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs text-diwali-lavender uppercase tracking-wider mt-1 font-medium">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

