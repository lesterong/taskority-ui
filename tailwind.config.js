module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'gray': {
        100: '#191919',
        200: '#404040',
        300: '#7a7a7a',
        400: '#d4d4d4',
        500: '#f7f7f7',
      },
      'blue': {
        100: '#cde4fe',
        200: '#72b3fd',
        300: '#0478fb',
        400: '#02438d',
      },
      'red': {
        100: '#fdd9d8',
        200: '#f76f6e',
        300: '#e80e0d',
        400: '#870807',
      }
    },
    fontFamily: {
      'display': ['"Nunito Sans"', 'sans-serif'],
      'sans': ['Inter', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
