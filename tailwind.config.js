/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070707',
          900: '#0b0b0c',
          800: '#111113',
          700: '#17181a',
          600: '#232429',
          500: '#2c2d34',
          300: '#b7b9c2',
          200: '#d7d9e1',
          100: '#f2f3f6'
        },
        chrome: {
          500: '#8c8f98',
          400: '#b2b5bd'
        }
      },
      boxShadow: {
        frame: '0 0 0 1px rgba(255,255,255,0.08), inset 0 0 30px rgba(255,255,255,0.03)',
        lift: '0 16px 40px rgba(0,0,0,0.45)'
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
        frameGlow: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0))'
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
