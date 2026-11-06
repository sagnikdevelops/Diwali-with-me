import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        diwali: {
          navy: "#080D24",
          midnight: "#111A36",
          surface: "#161D3B",
          surfaceLight: "#1E274E",
          purple: "#54258C",
          violet: "#281044",
          gold: "#D4AF37",
          goldLight: "#F7E19A",
          goldBright: "#FFE27B",
          amber: "#FFB547",
          ivory: "#FFF6E5",
          lavender: "#B9B5C9",
          crimson: "#D9383A",
          cyan: "#00D2D3",
          marigold: "#FF8C00",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        festive: ["var(--font-cinzel-decorative)", "var(--font-cinzel)", "Georgia", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "flame-flicker": "flicker 2s ease-in-out infinite alternate",
        "float-slow": "float 6s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { transform: "scale(1) rotate(-1deg)", opacity: "0.95", filter: "drop-shadow(0 0 10px #FFB547)" },
          "50%": { transform: "scale(1.08) rotate(1.5deg)", opacity: "1", filter: "drop-shadow(0 0 18px #FFE27B)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

