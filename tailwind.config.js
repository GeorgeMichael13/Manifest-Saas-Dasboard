/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F1420',
          light: '#171E2E',
          lighter: '#212A3D',
        },
        paper: {
          DEFAULT: '#F7F6F2',
          dim: '#EDEBE4',
        },
        amber: {
          DEFAULT: '#E8A33D',
          dark: '#C4842A',
        },
        teal: {
          DEFAULT: '#4D8B87',
          light: '#6BA8A4',
        },
        alert: {
          DEFAULT: '#D65A4A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
