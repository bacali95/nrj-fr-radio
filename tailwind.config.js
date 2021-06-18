const tailwindScrollbar = require('tailwind-scrollbar');

module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    scrollbar: ['dark'],
  },
  plugins: [tailwindScrollbar],
};
