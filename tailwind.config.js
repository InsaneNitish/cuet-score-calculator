/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', ':is(.dark, .earthy, .ocean, .slatet)'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: 'rgb(var(--color-slate-50, 248 250 252) / <alpha-value>)',
          100: 'rgb(var(--color-slate-100, 241 245 249) / <alpha-value>)',
          200: 'rgb(var(--color-slate-200, 226 232 240) / <alpha-value>)',
          300: 'rgb(var(--color-slate-300, 203 213 225) / <alpha-value>)',
          400: 'rgb(var(--color-slate-400, 148 163 184) / <alpha-value>)',
          500: 'rgb(var(--color-slate-500, 100 116 139) / <alpha-value>)',
          600: 'rgb(var(--color-slate-600, 71 85 105) / <alpha-value>)',
          700: 'rgb(var(--color-slate-700, 51 65 85) / <alpha-value>)',
          800: 'rgb(var(--color-slate-800, 30 41 59) / <alpha-value>)',
          900: 'rgb(var(--color-slate-900, 15 23 42) / <alpha-value>)',
          950: 'rgb(var(--color-slate-950, 2 6 23) / <alpha-value>)',
        },
        indigo: {
          50:  'rgb(var(--color-indigo-50, 238 242 255) / <alpha-value>)',
          100: 'rgb(var(--color-indigo-100, 224 231 255) / <alpha-value>)',
          200: 'rgb(var(--color-indigo-200, 199 210 254) / <alpha-value>)',
          400: 'rgb(var(--color-indigo-400, 129 140 248) / <alpha-value>)',
          500: 'rgb(var(--color-indigo-500, 99 102 241) / <alpha-value>)',
          600: 'rgb(var(--color-indigo-600, 79 70 229) / <alpha-value>)',
          700: 'rgb(var(--color-indigo-700, 67 56 202) / <alpha-value>)',
        }
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
};
