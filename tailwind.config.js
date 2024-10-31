/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-custom': 'inset 0px 0px 4px 4px rgb(0 0 0 / 0.05)'
      }
    },
  },
  plugins: [],
}

