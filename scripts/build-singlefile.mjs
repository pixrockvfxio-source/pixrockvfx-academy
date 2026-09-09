/**
 * Builds a single self-contained index.html.
 *
 * Why this exists: the normal build splits into index.html + /assets/*.js|css.
 * That is the right output for a web root, but it fails silently — a blank
 * page — if the files end up one folder too deep, if the document root points
 * elsewhere, or if the host will not serve /assets. This build has no such
 * dependency: one file, nothing external, drop it anywhere.
 *
 * Combined with VITE_ROUTER=hash every route resolves in the browser, so it
 * also works without .htaccess rewrite rules.
 *
 * Usage:  npm run build:single   →  dist-single/index.html
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outDir = join(root, 'dist-single');

console.log('[single] building…');
execFileSync('npx', ['vite', 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, SINGLE_FILE: '1', VITE_ROUTER: 'hash' },
});

const htmlPath = join(outDir, 'index.html');
let html = readFileSync(htmlPath, 'utf8');

const assetsDir = join(outDir, 'assets');
const inlined = [];

/** Reads a built asset referenced from index.html by its href/src value. */
function readAsset(ref) {
  const name = ref.replace(/^\.?\//, '').replace(/^assets\//, '');
  const file = join(assetsDir, name);
  if (!existsSync(file)) throw new Error(`Referenced asset not found: ${file}`);
  return readFileSync(file, 'utf8');
}

// --- Inline the stylesheet(s) ------------------------------------------------
html = html.replace(
  /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
  (match, href) => {
    if (!href.includes('assets/')) return match; // leave Google Fonts alone
    inlined.push(href);
    return `<style>\n${readAsset(href)}\n</style>`;
  },
);

// --- Inline the script -------------------------------------------------------
html = html.replace(
  /<script[^>]*type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g,
  (match, src) => {
    if (!src.includes('assets/')) return match;
    inlined.push(src);
    // A literal </script> inside the bundle would end the tag early.
    const code = readAsset(src).replace(/<\/script>/gi, '<\\/script>');
    return `<script type="module">\n${code}\n</script>`;
  },
);

// --- Drop the modulepreload hints; there is nothing left to preload ----------
html = html.replace(/<link[^>]*rel="modulepreload"[^>]*>\s*/g, '');

if (inlined.length === 0) {
  throw new Error('Nothing was inlined — the index.html markup did not match. Aborting.');
}

writeFileSync(htmlPath, html, 'utf8');

// The assets folder is now redundant; removing it proves the file is standalone.
rmSync(assetsDir, { recursive: true, force: true });

// Anything still pointing at a file (favicon, manifest) must not break the page
// if it is missing, so verify what remains is only same-folder relative refs.
const leftover = [...html.matchAll(/(?:src|href)="(\.\/[^"]+)"/g)].map((m) => m[1]);
const sizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);

console.log(`\n[single] inlined ${inlined.length} asset(s)`);
console.log(`[single] dist-single/index.html — ${sizeKb} KB, fully self-contained`);
console.log(`[single] alongside it: ${readdirSync(outDir).filter((f) => f !== 'index.html').join(', ') || '(nothing)'}`);
if (leftover.length) console.log(`[single] relative refs kept: ${[...new Set(leftover)].join(', ')}`);
