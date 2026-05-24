/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        void: '#070814',
        ink: '#101323',
        aurora: '#7c3cff',
        plasma: '#ff4fd8',
        pulse: '#00e5ff',
        mint: '#7cffc4',
        solar: '#ffd166',
      },
      boxShadow: {
        neon: '0 0 32px rgba(0, 229, 255, 0.26), 0 0 54px rgba(124, 60, 255, 0.22)',
        plasma: '0 0 34px rgba(255, 79, 216, 0.24)',
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
        'slide-up': 'slideUp 0.55s ease both',
        shimmer: 'shimmer 5s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'scale(1.45)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(18px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
};
