import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { render } from './dist/server/entry-server.js';
import { getAllRoutes } from './dist/server/utils/route.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function prerender() {
  try {
    const outDir = resolve(__dirname, 'dist/client');
    mkdirSync(outDir, { recursive: true });

    const template = readFileSync(resolve(__dirname, 'index.html'), 'utf-8');
    const routes = await getAllRoutes();
    
    console.log(`Pre-rendering ${routes.length} routes...`);

    for (const route of routes) {
      console.log(`Pre-rendering ${route}...`);
      
      const { html, head } = await render(route);
      const rendered = template
        .replace('%sveltekit.head%', head)
        .replace('%sveltekit.body%', html);

      const outputPath = route === '/' 
        ? resolve(outDir, 'index.html')
        : resolve(outDir, route.slice(1), 'index.html');

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, rendered);
      console.log(`Generated ${outputPath}`);
    }

    console.log('Pre-rendering complete!');
  } catch (error) {
    console.error('Pre-rendering failed:', error);
    process.exit(1);
  }
}

prerender();