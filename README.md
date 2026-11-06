# Shubh Deepavali — Diwali Greetings & Festive Sanctuary 🪔✨

> An immersive, culturally rich Indian Diwali festival experience built for the Website Building Competition under a strict **₹0 Budget**.

---

## 🌟 Key Highlights

- **Cinematic Opening & Sweet Debate**: Skippable atmospheric twilight sequence featuring a playful "Kaju Katli vs Soan Papdi" opening interaction.
- **Diwali Countdown**: Calibrated for Kartik Amavasya targeting November 8, 2026 in the `Asia/Kolkata` (IST) timezone, with graceful rollover to celebratory states.
- **Personalised Diya & Wall of Light**: Light digital diyas in 5 craft styles with real-time glowing flame physics, Web Audio chimes, and opt-in community display.
- **Interactive Rangoli Studio**: Symmetrical drawing canvas (4x, 6x, 8x, 12x radial symmetry) with 8 natural powder colours, animated preset reveals, and instant PNG export.
- **Greeting Card Creator (6 Distinct Templates)**:
  1. *Royal Traditional* (Mughal Arch & Brass Diya)
  2. *Minimal Elegant* (Charcoal Slate & Gold Lines)
  3. *Golden Luxury* (Black Velvet & Foil Accents)
  4. *Colourful Family* (Festive Bunting & Joy)
  5. *Modern Festive* (Cyan Neon Glassmorphism)
  6. *Spiritual and Serene* (Sacred Shlokas & Lotus)
- **AI Greeting Copywriter**: Server-side Google Gemini free-tier integration with a verified offline fallback catalog of 36+ authentic multilingual greetings.
- **Photo Greeting Studio**: 100% client-side image upload, zoom/crop, festive frames, and high-res PNG export with absolute user privacy.
- **Interactive Celestial Fireworks & Surprise Mode**: Touch/click fireworks simulation, golden confetti showers, and educational facts on pet safety & eco-friendly crackers.
- **Digital Sky Lanterns & Wish Wall**: Release ascending paper lanterns into the cosmos with heartfelt blessings.
- **Mystery Gift & Mithai Personality Quiz**: Animated 3D-styled unboxing surprises and a 3-question festive confectionery personality quiz.
- **Cross-Device Share Links**: Instant, database-free greeting sharing via URL-safe state encoding (`/share?data=...`) with WhatsApp integration.
- **Native Web Audio Synthesizer**: Pure harmonic bell chimes and firework bursts running natively in the browser with ₹0 cost and zero external audio dependencies.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom festive design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Web Audio API (OscillatorNode, BiquadFilterNode) + HTML5 Audio Player
- **Canvas Effects**: HTML5 2D Canvas Physics + [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Exporting**: [html-to-image](https://www.npmjs.com/package/html-to-image) for client-side PNG card rendering

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 18.18+ or 20+ (Node v26 verified)
- npm or pnpm or yarn

### 2. Installation
```bash
# Clone or navigate to the project directory
cd "Diwali Greeting website"

# Install dependencies
npm install
```

### 3. Local Development
```bash
# Start the local development server
npm run dev

# Open in your browser
http://localhost:3000
```

### 4. Build for Production
```bash
# Run production build and type checking
npm run build

# Start production server locally
npm start
```

---

## 🔑 Environment Variables (Optional)

The application operates **100% out of the box with zero required environment variables**.
If you wish to enable live Gemini AI generation:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `GEMINI_API_KEY` | Free-tier Google Gemini key from [Google AI Studio](https://aistudio.google.com/) | Uses offline 36-template catalog |
| `NEXT_PUBLIC_SITE_URL` | Base URL for social share links | `http://localhost:3000` |

---

## 🌐 Public Deployment Instructions (100% Free Tier)

### Deploying to Vercel (Recommended):
1. Push this repository to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com/) (Hobby Plan — ₹0).
3. Click **Add New Project** and import the repository.
4. Next.js is auto-detected. Add `GEMINI_API_KEY` in Environment Variables if desired.
5. Click **Deploy**. Your site will be live at `https://your-project.vercel.app` in under 60 seconds!

### Deploying to Netlify:
1. Sign in to [Netlify](https://netlify.com/) (Starter Plan — ₹0).
2. Connect your Git repository.
3. Build command: `npm run build` | Publish directory: `.next`
4. Deploy site for free.

---

## 📄 Project Documentation Index

- `DESIGN_SYSTEM.md` — Visual guidelines, color tokens, and motion rules
- `WEBSITE_ARCHITECTURE.md` — Technical routes, data flow, and components
- `PROJECT_DOCUMENTATION.md` — In-depth feature breakdown and specifications
- `COST_AND_SERVICES.md` — ₹0 budget verification and terms audit
- `AUDIO_ASSETS.md` — Audio specifications and royalty-free sourcing guide
- `ASSET_REQUESTS.md` — Vector and image specifications
- `SETUP_REQUIRED.md` — Setup instructions for developers and judges
- `QA_REPORT.md` — Comprehensive test matrix and runtime QA results

