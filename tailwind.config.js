/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      Melodrama: ["MelodramaMedium"],
      TuesdayNight: ["TuesdayNight"],
    },
    extend: {
      colors: {
        "color-bg": "#F1EBE7",
        "color-sub-bg": "#e7ded8",
        "sub-text": "#68513F",
        "color-border": "#dacec6",
      },
      animation: {
        appear: "appear 0.5s linear",
      },
      keyframes: {
        appear: {
          "0%": { display: "none", opacity: 0 },
          "100%": { display: "block", opacity: 1 },
        },
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      sm: { max: "640px" },
      // => @media (max-width: 640px) { ... }
      xm: {'min': '1025px', 'max': '1200px'},
      lg2: { raw: "(min-width: 1024px)" },
      ml2: { raw: "(min-width: 992px)" },
      ml: { raw: "(max-width: 991px)" },
      desk: { raw: "(min-width: 769px)" },
      es: { raw: "(max-width: 479px)" },
      exs: { raw: "(max-width: 376px)" },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // add this to your plugins
    // ...
  ],
};
