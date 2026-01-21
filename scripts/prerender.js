
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);
const toFileUrl = (p) => `file://${toAbsolute(p).replace(/\\/g, '/')}`;

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import(toFileUrl('dist/server/entry-server.js'));

const routesToPrerender = ['/', '/recommender', '/all-plans'];

(async () => {
    // Determine the directory where static files are generated
    const staticDir = toAbsolute('dist/static');

    for (const url of routesToPrerender) {
        console.log(`Pre-rendering ${url}...`);
        
        const appHtml = render(url);

        const html = template.replace(`<!--app-html-->`, appHtml);

        const filePath = url === '/' 
            ? 'index.html' 
            : `${url.substring(1)}.html`; // e.g., /recommender -> recommender.html
        
        const targetPath = path.join(staticDir, filePath);
        
        // Ensure directory exists if route is nested (not applicable here but good practice)
        // fs.mkdirSync(path.dirname(targetPath), { recursive: true });

        fs.writeFileSync(targetPath, html);
        console.log(`Generated ${targetPath}`);
    }
    
    // Cleanup server build
    // fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true });
    console.log('SSG complete.');
})();
