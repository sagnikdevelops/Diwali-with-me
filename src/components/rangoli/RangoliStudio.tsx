"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { RANGOLI_PRESETS, RangoliPreset } from "./RangoliPresets";
import { Sparkles, Download, RotateCcw, Play, Palette, Brush, Check } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

const PALETTE = [
  { name: "Haldi Gold", hex: "#D4AF37" },
  { name: "Sindoor Crimson", hex: "#D9383A" },
  { name: "Gulal Pink", hex: "#E57593" },
  { name: "Peacock Cyan", hex: "#00D2D3" },
  { name: "Marigold Orange", hex: "#FF8C00" },
  { name: "White Chalk", hex: "#FFF6E5" },
  { name: "Leaf Green", hex: "#2EC4B6" },
  { name: "Royal Purple", hex: "#9D4EDD" },
];

export function RangoliStudio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(PALETTE[0].hex);
  const [brushSize, setBrushSize] = useState<number>(3);
  const [symmetry, setSymmetry] = useState<number>(8);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [activePreset, setActivePreset] = useState<string>("lotus-mandala");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Initialize canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0B1028";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw subtle guide circles & symmetry axes
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
    ctx.lineWidth = 1;

    [50, 100, 150, 190].forEach((r) => {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    for (let i = 0; i < symmetry; i++) {
      const angle = (i * 2 * Math.PI) / symmetry;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * 190, Math.sin(angle) * 190);
      ctx.stroke();
    }
    ctx.restore();
    setHasDrawn(false);
  }, [symmetry]);

  useEffect(() => {
    clearCanvas();
  }, [clearCanvas]);

  // Symmetrical Drawing
  const drawSegment = (fromX: number, fromY: number, toX: number, toY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const relFromX = fromX - centerX;
    const relFromY = fromY - centerY;
    const relToX = toX - centerX;
    const relToY = toY - centerY;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Glow effect
    ctx.shadowColor = selectedColor;
    ctx.shadowBlur = 6;

    for (let i = 0; i < symmetry; i++) {
      const angle = (i * 2 * Math.PI) / symmetry;

      // Normal rotation
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(relFromX, relFromY);
      ctx.lineTo(relToX, relToY);
      ctx.stroke();

      // Mirrored reflection for authentic kolam/rangoli symmetry
      ctx.scale(1, -1);
      ctx.beginPath();
      ctx.moveTo(relFromX, relFromY);
      ctx.lineTo(relToX, relToY);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
    setHasDrawn(true);
  };

  // Mouse & Touch Handlers
  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;
    const pos = getCanvasCoords(e);
    setIsDrawing(true);
    setLastPos(pos);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPos || isAnimating) return;
    const currentPos = getCanvasCoords(e);
    drawSegment(lastPos.x, lastPos.y, currentPos.x, currentPos.y);
    setLastPos(currentPos);
  };

  const handleEnd = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  // Animated Preset Reveal
  const playPresetAnimation = (preset: RangoliPreset) => {
    clearCanvas();
    setIsAnimating(true);
    audioSynth.playDiyaChime();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 190;

    let pathIdx = 0;
    let pointIdx = 0;
    const sym = preset.symmetry;

    const interval = setInterval(() => {
      if (pathIdx >= preset.paths.length) {
        clearInterval(interval);
        setIsAnimating(false);
        setHasDrawn(true);
        return;
      }

      const path = preset.paths[pathIdx];
      const p1 = path.points[pointIdx];
      const p2 = path.points[pointIdx + 1];

      if (p2) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = path.color;
        ctx.shadowBlur = 8;

        for (let i = 0; i < sym; i++) {
          const angle = (i * 2 * Math.PI) / sym;
          ctx.save();
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(p1[0] * radius, p1[1] * radius);
          ctx.lineTo(p2[0] * radius, p2[1] * radius);
          ctx.stroke();

          ctx.scale(1, -1);
          ctx.beginPath();
          ctx.moveTo(p1[0] * radius, p1[1] * radius);
          ctx.lineTo(p2[0] * radius, p2[1] * radius);
          ctx.stroke();
          ctx.restore();
        }
        ctx.restore();

        pointIdx++;
      } else {
        pathIdx++;
        pointIdx = 0;
      }
    }, 50);
  };

  // Download Rangoli as PNG
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `shubh-diwali-rangoli-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="rangoli-studio" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs font-semibold text-diwali-goldLight mb-3">
          <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
          <span>Sacred Kolam & Geometry</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-diwali-ivory mb-3">
          Interactive Rangoli Studio
        </h2>
        <p className="text-sm sm:text-base text-diwali-lavender">
          Draw with radial symmetry to create intricate festive patterns, or watch traditional geometric mandalas reveal themselves in radiant colours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6 bg-gradient-to-b from-diwali-surface to-diwali-midnight/90 border border-diwali-gold/30 rounded-3xl p-6 shadow-xl text-diwali-ivory">
          {/* Preset Patterns Section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-diwali-goldLight uppercase tracking-wider mb-3">
              <Play className="w-3.5 h-3.5 text-diwali-amber fill-current" />
              <span>Reveal Preset Patterns</span>
            </div>
            <div className="space-y-2">
              {RANGOLI_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  disabled={isAnimating}
                  onClick={() => {
                    setActivePreset(preset.id);
                    playPresetAnimation(preset);
                  }}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    activePreset === preset.id
                      ? "bg-diwali-gold/20 border-diwali-gold text-diwali-goldLight shadow-md"
                      : "bg-diwali-surface hover:bg-diwali-surfaceLight border-white/10 text-diwali-lavender"
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-diwali-ivory">{preset.name}</h4>
                    <p className="text-[11px] text-diwali-lavender mt-0.5">{preset.description}</p>
                  </div>
                  <Play className="w-4 h-4 text-diwali-gold shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <div id="rangoli-palette-label" className="flex items-center gap-2 text-xs font-semibold text-diwali-goldLight uppercase tracking-wider mb-3">
              <Palette className="w-3.5 h-3.5 text-diwali-gold" />
              <span>Natural Powder Palette</span>
            </div>
            <div role="radiogroup" aria-labelledby="rangoli-palette-label" className="grid grid-cols-4 gap-2.5">
              {PALETTE.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  role="radio"
                  aria-checked={selectedColor === col.hex}
                  aria-label={col.name}
                  onClick={() => setSelectedColor(col.hex)}
                  title={col.name}
                  className={`relative p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-transform ${
                    selectedColor === col.hex
                      ? "border-diwali-gold scale-110 shadow-lg shadow-diwali-gold/30"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full shadow-inner"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="text-[9px] text-diwali-lavender truncate w-full text-center">
                    {col.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Symmetry & Brush Slider */}
          <div className="space-y-4 pt-2 border-t border-diwali-gold/20">
            <div>
              <div id="rangoli-symmetry-label" className="flex justify-between text-xs text-diwali-lavender mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
                  <span>Radial Symmetry</span>
                </span>
                <span className="text-diwali-goldLight font-bold">{symmetry}-Fold</span>
              </div>
              <div role="radiogroup" aria-labelledby="rangoli-symmetry-label" className="grid grid-cols-4 gap-2">
                {[4, 6, 8, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    role="radio"
                    aria-checked={symmetry === num}
                    aria-label={`${num}-Fold Symmetry`}
                    onClick={() => {
                      setSymmetry(num);
                    }}
                    className={`py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      symmetry === num
                        ? "bg-diwali-gold text-diwali-navy border-diwali-gold"
                        : "bg-diwali-surface hover:bg-diwali-surfaceLight text-diwali-lavender border-white/10"
                    }`}
                  >
                    {num}x
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="rangoli-brush-slider" className="flex justify-between text-xs text-diwali-lavender mb-1 font-medium cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Brush className="w-3.5 h-3.5 text-diwali-gold" />
                  <span>Brush Width</span>
                </span>
                <span className="text-diwali-goldLight">{brushSize}px</span>
              </label>
              <input
                id="rangoli-brush-slider"
                name="rangoliBrushSize"
                type="range"
                aria-label="Brush Width"
                min="1"
                max="8"
                step="1"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full accent-diwali-gold cursor-pointer h-1.5 bg-diwali-midnight rounded-lg"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={clearCanvas}
              disabled={isAnimating}
              className="flex-1 py-2.5 rounded-xl bg-diwali-surface hover:bg-diwali-surfaceLight border border-white/10 text-xs font-medium text-diwali-lavender hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Canvas</span>
            </button>

            <button
              onClick={downloadImage}
              className="flex-1 py-2.5 rounded-xl bg-diwali-gold hover:bg-diwali-goldLight text-diwali-navy font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-diwali-gold/20"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copied ? "Downloaded!" : "Save PNG"}</span>
            </button>
          </div>
        </div>

        {/* Canvas Display Area */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="relative p-2 sm:p-4 rounded-3xl bg-gradient-to-b from-diwali-surface via-diwali-midnight to-diwali-navy border border-diwali-gold/40 shadow-2xl overflow-hidden">
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              style={{ touchAction: "none" }}
              className="rounded-2xl cursor-crosshair max-w-full h-auto shadow-inner"
            />

            {/* Subtle mobile helper hint */}
            <div className="text-center mt-3 text-[11px] text-diwali-lavender/70 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-diwali-amber" />
              <span>Tap & draw on the circle — your stroke blossoms into a full symmetrical mandala</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

