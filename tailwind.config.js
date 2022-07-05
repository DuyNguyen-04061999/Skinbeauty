/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      MelodramaMedium: "MelodramaMedium",
      TuesdayNight: "TuesdayNight",
    },
    extend: {
      colors: {
        "color-bg": "#243c5a",
        "sub-text": "#68513F",
      },
    },
  },
  plugins: [],
};
