import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

/**
 * SINGLE_FILE=1 produces a fallback build: one self-contained index.html with
 * every stylesheet, script and asset inlined, and no code splitting. It drops
 * into any folder on any host and works without .htaccess, without a correct
 * document root, and without /assets resolving. Paired with VITE_ROUTER=hash
 * it needs no server rewrite rules at all.
 *
 * The normal build (dist/) stays the recommended output — it is smaller,
 * cached far better, and keeps clean URLs.
 */
const singleFile = process.env.SINGLE_FILE === '1';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Single-file builds use relative paths so the page works from any folder,
  // and even when opened directly from disk. Normal builds serve from the
  // domain root, where absolute paths are correct for deep links.
  base: singleFile ? './' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: singleFile ? 'dist-single' : 'dist',
    target: 'es2020',
    cssCodeSplit: !singleFile,
    sourcemap: false,
    // Inline every asset as a data URI in single-file mode.
    assetsInlineLimit: singleFile ? Number.MAX_SAFE_INTEGER : 4096,
    rollupOptions: {
      output: singleFile
        ? { inlineDynamicImports: true }
        : {
        // Split the long-lived vendor code out of the app bundle so a content
        // change does not invalidate the framework chunk in visitors' caches.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion';
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
            return 'react';
          }
          return 'vendor';
        },
      },
    },
  },
});
