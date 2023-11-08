/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myColor1: '#610C9F',
        myColor2a: '#940B92',
        myColor2b: '#780876',
        myColor3: '#DA0C81',
        myColor4: '#E95793',
      },
      boxShadow: {
        'right': '5px 0px 5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

