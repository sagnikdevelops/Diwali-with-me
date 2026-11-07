# Audio Assets Specification & Sourcing Guide

## 1. Zero-Cost & Copyright Compliance Notice
In accordance with competition rules and intellectual property laws:
- **No copyrighted commercial tracks (e.g. Bollywood music) are bundled.**
- **No audio files were synthesized or fabricated as fake binary blobs.**
- **All sound effects out of the box are generated natively via the Web Audio API synthesizer** (`src/lib/audio-synth.ts`), which synthesizes pure harmonic sine/bell waves for diya chimes, soft filtered noise bursts for fireworks, and high-frequency arpeggios for lantern shimmers at ₹0 cost with zero copyright liability.
- The built-in audio player (`src/components/audio/AudioBar.tsx`) is designed to load custom royalty-free or user-licensed ambient tracks placed into `/public/audio/`.

---

## 2. Recommended Background Music Tracks to Source

When you wish to add custom background instrumental music, source royalty-free or Creative Commons CC-BY licensed audio from trusted portals such as [Pixabay Music](https://pixabay.com/music/), [Free Music Archive](https://freemusicarchive.org/), or [YouTube Audio Library].

| Slot | File Name | Recommended Style & Instruments | Ideal Duration | Loopable? |
|---|---|---|---|---|
| Track 1 | `festive-sitar.mp3` | Classical Sitar & Tanpura meditative ambient raga (Raga Bhupali or Yaman) | 2:00 – 3:30 min | Yes (Seamless loop) |
| Track 2 | `bansuri-flute.mp3` | Gentle Indian bamboo flute (Bansuri) with warm ambient drone | 1:45 – 3:00 min | Yes |
| Track 3 | `santoor-celebration.mp3` | Upbeat Kashmiri Santoor and soft Tabla rhythm | 2:00 – 4:00 min | Yes |

### Recommended Technical Format:
- **Format**: MP3 (128–192 kbps) or WebM audio for fastest web streaming.
- **Target Peak**: -3 dB (normalized to avoid harshness).
- **Fade**: 1.5s gentle fade-in and fade-out at loop boundaries.

---

## 3. Sound Effects (Synthesized Default vs Optional WAV Overrides)

The site includes native Web Audio API oscillators that fire immediately. If you want custom audio recordings, provide the following files in `/public/audio/sfx/`:

| Sound Effect | Trigger Event | Synthesizer Fallback | Suggested File Name | Duration |
|---|---|---|---|---|
| Diya Lighting | Clicking "Light My Diya" | Pentatonic bell chime (G5, B5, D6, G6) | `diya-light.mp3` | 1.2s |
| Firework Launch | Clicking interactive canvas or "Launch Firework" | Rising pitched white-noise sweep | `firework-launch.mp3` | 0.8s |
| Firework Burst | Firework reaching apex | Low-pass filtered noise burst + crackle | `firework-burst.mp3` | 1.5s |
| Lantern Release | Releasing a Sky Lantern | Ethereal shimmer arpeggio with reverb | `lantern-rise.mp3` | 2.0s |
| Gift Unbox | Opening the Mystery Gift Box | Bright ascending sparkle chime | `gift-reveal.mp3` | 1.0s |

---

## 4. Setup Instructions
1. Download royalty-free audio tracks meeting the descriptions above.
2. Place the audio files in the folder: `public/audio/`
3. If files are not present, the website detects this gracefully, displays a friendly configuration notice in the audio drawer, and continues playing the native Web Audio sound effects seamlessly.
