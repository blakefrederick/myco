/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      '3xs': '0.4rem',
      '2xs': '0.6rem',
    },
    extend: {
      colors: {
        Facebook: '#4267B2',
        GitHub: '#171515',
        Twitter: '#1DA1F2',
        Spotify: '#1DB954',
        Instagram: '#E1306C',
      },
    },
  },
  plugins: [],
}
