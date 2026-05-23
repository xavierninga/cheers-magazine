/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './dev-testing/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cheers Magazine Brand Colors
        brand: {
          black: '#0A0A0A',
          red: '#C8102E',
          'red-dark': '#8B0000',
          'red-light': '#FF1744',
          white: '#F5F5F0',
          gray: '#1A1A1A',
          'gray-mid': '#2D2D2D',
          'gray-light': '#6B6B6B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'page-flip': 'pageFlip 0.6s cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
      },
      keyframes: {
        pageFlip: {
          '0%': { transform: 'rotateY(0deg)', transformOrigin: 'left center' },
          '50%': { transform: 'rotateY(-90deg)', transformOrigin: 'left center' },
          '100%': { transform: 'rotateY(-180deg)', transformOrigin: 'left center' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200, 16, 46, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(200, 16, 46, 0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('/images/noise-texture.svg')",
      },
    },
  },
  plugins: [],
};
