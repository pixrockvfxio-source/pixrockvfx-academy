import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes';

/**
 * Router selection.
 *
 * Normal builds use BrowserRouter and clean URLs (/courses/compositing),
 * which need the .htaccess rewrite so a refresh on a deep link is served
 * index.html rather than the host's 404.
 *
 * Setting VITE_ROUTER=hash switches to HashRouter (/#/courses/compositing).
 * URLs are uglier, but every route resolves entirely in the browser, so the
 * site works on any host with no server configuration at all. That is what
 * the single-file fallback build uses.
 */
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
