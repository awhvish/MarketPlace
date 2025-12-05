import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#6D28D9",
          hover: "#5b21b6",
          light: "#7c3aed",
          dark: "#4c1d95"
        },
        input: {
          DEFAULT: "rgb(229, 231, 235)",
          focus: "rgb(17, 24, 39)",
        },
        border: {
          DEFAULT: "rgb(229, 231, 235)",
        },
        ring: {
          DEFAULT: "rgb(17, 24, 39)",
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.2s ease-out",
        "slide-in-left": "slide-in-left 0.2s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.2s ease-out",
        "slide-in-top": "slide-in-top 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-up": "scale-up 0.15s ease-out",
        bounce: "bounce 0.5s ease-in-out infinite",
        "ken-burns": "kenBurns 20s ease infinite alternate",
        "text-shimmer": "textShimmer 3s ease-in-out infinite",
        "floating": "floating 3s ease-in-out infinite",
      },
      keyframes: {
        kenBurns: {
          "0%": { transform: "scale(1.0) translate(0, 0)" },
          "100%": { transform: "scale(1.2) translate(-2%, -2%)" }
        },
        textShimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" }
        },
        floating: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-top": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
      },
      transitionProperty: {
        height: "height",
        width: "width",
        spacing: "margin, padding",
      },
      backgroundSize: {
        '200': '200% 200%',
        '300': '300% 300%',
      },
    },
  },
  plugins: [],
};
export default config;
