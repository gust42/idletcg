/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        button: "#34495e",
        "button-hover": "#2c3e50",
        "button-active": "#2c3e50",
      },
    },
  },
  plugins: [],
};
