/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#C9A84C',
        'primary-light': '#E0C370',
        'primary-dark': '#A6894A',
        'background-dark': '#0A0A0A',
        'background-light': '#FAFAFA',
        'surface-dark': '#141414',
        'surface-dark-2': '#1A1A1A',
        'surface-dark-3': '#262626',
        'border-dark': '#3A3A3A',
        'gold-dim': '#8A7019',
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", 'serif'],
        display: ["'Playfair Display'", 'serif'],
        sans: ["'Lato'", 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(201, 168, 76, 0.15)',
        'gold-glow-lg': '0 0 30px rgba(201, 168, 76, 0.25)',
      },
    },
  },
  plugins: [],
}
