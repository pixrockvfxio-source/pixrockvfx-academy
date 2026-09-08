import type { ReactNode } from 'react';

/**
 * Shared typographic wrapper for legal pages. Styles are applied here rather
 * than adding a typography plugin for two pages.
 */
export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <section className="section">
      <div
        className={
          'container-page max-w-3xl ' +
          '[&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-chalk first:[&_h2]:mt-0 ' +
          '[&_p]:mt-4 [&_p]:text-base/relaxed [&_p]:text-mist ' +
          '[&_a]:text-ember-300 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-ember-200 ' +
          '[&_ul]:mt-4 [&_ul]:space-y-2 [&_li]:text-base/relaxed [&_li]:text-mist'
        }
      >
        {children}
      </div>
    </section>
  );
}
