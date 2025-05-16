/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        red: {
          primary: '#981F1F',
          secondary: '#A32035',
        },
        zinc: {
          primary: '#434343',
        },
        'gray-light': {
          primary: '#E5E5E6',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        uni_sans: ['Uni Sans', 'sans-serif'],
      },
      boxShadow: {
        bottom: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
