# Visual Asset Requests & Replacement Specifications

## 1. Overview
All visual motifs, frames, mandalas, diya illustrations, sweets, and rangolis currently embedded in the project are created using **clean, lightweight, responsive SVG vectors and mathematical Canvas coordinates**. This ensures 100% self-contained independence with zero broken external image links and ₹0 cost.

If you wish to provide photographic or high-resolution custom illustrated assets, the slots and recommended dimensions are detailed below.

---

## 2. Asset Slots

| Asset Key | Target Path | Current Fallback | Recommended Dimensions | Content Description |
|---|---|---|---|---|
| Sweet: Kaju Katli | `public/images/sweets/kaju-katli.webp` | Custom SVG diamond silver-leaf illustration | 600 × 600 px (Transparent PNG / WebP) | Diamond-shaped cashew confectionery with edible silver leaf (varak) |
| Sweet: Soan Papdi | `public/images/sweets/soan-papdi.webp` | Custom SVG cubic flaky-textured illustration | 600 × 600 px (Transparent PNG / WebP) | Flaky golden-cardamom gram flour squares with almond/pistachio garnish |
| Hero Festive Diya | `public/images/hero-diya.webp` | Multi-layered SVG diya with dynamic animated CSS flame | 1200 × 800 px (Transparent PNG / WebP) | Traditional clay diya sitting on decorative marigold petals |
| Photo Greeting Frame 1 | `public/images/frames/royal-arch.svg` | SVG Ornate Indian Mughal arch | 1080 × 1350 px (SVG / Transparent PNG) | Intricate golden royal arch with hanging lanterns |
| Photo Greeting Frame 2 | `public/images/frames/floral-rangoli.svg` | SVG Marigold garland wreath | 1080 × 1350 px (SVG / Transparent PNG) | Lush orange and yellow marigold floral border |

---

## 3. Placement & Instructions
When placing files into the corresponding paths in `/public/`:
- Keep file sizes under 250 KB per image using WebP or compressed SVG.
- Ensure transparent alpha channels (`.webp` or `.png`) around borders so they blend seamlessly with the deep navy background.

