/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts, tsx}',
    './dist/*.html', // Include all HTML, JS, and TS files in the src folder
    './dist/*.js', // Include all HTML, JS, and TS files in the src folder
    
    
  ],
  theme: {
    colors:{
      gray:{
        1: '#202124',
        2: '#1f2937',
      }

    },
    extend: {},
  },
  plugins: [],
}

