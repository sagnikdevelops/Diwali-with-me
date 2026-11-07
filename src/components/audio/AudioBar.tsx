"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Music, Sparkles, ChevronUp, ChevronDown, Info } from "lucide-react";
import { audioSynth } from "@/lib/audio-synth";

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
}

const TRACKS: AudioTrack[] = [
  {
    id: "sitar",
    title: "Diwali Festive Ambience",
    artist: "Festive Background Music",
    src: "/audio/festive-sitar.mp3",
  },
  {
    id: "bansuri",
    title: "Diwali Celebration Beats",
    artist: "Festive Background Music",
    src: "/audio/bansuri-flute.mp3",
  },
  {
    id: "santoor",
    title: "Festive Deepavali Vibes",
    artist: "Festive Background Music",
    src: "/audio/santoor-celebration.mp3",
  },
];

export function AudioBar() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasAudioFileError, setHasAudioFileError] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Keep Web Audio synth in sync with user state
    audioSynth.setMuted(isMuted);
    audioSynth.setSfxEnabled(sfxEnabled);
  }, [isMuted, sfxEnabled]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasAudioFileError(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // File not present or browser autoplay policy blocked
          setIsPlaying(false);
          setHasAudioFileError(true);
        });
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioSynth.setMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const handleTrackChange = (index: number) => {
    setCurrentTrackIndex(index);
    setHasAudioFileError(false);
    if (audioRef.current) {
      audioRef.current.src = TRACKS[index].src;
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
          setHasAudioFileError(true);
        });
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm">
      <audio
        ref={audioRef}
        src={TRACKS[currentTrackIndex].src}
        loop
        preload="none"
        onError={() => setHasAudioFileError(true)}
      />

      <div className="bg-diwali-midnight/90 backdrop-blur-md border border-diwali-gold/30 rounded-2xl shadow-2xl p-3 text-diwali-ivory transition-all duration-300">
        {/* Main Header / Quick Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-xs font-medium text-diwali-goldLight hover:text-white transition-colors"
            title="Audio Controls"
            aria-label="Toggle audio panel"
          >
            <div className="w-8 h-8 rounded-full bg-diwali-purple/60 border border-diwali-gold/40 flex items-center justify-center">
              <Music className={`w-4 h-4 text-diwali-gold ${isPlaying ? "animate-spin-slow" : ""}`} />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold leading-tight">{TRACKS[currentTrackIndex].title}</p>
              <p className="text-[10px] text-diwali-lavender">
                {isPlaying ? "Playing Festive Ambient" : "Sound & Music"}
              </p>
            </div>
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-1.5 ml-auto">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="p-2 rounded-xl bg-diwali-gold/20 hover:bg-diwali-gold/30 text-diwali-gold hover:text-white border border-diwali-gold/40 transition-colors"
              aria-label={isPlaying ? "Pause music" : "Play music"}
              title={isPlaying ? "Pause" : "Play ambient music"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border transition-colors ${
                isMuted
                  ? "bg-diwali-crimson/20 border-diwali-crimson/40 text-diwali-crimson"
                  : "bg-diwali-surface hover:bg-diwali-surfaceLight border-white/10 text-diwali-ivory"
              }`}
              aria-label={isMuted ? "Unmute" : "Mute"}
              title={isMuted ? "Unmute audio" : "Mute all audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Controller Panel */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-diwali-gold/20 space-y-3">
            {/* Volume Slider */}
            <div>
              <label htmlFor="audio-volume-slider" className="flex justify-between text-[11px] text-diwali-lavender mb-1 cursor-pointer">
                <span>Music Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </label>
              <input
                id="audio-volume-slider"
                name="audioVolume"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-diwali-gold cursor-pointer h-1.5 bg-diwali-surface rounded-lg"
                aria-label="Volume slider"
              />
            </div>

            {/* Track Selector */}
            <div>
              <p className="text-[11px] text-diwali-lavender mb-1.5 font-medium">Select Ambient Track</p>
              <div className="space-y-1">
                {TRACKS.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => handleTrackChange(idx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      currentTrackIndex === idx
                        ? "bg-diwali-gold/20 text-diwali-goldLight font-medium border border-diwali-gold/30"
                        : "hover:bg-diwali-surface text-diwali-lavender"
                    }`}
                  >
                    <span>{track.title}</span>
                    {currentTrackIndex === idx && isPlaying && (
                      <span className="w-2 h-2 rounded-full bg-diwali-gold animate-ping" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Synthesizer Sound FX Toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs text-diwali-ivory">
                <Sparkles className="w-3.5 h-3.5 text-diwali-amber" />
                <span>Web Audio Chimes (SFX)</span>
              </div>
              <button
                onClick={() => setSfxEnabled(!sfxEnabled)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  sfxEnabled ? "bg-diwali-gold" : "bg-diwali-surface"
                }`}
                aria-label="Toggle sound effects"
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    sfxEnabled ? "translate-x-4" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Audio asset notification */}
            {hasAudioFileError && (
              <div className="bg-diwali-purple/30 border border-diwali-gold/20 rounded-xl p-2.5 text-[11px] text-diwali-lavender flex items-start gap-2">
                <Info className="w-4 h-4 text-diwali-goldLight shrink-0 mt-0.5" />
                <div>
                  <p className="text-diwali-ivory font-medium">BGM Setup Notice</p>
                  <p>
                    Ambient mp3 tracks can be placed in <code className="text-diwali-goldLight">public/audio/</code> per{" "}
                    <span className="underline">AUDIO_ASSETS.md</span>. Synthesized Web Audio chimes for diyas and fireworks are actively working!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

