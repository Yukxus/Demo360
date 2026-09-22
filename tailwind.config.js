/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        enfoque: {
          bg: {
            DEFAULT: '#0B0507',
            deep: '#070204',
            surface: '#14080D',
            card: '#1B0C12',
            cardHover: '#231018',
            glass: 'rgba(27, 12, 18, 0.75)',
            border: 'rgba(244, 63, 94, 0.15)',
            borderHover: 'rgba(249, 115, 22, 0.35)',
          },
          orange: {
            light: '#FDBA74',
            DEFAULT: '#F97316',
            hover: '#EA580C',
            vibrant: '#FF6B35',
            glow: 'rgba(249, 115, 22, 0.25)',
          },
          coral: {
            light: '#FDA4AF',
            DEFAULT: '#FB7185',
            vivid: '#F43F5E',
            glow: 'rgba(244, 63, 94, 0.25)',
          },
          bordo: {
            light: '#9F1239',
            DEFAULT: '#881337',
            dark: '#4C0519',
            deep: '#28040E',
            glow: 'rgba(136, 19, 55, 0.3)',
          },
          magenta: {
            dark: '#3D0A24',
            deep: '#230414',
          },
          cream: {
            100: '#FFFFFF',
            200: '#FFFDF9',
            300: '#FAF5EF',
            400: '#E8DFD3',
            500: '#C9BDB0',
            600: '#8E8276',
            700: '#5A524A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'warm-glow': '0 0 25px -5px rgba(249, 115, 22, 0.25), 0 0 10px -5px rgba(244, 63, 94, 0.2)',
        'warm-glow-lg': '0 0 40px -5px rgba(249, 115, 22, 0.35), 0 0 20px -5px rgba(244, 63, 94, 0.3)',
        'bordo-glow': '0 0 35px -5px rgba(136, 19, 55, 0.45)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        pulseWarm: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
      animation: {
        'pulse-warm': 'pulseWarm 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'scanline': 'scanline 8s linear infinite',
      }
    },
  },
  plugins: [],
}
