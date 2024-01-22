/* eslint-disable */
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/vue-tailwind-datepicker/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'vtd-primary': colors.rose, // Light mode Datepicker color
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss')],
}
