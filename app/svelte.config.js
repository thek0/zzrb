import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	vitePlugin: {
		inspector: true
	},
	kit: {
		adapter: adapter({
			pages: '../dist/www',
			assets: '../dist/www'
		})
		// trailingSlash: 'always'
	}
};
export default config;
