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
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: radiusAndSpacing,
    borderRadius: radiusAndSpacing,
    colors: {
      "current-color": "currentColor",
      primary: {
        100: "#2ECB7A"
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
        100: "#A14445"
      }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"]
      },
      width: {
        sidebar: "52px",
      },
      maxWidth: {
        wrapper: "1440px",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
}
