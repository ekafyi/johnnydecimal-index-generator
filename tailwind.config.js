const defaultTheme = require("tailwindcss/defaultTheme");

const myColors = require("./color-tokens");

const myThemeExtend = {
  colors: myColors,
};

module.exports = {
  purge: ["./src/**/*.svelte"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: myThemeExtend,
    fontFamily: {
      ...defaultTheme.fontFamily,
      display: ["Barlow Semi Condensed", "Arial Narrow", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
