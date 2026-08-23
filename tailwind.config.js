/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F4EE",
        "paper-dim": "#EDE9DF",
        ink: {
          DEFAULT: "#161F2E",
          soft: "#3A4657",
          faint: "#6B7688",
        },
        charcoal: {
          DEFAULT: "#12161F",
          raised: "#181D28",
          border: "#262C3A",
        },
        wire: {
          DEFAULT: "#AE3226",
          soft: "#C6564A",
        },
        press: {
          DEFAULT: "#2C6664",
          soft: "#3E827F",
        },
      },
      fontFamily: {
        display: ["'Source Serif 4'", "serif"],
        body: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,31,46,0.06), 0 1px 0 rgba(22,31,46,0.04)",
      },
    },
  },
  plugins: [],
};
