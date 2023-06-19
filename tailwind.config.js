/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0864FC",
        secondary: "#D9D9D9",
        subtitle: "#b3b3b3ea",
        slightWhite: "#fafafa",
      },
      fontSize: {
        xxl: '3.5rem',
        xl: '3rem',
        lg: '2.5rem',
        md: '1.5rem',
        sm: '1.3rem',
        xsm: '1.1rem',
        xxsm: '0.725rem',
      },
      fontFamily: {
        exo: ['Exo', 'sans-serif'],
        indie: ['Indie Flower', 'cursive'],
      },
      screens: {
        'sm': '425px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


