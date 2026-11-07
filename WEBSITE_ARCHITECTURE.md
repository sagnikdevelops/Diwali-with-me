# Diwali Greeting Website — Architecture & Technical Specifications

## 1. System Overview

The Diwali Greeting Website is engineered as a high-performance Next.js application built with React, TypeScript, and Tailwind CSS. It is architected specifically to meet the **₹0 budget constraint** while delivering a rich, interactive, competition-grade festive experience.

```
+-----------------------------------------------------------------------------------+
|                                Client Browser                                     |
|  +------------------+  +-------------------+  +--------------------------------+  |
|  | Cinematic Intro  |  | Sweet Selection   |  | Interactive Canvas (Fireworks) |  |
|  +------------------+  +-------------------+  +--------------------------------+  |
|  | Personalised Diya|  | Rangoli Studio    |  | Photo Greeting Studio (Local)  |  |
|  +------------------+  +-------------------+  +--------------------------------+  |
|  | 6-Style Cards    |  | Web Audio Chimes  |  | Mystery Gift & Mithai Quiz     |  |
|  +------------------+  +-------------------+  +--------------------------------+  |
+------------------------------------------^----------------------------------------+
                                           |
                                  URL State & Storage
                                           |
                     +---------------------+---------------------+
                     |                                           |
           +---------v-----------+                     +---------v-----------+
           | URL-Safe State Code |                     | LocalStorage Cache  |
           | (/share?data=...)   |                     | (Diyas, Preferences)|
           +---------------------+                     +---------------------+
                     |
           +---------v-----------+
           | Next.js App Router  |
           | - / (Main Experience)|
           | - /share (Viewer)   |
           | - /api/generate     |
           +---------+-----------+
                     |
          +----------v-----------+
          | Gemini Free Tier API | (Optional; with 36+ curated offline fallbacks)
          +----------------------+
```

---

## 2. Component Hierarchy & Module Structure

```
src/
├── app/
│   ├── layout.tsx                # Global HTML root, font injection, audio bar, metadata
│   ├── page.tsx                  # Main home page orchestrating all festive sections
│   ├── globals.css               # Festive custom utilities, glow keyframes, scrollbar
│   ├── share/
│   │   └── page.tsx              # Dynamic share recipient view (decodes ?data=...)
│   └── api/
│       └── generate-greeting/
│           └── route.ts          # Server-side Gemini AI generation with rate limiting & fallback
├── components/
│   ├── header/
│   │   └── FestiveHeader.tsx     # Interactive header with scroll progress, active section spy & sweet switcher
│   ├── footer/
│   │   └── FestiveFooter.tsx     # Signature footer with sacred shloka, center diya & Sagnik Dutta copyright
│   ├── audio/
│   │   ├── AudioManager.tsx      # Web Audio API synthesiser + Ambient BGM Player
│   │   └── AudioBar.tsx          # Fixed floating audio controller (mute, volume, sound fx)
│   ├── countdown/
│   │   └── DiwaliCountdown.tsx   # Asia/Kolkata timezone countdown with post-event celebration
│   ├── diya/
│   │   ├── DiyaVisual.tsx        # High-detail SVG/CSS Diya with flickering flame & aura
│   │   ├── DiyaLightModal.tsx    # Diya lighting dialog with style picker & consent
│   │   └── WallOfLight.tsx       # Interactive constellation grid of community lit diyas
│   ├── fireworks/
│   │   ├── FireworksCanvas.tsx   # Hardware-accelerated 2D canvas fireworks simulation
│   │   ├── SurpriseMode.tsx      # Full-screen cinematic Diwali celebration sequence
│   │   └── FireworkFacts.tsx     # Eco-conscious safety & pet sensitivity educational facts
│   ├── greeting/
│   │   ├── GreetingCreator.tsx   # 6-template interactive greeting builder
│   │   ├── templates/            # Distinct design implementations:
│   │   │   ├── RoyalTraditional.tsx
│   │   │   ├── MinimalElegant.tsx
│   │   │   ├── GoldenLuxury.tsx
│   │   │   ├── ColourfulFamily.tsx
│   │   │   ├── ModernFestive.tsx
│   │   │   └── SpiritualSerene.tsx
│   │   ├── AiGreetingModal.tsx   # Multilingual, tone-aware AI greeting assistant
│   │   └── PhotoGreeting.tsx     # 100% client-side festive photo frame creator
│   ├── intro/
│   │   ├── CinematicWelcome.tsx  # Animated mandala reveal & enter gateway
│   │   └── SweetChoiceModal.tsx  # Kaju Katli vs Soan Papdi playful opener
│   ├── lanterns/
│   │   ├── SkyLanterns.tsx       # Rising lanterns night sky canvas
│   │   └── WishWall.tsx          # Community wishes constellation
│   ├── rangoli/
│   │   ├── RangoliStudio.tsx     # Interactive multi-radial canvas & preset patterns
│   │   └── RangoliPresets.ts     # Mathematical lotus, star, and chakra geometry
│   ├── surprise/
│   │   ├── MysteryGift.tsx       # 3D-styled animated unboxing surprise
│   │   └── FestiveQuiz.tsx       # Interactive Mithai Personality Quiz
│   └── ui/
│       ├── Button.tsx
│       ├── SectionHeading.tsx
│       ├── Modal.tsx
│       └── Toast.tsx
├── config/
│   ├── festive.ts                # Configurable Diwali dates, timezones, and festival messages
│   └── ai-fallbacks.ts           # 36+ hand-crafted authentic multilingual greetings
└── lib/
    ├── audio-synth.ts            # Web Audio API frequency synthesis (chimes, pops, shimmers)
    ├── share-codec.ts            # URL-safe state encoder/decoder with validation
    └── utils.ts                  # Safe class merging, sanitizer, text trimmer
```

---

## 3. Data Flow & Zero-Cost Persistence Strategy

### 3.1 Cross-Device Shareable Links via URL State Codec
To eliminate the need for paid cloud databases while ensuring 100% cross-device reliability:
1. When a user creates a greeting, its state is serialized to a compact JSON payload.
2. The payload is Base64URL encoded (`src/lib/share-codec.ts`) and appended as `/share?data=<encoded_state>`.
3. Anyone receiving the link opens the `/share` page, which decodes, validates, and renders the exact personalized card with zero external database dependencies.
4. If Firebase credentials are configured in `.env`, the system also synchronizes the greeting ID to Firestore as an optional cloud enhancement.

### 3.2 Privacy & Local Storage
- Community Diya submissions and Lantern wishes are validated against strict length boundaries (Name <= 30 chars, Wish <= 140 chars).
- XSS prevention is guaranteed by React's native string interpolation (no `dangerouslySetInnerHTML`).
- Visitors can view, hide, or clear their submissions at any time from their local device.
- Uploaded photos never touch a network server — all canvas compositing is computed locally via HTML5 `<canvas>`.

