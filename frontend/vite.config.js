import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			usePolling: true
		},
		port: 5173,
		strictPort: true,
		hmr: {
			port: 5173
		}
	}
});
