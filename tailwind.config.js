/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ "./src/**/*.{html,js}" ],
	corePlugins: {
		//preflight: false
	},
	theme: {
		extend: {},
	},
	plugins: [ require( 'tailwindcss-primeui' ) ],
	darkMode: [ 'class' ]
}

