/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,html,js}'],
  purge: ['./src/**/*.{vue,html,js}'],
  prefix: 'tw-',
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
