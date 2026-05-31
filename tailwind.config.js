/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#818CF8', // Indigo 400
          DEFAULT: '#4F46E5', // Indigo 600
          dark: '#3730A3', // Indigo 800
        },
        secondary: {
          light: '#9CA3AF', // Gray 400
          DEFAULT: '#111827', // Gray 900
          dark: '#030712', // Gray 950
        },
        accent: {
          light: '#F472B6', // Pink 400
          DEFAULT: '#EC4899', // Pink 500
          hover: '#DB2777', // Pink 600
        },
        surface: {
          DEFAULT: '#F9FAFB', // Gray 50
          dark: '#1F2937', // Gray 800
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}