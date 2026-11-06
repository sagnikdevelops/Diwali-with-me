# Diwali Greeting Website — Design System & Visual Guidelines

## 1. Visual Philosophy & Atmosphere

The design system is crafted to evoke an authentic, cinematic Indian festive celebration. Rather than a flat, modern SaaS dashboard or clichéd vector clip-art, the aesthetic marries:
- **Sacred Illumination**: Warm radiance glowing out of deep twilight and midnight skies (`#080D24` to `#111A36`).
- **Royal Indian Heritage**: Intricate Mughal/Rajasthani architectural arches, Sacred Mandalas, Kolam/Rangoli geometric symmetries, and warm terracotta diya textures.
- **Modern Polish**: Subdued glassmorphic surfaces, golden borders (`#D4AF37`), subtle particle shimmer, and responsive layout hierarchies.

---

## 2. Colour Palette & Design Tokens

### Core Festive Palette

| Token Name | Hex Code | Visual Role | Contrast Target |
|---|---|---|---|
| `--color-diwali-navy` | `#080D24` | Primary viewport background, deep starry sky | Dark canvas base |
| `--color-diwali-midnight`| `#111A36` | Secondary container & card background | Contrast with gold text |
| `--color-diwali-surface` | `#161D3B` | Interactive elements, modal sheets, card faces | Accessible on navy |
| `--color-diwali-purple` | `#54258C` | Royal accent, festive vibrancy, regal aura | Accents & badges |
| `--color-diwali-violet` | `#281044` | Deep backdrop gradient & festive shadows | Atmospheric depth |
| `--color-diwali-gold` | `#D4AF37` | Royal festive gold, borders, icons, primary CTA | High-prestige accent |
| `--color-diwali-gold-light` | `#F7E19A` | Radiant golden highlights, headline emphasis | High readability on dark |
| `--color-diwali-amber` | `#FFB547` | Diya flame core, warm lighting, countdown digits | Radiant warmth |
| `--color-diwali-ivory` | `#FFF6E5` | Primary body typography & clear readability | AAA contrast on navy |
| `--color-diwali-lavender`| `#B9B5C9` | Secondary captions, subheadings, subtle borders | AA contrast on dark |
| `--color-diwali-crimson` | `#D9383A` | Sindoor red, auspicious festive accents | Festive contrast |
| `--color-diwali-cyan` | `#00D2D3` | Peacock cyan, rangoli accents | Vibrant contrast |
| `--color-diwali-marigold`| `#FF8C00` | Genda phool (marigold) orange, bright blooms | Festive vitality |

### Elevation & Lighting Gradients
- **Diya Glow Filter**: `drop-shadow(0 0 15px rgba(255, 181, 71, 0.65))`
- **Royal Gold Shimmer**: `linear-gradient(135deg, #FFE27B 0%, #D4AF37 50%, #996515 100%)`
- **Celestial Night Gradient**: `radial-gradient(ellipse at top, #1E124A 0%, #080D24 70%)`
- **Glassmorphic Surface**: `rgba(22, 29, 59, 0.75)` with `backdrop-filter: blur(16px)` and border `1px solid rgba(212, 175, 55, 0.25)`

---

## 3. Typography Hierarchy

1. **Festive Serif Display**: `Cinzel`, `Cinzel Decorative`, or classic Georgia fallback.
   - For hero titles, festival greetings, and greeting card headers.
   - Elegant, classical, chiselled stone carving aesthetic reminiscent of royal inscriptions.
2. **Body & Interface**: `Inter`, system sans-serif fallback.
   - Clean, highly legible, accessible across all screen densities.
   - Optimized for forms, configuration panels, facts, and button labels.
3. **Devanagari Support**: Unicode standard fonts ensuring Devanagari script (e.g. *शुभ दीपावली*, *तमसो मा ज्योतिर्गमय*) renders natively with zero font clashing.

---

## 4. Spacing, Touch Targets & Layout Grids

- **Touch Target Rule**: Minimum `44px × 44px` for all interactive buttons, icon toggles, colour swatches, and navigation links.
- **Container Max-Width**: `1280px` centered with responsive horizontal padding (`px-4` on mobile, `px-8` on desktop).
- **Responsive Breakpoints**:
  - `sm`: 640px (Mobile landscape & large handsets)
  - `md`: 768px (Tablets)
  - `lg`: 1024px (Laptops)
  - `xl`: 1280px (Desktops)

---

## 5. Animation & Motion Principles

1. **Intentional & Gentle**:
   - Diya flame flickers with smooth bezier oscillation (`2s ease-in-out infinite alternate`).
   - Floating elements rise gently without jarring jumps.
2. **Reduced Motion Respect**:
   - When `prefers-reduced-motion: reduce` is detected, all auto-rotations, particle physics, and rapid fireworks loops are paused or replaced with graceful static glow states.
3. **Performance First**:
   - Canvas-based animations (fireworks, rangoli rendering, particle field) are throttled via `requestAnimationFrame` and automatically paused when the document is hidden (`document.hidden`).

