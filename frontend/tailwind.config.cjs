/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: "#E01A4F",
				"primary-hover": "#E73665",
				"primary-dim": "#C01A4F",
			},
			width: {
				"1/8": "12.5%",
				"2/8": "25%",
				"3/8": "37.5%",
				"4/8": "50%",
				"5/8": "62.5%",
				"6/8": "75%",
				"7/8": "87.5%",

			},
			minHeight: {
				"px": "1px"
			}
		},

	},

	plugins: []
};

module.exports = config;
