/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Rokkitt: ["Rokkitt", "serif"],
        roboslab: ["Roboto Slab", "serif"],
      },
    },
  },
  plugins: [],
};
