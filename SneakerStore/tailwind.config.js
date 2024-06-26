/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      x_sm: "400px",
      sm: "576px",
      md: "960px",
      lg: "1440px",
    },
    fontFamily: {
      serif: ['Merriweather", "serif'],
      sans: ["Fira Sans", "sans-serif"],
    },
  },
  plugins: [],
  important: true,
};
