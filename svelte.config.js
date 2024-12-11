import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      handleMissingId: 'warn'
    }
  },
  compilerOptions: {
    css: 'none'
  },
  preprocess: vitePreprocess()
};

export default config;