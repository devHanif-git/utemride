/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A1F44",
          50: "#E6F0FF",
          100: "#CCE0FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#2F6BFF",
          500: "#0A1F44",
          600: "#081933",
          700: "#061322",
          800: "#040D11",
          900: "#020600",
        },
        secondary: {
          DEFAULT: "#2F6BFF",
          light: "#5A8FFF",
          dark: "#1A4FDB",
        },
        accent: {
          DEFAULT: "#E6F0FF",
          dark: "#CCE0FF",
        },
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
};
