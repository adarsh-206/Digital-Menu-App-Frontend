/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myColor1: '610C9F',
        myColor2a: '#940B92',
        myColor2b: '#780876',
        myColor3: '#DA0C81',
        myColor4: '#E95793',
      },
    },
  },
  plugins: [],
}

