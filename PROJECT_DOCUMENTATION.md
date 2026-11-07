# Diwali Greeting Website — Comprehensive Project Documentation

## 1. Executive Summary & Purpose

The **Diwali Greeting Website** is a competition-grade interactive digital sanctuary engineered to celebrate **Shubh Deepavali (The Festival of Lights)**. Built with modern web technologies under a strict **₹0 budget constraint**, the platform pairs cultural authenticity with rich interactive features, accessible responsive UI, client-side vector mechanics, and cross-device personalization.

---

## 2. Feature-by-Feature Deep Dive

### 2.1 Cinematic Welcome & Sweet Choice Opener
- **Visuals**: A gradual twilight reveal featuring animated mandala rings, glowing golden particles, and a lit ceremonial clay Diya.
- **Micro-Interaction**: "A Diwali classic: Kaju Katli or Soan Papdi?" inviting users to choose their favorite festive sweet.
- **Behavior**: Provides distinct humorous compliments ("A Royal Connoisseur!" for Kaju Katli, "The Legendary Ambassador!" for Soan Papdi). Per design requirement, this preference is **never stored in localStorage or persisted across visits**; it is asked every time the user visits the website, and visitors can easily switch their choice via a "(Change Sweet)" button anytime during their visit. Includes an accessible "Skip" button that prevents forced waiting.

### 2.2 Live Diwali Countdown
- **Configuration**: Configured for Kartik Amavasya (Deepavali) targeting `2026-11-08T18:00:00+05:30` in the `Asia/Kolkata` (IST) timezone.
- **Resilience**: Displays Days, Hours, Minutes, and Seconds with tabular numerals. When the moment arrives or passes, it seamlessly rolls over to an auspicious celebratory banner and notes the next upcoming festival date (October 29, 2027).

### 2.3 Personalised Diya & Wall of Light
- **Lighting Flow**: Users enter their name or family dedication, pick from 5 craft styles (Terracotta, Royal Brass, Peacock Blue, Rose Quartz, Amethyst Violet), and click "Light My Diya".
- **Animation & Audio**: The flame ignites with an animated bezier oscillation and plays an authentic pentatonic bell chime generated dynamically via the Web Audio API.
- **Privacy & Storage Architecture**: Implements a zero-backend, zero-cost privacy architecture. Entries are stored strictly in the visitor's browser (`localStorage`). An opt-in checkbox governs whether the entry is displayed on the browser's Wall of Light grid. When opted out, the entry is preserved only in a private devotional card with an instant extinguish/removal control and never rendered on the wall.
- **Starter Constellation**: Pre-populated with curated starter entries to ensure an immediate celebratory atmosphere without requiring an external cloud server.

### 2.4 Interactive Rangoli Studio
- **Dual Functionality**:
  1. *Interactive Drawing*: Offers 4x, 6x, 8x, and 12x radial symmetry. Any stroke drawn on the canvas is instantly mirrored across all quadrants, allowing anyone to draw intricate mandalas effortlessly on desktop and mobile touchscreens.
  2. *Animated Presets*: Features mathematical lotus, cosmic star, and peacock motifs that draw themselves in glowing animated trails.
- **Color Palette**: 8 natural powder shades (Haldi Gold, Sindoor Crimson, Gulal Pink, Rangoli Cyan, Marigold Orange, White Chalk, Leaf Green, Royal Purple).
- **Export**: Generates high-resolution PNG downloads directly from HTML5 `<canvas>`.

### 2.5 Greeting Card Creator & 6 Distinct Themes
Features 6 visually distinct templates designed with authentic festive aesthetics:
1. **Royal Traditional**: Ornate Mughal/Rajasthani architectural arch, deep royal purple backdrop (`#381154`), brass Diya, and serif gold typography.
2. **Minimal Elegant**: Clean charcoal slate (`#0F141E`), crisp champagne gold geometric line accents, and spacious luxury layout.
3. **Golden Luxury**: Deep velvet black (`#09090C`), metallic gold leaf foil borders, and shimmering golden dust.
4. **Colourful Family**: Joyful festive saffron, gulal magenta, and turquoise bunting with cheerful wishes.
5. **Modern Festive**: Frosted dark glassmorphism, neon amber & cyan light leaks, and futuristic badge tags.
6. **Spiritual and Serene**: Sacred midnight indigo (`#09112A`), glowing amethyst Diya, and the ancient Sanskrit Shloka: *“Tamaso Ma Jyotirgamaya”*.
- **Live Preview & Export**: Real-time typography updates as users type; exports to PNG via `html-to-image` at 2x pixel ratio for retina print sharpness.

