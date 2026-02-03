import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			// Coastal Luxury Color Palette
			colors: {
				// Primary - Deep Ocean Navy
				navy: {
					DEFAULT: "#1B3A57",
					light: "#2C4A68",
					dark: "#0F2438",
				},
				// Secondary - Warm Sand
				sand: {
					DEFAULT: "#E8E2D9",
					light: "#F5F2ED",
					dark: "#D4CCC0",
				},
				// Accent - Seafoam
				seafoam: {
					DEFAULT: "#A8C5C5",
					light: "#C5DADA",
					dark: "#7FA3A3",
				},
				// Accent - Coral (CTAs)
				coral: {
					DEFAULT: "#E8A598",
					hover: "#D4887A",
				},
				// Neutrals
				cream: "#FDFCFA",
				charcoal: "#2D3436",
				gray: {
					DEFAULT: "#636E72",
					light: "#B2BEC3",
				},
				// Semantic
				success: "#55A88B",
				error: "#C0544D",
				warning: "#D4A84D",
			},
			// Typography
			fontFamily: {
				display: ["var(--font-cormorant)", "Georgia", "serif"],
				body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
				accent: ["var(--font-caveat)", "cursive"],
			},
			// Spacing for generous whitespace
			spacing: {
				"18": "4.5rem",
				"22": "5.5rem",
				"30": "7.5rem",
			},
			// Max widths
			maxWidth: {
				content: "1400px",
				text: "65ch",
			},
			// Animation timing
			transitionTimingFunction: {
				smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
				bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
				wave: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
			},
			// Custom animations
			animation: {
				"fade-up": "fadeUp 0.5s var(--ease-smooth) forwards",
				"fade-in": "fadeIn 0.3s var(--ease-smooth) forwards",
				"slide-in": "slideIn 0.3s var(--ease-smooth) forwards",
			},
			keyframes: {
				fadeUp: {
					from: { opacity: "0", transform: "translateY(20px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				fadeIn: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				slideIn: {
					from: { opacity: "0", transform: "translateX(100%)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
			},
		},
	},
	plugins: [],
};

export default config;
