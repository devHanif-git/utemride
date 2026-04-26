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
          DEFAULT: "#081C4A",
          900: "#081C4A",
          700: "#163D99",
          600: "#245CDE",
          300: "#A7C5FF",
          100: "#EAF1FF",
        },
        secondary: {
          DEFAULT: "#245CDE",
        },
        accent: {
          DEFAULT: "#4F86FF",
        },
        background: {
          DEFAULT: "#FFFFFF",
          soft: "#F8FAFC",
        },
        success: {
          DEFAULT: "#22C55E",
        },
        warning: {
          DEFAULT: "#F59E0B",
        },
        error: {
          DEFAULT: "#EF4444",
        },
      },
      fontFamily: {
        poppins: ["Poppins_400Regular", "sans-serif"],
        "poppins-medium": ["Poppins_500Medium", "sans-serif"],
        "poppins-semibold": ["Poppins_600SemiBold", "sans-serif"],
        "poppins-bold": ["Poppins_700Bold", "sans-serif"],
        inter: ["Inter_400Regular", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-semibold": ["Inter_600SemiBold", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        button: "16px",
      },
    },
  },
  plugins: [],
};
