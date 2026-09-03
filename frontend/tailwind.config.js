/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#07111D',
          900: '#0B1B2B',
          850: '#0F2338',
          800: '#142C44',
          700: '#1C3A5A',
          600: '#2A527A',
        },
        aia: {
          dark: '#0B1B2B',
          navy: '#0F2338',
          red: '#FF4D4D',
          coral: '#E25238',
          peach: '#FFF5EB',
          peachBorder: '#FFE2D1',
          mint: '#EBF9F7',
          mintBorder: '#C6EFE6',
          lavender: '#F0EDFC',
          lavenderBorder: '#DDD5F9',
          sky: '#EBF5FF',
          skyBorder: '#CCE5FF',
          rose: '#FFF0F0',
          roseBorder: '#FFD6D6',
          sand: '#FFF8EB',
          sandBorder: '#FFE9C7',
          seafoam: '#E8F8F5',
          seafoamBorder: '#C3EFE5'
        }
      },
      fontFamily: {
        sans: ['"Clash Display"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 14px 34px -4px rgba(0, 0, 0, 0.08), 0 6px 16px -2px rgba(0, 0, 0, 0.04)',
        'glow-red': '0 0 25px rgba(255, 77, 77, 0.35)',
        'glow-blue': '0 0 30px rgba(56, 189, 248, 0.25)',
      }
    },
  },
  plugins: [],
}
