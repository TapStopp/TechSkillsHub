import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Marist-inspired brand palette (configurable).
        brand: {
          50: "#fdf2f5",
          100: "#fce7ec",
          200: "#f8c4d2",
          300: "#f095ab",
          400: "#e35a7c",
          500: "#c8315a",
          600: "#a4123f", // primary maroon
          700: "#870f35",
          800: "#6f0f2f",
          900: "#5d112b",
          950: "#350417",
        },
        gold: {
          400: "#e9c46a",
          500: "#d4a437",
          600: "#b8860b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 10px 30px rgba(15, 23, 42, 0.12)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
