const radiusAndSpacing = {
  1: "8px",
  1.5: "12px",
  2: "16px",
  3: "24px",
  4: "32px",
  8: "64px",
  9: "72px",
  10: "80px",
  16: "128px",
  17: "136px",
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    spacing: radiusAndSpacing,
    borderRadius: {
      ...radiusAndSpacing,
      full: "9999px",
    },
    colors: {
      "current-color": "currentColor",
      primary: {
        100: "#2ECB7A",
      },
      neutral: {
        100: "#101217",
        200: "#272B35",
        300: "#535A6B",
        400: "#706F75",
        500: "#8B8C8E",
        900: "#FFFFFF",
      },
      danger: {
        100: "#A14445",
      },
    },
    fontSize: {
      "body-xs": "1.2rem",
      "body-sm": "1.4rem",
      "body-md": "2.0rem",
      "body-lg": "2.4rem",
      "title-sm": "2.0rem",
      "title-lg": "4.0rem",
    },
    zIndex: {
      hidden: -1,
      base: 5,
      above: 10,
      aboveAll: 15,
    },
    screens: {
      xs: "0px",
      sm: "475px",
      md: "920px",
      lg: "1280px",
      xl: "1920px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      width: {
        sidebar: "52px",
      },
      maxWidth: {
        wrapper: "924px",
      },
      keyframes: {
        fillAnimation: {
          "0%": {
            transform: "scale(0)",
          },
          "50%": {
            transform: "scale(1.25)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        rotate: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        dash: {
          "0%": {
            strokeDasharray: "1, 150",
            strokeDashoffset: 0,
          },
          "50%": {
            strokeDasharray: "90, 150",
          },
          "100%": {
            strokeDasharray: "90, 150",
            strokeDashoffset: -124,
          },
        },
      },
      animation: {
        fillAnimation: "fillAnimation 300ms forwards",
        dash: "dash 1.5s ease-in-out infinite",
        rotate: "rotate 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
