/** @type {import('tailwindcss').Config} */
import { shadcnPreset } from "./shadcn-preset";

export default {
  presets: [shadcnPreset],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        sigmar: ["Sigmar", "cursive"],
      },
    },
  },
  plugins: [],
};
