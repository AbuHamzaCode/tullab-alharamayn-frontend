/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        bg_text_icon: "#020202",
        main_text: "#fdce1c",
        input_color: "#efefef8a",
        // player_bg: "rgb(51,144,236)",
      },
    },
  },
}

