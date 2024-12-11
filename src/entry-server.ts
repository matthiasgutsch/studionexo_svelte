import App from './App.svelte';
import { prefetchData } from './utils/ssr';

export async function render(url: string = '/') {
  try {
    // Prefetch data based on the URL
    await prefetchData(url);

    const rendered = App.render({
      props: { url }
    });

    // Clean up head content and prepare HTML
    const cleanHead = rendered.head?.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') || '';
    const styles = rendered.css.code ? `<style>${rendered.css.code}</style>` : '';
    
    return {
      html: rendered.html,
      head: `${cleanHead}${styles}`
    };
  } catch (error) {
    console.error('Server-side rendering failed:', error);
    return {
      html: '<div class="error">Error loading content</div>',
      head: '<title>Error</title>'
    };
  }
}