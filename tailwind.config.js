/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1077BC",
        secondary: "#E7F1F8",
        hash: "#E7F1F8",
        info: "#1077BC",
        button: "#1077BC",
        playground: "#1077BC",
        "light-gray": "#E7F8FF",
        "green-playground": "#00C38A",
      },
    },
  },
  plugins: [],
};
