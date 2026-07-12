/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },

      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,.08)",
        glow: "0 0 40px rgba(59,130,246,.18)",
      },

      animation: {
        float: "float 4s ease-in-out infinite",
        fade: "fade .45s ease",
        pop: "pop .3s ease",
      },

      keyframes: {
        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-6px)",
          },
        },

        fade: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },

        pop: {
          from: {
            opacity: 0,
            transform: "scale(.96)",
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
    },
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light", "dark"],
  },
};