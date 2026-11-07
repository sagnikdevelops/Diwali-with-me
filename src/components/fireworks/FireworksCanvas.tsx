"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Sparkles, Flame, Volume2 } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

const BURST_COLORS = [
  "#FFE27B", // Gold
  "#FF8C00", // Amber/Marigold
  "#D9383A", // Crimson
  "#00D2D3", // Cyan
  "#9D4EDD", // Violet
  "#2EC4B6", // Emerald
  "#FFF6E5", // White Ivory
];

export function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  // Explode firework into particles
  const createBurst = useCallback((x: number, y: number, color?: string) => {
    audioSynth.playFireworkBurst();
    const burstColor = color || BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
    const count = 45; // battery safe count

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 4.5 + 1.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.3 ? burstColor : "#FFE27B",
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        size: Math.random() * 2 + 1.5,
      });
    }
  }, []);

  // Launch a rising rocket
  const launchRocket = useCallback((targetX: number, targetY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    audioSynth.playFireworkLaunch();

    rocketsRef.current.push({
      x: targetX,
      y: canvas.height,
      targetY: targetY,
      vy: -(Math.random() * 3 + 8),
      color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
    });
  }, []);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = 400;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const loop = () => {
      if (!isRunning) return;

      // Soft trail clear
      ctx.fillStyle = "rgba(8, 13, 36, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.y += r.vy;

        // Draw rocket spark
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Trail spark
        ctx.fillStyle = "rgba(255, 226, 123, 0.4)";
        ctx.fillRect(r.x - 1, r.y + 4, 2, 6);

        if (r.y <= r.targetY) {
          createBurst(r.x, r.y, r.color);
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // Gravity
        p.vx *= 0.98; // Friction
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isRunning, createBurst]);

  const lastHoverRef = useRef<number>(0);

  // Hover interaction: creates shimmering festive spark dust following cursor
  const handleHoverInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const now = Date.now();
    if (now - lastHoverRef.current < 45) return; // throttle for 60fps smoothness
    lastHoverRef.current = now;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spawn 4 shimmering trail particles
    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.2 + 0.5;
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
        alpha: 0.95,
        decay: Math.random() * 0.035 + 0.025,
        size: Math.random() * 2 + 1,
      });
    }
  };

  // Click & Touch to launch firework at exact position
  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    launchRocket(x, y);
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-diwali-navy via-diwali-midnight to-diwali-navy border border-diwali-gold/30 shadow-2xl overflow-hidden">
      {/* Top Controls Overlay */}
      <div className="absolute top-4 inset-x-6 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1 rounded-full bg-diwali-midnight/80 border border-diwali-gold/40 text-xs font-semibold text-diwali-goldLight flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
            <span>Hover to Spark • Click Sky to Burst</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              const canvas = canvasRef.current;
              if (canvas) {
                launchRocket(
                  canvas.width * 0.3 + Math.random() * (canvas.width * 0.4),
                  canvas.height * 0.25 + Math.random() * (canvas.height * 0.3)
                );
              }
            }}
            className="px-3.5 py-1.5 rounded-xl bg-diwali-gold text-diwali-navy font-bold text-xs hover:bg-diwali-goldLight transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Launch Firework</span>
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasInteraction}
        onTouchStart={handleCanvasInteraction}
        onMouseMove={handleHoverInteraction}
        className="w-full h-[360px] sm:h-[420px] cursor-crosshair block"
      />

      {/* Bottom Hint */}
      <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none text-[11px] text-diwali-lavender/60">
        Low-emission virtual fireworks • Safe for pets & lungs • Synthesized sound enabled
      </div>
    </div>
  );
}

