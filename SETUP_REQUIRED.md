# Setup & Configuration Guide

## 1. Zero-Configuration Mode (Default)
The website is completely self-contained and functions immediately out of the box without any mandatory API keys or cloud accounts:
- **Interactive Fireworks**: Fully functional via HTML5 Canvas.
- **Diya Lighting & Wall of Light**: Works locally via `localStorage` with initial community entries.
- **Rangoli Studio**: Full interactive drawing, preset reveals, and PNG download.
- **Greeting Card Creator**: All 6 templates render and export as PNG.
- **Shareable Links**: Generates instant cross-device share links using URL state encoding (`/share?data=...`).
- **AI Greeting Generator**: Operates via 36+ curated multilingual, multi-tone greetings.
- **Sound Effects**: Native Web Audio API synthesis produces diya bells, pops, and chimes.

---

## 2. Optional Enhancements

### 2.1 Google Gemini AI Key (For Dynamic LLM Greetings)
1. Visit [Google AI Studio](https://aistudio.google.com/) and generate a free API key (verified free tier).
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Add your key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Restart your development server (`npm run dev`). The AI Greeting Modal will now automatically call the live Gemini model with automatic fallback if quota is exceeded.

### 2.2 Background Audio Music Tracks
1. Place standard `.mp3` tracks into `public/audio/`:
   - `festive-sitar.mp3`
   - `bansuri-flute.mp3`
   - `santoor-celebration.mp3`
2. Open the audio bar at the top/bottom of the website, click play, and enjoy full ambient audio.

---

## 3. Running Locally
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Open in your browser
http://localhost:3000
```
