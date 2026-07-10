/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      colors: {
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        pine: "rgb(var(--pine-rgb) / <alpha-value>)",
        amber: "rgb(var(--amber-rgb) / <alpha-value>)",
        brick: "rgb(var(--brick-rgb) / <alpha-value>)",
        gridline: "rgb(var(--ink-rgb) / 0.15)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        toko: {
          primary: "#2F6F5E",
          secondary: "#E0A458",
          accent: "#B33F3F",
          neutral: "#1B2430",
          "base-100": "#FAFAF7",
          "base-200": "#F1EFE6",
          "base-300": "#E4E1D3",
          info: "#3D7FBF",
          success: "#2F6F5E",
          warning: "#E0A458",
          error: "#B33F3F",
          "--rounded-box": "0.35rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": "0.25rem",
          "--tab-radius": "0.25rem",
        },
      },
      {
        tokoDark: {
          primary: "#4C9C82",
          secondary: "#E0A458",
          accent: "#D9645F",
          neutral: "#EDEEF0",
          "base-100": "#161B22",
          "base-200": "#1D232C",
          "base-300": "#262E38",
          info: "#5B9BD5",
          success: "#4C9C82",
          warning: "#E0A458",
          error: "#D9645F",
          "--rounded-box": "0.35rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": "0.25rem",
          "--tab-radius": "0.25rem",
        },
      },
    ],
  },
};