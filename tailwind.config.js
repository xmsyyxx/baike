/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      lg: "500px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
