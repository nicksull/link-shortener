/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      oswald: ['Oswald', 'sans-serif'],
    },
    extend: {
      colors: {
        pink: '#E40066',
        'dark-blue': '#0b1736',
      },
      zIndex: {
        '-100': '-100',
        100: '100',
      },
    },
  },
  plugins: [],
};
