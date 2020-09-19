const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "brown-150": "#282626",
      "btn-primary": "#FF9000",
      "btn-secondary": "#40A7F2",
      "info-box-100": "#16A2B8",
    }),
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {},
      colors: {},
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1408px",
      },
      backgroundSize: {
        ...defaultTheme.backgroundSize,
        "size-55": "55%",
      },
      height: {},
    },
  },
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar",
    }),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
