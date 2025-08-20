import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./modules/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        indigoBrand: "var(--color-indigo)",
        emeraldBrand: "var(--color-emerald)",
        coralBrand: "var(--color-coral)",
        gray0: "var(--color-gray-0)",
        gray9: "var(--color-gray-9)",
        goldBrand: "var(--color-gold)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      }
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "Arial", "AdorshoLipi", "Siyam Rupali", "sans-serif"],
      serif: ["Merriweather", "Georgia", "serif"]
    }
  },
  plugins: []
};
export default config;
