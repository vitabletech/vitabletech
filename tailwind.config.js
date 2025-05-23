/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        dark: '#1F2937'
      }
    },
  },
  plugins: []
}