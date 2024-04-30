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
        "primary": "var(--primary-color)",
        "secondary": "var(--secondary-color)",
        "danger": "var(--danger-color)"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          primary: {
            DEFAULT: "#ffc38d",
            foreground: "#1a1817"
          },
          secondary: {
            DEFAULT: "#403f3d",
            foreground: "#f0dbd3"
          },
          danger: "#ef673d"
        }
      }
    }
  })],
}

