import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx},\r\n\t\t./components/**/*.{ts,tsx},\r\n\t\t./app/**/*.{ts,tsx},\r\n\t\t./src/**/*.{ts,tsx},",
    "./node_modules/@nextui-org/theme/dist/components/(card|ripple).js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-header":
          "linear-gradient(243.18deg, #100F17 0%, #1E2128 100%)",
        "main-bg": "linear-gradient(243.18deg, #100F17 0%, #1E2128 100%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      layout: {
        disabledOpacity: "0.3",
        // radius: {
        //   small: "2px",
        //   medium: "4px",
        //   large: "6px",
        // },
        borderWidth: {
          small: "1px",
          medium: "1px",
          large: "2px",
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#aed4fc",
              foreground: "#000",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#aed4fc",
              foreground: "#000",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;

export default config;
