/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#123C36',
          dark: '#0C2B26',
          light: '#1B524A',
          surface: '#174740',
        },
        turquoise: {
          DEFAULT: '#32C6BE',
          light: '#A9E4E2',
          soft: '#C9E9EA',
          hover: '#26AFA7',
        },
        cream: {
          DEFAULT: '#F7F4EA',
          soft: '#FFFDF7',
          dark: '#EBE6D5',
        },
        ink: {
          DEFAULT: '#17352F',
          muted: '#4D6B63',
          light: '#789990',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'organic': '4px 4px 0px 0px #123C36',
        'turquoise': '4px 4px 0px 0px #32C6BE',
        'soft-lg': '0 20px 40px -15px rgba(18, 60, 54, 0.08)',
        'card': '0 8px 30px rgba(18, 60, 54, 0.06)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
