/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      tight: "-.025em",
      normal: "0",
      wide: ".025em",
      widest: "3em",
    },
    extend: {
      backgroundImage: {
        house: "url('/assets/images/backgroundImages/bg-img-1.jpeg')",
      },
    },
  },
  plugins: [],
};
