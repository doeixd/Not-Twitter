const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: ["red-500", "hover:red-500", "hover:green-500", "hover:gray-150", "w-9"],
    },
  },
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "accent-1": "#333",
        gray: {
          ...colors.warmGray,
          150: '#f0f0ef'
        },
      },
      spacing: {
        '4.5': '1.13rem',
        '6.5': '1.64rem',
        '13': '3.25rem',
        18 : '4.5rem',
        15: "3.75rem",
        120: "28rem",
        615: '615px',
        '88p': "90%",
      },
      flexGrow: {
        '2': 2,
        '3': 3,
      },
      shadow: {
        DEFAULT:
          "rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px",
      },
      zIndex: {
        "-1": "-1",
      },
      minWidth: {
        0: "0",
        56: "56px",
        415: '415px',
        "1/4": "25%",
        "1/2": "50%",
        "2/5": "40%",
        "3/5": "60%",
        "65p": "65%",
        "3/4": "75%",
        "4/5": "80%",
        full: "100%",
      },
      maxWidth: {
        '25p': '25%',
        "65p": "65%",
        "85p": "88%",
        290: '290px',
        415: '415px',
        615: '615px',

      },
      screens: {
      'sm': {'max': '812px'},
      'md': {'max': '1000px'},
      'lg': {'max': '1400px'},
    },
    },
  },
  variants: {
    extend: {
      borderRadius: ['last'],
      padding: ['last'],
    },
  },
  plugins: [require("tailwindcss-blend-mode")],
  // mode: 'jit',
}
