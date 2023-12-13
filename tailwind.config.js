/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./node_modules/primereact/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {}
	},
	plugins: []
};
