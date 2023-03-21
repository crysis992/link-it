/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{jsx,tsx}",
    "./components/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D2727',
        secondary: '#413543',
        highlight: '#8F43EE',
        light: '#F0EB8D'
      },
      fontFamily: {
        primary: ['var(--primary-font)'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
}
