/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ps: {
          black: "#0a0e1a",
          surface: "#141824",
          surface2: "#1e2433",
          blue: "#0070d1",
          cyan: "#00d4ff",
          textPrimary: "#ffffff",
          textSecondary: "#8a9bb5",
          green: "#00e676",
          gold: "#f5a623",
          border: "#1e2d45",
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
