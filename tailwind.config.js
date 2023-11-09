/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"light-cream": "#F5F4F1",
				"cream": "#E8E6DF",
				"dark-cream": "#DADAD1",
				"dark-blue": "#14274C",
				"light-blue": "#BEC8DD",
				"brown": "#AD5625",
				"gray": "#ABABAB",
			},
		},
	},
	plugins: [],
};
