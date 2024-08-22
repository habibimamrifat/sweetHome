/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "primary":'#0ea5e9',
        "secondary": '#7dd3fc', // sky-300
        "shadowColor": '#075985', // shadow-sky-800
        "successPrimary":"#4CBB17",
        "successSecondary":"#90EE90"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
