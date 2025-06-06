/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cassette: {
          orange: '#f97316',
          'orange-dark': '#ea580c',
          gray: '#374151',
          'gray-dark': '#1f2937',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 5s linear infinite',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
      },
      backgroundImage: {
        'cassette-gradient': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'player-gradient': 'linear-gradient(180deg, #1f2937 0%, #111827 100%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
