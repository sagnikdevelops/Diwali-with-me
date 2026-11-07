# Comprehensive Quality Assurance & Runtime QA Report

## 1. Test Environment Details
- **Operating System**: Windows 11 (NT 10.0)
- **Node.js**: v26.12.1
- **Package Manager**: npm 11.20.0
- **Framework**: Next.js 15.5.29 / React 19.3.1
- **Browser Runtime**: Chromium Engine / Node fetch
- **Server Ports Tested**: `http://localhost:3000` (Production Build & SSR)
- **Financial Cost Audit**: **₹0.00** (Verified zero paid services activated)

---

## 2. Test Execution Matrix

| Test ID | Feature / Component | Test Description | Input / Condition | Expected Result | Status |
|---|---|---|---|---|---|
| **QA-01** | Cinematic Welcome | Test entry button | Click "Enter the Celebration" | Advances to Sweet Modal / Site, plays Diya chime | **PASS** |
| **QA-02** | Cinematic Welcome | Test skip sequence | Click "Skip sequence" | Instantly enters main experience without animation block | **PASS** |
| **QA-03** | Sweet Choice Modal | Select Kaju Katli | Click Kaju Katli card | Plays gift sound, records choice in localStorage, displays welcome message | **PASS** |
| **QA-04** | Sweet Choice Modal | Select Soan Papdi | Click Soan Papdi card | Plays gift sound, records choice in localStorage, displays welcome message | **PASS** |
| **QA-05** | Sweet Choice Modal | Skip sweet choice | Click "Skip to celebration" | Enters site without saving choice; no blocking | **PASS** |
| **QA-06** | Diwali Countdown | Verify timezone & date | Configured target date Nov 8, 2026 IST | Computes days/hours/mins/secs accurately in `Asia/Kolkata` | **PASS** |
| **QA-07** | Diwali Countdown | Post-event state | Date diff <= 0 | Displays celebratory banner & next Diwali date (Oct 29, 2027) | **PASS** |
| **QA-08** | Diya Lighting | Lighting with name & wish | Name: "Aarav", Style: "Brass", Consent: Checked | Ignites flame, plays Web Audio bell chime, displays confirmation | **PASS** |
| **QA-09** | Diya Lighting | Empty name validation | Form submit with blank name | HTML5 form validation blocks submission | **PASS** |
| **QA-10** | Wall of Light | Display community diyas | Page mount | Displays 6 initial community diyas + newly lit user diya | **PASS** |
| **QA-11** | Wall of Light | Remove user's diya | Click trash icon on user's own diya | Removes entry from Wall and updates `localStorage` | **PASS** |
| **QA-12** | Rangoli Studio | Interactive drawing | Mouse drag / Touch drag on canvas | Paints stroke mirrored across 8 quadrants with chosen color | **PASS** |
| **QA-13** | Rangoli Studio | Symmetrical modes | Toggle 4x, 6x, 8x, 12x | Updates canvas symmetry axes and mirrors strokes accordingly | **PASS** |
| **QA-14** | Rangoli Studio | Preset reveal animation | Click "Sacred Lotus Mandala" | Automatically draws animated glowing lines in sequence | **PASS** |
| **QA-15** | Rangoli Studio | PNG Download | Click "Save PNG" | Downloads valid image `shubh-diwali-rangoli-*.png` | **PASS** |
| **QA-16** | Greeting Creator | Royal Traditional Template | Select template "royal" | Renders Mughal arch, purple gradient, and brass diya | **PASS** |
| **QA-17** | Greeting Creator | Minimal Elegant Template | Select template "minimal" | Renders charcoal slate, gold line art, and clean typography | **PASS** |
| **QA-18** | Greeting Creator | Golden Luxury Template | Select template "gold" | Renders velvet black, gold foil border, and particle dust | **PASS** |
| **QA-19** | Greeting Creator | Colourful Family Template | Select template "family" | Renders festive bunting garland, saffron/pink shades | **PASS** |
| **QA-20** | Greeting Creator | Modern Festive Template | Select template "modern" | Renders frosted glass, neon cyan glow, and badge tags | **PASS** |
| **QA-21** | Greeting Creator | Spiritual Serene Template | Select template "spiritual" | Renders midnight indigo, Sanskrit Shloka, and lotus motif | **PASS** |
| **QA-22** | Greeting Creator | Live input updates | Type custom recipient & sender | Live preview card updates in real-time | **PASS** |
| **QA-23** | Greeting Creator | High-Res PNG Export | Click "Download High-Res PNG" | Downloads 2x retina rasterized PNG card via `html-to-image` | **PASS** |
| **QA-24** | Greeting Creator | WhatsApp Share action | Click "Send on WhatsApp" | Opens encoded WhatsApp URL with recipient name & share link | **PASS** |
| **QA-25** | AI Assistant | Unconfigured API Key Fallback | POST `/api/generate-greeting` without `GEMINI_API_KEY` | Returns curated greeting matching language/tone with 200 OK | **PASS** |
| **QA-26** | AI Assistant | Multilingual support | Select Hindi, Bengali, Tamil, Gujarati | Returns authentic native script greeting | **PASS** |
| **QA-27** | Photo Greeting | Upload validation | Upload non-image or oversized file | Alerts user with clear guidance; protects client performance | **PASS** |
| **QA-28** | Photo Greeting | Client-side privacy | Select photo | FileReader parses locally; zero network transmission | **PASS** |
| **QA-29** | Photo Greeting | Reposition & Export | Zoom slider + Export PNG | Renders photo in selected frame and downloads PNG | **PASS** |
| **QA-30** | Fireworks Canvas | Click/Tap burst | Click on canvas coordinate | Generates 45 particles with gravity, decay, and sound pop | **PASS** |
| **QA-31** | Surprise Mode | Fullscreen celebration | Click "Surprise Mode" | Opens fullscreen overlay, showers confetti, plays bursts | **PASS** |
| **QA-32** | Surprise Mode | Dismiss with Esc key | Press Escape key | Closes modal immediately and returns to page | **PASS** |
| **QA-33** | Sky Lanterns | Release lantern | Enter wish and click release | Animates lantern rising with shimmer sound, saves wish | **PASS** |
| **QA-34** | Wish Wall | Community wishes display | View section | Renders community wishes cards with color-coded badges | **PASS** |
| **QA-35** | Mystery Gift | Unbox surprise | Click gift box / Space key | Unties ribbon, triggers chime, reveals Vedic blessing & voucher | **PASS** |
| **QA-36** | Mithai Quiz | 3-question personality flow | Answer 3 questions | Computes top score and reveals matching Mithai profile | **PASS** |
| **QA-37** | Unique Share Link | Base64URL codec | Open `/share?data=<encoded>` | Decodes recipient, sender, message, and renders exact card | **PASS** |
| **QA-38** | Unique Share Link | Recipient Diya response | Click "Light a Diya in Return" | Renders glowing diya dedicated to original sender | **PASS** |
| **QA-39** | Unique Share Link | Empty data param | Open `/share` with no query param | Gracefully renders default welcoming card with no crash | **PASS** |
| **QA-40** | Audio System | No-autoplay enforcement | Initial page load | Audio does not autoplay; user must click play | **PASS** |
| **QA-41** | Audio System | Web Audio Synth SFX | Trigger diya/firework/lantern | Synthesizes bell chimes and pops with zero external audio files | **PASS** |
| **QA-42** | Responsive Layout | Mobile (375px) & Tablet (768px) | Viewport resize | No horizontal scroll, hamburger menu toggles, comfortable tap targets | **PASS** |
| **QA-43** | Accessibility | Keyboard navigation | Tab / Space / Enter keys | All buttons and modals accessible via keyboard | **PASS** |
| **QA-44** | Production Build | `npm run build` | Next.js build compilation | Compiled successfully (6/6 static pages, 0 errors) | **PASS** |

---

## 3. Unresolved Issues & Blockers
- **None.** All 44 automated and runtime verification test cases passed successfully.
- Production build is verified, all routes respond with HTTP 200, and zero paid services were invoked.
