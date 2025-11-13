/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agri-green': '#537E72',
        'agri-light': '#CDDECB',
        'agri-dark': '#2f5b4a',
      },
    },
  },
  plugins: [],
}