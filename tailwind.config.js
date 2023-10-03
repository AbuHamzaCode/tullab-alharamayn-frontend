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
      },
      // screens: {
      //   'tablet': '640px',
      //   // => @media (min-width: 640px) { ... }

      //   'laptop': '1024px',
      //   // => @media (min-width: 1024px) { ... }

      //   'desktop': '1280px',
      //   // => @media (min-width: 1280px) { ... }
      // },
    },
  },
}

