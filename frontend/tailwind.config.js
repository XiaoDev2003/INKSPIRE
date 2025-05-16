/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Dancing Script', 'cursive'],
        body: ['Be Vietnam Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};