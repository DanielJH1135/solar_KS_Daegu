module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: { marquee: 'marquee 25s linear infinite' },
      keyframes: { marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-100%)' } } }
    }
  },
  plugins: []
};