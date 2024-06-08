/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        motion: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(3px)' },
        },
        roadAnimation: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-350px)' },
        },
      },
      animation: {
        motion: 'motion 1s linear infinite',
        roadAnimation: 'roadAnimation 1.4s linear infinite',
      },
    },
  },
  plugins: [],
}