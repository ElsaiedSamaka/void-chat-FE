/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#333333",
          secondary: "#ededed",
          accent: "#888888",
          white: "#fff",
        },
        light: {
          primary: "#c9ecde",
          secondary: "#2d3748",
          accent: "#009f60",
          black: "#000",
        },
      },
    },
  },
  plugins: [],
};