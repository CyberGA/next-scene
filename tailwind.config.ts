import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: {
          base: "var(--red-base)",
        },
      },
      keyframes: {
        fadeInZoom: {
          "0%": {
            opacity: "0",
            transform: "scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        fadeInZoom: "fadeInZoom 1s ease-in-out",
        fadeInZoomFast: "fadeInZoom 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
