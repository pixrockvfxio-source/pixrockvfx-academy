import { Home, Compass } from 'lucide-react';
import { Seo } from '@/components/Seo/Seo';
import { Button } from '@/components/ui/Button';
import { navItems } from '@/components/Navbar/Navbar';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="This page could not be found. Head back to the PixRock VFX Academy home page or browse our courses."
        path="/404"
        noIndex
      />

      <section className="relative isolate flex min-h-[85svh] items-center overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="grid-lines absolute inset-0 opacity-25" />
          <div className="absolute top-1/4 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-ember-600/15 blur-[130px]" />
          <div className="absolute right-0 bottom-0 size-80 rounded-full bg-signal-600/10 blur-[120px]" />
        </div>

        <div className="container-page py-24 text-center">
          <p className="font-display text-[clamp(5rem,18vw,12rem)] leading-none font-extrabold tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--color-ink-500)]">
            404
          </p>

          <h1 className="mt-4 text-display text-chalk">Lost in the render?</h1>
          <p className="mx-auto mt-5 max-w-lg text-base/relaxed text-mist sm:text-lg/relaxed">
            This frame did not resolve. The page you were looking for has either moved, been renamed, or never
            existed in this version of the comp.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button to="/" size="lg">
              <Home aria-hidden="true" className="size-4" />
              Back to Academy
            </Button>
            <Button to="/courses" variant="secondary" size="lg">
              <Compass aria-hidden="true" className="size-4" />
              Browse courses
            </Button>
          </div>

          <nav aria-label="Site sections" className="mt-14">
            <p className="text-xs tracking-[0.2em] text-slate-muted uppercase">Or try one of these</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-mist underline-offset-4 transition-colors hover:text-ember-300 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
