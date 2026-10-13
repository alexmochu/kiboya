// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f9f4',
          100: '#dcf0e5',
          200: '#bce2cd',
          300: '#8dccac',
          400: '#57ae84',
          500: '#339165',
          600: '#237350',
          700: '#1a4731',  // Brand dark green
          800: '#163d2b',
          900: '#123326',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d97706',  // Brand gold
          600: '#b45309',
          700: '#92400e',
        },
        cream: '#faf8f3',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl:  '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        elevated: '0 4px 24px -4px rgb(0 0 0 / 0.12)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}
