/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: "#E01A4F",
				"primary-hover": "#E73665"
			},

		},

	},

	plugins: []
};

module.exports = config;
