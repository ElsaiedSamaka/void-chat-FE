/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#194638",
          secondary: "#c3beb6",
          accent: "#181a1b",
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