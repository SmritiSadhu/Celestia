/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily:{

    },
    colors: {
      primary: "#1679AB",
      gradient: "#daeef7",
      gray:{
        200: "#e5e7eb",
        300: "#d1d5db",
        700: "#374151",
      },
      cyan:{
        500:"#06b6d4",
        600:"#0891b2",
        700:"#0369a1",
        800:"#075985"
      },
      red:{
        700:"#b91c1c",
      }
    },
    extend: {
      boxShadow: {
        neumorphic: '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
      },
    },
  },
  plugins: [],
};
