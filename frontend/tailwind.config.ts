import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#037e11",
          dark: "#02590c",
        },
        glass: {
          DEFAULT: "rgba(30, 41, 59, 0.6)",
          border: "rgba(255, 255, 255, 0.08)",
        }
      },
    },
  },
  plugins: [],
};
export default config;
