import type { Config } from "tailwindcss";

const config: Config = {
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
          DEFAULT: "#06b6d4",
          dark: "#0891b2",
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
