/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#edf2f7",
        surface: "#edf2f7",
        "surface-low": "#e5ecf3",
        "surface-card": "#f0f5fa",
        "surface-high": "#f7fafc",
        primary: "#006495",
        "primary-light": "#4fa5e1",
        secondary: "#006877",
        "accent-cyan": "#67d5eb",
        "accent-soft": "#b5e0e3",
        "on-surface": "#0e2942",
        "on-surface-variant": "#4d6b82",
        "outline-soft": "#c9d9e4",
      },
      fontFamily: {
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        neu: "10px 10px 24px #d0dbe4, -10px -10px 24px #ffffff",
        "neu-sm": "5px 5px 12px #d3dee8, -5px -5px 12px #ffffff",
        "neu-lg": "16px 16px 36px #cbd7e2, -16px -16px 36px #ffffff",
        "neu-pillow":
          "-16px -16px 32px rgba(255, 255, 255, 0.95), 18px 18px 38px rgba(163, 177, 198, 0.38)",
        "neu-pillow-sm":
          "-10px -10px 22px rgba(255, 255, 255, 0.95), 12px 12px 26px rgba(163, 177, 198, 0.32)",
        "neu-inset": "inset 3px 3px 6px #cfdbe5, inset -3px -3px 6px #ffffff",
        "neu-inset-deep":
          "inset 4px 4px 10px #cad7e2, inset -4px -4px 10px #ffffff",
        "neu-pill": "6px 6px 14px #d2dee8, -6px -6px 14px #ffffff",
        "neu-pill-active":
          "inset 3px 3px 6px #cad7e2, inset -3px -3px 6px #ffffff",
        "neu-slider-pill":
          "4px 4px 10px rgba(186, 202, 218, 0.7), -4px -4px 10px #ffffff, 0 0 12px rgba(103, 213, 235, 0.25)",
      },
    },
  },
  plugins: [],
};
