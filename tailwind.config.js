/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{vue,html,js}',
    './components/**/*.{vue,html,js}',
    './layouts/**/*.vue'
  ],
  theme: {
    fontFamily: {
      heading: ['Voltaire', 'sans']
    },
    colors: {
      'default-red': '#cf2e2e'
    },
    extend: {}
  },
  plugins: []
}
