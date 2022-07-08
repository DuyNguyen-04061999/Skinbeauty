/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      'Melodrama': ["MelodramaMedium"],
      'TuesdayNight': ["TuesdayNight"],
    },
    extend: {
      colors: {
        "color-bg": "#F1EBE7",
        "color-sub-bg": "#e7ded8",
        "sub-text": "#68513F",
        "color-border":"#dacec6",
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
      desk: { raw: "(min-width: 769px)" },
      "lg'": { raw: "(min-width: 1024px)" },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // add this to your plugins
    // ...
  ],
};
