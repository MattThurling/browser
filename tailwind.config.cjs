/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Avenir Next"', '"Segoe UI"', "sans-serif"]
      },
      boxShadow: {
        shell: "0 30px 80px rgba(12, 32, 55, 0.22)"
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate"]
  }
};
