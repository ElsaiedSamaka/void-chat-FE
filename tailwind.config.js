/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#1a202c",
          secondary: "#2d3748",
          accent: "#e2e8f0",
          white: "#fff",
        },
        light: {
          primary: "#fff",
          secondary: "#f7fafc",
          accent: "#718096",
          black: "#000",
        },
      },
    },
  },
  plugins: [],
};
