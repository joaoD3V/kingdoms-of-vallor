import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      backgroundImage: {
        auth: "url('/img/auth-background.png')",
      },
      colors: {
        betume: '#1D1D1B',
        grass: '#707557',
      },
    },
  },
  plugins: [],
};
export default config;
