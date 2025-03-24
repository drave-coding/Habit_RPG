/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx,jsx}',
    './components/**/*.{js,ts,tsx,jsx}',
    './screens/**/*.{js,ts,tsx,jsx}',
  ],
  presets: [require('nativewind/preset')], // Correct preset reference
  theme: {
    extend: {},
  },
  plugins: [],
};