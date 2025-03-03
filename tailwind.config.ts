import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /clip-path-.*/,
    },
  ],
  theme: {
    extend: {
      screens: {
        "768": "768px",
        "420": "420px",
        "675": "675px",
        "600": "600px",
        "900": "900px",
        "1024":"1024px",
        "1250": "1250px",
        "1200": "1200px",
        "1030": "1030px",
        "1400": "1400px",
        "1500": "1500px",
        "min-1024":"1024px",
        "min-768":"768px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
