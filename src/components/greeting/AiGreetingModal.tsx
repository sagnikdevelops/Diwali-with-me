"use client";

import React, { useState } from "react";
import { X, Sparkles, Wand2, Check, ArrowRight, Info } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

interface AiGreetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGreeting: (message: string, blessing: string) => void;
  initialRecipient?: string;
}

const LANGUAGES = ["English", "Hindi", "Bengali", "Hinglish", "Tamil", "Gujarati"];
const TONES = [
  "Warm & Heartfelt",
  "Royal & Formal",
  "Playful & Funny",
  "Poetic & Soulful",
  "Traditional & Blessings",
  "Professional & Corporate",
];
const RELATIONSHIPS = [
  "Family",
  "Best Friend",
  "Colleague",
  "Mentor / Teacher",
  "Distant Relative",
  "Client/Customer",
];

export function AiGreetingModal({
  isOpen,
  onClose,
  onApplyGreeting,
  initialRecipient = "",
}: AiGreetingModalProps) {
  const [recipient, setRecipient] = useState<string>(initialRecipient);
  const [language, setLanguage] = useState<string>("English");
  const [tone, setTone] = useState<string>("Warm & Heartfelt");
  const [relationship, setRelationship] = useState<string>("Family");
  const [theme, setTheme] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [generatedBlessing, setGeneratedBlessing] = useState<string>("");
  const [notice, setNotice] = useState<string>("");

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setNotice("");
    audioSynth.playDiyaChime();

    try {
      const res = await fetch("/api/generate-greeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient,
          language,
          tone,
          relationship,
          theme,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedText(data.message);
        setGeneratedBlessing(data.blessing);
        if (data.note) {
          setNotice(data.note);
        }
      } else {
        throw new Error(data.error || "Failed to generate");
      }
    } catch (err) {
      console.error(err);
      setGeneratedText("May this auspicious Diwali illuminate your life with infinite joy, good health, and glorious success!");
      setGeneratedBlessing("Shubh Deepavali!");
      setNotice("Loaded offline fallback greeting.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseGreeting = () => {
    onApplyGreeting(generatedText, generatedBlessing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-diwali-navy/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full bg-gradient-to-b from-diwali-surface to-diwali-midnight border border-diwali-gold/40 rounded-3xl p-6 sm:p-7 shadow-2xl text-diwali-ivory max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-diwali-lavender hover:text-white rounded-full hover:bg-diwali-surfaceLight transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-diwali-purple/30 border border-diwali-gold/30 text-xs text-diwali-goldLight mb-2">
            <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
            <span>Festive AI Assistant</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-diwali-ivory">
            Personalised Greeting Generator
          </h2>
          <p className="text-xs text-diwali-lavender mt-1">
            Craft authentic, heartfelt festive messages customized for your loved ones.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          {/* Recipient */}
          <div>
            <label htmlFor="ai-recipient-input" className="block text-xs font-medium text-diwali-lavender mb-1">
              Recipient Name
            </label>
            <input
              id="ai-recipient-input"
              name="aiRecipient"
              type="text"
              maxLength={40}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Grandma, Rohit, Priya Di"
              className="w-full px-3.5 py-2.5 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-sm text-diwali-ivory placeholder-diwali-lavender/50"
            />
          </div>

          {/* Grid of Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Language */}
            <div>
              <label htmlFor="ai-language-select" className="block text-xs font-medium text-diwali-lavender mb-1">
                Language
              </label>
              <select
                id="ai-language-select"
                name="aiLanguage"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 text-xs text-diwali-ivory focus:outline-none"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l} className="bg-diwali-midnight text-white">
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Tone */}
            <div>
              <label htmlFor="ai-tone-select" className="block text-xs font-medium text-diwali-lavender mb-1">
                Tone
              </label>
              <select
                id="ai-tone-select"
                name="aiTone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 text-xs text-diwali-ivory focus:outline-none"
              >
                {TONES.map((t) => (
                  <option key={t} value={t} className="bg-diwali-midnight text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Relationship */}
            <div>
              <label htmlFor="ai-relationship-select" className="block text-xs font-medium text-diwali-lavender mb-1">
                Relationship
              </label>
              <select
                id="ai-relationship-select"
                name="aiRelationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 text-xs text-diwali-ivory focus:outline-none"
              >
                {RELATIONSHIPS.map((r) => (
                  <option key={r} value={r} className="bg-diwali-midnight text-white">
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Theme / Wish */}
          <div>
            <label htmlFor="ai-theme-input" className="block text-xs font-medium text-diwali-lavender mb-1">
              Custom Memory or Topic (Optional)
            </label>
            <input
              id="ai-theme-input"
              name="aiTheme"
              type="text"
              maxLength={80}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. good health for exam year, wedding blessings, new startup"
              className="w-full px-3.5 py-2 rounded-xl bg-diwali-surfaceLight/80 border border-diwali-gold/30 focus:border-diwali-gold focus:outline-none text-xs text-diwali-ivory placeholder-diwali-lavender/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-diwali-purple via-diwali-gold to-diwali-amber text-diwali-navy font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            <Wand2 className={`w-4 h-4 text-diwali-navy ${isLoading ? "animate-spin" : "group-hover:rotate-12 transition-transform"}`} />
            <span>{isLoading ? "Consulting AI Muse..." : "Generate Festive Message"}</span>
          </button>
        </form>

        {/* Notice Info */}
        {notice && (
          <div className="mt-3 bg-diwali-purple/20 border border-diwali-gold/20 rounded-xl p-2.5 text-[11px] text-diwali-lavender flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-diwali-goldLight shrink-0 mt-0.5" />
            <p>{notice}</p>
          </div>
        )}

        {/* Generated Result Output */}
        {generatedText && (
          <div className="mt-6 pt-5 border-t border-diwali-gold/30 space-y-3">
            <div className="p-4 rounded-2xl bg-diwali-navy/90 border border-diwali-gold/40 shadow-inner">
              <label htmlFor="ai-generated-message-output" className="block text-[11px] font-semibold text-diwali-goldLight uppercase tracking-wider mb-1 cursor-pointer">
                Generated Message (Editable)
              </label>
              <textarea
                id="ai-generated-message-output"
                name="aiGeneratedMessage"
                aria-label="Generated Message Editable Text"
                rows={3}
                value={generatedText}
                onChange={(e) => setGeneratedText(e.target.value)}
                className="w-full bg-transparent text-xs text-diwali-ivory focus:outline-none resize-none leading-relaxed"
              />
              <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                <label htmlFor="ai-generated-blessing-output" className="text-diwali-lavender cursor-pointer">
                  Blessing Sign-off:
                </label>
                <input
                  id="ai-generated-blessing-output"
                  name="aiGeneratedBlessing"
                  aria-label="Generated Blessing Sign-off"
                  type="text"
                  value={generatedBlessing}
                  onChange={(e) => setGeneratedBlessing(e.target.value)}
                  className="bg-transparent text-right font-serif font-bold text-diwali-goldLight focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleUseGreeting}
              className="w-full py-2.5 rounded-xl bg-diwali-gold hover:bg-diwali-goldLight text-diwali-navy font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-diwali-gold/30"
            >
              <Check className="w-4 h-4" />
              <span>Use in Greeting Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

