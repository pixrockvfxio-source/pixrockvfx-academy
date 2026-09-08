import { ArrowRight, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  className?: string;
};

/** The closing call to action reused at the bottom of most pages. */
export function CTASection({
  eyebrow = 'Admissions open',
  title,
  description,
  primaryLabel = 'Apply Now',
  primaryTo = '/enquiry',
  secondaryLabel = 'Talk to Our Counsellor',
  secondaryTo = '/contact',
  className,
}: Props) {
  return (
    <section className={cn('section', className)} aria-labelledby="cta-heading">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-panel border border-ink-700 bg-ink-900 px-6 py-14 text-center sm:px-12 sm:py-18">
          {/* Cinematic backdrop: warm key light, cool rim, faint grid. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="grid-lines absolute inset-0 opacity-25 mask-fade-b" />
            <div className="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-ember-500/20 blur-[110px]" />
            <div className="absolute -right-20 -bottom-28 size-80 rounded-full bg-signal-500/15 blur-[110px]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.24em] text-ember-400 uppercase">{eyebrow}</p>
            <h2 id="cta-heading" className="mt-4 text-display text-chalk">
              {title}
            </h2>
            <p className="mt-4 text-base/relaxed text-mist sm:text-lg/relaxed">{description}</p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button to={primaryTo} size="lg">
                {primaryLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button to={secondaryTo} variant="secondary" size="lg">
                <PhoneCall aria-hidden="true" className="size-4" />
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