### 2.6 AI Greeting Assistant (Gemini API + Curated Offline Catalog)
- **Controls**: Recipient name, Language (English, Hindi, Bengali, Hinglish, Tamil, Gujarati), Tone (Warm, Royal, Playful, Poetic, Traditional, Corporate), Relationship, and Custom topic.
- **Zero-Budget Resilience**: If a free `GEMINI_API_KEY` is configured in `.env`, it securely prompts Gemini 1.5 Flash via a server-side route. If absent or quota-limited, it automatically selects from 36+ hand-crafted authentic greetings with instant response time.
- **User Control**: Users can edit both the generated message and blessing before inserting into the card.

### 2.7 Photo Greeting Studio
- **Processing**: 100% client-side via HTML FileReader and Canvas. Photos never leave the browser.
- **Capabilities**: Zoom/scale slider, festive frame overlays (Mughal Arch, Marigold Wreath, Glowing Diyas, Velvet Gold), and instant PNG export.

### 2.8 Interactive Fireworks & Surprise Mode
- **Physics Simulation**: 2D canvas with rocket ascent, gravity acceleration, velocity dampening, and sparkling particle decay.
- **Interaction**: Users click or tap anywhere on the night sky to trigger multicolored bursts with synchronized synthesizer pops.
- **Surprise Mode**: Fullscreen celebration overlay with golden confetti showers, floating diyas, celebratory Devanagari typography, and keyboard `Escape` dismissal.
- **Educational Awareness**: Includes facts on CSIR-NEERI green crackers, pet auditory sensitivity, and air quality consciousness.

### 2.9 Digital Sky Lanterns & Wish Wall
- **Interaction**: Compose a wish for the world, select lantern glow tint (Amber, Saffron, Rose, Emerald), and watch it ascend into the sky with an ethereal upward shimmer.
- **Wish Wall**: Floating lantern cards displaying festive intentions. Operates with local browser persistence (`localStorage`) and curated starter wishes; entries opting out of the wall are held strictly in a private wish card with clear deletion controls.

### 2.10 Mystery Diwali Gift Box & Mithai Personality Quiz
- **Mystery Box**: Interactive animated 3D-styled gift box. Unties the golden ribbon to reveal random fortunes, blessings, or festive vouchers.
- **Mithai Personality Quiz**: 3 festive questions calculating whether the user is a Kaju Katli (Royalty & Class), Gulab Jamun (Warm Soul), Motichoor Laddu (Festive Pillar), or Jalebi (Spirited Spark).

### 2.11 Cross-Device URL-State Share System
- **Mechanism**: The greeting configuration is serialized and compressed into a Base64URL string (`/share?data=...`).
- **Reliability**: Any user who opens the link on any browser or mobile device instantly views the exact card with full recipient name, custom message, and theme with **zero database requirements**.
- **Recipient Reciprocation**: Recipients can click to light a digital Diya in return for the sender.

---

## 3. Audio System Architecture

- **Synthesizer Default (`src/lib/audio-synth.ts`)**: Built with the W3C Web Audio API. Synthesizes harmonic sine bells (784Hz, 987Hz, 1174Hz, 1568Hz) for Diyas, filtered noise bursts for fireworks, and triangle waves for shimmers.
- **Ambient Music Player (`src/components/audio/AudioBar.tsx`)**: Fixed floating bar with Play/Pause, Volume, Mute, Track selector, and SFX toggle.
- **Policy Compliance**: Autoplay is strictly disabled prior to user gesture. Audio errors are caught gracefully with helpful setup prompts.

