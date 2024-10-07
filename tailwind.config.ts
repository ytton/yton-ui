/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './docs/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        danger: 'var(--danger)',
        success: 'var(--success)',
        warning: 'var(--warning)'
      }
    }
  },
  plugins: []
};
