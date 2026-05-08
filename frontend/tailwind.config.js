/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        akai: {
          black: "#050506",
          dark: "#0e0f12",
          gray: "#1a1d24",
          red: "#b3172f",
          glow: "#ff3b5c",
          white: "#f5f7fa",
        },
      },
      boxShadow: {
        "akai-glow": "0 0 0 1px rgba(179, 23, 47, 0.35), 0 12px 32px rgba(0, 0, 0, 0.5)",
        "akai-soft": "0 16px 35px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "akai-grid":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        "akai-grid": "34px 34px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
}
