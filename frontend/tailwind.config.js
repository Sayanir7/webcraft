/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      colors: {
        // primary: "#171717",        // Dark gray
        // secondary: "#212121",      // Slightly lighter gray
        // tertiary: "#2F2F2F",       // Neutral gray
        // border: "#4A5568",         // Neutral dark gray
        // background: "#0D0D0D",     // Deep black
        // primary_text: "#FFFFFF",   // Bright white
        // secondary_text: "#B4B4B4", // Light gray
        // accent: "#10A37F",         // Main teal-green accent
        // hover_accent: "#1ABC9C",   // Brighter teal for hover effects

        "primary": "#0C1218",
        "secondary": "#111827",
        "tertiary": "#1f2937",
        "border": "#2F4356",
        "background": "#000000",
        "primary_text": "#F0F2F4",
        "secondary_text": "#B0BAC5",
        "accent": "#0891B2",
        "hover_accent": "#0e7490",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}