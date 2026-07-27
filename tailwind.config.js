/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./blog/**/*.html",
    "./services/**/*.html",
    "./policies/**/*.html",
    "./src/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA', // Blue 400
          DEFAULT: '#2563EB', // Blue 600
          dark: '#1D4ED8', // Blue 700
          glow: 'rgba(37, 99, 235, 0.5)'
        },
        secondary: {
          light: '#A78BFA', // Violet 400
          DEFAULT: '#7C3AED', // Violet 600
          dark: '#5B21B6', // Violet 800
          glow: 'rgba(124, 58, 237, 0.5)'
        },
        accent: {
          light: '#22D3EE', // Cyan 400
          DEFAULT: '#06B6D4', // Cyan 500
          hover: '#0891B2', // Cyan 600
          glow: 'rgba(6, 182, 212, 0.5)'
        },
        dark: {
          light: '#0F172A', // Slate 900
          DEFAULT: '#020617', // Slate 950
          card: 'rgba(15, 23, 42, 0.7)',
          surface: '#0B0F19'
        },
        surface: {
          DEFAULT: '#F8FAFC', // Slate 50
          dark: '#020617', // Slate 950
          glass: 'rgba(255, 255, 255, 0.08)',
          'glass-light': 'rgba(255, 255, 255, 0.7)',
          'glass-border': 'rgba(255, 255, 255, 0.15)'
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'General Sans', 'Satoshi', 'sans-serif'],
        heading: ['Outfit', 'Geist', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-fast': 'floatFast 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 10s infinite',
        'aurora': 'aurora 15s ease infinite alternate',
        'border-beam': 'borderBeam 4s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'liquid-pulse': 'liquidPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-25px) rotate(-2deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.15)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        borderBeam: {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        liquidPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.2)' },
          '50%': { boxShadow: '0 0 35px rgba(124, 58, 237, 0.6), inset 0 0 25px rgba(6, 182, 212, 0.4)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'aurora-mesh': 'radial-gradient(at 10% 20%, rgba(37, 99, 235, 0.35) 0px, transparent 50%), radial-gradient(at 90% 10%, rgba(124, 58, 237, 0.3) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(6, 182, 212, 0.25) 0px, transparent 50%)',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255, 255, 255, 0.05)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E\")",
        'grid-pattern-dark': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(2, 6, 23, 0.05)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E\")",
        'dot-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='rgba(255, 255, 255, 0.07)'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}