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
          pink: '#ff5fc1',
          green: '#7af8c4',
          blue: '#66d9ff',
          dark: '#0a0c10',
        },
        ink: '#0a0b10',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
        glow: 'linear-gradient(120deg, rgba(255,95,193,0.25), rgba(102,217,255,0.15), rgba(122,248,196,0.1))',
      },
      boxShadow: {
        neon: '0 10px 60px rgba(255,95,193,0.15), 0 10px 40px rgba(102,217,255,0.15)',
      },
    },
  },
  plugins: [typography],
};

export default config;
