/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "noto-purple": "#696EFF",
        "noto-white": "#FAFAFA",
        "noto-black": "#12141F",
        "noto-lessblack": "#1C202F"
      },
    },
  },
  plugins: [],
});
