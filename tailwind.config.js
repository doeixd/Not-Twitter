const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: [
        "text-red-500", "hover:text-red-500",
        "w-4/5" ,"sm:w-full" ,"pt-4" ,"pb-4",
        "p-2", "h-min", "w-min", "sm:p-1", "mr-1.5",
        "transition-all", "group-hover:bg-yellow-100", 
        "bg-red-500", "hover:bg-red-500", "hover:green-500", 
        "hover:gray-150", "w-9", "h-min", "justify-between" ,
        "justify-between", "w-4/5", "sm:w-full", "pt-4", "pb-4",
       "group-hover:bg-green-100", "group-hover:bg-red-100", "rounded-full",
      ],
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
      filter: ['hover'],
      saturate: ['hover'],
    },
  },
  plugins: [require("tailwindcss-blend-mode")],
  // mode: 'jit',
}
