/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // chart colors for dynamic classes
    "bg-red-700",
    "bg-purple-700",
    "bg-teal-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-teal-300",
    "bg-orange-300",
    "bg-blue-300",
  ],
  theme: {
    extend: {
      fontFamily: {
        helveticaFamily: [
          "Helvetica",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
        ],
      },
      colors: {
        multioptions: "#0981c3",
        jungleGreen: "#1c1f37",
        ghostWhite: "#f6f8fa",
        heading: "#1c1f37",
      },
      height: {
        70: "17.5rem",
      },
      maxHeight: {
        70: "17.5rem",
        85: "21.25rem",
      },
      margin: {
        graphMargin: "1.875rem",
      },
      maxWidth: {
        graphMargin: "1.875rem",
        26: "6.5rem",
        36: "9rem",
      },
      width: {
        26: "6.5rem",
        37: "9.25rem",
        38: "9.5rem",
        61: "15.25rem",
        85: "21.25rem",
        137.5: "34.375rem",
      },
    },
  },
  plugins: [],
};
