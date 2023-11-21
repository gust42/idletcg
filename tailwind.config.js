/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        button: "#61dafb",
        "button-hover": "#2accf8",
        "button-active": "#99dafb",
      },
    },
  },
  plugins: [],
};
