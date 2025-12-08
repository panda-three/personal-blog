import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        neon: {
          pink: '#ff7a8a',
          green: '#2dd4a5',
          blue: '#38bdf8',
          dark: '#0a0c10',
        },
        ink: '#f7f8ff',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(15,23,42,0.12) 1px, transparent 0)',
        glow: 'linear-gradient(135deg, rgba(255,186,99,0.35), rgba(82,168,255,0.25), rgba(255,122,138,0.25))',
      },
      boxShadow: {
        neon: '0 12px 50px rgba(255,186,99,0.24), 0 10px 40px rgba(82,168,255,0.18)',
      },
    },
  },
  plugins: [typography],
};

export default config;
