/**
 * Generates public/sitemap.xml before the production build.
 *
 * Course URLs are read straight out of the course catalogue so the sitemap can
 * never drift from the routes the app actually serves — add a course to
 * src/data/courses.ts and it appears here on the next build.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const siteUrl = (process.env.VITE_SITE_URL ?? 'https://www.pixrockvfx.com').replace(/\/$/, '');

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/courses', priority: '0.9', changefreq: 'weekly' },
  { path: '/student-work', priority: '0.7', changefreq: 'monthly' },
  { path: '/careers', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/enquiry', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

/**
 * Only PUBLISHED courses get a URL. A course with `published: false` has no
 * route — the detail page redirects it to /404 — so listing it here would
 * advertise a dead link to search engines.
 */
const catalogue = readFileSync(resolve(root, 'src/data/courses.ts'), 'utf8');
const slugs = [];
const slugRe = /^\s{4}slug: '([a-z0-9-]+)',$/gm;
let match;
while ((match = slugRe.exec(catalogue)) !== null) {
  // Look ahead only as far as the next course object.
  const rest = catalogue.slice(match.index);
  const nextSlug = rest.indexOf("\n    slug: '", 1);
  const block = nextSlug === -1 ? rest : rest.slice(0, nextSlug);
  const published = /^\s{4}published: (true|false),$/m.exec(block);
  if (published && published[1] === 'true') slugs.push(match[1]);
  else if (!published) slugs.push(match[1]);
}

if (slugs.length === 0) {
  console.warn('[sitemap] No published course slugs found — emitting static routes only.');
}

const today = new Date().toISOString().slice(0, 10);

const urls = [
  ...staticRoutes,
  ...slugs.map((slug) => ({ path: `/courses/${slug}`, priority: '0.8', changefreq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}${url.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`[sitemap] Wrote ${urls.length} URLs to public/sitemap.xml`);
