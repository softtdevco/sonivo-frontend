import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			blue:{
				0: "#f5faff",
				100: "#cfe3fd",
				200:"#98CBF9",
				300:"#70B6F2",
				400:"#50A2E9",
				500:"#3890DD",
				600:"#277FCD",
				700:"#1B6FB8",
				800:"#135EA0",
				900:"#0E4E87"
			},
			red:{
				0: "#FFF5F5",
				100: "#FDC5C5",
				200: "#F99898",
				300: "#F27070",
				400: "#E95050",
				500: "#DD3838",
				600: "#CD2727",
				700: "#B81B1B",
				800: "#A01313",
				900: "#870E0E"
			},
			green: {
				0: "#F5FFF5",
				100: "#C5FDC7",
				200: "#98F99B",
				300: "#70F274",
				400: "#50E955",
				500: "#38DD3E",
				600: "#27CD2C",
				700: "#1BB820",
				800: "#13A017",
				900: "#0E8712"
			},
			maroon: {
				0: "#FFF5F7",
				100: "#FDC5D0",
				200: "#F998AB",
				300: "#F2708A",
				400: "#E9506F",
				500: "#DD3859",
				600: "#CD2748",
				700: "#B81B3A",
				800: "#A0132F",
				900: "#870E26"
			},
			orange:{
				0: "#FFF7F5",
				100: "#FDC5C5",
				200: "#F99F8D",
				300: "#F27A62",
				400: "#E95C40",
				500: "#DD4526",
				600: "#DD4526",
				700: "#B82609",
				800: "#A01D03",
				900: "#871700"
			},
			yellow: {
				0: "#FFFDF5",
				100: "#FDF1C5",
				200: "#F9E498",
				300: "#F2D670",
				400: "#E9C850",
				500: "#DDB938",
				600: "#CDA927",
				700: "#B8961B",
				800: "#A08113",
				900: "#876D0E"
			},
			purple: {
				0: "#F7F5FF",
				100: "#D0C5FD",
				200: "#AB98F9",
				300: "#8A70F2",
				400: "#6F50E9",
				500: "#5938DD",
				600: "#4827CD",
				700: "#3A1BB8",
				800: "#2F13A0",
				900: "#260E87"
			},
			grey: {
				0: "#FFFFFF",
				100: "#FDFBFB",
				200: "#F9F5F5",
				300: "#F2EDED",
				400: "#E9E3E3",
				500: "#DDD6D6",
				600: "#CDC5C5",
				700: "#B8B1B1",
				800: "#A09A9A",
				900: "#878282"
			},
			black: {
				0: "#A6A6A6",
				100: "#A3A1A1",
				200: "#9D9A9A",
				300: "#9E9E9E",
				400: "#888484",
				500: "#777373",
				600: "#605D5D",
				700: "#444141",
				800: "#222121",
				900: "#000000"
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		
	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
