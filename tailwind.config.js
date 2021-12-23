module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,md}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
