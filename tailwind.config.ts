import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

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
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      fontFamily: {
        yekanbakh: ["Yekan Bakh VF", "Yekan Bakh Fa"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        gradiant: "linear-gradient(130deg, #202426 5%, #202426 84%)",
        "gradiant-order": "linear-gradient(to bottom right, #202426 , #050506)",
        "card-gradient": "linear-gradient(to bottom right,  #202426, #000000)",
        "product-gradient": "linear-gradient(to bottom right, #111827, black)",
        "dashboard-gradient":
          // linear-gradient(to bottom right, #111827, black)
          "linear-gradient(168.05deg, #202426 0%, #000000 100%)",
        "order-gradient":
          "linear-gradient(116.38deg, rgba(32, 36, 38, 0.47) 24.11%, rgba(17, 17, 18, 0.47) 75.89%)",
        "profile-gradient": "linear-gradient(to bottom, #111827, #000000)",
      },
      boxShadow: {
        ticket: "0px 4px 4px 0px rgba(0, 0, 0, 0.40)",
      },
      dropShadow: {
        ticket: "0px 4px 7px 0px #00000082",
        img: "0px 4px 4px 0px #00000040",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          small: "2px",
          medium: "4px",
          large: "6px",
        },
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
              foreground: "#fff",
            },
            secondary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
            background: {
              DEFAULT: "#fff",
            },
            focus: "#000000",
          },
          layout: {
            radius: {
              small: "1rem",
              medium: "1rem",
              large: "1rem",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#aed4fc",
              foreground: "black",
            },
            secondary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
            background: {
              DEFAULT: "#121212",
            },
            focus: "#000000",
          },
          layout: {
            radius: {
              small: "1rem",
              medium: "1rem",
              large: "1rem",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;

export default config;
