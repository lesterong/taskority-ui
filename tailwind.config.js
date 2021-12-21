const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'display': ['"Nunito Sans"', 'sans-serif'],
      'sans': ['Inter', 'sans-serif']
    },
    screens: {
      'xs': '398px',
      'sm': '540px',
      // ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
