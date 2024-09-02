/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#f1f1f1',  // Light gray for backgrounds
          200: '#eaeaea',  // Slightly darker gray for other backgrounds
          300: '#dedede',  // Darker gray for borders or outlines
        },
        accent: {
          100: '#ffca28',  // Yellow-orange for highlights or active states
          200: '#ff8f00',  // Darker orange for stronger accents
        },
        text: {
          100: '#000000',  // Black for primary text
          200: '#666666',  // Dark gray for secondary text
          300: '#999999',  // Light gray for placeholders or tertiary text
          400: '#cccccc',  // Very light gray for subtle text
        },
        bg: {
          100: '#ffffff',  // White for the main background
          200: '#f9f9f9',  // Off-white for secondary backgrounds
          300: '#ECECEC',  // Light gray for tertiary backgrounds
        },
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
}