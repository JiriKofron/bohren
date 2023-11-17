/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{vue,html,js}',
    './components/**/*.{vue,html,js}',
    './layouts/**/*.vue'
  ],
  theme: {
    extend: {
      colors: {
        'default-red': '#cf2e2e'
      }
    },
    fontFamily: {
      heading: ['Voltaire', 'sans']
    }
  },
  plugins: []
}
