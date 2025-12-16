/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium color palette
        'primary': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'champagne': {
          50: '#fdfaf5',
          100: '#faf5eb',
          200: '#f5e6cd',
          300: '#e6cfa8',
          400: '#d4b483',
          500: '#c9a66c',
          600: '#b8945a',
          700: '#9a7a4c',
          800: '#7d6341',
          900: '#665237',
        },
        'navy': {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 50%, #faf5eb 100%)',
        'gradient-hero': 'linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)',
      },
    },
  },
  plugins: [],
}
