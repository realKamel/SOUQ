/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': {
          '50': '#eff7ff',
          '100': '#ddefff',
          '200': '#b4dfff',
          '300': '#72c6ff',
          '400': '#27aaff',
          '500': '#008efc',
          '600': '#0071d8',
          '700': '#0058af',
          '800': '#004b90',
          '900': '#033768',
          '950': '#02274f',
        }
      }
    },
  },
  daisyui: {
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root",
    themes: [
      {
        myBlue: {

          "primary": "#033768",

          "primary-content": "#fff",

          "secondary": "#fff",

          "secondary-content": "#161616",

          "accent": "#3983cc",

          "accent-content": "#fff",

          "neutral": "#fff",

          "neutral-content": "#161616",

          "base-100": "#f5f7f8",

          "base-200": "#edeff2",

          "base-300": "#d1d5db",

          "base-content": "#2d2d2d",

          "info": "#2563ff",

          "info-content": "#fff",

          "success": "#088d32",

          "success-content": "#fff",

          "warning": "#ffff00",

          "warning-content": "#2d2d2d",

          "error": "#f9333b",

          "error-content": "#fff",
        },
      },
    ],
  },
  plugins: [
    require( 'daisyui' ),
  ],
}

