/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a1128',
          800: '#001f54',
          700: '#034078',
          600: '#0a2463',
        },
        gold: {
          400: '#ffc857',
          500: '#ffb347',
          600: '#f4a261',
        },
      },
    },
  },
  plugins: [],
}
