
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const domain = 'https://hytaleservercalculator.com';
const lastMod = new Date().toISOString().split('T')[0];

const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/recommender', changefreq: 'weekly', priority: 0.8 },
  { url: '/all-plans', changefreq: 'weekly', priority: 0.8 },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${domain}${page.url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');

// Ensure public directory exists if it's not standard (Vite uses public/)
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
    // If public doesn't exist, try dist or create public
    // Assuming standard Vite project structure
    fs.mkdirSync(publicDir, { recursive: true });
}


fs.writeFileSync(outputPath, sitemap);
console.log(`Sitemap generated at ${outputPath}`);
