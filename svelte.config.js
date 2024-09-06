import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Use the static adapter for building the project as a static site
		adapter: adapter({
			pages: 'build',     // Directory where the built pages will be output
			assets: 'build',    // Directory where the built assets will be output
			fallback: null,     // Set this if you want a single-page app fallback (e.g., 'index.html')
			precompress: false  // Precompresses the output (e.g., gzip)
		}),
		// paths: {
		// 	base: '/map'
		// },
		alias: {
			'@components': 'src/lib/components',
			'@stores': 'src/lib/stores',
			'@lib': 'src/lib',
		},

	}
};

export default config;
