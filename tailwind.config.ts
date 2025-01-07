import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4A6741",
          foreground: "#FFFFFF",
          50: "#F5F7F4",
          100: "#E8EDE6",
          200: "#D1DBCD",
          300: "#B9C9B4",
          400: "#A2B79B",
          500: "#8BA582",
          600: "#748F6A",
          700: "#5D7853",
          800: "#45613C",
          900: "#2E4A25",
        },
        secondary: {
          DEFAULT: "#D4B254",
          foreground: "#1A1A1A",
          50: "#FCF8ED",
          100: "#F9F1DB",
          200: "#F3E3B7",
          300: "#EDD593",
          400: "#E7C76F",
          500: "#E1B94B",
          600: "#D4A827",
          700: "#A8851F",
          800: "#7C6217",
          900: "#503F0F",
        },
        accent: {
          DEFAULT: "#8E9196",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F0F0F0",
          foreground: "#737373",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
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
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4A6741 0%, #5D7853 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #D4B254 0%, #E1B94B 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;