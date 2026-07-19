export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        glow: "0 0 120px rgba(56, 189, 248, 0.12)",
      },

      animation: {
        blob: "blob 6s ease-in-out infinite",
      },

      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            transform: "translate(40px, -60px) scale(1.15)",
          },
          "66%": {
            transform: "translate(-30px, 40px) scale(0.95)",
          },
        },
      },
    },
  },

  plugins: [],
};
