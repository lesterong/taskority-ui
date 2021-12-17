module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'display': ['"Nunito Sans"', 'sans-serif'],
      'sans': ['Inter', 'sans-serif']
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
