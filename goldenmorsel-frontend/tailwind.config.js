/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF8F3',
          100: '#FDF1E7',
          200: '#FAE3CF',
          300: '#F6D4B6',
          400: '#F3C69E',
          500: '#C17E3E', // Main brand color
          600: '#A66B35',
          700: '#8B582C',
          800: '#704523',
          900: '#55331A',
        },
        dark: {
          50: '#F5F5F4',
          100: '#E7E5E4',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
          500: '#57534E',
          600: '#44403C',
          700: '#292524',
          800: '#1C1917',
          900: '#0F0D0C', // Deep dark for backgrounds
        },
        cream: {
          50: '#FFFBF5',
          100: '#FFF7EB',
          200: '#FFEED7',
          300: '#FFE5C3',
          400: '#FFDCAF',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}