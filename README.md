# 🪔 Shubh Deepavali

**✨ A festive, browser-first Diwali experience for creating greetings, sharing good wishes, and celebrating the Festival of Lights.**

Shubh Deepavali brings familiar festive traditions into an interactive website. Visitors can make a greeting for someone they love, draw a rangoli, light a digital diya, or simply explore a little celebration. It is designed to be useful beyond a competition demo: the main experience works without an account, database, or API key.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

## 🎆 Screenshots

| The Diwali experience | Greeting card studio |
| --- | --- |
| ![Shubh Deepavali home page with its Diwali countdown and digital diya](public/screenshots/home.png) | ![Greeting card studio with six themes, editing controls, and a live card preview](public/screenshots/greeting-creator.png) |

## 🌟 What you can do

- **💌 Create and share a personal greeting.** Choose from six card themes, edit the recipient, sender, message, and blessing, then preview and download the card as a high-resolution PNG. Share it through WhatsApp or a URL that opens the greeting on another device.
- **✍️ Get help writing a message.** Use the optional AI copywriter for a tailored festive greeting. Without an API key, it uses a built-in collection of curated greetings instead.
- **🎨 Make a rangoli.** Draw with radial symmetry, explore preset patterns, and export your design as an image.
- **🪔 Light a diya and make a wish.** Add a name or dedication, choose a diya style, or release a sky lantern with a wish. Display choices are opt-in.
- **📸 Create a photo greeting.** Add a photo, adjust its framing, and apply a festive frame. Photo processing and export happen in the browser.
- **🎇 Explore the celebration.** Launch interactive digital fireworks, open a surprise gift, take a festive quiz, and listen to optional ambient music and sound effects.
- **🗓️ Follow the Diwali countdown.** See the festival countdown in the configured India Standard Time timezone, with a celebratory state after the date arrives.

## 💛 Made for everyday use

- **✅ No account required:** the core experience is available as soon as the site loads.
- **✨ Works without AI credentials:** curated greeting copy is available when Gemini is not configured.
- **🔒 Privacy-conscious by design:** uploaded photos stay in the browser. Diya and lantern entries are stored in the visitor's browser; opting in displays them on that device's wall, not a shared online community.
- **🔗 Shareable greetings without a database:** greeting details are encoded in the share URL. Anyone with the link can see its contents, so avoid including information you do not want to share.
- **📱 Designed for different screens:** the interface supports desktop and mobile layouts, including touch-friendly creative interactions.

## 🛠️ Technology

| Area | Tools |
| --- | --- |
| Framework and UI | Next.js 16 App Router, React 19, TypeScript |
| Styling and animation | Tailwind CSS, Motion |
| Icons | Lucide React |
| Drawing and effects | HTML Canvas, `canvas-confetti` |
| Audio | Web Audio API and HTML audio |
| Card image export | `html-to-image` |
| Optional AI copywriting | Server-side Google Gemini API route with curated local fallback messages |

## 🚀 Run locally

### 📋 Requirements

- Node.js **20.9 or later**
- npm

### Install and start

```bash
git clone https://github.com/sagnikdevelops/Diwali-with-me.git
cd Diwali-with-me
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 🤖 Optional AI setup

The site does not require an API key. To enable live Gemini-powered greeting generation, create `.env.local` from the example file and add your key:

```powershell
Copy-Item .env.example .env.local
```

```dotenv
GEMINI_API_KEY=your_api_key
```

Keep the key in the server-side environment; do not add real credentials to source control. The curated greeting fallback remains available when the key is not configured.

## 🧪 Quality checks

```bash
npm run lint
npm test
npm run build
```

## 📁 Project layout

```text
src/
  app/          App Router pages and greeting-generation API
  components/   Greeting, rangoli, diya, audio, and celebration UI
  config/       Festival settings and curated greeting content
  lib/          Share-link, audio, and utility modules
public/
  audio/        Ambient tracks and sound effects
  screenshots/  README screenshots
tests/          Automated tests
```

## ☁️ Deployment

Deploy to a host that supports Next.js, such as Vercel. The main experience needs no database setup. Add `GEMINI_API_KEY` to the host's server-side environment only if you want live AI greeting generation.

## 📚 More documentation

- [Project documentation](PROJECT_DOCUMENTATION.md) — feature details and behavior
- [Website architecture](WEBSITE_ARCHITECTURE.md) — routes, components, and data flow
- [Design system](DESIGN_SYSTEM.md) — visual tokens and design guidance
- [QA report](QA_REPORT.md) — testing and quality notes

## 👤 Author and license

Created by [Sagnik Dutta](https://www.linkedin.com/in/sagnikduttahere/). This project is provided under its proprietary terms; see [LICENSE](LICENSE) and [NOTICE](NOTICE) for details.
