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
      },
      fontSize: {
        clamp: 'clamp(3rem, 10vw, 8rem)'
      }
    },
    fontFamily: {
      heading: ['Voltaire', 'sans']
    }
  },
  plugins: []
}
