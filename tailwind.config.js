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
    defaultTheme: "codium-dark",
    themes: {
      "codium-dark": {
        extend: "dark",
        layout: {},
        colors: {
          content1: "#23211f",
          content2: "#23211f",
          content3: "#23211f",
          content4: "#23211f",
          default: {
            DEFAULT: "#1a1817",
            100: "#1a1817",
          },
          background: {
            DEFAULT: "#1a1817",
            900: '#f3f2f1',
            800: '#d8d8d8',
            700: '#bfbfbf',
            600: '#a5a5a5',
            500: '#8c8c8c',
            400: '#727272',
            300: '#595959',
            200: '#3f3f3f',
            100: '#262626',
            50: '#0e0c0c',

          },
          focus: "#ffc38d",
          foreground: "#f7e3db",
          bgSecondary: {
            DEFAULT: "#23211f",
          },
          highlight: "#403d39",
          secondary: {
            DEFAULT: "#a0f538",
            foreground: "#1a1817"
          },
          primary: {
            foreground: "#1a1817",
            DEFAULT: "#ffc38d",
            900: '#fff1dd',
            800: '#ffd7b0',
            700: '#ffbc80',
            600: '#fea14e',
            500: '#fe871e',
            400: '#e56e07',
            300: '#b25502',
            200: '#803c00',
            100: '#4e2300',
            50: '#1f0a00',
          }
        }
      
      },
      dark: {
        colors: {
          background: "#1a1817",
          foregound: "#23211f"
        }
      }
    }
  })],
}

