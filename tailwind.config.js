import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "text-color": "var(--text-color)",
        "text-color-dark": "var(--text-color-dark)",
        bgPrimary: "var(--bg-primary-color)",
        bgSecondary: "var(--bg-secondary-color)",
        primary: {
          foreground: "var(--text-color-dark)",
          DEFAULT: "var(--primary-color)"
        },
        secondary: {
          DEFAULT: "var(--secondary-color)",
          foreground: "var(--text-color)"
        },
        danger: "var(--danger-color)",
        focus: "var(--primary-color)"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
    defaultTheme: "dark",
    themes: {
      dark: {}
    }
  })],
}

