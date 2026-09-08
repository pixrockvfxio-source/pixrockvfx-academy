import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { WhatsAppFab } from '@/components/common/WhatsAppFab';
import { PageLoader } from '@/components/common/PageLoader';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

/** Shared chrome for every page: navigation, main landmark, footer, utilities. */
export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-ink-950">
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
