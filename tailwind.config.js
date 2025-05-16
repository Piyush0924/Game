/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],

  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [],
};
