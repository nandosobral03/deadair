/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: "#e83330",
				"primary-hover": "#ff6966",
				"primary-dim": "#e83330",
				background: "#1D1D26",
			},
			fontSize: {
				"2xs": ".5rem",
			},
			width: {
				"1/8": "12.5%",
				"2/8": "25%",
				"3/8": "37.5%",
				"4/8": "50%",
				"5/8": "62.5%",
				"6/8": "75%",
				"7/8": "87.5%",
				"128": "32rem",
			},
			minHeight: {
				"px": "1px"
			},
			height: {
				"9/10": "90%",
				"128": "32rem",
				"144": "36rem",
			}
		},

	},

	plugins: []
};

module.exports = config;
