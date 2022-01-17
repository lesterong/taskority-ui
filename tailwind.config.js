/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['"Nunito Sans"', 'sans-serif'],
      sans: ['Inter', 'sans-serif'],
    },
    screens: {
      xs: '398px',
      sm: '540px',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
