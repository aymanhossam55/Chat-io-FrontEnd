/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"]
      },
      spacing: {
        4: "1rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        18: "4.5rem",
        24: "6rem",
        32: "8rem"
      },
      fontSize: {
        "xs": ".75rem",
        "sm": ".875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
      screens: {
        's': {'min': '250px', 'max': '567px'},
        'm': {'min': '568px', 'max': '767px'},
        'l': {'min': '768px', 'max': '1280px'},
        'x': {'max': '1281px' }, 
      },
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#006BA6",
          secondary: "#0C0A3E",
          accent: "#9ca3af",
          neutral: "#747474",
          "base-100": "#E6E6E6",
          info: "#19647E",
          success: "#22c55e",
          warning: "#F2AF29",
          error: "#B80000"
        }
      },
      {
        dark: {
          primary: "#006BA6",
          secondary: "#1F1B57",
          accent: "#6B7280",
          neutral: "#3D3D3D",
          "base-100": "#1E1E1E",
          info: "#1E748E",
          success: "#16A34A",
          warning: "#D99122",
          error: "#8B0000"
        }
      }
    ], // active theme
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    // prefix: "du-", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root" // The element that receives theme color CSS variables
  }
};