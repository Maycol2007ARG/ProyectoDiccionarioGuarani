/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        guarani: {
          green: '#2d6a4f',
          darkgreen: '#1b4332',
          lightgreen: '#52b788',
          yellow: '#f4d35e',
          cream: '#faf3e0',
          brown: '#6b4226',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
