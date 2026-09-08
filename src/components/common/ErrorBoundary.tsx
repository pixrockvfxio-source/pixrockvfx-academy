import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * Catches render-time failures so a single broken component cannot take the
 * whole site down with a blank page.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Unhandled UI error:', error, info.componentStack);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <div>
          <h1 className="text-title text-chalk">Something broke in the render</h1>
          <p className="mt-3 max-w-md text-mist">
            An unexpected error stopped this section from loading. Reloading usually clears it.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => window.location.reload()}>Reload the page</Button>
          <Button variant="secondary" href="/">
            Back to the academy
          </Button>
        </div>
      </div>
    );
  }
}
